import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { createLastModifiedResolver } from './lib/sitemap-dates.mjs';

const NOW = new Date('2026-10-21T12:00:00+08:00');
const TODAY = '2026-10-21';
const ORIGINAL_DATE = '2026-07-14';
const BOUNDARY_DATE = '2026-08-30';
const gitEnv = {
  ...process.env,
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_AUTHOR_NAME: 'Sitemap Test',
  GIT_AUTHOR_EMAIL: 'sitemap@example.test',
  GIT_COMMITTER_NAME: 'Sitemap Test',
  GIT_COMMITTER_EMAIL: 'sitemap@example.test',
};

function git(cwd, args, env = {}) {
  return execFileSync('git', args, {
    cwd,
    env: { ...gitEnv, ...env },
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function temporaryDirectory(t) {
  const dir = mkdtempSync(join(tmpdir(), 'sitemap-dates-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function commit(cwd, path, content, date) {
  writeFileSync(join(cwd, path), content);
  git(cwd, ['add', '--', path]);
  git(cwd, ['-c', 'commit.gpgSign=false', '-c', 'core.hooksPath=/dev/null', 'commit', '-qm', path], {
    GIT_AUTHOR_DATE: `${date}T12:00:00+08:00`,
    GIT_COMMITTER_DATE: `${date}T12:00:00+08:00`,
  });
}

function repository(t, shallow = false) {
  const base = temporaryDirectory(t);
  const source = join(base, 'source');
  mkdirSync(source);
  git(source, ['init', '-q']);
  commit(source, 'page.html', '<h1>Original page</h1>', ORIGINAL_DATE);
  commit(source, 'other.html', '<h1>Other page</h1>', BOUNDARY_DATE);
  if (!shallow) return source;
  const checkout = join(base, 'shallow');
  git(base, ['clone', '-q', '--depth=1', pathToFileURL(source).href, checkout]);
  return checkout;
}

test('complete history uses the file change date, not the latest commit or prior sitemap date', (t) => {
  const cwd = repository(t);
  const resolve = createLastModifiedResolver({ cwd, now: NOW });
  assert.equal(resolve(join(cwd, 'page.html'), BOUNDARY_DATE), ORIGINAL_DATE);
  assert.equal(resolve(join(cwd, 'other.html')), BOUNDARY_DATE);
});

test('a real shallow boundary is not a trustworthy per-file modification date', (t) => {
  const cwd = repository(t, true);
  assert.equal(git(cwd, ['rev-parse', '--is-shallow-repository']), 'true');
  assert.equal(git(cwd, ['log', '-1', '--format=%cs', '--', 'page.html']), BOUNDARY_DATE);
  const resolve = createLastModifiedResolver({ cwd, now: NOW });
  assert.equal(resolve(join(cwd, 'page.html'), ORIGINAL_DATE), ORIGINAL_DATE);
  assert.equal(resolve(join(cwd, 'page.html')), undefined);
  assert.equal(resolve(join(cwd, 'page.html'), '2026-02-30'), undefined);
  assert.equal(resolve(join(cwd, 'page.html'), '2026-10-22'), undefined);
});

for (const shallow of [false, true]) {
  test(`dirty tracked and new pages use today in a ${shallow ? 'shallow' : 'complete'} checkout`, (t) => {
    const cwd = repository(t, shallow);
    const resolve = createLastModifiedResolver({ cwd, now: NOW });
    const page = join(cwd, 'page.html');
    writeFileSync(page, '<h1>Changed page</h1>');
    assert.equal(resolve(page, ORIGINAL_DATE), TODAY);
    git(cwd, ['add', 'page.html']);
    assert.equal(resolve(page, ORIGINAL_DATE), TODAY);

    const newPage = join(cwd, 'new.html');
    writeFileSync(newPage, '<h1>New page</h1>');
    assert.equal(resolve(newPage), TODAY);
    git(cwd, ['add', 'new.html']);
    assert.equal(resolve(newPage), TODAY);
  });
}

test('a directory without Git preserves only valid non-future prior dates', (t) => {
  const cwd = temporaryDirectory(t);
  const resolve = createLastModifiedResolver({ cwd, now: NOW });
  const page = join(cwd, 'page.html');
  writeFileSync(page, '<h1>Exported page</h1>');
  for (const value of [ORIGINAL_DATE, TODAY, '2024-02-29', '2026-10-21T03:59:59Z', '2026-10-21T12:00:00+08:00']) {
    assert.equal(resolve(page, value), value);
  }
  for (const value of [undefined, '', 20260714, '2026-2-01', '2026-02-29', '2026-04-31', '2026-13-01', '2026-10-22', '2026-10-21T04:00:01Z', '2026-10-21T25:00:00Z', '2026-10-21T01:00:00']) {
    assert.equal(resolve(page, value), undefined, String(value));
  }
});

test('a missing Git executable cannot synthesize today', (t) => {
  const cwd = repository(t);
  const moduleUrl = new URL('./lib/sitemap-dates.mjs', import.meta.url).href;
  const output = execFileSync(process.execPath, ['--input-type=module', '-e', `
    import { createLastModifiedResolver } from ${JSON.stringify(moduleUrl)};
    const resolve = createLastModifiedResolver({ cwd: ${JSON.stringify(cwd)}, now: new Date(${JSON.stringify(NOW.toISOString())}) });
    const page = ${JSON.stringify(join(cwd, 'page.html'))};
    console.log(JSON.stringify([resolve(page, ${JSON.stringify(ORIGINAL_DATE)}), resolve(page)]));
  `], { encoding: 'utf8', env: { ...process.env, PATH: join(cwd, 'missing-bin') } });
  assert.deepEqual(JSON.parse(output), [ORIGINAL_DATE, null]);
});

test('a future commit date falls back to a valid prior date or is omitted', (t) => {
  const cwd = repository(t);
  commit(cwd, 'page.html', '<h1>Future-dated commit</h1>', '2027-01-01');
  const resolve = createLastModifiedResolver({ cwd, now: NOW });
  assert.equal(resolve(join(cwd, 'page.html'), ORIGINAL_DATE), ORIGINAL_DATE);
  assert.equal(resolve(join(cwd, 'page.html')), undefined);
});

test('a clean file without history does not acquire a build date', (t) => {
  const cwd = repository(t);
  commit(cwd, '.gitignore', 'ignored.html\n', BOUNDARY_DATE);
  const page = join(cwd, 'ignored.html');
  writeFileSync(page, '<h1>Untracked build artifact</h1>');
  const resolve = createLastModifiedResolver({ cwd, now: NOW });
  assert.equal(resolve(page, ORIGINAL_DATE), ORIGINAL_DATE);
  assert.equal(resolve(page), undefined);
});
