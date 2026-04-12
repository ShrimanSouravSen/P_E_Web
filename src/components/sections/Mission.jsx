import OdishaSasanLogo from '../../assets/Odisha-sasan-logo.png'
import CopperIngotsImage from '../../assets/copper_ingots.png'
import CopperScrapImage from '../../assets/Copper_Scrap.png'
import { useTheme } from '../../hooks/useTheme'

function SustainabilityClipart() {
  return (
    <svg viewBox="0 0 240 150" preserveAspectRatio="xMaxYMax meet" className="h-full w-full" fill="none" aria-hidden="true">
      <path d="M10 148H228" stroke="#6d8a66" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

      <g transform="translate(0 25)">
        <rect x="18" y="93" width="48" height="28" rx="3" fill="#546550" />
        <rect x="26" y="79" width="12" height="42" rx="2.5" fill="#445441" />
        <rect x="42" y="70" width="11" height="51" rx="2.5" fill="#3d4b3a" />
        <path d="M18 102L31 93L43 101L54 90L66 98" stroke="#73876d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 67C18 56 21 42 36 42C40 33 55 33 60 44C73 43 79 55 71 66C58 61 43 61 29 67Z" fill="#7e9378" fillOpacity="0.32" />
        <path d="M46 58C39 48 42 39 52 39C60 39 66 45 65 55" stroke="#71836b" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </g>

      <g transform="translate(0 20)" stroke="#4a6046" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
        <path d="M82 50C103 26 139 24 163 43" />
        <path d="M155 38l10 5-12 3" />
        <path d="M89 74C110 90 139 91 163 73" />
        <path d="M154 69l12 1-6 10" />
      </g>

      <g fill="#233522">
        <text x="111" y="49" fontSize="17" fontWeight="700" letterSpacing="1.1">CO2</text>
        <text x="170" y="56" fontSize="13" fontWeight="700" letterSpacing="0.8">O2</text>
      </g>

      <g transform="translate(134 81)">
        <rect x="10" y="41" width="5" height="26" rx="2.5" fill="#4b5d44" />
        <path d="M12 12C-2 22 -2 40 12 49C26 40 26 22 12 12Z" fill="#4f6c49" />
        <rect x="43" y="34" width="5" height="33" rx="2.5" fill="#4b5d44" />
        <path d="M45 0C26 12 25 34 45 44C65 34 64 12 45 0Z" fill="#4f6c49" />
        <rect x="78" y="44" width="5" height="23" rx="2.5" fill="#4b5d44" />
        <path d="M80 20C68 30 68 44 80 52C92 44 92 30 80 20Z" fill="#4f6c49" />
        <path d="M0 67H98" stroke="#5d7457" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      <g stroke="#5a7355" strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
        <path d="M171 136c7-4 14-4 20 0" />
        <path d="M196 136c5-3 11-3 16 0" />
      </g>
    </svg>
  )
}

