const icons = {
  experience: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="24" />
      <path d="M32 20v12l8 8" />
    </svg>
  ),
  tracks: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="12" y="16" width="40" height="32" rx="4" />
      <path d="M20 24v16M28 24v16M36 24v16M44 24v16" />
    </svg>
  ),
  artists: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="20" r="10" />
      <path d="M16 56c0-9 7-16 16-16s16 7 16 16" />
    </svg>
  ),
  awards: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8l4 12h12l-10 8 4 12-10-7-10 7 4-12-10-8h12l4-12z" />
      <path d="M20 48h24v8H20z" />
      <path d="M26 56h12" />
    </svg>
  ),
  countries: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="22" />
      <path d="M32 10c-6 8-10 16-10 22s4 14 10 22c6-8 10-16 10-22s-4-14-10-22z" />
      <path d="M10 32h44" />
    </svg>
  ),
  clients: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 28c-4 0-8 3-8 8v12h32V36c0-5-4-8-8-8" />
      <circle cx="32" cy="18" r="8" />
      <path d="M44 24l4 4 8-8" />
    </svg>
  ),
}

export default function StatIcon({ name, className = '' }) {
  const svg = icons[name]
  if (!svg) return null
  return <span className={`stat-icon ${className}`}>{svg}</span>
}
