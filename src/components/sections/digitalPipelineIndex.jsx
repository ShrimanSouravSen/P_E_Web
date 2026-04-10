import { useState } from 'react'

import DigitalPipelineFolder from './DigitalPipeline/index.jsx'
import pipelineItems from './digitalPipelineData.json'

const BOARD_WIDTH = 1120
const BOARD_HEIGHT = 320
const CIRCLE_RADIUS = 34

function getEvenPositions(count, start, end) {
  if (count <= 0) {
    return []
  }

  if (count === 1) {
    return [(start + end) / 2]
  }

  const step = (end - start) / (count - 1)
  return Array.from({ length: count }, (_, index) => start + step * index)
}

function TimelineIcon({ kind }) {
  if (kind === 'scrap') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="8" cy="8" r="2.2" />
        <circle cx="16" cy="8" r="2.2" />
        <circle cx="12" cy="14" r="2.2" />
      </svg>
    )
  }

  if (kind === 'sort') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 6h12" />
        <path d="M9 6v12" />
        <path d="m6 13 3 3 3-3" />
        <path d="M15 6v12" />
        <path d="m12 9 3-3 3 3" />
      </svg>
    )
  }

  if (kind === 'grade' || kind === 'quality') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="5" width="12" height="14" rx="2" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }

  if (kind === 'bale' || kind === 'cast') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 9 12 5l7 4-7 4-7-4Z" />
        <path d="M5 9v6l7 4 7-4V9" />
      </svg>
    )
  }

  if (kind === 'shred') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 7 10 10" />
        <path d="m17 7-10 10" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    )
  }

  if (kind === 'melt') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4c2 3-1 4 1 6 1 1 3 2 3 5a4 4 0 0 1-8 0c0-2 1-3 2-4 2-2 1-4 2-7Z" />
      </svg>
    )
  }

  if (kind === 'refine') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="12" height="10" rx="2" />
        <path d="M9 16v3" />
        <path d="M15 16v3" />
        <path d="M8 11h8" />
      </svg>
    )
  }

  if (kind === 'dispatch') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="9" width="10" height="6" rx="1" />
        <path d="M14 11h3l3 2v2h-6" />
        <circle cx="8" cy="16" r="1.3" />
        <circle cx="17" cy="16" r="1.3" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="6" />
    </svg>
  )
}

function buildPlaceholderLayout(items) {
  const topCount = Math.ceil(items.length / 2)
  const topItems = items.slice(0, topCount)
  const bottomItems = items.slice(topCount)

  const topPositions = getEvenPositions(topItems.length, 128, BOARD_WIDTH - 128)
  const bottomPositions = getEvenPositions(bottomItems.length, 128, BOARD_WIDTH - 128)

  const mappedTop = topItems.map((item, index) => ({
    ...item,
    x: topPositions[index],
    y: 96,
  }))

  const mappedBottom = bottomItems.map((item, index) => ({
    ...item,
    x: bottomPositions[bottomItems.length - 1 - index],
    y: 224,
  }))

  const topLinks = mappedTop.slice(0, -1).map((node, index) => ({
    from: node,
    to: mappedTop[index + 1],
  }))

  const bottomLinks = mappedBottom.slice(0, -1).map((node, index) => ({
    from: node,
    to: mappedBottom[index + 1],
  }))

  const topLast = mappedTop[mappedTop.length - 1]
  const bottomFirst = mappedBottom[0]
  const bridgeLink = topLast && bottomFirst ? { from: topLast, to: bottomFirst } : null

  return {
    nodes: [...mappedTop, ...mappedBottom],
    topLinks,
    bottomLinks,
    bridgeLink,
  }
}

