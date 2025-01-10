// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
          // Add other libraries or components you want to split into separate chunks
        }
      }
    },
    chunkSizeWarningLimit: 500, // Adjust the chunk size warning limit if needed
  }
});