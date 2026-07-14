# html2design Backlink Audit

Audit date: 2026-07-14
Backlink health score: **INSUFFICIENT DATA (1/7 factors available)**

## Available evidence

| Factor | Status | Source |
|---|---|---|
| Referring-domain count | Not scoreable | Common Crawl did not contain `html2design.com` in the Jan-Mar 2026 web graph |
| Domain quality | No data | Moz/DataForSEO unavailable |
| Anchor distribution | No data | Moz/Bing/DataForSEO unavailable |
| Toxic links | No data | Moz/DataForSEO unavailable |
| Top linked pages | No data | Moz/DataForSEO unavailable |
| Link velocity | No data | DataForSEO unavailable |
| Public brand mentions | Limited | Search found a small number of Reddit references |

Common Crawl returned `in_crawl: false`, no PageRank, and no referring-domain sample. That can mean the domain is new or below the public graph threshold; it is not evidence of a penalty.

## Risks

- Search results are dominated by first-party pages, so independent corroboration is weak.
- Old cached first-party claims can circulate longer than the corrected pages. The current deploy should be followed by Search Console recrawl requests.
- A numeric authority or toxicity score would be misleading without at least four measurable factors.

## Link acquisition priorities

1. Figma Community listing linking to the canonical product and output-quality pages.
2. A YouTube demo description linking to `/result-quality` and `/use-cases/url-to-figma`.
3. Accurate AlternativeTo and Product Hunt profiles after duplicate-listing checks.
4. Technical articles built around reproducible fixtures and failure analysis, not generic guest posts.
5. Transparent answers in existing Figma and design-tool discussions where the product directly solves the stated workflow.

## Required data connections

- Moz API for DA/PA, link domains, anchors, and spam indicators.
- Bing Webmaster Tools for known links and competitor comparison.
- DataForSEO for complete backlink, new/lost, and competitor-gap data.

Until one of these is configured, backlink work should be measured through verified referral traffic and manually confirmed mentions rather than an invented score.
