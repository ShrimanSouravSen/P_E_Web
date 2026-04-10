import { useState } from 'react'

import PipelineFlow from './PipelineFlow'

const topFlow = [
  {
    title: 'SCRAP INTAKE',
    icon: 'scrap',
  },
  {
    title: 'Grading',
    icon: 'check',
    chip: 'BATCH TR06S6N0 ACTION',
    chipTone: 'amber',
    tags: ['JetBrains Process data Tags', 'Jetcratea Row 65'],
  },
  {
    title: 'Baling',
    icon: 'batch',
    chip: 'BATCH TR0CG00 DEP/T0S',
    chipTone: 'green',
    tags: ['JArOne103: Process data Tags', 'Jotcratea Neo 56'],
  },
  {
    title: 'Melting',
    icon: 'check',
    chip: 'BATCH TRACQ0N6 GET/1S',
    chipTone: 'green',
    tags: ['JetBrains Nico data Tags', 'JwIPe4txs Row 59'],
  },
  {
    title: 'Refining',
    icon: 'truck',
    chip: 'DAIC0N0',
    chipTone: 'amber',
    tags: ['Jetbrains Room data Tags'],
  },
]

const bottomFlow = [
  {
    title: 'Quality Check',
    subtitle: 'IVERAIS',
    icon: 'scrap',
  },
  {
    title: 'Ingot Output',
    icon: 'bars',
    chip: 'D0C0N0OS SCT16',
    chipTone: 'green',
    tags: ['Jr1or4m Nooor d@ts Tags'],
  },
  {
    title: 'Cutting',
    icon: 'batch',
    chip: 'B0TCH PRSC5S0 t0d8r8th8n',
    chipTone: 'green',
    tags: ['Jebnghlyv Socale data Tags', 'Jotbtratao Nies 55'],
  },
  {
    title: 'Cooling',
    icon: 'check-muted',
    chip: '2rt6itotes Avodines data Tags',
    chipTone: 'green',
    tags: ['Jatbrocin Rons asta Tays'],
  },
  {
    title: 'Moulding',
    icon: 'coil',
    tags: ['AtC0rat3n Scon data Tags', 'SvGrsbrie Row 13'],
  },
]

const topFlowAlt = [
  {
    title: 'Collection',
    icon: 'scrap',
  },
  {
    title: 'Sorting',
    icon: 'check',
    chip: 'SOURCE VERIFIED',
    chipTone: 'amber',
    tags: ['Yard 14 Intake'],
  },
  {
    title: 'Shredding',
    icon: 'batch',
    chip: 'BATCH PREPARED',
    chipTone: 'green',
    tags: ['Line A Mechanical'],
  },
  {
    title: 'Smelting',
    icon: 'check',
    chip: 'TEMP STABLE',
    chipTone: 'green',
    tags: ['Furnace 03'],
  },
  {
    title: 'Anode Casting',
    icon: 'truck',
    chip: 'READY',
    chipTone: 'amber',
    tags: ['Dispatch Queue'],
  },
]

const bottomFlowAlt = [
  {
    title: 'Lab Assay',
    subtitle: 'TRACEABILITY',
    icon: 'scrap',
  },
  {
    title: 'Electrolytic',
    icon: 'bars',
    chip: 'PURITY 99.90%',
    chipTone: 'green',
    tags: ['Cell Group B'],
  },
  {
    title: 'Rod Casting',
    icon: 'batch',
    chip: 'RUNNING',
    chipTone: 'green',
    tags: ['Continuous Cast'],
  },
  {
    title: 'Final QC',
    icon: 'check-muted',
    chip: 'PASS',
    chipTone: 'green',
    tags: ['Lot Locked'],
  },
  {
    title: 'Shipment',
    icon: 'coil',
    tags: ['ERP Closed'],
  },
]

export default function DigitalPipeline() {
  const [showAltPipeline, setShowAltPipeline] = useState(false)
  const activeTop = showAltPipeline ? topFlowAlt : topFlow
  const activeBottom = showAltPipeline ? bottomFlowAlt : bottomFlow

  return (
    <section id="process">
      <div className="overflow-x-auto p-10 md:p-10 py-16">
        <div className="min-w-[1080px]">
          <div className="flex items-center gap-3">
            <h2 className="text-xl leading-none text-accent md:text-xl">Process Storyline</h2>
            <button
              type="button"
              onClick={() => {
                setShowAltPipeline((prev) => !prev)
              }}
              className="rounded-full border border-accent px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-accent transition hover:bg-accent hover:text-bg"
              aria-pressed={showAltPipeline}
            >
              {showAltPipeline ? 'View 1' : 'View 2'}
            </button>
          </div>

          <PipelineFlow key={showAltPipeline ? 'alt' : 'base'} topItems={activeTop} bottomItems={activeBottom} />
        </div>
      </div>
    </section>
  )
}
