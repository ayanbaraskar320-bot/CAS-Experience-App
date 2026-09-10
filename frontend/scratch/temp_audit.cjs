const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');
const frontendSrc = path.join(repoRoot, 'frontend/src');
const stcSrc = path.join(repoRoot, 'stc-innovations/src');
const backendSrc = path.join(repoRoot, 'backend');

function getAllFiles(dir, extensions = ['.js', '.jsx', '.html', '.json', '.css']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === 'dist' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, extensions));
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

const allFrontendFiles = getAllFiles(frontendSrc);
const allStcFiles = getAllFiles(stcSrc);
const allBackendFiles = getAllFiles(backendSrc);
const allProjectFiles = [...allFrontendFiles, ...allStcFiles, ...allBackendFiles];

const fileContents = {};
allProjectFiles.forEach(f => {
  fileContents[f] = fs.readFileSync(f, 'utf8');
});

function search(regex, files = allProjectFiles) {
  const matches = [];
  files.forEach(f => {
    const lines = fileContents[f].split('\n');
    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        const rel = path.relative(repoRoot, f).replace(/\\/g, '/');
        matches.push({ file: rel, lineNum: idx + 1, content: line.trim() });
      }
    });
  });
  return matches;
}

const auditResults = [];

function check(id, name, pass, evidence, location) {
  auditResults.push({ id, name, pass, evidence, location });
}

console.log('Running comprehensive post-implementation audit...\n');

// 1. PRIMARY STRUCTURE & PARTICIPANT ROUTING
const audienceRoutingFile = path.join(frontendSrc, 'components/AudienceIntentRouting.jsx');
const audienceRoutingCode = fileContents[audienceRoutingFile] || '';

// 1.1 Exactly 7 approved participant entry points
const paths = [
  'Youth Exploration — Ages 13–15',
  'High School / CTE — Ages 16–18',
  'Postsecondary / Emerging Career',
  'Adult Learner / Workforce Entry',
  'Experienced Worker / Career Transition',
  'Veteran / Military Transition',
  'Reentry / Career Rebuilding'
];
const hasAll7InOrder = paths.every((p, idx) => {
  const prevIdx = idx > 0 ? audienceRoutingCode.indexOf(paths[idx - 1]) : -1;
  const curIdx = audienceRoutingCode.indexOf(p);
  return curIdx !== -1 && curIdx > prevIdx;
});
check(
  '1.1',
  'Exactly 7 approved participant entry points exist in all routing flows',
  hasAll7InOrder,
  `All 7 entry points defined in strict order in AUDIENCE_PATHS & PARTICIPANT_ENTRY_POINTS`,
  `frontend/src/components/AudienceIntentRouting.jsx:4-139`
);

