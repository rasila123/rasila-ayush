import { createContext, useContext, useEffect, useState } from 'react'

const THEME_KEY = 'rasila-theme'

const ThemeContext = createContext({ theme: 'light', setTheme: () => {} })

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return window.localStorage.getItem(THEME_KEY) || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const setTheme = (next) => {
    setThemeState(typeof next === 'function' ? next(theme) : next)
  }

  const toggleTheme = () => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
