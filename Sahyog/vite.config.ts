import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.MONGODB_URI': JSON.stringify(env.MONGODB_URI || ''),
        'process.env.MONGODB_DB_NAME': JSON.stringify(env.MONGODB_DB_NAME || 'sahayog'),
        'process.env.MONGODB_USERNAME': JSON.stringify(env.MONGODB_USERNAME || ''),
        'process.env.MONGODB_PASSWORD': JSON.stringify(env.MONGODB_PASSWORD || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
