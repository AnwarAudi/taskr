import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const DEFAULT_PATH = process.env.TASKR_FILE || join(homedir(), '.taskr.json');

// Reads the task list from disk. Returns an empty list if the file does not exist.
export function load(path = DEFAULT_PATH) {
  if (!existsSync(path)) return [];
  const raw = readFileSync(path, 'utf8');
  return JSON.parse(raw);
}

export function save(tasks, path = DEFAULT_PATH) {
  writeFileSync(path, JSON.stringify(tasks, null, 2));
}
