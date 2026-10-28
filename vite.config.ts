import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps every asset relative, so this works on a GitHub Pages
// project site (/calvin-in-shenzhen/), a custom domain, and file:// alike.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
});
