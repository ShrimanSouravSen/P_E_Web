import { useState } from 'react'
import logo from '../../assets/logo.png'
import { useTheme } from '../../hooks/useTheme'
import ThemeToggle from '../ui/ThemeToggle'

const navItems = ['Home', 'About', 'Process', 'Sustainability', 'Applications']

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
// const logoSrc = logo;

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10">
        <a href="/" className="group flex items-center focus:outline-none">
          <img
            src={logo}
            alt="Parbati Enterprises"
            className="h-10 w-auto transition group-hover:opacity-80"
          />
        </a>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-7 text-sm text-muted lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-text">
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden h-8 w-px bg-line lg:block" aria-hidden="true" />
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:text-text lg:hidden"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? (
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
          <ThemeToggle />
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
