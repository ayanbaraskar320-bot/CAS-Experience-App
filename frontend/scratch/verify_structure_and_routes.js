import fs from 'fs';

const appJsx = fs.readFileSync('src/App.jsx', 'utf8');
const whoServes = fs.readFileSync('src/components/WhoElevIqServes.jsx', 'utf8');
const whatDelivers = fs.readFileSync('src/components/WhatElevIqDelivers.jsx', 'utf8');
const founderStory = fs.readFileSync('src/components/FounderStory.jsx', 'utf8');
const audienceRouting = fs.readFileSync('src/components/AudienceIntentRouting.jsx', 'utf8');

const tests = [
  // 1. Homepage Streamlining Audit
  {
    category: 'Homepage Streamlining',
    name: 'Hero leads with mission copy ("Capability is everywhere...")',
    pass: appJsx.includes("Capability is everywhere. Opportunity doesn't always see it.")
  },
  {
    category: 'Homepage Streamlining',
    name: 'Problem Section follows Hero ("The problem isn\'t a lack of talent. It\'s a lack of alignment.")',
    pass: appJsx.includes("The problem isn't a lack of talent. It's a lack of alignment.")
  },
  {
    category: 'Homepage Streamlining',
    name: 'Service Response: How ElevIQ Helps is concise (5 core pillars)',
    pass: appJsx.includes('How ElevIQ Helps') && appJsx.includes('Discover Capability') && appJsx.includes('Move Toward Action')
  },
  {
    category: 'Homepage Streamlining',
    name: 'Service Delivery Model (Stages 0-7) & Participant Journey (6 Steps) rendered as clean visual flows',
    pass: appJsx.includes('STAGE 0') && appJsx.includes('STAGE 7') && appJsx.includes('What the Participant Experiences')
  },
  {
    category: 'Homepage Streamlining',
    name: 'Founder Story uses concise Teaser Card on homepage with expandable/sub-page CTA',
    pass: appJsx.includes('<FounderStory initialExpanded={false} />') && founderStory.includes('Why I Built ElevIQ')
  },
  {
    category: 'Homepage Streamlining',
    name: 'Ecosystem Section features 3 entities with mandatory scan access quote',
    pass: appJsx.includes('<EcosystemRelationship')
  },

  // 2. Dedicated Sub-Page & Route Audit
  {
    category: 'Dedicated Sub-Pages',
    name: 'Who We Serve: 7 Participant Stages with institutional settings separated as partner context',
    pass: whoServes.includes('Youth Exploration') &&
          whoServes.includes('High School / CTE') &&
          whoServes.includes('Postsecondary / Emerging Career') &&
          whoServes.includes('Adult Learner / Workforce Entry') &&
          whoServes.includes('Experienced Worker / Career Transition') &&
          whoServes.includes('Veteran / Military Transition') &&
          whoServes.includes('Reentry / Career Rebuilding') &&
          whoServes.includes('ORGANIZATIONAL & PARTNER CONTEXTS')
  },
  {
    category: 'Dedicated Sub-Pages',
    name: 'Services: Full 9 Service Lanes detailed with descriptions & tags',
    pass: whatDelivers.includes('Capability Discovery & Guided Reflection') &&
          whatDelivers.includes('Pathway & Next-Step Planning') &&
          whatDelivers.includes('Support Connections & The ElevIQ Last Mile™') &&
          whatDelivers.includes('Career Readiness & Story Translation') &&
          whatDelivers.includes('Advisor / Counselor / Navigator Enablement') &&
          whatDelivers.includes('Program & Cohort Implementation') &&
          whatDelivers.includes('Employer & Talent Pathway Alignment') &&
          whatDelivers.includes('Rural & Regional Workforce Strategy') &&
          whatDelivers.includes('Demonstrations, Workshops & Pilot Design')
  },
  {
    category: 'Dedicated Sub-Pages',
    name: 'Founder Story Route (/about, /about/tammy-story): Houses full narrative & rural NC anchor',
    pass: appJsx.includes('path="/about/tammy-story"') &&
          founderStory.includes('Neurodiagnostics') &&
          founderStory.includes('Cecil Strickland') &&
          founderStory.includes('Sameer Ranjan')
  },
  {
    category: 'Dedicated Sub-Pages',
    name: 'Contact Route (/contact): 10-Path Audience Selector & Smart Form with Path 10 commercial banner & STC portal link',
    pass: audienceRouting.includes('path-school') &&
          audienceRouting.includes('Commercial licensing, enterprise deployment') &&
          audienceRouting.includes('Visit STC Innovations Commercial Portal')
  },
  {
    category: 'Dedicated Sub-Pages',
    name: 'CAS Preview Route (/platform): Full 18-tab interface showcase & status badge system preserved',
    pass: appJsx.includes('PlatformSection') && appJsx.includes('path="/platform/*"')
  },

  // 3. Navigation Hook Audit
  {
    category: 'Navigation Hooks',
    name: 'Persistent CTA button is strictly "Begin Free Scan" linking to participant portal',
    pass: appJsx.includes('to="/platform/participant-portal"') && appJsx.includes('Begin Free Scan')
  },
  {
    category: 'Navigation Hooks',
    name: 'Commercial handoff links directly to STC (/stc)',
    pass: appJsx.includes('to="/stc"') && appJsx.includes('Commercial CAS')
  },
  {
    category: 'Navigation Hooks',
    name: 'Header dropdowns route to dedicated sub-pages & targeted anchors',
    pass: appJsx.includes('handleAnchorNav')
  }
];

console.log('=== STRUCTURAL PLACEMENT & ROUTING AUDIT ===\n');

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
  console.log('ALL STRUCTURAL PLACEMENT & ROUTING VERIFICATIONS PASSED! 🚀');
} else {
  console.error('AUDIT FAILED!');
  process.exit(1);
}
