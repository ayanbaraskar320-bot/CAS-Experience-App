/**
 * Centralized links configuration for STC Innovations
 * Connects the commercial site back to the ElevIQ Foundation platform.
 */
const rawElevIqUrl = import.meta.env.VITE_ELEVIQ_URL || 'http://localhost:5173'
export const ELEVIQ_BASE_URL = rawElevIqUrl.replace(/\/+$/, '')

/**
 * Returns full URL to a specific route on the ElevIQ Foundation site
 * @param {string} path Route path, e.g. '/individuals' or '/platform'
 * @returns {string} Fully qualified URL
 */
export function getElevIqUrl(path = '/') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${ELEVIQ_BASE_URL}${cleanPath}`
}

export const ELEVIQ_LINKS = {
  home: getElevIqUrl('/'),
  individuals: getElevIqUrl('/individuals'),
  platform: getElevIqUrl('/platform'),
  organizations: getElevIqUrl('/organizations'),
  about: getElevIqUrl('/about'),
  resources: getElevIqUrl('/resources'),
  contact: getElevIqUrl('/contact'),
}
