import { createContext, useContext, useMemo, useState, useEffect, useRef, Children, cloneElement } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'
import AnimatedBackground from '@/components/ui/animated-background'

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
  { label: 'How It Works', path: '/individuals/how-it-works' },
  { label: 'Who We Serve', path: '/individuals/who-we-serve' },
  { label: 'Job Corps', path: '/individuals/job-corps' },
  { label: 'Partners & Pilots', path: '/individuals/partners-pilots' },
  { label: 'Support the Mission', path: '/individuals/support-the-mission' },
  { label: 'Trust & Governance', path: '/individuals/trust-governance' },
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
    shellBg: 'bg-[var(--page-bg)]',
    heroBg: 'bg-[linear-gradient(135deg,_var(--hero-bg-from),_var(--hero-bg-to))]',
    accent: 'var(--accent)',
    accentSoft: 'var(--accent-soft)',
    accentHover: 'hover:border-[var(--accent)]',
    buttonPrimary: 'border-[var(--accent)] bg-[var(--accent)]',
    surfaceTint: 'bg-[var(--surface-soft)]/50',
  },
  individuals: {
    shellBg: 'bg-[var(--page-bg)]',
    heroBg: 'bg-[linear-gradient(135deg,_var(--hero-bg-from),_var(--hero-bg-to))]',
    accent: 'var(--accent)',
    accentSoft: 'var(--accent-soft)',
    accentHover: 'hover:border-[var(--accent)]',
    buttonPrimary: 'border-[var(--accent)] bg-[var(--accent)]',
    surfaceTint: 'bg-[var(--surface-soft)]/60',
  },
  organizations: {
    shellBg: 'bg-[var(--page-bg)]',
    heroBg: 'bg-[linear-gradient(135deg,_var(--hero-bg-from),_var(--hero-bg-to))]',
    accent: 'var(--accent)',
    accentSoft: 'var(--accent-soft)',
    accentHover: 'hover:border-[var(--accent)]',
    buttonPrimary: 'border-[var(--accent)] bg-[var(--accent)]',
    surfaceTint: 'bg-[var(--surface-soft)]/50',
  },
}

