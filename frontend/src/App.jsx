import { createContext, useContext, useMemo, useState, useEffect, useRef, Children, cloneElement } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
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

const REFERENCE_OPTIONS = [
  {
    id: 'apple',
    label: 'Apple-level clarity',
    summary: 'Minimal, generous whitespace',
    theme: { shellMax: '78rem', panelPad: '1.5rem', sectionGap: '1.5rem', tileGap: '1rem', cardMin: '16rem', readingLine: '1.65' },
  },
  {
    id: 'salesforce',
    label: 'Salesforce-level enterprise confidence',
    summary: 'Structured, grid-driven, confident',
    theme: { shellMax: '84rem', panelPad: '1.25rem', sectionGap: '1rem', tileGap: '0.875rem', cardMin: '15.5rem', readingLine: '1.58' },
  },
  {
    id: 'microsoft',
    label: 'Microsoft-level trust',
    summary: 'Calm, conservative, high-legibility',
    theme: { shellMax: '80rem', panelPad: '1.375rem', sectionGap: '1.125rem', tileGap: '0.9375rem', cardMin: '16.5rem', readingLine: '1.62' },
  },
  {
    id: 'palantir',
    label: 'Palantir-level structured intelligence',
    summary: 'Dense, technical, dark-mode-friendly',
    theme: { shellMax: '88rem', panelPad: '1rem', sectionGap: '0.875rem', tileGap: '0.75rem', cardMin: '14rem', readingLine: '1.52' },
  },
  {
    id: 'workday',
    label: 'Workday-level human-capital relevance',
    summary: 'Warm but professional, people-centered',
    theme: { shellMax: '82rem', panelPad: '1.5rem', sectionGap: '1.1rem', tileGap: '0.95rem', cardMin: '16rem', readingLine: '1.64' },
  },
]

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
          '--page-bg': 'var(--soft-sand)',
          '--accent': 'var(--warm-coral)',
          '--accent-soft': 'rgba(232, 115, 74, 0.12)',
          '--surface-soft': 'var(--soft-sand)',
          '--hero-bg-from': 'var(--soft-sand)',
          '--hero-bg-to': '#FFF7EF',
          '--bg-glow-1': 'rgba(232, 115, 74, 0.16)',
          '--bg-glow-2': 'rgba(232, 115, 74, 0.13)',
          '--bg-glow-3': 'rgba(15, 27, 45, 0.08)',
        }
      case 'organizations':
        return {
          '--page-bg': 'var(--sky-mist)',
          '--accent': 'var(--horizon-teal)',
          '--accent-soft': 'rgba(30, 127, 130, 0.12)',
          '--surface-soft': 'var(--sky-mist)',
          '--hero-bg-from': 'var(--deep-lake-blue)',
          '--hero-bg-to': 'var(--midnight-ink)',
          '--bg-glow-1': 'rgba(30, 127, 130, 0.16)',
          '--bg-glow-2': 'rgba(27, 58, 92, 0.13)',
          '--bg-glow-3': 'rgba(15, 27, 45, 0.08)',
        }
      case 'platform':
      default:
        return {
          '--page-bg': 'var(--sky-mist)',
          '--accent': 'var(--eleviq-teal)',
          '--accent-soft': 'rgba(15, 168, 138, 0.12)',
          '--surface-soft': 'var(--sky-mist)',
          '--hero-bg-from': 'var(--midnight-ink)',
          '--hero-bg-to': 'var(--deep-lake-blue)',
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

function useAppTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeContext.Provider')
  }

  return context
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
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

function App() {
  const [reference, setReference] = useState('microsoft')
  const theme = useMemo(() => REFERENCE_OPTIONS.find((option) => option.id === reference)?.theme, [reference])

  return (
    <ThemeContext.Provider value={{ reference, setReference, theme }}>
      <AppShell />
    </ThemeContext.Provider>
  )
}

