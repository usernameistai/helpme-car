import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@clerk/clerk-sdk-node'],
  },
  build: {
    rollupOptions: {
      external: ['@clerk/clerk-sdk-node'],
    }
  }
});

// server: {
  //   proxy: {
  //     '/api/reg': {
  //       target: 'http://localhost:5000/api/reg',
  //       changeOrigin: true,
  //     },
  //     '/api/profile': {
  //       target: 'http://localhost:5000/api/profile',
  //       changeOrigin: true,
  //     },
  //   }
  // }