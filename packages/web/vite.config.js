import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  base: '',
  plugins: [tsconfigPaths()],
  define: {
    // Node.js global to browser globalThis
    define: {
      global: 'globalThis',
    },
    // Enable esbuild polyfill plugins
    plugins: [
      NodeGlobalsPolyfillPlugin({
        buffer: true,
        process: true,
      }),
    ],
  },
})
