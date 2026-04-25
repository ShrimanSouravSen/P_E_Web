import { useState } from 'react'
import logoDark from '../../assets/logo-dark.png'
import logoLight from '../../assets/logo-light.png'
import { useTheme } from '../../hooks/useTheme'
import ThemeToggle from '../ui/ThemeToggle'

const navItems = ['Home', 'About', 'Process', 'Sustainability', 'Applications']

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark } = useTheme()
  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10">
        <a href="/" className="group flex items-center focus:outline-none">
          <img
            src={logoSrc}
            alt="Parbati Enterprises"
            className="h-10 w-auto transition group-hover:opacity-80"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-text">
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="rounded-full border border-line px-3 py-1.5 text-xs text-muted lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <nav className="border-t border-line px-6 pb-4 pt-3 lg:hidden md:px-10">
          <div className="flex flex-col gap-2 text-sm text-muted">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-md px-2 py-2 transition hover:bg-elevated/60 hover:text-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
