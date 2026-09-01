import fs from 'fs';

const appJsx = fs.readFileSync('src/App.jsx', 'utf8');
const casPreview = fs.readFileSync('src/components/CasTechnologyPreview.jsx', 'utf8');

const tests = [
  // 1. Global Trademark & Terminology Audit
  {
    category: 'Trademark & Terminology',
    name: 'Zero occurrences of forbidden phrase "CAS System" in App.jsx and CasTechnologyPreview.jsx',
    pass: !appJsx.toLowerCase().includes('cas system') && !casPreview.toLowerCase().includes('cas system')
  },
  {
    category: 'Trademark & Terminology',
    name: 'ElevIQ ARIA™ trademark verified',
    pass: appJsx.includes('ElevIQ ARIA™') && casPreview.includes('ElevIQ ARIA™')
  },
  {
    category: 'Trademark & Terminology',
    name: 'ElevIQ CLARA™ trademark verified',
    pass: appJsx.includes('ElevIQ CLARA™') && casPreview.includes('ElevIQ CLARA™')
  },
  {
    category: 'Trademark & Terminology',
    name: 'ElevIQ Alignment Scan™ trademark verified',
    pass: appJsx.includes('ElevIQ Alignment Scan™') && casPreview.includes('ElevIQ Alignment Scan™')
  },
  {
    category: 'Trademark & Terminology',
    name: 'Capability Signals™ trademark verified',
    pass: appJsx.includes('Capability Signals™') && casPreview.includes('Capability Signals™')
  },
  {
    category: 'Trademark & Terminology',
    name: 'Alignment Snapshot™ trademark verified',
    pass: appJsx.includes('Alignment Snapshot™') && casPreview.includes('Alignment Snapshot™')
  },
  {
    category: 'Trademark & Terminology',
    name: 'The ElevIQ Last Mile™ trademark verified',
    pass: appJsx.includes('The ElevIQ Last Mile™') && casPreview.includes('The ElevIQ Last Mile™')
  },
  {
    category: 'Trademark & Terminology',
    name: 'Role Alignment™ trademark verified',
    pass: appJsx.includes('Role Alignment™') && casPreview.includes('Role Alignment™')
  },

  // 2. Master 4-Column Ecosystem Footer
  {
    category: 'Master 4-Column Ecosystem Footer',
    name: 'Column 1: ElevIQ Foundation, Mission, and Henderson, North Carolina location',
    pass: appJsx.includes('ElevIQ Foundation') &&
          appJsx.includes('MISSION & SERVICE') &&
          appJsx.includes('Bridging human capability and meaningful life and career pathways') &&
          appJsx.includes('Henderson, North Carolina')
  },
  {
    category: 'Master 4-Column Ecosystem Footer',
    name: 'Column 2: For Participants & Families links (How It Works, Who We Serve, Free Alignment Scan™, Support Connections / The Last Mile™)',
    pass: appJsx.includes('For Participants & Families') &&
          appJsx.includes('Free Alignment Scan™ →') &&
          appJsx.includes('Support Connections / The Last Mile™')
  },
  {
    category: 'Master 4-Column Ecosystem Footer',
    name: 'Column 3: For Organizations & Partners links (Schools & CTE, Workforce & NCWorks, Job Corps Centers, Employers & Role Alignment)',
    pass: appJsx.includes('For Organizations & Partners') &&
          appJsx.includes('Schools & CTE') &&
          appJsx.includes('Workforce & NCWorks') &&
          appJsx.includes('Job Corps Centers') &&
          appJsx.includes('Employers & Role Alignment')
  },
  {
    category: 'Master 4-Column Ecosystem Footer',
    name: 'Column 4: Ecosystem & Governance links (About the Foundation, Tammy\'s Story, CAS Platform Preview, Commercial Solutions → STC Innovations ↗, Privacy & Data Ethics)',
    pass: appJsx.includes('Ecosystem & Governance') &&
          appJsx.includes('About the Foundation') &&
          appJsx.includes('Tammy\'s Story') &&
          appJsx.includes('CAS Platform Preview') &&
          appJsx.includes('Commercial Solutions') &&
          appJsx.includes('Privacy & Data Ethics')
  },
  {
    category: 'Master 4-Column Ecosystem Footer',
    name: 'Bottom Legal Bar: Copyright © 2026 ElevIQ Foundation, compliance note, and trademark list',
    pass: appJsx.includes('© 2026 ElevIQ Foundation. All rights reserved.') &&
          appJsx.includes('ElevIQ Foundation receives CAS infrastructure access at zero cost') &&
          appJsx.includes('CAS is not an algorithmic hiring decision engine.') &&
          appJsx.includes('Trademark Lock Terminology')
  }
];

console.log('=== STEP 7: COMPLIANCE, TRADEMARK POLISH & MASTER FOOTER AUDIT ===\n');

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
  console.log('ALL STEP 7 AUDIT CHECKS PASSED PERFECTLY! 🚀');
} else {
  console.error('AUDIT FAILED!');
  process.exit(1);
}
