const tickerItems = [
  '99.9% Purity Guaranteed',
  '100% Scrap-Sourced',
  'ERP-Tracked Batches',
  'Global Delivery',
  'ISO-Compliant Operations',
  'Consistent Metallurgical Quality',
  'Traceable Lot Certification',
  'On-Time Dispatch Support',
  'Sustainable Copper Recovery',
  'Industrial-Grade Reliability',
]

export default function Ticker() {
  const row = tickerItems

  return (
    <section className="relative border-y border-line bg-elevated/30 py-3">
      <div className="relative w-full overflow-hidden">
        <div className="inline-flex min-w-max animate-marquee whitespace-nowrap will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
          {[0, 1].map((loop) => (
            <div key={loop} className="flex shrink-0 items-center" aria-hidden={loop === 1}>
            {row.map((item, index) => (
              <span key={`${loop}-${item}-${index}`} className="px-5 font-mono text-sm text-muted separator">
                 {item}
              </span>
            ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
