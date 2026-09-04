import { createContext, useContext, useMemo, useState, useEffect, useRef, Children, cloneElement } from 'react'
import { Link, NavLink, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'
import AnimatedBackground from '@/components/ui/animated-background'
import STCInnovationsPage from './components/STCInnovationsPage'
import EcosystemRelationship from './components/EcosystemRelationship'
import WhoElevIqServes from './components/WhoElevIqServes'
import WhatElevIqDelivers from './components/WhatElevIqDelivers'
import AudienceIntentRouting from './components/AudienceIntentRouting'
import FounderStory from './components/FounderStory'
import RuralWorkforce from './components/RuralWorkforce'
import CasTechnologyPreview, { CasTechnologyTeaser } from './components/CasTechnologyPreview'

const TOP_NAV = [
  { label: 'Home', path: '/' },
  { label: 'Platform (CAS)', path: '/platform' },
  { label: 'For Individuals', path: '/individuals' },
  { label: 'For Organizations', path: '/organizations' },
  { label: 'Resources', path: '/resources' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const INDIVIDUALS_ICON = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--warm-coral)' }} aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
)

const ORGANIZATIONS_ICON = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--horizon-teal)' }} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const PLATFORM_ICON = (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--eleviq-teal)' }} aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
)

const PLATFORM_TABS = [
  { label: 'Platform Overview', path: '/platform' },
  { label: 'Participant Portal', path: '/platform/participant-portal' },
  { label: 'Community Intelligence Console™', path: '/platform/community-intelligence-console' },
  { label: 'ElevIQ ARIA™', path: '/platform/eleviq-aria' },
  { label: 'ElevIQ CLARA™', path: '/platform/eleviq-clara' },
  { label: 'Capability Signals™', path: '/platform/capability-signals' },
  { label: 'Alignment Snapshot™', path: '/platform/alignment-snapshot' },
  { label: 'Alignment Pathways™', path: '/platform/alignment-pathways' },
  { label: 'Role Alignment', path: '/platform/role-alignment' },
  { label: 'Development Opportunities', path: '/platform/development-opportunities' },
  { label: 'Support Connections', path: '/platform/support-connections' },
  { label: 'Experience & Context', path: '/platform/experience-context' },
  { label: 'Life Vector™', path: '/platform/life-vector' },
  { label: 'The ElevIQ Last Mile™', path: '/platform/last-mile' },
  { label: 'Screenshots / Product Preview', path: '/platform/screenshots-preview' },
  { label: 'Interactive Journey', path: '/platform/interactive-journey' },
  { label: 'FAQ', path: '/platform/faq' },
  { label: 'Demo / Contact', path: '/platform/contact' },
]

const INDIVIDUALS_TABS = [
  { label: 'Home', path: '/individuals' },
  { label: 'Explore Your Path', path: '/individuals/explore-your-path' },
  { label: 'How It Works', path: '/individuals/how-it-works' },
  { label: 'Programs & Partners', path: '/individuals/programs-partners' },
  { label: 'For Schools & Workforce', path: '/individuals/schools-workforce' },
  { label: 'Trust', path: '/individuals/trust' },
  { label: 'Support the Mission', path: '/individuals/support-the-mission' },
]

const ORGANIZATIONS_TABS = [
  { label: 'Home', path: '/organizations' },
  { label: 'Solutions', path: '/organizations/solutions' },
  { label: 'Implementation', path: '/organizations/implementation' },
  { label: 'Pricing / Demo', path: '/organizations/pricing-demo' },
  { label: 'Security & Trust', path: '/organizations/security-trust' },
]

const ThemeContext = createContext(null)
const SectionThemeContext = createContext(null)

const SECTION_THEME_VARIANTS = {
  platform: {
    shellBg: 'bg-[#FAFBFF]',
    heroBg: 'bg-white',
    accent: '#0284C7',
    accentSoft: 'rgba(2, 132, 199, 0.10)',
    accentHover: 'hover:border-[#0284C7]',
    buttonPrimary: 'border-[#0284C7] bg-[#0284C7]',
    surfaceTint: 'bg-white',
  },
  individuals: {
    shellBg: 'bg-[#FAFBFF]',
    heroBg: 'bg-white',
    accent: '#0284C7',
    accentSoft: 'rgba(2, 132, 199, 0.10)',
    accentHover: 'hover:border-[#0284C7]',
    buttonPrimary: 'border-[#0284C7] bg-[#0284C7]',
    surfaceTint: 'bg-white',
  },
  organizations: {
    shellBg: 'bg-[#FAFBFF]',
    heroBg: 'bg-white',
    accent: '#0284C7',
    accentSoft: 'rgba(2, 132, 199, 0.10)',
    accentHover: 'hover:border-[#0284C7]',
    buttonPrimary: 'border-[#0284C7] bg-[#0284C7]',
    surfaceTint: 'bg-white',
  },
}

function SectionTheme({ variant = 'platform', children }) {
  const themeValues = useMemo(() => {
    return {
      '--page-bg': '#FAFBFF',
      '--surface': '#FFFFFF',
      '--panel': '#FFFFFF',
      '--accent': '#0284C7',
      '--accent-soft': 'rgba(2, 132, 199, 0.10)',
      '--surface-soft': '#F1F5F9',
      '--line': 'rgba(226, 232, 240, 0.85)',
      '--ink': '#0F172A',
      '--muted': '#475569',
      '--hero-bg-from': '#FFFFFF',
      '--hero-bg-to': '#F8FAFC',
      '--bg-glow-1': 'rgba(224, 231, 255, 0.30)',
      '--bg-glow-2': 'rgba(224, 242, 254, 0.30)',
      '--bg-glow-3': 'rgba(241, 245, 249, 0.40)',
    }
  }, [variant])

  const contextValue = useMemo(() => {
    return SECTION_THEME_VARIANTS[variant] || SECTION_THEME_VARIANTS.platform
  }, [variant])

  return (
    <SectionThemeContext.Provider value={contextValue}>
      <div style={themeValues} className="contents">
        {children}
      </div>
    </SectionThemeContext.Provider>
  )
}

function useSectionTheme() {
  return useContext(SectionThemeContext) || SECTION_THEME_VARIANTS.platform
}

function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      {children}
    </div>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 120)
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function App() {
  const location = useLocation()
  const isSTC = location.pathname.startsWith('/stc')

  if (isSTC) {
    return (
      <>
        <ScrollToTop />
        <STCInnovationsPage />
      </>
    )
  }

  return (
    <>
      <ScrollToTop />
      <AppShell />
    </>
  )
}

