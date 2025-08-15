import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      watch: {
        usePolling: true,
        interval: 1000,
        binaryInterval: 2000,
        ignored: [
          "**/node_modules/**",
          "**/dist/**",
          "**/.git/**",
          "**/coverage/**",
          "**/public/**",
          "**/*.log",
          "**/temp/**",
          "**/tmp/**",
          "**/build/**",
          "**/.vscode/**",
          "**/.idea/**",
          "**/package-lock.json",
          "**/yarn.lock",
          "**/bun.lockb",
        ],
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "lucide-react",
        "@radix-ui/react-slot",
      ],
      force: true,
    },
    define: {
      __VITE_PUBLIC__: JSON.stringify(env.VITE_PUBLIC || ""),
    },
  };
});
