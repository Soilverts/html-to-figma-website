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

## August 17 opportunity release

Fresh OpenSEO, Search Console, and DataForSEO checks found that the crawl/indexing layer is healthy:

- The completed OpenSEO crawl covered 95 pages with 0 technical issues.
- Ten priority URLs were inspected in Search Console; all were indexed and Google's canonical matched the declared canonical.
- August 1-14 produced 55 clicks and 1,862 impressions, versus 42 clicks and 1,494 impressions for July 18-31.
- GA4 is not connected in OpenSEO, so this release can measure search visibility but not landing-page conversion quality yet.

The next gains are page-level rather than a sitewide technical rewrite:

| Opportunity | Evidence | Action in this release |
| --- | --- | --- |
| `claude design to figma` | 140 US volume, KD 9, transactional intent | Reframed `/use-cases/claude-to-figma` around Claude Design standalone HTML export, while preserving the official Claude Code MCP path |
| `figma design handoff from html` | 201 impressions over three months, average position 18.89, 0 clicks | Reframed `/use-cases/developer-handoff` around a versioned, verifiable HTML-to-Figma review workflow |
| `convert tailwind css to figma` | 204 impressions over three months, average position 25.67, 0 clicks | Aligned `/use-cases/tailwind-to-figma` with public build or complete HTML plus compiled CSS |

Product-fact quality is now a release gate. High-intent pages cannot instruct users to copy isolated outerHTML as if it contained external or computed CSS, and automated checks block automatic Auto Layout/Variables and universal-fidelity claims.
