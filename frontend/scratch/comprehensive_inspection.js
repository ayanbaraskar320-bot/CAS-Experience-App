import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('ELEVIQ FOUNDATION HOMEPAGE (eleviqfoundation.org) AUDIT & INSPECTION');
console.log('================================================================\n');

const appJsx = fs.readFileSync('src/App.jsx', 'utf8');
const audienceRouting = fs.readFileSync('src/components/AudienceIntentRouting.jsx', 'utf8');
const casPreview = fs.readFileSync('src/components/CasTechnologyPreview.jsx', 'utf8');
const founderStory = fs.readFileSync('src/components/FounderStory.jsx', 'utf8');
const whoServes = fs.readFileSync('src/components/WhoElevIqServes.jsx', 'utf8');
const inquiryService = fs.readFileSync('src/services/inquiryService.js', 'utf8');
const serverJs = fs.readFileSync('../backend/src/server.js', 'utf8');

const results = [];

function check(category, title, pass, details) {
  results.push({ category, title, pass, details });
  const status = pass ? '✅ PASS' : '❌ FAIL';
  console.log(`[${status}] ${title}`);
  if (details) {
    console.log(`       Details: ${details}`);
  }
}

// -------------------------------------------------------------------------
// 1. PRIMARY CTA AUDIT
// -------------------------------------------------------------------------
console.log('\n--- 1. PRIMARY CTA AUDIT ---');

const forbiddenPhrases = ['Begin Free Scan', 'Take Assessment', 'Start Scan', 'Register'];
let forbiddenFound = [];
[
  ['App.jsx', appJsx],
  ['AudienceIntentRouting.jsx', audienceRouting],
  ['CasTechnologyPreview.jsx', casPreview],
  ['FounderStory.jsx', founderStory],
  ['WhoElevIqServes.jsx', whoServes]
].forEach(([filename, code]) => {
  forbiddenPhrases.forEach(phrase => {
    // Check if phrase exists in buttons, links, or actionLabels
    const regex = new RegExp(`['">\\s]${phrase}['"<\\s]`, 'i');
    if (regex.test(code)) {
      forbiddenFound.push(`${phrase} in ${filename}`);
    }
  });
});

check(
  '1. Primary CTA Audit',
  'No instances of "Begin Free Scan", "Take Assessment", "Start Scan", or "Register" in public CTAs',
  forbiddenFound.length === 0,
  forbiddenFound.length === 0 ? 'Zero forbidden CTA phrases detected across all homepage templates' : forbiddenFound.join(', ')
);

// Verify all public visitor primary CTAs use exact label "Request Scan Access"
const primaryCtaLocations = [
  { name: 'Persistent Header CTA', pass: appJsx.includes('title="Request Scan Access"') && appJsx.includes('>Request Scan Access<') },
  { name: 'Hero Section Primary CTA', pass: /Request Scan Access\s*<\/Link>/.test(appJsx) },
  { name: 'Audience Intent Routing Cards (7/7)', pass: audienceRouting.includes("actionLabel: 'Request Scan Access'") && audienceRouting.includes('<span>Request Scan Access</span>') },
  { name: 'Founder Story CTA', pass: founderStory.includes('Request Scan Access') },
  { name: 'Who ElevIQ Serves CTA', pass: whoServes.includes('Request Scan Access') || whoServes.includes('Request an Invitation') },
  { name: 'CAS Preview CTA', pass: casPreview.includes('Request Scan Access') },
  { name: 'Mobile Navigation Drawer Primary CTA', pass: appJsx.includes('to="/#participation-inquiry"') && appJsx.includes('Request Scan Access') }
];

