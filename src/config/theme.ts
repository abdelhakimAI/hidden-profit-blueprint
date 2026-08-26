/**
 * THEME TOKENS — single source of truth.
 *
 * This file is imported by `tailwind.config.ts` (so utility classes exist)
 * AND by any TypeScript/Three.js code that needs a raw hex string (WebGL
 * materials, SVG fills, canvas gradients, etc. can't read CSS variables the
 * same way Tailwind can).
 *
 * Brand colors (#1A1A1A background, #C8A25C gold) are fixed by the brand.
 * The handful of neighbors below (ink/elevated backgrounds, ivory/warm-grey
 * text, soft/deep gold) exist only to give the fixed brand pair room to
 * breathe — depth, hierarchy, hover/press states — without introducing a
 * second, unrelated hue anywhere on the page.
 */

export const colors = {
  // Backgrounds — three depths of the same near-black, never pure #000
  bgDeep: "#141414", // furthest background layer / 3D canvas clear color
  bg: "#1A1A1A", // brand background — page base
  bgElevated: "#232019", // warm-tinted elevated surface (cards, header-on-scroll)

  // Gold — the single accent, used with restraint
  gold: "#C8A25C", // brand gold — primary CTA, key highlights, 3D glow
  goldSoft: "#E4C989", // hover state, bright highlight, active line
  goldDeep: "#7A5F33", // gradient shadow stop, pressed state, low-opacity fills

  // Text — warm neutrals that sit naturally next to gold on charcoal
  ivory: "#F3EFE6", // headline / primary text
  sand: "#A39A8B", // body copy, secondary text
  sandMuted: "#6E6659", // captions, disabled, hairline labels

  // Structural
  hairline: "rgba(200, 162, 92, 0.14)", // gold-tinted 1px dividers
  overlayScrim: "rgba(20, 20, 20, 0.72)", // header-on-scroll / modal scrim
} as const;

export const fonts = {
  display: '"Lora", "Iowan Old Style", Georgia, serif',
  body: '"Poppins", "Inter", "Helvetica Neue", Arial, sans-serif',
} as const;

export const motion = {
  // Shared easing so DOM (GSAP) and any manual tweening feel like one system.
  easeOut: "power3.out",
  easeInOut: "power2.inOut",
  durationShort: 0.6,
  durationMed: 1.1,
  durationLong: 1.8,
} as const;

export type ThemeColors = typeof colors;
