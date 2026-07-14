# html2design SEO and GEO Audit

Audit date: 2026-07-14  
Domain: https://html2design.com  
Business type: SaaS / Figma plugin  
Scope: 92 HTML documents, 91 indexable canonicals, 94 sitemap URLs

## Executive summary

SEO health score: **88/100**

The site is crawlable and has broad topic coverage, but the product changed faster than its marketing content. The highest-risk issue was factual inconsistency: several authoritative pages still said html2design could not import URLs, all processing was local, payments used Figma billing, and imports were unrestricted. Those claims conflicted with the current product and weakened both user trust and AI citation quality.

This pass established a current product-fact layer, created a dedicated URL-to-Figma page, fixed broken internal links, corrected core commercial and privacy pages, and added an automated SEO regression test. No index-blocking errors remain in the local production build.

## Scores

| Category | Score | Notes |
|---|---:|---|
| Technical SEO | 96 | Canonicals, robots, sitemap, JSON-LD parsing, and internal links pass automated checks |
| Content quality | 78 | Core facts are corrected; 44 title/description length warnings remain across long-tail pages |
| On-page SEO | 85 | New URL intent page is strong; legacy pages still need query-led metadata iteration |
| Schema | 88 | Valid JSON-LD; unsupported HowTo markup and unverified aggregate ratings removed from the homepage |
| Performance | 91 | URL page scores 99; homepage scores 82 due to its existing React/Framer/font architecture |
| AI search readiness | 96 | Current crawler policies, llms files, clear answer blocks, and honest capability boundaries |
| Images | 90 | Existing social images are present; future product pages need more real output examples |

## Verified results

### Automated site audit

- 92 HTML files parsed
- 91 indexable canonical URLs found in the sitemap
- 94 sitemap URLs
- All JSON-LD blocks parse successfully
- Required discovery files exist: robots, sitemap, llms, llms-full, AI manifest
- Explicit policies exist for OAI-SearchBot, GPTBot, Claude-SearchBot, Claude-User, and PerplexityBot
- Internal-link existence check passes
- Product-fact regression patterns pass
- Production Vite build passes

### Lighthouse lab results

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| `/use-cases/url-to-figma` | 99 | 100 | 100 | 100 |
| `/` | 82 | 100 | 100 | 100 |

URL page Core Web Vitals lab signals: LCP 2.0s, CLS 0, TBT 0ms.  
Homepage lab signals: LCP 3.8s, CLS 0, TBT 0ms.

These are local Lighthouse lab measurements, not Chrome UX Report field data.

## Changes completed

- Added `npm run test:seo` as a commit-blocking quality gate.
- Added canonical, sitemap, JSON-LD, AI crawler, stale-claim, and internal-link checks.
- Corrected robots directives for current OpenAI, Anthropic, Perplexity, and Google behavior.
- Rebuilt `llms.txt`, `llms-full.txt`, and the AI plugin manifest around the current two-workflow product.
- Added `/use-cases/url-to-figma` with clear Pixel versus Editable guidance, quotas, privacy, and limitations.
- Added the URL page to the sitemap and use-case hub.
- Corrected homepage, pricing, FAQ, privacy, comparison, alternatives, About, Reviews, and the main website-import tutorial.
- Removed unverified homepage rating markup and deprecated HowTo schema.
- Fixed five broken internal links to nonexistent use-case pages.
- Fixed homepage mobile-menu focus behavior and low-contrast text.
- Deferred the decorative Three.js background until after the initial rendering window.

## GEO assessment

Google does not require special GEO markup for AI Overviews or AI Mode. The useful work is conventional SEO: indexable text, accurate visible content, sound internal linking, and structured data that matches the page. `Google-Extended` does not control Google Search inclusion.

For ChatGPT search, `OAI-SearchBot` is the important search crawler. `GPTBot` and user-triggered browsing have separate purposes. Anthropic and Perplexity also publish distinct crawler identities. The site now states explicit allow policies for search crawlers while preserving clear product documentation in normal server-rendered text.

The new URL page is designed for passage-level citation: direct answers appear before supporting detail, limitations are explicit, and facts such as plan allowances and processing behavior can be quoted without surrounding context.

Primary references:

- https://developers.google.com/search/docs/appearance/ai-features
- https://platform.openai.com/docs/bots
- https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- https://docs.perplexity.ai/guides/bots

## Remaining risks

1. **Homepage performance:** the React entry bundle, Framer Motion, font loading, and delayed Three.js visual keep mobile lab performance below the new static URL page. A future architecture pass should server-render or statically render more homepage content and load animation code only after interaction or idle.
2. **Metadata backlog:** 44 warnings remain for titles over 65 characters or descriptions over 165 characters. These are not indexing errors, but the highest-impression pages should be rewritten using current Search Console data.
3. **Legacy editorial wording:** some long-tail framework and comparison pages correctly describe manual import as not requiring a live URL, but they predate direct URL capture. They should be updated when refreshed so the two workflows are consistently explained.
4. **Field data unavailable:** the newest local Search Console export is from May 2026. July query, page, country, and device exports are needed before making broad CTR changes.
5. **Authority evidence:** claims about ratings, user counts, conversion time, and market leadership should not return unless backed by a current verifiable source.

## Data limitations

- No current CrUX field data was available.
- No authenticated live Search Console API session was available.
- The audit used the local production build plus existing May 2026 Search Console exports.
- Backlink and external brand-mention analysis were not included in this implementation pass.