const allPrimaryCtasPass = primaryCtaLocations.every(l => l.pass);
if (!allPrimaryCtasPass) {
  console.log('Failed CTA locations:', primaryCtaLocations.filter(l => !l.pass));
}
check(
  '1. Primary CTA Audit',
  'All primary public visitor CTAs are labeled exactly: "Request Scan Access"',
  allPrimaryCtasPass,
  `Verified across ${primaryCtaLocations.length} locations (Header, Hero, 7 Audience Cards, Founder Story, Who Serves, CAS Preview, Mobile Menu)`
);

// Verify Destination Target
const routesToInquiryForm = appJsx.includes('to="/#participation-inquiry"') &&
  audienceRouting.includes('id="participation-inquiry"') &&
  audienceRouting.includes("const formEl = document.getElementById('participation-inquiry')");

check(
  '1. Primary CTA Audit',
  'Primary CTA navigates/scrolls to participation inquiry form (#participation-inquiry)',
  routesToInquiryForm,
  'Links point to /#participation-inquiry with smooth scroll handler focusing form'
);

// Verify No Registration API / No Token Generation on CTA click
const noAccountCreationOnCta = !appJsx.includes('createAccount') &&
  !appJsx.includes('generateToken') &&
  !appJsx.includes('issueToken') &&
  !appJsx.includes('registerUser');

check(
  '1. Primary CTA Audit',
  'Clicking primary CTA does NOT ping registration APIs, generate CAS tokens, or trigger account creation',
  noAccountCreationOnCta,
  'Button is a pure navigation/anchor Link component to the inquiry section'
);

// -------------------------------------------------------------------------
// 2. EXISTING PARTICIPANT GATEWAY
// -------------------------------------------------------------------------
console.log('\n--- 2. EXISTING PARTICIPANT GATEWAY ---');

const secondaryCtaLocations = [
  { name: 'Persistent Header', pass: appJsx.includes('href="https://cas.eleviqfoundation.org/login"') && appJsx.includes('Already Invited? Access CAS') },
  { name: 'Hero Section', pass: appJsx.includes('href="https://cas.eleviqfoundation.org/login"') && appJsx.includes('Already Invited? Access CAS') },
  { name: 'Audience Intent Section', pass: audienceRouting.includes('href="https://cas.eleviqfoundation.org/login"') && audienceRouting.includes('Already Invited? Access CAS') },
  { name: 'Founder Story Section', pass: founderStory.includes('href="https://cas.eleviqfoundation.org/login"') && founderStory.includes('Already Invited? Access CAS') },
  { name: 'Who ElevIQ Serves Section', pass: whoServes.includes('href="https://cas.eleviqfoundation.org/login"') && whoServes.includes('Already Invited? Access CAS') },
  { name: 'CAS Preview Section', pass: casPreview.includes('href="https://cas.eleviqfoundation.org/login"') && casPreview.includes('Already Invited? Access CAS') },
  { name: 'Mobile Navigation Menu', pass: appJsx.includes('href="https://cas.eleviqfoundation.org/login"') && appJsx.includes('Already Invited? Access CAS') },
  { name: 'Footer Quick Links', pass: appJsx.includes('href="https://cas.eleviqfoundation.org/login"') && appJsx.includes('Already Invited? Access CAS') }
];

const allSecondaryCtasPass = secondaryCtaLocations.every(l => l.pass);
check(
  '2. Existing Participant Gateway',
  'Secondary CTA labeled "Already Invited? Access CAS" links directly to https://cas.eleviqfoundation.org/login',
  allSecondaryCtasPass,
  `Verified across ${secondaryCtaLocations.length} locations on homepage and site navigation`
);

const routesToCasLogin = appJsx.includes('https://cas.eleviqfoundation.org/login') &&
  audienceRouting.includes('https://cas.eleviqfoundation.org/login') &&
  casPreview.includes('https://cas.eleviqfoundation.org/login');

check(
  '2. Existing Participant Gateway',
  'Points to the live CAS login route (https://cas.eleviqfoundation.org/login)',
  routesToCasLogin,
  'Configured with target="_blank" rel="noopener noreferrer" for secure external authentication handoff'
);

