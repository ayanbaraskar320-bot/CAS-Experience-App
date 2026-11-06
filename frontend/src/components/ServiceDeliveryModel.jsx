import React from 'react'

export const DELIVERY_STAGES = [
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
    desc: 'Provide ongoing advisor assistance, cohort enablement, and adaptive check-ins.',
    tag: 'Enablement'
  },
  {
    stage: 'STAGE 6',
    title: 'Learn from participation and service delivery',
    desc: 'Evaluation can include review of participation, service-delivery evidence, participant reflection and feedback, and other indicators approved for the specific program or service environment. The purpose is to learn from the experience, strengthen service delivery, and inform thoughtful next steps.',
    tag: 'Evaluation'
  },
  {
    stage: 'STAGE 7',
    title: 'Sustain or Scale',
    desc: 'Institutionalize high-impact practices, expand regional cohort reach, or transition to sustained local ownership.',
    tag: 'Scaling'
  }
]

export default function ServiceDeliveryModel({ id = 'delivery-model' }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-[32px] border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-8 sm:p-12 shadow-xl space-y-8 text-white"
    >
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

      {/* Connected Stage Rail */}
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

        <div className="hidden lg:grid grid-cols-8 gap-2 p-3 rounded-2xl bg-[#07132D]/90 border border-cyan-500/20 shadow-inner">
          {DELIVERY_STAGES.map((stg, idx) => (
            <div key={stg.stage} className="relative flex flex-col items-center text-center group">
              <div className="flex items-center w-full">
                {idx > 0 && (
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-cyan-500/30 to-cyan-400/60" />
                )}
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center font-mono text-[10px] font-bold text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)] shrink-0 mx-auto group-hover:border-[#00D2FF] group-hover:bg-cyan-500/30 transition-all">
                  {idx}
                </div>
                {idx < DELIVERY_STAGES.length - 1 && (
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
        {DELIVERY_STAGES.map((stg, idx) => (
          <div
            key={stg.stage}
            className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#0B1936]/90 border border-cyan-500/25 hover:border-[#00D2FF] hover:shadow-[0_0_25px_rgba(0,210,255,0.2)] transition-all duration-300 group overflow-hidden"
          >
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
  )
}
