// @ts-nocheck
/// <reference types="node" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Vite config runs in ESM context – recreate __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Rollup plugin to copy manifest and favicon into dist
function staticCopy() {
  return {
    name: "static-copy-manifest",
    buildStart() {
      this.addWatchFile(resolve(__dirname, "manifest.json"));
    },
    generateBundle() {
      // Copy manifest.json
      const manifestPath = resolve(__dirname, "manifest.json");
      const manifestSource = fs.readFileSync(manifestPath, "utf8");
      this.emitFile({ type: "asset", fileName: "manifest.json", source: manifestSource });

      // Copy favicon (optional)
      const faviconPath = resolve(__dirname, "../public/favicon.ico");
      if (fs.existsSync(faviconPath)) {
        const faviconSource = fs.readFileSync(faviconPath);
        this.emitFile({ type: "asset", fileName: "favicon.ico", source: faviconSource });
      }

      // after copying favicon
      const iconDir = resolve(__dirname, "icons");
      if (fs.existsSync(iconDir)) {
        for (const file of fs.readdirSync(iconDir)) {
          const p = resolve(iconDir, file);
          this.emitFile({ type: "asset", fileName: `icons/${file}`, source: fs.readFileSync(p) });
        }
      }
    },
  };
}

export default defineConfig({
  root: __dirname,
  plugins: [react(), staticCopy()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup/index.html"),
        background: resolve(__dirname, "src/background.ts"),
        jobScraper: resolve(__dirname, "src/contentScripts/jobScraper.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
    },
  },
  define: {
    // Provide default value if not set at build time
    'import.meta.env.VITE_RH_BASE_URL': JSON.stringify(process.env.VITE_RH_BASE_URL || 'https://resumehatch.com'),
  },
}); 