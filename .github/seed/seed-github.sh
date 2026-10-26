#!/usr/bin/env bash
# Creates labels and starter issues on the GitHub repo for this checkout.
# Usage: .github/seed/seed-github.sh [owner/repo]
# Requires the GitHub CLI (`gh`), logged in. Safe to re-run for labels (uses --force);
# issues are created every run, so run it once.
set -euo pipefail

cd "$(dirname "$0")"
REPO_ARGS=()
if [[ $# -gt 0 ]]; then REPO_ARGS=(--repo "$1"); fi

node -e '
  const d = require("./issues.json");
  for (const l of d.labels) console.log(["L", l.name, l.color, l.description].join("\t"));
' | while IFS=$'\t' read -r _ name color desc; do
  gh label create "$name" --color "$color" --description "$desc" --force ${REPO_ARGS[@]+"${REPO_ARGS[@]}"}
done

count=$(node -e 'console.log(require("./issues.json").issues.length)')
for ((i = 0; i < count; i++)); do
  title=$(node -e "console.log(require('./issues.json').issues[$i].title)")
  body=$(node -e "console.log(require('./issues.json').issues[$i].body)")
  labels=$(node -e "console.log(require('./issues.json').issues[$i].labels.join(','))")
  gh issue create --title "$title" --body "$body" --label "$labels" ${REPO_ARGS[@]+"${REPO_ARGS[@]}"}
done
