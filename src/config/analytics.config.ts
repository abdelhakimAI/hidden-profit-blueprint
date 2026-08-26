/**
 * ANALYTICS CONFIG
 * A provider is only active if its ID is present. Leave both blank to ship
 * with analytics fully disabled — the page works identically either way.
 * IDs are public identifiers (not secrets) but still come from env vars so
 * you can vary them per environment without touching code.
 */
export const analyticsConfig = {
  /** e.g. "G-XXXXXXX". Leave empty to disable GA4. */
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID ?? "",
  /** e.g. your Plausible domain. Leave empty to disable Plausible. */
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN ?? "",
  /** Log every tracked event to the console — handy while wiring things up. */
  debug: import.meta.env.DEV,
} as const;
