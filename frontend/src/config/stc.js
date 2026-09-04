/**
 * Centralized STC Innovations handoff URL.
 * Local dev (VITE_STC_URL unset) falls back to the embedded internal `/stc` page.
 * Production builds set VITE_STC_URL=https://www.stc-innovations.com/ (see deploy.yml).
 */
const rawStcUrl = import.meta.env.VITE_STC_URL || '/stc'
export const STC_URL = rawStcUrl.replace(/\/+$/, '') || '/stc'
export const isExternalStcUrl = /^https?:\/\//i.test(STC_URL)
