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

// Storage config
const DATA_DIR = path.join(__dirname, '../data');
const DATABASE_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Approved interest areas from Terminology / Handoff Lock
const APPROVED_INTEREST_AREAS = [
  'Participant/family information',
  'School/youth partnership',
  'Job Corps/workforce partnership',
  'Funder/donor conversation',
  'Employer/institutional CAS use',
  'CAS licensing/demo',
  'Media/speaking/general inquiry'
];

// Helper to read database
function readInquiries() {
  try {
    if (!fs.existsSync(DATABASE_FILE)) return [];
    const data = fs.readFileSync(DATABASE_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading inquiries database:', error);
    return [];
  }
}

// Helper to write database
function writeInquiry(record) {
  try {
    const list = readInquiries();
    list.push(record);
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(list, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing inquiry to database:', error);
    return false;
  }
}

// API Routes
app.post('/api/inquiry', (req, res) => {
  const { name, organization, email, phone, role, interestArea, message } = req.body;
  const errors = {};

  // Handoff Section 14 required field validations
  if (!name || !name.trim()) errors.name = 'Name is required.';
  if (!organization || !organization.trim()) errors.organization = 'Organization is required.';
  
  if (!email || !email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  
  if (!phone || !phone.trim()) {
    errors.phone = 'Phone is required.';
  } else if (phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!role || !role.trim()) errors.role = 'Role is required.';
  
  if (!interestArea || !interestArea.trim()) {
    errors.interestArea = 'Interest area is required.';
  } else if (!APPROVED_INTEREST_AREAS.includes(interestArea.trim())) {
    errors.interestArea = 'Selected interest area is invalid.';
  }

  if (!message || !message.trim()) errors.message = 'Message is required.';

  // Return validation block if invalid
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Create submission record
  const record = {
    id: `inquiry_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    submittedAt: new Date().toISOString(),
    clientIp: req.ip || req.headers['x-forwarded-for'] || 'unknown',
    data: {
      name: name.trim(),
      organization: organization.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role: role.trim(),
      interestArea: interestArea.trim(),
      message: message.trim()
    }
  };

  const success = writeInquiry(record);
  if (!success) {
    return res.status(500).json({ success: false, error: 'Database storage error.' });
  }

  console.log(`[API] Success: Recorded new inquiry from ${record.data.name} (${record.data.organization})`);

  // Exact confirmation response copy from Handoff document Section 14
  return res.status(201).json({
    success: true,
    message: 'Thank you. Our team is active and reviewing inquiries. We will follow up directly with current information.'
  });
});

// Admin-inspection API (optional, to verify storage)
app.get('/api/inquiries', (req, res) => {
  const records = readInquiries();
  return res.json({ success: true, count: records.length, inquiries: records });
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

// Start Server
app.listen(PORT, () => {
  console.log(`[Server] CAS Backend is running on http://localhost:${PORT}`);
});
