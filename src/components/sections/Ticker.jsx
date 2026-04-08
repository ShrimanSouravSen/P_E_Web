const tickerItems = [
  '99.9% Purity Guaranteed',
  '100% Scrap-Sourced',
  'ERP-Tracked Batches',
  'Global Delivery',
]

export default function Ticker() {
  const row = [...tickerItems, ...tickerItems]

  return (
    <section className="overflow-hidden border-y border-line bg-elevated/30 py-3">
      <div className="animate-marquee whitespace-nowrap">
        {row.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-5 font-mono text-sm text-muted">
            | {item}
          </span>
        ))}
      </div>
    </section>
  )
}
