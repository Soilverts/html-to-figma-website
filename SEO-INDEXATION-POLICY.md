# SEO Indexation Policy

Last updated: 2026-08-10

## Goal

Keep the index focused on pages that answer a distinct search intent with
product-accurate, independently useful information. Publishing a page does not
automatically make it eligible for the XML sitemap or search indexing.

## Indexable Pages

A page can remain indexable when it has all of the following:

- A distinct user problem and query intent.
- Product claims that match the shipped plugin.
- Enough unique guidance to stand on its own rather than swapping a product or
  framework name into a shared template.
- Useful internal links and a self-referencing canonical URL.
- Real evidence, setup details, or technical constraints where the topic makes
  product-output claims.

Core product, pricing, result-quality, URL workflow, framework, guide,
comparison, and editorial pages currently meet this threshold.

## Current Indexing Decision

Do not deindex existing use-case pages solely because they are shorter or use a
shared layout. Search Console data for the three months ending 2026-08-07 shows
that every reviewed AI-tool page already has impressions, and several have
clicks. Removing them would discard demonstrated demand.

The current 92-page indexable set is frozen. New programmatic pages require a
documented query, a distinct example, and an internal-link owner before they can
enter the sitemap. Existing pages with no impressions are improved or
consolidated only after a full 90-day observation window.

## Release Gate

Before making a new page indexable:

1. Confirm the intent is not already served by an existing page.
2. Add product-specific steps, limits, and at least one unique example or
   verifiable external reference.
3. Run `npm run test:seo` and `npm run build:sitemap`.
4. Check the page in Search Console after deployment. If it receives no
   impressions and has no unique evidence after 90 days, improve or consolidate
   it into the strongest intent owner before considering `noindex, follow`.

## Monitoring

OpenSEO is connected to the verified `https://html2design.com/` Search Console
property. Use page-level performance plus URL Inspection, not sitemap counts
alone, when deciding whether a URL is indexed, under evaluation, or redundant.
