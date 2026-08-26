import { useEffect, useRef } from "react";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "./gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealOptions = {
  /** CSS selector, scoped to the section ref, for children to stagger in. Defaults to direct [data-reveal] children. */
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
};

/**
 * Attach to a <section> ref. Any descendant marked `data-reveal` fades and
 * lifts into place once, the first time the section enters the viewport.
 * With prefers-reduced-motion, content is simply shown — no motion at all.
 */
export function useSectionReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll<HTMLElement>(options.selector ?? "[data-reveal]");
    if (targets.length === 0) return;

    if (reducedMotion) {
      targets.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: options.y ?? 28 });

      ScrollTrigger.create({
        trigger: node,
        start: options.start ?? "top 78%",
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: options.stagger ?? 0.1,
          });
        },
      });
    }, node);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return ref;
}
