const PRIORITY_MARKERS = { low: '·', medium: '!', high: '!!' };

export function formatDate(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth())}-${pad(d.getDate())}`;
}

export function formatTask(task) {
  const box = task.done ? '[x]' : '[ ]';
  const marker = PRIORITY_MARKERS[task.priority];
  const tags = task.tags.length ? ' ' + task.tags.map((t) => `#${t}`).join(' ') : '';
  return `${box} ${task.id}. ${marker} ${task.title}${tags} (${formatDate(task.createdAt)})`;
}

export function formatList(tasks) {
  if (tasks.length === 0) return 'No tasks yet. Add one with: taskr add "My task"';
  return tasks.map(formatTask).join('\n');
}
