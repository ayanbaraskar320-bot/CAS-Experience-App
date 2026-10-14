/**
 * Inquiry & Contact Form Configuration
 *
 * To deliver form inquiries directly to an inbox without managing a backend mail server:
 * 1. Visit https://web3forms.com
 * 2. Enter the destination email (e.g. info@eleviqfoundation.org or your test email)
 * 3. Copy the Access Key from your inbox and paste it below or in your .env file as VITE_WEB3FORMS_ACCESS_KEY
 */

export const INQUIRY_CONFIG = {
  // Web3Forms Access Key (reads environment variable first, falls back to direct string)
  web3FormsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '4fcb968a-ed45-4b84-9a57-ffaca963df7c',

  // Destination email target for reference
  targetEmail: 'info@eleviqfoundation.org',

  // Backend API URL for database archiving
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
}
