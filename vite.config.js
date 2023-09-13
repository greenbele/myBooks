import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import '@testing-library/jest-dom/vitest'
// import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), /* eslint() */],
  test: {
    // globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
})
