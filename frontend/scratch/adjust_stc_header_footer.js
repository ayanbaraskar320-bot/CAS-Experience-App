import fs from 'fs';

console.log('=== APPLYING HEADER AND FOOTER ADJUSTMENTS TO STC INNOVATIONS ===');

// 1. Update frontend/src/components/STCInnovationsPage.jsx
const fePath = 'frontend/src/components/STCInnovationsPage.jsx';
let fe = fs.readFileSync(fePath, 'utf8');

// Header desktop pill badge removal
const feHeaderPill = `            {/* Cross-Link Badge: ElevIQ Foundation ↗ */}
            <a
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

if (fe.includes(feHeaderPill)) {
  fe = fe.replace(feHeaderPill, '');
  console.log('Removed desktop header pill from frontend STC page (LF)');
} else if (fe.includes(feHeaderPill.replace(/\n/g, '\r\n'))) {
  fe = fe.replace(feHeaderPill.replace(/\n/g, '\r\n'), '');
  console.log('Removed desktop header pill from frontend STC page (CRLF)');
}

// Mobile drawer pill badge removal
const feMobilePill = `              <a
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

if (fe.includes(feMobilePill)) {
  fe = fe.replace(feMobilePill, '');
  console.log('Removed mobile drawer pill from frontend STC page (LF)');
} else if (fe.includes(feMobilePill.replace(/\n/g, '\r\n'))) {
  fe = fe.replace(feMobilePill.replace(/\n/g, '\r\n'), '');
  console.log('Removed mobile drawer pill from frontend STC page (CRLF)');
}

// Ensure header CTA passes preselected interest
fe = fe.replace(
  'onClick={() => openDemoModal()}\n              className="hidden sm:inline-flex',
  'onClick={() => openDemoModal(\'CAS Commercial Demonstration\')}\n              className="hidden sm:inline-flex'
);
fe = fe.replace(
  'onClick={() => openDemoModal()}\r\n              className="hidden sm:inline-flex',
  'onClick={() => openDemoModal(\'CAS Commercial Demonstration\')}\r\n              className="hidden sm:inline-flex'
);

// Ensure mobile drawer CTA passes preselected interest
fe = fe.replace(
  'onClick={() => { setIsMobileMenuOpen(false); openDemoModal(); }}',
  'onClick={() => { setIsMobileMenuOpen(false); openDemoModal(\'CAS Commercial Demonstration\'); }}'
);

// Update Footer contextual link to Foundation FAQs
const oldFeFooterLink = `<a href="https://eleviqfoundation.org/faqs" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                    <span>Nonprofit Programs FAQ ↗</span>
                  </a>`;

const newFeFooterLink = `<a
                    href="https://eleviqfoundation.org/faqs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1 text-xs leading-relaxed"
                    title="Learn about our nonprofit partnership: ElevIQ Foundation FAQs"
                  >
                    <span>Learn about our nonprofit partnership: ElevIQ Foundation FAQs ↗</span>
                  </a>`;

if (fe.includes(oldFeFooterLink)) {
  fe = fe.replace(oldFeFooterLink, newFeFooterLink);
  console.log('Updated footer link in frontend STC page (LF)');
} else if (fe.includes(oldFeFooterLink.replace(/\n/g, '\r\n'))) {
  fe = fe.replace(oldFeFooterLink.replace(/\n/g, '\r\n'), newFeFooterLink.replace(/\n/g, '\r\n'));
  console.log('Updated footer link in frontend STC page (CRLF)');
}

fs.writeFileSync(fePath, fe, 'utf8');
console.log('Saved frontend/src/components/STCInnovationsPage.jsx');


// 2. Update stc-innovations/src/components/STCInnovationsPage.jsx
const stcPath = 'stc-innovations/src/components/STCInnovationsPage.jsx';
if (fs.existsSync(stcPath)) {
  let stc = fs.readFileSync(stcPath, 'utf8');

  // Header desktop pill badge removal
  const stcHeaderPill = `            {/* Cross-Link Badge: ElevIQ Foundation ↗ */}
            <a
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

  if (stc.includes(stcHeaderPill)) {
    stc = stc.replace(stcHeaderPill, '');
    console.log('Removed desktop header pill from standalone STC page (LF)');
  } else if (stc.includes(stcHeaderPill.replace(/\n/g, '\r\n'))) {
    stc = stc.replace(stcHeaderPill.replace(/\n/g, '\r\n'), '');
    console.log('Removed desktop header pill from standalone STC page (CRLF)');
  }

  // Mobile drawer pill badge removal
  const stcMobilePill = `              <a
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

  if (stc.includes(stcMobilePill)) {
    stc = stc.replace(stcMobilePill, '');
    console.log('Removed mobile drawer pill from standalone STC page (LF)');
  } else if (stc.includes(stcMobilePill.replace(/\n/g, '\r\n'))) {
    stc = stc.replace(stcMobilePill.replace(/\n/g, '\r\n'), '');
    console.log('Removed mobile drawer pill from standalone STC page (CRLF)');
  }

  // Ensure header CTA passes preselected interest
  stc = stc.replace(
    'onClick={() => openDemoModal()}\n              className="hidden sm:inline-flex',
    'onClick={() => openDemoModal(\'CAS Commercial Demonstration\')}\n              className="hidden sm:inline-flex'
  );
  stc = stc.replace(
    'onClick={() => openDemoModal()}\r\n              className="hidden sm:inline-flex',
    'onClick={() => openDemoModal(\'CAS Commercial Demonstration\')}\r\n              className="hidden sm:inline-flex'
  );

  // Ensure mobile drawer CTA passes preselected interest
  stc = stc.replace(
    'onClick={() => { setIsMobileMenuOpen(false); openDemoModal(); }}',
    'onClick={() => { setIsMobileMenuOpen(false); openDemoModal(\'CAS Commercial Demonstration\'); }}'
  );

  // Update Footer contextual link to Foundation FAQs
  const oldStcFooterLink = `<a href={ELEVIQ_LINKS.faqs} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                    <span>Nonprofit Programs FAQ ↗</span>
                  </a>`;

  const newStcFooterLink = `<a
                    href={ELEVIQ_LINKS.faqs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1 text-xs leading-relaxed"
                    title="Learn about our nonprofit partnership: ElevIQ Foundation FAQs"
                  >
                    <span>Learn about our nonprofit partnership: ElevIQ Foundation FAQs ↗</span>
                  </a>`;

  if (stc.includes(oldStcFooterLink)) {
    stc = stc.replace(oldStcFooterLink, newStcFooterLink);
    console.log('Updated footer link in standalone STC page (LF)');
  } else if (stc.includes(oldStcFooterLink.replace(/\n/g, '\r\n'))) {
    stc = stc.replace(oldStcFooterLink.replace(/\n/g, '\r\n'), newStcFooterLink.replace(/\n/g, '\r\n'));
    console.log('Updated footer link in standalone STC page (CRLF)');
  }

  fs.writeFileSync(stcPath, stc, 'utf8');
  console.log('Saved stc-innovations/src/components/STCInnovationsPage.jsx');
}

