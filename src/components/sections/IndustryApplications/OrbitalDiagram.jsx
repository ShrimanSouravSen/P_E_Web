const points = [
  { x: 0, y: -84, label: 'Electrical & Power' },
  { x: 87, y: -10, label: 'EV Components' },
  { x: 0, y: 86, label: 'Infrastructure' },
  { x: -88, y: -14, label: 'Renewable Energy' },
]

export default function OrbitalDiagram() {
  return (
    <div className="relative mx-auto h-[320px] w-[320px]">
      <div className="absolute inset-0 animate-orbit rounded-full border border-accent/50" />
      <div className="absolute inset-8 animate-orbit rounded-full border border-accent/35 [animation-duration:18s]" />
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--color-accent),#7f4a18)] shadow-copper" />
      <svg viewBox="-160 -160 320 320" className="absolute inset-0 h-full w-full overflow-visible">
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="7" fill="var(--color-accent)" />
            <text x={point.x} y={point.y + 22} textAnchor="middle" fill="var(--color-muted)" fontSize="10">
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
