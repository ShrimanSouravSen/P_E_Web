import SustainabilityBg from '../../../assets/Sustainability.png'
import { useTheme } from '../../../hooks/useTheme'
import DonutChart from './DonutChart'

export default function Sustainability() {
  const { isDark } = useTheme()

  return (
    <section id="sustainability">
      <div
        className={`flex min-h-[440px] items-center overflow-hidden border bg-cover bg-center px-5 py-6 shadow-panel md:min-h-[520px] md:px-7 md:py-7 ${
          isDark
            ? 'border-[rgba(226,211,185,0.16)]'
            : 'border-[color:color-mix(in_srgb,var(--color-line)_78%,white)]'
        }`}
        style={{
          backgroundImage: isDark
            ? `linear-gradient(90deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.88) 45%, rgba(0, 0, 0, 0) 100%), url(${SustainabilityBg})`
            : `linear-gradient(90deg, rgba(252, 245, 234, 0.92) 0%, rgba(248, 238, 223, 0.9) 45%, rgba(248, 238, 223, 0.14) 100%), url(${SustainabilityBg})`,
        }}
      >
        <div className="grid w-full items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4">
          <div className="">
            <h3
              className={`mt-1 text-[2.35rem] font-medium uppercase leading-[0.92] md:text-4xl ${
                isDark ? 'text-[rgba(250,245,238,0.98)]' : 'text-[color:color-mix(in_srgb,var(--color-text)_94%,black)]'
              }`}
            >
              Sustainability
            </h3>
            <h3
              className={`mt-1 text-[2.35rem] font-medium uppercase leading-[0.92] md:text-4xl ${
                isDark ? 'text-[rgba(250,245,238,0.98)]' : 'text-[color:color-mix(in_srgb,var(--color-text)_94%,black)]'
              }`}
            >
              Without Compromise
            </h3>
            <p
              className={`mt-4 max-w-[30rem] text-[0.95rem] leading-6 ${
                isDark ? 'text-[rgba(245,237,225,0.72)]' : 'text-[color:color-mix(in_srgb,var(--color-text)_76%,black)]'
              }`}
            >
              Infographic energy need in the tracks and recover cooling energy. Closed-loop copper recovery and lower process emissions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
