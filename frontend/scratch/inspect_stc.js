import fs from 'fs';

const content = fs.readFileSync('frontend/src/components/STCInnovationsPage.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('about-stc') || l.includes('<footer') || l.includes('Nonprofit Programs FAQ') || l.includes('ElevIQ Foundation')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});
