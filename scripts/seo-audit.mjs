import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const PUBLIC = join(ROOT, 'public');
const ORIGIN = 'https://html2design.com';
const errors = [];
const warnings = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? '';
}

function attribute(tag, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, 'i');
  return tag.match(pattern)?.[2]?.trim() ?? '';
}

function findTag(html, tagName, predicate) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  return tags.find(predicate) ?? '';
}

function pageLabel(path) {
  return relative(ROOT, path) || 'index.html';
}

function localAssetPath(url) {
  if (!url.startsWith(`${ORIGIN}/`)) return '';
  return join(PUBLIC, new URL(url).pathname.replace(/^\/+/, ''));
}

const htmlFiles = [
  join(ROOT, 'index.html'),
  ...walk(PUBLIC).filter(
    (path) => path.endsWith('.html') && !/\/google[a-z0-9]+\.html$/i.test(path),
  ),
];
const canonicals = new Map();
const indexableCanonicals = new Set();
const internalLinks = new Map();

for (const path of htmlFiles) {
  const html = readFileSync(path, 'utf8');
  const label = pageLabel(path);
  const title = match(html, /<title>([\s\S]*?)<\/title>/i);
  const descriptionTag = findTag(html, 'meta', (tag) => attribute(tag, 'name').toLowerCase() === 'description');
  const canonicalTag = findTag(html, 'link', (tag) => attribute(tag, 'rel').toLowerCase() === 'canonical');
  const robotsTag = findTag(html, 'meta', (tag) => attribute(tag, 'name').toLowerCase() === 'robots');
  const description = attribute(descriptionTag, 'content');
  const canonical = attribute(canonicalTag, 'href');
  const robots = attribute(robotsTag, 'content');
  const noindex = /\bnoindex\b/i.test(robots);

  if (!title) errors.push(`${label}: missing <title>`);
  if (!description) errors.push(`${label}: missing meta description`);
  if (!canonical) errors.push(`${label}: missing canonical`);
  if (canonical && !canonical.startsWith(`${ORIGIN}/`) && canonical !== ORIGIN) {
    errors.push(`${label}: canonical must use ${ORIGIN}`);
  }
  if (title.length > 65) warnings.push(`${label}: title is ${title.length} characters`);
  if (description.length > 165) warnings.push(`${label}: description is ${description.length} characters`);

  for (const imageType of ['og:image', 'twitter:image']) {
    const imageTag = findTag(html, 'meta', (tag) =>
      [attribute(tag, 'property'), attribute(tag, 'name')]
        .map((value) => value.toLowerCase())
        .includes(imageType),
    );
    const imageUrl = attribute(imageTag, 'content');
    const assetPath = localAssetPath(imageUrl);
    if (assetPath && !existsSync(assetPath)) errors.push(`${label}: missing local ${imageType} asset ${imageUrl}`);
  }

  if (canonical) {
    if (canonicals.has(canonical)) errors.push(`${label}: duplicate canonical also used by ${canonicals.get(canonical)}`);
    canonicals.set(canonical, label);
    if (!noindex) indexableCanonicals.add(canonical);
  }

  const schemas = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  schemas.forEach((schema, index) => {
    try {
      JSON.parse(schema[1]);
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  });

  for (const hrefMatch of html.matchAll(/<a\s[^>]*href=["']([^"']+)["']/gi)) {
    const href = hrefMatch[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const route = href.split('#')[0].split('?')[0];
    if (!route) continue;
    if (!internalLinks.has(route)) internalLinks.set(route, label);
  }
}

function internalTargetExists(route) {
  if (route === '/') return existsSync(join(ROOT, 'index.html'));
  const relativeRoute = route.replace(/^\/+|\/+$/g, '');
  if (!relativeRoute) return true;
  return (
    existsSync(join(PUBLIC, relativeRoute)) ||
    existsSync(join(PUBLIC, relativeRoute, 'index.html')) ||
    existsSync(join(PUBLIC, `${relativeRoute}.html`))
  );
}

for (const [route, source] of internalLinks) {
  if (!internalTargetExists(route)) errors.push(`${source}: broken internal link ${route}`);
}

const sitemap = readFileSync(join(PUBLIC, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()));
for (const canonical of indexableCanonicals) {
  if (!sitemapUrls.has(canonical)) errors.push(`sitemap.xml: missing ${canonical}`);
}
for (const match of sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
  const imageUrl = match[1].trim();
  const assetPath = localAssetPath(imageUrl);
  if (assetPath && !existsSync(assetPath)) errors.push(`sitemap.xml: missing local image asset ${imageUrl}`);
}

const requiredFiles = ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt', '.well-known/ai-plugin.json'];
for (const file of requiredFiles) {
  if (!existsSync(join(PUBLIC, file))) errors.push(`public/${file}: required discovery file is missing`);
}

const robots = readFileSync(join(PUBLIC, 'robots.txt'), 'utf8');
for (const bot of ['OAI-SearchBot', 'GPTBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot']) {
  if (!robots.includes(`User-agent: ${bot}`)) errors.push(`robots.txt: missing explicit ${bot} policy`);
}

for (const file of ['llms.txt', 'llms-full.txt']) {
  const content = readFileSync(join(PUBLIC, file), 'utf8');
  const staleClaims = [
    /does not fetch live URLs/i,
    /no external server receives user HTML/i,
    /payment processed through Figma Community billing/i,
  ];
  for (const claim of staleClaims) {
    if (claim.test(content)) errors.push(`${file}: contains stale product claim ${claim}`);
  }
}

const productFactPaths = [
  join(ROOT, 'index.html'),
  ...walk(join(ROOT, 'components')).filter((path) => path.endsWith('.tsx')),
  ...[
    'about/index.html',
    'alternatives/index.html',
    'blog/import-website-into-figma/index.html',
    'compare/index.html',
    'faq/index.html',
    'pricing/index.html',
    'privacy.html',
    'reviews/index.html',
    'use-cases/index.html',
    'use-cases/url-to-figma/index.html',
    'llms.txt',
    'llms-full.txt',
    '.well-known/ai-plugin.json',
  ].map((path) => join(PUBLIC, path)),
];
const forbiddenProductClaims = [
  /does not fetch live URLs/i,
  /no external server receives/i,
  /no URL crawling/i,
  /no live URL, no network/i,
  /all HTML processing happens locally/i,
  /billed through the Figma/i,
  /Figma Plugin Marketplace/i,
  /fully editable Auto Layout/i,
  /used by (?:over )?2,000/i,
  /2,000\+ designers/i,
];
for (const path of productFactPaths) {
  const content = readFileSync(path, 'utf8');
  for (const claim of forbiddenProductClaims) {
    if (claim.test(content)) errors.push(`${pageLabel(path)}: contains stale product claim ${claim}`);
  }
}

const universalClaimPaths = [
  join(ROOT, 'index.html'),
  ...walk(join(ROOT, 'components')).filter((path) => path.endsWith('.tsx')),
  ...htmlFiles,
  join(PUBLIC, 'llms.txt'),
  join(PUBLIC, 'llms-full.txt'),
];
const forbiddenUniversalClaims = [
  /rated 4\.9/i,
  /500\+ (?:users|ratings)/i,
  /2,000\+ active subscribers/i,
  /html2design is free/i,
  /no subscription[^.\n]*free Figma Community plugin/i,
  /98% time reduction/i,
  /pixel-accurate, (?:fully )?editable/i,
  /pixel-perfect editable layers/i,
  /html2design[^.\n]{0,120}(?:the )?only (?:tool|method|option)/i,
  /all converted natively/i,
  /every element addressable/i,
  /output is always clean/i,
  /cannot import localhost builds/i,
];
for (const path of new Set(universalClaimPaths)) {
  const content = readFileSync(path, 'utf8');
  for (const claim of forbiddenUniversalClaims) {
    if (claim.test(content)) errors.push(`${pageLabel(path)}: contains unsupported claim ${claim}`);
  }
}

const aiManifestPath = join(PUBLIC, '.well-known/ai-plugin.json');
try {
  JSON.parse(readFileSync(aiManifestPath, 'utf8'));
} catch (error) {
  errors.push(`public/.well-known/ai-plugin.json: invalid JSON: ${error.message}`);
}

if (warnings.length) {
  console.warn(`SEO audit warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length) {
  console.error(`SEO audit failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`SEO audit passed: ${htmlFiles.length} HTML files, ${indexableCanonicals.size} indexable canonicals, ${sitemapUrls.size} sitemap URLs.`);
