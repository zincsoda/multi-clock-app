import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));

describe("Vite build output", () => {
  test("does not override Rollup entryFileNames or assetFileNames (keeps hashed filenames)", () => {
    const raw = readFileSync(join(__dirname, "..", "vite.config.js"), "utf8");
    expect(raw).not.toMatch(/entryFileNames\s*:/);
    expect(raw).not.toMatch(/assetFileNames\s*:/);
  });

  test("injects git commit count and deploy time for the app footer", () => {
    const raw = readFileSync(join(__dirname, "..", "vite.config.js"), "utf8");
    expect(raw).toContain("git rev-list --count");
    expect(raw).toContain("__APP_BUILD_METADATA__");
  });
});
