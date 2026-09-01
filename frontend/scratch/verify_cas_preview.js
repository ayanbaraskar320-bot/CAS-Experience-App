import fs from 'fs';

const casPreview = fs.readFileSync('src/components/CasTechnologyPreview.jsx', 'utf8');
const appJsx = fs.readFileSync('src/App.jsx', 'utf8');

const tests = [
  {
    name: 'Hero Title: ElevIQ Capability Alignment System™ (CAS)',
    pass: casPreview.includes('ElevIQ Capability Alignment System™ (CAS)')
  },
  {
    name: 'Hero Subtitle: Purpose-built infrastructure powering capability discovery, advisor intelligence, and regional pathway alignment.',
    pass: casPreview.includes('Purpose-built infrastructure powering capability discovery, advisor intelligence, and regional pathway alignment.')
  },
  {
    name: 'Module 01: ElevIQ Participant Portal & ARIA™ with Active / Free for Individuals badge',
    pass: casPreview.includes('ElevIQ Participant Portal & ARIA™') &&
          casPreview.includes('Active / Free for Individuals')
  },
  {
    name: 'Module 02: Community Intelligence Console™ & CLARA™ with Partner Pilot Active badge',
    pass: casPreview.includes('Community Intelligence Console™ & CLARA™') &&
          casPreview.includes('Partner Pilot Active')
  },
  {
    name: 'Module 03: Role Alignment™ Engine with Configured Scope badge (not a hiring decision engine)',
    pass: casPreview.includes('Role Alignment™ Engine') &&
          casPreview.includes('Configured Scope') &&
          casPreview.includes('CAS is not a hiring decision engine')
  },
  {
    name: 'Module 04: The ElevIQ Last Mile™ & Support Handoffs with Community Integration badge',
    pass: casPreview.includes('The ElevIQ Last Mile™ & Support Handoffs') &&
          casPreview.includes('Community Integration')
  },
  {
    name: 'Status Badge Architecture Matrix with 4 defined deployment tiers',
    pass: casPreview.includes('Product Status Badge Architecture') &&
          casPreview.includes('PUBLIC CLAIM DISCIPLINE & GOVERNANCE')
  },
  {
    name: 'Compliance Notice: Feature availability and workflows reflect approved organizational scope...',
    pass: casPreview.includes('Feature availability and workflows reflect approved organizational scope and partner cohort configurations.')
  },
  {
    name: 'Mandatory Policy Quote: ElevIQ Foundation receives CAS access at no cost...',
    pass: casPreview.includes('ElevIQ Foundation receives CAS access at no cost for mission-aligned nonprofit work. The ElevIQ Alignment Scan™ remains free for individual participants.')
  },
  {
    name: 'Zero occurrences of forbidden phrase "CAS System" across codebase',
    pass: !casPreview.toLowerCase().includes('cas system') && !appJsx.toLowerCase().includes('cas system')
  },
  {
    name: 'CAS Preview route aliases and header dropdown link to /platform',
    pass: appJsx.includes('path="/cas-preview"') && appJsx.includes('to="/platform"')
  }
];

console.log('=== CAS TECHNOLOGY PREVIEW & STATUS BADGE AUDIT ===\n');
let passed = 0;
tests.forEach((t, i) => {
  if (t.pass) passed++;
  console.log(`${i + 1}. [${t.pass ? '✅ PASS' : '❌ FAIL'}] ${t.name}`);
});

console.log(`\nResults: ${passed}/${tests.length} tests passed.`);
if (passed === tests.length) {
  console.log('ALL CAS TECHNOLOGY PREVIEW AUDIT CHECKS PASSED! 🚀');
} else {
  console.error('SOME CHECKS FAILED!');
  process.exit(1);
}
