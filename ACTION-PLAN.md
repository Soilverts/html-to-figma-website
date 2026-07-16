# html2design SEO and GEO Action Plan

Updated: 2026-07-16

## Completed in code

- [x] Align product facts for pasted/file HTML, public URL capture, Pixel mode, and Editable mode.
- [x] Add `/use-cases/url-to-figma` and an evidence-led `/result-quality` page.
- [x] Remove unsupported rankings, fixed timing, universal accuracy, and automatic Auto Layout claims.
- [x] Remove HowTo schema and duplicate Article/BlogPosting markup.
- [x] Generate the sitemap from indexable canonical HTML and Git modification dates.
- [x] Add HSTS/CSP configuration and canonical internal links.
- [x] Add SEO, schema, claims, sitemap, content-depth, and duplication regression checks.
- [x] Add production-preview Playwright E2E coverage for the main conversion and evidence routes.
- [x] Fix mobile navigation wrapping, target sizes, hidden states, focus handling, and overflow.
- [x] Remove Three.js and defer Framer Motion until below-fold content is requested.
- [x] Split homepage and static-page Tailwind scanning and unify self-hosted font families.
- [x] Reach Lighthouse 100 for Accessibility, Best Practices, and SEO on tested routes.
- [x] Reach Lighthouse Performance 87 mobile/100 desktop on the homepage and 93 mobile on result-quality.
- [x] Analyze the 2026-07-14 Search Console export and preserve its measurement baseline.
- [x] Revalidate Figma, Anima Buddy, Builder Visual Copilot, and html.to.design capabilities from current primary sources.
- [x] Replace stale competitor claims with a source-linked, testable comparison methodology.
- [x] Run the same Playwright suite against local preview and the production domain.
- [x] Allow Cloudflare Web Analytics through CSP without widening other script sources.

## Platform and owner actions

- [x] Deploy the current commit and verify production HSTS, CSP, canonical, sitemap, and asset responses.
- [x] Configure and test a permanent `www` to apex 301 that preserves paths and query strings.
- [x] Request indexing for the homepage, URL import, result-quality, Bolt, and Lovable pages.
- [x] Strengthen crawl paths to URL import from the homepage, guide, alternatives, and use-case hub, with regression checks.
- [ ] Update the Figma Community listing with evidence-based product language.
- [ ] Publish a real conversion demo and link it from the relevant result/use-case page.
- [ ] Submit accurate profiles to relevant directories after duplicate checks.

## Data connections

- [ ] Connect Search Console and GA4 for automated reporting.
- [ ] Connect Bing Webmaster.
- [ ] Connect DataForSEO, Moz, Ahrefs, or Semrush for backlink and competitor-gap measurement.
- [ ] Establish CrUX field-data monitoring once traffic is sufficient.

## Release gates

- [ ] Run `npm test`, `npm run build`, and `npm audit --audit-level=low` before every deployment.
- [ ] Run mobile Lighthouse after homepage, font, CSS, or media changes.
- [ ] Keep the initial homepage route free of Framer Motion and other below-fold libraries.
- [ ] Never publish ratings, user counts, fixed timing, or universal fidelity without dated evidence.
- [ ] Keep manual-import privacy statements separate from remote URL-capture data flow.
- [ ] Compare the next complete 28-day GSC window with `GSC-PERFORMANCE-2026-07-14.md` before changing stable metadata.
- [ ] Publish same-source competitor result pages only after recording viewport, date, input method, output mode, and visible differences.
- [ ] Instrument URL-import completion, timeout, raster fallback, and cleanup signals without collecting customer HTML unnecessarily.
