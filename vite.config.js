import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';

const API_TARGET = 'http://localhost:4000'

// TODO: point these at the recruiter/jobseeker-specific tunnel URLs once available.
const MESSAGE_API_TARGET_BY_TYPE = {
  rec: 'http://localhost:4000',
  js: 'http://localhost:4000'
}

const getMessageProxyTarget = req => {
  const { searchParams } = new URL(req.url, 'http://localhost')

  return MESSAGE_API_TARGET_BY_TYPE[searchParams.get('type')] || API_TARGET
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sse/message': {
        target: API_TARGET,
        changeOrigin: true,
        router: getMessageProxyTarget
      },
      '/sse': {
        target: API_TARGET,
        changeOrigin: true
      }
    }
  }
})
