/**
 * Cheap, synchronous checks used once on mount to decide whether the 3D
 * layer renders at all, and if so, at what fidelity. Nothing here blocks
 * first paint — the DOM/hero content renders regardless of the outcome.
 */

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
};

/**
 * Heuristic only — used to simplify the 3D scene (fewer particles/lines,
 * lower pixel ratio), never to hide content or block the funnel.
 */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as NavigatorWithHints;

  const fewCores = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const saveData = !!nav.connection?.saveData;
  const slowConnection = nav.connection?.effectiveType === "2g" || nav.connection?.effectiveType === "slow-2g";

  return saveData || slowConnection || (fewCores && lowMemory);
}
