import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/dist/vite.js'
import { NaiveUiResolver } from 'unplugin-vue-components/dist/resolvers.js'
const port = 5173;
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:'127.0.0.1',
    port: port,
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
      },
    }},
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue",
        {
          'naive-ui':[
            'useDialog',
          ]
        }
      ],
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

