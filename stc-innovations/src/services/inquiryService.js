import { INQUIRY_CONFIG } from '../config/inquiry'

/**
 * Dispatches STC demo request inquiries strictly to commercial intake.
 *
 * @param {Object} payload Form data
 * @returns {Promise<{ success: boolean, results?: Array }>}
 */
export async function sendInquiry(payload) {
  const accessKey = INQUIRY_CONFIG.web3FormsAccessKey
  const promises = []

  // 1. Deliver direct email to STC commercial contacts
  if (accessKey) {
    const web3formsBody = {
      access_key: accessKey,
      subject: `[STC Innovations Commercial Inquiry] ${payload.name} (${payload.organization || 'Enterprise'}) - ${payload.interestArea || 'Demo Request'}`,
      from_name: 'STC Innovations Commercial Inquiries',
      name: payload.name,
      email: payload.email,
      phone: payload.phone || 'N/A',
      organization: payload.organization || 'Enterprise Lead',
      role: payload.role || 'N/A',
      interest_area: payload.interestArea || 'Commercial Demo & Deployment',
      entity_route: 'STC Innovations',
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
            console.warn('[STC Inquiry Service] Web3Forms response issue:', data)
            throw new Error(data.message || 'Email delivery failed')
          }
          return { provider: 'web3forms', success: true, data }
        })
        .catch((err) => {
          console.warn('[STC Inquiry Service] Web3Forms fetch failed:', err.message)
          return { provider: 'web3forms', success: false, error: err.message }
        })
    )
  }

  // 2. Also archive to backend server under STC Innovations route
  const apiUrl = INQUIRY_CONFIG.apiUrl
  promises.push(
    fetch(`${apiUrl}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        entityRoute: 'STC Innovations',
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