function AppShell() {
  const { reference, setReference, theme } = useAppTheme()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    return 'platform'
  }, [location.pathname])

  return (
    <SectionTheme variant={variant}>
      <div
        className="min-h-screen flex flex-col bg-[var(--page-bg)] text-[var(--ink)] transition-colors duration-300"
        style={{
          '--shell-max': theme.shellMax,
          '--panel-pad': theme.panelPad,
          '--section-gap': theme.sectionGap,
          '--tile-gap': theme.tileGap,
          '--card-min': theme.cardMin,
          '--reading-line': theme.readingLine,
        }}
      >
        <div className="relative flex-grow flex flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_var(--bg-glow-1),_transparent_68%)]" />
          <div className="pointer-events-none absolute left-[-8rem] top-44 h-72 w-72 rounded-full bg-[radial-gradient(circle,_var(--bg-glow-2),_transparent_72%)] blur-3xl" />
          <div className="pointer-events-none absolute right-[-6rem] top-80 h-64 w-64 rounded-full bg-[radial-gradient(circle,_var(--bg-glow-3),_transparent_72%)] blur-3xl" />
  
          <header
            className={`sticky top-0 z-40 transition-all duration-300 ${
              scrolled
                ? 'border-b border-[var(--line)]/60 bg-[color-mix(in_srgb,_var(--surface)_85%,_transparent)] backdrop-blur-md shadow-sm'
                : 'border-b border-transparent bg-transparent backdrop-blur-none shadow-none'
            }`}
          >
            <div className={`mx-auto w-full max-w-[var(--shell-max)] px-6 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1 flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
                      ElevIQ Capability Alignment System™ / CAS
                    </p>
                    <span className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[var(--muted)]">
                      {location.pathname === '/' ? 'Home' : location.pathname.replaceAll('/', ' ').trim().replaceAll('-', ' ')}
                    </span>
                  </div>
                  <h1 className="max-w-4xl font-sans text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)] md:text-3xl">
                    CAS Experience
                  </h1>
                </div>
    
                <div className="flex items-center justify-between md:justify-end gap-4 flex-wrap">
                  {/* Design Reference selector in header */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] hidden sm:inline">Reference Tone:</span>
                    <select
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                      className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 text-xs text-[var(--ink)] font-medium cursor-pointer transition-all duration-200 hover:border-[var(--accent)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    >
                      {REFERENCE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Desktop Nav */}
                  <nav aria-label="Primary navigation" className="hidden md:flex flex-wrap gap-2 items-center">
                    <AnimatedBackground
                      className="rounded-full bg-[var(--accent-soft)]"
                      transition={{
                        type: 'spring',
                        bounce: 0.15,
                        duration: 0.4,
                      }}
                      enableHover
                    >
                      {TOP_NAV.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.path === '/'}
                          data-id={item.path}
                          className={({ isActive }) =>
                            `rounded-full border px-4 py-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                              isActive
                                ? 'border-[var(--accent)] text-[var(--accent)] font-semibold shadow-sm'
                                : 'border-[var(--line)] bg-[var(--panel)]/70 text-[var(--muted)] hover:text-[var(--ink)]'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </AnimatedBackground>
                  </nav>

                  {/* Mobile Menu Button */}
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] md:hidden transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    aria-label="Toggle navigation menu"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu Panel */}
          <div
            className={`fixed inset-x-0 bottom-0 z-30 bg-[var(--page-bg)]/95 backdrop-blur-xl border-t border-[var(--line)] p-6 transition-all duration-300 md:hidden flex flex-col gap-4 overflow-y-auto ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
            style={{ top: scrolled ? '65px' : '81px' }}
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-2">Navigation</span>
              <AnimatedBackground
                className="rounded-2xl bg-[var(--accent-soft)]"
                transition={{
                  type: 'spring',
                  bounce: 0.15,
                  duration: 0.4,
                }}
                enableHover
              >
                {TOP_NAV.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    data-id={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block w-full rounded-2xl border px-5 py-4 text-base font-medium transition-all duration-200 ${
                        isActive
                          ? 'border-[var(--accent)] text-[var(--accent)] shadow-sm font-semibold'
                          : 'border-[var(--line)] bg-[var(--panel)]/70 text-[var(--muted)] hover:text-[var(--ink)]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </AnimatedBackground>
            </div>
          </div>
  
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

function Card({ title, eyebrow, body, bullets = [], meta, action, variant }) {
  const theme = useSectionTheme()

  const cardContent = (
    <article className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--soft-shadow)] h-full flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--shadow-color)]/25">
      <div>
        {eyebrow ? <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">{eyebrow}</p> : null}
        <h3 className="font-serif text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">{title}</h3>
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
      <section className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(135deg,_var(--hero-bg-from),_var(--hero-bg-to))] p-[var(--panel-pad)] text-[var(--surface)] shadow-[var(--panel-shadow)]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.34em] text-[rgba(255,255,255,0.82)]">Merged Platform Home</span>
            <h2 className="max-w-4xl font-serif text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">One Platform for Capability, Alignment, and Action.</h2>
            <p className="max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.84)] md:text-lg">The ElevIQ Capability Alignment System™ connects participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence in one human-centered infrastructure.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ActionButton action={{ label: 'Explore Your Path', to: '/individuals' }} />
              <ActionButton action={{ label: 'Request a Configured Demo', to: '/organizations/pricing-demo' }} />
              <ActionButton action={{ label: 'See How CAS Works', to: '/platform' }} />
            </div>
          </div>

          <div className="rounded-[28px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] p-5 backdrop-blur">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[rgba(255,255,255,0.72)]">Merged structure</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[rgba(255,255,255,0.88)]">
              <p>Home leads into the Platform, For Individuals, and For Organizations sections.</p>
              <p>All sections share one route shell, one nav, and one design-reference selector.</p>
              <p>Resources, About, and Contact complete the unified platform.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[26px] border border-[var(--line)] bg-[var(--surface)] p-[var(--panel-pad)] shadow-[var(--soft-shadow)]">
        <p className="max-w-5xl text-sm leading-7 text-[var(--muted)]">
          STC Innovations develops, owns, configures, licenses, and commercializes the ElevIQ Capability Alignment System™. ElevIQ Foundation applies CAS through mission-driven access, pilots, community partnerships, participant support, and rural workforce innovation. The ElevIQ Alignment Scan™ remains free for individual participants.
        </p>
      </section>

      <SectionGrid
        cards={[
          {
            eyebrow: 'For Individuals',
            title: 'See Your Strengths. Build Your Next Step.',
            body: 'ElevIQ Foundation helps overlooked talent discover capabilities, understand options, connect with trusted support, and move toward meaningful opportunity.',
            action: { label: 'Explore Your Path', to: '/individuals' },
            variant: 'individuals',
          },
          {
            eyebrow: 'For Organizations',
            title: 'Turn Capability Insight Into Workforce Action.',
            body: 'STC Innovations helps organizations configure the ElevIQ Capability Alignment System™ to support participant pathways, advisor workflows, role alignment, and practical next steps.',
            action: { label: 'Request a Configured Demo', to: '/organizations/pricing-demo' },
            variant: 'organizations',
          },
          {
            eyebrow: 'See the Platform',
            title: 'One Platform for Capability, Alignment, and Action.',
            body: 'The ElevIQ Capability Alignment System™ connects participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence in one human-centered infrastructure.',
            action: { label: 'See How CAS Works', to: '/platform' },
            variant: 'platform',
          },
        ]}
      />

      <section className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-[var(--panel-pad)] shadow-[var(--soft-shadow)]">
        <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">Flow strip</span>
          <span>Alignment Scan™</span>
          <span>→</span>
          <span>Capability Signals™</span>
          <span>→</span>
          <span>Alignment Snapshot™</span>
          <span>→</span>
          <span>ElevIQ ARIA™</span>
          <span>→</span>
          <span>Alignment Pathways™</span>
          <span>→</span>
          <span>Support Connections</span>
          <span>→</span>
          <span>The ElevIQ Last Mile™</span>
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
        <Route path="participant-portal" element={<PlatformSectionPage title="Participant Portal" eyebrow="Participant Portal" lead="This space centers participant reflection, approved insight, and practical next moves without diagnostic framing." actions={[{ label: 'Open Alignment Scan™', to: '/platform/experience-context' }, { label: 'Request Demo', to: '/platform/contact' }]} cards={[
          { eyebrow: 'Participant journey', title: 'Reflection first, then action', body: 'The participant takes the ElevIQ Alignment Scan™, adds Experience & Context, reviews the Capability Signals™, and then opens ARIA for guided reflection before choosing a pathway.', bullets: ['Guided scenario reflection', 'Visible, human-readable language', 'Next-step choices that can be shared with support staff'] },
          { eyebrow: 'Supported handoff', title: 'Connect to people, not predictions', body: 'Support Connections and The ElevIQ Last Mile™ help move the participant from insight to coordination with schools, employers, workforce partners, or family support as appropriate.', bullets: ['Participant-approved insight only', 'Shared next steps', 'No diagnostic framing'] },
        ]} />} />
        <Route path="community-intelligence-console" element={<PlatformSectionPage title="Community Intelligence Console™" eyebrow="Organization side" lead="Staff use participant-approved insight to understand cohort patterns, coordinate responses, and support next-step planning with clarity and care." actions={[{ label: 'Open ElevIQ CLARA™', to: '/platform/eleviq-clara' }, { label: 'Review Role Alignment', to: '/platform/role-alignment' }]} cards={[
          { eyebrow: 'Approved insight', title: 'Participant-approved summaries', body: 'The console shows only shared insight that participants have agreed can inform support planning and organizational review.' },
          { eyebrow: 'Cohort context', title: 'Patterns across groups', body: 'Teams can compare cohort-level signals and note where support offerings or pathways need adjustment.' },
          { eyebrow: 'Coordination', title: 'Next-step orchestration', body: 'Role Alignment, Development Opportunities, and Support Connections stay connected so staff can coordinate without losing the human context.' },
        ]} />} />
        <Route path="eleviq-aria" element={<PlatformSectionPage title="ElevIQ ARIA™" eyebrow="Participant reflection support" lead="ARIA helps participants make sense of the information already in front of them, turning capability language into reflection and practical next steps." actions={[{ label: 'Open Alignment Pathways™', to: '/platform/alignment-pathways' }, { label: 'See Support Connections', to: '/platform/support-connections' }]} cards={[
          { eyebrow: 'What ARIA does', title: 'Supports reflection and navigation', body: 'ARIA helps participants review the Alignment Snapshot™, ask what matters next, and move toward the pathway that feels most practical for the current context.', bullets: ['Guided reflection', 'Plain-language interpretation', 'Next-step clarity'] },
          { eyebrow: 'What ARIA does not do', title: 'No diagnosis, no prediction, no required identity label', body: 'CAS stays centered on capability-alignment infrastructure and human support. It does not claim to define who someone must become.', bullets: ['No diagnostic framing', 'No predictive promise', 'No personality-test language'] },
        ]} />} />
        <Route path="eleviq-clara" element={<PlatformSectionPage title="ElevIQ CLARA™" eyebrow="Organization support companion" lead="CLARA helps staff review participant-approved insight, compare cohort patterns, and coordinate the next step without flattening individual context." actions={[{ label: 'Open Community Console', to: '/platform/community-intelligence-console' }, { label: 'See Development Opportunities', to: '/platform/development-opportunities' }]} cards={[
          { eyebrow: 'Interpretation support', title: 'Translate signals into action', body: 'CLARA helps teams discuss what participant-approved signals mean for support planning, service alignment, and next-step coordination.' },
          { eyebrow: 'Team context', title: 'A shared operating view', body: 'The experience keeps the conversation grounded in cohort patterns, role considerations, and the support network around each participant.' },
          { eyebrow: 'Coordination', title: 'Bring the right people into the plan', body: 'CLARA points staff toward Role Alignment and Development Opportunities so next steps remain practical and visible.' },
        ]} />} />
        <Route path="capability-signals" element={<PlatformSectionPage title="Capability Signals™" eyebrow="Capability language" lead="Capability Signals™ organize participant reflection and Experience & Context into readable themes that can support alignment conversations." actions={[{ label: 'Open Alignment Snapshot™', to: '/platform/alignment-snapshot' }, { label: 'Review Experience & Context', to: '/platform/experience-context' }]} cards={[
          { eyebrow: 'Signal sample', title: 'Self-identified focus areas', body: 'Illustrative sample: planning confidence, support access, and pathway readiness are represented as named signals, not scores.', meta: 'Fictional placeholder data only' },
          { eyebrow: 'Signal sample', title: 'Context notes', body: 'Illustrative sample: family timing, transportation access, and schedule constraints show how the participant’s context shapes the conversation.', meta: 'Configured Sample Environment' },
          { eyebrow: 'Signal use', title: 'Shared language for next steps', body: 'Signals are used to guide reflection, support planning, and cross-team coordination without turning the experience into a verdict.' },
        ]} />} />
        <Route path="alignment-snapshot" element={<PlatformSectionPage title="Alignment Snapshot™" eyebrow="Alignment view" lead="The snapshot presents participant-approved insight in a compact view so participants and staff can talk about next steps with the same language." actions={[{ label: 'Open Alignment Pathways™', to: '/platform/alignment-pathways' }, { label: 'View Interactive Journey', to: '/platform/interactive-journey' }]} cards={[
          { eyebrow: 'Snapshot panel', title: 'Current capability signals', body: 'A readable set of signals highlights the participant’s current focus, context, and support considerations.', meta: 'In Development' },
          { eyebrow: 'Snapshot panel', title: 'Alignment Indicator', body: 'The Alignment Indicator shows whether the current conversation is ready for pathway planning, support coordination, or additional reflection.', meta: 'Illustrative placeholder only' },
          { eyebrow: 'Snapshot panel', title: 'Role Benchmark', body: 'A role benchmark is only meaningful when the source and explanation are visible, so the preview keeps it clearly labeled as fictional.', meta: 'Configured Sample Environment' },
        ]} />} />
        <Route path="alignment-pathways" element={<PlatformSectionPage title="Alignment Pathways™" eyebrow="Path planning" lead="Pathways help participants and staff move from reflection to a concrete next step that matches the current context and available support." actions={[{ label: 'Open Support Connections', to: '/platform/support-connections' }, { label: 'Move to The ElevIQ Last Mile™', to: '/platform/last-mile' }]} cards={[
          { eyebrow: 'Pathway sample', title: 'Participant reflection and action', body: 'A pathway might recommend a reflection check-in, a support connection, or a coordinated conversation with a partner organization.' },
          { eyebrow: 'Pathway sample', title: 'Organization follow-through', body: 'Staff can use pathway notes to determine who should coordinate next and what information should stay participant-approved.' },
          { eyebrow: 'Pathway sample', title: 'Human-centered handoff', body: 'The aim is practical progress with human guidance, not a fixed destination or a forced match label.' },
        ]} />} />
        <Route path="role-alignment" element={<PlatformSectionPage title="Role Alignment" eyebrow="Organization planning" lead="Role Alignment compares participant-approved insight with role benchmarks in a way that keeps source context visible and avoids fixed score language." actions={[{ label: 'See Development Opportunities', to: '/platform/development-opportunities' }, { label: 'Open Community Console', to: '/platform/community-intelligence-console' }]} extra={<div className="grid gap-[var(--tile-gap)] lg:grid-cols-2"><Card eyebrow="Alignment Indicator" title="Readable status, not a verdict" body="An Alignment Indicator helps staff see whether the current conversation is ready for support planning, role conversation, or more reflection." bullets={['Context matters', 'Source is visible', 'No score chasing']} /><Card eyebrow="Role Benchmark" title="Benchmark with explanation" body="A Role Benchmark only appears with source context and explanation so teams understand what informed the comparison." bullets={['Fictional placeholder benchmark', 'Participant-approved insight', 'Transparent source note']} /></div>} />} />
        <Route path="development-opportunities" element={<PlatformSectionPage title="Development Opportunities" eyebrow="Next-step planning" lead="Development Opportunities identify practical support actions, learning steps, and coordination points that help the participant move forward." actions={[{ label: 'Open Support Connections', to: '/platform/support-connections' }, { label: 'Request Demo', to: '/platform/contact' }]} cards={[
          { eyebrow: 'Opportunity sample', title: 'Short-cycle support actions', body: 'A development opportunity might point to a check-in, resource referral, or a scheduling adjustment that removes friction from the next step.' },
          { eyebrow: 'Opportunity sample', title: 'Role readiness planning', body: 'Staff can connect role benchmarks to development support without implying that one path is the only valuable one.' },
          { eyebrow: 'Opportunity sample', title: 'Coordination and ownership', body: 'The next step should make ownership clear so the participant and support team know who is doing what next.' },
        ]} />} />
        <Route path="support-connections" element={<PlatformSectionPage title="Support Connections" eyebrow="Support network" lead="Support Connections show the people, organizations, and handoff points that can help a participant move from insight to action." actions={[{ label: 'Open Life Vector™', to: '/platform/life-vector' }, { label: 'Open The ElevIQ Last Mile™', to: '/platform/last-mile' }]} cards={[
          { eyebrow: 'Support node', title: 'Participant support circle', body: 'This can include family, advisors, school partners, workforce partners, or institutional staff depending on the context.' },
          { eyebrow: 'Support node', title: 'Service handoff', body: 'A support connection becomes useful when the next person knows the context, the current step, and the participant’s preferred direction.' },
          { eyebrow: 'Support node', title: 'The ElevIQ Last Mile™', body: 'The final handoff keeps the process coordinated so insight does not stop at the page.' },
        ]} />} />
        <Route path="experience-context" element={<PlatformSectionPage title="Experience & Context" eyebrow="Participant context" lead="Experience & Context captures the lived conditions that shape reflection, support access, and pathway planning." actions={[{ label: 'Open the Alignment Scan™', to: '/platform/participant-portal' }, { label: 'See Capability Signals™', to: '/platform/capability-signals' }]} cards={[
          { eyebrow: 'Context intake', title: 'What the participant wants the team to understand', body: 'This view records practical context such as timing, access needs, and the conditions that affect next-step planning.', bullets: ['Grounded in lived context', 'Participant-approved', 'Visible to the right people only'] },
          { eyebrow: 'Why it matters', title: 'Context keeps the work human', body: 'Capability alignment stays useful when the team can see the conditions around the participant’s current step and respond accordingly.', bullets: ['Supports better planning', 'Reduces assumptions', 'Improves shared language'] },
        ]} />} />
        <Route path="life-vector" element={<PlatformSectionPage title="Life Vector™" eyebrow="Longitudinal view" lead="Life Vector™ shows the participant’s direction of movement over time so the conversation can stay grounded in progress, context, and choice." actions={[{ label: 'View Interactive Journey', to: '/platform/interactive-journey' }, { label: 'Open Alignment Snapshot™', to: '/platform/alignment-snapshot' }]} cards={[
          { eyebrow: 'Vector sample', title: 'Current direction', body: 'Illustrative sample: the current direction reflects a participant moving from reflection into supported coordination.', meta: 'Fictional placeholder data only' },
          { eyebrow: 'Vector sample', title: 'Change over time', body: 'The view helps staff see whether support access, confidence, or role planning is shifting in a useful direction.' },
          { eyebrow: 'Vector sample', title: 'Next-step pacing', body: 'Life Vector™ gives teams a way to discuss pacing without forcing a rigid trajectory or implied outcome.' },
        ]} />} />
        <Route path="last-mile" element={<PlatformSectionPage title="The ElevIQ Last Mile™" eyebrow="Handoff" lead="The ElevIQ Last Mile™ closes the gap between insight and action by keeping participant, staff, and partner coordination visible." actions={[{ label: 'Request Demo', to: '/platform/contact' }, { label: 'Review Support Connections', to: '/platform/support-connections' }]} extra={<div className="grid gap-[var(--tile-gap)] lg:grid-cols-2"><Card eyebrow="Final coordination" title="Make the next step real" body="The final mile confirms who is responsible, what the participant agreed to share, and what happens next." bullets={['Clear ownership', 'Shared context', 'Participant-centered handoff']} /><Card eyebrow="Follow-through" title="Support after the page" body="The goal is to make the pathway actionable through real human follow-through instead of leaving insight stranded inside a view." bullets={['Coordinated next step', 'Visible support contact', 'Practical closure']} /></div>} />} />
        <Route path="screenshots-preview" element={<ScreenshotsPreviewSection />} />
        <Route path="interactive-journey" element={<InteractiveJourney />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactFormPage />} />
      </Routes>
    </div>
  )
}

function ScreenshotsPreviewSection() {
  const [mode, setMode] = useState('configured')
  const states = {
    configured: 'Configured Sample Environment',
    preview: 'Product Development Preview',
    sandbox: 'In Sandbox Testing',
  }

  return (
    <PlatformSectionPage
      title="Screenshots / Product Preview"
      eyebrow="Screenshots / Product Preview"
      lead="This preview uses fictional placeholder data and clear state labels so nothing appears more finished than it actually is in this build."
      ribbon={states[mode]}
      actions={[
        { label: 'Configured Sample Environment', onClick: () => setMode('configured') },
        { label: 'Product Development Preview', onClick: () => setMode('preview') },
        { label: 'In Sandbox Testing', onClick: () => setMode('sandbox') },
      ]}
      cards={[
        {
          eyebrow: 'Sample screen',
          title: 'Participant snapshot',
          body: 'A fictional participant record shows how the Alignment Snapshot™, Support Connections, and Life Vector™ can sit together in one preview.',
          meta: states[mode],
        },
        {
          eyebrow: 'Sample screen',
          title: 'Organization view',
          body: 'A staff view illustrates cohort context, role alignment notes, and next-step planning without implying a live integration.',
          meta: 'Illustrative placeholder only',
        },
        {
          eyebrow: 'Preview note',
          title: 'State-aware labels',
          body: 'Every non-final state stays visibly labeled so the user can distinguish roadmap, preview, and sandbox content from a finished release.',
          meta: 'Roadmap / In Development',
        },
      ]}
    />
  )
}

function PlatformOverviewPage() {
  return (
    <div className="space-y-[var(--section-gap)]">
      <section className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(135deg,_var(--hero-bg-from),_var(--hero-bg-to))] p-[var(--panel-pad)] text-[var(--surface)] shadow-[var(--panel-shadow)]">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.08)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.34em] text-[rgba(255,255,255,0.82)]">Platform Overview</span>
            <h2 className="max-w-4xl font-serif text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">One Platform for Capability, Alignment, and Action.</h2>
            <p className="max-w-3xl text-base leading-8 text-[rgba(255,255,255,0.84)] md:text-lg">The ElevIQ Capability Alignment System™ connects participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence in one human-centered infrastructure.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ActionButton action={{ label: 'See How CAS Works', to: '/platform' }} />
              <ActionButton action={{ label: 'Request Demo', to: '/contact' }} />
              <ActionButton action={{ label: 'Access Portal', to: '/platform/participant-portal' }} />
            </div>
          </div>

          <div className="rounded-[28px] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] p-5 backdrop-blur">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[rgba(255,255,255,0.72)]">Current state</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[rgba(255,255,255,0.88)]">
              <p>Participant reflection feeds Capability Signals™ and the Alignment Snapshot™.</p>
              <p>ElevIQ ARIA™ supports reflection, while ElevIQ CLARA™ supports staff interpretation.</p>
              <p>Alignment Pathways™, Support Connections, and The ElevIQ Last Mile™ keep next steps practical.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[26px] border border-[var(--line)] bg-[var(--surface)] p-[var(--panel-pad)] shadow-[var(--soft-shadow)]">
        <p className="max-w-5xl text-sm leading-7 text-[var(--muted)]">
          STC Innovations develops, owns, configures, licenses, and commercializes the ElevIQ Capability Alignment System™. ElevIQ Foundation applies CAS through mission-driven access, pilots, community partnerships, participant support, and rural workforce innovation. The ElevIQ Alignment Scan™ remains free for individual participants.
        </p>
      </section>

      <SectionGrid
        cards={[
          { eyebrow: 'For Individuals', title: 'See Your Strengths. Build Your Next Step.', body: 'ElevIQ Foundation helps overlooked talent discover capabilities, understand options, connect with trusted support, and move toward meaningful opportunity.', action: { label: 'Explore Your Path', to: '/individuals' }, variant: 'individuals' },
          { eyebrow: 'For Organizations', title: 'Turn Capability Insight Into Workforce Action.', body: 'STC Innovations helps organizations configure the ElevIQ Capability Alignment System™ to support participant pathways, advisor workflows, role alignment, and practical next steps.', action: { label: 'Request a Configured Demo', to: '/organizations/pricing-demo' }, variant: 'organizations' },
          { eyebrow: 'See the Platform', title: 'One Platform for Capability, Alignment, and Action.', body: 'The ElevIQ Capability Alignment System™ connects participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence in one human-centered infrastructure.', action: { label: 'See How CAS Works', to: '/platform' }, variant: 'platform' },
        ]}
      />

      <section className="rounded-[26px] border border-[var(--line)] bg-[var(--panel)] p-[var(--panel-pad)] shadow-[var(--soft-shadow)]">
        <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">Flow strip</span>
          <span>Alignment Scan™</span>
          <span>→</span>
          <span>Capability Signals™</span>
          <span>→</span>
          <span>Alignment Snapshot™</span>
          <span>→</span>
          <span>ElevIQ ARIA™</span>
          <span>→</span>
          <span>Alignment Pathways™</span>
          <span>→</span>
          <span>Support Connections</span>
          <span>→</span>
          <span>The ElevIQ Last Mile™</span>
        </div>
      </section>
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
  return (
    <nav aria-label="Section navigation" className="overflow-x-auto pb-1 no-scrollbar">
      <div className="flex min-w-max gap-2">
        <AnimatedBackground
          className="rounded-full bg-[var(--accent-soft)]"
          transition={{
            type: 'spring',
            bounce: 0.15,
            duration: 0.4,
          }}
          enableHover
        >
          {tabs.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/platform' || item.path === '/individuals' || item.path === '/organizations'}
              data-id={item.path}
              className={({ isActive }) =>
                `rounded-full border px-4 py-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  isActive
                    ? 'border-[var(--accent)] text-[var(--accent)] font-semibold shadow-sm'
                    : 'border-[var(--line)] bg-[var(--panel)]/70 text-[var(--muted)] hover:text-[var(--ink)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </AnimatedBackground>
      </div>
    </nav>
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
                <span key={item} className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 font-mono text-[9px] text-white/40 tracking-wider">
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
    <SectionShell
      eyebrow="For Individuals"
      title="See Your Strengths. Build Your Next Step."
      lead="ElevIQ Foundation helps overlooked talent discover capabilities, understand options, connect with trusted support, and move toward meaningful opportunity."
      actions={[{ label: 'Explore Your Path', to: '/individuals/how-it-works' }, { label: 'Partner / Donor Information', to: '/contact' }]}
      extra={<SectionGrid cards={[
        { eyebrow: 'Mission', title: 'ElevIQ Foundation', body: 'Mission-driven access, pilots, community partnerships, participant support, and rural workforce innovation.', bullets: ['Participant-centered', 'Community-rooted', 'Practical support'] },
        { eyebrow: 'CAS language', title: 'ElevIQ Alignment Scan™ to next step', body: 'The Alignment Scan™, Capability Signals™, Alignment Snapshot™, ElevIQ ARIA™, Alignment Pathways™, Support Connections, and The ElevIQ Last Mile™ create a guided flow that keeps human support central.' },
        { eyebrow: 'Primary CTA', title: 'Invite collaboration', body: 'Use the platform to connect participants, families, community partners, and mission-aligned supporters around real next steps.', action: { label: 'Request Information', to: '/contact' } },
      ]} />} />
  )
}

