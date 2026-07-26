import { spawnSync } from 'node:child_process';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: options.capture ? 'pipe' : 'inherit',
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
  return result.stdout?.trim() ?? '';
}

function requireCleanWorktree(stage) {
  const status = run('git', ['status', '--porcelain'], { capture: true });
  if (status) {
    console.error(`Deploy stopped: the worktree is dirty ${stage}. Commit or stash changes first.`);
    process.exit(1);
  }
}

const branch = run('git', ['branch', '--show-current'], { capture: true });
if (branch !== 'main') {
  console.error(`Deploy stopped: expected branch main, found ${branch || '(detached HEAD)'}.`);
  process.exit(1);
}

requireCleanWorktree('before build');
run('npm', ['run', 'build']);
requireCleanWorktree('after build');
run('git', ['push', 'origin', 'main']);
