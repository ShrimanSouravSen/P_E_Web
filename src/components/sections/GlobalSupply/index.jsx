import { useState, useEffect } from 'react'
import { useTheme } from '../../../hooks/useTheme.js'
import worldMap from '../../../assets/world_map.svg'

const ports = [
  { id: 'uk', name: 'United Kingdom', x: 485, y: 80, type: 'inbound' },
  { id: 'china', name: 'China', x: 760, y: 140, type: 'inbound' },
  { id: 'south-america', name: 'South America', x: 330, y: 280, type: 'outbound' },
  { id: 'africa', name: 'Africa', x: 560, y: 270, type: 'outbound' },
  { id: 'australia', name: 'Australia', x: 860, y: 340, type: 'outbound' },
  { id: 'destination', name: 'India', x: 720, y: 190, type: 'outbound' },
]

const routePath = 'M485 80 C555 72 644 78 720 190'
const chinaRoutePath = 'M760 140 C760 180 740 180 720 190'
const southAmericaRoutePath = 'M330 280 C430 260 500 140 720 190'
const africaRoutePath = 'M560 270 C580 260 660 240 720 190'
const australiaRoutePath = 'M860 340 C800 300 770 250 720 190'

const southAmericaRoutePathReverse = 'M720 190 C500 140 430 260 330 280'
const africaRoutePathReverse = 'M720 190 C660 240 580 260 560 270'
const australiaRoutePathReverse = 'M720 190 C770 250 800 300 860 340'

const routeDefinitions = [
  { id: 'supply', path: routePath, dashPath: routePath, gradient: 'supplyRouteGradient', color: 'var(--color-accent)', dashFrom: 44, dashTo: 0 },
  { id: 'china', path: chinaRoutePath, dashPath: chinaRoutePath, gradient: 'chinaRouteGradient', color: 'var(--color-accent)', dashFrom: 44, dashTo: 0 },
  { id: 'south-america', path: southAmericaRoutePath, dashPath: southAmericaRoutePathReverse, color: '#00ff18', dashFrom: 0, dashTo: -44 },
  { id: 'africa', path: africaRoutePath, dashPath: africaRoutePathReverse, color: '#00ff18', dashFrom: 0, dashTo: -44 },
  { id: 'australia', path: australiaRoutePath, dashPath: australiaRoutePathReverse, color: '#00ff18', dashFrom: 0, dashTo: -44 },
]

