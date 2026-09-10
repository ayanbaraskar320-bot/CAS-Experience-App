import React from 'react'
import { Link } from 'react-router-dom'
import StcLink from './StcLink'

export function ProductStatusBadge({ status, size = 'sm' }) {
  switch (status) {
    case 'Preview':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-950/60 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          Preview
        </span>
      )
    case 'In Development':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-950/60 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          In Development
        </span>
      )
    case 'Configured':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-950/60 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          Configured
        </span>
      )
    case 'In Testing':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-950/60 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-300 shadow-[0_0_12px_rgba(129,140,248,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          In Testing
        </span>
      )
    case 'Validated':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/40 bg-teal-950/60 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          Validated
        </span>
      )
    case 'Live':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/60 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-medium text-slate-300">
          {status}
        </span>
      )
  }
}

export default function CasTechnologyPreview() {
  const modules = [
    {
      id: 'participant-portal',
      num: '01',
      title: 'Module 01 — Participant Experience',
      subhead: 'Participant Portal — Configured / In Testing',
      scope:
        'The participant experience brings together tools designed to support reflection, capability discovery, and pathway exploration.',
      emphasizedLine: 'The ElevIQ Alignment Scan™ is free for individual participants.',
      status: 'In Testing',
      keyTools: [
        'Alignment Scan™',
        'Capability Signals™',
        'Alignment Snapshot™',
        'ElevIQ ARIA™ Reflection'
      ],
      link: '/platform/participant-portal',
      ctaText: 'Launch Participant Portal →',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      glowColor: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="6" y="8" width="36" height="32" rx="6" className="fill-emerald-950/40 stroke-emerald-400/50" />
          <path d="M14 20h20M14 28h14M34 28h0" strokeLinecap="round" />
          <circle cx="34" cy="28" r="2" fill="currentColor" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
          <circle cx="17" cy="14" r="1.5" fill="currentColor" />
          <circle cx="22" cy="14" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'community-console',
      num: '02',
      title: 'Module 02 — Community Intelligence Console™',
      subhead: 'Community Intelligence Console™ — Configured / In Testing | ElevIQ CLARA™ — Configured / Verification Required',
      bodyParagraphs: [
        'The Community Intelligence Console™ is being configured and tested to support appropriate organization and advisor workflows.',
        'ElevIQ CLARA™ is configured for organization, advisor, and staff-facing support. Its exact availability and boundaries must be confirmed for the specific environment before it is described as broadly available, Live, or Validated.'
      ],
      status: 'Configured',
      keyTools: [
        'Community Intelligence Console™',
        'ElevIQ CLARA™ Assistant',
        'Cohort Aggregate Analytics',
        'Support Planning Debriefs'
      ],
      link: '/platform/community-intelligence-console',
      ctaText: 'Explore Console Workflows →',
      borderColor: 'border-amber-500/30 hover:border-amber-400',
      glowColor: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="6" y="6" width="36" height="36" rx="6" className="fill-amber-950/40 stroke-amber-400/50" />
          <path d="M12 36V26M20 36V18M28 36V22M36 36V14" strokeLinecap="round" strokeWidth={2.5} />
          <circle cx="36" cy="14" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'role-alignment',
      num: '03',
      title: 'Role Alignment™ Engine',
      subhead: 'Operational Role Benchmarking & Skills-First Mapping',
      scope:
        'Skills-first role benchmarks, job description alignment, and capability mapping (CAS is not a hiring decision engine).',
      status: 'Configured',
      keyTools: [
        'Role Alignment™ Benchmarks',
        'Operational Capability Map',
        'Job Description Deconstruction',
        'Non-Degree Proxy Frameworks'
      ],
      link: '/platform/role-alignment',
      ctaText: 'Review Role Benchmarking →',
      borderColor: 'border-sky-500/30 hover:border-sky-400',
      glowColor: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <circle cx="24" cy="24" r="18" className="fill-sky-950/40 stroke-sky-400/50" />
          <circle cx="24" cy="24" r="10" strokeDasharray="3 3" />
          <circle cx="24" cy="24" r="4" fill="currentColor" />
          <line x1="24" y1="6" x2="24" y2="12" strokeLinecap="round" />
          <line x1="24" y1="36" x2="24" y2="42" strokeLinecap="round" />
          <line x1="6" y1="24" x2="12" y2="24" strokeLinecap="round" />
          <line x1="36" y1="24" x2="42" y2="24" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'last-mile',
      num: '04',
      title: 'Module 04 — The ElevIQ Last Mile™ & Support Connections',
      subhead: 'Support Connections — In Development / Configured in Parts',
      bodyParagraphs: [
        'The ElevIQ Last Mile™ describes the supported movement from reflection and exploration toward an appropriate practical next step.',
        'Support Connections may help support that movement where confirmed people, resources, programs, relationships, and permissions are available within the specific partner or community context.',
        'Availability and configuration vary by implementation environment.'
      ],
      status: 'In Development',
      keyTools: [
        'Support Connections',
        'The ElevIQ Last Mile™',
        'Barrier Reduction Pathways',
        'Local Employer Warm Handoffs'
      ],
      link: '/platform/last-mile',
      ctaText: 'View Last Mile™ Pathways →',
      borderColor: 'border-indigo-500/30 hover:border-indigo-400',
      glowColor: 'hover:shadow-[0_0_30px_rgba(129,140,248,0.2)]',
      iconSvg: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={1.75}>
          <rect x="6" y="10" width="36" height="28" rx="6" className="fill-indigo-950/40 stroke-indigo-400/50" />
          <path d="M14 24h20M26 18l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} />
          <circle cx="14" cy="24" r="2" fill="currentColor" />
        </svg>
      )
    }
  ]

  const statusDefinitions = [
    {
      badge: 'In Testing',
      meaning:
        'Configured and undergoing active verification to support reflection, capability discovery, and pathway exploration.',
      color: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/50'
    },
    {
      badge: 'Configured',
      meaning:
        'Configured to support appropriate organization, advisor, and cohort workflows within verified partner environments.',
      color: 'border-sky-500/40 text-sky-300 bg-sky-950/50'
    },
    {
      badge: 'In Development',
      meaning:
        'In active design and engineering. Core features and workflows are being built and tested before configuration.',
      color: 'border-amber-500/40 text-amber-300 bg-amber-950/50'
    },
    {
      badge: 'Preview',
      meaning:
        'Demonstration and architecture review available for partner discovery and scope confirmation.',
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/50'
    }
  ]

  return (
    <div className="space-y-[var(--section-gap)]">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 1. SECTION HERO & SYSTEM OVERVIEW */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden text-white space-y-8">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 rounded-full bg-[#0FA88A]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              PRODUCT ARCHITECTURE & CAPABILITY PREVIEW
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 font-mono text-[11px] font-medium text-emerald-300">
              The ElevIQ Alignment Scan™ is free for individual participants
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              ElevIQ Capability Alignment System™ (CAS)
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-medium">
              Purpose-built infrastructure powering capability discovery, advisor intelligence, and regional pathway alignment.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
            The ElevIQ Capability Alignment System provides an exploratory, strengths-based architecture designed to illuminate real human potential. It equips participants with clear self-knowledge and enables frontline navigators, educators, and employers to collaborate around shared capability signals rather than blunt credential filters.
          </p>

          {/* ECOSYSTEM CONTEXT BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-inner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
                Ecosystem & Licensing Framework
              </span>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                ElevIQ Foundation operates CAS at zero cost for mission-aligned initiatives, while STC Innovations provides commercial deployment and enterprise licensing.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                to="/platform/participant-portal"
                className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-5 py-2 text-xs font-bold transition shadow-sm"
              >
                Begin Free Scan
              </Link>
              <StcLink
                className="rounded-full border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-200 px-4 py-2 text-xs font-semibold transition"
              >
                Commercial CAS → STC ↗
              </StcLink>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2. FOUR CAS CORE MODULE SHOWCASES */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#0FA88A]">
              SYSTEM MODULES
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              The Four Pillars of CAS Infrastructure
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-600">
            Configured architecture • Human-in-the-loop workflows
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`rounded-3xl bg-[#0B1936]/90 border ${mod.borderColor} p-6 sm:p-8 shadow-xl transition-all duration-300 ${mod.glowColor} flex flex-col justify-between space-y-6 text-white group`}
            >
              <div className="space-y-4">
                {/* Header with Number, Badge, and Icon */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors">
                      {mod.iconSvg}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-slate-400 block">
                        MODULE {mod.num}
                      </span>
                      <span className="font-mono text-[11px] text-cyan-300">
                        {mod.subhead}
                      </span>
                    </div>
                  </div>

                  {mod.statuses ? (
                    <div className="flex flex-col items-end gap-1.5">
                      {mod.statuses.map((st) => (
                        <ProductStatusBadge key={st} status={st} />
                      ))}
                    </div>
                  ) : (
                    <ProductStatusBadge status={mod.status} />
                  )}
                </div>

                {/* Module Title & Scope */}
                <div className="space-y-2">
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h3>
                  {mod.bodyParagraphs ? (
                    <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {mod.bodyParagraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                      {mod.scope}
                    </p>
                  )}
                  {mod.emphasizedLine && (
                    <p className="text-xs sm:text-sm text-cyan-300 font-semibold leading-relaxed font-sans pt-1">
                      {mod.emphasizedLine}
                    </p>
                  )}
                </div>

                {/* Key Tools / Capabilities */}
                <div className="pt-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Configured Capabilities & Workflows:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.keyTools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] font-sans text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  to={mod.link}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-300 hover:text-white transition-colors group-hover:translate-x-0.5"
                >
                  <span>{mod.ctaText}</span>
                </Link>
                <span className="font-mono text-[10px] text-slate-500">
                  CAS Core Component
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3. PRODUCT STATUS BADGE ARCHITECTURE MATRIX */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 shadow-xl text-white space-y-6">
        <div className="space-y-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">
            PUBLIC CLAIM DISCIPLINE & GOVERNANCE
          </span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-white">
            Product Status Badge Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-3xl">
            To ensure complete transparency and claim discipline, all CAS modules and capabilities display standardized status badges reflecting their deployment readiness.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
          {statusDefinitions.map((def) => (
            <div
              key={def.badge}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <ProductStatusBadge status={def.badge} />
                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                  {def.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. COMPLIANCE & GOVERNANCE SAFEGUARDS */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 space-y-4 text-white">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0FA88A] uppercase tracking-wider">
          <svg className="w-4 h-4 text-[#0FA88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          MANDATORY ACCESS & SCOPE NOTICE
        </div>

        <div className="grid gap-4 md:grid-cols-2 text-xs text-slate-300 font-sans leading-relaxed">
          <p>
            <strong className="text-white">Cohort Configuration Notice:</strong> Feature availability and workflows reflect approved organizational scope and partner cohort configurations. Individual access to the ElevIQ Alignment Scan™ remains unrestricted and free for all participants.
          </p>
          <p>
            <strong className="text-white">Ecosystem Policy Quote:</strong> "ElevIQ Foundation receives CAS access at no cost for mission-aligned nonprofit work. The ElevIQ Alignment Scan™ remains free for individual participants."
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5. COMPLETE PLATFORM DIRECTORY */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-md space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#0FA88A]">
            PLATFORM NAVIGATION
          </span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-slate-900">
            Explore All CAS Platform Sub-Pages
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-sans">
            Direct navigation across all individual, advisor, and ecosystem capability alignment modules.
          </p>
        </div>

        <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Participant Portal', link: '/platform/participant-portal' },
            { title: 'Capability Signals™', link: '/platform/capability-signals' },
            { title: 'Alignment Snapshot™', link: '/platform/alignment-snapshot' },
            { title: 'ElevIQ ARIA™', link: '/platform/eleviq-aria' },
            { title: 'ElevIQ CLARA™', link: '/platform/eleviq-clara' },
            { title: 'Community Intelligence Console™', link: '/platform/community-intelligence-console' },
            { title: 'Alignment Pathways™', link: '/platform/alignment-pathways' },
            { title: 'The ElevIQ Last Mile™', link: '/platform/last-mile' },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-cyan-50/70 border border-slate-200 hover:border-cyan-500 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between group"
            >
              <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                {item.title}
              </span>
              <span className="text-xs sm:text-sm font-bold text-cyan-600 group-hover:text-cyan-800 group-hover:translate-x-1 transition-transform ml-2">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export function CasTechnologyTeaser() {
  const previewCards = [
    {
      num: '01',
      title: 'Module 01 — Participant Experience',
      desc: 'The participant experience brings together tools designed to support reflection, capability discovery, and pathway exploration. The ElevIQ Alignment Scan™ is free for individual participants.',
      status: 'In Testing',
      link: '/platform/participant-portal'
    },
    {
      num: '02',
      title: 'Module 02 — Community Intelligence Console™',
      desc: 'The Community Intelligence Console™ is being configured and tested to support appropriate organization and advisor workflows.',
      status: 'Configured',
      link: '/platform/community-intelligence-console'
    },
    {
      num: '03',
      title: 'Role Alignment™ Engine',
      desc: 'Skills-first role benchmarks and capability mapping (CAS is not a hiring decision engine).',
      status: 'Configured',
      link: '/platform/role-alignment'
    },
    {
      num: '04',
      title: 'Module 04 — The ElevIQ Last Mile™ & Support Connections',
      desc: 'The ElevIQ Last Mile™ describes the supported movement from reflection and exploration toward an appropriate practical next step.',
      status: 'In Development',
      link: '/platform/last-mile'
    }
  ]

  return (
    <section id="cas-technology-preview" className="scroll-mt-24 rounded-[32px] border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 sm:p-12 shadow-xl space-y-8 text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            CAPABILITY ALIGNMENT SYSTEM™ (CAS)
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Technology Behind the Work
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Purpose-built infrastructure powering capability discovery, advisor intelligence, and regional pathway alignment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/platform"
            className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-6 py-3 text-xs sm:text-sm shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            See the Technology Behind the Work →
          </Link>
          <Link
            to="/platform/participant-portal"
            className="rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 px-5 py-3 text-xs sm:text-sm font-semibold transition"
          >
            Begin Free Scan
          </Link>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {previewCards.map((card) => (
          <Link
            key={card.num}
            to={card.link}
            className="flex flex-col justify-between p-5 rounded-2xl bg-[#0B1936]/90 border border-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300 group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold text-slate-400">
                  MODULE {card.num}
                </span>
                {card.statuses ? (
                  <div className="flex flex-col items-end gap-1">
                    {card.statuses.map((st) => (
                      <ProductStatusBadge key={st} status={st} />
                    ))}
                  </div>
                ) : (
                  <ProductStatusBadge status={card.status} />
                )}
              </div>
              <h3 className="font-sans text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {card.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400 group-hover:text-white flex items-center justify-between">
              <span>Preview Module</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Ecosystem & Scope Notice */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 font-sans">
        <p>
          <strong className="text-slate-300">Public Claim Discipline:</strong> Feature availability and workflows reflect approved organizational scope and partner cohort configurations.
        </p>
        <span className="text-[#0FA88A] font-mono text-[11px] shrink-0 font-semibold">
          ✓ The ElevIQ Alignment Scan™ is free for individual participants
        </span>
      </div>
    </section>
  )
}
