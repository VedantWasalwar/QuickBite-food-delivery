import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Ensure public files are copied to dist
    copyPublicDir: true,
    // Build output directory
    outDir: 'dist',
    // Ensure proper base path for production
    base: '/',
  },
  // Public directory for static assets
  publicDir: 'public',
})