function IndividualsHowItWorks() {
  return <SectionShell eyebrow="How It Works" title="Program Entry and Support Flow" lead="Program entry starts with trust, access, and guided reflection, then moves through the CAS flow toward practical support and next-step planning." actions={[{ label: 'Support the Mission', to: '/individuals/support-the-mission' }, { label: 'Request Information', to: '/contact' }]} cards={[{ eyebrow: 'Flow', title: 'ElevIQ Alignment Scan™', body: 'Guided scenario-based reflection starts the process.' }, { eyebrow: 'Flow', title: 'Capability Signals™ and Alignment Snapshot™', body: 'Participant responses and Experience & Context inform a shared view of current support needs.' }, { eyebrow: 'Flow', title: 'ElevIQ ARIA™, Alignment Pathways™, Support Connections, and The ElevIQ Last Mile™', body: 'Participants reflect, choose pathways, connect with support, and move through the handoff.' }]} />
}

function IndividualsWhoWeServe() {
  return <SectionShell eyebrow="Who We Serve" title="People and Communities" lead="The audience spans youth and adult learners, job seekers, and people moving through education, workforce, or reentry pathways." cards={[{ title: 'Youth and high school / CTE', body: 'School-age participants and career-connected learners.' }, { title: 'Job Corps', body: 'Job Corps participants and counselor-supported pathways.' }, { title: 'Higher education and community college', body: 'Students and adult learners who need clearer next-step support.' }, { title: 'Rural job seekers and career changers', body: 'Participants navigating access, transportation, and opportunity constraints.' }, { title: 'Workforce participants', body: 'People moving through employment services and support planning.' }, { title: 'Reentry and justice-impacted adults', body: 'Participants rebuilding direction with trusted support.' }, { title: 'Veterans and transitioning service members', body: 'People moving from service into civilian opportunity.' }, { title: 'Military spouses and families', body: 'Households balancing transition, location, and support access.' }]} actions={[{ label: 'Explore Your Path', to: '/contact' }]} />
}

