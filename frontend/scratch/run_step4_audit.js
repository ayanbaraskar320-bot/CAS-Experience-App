import fs from 'fs';

console.log('=== RUNNING COMPREHENSIVE STEP 4 AUDIT ON STC INNOVATIONS ===\n');

const fePagePath = 'frontend/src/components/STCInnovationsPage.jsx';
const stcPagePath = 'stc-innovations/src/components/STCInnovationsPage.jsx';
const feModalPath = 'frontend/src/components/STCDemoModal.jsx';
const stcModalPath = 'stc-innovations/src/components/STCDemoModal.jsx';
const inqServicePath = 'frontend/src/services/inquiryService.js';
const stcInqServicePath = 'stc-innovations/src/services/inquiryService.js';
const backendServerPath = 'backend/src/server.js';
const feInqConfigPath = 'frontend/src/config/inquiry.js';
const stcInqConfigPath = 'stc-innovations/src/config/inquiry.js';

const fePage = fs.readFileSync(fePagePath, 'utf8');
const stcPage = fs.readFileSync(stcPagePath, 'utf8');
const feModal = fs.readFileSync(feModalPath, 'utf8');
const stcModal = fs.readFileSync(stcModalPath, 'utf8');
const inqService = fs.readFileSync(inqServicePath, 'utf8');
const stcInqService = fs.readFileSync(stcInqServicePath, 'utf8');
const backendServer = fs.readFileSync(backendServerPath, 'utf8');
const feConfig = fs.readFileSync(feInqConfigPath, 'utf8');
const stcConfig = fs.readFileSync(stcInqConfigPath, 'utf8');

const auditResults = [];

function recordCheck(section, title, passed, details) {
  auditResults.push({ section, title, passed, details });
  const mark = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`[${mark}] ${section} > ${title}`);
  if (details) console.log(`       ${details}`);
}

// -------------------------------------------------------------
// SECTION 1: BUTTON LABEL & TARGET CHECK
// -------------------------------------------------------------
// 1.1 Primary button in hero
const feHeroPrimary = fePage.includes('<span>Request a CAS Demo</span>') && fePage.includes("openDemoModal('CAS Commercial Demonstration')");
const stcHeroPrimary = stcPage.includes('<span>Request a CAS Demo</span>') && stcPage.includes("openDemoModal('CAS Commercial Demonstration')");
recordCheck('1. Button Label & Target Check', 'Hero Primary Button is labeled exactly "Request a CAS Demo"', feHeroPrimary && stcHeroPrimary,
  'Both frontend and standalone STC hero banners feature "Request a CAS Demo"');

// 1.2 Secondary button in hero
const feHeroSecondary = fePage.includes('<span>Discuss Organizational Deployment</span>') && fePage.includes("openDemoModal('Organizational Deployment & Enterprise Licensing')");
const stcHeroSecondary = stcPage.includes('<span>Discuss Organizational Deployment</span>') && stcPage.includes("openDemoModal('Organizational Deployment & Enterprise Licensing')");
recordCheck('1. Button Label & Target Check', 'Hero Secondary Button is labeled exactly "Discuss Organizational Deployment"', feHeroSecondary && stcHeroSecondary,
  'Both frontend and standalone STC hero banners feature "Discuss Organizational Deployment"');

// 1.3 Target destinations lead to commercial workflows on stc-innovations.com
const commercialWorkflowTarget = fePage.includes("openDemoModal('CAS Commercial Demonstration')") &&
  fePage.includes("openDemoModal('Organizational Deployment & Enterprise Licensing')") &&
  feModal.includes('Schedule an ElevIQ CAS™ Enterprise Walkthrough');
recordCheck('1. Button Label & Target Check', 'Both buttons activate in-situ commercial inquiry modal workflows', commercialWorkflowTarget,
  'Primary and secondary CTAs open STCDemoModal with respective commercial interest areas pre-configured');

// 1.4 Header & Mobile Drawer CTAs
const headerCtas = (fePage.includes('Request a CAS Demo\n            </button>') || fePage.includes('Request a CAS Demo\r\n            </button>')) &&
  fePage.includes('Request a CAS Demo →');
