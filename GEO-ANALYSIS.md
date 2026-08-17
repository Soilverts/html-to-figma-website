# html2design GEO Analysis

Original audit date: 2026-07-14
Content validation: 2026-08-17
Domain: https://html2design.com
Readiness score: **94/100**

## Platform readiness

| Platform | Score | Evidence |
|---|---:|---|
| Google AI Overviews / AI Mode | 95 | Indexable static text, strong conventional SEO, canonical URLs, schema, sitemap, and query-led topic clusters |
| ChatGPT search | 96 | OAI-SearchBot and ChatGPT-User allowed; concise product facts, current limitations, and `llms.txt` are available |
| Perplexity | 94 | PerplexityBot allowed; passage-level answers and real result evidence are crawlable |
| Bing Copilot | 91 | Bingbot allowed; no Bing Webmaster API is configured for live diagnostics |

## Technical access

- `robots.txt` explicitly allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, and PerplexityBot.
- `llms.txt` and `llms-full.txt` document current product facts, workflows, privacy boundaries, pricing, quotas, and limitations.
- Core facts appear in static HTML. The React homepage has a static first render and a `noscript` fact layer.
- JSON-LD parses successfully and describes only visible, supportable content.
- RSL terms are not published because no machine-use licensing policy has been approved. This is a policy decision, not a technical omission to guess at.

## Citability

High-value, self-contained answer sources:

1. `/use-cases/url-to-figma`: public URL workflow, Pixel versus Editable, quotas, remote rendering, and failure causes.
2. `/result-quality`: dated original/import evidence, visible differences, and test coverage.
3. `/use-cases/claude-to-figma`: Claude Design standalone HTML export, public preview capture, and Figma's official Claude Code MCP path with primary-source links.
4. `/use-cases/tailwind-to-figma`: complete-source requirements for public builds, compiled CSS, breakpoints, and design-token cleanup.
5. `/use-cases/developer-handoff`: versioned source state, viewport, provenance, Pixel/Editable selection, and review boundaries.
6. `/reviews`: an evidence-based evaluation checklist that links to the live Figma listing instead of duplicating stale rating counts.
7. `/faq`: workflow, privacy, output, and compatibility answers.
8. `/llms-full.txt`: machine-readable technical reference, updated August 17.

The site now avoids unsupported market-leadership, user-count, rating, conversion-time, universal-accuracy, automatic-Auto-Layout/Variables, and isolated-outerHTML claims on priority pages. The product-claims audit checks 120 content and source files, including machine-readable text references, and applies stricter complete-document rules to high-intent workflow pages.

## Brand mentions

Public search found a small number of organic Reddit mentions of HTML-to-Figma workflows. No reliable Product Hunt or AlternativeTo listing was found. Search results were dominated by html2design's own pages, so third-party authority remains the largest GEO gap.

## Highest-impact next work

1. Publish a short, narrated browser-versus-Figma demo on YouTube using the real fixture from `/result-quality`.
2. Connect GA4 to OpenSEO and define install, checkout-start, and purchase events by landing page so search gains can be tied to revenue.
3. Submit accurate product profiles to AlternativeTo and Product Hunt only after their current listing state is verified.
4. Participate transparently in relevant Reddit discussions; disclose product affiliation and lead with the test artifact, not a sales claim.
5. Connect Bing Webmaster and monitor third-party citations and referring domains; current authority remains the largest off-site gap.

## Measurement limits

- Search Console and DataForSEO are connected through OpenSEO. The August 17 crawl covered 95 pages with 0 technical issues, and ten inspected priority URLs were indexed with matching Google-selected canonicals.
- GA4 is not connected in OpenSEO. Bing Webmaster, Moz, and a confirmed AI-citation tracking source are also unavailable.
- GEO scores reflect technical and content readiness, not confirmed AI citation share or revenue impact.
