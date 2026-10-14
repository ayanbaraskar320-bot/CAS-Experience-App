import { INQUIRY_CONFIG } from '../config/inquiry'

/**
 * Dispatches STC demo request inquiries.
 * Delivers directly to inbox via Web3Forms and archives to backend API if active.
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
      subject: `[STC Innovations Demo Request] ${payload.name} (${payload.organization})`,
      from_name: 'STC Innovations Portal',
      name: payload.name,
      email: payload.email,
      phone: payload.phone || 'N/A',
      organization: payload.organization || 'Enterprise Lead',
      role: payload.role || 'N/A',
      interest_area: payload.interestArea || 'Enterprise Demo',
      entity_route: payload.entityRoute || 'STC Innovations',
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