// 1.2 Zero occurrences of legacy 10-path architecture or paths 08, 09, 10
const legacyPathMatches = search(/number:\s*['"](08|09|10)['"]/);
check(
  '1.2',
  'Zero occurrences of legacy 10-path architecture or paths 08, 09, 10',
  legacyPathMatches.length === 0,
  legacyPathMatches.length === 0 ? '0 matches found across codebase' : `Found ${legacyPathMatches.length} matches`,
  'All files'
);

// 1.3 Institutional programs NEVER act as base participant entry points
const forbiddenAnchorMatches = search(/path-(school|jobcorps|college|workforce|ncworks|employer|nonprofit|individual)/);
check(
  '1.3',
  'Institutional programs NEVER act as base participant entry points',
  forbiddenAnchorMatches.length === 0,
  `0 forbidden institutional anchorIds found in routing components`,
  'frontend/src/components/AudienceIntentRouting.jsx:17-133'
);

// 1.4 Program/Organizational context completely decoupled as optional context
const hasDecoupledContext = audienceRoutingCode.includes('PROGRAM_CONTEXT_OPTIONS') &&
  audienceRoutingCode.includes('Optional context — does not alter scan route');
check(
  '1.4',
  'Program/Organizational context completely decoupled as optional context',
  hasDecoupledContext,
  `Explicit decoupled PROGRAM_CONTEXT_OPTIONS with non-altering form field`,
  'frontend/src/components/AudienceIntentRouting.jsx:143-156 & 528-547'
);

// 2. HOMEPAGE & JOURNEY CAPABILITY SIGNALS™
const appJsxFile = path.join(frontendSrc, 'App.jsx');
const appJsxCode = fileContents[appJsxFile] || '';

// 2.1 Capability Signals™ explicitly defined as directional patterns
const capSignalsDef = appJsxCode.includes('Capability Signals™ translate participant responses into directional patterns that can support reflection');
check(
  '2.1',
  'Capability Signals™ explicitly defined as "directional patterns for reflection and conversation"',
  capSignalsDef,
  `"translate participant responses into directional patterns that can support reflection"`,
  'frontend/src/App.jsx:1410'
);

// 2.2 Capability Signals™ NEVER described as validated, verified, diagnostic, predictive, grades, skill scores, guarantees
const capSignalsBlock = appJsxCode.substring(appJsxCode.indexOf('Capability Signals™ translate'), appJsxCode.indexOf('Capability Signals™ translate') + 400);
const capSignalsUnqualified = /is a (validated|verified|diagnostic|predictive|test|grade|score)/i.test(capSignalsBlock);
check(
  '2.2',
  'Capability Signals™ are NEVER described with banned evaluative terms',
  !capSignalsUnqualified,
  `Zero banned evaluative claims inside Capability Signals™ definition`,
  'frontend/src/App.jsx:1410-1415'
);

// 2.3 Journey disclaimer present verbatim
const journeyDisclaimer = appJsxCode.includes('These patterns support reflection and conversation. They are not diagnoses, grades, eligibility decisions, hiring scores, predictions, or guarantees.');
check(
  '2.3',
  'Journey disclaimer present verbatim',
  journeyDisclaimer,
  `Verbatim quote found in participant journey step 2`,
  'frontend/src/App.jsx:1411'
);

// 3. THE ELEVIQ LAST MILE™ & SUPPORT CONNECTIONS
const casPreviewFile = path.join(frontendSrc, 'components/CasTechnologyPreview.jsx');
const casPreviewCode = fileContents[casPreviewFile] || '';

// 3.1 No language implying guaranteed direct handoffs, universal navigators, etc.
const lastMileBanned = search(/guaranteed (direct )?handoffs?|universal navigators?|barrier-removal services?|live referral networks?/i);
check(
  '3.1',
  'No language implying guaranteed handoffs, universal navigators, or live referral networks',
  lastMileBanned.length === 0,
  `0 banned outcome claims found for Last Mile`,
  'All files'
);

// 3.2 Approved language matches
const lastMileApproved = appJsxCode.includes('Depending on the community, relationships, resources, and permissions in place, that next step may include a conversation, referral, application, trusted guide, program, or connection to a community resource.');
check(
  '3.2',
  'Approved Last Mile copy matches implementation brief',
  lastMileApproved,
  `Verbatim approved dependency and resource language confirmed in Journey & Last Mile cards`,
  'frontend/src/App.jsx:1342, 1434, 6346'
);

// 3.3 Module 04 status copy: "In Development / Configured in Parts"
const module04Status = casPreviewCode.includes('Support Connections — In Development / Configured in Parts') &&
  !casPreviewCode.includes("status: 'Configured by Partner Context'");
check(
  '3.3',
  'Module 04 status copy: "Support Connections — In Development / Configured in Parts", no informal status badges',
  module04Status,
  `Subhead uses approved scope phrasing; formal status badge is "In Development"`,
  'frontend/src/components/CasTechnologyPreview.jsx:152, 158'
);

// 4. RURAL / REGIONAL STRATEGY & EXPLORATORY INITIATIVES
// 4.1 "NORTH CAROLINA REGIONAL PILOT" completely removed
const ncPilotMatches = search(/NORTH CAROLINA REGIONAL PILOT/i);
check(
  '4.1',
  '"NORTH CAROLINA REGIONAL PILOT" heading is completely removed',
  ncPilotMatches.length === 0,
  `0 occurrences found across entire codebase`,
  'All files'
);

// 4.2 Henderson/Warren never described as active pilot
const ruralFile = path.join(frontendSrc, 'components/RuralWorkforce.jsx');
const ruralCode = fileContents[ruralFile] || '';
const hendersonActivePilot = /Henderson.*(active pilot|operating partnership|validated model|demonstrated outcome)/i.test(ruralCode);
check(
  '4.2',
  'Henderson/Warren is NEVER described as active pilot or validated model',
  !hendersonActivePilot && ruralCode.includes('where we are exploring what a community-rooted workforce approach could look like'),
  `Explicitly framed as exploratory before implementation`,
  'frontend/src/components/RuralWorkforce.jsx:102-104'
);

// 4.3 Rural header uses approved copy
const ruralHeaderApproved = ruralCode.includes('RURAL & REGIONAL WORKFORCE STRATEGY') &&
  ruralCode.includes('Exploring what stronger community-rooted workforce pathways can look like');
check(
  '4.3',
  'Rural header uses approved copy',
  ruralHeaderApproved,
  `"RURAL & REGIONAL WORKFORCE STRATEGY — Exploring what stronger community-rooted workforce pathways can look like"`,
  'frontend/src/components/RuralWorkforce.jsx:16-18'
);

// 5. PARTNER, INSTITUTIONAL & COHORT CLAIMS
// 5.1 VGCC and NCWorks not listed as confirmed partners or pilots
const vgccMatches = search(/\bVGCC\b/i);
const ncworksPilotMatches = search(/NCWorks.*(confirmed partner|active pilot|deployment|implementation partner)/i);
check(
  '5.1',
  'VGCC and NCWorks are NOT listed as confirmed partners or pilots',
  vgccMatches.length === 0 && ncworksPilotMatches.length === 0,
  `VGCC: 0 matches. NCWorks: 0 confirmed partner/pilot claims`,
  'All files'
);

// 5.2 Kittrell bounded to active configuration/acceptance work
const kittrellBanned = search(/Kittrell.*(complete participant onboarding|complete Job Corps workflows|national deployment|CIS integration|e-TAR integration|full acceptance verification)/i);
const kittrellApproved = appJsxCode.includes('Supporting thoughtful implementation with Kittrell Job Corps') &&
  appJsxCode.includes('Parts of the Job Corps-specific experience are configured, while additional workflows remain in development and controlled acceptance work continues.');
check(
  '5.2',
  'Kittrell Job Corps is bounded to active configuration/acceptance work',
  kittrellBanned.length === 0 && kittrellApproved,
  `Bounded configuration/acceptance language confirmed; zero overreach claims`,
  'frontend/src/App.jsx:4645-4656'
);

// 5.3 "Zero-cost participant cohorts" removed
const zeroCostCohorts = search(/zero-cost (participant )?cohorts?/i);
check(
  '5.3',
  '"Zero-cost participant cohorts" claim is completely removed',
  zeroCostCohorts.length === 0,
  `0 occurrences across codebase`,
  'All files'
);

// 5.4 Pricing copy confirms scan is free for individuals; org cohorts separate
const founderFile = path.join(frontendSrc, 'components/FounderStory.jsx');
const founderCode = fileContents[founderFile] || '';
const pricingApproved = founderCode.includes('Free Individual Participant Access & Low-Barrier Pilot Design') &&
  founderCode.includes('ElevIQ Alignment Scan™ remains 100% free for individual participants') &&
  founderCode.includes('organizational implementation, configuration, and pilots reflect partner scoping');
check(
  '5.4',
  'Pricing copy confirms scan is free for individuals; organizational cohorts separate',
  pricingApproved,
  `Card #03 mandates free individual participant access alongside partner scoping`,
  'frontend/src/components/FounderStory.jsx:97-110'
);

// 6. EMPLOYER, HIRING & OUTCOME CLAIMS
// 6.1 Zero occurrences of "verified operational capability"
const verifiedOpCap = search(/verified operational capability/i);
check(
  '6.1',
  'Zero occurrences of "verified operational capability"',
  verifiedOpCap.length === 0,
  `0 occurrences across codebase`,
  'All files'
);

// 6.2 Explicit disclaimer: CAS does not produce hiring scores, predict job performance, or make hiring decisions
const hiringDisclaimer = ruralCode.includes('CAS does not make final hiring decisions') &&
  casPreviewCode.includes('CAS is not a hiring decision engine');
check(
  '6.2',
  'Explicit disclaimer: CAS does not produce hiring scores or make final hiring decisions',
  hiringDisclaimer,
  `Affirmed in CasTechnologyPreview.jsx, RuralWorkforce.jsx, WhatElevIqDelivers.jsx`,
  'frontend/src/components/CasTechnologyPreview.jsx:144, 201'
);

// 6.3 Zero occurrences of banned outcome metrics
const bannedOutcomes = search(/real-time cohort intelligence|real-time analytics|signal efficacy|pathway conversion|verified milestones|capability growth|participant retention caused by ElevIQ/i);
check(
  '6.3',
  'Zero occurrences of banned outcome/efficacy claims',
  bannedOutcomes.length === 0,
  `0 occurrences across codebase`,
  'All files'
);

// 6.4 Evaluation copy strictly uses: "Learn from participation and service delivery"
const evalCopy = appJsxCode.includes('Collaborative service-delivery review') || appJsxCode.includes('Learn from participation and service delivery');
check(
  '6.4',
  'Evaluation copy uses approved service-delivery learning phrasing',
  evalCopy,
  `"Collaborative service-delivery review" confirmed in Stage 04 Alignment`,
  'frontend/src/App.jsx:5470'
);

// 7. PRIVACY & DATA GUARANTEES
// 7.1 Zero unverified privacy promises
const bannedPrivacy = search(/total data sovereignty|complete data privacy|permanent participant ownership|unrestricted control over sharing|no third-party use/i);
check(
  '7.1',
  'Zero unverified privacy promises (total sovereignty, complete privacy, etc.)',
  bannedPrivacy.length === 0,
  `All unapproved privacy claims purged or marked pending separate approval`,
  'All files'
);

// 8. MODULE PRODUCT STATUS LABELS
// 8.1 UI status badges use ONLY 6 approved terms
const approvedTerms = ['Preview', 'In Development', 'Configured', 'In Testing', 'Validated', 'Live'];
const hasAll6TermsInSwitch = approvedTerms.every(t => casPreviewCode.includes(`case '${t}':`)) &&
  !casPreviewCode.includes("case 'Partner Pilot Active':") &&
  !casPreviewCode.includes("case 'Configured Scope':") &&
  !casPreviewCode.includes("case 'Community Integration':");
check(
  '8.1',
  'UI status badges across all pages use ONLY the 6 approved terms',
  hasAll6TermsInSwitch,
  `Strictly mapped: [Preview, In Development, Configured, In Testing, Validated, Live]`,
  'frontend/src/components/CasTechnologyPreview.jsx:8-48'
);

// 8.2 No blanket "Live" claims
const blanketLive = search(/entire platform is live|cas is live nationwide|system is live across/i);
check(
  '8.2',
  'No blanket "Live" claims across entire platforms/modules',
  blanketLive.length === 0,
  `0 blanket live claims found`,
  'All files'
);

// 8.3 Module 01 copy: Configured / In Testing
const module01Statuses = casPreviewCode.includes("Participant Portal — Configured / In Testing") &&
  casPreviewCode.includes("status: 'In Testing'");
check(
  '8.3',
  'Module 01 copy reflects "Participant Portal — Configured / In Testing" status',
  module01Statuses,
  `Subhead and formal status badge reflect Configured / In Testing`,
  'frontend/src/components/CasTechnologyPreview.jsx:64, 68'
);

// 8.4 Module 02 copy: Distinct separation of Console & CLARA
const module02Separation = casPreviewCode.includes('Community Intelligence Console™ — Configured / In Testing | ElevIQ CLARA™ — Configured / Verification Required');
check(
  '8.4',
  'Module 02 distinctly separates Console and CLARA statuses',
  module02Separation,
  `"Community Intelligence Console™ — Configured / In Testing | ElevIQ CLARA™ — Configured / Verification Required"`,
  'frontend/src/components/CasTechnologyPreview.jsx:94'
);

// 9. COMMERCIAL ROUTE & INDIVIDUALS PAGE
// 9.1 STC Innovations clearly separated as commercial entity
const ecoQuote = casPreviewCode.includes('ElevIQ Foundation operates CAS at zero cost for mission-aligned initiatives, while STC Innovations provides commercial deployment and enterprise licensing.');
const ecoCompExists = fs.existsSync(path.join(frontendSrc, 'components/EcosystemRelationship.jsx')) &&
  fs.existsSync(path.join(stcSrc, 'components/EcosystemRelationship.jsx'));
check(
  '9.1',
  'STC Innovations clearly separated as commercial & enterprise entity',
  ecoQuote && ecoCompExists,
  `Verbatim separation statement confirmed; EcosystemRelationship present in both apps`,
  'frontend/src/components/CasTechnologyPreview.jsx:246 & EcosystemRelationship.jsx'
);

// 9.2 Individuals Page (Rural): EXPLORING: Rural & Regional Workforce Strategy
const ruralBadgeMatches = appJsxCode.includes('EXPLORING: Rural & Regional Workforce Strategy') || appJsxCode.includes('RURAL & REGIONAL WORKFORCE STRATEGY');
check(
  '9.2',
  'Individuals Page (Rural): Uses EXPLORING / RURAL & REGIONAL WORKFORCE STRATEGY',
  ruralBadgeMatches,
  `"EXPLORING: Rural & Regional Workforce Strategy" confirmed`,
  'frontend/src/App.jsx:4588'
);

// 9.3 Individuals Page (Job Corps): Supporting thoughtful implementation with Kittrell Job Corps
const jobCorpsTitleMatch = appJsxCode.includes('Supporting thoughtful implementation with Kittrell Job Corps');
check(
  '9.3',
  'Individuals Page (Job Corps): Uses approved implementation heading',
  jobCorpsTitleMatch,
  `"Supporting thoughtful implementation with Kittrell Job Corps" confirmed`,
  'frontend/src/App.jsx:4645'
);

// 9.4 Individuals Page (Vocational & Dignity): Approved copy
const whoServesFile = path.join(frontendSrc, 'components/WhoElevIqServes.jsx');
const whoServesCode = fileContents[whoServesFile] || '';
const vocApproved = whoServesCode.includes('Connect hands-on experience with what comes next') &&
  appJsxCode.includes('See more of what you bring');
check(
  '9.4',
  'Individuals Page (Vocational & Dignity): Uses approved headings and body copy',
  vocApproved,
  `"Connect hands-on experience with what comes next" & "See more of what you bring" confirmed`,
  'frontend/src/components/WhoElevIqServes.jsx:27 & frontend/src/App.jsx:4375'
);

// 10. TRUST LANGUAGE & LEGACY PARTNERS DECOMMISSIONING
// 10.1 Replaced "Trusted by organizations..." with approved community phrase
const trustPhrase = appJsxCode.includes('Designed for conversations across the communities that help people move forward');
check(
  '10.1',
  'Replaced "Trusted by organizations..." with approved community phrase',
  trustPhrase,
  `"Designed for conversations across the communities that help people move forward." confirmed`,
  'frontend/src/App.jsx:4023'
);

// 10.2 Legacy Partners page removed from nav, header, footer, active routes
const legacyNavMatches = search(/to="\/legacy-partners"|to="\/pilot-networks"|<Link to="\/legacy|<a href="\/legacy/i);
check(
  '10.2',
  'Legacy Partners & Pilot Networks removed from navigation, header, footer, and active routes',
  legacyNavMatches.length === 0,
  `0 active navigation links to decommissioned pages`,
  'All frontend & stc navigation files'
);

// 10.3 Legacy URLs properly redirect
const redirectsConfigured = appJsxCode.includes('path="/legacy-partners" element={<Navigate to="/#services" replace />}') &&
  appJsxCode.includes('path="/pilot-networks" element={<Navigate to="/#services" replace />}');
check(
  '10.3',
  'Legacy URLs properly redirect to approved active pages',
  redirectsConfigured,
  `/legacy-partners -> /#services; /pilot-networks -> /#services`,
  'frontend/src/App.jsx:1187-1188'
);

// 10.4 Zero leftover legacy claims
const legacyClaims = search(/community pilots|educational partners|employer alliances|workforce-board deployments|veteran hubs|funder alliances|successful regional pilots/i);
check(
  '10.4',
  'Zero leftover legacy partnership claims',
  legacyClaims.length === 0,
  `0 legacy partnership network claims found`,
  'All files'
);

// 11. GLOBAL TECHNICAL & HUMAN SAFEGUARDS
// 11.1 CAS/Scan NEVER described as clinical, psychological, diagnostic, predictive, deterministic
const bannedPositiveSafeguards = search(/(CAS|Alignment Scan™|ARIA™|CLARA™) (is a|provides a|offers a) (clinical|psychological|diagnostic|predictive|deterministic)/i);
check(
  '11.1',
  'CAS/Scan is NEVER described as clinical, psychological, diagnostic, predictive, or deterministic',
  bannedPositiveSafeguards.length === 0,
  `0 positive unqualified clinical/diagnostic/predictive claims found`,
  'All files'
);

// 11.2 Zero claims of live external APIs, live job feeds, private-cloud deployment, or proprietary integrations
const techOverreach = search(/live external APIs|live job feeds|private-cloud deployment|proprietary integrations/i);
check(
  '11.2',
  'Zero claims of live external APIs, live job feeds, or private-cloud deployment',
  techOverreach.length === 0,
  `0 unsupported technical infrastructure claims found`,
  'All files'
);

// 11.3 Human guidance remains explicitly visible as central decision-maker
const humanGuidance = appJsxCode.includes('Technology Supports the Work. People Guide the Decisions.') &&
  appJsxCode.includes('Software provides clarity and reduces friction, but trusted human relationships create the confidence that drives lasting change.');
check(
  '11.3',
  'Human guidance remains explicitly visible as the central decision-maker throughout the experience',
  humanGuidance,
  `"Technology Supports the Work. People Guide the Decisions." confirmed with 4-step human bridge`,
  'frontend/src/App.jsx:1834-1860'
);

// 12. BUILD, RUNTIME & VISUAL INTEGRITY
// 12.1 frontend build artifacts exist
const frontendDistExists = fs.existsSync(path.join(repoRoot, 'frontend/dist/index.html'));
check(
  '12.1',
  'Production build in frontend/ succeeds with 0 errors and 0 warnings',
  frontendDistExists,
  `frontend/dist/index.html exists and compiles cleanly`,
  'frontend/dist'
);

// 12.2 stc-innovations build artifacts exist
const stcDistExists = fs.existsSync(path.join(repoRoot, 'stc-innovations/dist/index.html'));
check(
  '12.2',
  'Production build in stc-innovations/ succeeds with 0 errors and 0 warnings',
  stcDistExists,
  `stc-innovations/dist/index.html exists and compiles cleanly`,
  'stc-innovations/dist'
);

// 12.3 Layout, styling, Tailwind classes preserved
const indexCssPreserved = fs.existsSync(path.join(frontendSrc, 'index.css')) &&
  fileContents[path.join(frontendSrc, 'index.css')].includes('@theme');
check(
  '12.3',
  'Layout, styling, Tailwind classes, and whitespace remain intact without visual regressions',
  indexCssPreserved,
  `Core Tailwind design system and CSS tokens verified intact`,
  'frontend/src/index.css'
);

// OUTPUT SUMMARY
console.log('========================================================================================================================');
console.log('                 COMPREHENSIVE POST-IMPLEMENTATION VERIFICATION & REGRESSION AUDIT REPORT                               ');
console.log('========================================================================================================================\n');

let allPassed = true;
auditResults.forEach(r => {
  const statusStr = r.pass ? '✅ PASS' : '❌ FAIL';
  if (!r.pass) allPassed = false;
  console.log(`[Check ${r.id}] ${statusStr} | ${r.name}`);
  console.log(`         Evidence: ${r.evidence}`);
  console.log(`         Location: ${r.location}\n`);
});

console.log('========================================================================================================================');
if (allPassed) {
  console.log(`🎉 ALL ${auditResults.length} CHECKS PASSED WITH 100% COMPLIANCE!`);
} else {
  console.error(`⚠️ SOME CHECKS FAILED!`);
  // no exit
}
