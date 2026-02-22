import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Header.css'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/music', label: 'Music' },
  { to: '/artists', label: 'Artists' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="header-logo" aria-label="Home">
          <img src="/logo.png" alt="Rasila" className="header-logo-img" />
        </Link>

        <nav className={`header-nav ${menuOpen ? 'header-nav-open' : ''}`}>
          {NAV_ITEMS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`header-nav-link ${isActive(to) ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="header-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-icon theme-icon-sun" aria-hidden>☀</span>
            <span className="theme-icon theme-icon-moon" aria-hidden>☽</span>
          </button>
        </nav>

        <button
          type="button"
          className="header-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
