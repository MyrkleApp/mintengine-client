import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  define: {
    // PouchDB and some deps expect Node's `global` in the browser
    global: 'globalThis',
  },
  resolve: {
    extensions: ['.jsx', '.mjs', '.js', '.mts', '.ts', '.tsx', '.json'],
    alias: {
      // PouchDB uses Node's "events"; point to polyfill for browser
      events: path.resolve(__dirname, 'node_modules/events/events.js'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
})
