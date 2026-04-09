import WorldMap from './WorldMap'

export default function GlobalSupply() {
  return (
    <section className="px-6 py-14 md:px-10 md:py-16">
      <div className="text-center">
        <h3 className="text-3xl md:text-4xl">Local Integrity, Global Supply</h3>
        <p className="mx-auto mt-2 max-w-xl text-muted">Logistics aligned to global partners with fully traceable dispatch documents.</p>
      </div>
      <div className="mt-8">
        <WorldMap />
      </div>
    </section>
  )
}
