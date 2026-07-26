import { createHash } from 'node:crypto';
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

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
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
const internalLinkSources = new Map();

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
  if (title.length > 60) errors.push(`${label}: title is ${title.length} characters; maximum is 60`);
  if (description.length > 160) errors.push(`${label}: description is ${description.length} characters; maximum is 160`);

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
  const parsedSchemas = [];
  schemas.forEach((schema, index) => {
    try {
      const data = JSON.parse(schema[1]);
      parsedSchemas.push(data);
      const types = Array.isArray(data['@type']) ? data['@type'] : [data['@type']];
      if (types.includes('HowTo')) errors.push(`${label}: deprecated HowTo schema is not allowed`);
      if (types.includes('WebPage') && !data.name) errors.push(`${label}: WebPage schema is missing name`);
    } catch (error) {
      errors.push(`${label}: invalid JSON-LD block ${index + 1}: ${error.message}`);
    }
  });
  const articleTypes = parsedSchemas.flatMap((data) =>
    Array.isArray(data['@type']) ? data['@type'] : [data['@type']],
  );
  if (articleTypes.includes('Article') && articleTypes.includes('BlogPosting')) {
    errors.push(`${label}: duplicate Article and BlogPosting entities describe the same page`);
  }

  for (const hrefMatch of html.matchAll(/<a\s[^>]*href=["']([^"']+)["']/gi)) {
    const href = hrefMatch[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const route = href.split('#')[0].split('?')[0];
    if (!route) continue;
    if (!internalLinks.has(route)) internalLinks.set(route, label);
    if (!internalLinkSources.has(route)) internalLinkSources.set(route, new Set());
    internalLinkSources.get(route).add(label);
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

const priorityInboundRequirements = new Map([
  ['/use-cases/url-to-figma', {
    minimumSources: 6,
    requiredSources: [
      'index.html',
      'public/alternatives/index.html',
      'public/guide/index.html',
      'public/use-cases/index.html',
    ],
  }],
  ['/result-quality', {
    minimumSources: 6,
    requiredSources: [
      'index.html',
      'public/alternatives/index.html',
      'public/guide/index.html',
    ],
  }],
]);

for (const [route, requirement] of priorityInboundRequirements) {
  const sources = internalLinkSources.get(route) ?? new Set();
  if (sources.size < requirement.minimumSources) {
    errors.push(`${route}: only ${sources.size} internal link sources; requires at least ${requirement.minimumSources}`);
  }
  for (const source of requirement.requiredSources) {
    if (!sources.has(source)) errors.push(`${source}: must link to priority page ${route}`);
  }
}

const sitemap = readFileSync(join(PUBLIC, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim()));
for (const canonical of indexableCanonicals) {
  if (!sitemapUrls.has(canonical)) errors.push(`sitemap.xml: missing ${canonical}`);
}
for (const url of sitemapUrls) {
  if (!indexableCanonicals.has(url)) errors.push(`sitemap.xml: non-indexable or non-page URL ${url}`);
}
if (/<(?:changefreq|priority)>/i.test(sitemap)) {
  errors.push('sitemap.xml: remove ignored changefreq and priority fields');
}
for (const match of sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
  const imageUrl = match[1].trim();
  const assetPath = localAssetPath(imageUrl);
  if (assetPath && !existsSync(assetPath)) errors.push(`sitemap.xml: missing local image asset ${imageUrl}`);
}

const requiredFiles = [
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'llms-full.txt',
  '.well-known/ai-plugin.json',
  'results/linea/evidence.json',
];
for (const file of requiredFiles) {
  if (!existsSync(join(PUBLIC, file))) errors.push(`public/${file}: required discovery file is missing`);
}

const evidencePath = join(PUBLIC, 'results/linea/evidence.json');
if (existsSync(evidencePath)) {
  try {
    const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
    const resultPage = readFileSync(join(PUBLIC, 'result-quality/index.html'), 'utf8');
    const fixtureUrl = evidence.source?.url;
    if (!fixtureUrl?.startsWith('https://')) errors.push('results/linea/evidence.json: source URL must use HTTPS');
    if (fixtureUrl && !resultPage.includes(`href="${fixtureUrl}"`)) {
      errors.push('public/result-quality/index.html: must link to the exact LINEA input fixture');
    }
    if (!resultPage.includes('href="/results/linea/evidence.json"')) {
      errors.push('public/result-quality/index.html: must link to the LINEA evidence manifest');
    }

    for (const key of ['source', 'output']) {
      const screenshot = evidence[key]?.screenshot;
      if (!screenshot?.path || !screenshot?.sha256) {
        errors.push(`results/linea/evidence.json: ${key} screenshot evidence is incomplete`);
        continue;
      }
      const screenshotPath = join(PUBLIC, screenshot.path.replace(/^\/+/, ''));
      if (!existsSync(screenshotPath)) {
        errors.push(`results/linea/evidence.json: missing ${key} screenshot ${screenshot.path}`);
      } else if (sha256(screenshotPath) !== screenshot.sha256) {
        errors.push(`results/linea/evidence.json: ${key} screenshot SHA-256 does not match ${screenshot.path}`);
      }
    }

    const layers = evidence.output?.layers;
    if (layers?.selectable !== 90 || layers?.text !== 57 || layers?.image !== 16) {
      errors.push('results/linea/evidence.json: LINEA layer counts must match the verified Figma node');
    }
    for (const verification of Object.values(evidence.verification ?? {})) {
      if (verification.sha256_equal !== true || verification.rmse !== 0) {
        errors.push('results/linea/evidence.json: image verification must record exact equality');
      }
    }
  } catch (error) {
    errors.push(`results/linea/evidence.json: invalid JSON: ${error.message}`);
  }
}

const headers = readFileSync(join(PUBLIC, '_headers'), 'utf8');
for (const header of ['Strict-Transport-Security:', 'Content-Security-Policy:']) {
  if (!headers.includes(header)) errors.push(`public/_headers: missing ${header.slice(0, -1)}`);
}

const homepage = readFileSync(join(ROOT, 'index.html'), 'utf8');
const staticRoot = homepage.match(/<div id=["']root["']>([\s\S]*?)<!-- Noscript SEO Fallback:/i)?.[1] ?? '';
const staticRootText = staticRoot
  .replace(/<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:[a-z]+|#\d+|#x[a-f0-9]+);/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const staticRootWordCount = staticRootText.match(/\b[\p{L}\p{N}][\p{L}\p{N}'-]*\b/gu)?.length ?? 0;
if (staticRootWordCount < 200) {
  errors.push(`index.html: static root has only ${staticRootWordCount} visible words; minimum is 200`);
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
  /\bunder (?:\d+(?:[–-]\d+)?|two|an?) (?:seconds?|minutes?|hours?)\b/i,
  /\b(?:output|result)[^.\n]{0,100}matches?[^.\n]{0,60}(?:exactly|pixel-perfect)/i,
  /match the browser(?:'s)? rendered output exactly/i,
  /(?:native|editable) Figma layers[^.\n]{0,100}pixel-accurate/i,
  /\b(?:50[–-]80|98)%?x? (?:speed improvement|time reduction)\b/i,
  /\b(?:html2design|HTML to Figma)[^.\n]{0,140}\bin seconds\b/i,
  /\b(?:get|generates?|produces?)[^.\n]{0,80}fully editable (?:Figma )?layers\b/i,
  /\bworks entirely from pasted HTML\b/i,
  /\bURL-based (?:import )?tools cannot reach\b/i,
  /\bAnima[^.\n]{0,140}(?:cannot|can't|does not|not designed)[^.\n]{0,100}(?:import HTML|HTML import|code[^.\n]{0,20}Figma)\b/i,
  /\bFigma AI[^.\n]{0,140}(?:cannot|can't|does not)[^.\n]{0,100}(?:HTML|webpage|production UI)\b/i,
  /\bhtml\.to\.design[^.\n]{0,140}(?:requires|needs)[^.\n]{0,80}(?:live URL|Chrome extension)\b/i,
  /\bhtml2design is the best\b/i,
];
for (const path of new Set(universalClaimPaths)) {
  const content = readFileSync(path, 'utf8');
  for (const claim of forbiddenUniversalClaims) {
    if (claim.test(content)) errors.push(`${pageLabel(path)}: contains unsupported claim ${claim}`);
  }
}

const currentFactRequirements = new Map([
  ['blog/figma-ai-2026/index.html', [
    /figma\.com\/downloads\/chrome-extension/i,
    /developers\.figma\.com\/docs\/figma-mcp-server\/code-to-canvas/i,
    /Pixel mode/i,
    /Editable mode/i,
  ]],
  ['compare/html2design-vs-anima/index.html', [
    /Anima Buddy/i,
    /animaapp\.com\/blog\/ai-design-en\/figma-import-image-html-code-to-layers/i,
    /HTML, URLs, screenshots, images, and Claude artifacts/i,
  ]],
  ['compare/html2design-vs-html-to-design/index.html', [
    /html\.to\.design accepts public URLs/i,
    /extension (?:is used )?for private/i,
    /Pixel or Editable/i,
  ]],
  ['blog/html-to-figma-tools-compared/index.html', [
    /Figma Chrome Extension/i,
    /Anima Buddy/i,
    /html\.to\.design/i,
    /Manual Rebuild/i,
  ]],
]);
for (const [relativePath, requirements] of currentFactRequirements) {
  const content = readFileSync(join(PUBLIC, relativePath), 'utf8');
  for (const requirement of requirements) {
    if (!requirement.test(content)) errors.push(`public/${relativePath}: missing current fact ${requirement}`);
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
