import HeroBg from '../../assets/HeroBg.png'
import { useTheme } from '../../hooks/useTheme'

export default function Hero({ onOpenQuote }) {
  const { isDark } = useTheme()

  return (
    <section id="home" className="grain border-b border-line">
      <div className="relative overflow-hidden shadow-panel">
        <img
          src={HeroBg}
          alt="Molten copper pouring into ingot molds"
          className="h-[360px] w-full object-cover object-center md:h-[460px] lg:h-[520px]"
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.82)_28%,rgba(0,0,0,0.45)_54%,rgba(0,0,0,0.12)_78%,rgba(0,0,0,0.05)_100%)]'
              : 'bg-[linear-gradient(90deg,rgba(253,247,238,0.95)_0%,rgba(247,238,225,0.82)_32%,rgba(244,232,214,0.45)_58%,rgba(244,232,214,0.12)_82%,rgba(244,232,214,0.05)_100%)]'
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[radial-gradient(circle_at_24%_48%,rgba(219,138,58,0.08),transparent_32%)]'
              : 'bg-[radial-gradient(circle_at_24%_48%,rgba(181,98,26,0.14),transparent_34%)]'
          }`}
        />

        <div className="absolute inset-y-0 left-0 z-10 flex w-full items-center px-6 md:px-10 lg:px-12">
          <div className="max-w-[50rem]">
          <p className="text-md leading-[1.02] md:text-md text-accent">What we do</p>
            <h1
              className={`max-w-[40ch] text-[2.45rem] uppercase leading-[0.92] sm:text-[3.3rem] md:text-[4.3rem] lg:text-[5rem] ${
                isDark ? 'text-white' : 'text-[color:color-mix(in_srgb,var(--color-text)_94%,black)]'
              }`}
            >
              Refining the Flow of Future Copper
            </h1>

            <p
              className={`mt-4 max-w-[28rem] text-[1rem] leading-[1.45] md:mt-5 md:text-[1.1rem] ${
                isDark ? 'text-[#b7aea2]' : 'text-[color:color-mix(in_srgb,var(--color-text)_78%,black)]'
              }`}
            >
              From recovered scrap to high-purity copper ingots, built on traceability, process control, and industrial integrity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
