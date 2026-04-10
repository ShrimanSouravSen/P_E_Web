const ACCENT_BORDER_CLASS = 'border border-accent'

function NodeIcon({ type }) {
  if (type === 'scrap') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="9" r="2.8" />
        <circle cx="15" cy="9" r="2.8" />
        <circle cx="12" cy="14.3" r="2.8" />
      </svg>
    )
  }

  if (type === 'batch') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 18V8l8 3 8-3v10" />
        <path d="M12 3v8" />
        <path d="M8 5v4" />
        <path d="M16 5v4" />
      </svg>
    )
  }

  if (type === 'truck') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.8" y="6.5" width="12.5" height="8" rx="1" />
        <path d="M15.3 9h3.6l2.2 2.1v3.4h-5.8" />
        <circle cx="7" cy="16.8" r="1.3" />
        <circle cx="17.5" cy="16.8" r="1.3" />
      </svg>
    )
  }

  if (type === 'bars') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 18h16" />
        <rect x="6" y="10" width="2.6" height="6" />
        <rect x="10.7" y="7" width="2.6" height="9" />
        <rect x="15.4" y="12" width="2.6" height="4" />
      </svg>
    )
  }

  if (type === 'coil') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12c0-2.8 2.5-4 5-4 2.6 0 5 1.2 5 4s-2.4 4-5 4" />
        <path d="M9 8c2.6 0 5 1.2 5 4s-2.4 4-5 4" />
        <path d="M14 8c2.6 0 5 1.2 5 4s-2.4 4-5 4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-accent" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="6.5" />
      <path d="m8.6 12.3 2.2 2.2 4.8-5.2" />
    </svg>
  )
}

export default function PipelineStep({ item, circleRef }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        ref={circleRef}
        className={`${ACCENT_BORDER_CLASS} flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(49,43,38,0.96),rgba(29,28,30,0.98))]`}
      >
        <NodeIcon type={item.icon} />
      </div>

      <p className="mt-3 text-[1.95rem] leading-none text-text">{item.title}</p>
      {item.subtitle ? <p className="mt-1 text-[0.9rem] text-muted">{item.subtitle}</p> : null}

      {item.chip ? (
        <p
          className={`mt-3 rounded-md px-3 py-1 text-[0.72rem] leading-none text-[#141414] ${
            item.chipTone === 'amber' ? 'bg-[rgba(237,174,92,0.95)]' : 'bg-[rgba(154,189,151,0.9)]'
          }`}
        >
          {item.chip}
        </p>
      ) : null}

      {item.tags?.map((tag) => (
        <p
          key={tag}
          className={`${ACCENT_BORDER_CLASS} mt-2 rounded-md bg-[rgba(53,52,54,0.76)] px-3 py-1 text-[0.72rem] leading-none text-muted`}
        >
          {tag}
        </p>
      ))}
    </div>
  )
}
