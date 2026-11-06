import fs from 'fs';

console.log('=== UPDATING STC INNOVATIONS WEBSITE & EMBEDDED STC COMPONENTS ===');

// ============================================================================
// 1. Update frontend/src/config/inquiry.js
// ============================================================================
const feInquiryConfigPath = 'frontend/src/config/inquiry.js';
let feInquiryConfig = fs.readFileSync(feInquiryConfigPath, 'utf8');

if (!feInquiryConfig.includes('stcTargetEmail')) {
  feInquiryConfig = `/**
 * Inquiry & Contact Form Configuration
 */
export const INQUIRY_CONFIG = {
  // Web3Forms Access Key for info@eleviqfoundation.org (ElevIQ Foundation intake)
  web3FormsAccessKey: '9949e474-6db6-4851-aab1-072aecbf8c16',
  targetEmail: 'info@eleviqfoundation.org',

  // STC Innovations Commercial Intake
  stcWeb3FormsAccessKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STC_WEB3FORMS_ACCESS_KEY) || '',
  stcTargetEmail: 'commercial@stc-innovations.com',

  // Backend API URL for database archiving
  apiUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000',
}
`;
  fs.writeFileSync(feInquiryConfigPath, feInquiryConfig, 'utf8');
  console.log('Updated frontend/src/config/inquiry.js');
}

// ============================================================================
// 2. Update frontend/src/services/inquiryService.js
// ============================================================================
const feInquiryServicePath = 'frontend/src/services/inquiryService.js';
let feInquiryService = fs.readFileSync(feInquiryServicePath, 'utf8');

const targetServiceBlock = `  // 1. Deliver direct email to inbox via Web3Forms
  if (accessKey) {
    const web3formsBody = {
      access_key: accessKey,
      subject: \`[ElevIQ Foundation Inquiry] \${payload.interestArea || 'New Inquiry'} - \${payload.name}\`,
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
    }`;

const replaceServiceBlock = `  const isSTC = payload.entityRoute === 'STC Innovations' || payload.entityRoute === 'stc'
  const activeAccessKey = isSTC 
    ? (INQUIRY_CONFIG.stcWeb3FormsAccessKey || accessKey)
    : accessKey

  // 1. Deliver direct email to inbox via Web3Forms
  if (activeAccessKey) {
    const web3formsBody = {
      access_key: activeAccessKey,
      subject: isSTC
        ? \`[STC Innovations Commercial Inquiry] \${payload.name} (\${payload.organization || 'Enterprise'}) - \${payload.interestArea || 'Demo Request'}\`
        : \`[ElevIQ Foundation Inquiry] \${payload.interestArea || 'New Inquiry'} - \${payload.name}\`,
      from_name: isSTC ? 'STC Innovations Commercial Inquiries' : 'ElevIQ Foundation Website',
      name: payload.name,
      email: payload.email,
      phone: payload.phone || 'N/A',
      organization: payload.organization || (isSTC ? 'Enterprise Partner' : 'Individual / Participant'),
      role: payload.role || 'N/A',
      interest_area: payload.interestArea || (isSTC ? 'Commercial Demo' : 'General Inquiry'),
      program_context: payload.programContext || 'N/A',
      entity_route: isSTC ? 'STC Innovations' : 'ElevIQ Foundation',
      message: payload.message,
      replyto: payload.email,
    }`;

if (feInquiryService.includes(targetServiceBlock)) {
  feInquiryService = feInquiryService.replace(targetServiceBlock, replaceServiceBlock);
  fs.writeFileSync(feInquiryServicePath, feInquiryService, 'utf8');
  console.log('Updated frontend/src/services/inquiryService.js (LF)');
} else if (feInquiryService.includes(targetServiceBlock.replace(/\n/g, '\r\n'))) {
  feInquiryService = feInquiryService.replace(targetServiceBlock.replace(/\n/g, '\r\n'), replaceServiceBlock.replace(/\n/g, '\r\n'));
  fs.writeFileSync(feInquiryServicePath, feInquiryService, 'utf8');
  console.log('Updated frontend/src/services/inquiryService.js (CRLF)');
}

// ============================================================================
// 3. Update stc-innovations/src/config/inquiry.js
// ============================================================================
const stcInquiryConfigPath = 'stc-innovations/src/config/inquiry.js';
if (fs.existsSync(stcInquiryConfigPath)) {
  const stcInquiryConfigContent = `/**
 * Inquiry & Contact Form Configuration for STC Innovations
 * Strictly isolated for commercial inquiries and enterprise consultations.
 */
export const INQUIRY_CONFIG = {
  // Commercial intake access key (configured via VITE_STC_WEB3FORMS_ACCESS_KEY)
  web3FormsAccessKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STC_WEB3FORMS_ACCESS_KEY) || '',

  // Dedicated commercial intake target email
  targetEmail: 'commercial@stc-innovations.com',

  // Backend API URL for database archiving
  apiUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000',
}
`;
  fs.writeFileSync(stcInquiryConfigPath, stcInquiryConfigContent, 'utf8');
  console.log('Updated stc-innovations/src/config/inquiry.js');
}

// ============================================================================
// 4. Update stc-innovations/src/config/links.js
// ============================================================================
const stcLinksConfigPath = 'stc-innovations/src/config/links.js';
if (fs.existsSync(stcLinksConfigPath)) {
  const stcLinksContent = `/**
 * Centralized links configuration for STC Innovations
 * Connects the commercial site back to the ElevIQ Foundation platform.
 */
const rawElevIqUrl = import.meta.env.VITE_ELEVIQ_URL || 'https://eleviqfoundation.org'
export const ELEVIQ_BASE_URL = rawElevIqUrl.replace(/\\/+$/, '')

/**
 * Returns full URL to a specific route on the ElevIQ Foundation site
 * @param {string} path Route path
 * @returns {string} Fully qualified URL
 */
export function getElevIqUrl(path = '/') {
  const cleanPath = path.startsWith('/') ? path : \`/\${path}\`
  return \`\${ELEVIQ_BASE_URL}\${cleanPath}\`
}

export const ELEVIQ_LINKS = {
  home: getElevIqUrl('/'),
  faqs: getElevIqUrl('/faqs'),
  about: getElevIqUrl('/about'),
  individuals: getElevIqUrl('/faqs'),
  platform: getElevIqUrl('/faqs'),
  contact: getElevIqUrl('/contact'),
}
`;
  fs.writeFileSync(stcLinksConfigPath, stcLinksContent, 'utf8');
  console.log('Updated stc-innovations/src/config/links.js');
}

// ============================================================================
// 5. Update stc-innovations/src/services/inquiryService.js
// ============================================================================
const stcInquiryServicePath = 'stc-innovations/src/services/inquiryService.js';
if (fs.existsSync(stcInquiryServicePath)) {
  const stcServiceContent = `import { INQUIRY_CONFIG } from '../config/inquiry'

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
      subject: \`[STC Innovations Commercial Inquiry] \${payload.name} (\${payload.organization || 'Enterprise'}) - \${payload.interestArea || 'Demo Request'}\`,
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
    fetch(\`\${apiUrl}/api/inquiry\`, {
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
`;
  fs.writeFileSync(stcInquiryServicePath, stcServiceContent, 'utf8');
  console.log('Updated stc-innovations/src/services/inquiryService.js');
}

console.log('Config and Service updates complete.');

