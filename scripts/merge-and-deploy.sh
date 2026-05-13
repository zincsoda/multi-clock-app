#!/usr/bin/env bash
# Merge a GitHub PR into the default branch and deploy to GitHub Pages (npm run deploy).
#
# Usage:
#   ./scripts/merge-and-deploy.sh [-R owner/repo] <pr-number> [merge|squash|rebase]
#
# If the PR lives on a different GitHub repo than your local default (e.g. you cloned
# a fork but the PR is on upstream), pass -R:
#   ./scripts/merge-and-deploy.sh -R zincsoda/multi-clock-app 7
#
# You can also set GH_REPO for the same effect.
#
# Requires: gh (https://cli.github.com/), git, npm. Repo working tree must be clean.

set -euo pipefail

usage() {
  echo "Usage: $0 [-R owner/repo] <pr-number> [merge|squash|rebase]" >&2
  echo "  Default merge style: merge" >&2
  echo "  Use -R when the PR is not on the repo gh associates with this directory." >&2
  exit 1
}

ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || {
  echo "Error: run this from inside the multi-clock-app git repository." >&2
  exit 1
}
cd "$ROOT"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -R|--repo)
      if [[ $# -lt 2 ]]; then
        echo "Error: $1 requires owner/repo (e.g. zincsoda/multi-clock-app)." >&2
        usage
      fi
      export GH_REPO="$2"
      shift 2
      ;;
    -*)
      echo "Error: unknown option: $1" >&2
      usage
      ;;
    *)
      break
      ;;
  esac
done

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

# Select repo for gh: `gh repo view` takes OWNER/REPO as a positional argument (not -R).
# `gh pr` commands accept --repo / -R after the subcommand.
if [[ -n "${GH_REPO:-}" ]]; then
  GH_REPO_VIEW=( "$GH_REPO" )
  GH_PR_REPO=( --repo "$GH_REPO" )
else
  GH_REPO_VIEW=()
  GH_PR_REPO=()
fi

REPO_SLUG="$(gh repo view "${GH_REPO_VIEW[@]}" --json nameWithOwner -q .nameWithOwner)"
echo "Using GitHub repository: $REPO_SLUG"

if ! gh pr view "$PR" "${GH_PR_REPO[@]}" --json number,title,state >/dev/null 2>&1; then
  echo "Error: no PR #$PR in $REPO_SLUG (or no permission)." >&2
  echo "If the PR is on another fork or upstream repo, pass the repo on the command line" >&2
  echo "(recommended with npm so the repo is not lost):" >&2
  echo "  npm run merge-deploy -- -R owner/repo $PR" >&2
  echo "  $0 -R owner/repo $PR" >&2
  exit 1
fi

DEFAULT_BRANCH="$(gh repo view "${GH_REPO_VIEW[@]}" --json defaultBranchRef -q .defaultBranchRef.name)"
echo "Merging PR #$PR into $DEFAULT_BRANCH ($METHOD)..."
gh pr merge "$PR" "${GH_PR_REPO[@]}" "--$METHOD"

echo "Updating local $DEFAULT_BRANCH..."
git fetch origin
git checkout "$DEFAULT_BRANCH"
git pull origin "$DEFAULT_BRANCH"

echo "Installing dependencies and deploying to GitHub Pages..."
npm install
npm run deploy

echo "Done. PR #$PR merged and deployment pushed (gh-pages branch)."
