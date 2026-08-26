import { ensureGsapRegistered, ScrollTrigger } from "./gsapConfig";

/**
 * Mutable, non-reactive store. The 3D scene reads `scrollState.progress`
 * inside useFrame — subscribing via React state would re-render the whole
 * canvas tree 60x/sec, which is exactly what we don't want.
 */
export const scrollState = {
  /** 0 → top of page, 1 → bottom of page. Drives the slow camera/orb journey. */
  progress: 0,
};

let driverInitialized = false;

/** Call once (from Scene.tsx) after the page has mounted. */
export function initScrollProgressDriver(): () => void {
  if (driverInitialized) return () => undefined;
  driverInitialized = true;
  ensureGsapRegistered();

  const trigger = ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      scrollState.progress = self.progress;
    },
  });

  return () => {
    trigger.kill();
    driverInitialized = false;
  };
}
