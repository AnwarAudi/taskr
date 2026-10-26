import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatTask, formatList } from '../src/format.js';

const task = {
  id: 3,
  title: 'Ship it',
  priority: 'high',
  tags: ['release'],
  done: false,
  createdAt: '2026-01-15T10:00:00.000Z',
};

test('formatTask shows checkbox, id, marker, title and tags', () => {
  const out = formatTask(task);
  assert.match(out, /^\[ \] 3\. !! Ship it #release/);
});

test('formatList shows a hint when empty', () => {
  assert.match(formatList([]), /No tasks yet/);
});
