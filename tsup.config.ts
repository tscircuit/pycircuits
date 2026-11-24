import { defineConfig, type Options } from "tsup";

const sharedOptions: Omit<Options, "entry"> = {
  format: ["esm"],
  outDir: "dist",
  platform: "node",
  skipNodeModulesBundle: true,
  sourcemap: true,
  splitting: false,
  target: "node18",
  treeshake: true,
};

export default defineConfig([
  {
    ...sharedOptions,
    clean: true,
    dts: true,
    entry: {
      index: "src/index.ts",
    },
  },
  {
    ...sharedOptions,
    banner: {
      js: "#!/usr/bin/env node",
    },
    clean: false,
    dts: false,
    splitting: true,
    entry: {
      cli: "src/cli.ts",
    },
  },
]);
