import { INQUIRY_CONFIG } from '../config/inquiry'

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

  // 1. Deliver direct email to inbox via Web3Forms
  if (accessKey) {
    const web3formsBody = {
      access_key: accessKey,
      subject: `[ElevIQ Foundation Inquiry] ${payload.interestArea || 'New Inquiry'} - ${payload.name}`,
      from_name: 'ElevIQ Foundation Website',
      name: payload.name,
      email: payload.email,
      phone: payload.phone || 'N/A',
      organization: payload.organization || 'Individual / Participant',
      role: payload.role || 'N/A',
      interest_area: payload.interestArea || 'General Inquiry',
      program_context: payload.programContext || 'N/A',
      entity_route: payload.entityRoute || 'ElevIQ Foundation',
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
      body: JSON.stringify(payload),
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
