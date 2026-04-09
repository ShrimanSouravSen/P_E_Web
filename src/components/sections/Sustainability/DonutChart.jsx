export default function DonutChart({ value, label, size = 72, stroke = 10, tone = 'accent', valueSuffix = '%' }) {
  const radius = size / 2
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference
  const strokeColor = tone === 'muted' ? 'rgba(224, 196, 157, 0.68)' : 'url(#sustainabilityCopper)'

  return (
    <div className="flex flex-col items-center gap-2">
      <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 overflow-visible">
        <defs>
          <linearGradient id="sustainabilityCopper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3c28e" />
            <stop offset="35%" stopColor="#d7894a" />
            <stop offset="70%" stopColor="#a85e2b" />
            <stop offset="100%" stopColor="#6f3717" />
          </linearGradient>
        </defs>
        <circle
          stroke="rgba(247, 243, 238, 0.14)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 900ms ease' }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="rgba(255, 224, 187, 0.16)"
          fill="transparent"
          strokeWidth="1"
          r={normalizedRadius + stroke / 2 + 2}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="-mt-[52%] flex min-h-[1.5rem] items-center justify-center text-center">
        <p className="font-mono text-[10px] tracking-[0.04em] text-[rgba(248,239,230,0.92)]">
          {value}
          {valueSuffix}
        </p>
      </div>
      <p className="mt-2 text-center text-[11px] text-[rgba(247,243,238,0.82)]">{label}</p>
    </div>
  )
}
