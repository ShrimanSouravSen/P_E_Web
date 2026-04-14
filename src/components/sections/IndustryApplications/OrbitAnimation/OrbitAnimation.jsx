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
import { motion } from 'framer-motion';
import { useTheme } from '../../../../hooks/useTheme';
import OrbitingSatellite from './OrbitingSatellite';
import LabelsScene from './LabelsScene';
import { DEFAULT_LABELS, ABS_FILL, clamp } from './orbitAnimation.shared';
import './OrbitAnimation.css';

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * Composes the full orbit visualization, including rings, satellites, sphere, and labels.
 */
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
            transform: 'translate(-50%, -50%) rotate(-42deg)',
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
