import { analyticsConfig } from "@/config/analytics.config";

/**
 * The only two exports section/component code should ever call.
 * Swapping or adding a provider later means editing this file only.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  if (analyticsConfig.gaMeasurementId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.gaMeasurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", analyticsConfig.gaMeasurementId);
  }

  if (analyticsConfig.plausibleDomain) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = analyticsConfig.plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }
}

export type AnalyticsEvent =
  | "page_view"
  | "cta_click"
  | "form_started"
  | "form_submitted"
  | "form_success"
  | "form_error"
  | "scroll_depth";

export function trackEvent(event: AnalyticsEvent, params: Record<string, string | number> = {}): void {
  if (analyticsConfig.debug) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, params);
  }

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }

  if (typeof window !== "undefined" && window.plausible) {
    const stringProps: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) stringProps[key] = String(value);
    window.plausible(event, { props: stringProps });
  }
}
