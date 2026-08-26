import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { colors } from "@/config/theme";
import { scrollState } from "@/animations/scrollProgress";

type Quality = "full" | "reduced";

const NODE_COUNT: Record<Quality, number> = { full: 16, reduced: 9 };
const DUST_COUNT: Record<Quality, number> = { full: 260, reduced: 110 };

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

/**
 * "Abstract data nodes" + "thin connection lines" + a soft particle drift —
 * standing in for audience and attention gathering around the system.
 * Node positions and their connections are computed once (a stable
 * structure "assembling"); only opacity, group rotation, and dust drift are
 * animated per frame, which keeps this layer cheap on mobile.
 */
export function ParticleField({ quality = "full" }: { quality?: Quality }) {
  const nodeCount = NODE_COUNT[quality];
  const dustCount = DUST_COUNT[quality];
  const groupRef = useRef<THREE.Group>(null);
  const nodesMaterialRef = useRef<THREE.PointsMaterial>(null);
  const linesMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const dustMaterialRef = useRef<THREE.PointsMaterial>(null);
  const dustRef = useRef<THREE.Points>(null);

  const goldColor = useMemo(() => new THREE.Color(colors.gold), []);
  const softGold = useMemo(() => new THREE.Color(colors.goldSoft), []);

  const { nodeGeometry, lineGeometry } = useMemo(() => {
    const rand = seededRandom(42);
    const positions = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.4 + rand() * 1.9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(rand() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Ring connections + a handful of spokes toward the center — enough to
    // read as "a network," not so many it turns into visual noise.
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const a = i * 3;
      const b = ((i + 1) % nodeCount) * 3;
      linePositions.push(positions[a]!, positions[a + 1]!, positions[a + 2]!, positions[b]!, positions[b + 1]!, positions[b + 2]!);
      if (i % 3 === 0) {
        linePositions.push(positions[a]!, positions[a + 1]!, positions[a + 2]!, 0, 0, 0);
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    return { nodeGeometry: nodeGeo, lineGeometry: lineGeo };
  }, [nodeCount]);

  const dustGeometry = useMemo(() => {
    const rand = seededRandom(7);
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const radius = 3 + rand() * 6;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(rand() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [dustCount]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const progress = scrollState.progress;

    // Nodes/connections are most visible while "the problem" and "what's
    // inside" are on screen, then recede so the central system reads
    // clearly during the blueprint + email sections.
    const gatherIn = THREE.MathUtils.smoothstep(progress, 0.02, 0.22);
    const recede = 1 - THREE.MathUtils.smoothstep(progress, 0.55, 0.82) * 0.55;
    const networkOpacity = gatherIn * recede;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.02 + progress * Math.PI * 0.35;
    }
    if (nodesMaterialRef.current) nodesMaterialRef.current.opacity = 0.5 * networkOpacity + 0.08;
    if (linesMaterialRef.current) linesMaterialRef.current.opacity = 0.35 * networkOpacity;
    if (dustMaterialRef.current) dustMaterialRef.current.opacity = 0.35 - progress * 0.12;
    if (dustRef.current) dustRef.current.rotation.y = -time * 0.008;
  });

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeometry}>
        <pointsMaterial
          ref={nodesMaterialRef}
          color={goldColor}
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial ref={linesMaterialRef} color={softGold} transparent opacity={0.2} depthWrite={false} />
      </lineSegments>
      <points ref={dustRef} geometry={dustGeometry}>
        <pointsMaterial
          ref={dustMaterialRef}
          color={softGold}
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
