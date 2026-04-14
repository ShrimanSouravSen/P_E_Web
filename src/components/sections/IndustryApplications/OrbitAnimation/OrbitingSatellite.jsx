import { useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { clamp } from './orbitAnimation.shared';

/**
 * Renders one satellite that moves along a rotated orbit and scales by simulated depth.
 */
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

  const rxRad = (rotateXDeg * Math.PI) / 180;
  const ryRad = (rotateYDeg * Math.PI) / 180;
  const theta0 = (initialAngleDeg * Math.PI) / 180;

  useAnimationFrame((time) => {
    if (startRef.current === null) startRef.current = time;
    const elapsed = time - startRef.current;
    const R = orbitRadius;
    const omega = (2 * Math.PI) / (durationSeconds * 1000);
    const theta = theta0 + direction * elapsed * omega;

    const sx = R * Math.cos(theta) * Math.cos(ryRad);
    const sy =
      R * Math.sin(theta) * Math.cos(rxRad) +
      R * Math.cos(theta) * Math.sin(rxRad) * Math.sin(ryRad);

    const sz =
      R * Math.sin(theta) * Math.sin(rxRad) -
      R * Math.cos(theta) * Math.sin(ryRad) * Math.cos(rxRad);
    const depthNorm = clamp(sz / Math.max(R, 1), -1, 1);
    const depthScale = isSmall
      ? clamp(1 + depthNorm * 0.15, 0.88, 1.12)
      : clamp(1 + depthNorm * 0.22, 0.78, 1.26);
    const depth01 = (depthNorm + 1) / 2;
    const depthLayer = isSmall ? Math.round(10 + depth01 * 10) : Math.round(8 + depth01 * 16);

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

export default OrbitingSatellite;
