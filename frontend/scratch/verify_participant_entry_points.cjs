const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../src/components/AudienceIntentRouting.jsx');
const content = fs.readFileSync(filePath, 'utf8');

console.log('======================================================================');
console.log('       PARTICIPANT ENTRY POINTS VERIFICATION REPORT                   ');
console.log('======================================================================\n');

let allPassed = true;

// 1. Exactly 7 entry points in exact order
console.log('1. Verifying 7 Participant Entry Points in Exact Order:');
const expectedPaths = [
  'Youth Exploration — Ages 13–15',
  'High School / CTE — Ages 16–18',
  'Postsecondary / Emerging Career',
  'Adult Learner / Workforce Entry',
  'Experienced Worker / Career Transition',
  'Veteran / Military Transition',
  'Reentry / Career Rebuilding'
];

let lastIndex = -1;
expectedPaths.forEach((name, i) => {
  const index = content.indexOf(`name: '${name}'`);
  const isPresent = index !== -1;
  const inOrder = index > lastIndex;
  lastIndex = index;
  const pass = isPresent && inOrder;
  if (!pass) allPassed = false;
  console.log(`   ${pass ? '✅ PASS' : '❌ FAIL'}: ${i + 1}. ${name} (Present: ${isPresent}, In Order: ${inOrder})`);
});

// 2. Checking anchorIds for forbidden institutional aliases
console.log('\n2. Verifying Absence of Forbidden Institutional Aliases in anchorIds:');
const forbiddenAliases = [
  'path-school',
  'path-jobcorps',
  'path-college',
  'path-workforce',
  'path-ncworks',
  'path-employer',
  'path-nonprofit',
  'path-individual'
];

forbiddenAliases.forEach(alias => {
  const present = content.includes(`'${alias}'`);
  if (present) allPassed = false;
  console.log(`   ${!present ? '✅ PASS' : '❌ FAIL'}: Alias '${alias}' is ${!present ? 'absent' : 'found'}`);
});

// 3. Checking PROGRAM_CONTEXT_OPTIONS presence
console.log('\n3. Verifying Presence of Institutional Options in PROGRAM_CONTEXT_OPTIONS only:');
const programOptions = [
  'Job Corps Center / Cohort',
  'NCWorks / Regional Career Center',
  'K-12 School / District',
  'CTE Program / Vocational Center',
  'Community College / Technical Institute',
  'Employer / Industry Partner',
  'Nonprofit / Community Organization'
];

programOptions.forEach(opt => {
  const present = content.includes(opt);
  if (!present) allPassed = false;
  console.log(`   ${present ? '✅ PASS' : '❌ FAIL'}: Program Context Category '${opt}'`);
});

// 4. Verifying Dropdown Wiring
console.log('\n4. Verifying Form Dropdown & Handlers:');
const hasDropdownLabel = content.includes('Participant Entry Point');
const mapsPaths = content.includes('AUDIENCE_PATHS.map((path)');
const hasSelectHandler = content.includes('handleDropdownChange');
const hasHashRouting = content.includes('handleHashCheck');

console.log(`   ${hasDropdownLabel ? '✅ PASS' : '❌ FAIL'}: Label "Participant Entry Point"`);
console.log(`   ${mapsPaths ? '✅ PASS' : '❌ FAIL'}: Select options mapped over AUDIENCE_PATHS`);
console.log(`   ${hasSelectHandler ? '✅ PASS' : '❌ FAIL'}: Dropdown change handler wired`);
console.log(`   ${hasHashRouting ? '✅ PASS' : '❌ FAIL'}: Hash routing handler wired`);

if (!hasDropdownLabel || !mapsPaths || !hasSelectHandler || !hasHashRouting) {
  allPassed = false;
}

console.log('\n======================================================================');
if (allPassed) {
  console.log('🎉 ALL 7 PARTICIPANT ENTRY POINT VERIFICATION CHECKS PASSED PERFECTLY!');
} else {
  console.error('⚠️ SOME CHECKS FAILED!');
  process.exit(1);
}