function IndividualsJobCorps() {
  return <SectionShell eyebrow="Job Corps" title="Job Corps" lead="Initial April 2026 implementation used earlier TalentScan™ for 14 students. The Job Corps-specific CAS, CSS/ESP support, eight CTT pathways, and counselor workflows remain in development and validation." ribbon="Implementation history and validation" actions={[{ label: 'Use My Program Link', to: '/contact' }, { label: 'Support the Mission', to: '/individuals/support-the-mission' }]} cards={[{ title: 'Implementation note', body: 'Use status labels and verified language only when discussing this work.' }, { title: 'Counselor workflows', body: 'Counselor workflows are in development and validation for Job Corps use.' }, { title: 'CTT pathways', body: 'Eight CTT pathways are part of the program context being organized for this section.' }]} />
}

function IndividualsPartnersPilots() {
  return <SectionShell eyebrow="Partners & Pilots" title="Partners, Pilots, and Status Labels" lead="Use status labels to describe relationships without implying unapproved endorsements." actions={[{ label: 'Partner with us', to: '/contact' }]} cards={[{ title: 'Pilot / implementation partner', body: 'Status label only. No unapproved endorsement implied.' }, { title: 'Program partner', body: 'Status label only. No unapproved endorsement implied.' }, { title: 'Technology partner', body: 'Status label only. No unapproved endorsement implied.' }, { title: 'Membership / affiliation / supporter', body: 'Status label only. Use only verified wording and scope.' }]} />
}

