import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const roots = ['components', 'public', 'scripts', 'index.html'];
const extensions = new Set(['.html', '.tsx', '.xml', '.mjs']);
const ignoredDirectories = new Set(['dist', 'node_modules']);

const unsupportedClaims = [
  {
    pattern: /html2design chrome extension/i,
    reason: 'html2design does not ship a Chrome extension',
  },
  {
    pattern: /chrome extension mode/i,
    reason: 'html2design has URL Pixel/Editable modes, not an extension mode',
  },
  {
    pattern: /copying outerhtml is enough/i,
    reason: 'outerHTML does not embed external or computed CSS',
  },
  {
    pattern: /all computed styles are included/i,
    reason: 'outerHTML does not include the browser computed-style map',
  },
  {
    pattern: /all styles are fully inlined by the browser/i,
    reason: 'browsers do not rewrite external CSS into outerHTML',
  },
  {
    pattern: /every computed style transfers/i,
    reason: 'browser and Figma rendering are not one-to-one',
  },
  {
    pattern: /imports? inline svg(?:s)? as native figma vector/i,
    reason: 'SVG handling depends on the input path and complexity',
  },
  {
    pattern: /svg elements as native figma vector paths/i,
    reason: 'SVG handling depends on the input path and complexity',
  },
  {
    pattern: /outerhtml.{0,260}(?:browser-computed|computed styles?|resolved (?:styles?|values?)|styles? preserved)/i,
    reason: 'outerHTML preserves markup, not external or computed CSS',
    allowExplicitCaveat: true,
  },
  {
    pattern: /(?:browser|plugin).{0,260}(?:computed|resolved)[^<]{0,260}outerhtml/i,
    reason: 'outerHTML preserves markup, not external or computed CSS',
    allowExplicitCaveat: true,
  },
];

function isExplicitOuterHtmlCaveat(line) {
  return /outerhtml.{0,180}(?:does not|doesn't|do not|not include|without)/i.test(line);
}

function collect(path) {
  const absolute = join(root, path);
  if (!statSync(absolute).isDirectory()) return [absolute];

  return readdirSync(absolute).flatMap((entry) => {
    if (ignoredDirectories.has(entry)) return [];
    const child = join(absolute, entry);
    if (statSync(child).isDirectory()) return collect(relative(root, child));
    return extensions.has(extname(child)) ? [child] : [];
  });
}

const files = roots.flatMap(collect);
const errors = [];

for (const file of files) {
  if (relative(root, file) === 'scripts/product-claims-audit.mjs') continue;

  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const claim of unsupportedClaims) {
      if (claim.allowExplicitCaveat && isExplicitOuterHtmlCaveat(line)) continue;

      if (claim.pattern.test(line)) {
        errors.push(
          `${relative(root, file)}:${index + 1}: ${claim.reason}\n  ${line.trim()}`,
        );
      }
    }
  });
}

if (errors.length > 0) {
  console.error(`Product claims audit failed with ${errors.length} issue(s):`);
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Product claims audit passed: ${files.length} content and source files checked.`);
