import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';

const API_TARGET = 'http://localhost:4000'
const MESSAGE_API_TARGET = 'https://accuracy-hart-keys-library.trycloudflare.com'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/sse/message': {
      //   target: MESSAGE_API_TARGET,
      //   changeOrigin: true
      // },
      '/sse': {
        target: API_TARGET,
        changeOrigin: true
      }
    }
  }
})