function IndividualsSupportMission() {
  return <SectionShell eyebrow="Support the Mission" title="Support Access and Delivery" lead="This section explains how participant access, paper packets, digital access, advisor training, pilot implementation, and partner-delivered support can be organized without universal guarantee claims." actions={[{ label: 'Support the mission', to: '/contact' }]} cards={[{ title: 'Participant access', body: 'Support can be delivered with paper packets or digital access depending on context.' }, { title: 'Advisor training', body: 'Training supports consistent guidance and practical next steps.' }, { title: 'Pilot implementation', body: 'Pilot implementation can be organized with mission-aligned partners and local support.' }, { title: 'Partner-delivered support', body: 'Partner-delivered support can help participants move through the flow.' }]} />
}

function IndividualsTrustGovernance() {
  return <SectionShell eyebrow="Trust & Governance" title="Privacy, Accessibility, Oversight, and Correction" lead="Use verified status only. Keep human oversight, consent, correction, safeguarding, and contact paths visible." actions={[{ label: 'Request Information', to: '/contact' }]} cards={[{ title: 'Privacy and accessibility', body: 'Respect privacy, accessibility, and readable navigation.' }, { title: 'AI support and human oversight', body: 'AI support must stay under human oversight and verification.' }, { title: 'Consent and correction', body: 'Participants should know how to consent, correct, and follow safeguarding or contact paths.' }, { title: 'Verified status only', body: 'Use only verified status language and scope.' }]} />
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
  return <SectionShell eyebrow="For Organizations" title="Turn Capability Insight Into Workforce Action." lead="STC Innovations helps organizations configure the ElevIQ Capability Alignment System™ to support participant pathways, advisor workflows, role alignment, and practical next steps." actions={[{ label: 'Request a Configured Demo', to: '/organizations/pricing-demo' }, { label: 'Schedule implementation discovery', to: '/organizations/implementation' }]} cards={[{ title: 'STC role', body: 'STC Innovations develops, owns, configures, licenses, and commercializes CAS.' }, { title: 'Platform preview', body: 'Use the Platform section to review the routed CAS experience and audience-specific flows.' }, { title: 'Buyer paths', body: 'Employers, workforce agencies, education and Job Corps, coaches and consultants, reentry, skilled trades, healthcare, and institutional buyers can all follow role-appropriate paths.' }]} />
}

