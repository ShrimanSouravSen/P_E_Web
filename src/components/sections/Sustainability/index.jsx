import DonutChart from './DonutChart'

export default function Sustainability() {
  return (
    <section id="sustainability" className="border-b border-line px-6 py-14 md:px-10 md:py-16">
      <div className="panel flex flex-col gap-6 bg-[linear-gradient(115deg,var(--color-surface),var(--color-elevated))] p-7 md:p-10">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Sustainability</p>
          <h3 className="mt-1 text-3xl md:text-4xl">Without Compromise</h3>
          <p className="mt-2 max-w-2xl text-muted">
            Hydrogen-ready furnaces, closed-loop cooling, and lower logistics emissions through localized sourcing.
          </p>
        </div>
        <div className="flex flex-wrap gap-8">
          <DonutChart value={100} label="Ore Mining Avoided" />
          <DonutChart value={15.2} label="Scrap Refining Energy Reduction" />
        </div>
      </div>
    </section>
  )
}