function CopperTube({ x, y, width, height, vertical = false }) {
  const glowStyle = {
    background: 'rgba(255, 178, 110, 0.42)',
    filter: 'blur(3px)',
  }

  const bodyGradient = vertical
    ? 'linear-gradient(90deg, #5d2b13 0%, #a5572a 20%, #ffd3a1 46%, #efab6f 60%, #9a4f25 80%, #51250f 100%)'
    : 'linear-gradient(180deg, #5d2b13 0%, #a5572a 20%, #ffd3a1 46%, #efab6f 60%, #9a4f25 80%, #51250f 100%)'

  const highlightStyle = vertical
    ? { left: '18%', top: '8%', width: '24%', height: '84%' }
    : { left: '8%', top: '16%', width: '84%', height: '24%' }

  return (
    <div
      className="pointer-events-none absolute z-0"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${Math.max(width, 2)}px`,
        height: `${Math.max(height, 2)}px`,
      }}
    >
      <div className="absolute inset-0 rounded-full" style={glowStyle} />
      <div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: '#3f1d0d',
          background: bodyGradient,
          boxShadow: 'inset 0 1px 0 rgba(255, 235, 205, 0.58), inset 0 -1px 0 rgba(70, 30, 14, 0.55), 0 1px 3px rgba(0,0,0,0.45)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          ...highlightStyle,
          background: vertical
            ? 'linear-gradient(180deg, rgba(255,245,232,0) 0%, rgba(255,245,232,0.92) 50%, rgba(255,245,232,0) 100%)'
            : 'linear-gradient(90deg, rgba(255,245,232,0) 0%, rgba(255,245,232,0.92) 50%, rgba(255,245,232,0) 100%)',
        }}
      />
    </div>
  )
}

function PipeJoint({ x, y, r = 5.2 }) {
  return (
    <div
      className="pointer-events-none absolute z-[1] rounded-full border"
      style={{
        left: `${x - r}px`,
        top: `${y - r}px`,
        width: `${r * 2}px`,
        height: `${r * 2}px`,
        borderColor: '#4f2813',
        background: 'radial-gradient(circle at 30% 30%, #f7d1a2 0%, #c77839 52%, #5a2d14 100%)',
        boxShadow: '0 0 3px rgba(0,0,0,0.4)',
      }}
    />
  )
}

function ProcessNode({ item }) {
  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full border border-accent bg-surface">
        <TimelineIcon kind={item.icon} />
      </div>
      <p className="mt-3 min-w-[120px] text-center text-sm text-text">{item.title}</p>
    </div>
  )
}

export default function DigitalPipelineIndex() {
  const [useFolderDesign, setUseFolderDesign] = useState(false)
  const { nodes, topLinks, bottomLinks, bridgeLink } = buildPlaceholderLayout(pipelineItems)
  const bridgeBendX = bridgeLink ? bridgeLink.from.x + CIRCLE_RADIUS + 42 : 0

  return (
    <section id="process">
      <div className="overflow-x-auto px-10 py-16 md:px-10">
        <div className="min-w-[1120px] rounded-tokenLg border border-line bg-surface/40 shadow-panel">
          <div className="border-b border-line px-8 py-5">
            <div className="flex items-center gap-3">
              <h2 className="text-xl leading-none text-accent md:text-xl">Process Storyline</h2>
              <button
                type="button"
                onClick={() => {
                  setUseFolderDesign((prev) => !prev)
                }}
                className="rounded-full border border-accent px-3 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-accent transition hover:bg-accent hover:text-bg"
              >
                {useFolderDesign ? 'Folder Design' : 'Standalone'}
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">D3 placeholders are generated directly from JSON data. Add or remove objects in the data file and the circles will update automatically.</p>
          </div>

          {useFolderDesign ? (
            <div className="pt-2">
              <DigitalPipelineFolder />
            </div>
          ) : (
            <div className="relative h-[320px] w-[1120px] px-8 py-8">
            {topLinks.map((link) => {
              const x1 = link.from.x + CIRCLE_RADIUS
              const x2 = link.to.x - CIRCLE_RADIUS
              return (
                <div key={`top-pipe-${link.from.title}-${link.to.title}`}>
                  <CopperTube x={Math.min(x1, x2)} y={link.from.y - 19} width={Math.abs(x2 - x1)} height={10} />
                  <PipeJoint x={x1} y={link.from.y - 15} />
                  <PipeJoint x={x2} y={link.to.y - 15} />
                </div>
              )
            })}

            {bottomLinks.map((link) => {
              const x1 = link.from.x - CIRCLE_RADIUS
              const x2 = link.to.x + CIRCLE_RADIUS
              return (
                <div key={`bottom-pipe-${link.from.title}-${link.to.title}`}>
                  <CopperTube x={Math.min(x1, x2)} y={link.from.y - 19} width={Math.abs(x2 - x1)} height={10} />
                  <PipeJoint x={x1} y={link.from.y - 15} />
                  <PipeJoint x={x2} y={link.to.y - 15} />
                </div>
              )
            })}

            {bridgeLink ? (
              <>
                <CopperTube
                  x={Math.min(bridgeLink.from.x + CIRCLE_RADIUS, bridgeBendX)}
                  y={bridgeLink.from.y - 19}
                  width={Math.abs(bridgeBendX - (bridgeLink.from.x + CIRCLE_RADIUS))}
                  height={10}
                />
                <CopperTube x={bridgeBendX - 5} y={bridgeLink.from.y - 19} width={10} height={Math.abs(bridgeLink.to.y - bridgeLink.from.y)} vertical />
                <CopperTube
                  x={Math.min(bridgeBendX, bridgeLink.to.x + CIRCLE_RADIUS)}
                  y={bridgeLink.to.y - 19}
                  width={Math.abs((bridgeLink.to.x + CIRCLE_RADIUS) - bridgeBendX)}
                  height={10}
                />
                <PipeJoint x={bridgeLink.from.x + CIRCLE_RADIUS} y={bridgeLink.from.y - 15} />
                <PipeJoint x={bridgeBendX} y={bridgeLink.from.y - 15} r={5.4} />
                <PipeJoint x={bridgeBendX} y={bridgeLink.to.y - 15} r={5.4} />
                <PipeJoint x={bridgeLink.to.x + CIRCLE_RADIUS} y={bridgeLink.to.y - 15} />
              </>
            ) : null}

            {nodes.map((item) => (
              <ProcessNode key={item.title} item={item} />
            ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}