function OrganizationsSolutions() {
  return <SectionShell eyebrow="Solutions" title="Buyer-Specific Paths" lead="Each buyer type can review a solution path that matches implementation context and operational needs." cards={[{ title: 'Employers', body: 'Support participant pathways and role alignment.' }, { title: 'Workforce agencies', body: 'Coordinate participant navigation and support workflows.' }, { title: 'Education / Job Corps', body: 'Support student, counselor, and pathway planning workflows.' }, { title: 'Coaches / consultants', body: 'Use CAS to structure support conversations and next steps.' }, { title: 'Reentry', body: 'Support practical planning, context, and follow-through.' }, { title: 'Skilled trades', body: 'Support role alignment and pathway planning.' }, { title: 'Healthcare', body: 'Support human-centered navigation and practical coordination.' }, { title: 'Institutional buyers', body: 'Support participant pathways and organizational intelligence.' }]} actions={[{ label: 'Request a Configured Demo', to: '/organizations/pricing-demo' }]} />
}

function OrganizationsImplementation() {
  return <SectionShell eyebrow="Implementation" title="Discover → Configure → Sandbox → Test → Train → Launch → Measure" lead="Use status labels as you move through implementation. Keep claims scoped to what is actually verified." ribbon="Status labels required" cards={[{ title: 'Discover', body: 'Review needs and context.' }, { title: 'Configure', body: 'Align CAS to the organization use case.' }, { title: 'Sandbox', body: 'Work in a controlled preview state.' }, { title: 'Test', body: 'Validate workflows and support paths.' }, { title: 'Train', body: 'Prepare advisors and operational users.' }, { title: 'Launch', body: 'Release with verified scope.' }, { title: 'Measure', body: 'Track what is approved and observable.' }]} actions={[{ label: 'Schedule implementation discovery', to: '/contact' }, { label: 'Discuss a pilot', to: '/contact' }]} />
}