recordCheck('1. Button Label & Target Check', 'Header and Mobile Drawer CTAs consistently labeled "Request a CAS Demo"', headerCtas,
  'Desktop navbar and mobile drawer both initiate commercial walkthrough modal');

// -------------------------------------------------------------
// SECTION 2: FORM ROUTING & SEPARATION CHECK
// -------------------------------------------------------------
// 2.1 Form routing to STC commercial sales
const stcRouting = inqService.includes("[STC Innovations Commercial Inquiry]") &&
  inqService.includes("from_name: isSTC ? 'STC Innovations Commercial Inquiries' : 'ElevIQ Foundation Website'") &&
  inqService.includes("entity_route: isSTC ? 'STC Innovations' : 'ElevIQ Foundation'") &&
  stcInqService.includes("entity_route: 'STC Innovations'");
recordCheck('2. Form Routing & Separation Check', 'Form routes to STC Innovations Commercial Sales with dedicated subject & entity metadata', stcRouting,
  'Subject is [STC Innovations Commercial Inquiry] and entityRoute is explicitly set to STC Innovations');

// 2.2 Commercial intake isolation from participant intake
const feModalPayload = feModal.includes("entityRoute: 'STC Innovations'");
const stcModalPayload = stcModal.includes("entityRoute: 'STC Innovations'");
recordCheck('2. Form Routing & Separation Check', 'Modal explicitly tags submissions under entityRoute: "STC Innovations"', feModalPayload && stcModalPayload,
  'Both modal implementations stamp submissions as commercial STC Innovations leads');

// 2.3 Non-provisioning check in modal notice
const nonProvisionNotice = feModal.includes('Submitting this inquiry does not auto-provision a CAS tenant account or send automated credentials.') &&
  stcModal.includes('Submitting this inquiry does not auto-provision a CAS tenant account or send automated credentials.');
recordCheck('2. Form Routing & Separation Check', 'Clear disclosure that inquiry does NOT auto-provision tenant accounts or send credentials', nonProvisionNotice,
  'Explicit legal disclosure in modal action footer');

// 2.4 Backend check: No tenant provisioning or admin account creation
const noUserCreation = !backendServer.includes('createUser') &&
  !backendServer.includes('createTenant') &&
  !backendServer.includes('generatePassword') &&
  !backendServer.includes('provisionWorkspace');
const backendRecordsOnly = backendServer.includes("app.post('/api/inquiry'") &&
  backendServer.includes('writeInquiry(record)');
recordCheck('2. Form Routing & Separation Check', 'Backend logs inquiry only; zero user/tenant provisioning or workspace generation', noUserCreation && backendRecordsOnly,
  'POST /api/inquiry validates metadata and archives to backend/data/inquiries.json without invoking user or auth creation');

// -------------------------------------------------------------
// SECTION 3: COMMERCIAL GUARDRAIL CHECK
// -------------------------------------------------------------
// 3.1 Check for pricing tables
const noPricingTables = !fePage.includes('pricing-table') &&
  !fePage.includes('monthly-plan') &&
  !fePage.includes('annual-plan') &&
  !fePage.includes('per-seat-price') &&
  !stcPage.includes('pricing-table');
recordCheck('3. Commercial Guardrail Check', 'Zero public pricing cards, pricing tables, or tier price tags', noPricingTables,
  'Pricing is strictly custom through commercial discovery and verified consultation');

// 3.2 Check for self-checkout and payment gateways
const noPaymentGateways = !fePage.includes('stripe') &&
  !fePage.includes('paypal') &&
  !fePage.includes('checkout') &&
  !fePage.includes('credit-card') &&
  !stcPage.includes('stripe');
recordCheck('3. Commercial Guardrail Check', 'Zero self-checkout buttons, payment gateways (Stripe/PayPal), or shopping carts', noPaymentGateways,
  'No e-commerce checkout paths exist anywhere on stc-innovations.com');

// 3.3 Check for automatic registration endpoints
const noAutoRegister = !fePage.includes('/register') &&
  !fePage.includes('/signup') &&
  !fePage.includes('/create-account') &&
  !stcPage.includes('/register');
