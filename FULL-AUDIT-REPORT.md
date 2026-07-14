# html2design SEO and GEO Audit

Audit date: 2026-07-14
Domain: https://html2design.com
Business type: SaaS / Figma plugin
Scope: 93 HTML documents, 92 indexable canonicals, 95 sitemap URLs

## Executive summary

SEO health score: **96/100**
GEO readiness score: **94/100**

The site now presents the current two-workflow product consistently: manual HTML/file input for local or private sources, and public URL capture with Pixel or Editable modes. Technical discovery, metadata, schema, internal links, AI crawler access, and machine-readable product facts pass automated checks. A real browser-to-Figma case now documents output quality and limitations.

The largest remaining risk is authority, not on-site implementation. A current manual Search Console export is now available, but automated Search Console, Bing Webmaster, Moz, GA4, CrUX, and DataForSEO connections are not configured. Common Crawl did not include the domain in its Jan-Mar 2026 graph.

## Scores

| Category | Score | Notes |
|---|---:|---|
| Technical SEO | 100 | Canonicals, sitemap, robots, JSON-LD, internal links, and product facts pass |
| Content quality | 95 | Metadata warnings are zero; stale core comparison and unsupported social-proof claims removed |
| On-page SEO | 97 | URL/import/screenshot/editable intents form one linked cluster |
| Schema | 98 | Visible, supportable WebPage, TechArticle, Breadcrumb, FAQ, and software facts only |
| Performance | 95 | Homepage 87; URL page 99; output-quality page 99 |
| Accessibility | 100 | Tested pages score 100 and mobile layouts have no horizontal overflow |
| AI search readiness | 94 | Static facts, crawler policies, LLM files, answer blocks, and real evidence |
| Off-site authority | Not scoreable | Insufficient backlink/API data and limited third-party mentions |

## Verified results

### Site audit

- 93 HTML files parsed
- 92 indexable canonical URLs
- 95 sitemap URLs
- Zero title or description warnings
- All JSON-LD parses
- All checked internal links resolve to a local file
- Product-fact and unsupported-claim regression rules pass
- Production Vite build passes

### Lighthouse lab results

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| `/use-cases/url-to-figma` | 99 | 100 | 100 | 100 |
| `/result-quality` | 99 | 100 | 100 | 100 |
| `/` | 87 | 100 | 100 | 100 |

Homepage FCP improved from 3.3s to 2.9s and LCP from 3.8s to 3.3s. Framer Motion and Three.js are no longer module-preloaded on the initial route. The output-quality page has FCP 1.5s, LCP 1.9s, CLS 0, and TBT 0ms.

These are local Lighthouse lab measurements, not CrUX field data.

### Plugin reliability evidence

- 75/75 unit tests passed across 14 files
- 11/11 Playwright end-to-end tests passed
- Statements 94.10%, branches 83.76%, functions 98.61%, lines 97.27%
- TypeScript, ESLint, production build, Worker health, render-service health, missing-token rejection, and invalid-license rejection passed
- Licensed URL smoke capture passed against `https://example.com`, returning 4 editable primitives and 1 raster tile; Worker/render health and authentication-boundary checks also passed

## Major changes

- Added `/result-quality` with real original/import images, visible differences, test method, and coverage evidence.
- Replaced fabricated/stale ratings and subscriber counts with an evidence-based review checklist and live Figma listing link.
- Corrected comparison pages after Figma's official browser-extension capture changed the competitive landscape.
- Removed unsupported `only`, ranking, universal fidelity, automatic Auto Layout, fixed conversion-time, and free-product claims from critical surfaces.
- Rewrote 53 long metadata fields and fixed the audit parser that previously misread apostrophes.
- Added unsupported-claim regression checks across all HTML and React copy.
- Deferred below-fold React sections and removed Framer/Three module preloads from the initial route.
- Added GEO, backlink, and distribution reports.

## Search evidence

The latest Search Console export covers 2026-04-13 through 2026-07-12: 700 clicks, 33,911 impressions, and 2.06% CTR. The latest 28 days produced 360 clicks and 17,678 impressions, versus 94 clicks and 5,325 impressions in the first 28 days. Strict html2design brand variants perform strongly, while `html to figma`, `convert html to figma`, and `import html into figma` remain weak non-brand opportunities. See `GSC-PERFORMANCE-2026-07-14.md` for the baseline and guardrails.

Current public search confirms Figma now promotes an official Chrome extension for capturing webpages as editable layers. html2design differentiation is therefore the combined manual/private HTML and direct public URL workflows, plus explicit Pixel versus Editable output and documented limitations.

## Remaining dependencies

1. Request recrawl after deployment and compare the next complete 28-day window with the July 14 baseline.
2. Connect Bing Webmaster and Moz or DataForSEO for a scoreable backlink profile.
3. Publish the prepared Figma Community, YouTube, Reddit, and directory materials through owner-controlled accounts.
4. Measure homepage CrUX field data before considering a static/SSR architecture migration.
