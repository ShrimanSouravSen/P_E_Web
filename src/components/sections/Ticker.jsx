const tickerItems = [
  '99.9% Purity Guaranteed',
  '100% Scrap-Sourced',
  'ERP-Tracked Batches',
  'Global Delivery',
]

export default function Ticker() {
  const row = tickerItems

  return (
    <section className="relative border-y border-line bg-elevated/30 py-3">
      <div className="relative w-full overflow-hidden">
        <div className="inline-flex min-w-max animate-marquee whitespace-nowrap will-change-transform">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex shrink-0 items-center pr-10" aria-hidden={loop === 1}>
            {row.map((item, index) => (
              <span key={`${loop}-${item}-${index}`} className="mx-5 font-mono text-sm text-muted">
                | {item}
              </span>
            ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