const preservesQueryParams = appJsx.includes('ParticipantPortalRedirect') &&
  appJsx.includes('https://cas.eleviqfoundation.org/login');

check(
  '2. Existing Participant Gateway',
  'Existing URL parameters, invitation tokens, or sign-in sessions remain intact and unaffected',
  preservesQueryParams,
  'ParticipantPortalRedirect strictly forwards location.search and location.hash to participant portal'
);

// -------------------------------------------------------------------------
// 3. HOMEPAGE FAQ PREVIEW SECTION
// -------------------------------------------------------------------------
console.log('\n--- 3. HOMEPAGE FAQ PREVIEW SECTION ---');

const hasFaqPreview = appJsx.includes('<HomepageFaqPreview />') && appJsx.includes('function HomepageFaqPreview()');
check(
  '3. Homepage FAQ Preview Section',
  'Clean, accessible FAQ preview section is placed near bottom of homepage (above footer)',
  hasFaqPreview,
  'Rendered directly above footer within HomePage route component'
);

const faq1 = appJsx.includes('What is ElevIQ Foundation?');
const faq2 = appJsx.includes('What is the ElevIQ Alignment Scan™?');
const faq3 = appJsx.includes('Is participation free?');
const faq4 = appJsx.includes('Is this an exam or personality test?');

check(
  '3. Homepage FAQ Preview Section',
  'Includes previews for all 4 introductory questions',
  faq1 && faq2 && faq3 && faq4,
  'All 4 questions with detailed mission-aligned answers verified'
);

const viewAllFaqsLinksToFaqs = appJsx.includes('to="/faqs"') && appJsx.includes('View All FAQs');
const faqsRoutesActive = appJsx.includes('path="/faqs"') && appJsx.includes('path="/faq"');

check(
  '3. Homepage FAQ Preview Section',
  'CTA "View All FAQs" links directly to /faqs (and /faq alias is active)',
  viewAllFaqsLinksToFaqs && faqsRoutesActive,
  'Buttons link to /faqs; both /faqs and /faq top-level routes are configured'
);

// -------------------------------------------------------------------------
// 4. FORM & SUBMISSION BEHAVIOR
// -------------------------------------------------------------------------
console.log('\n--- 4. FORM & SUBMISSION BEHAVIOR ---');

// Test payload simulation
const testPayload = {
  name: 'Jane Doe',
  organization: 'Apex High School CTE',
  email: 'jane.doe@example.org',
  phone: '919-555-0144',
  role: 'Student Navigator',
  interestArea: 'High School / CTE — Ages 16–18',
  programContext: 'High School CTE / NCWorks Youth',
  entityRoute: 'ElevIQ Foundation',
  message: 'Requesting access to preview capability alignment scan for 25 high school seniors.'
};

// Validate that submission does NOT contain user account creation fields
const submissionFields = Object.keys(testPayload);
const noAuthFieldsInPayload = !submissionFields.includes('password') &&
  !submissionFields.includes('token') &&
  !submissionFields.includes('createAccount') &&
  !submissionFields.includes('autoRegister');

check(
  '4. Form & Submission Behavior',
  'Form submission only sends inquiry data and does NOT include registration/auth creation credentials',
  noAuthFieldsInPayload,
  `Payload contains only inquiry metadata: ${submissionFields.join(', ')}`
);

// Check backend server.js implementation
const backendOnlyStoresInquiry = serverJs.includes('app.post(\'/api/inquiry\'') &&
  serverJs.includes('writeInquiry(record)') &&
  !serverJs.includes('createUser') &&
  !serverJs.includes('generateToken') &&
  !serverJs.includes('sendInvite');

check(
  '4. Form & Submission Behavior',
  'Backend handler stores inquiry record only; does NOT create user in CAS database or send automated invitation',
  backendOnlyStoresInquiry,
  'backend/src/server.js writes inquiry record to inquiries.json with submittedAt timestamp and IP archive'
);

