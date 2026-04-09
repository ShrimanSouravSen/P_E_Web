import ThemeToggle from '../ui/ThemeToggle'

const navItems = ['Home', 'Process', 'Sustainability', 'Applications', 'About']

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-10">
        <a href="/" className="group focus:outline-none">
          <p className="text-lg font-bold leading-none text-accent transition group-hover:opacity-80">Parbati</p>
          <p className="text-sm leading-none text-text transition group-hover:opacity-80">Enterprises</p>
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
          <button className="rounded-full border border-line px-3 py-1.5 text-xs text-muted lg:hidden">
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
