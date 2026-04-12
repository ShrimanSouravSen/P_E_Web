import { useCallback, useEffect, useRef, useState } from 'react'

import PipelineStep from './PipelineStep'

const WIRE_TEXT_GAP = 24
const BRIDGE_CORNER_RADIUS = 14

export default function PipelineFlow({ topItems, bottomItems }) {
  const wireCanvasRef = useRef(null)
  const topNodeRefs = useRef([])
  const bottomNodeRefs = useRef([])
  const topStepRefs = useRef([])
  const bottomStepRefs = useRef([])
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

    const toBounds = (node) => {
      if (!node) {
        return null
      }

      const rect = node.getBoundingClientRect()
      return {
        left: rect.left - canvasRect.left,
        right: rect.right - canvasRect.left,
      }
    }

    const topPoints = topNodeRefs.current.map(toPoint).filter(Boolean)
    const bottomPoints = bottomNodeRefs.current.map(toPoint).filter(Boolean)
    const topBounds = topStepRefs.current.map(toBounds)
    const bottomBounds = bottomStepRefs.current.map(toBounds)

    const buildPaths = (points) =>
      points.slice(0, -1).map((point, index) => {
        const next = points[index + 1]
        const startX = point.x + point.r - 2
        const endX = next.x - next.r + 2
        return `M ${startX} ${point.y} L ${endX} ${next.y}`
      })

    const buildRoundedBridgePath = (startX, startY, bridgeX, endY, endX) => {
      const horizontalIn = bridgeX - startX
      const vertical = endY - startY
      const horizontalOut = endX - bridgeX
      const maxRadius = Math.min(
        Math.abs(horizontalIn) / 2,
        Math.abs(vertical) / 2,
        Math.abs(horizontalOut) / 2,
      )
      const radius = Math.min(BRIDGE_CORNER_RADIUS, maxRadius)

      if (!Number.isFinite(radius) || radius < 0.5) {
        return `M ${startX} ${startY} L ${bridgeX} ${startY} L ${bridgeX} ${endY} L ${endX} ${endY}`
      }

      const inDirection = Math.sign(horizontalIn) || 1
      const verticalDirection = Math.sign(vertical) || 1
      const outDirection = Math.sign(horizontalOut) || 1

      const firstCornerStartX = bridgeX - inDirection * radius
      const firstCornerEndY = startY + verticalDirection * radius
      const secondCornerStartY = endY - verticalDirection * radius
      const secondCornerEndX = bridgeX + outDirection * radius

      return [
        `M ${startX} ${startY}`,
        `L ${firstCornerStartX} ${startY}`,
        `Q ${bridgeX} ${startY} ${bridgeX} ${firstCornerEndY}`,
        `L ${bridgeX} ${secondCornerStartY}`,
        `Q ${bridgeX} ${endY} ${secondCornerEndX} ${endY}`,
        `L ${endX} ${endY}`,
      ].join(' ')
    }

    let bridgePath = ''
    const layoutWidth = canvas.clientWidth
    const topLast = topPoints[topPoints.length - 1]
    const mouldingIndex = bottomItems.findIndex((item) => item.title?.toLowerCase() === 'moulding')
    const bridgeBottomIndex = mouldingIndex >= 0 ? mouldingIndex : bottomPoints.length - 1
    const bottomTarget = bottomPoints[bridgeBottomIndex]
    if (topLast && bottomTarget) {
      const topStartX = topLast.x + topLast.r - 2
      const bottomEndX = bottomTarget.x + bottomTarget.r - 2
      const allBounds = [...topBounds, ...bottomBounds].filter(Boolean)
      const textRightEdge = allBounds.reduce((maxRight, bounds) => Math.max(maxRight, bounds.right), 0)
      const preferredBridgeX = Math.max(topStartX, bottomEndX, textRightEdge) + WIRE_TEXT_GAP
      const maxBridgeX = Math.max(layoutWidth - 8, Math.max(topStartX, bottomEndX) + 6)
      const bridgeX = Math.min(preferredBridgeX, maxBridgeX)
      bridgePath = buildRoundedBridgePath(topStartX, topLast.y, bridgeX, bottomTarget.y, bottomEndX)
    }

    setWireLayout({
      width: layoutWidth,
      height: canvas.clientHeight,
      topPaths: buildPaths(topPoints),
      bottomPaths: buildPaths(bottomPoints),
      bridgePath,
    })
  }, [])

  useEffect(() => {
    topNodeRefs.current.length = topItems.length
    bottomNodeRefs.current.length = bottomItems.length
    topStepRefs.current.length = topItems.length
    bottomStepRefs.current.length = bottomItems.length
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

    topStepRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node)
      }
    })

    bottomNodeRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node)
      }
    })

    bottomStepRefs.current.forEach((node) => {
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
    <div ref={wireCanvasRef} className="relative mt-8 overflow-hidden">
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
            strokeWidth="1.2"
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
            stepRef={(node) => {
              topStepRefs.current[index] = node
            }}
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
            stepRef={(node) => {
              bottomStepRefs.current[index] = node
            }}
            circleRef={(node) => {
              bottomNodeRefs.current[index] = node
            }}
          />
        ))}
      </div>
    </div>
  )
}
