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
    port: 5101,
    open: false,  // Explicitly disable auto-opening browser
    proxy: {
      // Proxy API requests to local Express server
      '/api/presentations': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      // Proxy API requests to Gamma to avoid CORS issues
      '/api/gamma': {
        target: 'https://public-api.gamma.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gamma/, '/v1.0'),
        secure: true,
      },
      // Proxy Stable Diffusion API requests to avoid CORS issues
      '/sdapi': {
        target: 'http://127.0.0.1:7860',
        changeOrigin: true,
      },
    },
  },
});
