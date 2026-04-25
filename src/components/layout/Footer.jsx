import founderImage from '../../assets/founder.png'

const quickLinks = [
  ['Home', '#home'],
  ['About Us', '#about'],
  ['Process', '#process'],
  ['Sustainability', '#sustainability'],
  ['Applications', '#applications'],
  ['Quality & Certification', '#quality'],
  ['Careers', '#careers'],
  ['Contact Us', '#contact'],
]

const contactItems = [
  {
    label: '+91 00000 00000',
    icon: (
      <path
        d="M21 16.5v3a1.5 1.5 0 0 1-1.64 1.49 19.8 19.8 0 0 1-8.63-3.07 19.48 19.48 0 0 1-6-6A19.8 19.8 0 0 1 1.66 3.25 1.5 1.5 0 0 1 3.15 1.6h3a1.5 1.5 0 0 1 1.49 1.29c.1.8.28 1.58.54 2.33a1.5 1.5 0 0 1-.34 1.58L6.57 8.07a16 16 0 0 0 6 6l1.27-1.27a1.5 1.5 0 0 1 1.58-.34c.75.26 1.53.44 2.33.54A1.5 1.5 0 0 1 21 16.5Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    ),
  },
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

const socialLinks = [
  ['LinkedIn', 'in'],
  ['Facebook', 'f'],
  ['Instagram', 'ig'],
  ['YouTube', 'yt'],
]

function FooterIcon({ children, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-6 w-6 shrink-0 text-accent ${className}`}
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  )
}

export default function Footer() {
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
              {socialLinks.map(([label, mark]) => (
                <a
                  key={label}
                  href="#social"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-accent text-lg font-semibold leading-none text-accent transition hover:bg-accent hover:text-bg"
                >
                  {mark}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-line bg-elevated/70 px-9 py-8 shadow-[0_16px_34px_rgba(68,44,20,0.12)] transition-colors duration-300 dark:bg-surface/40 dark:shadow-panel">
          <div className="flex items-center gap-6">
            <FooterIcon>
              <path
                d="M12 21s7-7.1 7-13a7 7 0 0 0-14 0c0 5.9 7 13 7 13Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <circle cx="12" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
            </FooterIcon>
            <h2 className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-accent">
              Our Address
            </h2>
          </div>

          <div className="mt-6 border-t border-line pt-7">
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
              <address className="not-italic">
                <p className="max-w-[16rem] font-body text-base uppercase leading-8 tracking-wide text-muted">
                  PLOT NO.- 177, KATI NO.- 83/100, MOUZA- PRASANNAPUR, PS- GURUDIJHATIA, DIST-
                  CUTTACK, ODISHA, 754027
                </p>
              </address>
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

        <section className="rounded-md border border-line bg-elevated/70 px-8 py-8 shadow-[0_16px_34px_rgba(68,44,20,0.12)] transition-colors duration-300 dark:bg-surface/40 dark:shadow-panel">
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
              <div className="mt-6 h-px w-10 bg-accent" />
              <p className="mt-6 font-heading text-lg font-bold text-accent">
                Late Shri Parbati Nayak
              </p>
              <p className="mt-1 text-base text-muted">Founder</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
