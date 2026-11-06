import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage config - strict separation between ElevIQ Foundation and STC Commercial collections
const DATA_DIR = path.join(__dirname, '../data');
const ELEVIQ_DATABASE_FILE = path.join(DATA_DIR, 'eleviq_inquiries.json');
const STC_DATABASE_FILE = path.join(DATA_DIR, 'stc_commercial_inquiries.json');
const MASTER_DATABASE_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Approved interest areas from Terminology / Handoff Lock and Participant Entry Points
const APPROVED_INTEREST_AREAS = [
  'Participant/family information',
  'School/youth partnership',
  'Job Corps/workforce partnership',
  'Funder/donor conversation',
  'Employer/institutional CAS use',
  'CAS licensing/demo',
  'Media/speaking/general inquiry',
  // 7 Approved Participant Entry Points
  'Youth Exploration — Ages 13–15',
  'High School / CTE — Ages 16–18',
  'Postsecondary / Emerging Career',
  'Adult Learner / Workforce Entry',
  'Experienced Worker / Career Transition',
  'Veteran / Military Transition',
  'Reentry / Career Rebuilding',
  // Participant Entry Point Intents
  "I'm exploring interests, strengths, and early pathways (Ages 13–15)",
  "I'm preparing for graduation, CTE training, or next steps (Ages 16–18)",
  "I'm enrolled in or exploring college, technical degrees, or emerging careers",
  "I'm building core capabilities, entering the workforce, or returning to work",
  "I'm navigating an industry transition, technology shift, or mid-career pivot",
  "I'm transitioning from military service to civilian education or career pathways",
  "I'm rebuilding my career path, overcoming barriers, or re-entering the workforce"
];