function OrganizationsPricingDemo() {
  return <SectionShell eyebrow="Pricing / Demo" title="Licensing, Configuration, Implementation, and Support" lead="Separate licensing, configuration, implementation, support, and optional services from nonprofit participant access. Avoid unverified packages or feature claims." actions={[{ label: 'Request a configured demo', to: '/contact' }, { label: 'License CAS', to: '/contact' }]} cards={[{ title: 'Licensing', body: 'Separate licensing terms from configuration and support.' }, { title: 'Implementation', body: 'Implementation work should be quoted and scoped separately.' }, { title: 'Support and optional services', body: 'Keep support and optional services distinct from the base license.' }, { title: 'Nonprofit participant access', body: 'Participant access for nonprofit mission work can be handled separately.' }]} />
}

function OrganizationsSecurityTrust() {
  return <SectionShell eyebrow="Security & Trust" title="Pending Verification Only" lead="Do not publish SOC 2, PenTest, FERPA, encryption, storage, or integration claims without proof, scope, date, and approved language. Use placeholder pending verification language instead." actions={[{ label: 'Schedule implementation discovery', to: '/contact' }]} cards={[{ title: 'Pending verification', body: 'Security details remain pending verification until approved language is available.' }, { title: 'Trust language', body: 'Only verified claims should appear in public material.' }, { title: 'Contact path', body: 'Use the contact form for discussions about scope and verification.' }]} />
}

function ResourcesPage() {
  return <SectionShell eyebrow="Resources" title="Shared Resources" lead="This section holds shared content not tied to one audience. Keep it minimal and placeholder-friendly for now." cards={[{ title: 'General FAQ', body: 'High-level questions about CAS and the merged platform.' }, { title: 'Press', body: 'Shared announcements and media contact paths.' }, { title: 'Trust / governance', body: 'General trust language and verified references.' }]} actions={[{ label: 'Contact', to: '/contact' }]} />
}

function AboutPage() {
  return (
    <SectionShell
      eyebrow="About"
      title="How the Three Identities Relate"
      lead="ElevIQ Foundation, STC Innovations, and CAS work together inside one merged platform."
      actions={[{ label: 'Contact', to: '/contact' }, { label: 'Explore the platform', to: '/platform' }]}
      extra={
        <div className="space-y-6 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--soft-shadow)]">
          <p className="text-sm leading-7 text-[var(--muted)]">
            STC Innovations develops, owns, configures, licenses, and commercializes the ElevIQ Capability Alignment System™. ElevIQ Foundation applies CAS through mission-driven access, pilots, community partnerships, participant support, and rural workforce innovation. The ElevIQ Alignment Scan™ remains free for individual participants.
          </p>
          <blockquote className="my-6 border-l-4 border-[var(--accent)] pl-4 font-serif text-lg italic text-[var(--ink)] leading-8">
            "Connecting participant reflection, capability insight, advisor support, pathway planning, and organizational intelligence in one human-centered infrastructure."
          </blockquote>
          <p className="text-sm leading-7 text-[var(--muted)]">
            This merged site routes audiences into the right section while keeping one platform shell and one design system.
          </p>
        </div>
      }
    />
  )
}

