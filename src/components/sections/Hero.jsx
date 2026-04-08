import Button from '../ui/Button'

export default function Hero({ onOpenQuote }) {
  return (
    <section id="home" className="grain border-b border-line px-6 pb-14 pt-12 md:px-10 md:pt-16">
      <div className="relative overflow-hidden rounded-tokenLg border border-line/70">
        <img
          src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1600&q=80"
          alt="Molten copper pouring"
          className="h-[470px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/55" />

        <div className="absolute left-0 top-0 w-full px-7 py-8 md:max-w-2xl md:px-10 md:py-12">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-muted">Scrap to Industrial Ingots</p>
          <h1 className="font-heading text-4xl font-semibold leading-[1.02] text-white md:text-6xl">
            REFINING THE FLOW OF FUTURE COPPER
          </h1>
          <p className="mt-5 max-w-xl text-base text-[#e7d8c8] md:text-xl">
            From scrap to industrial ingots, powered by transparency and integrity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>Explore Process</Button>
            <Button variant="ghost" onClick={onOpenQuote}>
              Quick Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
