import fs from 'fs';

console.log('=== UPDATING APP.JSX AND WHOELEVIQSERVES.JSX ===');

// 1. Update frontend/src/components/WhoElevIqServes.jsx
const whoPath = 'frontend/src/components/WhoElevIqServes.jsx';
let whoContent = fs.readFileSync(whoPath, 'utf8');

const oldHandleReq = `  const handleRequestInvitation = (e) => {
    if (window.location.pathname === '/') {
      const formEl = document.getElementById('participation-inquiry')
      if (formEl) {
        e.preventDefault()
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => {
          const nameInput = document.getElementById('name') || document.getElementById('audienceIntent')
          if (nameInput) nameInput.focus()
        }, 350)
      }
    }
  }`;

const newHandleReq = `  const handleRequestInvitation = (e) => {
    const formEl = document.getElementById('participation-inquiry') || document.getElementById('contact-inquiry') || document.getElementById('contact-inquiry-section')
    if (formEl) {
      e.preventDefault()
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        const nameInput = document.getElementById('name') || document.getElementById('audienceIntent')
        if (nameInput) nameInput.focus()
      }, 350)
    }
  }`;

if (whoContent.includes(oldHandleReq)) {
  whoContent = whoContent.replace(oldHandleReq, newHandleReq);
  console.log('Updated handleRequestInvitation in WhoElevIqServes.jsx (LF)');
} else if (whoContent.includes(oldHandleReq.replace(/\n/g, '\r\n'))) {
  whoContent = whoContent.replace(oldHandleReq.replace(/\n/g, '\r\n'), newHandleReq.replace(/\n/g, '\r\n'));
  console.log('Updated handleRequestInvitation in WhoElevIqServes.jsx (CRLF)');
}

fs.writeFileSync(whoPath, whoContent, 'utf8');


// 2. Update frontend/src/App.jsx
const appPath = 'frontend/src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// Update handleAnchorNav to block: 'start'
appContent = appContent.replace(
  "el.scrollIntoView({ behavior: 'smooth', block: 'center' })",
  "el.scrollIntoView({ behavior: 'smooth', block: 'start' })"
);

// Update Desktop Services dropdown
const oldDesktopServices = `<div className="grid grid-cols-2 gap-1.5 pt-1">
                          <Link to="/#services" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Capability Discovery</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Signals™ & guided reflection</div>
                          </Link>
                          <Link to="/#services" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Pathway Planning</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Education & career next-steps</div>
                          </Link>
                          <Link to="/#services" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Career Readiness</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Story translation & presence</div>
                          </Link>
                          <Link to="/#services" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Advisor Enablement</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">CLARA™ & navigator workflows</div>
                          </Link>
                          <Link to="/organizations/implementation" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Program Implementation</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Cohort setup & staff workflow</div>
                          </Link>
                          <Link to="/#services" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Regional Workforce Strategy</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Cross-system facilitation & gap mapping</div>
                          </Link>
                        </div>`;

const newDesktopServices = `<div className="grid grid-cols-2 gap-1.5 pt-1">
                          <Link
                            to="/#service-lane-01"
                            onClick={() => { setActiveDropdown(null); handleAnchorNav('service-lane-01'); }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Capability Discovery</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Signals™ & guided reflection</div>
                          </Link>
                          <Link
                            to="/#service-lane-02"
                            onClick={() => { setActiveDropdown(null); handleAnchorNav('service-lane-02'); }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Pathway Planning</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Education & career next-steps</div>
                          </Link>
                          <Link
                            to="/#service-lane-04"
                            onClick={() => { setActiveDropdown(null); handleAnchorNav('service-lane-04'); }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Career Readiness</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Story translation & presence</div>
                          </Link>
                          <Link
                            to="/#service-lane-05"
                            onClick={() => { setActiveDropdown(null); handleAnchorNav('service-lane-05'); }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Advisor Enablement</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">CLARA™ & navigator workflows</div>
                          </Link>
                          <Link
                            to="/#service-lane-06"
                            onClick={() => { setActiveDropdown(null); handleAnchorNav('service-lane-06'); }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Program Implementation</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Cohort setup & staff workflow</div>
                          </Link>
                          <Link
                            to="/#service-lane-08"
                            onClick={() => { setActiveDropdown(null); handleAnchorNav('service-lane-08'); }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Regional Workforce Strategy</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Cross-system facilitation & gap mapping</div>
                          </Link>
                        </div>`;

if (appContent.includes(oldDesktopServices)) {
  appContent = appContent.replace(oldDesktopServices, newDesktopServices);
  console.log('Replaced desktop services dropdown (LF)');
} else if (appContent.includes(oldDesktopServices.replace(/\n/g, '\r\n'))) {
  appContent = appContent.replace(oldDesktopServices.replace(/\n/g, '\r\n'), newDesktopServices.replace(/\n/g, '\r\n'));
  console.log('Replaced desktop services dropdown (CRLF)');
}

