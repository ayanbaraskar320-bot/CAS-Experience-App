import fs from 'fs';

console.log('=== UPDATING STC INNOVATIONS PAGES ===');

// 1. Update frontend/src/components/STCInnovationsPage.jsx
const fePagePath = 'frontend/src/components/STCInnovationsPage.jsx';
let fePage = fs.readFileSync(fePagePath, 'utf8');

// Header CTA button
fePage = fePage.replace(
  '>\r\n              Book a Demo\r\n            </button>',
  '>\r\n              Request a CAS Demo\r\n            </button>'
);
fePage = fePage.replace(
  '>\n              Book a Demo\n            </button>',
  '>\n              Request a CAS Demo\n            </button>'
);

// Mobile Drawer CTA button
fePage = fePage.replace(
  'Book a Demo →',
  'Request a CAS Demo →'
);

// Header badge link to ElevIQ Foundation -> Nonprofit Programs FAQ
const oldHeaderBadgeFe = `<Link
              to="/individuals"
              className="ml-2 px-3 py-1.5 rounded-full border border-sky-200 bg-sky-50 hover:bg-sky-100 text-[#0284C7] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              title="ElevIQ Foundation Inc. (Nonprofit Arm)"
            >
              <span>ElevIQ Foundation</span>
              <svg className="w-3.5 h-3.5 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>`;

const newHeaderBadgeFe = `<a
              href="https://eleviqfoundation.org/faqs"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 rounded-full border border-sky-200 bg-sky-50 hover:bg-sky-100 text-[#0284C7] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              title="For background information regarding nonprofit participant programs, visit the ElevIQ Foundation FAQs."
            >
              <span>Nonprofit Programs FAQ</span>
              <svg className="w-3.5 h-3.5 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>`;

if (fePage.includes(oldHeaderBadgeFe)) {
  fePage = fePage.replace(oldHeaderBadgeFe, newHeaderBadgeFe);
} else if (fePage.includes(oldHeaderBadgeFe.replace(/\n/g, '\r\n'))) {
  fePage = fePage.replace(oldHeaderBadgeFe.replace(/\n/g, '\r\n'), newHeaderBadgeFe.replace(/\n/g, '\r\n'));
}

// Mobile drawer link to ElevIQ Foundation
const oldMobileBadgeFe = `<Link
                to="/individuals"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold flex items-center justify-between mt-2"
              >
                <span>ElevIQ Foundation (Nonprofit)</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>`;

const newMobileBadgeFe = `<a
                href="https://eleviqfoundation.org/faqs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold flex items-center justify-between mt-2"
              >
                <span>Nonprofit Programs FAQ ↗</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>`;

if (fePage.includes(oldMobileBadgeFe)) {
  fePage = fePage.replace(oldMobileBadgeFe, newMobileBadgeFe);
} else if (fePage.includes(oldMobileBadgeFe.replace(/\n/g, '\r\n'))) {
  fePage = fePage.replace(oldMobileBadgeFe.replace(/\n/g, '\r\n'), newMobileBadgeFe.replace(/\n/g, '\r\n'));
}

// Hero CTAs in frontend STC page
const oldHeroCtasFe = `<div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* Primary CTA: Book a Demo (Sales Modal) */}
                  <button
                    type="button"
                    onClick={() => openDemoModal()}
                    className="rounded-full bg-[#0052CC] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2"
                  >
                    <span>Book a Demo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {/* Secondary Outline CTA: Explore ElevIQ CAS (Cross-Platform Link) */}
                  <Link
                    to="/platform"
                    className="rounded-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-[#0052CC] hover:text-[#0052CC] px-7 py-3 text-sm sm:text-base font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xs flex items-center gap-2"
                  >
                    <span>Explore ElevIQ CAS</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </div>`;

const newHeroCtasFe = `<div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* Primary CTA: Request a CAS Demo */}
                  <button
                    type="button"
                    onClick={() => openDemoModal('CAS Commercial Demonstration')}
                    className="rounded-full bg-[#0052CC] hover:bg-[#1D4ED8] text-white px-7 sm:px-8 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request a CAS Demo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {/* Secondary Outline CTA: Discuss Organizational Deployment */}
                  <button
                    type="button"
                    onClick={() => openDemoModal('Organizational Deployment & Enterprise Licensing')}
                    className="rounded-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-[#0052CC] hover:text-[#0052CC] px-7 sm:px-8 py-3.5 text-sm sm:text-base font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Discuss Organizational Deployment</span>
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-[#0052CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>`;

