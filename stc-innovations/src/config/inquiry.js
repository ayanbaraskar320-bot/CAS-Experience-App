/**
 * Inquiry & Contact Form Configuration for STC Innovations
 * Strictly isolated for commercial inquiries and enterprise consultations.
 */
export const INQUIRY_CONFIG = {
  // Commercial intake access key (configured via VITE_STC_WEB3FORMS_ACCESS_KEY or active key)
  web3FormsAccessKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_STC_WEB3FORMS_ACCESS_KEY) || '9949e474-6db6-4851-aab1-072aecbf8c16',

  // Dedicated commercial intake target email
  targetEmail: 'commercial@stc-innovations.com',

  // Backend API URL for database archiving
  apiUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:5000',
}
