# taskr

A tiny, zero-dependency command-line task manager written in Node.js.

```
$ taskr add "Write the release notes" --priority high --tag work
Added task 1
$ taskr list
[ ] 1. !! Write the release notes #work (2026-10-26)
```

## Install

Requires Node.js 20 or newer.

```bash
git clone <this-repo>
cd taskr
npm link        # makes the `taskr` command available globally
```

## Usage

| Command | Description |
| --- | --- |
| `taskr add <title>` | Add a task. Options: `--priority low\|medium\|high`, `--tag <tag>` (repeatable) |
| `taskr list` | List tasks. Options: `--tag <tag>`, `--pending`, `--sort` |
| `taskr done <id>` | Mark a task as done |
| `taskr remove <id>` | Delete a task |
| `taskr help` | Show help |

Tasks are stored in `~/.taskr.json`. Set the `TASKR_FILE` environment variable to use a different file.

## Using it as a library

```js
import { addTask, listTasks, formatList } from 'taskr';

let tasks = addTask([], 'Try taskr', { priority: 'low' });
console.log(formatList(listTasks(tasks)));
```

## Development

```bash
npm test       # run the test suite (node:test, no install needed)
npm run lint   # syntax + whitespace checks
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request, and look for issues labelled **good first issue** if you are new.

## License

[MIT](LICENSE)
