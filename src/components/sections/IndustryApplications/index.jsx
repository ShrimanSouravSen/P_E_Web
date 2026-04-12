import OrbitalDiagram from './OrbitalDiagram'
import OrbitAnimation from './OrbitAnimation'

export default function IndustryApplications() {
  return (
    <section id="applications" className="border-b border-line px-6 py-10 md:px-10 md:py-10">
      <div className="grid gap-8 lg:gap-0 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Industry Applications</p>
          <h3 className="mt-1 text-3xl md:text-4xl">High-Conductivity Copper for Critical Systems</h3>
          <p className="mt-3 max-w-2xl text-muted">
            Precision-grade cathodes and ingots for energy, mobility, and infrastructure sectors.
          </p>
        </div>
        <div className="lg:flex lg:justify-center">
          {/* <OrbitalDiagram /> */}
          <OrbitAnimation contentScale={0.74} style={{ height: '420px' }} />
        </div>
      </div>
    </section>
  )
}