// Helper to read database collections
function readInquiries(collectionType = 'all') {
  try {
    if (collectionType === 'stc') {
      if (!fs.existsSync(STC_DATABASE_FILE)) return [];
      return JSON.parse(fs.readFileSync(STC_DATABASE_FILE, 'utf8') || '[]');
    }
    if (collectionType === 'eleviq') {
      if (!fs.existsSync(ELEVIQ_DATABASE_FILE)) return [];
      return JSON.parse(fs.readFileSync(ELEVIQ_DATABASE_FILE, 'utf8') || '[]');
    }
    if (!fs.existsSync(MASTER_DATABASE_FILE)) return [];
    const data = fs.readFileSync(MASTER_DATABASE_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading inquiries database:', error);
    return [];
  }
}

// Helper to write database collections with strict entity separation
function writeInquiry(record, isSTC = false) {
  try {
    const targetFile = isSTC ? STC_DATABASE_FILE : ELEVIQ_DATABASE_FILE;
    
    // 1. Write strictly to entity-specific collection
    let entityList = [];
    if (fs.existsSync(targetFile)) {
      entityList = JSON.parse(fs.readFileSync(targetFile, 'utf8') || '[]');
    }
    entityList.push(record);
    fs.writeFileSync(targetFile, JSON.stringify(entityList, null, 2), 'utf8');

    // 2. Also record to master log for unified audit logging
    const masterList = readInquiries('all');
    masterList.push(record);
    fs.writeFileSync(MASTER_DATABASE_FILE, JSON.stringify(masterList, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing inquiry to database:', error);
    return false;
  }
}

/**
 * ------------------------------------------------------------------------
 * POST /api/inquiry - Foundation & Commercial Inquiry API Endpoint
 * ------------------------------------------------------------------------
 * 1. Target Inbox:
 *    Directs all Foundation website form notification emails to "info@eleviqfoundation.org".
 * 
 * 2. Dynamic Subject Tagging:
 *    Reads incoming payload fields: "audienceContext", "participantEntryPoint", and "formType".
 *    - If formType === 'sponsorship':
 *        "[SPONSORSHIP] New Partnership Request: " + fullName
 *    - Else if audienceContext === 'None / General Individual Participant' (or blank):
 *        "[PARTICIPANT INQUIRY] " + fullName + " - " + (participantEntryPoint || "General")
 *    - Else:
 *        "[ORG DEMO] " + audienceContext + " - " + fullName
 * 
 * 3. Response Guardrails:
 *    - Does NOT run any CAS user creation, password hashing, or token provisioning functions.
 *    - Returns HTTP 200 with the exact confirmation string required.
 */
app.post('/api/inquiry', (req, res) => {
  const fullName = (req.body.fullName || req.body.name || '').trim();
  const email = (req.body.email || '').trim();
  const phone = (req.body.phone || 'N/A').trim();
  const organization = (req.body.organization || 'Individual / Participant').trim();
  const role = (req.body.role || 'Participant').trim();
  const message = (req.body.message || '').trim();

  // Incoming dynamic subject fields
  const audienceContext = (
    req.body.audienceContext !== undefined
      ? req.body.audienceContext
      : (req.body.programContext !== undefined ? req.body.programContext : '')
  ).trim();

  const participantEntryPoint = (
    req.body.participantEntryPoint ||
    req.body.interestArea ||
    ''
  ).trim();

  let formType = (req.body.formType || '').trim().toLowerCase();

  // Auto-detect formType if not explicitly passed
  if (!formType) {
    if (
      req.body.interestArea === 'Funder/donor conversation' ||
      audienceContext.toLowerCase().includes('philanthropic') ||
      (role && role.toLowerCase().includes('funder'))
    ) {
      formType = 'sponsorship';
    } else if (
      audienceContext &&
      audienceContext !== 'None / General Individual Participant'
    ) {
      formType = 'organizational-demo';
    } else {
      formType = 'participant';
    }
  }

  // Field validations
  const errors = {};
  if (!fullName) errors.fullName = 'Full name is required.';
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // 1. Target Inbox Determination
  const isSTC = req.body.entityRoute === 'stc' || req.body.entityRoute === 'STC Innovations';
  const selectedEntityRoute = isSTC ? 'STC Innovations' : 'ElevIQ Foundation';
  const targetInbox = isSTC ? 'commercial@stc-innovations.com' : 'info@eleviqfoundation.org';

  // 2. Dynamic Subject Tagging
  let subject = '';
  if (isSTC) {
    subject = `[STC Innovations Commercial Inquiry] ${fullName} (${organization}) - ${participantEntryPoint || 'Commercial Demo'}`;
  } else if (formType === 'sponsorship') {
    subject = `[SPONSORSHIP] New Partnership Request: ${fullName}`;
  } else if (!audienceContext || audienceContext === 'None / General Individual Participant') {
    subject = `[PARTICIPANT INQUIRY] ${fullName} - ${participantEntryPoint || 'General'}`;
  } else {
    subject = `[ORG DEMO] ${audienceContext} - ${fullName}`;
  }

  // 3. Construct submission record (No CAS user provisioning, no password hashing, no tokens)
  const record = {
    id: `inquiry_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    submittedAt: new Date().toISOString(),
    clientIp: req.ip || req.headers['x-forwarded-for'] || 'unknown',
    entityRoute: selectedEntityRoute,
    targetInbox: targetInbox,
    subject: subject,
    data: {
      fullName: fullName,
      name: fullName,
      organization: organization,
      email: email,
      phone: phone,
      role: role,
      audienceContext: audienceContext,
      participantEntryPoint: participantEntryPoint,
      formType: formType,
      interestArea: participantEntryPoint || req.body.interestArea || 'General',
      message: message || 'Inquiry submitted.',
      subject: subject,
      targetInbox: targetInbox,
      entityRoute: selectedEntityRoute
    }
  };

  const success = writeInquiry(record, isSTC);
  if (!success) {
    return res.status(500).json({ success: false, error: 'Database storage error.' });
  }

  console.log(`[API] Success: Recorded new inquiry for [${selectedEntityRoute}] -> Target: ${targetInbox} | Subject: "${subject}" from ${fullName}`);

  // Dispatch direct notification email to target inbox if Web3Forms key is available
  const web3AccessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.VITE_WEB3FORMS_ACCESS_KEY || '9949e474-6db6-4851-aab1-072aecbf8c16';
  if (web3AccessKey) {
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3AccessKey,
        subject: subject,
        from_name: isSTC ? 'STC Innovations Commercial Inquiries' : 'ElevIQ Foundation Website',
        to_email: targetInbox,
        name: fullName,
        email: email,
        phone: phone,
        organization: organization,
        role: role,
        audience_context: audienceContext,
        participant_entry_point: participantEntryPoint,
        form_type: formType,
        message: message || 'Inquiry submitted.',
        replyto: email,
      })
    }).catch(err => {
      console.warn('[Server] Direct email notification note:', err.message);
    });
  }

  // 4. Response Guardrails: HTTP 200 with exact confirmation string
  return res.status(200).json({
    success: true,
    message: "Thank you for your interest in ElevIQ Foundation. We've received your inquiry. Our team will review available participation opportunities and contact you if an appropriate opportunity is available.",
    subject: subject,
    targetInbox: targetInbox,
    entityRoute: selectedEntityRoute
  });
});

// Admin-inspection API (to verify separated stored records)
app.get('/api/inquiries', (req, res) => {
  const collection = req.query.collection || req.query.entity;
  if (collection === 'stc') {
    const stcRecords = readInquiries('stc');
    return res.json({ success: true, count: stcRecords.length, collection: 'stc', inquiries: stcRecords });
  }
  if (collection === 'eleviq') {
    const eleviqRecords = readInquiries('eleviq');
    return res.json({ success: true, count: eleviqRecords.length, collection: 'eleviq', inquiries: eleviqRecords });
  }
  const records = readInquiries('all');
  const eleviqRecords = readInquiries('eleviq');
  const stcRecords = readInquiries('stc');
  return res.json({
    success: true,
    count: records.length,
    eleviqCount: eleviqRecords.length,
    stcCount: stcRecords.length,
    inquiries: records,
    collections: {
      eleviq: eleviqRecords,
      stc: stcRecords
    }
  });
});

// Serve frontend assets if production folder is built
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  console.log(`[Server] Serving production client files from: ${frontendDistPath}`);
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}

// Start Server if run directly
let serverInstance = null;
if (process.env.NODE_ENV !== 'test') {
  serverInstance = app.listen(PORT, () => {
    console.log(`[Server] CAS Backend is running on http://localhost:${PORT}`);
  });
}

export { app, serverInstance };
export default app;
