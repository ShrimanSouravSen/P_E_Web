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
    <div className="mt-8 md:hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderedSteps.map(({ item, flowHint }, index) => (
          <MobileStepCard key={`${item.title}-${index}`} item={item} index={index} flowHint={flowHint} />
        ))}
      </div>
    </div>
  )
}