function SectionTheme({ variant = 'platform', children }) {
  const themeValues = useMemo(() => {
    switch (variant) {
      case 'individuals':
        return {
          '--page-bg': '#F5EFE6',
          '--surface': '#FFFFFF',
          '--panel': '#FFFFFF',
          '--accent': '#E2725B',
          '--accent-soft': 'rgba(226, 114, 91, 0.12)',
          '--surface-soft': '#F5EFE6',
          '--line': '#1B3A5C',
          '--ink': '#0F1B2D',
          '--muted': '#4B5563',
          '--hero-bg-from': '#1B3A5C',
          '--hero-bg-to': '#1B3A5C',
          '--bg-glow-1': 'rgba(226, 114, 91, 0.16)',
          '--bg-glow-2': 'rgba(226, 114, 91, 0.13)',
          '--bg-glow-3': 'rgba(15, 27, 45, 0.08)',
        }
      case 'organizations':
        return {
          '--page-bg': '#EBF1F5',
          '--surface': '#FFFFFF',
          '--panel': '#FFFFFF',
          '--accent': '#0FA88A',
          '--accent-soft': 'rgba(15, 168, 138, 0.12)',
          '--surface-soft': '#EBF1F5',
          '--line': '#1B3A5C',
          '--ink': '#0F1B2D',
          '--muted': '#4B5563',
          '--hero-bg-from': '#1B3A5C',
          '--hero-bg-to': '#1B3A5C',
          '--bg-glow-1': 'rgba(30, 127, 130, 0.08)',
          '--bg-glow-2': 'rgba(27, 58, 92, 0.06)',
          '--bg-glow-3': 'rgba(15, 27, 45, 0.04)',
        }
      case 'platform':
      default:
        return {
          '--page-bg': '#EBF1F5',
          '--surface': '#FFFFFF',
          '--panel': '#FFFFFF',
          '--accent': '#0FA88A',
          '--accent-soft': 'rgba(15, 168, 138, 0.12)',
          '--surface-soft': '#EBF1F5',
          '--line': '#1B3A5C',
          '--ink': '#0F1B2D',
          '--muted': '#4B5563',
          '--hero-bg-from': '#1B3A5C',
          '--hero-bg-to': '#1B3A5C',
          '--bg-glow-1': 'rgba(34, 180, 168, 0.16)',
          '--bg-glow-2': 'rgba(0, 87, 128, 0.13)',
          '--bg-glow-3': 'rgba(196, 114, 85, 0.12)',
        }
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
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const handleGlobalClick = (event) => {
      const target = event.target.closest('a, button, [role="button"]')
      if (target) {
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('click', handleGlobalClick, { passive: true })
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AppShell />
    </>
  )
}

function AppShell() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          {/* Main Site Header - Solid Dark Navy matching Wix exactly */}
          <header className="sticky top-0 z-40 bg-[var(--midnight-ink)] text-white border-b border-white/10 shadow-sm py-4 px-6 transition-all duration-200">
            <div className="mx-auto w-full max-w-[var(--shell-max)] flex items-center justify-between">
              {/* Brand Logo Link */}
              <Link to="/" className="font-sans text-xl font-bold tracking-tight text-white hover:opacity-90">
                CAS Experience
              </Link>

              {/* Desktop Nav - Static Underline active state, no float overlays */}
              <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6">
                {TOP_NAV.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:text-[var(--eleviq-teal)] py-1 ${isActive
                        ? 'text-white border-b-2 border-[var(--eleviq-teal)]'
                        : 'text-white/70'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-full border border-white/20 bg-white/5 text-white/80 hover:text-white focus:outline-none transition-all duration-200"
                  aria-label="Toggle navigation menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Mobile Menu Drawer */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-[var(--midnight-ink)] p-6 md:hidden flex flex-col gap-6 text-white animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">CAS Experience</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full border border-white/20 bg-white/5 text-white/75 hover:text-white"
                  aria-label="Close navigation menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-4 mt-6">
                {TOP_NAV.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-medium py-3 border-b border-white/5 transition-colors ${isActive ? 'text-[var(--eleviq-teal)]' : 'text-white/70 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}

          <main className="mx-auto flex w-full max-w-[var(--shell-max)] flex-col gap-[var(--section-gap)] px-6 py-6 pb-16 flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/platform/*" element={<PlatformSection />} />
              <Route path="/individuals/*" element={<IndividualsSection />} />
              <Route path="/organizations/*" element={<OrganizationsSection />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </SectionTheme>
  )
}

function SectionShell({ eyebrow, title, lead, actions = [], ribbon, children, extra }) {
  const theme = useSectionTheme()

  return (
    <ScrollReveal>
      <section className="space-y-[var(--section-gap)]">
        <div className={`rounded-[28px] border border-[var(--line)] p-[var(--panel-pad)] shadow-[var(--panel-shadow)] ${theme.surfaceTint} bg-[var(--surface)]/92`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">{eyebrow}</span>
                {ribbon ? <span className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ink)]" style={{ borderColor: theme.accent, backgroundColor: theme.accentSoft }}>{ribbon}</span> : null}
              </div>
              <h2 className="font-sans text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)] md:text-4xl">{title}</h2>
              {lead ? <p className="max-w-3xl text-base leading-[var(--reading-line)] text-[var(--muted)] md:text-lg">{lead}</p> : null}
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
  const theme = useSectionTheme()
  const base = 'inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] hover:shadow-md hover:brightness-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'

  if (action.to) {
    return (
      <Link to={action.to} className={`${base} text-white`} style={{ borderColor: theme.accent, backgroundColor: theme.accent }}>
        {action.label}
      </Link>
    )
  }

  return (
    <button type="button" onClick={action.onClick} className={`${base} bg-[var(--panel)] text-[var(--ink)]`} style={{ borderColor: theme.accent }}>
      {action.label}
    </button>
  )
}

function Card({ title, eyebrow, body, bullets = [], meta, action, variant, icon, bgWhite }) {
  const theme = useSectionTheme()

  const cardContent = (
    <article 
      className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--soft-shadow)] h-full flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--shadow-color)]/25"
      style={bgWhite ? {
        '--panel': '#FFFFFF',
        '--ink': '#0F1B2D',
        '--muted': '#4B5563',
      } : {}}
    >
      <div>
        {icon ? <div className="mb-3">{icon}</div> : null}
        {eyebrow ? <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p> : null}
        <h3 className="font-sans text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">{title}</h3>
        {body ? <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{body}</p> : null}
        {bullets.length ? (
          <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--muted)]">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: theme.accent }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {meta ? <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.26em] text-[var(--muted)]">{meta}</p> : null}
      </div>
      {action ? <div className="mt-5"><ActionButton action={action} /></div> : null}
    </article>
  )

  if (variant) {
    return <SectionTheme variant={variant}>{cardContent}</SectionTheme>
  }
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
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* Option A (Hybrid Slate Variant) Hero Section */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                HUMAN-CENTERED CAPABILITY INFRASTRUCTURE
              </span>
              <h1 className="max-w-2xl font-sans text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                One Platform for Capability, Alignment, and Action.
              </h1>
              <p className="text-base md:text-lg font-normal text-[#EBF1F5] leading-relaxed max-w-2xl font-sans opacity-90">
                The ElevIQ Capability Alignment System™ connects participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence in one human-centered infrastructure.
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Button 1: Horizon Teal Fill */}
                <Link
                  to="/platform"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:brightness-105"
                >
                  See How CAS Works
                </Link>

                {/* Button 2: Warm Coral Fill */}
                <Link
                  to="/organizations/pricing-demo"
                  className="rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:brightness-105"
                >
                  Request Demo
                </Link>

                {/* Button 3: Transparent Outline */}
                <Link
                  to="/platform/participant-portal"
                  className="rounded-full border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:bg-white/10 hover:border-white"
                >
                  Access Portal
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Inset Dashboard Mockup */}
            <div className="flex justify-center items-center p-2 lg:p-4">
              <div className="w-full max-w-[380px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    PRODUCT DEVELOPMENT PREVIEW
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/70 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                    LIVE ECOSYSTEM
                  </span>
                </div>

                <svg viewBox="0 0 340 210" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Header Bar */}
                  <rect x="10" y="10" width="320" height="24" rx="4" fill="#1B3A5C" opacity="0.8" />
                  <circle cx="25" cy="22" r="4" fill="#E2725B" />
                  <circle cx="40" cy="22" r="4" fill="#0FA88A" />
                  <circle cx="55" cy="22" r="4" fill="#FFFFFF" opacity="0.6" />
                  
                  {/* Left Panel: Alignment Matrix */}
                  <rect x="10" y="42" width="150" height="158" rx="6" fill="#1B3A5C" opacity="0.6" stroke="#0FA88A" strokeWidth="1" />
                  <text x="22" y="60" fill="#0FA88A" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">ALIGNMENT MATRIX</text>
                  
                  {/* Node Diagram */}
                  <circle cx="85" cy="115" r="28" fill="none" stroke="#0FA88A" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="85" cy="115" r="8" fill="#0FA88A" />
                  <circle cx="55" cy="85" r="6" fill="#E2725B" />
                  <circle cx="115" cy="85" r="6" fill="#FFFFFF" />
                  <circle cx="55" cy="145" r="6" fill="#FFFFFF" />
                  <circle cx="115" cy="145" r="6" fill="#E2725B" />
                  
                  <line x1="85" y1="115" x2="55" y2="85" stroke="#0FA88A" strokeWidth="1.5" />
                  <line x1="85" y1="115" x2="115" y2="85" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
                  <line x1="85" y1="115" x2="55" y2="145" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
                  <line x1="85" y1="115" x2="115" y2="145" stroke="#E2725B" strokeWidth="1.5" />

                  {/* Right Panel: Active Signals & Pathways */}
                  <rect x="170" y="42" width="160" height="74" rx="6" fill="#1B3A5C" opacity="0.6" stroke="#E2725B" strokeWidth="1" />
                  <text x="182" y="60" fill="#E2725B" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">CAPABILITY SIGNALS™</text>
                  <rect x="182" y="70" width="136" height="8" rx="4" fill="#E2725B" opacity="0.4" />
                  <rect x="182" y="70" width="95" height="8" rx="4" fill="#E2725B" />
                  <rect x="182" y="86" width="136" height="8" rx="4" fill="#0FA88A" opacity="0.4" />
                  <rect x="182" y="86" width="112" height="8" rx="4" fill="#0FA88A" />

                  <rect x="170" y="124" width="160" height="76" rx="6" fill="#1B3A5C" opacity="0.6" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
                  <text x="182" y="142" fill="#FFFFFF" opacity="0.9" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="bold">ALIGNMENT PATHWAYS™</text>
                  <rect x="182" y="152" width="136" height="16" rx="4" fill="#0FA88A" opacity="0.2" />
                  <text x="190" y="163" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif">Verified Ecosystem Fit</text>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Re-formatted Relationship Statement Section */}
      <section
        className="rounded-[28px] border border-[#d2dfdf] p-8 shadow-[var(--soft-shadow)]"
        style={{ backgroundColor: '#EAF3F3', color: '#0F1B2D' }}
      >
        <div className="grid gap-6 md:grid-cols-3">
          {/* Column 1 */}
          <div className="space-y-2">
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold opacity-90">
              Commercial Infrastructure
            </h4>
            <p className="text-sm leading-relaxed opacity-85 font-medium">
              STC Innovations develops, owns, configures, licenses, and commercializes the ElevIQ Capability Alignment System.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold opacity-90">
              Social Impact & Access
            </h4>
            <p className="text-sm leading-relaxed opacity-85 font-medium">
              ElevIQ Foundation applies CAS through mission-driven access, pilots, community partnerships, participant support, and rural workforce innovation.
            </p>
          </div>

          {/* Column 3 */}
          <div className="space-y-2">
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold opacity-90">
              Public Utility
            </h4>
            <p className="text-sm leading-relaxed opacity-85 font-medium">
              The ElevIQ Alignment Scan remains free for individual participants.
            </p>
          </div>
        </div>
      </section>

      {/* Audience Cards Grid */}
      <SectionGrid
        cards={[
          {
            icon: INDIVIDUALS_ICON,
            title: 'For Individuals',
            body: 'The ElevIQ Foundation addresses capability alignment through participant-centered support, Rural Workforce Innovation, and mission-driven community partnerships.',
            action: { label: 'For Individuals', to: '/individuals' },
            variant: 'individuals',
          },
          {
            icon: ORGANIZATIONS_ICON,
            title: 'For Organizations',
            body: 'STC Innovations helps organizations configure the ElevIQ Capability Alignment System to support participant pathways, advisor workflows, and organizational intelligence.',
            action: { label: 'For Organizations', to: '/organizations' },
            variant: 'organizations',
            bgWhite: true,
          },
          {
            icon: PLATFORM_ICON,
            title: 'See the Platform',
            body: 'The ElevIQ Capability Alignment System connects participant reflection, capability insight, advisor support, and pathway planning in one infrastructure.',
            action: { label: 'Platform (CAS)', to: '/platform' },
            variant: 'platform',
          },
        ]}
      />

      {/* Rebuilt Journey Progression Grid Timeline */}
      <section className="rounded-[32px] border border-[var(--line)] bg-white p-[var(--panel-pad)] shadow-[var(--soft-shadow)] space-y-8">
        <div className="space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">Progressive Alignment</span>
          <h3 className="font-sans text-2xl font-bold tracking-[-0.03em] text-[#0F1B2D]">
            The Capability Journey Timeline
          </h3>
        </div>

        {/* Spacious 3-column / 4-column layout */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Step 1 */}
          <div className="flex flex-col space-y-3 p-5 rounded-2xl bg-[var(--surface-soft)]/20 border border-[var(--line)]/40 hover:border-[#1E7F82]/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1E7F82] text-xs font-bold text-white shrink-0 font-sans">
                01
              </span>
              <span className="font-sans text-base font-bold text-[#0F1B2D]">
                Alignment Scan™
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              A free, intuitive reflection tool for individuals to safely capture their life context and specialized capabilities.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col space-y-3 p-5 rounded-2xl bg-[var(--surface-soft)]/20 border border-[var(--line)]/40 hover:border-[#1E7F82]/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1E7F82] text-xs font-bold text-white shrink-0 font-sans">
                02
              </span>
              <span className="font-sans text-base font-bold text-[#0F1B2D]">
                Capability Signals™
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              Real-time indicators that track dynamic, evolving strengths and verified action milestones instead of static resume bullet points.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col space-y-3 p-5 rounded-2xl bg-[var(--surface-soft)]/20 border border-[var(--line)]/40 hover:border-[#1E7F82]/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1E7F82] text-xs font-bold text-white shrink-0 font-sans">
                03
              </span>
              <span className="font-sans text-base font-bold text-[#0F1B2D]">
                Alignment Snapshot™
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              A clear, high-fidelity visual summary of a participant’s current capability landscape shared securely with trusted mentors.
            </p>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col space-y-3 p-5 rounded-2xl bg-[var(--surface-soft)]/20 border border-[var(--line)]/40 hover:border-[#1E7F82]/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1E7F82] text-xs font-bold text-white shrink-0 font-sans">
                04
              </span>
              <span className="font-sans text-base font-bold text-[#0F1B2D]">
                ElevIQ ARIA™
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              An interactive, human-centered reflection collaborator that helps participants draw out unmapped community contributions.
            </p>
          </div>

          {/* Step 5 */}
          <div className="flex flex-col space-y-3 p-5 rounded-2xl bg-[var(--surface-soft)]/20 border border-[var(--line)]/40 hover:border-[#1E7F82]/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1E7F82] text-xs font-bold text-white shrink-0 font-sans">
                05
              </span>
              <span className="font-sans text-base font-bold text-[#0F1B2D]">
                Alignment Pathways™
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              Dynamic, individualized roadmaps that map out practical training tracks and localized workforce opportunities.
            </p>
          </div>

          {/* Step 6 */}
          <div className="flex flex-col space-y-3 p-5 rounded-2xl bg-[var(--surface-soft)]/20 border border-[var(--line)]/40 hover:border-[#1E7F82]/30 transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1E7F82] text-xs font-bold text-white shrink-0 font-sans">
                06
              </span>
              <span className="font-sans text-base font-bold text-[#0F1B2D]">
                Support Connections
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              A collaborative connection hub linking participants directly with frontline advisors, coaches, and resources.
            </p>
          </div>

          {/* Step 7 */}
          <div className="flex flex-col space-y-3 p-5 rounded-2xl bg-[var(--surface-soft)]/20 border border-[var(--line)]/40 hover:border-[#1E7F82]/30 transition-all duration-300 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1E7F82] text-xs font-bold text-white shrink-0 font-sans">
                07
              </span>
              <span className="font-sans text-base font-bold text-[#0F1B2D]">
                The ElevIQ Last Mile™
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#6B7280] font-sans">
              The final deployment phase focused on sustainable onboarding, role alignment, and long-term community impact.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder - What People Are Saying */}
      <section className="grid gap-8 lg:grid-cols-2 items-start py-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)] md:text-5xl">
              What People Are Saying
            </h2>
            <span className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Pending Approval
            </span>
          </div>

          {/* Descriptive block card (not a quote layout) */}
          <div className="rounded-[28px] bg-[var(--horizon-teal)] p-8 text-white relative shadow-lg overflow-hidden flex flex-col justify-between min-h-[260px] transform hover:scale-[1.01] transition-transform duration-300">
            <div className="space-y-3 z-10 relative">
              <h3 className="font-sans text-xl font-bold tracking-tight">Participant Experience</h3>
              <p className="text-base leading-relaxed text-white/90">
                The platform centers participant reflection and context, organizing scenarios into practical next-step choices. Feedback is delivered in plain, human-readable language to build confidence without diagnostic framing.
              </p>
            </div>

            <div className="mt-8 flex items-end justify-between z-10 relative">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">Guided Flow Preview</p>

              {/* Slider navigation controls mock */}
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous page"
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next page"
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:pt-20 space-y-6 pl-2">
          <div className="space-y-4 relative pl-6 border-l-4 border-[var(--accent)]">
            <h3 className="font-sans text-xl font-semibold text-[var(--ink)]">Advisor & Support Guidance</h3>
            <p className="text-base leading-relaxed text-[var(--muted)]">
              Mentors and cohort leaders coordinate follow-through by reviewing shared, participant-approved insights. By removing predictive scoring models, teams stay focused on personal pacing, role alignment, and local program handoffs.
            </p>
          </div>
          <div className="pl-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Ecosystem Overview</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function PlatformShell() {
  const location = useLocation()

  return (
    <div className="space-y-[var(--section-gap)]">
      <SubNav tabs={PLATFORM_TABS} />
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
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                SYSTEM ARCHITECTURE OVERVIEW
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                The Architecture of Capability Alignment
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Moving beyond static resumes and rigid clinical assessments.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The ElevIQ Capability Alignment System (CAS) is human-centered infrastructure that connects personal reflection with real-world workforce paths. It creates a continuous, secure environment to translate non-linear life experience into verified Capability Signals™.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/platform/participant-portal"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Explore Platform Modules
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    PRODUCT DEVELOPMENT PREVIEW
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 220" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Connection lines */}
                  <line x1="160" y1="40" x2="80" y2="100" stroke="#0FA88A" strokeWidth="2" opacity="0.8" />
                  <line x1="160" y1="40" x2="240" y2="100" stroke="#0FA88A" strokeWidth="2" opacity="0.8" />
                  <line x1="80" y1="100" x2="120" y2="170" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
                  <line x1="240" y1="100" x2="200" y2="170" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
                  <line x1="120" y1="170" x2="200" y2="170" stroke="#0FA88A" strokeWidth="2" opacity="0.8" />
                  <line x1="160" y1="40" x2="160" y2="170" stroke="#0FA88A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

                  {/* Nodes */}
                  <circle cx="160" cy="40" r="8" fill="#0FA88A" />
                  <circle cx="80" cy="100" r="6" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="240" cy="100" r="6" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="120" cy="170" r="7" fill="#0FA88A" />
                  <circle cx="200" cy="170" r="7" fill="#0FA88A" />

                  {/* Labels */}
                  <text x="160" y="24" fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle">REFLECTION HUB</text>
                  <text x="80" y="118" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.8">SIGNALS</text>
                  <text x="240" y="118" fill="#FFFFFF" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.8">MAPPING</text>
                  <text x="160" y="195" fill="#0FA88A" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">ALIGNMENT PATHWAYS™</text>
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: MIDDLE GRID CARDS (Core Ecosystem Pillars) */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                01. INDIVIDUAL MODULE
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Reflect & Discover</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Engages participants through intuitive tools to capture non-linear experiences, practical contexts, and true capability without clinical testing pressure.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                02. ADVISOR MODULE
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Support & Guide</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Empowers mentors and workforce coaches with transparent, data-driven dashboards (ElevIQ CLARA™) to deliver targeted human assistance.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                03. ENTERPRISE MODULE
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Align & Act</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Provides community networks and regional corporate buyers with macro intelligence to match talent to real developmental tracks and open roles.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: BOTTOM EXPOSITION */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            System Safeguards & Oversight Principles
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Data Splitting Protocols
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Protects individual data sovereignty by separating raw reflection data from macro organizational intelligence.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Human Oversight First
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Outlaws black-box predictive indexing and automated scoring, ensuring trained coaches maintain meaningful review at every stage.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Agency
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Participants own their snapshot data permanently and maintain explicit control over profile sharing permissions across regional networks.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function ParticipantPortalPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                INDIVIDUAL HOME BASE
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                A Dedicated Space for Personal Agency
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Your secure workspace built around dignity, continuous discovery, and absolute privacy.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The Participant Portal gives you full sovereignty over how your capabilities are mapped, stored, and shared. There are no rigid tests, scores, or black-box algorithms here—just an intuitive ecosystem designed to highlight your true potential.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Access Participant Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    CONFIGURED SAMPLE ENVIRONMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#FFFFFF" opacity="0.9" />
                  <line x1="25" y1="35" x2="295" y2="35" stroke="#1B3A5C" strokeWidth="1.5" opacity="0.2" />
                  <circle cx="35" cy="24" r="4" fill="#0FA88A" />
                  <circle cx="48" cy="24" r="4" fill="#1B3A5C" opacity="0.3" />
                  <circle cx="61" cy="24" r="4" fill="#1B3A5C" opacity="0.3" />

                  <rect x="25" y="50" width="125" height="65" rx="6" fill="#F5EFE6" stroke="#1B3A5C" strokeWidth="1" opacity="0.4" />
                  <rect x="165" y="50" width="130" height="65" rx="6" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="1.5" />

                  <line x1="38" y1="70" x2="115" y2="70" stroke="#0F1B2D" strokeWidth="3" opacity="0.6" />
                  <line x1="38" y1="85" x2="130" y2="85" stroke="#0FA88A" strokeWidth="2" />

                  <line x1="178" y1="70" x2="265" y2="70" stroke="#0F1B2D" strokeWidth="3" />
                  <line x1="178" y1="85" x2="275" y2="85" stroke="#0FA88A" strokeWidth="2" />

                  <rect x="25" y="130" width="270" height="45" rx="6" fill="#1B3A5C" opacity="0.1" />
                  <line x1="38" y1="150" x2="240" y2="150" stroke="#0FA88A" strokeWidth="2.5" />
                  <circle cx="255" cy="150" r="5" fill="#0FA88A" />
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
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                PORTAL MODULE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Self-Guided Reflection</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Intuitive, stress-free workspaces where you can safely document your unique life contexts, specialized experiences, and vital community contributions at your own pace.
            </p>
          </div>

          {/* Module 2 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                PORTAL MODULE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Live Capability Mapping</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Watch your profile evolve in real time. Translate your qualitative life stories into visible, dynamic capability signals that showcase your active strengths to the world.
            </p>
          </div>

          {/* Module 3 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                PORTAL MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Advisor Connection Hub</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              A secure, transparent interface to co-create pathway plans, review collaborative goals, and communicate directly with your dedicated coaches and support networks.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: THE PARTICIPANT EXPERIENCE JOURNEY */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            A Dignified, Step-by-Step Experience
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Total Profile Sovereignty
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Participants maintain absolute control over their dynamic capability profiles. You decide exactly when your data is ready to be shared, which specific support networks or advisors can view your reflections, and you retain the ability to rescind access at any time.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Non-Linear Experience Capture
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Traditional systems reject non-traditional background paths. The CAS portal allows individuals to naturally document volunteer initiatives, caregiving responsibilities, independent projects, and informal community leadership—translating real-world capability into visible data.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Reflection Cycles
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Unlike static, high-stakes annual evaluations, your portal grows alongside you. Update your capabilities, log new milestones, and adjust your personalized pathway targets whenever you acquire fresh real-world experience.
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                SYSTEM INTEL & MACRO VIEW
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Community Intelligence Console™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Transform fragmented regional workforce data into clear, actionable ecosystem coordination.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The Community Intelligence Console provides regional orchestrators, institutional funders, and community networks with macro-level visibility into active local capabilities. Make precision funding and training decisions without relying on legacy systems or compromising individual participant privacy.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Request Console Access
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    PRODUCT DEVELOPMENT PREVIEW
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#0F1B2D" opacity="0.9" />
                  <line x1="20" y1="40" x2="300" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.1" />

                  {/* Left Chart Box */}
                  <rect x="25" y="55" width="125" height="60" rx="6" fill="#1B3A5C" opacity="0.6" stroke="#0FA88A" strokeWidth="1" />
                  <line x1="40" y1="100" x2="40" y2="70" stroke="#0FA88A" strokeWidth="8" strokeLinecap="round" />
                  <line x1="60" y1="100" x2="60" y2="80" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                  <line x1="80" y1="100" x2="80" y2="65" stroke="#0FA88A" strokeWidth="8" strokeLinecap="round" />
                  <line x1="100" y1="100" x2="100" y2="85" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
                  <line x1="120" y1="100" x2="120" y2="75" stroke="#0FA88A" strokeWidth="8" strokeLinecap="round" />

                  {/* Right Network Matrix */}
                  <rect x="170" y="55" width="125" height="60" rx="6" fill="#1B3A5C" opacity="0.6" stroke="#0FA88A" strokeWidth="1" />
                  <circle cx="195" cy="85" r="4" fill="#0FA88A" />
                  <circle cx="230" cy="70" r="4" fill="#FFFFFF" />
                  <circle cx="265" cy="85" r="4" fill="#0FA88A" />
                  <circle cx="230" cy="100" r="4" fill="#FFFFFF" />
                  <line x1="199" y1="83" x2="226" y2="72" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
                  <line x1="230" y1="74" x2="230" y2="96" stroke="#0FA88A" strokeWidth="1.5" />
                  <line x1="234" y1="72" x2="261" y2="83" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />

                  {/* Bottom Pulse Bar */}
                  <rect x="25" y="130" width="270" height="50" rx="6" fill="#1B3A5C" opacity="0.6" />
                  <path d="M 40 160 L 80 145 L 120 170 L 160 150 L 200 165 L 240 140 L 280 160" fill="none" stroke="#0FA88A" strokeWidth="2.5" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: CORE MACRO CAPABILITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                MACRO MODULE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Aggregate Insights</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Track broad capability trends across student blocks, training cohorts, or municipal initiatives. Understand collective strengths at scale without exposing private, individual identity details.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                MACRO MODULE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Resource Deployment</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Pinpoint exact systemic gaps in regional support structures. Deploy targeted development opportunities, local pathways, and mentor systems precisely where they are required most.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                MACRO MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Ecosystem Health</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Evaluate the live alignment between active local roles, open community pathways, and the actual talent base of your region to build a highly synchronized workforce.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: ENTERPRISE DATA GOVERNANCE */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Enterprise-Grade Regional Coordination
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Privacy-Preserving Architecture
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                The console operates entirely on aggregate capability metrics. It strips away personally identifiable tracking information to compile community patterns, ensuring your organization remains fully compliant with modern data protection standards while gaining rich regional insights.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Precision Labor-Market Mapping
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Move beyond standard regional vacancy data. CAS maps real-time emerging capability sets against specific municipal project needs and open training pathways, giving workforce coordinators an accurate radar for local investment.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Inter-Agency Synergy
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Break down regional communication silos. The console provides a unified, secure data layer that allows schools, non-profits, enterprise partners, and public services to view the same regional capability map and coordinate supportive handoffs seamlessly.
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
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                INTERACTIVE REFLECTION PARTNER
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                ElevIQ ARIA™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Human-centered guidance designed to elevate personal agency and deep reflection.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                ElevIQ ARIA™ acts as an interactive reflection collaborator within the participant framework. It works directly alongside individuals to help draw out unique life experiences, unmapped community contributions, and non-linear capabilities that traditional resumes and rigid testing models completely miss.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Experience ARIA Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    CONFIGURED SAMPLE ENVIRONMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <circle cx="160" cy="100" r="70" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.1" />
                  <circle cx="160" cy="100" r="45" fill="none" stroke="#0FA88A" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />

                  <line x1="90" y1="65" x2="160" y2="40" stroke="#0FA88A" strokeWidth="2" opacity="0.8" />
                  <line x1="160" y1="40" x2="230" y2="65" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
                  <line x1="230" y1="65" x2="230" y2="135" stroke="#0FA88A" strokeWidth="2" opacity="0.8" />
                  <line x1="230" y1="135" x2="160" y2="160" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />
                  <line x1="160" y1="160" x2="90" y2="135" stroke="#0FA88A" strokeWidth="2" opacity="0.8" />
                  <line x1="90" y1="135" x2="90" y2="65" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.4" />

                  <circle cx="90" cy="65" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="160" cy="40" r="6" fill="#0FA88A" />
                  <circle cx="230" cy="65" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="230" cy="135" r="6" fill="#0FA88A" />
                  <circle cx="160" cy="160" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="90" cy="135" r="6" fill="#0FA88A" />

                  <circle cx="160" cy="100" r="12" fill="#0FA88A" opacity="0.2" />
                  <circle cx="160" cy="100" r="6" fill="#0FA88A" />
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
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ARIA MODULE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Contextual Discovery</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Engages participants in thoughtful, open-ended dialogues to safely capture specialized skills, personal contexts, and real-world problems they have solved.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ARIA MODULE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Collaborative Structuring</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Helps translate deep personal reflection into organized, visible capability points that can be seamlessly shared with advisors and workforce mentors.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ARIA MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Agency Protection</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Operates purely as a supportive mirror for the user, ensuring the data generation process remains entirely driven by the participant's own voice.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: THE DEPTH & SHIFT EXPOSITION */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            How ARIA Reframes Personal Capability
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Qualitative Data Layer
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Instead of forcing users to fit into standardized multiple-choice slots, ARIA allows for unstructured, natural language inputs. It formats stories into professional, legible statements while preserving the user's authentic voice.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Uncovering Hidden Strengths
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Many vital workforce skills—like community organization, crisis management, or multilingual navigation—go undocumented. ARIA prompts participants intentionally to reveal these hidden talents.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero-Score Philosophy
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                ARIA never grades, scores, or passes judgment. By removing predictive testing logic, it creates a safe environment that encourages complete honesty and deep, unstressed self-discovery.
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                ADVISOR & COACH WORKSPACE
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                ElevIQ CLARA™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Empowering advisors and coaches with transparent, actionable context.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                ElevIQ CLARA™ is the dedicated workspace built specifically for frontline advisors, workforce coaches, and program administrators. Rather than hiding data behind black-box scoring systems or predictive automation, CLARA provides a clear, high-fidelity window into a participant's complete capability map and self-guided reflections.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Request CLARA Access
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    PRODUCT DEVELOPMENT PREVIEW
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#FFFFFF" opacity="0.95" />
                  <rect x="10" y="10" width="300" height="30" rx="10" fill="#0F1B2D" />
                  <circle cx="25" cy="25" r="4" fill="#0FA88A" />
                  <circle cx="38" cy="25" r="4" fill="#FFFFFF" opacity="0.5" />
                  <circle cx="51" cy="25" r="4" fill="#FFFFFF" opacity="0.5" />

                  <rect x="25" y="55" width="110" height="120" rx="6" fill="#1B3A5C" opacity="0.1" />
                  <circle cx="80" cy="85" r="14" fill="#0FA88A" opacity="0.2" />
                  <circle cx="80" cy="85" r="7" fill="#0FA88A" />

                  <rect x="150" y="55" width="145" height="120" rx="6" fill="#1B3A5C" opacity="0.1" />
                  <line x1="165" y1="75" x2="275" y2="75" stroke="#0F1B2D" strokeWidth="2" opacity="0.7" />
                  <line x1="165" y1="95" x2="250" y2="95" stroke="#0FA88A" strokeWidth="2" />
                  <line x1="165" y1="115" x2="280" y2="115" stroke="#0F1B2D" strokeWidth="1.5" opacity="0.5" />
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
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                CLARA MODULE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Deep-Dive Insights</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Review a participant's qualitative reflections, articulated goals, and situational contexts side-by-side to understand their true baseline.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                CLARA MODULE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Targeted Collaboration</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Co-create actionable development plans, leave supportive guidance notes, and track individual progress milestones inside a shared secure interface.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                CLARA MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Cohort Management</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Seamlessly organize student blocks, training groups, or pilot cohorts to ensure no participant slips through the cracks.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: THE DEPTH & SHIFT EXPOSITION */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Empowering Frontline Mentors
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Eliminating Blind Automation
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                CLARA rejects algorithmic sorting. It provides human advisors with raw, unaltered participant reflections, eliminating the bias introduced by traditional automated resume filters.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                High-Fidelity Interaction Records
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Every note, collaborative pathway milestone, and advisor observation is saved chronologically, providing a comprehensive audit trail of personal development and supportive actions.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Optimized Cohort Navigation
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Track macro milestone progress across your entire deployment group simultaneously, allowing program managers to step in with individual care the moment momentum stalls.
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                DYNAMIC SKILL TRACKING
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Capability Signals™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                A dynamic, real-time alternative to flat resumes and static credentials.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Capabilities aren't static boxes to check—they are active, evolving behaviors. Capability Signals™ capture real-time indicators of an individual's strengths, emerging skills, and practical problem-solving capacities as they engage with training pathways and community projects.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Explore Signals Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    CONFIGURED SAMPLE ENVIRONMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#0F1B2D" opacity="0.9" />
                  <path d="M 30 100 Q 70 40 110 100 T 190 100 T 270 100" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
                  <path d="M 30 100 Q 70 55 110 100 T 190 100 T 270 100" fill="none" stroke="#0FA88A" strokeWidth="2.5" />
                  <circle cx="110" cy="100" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="190" cy="100" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="70" cy="60" r="4" fill="#0FA88A" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SIGNAL TYPE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Reflective Signals</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Captured directly from the participant's continuous self-assessments, contextual milestones, and self-guided workspace inputs.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SIGNAL TYPE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Verified Action</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Validated indicators generated through active milestone completions, peer support roles, and verified community-level project work.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SIGNAL TYPE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Advisor Observations</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Qualitative validation inputs from trusted program coaches, capturing soft skills, leadership traits, and accountability indicators.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Why Dynamic Signals Matter
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Capturing Hidden Growth
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Traditional systems miss skills gained during non-linear lifepaths. Signals track behavioral milestones, giving visibility to continuous personal progress.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Real-Time Skill Validation
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Eliminates outdated annual check-ins. Signals adapt dynamically as the participant works, ensuring profile validity.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Test-Stress Framework
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                No multiple-choice tests or clinical scores. Signals gather data organically from real actions, protecting participant dignity.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function AlignmentSnapshotPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                HIGH-FIDELITY PROFILE VIEWER
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Alignment Snapshot™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                A comprehensive, high-fidelity visual summary of a participant’s dynamic capability landscape.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The Alignment Snapshot™ brings together qualitative reflections, advisor notes, and dynamic capability signals into a single, clean visual dashboard. It allows trusted mentors and regional partners to see a participant's complete strengths immediately without reducing them to a single metric.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  View Sample Snapshot
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    CONFIGURED SAMPLE ENVIRONMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="10" y="10" width="300" height="180" rx="10" fill="#FFFFFF" opacity="0.9" />
                  <rect x="25" y="30" width="125" height="60" rx="6" fill="#1B3A5C" opacity="0.2" />
                  <rect x="170" y="30" width="125" height="60" rx="6" fill="#1B3A5C" opacity="0.2" />
                  <rect x="25" y="105" width="270" height="70" rx="6" fill="#1B3A5C" opacity="0.15" />
                  <circle cx="45" cy="60" r="8" fill="#0FA88A" />
                  <line x1="65" y1="60" x2="130" y2="60" stroke="#1B3A5C" strokeWidth="2.5" />
                  <line x1="45" y1="140" x2="275" y2="140" stroke="#0FA88A" strokeWidth="2.5" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SNAPSHOT FEATURE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Qualitative Overlay</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Displays the participant's authentic voice, personal goals, and self-guided reflections right at the top of the interface.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SNAPSHOT FEATURE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Signal Aggregation</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Maps verified action indicators and dynamic capability tracking patterns onto an easy-to-read layout framework.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SNAPSHOT FEATURE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Advisor Verification Space</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              A dedicated component housing qualitative coaching validation notes, milestone updates, and collaborative goals.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            A Human-Centered Vision Document
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Context Over Scoring
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Replaces unfair predictive algorithms with complete personal context, honoring individual agency.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Secure Share Controls
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Built with strict data privacy rules. Participants control when, how, and with whom their active profile view is shared.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Actionable Guidance Foundation
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Serves as a perfect launching pad for advisors to co-create tailored development tracks and career planning models.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

function AlignmentPathwaysPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                DYNAMIC TRAJECTORY PLANNING
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Alignment Pathways™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Individualized, dynamic roadmaps connecting capability insight to practical workforce tracks.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Traditional mapping systems force users onto rigid, linear paths. Alignment Pathways™ leverage real-time capability insights to suggest adaptive, flexible routes through educational blocks, specialized training modules, and regional community pilots.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Explore Pathways
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    CONFIGURED SAMPLE ENVIRONMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <path d="M 30 150 C 100 150, 100 50, 170 50 S 240 150, 300 150" fill="none" stroke="#0FA88A" strokeWidth="2.5" />
                  <circle cx="30" cy="150" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="170" cy="50" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="300" cy="150" r="5" fill="#FFFFFF" stroke="#0FA88A" strokeWidth="2" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                PATHWAY FEATURE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Adaptive Route Adjustments</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Pathways automatically update and suggest new steps as participants log fresh capability signals or adjust personal goals.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                PATHWAY FEATURE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Hyper-Local Integration</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Directly connects pathway roadmaps with active localized municipal initiatives, training centers, and regional partners.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                PATHWAY FEATURE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Milestone Tracking</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Breaks broad, overwhelming long-term milestones down into manageable, self-paced progress steps to maintain growth momentum.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Unlocking Non-Linear Growth
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Recommending, Never Dictating
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                The system values participant choices. It acts as an advisory roadmap, leaving final career/learning agency completely with the user.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Modular Skill Assembly
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Focuses on stackable, practical blocks. Participants gather micro-milestones across different sectors to build custom strengths.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor View Inclusion
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Pathway maps link directly to the coach interface, allowing mentors to review, discuss, and refine milestones during touchpoints.
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                HUMAN-CENTERED ECOSYSTEM FIT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Role Alignment
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Bridging the gap between individual capabilities and modern organizational requirements.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Role Alignment inside CAS steps completely away from automated resume keyword parsing and cold compatibility scoring. Instead, it creates a transparent context ecosystem where organizations can cleanly express the actual capability requirements of a position, and participants can seamlessly align their mapped strengths against them.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Request Role Alignment Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    PRODUCT DEVELOPMENT PREVIEW
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="25" y="40" width="100" height="110" rx="8" fill="#1B3A5C" opacity="0.6" stroke="#0FA88A" strokeWidth="1" />
                  <rect x="195" y="40" width="100" height="110" rx="8" fill="#1B3A5C" opacity="0.6" stroke="#0FA88A" strokeWidth="1" />
                  <line x1="125" y1="70" x2="195" y2="70" stroke="#0FA88A" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="125" y1="110" x2="195" y2="110" stroke="#0FA88A" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="125" cy="70" r="3" fill="#0FA88A" />
                  <circle cx="195" cy="70" r="3" fill="#0FA88A" />
                  <circle cx="125" cy="110" r="3" fill="#0FA88A" />
                  <circle cx="195" cy="110" r="3" fill="#0FA88A" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ROLE MODULE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Capability Requirement Outlining</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Allows regional partner organizations to define active roles by required behavioral strengths and context needs rather than strict credentials.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ROLE MODULE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Mutual Context View</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Provides a clean, collaborative view where a participant's snapshot and an organization's role framework can be evaluated side-by-side transparently.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ROLE MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Growth Focus Mapping</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Highlights areas for onboarding preparation, identifying exactly which training pathways can support a participant's long-term integration into the role.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Moving Past Binary Selection
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Scrubbing Algorithmic Rejection
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Rejects automated screening filters. The alignment framework ensures individual context is always honored, creating room for overlooked talent.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Targeted Onboarding Insight
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Identifies development focuses early, allowing companies to tailor proactive workspace support from the very first day.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Ecosystem Balance
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                ACTIONABLE SKILL GROWTH
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Development Opportunities
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Connecting capability alignment maps with personalized growth ecosystems.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Discovering current capabilities is only the first step. The Development Opportunities module seamlessly bridges the gap between where a participant stands today and where they want to grow, highlighting actionable pathways, local coursework, and targeted mentorship programs.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Explore Opportunities
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    PRODUCT DEVELOPMENT PREVIEW
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="40" y="130" width="45" height="40" rx="4" fill="#0FA88A" opacity="0.5" />
                  <rect x="100" y="100" width="45" height="70" rx="4" fill="#FFFFFF" opacity="0.3" />
                  <rect x="160" y="70" width="45" height="100" rx="4" fill="#0FA88A" />
                  <rect x="220" y="40" width="45" height="130" rx="4" fill="#FFFFFF" opacity="0.8" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                GROWTH MODULE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Targeted Training Integration</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Directly maps specific educational blocks and technical skills workshops onto the user's active capability timeline.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                GROWTH MODULE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Ecosystem Project Sync</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Connects participants with localized community initiatives, regional pilots, and real-world micro-assignments to build stackable strengths.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                GROWTH MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Adaptive Skill Recommendations</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Dynamically flags relevant upskilling modules based on the participant's self-guided reflections and evolving goals.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Proactive Personal Advancements
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Purpose-Driven Learning
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Replaces generic curriculum tracks with highly targeted growth suggestions tailored to the participant's actual trajectory.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Optimization
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                As new skills are verified, the development module automatically updates, offering fresh, specialized paths.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor Collaboration Support
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Allows mentors to directly tag, suggest, and track growth opportunities alongside the individual in real time.
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                HUMAN-CENTERED GUIDE HUBS
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Support Connections
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Linking participants directly with trusted frontline networks and regional advisors.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                No one achieves alignment in isolation. The Support Connections space is the collaborative nerve center of the platform, bringing together frontline mentors, workforce coaches, and community support systems into a single transparent interface.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Access Connections Hub
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    PRODUCT DEVELOPMENT PREVIEW
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <circle cx="160" cy="100" r="15" fill="#0FA88A" opacity="0.3" />
                  <circle cx="160" cy="100" r="6" fill="#0FA88A" />
                  <circle cx="80" cy="60" r="5" fill="#FFFFFF" />
                  <circle cx="240" cy="60" r="5" fill="#FFFFFF" />
                  <circle cx="80" cy="140" r="5" fill="#FFFFFF" />
                  <circle cx="240" cy="140" r="5" fill="#FFFFFF" />
                  <line x1="160" y1="100" x2="80" y2="60" stroke="#0FA88A" strokeWidth="2" />
                  <line x1="160" y1="100" x2="240" y2="60" stroke="#0FA88A" strokeWidth="2" />
                  <line x1="160" y1="100" x2="80" y2="140" stroke="#0FA88A" strokeWidth="2" />
                  <line x1="160" y1="100" x2="240" y2="140" stroke="#0FA88A" strokeWidth="2" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SUPPORT MODULE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Direct Mentorship Windows</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              A secure communication link connecting participants to regional coaches for high-fidelity guidance touchpoints.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SUPPORT MODULE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Resource Network Mapping</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Provides a clean directory of localized community support services, childcare networks, and transport assistance tools.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                SUPPORT MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Shared Progress Workspaces</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Allows users and advisors to co-sign collaborative goals, build roadmap targets, and update progress timelines transparently.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Ecosystem Care Coordination
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Eliminating Siloed Guidance
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Creates a unified collaborative layer so all approved support agencies can check progress milestones concurrently.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dignified Interaction History
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Saves collaborative goals chronologically, moving far away from rigid, clinical case-management logs.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Participant Sovereignty Hub
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                The user remains completely in charge of who belongs in their mentor network, controlling access permissions directly.
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                BEYOND STALE BACKGROUNDS
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Experience & Context
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Honoring the complete human journey by capturing unmapped life contexts.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Standard platforms only look at official employment titles, completely ignoring the rich skills developed outside traditional structures. The Experience & Context layer allows individuals to capture non-linear life pathways, proving that real capability exists far beyond formal resumes.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Capture Context
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    CONFIGURED SAMPLE ENVIRONMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <rect x="25" y="30" width="110" height="60" rx="8" fill="#1B3A5C" opacity="0.3" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="175" y="30" width="110" height="60" rx="8" fill="#0FA88A" opacity="0.3" stroke="#0FA88A" strokeWidth="1.5" />
                  <rect x="25" y="110" width="260" height="60" rx="8" fill="#1B3A5C" opacity="0.3" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                CONTEXT FEATURE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Non-Linear Path Tracking</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Provides natural workspaces to easily document volunteer leadership, family caregiving, community organization, and independent problem-solving.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                CONTEXT FEATURE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Situational Reality Mapping</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Captures structural realities and regional environments so advisors fully understand a participant's baseline context.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                CONTEXT FEATURE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Qualitative Nuance Gathering</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Uses self-guided textual prompts to draw out deep, authentic personal stories rather than sterile chronological boxes.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Redefining Talent Baselines
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Validating Hidden Assets
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Translates everyday problem-solving and lived experiences into dynamic, actionable capability metrics.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Removing Outdated Credentials
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Focuses entirely on what an individual can actually do, bypassing the rigid bias of traditional background scanning.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Fostering True Representation
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                LONG-TERM TRAJECTORY HEURISTICS
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Life Vector™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Mapping the direction and long-term momentum of personal growth frameworks.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Growth is a direction, not a destination. The Life Vector™ module visualizes the active momentum of a participant's collective learning curves, milestone accomplishments, and evolving pathways, helping long-term planning remain perfectly aligned with personal agency.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  View Life Vector Demo
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    CONFIGURED SAMPLE ENVIRONMENT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                </div>
                <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <line x1="30" y1="170" x2="290" y2="170" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
                  <line x1="30" y1="30" x2="30" y2="170" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
                  <path d="M 30 170 Q 120 140 180 80 T 290 30" fill="none" stroke="#0FA88A" strokeWidth="3" />
                  <circle cx="290" cy="30" r="6" fill="#0FA88A" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THREE CORE MODULES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                VECTOR FEATURE 01
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Active Momentum Analysis</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Aggregates continuous capability signals to visually trace the trajectory of an individual's emerging strengths over time.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                VECTOR FEATURE 02
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Long-Range Goal Orientation</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Maps macro-level personal aspirations onto localized workforce infrastructure, showing multiple viable growth avenues.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                VECTOR FEATURE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Dynamic Future Adaptations</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Automatically shifts trajectory options as the user gathers new capabilities, avoiding rigid professional lock-ins.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION GRID */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Continuous Trajectory Tracking
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Focusing on Flow, Not Scores
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Completely wipes away static ranking systems, evaluating growth strictly as continuous individual movement.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Visualizing Possibilities
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Gives individuals an inspiring, high-fidelity window into diverse sectors where their strengths can naturally cross-align.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Strategic Support Insights
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Helps community networks anticipate future ecosystem training and funding allocations based on macro timeline directions.
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
    'ElevIQ Capability Alignment System™ / CAS',
    'Participant Portal',
    'Community Intelligence Console™',
    'ElevIQ Alignment Scan™',
    'Capability Signals™',
    'Alignment Snapshot™',
    'ElevIQ ARIA™',
    'ElevIQ CLARA™',
    'Alignment Pathways™',
    'Support Connections',
    'Role Alignment',
    'Alignment Indicator',
    'Role Benchmark',
    'Development Opportunities',
    'Experience & Context',
    'Life Vector™',
    'The ElevIQ Last Mile™'
  ]

  return (
    <footer className="mt-auto bg-[var(--midnight-ink)] text-white/95 border-t border-[var(--line)]/10 pt-16 pb-12 transition-all duration-300">
      <div className="mx-auto w-full max-w-[var(--shell-max)] px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-white/10">

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-sans text-xl font-semibold tracking-[-0.03em] text-white">
              CAS Experience
            </h3>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--eleviq-teal)]">
              ElevIQ Capability Alignment System™
            </p>
            <p className="max-w-sm text-sm leading-7 text-white/60">
              Connecting participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence in one human-centered infrastructure.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">Platform (CAS)</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/platform" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  Platform Overview
                </Link>
              </li>
              <li>
                <Link to="/platform/participant-portal" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  Participant Portal
                </Link>
              </li>
              <li>
                <Link to="/platform/community-intelligence-console" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  Community Console
                </Link>
              </li>
              <li>
                <Link to="/platform/eleviq-aria" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  ElevIQ ARIA™
                </Link>
              </li>
              <li>
                <Link to="/platform/eleviq-clara" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  ElevIQ CLARA™
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">For Individuals</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/individuals" className="text-white/60 hover:text-[var(--warm-coral)] transition-all duration-200">
                  Individuals Home
                </Link>
              </li>
              <li>
                <Link to="/individuals/how-it-works" className="text-white/60 hover:text-[var(--warm-coral)] transition-all duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/individuals/who-we-serve" className="text-white/60 hover:text-[var(--warm-coral)] transition-all duration-200">
                  Who We Serve
                </Link>
              </li>
              <li>
                <Link to="/individuals/job-corps" className="text-white/60 hover:text-[var(--warm-coral)] transition-all duration-200">
                  Job Corps
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">Company & Nav</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/organizations" className="text-white/60 hover:text-[var(--horizon-teal)] transition-all duration-200">
                  Organizations Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  Contact / Demo
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-white/60 hover:text-[var(--eleviq-teal)] transition-all duration-200">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/40">
            <p>© 2026 ElevIQ / STC Innovations. All rights reserved.</p>
            <p className="font-mono uppercase tracking-widest text-[var(--eleviq-teal)] text-[10px]">Capability Alignment Infrastructure</p>
          </div>

          <div className="space-y-2.5">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">Trademark Lock Terminology</p>
            <div className="flex flex-wrap gap-2">
              {trademarkList.map((item) => (
                <span key={item} className="rounded-md border border-white/20 bg-white/[0.07] px-2 py-0.5 font-mono text-[9px] text-white/70 tracking-wider">
                  {item}
                </span>
              ))}
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
          <Route path="how-it-works" element={<IndividualsHowItWorks />} />
          <Route path="who-we-serve" element={<IndividualsWhoWeServe />} />
          <Route path="job-corps" element={<IndividualsJobCorps />} />
          <Route path="partners-pilots" element={<IndividualsPartnersPilots />} />
          <Route path="support-the-mission" element={<IndividualsSupportMission />} />
          <Route path="trust-governance" element={<IndividualsTrustGovernance />} />
        </Routes>
      </div>
    </SectionTheme>
  )
}

function IndividualsHome() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
                A PLATFORM BUILT FOR YOUR JOURNEY
              </span>
              <h2 className="max-w-xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Your Capabilities Are More Than a Resume
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                A dignified, private workspace to discover, verify, and own your professional strengths.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-xl font-sans">
                Standard job applications limit you to employment dates and generic titles, ignoring the rich skills you have built through real-world life experience. The Capability Alignment System gives you a self-paced, secure environment to turn your unique personal stories into verified strengths, completely free from the stress of clinical testing.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/individuals/how-it-works"
                  className="rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Explore Your Path
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/30"
                >
                  Request Information
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#E2725B]/40 transition-all duration-300">
                <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Grid lines */}
                  <line x1="20" y1="40" x2="300" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="80" x2="300" y2="80" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="120" x2="300" y2="120" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="160" x2="300" y2="160" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="200" x2="300" y2="200" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  
                  <line x1="60" y1="20" x2="60" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="120" y1="20" x2="120" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="180" y1="20" x2="180" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="240" y1="20" x2="240" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />

                  {/* Rising trajectory wave path */}
                  <path d="M 40 180 Q 100 160 140 110 T 280 60" fill="none" stroke="#E2725B" strokeWidth="3" />
                  <path d="M 40 180 Q 100 160 140 110 T 280 60" fill="none" stroke="#E2725B" strokeWidth="8" opacity="0.15" />

                  {/* Coordinate nodes */}
                  <circle cx="40" cy="180" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="100" cy="153" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="157" cy="98" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="218" cy="80" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="280" cy="60" r="6" fill="#E2725B" />
                </svg>
                {/* Sub-card decorative glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THE THREE SYSTEM GATEWAYS */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-[#0F1B2D]">01. Log & Reflect</span>
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                YOUR EXPERIENCES
              </span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Document your specialized life paths, family caregiving milestones, volunteer leadership, and independent problem-solving using intuitive, non-linear text logs.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-[#0F1B2D]">02. Format & Verify</span>
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                YOUR STRENGTHS
              </span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Watch your qualitative personal entries translate seamlessly into professional Capability Signals™ that highlight your verified real-world execution capacity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-[#0F1B2D]">03. Share & Align</span>
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                YOUR OPPORTUNITIES
              </span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Securely link your profile with regional upskilling coursework, community coaching groups, or corporate role matches whenever you decide the timing is right.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: INDIVIDUAL RIGHTS EXPOSITION */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Our Structural Core Commitments to You
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Absolute Profile Sovereignty
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                You maintain absolute master ownership of your capability map. No automated algorithms can rank you, no employers can view your drafts, and you can revoke access permissions instantly.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Assessment Stress
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                There are no automated screening countdowns, confusing personality quizzes, or high-pressure tests. Data accumulates entirely through your own self-driven, verified lifestyle milestones.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Permanent Lifelong Portability
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Your workspace portal belongs to you permanently. Even after successfully matching into a local role, your portal links remain active so you can log ongoing career momentum.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

const InteractiveTimeline = () => {
  return (
    <svg className="w-full h-full min-h-[300px] md:min-h-[400px]" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gradients */}
      <defs>
        <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background glow lines */}
      <motion.path
        d="M 50 150 C 150 50, 250 250, 450 100"
        stroke="url(#tealGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M 50 250 C 180 350, 320 150, 450 300"
        stroke="url(#tealGrad)"
        strokeWidth="2"
        strokeDasharray="6,6"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M 50 200 C 150 200, 300 200, 450 200"
        stroke="url(#tealGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.6 }}
      />

      {/* Interactive Floating Nodes */}
      <g>
        <motion.circle
          cx="100"
          cy="115"
          r="16"
          fill="var(--accent)"
          fillOpacity="0.15"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <circle cx="100" cy="115" r="7" fill="var(--accent)" />
        <motion.circle
          cx="100"
          cy="115"
          r="4"
          fill="#FFFFFF"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <text x="100" y="90" fill="#FFFFFF" fontSize="11" fontFamily="Epilogue" fontWeight="600" textAnchor="middle" opacity="0.8">01. Reflect</text>
      </g>

      <g>
        <motion.circle
          cx="220"
          cy="200"
          r="20"
          fill="var(--accent)"
          fillOpacity="0.1"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        />
        <circle cx="220" cy="200" r="8" fill="var(--accent)" />
        <motion.circle
          cx="220"
          cy="200"
          r="4"
          fill="#FFFFFF"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        />
        <text x="220" y="175" fill="#FFFFFF" fontSize="11" fontFamily="Epilogue" fontWeight="600" textAnchor="middle" opacity="0.8">03. Signals™</text>
      </g>

      <g>
        <motion.circle
          cx="340"
          cy="225"
          r="18"
          fill="var(--accent)"
          fillOpacity="0.12"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 2 }}
        />
        <circle cx="340" cy="225" r="7" fill="var(--accent)" />
        <motion.circle
          cx="340"
          cy="225"
          r="4"
          fill="#FFFFFF"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 1 }}
        />
        <text x="340" y="252" fill="#FFFFFF" fontSize="11" fontFamily="Epilogue" fontWeight="600" textAnchor="middle" opacity="0.8">06. Pathways™</text>
      </g>

      <g>
        <motion.circle
          cx="420"
          cy="120"
          r="24"
          fill="var(--accent)"
          fillOpacity="0.2"
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }}
        />
        <circle cx="420" cy="120" r="9" fill="var(--accent)" />
        <motion.circle
          cx="420"
          cy="120"
          r="5"
          fill="#FFFFFF"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 1.5 }}
        />
        <text x="420" y="95" fill="#FFFFFF" fontSize="11" fontFamily="Epilogue" fontWeight="600" textAnchor="middle" opacity="0.8">08. Align</text>
      </g>

      <motion.line
        x1="100" y1="115" x2="220" y2="200"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="4,4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
      />
      <motion.line
        x1="220" y1="200" x2="340" y2="225"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="4,4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
      />
      <motion.line
        x1="340" y1="225" x2="420" y2="120"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="4,4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      />
    </svg>
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-8 md:p-12 shadow-xl overflow-hidden text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-white text-center">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
              PARTICIPANT GUIDANCE FLOW
            </span>
            <h1 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
              How the Alignment Scan Works
            </h1>
            <p className="text-lg font-medium text-white/90 leading-relaxed max-w-2xl">
              A simple, dignified 4-step process connecting your real-world experience to verified next steps.
            </p>
            <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
              There are no rigid exams, scores, or diagnostic labels. You remain in complete control of your reflection journey at every phase.
            </p>
            <div className="pt-2">
              <Link
                to="/platform/participant-portal"
                className="rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-2"
              >
                Start Your Free Scan →
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
                className="bg-white rounded-[28px] p-8 border border-[#1B3A5C] shadow-md hover:border-[#E2725B] transition-all duration-300"
              >
                <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  <div className={`space-y-5 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E2725B] text-sm font-bold text-white font-mono shadow-sm">
                        {step.num}
                      </span>
                      <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-[#0F1B2D] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                      {step.desc}
                    </p>
                    <ul className="space-y-2 text-xs font-sans text-[#4B5563]">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E2725B] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`flex justify-center items-center p-4 bg-[var(--surface-soft)]/40 rounded-2xl border border-[var(--line)]/20 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="w-full max-w-[320px] bg-[#0F1B2D] border border-white/10 rounded-xl p-6 shadow-lg text-white space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#E2725B]">STEP {step.num} FLOW</span>
                        <span className="w-2 h-2 rounded-full bg-[#E2725B] animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-white/20 rounded w-3/4" />
                        <div className="h-2 bg-[#E2725B] rounded w-1/2" />
                      </div>
                      <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-white/60">
                        <span>FREE ACCESS</span>
                        <span className="text-[#E2725B]">ACTIVE</span>
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
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Participant Guarantees
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Always Free to Individuals
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                You will never be asked to pay to build, maintain, or share your capability snapshots.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Ranking or Judgement
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                The platform never compares you to others or generates algorithmic pass/fail test scores.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Absolute Data Sovereignty
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
  const cards = [
    { badge: '01. YOUTH & STUDENTS', title: 'Vocational & High School Youth', desc: 'Students transitioning into trade programs or early workforce tracks seeking to turn hands-on skills into visible capability profiles.' },
    { badge: '02. JOB CORPS COHORTS', title: 'Job Corps Participants', desc: 'Young adults developing specialized trades credentials and looking for direct employer pathway alignment.' },
    { badge: '03. RURAL TALENT', title: 'Rural Workforce Members', desc: 'Overlooked talent in non-metropolitan areas whose specialized informal experiences are missed by traditional job boards.' },
    { badge: '04. ADULT LEARNERS', title: 'Career Pivoters & Adult Learners', desc: 'Individuals building new skill sets through community college certificates or independent apprenticeships.' },
    { badge: '05. COMMUNITY LEADERS', title: 'Volunteer & Civic Organizers', desc: 'Grassroots leaders who manage neighborhood initiatives, caregiving, and community projects without formal job titles.' },
    { badge: '06. MILITARY VETERANS', title: 'Veterans & Service Leavers', desc: 'Service members translating complex tactical and logistical experiences into civilian capability signals.' },
    { badge: '07. RE-ENTRY TALENT', title: 'Justice-Involved Individuals', desc: 'Participants building fresh pathways by documenting personal growth, accountability, and trade certifications.' },
    { badge: '08. FRONTLINE WORKERS', title: 'Essential Service Personnel', desc: 'Hospitality, retail, and care workers demonstrating problem-solving capabilities under real-world pressure.' },
    { badge: '09. DISPLACED WORKERS', title: 'Industry Transitioners', desc: 'Workers navigating economic shifts by identifying transferrable skills across adjacent regional sectors.' }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: COMPACT HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[28px] border border-[#1B3A5C] bg-[#1B3A5C] p-6 md:p-8 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
                PARTICIPANT SPECTRUM & REACH
              </span>
              <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl leading-tight">
                Who We Serve
              </h1>
              <p className="text-sm leading-relaxed text-white/80 font-sans max-w-2xl">
                The ElevIQ Capability Alignment System (CAS) is designed specifically for overlooked talent, non-traditional job seekers, and community builders.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/platform/participant-portal"
                className="rounded-full border border-[#E2725B] bg-[#E2725B] px-5 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-1.5"
              >
                Access Free Scan →
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
              className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                {card.badge}
              </span>
              <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                {card.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                {card.desc}
              </p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Inclusion & Dignity Standards
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Background Exclusion
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Every individual has valuable capabilities regardless of formal degree status or non-linear career gaps.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Diagnostic Framing
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                We never apply psychological testing, clinical labels, or automated deficit scoring to participants.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Universal Free Access
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
  const steps = [
    {
      num: '01',
      title: 'Student & Youth Cohort Onboarding',
      desc: 'Job Corps participants enter a clean, supportive digital workspace designed specifically to capture vocational training milestones, hands-on trades experience, and teamwork skills.',
      bullets: ['Vocational trade skill documentation', 'Youth-friendly reflection prompts', 'Cohort leader support integration'],
      badge: 'YOUTH INTAKE'
    },
    {
      num: '02',
      title: 'Hands-On Milestone Verification',
      desc: 'Instructors and student leads co-create verified action points for completed shop work, safety certifications, and collaborative projects, replacing flat resume bullets with dynamic evidence.',
      bullets: ['Trade certification tracking', 'Instructor-verified milestones', 'Practical problem-solving proof'],
      badge: 'MILESTONE PROOF'
    },
    {
      num: '03',
      title: 'Transition & Last Mile Placement',
      desc: 'As students prepare to graduate, their capability snapshot bridges the gap between campus training and local employer apprenticeship programs via The ElevIQ Last Mile™.',
      bullets: ['Employer pathway matching', 'Apprenticeship handoff coordination', 'Long-term career retention tracking'],
      badge: 'CAREER HANDOFF'
    }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: CENTERED HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-8 md:p-12 shadow-xl overflow-hidden text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-white text-center">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
              YOUTH & WORKFORCE INITIATIVE
            </span>
            <h1 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Job Corps & Youth Pathways
            </h1>
            <p className="text-lg font-medium text-white/90 leading-relaxed max-w-2xl">
              Empowering vocational students and Job Corps cohorts with human-centered capability tracking.
            </p>
            <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
              CAS bridges technical training and real-world employer placement by turning hands-on trade skills into verified capability signals.
            </p>
            <div className="pt-2">
              <Link
                to="/platform/participant-portal"
                className="rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-2"
              >
                Explore Youth Portal →
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
                className="bg-white rounded-[28px] p-8 border border-[#1B3A5C] shadow-md hover:border-[#E2725B] transition-all duration-300"
              >
                <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  <div className={`space-y-5 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E2725B] text-sm font-bold text-white font-mono shadow-sm">
                        {step.num}
                      </span>
                      <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-[#0F1B2D] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                      {step.desc}
                    </p>
                    <ul className="space-y-2 text-xs font-sans text-[#4B5563]">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E2725B] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`flex justify-center items-center p-4 bg-[var(--surface-soft)]/40 rounded-2xl border border-[var(--line)]/20 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="w-full max-w-[320px] bg-[#0F1B2D] border border-white/10 rounded-xl p-6 shadow-lg text-white space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#E2725B]">YOUTH PATHWAY {step.num}</span>
                        <span className="w-2 h-2 rounded-full bg-[#E2725B] animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-white/20 rounded w-3/4" />
                        <div className="h-2 bg-[#E2725B] rounded w-1/2" />
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
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Job Corps Program Values
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Honoring Trade Excellence
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Hands-on technical mastery is highlighted with equal weight alongside academic credentials.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Seamless Transition Handoff
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Connects campus trade graduates directly to verified regional employer buyer pipelines.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor-Supported Growth
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Cohort leads and career counselors work side-by-side with students throughout their transition.
              </p>
            </div>
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
        <section className="rounded-[28px] border border-[#1B3A5C] bg-[#1B3A5C] p-6 md:p-8 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
                COMMUNITY ECOSYSTEM & PILOTS
              </span>
              <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl leading-tight">
                Partners & Pilot Networks
              </h1>
              <p className="text-sm leading-relaxed text-white/80 font-sans max-w-2xl">
                ElevIQ Foundation collaborates with civic organizations, workforce boards, and educational partners to expand access.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/contact"
                className="rounded-full border border-[#E2725B] bg-[#E2725B] px-5 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-1.5"
              >
                Inquire for Pilot Scope →
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
              className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                {card.badge}
              </span>
              <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                {card.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                {card.desc}
              </p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Pilot Principles & Oversight
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Collaborative Design
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Pilots are co-designed alongside community leaders to respect local cultural and economic realities.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Transparent Impact Metrics
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Evaluation focuses on participant retention, capability growth, and human coaching satisfaction.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Sustainable Scaling
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
                MISSION-DRIVEN ACCESS & ADVOCACY
              </span>
              <h1 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Support the Mission
              </h1>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                ElevIQ Foundation delivers mission-driven access, community pilots, and participant support.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Help us expand access to free capability tools for youth, adult learners, and rural workforce members across regional networks.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Get Involved Today →
                </Link>
              </div>
            </div>

            {/* Right Column: Embedded Role Selector Card */}
            <div className="p-2">
              <div className="bg-[#0F1B2D]/80 border border-white/15 rounded-2xl p-6 shadow-2xl text-white space-y-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E2725B] block font-bold">
                  SELECT HOW YOU CAN SUPPORT
                </span>
                
                {/* Role Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('funder')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-mono text-center transition-all ${selectedRole === 'funder' ? 'bg-[#E2725B] text-white font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    Funder / Donor
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('partner')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-mono text-center transition-all ${selectedRole === 'partner' ? 'bg-[#E2725B] text-white font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    Partner Org
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('advocate')}
                    className={`px-2 py-2 rounded-xl text-[11px] font-mono text-center transition-all ${selectedRole === 'advocate' ? 'bg-[#E2725B] text-white font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    Advocate
                  </button>
                </div>

                {/* Role Detail Box */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] font-bold text-[#E2725B] uppercase tracking-wider">{currentRole.tag}</span>
                    <span className="w-2 h-2 rounded-full bg-[#E2725B] animate-pulse" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">{currentRole.title}</h4>
                  <p className="text-xs leading-relaxed text-white/80 font-sans">{currentRole.desc}</p>
                </div>

                <Link
                  to="/contact"
                  className="w-full rounded-xl border border-[#E2725B] bg-[#E2725B] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-md"
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
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ALLIANCE 01: COMMUNITY PILOTS
              </span>
              <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">
                Rural & Youth Pilot Grants
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Fund localized capability alignment software access for Job Corps cohorts, agricultural youth, and rural non-profit partners.
              </p>
            </div>
            <div className="pt-3 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#E2725B] bg-[#E2725B] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-sm"
              >
                Sponsor a Pilot →
              </Link>
            </div>
          </div>

          {/* Option 02 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border-2 border-[#E2725B] flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300 relative shadow-xl">
            <div className="space-y-4 pt-2">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ALLIANCE 02: PARTICIPANT ACCESS
              </span>
              <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">
                Free Scan Endowment
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Ensure the ElevIQ Alignment Scan™ remains 100% free for individual participants permanently across all regional districts.
              </p>
            </div>
            <div className="pt-3 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#E2725B] bg-[#E2725B] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-md"
              >
                Support Free Access →
              </Link>
            </div>
          </div>

          {/* Option 03 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                ALLIANCE 03: ADVISOR ENABLEMENT
              </span>
              <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">
                Coach & Advisor Training
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Underwrite training and enablement programs for frontline community mentors learning to deliver plain-language capability guidance.
              </p>
            </div>
            <div className="pt-3 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#E2725B] bg-[#E2725B] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-sm"
              >
                Enable Local Advisors →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Foundation Governance Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                100% Mission Alignment
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                All philanthropic support goes directly toward expanding free participant tools and rural workforce access.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Deficit Labelling
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                We never frame participants as disadvantaged or deficient, evaluating strengths strictly through authentic capability language.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Community Accountability
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[28px] border border-[#1B3A5C] bg-[#1B3A5C] p-6 md:p-8 shadow-xl overflow-hidden">
          <div className="space-y-3 max-w-3xl text-white">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
              SECURITY & TRUST GOVERNANCE
            </span>
            <h1 className="font-sans text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
              Trust, Agency & Data Governance
            </h1>
            <p className="text-sm leading-relaxed text-white/80 font-sans max-w-2xl">
              Building human-centered infrastructure requires uncompromised data sovereignty, strict privacy controls, and zero diagnostic pressure.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 4-COLUMN GOVERNANCE METRIC GRID */}
      <ScrollReveal>
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-4 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <span className="font-mono text-3xl font-bold text-[#E2725B] tracking-tight block">
                  {metric.value}
                </span>
                <h3 className="font-sans text-base font-bold text-[#0F1B2D]">
                  {metric.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                  {metric.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-[#EBF1F5]">
                <span className="text-[10px] font-mono font-semibold text-[#E2725B] uppercase tracking-wider">
                  Guaranteed Standard
                </span>
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Participant Governance Guarantees
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Data Monetization
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                We never sell, rent, or commercialize individual participant data or reflection entries to third-party advertisers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Transparent Permission Logs
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Every view request and sharing authorization is logged transparently inside your private participant dashboard.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Permanent Data Portability
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                ENTERPRISE DEPLOYMENT & ALIGNMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Align Local Talent Through Verified Capabilities
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Shift your operational hiring from static keyword filtering to high-fidelity, private capability metrics.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Traditional resume screeners leave massive talent pools completely unmapped, reducing diverse backgrounds to arbitrary metrics. The Capability Alignment System allows regional employers and corporate buyers to format roles around required behavioral baseline executions, unlocking highly capable hidden talent pipelines with total compliance and zero privacy friction.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/organizations/pricing-demo"
                  className="rounded-full bg-[#0FA88A] border border-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Request a Configured Demo
                </Link>
                <Link
                  to="/organizations/implementation"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/30"
                >
                  Schedule implementation discovery
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[380px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
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
                  <line x1="280" y1="120" x2="300" y2="220" stroke="rgba(15,168,138,0.3)" strokeWidth="2" />
                  <line x1="300" y1="220" x2="220" y2="280" stroke="rgba(15,168,138,0.5)" strokeWidth="2.5" />
                  <line x1="220" y1="280" x2="100" y2="240" stroke="rgba(15,168,138,0.4)" strokeWidth="2" />
                  <line x1="100" y1="240" x2="120" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                  {/* Inner connection lines */}
                  <line x1="200" y1="70" x2="200" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <line x1="120" y1="100" x2="200" y2="180" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                  <line x1="280" y1="120" x2="200" y2="180" stroke="rgba(15,168,138,0.4)" strokeWidth="2" />
                  <line x1="100" y1="240" x2="200" y2="180" stroke="rgba(15,168,138,0.4)" strokeWidth="2" />
                  <line x1="220" y1="280" x2="200" y2="180" stroke="rgba(15,168,138,0.6)" strokeWidth="2.5" />
                  <line x1="300" y1="220" x2="200" y2="180" stroke="rgba(15,168,138,0.5)" strokeWidth="2" />

                  {/* Additional outer nodes connections for complexity */}
                  <line x1="120" y1="100" x2="60" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="100" y1="240" x2="50" y2="280" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="220" y1="280" x2="240" y2="350" stroke="rgba(15,168,138,0.3)" strokeWidth="1.5" />
                  <line x1="300" y1="220" x2="350" y2="260" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="280" y1="120" x2="340" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                  {/* Connection Glow Overlays */}
                  <line x1="220" y1="280" x2="200" y2="180" stroke="#0FA88A" strokeWidth="4" opacity="0.15" />
                  <line x1="300" y1="220" x2="220" y2="280" stroke="#0FA88A" strokeWidth="4" opacity="0.15" />

                  {/* Standard Nodes (White/Grey) */}
                  <circle cx="120" cy="100" r="5" fill="#1B3A5C" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="200" cy="70" r="5" fill="#1B3A5C" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="280" cy="120" r="5" fill="#1B3A5C" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="60" cy="120" r="3.5" fill="#1B3A5C" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="50" cy="280" r="3.5" fill="#1B3A5C" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="350" cy="260" r="3.5" fill="#1B3A5C" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <circle cx="340" cy="80" r="3.5" fill="#1B3A5C" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />

                  {/* Horizon Teal (#0FA88A) tracking nodes with animated scaling/glow */}
                  <g className="animate-pulse">
                    <circle cx="200" cy="180" r="12" fill="#0FA88A" fillOpacity="0.15" />
                    <circle cx="220" cy="280" r="14" fill="#0FA88A" fillOpacity="0.15" />
                    <circle cx="300" cy="220" r="10" fill="#0FA88A" fillOpacity="0.15" />
                  </g>

                  <circle cx="200" cy="180" r="6" fill="#0FA88A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="220" cy="280" r="7.5" fill="#0FA88A" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx="300" cy="220" r="5.5" fill="#0FA88A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="100" cy="240" r="5.5" fill="#0FA88A" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="240" cy="350" r="4.5" fill="#0FA88A" stroke="#FFFFFF" strokeWidth="1.5" />

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
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm font-bold text-[#0F1B2D] tracking-wide">
                  01. Benchmark Positions
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                  ROLE SPECIFICATIONS
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                Define your local team positions based on required day-one operational capability parameters, moving entirely away from restrictive and arbitrary college degree proxies.
              </p>
            </div>
            <div className="pt-2 border-t border-[#1B3A5C]/10">
              <span className="text-xs font-semibold text-[#0FA88A] inline-flex items-center gap-1 group-hover:text-[#0F1B2D] transition-colors">
                Configure parameters 
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm font-bold text-[#0F1B2D] tracking-wide">
                  02. Access Macro Insights
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                  ECOSYSTEM TRACKING
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                Monitor high-level regional talent trajectories, capability density maps, and upskilling alignment curves across your target municipal geographic clusters.
              </p>
            </div>
            <div className="pt-2 border-t border-[#1B3A5C]/10">
              <span className="text-xs font-semibold text-[#0FA88A] inline-flex items-center gap-1 group-hover:text-[#0F1B2D] transition-colors">
                View alignment curves
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-sm font-bold text-[#0F1B2D] tracking-wide">
                  03. Engage Pilot Pipelines
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                  TARGETED INTEGRATION
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                Securely accept dynamic snapshot profiles from verified workforce programs, community cohorts, and local pilots without intrusive data collection friction.
              </p>
            </div>
            <div className="pt-2 border-t border-[#1B3A5C]/10">
              <span className="text-xs font-semibold text-[#0FA88A] inline-flex items-center gap-1 group-hover:text-[#0F1B2D] transition-colors">
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
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Our Structural Commitments to Systemic Stability
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Strict Anonymized Macro Tracking
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Organizations review aggregate regional talent data trends. Individual participant deep logs are protected by strict data-splitting protocols, ensuring zero security or privacy compliance risk.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                De-Biased Ingestion Architecture
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Our layout outlaws traditional automated ranking filters, predictive black-box indices, and talent scoring systems. Alignment is based entirely on verified lifestyle and project milestones.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Infrastructure Calibration Focus
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
  const cards = [
    { badge: '01. WORKFORCE BOARDS', title: 'Workforce Board Infrastructure', desc: 'Macro capability analytics and cross-sector pipeline visibility for regional workforce investment boards.' },
    { badge: '02. EDUCATIONAL HUBS', title: 'Community College Solutions', desc: 'Trade skill tracking and student alignment dashboards connecting coursework to regional employer tracks.' },
    { badge: '03. CORPORATE BUYERS', title: 'Skills-First Hiring Portals', desc: 'Direct access to verified candidate capability snapshots without relying on automated resume screening.' },
    { badge: '04. ADVISOR WORKSPACES', title: 'ElevIQ CLARA™ Advisor Dashboards', desc: 'Dedicated workspaces for frontline coaches to deliver human guidance and co-create milestone roadmaps.' },
    { badge: '05. COMMUNITY CONSOLES', title: 'Community Intelligence Console™', desc: 'Aggregated macro data layer isolating raw reflection entries while surfacing regional talent trends.' },
    { badge: '06. ROLE BENCHMARKING', title: 'Human-Centered Role Alignment', desc: 'Translates corporate job requirements into qualitative capability criteria rather than rigid credential lists.' },
    { badge: '07. ONBOARDING TRACKS', title: 'The ElevIQ Last Mile™', desc: 'Structured post-hire onboarding support and retention tracking to ensure long-term role alignment.' },
    { badge: '08. CIVIC COALITIONS', title: 'Municipal Talent Alliances', desc: 'Unifies city-wide non-profits, training centers, and employers under a single capability framework.' },
    { badge: '09. ENTERPRISE SECURITY', title: 'Sovereign Data Splitting', desc: 'Enterprise privacy architecture ensuring complete separation between participant reflections and buyer views.' }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: COMPACT HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[28px] border border-[#1B3A5C] bg-[#1B3A5C] p-6 md:p-8 shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                ORGANIZATIONAL CAPABILITY SOLUTIONS
              </span>
              <h1 className="font-sans text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl leading-tight">
                Enterprise & Institutional Solutions
              </h1>
              <p className="text-sm leading-relaxed text-white/80 font-sans max-w-2xl">
                STC Innovations licenses and configures the ElevIQ Capability Alignment System (CAS) for institutions and employers.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                to="/organizations/pricing-demo"
                className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-5 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-1.5"
              >
                Schedule Solution Demo →
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
              className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                {card.badge}
              </span>
              <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                {card.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                {card.desc}
              </p>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Institutional Solution Architecture
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Black-Box Algorithms
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Outlaws automated candidate rejection models, ensuring human review remains active at every stage.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Enterprise Privacy First
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Raw participant reflections are isolated from corporate views through strict data-splitting protocols.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Proven Regional Impact
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-8 md:p-12 shadow-xl overflow-hidden text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-white text-center">
            <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
              ENTERPRISE DEPLOYMENT ROADMAP
            </span>
            <h1 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Structured Implementation & Onboarding
            </h1>
            <p className="text-lg font-medium text-white/90 leading-relaxed max-w-2xl">
              A clear 4-phase deployment methodology designed for workforce boards, educational institutions, and regional employers.
            </p>
            <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
              Deploying the ElevIQ Capability Alignment System (CAS) ensures seamless technical integration, complete data sovereignty, and immediate advisor readiness.
            </p>
            <div className="pt-2">
              <Link
                to="/organizations/pricing-demo"
                className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-2"
              >
                Request Implementation Scope →
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
                className="bg-white rounded-[28px] p-8 border border-[#1B3A5C] shadow-md hover:border-[#0FA88A] transition-all duration-300"
              >
                <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  <div className={`space-y-5 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0FA88A] text-sm font-bold text-white font-mono shadow-sm">
                        {step.num}
                      </span>
                      <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-[#0F1B2D] tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                      {step.desc}
                    </p>
                    <ul className="space-y-2 text-xs font-sans text-[#4B5563]">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`flex justify-center items-center p-4 bg-[var(--surface-soft)]/40 rounded-2xl border border-[var(--line)]/20 ${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="w-full max-w-[320px] bg-[#0F1B2D] border border-white/10 rounded-xl p-6 shadow-lg text-white space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#0FA88A]">DEPLOYMENT STEP {step.num}</span>
                        <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-white/20 rounded w-3/4" />
                        <div className="h-2 bg-[#0FA88A] rounded w-1/2" />
                      </div>
                      <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-white/60">
                        <span>STAGE: {step.badge}</span>
                        <span className="text-[#0FA88A]">READY</span>
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
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Implementation Commitments
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dedicated Technical Lead
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Every enterprise deployment receives a dedicated implementation engineer to manage data schema alignment and security protocols.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Rapid Advisor Readiness
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Intuitive advisor interfaces allow workforce coaches and cohort leaders to become fully proficient within hours, not weeks.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                No Interrupted Access
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                TRANSPARENT LICENSING & INTAKE
              </span>
              <h1 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Pricing, Pilots & Demo Inquiry
              </h1>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Transparent utility allocation designed for regional workforce boards, institutions, and employers.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Select your organization type on the right to view custom deployment options and initiate a formal intake consultation.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Direct Inquiry Form →
                </Link>
              </div>
            </div>

            {/* Right Column: Embedded Role Selector Card */}
            <div className="p-2">
              <div className="bg-[#0F1B2D]/80 border border-white/15 rounded-2xl p-6 shadow-2xl text-white space-y-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#0FA88A] block font-bold">
                  SELECT YOUR ROLE / INQUIRY TYPE
                </span>
                
                {/* Role Tabs */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('advocate')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'advocate' ? 'bg-[#0FA88A] text-white font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    Participant / Advocate
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('school')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'school' ? 'bg-[#0FA88A] text-white font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    School / Vocational
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('employer')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'employer' ? 'bg-[#0FA88A] text-white font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    Employer / Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('funder')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${selectedRole === 'funder' ? 'bg-[#0FA88A] text-white font-bold' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    Funder / Board
                  </button>
                </div>

                {/* Role Detail Box */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] font-bold text-[#0FA88A] uppercase tracking-wider">{currentRole.tag}</span>
                    <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">{currentRole.title}</h4>
                  <p className="text-xs leading-relaxed text-white/80 font-sans">{currentRole.desc}</p>
                </div>

                <Link
                  to="/contact"
                  className="w-full rounded-xl border border-[#0FA88A] bg-[#0FA88A] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-md"
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
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                OPTION 01: REGIONAL PILOT
              </span>
              <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">
                Localized Pilot Cluster
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Configured for initial Job Corps cohorts, municipal pilots, or neighborhood non-profits testing baseline capability matching.
              </p>
              <ul className="space-y-2 text-xs font-sans text-[#4B5563]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>Up to 250 active participant profiles</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>ElevIQ CLARA™ advisor workspace included</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>Always free for individual participants</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#0FA88A] bg-[#0FA88A] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-sm"
              >
                Inquire for Pilot Scope →
              </Link>
            </div>
          </div>

          {/* Option 02 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border-2 border-[#0FA88A] flex flex-col justify-between space-y-6 hover:-translate-y-1 transition-all duration-300 relative shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0FA88A] text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm">
              MOST REQUESTED
            </div>
            <div className="space-y-4 pt-2">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                OPTION 02: ECOSYSTEM DEPLOYMENT
              </span>
              <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">
                Metropolitan Pipeline Network
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Built for regional workforce investment boards and civic coalitions unifying cross-sector talent pipelines across a metro zone.
              </p>
              <ul className="space-y-2 text-xs font-sans text-[#4B5563]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>Community Intelligence Console™ macro analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>Full data-splitting security protocols</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>Dedicated implementation technical lead</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#0FA88A] bg-[#0FA88A] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-md"
              >
                Schedule Ecosystem Demo →
              </Link>
            </div>
          </div>

          {/* Option 03 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                OPTION 03: ENTERPRISE BUYER
              </span>
              <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">
                Corporate Buyer Integration
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Tailored for large corporate buyers requiring skills-first hiring portals, custom role benchmarks, and multi-zone analytics.
              </p>
              <ul className="space-y-2 text-xs font-sans text-[#4B5563]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>Custom role alignment benchmarking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>The ElevIQ Last Mile™ onboarding support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A]" />
                  <span>Multi-zone enterprise compliance dashboard</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#0FA88A] bg-[#0FA88A] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 text-center block shadow-sm"
              >
                Request Enterprise Consultation →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Licensing & Fiscal Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Infrastructure-Based Pricing
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Pricing is calculated strictly based on software configuration scope and support depth, never per-seat candidate tax.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Always Free to Job Seekers
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Participants, students, and community members never pay any fees to access or share their alignment snapshots.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Direct Intake Protocol
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
    { value: 'SOC2', title: 'Data Isolation Protocols', desc: 'Strict data-splitting architecture separates raw participant reflection entries from macro organizational analytics.' },
    { value: '0%', title: 'Black-Box AI Rejection', desc: 'Outlaws automated candidate scoring and algorithmic rejection models to protect institutional integrity.' },
    { value: '100%', title: 'Human Oversight First', desc: 'Trained workforce coaches and cohort leaders validate milestone data through transparent interfaces.' },
    { value: 'FERPA+', title: 'Institutional Compliance', desc: 'Configured to meet strict educational, municipal, and institutional privacy standards across regional networks.' }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: MINIMALIST HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[28px] border border-[#1B3A5C] bg-[#1B3A5C] p-6 md:p-8 shadow-xl overflow-hidden">
          <div className="space-y-3 max-w-3xl text-white">
            <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
              ENTERPRISE SECURITY & GOVERNANCE
            </span>
            <h1 className="font-sans text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight">
              Enterprise Security & Data Sovereignty
            </h1>
            <p className="text-sm leading-relaxed text-white/80 font-sans max-w-2xl">
              Deploying the ElevIQ Capability Alignment System (CAS) with uncompromised enterprise security, SOC2-grade data splitting, and compliance guarantees.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: 4-COLUMN GOVERNANCE METRIC GRID */}
      <ScrollReveal>
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-3">
                <span className="font-mono text-3xl font-bold text-[#0FA88A] tracking-tight block">
                  {metric.value}
                </span>
                <h3 className="font-sans text-base font-bold text-[#0F1B2D]">
                  {metric.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                  {metric.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-[#EBF1F5]">
                <span className="text-[10px] font-mono font-semibold text-[#0FA88A] uppercase tracking-wider">
                  Enterprise Compliance
                </span>
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Institutional Privacy Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Sovereign Data Splitting
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Raw participant context stays strictly in the user's private workspace; only explicitly approved snapshots are shared with enterprise buyers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Role-Based Permission Logs
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Granular access controls ensure advisors and hiring leads view only the specific data layers necessary for current coaching or placement.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Auditable Governance Compliance
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-white/10 bg-[#0F1B2D] p-[var(--panel-pad)] shadow-[var(--panel-shadow)] overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                KNOWLEDGE BASE & DOCUMENTATION
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                System Resources & Publications
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Architectural documentation, pilot frameworks, and ecosystem insights.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Explore our evolving library of product briefs, implementation roadmaps, and alignment research. As the ElevIQ Capability Alignment System™ (CAS) expands across municipal pilots, our resource center provides verified documentation to support enterprise buyers, workforce boards, and community partners.
              </p>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#1B3A5C] border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/30 transition-all duration-300">
                {/* SVG sequential resources graphic */}
                <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Grid background */}
                  <defs>
                    <pattern id="resources-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.03" />
                    </pattern>
                  </defs>
                  <rect width="320" height="240" fill="url(#resources-grid)" fillOpacity="0.5" />

                  {/* Folder Stack Interface */}
                  <path d="M 40 160 H 280 V 210 H 40 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

                  {/* Document 1 Icon */}
                  <g transform="translate(60, 50)">
                    <rect x="0" y="0" width="55" height="75" rx="4" fill="#1B3A5C" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    <path d="M 40 0 L 55 15 L 40 15 Z" fill="#0FA88A" opacity="0.8" />
                    <line x1="8" y1="28" x2="35" y2="28" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <line x1="8" y1="40" x2="47" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <line x1="8" y1="52" x2="47" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  </g>

                  {/* Document 2 Icon (Active / Highlighted) */}
                  <g transform="translate(130, 35)">
                    <rect x="0" y="0" width="60" height="85" rx="4" fill="#1B3A5C" stroke="#0FA88A" strokeWidth="2" />
                    <path d="M 42 0 L 60 18 L 42 18 Z" fill="#0FA88A" />
                    <line x1="10" y1="32" x2="40" y2="32" stroke="#FFFFFF" strokeWidth="2" />
                    <line x1="10" y1="46" x2="50" y2="46" stroke="#0FA88A" strokeWidth="1.5" />
                    <line x1="10" y1="58" x2="50" y2="58" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <line x1="10" y1="70" x2="35" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                    <circle cx="50" cy="32" r="3" fill="#0FA88A" />
                  </g>

                  {/* Document 3 Icon */}
                  <g transform="translate(205, 50)">
                    <rect x="0" y="0" width="55" height="75" rx="4" fill="#1B3A5C" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    <path d="M 40 0 L 55 15 L 40 15 Z" fill="rgba(255,255,255,0.2)" />
                    <line x1="8" y1="28" x2="35" y2="28" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <line x1="8" y1="40" x2="47" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <line x1="8" y1="52" x2="47" y2="52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  </g>

                  {/* Front Desk / Stand Line */}
                  <line x1="30" y1="160" x2="290" y2="160" stroke="#0FA88A" strokeWidth="2" />
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
          <div className="bg-[#1B3A5C] rounded-[20px] p-6 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#0FA88A]/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  01. CAS Architectural Brief
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm shrink-0">
                  STATUS: IN DEVELOPMENT
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/70 font-sans">
                An overview of the core Capability Alignment System™ infrastructure, data-splitting protocols, and privacy safeguards.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5">
              <Link to="/contact" className="text-xs font-semibold text-[#0FA88A] hover:text-white inline-flex items-center gap-1 transition-colors">
                Preview Summary →
              </Link>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-[#1B3A5C] rounded-[20px] p-6 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#0FA88A]/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  02. Regional Pilot Frameworks
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm shrink-0">
                  STATUS: PRODUCT DEVELOPMENT PREVIEW
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/70 font-sans">
                Deployment guidelines for municipal workforce boards and institutional corporate buyers establishing local capability clusters.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5">
              <Link to="/contact" className="text-xs font-semibold text-[#0FA88A] hover:text-white inline-flex items-center gap-1 transition-colors">
                Request Documentation →
              </Link>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-[#1B3A5C] rounded-[20px] p-6 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#0FA88A]/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  03. Role Benchmarking Guide
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm shrink-0">
                  STATUS: ROADMAP
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/70 font-sans">
                A practical walkthrough for HR teams formatting operational roles around baseline capabilities rather than degree proxies.
              </p>
            </div>
            <div className="pt-2 border-t border-white/5">
              <Link to="/contact" className="text-xs font-semibold text-[#0FA88A] hover:text-white inline-flex items-center gap-1 transition-colors">
                Inquire for Early Access →
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: UPDATES & NOTIFICATION */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[var(--panel-shadow)]">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Access & Publication Policy
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Verified Publications Only
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                In compliance with system governance, resource materials are published only after formal review and verification.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Inquiries & Direct Access
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Need immediate documentation for an active pilot evaluation? Contact our implementation team directly to request technical briefs.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Continuous Knowledge Updates
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-white/10 bg-[#0F1B2D] p-[var(--panel-pad)] shadow-[var(--panel-shadow)] overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                THE ELEVIQ ECOSYSTEM & GOVERNANCE
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Human-Centered Capability Infrastructure
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Connecting insight to action across participants, advisors, and regional organizations.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                STC Innovations develops, owns, configures, licenses, and commercializes the ElevIQ Capability Alignment System™. ElevIQ Foundation applies CAS through mission-driven access, pilots, community partnerships, participant support, and rural workforce innovation. The ElevIQ Alignment Scan™ remains permanently free for individual participants.
              </p>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#1B3A5C] border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/30 transition-all duration-300">
                {/* SVG sequential interconnected graphic */}
                <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  {/* Grid background */}
                  <defs>
                    <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.03" />
                    </pattern>
                  </defs>
                  <rect width="320" height="240" fill="url(#about-grid)" fillOpacity="0.5" />

                  {/* Connecting Links */}
                  <line x1="90" y1="80" x2="230" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <line x1="90" y1="80" x2="230" y2="80" stroke="#0FA88A" strokeWidth="2" strokeDasharray="6 6" />

                  <line x1="90" y1="80" x2="160" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <line x1="90" y1="80" x2="160" y2="170" stroke="#0FA88A" strokeWidth="2" strokeDasharray="6 6" />

                  <line x1="230" y1="80" x2="160" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <line x1="230" y1="80" x2="160" y2="170" stroke="#0FA88A" strokeWidth="2" strokeDasharray="6 6" />

                  {/* Entity Node 1: Foundation */}
                  <circle cx="90" cy="80" r="28" fill="#1B3A5C" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <circle cx="90" cy="80" r="24" fill="none" stroke="#0FA88A" strokeWidth="1" opacity="0.4" />
                  <text x="90" y="83" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-sans)">FOUNDATION</text>

                  {/* Entity Node 2: STC */}
                  <circle cx="230" cy="80" r="28" fill="#1B3A5C" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                  <circle cx="230" cy="80" r="24" fill="none" stroke="#0FA88A" strokeWidth="1" opacity="0.4" />
                  <text x="230" y="83" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-sans)">STC INNOV</text>

                  {/* Entity Node 3: CAS */}
                  <circle cx="160" cy="170" r="32" fill="#1B3A5C" stroke="#0FA88A" strokeWidth="2" />
                  <circle cx="160" cy="170" r="38" fill="none" stroke="#0FA88A" strokeWidth="1.5" className="animate-pulse" />
                  <text x="160" y="173" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="var(--font-sans)">CAS CORE</text>
                </svg>

                {/* Sub-card decorative glass reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: THE THREE ECOSYSTEM ENTITIES */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 01 */}
          <div className="bg-[#1B3A5C] rounded-[20px] p-6 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#0FA88A]/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  01. ElevIQ Foundation
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm shrink-0">
                  NONPROFIT MISSION ARM
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/70 font-sans">
                The nonprofit entity focused on overlooked talent, rural opportunity, schools, Job Corps, workforce partners, funders, community partnerships, and mission-aligned participant access.
              </p>
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-[#1B3A5C] rounded-[20px] p-6 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#0FA88A]/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  02. STC Innovations
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm shrink-0">
                  TECHNOLOGY & COMMERCIAL ENTITY
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/70 font-sans">
                The technology and product company that owns, develops, configures, licenses, white-labels, and commercializes ElevIQ Capability Alignment System™ intellectual property.
              </p>
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-[#1B3A5C] rounded-[20px] p-6 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#0FA88A]/40 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <span className="font-mono text-sm font-bold text-white tracking-wide">
                  03. ElevIQ CAS
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm shrink-0">
                  PRODUCT INFRASTRUCTURE
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/70 font-sans">
                The core product infrastructure that connects participant scenario reflection, capability insights, advisor support, pathway planning, and organizational intelligence into a single platform.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: SYSTEMIC PURPOSE & PRINCIPLES */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-white/10 rounded-[32px] p-8 md:p-12 shadow-[var(--panel-shadow)]">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Our Structural Operating Principles
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Guiding Reflection, Not Clinical Testing
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                CAS is not a test that tells someone what they must become. It is capability-alignment infrastructure built to support human guidance and practical next steps.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Absolute Participant Data Sovereignty
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Individual records are owned strictly by the participant. Data splitting protocols ensure organizations only view aggregate, anonymized regional metrics.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dignified Career Mobility
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
  return <ContactFormPage />
}

function ElevIqLastMilePage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center bg-[var(--midnight-ink)] text-white p-8 rounded-[32px] border border-white/5 relative overflow-hidden shadow-[var(--panel-shadow)]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
            SUSTAINABLE ONBOARDING INFRASTRUCTURE
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            The ElevIQ Last Mile™
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Ensuring long-term community impact and sustainable role integration.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            The journey doesn't end when a participant aligns with a role or training pathway. The ElevIQ Last Mile™ is the execution layer of the platform, built to support active structural transitions, post-placement mentorship, and collective municipal feedback loop tracking.
          </p>
        </div>

        <div className="flex justify-center items-center p-4">
          <svg viewBox="0 0 320 240" className="w-full max-w-[340px] h-auto drop-shadow-md rounded-2xl bg-white/5 border border-white/10" aria-hidden="true">
            <rect x="0" y="0" width="320" height="240" fill="#0F1B2D" rx="16" />
            {/* Abstract transition flow */}
            <rect x="200" y="60" width="80" height="120" rx="8" fill="#1B3A5C" opacity="0.4" stroke="#0FA88A" strokeWidth="1.5" />
            <path d="M 40 120 C 100 120, 120 70, 190 90" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
            <path d="M 40 120 C 100 120, 120 170, 190 150" fill="none" stroke="#0FA88A" strokeWidth="2.5" />

            <circle cx="40" cy="120" r="5" fill="#FFFFFF" />
            <circle cx="190" cy="90" r="4" fill="#FFFFFF" opacity="0.6" />
            <circle cx="190" cy="150" r="6" fill="#0FA88A" />
            <polygon points="205,150 195,145 195,155" fill="#0FA88A" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: 3 FLOATING CARDS */}
      <section className="grid gap-6 md:grid-cols-3 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Structured Transitions</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Manages the practical workflows required to transition a participant smoothly from a training ecosystem into an active organizational role.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Post-Placement Mentorship</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Maintains continuous connection bridges between the individual, active supervisors, and regional advisors to safeguard initial job integration.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Macro Retention Tracking</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Provides program leaders with high-fidelity analytics regarding long-term pathway sustainability without encroaching on personal privacy.
          </p>
        </div>
      </section>

      {/* SECTION 3: BOTTOM 3-POINT GRID */}
      <section className="bg-white rounded-[32px] p-8 border border-[var(--line)] shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-sans text-3xl font-bold tracking-[-0.04em] text-[#0F1B2D]">
            Securing Long-Term Alignment Outcomes
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                01
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Proactive Churn Mitigation
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Helps networks spot early alignment friction or workplace disconnects, allowing support teams to step in before retention breaks.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                02
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Continuous Feedback Integration
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Gathers operational data from workplaces to refine upstream capability roadmaps and municipal training focus points.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                03
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Sustained Career Growth
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Keeps individual portal links active post-placement, encouraging lifelong capability adjustments and ongoing career planning.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function ScreenshotsPreviewPage() {
  return (
    <div
      className="space-y-[var(--section-gap)] p-6 md:p-8 rounded-[32px] border border-white/10"
      style={{ backgroundColor: '#0F1B2D', color: '#FFFFFF' }}
    >
      {/* SECTION 1: HERO BLOCK */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
            PLATFORM INTERFACE PREVIEW
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Screenshots & Product Preview
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            A transparent window into the Capability Alignment System workspace.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Explore the clean, intuitive layout architecture designed for participants, advisors, and corporate partners. All interface mock-ups focus entirely on tracking qualitative capability progress maps, avoiding clinical scoring mechanisms or black-box predictive automation graphs.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
            <Link
              to="/platform/contact"
              title="Request access to a configured sample environment"
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              Configured Sample Environment
            </Link>
            <Link
              to="/platform/interactive-journey"
              title="Explore the step-by-step product interactive journey"
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              Product Development Preview
            </Link>
            <Link
              to="/platform/contact"
              title="Request sandbox environment access"
              className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              In Sandbox Testing
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center p-4">
          <svg viewBox="0 0 320 240" className="w-full max-w-[340px] h-auto drop-shadow-md rounded-2xl bg-white/5 border border-white/10" aria-hidden="true">
            <rect x="0" y="0" width="320" height="240" fill="#0F1B2D" rx="16" />
            {/* Structured Canvas Mockup Frame */}
            <rect x="20" y="30" width="280" height="180" rx="8" fill="#1B3A5C" opacity="0.3" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />

            {/* Mockup Title bar */}
            <rect x="20" y="30" width="280" height="30" rx="8" fill="#102A45" />
            <circle cx="35" cy="45" r="4" fill="#0FA88A" />
            <circle cx="47" cy="45" r="4" fill="#FFFFFF" opacity="0.5" />
            <circle cx="59" cy="45" r="4" fill="#FFFFFF" opacity="0.3" />

            {/* Grid inside canvas mockup */}
            <rect x="35" y="75" width="75" height="120" rx="4" fill="#0F1B2D" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />
            <rect x="120" y="75" width="165" height="50" rx="4" fill="#0F1B2D" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />
            <rect x="120" y="135" width="165" height="60" rx="4" fill="#0F1B2D" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />

            {/* Tiny accent bars */}
            <rect x="45" y="90" width="55" height="6" rx="3" fill="#0FA88A" opacity="0.8" />
            <rect x="135" y="90" width="100" height="6" rx="3" fill="#FFFFFF" opacity="0.4" />
            <rect x="135" y="150" width="130" height="6" rx="3" fill="#0FA88A" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: 3 FLOATING CARDS */}
      <section className="grid gap-6 md:grid-cols-3 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Participant Dashboard Preview</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Visualizes the self-guided reflection logs, evolving signal lists, and direct communication hubs accessible to individuals.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Advisor Workspace Preview</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Showcases the cohort summary streams, chronological touchpoint note systems, and path coordination maps built for mentors.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Ecosystem Intelligence Preview</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Displays the secure, aggregate regional capability tracking maps utilized by municipal program orchestrators.
          </p>
        </div>
      </section>

      {/* SECTION 3: BOTTOM 3-POINT GRID */}
      <section className="bg-white rounded-[32px] p-8 border border-[var(--line)] shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-sans text-3xl font-bold tracking-[-0.04em] text-[#0F1B2D]">
            Strict Mock-Up Data Transparency
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                01
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Fictional Mock Data Only
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              All screen previews utilize entirely fictionalized user datasets to demonstrate layout capabilities while protecting actual privacy.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                02
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Status Label Indicators
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Every visual layout frame is clearly tagged with live operational and system stage indicators to show real-time platform statuses.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                03
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Human-Centric Design Focus
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Proves visually that the system relies on clear context spacing, prioritizing legibility and ease of use over dense text blocks.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function InteractiveJourneyPage() {
  const steps = [
    'Participant opens the ElevIQ Alignment Scan™.',
    'Experience & Context shapes the capability language.',
    'Capability Signals™ and Alignment Snapshot™ are reviewed.',
    'ElevIQ ARIA™ supports reflection on the current step.',
    'Alignment Pathways™ and Support Connections shape next moves.',
    'The ElevIQ Last Mile™ closes the handoff.'
  ]
  const [step, setStep] = useState(0)

  return (
    <div
      className="space-y-[var(--section-gap)] p-6 md:p-8 rounded-[32px] border border-white/10"
      style={{ backgroundColor: '#0F1B2D', color: '#FFFFFF' }}
    >
      {/* SECTION 1: HERO BLOCK */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
            STEP-BY-STEP SIMULATION
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Interactive Journey
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Experience the systematic alignment process from start to finish.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Walk through a live, step-by-step interactive walkthrough detailing how a single qualitative life experience is safely captured by the system, verified as a Capability Signal, and translated into a concrete, localized career development pathway.
          </p>
        </div>

        <div className="flex justify-center items-center p-4">
          <svg viewBox="0 0 320 240" className="w-full max-w-[340px] h-auto drop-shadow-md rounded-2xl bg-white/5 border border-white/10" aria-hidden="true">
            <rect x="0" y="0" width="320" height="240" fill="#0F1B2D" rx="16" />
            {/* Step trajectory line */}
            <path d="M 40 160 L 90 120 L 140 160 L 190 120 L 240 160 L 280 120" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
            <path d="M 40 160 Q 90 120 140 160 T 240 160 T 280 120" fill="none" stroke="#0FA88A" strokeWidth="2.5" />

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
                  fill={isActive ? '#0FA88A' : '#FFFFFF'}
                  stroke={isActive ? '#FFFFFF' : '#0FA88A'}
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-all duration-300"
                />
              )
            })}
          </svg>
        </div>
      </section>

      {/* INTERACTIVE CONTROLLER SECTION */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 grid gap-6 md:grid-cols-[1fr_1.5fr] items-center">
        <div className="space-y-4">
          <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
            Journey step {step + 1} of {steps.length}
          </span>
          <h3 className="font-sans text-xl font-bold text-white">
            {steps[step]}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              disabled={step === 0}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:border-[var(--eleviq-teal)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
              disabled={step === steps.length - 1}
              className="rounded-full border border-[var(--eleviq-teal)] bg-[var(--eleviq-teal)] px-4 py-2 text-xs font-medium text-white transition hover:brightness-105 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setStep(0)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition hover:text-white"
            >
              Restart
            </button>
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-2">
          <p className="text-xs text-[var(--eleviq-teal)] font-bold uppercase tracking-wider font-mono">
            System State Log
          </p>
          <p className="text-xs text-white/80 font-sans leading-relaxed">
            {step === 0 && "Initializing reflection log module. Awaiting participant inputs."}
            {step === 1 && "Translating qualitative textual entries into non-linear signal clusters. No automated score generated."}
            {step === 2 && "Compiling snapshot layout frame. Verifying secure sharing protocols."}
            {step === 3 && "Opening ARIA conversational mirror mode. Guiding self-paced trajectory adjustments."}
            {step === 4 && "Checking localized training and open community placement nodes. Mapping route options."}
            {step === 5 && "Handoff complete. Direct mentor-participant communication channel active."}
          </p>
        </div>
      </section>

      {/* SECTION 2: 3 FLOATING CARDS */}
      <section className="grid gap-6 md:grid-cols-3 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Discovery Stage Simulation</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Simulates the entry point where an individual uses self-guided reflections to log undocumented, non-linear skills.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Signal Verification Stage</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Demonstrates how qualitative entries evolve seamlessly into clear, visible indicators accessible to verified coaches.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Ecosystem Route Mapping</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Illustrates the final phase where the platform aligns active signals with specific, local educational blocks and open community positions.
          </p>
        </div>
      </section>

      {/* SECTION 3: BOTTOM 3-POINT GRID */}
      <section className="bg-white rounded-[32px] p-8 border border-[var(--line)] shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-sans text-3xl font-bold tracking-[-0.04em] text-[#0F1B2D]">
            Interactive System Clarifications
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                01
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Clarifying Stakeholder Roles
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Demonstrates exactly how participants, advisors, and corporate buyers interact within the ecosystem synchronously.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                02
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Contextual Validation Logic
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Highlights the absolute absence of testing stress, proving data accumulates strictly through self-driven, verified milestones.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                03
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Scope Confirmation Tags
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Clearly tags complex interactive steps as 'Pending Final Scope Verification' to align expectations perfectly.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function FaqPage() {
  const [openAll, setOpenAll] = useState(false)
  const faqs = [
    { question: 'Is CAS a test or a quiz?', answer: 'No. CAS is capability-alignment infrastructure that supports participant reflection, staff interpretation, and practical next steps.' },
    { question: 'Does CAS guarantee any outcome?', answer: 'No. It does not guarantee employment, hiring, wages, admissions, or clinical or psychological outcomes.' },
    { question: 'Who can use the shared information?', answer: 'Only the people and partners the participant has approved for the current context should see the shared insight.' },
    { question: 'What happens after a participant reviews a snapshot?', answer: 'They can move into Alignment Pathways™, Support Connections, and The ElevIQ Last Mile™ to coordinate the next step.' },
  ]

  return (
    <div
      className="space-y-[var(--section-gap)] p-6 md:p-8 rounded-[32px] border border-white/10"
      style={{ backgroundColor: '#0F1B2D', color: '#FFFFFF' }}
    >
      {/* SECTION 1: HERO BLOCK */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
            SYSTEM CLARIFICATIONS & ANSWERS
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Clear, straightforward answers regarding CAS mechanics, architecture, and deployment models.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Find comprehensive explanations covering system compliance, data handling, and the core differences between capability alignment infrastructure and legacy workforce assessments.
          </p>
        </div>

        <div className="flex justify-center items-center p-4">
          <svg viewBox="0 0 320 240" className="w-full max-w-[340px] h-auto drop-shadow-md rounded-2xl bg-white/5 border border-white/10" aria-hidden="true">
            <rect x="0" y="0" width="320" height="240" fill="#0F1B2D" rx="16" />
            {/* Dialogue shapes & dotted lines */}
            <rect x="30" y="50" width="160" height="45" rx="6" fill="#1B3A5C" opacity="0.3" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.1" />
            <rect x="130" y="120" width="160" height="45" rx="6" fill="#0FA88A" opacity="0.25" stroke="#0FA88A" strokeWidth="1.5" />

            <circle cx="50" cy="72" r="8" fill="#FFFFFF" opacity="0.5" />
            <line x1="70" y1="72" x2="160" y2="72" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />

            <circle cx="260" cy="142" r="8" fill="#0FA88A" />
            <line x1="160" y1="142" x2="240" y2="142" stroke="#0FA88A" strokeWidth="2.5" />

            <path d="M 110 95 L 110 120" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          </svg>
        </div>
      </section>

      {/* FAQ INTERACTIVE ACCORDIONS */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-sans text-xl font-bold text-white">Platform FAQs</h3>
          <button
            onClick={() => setOpenAll((value) => !value)}
            className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 text-white/80 transition"
          >
            {openAll ? 'Collapse all' : 'Expand all'}
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              open={openAll}
              className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300"
            >
              <summary className="cursor-pointer list-none font-sans text-base font-semibold text-white/90 select-none outline-none flex justify-between items-center">
                <span>{item.question}</span>
                <span className="text-white/40 group-open:rotate-180 transition-transform duration-200">↓</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70 font-sans border-t border-white/5 pt-3">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 2: 3 FLOATING CARDS */}
      <section className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Data Privacy & Sovereignty</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Explains how the platform keeps individuals in absolute control of their data, ensuring no third-party matching occurs without explicit consent.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Bypassing Legacy Testing</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Clarifies exactly how CAS operates without assigning clinical test grades, personality profiles, or automated fit score numbers.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Deployment Coordination</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Outlines how regional organizations, schools, and civic non-profits roll out local alignment clusters efficiently.
          </p>
        </div>
      </section>

      {/* SECTION 3: BOTTOM 3-POINT GRID */}
      <section className="bg-white rounded-[32px] p-8 border border-[var(--line)] shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-sans text-3xl font-bold tracking-[-0.04em] text-[#0F1B2D]">
            Core Policy Framework Reminders
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                01
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Free Public Utility
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Explicitly reinforces that the basic Alignment Scan remains completely free for individual users globally.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                02
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Dual-Audience Boundaries
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Clearly distinguishes the mission-driven work of ElevIQ Foundation from the commercial operations of STC Innovations.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                03
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Continuous Architecture Reviews
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Highlights that all documentation is periodically reviewed to maintain structural accuracy alongside regional pilot updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactFormPage() {
  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', role: '', interestArea: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function validate() {
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.organization.trim()) nextErrors.organization = 'Organization is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required.'
    else if (form.phone.replace(/\D/g, '').length < 7) nextErrors.phone = 'Enter a valid phone number.'
    if (!form.role.trim()) nextErrors.role = 'Role is required.'
    if (!form.interestArea.trim()) nextErrors.interestArea = 'Interest area is required.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'

    return nextErrors
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      fetch(`${apiUrl}/api/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || (data.errors ? Object.values(data.errors).join(' ') : 'Server or validation error.'));
            });
          }
          return response.json();
        })
        .then((data) => {
          setIsSubmitting(false);
          setSubmitted(true);
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.warn('Backend fetch failed, falling back to client-side confirmation:', error);
          setSubmitted(true);
        });
    }
  }

  return (
    <div
      className="space-y-[var(--section-gap)] p-6 md:p-8 rounded-[32px] border border-white/10"
      style={{ backgroundColor: '#0F1B2D', color: '#FFFFFF' }}
    >
      {/* SECTION 1: HERO BLOCK */}
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
            ECOSYSTEM ACCESS POINTS
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Request a Configured Demo
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Connect with our team to explore tailored capability alignment infrastructure for your region.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Whether you are a corporate buyer seeking to refine workspace role requirements, an institutional funder tracking municipal investments, or a non-profit organizer setting up a pilot, we can build a configured demo to match your exact structural needs.
          </p>
        </div>

        <div className="flex justify-center items-center p-4">
          <svg viewBox="0 0 320 240" className="w-full max-w-[340px] h-auto drop-shadow-md rounded-2xl bg-white/5 border border-white/10" aria-hidden="true">
            <rect x="0" y="0" width="320" height="240" fill="#0F1B2D" rx="16" />
            {/* Incoming connection / envelope line geometry */}
            <path d="M 40 60 H 280 V 180 H 40 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
            <path d="M 40 60 L 160 130 L 280 60" fill="none" stroke="#0FA88A" strokeWidth="2.5" />
            <path d="M 40 180 L 120 130" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
            <path d="M 280 180 L 200 130" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />

            <circle cx="160" cy="130" r="4" fill="#0FA88A" />
            <line x1="160" y1="130" x2="160" y2="200" stroke="#0FA88A" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="160" cy="200" r="4" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* CONTACT FORM CONTAINER */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
        {submitted ? (
          <div className="text-center py-10 space-y-4 max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--eleviq-teal)]/20 text-[var(--eleviq-teal)]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-sans text-xl font-bold text-white">Submission received</h3>
            <p className="text-sm text-white/70">
              Thank you. Our team is active and reviewing inquiries. We will follow up directly with current information.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <Link to="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono text-white rounded-full transition">
                Return home
              </Link>
              <Link to="/platform" className="px-4 py-2 bg-[var(--eleviq-teal)] text-xs font-mono text-white rounded-full transition">
                Open Platform
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--eleviq-teal)]"
                type="text"
                autoComplete="name"
              />
            </Field>

            <Field label="Organization" error={errors.organization}>
              <input
                value={form.organization}
                onChange={(event) => updateField('organization', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--eleviq-teal)]"
                type="text"
                autoComplete="organization"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--eleviq-teal)]"
                type="email"
                autoComplete="email"
              />
            </Field>

            <Field label="Phone" error={errors.phone}>
              <input
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--eleviq-teal)]"
                type="tel"
                autoComplete="tel"
              />
            </Field>

            <Field label="Role" error={errors.role} className="sm:col-span-2">
              <input
                value={form.role}
                onChange={(event) => updateField('role', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--eleviq-teal)]"
                type="text"
                placeholder="Participant advocate, school leader, employer, donor, or other"
              />
            </Field>

            <Field label="Interest Area" error={errors.interestArea} className="sm:col-span-2">
              <select
                value={form.interestArea}
                onChange={(event) => updateField('interestArea', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:border-[var(--eleviq-teal)] [&>option]:bg-[#0F1B2D]"
              >
                <option value="">Select one</option>
                <option>Participant/family information</option>
                <option>School/youth partnership</option>
                <option>Job Corps/workforce partnership</option>
                <option>Funder/donor conversation</option>
                <option>Employer/institutional CAS use</option>
                <option>CAS licensing/demo</option>
                <option>Media/speaking/general inquiry</option>
              </select>
            </Field>

            <Field label="Message" error={errors.message} className="sm:col-span-2">
              <textarea
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[var(--eleviq-teal)] min-h-[120px]"
                rows="4"
              />
            </Field>

            {errors.submit ? (
              <div className="sm:col-span-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 font-medium">
                {errors.submit}
              </div>
            ) : null}

            <div className="sm:col-span-2 flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full border border-[var(--eleviq-teal)] bg-[var(--eleviq-teal)] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Submit inquiry'}
              </button>
              <Link
                to="/platform"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white/80 transition hover:text-white"
              >
                Review how CAS works
              </Link>
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

function Field({ label, error, children, className = '' }) {
  const child = Children.only(children)
  const updatedChild = cloneElement(child, {
    className: `${child.props.className || ''} ${error ? 'border-red-500/50! focus:ring-red-500/20' : ''}`
  })

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">{label}</span>
      {updatedChild}
      <div className={`transition-all duration-300 ease-out overflow-hidden ${error ? 'max-h-10 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <span className="text-xs text-red-400 font-medium flex items-center gap-1">
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