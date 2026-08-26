import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/animations/scrollProgress";

/**
 * Ambient camera movement only — never a user-controlled orbit. The
 * viewer should feel like they're being carried through the system, not
 * asked to operate a 3D toy.
 */
export function CameraRig() {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const progress = scrollState.progress;
    const time = state.clock.elapsedTime;
    const dt = delta || 0.016;

    const targetZ = 8.4 - progress * 2.2;
    const targetX = Math.sin(progress * Math.PI) * 0.6;
    const breathe = Math.sin(time * 0.15) * 0.05;

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 2.2, dt);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX + breathe, 2.2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, breathe * 0.6, 2.2, dt);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
