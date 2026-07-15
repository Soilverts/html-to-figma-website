import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { XMLBuilder, XMLParser } from 'fast-xml-parser';

const ROOT = resolve(import.meta.dirname, '..');
const PUBLIC = join(ROOT, 'public');
const SITEMAP = join(PUBLIC, 'sitemap.xml');
const ORIGIN = 'https://html2design.com';
const TODAY = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function attribute(tag, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, 'i');
  return tag.match(pattern)?.[2]?.trim() ?? '';
}

function findTag(html, tagName, predicate) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
  return tags.find(predicate) ?? '';
}

function git(args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function lastModified(path) {
  const relativePath = relative(ROOT, path);
  if (git(['status', '--porcelain', '--', relativePath])) return TODAY;
  return git(['log', '-1', '--format=%cs', '--', relativePath]) || TODAY;
}

const parser = new XMLParser({ ignoreAttributes: false, processEntities: false });
const currentDocument = parser.parse(readFileSync(SITEMAP, 'utf8'));
const currentEntries = currentDocument.urlset?.url ?? [];
const currentList = Array.isArray(currentEntries) ? currentEntries : [currentEntries];
const currentByUrl = new Map(currentList.map((entry) => [entry.loc, entry]));
const currentOrder = new Map(currentList.map((entry, index) => [entry.loc, index]));

const htmlFiles = [
  join(ROOT, 'index.html'),
  ...walk(PUBLIC).filter(
    (path) => path.endsWith('.html') && !/\/google[a-z0-9]+\.html$/i.test(path),
  ),
];

const pages = htmlFiles.flatMap((path) => {
  const html = readFileSync(path, 'utf8');
  const canonicalTag = findTag(
    html,
    'link',
    (tag) => attribute(tag, 'rel').toLowerCase() === 'canonical',
  );
  const robotsTag = findTag(
    html,
    'meta',
    (tag) => attribute(tag, 'name').toLowerCase() === 'robots',
  );
  const canonical = attribute(canonicalTag, 'href');
  const robots = attribute(robotsTag, 'content');
  if (!canonical || !canonical.startsWith(ORIGIN) || /\bnoindex\b/i.test(robots)) return [];

  const previous = currentByUrl.get(canonical);
  const entry = {
    loc: canonical,
    lastmod: lastModified(path),
  };
  if (previous?.['image:image']) entry['image:image'] = previous['image:image'];
  return [{ entry, order: currentOrder.get(canonical) ?? Number.MAX_SAFE_INTEGER }];
});

pages.sort((a, b) => a.order - b.order || a.entry.loc.localeCompare(b.entry.loc));

const builder = new XMLBuilder({
  format: true,
  ignoreAttributes: false,
  indentBy: '  ',
  processEntities: false,
  suppressEmptyNode: true,
});
const xml = builder.build({
  urlset: {
    '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
    '@_xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
    url: pages.map(({ entry }) => entry),
  },
});

writeFileSync(SITEMAP, `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`);
console.log(`Generated sitemap.xml with ${pages.length} indexable pages.`);