function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState({ people: false, organizations: false, services: false, approach: false, about: false, cas: false })
  const [scrolled, setScrolled] = useState(false)

  function handleAnchorNav(targetHash) {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
    if (location.pathname === '/') {
      const el = document.getElementById(targetHash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        window.history.replaceState(null, '', `#${targetHash}`)
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    } else {
      navigate(`/#${targetHash}`)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setActiveDropdown(null)
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Hash-based smooth scrolling handler
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
      }
    }
  }, [location.pathname, location.hash])

  const variant = useMemo(() => {
    if (location.pathname.startsWith('/individuals')) return 'individuals'
    if (location.pathname.startsWith('/organizations')) return 'organizations'
    if (location.pathname.startsWith('/platform')) return 'platform'
    if (location.pathname.startsWith('/resources')) return 'organizations'
    if (location.pathname.startsWith('/about')) return 'organizations'
    return 'platform'
  }, [location.pathname])

  return (
    <SectionTheme variant={variant}>
      <div
        className="min-h-screen flex flex-col bg-[var(--page-bg)] text-[var(--ink)] transition-colors duration-300"
        style={{
          '--shell-max': '80rem',
          '--panel-pad': '1.5rem',
          '--section-gap': '1.5rem',
          '--tile-gap': '1rem',
          '--card-min': '16.5rem',
          '--reading-line': '1.62',
        }}
      >
        <div className="relative flex-grow flex flex-col">
          <header className="sticky top-0 z-40 bg-[#030B1E]/95 backdrop-blur-md text-white border-b border-cyan-500/20 shadow-lg py-2 px-2 sm:px-4 2xl:px-6 transition-all duration-200">
            <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-x-1.5 2xl:gap-x-3">
              {/* LEFT: Brand Logo Block */}
              <Link
                to="/"
                className="flex items-center text-white hover:opacity-95 transition-opacity flex-shrink-0 mr-1 2xl:mr-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0FA88A] rounded-xl py-0.5 px-0.5"
                aria-label="ElevIQ Foundation Home"
              >
                <img
                  src="/ElevIQ Foundation Horizontal Lockup Approved Sep 2026.png"
                  alt="ElevIQ Foundation logo"
                  className="h-8 sm:h-9 2xl:h-10 w-auto object-contain rounded-lg bg-white/95 px-2.5 py-0.5 shadow-sm border border-cyan-500/20 group-hover:border-[#0FA88A]/60 transition-all"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/eleviq-foundation-horizontal-lockup.png';
                  }}
                />
              </Link>

              {/* CENTER: Desktop Nav with Interactive Dropdowns (Section 22 Navigation) */}
              <nav aria-label="Primary navigation" className="hidden xl:flex items-center gap-x-0.5 2xl:gap-x-1.5">
                {/* 1. Home */}
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `inline-flex items-center justify-center px-2 2xl:px-3 py-1 text-xs 2xl:text-[13px] font-medium whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  Home
                </NavLink>

                {/* 2. For People Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('people')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'people' ? null : 'people')}
                    aria-expanded={activeDropdown === 'people'}
                    className={`px-1.5 2xl:px-2.5 py-1 text-xs 2xl:text-[13px] font-medium whitespace-nowrap rounded-lg transition-colors flex items-center gap-0.5 2xl:gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      location.pathname.startsWith('/individuals') || activeDropdown === 'people'
                        ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>For People</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'people' ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === 'people' && (
                    <div className="absolute left-0 top-full pt-2 w-[340px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-2xl bg-[#071739]/98 border border-cyan-500/30 p-4 shadow-2xl backdrop-blur-2xl text-white space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0FA88A] px-3 pb-1 block border-b border-cyan-500/20">
                          Participant Experience
                        </span>
                        <Link
                          to="/individuals/how-it-works"
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">How It Works</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Participant reflection, guidance & next steps</div>
                        </Link>
                        <Link
                          to="/#who-we-serve"
                          onClick={() => {
                            if (location.pathname === '/') {
                              document.getElementById('who-we-serve')?.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Who We Serve</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">7 approved life & career stages</div>
                        </Link>
                        <Link
                          to="/platform/participant-portal"
                          className="block px-3 py-2 rounded-xl transition-all bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-slate-200 hover:text-white group mt-1"
                        >
                          <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                            <span>Free ElevIQ Alignment Scan™</span>
                            <span className="text-[9px] font-mono uppercase bg-[#0FA88A]/20 text-[#0FA88A] border border-[#0FA88A]/40 px-1.5 py-0.5 rounded-full">100% Free</span>
                          </div>
                          <div className="text-[10px] text-slate-300 font-sans leading-tight mt-0.5">Private, zero-pressure self-discovery workspace</div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. For Organizations Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('organizations')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'organizations' ? null : 'organizations')}
                    aria-expanded={activeDropdown === 'organizations'}
                    className={`px-1.5 2xl:px-2.5 py-1 text-xs 2xl:text-[13px] font-medium whitespace-nowrap rounded-lg transition-colors flex items-center gap-0.5 2xl:gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      location.pathname.startsWith('/organizations') || activeDropdown === 'organizations'
                        ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>For Organizations</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'organizations' ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === 'organizations' && (
                    <div className="absolute left-0 top-full pt-2 w-[420px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-2xl bg-[#071739]/98 border border-cyan-500/30 p-4 shadow-2xl backdrop-blur-2xl text-white space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 px-3 pb-1 block border-b border-cyan-500/20">
                          Partner & Institutional Settings
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <Link
                            to="/#path-school"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAnchorNav('path-school')
                            }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Schools & CTE</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Youth & vocational career clarity</div>
                          </Link>
                          <Link
                            to="/#path-workforce"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAnchorNav('path-workforce')
                            }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Workforce & NCWorks</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Regional board infrastructure</div>
                          </Link>
                          <Link
                            to="/#path-college"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAnchorNav('path-college')
                            }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Community Colleges & Adult Learning</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Adult learning & trade tracks</div>
                          </Link>
                          <Link
                            to="/#path-jobcorps"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAnchorNav('path-jobcorps')
                            }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Job Corps</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Trade completion & transition</div>
                          </Link>
                          <Link
                            to="/#path-nonprofit"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAnchorNav('path-nonprofit')
                            }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Community & Nonprofits</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Local cohorts & guided pilots</div>
                          </Link>
                          <Link
                            to="/#path-employer"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAnchorNav('path-employer')
                            }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300">Employers & Regional Partners</div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Skills-first talent alignment</div>
                          </Link>
                        </div>
                        <div className="pt-2 border-t border-cyan-500/20">
                          <Link
                            to="/#path-funder"
                            onClick={(e) => {
                              e.preventDefault()
                              handleAnchorNav('path-funder')
                            }}
                            className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                          >
                            <div className="text-xs font-semibold group-hover:text-cyan-300 flex items-center justify-between">
                              <span>Funders & Philanthropic Alliances</span>
                              <span className="text-[10px] text-cyan-400 font-mono">Partner →</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-sans leading-tight">Mission investment & cohort grants</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Our Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('services')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                    aria-expanded={activeDropdown === 'services'}
                    className={`px-1.5 2xl:px-2.5 py-1 text-xs 2xl:text-[13px] font-medium whitespace-nowrap rounded-lg transition-colors flex items-center gap-0.5 2xl:gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      activeDropdown === 'services'
                        ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Our Services</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === 'services' && (
                    <div className="absolute left-0 top-full pt-2 w-[420px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-2xl bg-[#071739]/98 border border-cyan-500/30 p-4 shadow-2xl backdrop-blur-2xl text-white space-y-1.5">
                        <div className="flex justify-between items-center px-3 pb-1 border-b border-cyan-500/20">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                            9 Service Lanes & Delivery
                          </span>
                          <Link to="/#services" className="text-[10px] text-[#0FA88A] hover:underline font-mono">
                            View All 9 →
                          </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Our Approach Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('approach')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'approach' ? null : 'approach')}
                    aria-expanded={activeDropdown === 'approach'}
                    className={`px-1.5 2xl:px-2.5 py-1 text-xs 2xl:text-[13px] font-medium whitespace-nowrap rounded-lg transition-colors flex items-center gap-0.5 2xl:gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      activeDropdown === 'approach'
                        ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>Our Approach</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'approach' ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === 'approach' && (
                    <div className="absolute left-0 top-full pt-2 w-[340px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-2xl bg-[#071739]/98 border border-cyan-500/30 p-4 shadow-2xl backdrop-blur-2xl text-white space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0FA88A] px-3 pb-1 block border-b border-cyan-500/20">
                          Methodology & Human Guidance
                        </span>
                        <Link
                          to="/#delivery-model"
                          onClick={() => {
                            if (location.pathname === '/') {
                              document.getElementById('delivery-model')?.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Service Model</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Stages 0–7 Organizational Delivery Framework</div>
                        </Link>
                        <Link
                          to="/#how-eleviq-helps"
                          onClick={() => {
                            if (location.pathname === '/') {
                              document.getElementById('how-eleviq-helps')?.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Participant Journey</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">6-Step Public Progression Flow</div>
                        </Link>
                        <Link
                          to="/#human-guidance"
                          onClick={() => {
                            if (location.pathname === '/') {
                              document.getElementById('human-guidance')?.scrollIntoView({ behavior: 'smooth' })
                            }
                          }}
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Human Guidance</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Technology Supports. People Guide Decisions.</div>
                        </Link>
                        <Link
                          to="/platform/last-mile"
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">The ElevIQ Last Mile™</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Supported navigation to practical next steps</div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. About Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('about')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                    aria-expanded={activeDropdown === 'about'}
                    className={`px-1.5 2xl:px-2.5 py-1 text-xs 2xl:text-[13px] font-medium whitespace-nowrap rounded-lg transition-colors flex items-center gap-0.5 2xl:gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      location.pathname.startsWith('/about') || activeDropdown === 'about'
                        ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>About</span>
                    <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === 'about' && (
                    <div className="absolute left-0 top-full pt-2 w-[340px] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-2xl bg-[#071739]/98 border border-cyan-500/30 p-4 shadow-2xl backdrop-blur-2xl text-white space-y-1.5">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 px-3 pb-1 block border-b border-cyan-500/20">
                          Organization & Mission
                        </span>
                        <Link
                          to="/#why-eleviq-exists"
                          onClick={(e) => {
                            e.preventDefault()
                            handleAnchorNav('why-eleviq-exists')
                          }}
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Why ElevIQ Exists</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Our founding mission, purpose & values</div>
                        </Link>
                        <Link
                          to="/#tammy-story"
                          onClick={(e) => {
                            e.preventDefault()
                            handleAnchorNav('tammy-story')
                          }}
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Tammy's Story</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Founder story & lived inspiration</div>
                        </Link>
                        <Link
                          to="/#rural-talent"
                          onClick={(e) => {
                            e.preventDefault()
                            handleAnchorNav('rural-talent')
                          }}
                          className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group"
                        >
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Early Implementation & Community Learning</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Practical lessons from rural & regional cohorts</div>
                        </Link>
                        <Link to="/individuals/trust" className="block px-3 py-2 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                          <div className="text-xs font-semibold group-hover:text-cyan-300">Governance & Transparency</div>
                          <div className="text-[10px] text-slate-400 font-sans leading-tight">Data sovereignty, privacy & dignity principles</div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. CAS Preview Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('cas')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === 'cas' ? null : 'cas')}
                    aria-expanded={activeDropdown === 'cas'}
                    className={`px-1.5 2xl:px-2.5 py-1 text-xs 2xl:text-[13px] font-medium whitespace-nowrap rounded-lg transition-colors flex items-center gap-0.5 2xl:gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer ${
                      location.pathname.startsWith('/platform') || activeDropdown === 'cas'
                        ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                    title="See the Technology Behind the Work"
                  >
                    <span>CAS Preview</span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'cas' ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === 'cas' && (
                    <div className="absolute right-0 top-full pt-2 w-[680px] max-w-[90vw] z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="rounded-3xl bg-[#071739]/98 border border-cyan-500/30 p-5 shadow-2xl backdrop-blur-2xl text-white space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Column 1: Core System & Portals */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 px-3 pb-1 block border-b border-cyan-500/20">
                              CAS Preview & Architecture
                            </span>
                            <Link to="/platform" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">See the Technology Behind the Work</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">The architecture of capability alignment</div>
                            </Link>
                            <Link to="/platform/capability-signals" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Capability Signals™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Strengths-oriented capability indicators</div>
                            </Link>
                            <Link to="/platform/alignment-snapshot" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Alignment Snapshot™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Interactive report & capability patterns</div>
                            </Link>
                            <Link to="/platform/eleviq-aria" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold flex items-center gap-1.5 group-hover:text-cyan-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                ElevIQ ARIA™
                              </div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Participant-facing guidance experience</div>
                            </Link>
                            <Link to="/platform/eleviq-clara" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">ElevIQ CLARA™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Organization & advisor intelligence</div>
                            </Link>
                            <Link to="/platform/participant-portal" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Participant Portal</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Reflection & personal agency workspace</div>
                            </Link>
                            <Link to="/platform/community-intelligence-console" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Community Intelligence Console™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Configured organization workspace</div>
                            </Link>
                          </div>

                          {/* Column 2: Pathways & Dynamic Alignment */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 px-3 pb-1 block border-b border-cyan-500/20">
                              Pathways & Alignment
                            </span>
                            <Link to="/platform/alignment-pathways" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Alignment Pathways™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Human-centered career pathways</div>
                            </Link>
                            <Link to="/platform/role-alignment" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Role Alignment™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Translating strengths to target roles</div>
                            </Link>
                            <Link to="/platform/development-opportunities" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Development Opportunities</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Connecting capability maps with growth</div>
                            </Link>
                            <Link to="/platform/support-connections" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Support Connections</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Structured partner & mentor networks</div>
                            </Link>
                            <Link to="/platform/experience-context" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Experience & Context</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Lifepaths, resilience & contribution</div>
                            </Link>
                            <Link to="/platform/life-vector" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">Life Vector™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">6-domain multidimensional matrix</div>
                            </Link>
                            <Link to="/platform/last-mile" className="block px-3 py-1.5 rounded-xl transition-all hover:bg-slate-800/80 text-slate-200 hover:text-cyan-300 group">
                              <div className="text-xs font-semibold group-hover:text-cyan-300">The ElevIQ Last Mile™</div>
                              <div className="text-[10px] text-slate-400 font-sans leading-tight">Dignified action & transition support</div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* RIGHT: Persistent Action Items (Far-Right Header) */}
              <div className="flex items-center gap-x-1.5 2xl:gap-x-2.5 flex-shrink-0">
                {/* External Handoff Link: Strictly Commercial CAS Solutions → STC Innovations */}
                <NavLink
                  to="/stc"
                  className={({ isActive }) =>
                    `hidden xl:inline-flex border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-500/15 text-cyan-300 hover:text-cyan-200 px-2 2xl:px-2.5 py-1 text-[11px] 2xl:text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg ${
                      isActive ? 'bg-cyan-900/60 border-cyan-400 text-white' : ''
                    }`
                  }
                  title="Commercial CAS Solutions → STC Innovations"
                >
                  <span className="hidden 2xl:inline">Commercial CAS Solutions → STC Innovations</span>
                  <span className="inline 2xl:hidden">Commercial CAS → STC</span>
                  <svg className="w-3 h-3 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NavLink>

                {/* Primary Button: Strictly 'Begin Free Scan' */}
                <Link
                  to="/platform/participant-portal"
                  className="inline-flex items-center justify-center rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-3 2xl:px-4 py-1.5 text-xs 2xl:text-sm font-bold whitespace-nowrap flex-shrink-0 shadow-[0_0_15px_rgba(0,210,255,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  title="Begin Free ElevIQ Alignment Scan™"
                >
                  Begin Free Scan
                </Link>

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="xl:hidden inline-flex items-center justify-center p-2 rounded-xl border border-cyan-500/30 bg-slate-900 text-slate-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-all duration-200 flex-shrink-0 ml-1"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <svg className="h-5 w-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Mobile Menu Drawer */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-[#030B1E]/98 backdrop-blur-2xl p-6 xl:hidden flex flex-col gap-6 text-white overflow-y-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center" aria-label="ElevIQ Foundation Home">
                  <img
                    src="/ElevIQ Foundation Horizontal Lockup Approved Sep 2026.png"
                    alt="ElevIQ Foundation logo"
                    className="h-8 w-auto object-contain rounded-lg bg-white/95 px-2.5 py-0.5 shadow-sm border border-cyan-500/20"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/eleviq-foundation-horizontal-lockup.png';
                    }}
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full border border-cyan-500/30 bg-slate-900 text-slate-300 hover:bg-slate-800"
                  aria-label="Close navigation menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Accordion Navigation */}
              <nav className="flex flex-col gap-1 text-left">
                {/* 1. Home */}
                <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2.5 text-base font-semibold text-slate-200 hover:text-cyan-300 border-b border-slate-800/80">
                  Home
                </NavLink>

                {/* 2. For People Accordion */}
                <div className="border-b border-slate-800/80 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => ({ ...prev, people: !prev.people }))}
                    className="w-full py-2.5 text-base font-semibold flex items-center justify-between text-slate-200"
                  >
                    <span>For People</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded.people ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded.people && (
                    <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-[#0FA88A]/60 ml-2 mt-1">
                      <Link to="/individuals/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">How It Works</Link>
                      <Link to="/#who-we-serve" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('who-we-serve')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Who We Serve (7 Populations)</Link>
                      <Link to="/platform/participant-portal" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-cyan-300 font-semibold hover:text-white">Free ElevIQ Alignment Scan™</Link>
                    </div>
                  )}
                </div>

                {/* 3. For Organizations Accordion */}
                <div className="border-b border-slate-800/80 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => ({ ...prev, organizations: !prev.organizations }))}
                    className="w-full py-2.5 text-base font-semibold flex items-center justify-between text-slate-200"
                  >
                    <span>For Organizations</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded.organizations ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded.organizations && (
                    <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-sky-400/60 ml-2 mt-1">
                      <Link
                        to="/#path-school"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('path-school')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Schools & CTE
                      </Link>
                      <Link
                        to="/#path-workforce"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('path-workforce')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Workforce & NCWorks
                      </Link>
                      <Link
                        to="/#path-college"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('path-college')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Community Colleges & Adult Learning
                      </Link>
                      <Link
                        to="/#path-jobcorps"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('path-jobcorps')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Job Corps
                      </Link>
                      <Link
                        to="/#path-nonprofit"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('path-nonprofit')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Community & Nonprofits
                      </Link>
                      <Link
                        to="/#path-employer"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('path-employer')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Employers & Regional Partners
                      </Link>
                      <Link
                        to="/#path-funder"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('path-funder')
                        }}
                        className="block py-1 text-sm text-cyan-300 font-semibold hover:text-white"
                      >
                        Funders & Philanthropic Alliances
                      </Link>
                    </div>
                  )}
                </div>

                {/* 4. Our Services Accordion */}
                <div className="border-b border-slate-800/80 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => ({ ...prev, services: !prev.services }))}
                    className="w-full py-2.5 text-base font-semibold flex items-center justify-between text-slate-200"
                  >
                    <span>Our Services</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded.services ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded.services && (
                    <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-cyan-400/60 ml-2 mt-1">
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Capability Discovery</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Pathway Planning</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Career Readiness</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Advisor Enablement</Link>
                      <Link to="/organizations/implementation" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Program Implementation</Link>
                      <Link to="/#services" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Rural & Regional Strategy</Link>
                    </div>
                  )}
                </div>

                {/* 5. Our Approach Accordion */}
                <div className="border-b border-slate-800/80 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => ({ ...prev, approach: !prev.approach }))}
                    className="w-full py-2.5 text-base font-semibold flex items-center justify-between text-slate-200"
                  >
                    <span>Our Approach</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded.approach ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded.approach && (
                    <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-[#0FA88A]/60 ml-2 mt-1">
                      <Link to="/#delivery-model" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('delivery-model')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Service Model (Stages 0–7)</Link>
                      <Link to="/#how-eleviq-helps" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('how-eleviq-helps')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Participant Journey (6 Steps)</Link>
                      <Link to="/#human-guidance" onClick={() => { setIsMobileMenuOpen(false); if (location.pathname === '/') { document.getElementById('human-guidance')?.scrollIntoView({ behavior: 'smooth' }) } }} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Human Guidance</Link>
                      <Link to="/platform/last-mile" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">The ElevIQ Last Mile™</Link>
                    </div>
                  )}
                </div>

                {/* 6. About Accordion */}
                <div className="border-b border-slate-800/80 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => ({ ...prev, about: !prev.about }))}
                    className="w-full py-2.5 text-base font-semibold flex items-center justify-between text-slate-200"
                  >
                    <span>About</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded.about ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded.about && (
                    <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-sky-400/60 ml-2 mt-1">
                      <Link
                        to="/#why-eleviq-exists"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('why-eleviq-exists')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Why ElevIQ Exists
                      </Link>
                      <Link
                        to="/#tammy-story"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('tammy-story')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Tammy's Story
                      </Link>
                      <Link
                        to="/#rural-talent"
                        onClick={(e) => {
                          e.preventDefault()
                          handleAnchorNav('rural-talent')
                        }}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Early Implementation & Community Learning
                      </Link>
                      <Link
                        to="/individuals/trust"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                      >
                        Governance & Transparency
                      </Link>
                    </div>
                  )}
                </div>

                {/* 7. CAS Preview (See the Technology) Accordion */}
                <div className="border-b border-slate-800/80 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpanded((prev) => ({ ...prev, cas: !prev.cas }))}
                    className="w-full py-2.5 text-base font-semibold flex items-center justify-between text-slate-200"
                  >
                    <span>CAS Preview</span>
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded.cas ? 'rotate-180 text-cyan-300' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {mobileExpanded.cas && (
                    <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-cyan-400/60 ml-2 mt-1">
                      <Link to="/platform" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-cyan-300 font-semibold hover:text-white">See the Technology Behind the Work →</Link>
                      <Link to="/platform/participant-portal" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Participant Portal (Free Scan)</Link>
                      <Link to="/platform/capability-signals" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Capability Signals™</Link>
                      <Link to="/platform/alignment-snapshot" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Alignment Snapshot™</Link>
                      <Link to="/platform/eleviq-aria" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">ElevIQ ARIA™</Link>
                      <Link to="/platform/eleviq-clara" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">ElevIQ CLARA™</Link>
                      <Link to="/platform/community-intelligence-console" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Community Intelligence Console™</Link>
                      <Link to="/platform/alignment-pathways" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Alignment Pathways™</Link>
                      <Link to="/platform/role-alignment" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">Role Alignment™</Link>
                      <Link to="/platform/last-mile" onClick={() => setIsMobileMenuOpen(false)} className="block py-1 text-sm text-slate-300 hover:text-cyan-300">The ElevIQ Last Mile™</Link>
                    </div>
                  )}
                </div>

                {/* Handoff item */}
                <NavLink to="/stc" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-4 rounded-xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-200 text-sm font-semibold flex items-center justify-between mt-2">
                  <span>Commercial CAS Solutions → STC Innovations</span>
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </NavLink>
              </nav>

              {/* Mobile CTA Button */}
              <div className="mt-auto pt-4">
                <Link
                  to="/platform/participant-portal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center rounded-full bg-[#00D2FF] py-3 text-sm font-bold text-slate-950 shadow-md cursor-pointer"
                >
                  Begin Free Scan
                </Link>
              </div>
            </div>
          )}

          <main className="mx-auto flex w-full max-w-[var(--shell-max)] flex-col gap-[var(--section-gap)] px-6 py-6 pb-16 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/stc" element={<STCInnovationsPage />} />
              <Route path="/who-we-serve" element={<Navigate to="/#who-we-serve" replace />} />
              <Route path="/for-people/who-we-serve" element={<Navigate to="/#who-we-serve" replace />} />
              <Route path="/services" element={<Navigate to="/#services" replace />} />
              <Route path="/our-services" element={<Navigate to="/#services" replace />} />
              <Route path="/cas-preview" element={<Navigate to="/platform" replace />} />
              <Route path="/about/tammy-story" element={<AboutPage />} />
              <Route path="/platform/*" element={<PlatformSection />} />
              <Route path="/individuals/*" element={<IndividualsSection />} />
              <Route path="/organizations/*" element={<OrganizationsSection />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </SectionTheme>
  )
}


function SectionShell({ eyebrow, title, lead, actions = [], ribbon, children, extra }) {
  return (
    <ScrollReveal>
      <section className="space-y-[var(--section-gap)]">
        <div className="rounded-[28px] border border-cyan-500/25 p-[var(--panel-pad)] shadow-xl bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">{eyebrow}</span>
                {ribbon ? <span className="rounded-full border border-cyan-400/40 bg-cyan-500/20 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300">{ribbon}</span> : null}
              </div>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h2>
              {lead ? <p className="max-w-3xl text-base leading-relaxed text-slate-200 md:text-lg font-sans">{lead}</p> : null}
            </div>

            {actions.length ? (
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {actions.map((action) => (
                  <ActionButton key={action.label} action={action} />
                ))}
              </div>
            ) : null}
          </div>

          {children ? <div className="mt-[var(--section-gap)]">{children}</div> : null}
          {extra ? <div className="mt-[var(--section-gap)]">{extra}</div> : null}
        </div>
      </section>
    </ScrollReveal>
  )
}

function ActionButton({ action }) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none'

  if (action.to) {
    return (
      <Link to={action.to} className={`${base} bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 shadow-[0_0_15px_rgba(0,210,255,0.3)]`}>
        {action.label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={action.onClick} className={`${base} border border-cyan-500/40 bg-slate-900/60 text-slate-200 hover:bg-white/10 hover:text-white`}>
      {action.label}
    </button>
  )
}

function Card({ title, eyebrow, body, bullets = [], meta, action, variant, icon }) {
  const cardContent = (
    <article
      className="rounded-[24px] border border-cyan-500/25 bg-[#0B1936]/90 p-6 shadow-lg text-white h-full flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)]"
    >
      <div>
        {icon ? <div className="mb-3 text-cyan-300">{icon}</div> : null}
        {eyebrow ? <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p> : null}
        <h3 className="font-sans text-xl font-bold tracking-tight text-white">{title}</h3>
        {body ? <p className="mt-3 text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">{body}</p> : null}
        {bullets.length ? (
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {meta ? <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.26em] text-cyan-400">{meta}</p> : null}
      </div>
      {action ? (
        <div className="mt-5">
          <Link
            to={action.to}
            className="inline-flex items-center justify-center rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-5 py-2 text-xs sm:text-sm font-bold shadow-[0_0_15px_rgba(0,210,255,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {action.label}
          </Link>
        </div>
      ) : null}
    </article>
  )

  return cardContent
}

function SectionGrid({ cards }) {
  return (
    <div className="grid gap-[var(--tile-gap)]" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, var(--card-min)), 1fr))' }}>
      {cards.map((card) => <Card key={card.title} {...card} />)}
    </div>
  )
}

function CopyBlock({ title, body, eyebrow, bullets, action, meta }) {
  return <Card title={title} body={body} eyebrow={eyebrow} bullets={bullets} action={action} meta={meta} />
}

function HomePage() {
  // 5 Core Service Dimensions (How ElevIQ Helps)
  const serviceDimensions = [
    {
      num: '01',
      title: 'Discover Capability',
      desc: 'Strengths-based reflection that honors lived experience, informal problem-solving, and personal context free from testing pressure.',
      badge: 'REFLECTION'
    },
    {
      num: '02',
      title: 'Make Strengths Easier to Name',
      desc: 'Translating participant reflection into clear, validated Capability Signals™ and an actionable Alignment Snapshot™ in plain language.',
      badge: 'SIGNALS'
    },
    {
      num: '03',
      title: 'Build Practical Pathways',
      desc: 'Surfacing concrete education, training, apprenticeship, career, service, and entrepreneurship routes matched to personal pace.',
      badge: 'PATHWAYS'
    },
    {
      num: '04',
      title: 'Support the Human Conversation',
      desc: 'Keeping advisors, counselors, navigators, and mentors central to interpreting insights and co-designing next-step choices.',
      badge: 'HUMAN GUIDANCE'
    },
    {
      num: '05',
      title: 'Move Toward Action',
      desc: 'Mobilizing Support Connections and The ElevIQ Last Mile™ for warm handoffs, barrier reduction, applications, and onboarding.',
      badge: 'LAST MILE™'
    }
  ]

  // Organizational Service Delivery Model (Stages 0–7)
  const deliveryStages = [
    {
      stage: 'STAGE 0',
      title: 'Anchor on Value',
      desc: 'Define the core community or institutional challenge, align stakeholders, and establish clear shared success metrics.',
      tag: 'Alignment'
    },
    {
      stage: 'STAGE 1',
      title: 'Discover Context',
      desc: 'Deep-dive into local demographics, barriers, ecosystem partners, and the lived realities of participants.',
      tag: 'Discovery'
    },
    {
      stage: 'STAGE 2',
      title: 'Establish Baseline',
      desc: 'Map existing intake, advising capacity, legacy assessment friction, and cohort readiness.',
      tag: 'Readiness'
    },
    {
      stage: 'STAGE 3',
      title: 'Design Service Path',
      desc: 'Configure customized workflows, advisor dashboards, and localized pathway templates for partner teams.',
      tag: 'Co-Design'
    },
    {
      stage: 'STAGE 4',
      title: 'Activate & Deliver',
      desc: 'Launch participant cohorts, train frontline navigators, and roll out scan access at no cost for participants.',
      tag: 'Deployment'
    },
    {
      stage: 'STAGE 5',
      title: 'Support & Monitor',
      desc: 'Provide ongoing advisor assistance, real-time cohort intelligence, and adaptive check-ins.',
      tag: 'Enablement'
    },
    {
      stage: 'STAGE 6',
      title: 'Re-measure & Review',
      desc: 'Evaluate participant milestone completion, signal efficacy, and community pathway conversions.',
      tag: 'Evaluation'
    },
    {
      stage: 'STAGE 7',
      title: 'Sustain or Scale',
      desc: 'Institutionalize high-impact practices, expand regional cohort reach, or transition to sustained local ownership.',
      tag: 'Scaling'
    }
  ]

  // Participant Journey (6 Steps)
  const participantSteps = [
    {
      step: '01',
      title: 'ElevIQ Alignment Scan™',
      desc: 'A zero-pressure, scenario-based reflection that explores lived capabilities, decision styles, and personal interests.',
      tag: 'Discovery'
    },
    {
      step: '02',
      title: 'Capability Signals™',
      desc: 'Validated, plain-language indicators that clearly name and articulate unique human strengths and problem-solving styles.',
      tag: 'Naming'
    },
    {
      step: '03',
      title: 'Alignment Snapshot™',
      desc: 'A comprehensive, portable summary synthesizing capabilities, priorities, and potential direction.',
      tag: 'Synthesis'
    },
    {
      step: '04',
      title: 'ElevIQ ARIA™',
      desc: 'An AI-assisted reflective inquiry companion that helps organize thoughts and answer questions without diagnostic labels.',
      tag: 'Reflection'
    },
    {
      step: '05',
      title: 'Alignment Pathways™',
      desc: 'Curated, achievable options spanning education, apprenticeships, career roles, service, and entrepreneurship.',
      tag: 'Direction'
    },
    {
      step: '06',
      title: 'Support Connections / The ElevIQ Last Mile™',
      desc: 'Direct warm handoffs to local navigators, application coaching, barrier removal, and onboarding follow-through.',
      tag: 'Action'
    }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO BLOCK (MISSION-FIRST) */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 md:p-12 shadow-2xl overflow-hidden relative text-white">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            {/* Left Column: Mission Statement & Direct CTAs */}
            <div className="space-y-6 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0FA88A]/40 bg-[#0FA88A]/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#0FA88A] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                NONPROFIT MISSION & SERVICE
              </span>
              
              <h1 className="max-w-2xl font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                Capability is everywhere. Opportunity isn't. ElevIQ exists to close the distance between the two.
              </h1>
              
              <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed max-w-xl font-sans">
                ElevIQ Foundation helps people recognize what they bring to the table and connect those capabilities to meaningful education, training, career, service, entrepreneurship, and community pathways.
              </p>
              
              <p className="text-sm leading-relaxed text-slate-300 max-w-xl font-sans">
                Through strengths-based reflection, trusted human guidance, practical pathway planning, and community partnerships, we help move people from hidden capability toward clearer direction and supported action.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = document.getElementById('how-eleviq-helps');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full bg-[#0FA88A] hover:bg-[#0E957A] text-white font-bold px-7 py-3 text-xs sm:text-sm shadow-[0_0_25px_rgba(15,168,138,0.4)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  See How ElevIQ Helps
                </button>

                <Link
                  to="/platform/participant-portal"
                  className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-7 py-3 text-xs sm:text-sm shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Begin the Free ElevIQ Alignment Scan™
                </Link>

                <Link
                  to="/platform"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-white transition-colors px-3 py-2"
                >
                  <span>See the Technology Behind the Work</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Mission Capability Matrix Visual Card */}
            <div className="flex justify-center items-center p-2 sm:p-4">
              <div className="w-full max-w-[420px] rounded-3xl bg-[#030B1E]/90 backdrop-blur-md border border-[#0FA88A]/30 p-6 sm:p-7 shadow-[0_0_30px_rgba(15,168,138,0.2)] relative overflow-hidden group hover:border-[#0FA88A]/60 transition-all duration-300 text-left space-y-5">
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-3">
                  <span className="inline-flex rounded-full border border-[#0FA88A]/40 bg-[#0FA88A]/15 px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-[#0FA88A]">
                    FOUNDATION MISSION IMPACT
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A] animate-pulse" />
                    100% FREE FOR PARTICIPANTS
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans text-lg font-bold text-white tracking-tight">
                    Connecting Capability to Opportunity
                  </h3>
                  <p className="text-xs text-slate-300 font-sans">
                    A non-diagnostic, human-centered bridge to real pathways.
                  </p>
                </div>

                {/* 4 Core Mission Pillars Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-[#0FA88A]/25 shadow-inner space-y-1">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#0FA88A] block">PILLAR 01</span>
                    <span className="text-xs text-white font-semibold block leading-tight">Strengths-Based Self-Reflection</span>
                    <p className="text-[10px] text-slate-400 font-sans">Unearthing lived experience & informal skills</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-[#0FA88A]/25 shadow-inner space-y-1">
                    <span className="font-mono text-[9px] uppercase font-bold text-[#0FA88A] block">PILLAR 02</span>
                    <span className="text-xs text-white font-semibold block leading-tight">Trusted Human Guidance</span>
                    <p className="text-[10px] text-slate-400 font-sans">Empowering coaches, mentors & advisors</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/25 shadow-inner space-y-1">
                    <span className="font-mono text-[9px] uppercase font-bold text-cyan-300 block">PILLAR 03</span>
                    <span className="text-xs text-white font-semibold block leading-tight">Practical Pathway Planning</span>
                    <p className="text-[10px] text-slate-400 font-sans">Actionable steps toward career & education</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/25 shadow-inner space-y-1">
                    <span className="font-mono text-[9px] uppercase font-bold text-cyan-300 block">PILLAR 04</span>
                    <span className="text-xs text-white font-semibold block leading-tight">Community Partnerships</span>
                    <p className="text-[10px] text-slate-400 font-sans">Connecting schools, workforce & local pilots</p>
                  </div>
                </div>

                {/* Bottom Trust Assurance Badge */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-[#0FA88A] font-semibold">✓ No Test Pressure</span>
                  <span>•</span>
                  <span className="text-cyan-300 font-semibold">✓ Participant Data Sovereignty & Privacy Controls</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. PROBLEM STATEMENT & FOUNDING INSIGHT */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-cyan-500/25 bg-[#0B1936]/90 p-8 sm:p-12 shadow-xl text-white space-y-8">
          <div className="space-y-3 max-w-3xl">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300">
              THE RECOGNITION GAP
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              The problem isn't a lack of talent. It's a lack of alignment.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Narrative Block */}
            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              <p>
                Too many people have real capability, experience, judgment, creativity, resilience, service, and problem-solving ability that traditional systems do not fully see. A resume can show where someone has worked. A credential can show what someone has completed. A job title can show what someone has been called. None of those things, by themselves, tell the whole story of what a person can contribute.
              </p>
              <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-white font-medium text-base sm:text-lg shadow-inner space-y-2">
                <span className="text-[#0FA88A] font-bold">ElevIQ helps make more of that capability visible</span> and then works with people and trusted partners to connect insight to practical next steps.
                <p className="font-serif italic text-cyan-200 text-sm sm:text-base pt-1 border-t border-cyan-500/20">
                  "What someone has done before doesn't always tell us what they're capable of doing next."
                </p>
              </div>
            </div>

            {/* Right Contrast Visual Card */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-950/80 border border-slate-700/80 p-6 space-y-5 shadow-2xl">
              <div className="space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 block font-semibold">
                  What Legacy Filters Limit:
                </span>
                <div className="space-y-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 line-through opacity-70">
                    <span className="text-rose-400">✕</span> Resumes showing only past formal employment
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 line-through opacity-70">
                    <span className="text-rose-400">✕</span> Credentials capturing only completed coursework
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 line-through opacity-70">
                    <span className="text-rose-400">✕</span> Job titles defining entire human potential
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#0FA88A] block font-bold">
                  What ElevIQ Makes Visible:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans text-slate-200">
                  <div className="p-2.5 rounded-xl bg-[#0FA88A]/10 border border-[#0FA88A]/30 flex items-center gap-1.5 font-medium">
                    <span className="text-[#0FA88A]">✓</span> Lived Judgment
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0FA88A]/10 border border-[#0FA88A]/30 flex items-center gap-1.5 font-medium">
                    <span className="text-[#0FA88A]">✓</span> Resilience Under Pressure
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0FA88A]/10 border border-[#0FA88A]/30 flex items-center gap-1.5 font-medium">
                    <span className="text-[#0FA88A]">✓</span> Creative Problem-Solving
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0FA88A]/10 border border-[#0FA88A]/30 flex items-center gap-1.5 font-medium">
                    <span className="text-[#0FA88A]">✓</span> Community & Service
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. SERVICE RESPONSE: HOW ELEVIQ HELPS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="how-eleviq-helps" className="scroll-mt-24 space-y-8">
        <ScrollReveal>
          <section className="rounded-[32px] border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 sm:p-12 shadow-xl space-y-8 text-white">
            <div className="space-y-2 text-center max-w-3xl mx-auto">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#0FA88A]">
                SERVICE RESPONSE
              </span>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                How ElevIQ Helps
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-sans">
                Moving from hidden capability toward clearer direction and supported action through five integrated dimensions.
              </p>
            </div>

            {/* 5 Core Pillars Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {serviceDimensions.map((dim) => (
                <div
                  key={dim.num}
                  className="flex flex-col justify-between p-5 rounded-2xl bg-[#0B1936]/90 border border-cyan-500/25 hover:border-[#0FA88A] hover:shadow-[0_0_25px_rgba(15,168,138,0.25)] transition-all duration-300 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0FA88A]/20 text-xs font-bold text-[#0FA88A] border border-[#0FA88A]/30 font-mono">
                        {dim.num}
                      </span>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-cyan-300">
                        {dim.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-sm sm:text-base font-bold text-white group-hover:text-[#0FA88A] transition-colors">
                      {dim.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#BAE6FD]/80 font-sans">
                      {dim.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. SERVICE MODEL & PARTICIPANT JOURNEY */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="service-model-journey" className="scroll-mt-24 space-y-[var(--section-gap)]">
        {/* Stages 0–7 Organizational Delivery Model */}
        <ScrollReveal>
          <section id="delivery-model" className="scroll-mt-24 rounded-[32px] border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 sm:p-12 shadow-xl space-y-8 text-white">
            <div className="space-y-2 text-center max-w-3xl mx-auto">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#00D2FF]">
                ORGANIZATIONAL COLLABORATION
              </span>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                How We Work With Communities and Organizations
              </h2>
              <p className="text-base font-semibold text-[#00D2FF] font-sans">
                "We don't begin with software. We begin with the problem."
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl mx-auto">
                A structured 8-stage methodology designed to embed capability infrastructure alongside local mentors, educational institutions, and regional workforce partners.
              </p>
            </div>

            {/* Connected Stage Rail (Section 3: Organizational Service-Delivery Flow) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1 text-slate-300">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00D2FF] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                  ORGANIZATIONAL SERVICE-DELIVERY PROGRESSION RAIL
                </span>
                <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400">
                  Sequential Institutional Delivery Pipeline
                </span>
              </div>

              {/* Connected Stage Pipeline Rail */}
              <div className="hidden lg:grid grid-cols-8 gap-2 p-3 rounded-2xl bg-[#07132D]/90 border border-cyan-500/20 shadow-inner">
                {deliveryStages.map((stg, idx) => (
                  <div key={stg.stage} className="relative flex flex-col items-center text-center group">
                    <div className="flex items-center w-full">
                      {idx > 0 && (
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/30 to-cyan-400/60" />
                      )}
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center font-mono text-[10px] font-bold text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)] shrink-0 mx-auto group-hover:border-[#00D2FF] group-hover:bg-cyan-500/30 transition-all">
                        {idx}
                      </div>
                      {idx < deliveryStages.length - 1 && (
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-400/60 to-cyan-500/30" />
                      )}
                    </div>
                    <span className="mt-1.5 font-mono text-[9px] font-bold text-slate-300 uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                      {stg.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8-Stage Grid (Stages 0–7) */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {deliveryStages.map((stg, idx) => (
                <div
                  key={stg.stage}
                  className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#0B1936]/90 border border-cyan-500/25 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300 group overflow-hidden"
                >
                  {/* Top Sequential Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/30 via-[#00D2FF] to-cyan-500/30 opacity-70 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-300 border border-cyan-400/30 font-mono">
                          {stg.stage}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400/70 font-semibold" aria-hidden="true">
                          {idx < 7 ? '→' : '✓'}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                        {stg.tag}
                      </span>
                    </div>
                    <h3 className="font-sans text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {stg.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#BAE6FD]/80 font-sans">
                      {stg.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-cyan-400/80">Org Phase {idx + 1} of 8</span>
                    <span className="text-slate-500 group-hover:text-cyan-300 transition-colors">
                      {idx < 7 ? `Stage ${idx + 1} →` : 'Sustained Delivery'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* 6-Step Participant Journey */}
        <ScrollReveal>
          <section className="rounded-[32px] border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 sm:p-12 shadow-xl space-y-8 text-white">
            <div className="space-y-2 text-center max-w-3xl mx-auto">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#0FA88A]">
                PARTICIPANT EXPERIENCE
              </span>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                What the Participant Experiences
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-sans">
                A dignified, 6-step progression that turns reflective self-discovery into real-world momentum.
              </p>
            </div>

            {/* 6 Sequential Step Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {participantSteps.map((stp) => (
                <div
                  key={stp.step}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-[#0B1936]/90 border border-cyan-500/25 hover:border-[#0FA88A] hover:shadow-[0_0_30px_rgba(15,168,138,0.25)] transition-all duration-300 group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0FA88A]/20 text-xs font-bold text-[#0FA88A] border border-[#0FA88A]/30 font-mono">
                        {stp.step}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                        {stp.tag}
                      </span>
                    </div>
                    <h3 className="font-sans text-lg font-bold text-white group-hover:text-[#0FA88A] transition-colors">
                      {stp.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#BAE6FD]/80 font-sans">
                      {stp.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-[#0FA88A]">Human-Centered</span>
                    <span>Free of Test Pressure</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. HUMAN GUIDANCE LAYER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-cyan-500/25 bg-[#0B1936]/90 p-8 sm:p-12 shadow-xl text-white space-y-8">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#00D2FF]">
              THE HUMAN CORE
            </span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Technology Supports the Work. People Guide the Decisions.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans">
              Software provides clarity and reduces friction, but trusted human relationships create the confidence that drives lasting change.
            </p>
          </div>

          {/* Visual Step-by-Step Flow */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-700/80 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
              <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-cyan-300 block">START</span>
                <h4 className="font-sans text-sm font-bold text-white">Participant</h4>
                <p className="text-[11px] text-slate-400">Self-reflection & lived context</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-[#0FA88A]/30 space-y-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-[#0FA88A] block">INFRASTRUCTURE</span>
                <h4 className="font-sans text-sm font-bold text-white">CAS Reflection & Insight</h4>
                <p className="text-[11px] text-slate-400">Capability Signals™ & Snapshot™</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-cyan-300 block">HUMAN BRIDGE</span>
                <h4 className="font-sans text-sm font-bold text-white">Trusted Guide / Navigator</h4>
                <p className="text-[11px] text-slate-400">Coaches, mentors & counselors</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-[#0FA88A]/30 space-y-1.5">
                <span className="font-mono text-[10px] uppercase font-bold text-[#0FA88A] block">DESTINATION</span>
                <h4 className="font-sans text-sm font-bold text-white">Practical Next Step</h4>
                <p className="text-[11px] text-slate-400">Career, training & community</p>
              </div>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid gap-4 md:grid-cols-3 pt-4 border-t border-slate-800">
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="font-sans text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#0FA88A]">●</span> Empowering Frontline Advisors
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Technology eliminates administrative burden, organizing scenario reflections with CLARA™ intelligence so mentors can focus entirely on high-trust advising conversations.
                </p>
              </div>
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="font-sans text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#0FA88A]">●</span> Full Participant Agency
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Participants maintain total ownership of their reflection data with ARIA™ conversational guidance, choosing what to share, when to proceed, and which pathways to pursue.
                </p>
              </div>
              <div className="space-y-1.5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="font-sans text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-[#0FA88A]">●</span> Dignity Over Diagnostics
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  No scores, no pass/fail filters, and no algorithmic rejection. Capabilities are surfaced and validated through supportive, constructive discovery.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. 10-PATH AUDIENCE INTENT ROUTING GRID */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="audience-routing" className="scroll-mt-24">
        <ScrollReveal>
          <AudienceIntentRouting variant="dark" showGrid={true} showForm={false} />
        </ScrollReveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 8. FOUNDER PERSPECTIVE: WHY I BUILT ELEVIQ */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="why-eleviq-exists" className="scroll-mt-24">
        <ScrollReveal>
          <FounderStory initialExpanded={false} />
        </ScrollReveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 9. RURAL TALENT & REGIONAL WORKFORCE ALIGNMENT */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="rural-talent" className="scroll-mt-24">
        <ScrollReveal>
          <RuralWorkforce variant="dark" />
        </ScrollReveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 10. TECHNOLOGY SUMMARY LAYER */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="cas-technology-summary" className="scroll-mt-24">
        <ScrollReveal>
          <CasTechnologyTeaser />
        </ScrollReveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 11. THREE-ENTITY ECOSYSTEM & GOVERNANCE */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="ecosystem-governance" className="scroll-mt-24">
        <ScrollReveal>
          <EcosystemRelationship variant="dark" />
        </ScrollReveal>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 12. SMART CONTACT & INQUIRY FORM */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div id="contact-inquiry-section" className="scroll-mt-24">
        <ScrollReveal>
          <AudienceIntentRouting variant="dark" showGrid={false} showForm={true} />
        </ScrollReveal>
      </div>
    </div>
  )
}

function PlatformShell() {
  const location = useLocation()

  return (
    <div className="space-y-[var(--section-gap)]">
      <Routes>
        <Route index element={<PlatformOverviewPage />} />
        <Route path="participant-portal" element={<ParticipantPortalPage />} />
        <Route path="community-intelligence-console" element={<CommunityIntelligenceConsolePage />} />
        <Route path="eleviq-aria" element={<ElevIqAriaPage />} />
        <Route path="eleviq-clara" element={<ElevIqClaraPage />} />
        <Route path="capability-signals" element={<CapabilitySignalsPage />} />
        <Route path="alignment-snapshot" element={<AlignmentSnapshotPage />} />
        <Route path="alignment-pathways" element={<AlignmentPathwaysPage />} />
        <Route path="role-alignment" element={<RoleAlignmentPage />} />
        <Route path="development-opportunities" element={<DevelopmentOpportunitiesPage />} />
        <Route path="support-connections" element={<SupportConnectionsPage />} />
        <Route path="experience-context" element={<ExperienceContextPage />} />
        <Route path="life-vector" element={<LifeVectorPage />} />
        <Route path="last-mile" element={<ElevIqLastMilePage />} />
        <Route path="screenshots-preview" element={<ScreenshotsPreviewPage />} />
        <Route path="interactive-journey" element={<InteractiveJourneyPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactFormPage />} />
      </Routes>
    </div>
  )
}

function PlatformOverviewPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      <ScrollReveal>
        <CasTechnologyPreview />
      </ScrollReveal>
    </div>
  )
}

function ParticipantPortalPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                In Development / Configuration Required
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                A Dedicated Space for Personal Agency
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                a participant-centered workspace designed around dignity, reflection, appropriate access, and privacy-conscious workflows.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                The Participant Portal is being configured to help participants review their information, understand Capability Signals™, explore possible pathways, and share approved insight with authorized support.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Program Access / Portal Preview
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    In Development / Configuration Required
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#0F172A" opacity="0.9" stroke="rgba(0,210,255,0.3)" strokeWidth="1" />
                  <line x1="25" y1="35" x2="295" y2="35" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <circle cx="35" cy="24" r="4" fill="#00D2FF" />
                  <circle cx="48" cy="24" r="4" fill="#64748B" opacity="0.5" />
                  <circle cx="61" cy="24" r="4" fill="#64748B" opacity="0.5" />

                  <rect x="25" y="50" width="125" height="65" rx="6" fill="#1E293B" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <rect x="165" y="50" width="130" height="65" rx="6" fill="#0F172A" stroke="#00D2FF" strokeWidth="1.5" />

                  <line x1="38" y1="70" x2="115" y2="70" stroke="#94A3B8" strokeWidth="3" opacity="0.6" />
                  <line x1="38" y1="85" x2="130" y2="85" stroke="#00D2FF" strokeWidth="2" />

                  <line x1="178" y1="70" x2="265" y2="70" stroke="#F8FAFC" strokeWidth="3" />
                  <line x1="178" y1="85" x2="275" y2="85" stroke="#00D2FF" strokeWidth="2" />

                  <rect x="25" y="130" width="270" height="45" rx="6" fill="#1E293B" opacity="0.5" />
                  <line x1="38" y1="150" x2="240" y2="150" stroke="#00D2FF" strokeWidth="2.5" />
                  <circle cx="255" cy="150" r="5" fill="#00D2FF" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE WORKSPACE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Module 1 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Self-Guided Reflection</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Intuitive, stress-free workspaces where you can safely document your unique life contexts, specialized experiences, and vital community contributions at your own pace.
            </p>
          </div>

          {/* Module 2 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Evolving Capability Reflection</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Review how your reflections and approved context may contribute to Capability Signals™ over time.
            </p>
          </div>

          {/* Module 3 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Support Connections</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              A secure, transparent interface to co-create pathway plans, review collaborative goals, and communicate directly with your dedicated coaches and support networks.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: THE PARTICIPANT EXPERIENCE JOURNEY */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            A Dignified, Step-by-Step Experience
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Total Profile Sovereignty
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Participant access, correction, and sharing controls will follow the verified production configuration and applicable program consent practices.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Non-Linear Experience Capture
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Traditional systems reject non-traditional background paths. The CAS portal allows individuals to naturally document volunteer initiatives, caregiving responsibilities, independent projects, and informal community leadership—translating real-world capability into visible data.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Reflection Cycles
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Participants may return to reflect, update information, and review next steps when the configured program allows.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function CommunityIntelligenceConsolePage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                In Development / Configured Sample
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Community Intelligence Console™
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                A configured organization workspace designed to help authorized staff review participant-approved and aggregate capability information.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                The Community Intelligence Console™ is being developed to support authorized program staff with cohort views, workflow status, participant-approved insight, and configuration-specific reporting.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  View the Console Preview
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    In Development / Configured Sample
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#0F172A" opacity="0.9" stroke="rgba(0,210,255,0.3)" strokeWidth="1" />
                  <line x1="20" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                  {/* Left Chart Box */}
                  <rect x="25" y="55" width="125" height="60" rx="6" fill="#1E293B" opacity="0.8" stroke="#00D2FF" strokeWidth="1" />
                  <line x1="40" y1="100" x2="40" y2="70" stroke="#00D2FF" strokeWidth="8" strokeLinecap="round" />
                  <line x1="60" y1="100" x2="60" y2="80" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                  <line x1="80" y1="100" x2="80" y2="65" stroke="#00D2FF" strokeWidth="8" strokeLinecap="round" />
                  <line x1="100" y1="100" x2="100" y2="85" stroke="#F8FAFC" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                  <line x1="120" y1="100" x2="120" y2="75" stroke="#00D2FF" strokeWidth="8" strokeLinecap="round" />

                  {/* Right Network Matrix */}
                  <rect x="170" y="55" width="125" height="60" rx="6" fill="#1E293B" opacity="0.8" stroke="#00D2FF" strokeWidth="1" />
                  <circle cx="195" cy="85" r="4" fill="#00D2FF" />
                  <circle cx="230" cy="70" r="4" fill="#F8FAFC" />
                  <circle cx="265" cy="85" r="4" fill="#00D2FF" />
                  <circle cx="230" cy="100" r="4" fill="#F8FAFC" />
                  <line x1="199" y1="83" x2="226" y2="72" stroke="#F8FAFC" strokeWidth="1.5" opacity="0.5" />
                  <line x1="230" y1="74" x2="230" y2="96" stroke="#00D2FF" strokeWidth="1.5" />
                  <line x1="234" y1="72" x2="261" y2="83" stroke="#F8FAFC" strokeWidth="1.5" opacity="0.5" />

                  {/* Bottom Pulse Bar */}
                  <rect x="25" y="130" width="270" height="50" rx="6" fill="#1E293B" opacity="0.8" />
                  <path d="M 40 160 L 80 145 L 120 170 L 160 150 L 200 165 L 240 140 L 280 160" fill="none" stroke="#00D2FF" strokeWidth="2.5" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CONSOLE WORKSPACES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Aggregate Insights</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Configured cohort views may help organizations examine capability patterns without presenting individual data beyond approved access.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Resource Deployment</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May support planning discussions about development opportunities, local pathways, and support resources when approved data sources are configured.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Ecosystem Health</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Designed to support discussion of participant pathways, program context, and community opportunity information. Data connections and reporting status must be labeled.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: ENTERPRISE DATA GOVERNANCE */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Configured Organization and Community Coordination
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Privacy-Preserving Architecture
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Final privacy, permissions, aggregation, retention, and compliance language will be published only after technical and legal verification.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Precision Labor-Market Mapping
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Potential labor-market and pathway data connections are configuration-dependent and should be labeled In Development or In Testing until verified.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Inter-Agency Synergy
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                The product vision supports coordinated workflows among authorized partners. Cross-organization access is configuration-dependent.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function ElevIqAriaPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK WITH CAS GUIDANCE CHARACTER */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-cyan-500/30 bg-gradient-to-b from-[#0B1936] to-[#030B1E] p-[var(--panel-pad)] shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,210,255,0.12)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                ElevIQ ARIA™
              </h2>
              <p className="text-lg font-medium text-[#BAE6FD] leading-relaxed max-w-xl">
                Human-centered guidance designed to elevate personal agency and deep reflection.
              </p>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 max-w-2xl font-sans">
                ElevIQ ARIA™ is the participant-facing guidance experience being designed to help participants understand information, reflect on context, and prepare for human-guided next steps.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#00D2FF] bg-[#00D2FF] px-6 py-2.5 text-xs font-bold text-[#030B1E] shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:brightness-110"
                >
                  Experience ARIA Preview
                </Link>
              </div>
            </div>

            {/* Right Column Character Integration */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-3xl bg-[#0B1936]/90 border border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(0,210,255,0.2)] relative overflow-hidden group hover:border-[#00D2FF]/60 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#00D2FF]">
                    IN DEVELOPMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                </div>
                <div className="flex flex-col items-center text-center space-y-4 py-2">
                  <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#00D2FF] shadow-[0_0_25px_rgba(0,210,255,0.6)] bg-[#030B1E]">
                    <img src="/cas-character.jpg" alt="ElevIQ ARIA™ Reflective Guide" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = '/favicon.svg'; }} />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00D2FF]">PARTICIPANT COMPANION</span>
                    <h4 className="font-sans text-base font-bold text-white tracking-tight">Interactive Reflection Support</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITY MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Contextual Discovery</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May support plain-language reflection prompts that help participants consider experience, context, strengths, and contribution.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Collaborative Structuring</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Designed to help organize participant reflection into understandable language that the participant may review before approved sharing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Agency Protection</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              ARIA supports navigation and interpretation; it does not make final eligibility, hiring, placement, clinical, or psychological decisions.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: THE DEPTH & SHIFT EXPOSITION */}
      <ScrollReveal>
        <section className="w-full bg-[#0B1936] border border-cyan-500/30 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            How ARIA Reframes Personal Capability
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#00D2FF] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Qualitative Data Layer
              </h4>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                Can help participants organize reflection into clear, reviewable language.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#00D2FF] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Uncovering Hidden Strengths
              </h4>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                ARIA may prompt participants to consider capabilities developed through life, work, service, caregiving, learning, and community experience.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#00D2FF] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero-Score Philosophy
              </h4>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                ARIA is not intended to grade, rank, diagnose, or make final decisions about a participant.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function ElevIqClaraPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-cyan-500/30 bg-gradient-to-b from-[#0B1936] to-[#030B1E] p-[var(--panel-pad)] shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,210,255,0.12)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.25)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                ElevIQ CLARA™
              </h2>
              <p className="text-lg font-medium text-[#BAE6FD] leading-relaxed max-w-xl">
                Empowering advisors and coaches with transparent, actionable context.
              </p>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 max-w-2xl font-sans">
                ElevIQ CLARA™ is the organization-facing guidance experience being developed to help authorized staff interpret participant-approved information and plan human support.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#00D2FF] bg-[#00D2FF] px-6 py-2.5 text-xs font-bold text-[#030B1E] shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:brightness-110"
                >
                  Request CLARA Access
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-3xl bg-[#0B1936]/90 border border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(0,210,255,0.2)] relative overflow-hidden group hover:border-[#00D2FF]/60 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#00D2FF]">
                    IN DEVELOPMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#030B1E" stroke="#00D2FF" strokeWidth="1" opacity="0.95" />
                  <rect x="10" y="10" width="300" height="30" rx="10" fill="#0B1936" />
                  <circle cx="25" cy="25" r="4" fill="#00D2FF" />
                  <circle cx="38" cy="25" r="4" fill="#FFFFFF" opacity="0.5" />
                  <circle cx="51" cy="25" r="4" fill="#FFFFFF" opacity="0.5" />

                  <rect x="25" y="55" width="110" height="120" rx="6" fill="#0B1936" stroke="#00D2FF" strokeWidth="0.5" />
                  <circle cx="80" cy="85" r="14" fill="#00D2FF" opacity="0.2" />
                  <circle cx="80" cy="85" r="7" fill="#00D2FF" />

                  <rect x="150" y="55" width="145" height="120" rx="6" fill="#0B1936" stroke="#00D2FF" strokeWidth="0.5" />
                  <line x1="165" y1="75" x2="275" y2="75" stroke="#BAE6FD" strokeWidth="2" opacity="0.7" />
                  <line x1="165" y1="95" x2="250" y2="95" stroke="#00D2FF" strokeWidth="2" />
                  <line x1="165" y1="115" x2="280" y2="115" stroke="#BAE6FD" strokeWidth="1.5" opacity="0.5" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITY MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Deep-Dive Insights</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Review participant-approved reflections, goals, and context within the permissions of the configured program.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Targeted Collaboration</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Designed to support notes, next-step planning, and follow-up workflows when those functions are configured and tested.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Cohort Management</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Configured cohort views may help authorized staff organize participant workflows and identify follow-up needs.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: THE DEPTH & SHIFT EXPOSITION */}
      <ScrollReveal>
        <section className="w-full bg-[#0B1936] border border-cyan-500/30 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Empowering Frontline Mentors
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#00D2FF] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Eliminating Blind Automation
              </h4>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                ElevIQ CLARA™ is designed to support human review rather than make final automated decisions.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#00D2FF] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                High-Fidelity Interaction Records
              </h4>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                Recordkeeping, audit history, retention, and access controls are configuration-dependent and require verification before publication.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#00D2FF] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Optimized Cohort Navigation
              </h4>
              <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                May support cohort workflow review when configured and tested.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function CapabilitySignalsPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT / VALIDATION PENDING
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Capability Signals™
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Clear, strengths-oriented language designed to help participants and advisors discuss capability beyond resumes and credentials.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                Capability Signals™ translate participant reflection and approved context into understandable capability language. They are directional and do not predict success.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Signals Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    IN DEVELOPMENT / VALIDATION PENDING
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#0F172A" opacity="0.9" stroke="rgba(0,210,255,0.3)" strokeWidth="1" />
                  <path d="M 30 100 Q 70 40 110 100 T 190 100 T 270 100" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <path d="M 30 100 Q 70 55 110 100 T 190 100 T 270 100" fill="none" stroke="#00D2FF" strokeWidth="2.5" />
                  <circle cx="110" cy="100" r="5" fill="#F8FAFC" stroke="#00D2FF" strokeWidth="2" />
                  <circle cx="190" cy="100" r="5" fill="#F8FAFC" stroke="#00D2FF" strokeWidth="2" />
                  <circle cx="70" cy="60" r="4" fill="#00D2FF" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE PILLARS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Reflective Signals</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Participant reflections and contextual information provided through the ElevIQ Alignment Scan™ and related program workflows.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Verified Action</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Documented experience or milestones may be included when an approved verification method is configured.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Advisor Observations</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Authorized staff observations may be included when permitted by the participant, program rules, and configured workflow.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Why Dynamic Signals Matter
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Capturing Hidden Growth
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Traditional systems miss skills gained during non-linear lifepaths. Signals track behavioral milestones, giving visibility to continuous personal progress.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Real-Time Skill Validation
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Supports updated reflection over time when the configured program allows.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Test-Stress Framework
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                The ElevIQ Alignment Scan™ is not a clinical, diagnostic, psychological, personality, or hiring test.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function AlignmentSnapshotPage() {
  const [modalSnapshot, setModalSnapshot] = useState(null)

  const snapshotSlides = [
    {
      id: 'cover',
      title: 'Hands-On Pathway Snapshot™',
      badge: 'SAMPLE SNAPSHOT COVER',
      subtitle: 'High School / CTE • Ages 16–18',
      src: '/snapshots/hands-on-pathway-cover.png',
      description: 'Foundational orientation and strengths profile tailored for high school and CTE vocational cohorts.'
    },
    {
      id: 'signals',
      title: '10 Capability Signals™',
      badge: '10 CAPABILITY SIGNALS',
      subtitle: 'Qualitative Capability Patterns',
      src: '/snapshots/capability-signals-snapshot.png',
      description: 'Shown as capability patterns for reflection and planning. They are not pass/fail scores or automated labels.'
    },
    {
      id: 'vector',
      title: 'Life Vector™ Reflection Map',
      badge: 'LIFE VECTOR™ REFLECTION MAP',
      subtitle: '6-Domain Alignment Matrix',
      src: '/snapshots/life-vector-snapshot.png',
      description: 'Helps explain what gives the participant energy, direction, pathway fit, and motivation across Spirit, Purpose, Profession, Reward, Environment, and Support.'
    },
    {
      id: 'plan',
      title: '30-Day Next Step Plan',
      badge: '30-DAY NEXT STEP PLAN',
      subtitle: 'Structured Advisor & Action Plan',
      src: '/snapshots/next-step-plan-snapshot.png',
      description: 'Equips participants and advisors with actionable weekly, monthly, and quarterly next steps alongside consent and data use governance.'
    }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Alignment Snapshot™
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                A clear, participant-centered summary of Capability Signals™, context, and possible next-step discussion points.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                The Alignment Snapshot™ is designed to organize participant-approved information into a plain-language summary for participant review and human-guided conversation.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalSnapshot(0)}
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Sample Snapshot
                </button>
                <Link
                  to="/contact"
                  className="rounded-full border border-slate-600 hover:bg-white/10 text-white font-medium px-6 py-2.5 text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Request Institutional Demo
                </Link>
              </div>
            </div>

            {/* Right Column Snapshot Cover Media Card */}
            <div className="flex justify-center items-center p-2 sm:p-4">
              <div
                onClick={() => setModalSnapshot(0)}
                className="w-full max-w-[420px] rounded-2xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-2xl hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <img
                  src="/snapshots/hands-on-pathway-cover.png"
                  alt="Hands-On Pathway Snapshot Cover"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES WITH EMBEDDED SNAPSHOT PREVIEWS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Qualitative Overlay */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-between space-y-4 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300 group">
            <div className="space-y-2">
              <h3 className="font-sans text-xl font-bold text-white">Qualitative Overlay</h3>
              <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                Centers participant voice, goals, context, and self-reflection in the summary through 10 qualitative capability signals.
              </p>
            </div>

            {/* Embedded Snapshot Preview */}
            <div
              onClick={() => setModalSnapshot(1)}
              className="mt-2 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 cursor-pointer hover:border-cyan-400 hover:scale-[1.02] shadow-sm transition-all"
            >
              <img
                src="/snapshots/capability-signals-snapshot.png"
                alt="10 Capability Signals™ Snapshot Preview"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>

          {/* Card 2: Signal Aggregation */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-between space-y-4 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300 group">
            <div className="space-y-2">
              <h3 className="font-sans text-xl font-bold text-white">Signal Aggregation</h3>
              <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                Organizes available Capability Signals™ and Life Vector™ dimensions into a readable summary without reducing the participant to one score.
              </p>
            </div>

            {/* Embedded Snapshot Preview */}
            <div
              onClick={() => setModalSnapshot(2)}
              className="mt-2 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 cursor-pointer hover:border-cyan-400 hover:scale-[1.02] shadow-sm transition-all"
            >
              <img
                src="/snapshots/life-vector-snapshot.png"
                alt="Life Vector Reflection Map Preview"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>

          {/* Card 3: Advisor Verification Space */}
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-between space-y-4 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300 group">
            <div className="space-y-2">
              <h3 className="font-sans text-xl font-bold text-white">Advisor Verification Space</h3>
              <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                Equips navigators with practical 30-Day Next Step action plans and consent-aware data governance controls.
              </p>
            </div>

            {/* Embedded Snapshot Preview */}
            <div
              onClick={() => setModalSnapshot(3)}
              className="mt-2 rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-950 cursor-pointer hover:border-cyan-400 hover:scale-[1.02] shadow-sm transition-all"
            >
              <img
                src="/snapshots/next-step-plan-snapshot.png"
                alt="30-Day Next Step Plan Preview"
                className="w-full h-auto object-contain block"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            A Human-Centered Vision Document
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Context Over Scoring
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Replaces unfair predictive algorithms with complete personal context, honoring individual agency.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Secure Share Controls
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Sharing and permission controls are subject to final technical configuration, consent practices, and legal review.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Actionable Guidance Foundation
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Serves as a launching pad for advisors to co-create tailored development tracks and career planning models.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* INTERACTIVE SNAPSHOT LIGHTBOX MODAL */}
      {modalSnapshot !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalSnapshot(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#071739] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,210,255,0.2)] text-white space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Title and Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-cyan-500/20 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    {snapshotSlides[modalSnapshot].badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Slide {modalSnapshot + 1} of {snapshotSlides.length}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-white">
                  {snapshotSlides[modalSnapshot].title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-200/80 font-mono">
                  {snapshotSlides[modalSnapshot].subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalSnapshot(null)}
                className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-cyan-500/20 shrink-0 cursor-pointer"
                aria-label="Close Snapshot Viewer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Slide Navigation Tabs */}
            <div className="flex flex-wrap gap-2">
              {snapshotSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setModalSnapshot(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    modalSnapshot === idx
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-cyan-500/20'
                  }`}
                >
                  {idx + 1}. {slide.title}
                </button>
              ))}
            </div>

            {/* Main High-Res Image Display Container */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 shadow-2xl flex items-center justify-center max-h-[58vh]">
              <img
                src={snapshotSlides[modalSnapshot].src}
                alt={snapshotSlides[modalSnapshot].title}
                className="w-full h-auto max-h-[58vh] object-contain mx-auto"
              />

              {/* Prev / Next Overlay Buttons */}
              <button
                type="button"
                onClick={() => setModalSnapshot((prev) => (prev > 0 ? prev - 1 : snapshotSlides.length - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white flex items-center justify-center transition-all border border-cyan-500/30 shadow-lg cursor-pointer"
                aria-label="Previous Slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setModalSnapshot((prev) => (prev < snapshotSlides.length - 1 ? prev + 1 : 0))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white flex items-center justify-center transition-all border border-cyan-500/30 shadow-lg cursor-pointer"
                aria-label="Next Slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Description & Action Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2 border-t border-cyan-500/20">
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {snapshotSlides[modalSnapshot].description}
              </p>
              <div className="flex gap-2 shrink-0">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2 text-xs shadow-md shadow-cyan-500/20 transition-all"
                >
                  Request Sample Package
                </Link>
                <button
                  type="button"
                  onClick={() => setModalSnapshot(null)}
                  className="rounded-full border border-slate-600 hover:bg-white/10 text-white font-medium px-4 py-2 text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AlignmentPathwaysPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Alignment Pathways™
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Individualized, dynamic roadmaps connecting capability insight to practical workforce tracks.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                Alignment Pathways™ use available Capability Signals™ and participant goals to support exploration of flexible education, training, career, service, entrepreneurship, or community pathways.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Pathways
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    IN DEVELOPMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <path d="M 30 150 C 100 150, 100 50, 170 50 S 240 150, 300 150" fill="none" stroke="#00D2FF" strokeWidth="2.5" />
                  <circle cx="30" cy="150" r="5" fill="#F8FAFC" stroke="#00D2FF" strokeWidth="2" />
                  <circle cx="170" cy="50" r="5" fill="#F8FAFC" stroke="#00D2FF" strokeWidth="2" />
                  <circle cx="300" cy="150" r="5" fill="#F8FAFC" stroke="#00D2FF" strokeWidth="2" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Adaptive Route Adjustments</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Pathways may be reviewed and adjusted as participants add information, clarify goals, and work with trusted support.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Hyper-Local Integration</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Local pathways and partner information may be added through approved program configuration. Do not imply a live integration until verified.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Milestone Tracking</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Can support practical next-step planning within a configured program.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Unlocking Non-Linear Growth
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Recommending, Never Dictating
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                The system values participant choices. It acts as an advisory roadmap, leaving final career/learning agency completely with the user.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Modular Skill Assembly
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Participants may explore stackable learning, training, and development opportunities relevant to their goals.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor View Inclusion
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Authorized advisor access is configuration-dependent and requires participant/program permissions.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function RoleAlignmentPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                DIRECTIONAL ROLE ALIGNMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Role Alignment
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Supporting discussion between a participant’s current Capability Signals™ and a defined Role Benchmark.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                Role Alignment is a directional comparison that supports discussion and planning. It does not determine qualification, eligibility, hiring, or job performance.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Request Role Alignment Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    In Development / Role Benchmarks Require Approval
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="25" y="40" width="100" height="110" rx="8" fill="#1E293B" opacity="0.8" stroke="#00D2FF" strokeWidth="1" />
                  <rect x="195" y="40" width="100" height="110" rx="8" fill="#1E293B" opacity="0.8" stroke="#00D2FF" strokeWidth="1" />
                  <line x1="125" y1="70" x2="195" y2="70" stroke="#00D2FF" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="125" y1="110" x2="195" y2="110" stroke="#00D2FF" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="125" cy="70" r="3" fill="#00D2FF" />
                  <circle cx="195" cy="70" r="3" fill="#00D2FF" />
                  <circle cx="125" cy="110" r="3" fill="#00D2FF" />
                  <circle cx="195" cy="110" r="3" fill="#00D2FF" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Capability Requirement Outlining</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Authorized organizations may define a Role Benchmark describing relevant capabilities, experience, and context for discussion.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Mutual Context View</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May present a participant’s current signals alongside a Role Benchmark for human review.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Growth Focus Mapping</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May identify Development Opportunities for discussion without labeling the participant as deficient.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Moving Past Binary Selection
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Scrubbing Algorithmic Rejection
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                CAS is not designed to make final automated hiring or rejection decisions.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Targeted Onboarding Insight
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                May support onboarding preparation and development conversations when configured for an employer program.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Ecosystem Balance
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Connects regional talent development strategies cleanly with shifting corporate demands, keeping the community network fully synchronized.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function DevelopmentOpportunitiesPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Development Opportunities
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Connecting capability alignment maps with personalized growth ecosystems.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                helps participants and authorized support consider possible learning, training, practice, and experience-building options relevant to their goals.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Explore Opportunities
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    IN DEVELOPMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="40" y="130" width="45" height="40" rx="4" fill="#00D2FF" opacity="0.5" />
                  <rect x="100" y="100" width="45" height="70" rx="4" fill="#F8FAFC" opacity="0.3" />
                  <rect x="160" y="70" width="45" height="100" rx="4" fill="#00D2FF" />
                  <rect x="220" y="40" width="45" height="130" rx="4" fill="#F8FAFC" opacity="0.8" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Targeted Training Integration</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Configured programs may present relevant training or learning options. Do not imply live integration until verified.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Ecosystem Project Sync</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Approved community or program opportunities may be added through configuration.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Adaptive Skill Recommendations</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May present development options based on participant goals and available program information.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Proactive Personal Advancements
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Purpose-Driven Learning
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Replaces generic curriculum tracks with highly targeted growth suggestions tailored to the participant's actual trajectory.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Optimization
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Development Opportunities may be updated through participant and advisor review when the configured workflow allows.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor Collaboration Support
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Authorized advisors may discuss and document development options when collaboration and tracking functions are configured.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function SupportConnectionsPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Support Connections
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Helping participants identify trusted people, programs, and resources that may support practical next steps.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                Support Connections represents the human and community support layer of CAS. Available workflows depend on partner configuration and testing.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Access Connections Hub
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    IN DEVELOPMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <circle cx="160" cy="100" r="15" fill="#00D2FF" opacity="0.3" />
                  <circle cx="160" cy="100" r="6" fill="#00D2FF" />
                  <circle cx="80" cy="60" r="5" fill="#F8FAFC" />
                  <circle cx="240" cy="60" r="5" fill="#F8FAFC" />
                  <circle cx="80" cy="140" r="5" fill="#F8FAFC" />
                  <circle cx="240" cy="140" r="5" fill="#F8FAFC" />
                  <line x1="160" y1="100" x2="80" y2="60" stroke="#00D2FF" strokeWidth="2" />
                  <line x1="160" y1="100" x2="240" y2="60" stroke="#00D2FF" strokeWidth="2" />
                  <line x1="160" y1="100" x2="80" y2="140" stroke="#00D2FF" strokeWidth="2" />
                  <line x1="160" y1="100" x2="240" y2="140" stroke="#00D2FF" strokeWidth="2" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Direct Mentorship Windows</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Direct communication features are in development and should not be presented as live until tested.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Resource Network Mapping</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Configured programs may provide approved resource and referral information.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Shared Progress Workspaces</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Shared planning and progress functions are configuration-dependent.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Ecosystem Care Coordination
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Eliminating Siloed Guidance
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Cross-agency access is not assumed. Authorized access depends on consent, agreements, permissions, and technical configuration.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dignified Interaction History
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Recordkeeping, retention, and interaction-history functions require technical and legal verification.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Participant Sovereignty Hub
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Participant consent, correction, and sharing practices will follow the verified production configuration and program requirements.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function ExperienceContextPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Experience & Context
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                recognizing experience and context that may not appear in a traditional resume.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                helping participants describe capabilities developed through work, learning, caregiving, service, community involvement, and life experience.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Capture Context
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    IN DEVELOPMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="25" y="30" width="110" height="60" rx="8" fill="#1E293B" opacity="0.8" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <rect x="175" y="30" width="110" height="60" rx="8" fill="#1E293B" opacity="0.8" stroke="#00D2FF" strokeWidth="1.5" />
                  <rect x="25" y="110" width="260" height="60" rx="8" fill="#1E293B" opacity="0.8" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Non-Linear Path Tracking</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Provides reflection prompts that may help participants describe non-linear experience and contribution.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Situational Reality Mapping</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May capture participant-provided context relevant to practical pathway and support conversations.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Qualitative Nuance Gathering</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Uses self-guided textual prompts to draw out deep, authentic personal stories rather than sterile chronological boxes.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Redefining Talent Baselines
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Validating Hidden Assets
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Helps translate lived experience into clear capability language. Do not call it validated unless an approved method exists.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Removing Outdated Credentials
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Broadens the information considered beyond credentials and job titles while preserving human review.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Fostering True Representation
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Empowers marginalized or overlooked talent groups to present their backgrounds accurately and with pride.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function LifeVectorPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT / FUTURE-STATE MODULE
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Life Vector™
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                DIRECTION AND MOMENTUM
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                Life Vector™ is a developing visual concept intended to help participants reflect on direction, goals, milestones, and changing possibilities over time.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  View Life Vector Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-sm">
                    IN DEVELOPMENT / FUTURE-STATE MODULE
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <line x1="30" y1="170" x2="290" y2="170" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
                  <line x1="30" y1="30" x2="30" y2="170" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
                  <path d="M 30 170 Q 120 140 180 80 T 290 30" fill="none" stroke="#00D2FF" strokeWidth="3" />
                  <circle cx="290" cy="30" r="6" fill="#00D2FF" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE CAPABILITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Active Momentum Analysis</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May display participant-reviewed milestones or updates when configured.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Long-Range Goal Orientation</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Supports long-range goal conversation and exploration of multiple possible pathways.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <h3 className="font-sans text-xl font-bold text-white">Dynamic Future Adaptations</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Possible pathways may be revisited as participants add information and clarify goals.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Continuous Trajectory Tracking
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Focusing on Flow, Not Scores
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Completely wipes away static ranking systems, evaluating growth strictly as continuous individual movement.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Visualizing Possibilities
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Gives individuals an inspiring, high-fidelity window into diverse sectors where their strengths can naturally cross-align.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Strategic Support Insights
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Aggregate planning use is a future-state concept and must be labeled In Development until data sources and methods are approved.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function PlatformSection() {
  return <SectionTheme variant="platform"><PlatformShell /></SectionTheme>
}

function PlatformSectionPage({ eyebrow, title, lead, actions, ribbon, cards, extra }) {
  return <SectionShell eyebrow={eyebrow} title={title} lead={lead} actions={actions} ribbon={ribbon} extra={extra}>{cards?.length ? <SectionGrid cards={cards} /> : null}</SectionShell>
}

function SubNav({ tabs }) {
  const scrollRef = useRef(null)
  const [showLeftAffordance, setShowLeftAffordance] = useState(false)
  const [showRightAffordance, setShowRightAffordance] = useState(true)

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftAffordance(scrollLeft > 8)
    setShowRightAffordance(scrollLeft + clientWidth < scrollWidth - 8)
  }

  useEffect(() => {
    const timer = setTimeout(handleScroll, 100)
    window.addEventListener('resize', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleScroll)
    }
  }, [tabs])

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full">
      {/* Left chevron and gradient fade */}
      {showLeftAffordance && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent z-10" />
          <button
            type="button"
            onClick={() => scrollBy(-200)}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--ink)] shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Scroll left"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </>
      )}

      {/* Right chevron and gradient fade */}
      {showRightAffordance && (
        <>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--page-bg)] via-[var(--page-bg)]/80 to-transparent z-10" />
          <button
            type="button"
            onClick={() => scrollBy(200)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--ink)] shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Scroll right"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Scrollable tab list container */}
      <nav
        ref={scrollRef}
        onScroll={handleScroll}
        aria-label="Section navigation"
        className="overflow-x-auto pb-2 scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex min-w-max gap-2 px-1 py-1">
          {tabs.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/platform' || item.path === '/individuals' || item.path === '/organizations'}
              className={({ isActive }) =>
                `rounded-full border px-4 py-2 text-xs md:text-sm font-medium transition-all duration-200 ${isActive
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm font-semibold'
                  : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--ink)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

function Footer() {
  const trademarkList = [
    'ElevIQ Capability Alignment System™',
    'ElevIQ Alignment Scan™',
    'Capability Signals™',
    'Alignment Snapshot™',
    'Alignment Pathways™',
    'Community Intelligence Console™',
    'The ElevIQ Last Mile™',
    'Role Alignment™',
    'ElevIQ ARIA™',
    'ElevIQ CLARA™',
    'Life Vector™'
  ]

  return (
    <footer className="mt-auto bg-[#071126] text-slate-400 border-t border-cyan-500/20 pt-16 pb-12 transition-all duration-300">
      <div className="mx-auto w-full max-w-[var(--shell-max)] px-6 space-y-12">
        {/* Commercial Handoff Banner */}
        <div className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xl text-white">
          <div className="space-y-1.5 text-left max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-300">
              COMMERCIAL & ENTERPRISE DEPLOYMENT
            </span>
            <h4 className="font-sans text-base sm:text-lg font-bold text-white">
              Looking for commercial licensing, institutional pricing, or enterprise configuration?
            </h4>
            <p className="text-xs text-slate-300 font-sans">
              Commercial licensing and private enterprise deployments of the ElevIQ Capability Alignment System™ are managed directly by STC Innovations.
            </p>
          </div>
          <Link
            to="/stc"
            className="shrink-0 rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(0,210,255,0.3)] inline-flex items-center gap-2"
          >
            <span>Commercial Solutions → STC Innovations</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Master 4-Column Ecosystem Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-slate-800/80">
          {/* Column 1: ElevIQ Foundation (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block hover:opacity-95 transition-opacity" aria-label="ElevIQ Foundation Home">
              <img
                src="/ElevIQ Foundation Primary Logo Approved Sep 2026.png"
                alt="ElevIQ Foundation logo"
                className="h-14 sm:h-16 w-auto object-contain rounded-xl bg-white/95 p-2 shadow-lg border border-cyan-500/30"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/eleviq-foundation-primary-logo.png';
                }}
              />
            </Link>
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300 block">
                MISSION & SERVICE
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-sans max-w-sm">
              Bridging human capability and meaningful life and career pathways through strengths-based discovery and trusted community support.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 font-mono text-[11px] text-emerald-300">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Henderson, North Carolina
              </span>
            </div>
          </div>

          {/* Column 2: For Participants & Families (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 border-b border-cyan-500/20 pb-2">
              For Participants & Families
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <Link to="/#how-eleviq-helps" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/#who-we-serve" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Who We Serve (7 Stages)
                </Link>
              </li>
              <li>
                <Link to="/platform/participant-portal" className="text-cyan-300 font-semibold hover:text-white transition-colors">
                  Free Alignment Scan™ →
                </Link>
              </li>
              <li>
                <Link to="/platform/last-mile" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Support Connections / The Last Mile™
                </Link>
              </li>
              <li>
                <Link to="/platform/capability-signals" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Capability Signals™
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Organizations & Partners (Col 8-9) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 border-b border-cyan-500/20 pb-2">
              For Organizations & Partners
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <Link to="/#path-school" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Schools & CTE
                </Link>
              </li>
              <li>
                <Link to="/#path-workforce" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Workforce & NCWorks
                </Link>
              </li>
              <li>
                <Link to="/#path-jobcorps" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Job Corps Centers
                </Link>
              </li>
              <li>
                <Link to="/#path-employer" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Employers & Role Alignment
                </Link>
              </li>
              <li>
                <Link to="/platform" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Pilots & Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Ecosystem & Governance (Col 10-12) */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-400 border-b border-cyan-500/20 pb-2">
              Ecosystem & Governance
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <Link to="/about" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  About the Foundation
                </Link>
              </li>
              <li>
                <Link to="/#tammy-story" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Tammy's Story
                </Link>
              </li>
              <li>
                <Link to="/platform" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  CAS Platform Preview
                </Link>
              </li>
              <li>
                <Link to="/stc" className="text-cyan-300 hover:text-white font-semibold transition-colors flex items-center gap-1">
                  <span>Commercial Solutions</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
              <li>
                <Link to="/individuals/trust" className="text-slate-300 hover:text-cyan-300 transition-colors">
                  Privacy & Data Ethics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar & Policy Quotes */}
        <div className="space-y-6 pt-2">
          {/* Dual-Entity Operating Boundary Statement */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/25 space-y-2 text-xs text-slate-300 font-sans">
            <h4 className="font-sans text-sm font-bold text-[#0FA88A] tracking-wide">
              One Mission. Distinct Roles. Shared Infrastructure.
            </h4>
            <p className="leading-relaxed text-slate-300">
              STC Innovations owns, develops, configures, licenses, commercializes, and deploys the ElevIQ Capability Alignment System™ for enterprise and commercial use. ElevIQ Foundation applies CAS through mission-driven access, community programs, education, rural opportunity, workforce partnerships, grants, and participant support. ElevIQ Foundation receives CAS access at no cost for mission-aligned nonprofit work. The ElevIQ Alignment Scan™ remains free for individual participants.
            </p>
          </div>

          {/* Copyright & Compliance Note */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-400 font-sans border-t border-slate-800/80 pt-6">
            <p>© 2026 ElevIQ Foundation. All rights reserved.</p>
            <p className="max-w-xl text-[11px] leading-relaxed text-slate-400">
              ElevIQ Foundation receives CAS infrastructure access at zero cost for mission-aligned nonprofit initiatives. Individual participant scans remain 100% free. CAS is not an algorithmic hiring decision engine.
            </p>
          </div>

          {/* Trademark Lock Terminology */}
          <div className="space-y-2.5 pt-2">
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
              Trademark Lock Terminology
            </p>
            <div className="flex flex-wrap gap-2">
              {trademarkList.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-slate-800 bg-slate-900/90 px-2 py-0.5 font-mono text-[9px] text-slate-400 tracking-wider"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Trust Strip */}
          <div className="pt-6 border-t border-slate-800/80 space-y-3">
            <p className="text-center text-xs text-slate-400 font-sans">
              Trusted by organizations committed to developing people and strengthening their communities.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Employers</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Workforce Organizations</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Education & Training</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Community Organizations</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Government & Public Sector</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function IndividualsSection() {
  return (
    <SectionTheme variant="individuals">
      <div className="space-y-[var(--section-gap)]">
        <SubNav tabs={INDIVIDUALS_TABS} />
        <Routes>
          <Route index element={<IndividualsHome />} />
          <Route path="explore-your-path" element={<IndividualsWhoWeServe />} />
          <Route path="who-we-serve" element={<IndividualsWhoWeServe />} />
          <Route path="how-it-works" element={<IndividualsHowItWorks />} />
          <Route path="programs-partners" element={<IndividualsPartnersPilots />} />
          <Route path="partners-pilots" element={<IndividualsPartnersPilots />} />
          <Route path="schools-workforce" element={<IndividualsJobCorps />} />
          <Route path="job-corps" element={<IndividualsJobCorps />} />
          <Route path="trust" element={<IndividualsTrustGovernance />} />
          <Route path="trust-governance" element={<IndividualsTrustGovernance />} />
          <Route path="support-the-mission" element={<IndividualsSupportMission />} />
        </Routes>
      </div>
    </SectionTheme>
  )
}

function IndividualsHome() {
  const steps = [
    {
      num: '01',
      title: 'Scan Capability Signals™',
      desc: 'Reflect on your real-world experience, skills, and life story in a low-pressure, self-paced space.'
    },
    {
      num: '02',
      title: 'Alignment Snapshot™',
      desc: 'Receive a clear summary that helps you recognize and name your core professional strengths.'
    },
    {
      num: '03',
      title: 'ElevIQ ARIA™',
      desc: 'Explore interactive guidance and tailored insights designed to clarify potential career directions.'
    },
    {
      num: '04',
      title: 'Alignment Pathways™',
      desc: 'Discover actionable training, educational options, and career tracks aligned with your unique capabilities.'
    },
    {
      num: '05',
      title: 'Support Connections / The ElevIQ Last Mile™',
      desc: 'Connect directly with advisors, counselors, and community mentors to help you take your next real step.'
    }
  ]

  const audiences = [
    { tag: 'YOUTH & STUDENTS', title: 'Youth & High School Students', desc: 'Discovering strengths early and linking classroom interests to future pathways.' },
    { tag: 'CTE & VOCATIONAL', title: 'CTE & Vocational Learners', desc: 'Translating hands-on technical skills into recognized capability credentials.' },
    { tag: 'VETERANS & SERVICE', title: 'Veterans & Service Leavers', desc: 'Translating military leadership and tactical experience into civilian career roles.' },
    { tag: 'JOB CORPS COHORTS', title: 'Job Corps Participants', desc: 'Connecting trade completion and campus learning with real-world support.' },
    { tag: 'ADULT LEARNERS', title: 'Adult Learners & Pivoters', desc: 'Building new skills and career transitions based on authentic life experience.' }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: FULL-WIDTH IMMERSIVE ILLUMINATED HERO BLOCK */}
      <ScrollReveal>
        <section className="w-full rounded-3xl bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] text-white py-16 px-6 sm:px-8 lg:px-12 shadow-[0_15px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(0,210,255,0.12)] overflow-hidden relative border border-cyan-500/25">
          {/* Subtle Curved Cyan Background Light Waves & Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 opacity-25 pointer-events-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none">
              <path d="M0 300 C 300 200, 600 400, 1200 250" stroke="#00D2FF" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M0 450 C 400 350, 800 550, 1200 400" stroke="#00D2FF" strokeWidth="1.5" />
              <path d="M0 150 C 500 250, 700 50, 1200 200" stroke="#0284C7" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                FOUNDATION PROGRAM INFORMATION
              </span>
              <h1 className="max-w-xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                From the ElevIQ Alignment Scan™ to practical next steps
              </h1>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                ElevIQ Foundation helps overlooked talent discover, name, and connect their capabilities to meaningful opportunity through human-centered technology, advisor support, and community partnerships.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-xl font-sans">
                ElevIQ Foundation programs are designed to support a guided flow that keeps human support central. The experience is about alignment, not limitation, and technology supports rather than replaces trusted human guidance.
              </p>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/individuals/how-it-works"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-3 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm inline-flex items-center gap-1.5"
                >
                  Explore What to Expect →
                </Link>
                <Link
                  to="/individuals/support-the-mission"
                  className="border border-slate-600 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm inline-flex items-center gap-1.5"
                >
                  Partner With or Support ElevIQ Foundation
                </Link>
              </div>
            </div>

            {/* Right Column: Frosted Glass Companion Card with Glowing Cyan Portal */}
            <div className="flex justify-center items-center p-2 lg:p-4">
              <div className="w-full max-w-[360px] rounded-3xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl text-white relative overflow-hidden group hover:border-cyan-400/60 transition-all duration-300">
                <div className="flex justify-between items-center mb-5 border-b border-cyan-500/20 pb-3">
                  <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    PARTICIPANT WORKSPACE
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    ACTIVE
                  </span>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-4 py-2">
                  {/* Glowing Cyan Circular Portal */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl scale-110" />
                    <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-slate-950 flex items-center justify-center">
                      <img
                        src="/cas-character.jpg"
                        alt="ElevIQ Participant Guide"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/favicon.svg';
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-400">PARTICIPANT COMPANION</span>
                    <h4 className="font-sans text-lg font-bold text-white tracking-tight">Guided Pathway Discovery</h4>
                    <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                      Real-world context and personalized capability indicators tailored for your journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: PROBLEM & MISSION BLOCK */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-2">
          {/* Problem Card */}
          <div className="bg-[#0B1936]/90 rounded-[28px] p-8 shadow-lg border border-cyan-500/25 space-y-4 hover:border-[#00D2FF] transition-all duration-300">
            <span className="inline-flex rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#00D2FF]">
              THE CHALLENGE
            </span>
            <h3 className="font-sans text-2xl font-bold text-white">
              Unseen & Unconnected Capability
            </h3>
            <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Capability is real but often unseen, unnamed, or disconnected from opportunity. Traditional credentials reduce rich life experience to rigid degree requirements.
            </p>
          </div>

          {/* Mission Response Card */}
          <div className="bg-[#0B1936]/90 rounded-[28px] p-8 shadow-lg border-2 border-cyan-500/40 space-y-4 hover:border-[#00D2FF] transition-all duration-300">
            <span className="inline-flex rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#00D2FF]">
              OUR MISSION RESPONSE
            </span>
            <h3 className="font-sans text-2xl font-bold text-white">
              Strengths-Oriented Alignment
            </h3>
            <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Strengths-oriented capability alignment supported by people and human-centered technology—connecting individual reflection directly to real-world pathways.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: SIMPLE PARTICIPANT JOURNEY (5 STEPS WITH DESCRIPTIONS) */}
      <ScrollReveal>
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex rounded-full border border-[#00D2FF]/40 bg-[#00D2FF]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#00D2FF]">
              PARTICIPANT JOURNEY
            </span>
            <h2 className="font-sans text-3xl font-bold text-white">
              5 Steps to Discover & Build Your Path
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-md border border-cyan-500/25 flex flex-col justify-between space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_20px_rgba(0,210,255,0.2)] transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#00D2FF]/20 text-xs font-bold text-[#00D2FF] border border-[#00D2FF]/40 font-mono shadow-sm">
                      {step.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#00D2FF]/40" />
                  </div>
                  <h3 className="font-sans text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#BAE6FD]/80 font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 4: WHO ELEVIQ SERVES (7 PARTICIPANT POPULATIONS) */}
      <ScrollReveal>
        <WhoElevIqServes variant="dark" showPartnerBanner={false} />
      </ScrollReveal>

      {/* PROGRAM & PARTNER STATUS BLOCK (STEP 7) */}
      <ScrollReveal>
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-[#0284C7] shadow-xs">
              INITIATIVE STAGES
            </span>
            <h2 className="font-sans text-3xl font-bold text-slate-900">
              Program & Partner Deployment Status
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 space-y-3 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                  IN TESTING
                </span>
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900">
                Job Corps Alignment Configuration
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Configured for CSS/ESP counseling workflows and CTT trade pathways.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 space-y-3 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                  IN DEVELOPMENT
                </span>
                <span className="w-2 h-2 rounded-full bg-sky-400/60" />
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900">
                School & CTE Pathway Pilots
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Strengths-based career clarity modules for youth programs and high schools.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 space-y-3 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                  VALIDATED
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <h3 className="font-sans text-lg font-bold text-slate-900">
                Rural Workforce Innovation
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Community-rooted pilot models supporting local workforce ecosystems.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SUPPORT & PARTNERSHIP CTAS (STEP 9) */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 md:p-12 shadow-xl text-center text-white space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              MISSION ALLIANCE
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-white max-w-2xl mx-auto">
              Invite participants, families, schools, community partners, and mission-aligned supporters into an approved program or partnership conversation.
            </h2>
            <p className="text-sm md:text-base text-slate-300 font-sans leading-relaxed">
              Whether you are a funder, school leader, workforce agency, or community advocate, there is a place for you in the ElevIQ Foundation ecosystem.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/individuals/support-the-mission"
              className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-3 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Partner With or Support ElevIQ Foundation
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-slate-600 hover:bg-white/10 text-white font-medium px-6 py-3 text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Ask About a Program
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 5: TRUST BLOCK & COMMERCIAL HANDOFF */}
      <ScrollReveal>
        <section className="space-y-6">
          {/* Trust Block Summary */}
          <div className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
            <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
              Foundation Trust, Privacy & Dignity Guarantees
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                  Complete Data Privacy
                </h4>
                <p className="text-sm leading-relaxed text-slate-300 font-sans">
                  You own your profile data permanently. No third-party data sales or black-box algorithm scoring.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                  Dignity & Strengths Focus
                </h4>
                <p className="text-sm leading-relaxed text-slate-300 font-sans">
                  The experience focuses strictly on your verified strengths and alignment, avoiding clinical deficit framing.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                  Responsible Technology
                </h4>
                <p className="text-sm leading-relaxed text-slate-300 font-sans">
                  Interactive AI tools serve as supportive sounding boards for self-reflection alongside human advisors.
                </p>
              </div>
            </div>
          </div>

          {/* STC Innovations Commercial Handoff Banner */}
          <div className="rounded-[24px] bg-slate-900 border border-slate-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
            <div className="space-y-2">
              <span className="inline-flex rounded-full border border-sky-500/30 bg-sky-950/60 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-sky-400">
                COMMERCIAL & ENTERPRISE HANDOFF
              </span>
              <h4 className="font-sans text-lg font-bold text-white">
                Looking for commercial licensing, institutional pricing, or enterprise implementation?
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                STC Innovations licenses and configures the ElevIQ Capability Alignment System (CAS) for workforce boards, employers, and enterprise buyers.
              </p>
            </div>
            <Link
              to="/organizations"
              className="shrink-0 rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02] shadow-xs inline-flex items-center gap-1.5"
            >
              Visit STC Innovations →
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function IndividualsHowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Open Your Free Alignment Scan™',
      desc: 'Access your private workspace from any web device. The ElevIQ Alignment Scan™ is always 100% free for individual participants, asking intuitive questions about your life context and experiences.',
      bullets: ['No cost or hidden subscription fees', 'Zero multiple-choice testing stress', 'Instant private workspace creation'],
      badge: 'STEP 01: DISCOVERY'
    },
    {
      num: '02',
      title: 'Capture Qualitative Context & Unmapped Skills',
      desc: 'Document volunteer work, caregiving responsibilities, community leadership, and practical problem-solving experiences. The system translates non-linear background stories into visible capability points.',
      bullets: ['Non-traditional experience capture', 'Plain-language reflection prompts', 'Honoring lived experiences'],
      badge: 'STEP 02: REFLECTION'
    },
    {
      num: '03',
      title: 'Review Your Dynamic Alignment Snapshot™',
      desc: 'Watch your strengths organize into a clean, high-fidelity visual dashboard. You hold full sovereignty over your snapshot data and decide explicitly who gets to view it.',
      bullets: ['High-fidelity capability dashboard', 'Complete data privacy control', 'No automated black-box scoring'],
      badge: 'STEP 03: VISUALIZATION'
    },
    {
      num: '04',
      title: 'Connect with Guidance & Action Pathways™',
      desc: 'Share your snapshot with trusted mentors, workforce coaches, or regional training programs to co-create personalized roadmap steps that lead to real-world opportunities.',
      bullets: ['Collaborative mentor guidance', 'Tailored local training tracks', 'Continuous agency protection'],
      badge: 'STEP 04: ACTION'
    }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: CENTERED HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 md:p-12 shadow-xl overflow-hidden text-center relative">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-white text-center relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              FOUNDATION JOURNEY OVERVIEW
            </span>
            <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              How the ElevIQ Alignment Scan™ Works
            </h1>
            <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-2xl">
              Participants can move through the configured CAS journey toward practical support and next-step planning.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/individuals/support-the-mission"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                Support ElevIQ Foundation
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-slate-600 hover:bg-white/10 text-white font-medium px-6 py-2.5 text-xs sm:text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                Ask About a Program
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: ALTERNATING Z-PATTERN ROWS */}
      <ScrollReveal>
        <section className="space-y-8">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={step.num}
                className="bg-[#0B1936]/90 rounded-[28px] p-8 border border-cyan-500/25 shadow-lg hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300 text-white"
              >
                <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  <div className={`space-y-5 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-sm font-bold text-cyan-300 font-mono shadow-xs">
                        {step.num}
                      </span>
                      <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-cyan-300 shadow-xs">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
                      {step.desc}
                    </p>
                    <ul className="space-y-2 text-xs font-sans text-slate-300">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`flex justify-center items-center p-4 bg-slate-950/60 rounded-2xl border border-cyan-500/20 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="w-full max-w-[320px] bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg text-white space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-300">STEP {step.num} FLOW</span>
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-white/20 rounded w-3/4" />
                        <div className="h-2 bg-cyan-500/60 rounded w-1/2" />
                      </div>
                      <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>FREE ACCESS</span>
                        <span className="text-cyan-300 font-semibold">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Participant Guarantees
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Always Free to Individuals
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                You will never be asked to pay to build, maintain, or share your capability snapshots.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Ranking or Judgement
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                The platform never compares you to others or generates algorithmic pass/fail test scores.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Participant Data Sovereignty & Privacy Controls
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Your data belongs to you permanently. Revoke sharing access whenever you choose.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function IndividualsWhoWeServe() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: WHO ELEVIQ SERVES (7 APPROVED PARTICIPANT LEVELS) */}
      <ScrollReveal>
        <WhoElevIqServes variant="dark" showPartnerBanner={true} />
      </ScrollReveal>

      {/* SECTION 2: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Inclusion & Dignity Standards
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Background Exclusion
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Every individual has valuable capabilities regardless of formal degree status or non-linear career gaps.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Diagnostic Framing
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                We never apply psychological testing, clinical labels, or automated deficit scoring to participants.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Universal Free Access
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Individual participants will never be charged fees to capture, maintain, or share their capability data.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}


function IndividualsJobCorps() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 md:p-12 shadow-xl overflow-hidden text-center relative">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-white text-center relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              HISTORICAL BASELINE / IN DEVELOPMENT AND VALIDATION
            </span>
            <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Strengths-Based Alignment for Schools & Job Corps
            </h1>
            <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-2xl">
              Empowering educators, advisors, and counselors with human-centered capability alignment.
            </p>
            <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
              Initial implementation occurred in April 2026 with 14 students using the earlier TalentScan™ experience. Job Corps-specific CAS, Evaluation of Student Progress (ESP), Career Success Standards (CSS), eight Career Technical Training (CTT) pathways, and Counselor workflows are in development and validation.
            </p>
            <div className="pt-2">
              <Link
                to="/platform/participant-portal"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                Use My Approved Program Link →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: DUAL-AUDIENCE GRID SECTION */}
      <ScrollReveal>
        <section className="grid gap-8 md:grid-cols-2">
          {/* CARD A: Schools & Youth Programs */}
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                01. SCHOOLS & CTE
              </span>
              <h2 className="font-sans text-2xl font-bold text-slate-900">
                Schools & Youth Programs
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 font-sans">
                Supports strengths-based career clarity, CTE advising, classroom conversations, and practical pathway mapping.
              </p>
              <ul className="space-y-2.5 text-xs font-sans text-slate-600 pt-2">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Strengths-oriented career clarity without testing pressure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Actionable insights to guide CTE advising conversations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Direct connection from classroom learning to real-world options</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3 text-xs font-semibold text-white transition shadow-xs text-center block"
              >
                Discuss a Program
              </Link>
            </div>
          </div>

          {/* CARD B: Job Corps Centers & Counselors */}
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                02. JOB CORPS COHORTS
              </span>
              <h2 className="font-sans text-2xl font-bold text-slate-900">
                Job Corps Centers & Counselors
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 font-sans">
                Supports participant reflection, CSS/ESP conversations, CTT pathway exploration, counselors, and Support Planning.
              </p>
              <ul className="space-y-2.5 text-xs font-sans text-slate-600 pt-2">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Integrates with CSS/ESP counseling & participant reflection</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Translates hands-on CTT trade training into capability signals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Streamlines Support Planning and transition to employment</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-6 py-3 text-xs font-semibold text-white transition shadow-xs text-center block"
              >
                Discuss the Job Corps Configuration
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Job Corps & Educational Program Values
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Honoring Trade Excellence
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Hands-on technical mastery is highlighted with equal weight alongside academic credentials.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Seamless Transition Handoff
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Connects campus trade graduates directly to verified regional employer buyer pipelines.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor-Supported Growth
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Cohort leads and career counselors work side-by-side with students throughout their transition.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400 font-mono">
              Historical Reference (April 2026): Initial Job Corps cohort documentation referenced early tooling as TalentScan™, now formally integrated into the ElevIQ Alignment Scan™.
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function IndividualsPartnersPilots() {
  const cards = [
    { badge: '01. RURAL WORKFORCE', title: 'Rural Workforce Innovation', desc: 'Community pilots extending capability alignment infrastructure to non-metropolitan towns and agricultural regions.' },
    { badge: '02. CIVIC FOUNDATIONS', title: 'Mission-Driven Non-Profits', desc: 'Local community action agencies and non-profit coalitions coordinating participant guidance.' },
    { badge: '03. TECHNICAL SCHOOLS', title: 'Community Colleges & Vocational', desc: 'Educational partners integrating trade skill signals into certificate programs.' },
    { badge: '04. YOUTH INITIATIVES', title: 'Job Corps & Youth Centers', desc: 'Regional centers connecting vocational youth directly with localized employer buyer networks.' },
    { badge: '05. MUNICIPAL BOARDS', title: 'Workforce Investment Boards', desc: 'City and county boards deploying macro capability analytics across municipal districts.' },
    { badge: '06. REGIONAL EMPLOYERS', title: 'Inclusive Employer Alliances', desc: 'Forward-thinking corporate buyers committed to skills-first hiring and apprenticeship onboarding.' },
    { badge: '07. RE-ENTRY PARTNERS', title: 'Justice & Re-Entry Networks', desc: 'Specialized organizations supporting re-entering individuals with verified milestone tracking.' },
    { badge: '08. VETERAN HUBS', title: 'Military Transition Alliances', desc: 'Veteran support hubs translating tactical training into recognized civilian capability signals.' },
    { badge: '09. PHILANTHROPIC FUNDS', title: 'Donor & Funder Alliances', desc: 'Philanthropic partners supporting mission access and pilot funding across underserved zones.' }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: COMPACT HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 md:p-8 shadow-xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-white relative z-10">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                RELATIONSHIP STATUS REQUIRED
              </span>
              <h1 className="font-sans text-3xl font-bold tracking-tight text-white md:text-4xl leading-tight">
                Partners & Pilot Networks
              </h1>
              <p className="text-sm leading-relaxed text-slate-200 font-sans max-w-2xl">
                Every organization, logo, or initiative must be labeled by relationship and status, such as initial implementation, program partner, technology provider, membership, supporter, configuring, in validation, pilot-ready, or live. Do not imply endorsement without approval.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/contact"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1.5"
              >
                Discuss a Mission-Aligned Partnership →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 3x3 MATRIX CARD GRID */}
      <ScrollReveal>
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.badge}
              className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 space-y-3 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                {card.badge}
              </span>
              <h3 className="font-sans text-lg font-bold text-slate-900">
                {card.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                {card.desc}
              </p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Pilot Principles & Oversight
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Collaborative Design
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Pilots are co-designed alongside community leaders to respect local cultural and economic realities.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Transparent Impact Metrics
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Evaluation focuses on participant retention, capability growth, and human coaching satisfaction.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Sustainable Scaling
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Successful regional pilots transition into permanent community infrastructure with long-term support.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}


function IndividualsSupportMission() {
  const [selectedRole, setSelectedRole] = useState('funder')

  const roleDetails = {
    funder: {
      title: 'Philanthropic Funder / Donor',
      desc: 'Support mission-driven pilot access and rural workforce expansion across underserved community districts.',
      tag: 'PHILANTHROPIC SUPPORT',
      action: 'Connect with Foundation Team'
    },
    partner: {
      title: 'Community Partner / Non-Profit',
      desc: 'Bring free capability alignment tools to your local youth programs, adult learning hubs, or re-entry initiatives.',
      tag: 'COMMUNITY ALLIANCE',
      action: 'Inquire for Non-Profit Access'
    },
    advocate: {
      title: 'Participant / Individual Advocate',
      desc: 'Spread awareness about free alignment tools and help participants take sovereignty over their true potential.',
      tag: 'ADVOCACY ALLIANCE',
      action: 'Access Free Participant Scan'
    }
  }

  const currentRole = roleDetails[selectedRole] || roleDetails.funder

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: SPLIT HERO WITH EMBEDDED ROLE SELECTOR FORM */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                ELEVIQ FOUNDATION
              </span>
              <h1 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Support the Mission
              </h1>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                ElevIQ Foundation delivers mission-driven access, community pilots, and participant support.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                Your support can help expand approved mission-driven access, paper materials, digital access, advisor preparation, pilot implementation, and partner-delivered support. Gifts do not guarantee individual outcomes.
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Donations are made to ElevIQ Foundation Inc. and support its nonprofit mission and approved programs.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Support ElevIQ Foundation →
                </Link>
              </div>
            </div>

            {/* Right Column: Embedded Role Selector Card */}
            <div className="p-2">
              <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl text-white space-y-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 block font-bold">
                  SELECT HOW YOU CAN SUPPORT
                </span>

                {/* Role Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('funder')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-mono text-center transition-all ${selectedRole === 'funder' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                  >
                    Funder / Donor
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('partner')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-mono text-center transition-all ${selectedRole === 'partner' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                  >
                    Partner Org
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('advocate')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-mono text-center transition-all ${selectedRole === 'advocate' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                  >
                    Advocate
                  </button>
                </div>

                {/* Role Detail Box */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] font-bold text-cyan-400 uppercase tracking-wider">{currentRole.tag}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">{currentRole.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-300 font-sans">{currentRole.desc}</p>
                </div>

                <Link
                  to="/contact"
                  className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 text-xs font-bold transition text-center block shadow-md"
                >
                  {currentRole.action} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 3 FLOATING OPTION COLUMNS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Option 01 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                ALLIANCE 01: COMMUNITY PILOTS
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900">
                Rural & Youth Pilot Grants
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Fund localized capability alignment software access for Job Corps cohorts, agricultural youth, and rural non-profit partners.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2.5 text-xs font-semibold text-white transition text-center block shadow-xs"
              >
                Sponsor a Pilot →
              </Link>
            </div>
          </div>

          {/* Option 02 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border-2 border-sky-400 flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300 relative shadow-xl">
            <div className="space-y-4 pt-2">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                ALLIANCE 02: PARTICIPANT ACCESS
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900">
                Free Scan Endowment
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Ensure the ElevIQ Alignment Scan™ remains 100% free for individual participants permanently across all regional districts.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2.5 text-xs font-semibold text-white transition text-center block shadow-md"
              >
                Support Free Access →
              </Link>
            </div>
          </div>

          {/* Option 03 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                ALLIANCE 03: ADVISOR ENABLEMENT
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900">
                Coach & Advisor Training
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Underwrite training and enablement programs for frontline community mentors learning to deliver plain-language capability guidance.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2.5 text-xs font-semibold text-white transition text-center block shadow-xs"
              >
                Enable Local Advisors →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Foundation Governance Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                100% Mission Alignment
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                All philanthropic support goes directly toward expanding free participant tools and rural workforce access.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Deficit Labelling
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                We never frame participants as disadvantaged or deficient, evaluating strengths strictly through authentic capability language.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Community Accountability
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Foundation activities report transparently to community advisory boards and local workforce leaders.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}


function IndividualsTrustGovernance() {
  const metrics = [
    { value: '100%', title: 'Participant Data Sovereignty', desc: 'You own your profile data permanently. Revoke sharing access from any organization or advisor instantly.' },
    { value: '0', title: 'Black-Box AI Scores', desc: 'We outlaw automated ranking algorithms and diagnostic test scores. Your capabilities are represented in authentic language.' },
    { value: 'HUMAN', title: 'Coaching Oversight First', desc: 'Trained human advisors review all shared milestone entries alongside you, ensuring guidance stays supportive.' },
    { value: 'FREE', title: 'Always Free to Participants', desc: 'Individual job seekers, students, and community members never pay fees to build, store, or share snapshots.' }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: MINIMALIST HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 md:p-8 shadow-xl overflow-hidden relative">
          <div className="space-y-3 max-w-3xl text-white relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              POLICY FRAMEWORK / TECHNICAL VERIFICATION PENDING
            </span>
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Trust, Agency & Data Governance
            </h1>
            <p className="text-sm leading-relaxed text-slate-200 font-sans max-w-2xl">
              CAS is being designed with human oversight, participant consent, correction pathways, accessibility, safeguarding, and privacy-conscious workflows. Final technical and legal claims will reflect the verified production configuration.
            </p>
            <p className="text-xs text-slate-300 font-mono">
              AI supports navigation and interpretation; it does not make final eligibility, hiring, placement, clinical, or psychological decisions.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1.5"
              >
                Ask About Trust and Governance →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 4-COLUMN GOVERNANCE METRIC GRID */}
      <ScrollReveal>
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <span className="font-mono text-3xl font-bold text-[#0284C7] tracking-tight block">
                  {metric.value}
                </span>
                <h3 className="font-sans text-base font-bold text-slate-900">
                  {metric.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 font-sans">
                  {metric.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono font-semibold text-[#0284C7] uppercase tracking-wider">
                  Guaranteed Standard
                </span>
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Participant Governance Guarantees
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Data Monetization
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                We never sell, rent, or commercialize individual participant data or reflection entries to third-party advertisers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Transparent Permission Logs
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Every view request and sharing authorization is logged transparently inside your private participant dashboard.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Permanent Data Portability
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Export your dynamic capability snapshot at any time in open, readable formats to share wherever you choose.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}


function OrganizationsSection() {
  return (
    <SectionTheme variant="organizations">
      <div className="space-y-[var(--section-gap)]">
        <SubNav tabs={ORGANIZATIONS_TABS} />
        <Routes>
          <Route index element={<OrganizationsHome />} />
          <Route path="solutions" element={<OrganizationsSolutions />} />
          <Route path="implementation" element={<OrganizationsImplementation />} />
          <Route path="pricing-demo" element={<OrganizationsPricingDemo />} />
          <Route path="security-trust" element={<OrganizationsSecurityTrust />} />
        </Routes>
      </div>
    </SectionTheme>
  )
}

function OrganizationsHome() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK (THE TECHNICAL WELCOME) */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                COMMERCIAL OVERVIEW
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Align Local Talent Through Verified Capabilities
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Shift your operational hiring from static keyword filtering to high-fidelity, private capability metrics.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                STC Innovations owns, develops, licenses, and configures CAS for commercial and institutional use. Available workflows and features depend on the approved implementation scope and product status.
              </p>
              <p className="text-xs text-cyan-300/80 font-mono">
                Request a configured demonstration to review current, in-development, and planned capabilities for your use case.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/stc"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Visit Standalone STC Innovations Portal ↗
                </Link>
                <Link
                  to="/organizations/pricing-demo"
                  className="rounded-full border border-sky-400/30 bg-sky-950/40 hover:bg-sky-900/60 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition shadow-sm"
                >
                  Request a Configured Demo
                </Link>
                <Link
                  to="/organizations/implementation"
                  className="rounded-full border border-slate-700 hover:bg-white/10 px-6 py-2.5 text-xs sm:text-sm font-medium text-slate-300 transition"
                >
                  Implementation Discovery
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[380px] rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                {/* SVG Technical Network Cluster Graphic */}
                <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Subtle grid lines background */}
                  <defs>
                    <pattern id="network-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.03" />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#network-grid)" fillOpacity="0.5" />

                  {/* Graph connections */}
                  <line x1="120" y1="100" x2="200" y2="70" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <line x1="200" y1="70" x2="280" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <line x1="280" y1="120" x2="300" y2="220" stroke="rgba(0,210,255,0.3)" strokeWidth="2" />
                  <line x1="300" y1="220" x2="220" y2="280" stroke="rgba(0,210,255,0.5)" strokeWidth="2.5" />
                  <line x1="220" y1="280" x2="100" y2="240" stroke="rgba(0,210,255,0.4)" strokeWidth="2" />
                  <line x1="100" y1="240" x2="120" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                  {/* Inner connection lines */}
                  <line x1="200" y1="70" x2="200" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <line x1="120" y1="100" x2="200" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                  <line x1="280" y1="120" x2="200" y2="180" stroke="rgba(0,210,255,0.4)" strokeWidth="2" />
                  <line x1="100" y1="240" x2="200" y2="180" stroke="rgba(0,210,255,0.4)" strokeWidth="2" />
                  <line x1="220" y1="280" x2="200" y2="180" stroke="rgba(0,210,255,0.6)" strokeWidth="2.5" />
                  <line x1="300" y1="220" x2="200" y2="180" stroke="rgba(0,210,255,0.5)" strokeWidth="2" />

                  {/* Additional outer nodes connections for complexity */}
                  <line x1="120" y1="100" x2="60" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="100" y1="240" x2="50" y2="280" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="220" y1="280" x2="240" y2="350" stroke="rgba(0,210,255,0.3)" strokeWidth="1.5" />
                  <line x1="300" y1="220" x2="350" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="280" y1="120" x2="340" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                  {/* Connection Glow Overlays */}
                  <line x1="220" y1="280" x2="200" y2="180" stroke="#00D2FF" strokeWidth="4" opacity="0.15" />
                  <line x1="300" y1="220" x2="220" y2="280" stroke="#00D2FF" strokeWidth="4" opacity="0.15" />

                  {/* Standard Nodes (White/Grey) */}
                  <circle cx="120" cy="100" r="5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="200" cy="70" r="5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="280" cy="120" r="5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="60" cy="120" r="3.5" fill="#0F172A" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="50" cy="280" r="3.5" fill="#0F172A" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="350" cy="260" r="3.5" fill="#0F172A" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="340" cy="80" r="3.5" fill="#0F172A" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

                  {/* Horizon Cyan (#00D2FF) tracking nodes with animated scaling/glow */}
                  <g className="animate-pulse">
                    <circle cx="200" cy="180" r="12" fill="#00D2FF" fillOpacity="0.15" />
                    <circle cx="220" cy="280" r="14" fill="#00D2FF" fillOpacity="0.15" />
                    <circle cx="300" cy="220" r="10" fill="#00D2FF" fillOpacity="0.15" />
                  </g>

                  <circle cx="200" cy="180" r="6" fill="#00D2FF" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="220" cy="280" r="7.5" fill="#00D2FF" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx="300" cy="220" r="5.5" fill="#00D2FF" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="100" cy="240" r="5.5" fill="#00D2FF" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="240" cy="350" r="4.5" fill="#00D2FF" stroke="#FFFFFF" strokeWidth="1.5" />

                </svg>

                {/* Sub-card decorative glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THE THREE OPERATION GATEWAYS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 01 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm font-bold text-slate-900 tracking-wide">
                  01. Benchmark Positions
                </span>
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0284C7] shadow-xs">
                  ROLE SPECIFICATIONS
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 font-sans">
                Define your local team positions based on required day-one operational capability parameters, moving entirely away from restrictive and arbitrary college degree proxies.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors">
                Configure parameters
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm font-bold text-slate-900 tracking-wide">
                  02. Access Macro Insights
                </span>
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0284C7] shadow-xs">
                  ECOSYSTEM ALIGNMENT
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 font-sans">
                Monitor high-level regional talent trajectories, capability density maps, and upskilling alignment curves across your target municipal geographic clusters.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors">
                View alignment curves
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm font-bold text-slate-900 tracking-wide">
                  03. Engage Pilot Pipelines
                </span>
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0284C7] shadow-xs">
                  TARGETED INTEGRATION
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 font-sans">
                Securely accept dynamic snapshot profiles from verified workforce programs, community cohorts, and local pilots without intrusive data collection friction.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors">
                Review pipelines
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: ENTERPRISE ENGAGEMENT COMPLIANCE (BOTTOM HALF) */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Our Structural Commitments to Systemic Stability
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Strict Anonymized Macro analytics
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Organizations review aggregate regional talent data trends. Individual participant deep logs are protected by strict data-splitting protocols, ensuring zero security or privacy compliance risk.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                De-Biased Ingestion Architecture
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Our layout outlaws traditional automated ranking filters, predictive black-box indices, and talent scoring systems. Alignment is based entirely on verified lifestyle and project milestones.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Infrastructure Calibration Focus
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                System access focuses entirely on upgrading local economic infrastructure health. We provide high-fidelity dashboard transparency without sacrificing individual user data sovereignty.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function OrganizationsSolutions() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: WHAT ELEVIQ CAN HELP DELIVER (9 APPROVED SERVICE LANES) */}
      <ScrollReveal>
        <WhatElevIqDelivers variant="dark" />
      </ScrollReveal>

      {/* SECTION 2: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Institutional Solution Architecture
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Black-Box Algorithms
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Outlaws automated candidate rejection models, ensuring human review remains active at every stage.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Enterprise Privacy First
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Raw participant reflections are isolated from corporate views through strict data-splitting protocols.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Proven Regional Impact
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Delivers verifiable retention improvements by aligning talent to roles based on genuine capability fit.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function OrganizationsImplementation() {
  const steps = [
    {
      num: '01',
      title: 'Ecosystem Architecture & Data Splitting Setup',
      desc: 'Our deployment team configures sovereign data-splitting protocols, isolating raw participant reflection data from organizational analytics while establishing secure regional network boundaries.',
      bullets: ['Sovereign data boundary configuration', 'Role-based access permissioning', 'Zero black-box scoring integration'],
      badge: 'PHASE 01: ARCHITECTURE'
    },
    {
      num: '02',
      title: 'Advisor & Leadership Cohort Enablement',
      desc: 'Frontline advisors, workforce coaches, and cohort leaders receive comprehensive enablement on ElevIQ CLARA™ dashboards to support participant reflection without clinical diagnostic pressure.',
      bullets: ['ElevIQ CLARA™ advisor workspace training', 'Human-in-the-loop coaching protocols', 'Plain-language capability interpretation'],
      badge: 'PHASE 02: ENABLEMENT'
    },
    {
      num: '03',
      title: 'Participant Portal & Scan Onboarding',
      desc: 'Individual participants receive free, self-guided access to the ElevIQ Alignment Scan™ and Participant Portal to begin capturing non-linear experiences and qualitative capabilities.',
      bullets: ['Free participant access activation', 'Self-guided experience capture', 'Participant privacy sovereignty'],
      badge: 'PHASE 03: ONBOARDING'
    },
    {
      num: '04',
      title: 'Cross-Sector Pipeline Alignment & Analytics',
      desc: 'Macro intelligence consoles (Community Intelligence Console™) aggregate verified capability signals across regional cohorts, enabling corporate buyers and municipal leads to align open tracks.',
      bullets: ['Macro cohort capability analytics', 'Regional buyer pipeline matching', 'Transparent outcome tracking'],
      badge: 'PHASE 04: ALIGNMENT'
    }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: CENTERED HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 md:p-12 shadow-xl overflow-hidden text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-white text-center">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              IMPLEMENTATION FRAMEWORK
            </span>
            <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Structured Implementation & Onboarding
            </h1>
            <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-2xl">
              STC uses a staged implementation process: Discover → Configure → Sandbox → Test → Train → Launch → Measure. No workflow should be described as launched or measurable until acceptance criteria are confirmed.
            </p>
            <p className="text-xs leading-relaxed text-slate-300 max-w-2xl font-mono bg-slate-900/60 p-4 rounded-xl border border-cyan-500/20 text-left">
              <strong className="text-cyan-300">Acceptance Criteria Requirement:</strong> A written scope, data-responsibility map, status matrix, testing plan, training plan, and launch approval are required for each implementation.
            </p>
            <div className="pt-2">
              <Link
                to="/organizations/pricing-demo"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                Schedule an Implementation Discovery Conversation →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: ALTERNATING Z-PATTERN ROWS */}
      <ScrollReveal>
        <section className="space-y-8">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={step.num}
                className="bg-white rounded-[28px] p-8 border border-slate-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all duration-300"
              >
                <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  <div className={`space-y-5 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0284C7] text-sm font-bold text-white font-mono shadow-xs">
                        {step.num}
                      </span>
                      <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0284C7] shadow-xs">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-slate-900 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 font-sans">
                      {step.desc}
                    </p>
                    <ul className="space-y-2 text-xs font-sans text-slate-600">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`flex justify-center items-center p-4 bg-slate-900/90 rounded-2xl border border-cyan-500/20 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="w-full max-w-[320px] bg-slate-900 border border-cyan-500/30 rounded-xl p-6 shadow-lg text-white space-y-4">
                      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-300">DEPLOYMENT STEP {step.num}</span>
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-700 rounded w-3/4" />
                        <div className="h-2 bg-cyan-400 rounded w-1/2" />
                      </div>
                      <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>STAGE: {step.badge}</span>
                        <span className="text-cyan-300 font-semibold">READY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Implementation Commitments
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dedicated Technical Lead
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Every enterprise deployment receives a dedicated implementation engineer to manage data schema alignment and security protocols.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Rapid Advisor Readiness
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Intuitive advisor interfaces allow workforce coaches and cohort leaders to become fully proficient within hours, not weeks.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Interrupted Access
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                System updates occur seamlessly in the background without disturbing active participant reflection sessions or advisor reviews.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function OrganizationsPricingDemo() {
  const [selectedRole, setSelectedRole] = useState('employer')

  const roleDetails = {
    advocate: {
      title: 'Participant & Advisor Workspace',
      desc: 'Free, sovereign access for job seekers, students, and community participants alongside dedicated advisor dashboards.',
      tag: 'FREE FOR PARTICIPANTS',
      action: 'Explore Participant Access'
    },
    school: {
      title: 'Educational & Job Corps Pilots',
      desc: 'Configured software licensing for vocational schools, Job Corps centers, and youth workforce cohorts testing trade skill alignment.',
      tag: 'PILOT LICENSING',
      action: 'Request School Pilot Scope'
    },
    employer: {
      title: 'Enterprise Buyer & Employer Pipeline',
      desc: 'Direct skills-first hiring access to verified candidate snapshots without automated black-box screening filters.',
      tag: 'ENTERPRISE LICENSING',
      action: 'Schedule Enterprise Demo'
    },
    funder: {
      title: 'Philanthropic & Municipal Deployment',
      desc: 'Macro capability analytics (Community Intelligence Console™) for workforce investment boards and civic foundations.',
      tag: 'REGIONAL DEPLOYMENT',
      action: 'Contact Deployment Team'
    }
  }

  const currentRole = roleDetails[selectedRole]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: SPLIT HERO WITH EMBEDDED ROLE SELECTOR FORM */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                COMMERCIAL INQUIRY
              </span>
              <h1 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Pricing, Pilots & Demo Inquiry
              </h1>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Commercial pricing is provided for the approved configuration and implementation scope. ElevIQ Foundation participant access and mission programs are separate from STC commercial licensing.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Discuss CAS Licensing →
                </Link>
              </div>
            </div>

            {/* Right Column: Embedded Role Selector Card */}
            <div className="p-2">
              <div className="bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 shadow-2xl text-white space-y-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 block font-bold">
                  SELECT YOUR ROLE / INQUIRY TYPE
                </span>

                {/* Role Tabs */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('advocate')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'advocate' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    Participant / Advocate
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('school')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'school' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    School / Vocational
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('employer')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'employer' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    Employer / Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('funder')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'funder' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    Funder / Board
                  </button>
                </div>

                {/* Role Detail Box */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] font-bold text-cyan-300 uppercase tracking-wider">{currentRole.tag}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">{currentRole.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-300 font-sans">{currentRole.desc}</p>
                </div>

                <Link
                  to="/contact"
                  className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2.5 text-xs text-center block shadow-lg shadow-cyan-500/20 transition-all duration-200"
                >
                  {currentRole.action} →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 3 FLOATING OPTION COLUMNS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Option 01 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0284C7] shadow-xs">
                OPTION 01: REGIONAL PILOT
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900">
                Localized Pilot Cluster
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Configured for initial Job Corps cohorts, municipal pilots, or neighborhood non-profits testing baseline capability matching.
              </p>
              <ul className="space-y-2 text-xs font-sans text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Up to 250 active participant profiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>ElevIQ CLARA™ advisor workspace included</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Always free for individual participants</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2.5 text-xs font-semibold text-white transition text-center block shadow-xs"
              >
                Inquire for Pilot Scope →
              </Link>
            </div>
          </div>

          {/* Option 02 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border-2 border-sky-500 flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300 relative shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0284C7] text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm">
              MOST REQUESTED
            </div>
            <div className="space-y-4 pt-2">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0284C7] shadow-xs">
                OPTION 02: ECOSYSTEM DEPLOYMENT
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900">
                Metropolitan Pipeline Network
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Built for regional workforce investment boards and civic coalitions unifying cross-sector talent pipelines across a metro zone.
              </p>
              <ul className="space-y-2 text-xs font-sans text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Community Intelligence Console™ macro analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Full data-splitting security protocols</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Dedicated implementation technical lead</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2.5 text-xs font-semibold text-white transition text-center block shadow-md"
              >
                Schedule Ecosystem Demo →
              </Link>
            </div>
          </div>

          {/* Option 03 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0284C7] shadow-xs">
                OPTION 03: ENTERPRISE BUYER
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900">
                Corporate Buyer Integration
              </h3>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Tailored for large corporate buyers requiring skills-first hiring portals, custom role benchmarks, and multi-zone analytics.
              </p>
              <ul className="space-y-2 text-xs font-sans text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Custom role alignment benchmarking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>The ElevIQ Last Mile™ onboarding support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>Multi-zone enterprise compliance dashboard</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact"
                className="w-full rounded-full bg-[#0284C7] hover:bg-[#0369A1] px-4 py-2.5 text-xs font-semibold text-white transition text-center block shadow-xs"
              >
                Request Enterprise Consultation →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Licensing & Fiscal Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Infrastructure-Based Pricing
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Pricing is calculated strictly based on software configuration scope and support depth, never per-seat candidate tax.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Always Free to Job Seekers
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Participants, students, and community members never pay any fees to access or share their alignment snapshots.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Direct Intake Protocol
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                All pricing inquiries are reviewed by our engineering leads to ensure proper pilot alignment prior to contract activation.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function OrganizationsSecurityTrust() {
  const metrics = [
    { value: 'SOVEREIGN', title: 'Data Isolation Protocols', desc: 'Strict data-splitting architecture separates raw participant reflection entries from macro organizational analytics.' },
    { value: 'HUMAN-LED', title: 'No Black-Box AI Rejection', desc: 'Outlaws automated candidate scoring and algorithmic rejection models to protect institutional integrity.' },
    { value: 'OVERSIGHT', title: 'Human Oversight First', desc: 'Trained workforce coaches and cohort leaders validate milestone data through transparent interfaces.' },
    { value: 'AUDITABLE', title: 'Institutional Compliance', desc: 'Configured to meet strict educational, municipal, and institutional privacy standards across regional networks.' }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: MINIMALIST HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 md:p-8 shadow-xl overflow-hidden">
          <div className="space-y-3 max-w-3xl text-white">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              VERIFICATION IN PROGRESS
            </span>
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              Security and Trust Information - Verification in Progress
            </h1>
            <p className="text-sm leading-relaxed text-slate-200 font-sans max-w-2xl">
              Security, privacy, storage, encryption, access, logging, retention, subprocessors, incident response, and education/workforce compliance language will be published only after technical evidence, scope, dates, and legal review are complete.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1.5"
              >
                Discuss Security and Implementation Requirements →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 4-COLUMN GOVERNANCE METRIC GRID */}
      <ScrollReveal>
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <span className="font-mono text-3xl font-bold text-[#0284C7] tracking-tight block">
                  {metric.value}
                </span>
                <h3 className="font-sans text-base font-bold text-slate-900">
                  {metric.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 font-sans">
                  {metric.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono font-semibold text-[#0284C7] uppercase tracking-wider">
                  Enterprise Compliance
                </span>
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Institutional Privacy Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Sovereign Data Splitting
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Raw participant context stays strictly in the user's private workspace; only explicitly approved snapshots are shared with enterprise buyers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Role-Based Permission Logs
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Granular access controls ensure advisors and hiring leads view only the specific data layers necessary for current coaching or placement.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Auditable Governance Compliance
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Complete system transparency with audit logs available for institutional compliance reviews and municipal oversight boards.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}


function ResourcesPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                System Resources & Publications
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                Architectural documentation, pilot frameworks, and ecosystem insights.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                This area will provide approved guides, frequently asked questions, product-status information, program resources, and organization materials. Do not publish internal or unapproved working documents.
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1.5"
                >
                  Contact the Appropriate Team →
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                {/* SVG sequential resources graphic */}
                <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Grid background */}
                  <defs>
                    <pattern id="resources-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.05" />
                    </pattern>
                  </defs>
                  <rect width="320" height="240" fill="url(#resources-grid)" fillOpacity="0.5" />

                  {/* Folder Stack Interface */}
                  <path d="M 40 160 H 280 V 210 H 40 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                  {/* Document 1 Icon */}
                  <g transform="translate(60, 50)">
                    <rect x="0" y="0" width="55" height="75" rx="4" fill="#071739" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    <path d="M 40 0 L 55 15 L 40 15 Z" fill="#00D2FF" opacity="0.8" />
                    <line x1="8" y1="28" x2="35" y2="28" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <line x1="8" y1="40" x2="47" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <line x1="8" y1="52" x2="47" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  </g>

                  {/* Document 2 Icon (Active / Highlighted) */}
                  <g transform="translate(130, 35)">
                    <rect x="0" y="0" width="60" height="85" rx="4" fill="#071739" stroke="#00D2FF" strokeWidth="2" />
                    <path d="M 42 0 L 60 18 L 42 18 Z" fill="#00D2FF" />
                    <line x1="10" y1="32" x2="40" y2="32" stroke="#FFFFFF" strokeWidth="2" />
                    <line x1="10" y1="46" x2="50" y2="46" stroke="#00D2FF" strokeWidth="1.5" />
                    <line x1="10" y1="58" x2="50" y2="58" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="10" y1="70" x2="35" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <circle cx="50" cy="32" r="3" fill="#00D2FF" />
                  </g>

                  {/* Document 3 Icon */}
                  <g transform="translate(205, 50)">
                    <rect x="0" y="0" width="55" height="75" rx="4" fill="#071739" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    <path d="M 40 0 L 55 15 L 40 15 Z" fill="rgba(255,255,255,0.2)" />
                    <line x1="8" y1="28" x2="35" y2="28" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <line x1="8" y1="40" x2="47" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <line x1="8" y1="52" x2="47" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  </g>

                  {/* Front Desk / Stand Line */}
                  <line x1="30" y1="160" x2="290" y2="160" stroke="#00D2FF" strokeWidth="2" />
                </svg>

                {/* Sub-card decorative glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: PREVIEW RESOURCE CARDS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 01 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-slate-900 tracking-wide">
                  01. CAS Architectural Brief
                </span>
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs shrink-0">
                  STATUS: IN DEVELOPMENT
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                An overview of the core Capability Alignment System™ infrastructure, data-splitting protocols, and privacy safeguards.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Link to="/contact" className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] inline-flex items-center gap-1 transition-colors">
                Preview Summary →
              </Link>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-slate-900 tracking-wide">
                  02. Regional Pilot Frameworks
                </span>
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs shrink-0">
                  STATUS: PREVIEW
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                Deployment guidelines for municipal workforce boards and institutional corporate buyers establishing local capability clusters.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Link to="/contact" className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] inline-flex items-center gap-1 transition-colors">
                Request Documentation →
              </Link>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-between space-y-6 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-slate-900 tracking-wide">
                  03. Role Benchmarking Guide
                </span>
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs shrink-0">
                  STATUS: ROADMAP
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600 font-sans">
                A practical walkthrough for HR teams formatting operational roles around baseline capabilities rather than degree proxies.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Link to="/contact" className="text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] inline-flex items-center gap-1 transition-colors">
                Inquire for Early Access →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: UPDATES & NOTIFICATION */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Access & Publication Policy
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Verified Publications Only
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                In compliance with system governance, resource materials are published only after formal review and verification.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Inquiries & Direct Access
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Need immediate documentation for an active pilot evaluation? Contact our implementation team directly to request technical briefs.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Knowledge Updates
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Our resource center is continuously updated as new regional cohort data and verified pilot outcomes are finalized.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: FOUNDER PERSPECTIVE - WHY I BUILT ELEVIQ */}
      <ScrollReveal>
        <div id="tammy-story">
          <FounderStory isFullPage={true} initialExpanded={true} />
        </div>
      </ScrollReveal>

      {/* SECTION 2: RURAL TALENT & REGIONAL WORKFORCE ALIGNMENT */}
      <ScrollReveal>
        <div id="rural-talent">
          <RuralWorkforce variant="dark" />
        </div>
      </ScrollReveal>

      {/* SECTION 3: HERO / RELATIONSHIP OVERVIEW BLOCK */}
      <ScrollReveal>
        <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                RELATIONSHIP OVERVIEW
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
                How ElevIQ Foundation, STC Innovations, and CAS Work Together
              </h2>
              <p className="text-lg font-medium text-slate-200 leading-relaxed max-w-xl">
                ElevIQ Foundation, STC Innovations, and CAS are distinct organizations and product infrastructure working through one connected CAS ecosystem.
              </p>
              <p className="text-sm leading-relaxed text-slate-300 max-w-2xl font-sans">
                STC Innovations owns, develops, configures, licenses, and commercializes the ElevIQ Capability Alignment System™. ElevIQ Foundation applies CAS through mission-driven access, community programs, pilots, partnerships, and participant support. ElevIQ Foundation receives CAS access at no cost for approved mission-aligned nonprofit use, and the ElevIQ Alignment Scan™ remains free for individual participants. This connected site experience routes visitors to the appropriate Foundation, STC Innovations, or CAS information while preserving clear legal, financial, and operating boundaries.
              </p>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
                {/* SVG sequential interconnected graphic */}
                <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Grid background */}
                  <defs>
                    <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.05" />
                    </pattern>
                  </defs>
                  <rect width="320" height="240" fill="url(#about-grid)" fillOpacity="0.5" />

                  {/* Connecting Links */}
                  <line x1="90" y1="80" x2="230" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <line x1="90" y1="80" x2="230" y2="80" stroke="#00D2FF" strokeWidth="2" strokeDasharray="6 6" />

                  <line x1="90" y1="80" x2="160" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <line x1="90" y1="80" x2="160" y2="170" stroke="#00D2FF" strokeWidth="2" strokeDasharray="6 6" />

                  <line x1="230" y1="80" x2="160" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <line x1="230" y1="80" x2="160" y2="170" stroke="#00D2FF" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Entity Node 1: Foundation */}
                  <circle cx="90" cy="80" r="28" fill="#071739" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <circle cx="90" cy="80" r="24" fill="none" stroke="#00D2FF" strokeWidth="1" opacity="0.4" />
                  <text x="90" y="83" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-sans)">FOUNDATION</text>

                  {/* Entity Node 2: STC */}
                  <circle cx="230" cy="80" r="28" fill="#071739" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <circle cx="230" cy="80" r="24" fill="none" stroke="#00D2FF" strokeWidth="1" opacity="0.4" />
                  <text x="230" y="83" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-sans)">STC INNOV</text>

                  {/* Entity Node 3: CAS */}
                  <circle cx="160" cy="170" r="32" fill="#071739" stroke="#00D2FF" strokeWidth="2" />
                  <circle cx="160" cy="170" r="38" fill="none" stroke="#00D2FF" strokeWidth="1.5" className="animate-pulse" />
                  <text x="160" y="173" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-sans)">CAS CORE</text>
                </svg>

                {/* Sub-card decorative glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 4: ONE MISSION. DISTINCT ROLES. SHARED INFRASTRUCTURE. */}
      <ScrollReveal>
        <EcosystemRelationship variant="dark" />
      </ScrollReveal>

      {/* SECTION 5: SYSTEMIC PURPOSE & PRINCIPLES */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Our Structural Operating Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Guiding Reflection, Not Clinical Testing
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                CAS is not a test that tells someone what they must become. It is capability-alignment infrastructure built to support human guidance and practical next steps.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Participant Data Sovereignty & Privacy Controls
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Individual records are owned strictly by the participant. Data splitting protocols ensure organizations only view aggregate, anonymized regional metrics.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dignified Career Mobility
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Connects non-traditional talent, career changers, veterans, and students with verified regional buyer pipelines based on baseline operational capabilities rather than blunt degree proxies.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      <ScrollReveal>
        <AudienceIntentRouting variant="dark" showForm={true} />
      </ScrollReveal>
    </div>
  )
}

function ElevIqLastMilePage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative">
          <div className="space-y-6 text-white relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              IN DEVELOPMENT / FUTURE-STATE ELEMENTS
            </span>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              The ElevIQ Last Mile™
            </h2>
            <p className="text-lg font-medium text-slate-200 leading-relaxed font-mono text-xs uppercase tracking-wider text-cyan-300">
              FROM INSIGHT TO PRACTICAL NEXT STEPS
            </p>
            <p className="text-lg font-medium text-slate-200 leading-relaxed">
              Supporting the movement from capability insight toward practical, human-guided next steps.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Depending on the configured partner program, The ElevIQ Last Mile™ may include support planning, referrals, preparation, training options, applications, interviews, onboarding preparation, and follow-up.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-6 py-2.5 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-1.5"
              >
                Inquire About Last Mile Workflows →
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
              <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                <rect x="0" y="0" width="320" height="240" fill="#071739" rx="16" />
                {/* Abstract transition flow */}
                <rect x="200" y="60" width="80" height="120" rx="8" fill="#030B1E" opacity="0.6" stroke="#00D2FF" strokeWidth="1.5" />
                <path d="M 40 120 C 100 120, 120 70, 190 90" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                <path d="M 40 120 C 100 120, 120 170, 190 150" fill="none" stroke="#00D2FF" strokeWidth="2.5" />

                <circle cx="40" cy="120" r="5" fill="#FFFFFF" />
                <circle cx="190" cy="90" r="4" fill="#FFFFFF" opacity="0.6" />
                <circle cx="190" cy="150" r="6" fill="#00D2FF" />
                <polygon points="205,150 195,145 195,155" fill="#00D2FF" />
              </svg>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 2 FLOATING CARDS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0 border border-cyan-400/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="font-sans text-lg font-bold text-white">Structured Transitions</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              May support practical transition planning within an approved program.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-3 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0 border border-cyan-400/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-sans text-lg font-bold text-white">Post-Placement Mentorship</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Post-placement support is program-dependent and should not be presented as live unless a partner workflow has been configured and tested.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: BOTTOM 2-POINT GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white">
              Securing Long-Term Alignment Outcomes
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Proactive Churn Mitigation
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                May support follow-up conversations about alignment and support needs within an approved program.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Sustained Career Growth
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Participants may revisit goals and next steps when continued access is part of the configured program.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function ScreenshotsPreviewPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative text-white">
          <div className="space-y-6 relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              SAMPLE ENVIRONMENT PREVIEW
            </span>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Screenshots & Product Preview
            </h2>
            <p className="text-lg font-medium text-slate-200 leading-relaxed">
              All screen previews utilize mockups and fictional data for illustrative purposes. Features shown reflect configured sample environments and may require custom deployment.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Explore configured sample screens illustrating the intended participant, advisor, and organization experience. Visible screens do not imply that every feature, report, integration, or button is connected.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2 font-mono text-xs">
              <Link
                to="/platform/contact"
                title="Request access to a configured sample environment"
                className="px-4 py-2 rounded-full border border-cyan-500/30 bg-slate-900/60 text-slate-200 transition-all duration-200 hover:border-cyan-400 hover:text-white"
              >
                Configured Sample Environment
              </Link>
              <Link
                to="/platform/interactive-journey"
                title="Explore the step-by-step product interactive journey"
                className="px-4 py-2 rounded-full border border-cyan-500/30 bg-slate-900/60 text-slate-200 transition-all duration-200 hover:border-cyan-400 hover:text-white"
              >
                Product Development Preview
              </Link>
              <Link
                to="/platform/contact"
                title="Request sandbox environment access"
                className="px-4 py-2 rounded-full border border-cyan-500/30 bg-slate-900/60 text-slate-200 transition-all duration-200 hover:border-cyan-400 hover:text-white"
              >
                In Sandbox Testing
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
              <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                <rect x="0" y="0" width="320" height="240" fill="#071739" rx="16" />
                {/* Structured Canvas Mockup Frame */}
                <rect x="20" y="30" width="280" height="180" rx="8" fill="#030B1E" opacity="0.6" stroke="#00D2FF" strokeWidth="1" strokeOpacity="0.3" />

                {/* Mockup Title bar */}
                <rect x="20" y="30" width="280" height="30" rx="8" fill="#071739" />
                <circle cx="35" cy="45" r="4" fill="#00D2FF" />
                <circle cx="47" cy="45" r="4" fill="#FFFFFF" opacity="0.5" />
                <circle cx="59" cy="45" r="4" fill="#FFFFFF" opacity="0.3" />

                {/* Grid inside canvas mockup */}
                <rect x="35" y="75" width="75" height="120" rx="4" fill="#030B1E" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />
                <rect x="120" y="75" width="165" height="50" rx="4" fill="#030B1E" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />
                <rect x="120" y="135" width="165" height="60" rx="4" fill="#030B1E" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />

                {/* Tiny accent bars */}
                <rect x="45" y="90" width="55" height="6" rx="3" fill="#00D2FF" opacity="0.8" />
                <rect x="135" y="90" width="100" height="6" rx="3" fill="#FFFFFF" opacity="0.4" />
                <rect x="135" y="150" width="130" height="6" rx="3" fill="#00D2FF" />
              </svg>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 3 FLOATING CARDS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-4 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0 border border-cyan-400/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                PARTICIPANT
              </span>
              <h3 className="font-sans text-lg font-bold text-white">Participant Dashboard Preview</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Configured sample mockup demonstrating reflection logs, signal summaries, and guidance options.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-4 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0 border border-cyan-400/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                ADVISOR
              </span>
              <h3 className="font-sans text-lg font-bold text-white">Advisor Workspace Preview</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Configured sample mockup displaying staff notes, approved signal views, and goal planning space.
            </p>
          </div>

          <div className="bg-[#0B1936]/90 rounded-[24px] p-6 shadow-lg border border-cyan-500/25 flex flex-col justify-start space-y-4 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0 border border-cyan-400/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                ORGANIZATION
              </span>
              <h3 className="font-sans text-lg font-bold text-white">Community Intelligence Console™</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#BAE6FD]/80 font-sans">
              Configured sample mockup depicting anonymized aggregate program views for approved administrators.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: BOTTOM 3-POINT GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white">
              Strict Mock-Up Data Transparency
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Fictional Mock Data Only
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                All screen previews utilize entirely fictionalized user datasets to demonstrate layout capabilities while protecting actual privacy.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Status Label Indicators
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Clearly displays the current development or testing status of each preview module across all views.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Human-Centric Design Focus
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Proves visually that the system relies on clear context spacing, prioritizing legibility and ease of use over dense text blocks.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function InteractiveJourneyPage() {
  const steps = [
    'Participant begins through an approved program route or individual access path.',
    'Participant-provided Experience & Context helps inform capability language.',
    'Capability Signals™ and Alignment Snapshot™ are reviewed.',
    'ElevIQ ARIA™ supports reflection on the current step.',
    'Alignment Pathways™ and Support Connections shape next moves.',
    'The ElevIQ Last Mile™ supports movement toward a practical next step.'
  ]
  const [step, setStep] = useState(0)

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative text-white">
          <div className="space-y-6 relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              INTERACTIVE SIMULATION
            </span>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Interactive Journey
            </h2>
            <p className="text-lg font-medium text-slate-200 leading-relaxed">
              Walk through a product-development simulation showing the intended CAS journey. This simulation is illustrative and is not the authenticated Participant Portal.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              This walkthrough demonstrates the workflow from initial participant reflection to advisor touchpoints and pathway alignment.
            </p>
          </div>

          <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
              <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                <rect x="0" y="0" width="320" height="240" fill="#071739" rx="16" />
                {/* Step trajectory line */}
                <path d="M 40 160 L 90 120 L 140 160 L 190 120 L 240 160 L 280 120" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
                <path d="M 40 160 Q 90 120 140 160 T 240 160 T 280 120" fill="none" stroke="#00D2FF" strokeWidth="2.5" />

                {/* Node markers */}
                {steps.map((_, i) => {
                  const cx = 40 + i * 48
                  const cy = i % 2 === 0 ? 160 : 120
                  const isActive = i === step
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={isActive ? 8 : 4}
                      fill={isActive ? '#00D2FF' : '#FFFFFF'}
                      stroke={isActive ? '#FFFFFF' : '#00D2FF'}
                      strokeWidth={isActive ? 2 : 1}
                      className="transition-all duration-300"
                    />
                  )
                })}
              </svg>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* INTERACTIVE CONTROLLER SECTION */}
      <ScrollReveal>
        <section className="bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 grid gap-6 md:grid-cols-[1fr_1.5fr] items-center text-white shadow-xl">
          <div className="space-y-4">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300">
              Journey step {step + 1} of {steps.length}
            </span>
            <h3 className="font-sans text-xl font-bold text-white">
              {steps[step]}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
                disabled={step === steps.length - 1}
                className="rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 text-xs transition hover:brightness-105 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button
                onClick={() => setStep(0)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:text-white"
              >
                Restart
              </button>
            </div>
          </div>
          <div className="bg-slate-950/60 border border-cyan-500/20 p-4 rounded-xl space-y-2">
            <p className="text-xs text-cyan-300 font-bold uppercase tracking-wider font-mono">
              System State Log
            </p>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {step === 0 && "Participant begins through an approved program route or individual access path."}
              {step === 1 && "Participant-provided Experience & Context helps inform capability language."}
              {step === 2 && "Preparing the Alignment Snapshot™ for participant review. Sharing controls remain subject to final configuration."}
              {step === 3 && "Previewing how ElevIQ ARIA™ may support participant reflection and preparation."}
              {step === 4 && "Previewing possible Alignment Pathways™ and Support Connections available through an approved program configuration."}
              {step === 5 && "Illustrative journey complete. Actual follow-up and communication depend on the configured program workflow."}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 3 FLOATING CARDS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-start space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0284C7] shrink-0 border border-sky-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                PHASE 01
              </span>
              <h3 className="font-sans text-lg font-bold text-slate-900">Discovery Stage Simulation</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600 font-sans">
              Simulates the entry point where an individual uses self-guided reflections to log undocumented, non-linear skills.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-start space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0284C7] shrink-0 border border-sky-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                PHASE 02
              </span>
              <h3 className="font-sans text-lg font-bold text-slate-900">Signal Verification Stage</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600 font-sans">
              Demonstrates how qualitative entries evolve seamlessly into clear, visible indicators accessible to verified coaches.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-start space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0284C7] shrink-0 border border-sky-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                PHASE 03
              </span>
              <h3 className="font-sans text-lg font-bold text-slate-900">Ecosystem Route Mapping</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600 font-sans">
              Illustrates the final phase where the platform aligns active signals with specific, local educational blocks and open community positions.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: BOTTOM 3-POINT GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white">
              Interactive System Clarifications
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Clarifying Stakeholder Roles
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Demonstrates exactly how participants, advisors, and corporate buyers interact within the ecosystem synchronously.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Contextual Validation Logic
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Highlights the absolute absence of testing stress, proving data accumulates strictly through self-driven, verified milestones.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Scope Confirmation Tags
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Clearly tags complex interactive steps as 'Pending Final Scope Verification' to align expectations perfectly.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function FaqPage() {
  const [openAll, setOpenAll] = useState(false)
  const faqs = [
    { question: 'Is CAS a test or a quiz?', answer: 'No. CAS is capability-alignment infrastructure that supports participant reflection, staff interpretation, and practical next steps.' },
    { question: 'Does CAS guarantee any outcome?', answer: 'No. It does not guarantee employment, hiring, wages, admissions, or clinical or psychological outcomes.' },
    { question: 'Who can use shared information?', answer: 'Access depends on participant consent, program rules, legal agreements, and the verified production permissions model.' },
    { question: 'Is the ElevIQ Alignment Scan™ free?', answer: 'The ElevIQ Alignment Scan™ remains free for individual participants. Program services, institutional implementation, and commercial licensing are separate.' },
    { question: 'How is system documentation updated?', answer: 'Product and public documentation will be updated as configuration, testing, validation, and launch status changes.' },
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-[var(--panel-pad)] shadow-xl overflow-hidden relative text-white">
          <div className="space-y-6 relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-500/15 px-[14px] py-[6px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              KNOWLEDGE BASE
            </span>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-medium text-slate-200 leading-relaxed">
              Clear, straightforward answers regarding CAS mechanics, architecture, and deployment models.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Product purpose, participant experience, human oversight, data practices, and current development status.
            </p>
          </div>

          <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-[340px] rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-400/50 transition-all duration-300">
              <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                <rect x="0" y="0" width="320" height="240" fill="#071739" rx="16" />
                {/* Dialogue shapes & dotted lines */}
                <rect x="30" y="50" width="160" height="45" rx="6" fill="#030B1E" opacity="0.6" stroke="#00D2FF" strokeWidth="1" strokeOpacity="0.3" />
                <rect x="130" y="120" width="160" height="45" rx="6" fill="#030B1E" opacity="0.8" stroke="#00D2FF" strokeWidth="1.5" />

                <circle cx="50" cy="72" r="8" fill="#FFFFFF" opacity="0.5" />
                <line x1="70" y1="72" x2="160" y2="72" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />

                <circle cx="260" cy="142" r="8" fill="#00D2FF" />
                <line x1="160" y1="142" x2="240" y2="142" stroke="#00D2FF" strokeWidth="2.5" />

                <path d="M 110 95 L 110 120" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              </svg>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ INTERACTIVE ACCORDIONS */}
      <ScrollReveal>
        <section className="bg-white rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-200 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-sans text-xl font-bold text-slate-900">Platform FAQs</h3>
            <button
              onClick={() => setOpenAll((value) => !value)}
              className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-slate-200 hover:border-sky-300 text-[#0284C7] bg-sky-50 transition"
            >
              {openAll ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((item) => (
              <details
                key={item.question}
                open={openAll}
                className="group rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all duration-300 hover:border-sky-200"
              >
                <summary className="cursor-pointer list-none font-sans text-base font-semibold text-slate-900 select-none outline-none flex justify-between items-center">
                  <span>{item.question}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200">↓</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-sans border-t border-slate-200/60 pt-3">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 3 FLOATING CARDS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-start space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0284C7] shrink-0 border border-sky-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                GOVERNANCE
              </span>
              <h3 className="font-sans text-lg font-bold text-slate-900">Data Privacy & Sovereignty</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600 font-sans">
              Explains how the platform keeps individuals in absolute control of their data, ensuring no third-party matching occurs without explicit consent.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-start space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0284C7] shrink-0 border border-sky-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                METHODOLOGY
              </span>
              <h3 className="font-sans text-lg font-bold text-slate-900">Bypassing Legacy Testing</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600 font-sans">
              Clarifies exactly how CAS operates without assigning clinical test grades, personality profiles, or automated scoring models.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-200 flex flex-col justify-start space-y-4 hover:border-sky-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#0284C7] shrink-0 border border-sky-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7] shadow-xs">
                OPERATIONS
              </span>
              <h3 className="font-sans text-lg font-bold text-slate-900">Deployment Coordination</h3>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-slate-600 font-sans">
              Outlines how regional organizations, schools, and civic non-profits roll out local alignment clusters efficiently.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: BOTTOM 3-POINT GRID */}
      <ScrollReveal>
        <section className="w-full bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 rounded-[32px] p-8 md:p-12 shadow-xl text-white space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-white">
              Core Policy Framework Reminders
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Free Public Utility
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                The ElevIQ Alignment Scan™ remains free for individual participants. Program services, institutional implementation, and commercial licensing are separate.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dual-Audience Boundaries
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Clearly distinguishes the mission-driven work of ElevIQ Foundation from the commercial operations of STC Innovations.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-cyan-400 pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Architecture Reviews
              </h4>
              <p className="text-sm leading-relaxed text-slate-300 font-sans">
                Product and public documentation will be updated as configuration, testing, validation, and launch status changes.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function ContactFormPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      <ScrollReveal>
        <AudienceIntentRouting variant="dark" showForm={true} />
      </ScrollReveal>
    </div>
  )
}

function Field({ label, error, children, className = '' }) {
  const child = Children.only(children)
  const updatedChild = cloneElement(child, {
    className: `${child.props.className || ''} ${error ? 'border-rose-500! focus:ring-rose-500/20' : ''}`
  })

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-slate-700">{label}</span>
      {updatedChild}
      <div className={`transition-all duration-300 ease-out overflow-hidden ${error ? 'max-h-10 opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
        <span className="text-xs text-rose-600 font-semibold flex items-center gap-1">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </span>
      </div>
    </label>
  )
}

function NotFoundPage() {
  return <SectionShell eyebrow="Not found" title="That route is not available" lead="Use the top-level navigation to return to an available page." actions={[{ label: 'Return home', to: '/' }, { label: 'Open Platform', to: '/platform' }]} />
}

export default App