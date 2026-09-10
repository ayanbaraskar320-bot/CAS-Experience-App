import React from 'react'
import { Link } from 'react-router-dom'

export default function RuralWorkforce({ variant = 'dark' }) {
  const pillars = [
    {
      num: '01',
      badge: 'ASSET-BASED LENS',
      title: 'Talent & Resilience Are Everywhere',
      description:
        'Rural communities are rich in human capability: practical problem-solving, resilience under pressure, mechanical intuition, adaptability, and deep community judgment. The problem is never a lack of talent—it is that legacy credentials fail to measure lived capability.',
      icon: (
        <svg className="w-5 h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      borderColor: 'border-emerald-500/30',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      num: '02',
      badge: 'STRUCTURAL ACCESS',
      title: 'Addressing Distance & Infrastructure Gaps',
      description:
        'Rural jobseekers face real geographic hurdles: transit deserts, broadband limitations, and dispersed employer hubs. ElevIQ provides self-paced, mobile-friendly discovery that connects directly to local advisors and community support.',
      icon: (
        <svg className="w-5 h-5 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      borderColor: 'border-cyan-500/30',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    },
    {
      num: '03',
      badge: 'RELATIONSHIPS',
      title: 'Building relationships around the people and communities we serve',
      description:
        'ElevIQ Foundation is actively implementing with Kittrell Job Corps while continuing to explore relationships and opportunities across community colleges, workforce organizations, schools, employers, nonprofits, and other community-serving organizations.\n\nEach relationship develops according to its own needs, readiness, and agreed scope.',
      icon: (
        <svg className="w-5 h-5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      borderColor: 'border-sky-500/30',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    },
    {
      num: '04',
      badge: 'ROLE ALIGNMENT',
      title: 'Exploring stronger connections between people and roles',
      description:
        'Where configured for an organization or environment, Role Benchmark discussions and Role Alignment exploration can help create more useful conversations about how participant capability patterns may relate to the needs and expectations surrounding a role.\n\nThe goal is better-informed exploration — not a hiring score or prediction of job performance. CAS does not make final hiring decisions.',
      icon: (
        <svg className="w-5 h-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      borderColor: 'border-teal-500/30',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    },
  ]

  return (
    <section id="rural-workforce" className="scroll-mt-28 space-y-8">
      <div className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden text-white">
        {/* Glow accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* HEADER SECTION */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                RURAL & REGIONAL WORKFORCE STRATEGY
              </span>

              <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-950/50 px-3 py-1 font-mono text-[11px] text-cyan-300">
                Henderson • Warren County • Kerr-Tar Region
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                RURAL & REGIONAL WORKFORCE STRATEGY
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[#00D2FF] font-medium leading-relaxed">
                Exploring what stronger community-rooted workforce pathways can look like
              </p>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              <p>
                ElevIQ Foundation is exploring regional collaboration opportunities that bring workforce, education, community, and employer perspectives into closer conversation around the needs of rural communities.
              </p>
              <p>
                We are beginning close to home in the Henderson/Warren area, where we are exploring what a community-rooted workforce approach could look like and what local problem, population, and partnership structure would make the most sense before implementation.
              </p>
            </div>
          </div>

          {/* 4 REGIONAL WORKFORCE PILLARS */}
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.num}
                className={`rounded-2xl bg-slate-900/80 border ${pillar.borderColor} p-6 shadow-lg hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between space-y-4 group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:border-cyan-400/50 transition-colors">
                        {pillar.icon}
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        PILLAR {pillar.num}
                      </span>
                    </div>
                    <span className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-sans text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER CALLOUT / COHORT CALL TO ACTION */}
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-[#071739] to-slate-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-widest block">
                Partnership Opportunity
              </span>
              <h4 className="font-sans text-lg sm:text-xl font-bold text-white">
                Explore an approach that fits your community or organization
              </h4>
              <div className="space-y-2 text-xs text-slate-300 max-w-xl font-sans leading-relaxed">
                <p>
                  We welcome conversations with organizations interested in exploring practical, locally informed approaches to workforce and talent pathways.
                </p>
                <p>
                  Organizations may explore appropriately scoped cohorts, workshops, or phased implementation opportunities with ElevIQ Foundation.
                </p>
                <p>
                  <strong className="text-white font-semibold">The ElevIQ Alignment Scan™ remains free for individual participants.</strong>
                </p>
                <p>
                  Organizational services, cohort experiences, workshops, configuration, and implementation are developed through separate conversations and require scope confirmation.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/organizations"
                className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-5 py-2.5 text-xs font-bold transition shadow-[0_0_12px_rgba(0,210,255,0.4)]"
              >
                Workforce Solutions →
              </Link>
              <Link
                to="/#contact-inquiry"
                className="rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 text-xs font-semibold transition"
              >
                Contact Regional Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
