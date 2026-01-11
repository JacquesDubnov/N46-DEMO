import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Proxy API requests to Gamma to avoid CORS issues
      '/api/gamma': {
        target: 'https://public-api.gamma.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gamma/, '/v1.0'),
        secure: true,
      },
    },
  },
});
