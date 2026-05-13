#!/usr/bin/env bash
# Merge a GitHub PR into the default branch and deploy to GitHub Pages (npm run deploy).
#
# Usage:
#   ./scripts/merge-and-deploy.sh <pr-number> [merge|squash|rebase]
#
# Requires: gh (https://cli.github.com/), git, npm. Repo working tree must be clean.

set -euo pipefail

usage() {
  echo "Usage: $0 <pr-number> [merge|squash|rebase]" >&2
  echo "  Default merge style: merge" >&2
  exit 1
}

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "Error: run this from inside the multi-clock-app git repository." >&2
  exit 1
}
cd "$ROOT"

if [[ $# -lt 1 ]]; then
  usage
fi

PR="$1"
METHOD="${2:-merge}"

if ! [[ "$PR" =~ ^[0-9]+$ ]]; then
  echo "Error: PR number must be digits, got: $PR" >&2
  usage
fi

case "$METHOD" in
  merge|squash|rebase) ;;
  *)
    echo "Error: merge method must be merge, squash, or rebase, got: $METHOD" >&2
    usage
    ;;
esac

if ! command -v gh >/dev/null 2>&1; then
  echo "Error: gh (GitHub CLI) is not installed. https://cli.github.com/" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: working tree is not clean. Commit or stash changes before running." >&2
  exit 1
fi

DEFAULT_BRANCH="$(gh repo view --json defaultBranchRef -q .defaultBranchRef.name)"
echo "Merging PR #$PR into $DEFAULT_BRANCH ($METHOD)..."
gh pr merge "$PR" "--$METHOD"

echo "Updating local $DEFAULT_BRANCH..."
git fetch origin
git checkout "$DEFAULT_BRANCH"
git pull origin "$DEFAULT_BRANCH"

echo "Installing dependencies and deploying to GitHub Pages..."
npm install
npm run deploy

echo "Done. PR #$PR merged and deployment pushed (gh-pages branch)."
