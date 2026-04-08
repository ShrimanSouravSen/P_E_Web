import OrbitalDiagram from './OrbitalDiagram'

export default function IndustryApplications() {
  return (
    <section id="applications" className="border-b border-line px-6 py-14 md:px-10 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Industry Applications</p>
          <h3 className="mt-1 font-heading text-3xl md:text-4xl">High-Conductivity Copper for Critical Systems</h3>
          <p className="mt-3 max-w-2xl text-muted">
            Precision-grade cathodes and ingots for energy, mobility, and infrastructure sectors.
          </p>
        </div>
        <OrbitalDiagram />
      </div>
    </section>
  )
}
