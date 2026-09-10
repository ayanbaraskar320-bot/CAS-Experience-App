import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function FounderStory({ isFullPage = false, initialExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)

  useEffect(() => {
    // Check if hash matches tammy story
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'tammy-story' || hash === 'why-eleviq-exists' || hash === 'founder-story' || hash === 'founder') {
        setIsExpanded(true)
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  return (
    <section id="tammy-story" className="scroll-mt-28 space-y-8">
      {/* FOUNDER TEASER & OVERVIEW CARD */}
      <div className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden text-white">
        {/* Glow background accent */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 rounded-full bg-[#0FA88A]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* BADGES & LOCATION HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                FOUNDER PERSPECTIVE
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1 font-mono text-[11px] font-medium text-emerald-300">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Henderson, North Carolina
              </span>
            </div>

            <span className="font-mono text-xs text-slate-400 font-medium">
              Tammy Watson • Founder, ElevIQ Foundation
            </span>
          </div>

          {/* MAIN HEADLINE */}
          <div className="space-y-2">
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Why I Built ElevIQ
            </h2>
            <p className="font-mono text-xs sm:text-sm text-cyan-300 font-semibold uppercase tracking-wider">
              Moving from credential proxies to recognized human capability
            </p>
          </div>

          {/* TEASER CORE COPY */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4 text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              <p>
                "I learned something important years ago while hiring and training people in healthcare: <strong className="text-white font-semibold">the strongest resume didn't always identify the strongest person.</strong>"
              </p>
              <p className="text-slate-300 text-sm sm:text-base">
                I watched people with the right human capabilities become exceptional technologists once someone gave them the opportunity and training to develop the technical ones.
              </p>
              <p className="text-slate-300 text-sm sm:text-base">
                That experience stayed with me. ElevIQ grew from a simple belief: <strong className="text-cyan-200 font-semibold">people deserve to be seen for more than the credentials, titles, or circumstances a traditional system can see.</strong>
              </p>
            </div>

            {/* QUICK CTA / TOGGLE */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full sm:w-auto rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-6 py-3 text-xs sm:text-sm font-bold transition-all duration-200 shadow-[0_0_20px_rgba(0,210,255,0.35)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                aria-expanded={isExpanded}
              >
                <span>{isExpanded ? "Collapse Tammy's Story" : "Read Tammy's Full Story"}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <Link
                to="/about"
                className="w-full sm:w-auto text-center rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white px-5 py-2.5 text-xs font-semibold transition"
              >
                About Our Foundation →
              </Link>
            </div>
          </div>

          {/* EXPANDABLE FULL FOUNDER NARRATIVE (DRAWER / FULL VIEW) */}
          {isExpanded && (
            <div className="pt-8 border-t border-cyan-500/20 space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
              {/* SUBTITLE */}
              <div className="border-l-4 border-[#0FA88A] pl-4 py-1">
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-white">
                  The Journey Behind the System
                </h3>
                <p className="text-xs sm:text-sm text-cyan-300 font-mono mt-0.5">
                  By Tammy Watson, Founder • ElevIQ Foundation
                </p>
              </div>

              {/* 4 STRUCTURED NARRATIVE BLOCKS */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Block 1: Healthcare Roots */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300">01</span>
                    Healthcare Roots & The Human Factor
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">
                    Mentoring Technologists & Recognizing Lived Judgment
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    During years directing a hospital Neurodiagnostics and sleep-services department, I hired and mentored clinical technologists. Over and over, I saw that applicants with pristine credentials on paper often struggled with the real-world human demands: active communication under pressure, emotional adaptability, critical judgment, and genuine empathy. Meanwhile, individuals working elsewhere in the facility had that judgment in abundance—they just needed the technical bridge.
                  </p>
                </div>

                {/* Block 2: Collaboration & Evolution */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300">02</span>
                    Partnership & Corporate Tool Reshaping
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">
                    Partnering with Cecil Strickland & Sameer Ranjan
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    To solve this at scale, I partnered with Cecil Strickland to form STC Innovations to give back to communities like ours. Working closely with Sameer Ranjan and his engineering team, we rigorously tested, adapted, and re-engineered advanced corporate talent-intelligence tools—stripping away corporate jargon and rigid testing to create a constructive, strengths-based capability architecture built specifically for community environments.
                  </p>
                </div>

                {/* Block 3: Nonprofit Mandate */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300">03</span>
                    The Nonprofit Foundation Mandate
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">
                    Free Individual Participant Access & Low-Barrier Pilot Design
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    We established ElevIQ Foundation as an independent mission vehicle. Through our non-monetary partnership with STC Innovations, ElevIQ Foundation receives full CAS access at no cost for approved mission-aligned work. This guarantees that the ElevIQ Alignment Scan™ remains 100% free for individual participants{/* Privacy/data-practice language pending separate approval */}, while organizational implementation, configuration, and pilots reflect partner scoping.
                  </p>
                </div>

                {/* Block 4: Regional Alignment */}
                <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300">04</span>
                    Asset-Based Community Focus
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">
                    Closing the Last-Mile Distance to Opportunity
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    We start right here in Henderson and Warren County, working alongside schools, Job Corps centers, workforce boards, community colleges, and regional employers. We believe our communities already have the talent they need; our job is simply to give that capability a visible, verifiable language and a clear path forward.
                  </p>
                </div>
              </div>

              {/* ILLUMINATED FEATURED PULL-QUOTE */}
              <div className="relative rounded-2xl border-2 border-[#00D2FF]/40 bg-gradient-to-r from-[#031528] via-[#071F3D] to-[#031528] p-6 sm:p-10 shadow-[0_0_30px_rgba(0,210,255,0.15)] text-center max-w-4xl mx-auto overflow-hidden">
                {/* Quotation Glyph */}
                <div className="text-cyan-400/20 text-6xl sm:text-7xl font-serif absolute top-2 left-6 select-none pointer-events-none">
                  “
                </div>

                <div className="relative z-10 space-y-4">
                  <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-cyan-100 font-normal leading-snug">
                    "What someone has done before doesn't always tell us what they're capable of doing next."
                  </blockquote>

                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />

                  <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium">
                    The core founding principle of ElevIQ Capability Discovery
                  </p>
                </div>
              </div>

              {/* CLOSING VISION BLOCK */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0FA88A]/15 via-slate-900/90 to-cyan-500/15 border border-[#0FA88A]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-sans text-lg sm:text-xl font-bold text-white">
                    "Talent is everywhere. Opportunity isn't. ElevIQ exists to help close the distance between the two."
                  </h4>
                  <p className="text-xs text-slate-300 font-sans">
                    Join us in creating a more transparent, human-centered bridge to meaningful life and career pathways.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/platform/participant-portal"
                    className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-5 py-2 text-xs font-bold transition shadow-sm"
                  >
                    Begin Free Scan
                  </Link>
                  <Link
                    to="/#audience-routing"
                    className="rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 text-xs font-semibold transition"
                  >
                    Partner with Us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
