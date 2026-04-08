import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-muted transition hover:text-text"
      aria-label="Toggle theme"
    >
      Theme {isDark ? 'Light' : 'Dark'}
    </button>
  )
}
