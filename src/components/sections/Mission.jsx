export default function Mission() {
  return (
    <section id="about" className="border-b border-line px-6 py-14 md:px-10 md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.15em] text-accent">Purity Forged from History</p>
          <h2 className="text-4xl leading-tight md:text-5xl">
            We don't mine the earth. We refine it.
          </h2>
          <p className="mt-4 max-w-lg text-muted">
            Transitioning from traditional mining to urban mining with accountable, measurable metallurgy.
          </p>
        </div>

        <div className="grid h-[420px] w-full grid-cols-3 grid-rows-2 gap-2">

          {/* 1 — tall left, spans both rows */}
          <div className="col-span-1 row-span-2 overflow-hidden rounded-tokenMd border border-line/60 shadow-panel">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80"
              alt="Heavy refinery plant"
            />
          </div>

          {/* 3 — top middle */}
          <div className="col-span-1 row-span-1 overflow-hidden rounded-tokenMd border border-line/60 shadow-panel">
            <img
              className="h-full w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80"
              alt="Industrial casting and molds"
            />
          </div>

          {/* 2 — top right */}
          <div className="col-span-1 row-span-1 overflow-hidden rounded-tokenMd border border-line/60 shadow-panel">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80"
              alt="Factory floor machinery"
            />
          </div>

          {/* 4 — wide bottom, spans two columns */}
          <div className="col-span-2 row-span-1 overflow-hidden rounded-tokenMd border border-line/60 shadow-panel">
            <img
              className="h-full w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=900&q=80"
              alt="Copper refinery exterior"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
