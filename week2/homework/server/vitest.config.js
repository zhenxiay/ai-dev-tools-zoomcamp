import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 15000,
    hookTimeout: 15000,
    teardownTimeout: 5000,
    isolate: true,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true
      }
    }
  },
});
