import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("GitHub Actions workflows", () => {
  test("checkout fetches full history so build-time commit count is not shallow (1)", () => {
    const workflowsDir = join(__dirname, "..", ".github", "workflows");
    for (const name of ["deploy-github-pages.yml", "ci.yml"]) {
      const raw = readFileSync(join(workflowsDir, name), "utf8");
      expect(raw).toMatch(/fetch-depth:\s*0/);
    }
  });
});

describe("Vite build output", () => {
  test("does not override Rollup entryFileNames or assetFileNames (keeps hashed filenames)", () => {
    const raw = readFileSync(join(__dirname, "..", "vite.config.js"), "utf8");
    expect(raw).not.toMatch(/entryFileNames\s*:/);
    expect(raw).not.toMatch(/assetFileNames\s*:/);
  });

  test("injects git commit count and deploy time for the app footer", () => {
    const viteRaw = readFileSync(join(__dirname, "..", "vite.config.js"), "utf8");
    expect(viteRaw).toContain("__APP_BUILD_METADATA__");
    expect(viteRaw).toContain("getGitCommitCount");

    const commitCountSrc = readFileSync(
      join(__dirname, "..", "gitCommitCount.js"),
      "utf8"
    );
    expect(commitCountSrc).toContain("git rev-list --count");
  });
});
