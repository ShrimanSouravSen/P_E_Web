import { useTheme } from '../../../hooks/useTheme'

function MobileStepCard({ item, index, flowHint }) {
  const { isDark } = useTheme()

  return (
    <article
      className="rounded-md border border-line p-3"
      style={{ backgroundColor: isDark ? '#18161b' : '#fff8f0' }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="mt-0.5 text-[0.95rem] font-semibold leading-tight text-text">{item.title}</h4>
        <span className="shrink-0 rounded-full border border-accent/60 px-1.5 py-0.5 text-[0.62rem] uppercase tracking-[0.06em] text-accent">
          Step {index + 1}
        </span>
      </div>

      {item.chip ? (
        <p className="mt-2 rounded-md bg-[#9abd97] px-2 py-1 text-[0.64rem] leading-snug text-[#141414]">{item.chip}</p>
      ) : null}

      {item.tags?.[0] ? (
        <p
          className="mt-2 rounded-md border border-accent px-2 py-1 text-[0.62rem] leading-snug"
          style={{
            backgroundColor: isDark ? '#1d1b21' : '#f0e6d8',
            color: isDark ? 'var(--color-muted)' : '#241b12',
          }}
        >
          {item.tags[0]}
        </p>
      ) : null}
    </article>
  )
}

export default function DigitalPipelineMobile({ topItems, bottomItems }) {
  const secondRowInFlowOrder = [...bottomItems].reverse()
  const orderedSteps = [
    ...topItems.map((item) => ({ item, flowHint: 'Row 1 • L → R' })),
    ...secondRowInFlowOrder.map((item) => ({ item, flowHint: 'Row 2 • R → L' })),
  ]

  return (
    <div className="mt-8 space-y-4 md:hidden">
      <div className="space-y-2">
        {orderedSteps.map(({ item, flowHint }, index) => (
          <div key={`${item.title}-${index}`}>
            <MobileStepCard item={item} index={index} flowHint={flowHint} />
            {/* {index === topItems.length - 1 ? (
              <div className="flex items-center justify-center py-1">
                <span className="text-[0.65rem] uppercase tracking-[0.06em] text-accent">Refining to Moulding</span>
              </div>
            ) : null} */}
            {index < orderedSteps.length - 1 ? (
              <div className="flex justify-center py-1" aria-hidden="true">
                <span className="text-base font-semibold text-accent">↓</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
