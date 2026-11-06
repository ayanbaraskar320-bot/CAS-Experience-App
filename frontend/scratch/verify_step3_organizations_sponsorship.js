import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('--- AUDITING ELEVIQ FOUNDATION ORGANIZATIONS & SPONSORSHIP UPDATES ---')

let passed = 0
let failed = 0

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName}`)
    passed++
  } else {
    console.error(`[FAIL] ${testName}`)
    if (details) console.error(`       Details: ${details}`)
    failed++
  }
}

const appJsxPath = path.resolve(__dirname, '../src/App.jsx')
const appJsx = fs.readFileSync(appJsxPath, 'utf8')

const deliveriesJsxPath = path.resolve(__dirname, '../src/components/WhatElevIqDelivers.jsx')
const deliveriesJsx = fs.readFileSync(deliveriesJsxPath, 'utf8')

const ecosystemJsxPath = path.resolve(__dirname, '../src/components/EcosystemRelationship.jsx')
const ecosystemJsx = fs.readFileSync(ecosystemJsxPath, 'utf8')

const audienceRoutingPath = path.resolve(__dirname, '../src/components/AudienceIntentRouting.jsx')
const audienceRoutingJsx = fs.readFileSync(audienceRoutingPath, 'utf8')

const inquiryServicePath = path.resolve(__dirname, '../src/services/inquiryService.js')
const inquiryServiceJs = fs.readFileSync(inquiryServicePath, 'utf8')

// 1. ORGANIZATIONS PAGE AUDIT
// Check primary CTA in OrganizationsHome
assert(
  appJsx.includes('Request an Organizational Demo') &&
  appJsx.includes('/contact?topic=organizational-demo#contact-inquiry'),
  'Organizations Page: Primary CTA labeled "Request an Organizational Demo" and routes to contact inquiry'
)

// Check OrganizationsPricingDemo CTA
assert(
  appJsx.includes('Request an Organizational Demo →') &&
  appJsx.includes('/contact?topic=organizational-demo#contact-inquiry'),
  'Organizations Pricing Demo: CTA updated to "Request an Organizational Demo →" linking to inquiry'
)

// Verify no automated Console account creation, administrator onboarding, or workspace provisioning
assert(
  !inquiryServiceJs.includes('createConsoleAccount') &&
  !inquiryServiceJs.includes('provisionWorkspace') &&
  !inquiryServiceJs.includes('adminOnboarding') &&
  inquiryServiceJs.includes('sendInquiry'),
  'Inquiry Architecture: Strictly email dispatch & archiving, NO automated Console account creation or workspace provisioning'
)

// 2. SPONSORSHIP & COMMUNITY SUPPORT AUDIT
// Primary button label in Support the Mission & Individuals Home
assert(
  appJsx.includes('Explore Sponsorship Opportunities'),
  'Sponsorship: Primary button label set to "Explore Sponsorship Opportunities"'
)

assert(
  appJsx.includes('/contact?topic=sponsorship#contact-inquiry'),
  'Sponsorship: Routes to contact inquiry process with topic=sponsorship'
)

// Verify no e-commerce checkout, public pricing tiers, or automated payment processing
const paymentKeywords = ['stripe', 'paypal', 'checkout', 'add-to-cart', 'shopping-cart', 'credit-card']
const foundPayment = paymentKeywords.filter(kw => appJsx.toLowerCase().includes(kw) || inquiryServiceJs.toLowerCase().includes(kw))
assert(
  foundPayment.length === 0,
  'Expression-of-Interest Pathway: NO e-commerce checkout, carts, or payment processing detected',
  foundPayment.join(', ')
)

// 3. CLAIMS & LANGUAGE AUDIT
// Alignment Snapshot reflects strengths, experiences, and potential career directions
assert(
  appJsx.includes('Alignment Snapshot™ reflecting strengths, experiences, and potential career directions'),
  'Claims Audit: Alignment Snapshot™ clarified as reflecting strengths, experiences, and potential career directions'
)

// Alignment Snapshot supports conversations with career advisors, educators, and mentors
assert(
  appJsx.includes('support conversations with career advisors, educators, and mentors') ||
  appJsx.includes('support constructive conversations with career advisors, educators, and mentors'),
  'Claims Audit: Snapshot clarified as supporting conversations with career advisors, educators, and mentors'
)

// Removal/rephrasing of employment guarantees, job qualifications, or replacing guidance
assert(
  appJsx.includes('does not guarantee employment, determine job qualifications, or replace professional human guidance'),
  'Claims Audit: Explicit disclaimer that Snapshot does not guarantee employment, determine qualifications, or replace guidance'
)

// 4. FOUNDATION & STC RELATIONSHIP STATEMENT
const exactStatement = 'CAS is developed and owned by STC Innovations Inc., which provides the technology to ElevIQ Foundation at no charge for its mission-aligned nonprofit activities. ElevIQ Foundation focuses on nonprofit workforce development and participant support, while STC Innovations manages commercial technology licensing and deployment.'

assert(
  appJsx.includes(exactStatement),
  'Relationship Statement: Exact statement present in site-wide Footer'
)

assert(
  ecosystemJsx.includes(exactStatement),
  'Relationship Statement: Exact statement present in EcosystemRelationship component'
)

// 5. AUDIENCE INTENT ROUTING AUDIT
assert(
  audienceRoutingJsx.includes("topicParam === 'organizational-demo'") &&
  audienceRoutingJsx.includes("topicParam === 'sponsorship'"),
  'Audience Routing: Handles preselection for organizational-demo and sponsorship inquiry topics'
)

console.log(`\nAUDIT RESULT: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  process.exit(1)
} else {
  console.log('ALL AUDIT CHECKS PASSED SUCCESSFULLY!')
}

