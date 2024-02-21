import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/dist/vite.js'
import { NaiveUiResolver } from 'unplugin-vue-components/dist/resolvers.js'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:'127.0.0.1',
    port: 5173,
    proxy: {
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      "/api": {
        target: "http://127.0.0.1:7171",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      host: '127.0.0.1',
      port: 5173
    }
    },
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

