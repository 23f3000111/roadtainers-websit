import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-htaccess',
      closeBundle() {
        const src = resolve(__dirname, '.htaccess');
        const dst = resolve(__dirname, 'dist', '.htaccess');
        if (existsSync(src)) copyFileSync(src, dst);
      },
    },
  ],
});
