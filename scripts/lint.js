// Minimal lint: syntax-checks every .js file and flags trailing whitespace and tabs.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOTS = ['src', 'bin', 'test', 'scripts'];
let problems = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.js')) check(p);
  }
}

function check(file) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (err) {
    problems++;
    console.error(err.stderr.toString());
  }
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (/[ \t]+$/.test(line)) report(file, i, 'trailing whitespace');
    if (/\t/.test(line)) report(file, i, 'tab character (use 2 spaces)');
  });
}

function report(file, i, msg) {
  problems++;
  console.error(`${file}:${i + 1}: ${msg}`);
}

ROOTS.forEach(walk);
if (problems) {
  console.error(`\n${problems} problem(s) found`);
  process.exit(1);
}
console.log('lint: ok');
