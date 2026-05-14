import { execSync } from "node:child_process";

/**
 * Reachable commits from HEAD (`git rev-list --count`).
 * Requires a non-shallow `.git`; CI should use checkout `fetch-depth: 0`.
 */
export function getGitCommitCount(options = {}) {
  const cwd = options.cwd ?? process.cwd();
  try {
    const out = execSync("git rev-list --count HEAD", {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const n = out.trim();
    return n === "" ? "0" : n;
  } catch {
    return "0";
  }
}
