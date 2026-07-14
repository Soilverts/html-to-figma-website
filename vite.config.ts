import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { cloudflare } from '@cloudflare/vite-plugin';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        cloudflare()
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        modulePreload: {
          resolveDependencies: (_filename, dependencies) =>
            dependencies.filter(
              (dependency) =>
                !dependency.includes('vendor-framer') &&
                !dependency.includes('vendor-three'),
            ),
        },
        rollupOptions: {
          output: {
            manualChunks: {
              // Three.js in its own chunk — loaded only when ParticleField is visible
              'vendor-three': ['three'],
              // Framer Motion in its own chunk — loaded only for below-fold sections
              'vendor-framer': ['framer-motion'],
              // React core — keep stable for caching
              'vendor-react': ['react', 'react-dom'],
            },
          },
        },
      },
    };
});
