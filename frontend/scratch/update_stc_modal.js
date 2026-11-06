import fs from 'fs';

const modalFiles = [
  'frontend/src/components/STCDemoModal.jsx',
  'stc-innovations/src/components/STCDemoModal.jsx'
];

modalFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Initial interest default
  content = content.replace(
    "interest: initialInterest || 'Workforce Alignment & Role Benchmarking'",
    "interest: initialInterest || 'CAS Commercial Demonstration'"
  );

  // 2. Submit button text
  content = content.replace(
    '<span>Request Enterprise Demo →</span>',
    '<span>Request a CAS Demo →</span>'
  );

  // 3. Confirmation title & text
  content = content.replace(
    'Demo Request Confirmed!',
    'Inquiry Received'
  );
  content = content.replace(
    'Thank you, <span className="font-semibold text-slate-900">{form.fullName}</span>. An STC Innovations enterprise solutions architect has received your briefing for <span className="font-semibold text-slate-900">{form.organization}</span> and will reach out within 1 business day.',
    'Thank you, <span className="font-semibold text-slate-900">{form.fullName}</span>. An STC Innovations enterprise solutions architect has received your briefing for <span className="font-semibold text-slate-900">{form.organization}</span> and will follow up with your team regarding commercial demonstration and deployment opportunities.'
  );

  // 4. Non-provisioning notice in modal footer
  const oldPrivacyBlock = `<div className="flex items-center gap-2 text-xs text-slate-500">
                  {/* Privacy/data-practice language pending separate approval */}
                </div>`;
  const newPrivacyBlock = `<div className="flex items-center gap-2 text-[11px] text-slate-500 font-sans max-w-sm">
                  <span>Submitting this inquiry does not auto-provision a CAS tenant account or send automated credentials.</span>
                </div>`;

  if (content.includes(oldPrivacyBlock)) {
    content = content.replace(oldPrivacyBlock, newPrivacyBlock);
  } else if (content.includes(oldPrivacyBlock.replace(/\n/g, '\r\n'))) {
    content = content.replace(oldPrivacyBlock.replace(/\n/g, '\r\n'), newPrivacyBlock.replace(/\n/g, '\r\n'));
  }

  // 5. Interest options in select
  const oldSelectOptions = `<select
                  value={form.interest}
                  onChange={(e) => handleChange('interest', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                >
                  <option>Workforce Alignment & Role Benchmarking</option>
                  <option>Capability Signals™ & Human-Skills Intelligence</option>
                  <option>Community Intelligence Console™ & Outcome Analytics</option>
                  <option>Enterprise Implementation & Custom White-Labeling</option>
                  <option>Commercial Pilot Program Evaluation</option>
                </select>`;

  const newSelectOptions = `<select
                  value={form.interest}
                  onChange={(e) => handleChange('interest', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                >
                  <option>CAS Commercial Demonstration</option>
                  <option>Organizational Deployment & Enterprise Licensing</option>
                  <option>Workforce Alignment & Role Benchmarking</option>
                  <option>Capability Signals™ & Human-Skills Intelligence</option>
                  <option>Community Intelligence Console™ & Outcome Analytics</option>
                  <option>Commercial Pilot Program Evaluation</option>
                </select>`;

  if (content.includes(oldSelectOptions)) {
    content = content.replace(oldSelectOptions, newSelectOptions);
  } else if (content.includes(oldSelectOptions.replace(/\n/g, '\r\n'))) {
    content = content.replace(oldSelectOptions.replace(/\n/g, '\r\n'), newSelectOptions.replace(/\n/g, '\r\n'));
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
});

