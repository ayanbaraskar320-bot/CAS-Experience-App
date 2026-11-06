import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const appPath = path.join(rootDir, 'src', 'App.jsx');
const whoPath = path.join(rootDir, 'src', 'components', 'WhoElevIqServes.jsx');
const intentPath = path.join(rootDir, 'src', 'components', 'AudienceIntentRouting.jsx');
const inquiryServicePath = path.join(rootDir, 'src', 'services', 'inquiryService.js');

const appSrc = fs.readFileSync(appPath, 'utf8');
const whoSrc = fs.readFileSync(whoPath, 'utf8');
const intentSrc = fs.readFileSync(intentPath, 'utf8');
const serviceSrc = fs.readFileSync(inquiryServicePath, 'utf8');

const checks = [];

function check(name, pass, details = '') {
  checks.push({ name, pass, details });
  const status = pass ? '✓ PASS' : '✗ FAIL';
  console.log(`${status}: ${name}`);
  if (details && !pass) console.log(`   ${details}`);
}

console.log('\n=== ELEVIQ FOUNDATION: INDIVIDUALS PAGE VERIFICATION ===\n');

// Requirement 1: Participation Disclosure Copy
const disclosureCopy = "The ElevIQ Alignment Scan™ is available at no charge to eligible participants through approved invitations and participating initiatives. Because access is currently coordinated, completing an inquiry does not automatically enroll you or guarantee an invitation.";

check(
  '1.1 Disclosure copy exists in WhoElevIqServes.jsx',
  whoSrc.includes(disclosureCopy),
  'Exact copy missing or modified in WhoElevIqServes.jsx'
);

check(
  '1.2 Disclosure copy exists in IndividualsHome (App.jsx)',
  appSrc.includes(disclosureCopy),
  'Exact copy missing or modified in IndividualsHome hero'
);

// Requirement 2: Primary CTA Button
check(
  '2.1 Primary CTA label in WhoElevIqServes.jsx is "Request an Invitation"',
  whoSrc.includes('Request an Invitation'),
  'Button label "Request an Invitation" not found in WhoElevIqServes.jsx'
);

check(
  '2.2 Primary CTA in WhoElevIqServes.jsx targets #participation-inquiry',
  (whoSrc.includes('to="/#participation-inquiry"') || whoSrc.includes('to="/individuals#participation-inquiry"') || whoSrc.includes('href="#participation-inquiry"')) && whoSrc.includes("getElementById('participation-inquiry')"),
  'Target #participation-inquiry or smooth scroll handler missing in WhoElevIqServes.jsx'
);

check(
  '2.3 Primary CTA in IndividualsHome hero is "Request an Invitation"',
  appSrc.includes('Request an Invitation'),
  'Button label "Request an Invitation" not found in IndividualsHome'
);

check(
  '2.4 Primary CTA does not trigger self-registration or token generation',
  !whoSrc.includes('/register') && !whoSrc.includes('/api/auth/register') && !whoSrc.includes('generateToken'),
  'Found potential self-registration call in WhoElevIqServes.jsx'
);

// Requirement 3: Form Submission Handling
const exactConfirmationMsg = "Thank you for your interest in ElevIQ Foundation. We've received your inquiry. Our team will review available participation opportunities and contact you if an appropriate opportunity is available.";

check(
  '3.1 Exact confirmation message exists in AudienceIntentRouting.jsx',
  intentSrc.includes(exactConfirmationMsg),
  'Exact confirmation message not found in AudienceIntentRouting.jsx'
);

check(
  '3.2 Return Home button has solid high-contrast font styling (!text-slate-950, font-bold, dark color)',
  intentSrc.includes('Return Home') && (intentSrc.includes('!text-slate-950') || intentSrc.includes('#020617')),
  'Return Home button styling should ensure dark readable text on cyan background'
);

check(
  '3.3 Form submission does not auto-create CAS user or account',
  !serviceSrc.includes('/api/users') && !serviceSrc.includes('/api/register') && !serviceSrc.includes('createAccount'),
  'Inquiry service should only dispatch inquiry notification, not create users'
);

check(
  '3.4 Participation inquiry section properly anchored on site (#participation-inquiry)',
  appSrc.includes('id="participation-inquiry"'),
  'Inquiry form section missing on site'
);

// Requirement 4: Existing Invited Participants
check(
  '4.1 "Already Invited? Access CAS" CTA in WhoElevIqServes.jsx',
  whoSrc.includes('Already Invited? Access CAS'),
  '"Already Invited? Access CAS" label missing in WhoElevIqServes.jsx'
);

check(
  '4.2 "Already Invited? Access CAS" points to https://cas.eleviqfoundation.org/login in WhoElevIqServes.jsx',
  whoSrc.includes('href="https://cas.eleviqfoundation.org/login"'),
  'Secondary CTA destination must be https://cas.eleviqfoundation.org/login'
);

check(
  '4.3 "Already Invited? Access CAS" CTA in IndividualsHome hero',
  appSrc.includes('Already Invited? Access CAS') && appSrc.includes('href="https://cas.eleviqfoundation.org/login"'),
  'Secondary CTA in IndividualsHome must point to https://cas.eleviqfoundation.org/login'
);

// Requirement 5: Visual Alignment & Preservation
check(
  '5.1 Both primary CTA and secondary link are styled with clear separation',
  whoSrc.includes('rounded-full bg-[#00D2FF]') && whoSrc.includes('border-cyan-400/40 bg-cyan-950/40'),
  'Distinct styling for primary and secondary CTAs missing in WhoElevIqServes.jsx'
);

check(
  '5.2 Existing homepage CTAs remain intact ("Request Scan Access")',
  appSrc.includes('title="Request Scan Access"') && appSrc.includes('Request Scan Access'),
  'Homepage primary CTA should remain preserved'
);

const total = checks.length;
const passed = checks.filter(c => c.pass).length;
console.log(`\nResults: ${passed}/${total} passed (${Math.round((passed / total) * 100)}%)\n`);

if (passed === total) {
  process.exit(0);
} else {
  process.exit(1);
}

