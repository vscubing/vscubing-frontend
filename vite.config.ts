import react from '@vitejs/plugin-react-swc'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
      '/twisty': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/twisty/, ''),
      },
      '/cstimer': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          if (path === '/cstimer/php') {
            return '/timer.php' // to sync with our backend which produces a /php route
          }
          return path.replace(/^\/cstimer/, '')
        },
      },
    },
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
