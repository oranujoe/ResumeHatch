import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    root: '.',
    include: ['browser-extension/src/**/*.test.ts'],
  },
}); 