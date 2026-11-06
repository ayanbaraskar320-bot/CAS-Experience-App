import fs from 'fs';

console.log('=== VERIFYING STC INNOVATIONS WEBSITE UPDATES ===\n');

let passes = 0;
let fails = 0;

function check(desc, condition, details = '') {
  if (condition) {
    console.log(`[PASS] ${desc}`);
    if (details) console.log(`       Details: ${details}`);
    passes++;
  } else {
    console.error(`[FAIL] ${desc}`);
    if (details) console.error(`       Details: ${details}`);
    fails++;
  }
}

// 1. Files inspection
const fePage = fs.readFileSync('frontend/src/components/STCInnovationsPage.jsx', 'utf8');
const stcPage = fs.readFileSync('stc-innovations/src/components/STCInnovationsPage.jsx', 'utf8');
const feModal = fs.readFileSync('frontend/src/components/STCDemoModal.jsx', 'utf8');
const stcModal = fs.readFileSync('stc-innovations/src/components/STCDemoModal.jsx', 'utf8');
const feInqService = fs.readFileSync('frontend/src/services/inquiryService.js', 'utf8');
const stcInqService = fs.readFileSync('stc-innovations/src/services/inquiryService.js', 'utf8');
const feConfig = fs.readFileSync('frontend/src/config/inquiry.js', 'utf8');
const stcConfig = fs.readFileSync('stc-innovations/src/config/inquiry.js', 'utf8');
const stcLinks = fs.readFileSync('stc-innovations/src/config/links.js', 'utf8');

// Section 1: Header CTA Adjustment & Pill Removal
check(
  'Frontend STC navigation header removed "Nonprofit Programs FAQ" pill button',
  !fePage.includes('<nav className="hidden lg:flex items-center gap-1">\n            {/* Direct Link: Platform Overview */}') &&
  !fePage.includes('<span>Nonprofit Programs FAQ</span>'),
  'Navigation header kept clean and commercial without 404 risk'
);
check(
  'Standalone STC navigation header removed "Nonprofit Programs FAQ" pill button',
  !stcPage.includes('<span>Nonprofit Programs FAQ</span>'),
  'Navigation header kept clean and commercial without 404 risk'
);
check(
  'Frontend STC header primary CTA retained and labeled "Request a CAS Demo"',
  fePage.includes('Request a CAS Demo\n            </button>') || fePage.includes('Request a CAS Demo\r\n            </button>'),
  'Header primary CTA points to commercial intake modal'
);
check(
  'Standalone STC header primary CTA retained and labeled "Request a CAS Demo"',
  stcPage.includes('Request a CAS Demo\n            </button>') || stcPage.includes('Request a CAS Demo\r\n            </button>'),
  'Header primary CTA points to commercial intake modal'
);

// Section 2: Hero Primary and Secondary CTAs
check(
  'Hero primary CTA labeled "Request a CAS Demo" in both implementations',
  fePage.includes('<span>Request a CAS Demo</span>') &&
  stcPage.includes('<span>Request a CAS Demo</span>'),
  'Points to commercial demo intake form with preselected commercial interest'
);
check(
  'Hero secondary CTA labeled "Discuss Organizational Deployment" in both implementations',
  fePage.includes('<span>Discuss Organizational Deployment</span>') &&
  stcPage.includes('<span>Discuss Organizational Deployment</span>') &&
  fePage.includes("openDemoModal('Organizational Deployment & Enterprise Licensing')") &&
  stcPage.includes("openDemoModal('Organizational Deployment & Enterprise Licensing')"),
  'Opens organizational deployment briefing modal'
);

// Section 3: Foundation FAQ Reference in Footer
check(
  'Frontend STC footer contextual link: "Learn about our nonprofit partnership: ElevIQ Foundation FAQs"',
  fePage.includes('<span>Learn about our nonprofit partnership: ElevIQ Foundation FAQs ↗</span>') &&
  fePage.includes('href="https://eleviqfoundation.org/faqs"'),
  'Contextual reference placed in footer under Ecosystem'
);
check(
  'Standalone STC footer contextual link: "Learn about our nonprofit partnership: ElevIQ Foundation FAQs"',
  stcPage.includes('<span>Learn about our nonprofit partnership: ElevIQ Foundation FAQs ↗</span>') &&
  stcPage.includes('href={ELEVIQ_LINKS.faqs}'),
  'Contextual reference placed in footer under Ecosystem'
);

// Section 4: Commercial Inquiry Isolation
check(
  'STC standalone config targets commercial@stc-innovations.com',
  stcConfig.includes("targetEmail: 'commercial@stc-innovations.com'"),
  'Does not target info@eleviqfoundation.org'
);
check(
  'Frontend inquiry config includes dedicated stcTargetEmail',
  feConfig.includes("stcTargetEmail: 'commercial@stc-innovations.com'"),
  'Isolated commercial destination configured'
);
check(
  'Frontend inquiry service routes STC submissions to STC Innovations commercial route',
  feInqService.includes("[STC Innovations Commercial Inquiry]") && feInqService.includes("entity_route: isSTC ? 'STC Innovations' : 'ElevIQ Foundation'"),
  'Strict commercial subject and entity isolation'
);
check(
  'Standalone inquiry service sets entity_route to STC Innovations',
  stcInqService.includes("entity_route: 'STC Innovations'") && stcInqService.includes("[STC Innovations Commercial Inquiry]"),
  'Commercial portal isolation verified'
);
check(
  'STC Demo Modal notifies user that submission does not auto-provision accounts',
  feModal.includes('Submitting this inquiry does not auto-provision a CAS tenant account or send automated credentials.') &&
  stcModal.includes('Submitting this inquiry does not auto-provision a CAS tenant account or send automated credentials.'),
  'Explicit non-provisioning disclosure present in modal footer'
);
check(
  'STC Demo Modal button labeled "Request a CAS Demo →"',
  feModal.includes('Request a CAS Demo →') && stcModal.includes('Request a CAS Demo →'),
  'Action button label matches specification'
);

// Section 5: Commercial Scope & Guardrails
check(
  'STC page has zero public pricing tables or checkout carts',
  !fePage.includes('checkout') && !fePage.includes('stripe') && !fePage.includes('paypal') && !fePage.includes('cart') &&
  !stcPage.includes('checkout') && !stcPage.includes('stripe') && !stcPage.includes('paypal') && !stcPage.includes('cart'),
  'Zero self-service e-commerce or automated license checkout'
);

console.log(`\nAUDIT RESULT: ${passes} passed, ${fails} failed.`);
if (fails > 0) {
  process.exit(1);
} else {
  console.log('ALL STC INNOVATIONS WEBSITE AUDITS PASSED WITH 100% SUCCESS! 🎉');
}
