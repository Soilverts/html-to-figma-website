# html2design OpenSEO Baseline

Measured: 2026-07-29
Market: United States, English
Sources: self-hosted OpenSEO, DataForSEO live endpoints, repository audits, and Playwright

## Current state

| Area | Measured result |
|---|---|
| Organic traffic estimate | 11 |
| Ranking keywords | 20 |
| Technical crawl | 95 pages, 0 reported issues |
| Homepage Lighthouse mobile | 100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO |
| Homepage Lighthouse desktop | 100 / 100 / 100 / 100 |
| Mobile LCP / CLS / TBT | 1.4 s / 0.007 / 0 ms |
| Desktop LCP / CLS / TBT | 0.4 s / 0.008 / 0 ms |
| Backlinks / referring domains | 5 / 4 |

Technical performance is not the current growth constraint. The limiting factors are weak rankings for the main commercial query, low independent authority, and several older pages that described the manual-input workflow inaccurately.

## Search opportunities

| Query | US volume | Current rank | Current landing page |
|---|---:|---:|---|
| html to figma | 880 | 46 | `/guide` |
| html to design | 720 | 46 | `/compare` |
| html to design figma plugin | 390 | 20 | `/alternatives` |
| claude to figma | 320 | 36 | `/use-cases/claude-to-figma` |
| html to figma plugin | 260 | 19 | `/alternatives` |
| html to design figma | 260 | 28 | `/` |
| html to design plugin | 90 | 13 | `/alternatives` |

The core query should map more clearly to the homepage, while comparison intent belongs on `/compare` and `/alternatives`. The Claude query now has strong official Figma and MCP intent, so that page must explain the official workflow before positioning html2design as a public-URL or complete-document alternative.

## Changes in this release

- The homepage H1 now leads with the exact product category: “HTML to Figma.”
- Manual input documentation now requires complete HTML with CSS and reachable assets.
- Public URL, Pixel, and Editable workflows are separated consistently.
- The Claude page reflects the current official Figma MCP workflow and cites primary sources.
- High-opportunity guide, comparison, FAQ, React, Tailwind, Webflow, Storybook, and AI-tool pages use the same product contract.
- Automated checks reject claims that outerHTML contains computed CSS, that html2design ships a Chrome extension, that all SVG stays vector, or that imports automatically create Auto Layout.
- Invalid site-search schema was removed.

## 30 / 60 / 90 day plan

### First 30 days

- Request recrawl for `/`, `/guide`, `/alternatives`, `/compare`, and `/use-cases/claude-to-figma`.
- Monitor impressions, average position, CTR, plugin-page clicks, and purchase events by landing page.
- Publish or refresh two verified result-quality examples using different source types.
- Keep technical, product-claims, build, and browser E2E gates mandatory for every release.

### Days 31-60

- Earn at least five relevant, independently verified referring domains.
- Publish one evidence-led tutorial for the public URL workflow and one for complete HTML/CSS manual input.
- Improve internal links from pages receiving impressions to the canonical intent page.
- Consolidate or noindex programmatic pages that receive no impressions and cannot provide unique evidence.

### Days 61-90

- Compare a complete 28-day Search Console window with this baseline.
- Refresh titles and answer-first passages only where query data shows a mismatch.
- Build comparison pages only from current primary sources and same-source tests.
- Re-run keyword, backlink, performance, and technical baselines.

## Success criteria

- `html to figma` reaches the top 30 in the US.
- `claude to figma` reaches the top 20 without misrepresenting the official Figma workflow.
- At least 10 relevant referring domains are independently verified.
- Non-brand organic clicks grow by at least 50% against a comparable 28-day window.
- Product-claim, SEO, build, local E2E, and live E2E gates remain green.