if (fePage.includes(oldHeroCtasFe)) {
  fePage = fePage.replace(oldHeroCtasFe, newHeroCtasFe);
  console.log('Replaced hero CTAs in frontend STC page (LF)');
} else if (fePage.includes(oldHeroCtasFe.replace(/\n/g, '\r\n'))) {
  fePage = fePage.replace(oldHeroCtasFe.replace(/\n/g, '\r\n'), newHeroCtasFe.replace(/\n/g, '\r\n'));
  console.log('Replaced hero CTAs in frontend STC page (CRLF)');
}

// Footer link in frontend STC page
const oldFooterLinkFe = `<Link to="/individuals" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                    <span>ElevIQ Foundation ↗</span>
                  </Link>`;
const newFooterLinkFe = `<a href="https://eleviqfoundation.org/faqs" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                    <span>Nonprofit Programs FAQ ↗</span>
                  </a>`;

if (fePage.includes(oldFooterLinkFe)) {
  fePage = fePage.replace(oldFooterLinkFe, newFooterLinkFe);
} else if (fePage.includes(oldFooterLinkFe.replace(/\n/g, '\r\n'))) {
  fePage = fePage.replace(oldFooterLinkFe.replace(/\n/g, '\r\n'), newFooterLinkFe.replace(/\n/g, '\r\n'));
}

fs.writeFileSync(fePagePath, fePage, 'utf8');
console.log('Saved frontend/src/components/STCInnovationsPage.jsx');