const portPreviews = {
  uk: {
    title: 'Rotterdam Port',
    description: 'Primary European copper entry hub with customs-ready logistics.',
    images: [
      'https://images.unsplash.com/photo-1507120410856-1f35574c3b45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    ],
  },
  china: {
    title: 'Shanghai Port',
    description: 'Asia Pacific export gateway with high-volume manufacturing throughput.',
    images: [
      'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518544888074-6cfd8698ee6b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  'south-america': {
    title: 'Santos Port',
    description: 'South America logistics node for raw copper and material exports.',
    images: [
      'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519392445616-9099407b4b26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=800&q=80',
    ],
  },
  africa: {
    title: 'Durban Port',
    description: 'Strategic African partner for coastal distribution and inland transit.',
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1468581264421-a80f4c6dc395?auto=format&fit=crop&w=800&q=80',
    ],
  },
  australia: {
    title: 'Sydney Port',
    description: 'Outbound supply channel for Asia-Pacific infrastructure and energy markets.',
    images: [
      'https://images.unsplash.com/photo-1488449077988-6cbb5edb1aa1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523800503107-5bc3ba2f2e83?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501390352907-5b1a7bf02f73?auto=format&fit=crop&w=800&q=80',
    ],
  },
}

export default function GlobalSupply() {
  const { isDark } = useTheme()
  const [activePort, setActivePort] = useState(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsTouchDevice(window.matchMedia('(hover: none)').matches || navigator.maxTouchPoints > 0)
  }, [])

  const handlePortEnter = (portId) => {
    if (isTouchDevice) return
    setActivePort(portId)
  }

  const handlePortLeave = () => {
    if (isTouchDevice) return
    setActivePort(null)
  }

  const handlePortClick = (portId) => {
    if (!isTouchDevice) return
    setActivePort((current) => (current === portId ? null : portId))
  }

  return (
    <section className="px-6 py-14 md:px-10 md:py-16">
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl">Local Integrity, Global Supply</h3>
        <p className="mx-auto mt-2 max-w-xl text-muted">Logistics aligned to global partners with fully traceable dispatch documents.</p>
      </div>
      <div className="mt-8 p-4 md:p-6">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_42%,rgba(219,138,58,0.16),transparent_34%)]" />
          <svg
            viewBox="0 0 1000 450"
            role="img"
            aria-labelledby="global-supply-title global-supply-description"
            className="relative z-10 h-auto w-full"
          >
            {/* <title id="global-supply-title">Local Integrity, Global Supply</title> */}
            <desc id="global-supply-description">
              A world map showing an animated supply route from Rotterdam to Bengaluru.
            </desc>

            <defs>
              <linearGradient id="supplyRouteGradient" x1="485" y1="166" x2="690" y2="264" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-accent)" stopOpacity="0.22" />
                <stop offset="0.46" stopColor="#f5c17d" stopOpacity="0.95" />
                <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.42" />
              </linearGradient>
              <linearGradient id="chinaRouteGradient" x1="725" y1="180" x2="860" y2="140" gradientUnits="userSpaceOnUse">
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

            {/* <rect width="1000" height="450" rx="18" fill="var(--color-surface)" opacity="0.36" />
            <g opacity="0.32" fill="none" stroke="var(--color-line)" strokeWidth="0">
              <path d="M0 75H1000M0 150H1000M0 225H1000M0 300H1000M0 375H1000" />
              <path d="M125 0V450M250 0V450M375 0V450M500 0V450M625 0V450M750 0V450M875 0V450" />
            </g> */}

            <image
              href={worldMap}
              x="0"
              y="0"
              width="1000"
              height="450"
              preserveAspectRatio="xMidYMid meet"
              opacity={isDark ? 0.42 : 0.62}
              style={{ filter: isDark ? 'brightness(1)' : 'brightness(0)' }}
            />

            <g filter="url(#routeGlow)">
              {routeDefinitions.map((route) => (
                <g key={route.id}>
                  <path d={route.path} fill="none" stroke={route.color} strokeOpacity="0.18" strokeWidth="1" />
                  <path
                    d={route.dashPath}
                    fill="none"
                    stroke={route.gradient ? (route.gradient === 'supplyRouteGradient' ? 'url(#supplyRouteGradient)' : 'url(#chinaRouteGradient)') : route.color}
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    strokeDasharray="10 12"
                  >
                    <animate attributeName="stroke-dashoffset" from={route.dashFrom} to={route.dashTo} dur="1.8s" repeatCount="indefinite" />
                  </path>
                </g>
              ))}
            </g>

            <g>
              {ports
                .filter((port) => port.id !== 'destination')
                .map((port) => {
                  const idBase = port.id === 'uk' ? 'supply-route' : `${port.id}-route`
                  const motionId = port.type === 'inbound' ? `${idBase}-motion` : `${idBase}-motion-reverse`
                  const duration = port.type === 'inbound' ? '2.2s' : '3.2s'
                  const fillColor = port.type === 'inbound' ? 'var(--color-accent)' : '#00ff18'

                  return (
                    <g key={port.id}>
                      <circle r="4" fill={fillColor}>
                        <animateMotion dur={duration} repeatCount="indefinite" rotate="auto">
                          <mpath href={`#${motionId}`} />
                        </animateMotion>
                      </circle>
                      <circle r="2" fill="#fff3df">
                        <animateMotion dur={duration} repeatCount="indefinite" rotate="auto">
                          <mpath href={`#${motionId}`} />
                        </animateMotion>
                      </circle>
                    </g>
                  )
                })}
            </g>

            <path id="supply-route-motion" d={routePath} fill="none" stroke="none" />
            <path id="china-route-motion" d={chinaRoutePath} fill="none" stroke="none" />
            <path id="south-america-route-motion" d={southAmericaRoutePath} fill="none" stroke="none" />
            <path id="africa-route-motion" d={africaRoutePath} fill="none" stroke="none" />
            <path id="australia-route-motion" d={australiaRoutePath} fill="none" stroke="none" />
            <path id="south-america-route-motion-reverse" d={southAmericaRoutePathReverse} fill="none" stroke="none" />
            <path id="africa-route-motion-reverse" d={africaRoutePathReverse} fill="none" stroke="none" />
            <path id="australia-route-motion-reverse" d={australiaRoutePathReverse} fill="none" stroke="none" />

            <g>
              {ports.map((port) => (
                <g
                  key={port.id}
                  transform={`translate(${port.x} ${port.y})`}
                  className="cursor-pointer"
                  onPointerEnter={() => handlePortEnter(port.id)}
                  onPointerLeave={handlePortLeave}
                >
                  <circle r="20" fill={port.type === 'inbound' && port.id !== 'destination' ? 'var(--color-accent)' : port.id !== 'destination' ? '#00ff18' : 'blue'} opacity="0.12">
                    <animate attributeName="r" values="12;22;12" dur="2.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0;0.2" dur="2.6s" repeatCount="indefinite" />
                  </circle>
                  <circle r="5" fill="#fff3df" />
                  <circle r="3" fill={port.type === 'inbound' && port.id !== 'destination' ? 'var(--color-accent)' : port.id !== 'destination' ? '#00ff18' : 'blue'} />
                </g>
              ))}
            </g>
          </svg>
          {ports.map((port) => {
            const isActive = activePort === port.id
            const side = port.x > 500 ? 'right' : 'left'
            const bubbleClass = `oa-label-bubble`
            return (
              <button
                key={`${port.id}-button`}
                type="button"
                aria-label={`${port.name} preview`}
                onFocus={() => setActivePort(port.id)}
                onBlur={handlePortLeave}
                onClick={() => handlePortClick(port.id)}
                className="group absolute z-20"
                style={{ left: `${(port.x / 1000) * 100}%`, top: `${(port.y / 450) * 100}%`, zIndex: isActive ? 99999 : 20 }}
              >
                <div
                  className={bubbleClass}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    pointerEvents: 'none',
                    opacity: isActive ? 1 : 0,
                    visibility: isActive ? 'visible' : 'hidden',
                    transform: isActive ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
                    transition: 'opacity 0.2s ease, transform 0.5s ease',
                    backgroundColor: 'var(--color-elevated)',
                    border: '1px solid var(--color-accent)',
                    color: 'var(--color-text)',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                >
                  <div className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{port.name}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
