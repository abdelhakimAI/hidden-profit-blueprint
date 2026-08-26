/**
 * BRAND CONFIG — public, non-secret values.
 * Safe to commit. Nothing here is a credential.
 */
export const brandConfig = {
  siteName: "Hidden Profit with Austin",
  siteUrl: "https://www.REPLACE-WITH-YOUR-DOMAIN.com", // TODO: replace before deploy
  youtubeUrl: "https://www.youtube.com/@REPLACE-WITH-CHANNEL-HANDLE", // TODO: replace

  // The lead-magnet cover mockup rendered in the Blueprint section.
  // Placeholder is an SVG so it never blocks a build — swap the file at the
  // same path once you have the real cover artwork.
  blueprintCoverAsset: "/assets/blueprint-cover.svg", // TODO: replace with real PDF cover render

  // Open Graph share image. TODO: replace with a real 1200x630 PNG/JPG and
  // update the two <meta property="og:image">/<meta name="twitter:image">
  // tags in index.html to point at it (OG scrapers read the static HTML,
  // not this config file).
  ogImageAsset: "/assets/og-image.svg",
} as const;
