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
});
