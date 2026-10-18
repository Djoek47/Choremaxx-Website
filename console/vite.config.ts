import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  // Do not walk up to the repo-root Next.js PostCSS/Tailwind config.
  css: {
    postcss: './postcss.config.mjs',
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
