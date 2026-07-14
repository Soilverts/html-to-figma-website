# html2design GEO Analysis

Audit date: 2026-07-14
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
3. `/reviews`: an evidence-based evaluation checklist that links to the live Figma listing instead of duplicating stale rating counts.
4. `/faq`: workflow, privacy, output, and compatibility answers.
5. `/llms-full.txt`: machine-readable technical reference.

The site now avoids unsupported market-leadership, user-count, rating, conversion-time, universal-accuracy, and automatic-Auto-Layout claims. The SEO test blocks their most harmful variants from returning.

## Brand mentions

Public search found a small number of organic Reddit mentions of HTML-to-Figma workflows. No reliable Product Hunt or AlternativeTo listing was found. Search results were dominated by html2design's own pages, so third-party authority remains the largest GEO gap.

## Highest-impact next work

1. Publish a short, narrated browser-versus-Figma demo on YouTube using the real fixture from `/result-quality`.
2. Update the Figma Community description with the two-workflow positioning and honest Editable-mode limits.
3. Submit accurate product profiles to AlternativeTo and Product Hunt only after their current listing state is verified.
4. Participate transparently in relevant Reddit discussions; disclose product affiliation and lead with the test artifact, not a sales claim.
5. Connect Search Console, Bing Webmaster, Moz, and optionally DataForSEO so citation, query, and backlink changes can be measured instead of inferred.

## Measurement limits

- No live Search Console, Bing Webmaster, Moz, GA4, CrUX, or DataForSEO credentials were available.
- The latest local Search Console export is dated 2026-05-26.
- GEO scores reflect technical and content readiness, not confirmed AI citation share.
