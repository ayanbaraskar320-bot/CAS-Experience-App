/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'midnight-ink': '#0F1B2D',
        'deep-lake-blue': '#1B3A5C',
        'horizon-teal': '#1E7F82',
        'eleviq-teal': '#0FA88A',
        'sky-mist': '#EAF3F3',
        'soft-sand': '#F5EFE6',
        'driftwood-gray': '#6B7280',
        'warm-coral': '#E8734A',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Epilogue', 'Arial', 'Helvetica', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}