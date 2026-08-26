import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { colors } from "@/config/theme";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { supportsWebGL, isLowPowerDevice } from "./capabilities";
import { initScrollProgressDriver } from "@/animations/scrollProgress";
import { CentralSystem } from "./CentralSystem";
import { ParticleField } from "./ParticleField";
import { CameraRig } from "./CameraRig";
import { ReducedMotionFallback } from "./ReducedMotionFallback";

/**
 * Mounted once near the root. Sits behind every section (fixed, negative
 * z-index) so the "system" reads as one continuous world the page scrolls
 * through, rather than a decoration repeated per section.
 */
export function Scene() {
  const reducedMotion = useReducedMotion();
  const [webglOk, setWebglOk] = useState(true);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    setWebglOk(supportsWebGL());
    setLowPower(isLowPowerDevice());
  }, []);

  useEffect(() => {
    const cleanup = initScrollProgressDriver();
    return cleanup;
  }, []);

  const quality = lowPower ? "reduced" : "full";
  const dpr = useMemo<[number, number]>(() => (lowPower ? [1, 1.5] : [1, 2]), [lowPower]);

  const showStaticPoster = reducedMotion || !webglOk;

  return (
    <div className="fixed inset-0 -z-10" style={{ backgroundColor: colors.bgDeep }}>
      {showStaticPoster ? (
        <ReducedMotionFallback />
      ) : (
        <Canvas
          camera={{ position: [0, 0, 8.4], fov: 42 }}
          dpr={dpr}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(colors.bgDeep)}
        >
          <Suspense fallback={null}>
            <CentralSystem quality={quality} />
            <ParticleField quality={quality} />
            <CameraRig />
          </Suspense>
        </Canvas>
      )}
      {/* Cinematic vignette + grain sit above the canvas, below the DOM content */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(120% 90% at 50% 0%, transparent 45%, ${colors.bg}CC 100%)` }}
      />
      <div className="grain-overlay" />
    </div>
  );
}
