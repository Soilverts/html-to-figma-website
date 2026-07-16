# Google Search Console Performance Baseline

Exported: 2026-07-14  
Measurement window: 2026-04-13 through 2026-07-12  
Search type: Web

## Executive summary

- 700 clicks from 33,911 impressions; sitewide CTR was 2.06%.
- The latest 28 days generated 360 clicks and 17,678 impressions, compared with 94 clicks and 5,325 impressions in the first 28 days.
- Clicks increased 283% and impressions increased 232% between those windows. Impression-weighted average position improved from approximately 10.85 to 9.38.
- Desktop accounted for 641 clicks and 31,291 impressions. Mobile accounted for 58 clicks and 2,593 impressions.
- Growth is real, but it is concentrated in the homepage, `/alternatives`, and brand or near-brand demand.

## Submission update: 2026-07-16

- Resubmitted `https://html2design.com/sitemap.xml`; Search Console confirmed the submission succeeded.
- The indexing report was still based on its July 10 refresh: 23 indexed pages and 71 not-indexed pages. The not-indexed total comprised 56 discovered but not indexed, 14 crawled but not indexed, and one alternate page with a proper canonical.
- The existing Sitemap row still showed 93 discovered pages from its July 10 read. The current generated Sitemap contains 92 indexable canonical URLs, so this count should be rechecked after Google processes the new submission.
- Requested priority crawling for `/`, `/use-cases/url-to-figma`, `/result-quality`, `/use-cases/bolt-to-figma`, and `/use-cases/lovable-to-figma`.
- `/`, Bolt, and Lovable were already indexed. URL import was unknown to Google; result quality was discovered through the Sitemap but had not yet been crawled. Both new pages passed the live indexability check and were accepted into the priority crawl queue.
- Do not interpret the July 10 coverage totals as the outcome of the July 14-16 deployment. Recheck after the indexing report and Sitemap last-read date advance.

## Leading pages

| Page | Clicks | Impressions | CTR | Position | Interpretation |
|---|---:|---:|---:|---:|---|
| `/` | 492 | 17,342 | 2.84% | 7.49 | Main growth engine; protect the current URL/HTML proposition |
| `/alternatives` | 146 | 9,112 | 1.60% | Strong opportunity page; preserve intent and improve only with post-deploy evidence |
| `/guide` | 10 | 2,931 | 0.34% | Weak CTR and position; newly revised metadata needs a clean observation window |
| `/compare` | 10 | 1,680 | 0.60% | Search intent may overlap with alternatives; obtain page-filtered query exports before consolidation |
| `/use-cases/tailwind-to-figma` | 10 | 333 | 3.00% | Current Tailwind winner; avoid cannibalizing it with the blog article |
| `/use-cases/google-stitch-to-figma` | 1 | 569 | 0.18% | Page-one visibility with a poor snippet; factual metadata and positioning were corrected |
| `/use-cases/lovable-to-figma` | 0 | 281 | 0% | Page-one visibility but insufficient clicks; monitor after the July deployment |

## Query findings

| Query | Clicks | Impressions | CTR | Position | Action |
|---|---:|---:|---:|---:|---|
| `html to design` | 228 | 12,131 | 1.88% | 7.31 | Protect homepage relevance and test snippet changes only after a full post-deploy window |
| `html2design` | 179 | 487 | 36.76% | 1.70 | Strong brand demand |
| `html to design extension` | 0 | 659 | 0% | 9.86 | Do not imply an extension; explain the no-extension workflow and competitor distinction accurately |
| `html.to.design` | 2 | 594 | 0.34% | 9.55 | Navigational competitor intent; `/alternatives` is the appropriate destination |
| `html2figma` | 11 | 124 | 8.87% | 5.79 | Useful near-brand/category bridge |
| `html to figma` | 2 | 248 | 0.81% | 37.13 | Major non-brand ranking gap; strengthen the existing pillar cluster rather than add another thin page |
| `convert html to figma` | 0 | 68 | 0% | 43.32 | Same cluster as the pillar guide and conversion tutorial |
| `import html into figma` | 0 | 71 | 0% | 37.15 | Same cluster as the guide and URL/manual workflow pages |

The visible query table contains 489 of 700 clicks and 19,256 of 33,911 impressions because Search Console suppresses anonymized queries. Query totals must not be treated as the complete site total.

## Geographic and device findings

- The United States has the largest visibility at 7,883 impressions but only 43 clicks, 0.55% CTR, and position 15.17. This is primarily a ranking and authority problem, not just a snippet problem.
- France, Germany, the United Kingdom, Poland, and Australia combine page-one average positions with CTRs around 3% to 5%.
- Mobile average position is 12.46 versus 9.63 on desktop. The mobile share is small, but page and snippet changes must continue to pass mobile layout and performance checks.

## Measurement guardrails

1. Treat this export as a mixed pre-deploy baseline. The major SEO/GEO release landed on 2026-07-14, after the measurement window ended.
2. Do not judge `/result-quality` or the new URL topic cluster from this export; they have not had a complete crawl and ranking window.
3. Export the next complete 28-day period after recrawl and compare clicks, impressions, CTR, and position by page.
4. For `/guide`, `/compare`, `/alternatives`, and the two Tailwind URLs, export queries with a page filter before changing canonicals, redirects, or content ownership.
5. Use strict brand, competitor-navigation, and generic category segments separately. `html.to.design` traffic is not html2design brand traffic.