function ContactPage() {
  return <ContactFormPage />
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
          setErrors({ submit: error.message || 'Failed to submit inquiry. Please try again.' });
        });
    }
  }

  return (
    <SectionShell
      eyebrow="Contact"
      title="Contact"
      lead={submitted ? "Submission received." : "Use this merged form to start a conversation about CAS, participant access, organizational use, or partnership planning."}
      actions={submitted ? [{ label: 'Return home', to: '/' }, { label: 'Open Platform', to: '/platform' }] : [{ label: 'Return home', to: '/' }]}
      extra={
        <div className="relative min-h-[450px] transition-all duration-500">
          {/* Form and info panel */}
          <div className={`grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-start transition-all duration-500 transform ${submitted ? 'opacity-0 translate-y-4 pointer-events-none absolute inset-x-0 top-0' : 'opacity-100 translate-y-0'}`}>
            <div className="space-y-4">
              <blockquote className="rounded-[20px] border border-[var(--line)] bg-[var(--surface-soft)]/40 p-5 font-serif text-base italic text-[var(--ink)] leading-7 border-l-4 border-l-[var(--accent)]">
                "The aim of the ElevIQ Capability Alignment System™ is practical progress with human guidance, keeping participant context central to every next step."
              </blockquote>
              <p className="text-xs text-[var(--muted)] leading-5">
                STC Innovations and ElevIQ Foundation coordinate inquiries to align with technical configurations, pilots, and donor options.
              </p>
            </div>
            <form onSubmit={handleSubmit} noValidate className="grid gap-[var(--tile-gap)] rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--soft-shadow)] sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input value={form.name} onChange={(event) => updateField('name', event.target.value)} className="field" type="text" autoComplete="name" />
              </Field>
              <Field label="Organization" error={errors.organization}>
                <input value={form.organization} onChange={(event) => updateField('organization', event.target.value)} className="field" type="text" autoComplete="organization" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input value={form.email} onChange={(event) => updateField('email', event.target.value)} className="field" type="email" autoComplete="email" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input value={form.phone} onChange={(event) => updateField('phone', event.target.value)} className="field" type="tel" autoComplete="tel" />
              </Field>
              <Field label="Role" error={errors.role} className="sm:col-span-2">
                <input value={form.role} onChange={(event) => updateField('role', event.target.value)} className="field" type="text" placeholder="Participant advocate, school leader, employer, donor, or other" />
              </Field>
              <Field label="Interest Area" error={errors.interestArea} className="sm:col-span-2">
                <select value={form.interestArea} onChange={(event) => updateField('interestArea', event.target.value)} className="field">
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
                <textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} className="field min-h-40" rows="6" />
              </Field>
              {errors.submit ? (
                <div className="sm:col-span-2 rounded-2xl border border-[var(--warm)] bg-[var(--warm)]/10 p-4 text-sm text-[var(--warm)] font-medium">
                  {errors.submit}
                </div>
              ) : null}
              <div className="sm:col-span-2 flex flex-wrap gap-3">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] hover:shadow-md hover:brightness-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit inquiry'
                  )}
                </button>
                <Link to="/platform" className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                  Review how CAS works
                </Link>
              </div>
            </form>
          </div>

          {/* Success / confirmation view */}
          <div className={`w-full transition-all duration-500 transform ${submitted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute inset-x-0 top-0'}`}>
            <div className="rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-8 shadow-[var(--soft-shadow)] text-center max-w-2xl mx-auto space-y-5">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] mb-2 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">Thank you!</h3>
              <p className="text-base leading-8 text-[var(--muted)]">
                Thank you. Our team is active and reviewing inquiries. We will follow up directly with current information.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <Link to="/" className="rounded-full border border-[var(--line)] bg-[var(--panel)] px-6 py-2.5 text-sm font-medium text-[var(--ink)] hover:border-[var(--accent)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]">
                  Return home
                </Link>
                <Link to="/platform" className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white hover:brightness-105 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]">
                  Open Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

function Field({ label, error, children, className = '' }) {
  const child = Children.only(children)
  const updatedChild = cloneElement(child, {
    className: `${child.props.className || ''} ${error ? 'border-[var(--warm)]! focus:ring-[var(--warm)]/30' : ''}`
  })

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">{label}</span>
      {updatedChild}
      <div className={`transition-all duration-300 ease-out overflow-hidden ${error ? 'max-h-10 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
        <span className="text-sm text-[var(--warm)] font-medium flex items-center gap-1">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </span>
      </div>
    </label>
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
    <SectionShell eyebrow="FAQ" title="FAQ" lead="Common questions stay focused on the product flow, support boundaries, and how the experience keeps human guidance central." actions={[{ label: openAll ? 'Collapse all' : 'Expand all', onClick: () => setOpenAll((value) => !value) }, { label: 'Open Demo / Contact', to: '/platform/contact' }]} extra={<div className="space-y-3">{faqs.map((item) => (<details key={item.question} open={openAll} className="group rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--soft-shadow)]"><summary className="cursor-pointer list-none font-serif text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">{item.question}</summary><p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">{item.answer}</p></details>))}</div>} />
  )
}

function InteractiveJourney() {
  const steps = ['Participant opens the ElevIQ Alignment Scan™.', 'Experience & Context shapes the capability language.', 'Capability Signals™ and Alignment Snapshot™ are reviewed.', 'ElevIQ ARIA™ supports reflection on the current step.', 'Alignment Pathways™ and Support Connections shape next moves.', 'The ElevIQ Last Mile™ closes the handoff.']
  const [step, setStep] = useState(0)

  return <SectionShell eyebrow="Interactive Journey" title="Interactive Journey" lead="Move through the participant and organization flow one step at a time to see how the pages connect." actions={[{ label: 'Open Participant Portal', to: '/platform/participant-portal' }, { label: 'Request Demo', to: '/platform/contact' }]} extra={<div className="grid gap-[var(--tile-gap)] lg:grid-cols-[0.9fr_1.1fr]"><div className="rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--soft-shadow)]"><p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">Journey step</p><h3 className="mt-3 font-serif text-2xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{step + 1}. {steps[step]}</h3><div className="mt-6 flex flex-wrap gap-2"><button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--ink)] transition hover:border-[var(--accent)]">Previous</button><button type="button" onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))} className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm text-white transition hover:brightness-105">Next</button><button type="button" onClick={() => setStep(0)} className="rounded-full border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-2 text-sm text-[var(--ink)] transition hover:border-[var(--accent)]">Restart</button></div></div><SectionGrid cards={steps.map((entry, index) => ({ eyebrow: `Step ${index + 1}`, title: entry, body: index === step ? 'Active step in the journey.' : 'Upcoming or previous step in the journey.', meta: index === step ? 'Visible state change' : 'Configured Sample Environment' }))} /></div>} />
}

function NotFoundPage() {
  return <SectionShell eyebrow="Not found" title="That route is not available" lead="Use the top-level navigation to return to an available page." actions={[{ label: 'Return home', to: '/' }, { label: 'Open Platform', to: '/platform' }]} />
}

export default App