// 2. Update stc-innovations/src/components/STCInnovationsPage.jsx
const stcPagePath = 'stc-innovations/src/components/STCInnovationsPage.jsx';
if (fs.existsSync(stcPagePath)) {
  let stcPage = fs.readFileSync(stcPagePath, 'utf8');

  // Header CTA button
  stcPage = stcPage.replace(
    '>\r\n              Book a Demo\r\n            </button>',
    '>\r\n              Request a CAS Demo\r\n            </button>'
  );
  stcPage = stcPage.replace(
    '>\n              Book a Demo\n            </button>',
    '>\n              Request a CAS Demo\n            </button>'
  );

  // Mobile Drawer CTA button
  stcPage = stcPage.replace(
    'Book a Demo\n            </button>',
    'Request a CAS Demo →\n            </button>'
  );
  stcPage = stcPage.replace(
    'Book a Demo\r\n            </button>',
    'Request a CAS Demo →\r\n            </button>'
  );

  // Header badge link in stc-innovations
  const oldHeaderBadgeStc = `<a
              href={ELEVIQ_LINKS.individuals}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 rounded-full border border-sky-200 bg-sky-50 hover:bg-sky-100 text-[#0284C7] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              title="ElevIQ Foundation Inc. (Nonprofit Arm)"
            >
              <span>ElevIQ Foundation</span>
              <svg className="w-3.5 h-3.5 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>`;

  const newHeaderBadgeStc = `<a
              href={ELEVIQ_LINKS.faqs}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 rounded-full border border-sky-200 bg-sky-50 hover:bg-sky-100 text-[#0284C7] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              title="For background information regarding nonprofit participant programs, visit the ElevIQ Foundation FAQs."
            >
              <span>Nonprofit Programs FAQ</span>
              <svg className="w-3.5 h-3.5 text-[#0284C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>`;

  if (stcPage.includes(oldHeaderBadgeStc)) {
    stcPage = stcPage.replace(oldHeaderBadgeStc, newHeaderBadgeStc);
  } else if (stcPage.includes(oldHeaderBadgeStc.replace(/\n/g, '\r\n'))) {
    stcPage = stcPage.replace(oldHeaderBadgeStc.replace(/\n/g, '\r\n'), newHeaderBadgeStc.replace(/\n/g, '\r\n'));
  }

  // Mobile drawer badge link in stc-innovations
  const oldMobileBadgeStc = `<a
                href={ELEVIQ_LINKS.individuals}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold flex items-center justify-between mt-2"
              >
                <span>ElevIQ Foundation (Nonprofit) ↗</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>`;

  const newMobileBadgeStc = `<a
                href={ELEVIQ_LINKS.faqs}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold flex items-center justify-between mt-2"
              >
                <span>Nonprofit Programs FAQ ↗</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>`;

  if (stcPage.includes(oldMobileBadgeStc)) {
    stcPage = stcPage.replace(oldMobileBadgeStc, newMobileBadgeStc);
  } else if (stcPage.includes(oldMobileBadgeStc.replace(/\n/g, '\r\n'))) {
    stcPage = stcPage.replace(oldMobileBadgeStc.replace(/\n/g, '\r\n'), newMobileBadgeStc.replace(/\n/g, '\r\n'));
  }

  // Hero CTAs in stc-innovations page
  const oldHeroCtasStc = `<div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => openDemoModal('Hero Commercial Ingestion')}
                    className="rounded-full bg-[#0052CC] hover:bg-[#1D4ED8] text-white px-8 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                  >
                    <span>Schedule Enterprise Demo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {/* Secondary Outline CTA: Explore ElevIQ CAS (Cross-Platform Link) */}
                  <a
                    href={ELEVIQ_LINKS.platform}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-[#0052CC] hover:text-[#0052CC] px-7 py-3 text-sm sm:text-base font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xs flex items-center gap-2"
                  >
                    <span>Explore ElevIQ CAS ↗</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>`;

  const newHeroCtasStc = `<div className="flex flex-wrap items-center gap-4 pt-2">
                  {/* Primary CTA: Request a CAS Demo */}
                  <button
                    type="button"
                    onClick={() => openDemoModal('CAS Commercial Demonstration')}
                    className="rounded-full bg-[#0052CC] hover:bg-[#1D4ED8] text-white px-8 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request a CAS Demo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {/* Secondary Outline CTA: Discuss Organizational Deployment */}
                  <button
                    type="button"
                    onClick={() => openDemoModal('Organizational Deployment & Enterprise Licensing')}
                    className="rounded-full bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-[#0052CC] hover:text-[#0052CC] px-7 py-3 text-sm sm:text-base font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Discuss Organizational Deployment</span>
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-[#0052CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>`;

  if (stcPage.includes(oldHeroCtasStc)) {
    stcPage = stcPage.replace(oldHeroCtasStc, newHeroCtasStc);
    console.log('Replaced hero CTAs in stc-innovations page (LF)');
  } else if (stcPage.includes(oldHeroCtasStc.replace(/\n/g, '\r\n'))) {
    stcPage = stcPage.replace(oldHeroCtasStc.replace(/\n/g, '\r\n'), newHeroCtasStc.replace(/\n/g, '\r\n'));
    console.log('Replaced hero CTAs in stc-innovations page (CRLF)');
  }

  // Footer link in stc-innovations
  const oldFooterLinkStc = `<a href={ELEVIQ_LINKS.individuals} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                    <span>ElevIQ Foundation ↗</span>
                  </a>`;
  const newFooterLinkStc = `<a href={ELEVIQ_LINKS.faqs} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                    <span>Nonprofit Programs FAQ ↗</span>
                  </a>`;

  if (stcPage.includes(oldFooterLinkStc)) {
    stcPage = stcPage.replace(oldFooterLinkStc, newFooterLinkStc);
  } else if (stcPage.includes(oldFooterLinkStc.replace(/\n/g, '\r\n'))) {
    stcPage = stcPage.replace(oldFooterLinkStc.replace(/\n/g, '\r\n'), newFooterLinkStc.replace(/\n/g, '\r\n'));
  }

  // Platform spec dropdown link in navbar
  stcPage = stcPage.replace(
    '<a\n                      href={ELEVIQ_LINKS.platform}\n                      target="_blank"\n                      rel="noopener noreferrer"\n                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group flex items-center justify-between border-t border-slate-100 mt-1"\n                    >\n                      <div>\n                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Full Platform Spec ↗</div>\n                        <div className="text-[11px] text-slate-500">ElevIQ Foundation Platform Details</div>\n                      </div>\n                      <span className="text-[#0052CC] text-xs">↗</span>\n                    </a>',
    '<a\n                      href={ELEVIQ_LINKS.faqs}\n                      target="_blank"\n                      rel="noopener noreferrer"\n                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group flex items-center justify-between border-t border-slate-100 mt-1"\n                    >\n                      <div>\n                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Nonprofit Programs FAQ ↗</div>\n                        <div className="text-[11px] text-slate-500">ElevIQ Foundation participant programs</div>\n                      </div>\n                      <span className="text-[#0052CC] text-xs">↗</span>\n                    </a>'
  );

  fs.writeFileSync(stcPagePath, stcPage, 'utf8');
  console.log('Saved stc-innovations/src/components/STCInnovationsPage.jsx');
}

