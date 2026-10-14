/**
 * Inquiry & Contact Form Configuration for STC Innovations
 *
 * To deliver demo inquiries directly to an inbox without managing a backend mail server:
 * 1. Visit https://web3forms.com
 * 2. Enter the destination email (e.g. info@eleviqfoundation.org or your test email)
 * 3. Copy the Access Key from your inbox and paste it below or in your .env file as VITE_WEB3FORMS_ACCESS_KEY
 */

export const INQUIRY_CONFIG = {
  // Web3Forms Access Key (reads environment variable first, falls back to direct string)
  web3FormsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '9949e474-6db6-4851-aab1-072aecbf8c16',

  // Destination email target for reference
  targetEmail: 'info@eleviqfoundation.org',

  // Backend API URL for database archiving
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
}
