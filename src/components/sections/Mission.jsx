export default function Mission() {
  return (
    <section id="about" className="border-b border-line px-6 py-14 md:px-10 md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.15em] text-accent">Purity Forged from History</p>
          <h2 className="font-heading text-4xl leading-tight md:text-5xl">
            We don't mine the earth. We refine it.
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            Transitioning from traditional mining to urban mining with accountable, measurable metallurgy.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img
            className="h-56 w-full rounded-tokenMd border border-line object-cover"
            src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80"
            alt="Factory interior"
          />
          <img
            className="mt-10 h-56 w-full rounded-tokenMd border border-line object-cover"
            src="https://images.unsplash.com/photo-1565610222536-ef125c59da2d?auto=format&fit=crop&w=900&q=80"
            alt="Industrial plant"
          />
        </div>
      </div>
    </section>
  )
}
