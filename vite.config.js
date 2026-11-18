import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE is the sub-path the site is served from. GitHub Pages project
// sites live at /<repo-name>/, so the deploy workflow sets it. Locally it is "/".
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE || '/',
    plugins: [react()],
  };
});
