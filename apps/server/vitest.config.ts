import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    // Search pattern for server test files
    include: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'test/**/*.{test,spec}.ts'],
    // Automatically reset mocks between tests
    clearMocks: true,
  },
})