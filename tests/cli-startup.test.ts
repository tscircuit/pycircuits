import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dir, "..");

test(
  "packaged CLI prints usage without loading dev server dependencies",
  () => {
    const build = spawnSync(process.execPath, ["run", "build"], {
      cwd: repoRoot,
      encoding: "utf8",
    });
    expect(build.status).toBe(0);

    const cliBundle = fs.readFileSync(
      path.join(repoRoot, "dist", "cli.js"),
      "utf8",
    );
    expect(cliBundle).not.toMatch(
      /^import .*["']@tscircuit\/cli\/lib["']/m,
    );

    const result = spawnSync("node", [path.join(repoRoot, "dist", "cli.js")], {
      cwd: repoRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Usage:");
    expect(result.stderr).not.toContain("SchematicArc");
  },
  20_000,
);
