import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ABS_FILL,
  parsePercent,
  clamp,
  getPreviewImagesForLabel,
  buildDynamicLabelLayout,
} from './orbitAnimation.shared';

/**
 * Renders animated side labels with hover/tap preview bubbles around the orbit scene.
 */
function LabelsScene({
  labels,
  fontSizePx,
  connectorWidthPx,
  horizontalGapPx,
  horizontalSlidePx,
  edgeInsetPercent,
  rightAnchorMaxPercent,
}) {
  const [phase, setPhase] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const labelsRootRef = useRef(null);
  const positionedLabels = buildDynamicLabelLayout(labels);
  const labelsReady = phase >= positionedLabels.length;

  /**
   * Detects touch-centric input devices to switch interaction behavior.
   */
  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none)').matches || navigator.maxTouchPoints > 0;
  };

  useEffect(() => {
    setPhase(0);
    setHoveredIndex(null);
    const introDelay = 3300;
    const stepDelay = 600;
    const timers = positionedLabels.map((_, idx) =>
      setTimeout(() => setPhase(idx + 1), introDelay + idx * stepDelay),
    );
    return () => timers.forEach(clearTimeout);
  }, [positionedLabels.length]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!isTouchDevice()) return;
      if (labelsRootRef.current?.contains(event.target)) return;
      setHoveredIndex(null);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  /**
   * Opens a preview bubble on pointer hover for non-touch devices.
   */
  const handleLabelHoverEnter = (index) => {
    if (!labelsReady) return;
    if (isTouchDevice()) return;
    setHoveredIndex(index);
  };

  /**
   * Closes preview bubble when hover ends on non-touch devices.
   */
  const handleLabelHoverLeave = () => {
    if (isTouchDevice()) return;
    setHoveredIndex(null);
  };

  /**
   * Toggles a preview bubble on tap for touch devices.
   */
  const handleLabelToggle = (index) => {
    if (!labelsReady) return;
    if (!isTouchDevice()) return;
    setHoveredIndex((prev) => (prev === index ? null : index));
  };

  /**
   * Toggles preview accessibility on Enter/Space keyboard activation.
   */
  const handleLabelKeyDown = (event, index) => {
    if (!labelsReady) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setHoveredIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.div
      ref={labelsRootRef}
      style={{ ...ABS_FILL, pointerEvents: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {positionedLabels.map((label, i) =>
        (() => {
          const baseLeftPct = parsePercent(label.left, label.side === 'right' ? 94 : 6);
          const responsiveLeftPct =
            label.side === 'right'
              ? clamp(baseLeftPct - edgeInsetPercent, 52, rightAnchorMaxPercent)
              : clamp(baseLeftPct + edgeInsetPercent, 2, 45);

          return (
            <div
              key={i}
              onMouseEnter={() => handleLabelHoverEnter(i)}
              onMouseLeave={handleLabelHoverLeave}
              onClick={() => handleLabelToggle(i)}
              onFocus={() => labelsReady && setHoveredIndex(i)}
              onBlur={() => setHoveredIndex(null)}
              onKeyDown={(event) => handleLabelKeyDown(event, i)}
              tabIndex={0}
              role="button"
              aria-label={`${label.text} preview`}
              style={{
                position: 'absolute',
                top: label.top,
                left: `${responsiveLeftPct}%`,
                transform: label.side === 'right' ? 'translate(-100%, -50%)' : 'translate(0%, -50%)',
                maxWidth: '42%',
                pointerEvents: labelsReady ? 'auto' : 'none',
                outline: 'none',
              }}
            >
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${horizontalGapPx}px`,
                }}
                initial={{
                  opacity: 0,
                  x: label.side === 'right' ? horizontalSlidePx : -horizontalSlidePx,
                  filter: 'blur(8px)',
                }}
                animate={
                  phase > i
                    ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                    : {
                        opacity: 0,
                        x: label.side === 'right' ? horizontalSlidePx : -horizontalSlidePx,
                        filter: 'blur(8px)',
                      }
                }
                transition={{ duration: 0.95, ease: [0.25, 1, 0.5, 1] }}
              >
                {label.side === 'right' && (
                  <div
                    style={{
                      width: `${connectorWidthPx}px`,
                      height: '1px',
                      flexShrink: 0,
                      background: 'linear-gradient(to left, var(--oa-connector-color), transparent)',
                    }}
                  />
                )}
                <span
                  style={{
                    fontSize: `${fontSizePx}px`,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '0.1em',
                    color: 'var(--oa-label-color)',
                    fontWeight: 400,
                    textShadow: '0 0 22px var(--oa-label-shadow)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label.text}
                </span>
                {label.side === 'left' && (
                  <div
                    style={{
                      width: `${connectorWidthPx}px`,
                      height: '1px',
                      flexShrink: 0,
                      background: 'linear-gradient(to right, var(--oa-connector-color), transparent)',
                    }}
                  />
                )}
              </motion.div>
              <motion.div
                className={`oa-label-bubble ${label.side === 'right' ? 'oa-label-bubble--right' : 'oa-label-bubble--left'}`}
                initial={false}
                animate={
                  hoveredIndex === i ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }
                }
                transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                style={{ pointerEvents: hoveredIndex === i ? 'auto' : 'none' }}
              >
                <div className="oa-label-bubble-arrow" />
                <div className="oa-label-bubble-grid">
                  {getPreviewImagesForLabel(label.text, i).map((src, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={src}
                      alt={`${label.text} sample ${imgIdx + 1}`}
                      className="oa-label-bubble-image"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })(),
      )}
    </motion.div>
  );
}

export default LabelsScene;
