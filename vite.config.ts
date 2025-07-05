
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // Use polling to reduce file descriptor usage
      usePolling: true,
      interval: 1000,
      binaryInterval: 2000,
      // Aggressively ignore unnecessary directories
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.git/**',
        '**/coverage/**',
        '**/public/**',
        '**/*.log',
        '**/temp/**',
        '**/tmp/**',
        '**/build/**',
        '**/.vscode/**',
        '**/.idea/**',
        '**/package-lock.json',
        '**/yarn.lock',
        '**/bun.lockb'
      ]
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependencies to reduce file watching
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-slot'
    ],
    // Force pre-bundling to reduce file watching
    force: true
  }
}));
