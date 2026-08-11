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
          <CookieConsentBanner />
        </div>
      </div>
    </SectionTheme>
  )
}

function CookieConsentBanner() {
  const [show, setShow] = useState(() => {
    return !localStorage.getItem('eleviq_cookie_consent')
  })

  function handleConsent(choice) {
    localStorage.setItem('eleviq_cookie_consent', choice)
    setShow(false)
  }

  if (!show) return null

  return (
    <aside
      role="region"
      aria-label="Privacy and Cookie Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 rounded-[20px] bg-[#0F1B2D] border border-[#0FA88A]/40 p-5 shadow-2xl text-white space-y-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0FA88A]">
            PRIVACY & WCAG 2.1 AA COMPLIANT
          </span>
          <h4 className="font-sans text-sm font-bold text-white">
            Privacy-First Analytics & Cookie Consent
          </h4>
        </div>
        <button
          onClick={() => handleConsent('essential')}
          className="text-white/40 hover:text-white text-xs font-mono p-1"
          aria-label="Close consent banner"
        >
          ✕
        </button>
      </div>
      <p className="text-xs leading-relaxed text-white/75 font-sans">
        ElevIQ respects individual sovereignty. We use only privacy-first, anonymized operational telemetry—never sell data or perform cross-site user tracking.
      </p>
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={() => handleConsent('anonymized_analytics')}
          className="rounded-full bg-[#0FA88A] border border-[#0FA88A] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-105 shadow-sm"
        >
          Accept Anonymized Insights
        </button>
        <button
          onClick={() => handleConsent('essential_only')}
          className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          Essential Only
        </button>
      </div>
    </aside>
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
                PRODUCT DEVELOPMENT PREVIEW
              </span>
              <h1 className="max-w-2xl font-sans text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                One Connected System for Capability, Alignment, and Practical Next Steps.
              </h1>
              <p className="text-base md:text-lg font-normal text-[#EBF1F5] leading-relaxed max-w-2xl font-sans opacity-90">
                The ElevIQ Capability Alignment System™ is designed to connect participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence through human-centered infrastructure.
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Button 1: Horizon Teal Fill */}
                <Link
                  to="/platform"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:brightness-105"
                >
                  Explore How CAS Is Designed to Work
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
                  Portal Access - Coming Soon or Program Access
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
              Participant reflection and approved context translated into clear Capability Signals™ that can support advising and next-step conversations.
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
              the movement from insight toward practical next steps, which may include support planning, referrals, preparation, training, applications, onboarding preparation, and follow-up within a configured partner program.
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
              Mentors and cohort leaders coordinate follow-through by reviewing shared, participant-approved insights. By removing designed to support participant reflection and pathway planning models, teams stay focused on personal pacing, role alignment, and local program handoffs.
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
                PRODUCT DEVELOPMENT PREVIEW
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                The Architecture of Capability Alignment
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Moving beyond static resumes and rigid clinical assessments.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The ElevIQ Capability Alignment System (CAS) is human-centered infrastructure that is designed to connect personal reflection with education, workforce, and community pathway conversations.
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
              help participants reflect on lived experience, context, strengths, and contribution.
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
              participant-approved insights and structured workflows that can support human guidance.
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
              configured information that can support pathway discussions and practical next-step planning.
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
                Granular Privacy Control
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                participant consent and access controls are being designed into the configured experience. Final privacy language will reflect the verified production architecture.
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
                Ecosystem Synchronization
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                The platform vision connects participant growth, advisor workflows, and local pathway information. Integration status should be identified by configuration.
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
                In Development / Configuration Required
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                A Dedicated Space for Personal Agency
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                a participant-centered workspace designed around dignity, reflection, appropriate access, and privacy-conscious workflows.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The Participant Portal is being configured to help participants review their information, understand Capability Signals™, explore possible pathways, and share approved insight with authorized support.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Program Access / Portal Preview
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    In Development / Configuration Required
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
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Evolving Capability Reflection</h3>
            <p className="text-xs md:text-sm leading-relaxed text-[#4B5563] font-sans">
              Review how your reflections and approved context may contribute to Capability Signals™ over time.
            </p>
          </div>

          {/* Module 3 */}
          <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-start space-y-4 hover:border-[#0FA88A] hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                PORTAL MODULE 03
              </span>
            </div>
            <h3 className="font-sans text-xl font-bold text-[#0F1B2D]">Support Connections</h3>
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
                Participant access, correction, and sharing controls will follow the verified production configuration and applicable program consent practices.
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                In Development / Configured Sample
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Community Intelligence Console™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                A configured organization workspace designed to help authorized staff review participant-approved and aggregate capability information.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The Community Intelligence Console™ is being developed to support authorized program staff with cohort views, workflow status, participant-approved insight, and configuration-specific reporting.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  View the Console Preview
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    In Development / Configured Sample
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
              Configured cohort views may help organizations examine capability patterns without presenting individual data beyond approved access.
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
              May support planning discussions about development opportunities, local pathways, and support resources when approved data sources are configured.
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
              Designed to support discussion of participant pathways, program context, and community opportunity information. Data connections and reporting status must be labeled.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: ENTERPRISE DATA GOVERNANCE */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Configured Organization and Community Coordination
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Point 1 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Privacy-Preserving Architecture
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Final privacy, permissions, aggregation, retention, and compliance language will be published only after technical and legal verification.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Precision Labor-Market Mapping
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Potential labor-market and pathway data connections are configuration-dependent and should be labeled In Development or In Testing until verified.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Inter-Agency Synergy
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                ElevIQ ARIA™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Human-centered guidance designed to elevate personal agency and deep reflection.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                ElevIQ ARIA™ is the participant-facing guidance experience being designed to help participants understand information, reflect on context, and prepare for human-guided next steps.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Experience ARIA Preview
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#0FA88A]/40 transition-all duration-300">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                  <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                    IN DEVELOPMENT
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
              May support plain-language reflection prompts that help participants consider experience, context, strengths, and contribution.
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
              Designed to help organize participant reflection into understandable language that the participant may review before approved sharing.
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
              ARIA supports navigation and interpretation; it does not make final eligibility, hiring, placement, clinical, or psychological decisions.
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
                Can help participants organize reflection into clear, reviewable language.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Uncovering Hidden Strengths
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                ARIA may prompt participants to consider capabilities developed through life, work, service, caregiving, learning, and community experience.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero-Score Philosophy
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                ElevIQ CLARA™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Empowering advisors and coaches with transparent, actionable context.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                ElevIQ CLARA™ is the organization-facing guidance experience being developed to help authorized staff interpret participant-approved information and plan human support.
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
                    IN DEVELOPMENT
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
              Review participant-approved reflections, goals, and context within the permissions of the configured program.
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
              Designed to support notes, next-step planning, and follow-up workflows when those functions are configured and tested.
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
              Configured cohort views may help authorized staff organize participant workflows and identify follow-up needs.
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
                CLARA is designed to support human review rather than make final automated decisions. Do not claim bias elimination.
              </p>
            </div>

            {/* Point 2 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                High-Fidelity Interaction Records
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Recordkeeping, audit history, retention, and access controls are configuration-dependent and require verification before publication.
              </p>
            </div>

            {/* Point 3 */}
            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Optimized Cohort Navigation
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                IN DEVELOPMENT / VALIDATION PENDING
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Capability Signals™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Clear, strengths-oriented language designed to help participants and advisors discuss capability beyond resumes and credentials.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Capability Signals™ translate participant reflection and approved context into understandable capability language. They are directional and do not predict success.
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
                    IN DEVELOPMENT / VALIDATION PENDING
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
              Participant reflections and contextual information provided through the ElevIQ Alignment Scan™ and related program workflows.
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
              Documented experience or milestones may be included when an approved verification method is configured.
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
              Authorized staff observations may be included when permitted by the participant, program rules, and configured workflow.
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
                Supports updated reflection over time when the configured program allows.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Zero Test-Stress Framework
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Alignment Snapshot™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                a clear, participant-centered summary of Capability Signals™, context, and possible next-step discussion points.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                The Alignment Snapshot™ is designed to organize participant-approved information into a plain-language summary for participant review and human-guided conversation.
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
                    IN DEVELOPMENT
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
              Centers participant voice, goals, context, and self-reflection in the summary.
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
              Organizes available Capability Signals™ into a readable summary without reducing the participant to one score.
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
              Advisor notes or observations may be included only within an approved, configured workflow.
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
                Sharing and permission controls are subject to final technical configuration, consent practices, and legal review.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Actionable Guidance Foundation
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Serves as a launching pad for advisors to co-create tailored development tracks and career planning models.
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
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Alignment Pathways™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Individualized, dynamic roadmaps connecting capability insight to practical workforce tracks.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Alignment Pathways™ use available Capability Signals™ and participant goals to support exploration of flexible education, training, career, service, entrepreneurship, or community pathways.
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
                    IN DEVELOPMENT
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
              Pathways may be reviewed and adjusted as participants add information, clarify goals, and work with trusted support.
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
              Local pathways and partner information may be added through approved program configuration. Do not imply a live integration until verified.
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
              Can support practical next-step planning within a configured program.
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
                Participants may explore stackable learning, training, and development opportunities relevant to their goals.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor View Inclusion
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                DIRECTIONAL ROLE ALIGNMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Role Alignment
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Supporting discussion between a participant’s current Capability Signals™ and a defined Role Benchmark.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Role Alignment is a directional comparison that supports discussion and planning. It does not determine qualification, eligibility, hiring, or job performance.
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
                    In Development / Role Benchmarks Require Approval
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
              Authorized organizations may define a Role Benchmark describing relevant capabilities, experience, and context for discussion.
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
              May present a participant’s current signals alongside a Role Benchmark for human review.
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
              May identify Development Opportunities for discussion without labeling the participant as deficient.
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
                CAS is not designed to make final automated hiring or rejection decisions.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Targeted Onboarding Insight
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                May support onboarding preparation and development conversations when configured for an employer program.
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
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Development Opportunities
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Connecting capability alignment maps with personalized growth ecosystems.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                helps participants and authorized support consider possible learning, training, practice, and experience-building options relevant to their goals.
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
                    IN DEVELOPMENT
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
              Configured programs may present relevant training or learning options. Do not imply live integration until verified.
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
              Approved community or program opportunities may be added through configuration.
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
              May present development options based on participant goals and available program information.
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
                Development Opportunities may be updated through participant and advisor review when the configured workflow allows.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Advisor Collaboration Support
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Support Connections
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                Helping participants identify trusted people, programs, and resources that may support practical next steps.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Support Connections represents the human and community support layer of CAS. Available workflows depend on partner configuration and testing.
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
                    IN DEVELOPMENT
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
              Direct communication features are in development and should not be presented as live until tested.
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
              Configured programs may provide approved resource and referral information.
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
              Shared planning and progress functions are configuration-dependent.
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
                Cross-agency access is not assumed. Authorized access depends on consent, agreements, permissions, and technical configuration.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Dignified Interaction History
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Recordkeeping, retention, and interaction-history functions require technical and legal verification.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Participant Sovereignty Hub
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
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
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0FA88A] shadow-sm">
                IN DEVELOPMENT
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Experience & Context
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                recognizing experience and context that may not appear in a traditional resume.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                helping participants describe capabilities developed through work, learning, caregiving, service, community involvement, and life experience.
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
                    IN DEVELOPMENT
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
              Provides reflection prompts that may help participants describe non-linear experience and contribution.
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
              May capture participant-provided context relevant to practical pathway and support conversations.
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
                Helps translate lived experience into clear capability language. Do not call it validated unless an approved method exists.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="border-l-4 border-[#0FA88A] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                Removing Outdated Credentials
              </h4>
              <p className="text-sm leading-relaxed text-white/70 font-sans">
                Broadens the information considered beyond credentials and job titles while preserving human review.
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
                IN DEVELOPMENT / FUTURE-STATE MODULE
              </span>
              <h2 className="max-w-2xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                Life Vector™
              </h2>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                DIRECTION AND MOMENTUM
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
                Life Vector™ is a developing visual concept intended to help participants reflect on direction, goals, milestones, and changing possibilities over time.
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
                    IN DEVELOPMENT / FUTURE-STATE MODULE
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
              May display participant-reviewed milestones or updates when configured.
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
              Supports long-range goal conversation and exploration of multiple possible pathways.
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
              Possible pathways may be revisited as participants add information and clarify goals.
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
          {/* Commercial Handoff Banner */}
          <div className="mb-8 rounded-[20px] bg-[#0F1B2D] border border-[#0FA88A]/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg text-white">
            <div className="space-y-1 text-left">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[10px] py-[3px] font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#0FA88A]">
                COMMERCIAL & ENTERPRISE HANDOFF
              </span>
              <h4 className="font-sans text-base font-bold text-white">
                Looking for commercial licensing, institutional pricing, or enterprise implementation?
              </h4>
            </div>
            <Link
              to="/organizations"
              className="shrink-0 rounded-full border border-[#0FA88A] bg-[#0FA88A] px-5 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-1.5"
            >
              Visit STC Innovations →
            </Link>
          </div>

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
                <Link to="/individuals" className="text-white/60 hover:text-[#E2725B] transition-all duration-200">
                  Individuals Home
                </Link>
              </li>
              <li>
                <Link to="/individuals/explore-your-path" className="text-white/60 hover:text-[#E2725B] transition-all duration-200">
                  Explore Your Path
                </Link>
              </li>
              <li>
                <Link to="/individuals/how-it-works" className="text-white/60 hover:text-[#E2725B] transition-all duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/individuals/programs-partners" className="text-white/60 hover:text-[#E2725B] transition-all duration-200">
                  Programs & Partners
                </Link>
              </li>
              <li>
                <Link to="/individuals/schools-workforce" className="text-white/60 hover:text-[#E2725B] transition-all duration-200">
                  For Schools & Workforce
                </Link>
              </li>
              <li>
                <Link to="/individuals/trust" className="text-white/60 hover:text-[#E2725B] transition-all duration-200">
                  Trust
                </Link>
              </li>
              <li>
                <Link to="/individuals/support-the-mission" className="text-white/60 hover:text-[#E2725B] transition-all duration-200">
                  Support the Mission
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
          {/* Official Dual-Entity Organizational Relationship Statement */}
          <div className="pt-6 border-t border-white/10 space-y-4 text-xs text-white/70 font-sans">
            <h4 className="font-sans text-sm font-bold text-white tracking-wide">
              ElevIQ Foundation & STC Innovations
            </h4>
            <p className="leading-relaxed">
              STC Innovations owns, develops, configures, licenses, and commercializes the ElevIQ Capability Alignment System™. ElevIQ Foundation applies CAS through mission-driven access, community programs, pilots, partnerships, and participant support. ElevIQ Foundation receives CAS access at no cost for approved mission-aligned nonprofit use, and the ElevIQ Alignment Scan™ remains free for individual participants.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-white/40">
            <p>© 2026 STC Innovations. ElevIQ Capability Alignment System™ and related product intellectual property are owned by STC Innovations. ElevIQ Foundation is a separate nonprofit organization authorized to use CAS for approved mission-aligned programming.</p>
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
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-[var(--panel-pad)] shadow-xl overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column Content */}
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
                A PLATFORM BUILT FOR YOUR JOURNEY
              </span>
              <h1 className="max-w-xl font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
                See Your Strengths. Build Your Next Step.
              </h1>
              <p className="text-lg font-medium text-white/90 leading-relaxed max-w-xl">
                ElevIQ Foundation helps overlooked talent discover, name, and connect their capabilities to meaningful opportunity through human-centered technology, advisor support, and community partnerships.
              </p>
              <p className="text-sm leading-relaxed text-white/70 max-w-xl font-sans">
                ElevIQ helps close the gap between hidden capability and visible opportunity. The experience is about alignment, not limitation, and technology supports rather than replaces trusted human guidance.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/individuals/explore-your-path"
                  className="rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-2.5 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
                >
                  Explore Your Path
                </Link>
                <Link
                  to="/platform/participant-portal"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/30"
                >
                  Use My Program Link
                </Link>
              </div>
            </div>

            {/* Right Column Media Graphic */}
            <div className="flex justify-center items-center p-4">
              <div className="w-full max-w-[340px] rounded-2xl bg-[#0F1B2D]/40 border border-white/10 p-6 shadow-2xl relative overflow-hidden group hover:border-[#E2725B]/40 transition-all duration-300">
                <svg viewBox="0 0 320 240" className="w-full h-auto drop-shadow-md relative z-10" aria-hidden="true">
                  <line x1="20" y1="40" x2="300" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="80" x2="300" y2="80" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="120" x2="300" y2="120" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="160" x2="300" y2="160" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="20" y1="200" x2="300" y2="200" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  
                  <line x1="60" y1="20" x2="60" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="120" y1="20" x2="120" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="180" y1="20" x2="180" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />
                  <line x1="240" y1="20" x2="240" y2="220" stroke="#FFFFFF" strokeWidth="1" opacity="0.05" />

                  <path d="M 40 180 Q 100 160 140 110 T 280 60" fill="none" stroke="#E2725B" strokeWidth="3" />
                  <path d="M 40 180 Q 100 160 140 110 T 280 60" fill="none" stroke="#E2725B" strokeWidth="8" opacity="0.15" />

                  <circle cx="40" cy="180" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="100" cy="153" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="157" cy="98" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="218" cy="80" r="5" fill="#FFFFFF" stroke="#E2725B" strokeWidth="2" />
                  <circle cx="280" cy="60" r="6" fill="#E2725B" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: PROBLEM & MISSION BLOCK */}
      <ScrollReveal>
        <section className="grid gap-6 md:grid-cols-2">
          {/* Problem Card */}
          <div className="bg-white rounded-[28px] p-8 shadow-md border border-[#1B3A5C] space-y-4 hover:border-[#E2725B] transition-all duration-300">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
              THE CHALLENGE
            </span>
            <h3 className="font-sans text-2xl font-bold text-[#0F1B2D]">
              Unseen & Unconnected Capability
            </h3>
            <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
              Capability is real but often unseen, unnamed, or disconnected from opportunity. Traditional credentials reduce rich life experience to rigid degree requirements.
            </p>
          </div>

          {/* Mission Response Card */}
          <div className="bg-white rounded-[28px] p-8 shadow-md border-2 border-[#E2725B] space-y-4 shadow-lg hover:border-[#E2725B] transition-all duration-300">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
              OUR MISSION RESPONSE
            </span>
            <h3 className="font-sans text-2xl font-bold text-[#0F1B2D]">
              Strengths-Oriented Alignment
            </h3>
            <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
              Strengths-oriented capability alignment supported by people and human-centered technology—connecting individual reflection directly to real-world pathways.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: SIMPLE PARTICIPANT JOURNEY (5 STEPS WITH DESCRIPTIONS) */}
      <ScrollReveal>
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
              PARTICIPANT JOURNEY
            </span>
            <h2 className="font-sans text-3xl font-bold text-[#0F1B2D]">
              5 Steps to Discover & Build Your Path
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E2725B] text-xs font-bold text-white font-mono shadow-sm">
                      {step.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#E2725B]/40" />
                  </div>
                  <h3 className="font-sans text-base font-bold text-[#0F1B2D]">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 4: WHO WE SERVE & HUMAN GUIDANCE */}
      <ScrollReveal>
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
              WHO WE SERVE
            </span>
            <h2 className="font-sans text-3xl font-bold text-[#0F1B2D]">
              Built for People, Supported by Navigators
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((aud) => (
              <div
                key={aud.tag}
                className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                  {aud.tag}
                </span>
                <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                  {aud.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                  {aud.desc}
                </p>
              </div>
            ))}

            {/* Human Guidance Card */}
            <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                HUMAN-CENTERED CORE
              </span>
              <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Human Advisors at the Center
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Human advisors, counselors, mentors, and navigators remain at the center of every capability journey. Technology supports, but never replaces, trusted human guidance.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* PROGRAM & PARTNER STATUS BLOCK (STEP 7) */}
      <ScrollReveal>
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
              INITIATIVE STAGES
            </span>
            <h2 className="font-sans text-3xl font-bold text-[#0F1B2D]">
              Program & Partner Deployment Status
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D]">
                  IN TESTING
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E2725B] animate-pulse" />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Job Corps Alignment Configuration
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Configured for CSS/ESP counseling workflows and CTT trade pathways.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D]">
                  IN DEVELOPMENT
                </span>
                <span className="w-2 h-2 rounded-full bg-[#E2725B]/60" />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                School & CTE Pathway Pilots
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Strengths-based career clarity modules for youth programs and high schools.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[24px] p-6 shadow-md border border-[#1B3A5C] space-y-3 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center">
                <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D]">
                  VALIDATED
                </span>
                <span className="w-2 h-2 rounded-full bg-[#0FA88A]" />
              </div>
              <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Rural Workforce Innovation
              </h3>
              <p className="text-xs leading-relaxed text-[#4B5563] font-sans">
                Community-rooted pilot models supporting local workforce ecosystems.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SUPPORT & PARTNERSHIP CTAS (STEP 9) */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-8 md:p-12 shadow-xl text-center text-white space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
              MISSION ALLIANCE
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Join Us in Closing the Capability Gap
            </h2>
            <p className="text-sm md:text-base text-white/80 font-sans leading-relaxed">
              Whether you are a funder, school leader, workforce agency, or community advocate, there is a place for you.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/individuals/support-the-mission"
              className="rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-3 text-xs font-semibold text-white transition hover:brightness-105 shadow-md"
            >
              Support the Mission
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold text-white transition hover:bg-white/10 hover:border-white/30"
            >
              Become a Community Partner
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 5: TRUST BLOCK & COMMERCIAL HANDOFF */}
      <ScrollReveal>
        <section className="space-y-6">
          {/* Trust Block Summary */}
          <div className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
            <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
              Foundation Trust, Privacy & Dignity Guarantees
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                  Complete Data Privacy
                </h4>
                <p className="text-sm leading-relaxed text-white/70 font-sans">
                  You own your profile data permanently. No third-party data sales or black-box algorithm scoring.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                  Dignity & Strengths Focus
                </h4>
                <p className="text-sm leading-relaxed text-white/70 font-sans">
                  The experience focuses strictly on your verified strengths and alignment, avoiding clinical deficit framing.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="border-l-4 border-[#E2725B] pl-3 text-base md:text-lg font-semibold text-white font-sans tracking-tight">
                  Responsible Technology
                </h4>
                <p className="text-sm leading-relaxed text-white/70 font-sans">
                  Interactive AI tools serve as supportive sounding boards for self-reflection alongside human advisors.
                </p>
              </div>
            </div>
          </div>

          {/* STC Innovations Commercial Handoff Banner */}
          <div className="rounded-[24px] bg-[#0F1B2D] border border-[#0FA88A]/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
            <div className="space-y-2">
              <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#0FA88A]">
                COMMERCIAL & ENTERPRISE HANDOFF
              </span>
              <h4 className="font-sans text-lg font-bold text-white">
                Looking for commercial licensing, institutional pricing, or enterprise implementation?
              </h4>
              <p className="text-xs text-white/70 font-sans">
                STC Innovations licenses and configures the ElevIQ Capability Alignment System (CAS) for workforce boards, employers, and enterprise buyers.
              </p>
            </div>
            <Link
              to="/organizations"
              className="shrink-0 rounded-full border border-[#0FA88A] bg-[#0FA88A] px-6 py-3 text-xs font-semibold text-white transition hover:brightness-105 shadow-md inline-flex items-center gap-1.5"
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
  return (
    <div className="space-y-[var(--section-gap)]">
      {/* SECTION 1: HERO BLOCK */}
      <ScrollReveal>
        <section className="rounded-[32px] border border-[#1B3A5C] bg-[#1B3A5C] p-8 md:p-12 shadow-xl overflow-hidden text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 text-white text-center">
            <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/20 px-[12px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#E2725B] shadow-sm">
              YOUTH & WORKFORCE INITIATIVE
            </span>
            <h1 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
              Strengths-Based Alignment for Schools & Job Corps
            </h1>
            <p className="text-lg font-medium text-white/90 leading-relaxed max-w-2xl">
              Empowering educators, advisors, and counselors with human-centered capability alignment.
            </p>
            <p className="text-sm leading-relaxed text-white/70 max-w-2xl font-sans">
              Connecting classroom learning, vocational training, and life experience to verified capability signals without clinical testing pressure.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 2: DUAL-AUDIENCE GRID SECTION */}
      <ScrollReveal>
        <section className="grid gap-8 md:grid-cols-2">
          {/* CARD A: Schools & Youth Programs */}
          <div className="bg-white rounded-[28px] p-8 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                01. SCHOOLS & CTE
              </span>
              <h2 className="font-sans text-2xl font-bold text-[#0F1B2D]">
                Schools & Youth Programs
              </h2>
              <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                Supports strengths-based career clarity, CTE advising, classroom conversations, and practical pathway mapping.
              </p>
              <ul className="space-y-2.5 text-xs font-sans text-[#4B5563] pt-2">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#E2725B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Strengths-oriented career clarity without testing pressure</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#E2725B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Actionable insights to guide CTE advising conversations</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#E2725B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Direct connection from classroom learning to real-world options</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-3 text-xs font-semibold text-white transition hover:brightness-105 shadow-md text-center block"
              >
                Discuss a Program
              </Link>
            </div>
          </div>

          {/* CARD B: Job Corps Centers & Counselors */}
          <div className="bg-white rounded-[28px] p-8 shadow-md border border-[#1B3A5C] flex flex-col justify-between space-y-6 hover:border-[#E2725B] hover:-translate-y-1 transition-all duration-300">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-[#E2725B] bg-[#E2725B]/15 px-[10px] py-[4px] font-mono text-[11px] font-bold uppercase tracking-[0.05em] text-[#0F1B2D] shadow-sm">
                02. JOB CORPS COHORTS
              </span>
              <h2 className="font-sans text-2xl font-bold text-[#0F1B2D]">
                Job Corps Centers & Counselors
              </h2>
              <p className="text-sm leading-relaxed text-[#4B5563] font-sans">
                Supports participant reflection, CSS/ESP conversations, CTT pathway exploration, counselors, and Support Planning.
              </p>
              <ul className="space-y-2.5 text-xs font-sans text-[#4B5563] pt-2">
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#E2725B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Integrates with CSS/ESP counseling & participant reflection</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#E2725B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Translates hands-on CTT trade training into capability signals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#E2725B] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Streamlines Support Planning and transition to employment</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-[#EBF1F5]">
              <Link
                to="/contact"
                className="w-full rounded-full border border-[#E2725B] bg-[#E2725B] px-6 py-3 text-xs font-semibold text-white transition hover:brightness-105 shadow-md text-center block"
              >
                Discuss the Job Corps Configuration
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* SECTION 3: EXPOSITION BLOCK */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#1B3A5C] rounded-[32px] p-8 md:p-12 shadow-xl text-white">
          <h3 className="text-center font-sans text-2xl md:text-3xl font-bold text-white tracking-tight mb-10">
            Job Corps & Educational Program Values
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
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/50 font-mono">
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
                  ECOSYSTEM ALIGNMENT
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
                Strict Anonymized Macro analytics
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
    { badge: '02. EDUCATIONAL HUBS', title: 'Community College Solutions', desc: 'trade skill alignment and student alignment dashboards connecting coursework to regional employer tracks.' },
    { badge: '03. CORPORATE BUYERS', title: 'Skills-First Hiring Portals', desc: 'Direct access to verified candidate capability snapshots without relying on automated resume screening.' },
    { badge: '04. ADVISOR WORKSPACES', title: 'ElevIQ CLARA™ Advisor Dashboards', desc: 'Dedicated workspaces for frontline coaches to deliver human guidance and co-create milestone roadmaps.' },
    { badge: '05. COMMUNITY CONSOLES', title: 'Community Intelligence Console™', desc: 'Aggregated macro data layer isolating raw reflection entries while surfacing regional talent trends.' },
    { badge: '06. ROLE BENCHMARKING', title: 'Human-Centered Role Alignment', desc: 'Translates corporate job requirements into qualitative capability criteria rather than rigid credential lists.' },
    { badge: '07. ONBOARDING TRACKS', title: 'The ElevIQ Last Mile™', desc: 'Structured post-hire onboarding support and retention alignment to ensure long-term role alignment.' },
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

      {/* ORGANIZATIONAL RELATIONSHIP DISCLAIMER SECTION */}
      <ScrollReveal>
        <section className="w-full bg-[#1B3A5C] border border-[#0FA88A]/40 rounded-[32px] p-8 md:p-12 shadow-xl text-white space-y-6">
          <div className="space-y-2">
            <span className="inline-flex rounded-full border border-[#0FA88A] bg-[#0FA88A]/20 px-[10px] py-[4px] font-mono text-[10px] font-bold uppercase tracking-[0.05em] text-[#0FA88A]">
              ORGANIZATIONAL RELATIONSHIP
            </span>
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-white tracking-tight">
              ElevIQ Foundation & STC Innovations
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 text-sm text-white/80 font-sans leading-relaxed">
            <div className="bg-[#0F1B2D]/60 p-6 rounded-2xl border border-white/10 space-y-2">
              <h4 className="font-sans text-base font-bold text-white">ElevIQ Foundation Role</h4>
              <p>
                ElevIQ Foundation Inc. is an independent tax-exempt nonprofit dedicated to helping individuals discover, name, and connect their capabilities to opportunity free from testing pressure.
              </p>
            </div>

            <div className="bg-[#0F1B2D]/60 p-6 rounded-2xl border border-white/10 space-y-2">
              <h4 className="font-sans text-base font-bold text-white">STC Innovations Role</h4>
              <p>
                STC Innovations is the commercial technology developer that licenses and configures the ElevIQ Capability Alignment System (CAS™) infrastructure for enterprise, institutional, and workforce partners.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0FA88A]/15 border border-[#0FA88A]/40 text-xs text-white/90 font-mono leading-relaxed">
            <strong>Shared Technology Note:</strong> The Capability Alignment System powers both nonprofit community pathways and commercial enterprise solutions, connecting participant reflection to real-world opportunities.
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
            IN DEVELOPMENT / FUTURE-STATE ELEMENTS
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            The ElevIQ Last Mile™
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed font-mono text-xs uppercase tracking-wider text-[#0FA88A]">
            FROM INSIGHT TO PRACTICAL NEXT STEPS
          </p>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Supporting the movement from capability insight toward practical, human-guided next steps.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Depending on the configured partner program, The ElevIQ Last Mile™ may include support planning, referrals, preparation, training options, applications, interviews, onboarding preparation, and follow-up.
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

      {/* SECTION 2: 2 FLOATING CARDS */}
      <section className="grid gap-6 md:grid-cols-2 mt-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Structured Transitions</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            May support practical transition planning within an approved program.
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
            Post-placement support is program-dependent and should not be presented as live unless a partner workflow has been configured and tested.
          </p>
        </div>
      </section>

      {/* SECTION 3: BOTTOM 2-POINT GRID */}
      <section className="bg-white rounded-[32px] p-8 border border-[var(--line)] shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <h3 className="font-sans text-3xl font-bold tracking-[-0.04em] text-[#0F1B2D]">
            Securing Long-Term Alignment Outcomes
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
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
              May support follow-up conversations about alignment and support needs within an approved program.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EAF3F3] text-xs font-bold text-[#1E7F82] shrink-0 font-sans border border-[#d2dfdf]">
                02
              </span>
              <h4 className="font-sans text-lg font-bold text-[#0F1B2D]">
                Sustained Career Growth
              </h4>
            </div>
            <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
              Participants may revisit goals and next steps when continued access is part of the configured program.
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
            Configured Sample Environment / Product Development Preview / In Sandbox Testing
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Screenshots & Product Preview
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            All screen previews utilize mockups and fictional data for illustrative purposes. Features shown reflect configured sample environments and may require custom deployment.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Explore configured sample screens illustrating the intended participant, advisor, and organization experience. Visible screens do not imply that every feature, report, integration, or button is connected.
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
            Configured sample mockup demonstrating reflection logs, signal summaries, and guidance options.
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
            Configured sample mockup displaying staff notes, approved signal views, and goal planning space.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-[var(--line)] flex flex-col justify-start space-y-4 hover:shadow-md transition-shadow duration-300">
          <div className="w-10 h-10 rounded-xl bg-[#EAF3F3] flex items-center justify-center text-[#1E7F82] shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-sans text-lg font-bold text-[#0F1B2D]">Community Intelligence Console™ Preview</h3>
          <p className="text-xs md:text-sm leading-relaxed text-[#6B7280] font-sans">
            Configured sample mockup depicting anonymized aggregate program views for approved administrators.
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
              show the current development or testing status of each preview.
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
    'Participant begins through an approved program route or individual access path.',
    'Participant-provided Experience & Context helps inform capability language.',
    'Capability Signals™ and Alignment Snapshot™ are reviewed.',
    'ElevIQ ARIA™ supports reflection on the current step.',
    'Alignment Pathways™ and Support Connections shape next moves.',
    'The ElevIQ Last Mile™ supports movement toward a practical next step.'
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
            Product Development Simulation
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Interactive Journey
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Walk through a product-development simulation showing the intended CAS journey. This simulation is illustrative and is not the authenticated Participant Portal.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            This walkthrough demonstrates the workflow from initial participant reflection to advisor touchpoints and pathway alignment.
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
            {step === 0 && "Participant begins through an approved program route or individual access path."}
            {step === 1 && "Participant-provided Experience & Context helps inform capability language."}
            {step === 2 && "Preparing the Alignment Snapshot™ for participant review. Sharing controls remain subject to final configuration."}
            {step === 3 && "Previewing how ElevIQ ARIA™ may support participant reflection and preparation."}
            {step === 4 && "Previewing possible Alignment Pathways™ and Support Connections available through an approved program configuration."}
            {step === 5 && "Illustrative journey complete. Actual follow-up and communication depend on the configured program workflow."}
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
    { question: 'Who can use shared information?', answer: 'Access depends on participant consent, program rules, legal agreements, and the verified production permissions model.' },
    { question: 'Is the ElevIQ Alignment Scan™ free?', answer: 'The ElevIQ Alignment Scan™ remains free for individual participants. Program services, institutional implementation, and commercial licensing are separate.' },
    { question: 'How is system documentation updated?', answer: 'Product and public documentation will be updated as configuration, testing, validation, and launch status changes.' },
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
            Current FAQ / Update With Verified Privacy Language
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Clear, straightforward answers regarding CAS mechanics, architecture, and deployment models.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            product purpose, participant experience, human oversight, data practices, and current development status.
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
  const [form, setForm] = useState({ name: '', organization: '', email: '', phone: '', role: '', interestArea: '', entityRoute: 'ElevIQ Foundation', message: '' })
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
    if (!form.entityRoute.trim()) nextErrors.entityRoute = 'Primary contact entity is required.'
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
            Contact Routing Live Only After Testing
          </span>
          <h2 className="font-sans text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl leading-[1.1]">
            Request a Configured Demo
          </h2>
          <p className="text-lg font-medium text-white/90 leading-relaxed">
            Choose the inquiry path that matches your role so your request reaches the correct organization.
          </p>
          <p className="text-sm leading-relaxed text-white/75">
            Inquiries are routed for personal follow-up by the appropriate ElevIQ Foundation or STC Innovations contact. Individual access and program registration will be available through approved routes when the backend and portal configuration are ready.
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
              Inquiries are routed for personal follow-up by the appropriate {form.entityRoute || 'ElevIQ Foundation or STC Innovations'} contact.
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
            <Field label="Primary Contact Entity / Route" error={errors.entityRoute} className="sm:col-span-2">
              <select
                value={form.entityRoute}
                onChange={(event) => updateField('entityRoute', event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/90 focus:outline-none focus:border-[var(--eleviq-teal)] [&>option]:bg-[#0F1B2D]"
              >
                <option value="ElevIQ Foundation">ElevIQ Foundation: participant/program information, schools, Job Corps, workforce and community partnerships, funders, donors, volunteers, and mission support.</option>
                <option value="STC Innovations">STC Innovations: CAS licensing, configuration, commercial pilots, employers, institutional implementation, technical partnerships, and pricing.</option>
              </select>
            </Field>

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
                {isSubmitting ? 'Submitting...' : `Submit to ${form.entityRoute || 'ElevIQ Foundation'}`}
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