# html2design SEO and GEO Action Plan

Updated: 2026-07-14

## Critical - completed

- [x] Establish current product facts for manual and URL import.
- [x] Correct privacy language for remote URL rendering.
- [x] Correct Waffo payment and URL allowance language.
- [x] Remove stale no-URL claims from core commercial pages.
- [x] Add current AI search crawler policies.
- [x] Fix broken internal links.
- [x] Add automated SEO and product-fact regression checks.

## High priority - completed

- [x] Publish a dedicated `/use-cases/url-to-figma` intent page.
- [x] Add the page to sitemap, use-case hub, homepage fallback, and LLM documents.
- [x] Explain Pixel versus Editable output without absolute fidelity claims.
- [x] Remove deprecated HowTo schema and unverified homepage ratings.
- [x] Reach Lighthouse 100 for accessibility, best practices, and SEO on the new page.
- [x] Reach Lighthouse 100 for accessibility, best practices, and SEO on the homepage.

## High priority - next

- [ ] Export fresh July 2026 Search Console query, page, country, and device data.
- [ ] Rewrite metadata for high-impression pages using current CTR and position data.
- [ ] Refresh `/compare`, `/alternatives`, and direct competitor pages with dated, sourced testing.
- [ ] Add real before/after output images for Pixel and Editable URL capture.
- [ ] Request indexing for the URL page after production deployment.

## Medium priority

- [ ] Reduce homepage mobile LCP by statically rendering more above-fold content.
- [ ] Split or defer Framer Motion from the homepage critical path.
- [ ] Reassess font loading and remove unnecessary font subsets from the initial request graph.
- [ ] Review the remaining 44 metadata length warnings in order of Search Console impressions.
- [ ] Add author/reviewer identity and update dates to high-value tutorials.
- [ ] Build query clusters around `URL to Figma`, `import webpage into Figma`, `website screenshot to Figma`, and `editable website to Figma` without creating duplicate thin pages.

## Ongoing quality gates

- [ ] Run `npm run test:seo` on every site change.
- [ ] Run `npm run build` before push.
- [ ] Re-run Lighthouse on homepage and new intent pages after visual changes.
- [ ] Verify production robots, sitemap, llms files, canonical, and status codes after deployment.
- [ ] Never publish user counts, ratings, timing, or accuracy claims without a dated source.
- [ ] Keep manual-import privacy statements separate from URL-import data flow.