// Update "View All 9 →" link in Services dropdown
appContent = appContent.replace(
  '<Link to="/#services" className="text-[10px] text-[#0FA88A] hover:underline font-mono">\n                            View All 9 →\n                          </Link>',
  '<Link to="/#services" onClick={() => { setActiveDropdown(null); handleAnchorNav(\'services\'); }} className="text-[10px] text-[#0FA88A] hover:underline font-mono">\n                            View All 9 →\n                          </Link>'
);
appContent = appContent.replace(
  '<Link to="/#services" className="text-[10px] text-[#0FA88A] hover:underline font-mono">\r\n                            View All 9 →\r\n                          </Link>',
  '<Link to="/#services" onClick={() => { setActiveDropdown(null); handleAnchorNav(\'services\'); }} className="text-[10px] text-[#0FA88A] hover:underline font-mono">\r\n                            View All 9 →\r\n                          </Link>'
);

// Update Mobile Services menu
const oldMobileServices = `<div className="pl-4 pb-2 space-y-1.5 border-l-2 border-cyan-400/60 ml-2 mt-1">
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Capability Discovery</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Pathway Planning</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Career Readiness</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Advisor Enablement</Link>
                      <Link to="/organizations/implementation" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Program Implementation</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Rural & Regional Strategy</Link>
                    </div>`;

const newMobileServices = `<div className="pl-4 pb-2 space-y-1.5 border-l-2 border-cyan-400/60 ml-2 mt-1">
                      <Link to="/#service-lane-01" onClick={() => handleAnchorNav('service-lane-01')} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Capability Discovery</Link>
                      <Link to="/#service-lane-02" onClick={() => handleAnchorNav('service-lane-02')} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Pathway Planning</Link>
                      <Link to="/#service-lane-04" onClick={() => handleAnchorNav('service-lane-04')} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Career Readiness</Link>
                      <Link to="/#service-lane-05" onClick={() => handleAnchorNav('service-lane-05')} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Advisor Enablement</Link>
                      <Link to="/#service-lane-06" onClick={() => handleAnchorNav('service-lane-06')} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Program Implementation</Link>
                      <Link to="/#service-lane-08" onClick={() => handleAnchorNav('service-lane-08')} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Rural & Regional Strategy</Link>
                    </div>`;

if (appContent.includes(oldMobileServices)) {
  appContent = appContent.replace(oldMobileServices, newMobileServices);
  console.log('Replaced mobile services menu (LF)');
} else if (appContent.includes(oldMobileServices.replace(/\n/g, '\r\n'))) {
  appContent = appContent.replace(oldMobileServices.replace(/\n/g, '\r\n'), newMobileServices.replace(/\n/g, '\r\n'));
  console.log('Replaced mobile services menu (CRLF)');
}

// Add Section 6: WhatElevIqDelivers and #who-we-serve to HomePage
const oldSectionBetween = `      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. 7 PARTICIPANT ENTRY POINTS ROUTING GRID */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="audience-routing" className="scroll-mt-24">`;

const newSectionBetween = `      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 6. WHAT ELEVIQ CAN HELP DELIVER (9 APPROVED SERVICE LANES) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="services" className="scroll-mt-28">
        <ScrollReveal>
          <WhatElevIqDelivers variant="dark" />
        </ScrollReveal>
      </div>

      {/* WHO WE SERVE SECTION ANCHOR */}
      <div id="who-we-serve" className="scroll-mt-28" />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. 7 PARTICIPANT ENTRY POINTS ROUTING GRID */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="audience-routing" className="scroll-mt-24">`;

if (appContent.includes(oldSectionBetween)) {
  appContent = appContent.replace(oldSectionBetween, newSectionBetween);
  console.log('Added Section 6 to HomePage (LF)');
} else if (appContent.includes(oldSectionBetween.replace(/\n/g, '\r\n'))) {
  appContent = appContent.replace(oldSectionBetween.replace(/\n/g, '\r\n'), newSectionBetween.replace(/\n/g, '\r\n'));
  console.log('Added Section 6 to HomePage (CRLF)');
}

// Update IndividualsHome Request an Invitation handler
const oldIndivReq = `                    onClick={(e) => {
                      if (window.location.pathname === '/') {
                        const el = document.getElementById('participation-inquiry')
                        if (el) {
                          e.preventDefault()
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          setTimeout(() => {
                            const nameInput = document.getElementById('name') || document.getElementById('audienceIntent')
                            if (nameInput) nameInput.focus()
                          }, 350)
                        }
                      }
                    }}`;

const newIndivReq = `                    onClick={(e) => {
                      const formEl = document.getElementById('participation-inquiry') || document.getElementById('contact-inquiry') || document.getElementById('contact-inquiry-section')
                      if (formEl) {
                        e.preventDefault()
                        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        setTimeout(() => {
                          const nameInput = document.getElementById('name') || document.getElementById('audienceIntent')
                          if (nameInput) nameInput.focus()
                        }, 350)
                      }
                    }}`;

if (appContent.includes(oldIndivReq)) {
  appContent = appContent.replace(oldIndivReq, newIndivReq);
  console.log('Updated IndividualsHome request invitation handler (LF)');
} else if (appContent.includes(oldIndivReq.replace(/\n/g, '\r\n'))) {
  appContent = appContent.replace(oldIndivReq.replace(/\n/g, '\r\n'), newIndivReq.replace(/\n/g, '\r\n'));
  console.log('Updated IndividualsHome request invitation handler (CRLF)');
}

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('Saved frontend/src/App.jsx');

