import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import STCDashboardMockup from './STCDashboardMockup'
import STCDemoModal from './STCDemoModal'
import EcosystemRelationship from './EcosystemRelationship'
import { ELEVIQ_LINKS, getElevIqUrl } from '../config/links'

export default function STCInnovationsPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false)
  const [demoInitialInterest, setDemoInitialInterest] = useState('')
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTabSolution, setActiveTabSolution] = useState(0)

  const openDemoModal = (interest = '') => {
    setDemoInitialInterest(interest)
    setIsDemoModalOpen(true)
  }

  // Smooth scroll handler for anchor jumps
  const scrollToSection = (id) => {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-stc-body selection:bg-blue-600 selection:text-white flex flex-col antialiased">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. GLOBAL HEADER & NAVIGATION */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: STC Innovations Official Logo */}
          <Link
            to="/"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC] rounded-xl p-1 shrink-0"
            aria-label="STC Innovations Homepage"
          >
            <img
              src="/stc-innovations-logo.png"
              alt="STC Innovations - Innovate. Empower. Elevate."
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
          </Link>

          {/* Center Links (Desktop Nav with Dropdowns) */}
          <nav aria-label="Commercial navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Dropdown 1: ElevIQ CAS ▾ */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('cas')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'cas' ? null : 'cas')}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0052CC] rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC]"
                aria-expanded={activeDropdown === 'cas'}
              >
                <span>ElevIQ CAS™</span>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown === 'cas' ? 'rotate-180 text-[#0052CC]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'cas' && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="rounded-2xl bg-white border border-slate-200 p-2 shadow-xl">
                    <button
                      type="button"
                      onClick={() => scrollToSection('hero')}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Platform Overview</div>
                      <div className="text-[11px] text-slate-500">Commercial human-skills intelligence</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('methodology')}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Core Architecture</div>
                      <div className="text-[11px] text-slate-500">5-step capability alignment infrastructure</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('value-prop')}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Capability Signals™</div>
                      <div className="text-[11px] text-slate-500">Structured qualitative workforce indicators</div>
                    </button>
                    <a
                      href={ELEVIQ_LINKS.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group flex items-center justify-between border-t border-slate-100 mt-1"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Full Platform Spec ↗</div>
                        <div className="text-[11px] text-slate-500">ElevIQ Foundation Platform Details</div>
                      </div>
                      <span className="text-[#0052CC] text-xs">↗</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2: Solutions ▾ */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0052CC] rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052CC]"
                aria-expanded={activeDropdown === 'solutions'}
              >
                <span>Solutions</span>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${activeDropdown === 'solutions' ? 'rotate-180 text-[#0052CC]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'solutions' && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="rounded-2xl bg-white border border-slate-200 p-2 shadow-xl">
                    <button
                      type="button"
                      onClick={() => { scrollToSection('solutions'); setActiveTabSolution(0); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">For Employers & Enterprises</div>
                      <div className="text-[11px] text-slate-500">Role alignment, development & talent pathways</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => { scrollToSection('solutions'); setActiveTabSolution(1); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Workforce Organizations & WIBs</div>
                      <div className="text-[11px] text-slate-500">Participant insights & cohort intelligence</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => { scrollToSection('solutions'); setActiveTabSolution(2); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Education & Training Hubs</div>
                      <div className="text-[11px] text-slate-500">Connect credentials with human skills</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => { scrollToSection('solutions'); setActiveTabSolution(3); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-[#0052CC]">Community & Economic Mobility</div>
                      <div className="text-[11px] text-slate-500">Connecting regional talent with opportunity</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Link: How It Works */}
            <button
              type="button"
              onClick={() => scrollToSection('methodology')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0052CC] rounded-lg hover:bg-slate-50 transition-colors"
            >
              How It Works
            </button>

            {/* Direct Link: About STC */}
            <button
              type="button"
              onClick={() => scrollToSection('about-stc')}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#0052CC] rounded-lg hover:bg-slate-50 transition-colors"
            >
              About STC
            </button>

            {/* Cross-Link Badge: ElevIQ Foundation ↗ */}
            <a
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
            </a>
          </nav>

          {/* Right CTA: Book a Demo Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openDemoModal()}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#0052CC] hover:bg-[#1D4ED8] text-white px-6 py-2.5 text-sm font-bold shadow-md shadow-blue-500/25 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a Demo
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle mobile navigation"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
            <div className="flex flex-col space-y-1">
              <button
                type="button"
                onClick={() => scrollToSection('hero')}
                className="text-left py-2 text-sm font-semibold text-slate-800 hover:text-[#0052CC]"
              >
                Platform Overview
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('solutions')}
                className="text-left py-2 text-sm font-semibold text-slate-800 hover:text-[#0052CC]"
              >
                Enterprise Solutions
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('methodology')}
                className="text-left py-2 text-sm font-semibold text-slate-800 hover:text-[#0052CC]"
              >
                Methodology (How It Works)
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('about-stc')}
                className="text-left py-2 text-sm font-semibold text-slate-800 hover:text-[#0052CC]"
              >
                About STC Innovations
              </button>
              <a
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
              </a>
            </div>
            <button
              type="button"
              onClick={() => { setIsMobileMenuOpen(false); openDemoModal(); }}
              className="w-full rounded-full bg-[#0052CC] text-white py-3 text-sm font-bold shadow-md shadow-blue-500/20"
            >
              Book a Demo
            </button>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. MAIN BODY CONTENT */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <main className="flex-1">
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: HERO (TWO-COLUMN WITH LIVE SCREENSHOT PREVIEW) */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="hero" className="relative py-12 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Heading, Subtitle & CTAs */}
              <div className="lg:col-span-6 space-y-6 text-left">
                {/* Commercial Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold text-[#0052CC] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#0052CC] animate-pulse" />
                  <span>COMMERCIAL CAS™ DEPLOYMENT & LICENSING</span>
                </div>

                <h1 className="font-stc-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                  Deploy Enterprise{' '}
                  <span className="stc-text-gradient">Human-Skills Intelligence</span>{' '}
                  Across Your Organization.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-xl">
                  STC Innovations is the exclusive commercial development and enterprise licensing provider for the ElevIQ Capability Alignment System™ (CAS). We empower employers, workforce boards, and educational institutions to align human capability with regional opportunity.
                </p>

                {/* Primary CTA Cluster */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
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
                </div>

                {/* Trust Metrics Footnote */}
                <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-4 text-left">
                  <div>
                    <div className="font-stc-heading text-lg sm:text-xl font-extrabold text-slate-900">100%</div>
                    <div className="text-xs text-slate-500 font-medium">Non-Deficit Framework</div>
                  </div>
                  <div>
                    <div className="font-stc-heading text-lg sm:text-xl font-extrabold text-slate-900">Zero</div>
                    <div className="text-xs text-slate-500 font-medium">Black-Box Rejections</div>
                  </div>
                  <div>
                    {/* Privacy/data-practice language pending separate approval */}
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Screenshot Container */}
              <div className="lg:col-span-6 flex justify-center items-center">
                <div
                  onClick={() => setIsScreenshotModalOpen(true)}
                  className="w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
                >
                  <img
                    src="/snapshots/stc-admin-console.png"
                    alt="ElevIQ CAS Admin Console Screenshot"
                    className="w-full h-auto object-contain block"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: VALUE PROPOSITION (3-CARD GRID) */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="value-prop" className="py-16 sm:py-20 lg:py-24 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header Block */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0052CC] font-mono text-xs font-bold uppercase tracking-wider">
                CORE VALUE PROPOSITION
              </span>
              <h2 className="font-stc-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Résumés tell you what someone has done.{' '}
                <span className="text-[#0052CC]">ElevIQ helps reveal what they can bring.</span>
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                Organizations have plenty of workforce data, but often lack a clear picture of people's human skills, transferable capabilities, development needs and potential alignment with roles and opportunities.
              </p>
            </div>

            {/* 3 Core Value Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1: UNDERSTAND */}
              <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D2FF] to-[#0052CC] text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#0052CC] uppercase block">
                      PILLAR 01
                    </span>
                    <h3 className="font-stc-heading text-2xl font-bold text-slate-900">
                      UNDERSTAND
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Reveal human skills, capabilities, experience and context that traditional assessments and keyword resume filters miss.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/80 text-xs font-semibold text-[#0052CC] flex items-center gap-1">
                  <span>Explore Capability Signals™</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Card 2: ALIGN */}
              <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0052CC] to-[#1D4ED8] text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#0052CC] uppercase block">
                      PILLAR 02
                    </span>
                    <h3 className="font-stc-heading text-2xl font-bold text-slate-900">
                      ALIGN
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Connect people with roles, pathways, and opportunities based on demonstrated human capabilities rather than rigid degree proxies.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/80 text-xs font-semibold text-[#0052CC] flex items-center gap-1">
                  <span>View Role Alignment Models</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Card 3: DEVELOP */}
              <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-8 flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
                <div className="space-y-4">
                  {/* Icon Circle */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1D4ED8] to-[#00D2FF] text-white flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#0052CC] uppercase block">
                      PILLAR 03
                    </span>
                    <h3 className="font-stc-heading text-2xl font-bold text-slate-900">
                      DEVELOP
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Identify growth needs, uncover non-linear strengths, and create clear next steps that empower individuals and organizations alike.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/80 text-xs font-semibold text-[#0052CC] flex items-center gap-1">
                  <span>See Development Workflows</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: AUDIENCE SOLUTIONS (4-COLUMN GRID) */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="solutions" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
              <div className="space-y-3 max-w-2xl">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0052CC] font-mono text-xs font-bold uppercase tracking-wider">
                  ENTERPRISE SOLUTIONS
                </span>
                <h2 className="font-stc-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Built for Organizations That Develop People
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Tailored commercial architectures configuring the ElevIQ Capability Alignment System™ for specific operational goals.
                </p>
              </div>

              {/* Direct Link Affordance */}
              <a
                href={ELEVIQ_LINKS.platform}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-50 text-[#0052CC] border border-slate-300 hover:border-[#0052CC] px-6 py-2.5 text-sm font-bold shadow-xs transition-all hover:scale-[1.02]"
              >
                <span>See ElevIQ CAS in Action ↗</span>
                <span>→</span>
              </a>
            </div>

            {/* 4-Column Solutions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Solution 1: Employers */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center font-bold font-mono text-lg border border-blue-100">
                    01
                  </div>
                  <h3 className="font-stc-heading text-xl font-bold text-slate-900">
                    Employers & Enterprises
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Understand workforce capabilities, improve role alignment, identify development needs, and build stronger talent pathways.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Role Alignment Benchmarking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Internal Mobility & Retention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Skills-First Hiring Pipelines</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => openDemoModal('Employers & Enterprise Solutions')}
                  className="text-xs font-bold text-[#0052CC] hover:text-[#1D4ED8] flex items-center gap-1 pt-2"
                >
                  Configure for Employers →
                </button>
              </div>

              {/* Solution 2: Workforce Organizations */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#0052CC] flex items-center justify-center font-bold font-mono text-lg border border-cyan-100">
                    02
                  </div>
                  <h3 className="font-stc-heading text-xl font-bold text-slate-900">
                    Workforce Organizations
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Bring participant insights, programs, pathways, and outcomes together to support personalized workforce development.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Advisor & Coach Workspaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Cohort Progression Tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Aggregate Outcome Reporting</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => openDemoModal('Workforce Organizations & WIBs')}
                  className="text-xs font-bold text-[#0052CC] hover:text-[#1D4ED8] flex items-center gap-1 pt-2"
                >
                  Configure for Workforce →
                </button>
              </div>

              {/* Solution 3: Education & Training */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center font-bold font-mono text-lg border border-blue-100">
                    03
                  </div>
                  <h3 className="font-stc-heading text-xl font-bold text-slate-900">
                    Education & Training
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Help learners understand their human skills and connect education/training with future opportunities.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>CTE & Trade Skill Alignment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Curriculum-to-Role Mapping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Learner Reflection Dashboards</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => openDemoModal('Education & Training Organizations')}
                  className="text-xs font-bold text-[#0052CC] hover:text-[#1D4ED8] flex items-center gap-1 pt-2"
                >
                  Configure for Education →
                </button>
              </div>

              {/* Solution 4: Community & Economic Mobility */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#0052CC] flex items-center justify-center font-bold font-mono text-lg border border-cyan-100">
                    04
                  </div>
                  <h3 className="font-stc-heading text-xl font-bold text-slate-900">
                    Community & Mobility
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Use human-skills intelligence to help connect people with pathways, resources, and opportunities.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Regional Talent Densities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Cross-Sector Coalition Portals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052CC]" />
                      <span>Opportunity Access Matching</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => openDemoModal('Community & Economic Mobility')}
                  className="text-xs font-bold text-[#0052CC] hover:text-[#1D4ED8] flex items-center gap-1 pt-2"
                >
                  Configure for Community →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: 5-STEP METHODOLOGY FLOW */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="methodology" className="py-16 sm:py-20 lg:py-24 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0052CC] font-mono text-xs font-bold uppercase tracking-wider">
                PROVEN METHODOLOGY
              </span>
              <h2 className="font-stc-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                How ElevIQ CAS Works
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                A connected 5-step operational framework bridging qualitative self-reflection, advisor workflows, and organizational intelligence.
              </p>
            </div>

            {/* 5 Connected Step Cards with Arrow Dividers */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-2 relative">
              {/* Step 1: DISCOVER */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#0052CC] hover:shadow-md transition-all relative">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#0052CC] text-white font-mono text-xs font-bold flex items-center justify-center">
                      01
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#0052CC] tracking-wider uppercase">
                      CAPTURE
                    </span>
                  </div>
                  <h3 className="font-stc-heading text-lg font-bold text-slate-900">
                    DISCOVER
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    See the whole person via Alignment Scan™, experience, and capability signals.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400">Contextual Ingestion</div>
              </div>

              {/* Step 2: ALIGN */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#0052CC] hover:shadow-md transition-all relative">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#0052CC] text-white font-mono text-xs font-bold flex items-center justify-center">
                      02
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#0052CC] tracking-wider uppercase">
                      MAP
                    </span>
                  </div>
                  <h3 className="font-stc-heading text-lg font-bold text-slate-900">
                    ALIGN
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Connect capabilities to opportunity (role, career, and pathway alignment).
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400">Role Benchmarking</div>
              </div>

              {/* Step 3: DEVELOP */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#0052CC] hover:shadow-md transition-all relative">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#0052CC] text-white font-mono text-xs font-bold flex items-center justify-center">
                      03
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#0052CC] tracking-wider uppercase">
                      GROW
                    </span>
                  </div>
                  <h3 className="font-stc-heading text-lg font-bold text-slate-900">
                    DEVELOP
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Turn insight into growth (surface development needs, strengths, opportunities).
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400">Targeted Learning</div>
              </div>

              {/* Step 4: SUCCEED */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#0052CC] hover:shadow-md transition-all relative">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#0052CC] text-white font-mono text-xs font-bold flex items-center justify-center">
                      04
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#0052CC] tracking-wider uppercase">
                      DECIDE
                    </span>
                  </div>
                  <h3 className="font-stc-heading text-lg font-bold text-slate-900">
                    SUCCEED
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Make informed decisions (give participants and organizations clearer paths).
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400">Action Pathways™</div>
              </div>

              {/* Step 5: IMPACT */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[#0052CC] hover:shadow-md transition-all relative">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#0052CC] text-white font-mono text-xs font-bold flex items-center justify-center">
                      05
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#0052CC] tracking-wider uppercase">
                      MEASURE
                    </span>
                  </div>
                  <h3 className="font-stc-heading text-lg font-bold text-slate-900">
                    IMPACT
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Measure what matters (organizational intelligence and outcome reporting).
                  </p>
                </div>
                <div className="text-[10px] font-mono text-slate-400">Intelligence Console™</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: IMPLEMENTATION & ADOPTION SUPPORT (5-COLUMN) */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="support" className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-50 text-[#0052CC] font-mono text-xs font-bold uppercase tracking-wider">
                FULL-LIFECYCLE PARTNERSHIP
              </span>
              <h2 className="font-stc-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                More Than Software. A Partner in Successful Adoption.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                STC Innovations pairs cutting-edge CAS™ infrastructure with dedicated professional services to ensure seamless organizational rollout.
              </p>
            </div>

            {/* 5 Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {/* Service 1: Implementation */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-stc-heading text-base font-bold text-slate-900">
                    1. Implementation
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Platform setup, technical configuration, schema calibration, and launch support tailored to your IT ecosystem.
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#0052CC] uppercase">Setup & Launch</div>
              </div>

              {/* Service 2: Onboarding */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0052CC] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-stc-heading text-base font-bold text-slate-900">
                    2. Onboarding
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Administrator, department lead, and organizational cohort onboarding with role-based access management.
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#0052CC] uppercase">Admin Readiness</div>
              </div>

              {/* Service 3: Training */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="font-stc-heading text-base font-bold text-slate-900">
                    3. Training
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Practical workshops for staff, advisors, mentors, and hiring managers to interpret signals without bias.
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#0052CC] uppercase">Staff Enablement</div>
              </div>

              {/* Service 4: Data & Reporting */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0052CC] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-stc-heading text-base font-bold text-slate-900">
                    4. Data & Reporting
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Operationalizing insights, custom executive dashboards, aggregate heat maps, and grant reporting.
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#0052CC] uppercase">Analytics Support</div>
              </div>

              {/* Service 5: Ongoing Support */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0052CC] flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="font-stc-heading text-base font-bold text-slate-900">
                    5. Ongoing Support
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Continuous technical assistance, version upgrades, security audits, and multi-year adoption scaling.
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-[#0052CC] uppercase">Continuous Success</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* SECTION 6: ONE MISSION. DISTINCT ROLES. SHARED INFRASTRUCTURE. */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="about-stc" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <EcosystemRelationship variant="dark" />
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ENTERPRISE FOOTER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#090D16] text-slate-400 border-t border-slate-800 pt-16 pb-12 font-stc-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Row Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg" aria-label="STC Innovations">
                <img
                  src="/stc-innovations-logo-white.png"
                  alt="STC Innovations - Innovate. Empower. Elevate."
                  className="h-11 sm:h-12 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Developer and commercial licensor of the ElevIQ Capability Alignment System™ (CAS). Transforming organizational human-skills intelligence.
              </p>
            </div>

            {/* Column 2: ElevIQ CAS Platform */}
            <div className="space-y-3">
              <h4 className="font-stc-heading text-xs font-bold text-white uppercase tracking-wider">
                ElevIQ CAS™
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href={getElevIqUrl('/platform')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Platform Architecture</span>
                    <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a href={getElevIqUrl('/platform/capability-signals')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Capability Signals™</span>
                    <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a href={getElevIqUrl('/platform/community-intelligence-console')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Intelligence Console™</span>
                    <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a href={getElevIqUrl('/platform/eleviq-clara')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>ElevIQ CLARA™ (Advisors)</span>
                    <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a href={getElevIqUrl('/platform/participant-portal')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Participant Workspace</span>
                    <span className="text-xs">↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="space-y-3">
              <h4 className="font-stc-heading text-xs font-bold text-white uppercase tracking-wider">
                Solutions
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button type="button" onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors text-left">Employers & Enterprise</button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors text-left">Workforce Organizations</button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors text-left">Education & Training Hubs</button>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('solutions')} className="hover:text-white transition-colors text-left">Community & Economic Mobility</button>
                </li>
                <li>
                  <button type="button" onClick={() => openDemoModal('Pilot Configuration')} className="hover:text-[#00D2FF] transition-colors text-left">Request Pilot Demo</button>
                </li>
              </ul>
            </div>

            {/* Column 4: Ecosystem & Foundation */}
            <div className="space-y-3">
              <h4 className="font-stc-heading text-xs font-bold text-white uppercase tracking-wider">
                Ecosystem
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href={ELEVIQ_LINKS.individuals} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                    <span>ElevIQ Foundation ↗</span>
                  </a>
                </li>
                <li>
                  <button type="button" onClick={() => scrollToSection('about-stc')} className="hover:text-white transition-colors text-left">
                    About STC Innovations
                  </button>
                </li>
                <li>
                  <a href={getElevIqUrl('/resources')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                    <span>Architectural Briefs</span>
                    <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <button type="button" onClick={() => openDemoModal('Contact Commercial Team')} className="hover:text-white transition-colors text-left">
                    Contact Commercial Team
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Category Strip */}
          <div className="py-4 border-b border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
            <span className="hover:text-white transition-colors cursor-default">Employers</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-white transition-colors cursor-default">Workforce Organizations</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-white transition-colors cursor-default">Education & Training</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-white transition-colors cursor-default">Community Organizations</span>
            <span className="text-slate-600">|</span>
            <span className="hover:text-white transition-colors cursor-default">Government & Public Sector</span>
          </div>

          {/* Copyright & Legal Links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p className="leading-relaxed">
              © 2026 STC Innovations. ElevIQ Capability Alignment System™ and related product intellectual property are owned by STC Innovations.
            </p>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a href={getElevIqUrl('/about')} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Privacy</a>
              <a href={getElevIqUrl('/about')} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Terms</a>
              <a href={getElevIqUrl('/about')} target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Accessibility (WCAG 2.1 AA)</a>
              <button type="button" onClick={() => openDemoModal('General Contact Inquiry')} className="hover:text-slate-300 transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Enterprise Demo Modal */}
      <STCDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        initialInterest={demoInitialInterest}
      />

      {/* Full-Screen High-Definition Screenshot Preview Modal */}
      {isScreenshotModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setIsScreenshotModalOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-slate-900 border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1E293B] px-5 py-3.5 border-b border-slate-700/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-wider pl-2 border-l border-slate-700">
                  ElevIQ CAS™ Interface Preview • Admin Console
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsScreenshotModalOpen(false)
                    openDemoModal('Enterprise Sandbox / Admin Console')
                  }}
                  className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-4 py-1.5 text-xs font-bold shadow-sm transition-all"
                >
                  Book Live Walkthrough
                </button>
                <button
                  type="button"
                  onClick={() => setIsScreenshotModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close preview modal"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Image Body with scrolling */}
            <div className="overflow-auto max-h-[calc(90vh-70px)] p-2 bg-slate-950 flex items-center justify-center">
              <img
                src="/snapshots/stc-admin-console.png"
                alt="ElevIQ CAS Sandbox Admin Console Full Resolution"
                className="w-full h-auto object-contain rounded-2xl shadow-inner"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
