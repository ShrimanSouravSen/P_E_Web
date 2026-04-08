import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { designTokens } from '../tokens/designTokens'

const ThemeContext = createContext(null)

const mapThemeToCssVariables = (themeName) => {
  const fallback = 'dark'
  const selectedTheme = designTokens.themes[themeName] || designTokens.themes[fallback]
  const root = document.documentElement

  root.style.setProperty('--font-heading', designTokens.typography.heading)
  root.style.setProperty('--font-body', designTokens.typography.body)
  root.style.setProperty('--font-mono', designTokens.typography.mono)

  root.style.setProperty('--radius-sm', designTokens.radii.sm)
  root.style.setProperty('--radius-md', designTokens.radii.md)
  root.style.setProperty('--radius-lg', designTokens.radii.lg)

  root.style.setProperty('--shadow-copper', designTokens.shadows.copper)
  root.style.setProperty('--shadow-panel', designTokens.shadows.panel)

  const { colors } = selectedTheme
  root.style.setProperty('--color-bg', colors.bg)
  root.style.setProperty('--color-surface', colors.surface)
  root.style.setProperty('--color-elevated', colors.elevated)
  root.style.setProperty('--color-text', colors.text)
  root.style.setProperty('--color-muted', colors.muted)
  root.style.setProperty('--color-line', colors.line)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-accent-soft', colors.accentSoft)
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('pe-theme') || 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    mapThemeToCssVariables(theme)
    localStorage.setItem('pe-theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
      setTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
