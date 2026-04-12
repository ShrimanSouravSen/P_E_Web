import PipelineFlow from './PipelineFlow'
import DigitalPipelineMobile from './DigitalPipelineMobile'
import { useTheme } from '../../../hooks/useTheme'

const topFlow = [
  {
    title: 'SCRAP INTAKE',
    icon: 'scrap',
    chip: 'Current Intake: 272M tonnes (FY25)',
    chipTone: 'green',
    tags: ['Target: +4.1% by FY27'],
  },
  {
    title: 'Grading',
    icon: 'check',
    chip: 'Current Accuracy: 96.8%',
    chipTone: 'green',
    tags: ['Target: ~98.5%'],
  },
  {
    title: 'Baling',
    icon: 'batch',
    chip: 'Current Output: 18.4k Bales/Month',
    chipTone: 'green',
    tags: ['Target: ~26.7k Bales/Month'],
  },
  {
    title: 'Melting',
    icon: 'check',
    chip: 'Current Furnace efficiency: 89.4%',
    chipTone: 'green',
    tags: ['Target: ~92%'],
  },
  {
    title: 'Refining',
    icon: 'truck',
    chip: 'Current Purity: 99.93% Cu',
    chipTone: 'green',
    tags: ['Target: ~99.97%'],
  },
]

const bottomFlow = [
  {
    title: 'Quality Check',
    icon: 'scrap',
    chip: 'Current QA pass: 98.7%',
    chipTone: 'green',
    tags: ['Target: ~99.1%'],
  },
  {
    title: 'Ingot Output',
    icon: 'bars',
    chip: 'Current Output: 21.6k Ingots/Month',
    chipTone: 'green',
    tags: ['Target: ~42.3k Ingots/Month'],
  },
  {
    title: 'Cutting',
    icon: 'batch',
    chip: 'Current Tolerance: +-0.35 mm',
    chipTone: 'green',
    tags: ['Target: ~+-0.20 mm'],
  },
  {
    title: 'Cooling',
    icon: 'check-muted',
    chip: 'Current Cycle time: 42 min',
    chipTone: 'green',
    tags: ['Target: ~30 min'],
  },
  {
    title: 'Moulding',
    icon: 'coil',
    chip: 'Current Yield: 97.9%',
    chipTone: 'green',
    tags: ['Target: ~99.1%'],
  },
]

export default function DigitalPipeline() {
  const { isDark } = useTheme()

  return (
    <section id="process">
      <div className="px-4 py-16 md:px-10">
        <div
          className={`mx-auto w-full`}
        >
          <p className="mb-2 text-sm uppercase tracking-[0.15em] text-accent">Process Storyline</p>
          <h2 className="text-4xl leading-tight text-text md:text-4xl">
            From Discarded Metal to Sustainable Resource
          </h2>
          <p className="mt-4 text-muted">
            What begins as scrap is carefully transformed through a series of controlled, high-precision processes into high-purity copper.
          </p>

          <div className="hidden md:block">
            <PipelineFlow topItems={topFlow} bottomItems={bottomFlow} />
          </div>
          <DigitalPipelineMobile topItems={topFlow} bottomItems={bottomFlow} />
        </div>
      </div>
    </section>
  )
}
