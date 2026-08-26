# Hidden Profit with Austin — Faceless YouTube Profit Blueprint Landing Page

A production-ready, single-purpose lead-magnet landing page: get a YouTube
visitor to trade their email for the free **Faceless YouTube Profit
Blueprint** PDF. Dark, editorial, cinematic — built with React Three Fiber,
GSAP ScrollTrigger, and Tailwind CSS. Email capture posts straight to **Kit**
(ConvertKit) — there is no custom backend and no database.

---

## 1. Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## 2. Production build

```bash
npm run build   # outputs to /dist
npm run preview # serve the production build locally to sanity-check it
```

## 3. Deploy to Cloudflare Pages

**Option A — Git integration (recommended)**
1. Push this project to a GitHub/GitLab repo.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, select the repo.
3. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Cloudflare rebuilds automatically on every push.

**Option B — Direct upload (no repo needed)**
```bash
npm run build
npx wrangler pages deploy dist --project-name hidden-profit-blueprint
```

### Custom domain
In the Pages project → **Custom domains**, add your domain and follow the
DNS instructions. Afterward, update:
- `index.html` — the `og:url` and `canonical` tags
- `src/config/brand.config.ts` — `siteUrl`
- `public/robots.txt` — the sitemap URL

---

## 4. Connect your real Kit (ConvertKit) form — the one file you must edit

Open **`src/config/kit.config.ts`**. Everything you need is documented
inline, but in short:

1. In Kit, open the form/landing page that has your PDF-delivery automation
   attached (tag → deliver blueprint → welcome sequence).
2. Go to that form's **Embed** tab → choose the plain **Form** embed.
3. Copy the `<form action="...">` URL — it looks like
   `https://app.kit.com/forms/1234567/subscriptions`.
4. Paste it into `FORM_ACTION_URL` in `kit.config.ts`.
5. If the embed snippet has any hidden `<input type="hidden">` fields (e.g.
   a tag ID), copy them into `HIDDEN_FIELDS`.

That's it — no API key, no secret, nothing else to configure. The page
posts the visitor's email to that URL via `fetch()`, exactly like Kit's own
embed script does. Kit's automation (tagging, PDF delivery, welcome
sequence) is configured entirely inside Kit, not in this codebase.

The form component is `src/integrations/kit/KitForm.tsx`; its state machine
lives in `src/integrations/kit/useKitForm.ts`. Neither ever logs, stores, or
persists the visitor's email client-side.

---

## 5. Assets you need to replace before launch

| File | What it is | Replace with |
|---|---|---|
| `public/assets/blueprint-cover.svg` | Placeholder PDF cover mockup | A real render/photo of your PDF cover (keep the same filename, or update `blueprintCoverAsset` in `src/config/brand.config.ts`) |
| `public/assets/og-image.svg` | Placeholder social share image | A real 1200×630 PNG/JPG. After adding it, update the two `og:image` / `twitter:image` tags in `index.html` to point at the new filename |
| `public/favicon.svg` | Placeholder monogram favicon | Your real mark, if you have one |

## 6. Configuration checklist before going live

- [ ] `src/config/kit.config.ts` — real `FORM_ACTION_URL` (and hidden fields, if any)
- [ ] `src/config/brand.config.ts` — real `siteUrl`, `youtubeUrl`
- [ ] `index.html` — replace every `REPLACE-WITH-YOUR-DOMAIN` occurrence, update OG image if you swapped it for a PNG/JPG
- [ ] `src/data/content.ts` → `brandClosing.exploreChannelHref` — your real channel URL
- [ ] `src/data/content.ts` → `footer.privacyHref` / `termsHref` — real Privacy Policy / Terms URLs once you have them
- [ ] `.env` (copy from `.env.example`) — optional `VITE_GA_MEASUREMENT_ID` and/or `VITE_PLAUSIBLE_DOMAIN`, or leave both blank to ship with analytics off
- [ ] `public/robots.txt` — sitemap URL, once you have a real domain

Nothing above requires touching a component or layout file — copy, brand
values, colors (in `src/config/theme.ts`), Kit config, and analytics config
are all centralized.

