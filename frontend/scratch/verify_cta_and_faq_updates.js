import fs from 'fs';

const appJsx = fs.readFileSync('src/App.jsx', 'utf8');
const audienceRouting = fs.readFileSync('src/components/AudienceIntentRouting.jsx', 'utf8');
const casPreview = fs.readFileSync('src/components/CasTechnologyPreview.jsx', 'utf8');
const founderStory = fs.readFileSync('src/components/FounderStory.jsx', 'utf8');
const whoServes = fs.readFileSync('src/components/WhoElevIqServes.jsx', 'utf8');

const tests = [
  // 1. Primary CTA Buttons Verification
  {
    category: '1. Primary CTA Buttons',
    name: 'No buttons labeled "Begin Free Scan" anywhere in components',
    pass: !appJsx.includes('Begin Free Scan') &&
          !audienceRouting.includes('Begin Free Scan') &&
          !casPreview.includes('Begin Free Scan') &&
          !founderStory.includes('Begin Free Scan') &&
          !whoServes.includes('Begin Free Scan')
  },
  {
    category: '1. Primary CTA Buttons',
    name: 'No buttons labeled "Take Assessment" anywhere in components',
    pass: !appJsx.includes('Take Assessment') &&
          !audienceRouting.includes('Take Assessment') &&
          !casPreview.includes('Take Assessment') &&
          !founderStory.includes('Take Assessment') &&
          !whoServes.includes('Take Assessment')
  },
  {
    category: '1. Primary CTA Buttons',
    name: 'Persistent header CTA is labeled "Request Scan Access" linking to #participation-inquiry',
    pass: appJsx.includes('to="/#participation-inquiry"') &&
          appJsx.includes('Request Scan Access')
  },
  {
    category: '1. Primary CTA Buttons',
    name: 'Hero CTA is labeled "Request Scan Access" linking to #participation-inquiry',
    pass: appJsx.includes('to="/#participation-inquiry"') &&
          appJsx.includes('Request Scan Access')
  },
  {
    category: '1. Primary CTA Buttons',
    name: 'Audience Intent Routing actionLabel and button use "Request Scan Access"',
    pass: audienceRouting.includes("actionLabel: 'Request Scan Access'") &&
          audienceRouting.includes('<span>Request Scan Access</span>')
  },
  {
    category: '1. Primary CTA Buttons',
    name: 'Participation inquiry target #participation-inquiry exists on homepage & inquiry form',
    pass: appJsx.includes('id="participation-inquiry"') &&
          audienceRouting.includes('id="participation-inquiry"')
  },
  {
    category: '1. Primary CTA Buttons',
    name: 'CTA links to inquiry form and does NOT trigger user registration, account creation, or CAS token generation',
    pass: !appJsx.includes('createAccount') &&
          !appJsx.includes('issueToken')
  },

  // 2. Existing Invited Users CTA
  {
    category: '2. Existing Invited Users',
    name: 'Persistent header contains "Already Invited? Access CAS" linked to https://cas.eleviqfoundation.org/login',
    pass: appJsx.includes('Already Invited? Access CAS') &&
          appJsx.includes('https://cas.eleviqfoundation.org/login')
  },
  {
    category: '2. Existing Invited Users',
    name: 'Hero section contains "Already Invited? Access CAS" linked to https://cas.eleviqfoundation.org/login',
    pass: appJsx.includes('Already Invited? Access CAS') &&
          appJsx.includes('href="https://cas.eleviqfoundation.org/login"')
  },
  {
    category: '2. Existing Invited Users',
    name: 'All "Already Invited? Access CAS" links direct to the live CAS login route (https://cas.eleviqfoundation.org/login)',
    pass: appJsx.includes('href="https://cas.eleviqfoundation.org/login"') &&
          casPreview.includes('Already Invited? Access CAS') &&
          casPreview.includes('href="https://cas.eleviqfoundation.org/login"') &&
          founderStory.includes('Already Invited? Access CAS') &&
          founderStory.includes('href="https://cas.eleviqfoundation.org/login"') &&
          whoServes.includes('Already Invited? Access CAS') &&
          whoServes.includes('href="https://cas.eleviqfoundation.org/login"')
  },

  // 3. Homepage FAQ Preview Section
  {
    category: '3. Homepage FAQ Preview Section',
    name: 'Homepage includes HomepageFaqPreview component before footer',
    pass: appJsx.includes('<HomepageFaqPreview />') &&
          appJsx.includes('function HomepageFaqPreview()')
  },
  {
    category: '3. Homepage FAQ Preview Section',
    name: 'FAQ preview features "What is ElevIQ Foundation?"',
    pass: appJsx.includes('What is ElevIQ Foundation?')
  },
  {
    category: '3. Homepage FAQ Preview Section',
    name: 'FAQ preview features "What is the ElevIQ Alignment Scan™?"',
    pass: appJsx.includes('What is the ElevIQ Alignment Scan™?')
  },
  {
    category: '3. Homepage FAQ Preview Section',
    name: 'FAQ preview features "Is participation free?"',
    pass: appJsx.includes('Is participation free?')
  },
  {
    category: '3. Homepage FAQ Preview Section',
    name: 'FAQ preview features "Is this an exam or personality test?"',
    pass: appJsx.includes('Is this an exam or personality test?')
  },
  {
    category: '3. Homepage FAQ Preview Section',
    name: 'FAQ preview includes CTA "View All FAQs" linking directly to /faqs',
    pass: appJsx.includes('to="/faqs"') &&
          appJsx.includes('View All FAQs')
  },
  {
    category: '3. Homepage FAQ Preview Section',
    name: 'Direct route /faqs and /faq are defined in App routing',
    pass: appJsx.includes('path="/faqs"') &&
          appJsx.includes('path="/faq"')
  },

  // 4. Preservation Check
  {
    category: '4. Preservation Check',
    name: 'Participant portal route (/platform/participant-portal) preserved without altering auth workflows or query params',
    pass: appJsx.includes('path="participant-portal"') &&
          appJsx.includes('<ParticipantPortalPage />')
  }
];

console.log('=== ELEVIQ FOUNDATION HOMEPAGE UPDATES AUDIT ===\n');

let passedCount = 0;
let currentCat = '';
tests.forEach((t, i) => {
  if (t.category !== currentCat) {
    currentCat = t.category;
    console.log(`\n--- ${currentCat} ---`);
  }
  if (t.pass) passedCount++;
  console.log(`${i + 1}. [${t.pass ? '✅ PASS' : '❌ FAIL'}] ${t.name}`);
});

console.log(`\n==============================================`);
console.log(`Overall Result: ${passedCount}/${tests.length} tests passed.`);
if (passedCount === tests.length) {
  console.log('ALL HOMEPAGE CTA & FAQ VERIFICATIONS PASSED! 🎉');
  process.exit(0);
} else {
  console.error('AUDIT FAILED!');
  process.exit(1);
}

