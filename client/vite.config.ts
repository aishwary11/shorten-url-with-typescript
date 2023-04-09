import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    minify: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1048576
  },
  server: {
    port: 3000,
    cors: true
  },
  preview: {
    port: 3000,
    cors: true
  }
});
