import { INQUIRY_CONFIG } from '../config/inquiry.js'

/**
 * Dispatches inquiry form submissions.
 * Attempts delivery via Web3Forms (direct email to inbox) and archives to the backend if accessible.
 *
 * @param {Object} payload Form data
 * @returns {Promise<{ success: boolean, results?: Array }>}
 */
export async function sendInquiry(payload) {
  const accessKey = INQUIRY_CONFIG.web3FormsAccessKey
  const promises = []

  const isSTC = payload.entityRoute === 'STC Innovations' || payload.entityRoute === 'stc'
  const activeAccessKey = isSTC 
    ? (INQUIRY_CONFIG.stcWeb3FormsAccessKey || accessKey)
    : accessKey

  const fullName = payload.fullName || payload.name || 'Anonymous Inquirer'
  const audienceContext = payload.audienceContext !== undefined ? payload.audienceContext : (payload.programContext || '')
  const participantEntryPoint = payload.participantEntryPoint || payload.interestArea || ''
  let formType = (payload.formType || '').toLowerCase()

  if (!formType) {
    if (
      payload.interestArea === 'Funder/donor conversation' ||
      (audienceContext && audienceContext.toLowerCase().includes('philanthropic')) ||
      (payload.role && payload.role.toLowerCase().includes('funder'))
    ) {
      formType = 'sponsorship'
    } else if (audienceContext && audienceContext !== 'None / General Individual Participant') {
      formType = 'organizational-demo'
    } else {
      formType = 'participant'
    }
  }

  let subject = ''
  if (isSTC) {
    subject = `[STC Innovations Commercial Inquiry] ${fullName} (${payload.organization || 'Enterprise'}) - ${payload.interestArea || 'Demo Request'}`
  } else if (formType === 'sponsorship') {
    subject = `[SPONSORSHIP] New Partnership Request: ${fullName}`
  } else if (!audienceContext || audienceContext === 'None / General Individual Participant') {
    subject = `[PARTICIPANT INQUIRY] ${fullName} - ${participantEntryPoint || 'General'}`
  } else {
    subject = `[ORG DEMO] ${audienceContext} - ${fullName}`
  }

  // 1. Deliver direct email to inbox via Web3Forms
  if (activeAccessKey) {
    const web3formsBody = {
      access_key: activeAccessKey,
      subject: subject,
      from_name: isSTC ? 'STC Innovations Commercial Inquiries' : 'ElevIQ Foundation Website',
      name: fullName,
      email: payload.email,
      phone: payload.phone || 'N/A',
      organization: payload.organization || (isSTC ? 'Enterprise Partner' : 'Individual / Participant'),
      role: payload.role || 'N/A',
      interest_area: payload.interestArea || (isSTC ? 'Commercial Demo' : 'General Inquiry'),
      program_context: payload.programContext || 'N/A',
      audience_context: audienceContext,
      participant_entry_point: participantEntryPoint,
      form_type: formType,
      entity_route: isSTC ? 'STC Innovations' : 'ElevIQ Foundation',
      message: payload.message,
      replyto: payload.email,
    }

    promises.push(
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(web3formsBody),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}))
          if (!res.ok || data.success === false) {
            console.warn('[Inquiry Service] Web3Forms response issue:', data)
            throw new Error(data.message || 'Email delivery failed')
          }
          return { provider: 'web3forms', success: true, data }
        })
        .catch((err) => {
          console.warn('[Inquiry Service] Web3Forms fetch failed:', err.message)
          return { provider: 'web3forms', success: false, error: err.message }
        })
    )
  } else {
    console.info(
      `[Inquiry Service] Web3Forms access key not set. Submissions will try local backend archiving. Set VITE_WEB3FORMS_ACCESS_KEY in .env to deliver real emails to ${INQUIRY_CONFIG.targetEmail}.`
    )
  }

  // 2. Also archive to backend server if configured
  const apiUrl = INQUIRY_CONFIG.apiUrl
  promises.push(
    fetch(`${apiUrl}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        fullName,
        audienceContext,
        participantEntryPoint,
        formType,
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error('Backend archiving failed')
        }
        return { provider: 'backend', success: true, data }
      })
      .catch((err) => {
        return { provider: 'backend', success: false, error: err.message }
      })
  )

  const results = await Promise.allSettled(promises)

  return {
    success: true,
    results,
  }
}
