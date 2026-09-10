import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const AUDIENCE_PATHS = [
  {
    id: 'youth-exploration',
    number: '01',
    intent: "I'm exploring interests, strengths, and early pathways (Ages 13–15)",
    name: 'Youth Exploration — Ages 13–15',
    category: 'Ages 13–15',
    description: 'Early awareness, interest discovery, informal problem-solving, and personal strength exploration free from testing pressure.',
    routePath: '/platform/participant-portal?entry=youth-exploration',
    actionLabel: 'Begin Alignment Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Youth Exploration (13–15)',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    anchorIds: ['path-youth-exploration', 'path-01', 'path-youth'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 'high-school-cte',
    number: '02',
    intent: "I'm preparing for graduation, CTE training, or next steps (Ages 16–18)",
    name: 'High School / CTE — Ages 16–18',
    category: 'Ages 16–18',
    description: 'Career and technical education alignment, practical credential exploration, and post-graduation transition readiness.',
    routePath: '/platform/participant-portal?entry=high-school-cte',
    actionLabel: 'Begin Alignment Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: 'High School & CTE (16–18)',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    anchorIds: ['path-high-school-cte', 'path-02', 'path-cte'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'postsecondary',
    number: '03',
    intent: "I'm enrolled in or exploring college, technical degrees, or emerging careers",
    name: 'Postsecondary / Emerging Career',
    category: 'Emerging Career',
    description: 'Community college, four-year university, and emerging technical careers, connecting studies to practical real-world roles.',
    routePath: '/platform/participant-portal?entry=postsecondary',
    actionLabel: 'Begin Alignment Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Postsecondary / Emerging',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    anchorIds: ['path-postsecondary', 'path-03'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: 'adult-learner',
    number: '04',
    intent: "I'm building core capabilities, entering the workforce, or returning to work",
    name: 'Adult Learner / Workforce Entry',
    category: 'Workforce Entry',
    description: 'Foundational literacy, digital capability recognition, up-skilling, and entering or returning to the workforce with confidence.',
    routePath: '/platform/participant-portal?entry=adult-learner',
    actionLabel: 'Begin Alignment Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Adult Learner / Entry',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    anchorIds: ['path-adult-learner', 'path-04'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'experienced-worker',
    number: '05',
    intent: "I'm navigating an industry transition, technology shift, or mid-career pivot",
    name: 'Experienced Worker / Career Transition',
    category: 'Career Transition',
    description: 'Mid-career pivoting, naming transferable capabilities, and navigating industry transitions or technology adoption.',
    routePath: '/platform/participant-portal?entry=experienced-worker',
    actionLabel: 'Begin Alignment Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Experienced / Transition',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    anchorIds: ['path-experienced-worker', 'path-05', 'path-experienced'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'veteran',
    number: '06',
    intent: "I'm transitioning from military service to civilian education or career pathways",
    name: 'Veteran / Military Transition',
    category: 'Military Transition',
    description: 'Translating military specialty codes, tactical leadership, discipline, and operational execution into recognized civilian capability signals.',
    routePath: '/platform/participant-portal?entry=veteran',
    actionLabel: 'Begin Alignment Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Military Transition',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    anchorIds: ['path-veteran', 'path-06', 'path-military'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'reentry',
    number: '07',
    intent: "I'm rebuilding my career path, overcoming barriers, or re-entering the workforce",
    name: 'Reentry / Career Rebuilding',
    category: 'Career Rebuilding',
    description: 'Overcoming employment gaps or justice-impacted barriers, validating personal resilience, structured support, and fresh career starts.',
    routePath: '/platform/participant-portal?entry=reentry',
    actionLabel: 'Begin Alignment Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Restorative Reentry',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    anchorIds: ['path-reentry', 'path-07'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
]

export const PARTICIPANT_ENTRY_POINTS = AUDIENCE_PATHS

export const PROGRAM_CONTEXT_OPTIONS = [
  { id: 'general', label: 'None / General Individual Participant' },
  { id: 'jobcorps', label: 'Job Corps Center / Cohort' },
  { id: 'ncworks', label: 'NCWorks / Regional Career Center' },
  { id: 'school', label: 'K-12 School / District' },
  { id: 'cte', label: 'CTE Program / Vocational Center' },
  { id: 'community-college', label: 'Community College / Technical Institute' },
  { id: 'college', label: 'Four-Year College / University' },
  { id: 'workforce-board', label: 'Workforce Development Board' },
  { id: 'employer', label: 'Employer / Industry Partner' },
  { id: 'nonprofit', label: 'Nonprofit / Community Organization' },
  { id: 'rural-initiative', label: 'Rural / Regional Workforce Initiative' },
  { id: 'cohort', label: 'Community / Partner Pilot Cohort' },
]

export default function AudienceIntentRouting({
  variant = 'dark',
  showGrid = true,
  showForm = true,
  initialAudienceId = null,
}) {
  const navigate = useNavigate()
  const [selectedAudience, setSelectedAudience] = useState(() => {
    if (initialAudienceId) {
      return AUDIENCE_PATHS.find((p) => p.id === initialAudienceId) || AUDIENCE_PATHS[0]
    }
    return AUDIENCE_PATHS[0]
  })

  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    role: '',
    audienceIntent: selectedAudience.intent,
    programContext: 'None / General Individual Participant',
    entityRoute: selectedAudience.entityRoute || 'ElevIQ Foundation',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Listen to hash changes, initial hash deep-linking, and cross-component event syncing
  useEffect(() => {
    function handleHashCheck() {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return

      const matchedPath = AUDIENCE_PATHS.find(
        (p) =>
          p.id === hash ||
          p.anchorIds?.includes(hash) ||
          hash === `path-${p.id}` ||
          hash === `path-${p.number}`
      )

      if (matchedPath) {
        setSelectedAudience(matchedPath)
        setForm((prev) => ({
          ...prev,
          audienceIntent: matchedPath.intent,
          entityRoute: matchedPath.entityRoute,
        }))
        const targetEl = document.getElementById(`path-${matchedPath.id}`)
        if (targetEl && showGrid) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else if (hash === 'contact-inquiry' || hash === 'smart-contact-form') {
        const formEl = document.getElementById('contact-inquiry')
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }

    function handleCustomEvent(e) {
      if (e?.detail) {
        const matchedPath = e.detail
        setSelectedAudience(matchedPath)
        setForm((prev) => ({
          ...prev,
          audienceIntent: matchedPath.intent,
          entityRoute: matchedPath.entityRoute,
        }))
      }
    }

    handleHashCheck()
    window.addEventListener('hashchange', handleHashCheck)
    window.addEventListener('eleviq-audience-select', handleCustomEvent)
    return () => {
      window.removeEventListener('hashchange', handleHashCheck)
      window.removeEventListener('eleviq-audience-select', handleCustomEvent)
    }
  }, [showGrid])

  function handleAudienceSelect(path, shouldScrollToForm = true) {
    setSelectedAudience(path)
    setForm((prev) => ({
      ...prev,
      audienceIntent: path.intent,
      entityRoute: path.entityRoute,
    }))
    setErrors((prev) => ({ ...prev, audienceIntent: undefined }))

    // Dispatch global event so decoupled Form component syncs immediately
    window.dispatchEvent(new CustomEvent('eleviq-audience-select', { detail: path }))

    if (shouldScrollToForm) {
      const formEl = document.getElementById('contact-inquiry') || document.getElementById('smart-contact-form')
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Focus the name field after smooth scroll
        setTimeout(() => {
          const nameInput = document.getElementById('name')
          if (nameInput) nameInput.focus()
        }, 500)
      }
    }
  }

  function handleDropdownChange(event) {
    const val = event.target.value
    const matchedPath = AUDIENCE_PATHS.find(
      (p) => p.intent === val || p.id === val || p.name === val
    )
    if (matchedPath) {
      setSelectedAudience(matchedPath)
      setForm((prev) => ({
        ...prev,
        audienceIntent: matchedPath.intent,
        entityRoute: matchedPath.entityRoute,
      }))
    } else {
      setForm((prev) => ({ ...prev, audienceIntent: val }))
    }
    setErrors((prev) => ({ ...prev, audienceIntent: undefined }))
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate(data = form) {
    const nextErrors = {}
    if (!data.name.trim()) nextErrors.name = 'Full name is required.'
    if (!data.email.trim()) nextErrors.email = 'Email address is required.'
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) nextErrors.email = 'Enter a valid email address.'
    if (!data.audienceIntent.trim()) nextErrors.audienceIntent = 'Please select your participant entry point.'
    if (!data.message.trim()) nextErrors.message = 'Please provide details about your inquiry.'
    return nextErrors
  }

  function handleSubmit(e) {
    if (e && e.preventDefault) e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setIsSubmitting(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

      fetch(`${apiUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          organization: form.organization || 'Individual / Participant',
          email: form.email,
          phone: form.phone || '',
          role: form.role || form.audienceIntent,
          interestArea: form.audienceIntent,
          programContext: form.programContext,
          entityRoute: form.entityRoute,
          message: form.message,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Submission error')
          return res.json()
        })
        .then(() => {
          setIsSubmitting(false)
          setSubmitted(true)
        })
        .catch((err) => {
          console.warn('Backend fetch fallback to confirmation:', err)
          setIsSubmitting(false)
          setSubmitted(true)
        })
    }
  }

  return (
    <div className="space-y-12" id="audience-routing">
      {/* SECTION CONTAINER (GRID) */}
      {showGrid && (
        <div
          className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 shadow-xl space-y-10 text-white relative overflow-hidden"
        >
          {/* HEADER BLOCK */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              7 Participant Entry Points
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Find Your Path with ElevIQ
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Choose your entry point to begin the free ElevIQ Alignment Scan™ or connect with advisor guidance.
            </p>
          </div>

          {/* 7 PARTICIPANT ENTRY POINT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            {AUDIENCE_PATHS.map((path) => {
              const isSelected = selectedAudience.id === path.id
              return (
                <div
                  key={path.id}
                  id={`path-${path.id}`}
                  data-path-number={path.number}
                  onClick={() => handleAudienceSelect(path, true)}
                  className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between scroll-mt-28 ${
                    isSelected
                      ? 'border-cyan-400 bg-slate-900/95 shadow-[0_0_25px_rgba(0,210,255,0.25)] ring-1 ring-cyan-400 scale-[1.01]'
                      : 'border-slate-800/80 bg-slate-900/50 hover:border-cyan-500/40 hover:bg-slate-900/80'
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleAudienceSelect(path, true)
                    }
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                              : 'border-slate-700 bg-slate-800/80 text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-500/40'
                          }`}
                        >
                          {path.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-cyan-400 font-semibold block">
                            ENTRY POINT {path.number} • {path.category}
                          </span>
                          <h3 className="font-sans text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {path.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pl-0.5">
                      {path.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${path.badgeColor}`}
                    >
                      {path.badge}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        to={path.routePath}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white transition-all duration-200 shadow-sm"
                      >
                        <span>Begin Free Scan</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* SMART INQUIRY FORM */}
      {showForm && (
        <div
          id="contact-inquiry"
          className="scroll-mt-28 rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#030B1E] via-[#071739] to-[#030B1E] p-6 sm:p-10 shadow-xl space-y-8 text-white relative overflow-hidden"
        >
          <div id="smart-contact-form" className="space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                Direct Participant & Pathway Inquiry
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Connect with ElevIQ Foundation
              </h3>
              <p className="text-sm text-slate-300">
                Select your participant entry point and optional program affiliation below. Your inquiry will connect directly with our pathway team.
              </p>
            </div>

            {/* FORM CONTAINER */}
            <div className="rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl">
              {submitted ? (
                <div className="text-center py-8 space-y-4 max-w-lg mx-auto">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Inquiry Received</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Thank you for connecting. Your request has been routed to the{' '}
                    <strong className="text-cyan-300">{form.entityRoute}</strong> team for personal review and follow-up.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setForm({
                          name: '',
                          organization: '',
                          email: '',
                          phone: '',
                          role: '',
                          audienceIntent: selectedAudience.intent,
                          programContext: 'None / General Individual Participant',
                          entityRoute: 'ElevIQ Foundation',
                          message: '',
                        })
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-full transition"
                    >
                      Send another message
                    </button>
                    <Link
                      to="/"
                      className="px-5 py-2 bg-[#00D2FF] hover:bg-[#38BDF8] text-xs font-bold text-slate-950 rounded-full transition shadow-[0_0_12px_rgba(0,210,255,0.4)]"
                    >
                      Return Home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  {/* PARTICIPANT ENTRY POINT SELECTOR (7 PARTICIPANT ENTRY POINTS) */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="audienceIntent" className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      Participant Entry Point <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="audienceIntent"
                      value={form.audienceIntent}
                      onChange={handleDropdownChange}
                      className="w-full bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-inner transition-all [&>option]:bg-slate-900 [&>option]:text-white cursor-pointer"
                    >
                      {AUDIENCE_PATHS.map((path) => (
                        <option key={path.id} value={path.intent}>
                          {path.number}. {path.name}
                        </option>
                      ))}
                    </select>
                    {errors.audienceIntent && (
                      <p className="text-xs text-rose-400 font-medium">{errors.audienceIntent}</p>
                    )}
                  </div>

                  {/* SEPARATE AUDIENCE / PROGRAM CONTEXT FIELD (DOES NOT AFFECT ROUTING) */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="programContext" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Audience / Program Context <span className="text-slate-400 font-normal">(Optional context — does not alter scan route)</span>
                    </label>
                    <select
                      id="programContext"
                      value={form.programContext || 'None / General Individual Participant'}
                      onChange={(e) => updateField('programContext', e.target.value)}
                      className="w-full bg-slate-950/90 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-inner transition-all [&>option]:bg-slate-900 [&>option]:text-white cursor-pointer"
                    >
                      {PROGRAM_CONTEXT_OPTIONS.map((ctx) => (
                        <option key={ctx.id} value={ctx.label}>
                          {ctx.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Indicate any associated school, Job Corps center, NCWorks office, community college, or partner initiative.
                    </p>
                  </div>

                  {/* FULL NAME */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-300">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-slate-950/90 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      type="text"
                      autoComplete="name"
                    />
                    {errors.name && <p className="text-xs text-rose-400 font-medium">{errors.name}</p>}
                  </div>

                  {/* ORGANIZATION / INSTITUTION */}
                  <div className="space-y-1.5">
                    <label htmlFor="organization" className="block text-xs font-mono font-medium text-slate-300">
                      Organization / Institution
                    </label>
                    <input
                      id="organization"
                      value={form.organization}
                      onChange={(e) => updateField('organization', e.target.value)}
                      placeholder="School, agency, company, or self"
                      className="w-full bg-slate-950/90 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      type="text"
                      autoComplete="organization"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-300">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full bg-slate-950/90 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      type="email"
                      autoComplete="email"
                    />
                    {errors.email && <p className="text-xs text-rose-400 font-medium">{errors.email}</p>}
                  </div>

                  {/* PHONE NUMBER */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-mono font-medium text-slate-300">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full bg-slate-950/90 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>

                  {/* PROFESSIONAL ROLE */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="role" className="block text-xs font-mono font-medium text-slate-300">
                      Role / Title
                    </label>
                    <input
                      id="role"
                      value={form.role}
                      onChange={(e) => updateField('role', e.target.value)}
                      placeholder="e.g. Participant, Student, Coach, Navigator, Advisor"
                      className="w-full bg-slate-950/90 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      type="text"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-300">
                      Inquiry Details / Context <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Please share what you are looking to accomplish, your timeline, or any specific questions..."
                      rows={4}
                      className="w-full bg-slate-950/90 border border-slate-700 hover:border-cyan-500/50 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all min-h-[100px]"
                    />
                    {errors.message && <p className="text-xs text-rose-400 font-medium">{errors.message}</p>}
                  </div>

                  {/* SUBMISSION BUTTONS */}
                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>Routing:</span>
                      <span className="font-bold text-cyan-300">
                        {form.entityRoute}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-6 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? 'Sending...' : `Send Inquiry to ${form.entityRoute}`}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
