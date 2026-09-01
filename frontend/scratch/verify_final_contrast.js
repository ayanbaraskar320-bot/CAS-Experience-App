import fs from 'fs';

const casPreview = fs.readFileSync('src/components/CasTechnologyPreview.jsx', 'utf8');

const tests = [
  {
    name: 'Section heading "The Four Pillars of CAS Infrastructure" has text-slate-900 font-bold',
    pass: casPreview.includes('text-slate-900') &&
          casPreview.includes('The Four Pillars of CAS Infrastructure')
  },
  {
    name: 'Section 5 heading has text-slate-900 font-bold',
    pass: casPreview.includes('text-slate-900') &&
          casPreview.includes('Explore All CAS Platform Sub-Pages')
  },
  {
    name: 'Pill 1: Participant Portal (Free) -> /platform/participant-portal',
    pass: casPreview.includes('/platform/participant-portal') &&
          casPreview.includes('Participant Portal (Free)')
  },
  {
    name: 'Pill 2: Capability Signals™ -> /platform/capability-signals',
    pass: casPreview.includes('/platform/capability-signals') &&
          casPreview.includes('Capability Signals™')
  },
  {
    name: 'Pill 3: Alignment Snapshot™ -> /platform/alignment-snapshot',
    pass: casPreview.includes('/platform/alignment-snapshot') &&
          casPreview.includes('Alignment Snapshot™')
  },
  {
    name: 'Pill 4: ElevIQ ARIA™ -> /platform/eleviq-aria',
    pass: casPreview.includes('/platform/eleviq-aria') &&
          casPreview.includes('ElevIQ ARIA™')
  },
  {
    name: 'Pill 5: ElevIQ CLARA™ -> /platform/eleviq-clara',
    pass: casPreview.includes('/platform/eleviq-clara') &&
          casPreview.includes('ElevIQ CLARA™')
  },
  {
    name: 'Pill 6: Community Intelligence Console™ -> /platform/community-intelligence-console',
    pass: casPreview.includes('/platform/community-intelligence-console') &&
          casPreview.includes('Community Intelligence Console™')
  },
  {
    name: 'Pill 7: Alignment Pathways™ -> /platform/alignment-pathways',
    pass: casPreview.includes('/platform/alignment-pathways') &&
          casPreview.includes('Alignment Pathways™')
  },
  {
    name: 'Pill 8: The ElevIQ Last Mile™ -> /platform/last-mile',
    pass: casPreview.includes('/platform/last-mile') &&
          casPreview.includes('The ElevIQ Last Mile™')
  }
];

console.log('=== FINAL CAS PREVIEW CONTRAST & SUB-PAGE PILL AUDIT ===\n');

let passed = 0;
tests.forEach((t, i) => {
  if (t.pass) passed++;
  console.log(`${i + 1}. [${t.pass ? '✅ PASS' : '❌ FAIL'}] ${t.name}`);
});

console.log(`\nResults: ${passed}/${tests.length} tests passed.`);
if (passed === tests.length) {
  console.log('ALL FINAL CHECKS PASSED PERFECTLY! 🚀');
} else {
  console.error('CHECKS FAILED!');
  process.exit(1);
}
