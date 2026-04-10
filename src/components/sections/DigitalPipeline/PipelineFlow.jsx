import { useCallback, useEffect, useRef, useState } from 'react'

import PipelineStep from './PipelineStep'

export default function PipelineFlow({ topItems, bottomItems }) {
  const wireCanvasRef = useRef(null)
  const topNodeRefs = useRef([])
  const bottomNodeRefs = useRef([])
  const [wireLayout, setWireLayout] = useState({
    width: 0,
    height: 0,
    topPaths: [],
    bottomPaths: [],
    bridgePath: '',
  })

  const measureWireLayout = useCallback(() => {
    const canvas = wireCanvasRef.current
    if (!canvas) {
      return
    }

    const canvasRect = canvas.getBoundingClientRect()
    const toPoint = (node) => {
      if (!node) {
        return null
      }

      const rect = node.getBoundingClientRect()
      return {
        x: rect.left - canvasRect.left + rect.width / 2,
        y: rect.top - canvasRect.top + rect.height / 2,
        r: rect.width / 2,
      }
    }

    const topPoints = topNodeRefs.current.map(toPoint).filter(Boolean)
    const bottomPoints = bottomNodeRefs.current.map(toPoint).filter(Boolean)

    const buildPaths = (points) =>
      points.slice(0, -1).map((point, index) => {
        const next = points[index + 1]
        const bendX = (point.x + next.x) / 2
        return `M ${point.x} ${point.y} C ${bendX} ${point.y} ${bendX} ${next.y} ${next.x} ${next.y}`
      })

    let bridgePath = ''
    const topLast = topPoints[topPoints.length - 1]
    const bottomLast = bottomPoints[bottomPoints.length - 1]
    if (topLast && bottomLast) {
      const topStartX = topLast.x + topLast.r - 2
      const bottomEndX = bottomLast.x + bottomLast.r - 2
      const bridgeX = Math.max(topStartX, bottomEndX) + 55
      bridgePath = `M ${topStartX} ${topLast.y} L ${bridgeX} ${topLast.y} L ${bridgeX} ${bottomLast.y} L ${bottomEndX} ${bottomLast.y}`
    }

    setWireLayout({
      width: canvas.clientWidth,
      height: canvas.clientHeight,
      topPaths: buildPaths(topPoints),
      bottomPaths: buildPaths(bottomPoints),
      bridgePath,
    })
  }, [])

  useEffect(() => {
    topNodeRefs.current.length = topItems.length
    bottomNodeRefs.current.length = bottomItems.length
  }, [topItems.length, bottomItems.length])

  useEffect(() => {
    const runMeasure = () => {
      requestAnimationFrame(() => {
        measureWireLayout()
      })
    }

    runMeasure()

    const observer = new ResizeObserver(() => {
      runMeasure()
    })

    if (wireCanvasRef.current) {
      observer.observe(wireCanvasRef.current)
    }

    topNodeRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node)
      }
    })

    bottomNodeRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node)
      }
    })

    window.addEventListener('resize', runMeasure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', runMeasure)
    }
  }, [measureWireLayout, topItems, bottomItems])

  return (
    <div ref={wireCanvasRef} className="relative mt-8">
      <svg
        className="pointer-events-none absolute inset-0 z-0"
        width={wireLayout.width}
        height={wireLayout.height}
        viewBox={`0 0 ${wireLayout.width || 1} ${wireLayout.height || 1}`}
        fill="none"
        aria-hidden="true"
      >
        {wireLayout.topPaths.map((path, index) => (
          <path
            key={`top-wire-${index}`}
            d={path}
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
          />
        ))}
        {wireLayout.bottomPaths.map((path, index) => (
          <path
            key={`bottom-wire-${index}`}
            d={path}
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="1"
          />
        ))}
        {wireLayout.bridgePath ? (
          <path
            d={wireLayout.bridgePath}
            stroke="currentColor"
            className="text-accent"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        ) : null}
      </svg>

      <div
        className="relative z-10 grid items-start gap-10"
        style={{ gridTemplateColumns: `repeat(${topItems.length}, minmax(0, 1fr))` }}
      >
        {topItems.map((item, index) => (
          <PipelineStep
            key={item.title + index}
            item={item}
            circleRef={(node) => {
              topNodeRefs.current[index] = node
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 mt-10 grid items-start gap-10"
        style={{ gridTemplateColumns: `repeat(${bottomItems.length}, minmax(0, 1fr))` }}
      >
        {bottomItems.map((item, index) => (
          <PipelineStep
            key={item.title + '-b-' + index}
            item={item}
            circleRef={(node) => {
              bottomNodeRefs.current[index] = node
            }}
          />
        ))}
      </div>
    </div>
  )
}
