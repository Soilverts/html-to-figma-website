# SEO Recovery Baseline - 2026-08-17

## What changed

Google Search Console's completed comparison window fell from 353 to 225 clicks and from 17,476 to 10,699 impressions. The loss was concentrated in the competitor-branded query `html to design`: 116 clicks fell to 1, accounting for 115 of the 128 lost clicks. CTR remained stable while average position worsened, so the primary problem is visibility and URL selection rather than snippet appeal.

The latest complete week is improving: August 8-14 produced 73 clicks and 3,127 impressions, versus 65 clicks and 2,774 impressions on August 1-7.

## Query ownership

| Intent | Primary destination | Purpose |
| --- | --- | --- |
| `html to figma` | `/guide` plus the Figma Community listing | Category education and plugin installation |
| `html to figma plugin` | Figma Community listing | Installation intent; current SERPs strongly prefer Figma Community pages |
| `url to figma` | `/use-cases/url-to-figma` | Public website URL workflow |
| `html to design alternative` | `/alternatives` | Competitor-alternative discovery |
| `html2design vs html.to.design` | `/compare/html2design-vs-html-to-design` | Direct product comparison |
| Pricing queries | `/pricing` | Plan selection and checkout |

The homepage owns the product entity and broad HTML/website-to-Figma value proposition. It must not be rewritten as a competitor comparison page.

## Recovery changes

- Reveal lazy homepage sections automatically after the initial render so crawlers and non-interacting visitors receive the complete product content.
- Add explicit `HTML to Figma plugin` title, install anchor, and `SoftwareApplication.installUrl` signals to the homepage.
- Align `/guide` with the category/tutorial intent that is already ranking for `html to figma`.
- Align `/alternatives` with the competitor-alternative query that is already converting impressions into clicks.
- Add automated query-ownership and rendered-content checks.

## Measurement gates

Use Search Console data with its normal reporting delay. Do not judge this release from same-day rankings.

- Day 0: deploy, request indexing for `/`, `/guide`, and `/alternatives`.
- Day 7: verify crawl dates, chosen canonicals, impressions, and URL assignment.
- Day 14: compare non-branded clicks and impressions with the previous 14 days.
- Day 28: evaluate position and conversion movement for the mapped query groups.

Do not reverse the mapping based on daily volatility. Reconsider only if a mapped page loses impressions for two consecutive complete weekly windows or Google persistently selects another page for the same intent.
