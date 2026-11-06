import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const appJsxPath = path.resolve(__dirname, '../src/App.jsx')
let content = fs.readFileSync(appJsxPath, 'utf8')

// Update Card 01
content = content.replace(
  /<span className="text-xs font-semibold text-\[#0284C7\] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors">[\s\r\n]*Configure parameters[\s\r\n]*<svg([\s\S]*?)<\/svg>[\s\r\n]*<\/span>/,
  `<Link\n                to="/organizations/solutions"\n                className="text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors"\n              >\n                Configure parameters\n                <svg$1</svg>\n              </Link>`
)

// Update Card 02
content = content.replace(
  /<span className="text-xs font-semibold text-\[#0284C7\] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors">[\s\r\n]*View alignment curves[\s\r\n]*<svg([\s\S]*?)<\/svg>[\s\r\n]*<\/span>/,
  `<Link\n                to="/organizations/implementation"\n                className="text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors"\n              >\n                View alignment curves\n                <svg$1</svg>\n              </Link>`
)

// Update Card 03
content = content.replace(
  /<span className="text-xs font-semibold text-\[#0284C7\] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors">[\s\r\n]*Review pipelines[\s\r\n]*<svg([\s\S]*?)<\/svg>[\s\r\n]*<\/span>/,
  `<Link\n                to="/organizations/pricing-demo"\n                className="text-xs font-semibold text-[#0284C7] inline-flex items-center gap-1 group-hover:text-slate-900 transition-colors"\n              >\n                Review pipelines\n                <svg$1</svg>\n              </Link>`
)

fs.writeFileSync(appJsxPath, content, 'utf8')
console.log('Successfully updated Gateways links on OrganizationsHome')

