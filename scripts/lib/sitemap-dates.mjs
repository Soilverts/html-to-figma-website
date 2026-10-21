import { execFileSync } from 'node:child_process';
import { relative } from 'node:path';

export function createLastModifiedResolver({ cwd, now = new Date() }) {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);

  function validLastmod(value) {
    if (typeof value !== 'string') return false;
    const match = value.match(/^(\d{4}-\d{2}-\d{2})(?:T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d))?$/);
    if (!match) return false;
    const date = new Date(`${match[1]}T00:00:00Z`);
    if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== match[1]) return false;
    if (value === match[1]) return value <= today;
    const timestamp = Date.parse(value);
    return Number.isFinite(timestamp) && timestamp <= now.getTime();
  }

  function git(args) {
    try {
      return execFileSync('git', args, {
        cwd,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
    } catch {
      return null;
    }
  }

  const shallow = git(['rev-parse', '--is-shallow-repository']);

  return (path, previousLastmod) => {
    const previous = validLastmod(previousLastmod) ? previousLastmod : undefined;
    if (shallow !== 'false' && shallow !== 'true') return previous;

    const relativePath = relative(cwd, path);
    const status = git(['status', '--porcelain', '--untracked-files=all', '--', relativePath]);
    if (status === null) return previous;
    if (status) return today;

    // A shallow boundary commit can falsely appear to have changed every file.
    if (shallow === 'true') return previous;
    const committed = git(['log', '-1', '--format=%cs', '--', relativePath]);
    return validLastmod(committed) ? committed : previous;
  };
}