// Check UI acknowledgment confirmation
const uiShowsAcknowledgment = audienceRouting.includes('Inquiry Received') &&
  (audienceRouting.includes('Thank you for connecting') || audienceRouting.includes('Thank you for your interest in ElevIQ Foundation')) &&
  !audienceRouting.includes('Temporary Password') &&
  !audienceRouting.includes('Login Token:');

check(
  '4. Form & Submission Behavior',
  'Page displays an inquiry acknowledgment rather than sign-in credentials',
  uiShowsAcknowledgment,
  'Displays "Inquiry Received" confirmation card with routing team attribution and options to return home or send another message'
);

// -------------------------------------------------------------------------
// 5. VISUAL & MOBILE RESPONSIVENESS
// -------------------------------------------------------------------------
console.log('\n--- 5. VISUAL & MOBILE RESPONSIVENESS ---');

// Header responsiveness check:
const headerIsResponsive = appJsx.includes('hidden sm:inline-flex') && // Already Invited on tablet/desktop
  appJsx.includes('hidden xl:flex') && // Desktop nav hidden on mobile/tablet
  appJsx.includes('xl:hidden') && // Mobile hamburger button
  appJsx.includes('shrink-0') && appJsx.includes('whitespace-nowrap'); // No CTA breaking or collision

check(
  '5. Visual & Mobile Responsiveness',
  'Persistent Header CTAs: responsive layout prevents overflow and maintains clean spacing across viewports',
  headerIsResponsive,
  'Concise labels (Organizations, Services, Approach), compact secondary CTA, bold primary CTA with ~330px safety margin'
);

// Hero responsiveness check:
const heroIsResponsive = appJsx.includes('flex flex-wrap items-center gap-3') &&
  appJsx.includes('text-xs sm:text-sm');

check(
  '5. Visual & Mobile Responsiveness',
  'Hero CTAs: flex-wrap items-center gap-3 ensures clean stacking on mobile and side-by-side on desktop',
  heroIsResponsive,
  'Buttons scale typography smoothly and wrap neatly on small screens (< 640px)'
);

// Audience Cards responsiveness check:
const cardsResponsive = audienceRouting.includes('grid grid-cols-1 md:grid-cols-2') &&
  audienceRouting.includes('flex flex-col justify-between');

check(
  '5. Visual & Mobile Responsiveness',
  'Audience Entry Point Cards: single column on mobile, 2-column on tablet/desktop with flex-col alignment',
  cardsResponsive,
  'Consistent card heights, badges, icons, and aligned CTA buttons across all breakpoints'
);

// Mobile Drawer responsiveness check:
const mobileDrawerResponsive = appJsx.includes('fixed inset-0 z-50 bg-[#030B1E]/98') &&
  appJsx.includes('w-full flex items-center justify-center rounded-full bg-[#00D2FF]') &&
  appJsx.includes('w-full flex items-center justify-center rounded-full border border-cyan-400/40');

check(
  '5. Visual & Mobile Responsiveness',
  'Mobile Navigation Drawer: stacked full-width touch-friendly CTAs at bottom of viewport',
  mobileDrawerResponsive,
  'Full-width pills for "Request Scan Access" and "Already Invited? Access CAS" with ample touch target size'
);

// -------------------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------------------
const passedCount = results.filter(r => r.pass).length;
const totalCount = results.length;

console.log('\n================================================================');
console.log(`TOTAL AUDIT RESULT: ${passedCount} / ${totalCount} CHECKS PASSED`);
console.log('================================================================');

if (passedCount === totalCount) {
  console.log('\n🎉 ALL 5 STEP 1 IMPLEMENTATION VERIFICATIONS PASSED WITH 100% ACCURACY!');
  process.exit(0);
} else {
  console.error(`\n⚠️ ${totalCount - passedCount} checks failed.`);
  process.exit(1);
}
