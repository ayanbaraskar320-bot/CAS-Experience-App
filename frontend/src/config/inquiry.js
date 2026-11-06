/**
 * Inquiry & Contact Form Configuration
 */
export const INQUIRY_CONFIG = {
  // Web3Forms Access Key for info@eleviqfoundation.org (ElevIQ Foundation intake)
  web3FormsAccessKey: '9949e474-6db6-4851-aab1-072aecbf8c16',
  targetEmail: 'info@eleviqfoundation.org',

  // STC Innovations Commercial Intake
  stcWeb3FormsAccessKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STC_WEB3FORMS_ACCESS_KEY) || '9949e474-6db6-4851-aab1-072aecbf8c16',
  stcTargetEmail: 'commercial@stc-innovations.com',

  // Backend API URL for database archiving
  apiUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000',
}
