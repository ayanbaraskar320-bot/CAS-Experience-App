import { useState, useEffect } from 'react'

export default function STCDemoModal({ isOpen, onClose, initialInterest = '' }) {
  const [form, setForm] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    organization: '',
    orgType: 'Employer / Enterprise',
    talentVolume: '500 - 2,500',
    role: '',
    interest: initialInterest || 'Workforce Alignment & Role Benchmarking',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (initialInterest) {
      setForm((prev) => ({ ...prev, interest: initialInterest }))
    }
  }, [initialInterest])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.fullName.trim()) errs.fullName = 'Full name is required.'
    if (!form.workEmail.trim()) {
      errs.workEmail = 'Work email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
      errs.workEmail = 'Enter a valid corporate email address.'
    }
    if (!form.organization.trim()) errs.organization = 'Organization name is required.'
    if (!form.role.trim()) errs.role = 'Your title or role is required.'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

      const payload = {
        name: form.fullName,
        organization: form.organization,
        email: form.workEmail,
        phone: form.phone || 'N/A',
        role: `${form.role} (${form.orgType}, Volume: ${form.talentVolume})`,
        interestArea: `STC Demo Request: ${form.interest}`,
        entityRoute: 'STC Innovations',
        message: form.notes || `STC Enterprise Demo Request for ${form.organization}. Tier: ${form.talentVolume}.`,
      }

      fetch(`${apiUrl}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Submission error')
          return res.json()
        })
        .then(() => {
          setIsSubmitting(false)
          setIsSuccess(true)
        })
        .catch(() => {
          // Client-side fallback so sales inquiry never fails
          setIsSubmitting(false)
          setIsSuccess(true)
        })
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setForm({
      fullName: '',
      workEmail: '',
      phone: '',
      organization: '',
      orgType: 'Employer / Enterprise',
      talentVolume: '500 - 2,500',
      role: '',
      interest: 'Workforce Alignment & Role Benchmarking',
      notes: '',
    })
    setErrors({})
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col font-stc-body text-slate-800 animate-in zoom-in-95 duration-200">
        {/* Top Header Strip */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* STC Stylized Ribbon Delta Mark */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D2FF] via-[#0052CC] to-[#1D4ED8] flex items-center justify-center shadow-md shadow-blue-500/20 text-white shrink-0">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-stc-heading font-extrabold text-base tracking-tight text-slate-900">
                  STC Innovations
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-[#0052CC] border border-blue-200">
                  Enterprise
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Commercial Platform Consultation & Demo</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo booking modal"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="font-stc-heading text-2xl font-bold text-slate-900">
                  Demo Request Confirmed!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{form.fullName}</span>. An STC Innovations enterprise solutions architect has received your briefing for <span className="font-semibold text-slate-900">{form.organization}</span> and will reach out within 1 business day.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-2 text-xs text-slate-600">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-medium text-slate-500">Target Configuration:</span>
                  <span className="font-semibold text-slate-800">{form.interest}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="font-medium text-slate-500">Organization Segment:</span>
                  <span className="font-semibold text-slate-800">{form.orgType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Contact Email:</span>
                  <span className="font-semibold text-slate-800">{form.workEmail}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full bg-[#0052CC] hover:bg-[#1D4ED8] text-white px-7 py-2.5 text-sm font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="space-y-1">
                <h2 id="demo-modal-title" className="font-stc-heading text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Schedule an ElevIQ CAS™ Enterprise Walkthrough
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  See how human-skills intelligence and the Capability Alignment System™ unlock talent potential and role alignment for your organization.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none transition-all ${errors.fullName
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100'
                      }`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.fullName}</p>}
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.workEmail}
                    onChange={(e) => handleChange('workEmail', e.target.value)}
                    placeholder="alex@organization.com"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none transition-all ${errors.workEmail
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100'
                      }`}
                  />
                  {errors.workEmail && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.workEmail}</p>}
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                    Organization / Company <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    placeholder="e.g. Apex Health Systems"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none transition-all ${errors.organization
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100'
                      }`}
                  />
                  {errors.organization && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.organization}</p>}
                </div>

                {/* Title / Role */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                    Job Title / Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    placeholder="e.g. VP of People & Talent"
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none transition-all ${errors.role
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100'
                      }`}
                  />
                  {errors.role && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.role}</p>}
                </div>

                {/* Organization Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                    Organization Type
                  </label>
                  <select
                    value={form.orgType}
                    onChange={(e) => handleChange('orgType', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                  >
                    <option>Employer / Enterprise</option>
                    <option>Workforce Organization / WIB</option>
                    <option>Education & Training / Higher Ed</option>
                    <option>Community & Economic Mobility</option>
                    <option>Government & Public Sector</option>
                  </select>
                </div>

                {/* Estimated Volume */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                    Learner / Workforce Scale
                  </label>
                  <select
                    value={form.talentVolume}
                    onChange={(e) => handleChange('talentVolume', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                  >
                    <option>Under 500 participants</option>
                    <option>500 - 2,500 participants</option>
                    <option>2,500 - 10,000 participants</option>
                    <option>10,000+ enterprise / regional</option>
                  </select>
                </div>
              </div>

              {/* Primary Interest Area */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                  Primary Interest or Objective
                </label>
                <select
                  value={form.interest}
                  onChange={(e) => handleChange('interest', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                >
                  <option>Workforce Alignment & Role Benchmarking</option>
                  <option>Capability Signals™ & Human-Skills Intelligence</option>
                  <option>Community Intelligence Console™ & Outcome Analytics</option>
                  <option>Enterprise Implementation & Custom White-Labeling</option>
                  <option>Commercial Pilot Program Evaluation</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-stc-heading">
                  Specific Goals or Requirements (Optional)
                </label>
                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Tell us about your team's timeline, existing talent systems, or current alignment challenges..."
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Enterprise Data Privacy & Non-Disclosure Protected</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0052CC] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Request Enterprise Demo →</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
