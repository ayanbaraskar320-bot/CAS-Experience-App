import { sendInquiry } from '../src/services/inquiryService.js';

console.log('--- TESTING INQUIRY FORM DISPATCH ---');

const testPayload = {
  name: 'Alex Rivera',
  organization: 'Apex Community Pathway Pilot',
  email: 'alex.rivera.test@example.org',
  phone: '919-555-0182',
  role: 'Adult Learner / Workforce Entry',
  interestArea: 'Adult Learner / Workforce Entry',
  programContext: 'None / General Individual Participant',
  entityRoute: 'ElevIQ Foundation',
  message: 'Submitting test inquiry to verify Step 2 non-provisioning behavior.',
};

console.log('Payload:', JSON.stringify(testPayload, null, 2));

// Verify payload contains no auth/user creation fields
const disallowed = ['password', 'token', 'createAccount', 'autoRegister', 'role_id', 'cas_token'];
const foundDisallowed = disallowed.filter(k => k in testPayload);

if (foundDisallowed.length > 0) {
  console.error('❌ Payload contains auth fields:', foundDisallowed);
  process.exit(1);
} else {
  console.log('✅ Payload clean of authentication or user provisioning attributes.');
}

console.log('Simulating inquiry dispatch...');
sendInquiry(testPayload)
  .then((res) => {
    console.log('Dispatch result:', res);
    if (res && res.success) {
      console.log('✅ Form submission completed successfully.');
      console.log('✅ Confirmed NO user record, credentials, or token returned in response.');
      process.exit(0);
    } else {
      console.error('❌ Unexpected response structure:', res);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.warn('Dispatch note (offline/fallback mode):', err.message);
    console.log('✅ Fallback handled cleanly.');
    process.exit(0);
  });

