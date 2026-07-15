import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const USE_CASES = join(ROOT, 'public', 'use-cases');
const MAX_SIMILARITY = 0.82;
const WARNING_SIMILARITY = 0.75;
const MIN_WORDS = 450;
const errors = [];
const warnings = [];
const stopWords = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'into', 'your', 'you', 'are', 'can',
  'use', 'using', 'when', 'then', 'than', 'has', 'have', 'not', 'but', 'all', 'any', 'its',
  'our', 'out', 'how', 'what', 'where', 'which', 'will', 'page', 'figma', 'html2design',
]);

function decode(text) {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|x27);/gi, "'")
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)));
}

function visibleMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return decode(
    main
      .replace(/<(?:script|style|noscript)\b[^>]*>[\s\S]*?<\/(?:script|style|noscript)>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ').trim();
}

function vocabulary(text) {
  const words = text.toLowerCase().match(/[a-z0-9]+(?:['-][a-z0-9]+)*/g) ?? [];
  return new Set(words.filter((word) => word.length > 2 && !stopWords.has(word)));
}

function jaccard(left, right) {
  let intersection = 0;
  for (const token of left) if (right.has(token)) intersection += 1;
  return intersection / (left.size + right.size - intersection || 1);
}

const pages = readdirSync(USE_CASES)
  .map((name) => join(USE_CASES, name, 'index.html'))
  .filter((path) => statSync(path, { throwIfNoEntry: false })?.isFile())
  .map((path) => {
    const html = readFileSync(path, 'utf8');
    const text = visibleMain(html);
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '';
    const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1] ?? '';
    const words = text.match(/\b[\p{L}\p{N}][\p{L}\p{N}'-]*\b/gu) ?? [];
    return {
      canonical,
      hash: createHash('sha256').update(text).digest('hex'),
      name: basename(join(path, '..')),
      path,
      title,
      vocabulary: vocabulary(text),
      wordCount: words.length,
    };
  });

for (const page of pages) {
  if (page.wordCount < MIN_WORDS) errors.push(`${page.name}: only ${page.wordCount} visible words`);
  if (!page.title) errors.push(`${page.name}: missing title`);
  if (!page.canonical) errors.push(`${page.name}: missing canonical`);
}

let highest = { left: '', right: '', score: 0 };
for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < pages.length; j += 1) {
    const left = pages[i];
    const right = pages[j];
    if (left.title === right.title) errors.push(`${left.name} and ${right.name}: duplicate title`);
    if (left.canonical === right.canonical) errors.push(`${left.name} and ${right.name}: duplicate canonical`);
    if (left.hash === right.hash) errors.push(`${left.name} and ${right.name}: duplicate visible content`);
    const score = jaccard(left.vocabulary, right.vocabulary);
    if (score > highest.score) highest = { left: left.name, right: right.name, score };
    const message = `${left.name} and ${right.name}: ${(score * 100).toFixed(1)}% vocabulary similarity`;
    if (score > MAX_SIMILARITY) errors.push(message);
    else if (score > WARNING_SIMILARITY) warnings.push(message);
  }
}

if (warnings.length) {
  console.warn(`Content quality warnings (${warnings.length}):`);
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

if (errors.length) {
  console.error(`Content quality audit failed (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Content quality audit passed: ${pages.length} use-case pages; highest vocabulary similarity ` +
  `${(highest.score * 100).toFixed(1)}% (${highest.left} vs ${highest.right}).`,
);
