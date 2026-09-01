import { Link } from 'react-router-dom'

export default function WhatElevIqDelivers({ variant = 'dark', showCtas = true }) {
  const isDark = variant === 'dark'

  // The 9 Approved Service Lanes (Section 7)
  const serviceLanes = [
    {
      num: '01',
      title: 'Capability Discovery & Guided Reflection',
      desc: 'ElevIQ Alignment Scan™, Experience & Context, Capability Signals™, Alignment Snapshot™, and human-guided reflection or debrief.',
      badge: 'DISCOVERY',
      keyTools: 'Alignment Scan™ • Signals™ • Snapshot™ • Guided Debrief'
    },
    {
      num: '02',
      title: 'Pathway & Next-Step Planning',
      desc: 'Alignment Pathways™, Development Opportunities, education/training exploration, career, service, entrepreneurship, and credential planning.',
      badge: 'PLANNING',
      keyTools: 'Alignment Pathways™ • Development Opportunities • Credentialing'
    },
    {
      num: '03',
      title: 'Support Connections & The ElevIQ Last Mile™',
      desc: 'Supported navigation to trusted programs, training, employers, community resources, and warm handoffs.',
      badge: 'LAST MILE™',
      keyTools: 'Support Connections • Barrier Reduction • Warm Handoffs'
    },
    {
      num: '04',
      title: 'Career Readiness & Story Translation',
      desc: 'Resume translation, career identity, interview communication, professional presence, and workplace-readiness support.',
      badge: 'READINESS',
      keyTools: 'Story Translation • Interview Communication • Presence'
    },
    {
      num: '05',
      title: 'Advisor / Counselor / Navigator Enablement',
      desc: 'Orientation, workflow design, guided-debrief tools, Community Intelligence Console™ workflows, and ElevIQ CLARA™ support.',
      badge: 'ENABLEMENT',
      keyTools: 'ElevIQ CLARA™ • Guided Debrief Tools • Workflow Design'
    },
    {
      num: '06',
      title: 'Program & Cohort Implementation',
      desc: 'Cohort configuration, staff workflow, launch support, QA, review, and reporting for workforce and community settings.',
      badge: 'COHORTS',
      keyTools: 'Cohort Configuration • Staff Workflow • QA & Reporting'
    },
    {
      num: '07',
      title: 'Employer & Talent Pathway Alignment',
      desc: 'Role Benchmark discussions, Role Alignment conversations, and talent-pipeline design. (ElevIQ CAS is not a hiring decision engine).',
      badge: 'ALIGNMENT',
      keyTools: 'Role Benchmarks • Alignment Talks • Pipeline Design'
    },
    {
      num: '08',
      title: 'Rural & Regional Workforce Strategy',
      desc: 'Cross-system facilitation among employers, education, workforce boards, and local supports; service-gap mapping.',
      badge: 'REGIONAL',
      keyTools: 'Cross-System Facilitation • Gap Mapping • Regional Strategy'
    },
    {
      num: '09',
      title: 'Demonstrations, Workshops & Pilot Design',
      desc: 'CAS Interface Preview, discovery workshops, bounded pilot design, scope development, and readiness review.',
      badge: 'PILOTS',
      keyTools: 'CAS Interface Preview • Pilot Scoping • Readiness Review'
    }
  ]

  return (
    <section
      id="services"
      className={`scroll-mt-24 rounded-[32px] p-8 sm:p-12 shadow-xl space-y-8 ${
        isDark
          ? 'border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] text-white'
          : 'border border-slate-200 bg-white text-slate-900'
      }`}
    >
      {/* Section Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-cyan-300 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          SERVICE LANES & IMPLEMENTATION
        </span>
        <h2 className={`font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          What ElevIQ Can Help Deliver
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Services, implementation capabilities, and human-guided delivery models.
        </p>
      </div>

      {/* 9 Service Lanes Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {serviceLanes.map((lane) => (
          <div
            key={lane.num}
            className={`flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${
              isDark
                ? 'bg-[#0B1936]/90 border border-cyan-500/25 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,210,255,0.2)] text-white'
                : 'bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg text-slate-900'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 text-xs font-bold text-cyan-300 border border-cyan-400/30 font-mono">
                  {lane.num}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider border ${
                  isDark ? 'border-cyan-400/30 bg-cyan-950/60 text-cyan-300' : 'border-slate-200 bg-slate-100 text-slate-700'
                }`}>
                  {lane.badge}
                </span>
              </div>

              <div>
                <h3 className={`font-sans text-lg font-bold tracking-tight group-hover:text-cyan-300 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {lane.title}
                </h3>
                <p className={`text-xs leading-relaxed mt-2 font-sans ${
                  isDark ? 'text-[#BAE6FD]/80' : 'text-slate-600'
                }`}>
                  {lane.desc}
                </p>
              </div>
            </div>

            <div className={`mt-5 pt-3 border-t text-[10px] font-mono ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span className="text-cyan-400 font-semibold">Capabilities: </span>
              {lane.keyTools}
            </div>
          </div>
        ))}
      </div>

      {/* Action CTAs */}
      {showCtas && (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/contact"
            className="rounded-full bg-[#0FA88A] hover:bg-[#0E957A] text-white font-bold px-7 py-3 text-xs sm:text-sm shadow-[0_0_20px_rgba(15,168,138,0.4)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Partner With ElevIQ Foundation
          </Link>
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById('delivery-model');
              if (target) target.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-colors px-4 py-2.5 rounded-full border border-slate-700 hover:border-slate-500 bg-slate-900/60 cursor-pointer"
          >
            <span>See the Service Delivery Model</span>
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      )}

      {/* Interactive Delivery Notice */}
      <div className={`rounded-2xl p-6 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md ${
        isDark
          ? 'border-cyan-500/20 bg-slate-950/80 text-slate-300'
          : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <div className="text-xs font-sans leading-relaxed">
          <strong className={isDark ? 'text-white' : 'text-slate-900'}>Implementation Notice: </strong>
          Available workflows and features depend on the approved organizational scope, partner configuration, and initiative stage.
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <Link
            to="/organizations/implementation"
            className="text-xs font-semibold text-[#0FA88A] hover:underline"
          >
            Review Implementation Stages →
          </Link>
        </div>
      </div>
    </section>
  )
}
