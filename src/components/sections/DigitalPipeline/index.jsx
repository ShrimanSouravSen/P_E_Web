import { Fragment } from 'react'

const topFlow = [
  {
    title: 'SCRAP INTAKE',
    icon: 'scrap',
  },
  {
    title: 'Grading',
    icon: 'check',
    chip: 'BATCH TR06S6N0 ACTION',
    chipTone: 'amber',
    tags: ['JetBrains Process data Tags', 'Jetcratea Row 65'],
  },
  {
    title: 'Baling',
    icon: 'batch',
    chip: 'BATCH TR0CG00 DEP/T0S',
    chipTone: 'green',
    tags: ['JArOne103: Process data Tags', 'Jotcratea Neo 56'],
  },
  {
    title: 'Melting',
    icon: 'check',
    chip: 'BATCH TRACQ0N6 GET/1S',
    chipTone: 'green',
    tags: ['JetBrains Nico data Tags', 'JwIPe4txs Row 59'],
  },
  {
    title: 'Refining',
    icon: 'truck',
    chip: 'DAIC0N0',
    chipTone: 'amber',
    tags: ['Jetbrains Room data Tags'],
  },
]

const bottomFlow = [
  {
    title: 'Quality Check',
    subtitle: 'IVERAIS',
    icon: 'scrap',
  },
  {
    title: 'Ingot Output',
    icon: 'bars',
    chip: 'D0C0N0OS SCT16',
    chipTone: 'green',
    tags: ['Jr1or4m Nooor d@ts Tags'],
  },
  {
    title: 'Cutting',
    icon: 'batch',
    chip: 'B0TCH PRSC5S0 t0d8r8th8n',
    chipTone: 'green',
    tags: ['Jebnghlyv Socale data Tags', 'Jotbtratao Nies 55'],
  },
  {
    title: 'Cooling',
    icon: 'check-muted',
    chip: '2rt6itotes Avodines data Tags',
    chipTone: 'green',
    tags: ['Jatbrocin Rons asta Tays'],
  },
  {
    title: 'Moulding',
    icon: 'coil',
    tags: ['AtC0rat3n Scon data Tags', 'SvGrsbrie Row 13'],
  },
]

function NodeIcon({ type }) {
  if (type === 'scrap') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-[rgba(221,152,94,0.95)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="9" r="2.8" />
        <circle cx="15" cy="9" r="2.8" />
        <circle cx="12" cy="14.3" r="2.8" />
      </svg>
    )
  }

  if (type === 'batch') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-[rgba(221,152,94,0.95)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 18V8l8 3 8-3v10" />
        <path d="M12 3v8" />
        <path d="M8 5v4" />
        <path d="M16 5v4" />
      </svg>
    )
  }

  if (type === 'truck') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-[rgba(221,152,94,0.95)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.8" y="6.5" width="12.5" height="8" rx="1" />
        <path d="M15.3 9h3.6l2.2 2.1v3.4h-5.8" />
        <circle cx="7" cy="16.8" r="1.3" />
        <circle cx="17.5" cy="16.8" r="1.3" />
      </svg>
    )
  }

  if (type === 'bars') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-[rgba(221,152,94,0.95)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 18h16" />
        <rect x="6" y="10" width="2.6" height="6" />
        <rect x="10.7" y="7" width="2.6" height="9" />
        <rect x="15.4" y="12" width="2.6" height="4" />
      </svg>
    )
  }

  if (type === 'coil') {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-[rgba(221,152,94,0.95)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12c0-2.8 2.5-4 5-4 2.6 0 5 1.2 5 4s-2.4 4-5 4" />
        <path d="M9 8c2.6 0 5 1.2 5 4s-2.4 4-5 4" />
        <path d="M14 8c2.6 0 5 1.2 5 4s-2.4 4-5 4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-[rgba(221,152,94,0.95)]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="6.5" />
      <path d="m8.6 12.3 2.2 2.2 4.8-5.2" />
    </svg>
  )
}

function FlowNode({ item }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[rgba(211,145,92,0.44)] bg-[radial-gradient(circle_at_35%_30%,rgba(49,43,38,0.96),rgba(29,28,30,0.98))]">
        <NodeIcon type={item.icon} />
      </div>

      <p className="mt-3 text-[1.95rem] leading-none text-[rgba(245,236,224,0.94)]">{item.title}</p>
      {item.subtitle ? <p className="mt-1 text-[0.9rem] text-[rgba(217,205,191,0.72)]">{item.subtitle}</p> : null}

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
          className="mt-2 rounded-md border border-[rgba(81,78,76,0.8)] bg-[rgba(53,52,54,0.76)] px-3 py-1 text-[0.72rem] leading-none text-[rgba(216,208,196,0.72)]"
        >
          {tag}
        </p>
      ))}
    </div>
  )
}

export default function DigitalPipeline() {
  return (
    <section id="process">
      <div className="overflow-x-auto p-10 md:p-10 py-16">
        <div className="min-w-[1080px]">
          <h2 className="text-xl leading-none text-accent md:text-xl">Process Storyline</h2>

          <div className="relative mt-8">
            <div className="grid grid-cols-[1fr_38px_1fr_38px_1fr_38px_1fr_38px_1fr] items-start">
              {topFlow.map((item, index) => (
                <Fragment key={item.title + index}>
                  <FlowNode item={item} />
                  {index < topFlow.length - 1 ? (
                    <div className="pt-11 text-center text-[2.05rem] text-[rgba(204,137,83,0.82)]">→</div>
                  ) : null}
                </Fragment>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-[1fr_38px_1fr_38px_1fr_38px_1fr_38px_1fr] items-start">
              {[...bottomFlow].map((item, index) => (
                <Fragment key={item.title + '-b-' + index}>
                  <FlowNode item={item} />
                  {index < bottomFlow.length - 1 ? (
                    <div className="pt-11 text-center text-[2.05rem] text-[rgba(204,137,83,0.82)]">←</div>
                  ) : null}
                </Fragment>
              ))}
            </div>

            <div className="pointer-events-none absolute -right-1 top-[44px] flex h-[259px] w-[88px] flex-col items-center justify-between rounded-r-[42px] border-r border-t border-b border-[rgba(204,137,83,0.62)] py-3">
              <span className="text-[2rem] text-[rgba(204,137,83,0.82)]">↓</span>
              <span className="text-[2rem] text-[rgba(204,137,83,0.82)]">←</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
