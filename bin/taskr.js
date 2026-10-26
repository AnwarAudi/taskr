#!/usr/bin/env node
import { parseArgs } from 'node:util';
import {
  addTask,
  completeTask,
  removeTask,
  listTasks,
  sortByPriority,
  formatList,
  load,
  save,
} from '../src/index.js';

const HELP = `taskr - a tiny task manager

Usage:
  taskr add <title> [--priority low|medium|high] [--tag <tag>]...
  taskr list [--tag <tag>] [--pending] [--sort]
  taskr done <id>
  taskr remove <id>
  taskr help
`;

function main(argv) {
  const [command, ...rest] = argv;
  const { values, positionals } = parseArgs({
    args: rest,
    allowPositionals: true,
    options: {
      priority: { type: 'string', short: 'p' },
      tag: { type: 'string', short: 't', multiple: true },
      pending: { type: 'boolean' },
      sort: { type: 'boolean' },
    },
  });

  let tasks = load();

  switch (command) {
    case 'add': {
      const title = positionals.join(' ');
      tasks = addTask(tasks, title, { priority: values.priority, tags: values.tag ?? [] });
      save(tasks);
      console.log(`Added task ${tasks[tasks.length - 1].id}`);
      break;
    }
    case 'list': {
      let shown = listTasks(tasks, { tag: values.tag?.[0], showDone: !values.pending });
      if (values.sort) shown = sortByPriority(shown);
      console.log(formatList(shown));
      break;
    }
    case 'done': {
      tasks = completeTask(tasks, positionals[0]);
      save(tasks);
      console.log(`Completed task ${positionals[0]}`);
      break;
    }
    case 'remove': {
      tasks = removeTask(tasks, positionals[0]);
      save(tasks);
      console.log(`Removed task ${positionals[0]}`);
      break;
    }
    case 'help':
    case undefined:
      console.log(HELP);
      break;
    default:
      console.error(`Unknown command "${command}"\n`);
      console.log(HELP);
      process.exitCode = 1;
  }
}

try {
  main(process.argv.slice(2));
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
}
