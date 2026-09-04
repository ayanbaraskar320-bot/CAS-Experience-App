import { ELEVIQ_LINKS } from '../config/links'

export default function EcosystemRelationship({ className = '', variant = 'dark' }) {
  const isLight = variant === 'light'

  return (
    <section
      aria-labelledby="ecosystem-heading"
      className={`rounded-[32px] p-6 sm:p-10 lg:p-12 transition-all duration-300 relative overflow-hidden ${
        isLight
          ? 'bg-gradient-to-b from-[#F5EFE6]/70 via-white to-[#EAF3F3]/60 border border-slate-200/90 shadow-lg text-slate-900'
          : 'bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] border border-cyan-500/25 shadow-2xl text-white'
      } ${className}`}
    >
      {/* Background Decorative Ambient Aura */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0FA88A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E7F82]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0FA88A]/40 bg-[#0FA88A]/10 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#0FA88A] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0FA88A] animate-pulse" />
            ECOSYSTEM ARCHITECTURE
          </div>
          <h2
            id="ecosystem-heading"
            className={`font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            One Mission. Distinct Roles. Shared Infrastructure.
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            A unified capability ecosystem connecting participant self-reflection, community impact, and commercial enterprise deployment through shared, privacy-first technology.
          </p>
        </div>

        {/* 3 Entity Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {/* Card 1: ElevIQ Foundation (Mission & Service) */}
          <article
            className="rounded-[26px] p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-md border group relative overflow-hidden"
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#0F1B2D',
              borderColor: '#0FA88A40',
            }}
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0FA88A] to-[#1E7F82]" />

            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0FA88A]">
                  Entity 01
                </span>
                <span className="inline-flex rounded-full border border-[#0FA88A]/30 bg-[#0FA88A]/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0FA88A]">
                  Mission & Service
                </span>
              </div>

              <div>
                <h3 className={`font-sans text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  ElevIQ Foundation
                </h3>
                <p className="font-mono text-xs font-semibold text-[#1E7F82] mt-0.5">
                  501(c)(3) Nonprofit Arm
                </p>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Focuses on nonprofit programs, participant support, workforce development, education, rural opportunity, community partnerships, philanthropic grants, and mission-aligned implementation.
              </p>

              {/* Key Capabilities Focus */}
              <div className="space-y-2 pt-2 border-t border-slate-200/20">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0FA88A] block">
                  Core Service Focus:
                </span>
                <ul className={`space-y-1.5 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A] shrink-0" />
                    <span>Nonprofit community programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A] shrink-0" />
                    <span>Participant support & advocacy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A] shrink-0" />
                    <span>Workforce development & education</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A] shrink-0" />
                    <span>Rural opportunity & grant execution</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={ELEVIQ_LINKS.individuals}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: '#0FA88A',
                  color: '#FFFFFF',
                }}
              >
                <span>Explore Foundation Programs ↗</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </article>

          {/* Card 2: ElevIQ Capability Alignment System™ (Infrastructure) */}
          <article
            className="rounded-[26px] p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-md border group relative overflow-hidden"
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#1B3A5C',
              borderColor: '#1E7F8260',
            }}
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1E7F82] to-[#00D2FF]" />

            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Entity 02
                </span>
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-950/60 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Shared Infrastructure
                </span>
              </div>

              <div>
                <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                  ElevIQ Capability Alignment System™
                </h3>
                <p className="font-mono text-xs font-semibold text-cyan-200 mt-0.5">
                  CAS Platform Architecture
                </p>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed font-sans text-slate-200">
                Focuses on participant reflection, capability insight, pathways, human-guidance support, and configured organization-facing tools.
              </p>

              {/* Key Capabilities Focus */}
              <div className="space-y-2 pt-2 border-t border-cyan-500/20">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
                  Core Infrastructure Modules:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>Participant self-guided reflection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>Capability Signals™ & insight</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>Alignment Pathways™ & human guidance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>Community Intelligence Console™</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={ELEVIQ_LINKS.platform}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950"
              >
                <span>See CAS Platform Architecture ↗</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </article>

          {/* Card 3: STC Innovations (Commercial Development & Deployment) */}
          <article
            className="rounded-[26px] p-7 flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-md border group relative overflow-hidden"
            style={{
              backgroundColor: isLight ? '#FFFFFF' : '#0F1B2D',
              borderColor: '#1E7F8240',
            }}
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B3A5C] to-[#1E7F82]" />

            <div className="space-y-4 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E7F82]">
                  Entity 03
                </span>
                <span className="inline-flex rounded-full border border-[#1E7F82]/30 bg-[#1E7F82]/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1E7F82]">
                  Commercial & Enterprise
                </span>
              </div>

              <div>
                <h3 className={`font-sans text-xl font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  STC Innovations
                </h3>
                <p className="font-mono text-xs font-semibold text-[#1E7F82] mt-0.5">
                  IP Owner & Commercial Licensor
                </p>
              </div>

              <p className={`text-xs sm:text-sm leading-relaxed font-sans ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Focuses on owning, developing, licensing, configuring, commercializing, and deploying CAS for enterprise and commercial use.
              </p>

              {/* Key Capabilities Focus */}
              <div className="space-y-2 pt-2 border-t border-slate-200/20">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1E7F82] block">
                  Commercial Scope:
                </span>
                <ul className={`space-y-1.5 text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E7F82] shrink-0" />
                    <span>IP ownership & ongoing R&D</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E7F82] shrink-0" />
                    <span>Enterprise CAS licensing & pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E7F82] shrink-0" />
                    <span>Institutional configuration & integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E7F82] shrink-0" />
                    <span>Commercial deployment & support</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#solutions"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: '#1E7F82',
                  color: '#FFFFFF',
                }}
              >
                <span>Explore Enterprise Solutions ↓</span>
              </a>
            </div>
          </article>
        </div>

        {/* Mandatory Policy Statement Box */}
        <div
          className={`rounded-2xl p-5 sm:p-6 border text-center transition-all duration-200 ${
            isLight
              ? 'bg-[#F5EFE6]/90 border-[#1E7F82]/30 text-slate-800'
              : 'bg-[#0B1936]/90 border-cyan-500/30 text-slate-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0FA88A]/20 text-[#0FA88A] shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            <p className="font-sans text-sm sm:text-base font-semibold leading-relaxed">
              "ElevIQ Foundation receives CAS access at no cost for mission-aligned nonprofit work. The ElevIQ Alignment Scan™ remains free for individual participants."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
