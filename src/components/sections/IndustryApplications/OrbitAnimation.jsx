/**
 * OrbitAnimation.jsx
 * ──────────────────
 * A self-contained, cinematically-styled orbit / atom animation component.
 *
 * INSTALLATION
 * ────────────
 * 1. Copy OrbitAnimation.jsx and OrbitAnimation.css into your project.
 * 2. Install the only external dependency:
 *      npm install framer-motion
 *    (or: pnpm add framer-motion / yarn add framer-motion)
 * 3. Add the Google Fonts link to your HTML <head>:
 *      <link rel="preconnect" href="https://fonts.googleapis.com" />
 *      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
 *      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
 *
 * USAGE (full-screen)
 * ───────────────────
 *   <OrbitAnimation />
 *
 * USAGE (custom props)
 * ────────────────────
 *   <OrbitAnimation
 *     title="OUR SOLUTIONS"
 *     labels={[
 *       { text: "Solar Energy",    top: "32%", left: "6%",  side: "left" },
 *       { text: "Wind Power",      top: "30%", left: "94%", side: "right" },
 *       { text: "Hydro Systems",   top: "71%", left: "6%",  side: "left" },
 *       { text: "Grid Storage",    top: "71%", left: "94%", side: "right" },
 *     ]}
 *     style={{ height: '600px' }}
 *   />
 *
 * CUSTOMISATION NOTES
 * ───────────────────
 * • SCENE_DURATIONS: adjust the ms each phase is shown.
 * • The orbital system persists across all scenes.
 * • Ring angles (rotateX / rotateY) control the 3-D tilt of each orbit ellipse.
 * • Satellite colours: search for '#d4906a' or '#b06840' to swap the copper palette.
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useTheme } from '../../../hooks/useTheme';
import './OrbitAnimation.css';

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_LABELS = [
  { text: 'Electrical & Power', top: '32%', left: '6%',  side: 'left'  },
  { text: 'EV Components',      top: '30%', left: '94%', side: 'right' },
  { text: 'Renewable Energy',   top: '71%', left: '6%',  side: 'left'  },
  { text: 'Infrastructure',     top: '71%', left: '94%', side: 'right' },
];

const LABEL_PREVIEW_IMAGES = {
  'Electrical & Power': [
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
  ],
  'EV Components': [
    'https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80',
  ],
  'Renewable Energy': [
    'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  ],
  Infrastructure: [
    'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=800&q=80',
  ]
};

const FALLBACK_PREVIEW_IMAGES = [
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
];

const ABS_FILL = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const parsePercent = (value, fallback) => {
  if (typeof value === 'number') return value;
  const parsed = Number.parseFloat(String(value).replace('%', ''));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeImageList = (candidate) => {
  if (!Array.isArray(candidate)) return [];
  return candidate.filter((url) => typeof url === 'string' && url.trim().length > 0);
};

const warnedPreviewFallbacks = new Set();

const warnPreviewFallbackOnce = (labelText, index, reason) => {
  if (!import.meta.env.DEV) return;
  const key = `${labelText}::${index}::${reason}`;
  if (warnedPreviewFallbacks.has(key)) return;
  warnedPreviewFallbacks.add(key);
  console.warn(
    `[OrbitAnimation] Preview fallback used for label "${labelText}" at index ${index}: ${reason}`,
  );
};

const getPreviewImagesForLabel = (labelText, index) => {
  const byText = normalizeImageList(LABEL_PREVIEW_IMAGES[labelText]);
  if (byText.length >= 3) return byText.slice(0, 3);

  if (byText.length === 0) {
    warnPreviewFallbackOnce(labelText, index, 'missing text key in LABEL_PREVIEW_IMAGES');
  } else {
    warnPreviewFallbackOnce(labelText, index, 'insufficient images for label key');
  }

  const previewKeys = Object.keys(LABEL_PREVIEW_IMAGES);
  const byIndex = previewKeys.length > 0
    ? normalizeImageList(LABEL_PREVIEW_IMAGES[previewKeys[index % previewKeys.length]])
    : [];

  if (byIndex.length === 0) {
    warnPreviewFallbackOnce(labelText, index, 'index-based fallback not available');
  }

  const merged = [...byText, ...byIndex, ...FALLBACK_PREVIEW_IMAGES];
  const unique = Array.from(new Set(merged));
  const resolved = unique.slice(0, 3);
  if (resolved.length < 3) {
    warnPreviewFallbackOnce(labelText, index, 'resolved image list still below required 3 items');
  }
  return resolved;
};

const buildDynamicLabelLayout = (labels) => {
  const normalized = labels
    .map((label, index) => ({
      text: typeof label?.text === 'string' && label.text.trim() ? label.text.trim() : `Label ${index + 1}`,
      side: label?.side === 'right' ? 'right' : label?.side === 'left' ? 'left' : index % 2 === 0 ? 'left' : 'right',
      top: label?.top,
      left: label?.left,
      originalIndex: index,
    }))
    .filter((label) => label.text.length > 0);

  const leftLabels = normalized.filter((label) => label.side === 'left');
  const rightLabels = normalized.filter((label) => label.side === 'right');

  const assignTop = (group) => {
    if (group.length === 0) return;
    if (group.length === 1) {
      group[0].computedTop = '50%';
      return;
    }
    group.forEach((label, idx) => {
      const topPct = 28 + (idx * (44 / (group.length - 1)));
      label.computedTop = `${topPct}%`;
    });
  };

  assignTop(leftLabels);
  assignTop(rightLabels);

  return normalized.map((label) => ({
    ...label,
    top: label.top ?? label.computedTop ?? '50%',
    left: label.left ?? (label.side === 'right' ? '94%' : '6%'),
  }));
};

// ─── Orbiting satellite ───────────────────────────────────────────────────────
//
// Computes each satellite's screen position mathematically using the same ring
// parameters as the CSS 3-D ring transforms, but mounts the sphere DOM node at
// the ROOT level (not inside any preserve-3d parent). This prevents the browser
// from perspective-projecting the sphere, keeping it a perfect circle.
//
// CSS transform: rotateX(rx) rotateY(ry)  →  matrix M = RotX(rx) · RotY(ry)
// Applying M to a ring point (R·cos θ, R·sin θ, 0) gives screen coords:
//
//   sx = R · cos(θ) · cos(ry)
//   sy = R · sin(θ) · cos(rx)  +  R · cos(θ) · sin(rx) · sin(ry)
//
// ─────────────────────────────────────────────────────────────────────────────
function OrbitingSatellite({
  rotateXDeg,
  rotateYDeg,
  initialAngleDeg,
  durationSeconds,
  direction = 1,
  sizePx,
  orbitRadius,
  isSmall = false,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const layerZ = useMotionValue(12);
  const startRef = useRef(null);

  const rxRad  = (rotateXDeg  * Math.PI) / 180;
  const ryRad  = (rotateYDeg  * Math.PI) / 180;
  const theta0 = (initialAngleDeg * Math.PI) / 180;

  useAnimationFrame((time) => {
    if (startRef.current === null) startRef.current = time;
    const elapsed = time - startRef.current;
    const R = orbitRadius;
    const omega = (2 * Math.PI) / (durationSeconds * 1000);
    const theta = theta0 + direction * elapsed * omega;

    const sx = R * Math.cos(theta) * Math.cos(ryRad);
    const sy = R * Math.sin(theta) * Math.cos(rxRad)
             + R * Math.cos(theta) * Math.sin(rxRad) * Math.sin(ryRad);

    // Depth from the same rotated orbit point. Positive z is treated as "closer".
    const sz = R * Math.sin(theta) * Math.sin(rxRad)
             - R * Math.cos(theta) * Math.sin(ryRad) * Math.cos(rxRad);
    const depthNorm = clamp(sz / Math.max(R, 1), -1, 1);
    const depthScale = isSmall
      ? clamp(1 + depthNorm * 0.15, 0.88, 1.12)
      : clamp(1 + depthNorm * 0.22, 0.78, 1.26);
    const depth01 = (depthNorm + 1) / 2;
    const depthLayer = isSmall
      ? Math.round(10 + depth01 * 10)
      : Math.round(8 + depth01 * 16);

    x.set(sx);
    y.set(sy);
    scale.set(depthScale);
    layerZ.set(depthLayer);
  });

  return (
    <motion.div
      className={isSmall ? 'oa-satellite oa-satellite--small' : 'oa-satellite oa-satellite--large'}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        marginLeft: `${-sizePx / 2}px`,
        marginTop: `${-sizePx / 2}px`,
        x,
        y,
        scale,
        zIndex: layerZ,
      }}
    />
  );
}

// ─── Scene components ─────────────────────────────────────────────────────────

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

  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none)').matches || navigator.maxTouchPoints > 0;
  };

  useEffect(() => {
    setPhase(0);
    setHoveredIndex(null);
    const introDelay = 3300;
    const stepDelay = 600;
    const timers = positionedLabels.map((_, idx) => (
      setTimeout(() => setPhase(idx + 1), introDelay + (idx * stepDelay))
    ));
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

  const handleLabelHoverEnter = (index) => {
    if (!labelsReady) return;
    if (isTouchDevice()) return;
    setHoveredIndex(index);
  };

  const handleLabelHoverLeave = () => {
    if (isTouchDevice()) return;
    setHoveredIndex(null);
  };

  const handleLabelToggle = (index) => {
    if (!labelsReady) return;
    if (!isTouchDevice()) return;
    setHoveredIndex((prev) => (prev === index ? null : index));
  };

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
      {positionedLabels.map((label, i) => (
        (() => {
          const baseLeftPct = parsePercent(label.left, label.side === 'right' ? 94 : 6);
          const responsiveLeftPct = label.side === 'right'
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
            initial={{ opacity: 0, x: label.side === 'right' ? horizontalSlidePx : -horizontalSlidePx, filter: 'blur(8px)' }}
            animate={
              phase > i
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: label.side === 'right' ? horizontalSlidePx : -horizontalSlidePx, filter: 'blur(8px)' }
            }
            transition={{ duration: 0.95, ease: [0.25, 1, 0.5, 1] }}
          >
            {label.side === 'right' && (
              <div style={{
                width: `${connectorWidthPx}px`, height: '1px', flexShrink: 0,
                background: 'linear-gradient(to left, var(--oa-connector-color), transparent)',
              }} />
            )}
            <span style={{
              fontSize: `${fontSizePx}px`,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.1em',
              color: 'var(--oa-label-color)',
              fontWeight: 400,
              textShadow: '0 0 22px var(--oa-label-shadow)',
              whiteSpace: 'nowrap',
            }}>
              {label.text}
            </span>
            {label.side === 'left' && (
              <div style={{
                width: `${connectorWidthPx}px`, height: '1px', flexShrink: 0,
                background: 'linear-gradient(to right, var(--oa-connector-color), transparent)',
              }} />
            )}
          </motion.div>
          <motion.div
            className={`oa-label-bubble ${label.side === 'right' ? 'oa-label-bubble--right' : 'oa-label-bubble--left'}`}
            initial={false}
            animate={hoveredIndex === i ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.96 }}
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
        })()
      ))}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function OrbitAnimation({
  labels = DEFAULT_LABELS,
  className = '',
  contentScale = 0.78,
  style,
}) {
  const { isDark } = useTheme();
  const [intro, setIntro] = useState(true);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const baseSize = Math.max(240, Math.min(containerSize.width || 0, containerSize.height || 0));
  const ringSize = baseSize * 0.92;
  const orbitRadius = ringSize / 2;
  const glowSize = baseSize * 0.66;
  const sphereSize = baseSize * 0.3;
  const lensWidth = baseSize * 0.36;
  const lensHeight = baseSize * 0.1;
  const smallSatelliteSize = baseSize * 0.02;
  const largeSatelliteSize = baseSize * 0.061;
  const width = containerSize.width || 0;
  const labelFontSizePx = clamp(width * 0.022, 11, 18);
  const labelConnectorWidthPx = clamp(width * 0.05, 16, 30);
  const labelGapPx = clamp(width * 0.018, 6, 12);
  const labelSlidePx = clamp(width * 0.032, 10, 20);
  const narrowBoost = clamp((640 - width) / 240, 0, 1) * 2.4;
  const labelEdgeInsetPercent = clamp(((760 - width) / 80) + narrowBoost, 0, 8);
  const rightAnchorMaxPercent = clamp(92 - ((700 - width) / 80), 87, 92);

  return (
    <div
      ref={containerRef}
      className={[className, 'oa-root', isDark ? 'oa-theme-dark' : 'oa-theme-light'].filter(Boolean).join(' ')}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'transparent',
        fontFamily: "'Inter', sans-serif",
        color: 'var(--oa-label-color)',
        ...style,
      }}
    >


      {/* Warm ambient glow */}
      <motion.div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${glowSize}px`, height: `${glowSize}px`, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--oa-ambient-glow) 0%, transparent 68%)',
          pointerEvents: 'none', zIndex: 5,
        }}
        animate={{ scale: [0.88, 1.18, 0.88], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── PERSISTENT ORBITAL SYSTEM ─────────────────────────────────── */}
      <motion.div
        style={{ ...ABS_FILL, transformStyle: 'preserve-3d', transformOrigin: '50% 50%' }}
        animate={{
          scale: intro ? contentScale * 1.42 : contentScale,
          filter: intro ? 'blur(7px)' : 'blur(0px)',
        }}
        transition={{ duration: 2.6, ease: [0.25, 1, 0.5, 1] }}
      >

        {/* Ring 1 — EQUATORIAL (rotateX 73°) */}
        <div className="oa-ring-shell" style={{
          width: `${ringSize}px`, height: `${ringSize}px`,
          transform: 'translate(-50%, -50%) rotateX(73deg)',
        }}>
          <motion.div
            className="oa-ring-line"
            animate={{ rotateZ: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Ring 2 — DIAGONAL (rotateX 67° rotateY -58°) */}
        <div className="oa-ring-shell" style={{
          width: `${ringSize}px`, height: `${ringSize}px`,
          transform: 'translate(-50%, -50%) rotateX(67deg) rotateY(-58deg)',
        }}>
          <motion.div
            className="oa-ring-line"
            animate={{ rotateZ: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Ring 3 — DIAGONAL (rotateX 67° rotateY +58°) */}
        <div className="oa-ring-shell" style={{
          width: `${ringSize}px`, height: `${ringSize}px`,
          transform: 'translate(-50%, -50%) rotateX(67deg) rotateY(58deg)',
        }}>
          <motion.div
            className="oa-ring-line"
            animate={{ rotateZ: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* ── 6 satellites — mathematically positioned, no 3-D distortion ─ */}

        {/* Ring 1 equatorial — 2 small pearl dots */}
        {/* <OrbitingSatellite rotateXDeg={73} rotateYDeg={0}   initialAngleDeg={180} durationSeconds={32} direction={1}  sizePx={smallSatelliteSize} orbitRadius={orbitRadius} isSmall />
        <OrbitingSatellite rotateXDeg={73} rotateYDeg={0}   initialAngleDeg={0}   durationSeconds={32} direction={1}  sizePx={smallSatelliteSize} orbitRadius={orbitRadius} isSmall /> */}
        <OrbitingSatellite rotateXDeg={73} rotateYDeg={0}   initialAngleDeg={180} durationSeconds={8} direction={1}  sizePx={largeSatelliteSize} orbitRadius={orbitRadius} />
        <OrbitingSatellite rotateXDeg={73} rotateYDeg={0}   initialAngleDeg={0}   durationSeconds={8} direction={1}  sizePx={largeSatelliteSize} orbitRadius={orbitRadius} />

        {/* Ring 2 — θ=0°→upper-right, θ=180°→lower-left */}
        <OrbitingSatellite rotateXDeg={67} rotateYDeg={-58} initialAngleDeg={0}   durationSeconds={12} direction={1}  sizePx={largeSatelliteSize} orbitRadius={orbitRadius} />
        <OrbitingSatellite rotateXDeg={67} rotateYDeg={-58} initialAngleDeg={180} durationSeconds={12} direction={1}  sizePx={largeSatelliteSize} orbitRadius={orbitRadius} />

        {/* Ring 3 — θ=0°→lower-right, θ=180°→upper-left */}
        <OrbitingSatellite rotateXDeg={67} rotateYDeg={58}  initialAngleDeg={0}   durationSeconds={6} direction={-1} sizePx={largeSatelliteSize} orbitRadius={orbitRadius} />
        <OrbitingSatellite rotateXDeg={67} rotateYDeg={58}  initialAngleDeg={180} durationSeconds={6} direction={-1} sizePx={largeSatelliteSize} orbitRadius={orbitRadius} />

        {/* Central metallic sphere */}
        <div
          className="oa-sphere"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${sphereSize}px`, height: `${sphereSize}px`,
            borderRadius: '50%', zIndex: 16,
          }}
        />

        {/* Lens-flare highlight */}
        <div
          className="oa-lens-flare"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-62%, -64%) rotate(-42deg)',
            width: `${lensWidth}px`, height: `${lensHeight}px`,
            zIndex: 20, opacity: 'var(--oa-lens-opacity)',
          }}
        />
      </motion.div>

      {/* ── LABELS — always visible ─────────────────────────────────── */}
      <div style={{ ...ABS_FILL, zIndex: 30, pointerEvents: 'none' }}>
        <LabelsScene
          labels={labels}
          fontSizePx={labelFontSizePx}
          connectorWidthPx={labelConnectorWidthPx}
          horizontalGapPx={labelGapPx}
          horizontalSlidePx={labelSlidePx}
          edgeInsetPercent={labelEdgeInsetPercent}
          rightAnchorMaxPercent={rightAnchorMaxPercent}
        />
      </div>
    </div>
  );
}

export default OrbitAnimation;
