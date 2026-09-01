import fs from 'fs';
import path from 'path';

const srcDir = 'src';

function scanFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanFiles(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = scanFiles(srcDir);

const terms = [
  { pattern: /CAS System/i, name: 'Forbidden term: CAS System' },
  { pattern: /Alignment Scan(?!™)/g, name: 'Missing ™: Alignment Scan' },
  { pattern: /Capability Signals(?!™)/g, name: 'Missing ™: Capability Signals' },
  { pattern: /Alignment Snapshot(?!™)/g, name: 'Missing ™: Alignment Snapshot' },
  { pattern: /Community Intelligence Console(?!™)/g, name: 'Missing ™: Community Intelligence Console' },
  { pattern: /The ElevIQ Last Mile(?!™)/g, name: 'Missing ™: The ElevIQ Last Mile' },
  { pattern: /ElevIQ ARIA(?!™)/g, name: 'Missing ™: ElevIQ ARIA' },
  { pattern: /ElevIQ CLARA(?!™)/g, name: 'Missing ™: ElevIQ CLARA' }
];

console.log('Scanning for trademark consistency across', files.length, 'files...\n');

let issues = 0;
files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  // ignore paths and url imports
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('import ') || line.includes('path:') || line.includes('to=') || line.includes('href=')) return;
    terms.forEach(term => {
      if (term.pattern.test(line)) {
        console.log(`[${term.name}] in ${filePath}:${idx + 1}`);
        console.log(`   Line: ${line.trim()}`);
        issues++;
      }
    });
  });
});

console.log(`\nScan complete. Total issues found: ${issues}`);
