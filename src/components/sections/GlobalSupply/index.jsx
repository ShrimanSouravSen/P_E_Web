import worldMap from '../../../assets/world_map.svg'

const ports = [
  { id: 'origin', name: 'Rotterdam', x: 485, y: 166 },
  { id: 'destination', name: 'Bengaluru', x: 690, y: 264 },
]

const routePath = 'M485 166 C555 72 644 78 690 264'

export default function GlobalSupply() {
  return (
    <section className="px-6 py-14 md:px-10 md:py-16">
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl">Local Integrity, Global Supply</h3>
        <p className="mx-auto mt-2 max-w-xl text-muted">Logistics aligned to global partners with fully traceable dispatch documents.</p>
      </div>
      <div className="mt-8">
        <div className="relative overflow-hidden rounded-tokenLg border border-line bg-elevated p-4 shadow-panel md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(219,138,58,0.16),transparent_34%)]" />
          <svg
            viewBox="0 0 1000 450"
            role="img"
            aria-labelledby="global-supply-title global-supply-description"
            className="relative z-10 h-auto w-full"
          >
            <title id="global-supply-title">Global supply route animation</title>
            <desc id="global-supply-description">
              A world map showing an animated supply route from Rotterdam to Bengaluru.
            </desc>

            <defs>
              <linearGradient id="supplyRouteGradient" x1="485" y1="166" x2="690" y2="264" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-accent)" stopOpacity="0.22" />
                <stop offset="0.46" stopColor="#f5c17d" stopOpacity="0.95" />
                <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.42" />
              </linearGradient>
              <filter id="routeGlow" x="-30%" y="-80%" width="160%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="1000" height="450" rx="18" fill="var(--color-surface)" opacity="0.36" />
            <g opacity="0.32" fill="none" stroke="var(--color-line)" strokeWidth="1">
              <path d="M0 75H1000M0 150H1000M0 225H1000M0 300H1000M0 375H1000" />
              <path d="M125 0V450M250 0V450M375 0V450M500 0V450M625 0V450M750 0V450M875 0V450" />
            </g>

            <image
              href={worldMap}
              x="0"
              y="0"
              width="1000"
              height="450"
              preserveAspectRatio="xMidYMid meet"
              opacity="0.42"
            />

            <g filter="url(#routeGlow)">
              <path d={routePath} fill="none" stroke="var(--color-accent)" strokeOpacity="0.18" strokeWidth="16" />
              <path
                d={routePath}
                fill="none"
                stroke="url(#supplyRouteGradient)"
                strokeLinecap="round"
                strokeWidth="3.5"
                strokeDasharray="10 12"
              >
                <animate attributeName="stroke-dashoffset" from="44" to="0" dur="1.8s" repeatCount="indefinite" />
              </path>
            </g>

            <g>
              <circle r="7" fill="#fff3df">
                <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#supply-route-motion" />
                </animateMotion>
              </circle>
              <circle r="3.5" fill="var(--color-accent)">
                <animateMotion dur="3.4s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#supply-route-motion" />
                </animateMotion>
              </circle>
            </g>

            <path id="supply-route-motion" d={routePath} fill="none" stroke="none" />

            <g>
              {ports.map((port) => (
                <g key={port.id} transform={`translate(${port.x} ${port.y})`}>
                  <circle r="20" fill="var(--color-accent)" opacity="0.12">
                    <animate attributeName="r" values="12;22;12" dur="2.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                  <circle r="6" fill="var(--color-accent)" />
                  <circle r="2.5" fill="#fff3df" />
                  <text
                    x={port.id === 'origin' ? -12 : 12}
                    y="-15"
                    textAnchor={port.id === 'origin' ? 'end' : 'start'}
                    className="fill-muted text-[18px] md:text-[15px]"
                  >
                    {port.name}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
