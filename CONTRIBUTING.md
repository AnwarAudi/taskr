# Contributing to taskr

Thanks for helping out! This guide explains how to get a change merged.

## Getting started

1. Fork the repository and clone your fork.
2. Create a branch: `git checkout -b fix/123-short-description` (include the issue number).
3. Make your change. There are no dependencies to install.
4. Run `npm test` and `npm run lint`. Both must pass.
5. Push and open a pull request against `main`.

## Picking an issue

- Comment on an issue before starting so that two people don't work on the same thing.
- Issues labelled `good first issue` are small and well scoped.
- Labels `difficulty: easy` / `medium` / `hard` give a rough size estimate.
- If you want to build something with no issue yet, open one first and describe your proposal.

## Pull request guidelines

- **One concern per PR.** Don't mix a bug fix with an unrelated refactor.
- **Link the issue** in the description with `Closes #<number>`.
- **Add or update tests** for every bug fix and feature. A bug fix should include a test that fails without the fix.
- **Update docs** (README, help text) when you change user-facing behaviour.
- Keep the project **dependency-free**. Use Node.js built-ins only.
- Fill in the pull request template.

## Code style

- ES modules, 2-space indentation, single quotes, semicolons.
- Keep functions in `src/tasks.js` pure: they take a task list and return a new one, never mutating input.
- I/O belongs in `src/storage.js` and `bin/taskr.js` only.

## Commit messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) style:

```
fix: parse task id as a number in `done` command
feat: add `edit` command
docs: document TASKR_FILE
test: cover storage load/save
```

## Code of conduct

By participating you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
