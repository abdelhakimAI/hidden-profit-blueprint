import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { colors } from "@/config/theme";
import { scrollState } from "@/animations/scrollProgress";

extend({ Line2, LineMaterial, LineGeometry });

/**
 * The page's signature visual: a wireframe sphere built from flowing
 * latitude lines, standing in for "attention → audience → systems → money"
 * without ever literalizing money. It's the one 3D object that persists
 * across every section — the throughline of the scroll story.
 *
 * Adapted from a 21st.dev "Geometric Orb" primitive (uicapsule), retuned to
 * the brand's gold palette, stripped of user controls (this is an ambient
 * background element, not an interactive toy), and wired to whole-page
 * scroll progress so it visibly organizes itself as the visitor scrolls
 * from "the problem" toward "the system."
 */

type Quality = "full" | "reduced";

const QUALITY_PRESETS: Record<Quality, { numLines: number; pointsPerLine: number }> = {
  full: { numLines: 22, pointsPerLine: 84 },
  reduced: { numLines: 12, pointsPerLine: 40 },
};

const RADIUS = 1.6;
const SPEED = 26;
const SQUIGGLE_AMOUNT = 0.035;
const SQUIGGLE_FREQUENCY = 4;
const SQUIGGLE_SPEED = 1.6;

export function CentralSystem({ quality = "full" }: { quality?: Quality }) {
  const { numLines, pointsPerLine } = QUALITY_PRESETS[quality];
  const groupRef = useRef<THREE.Group>(null);
  const lineGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const camDirRef = useRef(new THREE.Vector3());
  const { size } = useThree();

  const goldColor = useMemo(() => new THREE.Color(colors.gold), []);
  const colorInt = useMemo(() => goldColor.getHex(), [goldColor]);

  const lineConstants = useMemo(
    () =>
      Array.from({ length: numLines }, (_, i) => ({
        longitudeRotation: (i / numLines) * Math.PI,
        timeOffset: (i / numLines) * SPEED,
      })),
    [numLines],
  );

  const materials = useMemo(
    () =>
      Array.from(
        { length: numLines },
        () =>
          new LineMaterial({
            color: colorInt,
            linewidth: 1.6,
            transparent: true,
            opacity: 1,
            vertexColors: true,
          }),
      ),
    [colorInt, numLines],
  );

  const geometries = useMemo(() => Array.from({ length: numLines }, () => new LineGeometry()), [numLines]);

  useEffect(() => {
    return () => {
      for (const mat of materials) mat.dispose();
      for (const geo of geometries) geo.dispose();
    };
  }, [materials, geometries]);

  useEffect(() => {
    for (const mat of materials) mat.resolution.set(size.width, size.height);
  }, [materials, size.width, size.height]);

  const vertexCount = pointsPerLine + 1;
  const positionBuffer = useMemo(() => new Float32Array(vertexCount * 3), [vertexCount]);
  const colorBuffer = useMemo(() => new Float32Array(vertexCount * 3), [vertexCount]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const progress = scrollState.progress;

    // The system "assembles": faint and loosely scaled at the top of the
    // page (the problem), full presence and scale by the blueprint/email
    // sections, easing back slightly for the closing statement.
    const assembleIn = THREE.MathUtils.smoothstep(progress, 0.04, 0.32);
    const settle = 1 - THREE.MathUtils.smoothstep(progress, 0.88, 1.0) * 0.25;
    const targetOpacity = 0.18 + assembleIn * 0.72;
    const targetScale = 0.72 + assembleIn * 0.34 * settle;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.045 + progress * Math.PI * 0.6;
      const s = THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 3, delta || 0.016);
      groupRef.current.scale.setScalar(s);
    }

    const camDir = camDirRef.current.copy(state.camera.position).normalize();

    for (let lineIdx = 0; lineIdx < numLines; lineIdx++) {
      const group = lineGroupRefs.current[lineIdx];
      const constants = lineConstants[lineIdx];
      const geometry = geometries[lineIdx];
      const material = materials[lineIdx];
      if (!group || !constants || !geometry || !material) continue;

      material.opacity = targetOpacity;

      const localProgress = ((time + constants.timeOffset) % SPEED) / SPEED;
      const latitude = localProgress * Math.PI;
      const circleRadius = Math.sin(latitude) * RADIUS;
      const yPosition = Math.cos(latitude) * RADIUS;

      for (let i = 0; i < pointsPerLine; i++) {
        const angle = (i / pointsPerLine) * Math.PI * 2;
        const squiggle = Math.sin(angle * SQUIGGLE_FREQUENCY + time * SQUIGGLE_SPEED + lineIdx * 0.5) * SQUIGGLE_AMOUNT;
        const displacedRadius = circleRadius + squiggle * circleRadius;
        const x = Math.cos(angle) * displacedRadius;
        const y = yPosition;
        const z = Math.sin(angle) * displacedRadius;

        const offset = i * 3;
        positionBuffer[offset] = x;
        positionBuffer[offset + 1] = y;
        positionBuffer[offset + 2] = z;

        const worldX = x * Math.cos(constants.longitudeRotation) + z * Math.sin(constants.longitudeRotation);
        const worldZ = -x * Math.sin(constants.longitudeRotation) + z * Math.cos(constants.longitudeRotation);
        const dot = worldX * camDir.x + y * camDir.y + worldZ * camDir.z;
        const depthFactor = (dot / RADIUS + 1) / 2;
        const brightness = depthFactor * 0.85 + 0.15;

        colorBuffer[offset] = goldColor.r * brightness;
        colorBuffer[offset + 1] = goldColor.g * brightness;
        colorBuffer[offset + 2] = goldColor.b * brightness;
      }

      const last = pointsPerLine * 3;
      positionBuffer[last] = positionBuffer[0]!;
      positionBuffer[last + 1] = positionBuffer[1]!;
      positionBuffer[last + 2] = positionBuffer[2]!;
      colorBuffer[last] = colorBuffer[0]!;
      colorBuffer[last + 1] = colorBuffer[1]!;
      colorBuffer[last + 2] = colorBuffer[2]!;

      geometry.setPositions(positionBuffer);
      geometry.setColors(colorBuffer);
      group.rotation.y = constants.longitudeRotation;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: numLines }, (_, lineIdx) => {
        const geometry = geometries[lineIdx];
        const material = materials[lineIdx];
        if (!geometry || !material) return null;
        return (
          <group
            key={lineIdx}
            ref={(el) => {
              lineGroupRefs.current[lineIdx] = el;
            }}
          >
            {/* @ts-expect-error line2 is an R3F extension registered via extend() */}
            <line2>
              <primitive object={geometry} attach="geometry" />
              <primitive object={material} attach="material" />
            </line2>
          </group>
        );
      })}
    </group>
  );
}