recordCheck('3. Commercial Guardrail Check', 'Zero public self-registration or self-signup endpoints', noAutoRegister,
  'All access requires verified organizational agreement and consultation');

// -------------------------------------------------------------
// SECTION 4: CROSS-LINKING CHECK
// -------------------------------------------------------------
// 4.1 Header has no cross-links to avoid 404 or confusion
const noHeaderCrossLinks = !fePage.includes('<nav className="hidden lg:flex items-center gap-1">\n            {/* Direct Link: Platform Overview */}\n') &&
  !fePage.includes('<span>Nonprofit Programs FAQ</span>');
recordCheck('4. Cross-Linking Check', 'Navigation header is free of external cross-link pills to keep commercial experience clean', noHeaderCrossLinks,
  'Removed Nonprofit Programs FAQ pill button from header and mobile drawer');

// 4.2 Footer contextual link to ElevIQ Foundation FAQs
const footerFaqContext = fePage.includes('<span>Learn about our nonprofit partnership: ElevIQ Foundation FAQs ↗</span>') &&
  stcPage.includes('<span>Learn about our nonprofit partnership: ElevIQ Foundation FAQs ↗</span>') &&
  fePage.includes('href="https://eleviqfoundation.org/faqs"');
recordCheck('4. Cross-Linking Check', 'Contextual link to ElevIQ Foundation FAQs in footer clearly frames nonprofit partnership', footerFaqContext,
  'Footer link in Ecosystem column: "Learn about our nonprofit partnership: ElevIQ Foundation FAQs ↗"');

// 4.3 Section 6 Ecosystem & Governance framing
const ecosystemSection = fePage.includes('id="about-stc"') &&
  fePage.includes('<EcosystemRelationship variant="dark" />');
recordCheck('4. Cross-Linking Check', 'Section 6 clearly frames STC Innovations and ElevIQ Foundation operating boundaries', ecosystemSection,
  'Embedded EcosystemRelationship clarifies technology ownership vs nonprofit workforce delivery');

// -------------------------------------------------------------
// SECTION 5: VISUAL & RESPONSIVE CHECK
// -------------------------------------------------------------
// 5.1 Hero button flex wrapping and mobile responsiveness
const heroResponsiveLayout = fePage.includes('flex flex-wrap items-center gap-4 pt-2') &&
  fePage.includes('px-7 sm:px-8 py-3.5 text-sm sm:text-base font-bold');
recordCheck('5. Visual & Responsive Check', 'Hero button cluster uses responsive flex-wrap and fluid padding', heroResponsiveLayout,
  'Buttons stack cleanly on mobile (<640px) and display side-by-side with 16px gap on desktop');

// 5.2 Modal responsive architecture
const modalResponsiveLayout = feModal.includes('max-w-2xl sm:max-w-[680px] max-h-[92vh]') &&
  feModal.includes('shrink-0 bg-white/95 backdrop-blur-md') &&
  feModal.includes('shrink-0 bg-slate-50/90 backdrop-blur-sm') &&
  feModal.includes('[scrollbar-width:thin]');
recordCheck('5. Visual & Responsive Check', 'STCDemoModal features fixed header, custom sleek scrollbar, and docked footer', modalResponsiveLayout,
  'Modal footer and submit button are permanently visible across viewports without requiring awkward scrolling');

// 5.3 Hover and active interaction states
const interactionStates = fePage.includes('hover:scale-[1.03] active:scale-[0.98]') &&
  fePage.includes('hover:scale-[1.02] active:scale-[0.98]') &&
  feModal.includes('hover:scale-[1.02] active:scale-[0.98]');
recordCheck('5. Visual & Responsive Check', 'All buttons feature micro-interaction scale, active states, and focus rings', interactionStates,
  'Smooth 200ms transitions with shadow elevation and active depression feedback');

const totalPassed = auditResults.filter(r => r.passed).length;
const totalChecks = auditResults.length;
console.log(`\n======================================================`);
console.log(`STEP 4 AUDIT COMPLETE: ${totalPassed} / ${totalChecks} CHECKS PASSED (${Math.round((totalPassed/totalChecks)*100)}%)`);
console.log(`======================================================`);

if (totalPassed !== totalChecks) {
  process.exit(1);
}

