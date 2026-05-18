import founderImage from '../../assets/founder.jpeg'
import { useTheme } from '../../hooks/useTheme'

const quickLinks = [
  ['Home', '#home'],
  ['About Us', '#about'],
  ['Process', '#process'],
  ['Sustainability', '#sustainability'],
  ['Applications', '#applications'],
  ['Portal', 'https://parbatienterprises.com/expense_tracker/login'],
  // ['Careers', '#careers'],
  // ['Contact Us', '#contact'],
]

const contactItems = [
  // {
  //   label: '+91 00000 00000',
  //   icon: (
  //     <path
  //       d="M21 16.5v3a1.5 1.5 0 0 1-1.64 1.49 19.8 19.8 0 0 1-8.63-3.07 19.48 19.48 0 0 1-6-6A19.8 19.8 0 0 1 1.66 3.25 1.5 1.5 0 0 1 3.15 1.6h3a1.5 1.5 0 0 1 1.49 1.29c.1.8.28 1.58.54 2.33a1.5 1.5 0 0 1-.34 1.58L6.57 8.07a16 16 0 0 0 6 6l1.27-1.27a1.5 1.5 0 0 1 1.58-.34c.75.26 1.53.44 2.33.54A1.5 1.5 0 0 1 21 16.5Z"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       strokeWidth="2"
  //     />
  //   ),
  // },
  {
    label: 'info@parbatienterprises.com',
    icon: (
      <path
        d="M3 5h18v14H3V5Zm18 2-9 6-9-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    ),
  },
  {
    label: 'www.parbatienterprises.com',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </>
    ),
  },
]

// The svg codes for the below icons are sourced from Tabler Icons (https://tabler-icons.io/) and are used under the MIT License.
const socialLinks = [
  {
    label: 'LinkedIn',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 11v5" />
        <path d="M8 8v.01" />
        <path d="M12 16v-5" />
        <path d="M16 16v-3a2 2 0 1 0 -4 0" />
        <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        <path d="M16.5 7.5v.01" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
        <path d="M10 9l5 3l-5 3l0 -6" />
      </svg>
    ),
  },
]

