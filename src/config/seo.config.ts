/**
 * SEO CONFIG
 * NOTE: the source of truth for crawlers (Google, Facebook, X, etc.) is the
 * static <head> in index.html — most link-preview bots do not execute JS.
 * This file exists so the same strings can also be applied client-side
 * (e.g. if this page is ever embedded as a route inside a larger app) and
 * so both places are easy to find and keep in sync. If you change one,
 * change the other.
 */
export const seoConfig = {
  title: "The Faceless YouTube Profit Blueprint | Hidden Profit with Austin",
  description:
    "Get the free Faceless YouTube Profit Blueprint and learn how to approach faceless YouTube as a real content and business system.",
} as const;
