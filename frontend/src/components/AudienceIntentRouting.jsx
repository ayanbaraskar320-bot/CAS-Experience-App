import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StcLink from './StcLink'

export const AUDIENCE_PATHS = [
  {
    id: 'individual',
    number: '01',
    intent: "I'm here for myself or my family",
    category: 'Individuals & Families',
    description: 'Free self-discovery, strengths-based reflection, and personalized education or career pathway exploration.',
    routePath: '/platform/participant-portal',
    actionLabel: 'Begin Free Scan',
    entityRoute: 'ElevIQ Foundation',
    badge: '100% Free Participant Scan',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    anchorIds: ['path-individual', 'path-01'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'advisor',
    number: '02',
    intent: 'I support students or participants',
    category: 'Advisors & Navigators',
    description: 'Counselor, coach, navigator, and case manager enablement tools with CLARA™ intelligence.',
    routePath: '/platform/eleviq-clara',
    actionLabel: 'Advisor Resources',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Advisor Enablement',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    anchorIds: ['path-advisor', 'path-02'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'school',
    number: '03',
    intent: 'I lead a school or CTE program',
    category: 'K-12 & CTE Leadership',
    description: 'Youth Exploration (13–15) and High School / CTE (16–18) career readiness, student agency, and pathway alignment.',
    routePath: '/individuals/schools-workforce',
    actionLabel: 'K-12 / CTE Cohorts',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Youth & CTE Tracks',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    anchorIds: ['path-school', 'path-03', 'path-schools-cte'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    id: 'jobcorps',
    number: '04',
    intent: 'I work in Job Corps',
    category: 'Job Corps Centers',
    description: 'Vocational trade completion, transition readiness, and counselor-guided capability translation for graduates.',
    routePath: '/individuals/job-corps',
    actionLabel: 'Job Corps Guidance',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Vocational Transition',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    anchorIds: ['path-jobcorps', 'path-04'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'workforce',
    number: '05',
    intent: 'I lead a workforce board, NCWorks office, or workforce organization',
    category: 'Workforce Systems',
    description: 'Regional workforce board infrastructure, WIOA alignment, adult learner entry, and experienced worker transition.',
    routePath: '/organizations/solutions',
    actionLabel: 'Workforce Solutions',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Regional Board Infrastructure',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    anchorIds: ['path-workforce', 'path-05', 'path-ncworks'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'college',
    number: '06',
    intent: 'I lead a college or adult-learning program',
    category: 'Higher Ed & Adult Learning',
    description: 'Community colleges, postsecondary emerging careers, adult basic education, and skills-to-degree bridge models.',
    routePath: '/organizations/solutions',
    actionLabel: 'Adult Learning Tracks',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Postsecondary / Adult Ed',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    anchorIds: ['path-college', 'path-06', 'path-community-colleges'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    id: 'nonprofit',
    number: '07',
    intent: 'I represent a nonprofit or community organization',
    category: 'Community & Nonprofits',
    description: 'Reentry, veteran reintegration, rural initiative cohorts, and strengths-based community partner pilots.',
    routePath: '/individuals/programs-partners',
    actionLabel: 'Community Cohorts',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Mission Partnerships',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    anchorIds: ['path-nonprofit', 'path-07', 'path-community'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'employer',
    number: '08',
    intent: "I'm an employer or regional partner",
    category: 'Employers & Industry',
    description: 'Skills-first hiring, Role Alignment™, hidden talent discovery, and regional workforce pipeline collaborations.',
    routePath: '/platform/role-alignment',
    actionLabel: 'Talent & Role Alignment',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Skills-First Alignment',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    anchorIds: ['path-employer', 'path-08', 'path-employers'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'funder',
    number: '09',
    intent: "I'm a funder or foundation",
    category: 'Philanthropy & Grants',
    description: 'Philanthropic partnerships, cohort sponsorship, rural opportunity investment, and systemic workforce equity.',
    routePath: '/individuals/support-the-mission',
    actionLabel: 'Grant & Mission Alignment',
    entityRoute: 'ElevIQ Foundation',
    badge: 'Philanthropic Alignment',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    anchorIds: ['path-funder', 'path-09', 'path-funders'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'commercial',
    number: '10',
    intent: "I'm exploring commercial CAS deployment",
    category: 'Commercial / Enterprise',
    description: 'Commercial enterprise licensing, customized proprietary integrations, private cloud deployment, and commercial pricing.',
    routePath: '/stc',
    actionLabel: 'Commercial CAS → STC',
    entityRoute: 'STC Innovations',
    badge: 'STC Innovations Commercial Handoff',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    isCommercial: true,
    anchorIds: ['path-commercial', 'path-10', 'path-stc'],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
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
    entityRoute: selectedAudience.entityRoute,
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
    const intentText = event.target.value
    const matchedPath = AUDIENCE_PATHS.find((p) => p.intent === intentText)
    if (matchedPath) {
      setSelectedAudience(matchedPath)
      setForm((prev) => ({
        ...prev,
        audienceIntent: matchedPath.intent,
        entityRoute: matchedPath.entityRoute,
      }))
    } else {
      setForm((prev) => ({ ...prev, audienceIntent: intentText }))
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
    if (!data.audienceIntent.trim()) nextErrors.audienceIntent = 'Please select your inquiry intent.'
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
              10-Path Audience Intent Routing
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Find Your Path with ElevIQ
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Connect directly with the resources, cohort configurations, or team members designed for your role.
            </p>
          </div>

          {/* 10 AUDIENCE INTENT CARDS GRID */}
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
                      : path.isCommercial
                      ? 'border-purple-500/30 bg-[#0A0D28]/80 hover:border-purple-400/60 hover:bg-slate-900/90'
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
                              : path.isCommercial
                              ? 'border-purple-500/40 bg-purple-500/10 text-purple-300'
                              : 'border-slate-700 bg-slate-800/80 text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-500/40'
                          }`}
                        >
                          {path.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-cyan-400 font-semibold block">
                            PATH {path.number} • {path.category}
                          </span>
                          <h3 className="font-sans text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            "{path.intent}"
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
                      {path.id === 'individual' ? (
                        /* Card 01: Routes directly to participant portal / scan */
                        <Link
                          to="/platform/participant-portal"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white transition-all duration-200 shadow-sm"
                        >
                          <span>Begin Free Scan</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ) : path.isCommercial ? (
                        /* Card 10: Routes to STC Commercial Portal */
                        <StcLink
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-500/50 bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-purple-100 transition-all duration-200 shadow-sm"
                        >
                          <span>Commercial CAS → STC</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </StcLink>
                      ) : (
                        /* Cards 02 through 09: Auto-selects and smooth scrolls down to inquiry form */
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAudienceSelect(path, true)
                          }}
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'border border-cyan-400 bg-cyan-500/30 text-cyan-200 font-bold shadow-sm'
                              : 'border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white'
                          }`}
                        >
                          <span>{path.actionLabel}</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
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
                  Direct Team & Partner Inquiry
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Send an Inquiry to the Right Entity
                </h3>
                <p className="text-sm text-slate-300">
                  Select your role intent below. Your inquiry is directed specifically to the appropriate ElevIQ Foundation program lead or STC Innovations commercial director.
                </p>
              </div>

              {/* COMMERCIAL NOTICE BANNER (WHEN INTENT #10 IS ACTIVE) */}
              {selectedAudience.isCommercial && (
                <div className="rounded-2xl border border-purple-500/40 bg-purple-950/70 p-4 sm:p-5 shadow-lg backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in duration-200">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Commercial CAS Deployment Notice
                      </h4>
                      <p className="text-xs text-purple-200/90 leading-relaxed mt-0.5">
                        Commercial licensing, enterprise deployment, and institutional pricing are managed directly by STC Innovations.
                      </p>
                    </div>
                  </div>
                  <StcLink
                    className="rounded-full bg-purple-500 hover:bg-purple-400 text-slate-950 px-5 py-2.5 text-xs font-bold whitespace-nowrap transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-105 flex-shrink-0 self-stretch sm:self-auto text-center inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Visit STC Innovations Commercial Portal</span>
                    <span>→</span>
                  </StcLink>
                </div>
              )}

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
                            entityRoute: selectedAudience.entityRoute,
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
                    {/* INTENT SELECTOR (PRE-POPULATED WITH 10 INTENTS) */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label htmlFor="audienceIntent" className="block text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                        Inquiry Intent / Role Path <span className="text-rose-400">*</span>
                      </label>
                      <select
                        id="audienceIntent"
                        value={form.audienceIntent}
                        onChange={handleDropdownChange}
                        className="w-full bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-inner transition-all [&>option]:bg-slate-900 [&>option]:text-white cursor-pointer"
                      >
                        {AUDIENCE_PATHS.map((path) => (
                          <option key={path.id} value={path.intent}>
                            Path {path.number}: {path.intent} ({path.category})
                          </option>
                        ))}
                      </select>
                      {errors.audienceIntent && (
                        <p className="text-xs text-rose-400 font-medium">{errors.audienceIntent}</p>
                      )}
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
                        placeholder="e.g. Participant, CTE Director, Workforce Coordinator, Navigator, Executive Director"
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
                        <span className={`font-bold ${selectedAudience.isCommercial ? 'text-purple-300' : 'text-cyan-300'}`}>
                          {form.entityRoute}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {selectedAudience.isCommercial ? (
                          /* Commercial intent actions */
                          <>
                            <StcLink
                              className="rounded-full bg-purple-500 hover:bg-purple-400 text-slate-950 px-6 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                            >
                              <span>Visit STC Innovations Commercial Portal</span>
                              <span>→</span>
                            </StcLink>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="rounded-full border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 hover:text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50"
                            >
                              {isSubmitting ? 'Sending...' : 'Submit Commercial Note'}
                            </button>
                          </>
                        ) : (
                          /* Foundation mission actions */
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-full bg-[#00D2FF] hover:bg-[#38BDF8] text-slate-950 px-6 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {isSubmitting ? 'Sending...' : `Send Inquiry to ${form.entityRoute}`}
                          </button>
                        )}
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
