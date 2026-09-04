import { Link } from 'react-router-dom'
import { STC_URL, isExternalStcUrl } from '../config/stc'

/**
 * Drop-in replacement for `<Link to="/stc">`.
 * Renders an external new-tab anchor in production, internal router link locally.
 */
export default function StcLink({ className, style, title, label, onClick, children }) {
  if (isExternalStcUrl) {
    return (
      <a
        href={STC_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        title={title}
        aria-label={label}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to="/stc" className={className} style={style} title={title} aria-label={label} onClick={onClick}>
      {children}
    </Link>
  )
}
