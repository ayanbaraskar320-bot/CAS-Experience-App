import fs from 'fs';

console.log('=== VERIFYING SERVICES DROPDOWN TOPIC ANCHOR NAVIGATION ===\n');

const appContent = fs.readFileSync('frontend/src/App.jsx', 'utf8');
const deliversContent = fs.readFileSync('frontend/src/components/WhatElevIqDelivers.jsx', 'utf8');

let passes = 0;
let fails = 0;

function check(desc, condition) {
  if (condition) {
    console.log(`[PASS] ${desc}`);
    passes++;
  } else {
    console.error(`[FAIL] ${desc}`);
    fails++;
  }
}

// 1. App.jsx handleAnchorNav uses block: 'start'
check(
  'handleAnchorNav uses block: "start" to align directly where the topic starts',
  appContent.includes("el.scrollIntoView({ behavior: 'smooth', block: 'start' })")
);

// 2. Desktop Services Dropdown targets
check(
  'Desktop Services dropdown: "View All 9 →" anchors to #services with handleAnchorNav("services")',
  appContent.includes("handleAnchorNav('services')")
);
check(
  'Desktop Services dropdown: "Capability Discovery" anchors to #service-lane-01',
  appContent.includes("to=\"/#service-lane-01\"") && appContent.includes("handleAnchorNav('service-lane-01')")
);
check(
  'Desktop Services dropdown: "Pathway Planning" anchors to #service-lane-02',
  appContent.includes("to=\"/#service-lane-02\"") && appContent.includes("handleAnchorNav('service-lane-02')")
);
check(
  'Desktop Services dropdown: "Career Readiness" anchors to #service-lane-04',
  appContent.includes("to=\"/#service-lane-04\"") && appContent.includes("handleAnchorNav('service-lane-04')")
);
check(
  'Desktop Services dropdown: "Advisor Enablement" anchors to #service-lane-05',
  appContent.includes("to=\"/#service-lane-05\"") && appContent.includes("handleAnchorNav('service-lane-05')")
);
check(
  'Desktop Services dropdown: "Program Implementation" anchors to #service-lane-06',
  appContent.includes("to=\"/#service-lane-06\"") && appContent.includes("handleAnchorNav('service-lane-06')")
);
check(
  'Desktop Services dropdown: "Regional Workforce Strategy" anchors to #service-lane-08',
  appContent.includes("to=\"/#service-lane-08\"") && appContent.includes("handleAnchorNav('service-lane-08')")
);

// 3. Mobile menu anchors
check(
  'Mobile Services menu: Capability Discovery uses handleAnchorNav("service-lane-01")',
  (appContent.split("handleAnchorNav('service-lane-01')").length - 1) === 2
);
check(
  'Mobile Services menu: Program Implementation uses handleAnchorNav("service-lane-06")',
  (appContent.split("handleAnchorNav('service-lane-06')").length - 1) === 2
);
check(
  'Mobile Services menu: Rural & Regional Strategy uses handleAnchorNav("service-lane-08")',
  (appContent.split("handleAnchorNav('service-lane-08')").length - 1) === 2
);

// 4. HomePage contains section 6 (services) and who-we-serve
check(
  'HomePage renders <WhatElevIqDelivers variant="dark" /> within #services section',
  appContent.includes('<div id="services" className="scroll-mt-28">\r\n        <ScrollReveal>\r\n          <WhatElevIqDelivers variant="dark" />') ||
  appContent.includes('<div id="services" className="scroll-mt-28">\n        <ScrollReveal>\n          <WhatElevIqDelivers variant="dark" />')
);
check(
  'HomePage contains #who-we-serve anchor for "Who We Serve" navigation',
  appContent.includes('<div id="who-we-serve" className="scroll-mt-28">')
);

// 5. WhatElevIqDelivers.jsx contains IDs for all service lanes and aliases
check(
  'WhatElevIqDelivers root section has id="services" with scroll-mt-28',
  deliversContent.includes('id="services"') && deliversContent.includes('scroll-mt-28')
);
check(
  'WhatElevIqDelivers generates id="service-lane-XX" with scroll-mt-28 for all 9 lanes',
  deliversContent.includes('id={`service-lane-${lane.num}`}') && deliversContent.includes('scroll-mt-28')
);
check(
  'WhatElevIqDelivers renders semantic slug anchor spans (capability-discovery, pathway-planning, etc.)',
  deliversContent.includes('{slug && <span id={slug} className="scroll-mt-28 absolute top-0" aria-hidden="true" />}')
);

console.log(`\nAUDIT RESULT: ${passes} passed, ${fails} failed.`);
if (fails > 0) {
  process.exit(1);
} else {
  console.log('ALL SERVICES TOPIC REDIRECT AUDITS PASSED WITH 100% ACCURACY! 🎉');
}

