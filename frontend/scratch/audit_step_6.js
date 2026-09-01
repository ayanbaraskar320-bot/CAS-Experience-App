import fs from 'fs';

const appJsx = fs.readFileSync('src/App.jsx', 'utf8');
const casPreview = fs.readFileSync('src/components/CasTechnologyPreview.jsx', 'utf8');

const tests = [
  // 1. Dedicated CAS Preview Route Audit
  {
    category: 'Dedicated CAS Preview Route (/platform)',
    name: 'Headline reads "ElevIQ Capability Alignment System™ (CAS)"',
    pass: casPreview.includes('ElevIQ Capability Alignment System™ (CAS)')
  },
  {
    category: 'Dedicated CAS Preview Route (/platform)',
    name: 'Subtitle reflects approved infrastructure framing',
    pass: casPreview.includes('Purpose-built infrastructure powering capability discovery, advisor intelligence, and regional pathway alignment.')
  },
  {
    category: 'Dedicated CAS Preview Route (/platform)',
    name: 'Module 1: Participant Portal & ARIA™ with "Active / Free for Individuals"',
    pass: casPreview.includes('ElevIQ Participant Portal & ARIA™') && casPreview.includes('Active / Free for Individuals')
  },
  {
    category: 'Dedicated CAS Preview Route (/platform)',
    name: 'Module 2: Community Intelligence Console™ & CLARA™ with "Partner Pilot Active"',
    pass: casPreview.includes('Community Intelligence Console™ & CLARA™') && casPreview.includes('Partner Pilot Active')
  },
  {
    category: 'Dedicated CAS Preview Route (/platform)',
    name: 'Module 3: Role Alignment™ Engine with "Configured Scope" and non-hiring-decision disclaimer',
    pass: casPreview.includes('Role Alignment™ Engine') &&
          casPreview.includes('Configured Scope') &&
          casPreview.includes('CAS is not a hiring decision engine')
  },
  {
    category: 'Dedicated CAS Preview Route (/platform)',
    name: 'Module 4: The ElevIQ Last Mile™ & Support Handoffs with "Community Integration"',
    pass: casPreview.includes('The ElevIQ Last Mile™ & Support Handoffs') && casPreview.includes('Community Integration')
  },
  {
    category: 'Dedicated CAS Preview Route (/platform)',
    name: 'Ecosystem notice: zero-cost nonprofit access vs. STC Innovations commercial deployment',
    pass: casPreview.includes('ElevIQ Foundation operates CAS at zero cost for mission-aligned initiatives') &&
          casPreview.includes('STC Innovations provides commercial deployment')
  },

  // 2. Homepage Technology Layer Audit
  {
    category: 'Homepage Technology Layer',
    name: 'CAS summary block sits directly after Human Guidance and above 3-Entity Ecosystem',
    pass: appJsx.indexOf('THE HUMAN CORE') < appJsx.indexOf('<CasTechnologyTeaser') &&
          appJsx.indexOf('<CasTechnologyTeaser') < appJsx.indexOf('<EcosystemRelationship')
  },
  {
    category: 'Homepage Technology Layer',
    name: '"See the Technology Behind the Work →" routes to /platform',
    pass: appJsx.includes('See the Technology Behind the Work') && appJsx.includes('to="/platform"')
  },
  {
    category: 'Homepage Technology Layer',
    name: 'Header dropdown "CAS Preview" routes to /platform',
    pass: appJsx.includes('CAS Preview') && appJsx.includes('location.pathname.startsWith(\'/platform\')')
  },

  // 3. Guardrails & Trademark Compliance
  {
    category: 'Guardrails & Trademark Compliance',
    name: 'Zero occurrences of redundant phrase "CAS System"',
    pass: !appJsx.toLowerCase().includes('cas system') && !casPreview.toLowerCase().includes('cas system')
  },
  {
    category: 'Guardrails & Trademark Compliance',
    name: 'AI Roles: ARIA™ is participant-facing; CLARA™ is advisor-facing',
    pass: casPreview.includes('participant-facing reflective guidance with ARIA™') &&
          casPreview.includes('advisor-facing CLARA™ intelligence')
  },
  {
    category: 'Guardrails & Trademark Compliance',
    name: 'Public Claim Notice present ("Feature availability and workflows reflect approved organizational scope...")',
    pass: casPreview.includes('Feature availability and workflows reflect approved organizational scope and partner cohort configurations.')
  }
];

console.log('=== STEP 6: CAS TECHNOLOGY PREVIEW & PRODUCT STATUS BADGES AUDIT ===\n');

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
  console.log('ALL STEP 6 AUDIT CHECKS PASSED PERFECTLY! 🚀');
} else {
  console.error('AUDIT FAILED!');
  process.exit(1);
}
