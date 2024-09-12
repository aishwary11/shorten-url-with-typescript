import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1048576,
  },
  server: {
    port: 3000,
    cors: true,
  },
  preview: {
    port: 3000,
    cors: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
