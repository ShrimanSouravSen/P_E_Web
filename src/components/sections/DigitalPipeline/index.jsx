import { useState } from 'react'
import PipelineStep from './PipelineStep'
import PipelineFlow from './PipelineFlow'

const steps = [
  { title: 'Sourced with Integrity', subtitle: 'Curated feedstock from verified collectors.' },
  { title: 'Analysis & Grading', subtitle: 'Optical emission spectroscopy and ERP tagging.' },
  { title: 'Advanced Refining', subtitle: 'Secondary smelting in controlled furnaces.' },
  { title: 'Molding & Cooling', subtitle: 'Continuous casting into ingots.' },
  { title: 'Certified Traceability', subtitle: 'Final QA with batch-level documentation.' },
]

export default function DigitalPipeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="process" className="border-b border-line px-6 py-14 md:px-10 md:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-heading text-4xl md:text-5xl">Digital Pipeline</h2>
        <p className="max-w-md text-sm text-muted md:text-base">Traceable from collection to casting with telemetry-ready checkpoints.</p>
      </div>

      <PipelineFlow />

      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, index) => (
          <button
            type="button"
            key={step.title}
            className="text-left"
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <PipelineStep {...step} active={index === activeIndex} />
          </button>
        ))}
      </div>
    </section>
  )
}