function FooterIcon({ children, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-6 w-6 shrink-0 text-current ${className}`}
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  )
}

export default function Footer() {
  const { isDark } = useTheme()


  return (
    <footer className="border-t border-line bg-bg px-4 py-8 text-muted transition-colors duration-300 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-[0.92fr_1.06fr_1.38fr]">
        <section className="rounded-md border border-line bg-elevated/70 px-9 py-8 shadow-[0_16px_34px_rgba(68,44,20,0.12)] transition-colors duration-300 dark:bg-surface/40 dark:shadow-panel">
          <h2 className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-accent">
            Quick Links
          </h2>

          <nav aria-label="Footer quick links" className="mt-5">
            <ul className="space-y-2.5">
              {quickLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-3 text-base leading-tight transition hover:text-text"
                  >
                    <span className="text-lg leading-none text-accent transition group-hover:translate-x-1">
                      &rsaquo;
                    </span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 border-t border-line pt-5">
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-accent">
              Follow Us
            </h2>
            <div className="mt-4 flex flex-wrap gap-4">
              {socialLinks.map(({ label, icon }) => (
                <a
                  key={label}
                  href="#social"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-accent text-accent transition hover:bg-accent hover:text-bg"
                >
                  <FooterIcon className="h-5 w-5">
                    {icon}
                  </FooterIcon>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-line bg-elevated/70 px-9 py-8 shadow-[0_16px_34px_rgba(68,44,20,0.12)] transition-colors duration-300 dark:bg-surface/40 dark:shadow-panel">
          <div className="space-y-5">
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-accent">
              Our Address
            </h2>
            <div className="flex items-start gap-6">
              <FooterIcon className="mt-3">
                <path
                  d="M4 21V9l6-3v15M10 21V4l10 5v12M7 13h.01M7 17h.01M14 13h.01M14 17h.01M18 13h.01M18 17h.01"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </FooterIcon>
              <div className="flex items-center justify-between gap-4">
                <address className="not-italic">
                  <p className="max-w-[15rem] font-body text-base uppercase leading-7 tracking-wide text-muted">
                    Registered Office<br /> Balasore Odisha 756001
                  </p>
                </address>

                {/* <a
                  href="https://www.google.com/maps/search/?api=1&query=Parbati+Enterprises+Prasannapur+Cuttack+Odisha+754027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-20 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-md border border-line bg-elevated/50 shadow-sm transition hover:border-accent/40 hover:bg-elevated/80"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent)_0%,transparent_100%)] opacity-10 transition group-hover:opacity-20" />
                  <svg
                    className="h-7 w-7 text-accent transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-7.1 7-13a7 7 0 0 0-14 0c0 5.9 7 13 7 13Z" />
                    <circle cx="12" cy="8" r="2.5" />
                  </svg>
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-muted/60 transition group-hover:text-accent">
                    Locate Us
                  </span>
                </a> */}
              </div>
            </div>
            <div className="flex items-start gap-6">
              <FooterIcon className="mt-3">
                <path
                  d="M3 3h18v4H3zm0 6h18v10H3zm2-2h2v2H5zm12 0h2v2h-2zm-10 8h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </FooterIcon>
              <div className="flex items-center justify-between gap-4">
                <address className="not-italic">
                  <p className="max-w-[15rem] font-body text-base uppercase leading-7 tracking-wide text-muted">
                    Production Unit <br />Cuttack Odisha 754027
                  </p>
                </address>

                {/* <a
                  href="https://www.google.com/maps/search/?api=1&query=Parbati+Enterprises+Prasannapur+Cuttack+Odisha+754027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-20 w-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-md border border-line bg-elevated/50 shadow-sm transition hover:border-accent/40 hover:bg-elevated/80"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent)_0%,transparent_100%)] opacity-10 transition group-hover:opacity-20" />
                  <svg
                    className="h-7 w-7 text-accent transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s7-7.1 7-13a7 7 0 0 0-14 0c0 5.9 7 13 7 13Z" />
                    <circle cx="12" cy="8" r="2.5" />
                  </svg>
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-muted/60 transition group-hover:text-accent">
                    Locate Us
                  </span>
                </a> */}
              </div>
            </div>
          </div>

          <div className="mt-7 space-y-5 border-t border-line pt-6">
            {contactItems.map((item) => (
              <div key={item.label} className="flex items-center gap-6 text-base text-muted">
                <FooterIcon>{item.icon}</FooterIcon>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-line bg-elevated/70 px-8 py-8 shadow-[0_16px_34px_rgba(68,44,20,0.12)] transition-colors duration-300 dark:bg-surface/40 dark:shadow-panel space-y-5">
          <h2 className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-accent">
            In Memory Of Our Founder
          </h2>

          <div className="mt-9 grid gap-7 md:grid-cols-[minmax(13rem,0.95fr)_1fr] md:items-start">
            <img
              src={founderImage}
              alt="Late Shri Parbati Sahoo"
              className="w-full max-w-[250px] rounded-md border border-accent object-cover shadow-[0_16px_34px_rgba(181,98,26,0.18)] dark:shadow-copper"
            />

            <div className="max-w-[17rem]">
              <p className="font-heading text-6xl font-bold leading-none text-accent">&ldquo;</p>
              <blockquote className="-mt-3 font-heading text-xl italic leading-8 text-text">
                Vision, integrity, and hard work build more than businesses-they build a legacy
                that inspires generations.
              </blockquote>
              <p className="text-right font-heading text-6xl font-bold leading-none text-accent -mt-5">&rdquo;</p>
              <div className="mt-6 h-px w-10 bg-accent" />
              <p className="mt-6 font-heading text-lg font-bold text-accent">
                Ramakanta Nayak
              </p>
              <p className="mt-1 text-base text-muted">Visionary</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
