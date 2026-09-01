import { Link } from 'react-router-dom'

export default function WhoElevIqServes({ variant = 'dark', showPartnerBanner = true, showCtas = true }) {
  const isDark = variant === 'dark'

  // The 7 Approved Participant Levels (Section 8)
  const participantLevels = [
    {
      num: '01',
      stage: 'AGES 13–15',
      title: 'Youth Exploration',
      desc: 'Early awareness, interest discovery, informal problem-solving, and personal strength exploration free from testing pressure.',
      badge: 'EXPLORATION',
      focus: 'Early discovery & self-knowledge'
    },
    {
      num: '02',
      stage: 'AGES 16–18',
      title: 'High School & CTE Transitions',
      desc: 'Career and technical education alignment, practical credential exploration, and post-graduation transition readiness.',
      badge: 'TRANSITION',
      focus: 'CTE & vocational alignment'
    },
    {
      num: '03',
      stage: 'VOCATIONAL & TRADE',
      title: 'Vocational & Trade Transitions',
      desc: 'Hands-on skill validation, apprenticeship pathways, trade academies, and practical industry certification alignment.',
      badge: 'VOCATIONAL',
      focus: 'Apprenticeships & trade careers'
    },
    {
      num: '04',
      stage: 'POSTSECONDARY',
      title: 'Postsecondary Emerging Careers',
      desc: 'Community college, four-year university, and emerging technical careers, connecting studies to practical real-world roles.',
      badge: 'EMERGING',
      focus: 'Higher education & technical pathways'
    },
    {
      num: '05',
      stage: 'ADULT LEARNING',
      title: 'Adult Basic Education & Skill Builders',
      desc: 'Foundational literacy, digital capability recognition, up-skilling, and entering or returning to the workforce with confidence.',
      badge: 'SKILL BUILDERS',
      focus: 'Adult education & digital confidence'
    },
    {
      num: '06',
      stage: 'RE-ENTRY & PIVOTS',
      title: 'Workforce Re-entry & Career Pivots',
      desc: 'Overcoming employment gaps or justice-impacted barriers, validating personal resilience, structured support, and fresh career starts.',
      badge: 'RE-ENTRY',
      focus: 'Restorative opportunity & pivots'
    },
    {
      num: '07',
      stage: 'MID-CAREER',
      title: 'Experienced Workers & Mid-Career Explorers',
      desc: 'Mid-career pivoting, naming transferable capabilities, and navigating industry transitions or technology adoption.',
      badge: 'EXPERIENCED',
      focus: 'Transferable capabilities & leadership'
    }
  ]

  return (
    <section
      id="who-we-serve"
      className={`scroll-mt-24 rounded-[32px] p-8 sm:p-12 shadow-xl space-y-8 ${
        isDark
          ? 'border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] text-white'
          : 'border border-slate-200 bg-white text-slate-900'
      }`}
    >
      {/* Section Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#0FA88A]/40 bg-[#0FA88A]/15 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#0FA88A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0FA88A] animate-pulse" />
          PARTICIPANT POPULATIONS
        </span>
        <h2 className={`font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Who ElevIQ Serves
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed font-sans ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Strengths-based capability discovery configured across distinct life and career stages.
        </p>
      </div>

      {/* 7 Participant Levels Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {participantLevels.map((lvl, index) => {
          const isSpan = index === 6 // 7th card spans nicely on wider screens
          return (
            <div
              key={lvl.num}
              className={`flex flex-col justify-between p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${
                isSpan ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''
              } ${
                isDark
                  ? 'bg-[#0B1936]/90 border border-cyan-500/25 hover:border-[#0FA88A] hover:shadow-[0_0_30px_rgba(15,168,138,0.25)] text-white'
                  : 'bg-white border border-slate-200 hover:border-teal-400 hover:shadow-lg text-slate-900'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0FA88A]/20 text-xs font-bold text-[#0FA88A] border border-[#0FA88A]/30 font-mono">
                      {lvl.num}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0FA88A]">
                      {lvl.stage}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider border ${
                    isDark ? 'border-cyan-400/30 bg-cyan-950/60 text-cyan-300' : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}>
                    {lvl.badge}
                  </span>
                </div>

                <div>
                  <h3 className={`font-sans text-lg font-bold tracking-tight group-hover:text-[#0FA88A] transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {lvl.title}
                  </h3>
                  <p className={`text-xs leading-relaxed mt-2 font-sans ${
                    isDark ? 'text-[#BAE6FD]/80' : 'text-slate-600'
                  }`}>
                    {lvl.desc}
                  </p>
                </div>
              </div>

              <div className={`mt-5 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
                isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                <span>Focus: {lvl.focus}</span>
                <span className="text-[#0FA88A] font-semibold">100% Free</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Action CTAs */}
      {showCtas && (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/platform/participant-portal"
            className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 font-bold px-7 py-3 text-xs sm:text-sm shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Begin Free Scan
          </Link>
          <Link
            to="/platform/alignment-pathways"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-white transition-colors px-4 py-2.5 rounded-full border border-cyan-500/30 hover:border-cyan-400 bg-slate-900/60"
          >
            <span>Explore Participant Pathways</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}

      {/* Organizational & Partner Context Distinction Banner */}
      {showPartnerBanner && (
        <div className={`rounded-2xl p-6 sm:p-8 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl ${
          isDark
            ? 'border-cyan-500/25 bg-slate-950/80 text-white'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-2 max-w-3xl">
            <span className="inline-flex rounded-full border border-sky-400/40 bg-sky-500/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-400">
              PARTNER COHORTS & INSTITUTIONAL IMPLEMENTATIONS
            </span>
            <h4 className="font-sans text-base sm:text-lg font-bold">
              Job Corps Cohorts, NCWorks & Workforce System Pathways, K-12 & CTE Programs, and Community Colleges
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed font-sans ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Job Corps centers, high school districts, NCWorks career centers, community colleges, and employers partner with ElevIQ Foundation to deliver configured cohort access and human navigator support. Individual participants move through self-paced reflection, while partner institutions utilize configured cohort tools.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-2">
            <Link
              to="/individuals/programs-partners"
              className="rounded-full bg-[#0FA88A] hover:bg-[#0E957A] text-white text-xs font-bold px-5 py-2.5 shadow-sm transition hover:scale-[1.02] active:scale-[0.98]"
            >
              Partner Programs →
            </Link>
            <Link
              to="/contact"
              className={`rounded-full border text-xs font-semibold px-5 py-2.5 transition hover:scale-[1.02] active:scale-[0.98] ${
                isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-300 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Partner Inquiry
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
