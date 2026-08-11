import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const CLE_STOCKAGE = 'teranga-theme'

function lireThemeInitial() {
  if (typeof window === 'undefined') return 'clair'
  const enregistre = window.localStorage.getItem(CLE_STOCKAGE)
  if (enregistre === 'clair' || enregistre === 'sombre') return enregistre
  const prefereSombre = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  return prefereSombre ? 'sombre' : 'clair'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lireThemeInitial)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'sombre' ? 'dark' : 'light')
    window.localStorage.setItem(CLE_STOCKAGE, theme)
  }, [theme])

  function basculerTheme() {
    setTheme((t) => (t === 'clair' ? 'sombre' : 'clair'))
  }

  return (
    <ThemeContext.Provider value={{ theme, basculerTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
