import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  mode: 'development',
  build: {
    minify: false,
  },
  base: '',
  plugins: [tsconfigPaths()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
      ],
      define: {
        global: 'globalThis',
      },
    },
  },
})
