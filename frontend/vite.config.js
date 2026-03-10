import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  root: '.',
  build: {
    rollupOptions: {
      input: './views/html/index.html',
    },
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: '/views/html/index.html',
  },
});