---

## 7. Project structure

```
src/
  components/
    ui/          Button, GlassCard, Eyebrow, Container — shared building blocks
    layout/      Header, Footer
    sections/    The 7 scroll sections, one file each
  three/         The R3F scene: central wireframe system, particle/node field,
                 camera rig, capability detection, static reduced-motion fallback
  animations/    GSAP setup, whole-page scroll-progress store, section reveal hook
  integrations/
    kit/         Kit form UI + submit state machine
    analytics/   Provider-agnostic trackEvent()/initAnalytics()
  config/        theme.ts (colors/fonts), brand/kit/analytics/seo config
  data/          content.ts — every headline and sentence on the page
  hooks/         useReducedMotion, useMediaQuery, useScrollDepthTracking
```

## 8. How the 3D layer behaves

- A single `<Canvas>` is mounted once (`src/three/Scene.tsx`), fixed behind
  every section, so the wireframe "system" reads as one continuous world as
  you scroll — not a decoration repeated per section.
- Its opacity, scale, and the surrounding particle/node network are driven
  by whole-page scroll progress (`src/animations/scrollProgress.ts`): faint
  and scattered during "The Problem," assembled and prominent by "The
  Blueprint."
- **`prefers-reduced-motion`** or no WebGL support → a static, zero-motion
  gradient/ring composition (`ReducedMotionFallback.tsx`) is shown instead.
  The page is fully readable and convincing with the 3D layer off.
- Low-power devices (few CPU cores + low memory, or `navigator.connection`
  reporting save-data/slow connection) get a reduced-fidelity scene (fewer
  line segments, fewer particles) rather than a disabled one.

## 9. Analytics

`src/integrations/analytics/analytics.ts` exposes `trackEvent(name, props)`
and is already wired up to fire: `page_view`, `cta_click` (header, hero,
blueprint section), `form_started`, `form_submitted`, `form_success`,
`form_error`, `scroll_depth` (25/50/75/100%). With no GA/Plausible ID set,
these are logged to the console in dev and otherwise no-op — swap in a
provider later by editing this one file.

## 10. Production QA checklist

- [ ] `npm run build` completes with no errors
- [ ] `npm run preview` — hero renders instantly, no layout shift while the
      3D bundle loads in the background
- [ ] Submit the form with a real email against your real Kit form — confirm
      the subscriber appears in Kit and the automation fires
- [ ] Submit with an invalid email — inline error appears, no console error
- [ ] Throttle network to "Slow 3G" in DevTools — hero text is readable
      before the 3D layer appears; nothing blocks
- [ ] Enable "Reduce motion" (OS-level) — page loads with the static poster,
      no scroll-jank, all content still fully readable
- [ ] Test on an actual mid-range Android phone, not just desktop Chrome
      responsive mode — this page is linked from YouTube, most traffic is
      mobile
- [ ] Keyboard-only pass: Tab through header → CTA → email field → submit →
      focus rings visible throughout
- [ ] Screen reader pass on the email form: label, error, and success states
      all announce correctly
- [ ] Lighthouse mobile run — check LCP specifically (the hero headline,
      not the 3D canvas, should be the LCP element)
- [ ] Confirm OG/Twitter preview renders correctly (test via each platform's
      share-debugger tool) once you've swapped in a real PNG/JPG OG image
- [ ] Confirm `robots.txt` and canonical URL point at your real domain
- [ ] Confirm no `REPLACE-WITH-` placeholder strings remain anywhere in the
      shipped build (`grep -r "REPLACE-WITH" src index.html public`)

---

## Notes on the 21st.dev-assisted 3D work

The central wireframe object in `src/three/CentralSystem.tsx` started from a
21st.dev community component (a flowing wireframe-sphere primitive),
retuned to the brand's gold palette, stripped of any user-facing controls
(it's an ambient backdrop, not an interactive toy), and wired to the page's
scroll-progress store so it visibly "assembles" as the visitor scrolls —
per the "a system being constructed" brief. The particle/node/connection
field in `ParticleField.tsx` is an original implementation built for this
project in the same visual language.
