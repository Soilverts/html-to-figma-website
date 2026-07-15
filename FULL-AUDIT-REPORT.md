# html2design SEO and GEO Audit

Audit date: 2026-07-15
Domain: https://html2design.com
Business type: SaaS / Figma plugin
Scope: 93 HTML documents, 92 indexable canonicals, 92 sitemap URLs

## Executive summary

The code-side audit is complete. Automated checks now cover crawlability, canonical and sitemap consistency, schema safety, internal links, unsupported product claims, long-tail content duplication, responsive headers, critical conversion routes, evidence-image dimensions, and initial bundle behavior.

The main remaining work is outside the repository: enforce the `www` to apex redirect at the edge, verify deployed response headers, request recrawls, collect CrUX field data, and build third-party authority. Long-tail use-case pages are now materially less repetitive, but editorial expansion should continue only where Search Console shows demand.

## Current assessment

| Area | Status | Evidence |
|---|---|---|
| Technical SEO | Strong, one platform action remains | 92 canonicals match 92 sitemap URLs; HSTS/CSP configured; `www` redirect needs edge configuration |
| On-page SEO | Strong | Titles, descriptions, one-H1 structure, canonicals, and core intent pages pass repository checks |
| Schema | Strong | Zero HowTo blocks; no duplicate Article/BlogPosting pairs; required WebPage names present |
| Content quality | Improved, monitor long-tail depth | 35 use-case pages pass minimum depth and duplication checks; maximum vocabulary similarity is 71.9% |
| GEO readiness | Strong first-party evidence | Product facts, limitations, answer blocks, method notes, reviewer/date signals, and real result images are visible |
| Performance | Strong | Homepage Lighthouse: 87 mobile, 100 desktop; result-quality: 93 mobile |
| Accessibility | Strong on tested routes | Lighthouse 100 and browser checks show no horizontal overflow on key mobile routes |
| Authority | Not yet scoreable | No connected backlink provider or automated third-party mention dataset |

## Verified results

### Repository checks

- 93 HTML files parsed and 92 indexable canonical URLs validated.
- Sitemap is generated from indexable HTML and contains exactly 92 page URLs.
- Sitemap omits non-page resources, `priority`, and `changefreq`.
- All JSON-LD parses; prohibited HowTo schema and duplicate article types fail the build.
- Redirecting internal privacy and terms links were replaced with canonical paths.
- Unsupported timing, exactness, and editable-fidelity claims fail the audit.
- 35 use-case pages pass word-count, duplicate-title, canonical, body-hash, and similarity checks.
- Five Playwright E2E flows pass across the homepage, URL import, pricing, result quality, Bolt, Lovable, alternatives, comparisons, and current-product articles.
- `npm audit --audit-level=low` reports zero vulnerabilities.

### Lighthouse lab results

| Page and profile | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` mobile | 87 | 100 | 100 | 100 | 3.2s | 3.2s | 0ms | 0.008 |
| `/` desktop | 100 | 100 | 100 | 100 | 0.6s | 0.6s | 0ms | 0 |
| `/result-quality` mobile | 93 | 100 | 100 | 100 | 1.4s | 3.2s | 0ms | 0 |

These are local Lighthouse lab measurements, not CrUX field data.

## Changes completed

- Replaced the homepage's delayed below-fold timer with intent-driven loading.
- Removed Three.js and corrected chunking so Framer Motion is absent from initial requests.
- Reduced homepage CSS from 52.8 KB to 35.5 KB and separated static-page Tailwind generation.
- Unified all pages on the existing self-hosted Latin Inter and JetBrains Mono files.
- Added HSTS and CSP headers for the Cloudflare Pages deployment.
- Added deterministic sitemap generation based on actual indexable pages and Git modification dates.
- Removed 14 HowTo schema blocks and one duplicate Article block.
- Added schema, sitemap, header, content-claim, and duplication regression gates.
- Reworked Bolt and Lovable pages with product-specific facts and primary-source links.
- Revalidated competitor pages against current primary sources: Figma's Chrome extension and MCP code to canvas, Anima Buddy's June 2026 multi-source import, Builder Visual Copilot, and html.to.design's plugin-plus-extension workflow.
- Replaced obsolete "competitor cannot import HTML" positioning with source-linked workflow comparisons and explicit output-quality review criteria.
- Expanded `/result-quality` with a self-contained answer, method, limitations, reviewer date, and inspectable full-resolution evidence.
- Fixed mobile navigation sizing, wrapping, visibility, focus behavior, and overflow regressions.

## Search evidence

The Search Console export for 2026-04-13 through 2026-07-12 records 700 clicks, 33,911 impressions, and 2.06% CTR. The homepage and alternatives pages lead current traffic. Non-brand terms such as `html to figma`, `convert html to figma`, and `import html into figma` remain the main growth opportunity. Metadata should remain stable until a complete post-deployment comparison window is available; see `GSC-PERFORMANCE-2026-07-14.md`.

## Remaining dependencies

1. Configure and verify a permanent `www.html2design.com` to `html2design.com` redirect at Cloudflare or DNS level.
2. Deploy and confirm HSTS/CSP on production responses before tightening CSP further.
3. Request recrawls for the homepage, URL import, result-quality, and materially updated use-case pages.
4. Connect Search Console, GA4, Bing Webmaster, and a backlink provider for repeatable reporting.
5. Compare CrUX field data and the next complete 28-day GSC window before further homepage architecture or metadata changes.
6. Build verifiable third-party mentions through the Figma listing, demos, directories, and relevant community answers.

## Next content opportunities

1. Publish repeatable side-by-side result pages for Figma's extension, Anima Buddy, Builder Visual Copilot, and html.to.design using the same public source and viewport.
2. Add a maintained compatibility matrix for fonts, SVG, canvas, video, WebGL, pseudo-elements, fixed positioning, and authenticated assets.
3. Add product-level outcome telemetry for URL imports: completion rate, timeout rate, unsupported-node count, raster fallback count, and cleanup feedback.
4. Expand only the use-case clusters that earn impressions or assisted conversions; prune or consolidate pages that remain unobserved after a complete measurement window.
