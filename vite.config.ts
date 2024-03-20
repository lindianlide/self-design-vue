import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import * as path from 'path'
import vitePluginVuedoc from 'vite-plugin-doc-preview'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginVuedoc({ previewId: 'vue demo' }),
    vue({
      include: [/\.vue$/, /\.md$/] // 2. Must include .md | .vd files
    }),
    Pages({
      pagesDir: 'packages/components',
      extensions: ['md']
      // exclude: ['**/components/*.vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples', import.meta.url)),
      '@lowCode': path.resolve(__dirname, 'examples/views/lowCode'),
      '@packages': path.resolve(__dirname, 'packages')
    }
  },
  server: {
    // 设置 https 代理
    proxy: {
      '/api': {
        target: 'http://10.80.4.80:30010/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
