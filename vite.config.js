import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(
  readFileSync(join(__dirname, "public", "manifest.json"), "utf8")
);

function gitCommitCount() {
  try {
    const out = execSync("git rev-list --count HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return out.trim() || "0";
  } catch {
    return "0";
  }
}

/** Injected at dev/build time; version is total reachable commits (git rev-list --count). */
const appBuildMetadata = {
  commitCount: gitCommitCount(),
  deployedAtIso: new Date().toISOString(),
};

// https://vitejs.dev/config/
// PWA: prompt-based updates + cleanup stale caches (GitHub Pages has no Cache-Control).
export default defineConfig({
  base: "/multi-clock-app/",
  define: {
    __APP_BUILD_METADATA__: JSON.stringify(appBuildMetadata),
  },
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest,
      includeAssets: ["favicon.svg", "robots.txt"],
      workbox: {
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    exclude: [
      ...configDefaults.exclude,
      "src/App.test.js",
      "src/Clock.test.js",
    ],
  },
  resolve: {
    ...(process.env.VITEST === "true"
      ? {
          alias: {
            "virtual:pwa-register/react": join(
              __dirname,
              "src",
              "__mocks__",
              "virtual-pwa-register-react.js"
            ),
          },
        }
      : {}),
  },
});