export default function Mission() {
  const { isDark } = useTheme()
  const recyclerCardBackground = isDark ? '#18161b' : '#fff8ee'
  const sustainabilityCardBackground = isDark ? '#9ab38f' : '#eaffe1'
  const recyclerStripBackground = isDark ? '#5c6e57' : '#91a98b'
  const ingotListTextColor = isDark ? '#f5eee3' : '#3f2f1f'

  return (
    <section id="about" className="border-b border-line px-6 py-8 md:px-8 md:py-8">
      <div className="mx-auto grid grid-cols-1 gap-3 md:grid-cols-6">
        <article className="relative overflow-hidden rounded-md border border-line p-6 shadow-panel md:col-span-6 md:p-7" style={{ backgroundColor: recyclerCardBackground }}>
          <div className="pointer-events-none absolute inset-0 md:hidden" style={{
            zIndex: 5,
            background: isDark
              ? '#000'
              : '#fff8ee',
              opacity: isDark
              ? 0.85
              : 0.9,
          }} />
          <div className="relative z-10 max-w-2xl">
            <p className="text-md leading-[1.02] md:text-md text-accent">Purity Forged from History</p>
            <h2 className="mt-1 text-[2.05rem] leading-[1.02] text-text md:text-4xl">
              We don't mine the earth. We refine it.
            </h2>
            <p className="mt-3 text-[1.02rem] text-muted">
              Exclusively Urban Mining — Extracting Copper from Scrap, Not Ore.
            </p>
          </div>
          <div className="pointer-events-none absolute bottom-0 right-0 h-full w-auto overflow-hidden opacity-85">
            <img
              src={CopperScrapImage}
              alt="Copper scrap material"
              className="h-full w-full object-cover object-left"
            />
          </div>
        </article>

        <article
          className="relative overflow-hidden rounded-md border border-line p-5 md:col-span-3"
          style={{ backgroundColor: recyclerCardBackground }}
        >
          <div className="flex h-full items-center gap-4 pr-14">
            <div className="flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-white p-2">
              <img src={OdishaSasanLogo} alt="Odisha government seal" className="h-14 w-14 object-contain" />
            </div>
            <div>
              <h3 className="text-[1.5rem] uppercase leading-[0.92] text-text">Govt. Authorized Recycler</h3>
              <p className="mt-2 max-w-[24rem] text-[0.98rem] leading-[1.35] text-muted">
                ISO certified, prioritizing environment and safety.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-14 rounded-r-md" style={{
              backgroundColor: sustainabilityCardBackground,
            }} />
          <div className="pointer-events-none absolute right-8 top-0 h-full w-10 rounded-r-xl" style={{ backgroundColor: recyclerStripBackground }} />
          <div
            className="pointer-events-none absolute right-12 top-0 h-full w-10 rounded-r-xl"
            style={{
              backgroundColor: recyclerCardBackground,
            }}
          />
        </article>

        <article
          className="relative overflow-hidden rounded-md border p-5 md:col-span-3"
          style={{
            backgroundColor: sustainabilityCardBackground,
            borderColor: '#ccb79a',
          }}
        >
          <div className="relative z-10 flex h-full flex-col justify-center pr-[12.5rem]">
            <h3 className="text-[1.5rem] uppercase leading-[0.92] text-[#122415]">Sustainability in Action</h3>
            <p className="mt-2 text-[0.98rem] leading-[1.35] text-[#203225]">
              Reducing mining demand, lowering environmental impact.
            </p>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex h-full max-h-full w-[13rem] items-end opacity-90">
            <SustainabilityClipart />
          </div>
        </article>

        <article className="overflow-hidden rounded-md border border-line md:col-span-2" style={{ backgroundColor: recyclerCardBackground }}>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[1.5rem] uppercase leading-[0.95] text-text">High-Grade Copper Ingots</h3>
          </div>
          <div className="relative">
            <img
              src={CopperIngotsImage}
              alt="Stacked circular copper ingots"
              className="h-[210px] w-full object-cover object-center"
              style={{
                filter: isDark ? 'brightness(0.9) contrast(1.08)' : 'brightness(0.98) contrast(1.05)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: isDark
                  ? 'linear-gradient(90deg, rgb(0 0 0 / 8%) 0%, rgb(0 0 0 / 52%) 40%, rgb(0 0 0) 100%)'
                  : 'linear-gradient(90deg, rgb(255 255 255 / 2%) 0%, rgb(255 251 246 / 48%) 40%, rgb(255 252 247) 100%)',
              }}
            />
            <div className="absolute inset-0 z-10 flex items-center justify-end px-3 py-3">
              <div className="w-[30%] min-w-[140px]">
                <ul className="space-y-1.5 text-left text-[0.95rem]" style={{ color: ingotListTextColor }}>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-[0.12rem] before:text-[0.72rem] before:content-['➤'] before:text-[#c7814d]">
                    99.93% Purity
                  </li>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-[0.12rem] before:text-[0.72rem] before:content-['➤'] before:text-[#c7814d]">
                    Custom Grades
                  </li>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-[0.12rem] before:text-[0.72rem] before:content-['➤'] before:text-[#c7814d]">
                    Metallurgical Stability
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-md border border-line md:col-span-2" style={{ backgroundColor: recyclerCardBackground }}>
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-[1.5rem] uppercase leading-[0.95] text-text">ERP Integration</h3>
          </div>
          <div className="grid gap-2 p-4 text-[0.78rem] text-muted">
            <div className="rounded-md border border-line bg-surface px-3 py-2">Traceability Dashboard</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md border border-line bg-surface px-2 py-2 text-center">Scrap</div>
              <div className="rounded-md border border-line bg-surface px-2 py-2 text-center">Refining</div>
              <div className="rounded-md border border-line bg-surface px-2 py-2 text-center">Dispatch</div>
            </div>
            <div className="rounded-md border border-accent/50 bg-accentSoft/50 px-3 py-2 text-[0.72rem] text-text">
              Batch processed with linked QA metadata.
            </div>
          </div>
        </article>

        <article className="overflow-hidden rounded-md md:col-span-2 border border-line" style={{ backgroundColor: recyclerCardBackground }}>
          <div className="px-5 py-4">
            <h3 className="text-[1.5rem] uppercase leading-[0.95] text-text">Meet Our Team</h3>
          </div>
          <img
            className="h-[210px] w-full object-cover"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="Team members discussing operations"
          />
        </article>
      </div>
    </section>
  )
}
