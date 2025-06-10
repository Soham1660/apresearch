import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@react-pdf/renderer'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.pdf'],
});
