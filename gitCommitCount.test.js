import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";

import { getGitCommitCount } from "./gitCommitCount.js";

function git(args, cwd) {
  execFileSync("git", args, { cwd, encoding: "utf8" });
}

describe("getGitCommitCount", () => {
  test("returns the number of reachable commits from HEAD", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "multi-clock-cc-"));

    git(["init"], dir);
    git(["config", "user.email", "t@example.test"], dir);
    git(["config", "user.name", "Multi Clock Tester"], dir);

    for (let i = 0; i < 4; i += 1) {
      writeFileSync(path.join(dir, `tracked-${i}.txt`), String(i), "utf8");
      git(["add", "-A"], dir);
      git(["commit", "-m", `commit ${i}`], dir);
    }

    expect(getGitCommitCount({ cwd: dir })).toBe("4");
  });
});
