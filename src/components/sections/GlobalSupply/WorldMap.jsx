const markers = [
  { left: '20%', top: '45%', city: 'New York' },
  { left: '48%', top: '39%', city: 'Rotterdam' },
  { left: '69%', top: '58%', city: 'Bengaluru' },
  { left: '82%', top: '51%', city: 'Singapore' },
]

export default function WorldMap() {
  return (
    <div className="relative overflow-hidden rounded-tokenLg border border-line bg-elevated p-5">
      <svg viewBox="0 0 1000 450" className="h-auto w-full opacity-45">
        <path d="M86 219l85-94 74-18 83 12 64-22 90 26 70-8 61 35 86 5 126 69-94 60-122-9-75 18-66 34-93-17-66-44-89-8-80-39z" fill="var(--color-muted)" />
      </svg>
      {markers.map((marker) => (
        <button
          key={marker.city}
          type="button"
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: marker.left, top: marker.top }}
        >
          <span className="block h-3 w-3 animate-pulseGlow rounded-full bg-accent" />
          <span className="mt-2 block whitespace-nowrap text-xs text-muted opacity-0 transition group-hover:opacity-100">
            {marker.city}
          </span>
        </button>
      ))}
    </div>
  )
}
