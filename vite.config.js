import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';

const API_TARGET = 'http://localhost:4000'

// TODO: point these at the recruiter/jobseeker-specific tunnel URLs once available.
const RECRUITER_MESSAGE_API_TARGET = 'http://localhost:4000'
const JOB_SEEKER_MESSAGE_API_TARGET = 'http://localhost:4000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/sse/message\\?.*type=rec(&|$)': {
        target: RECRUITER_MESSAGE_API_TARGET,
        changeOrigin: true
      },
      '^/sse/message\\?.*type=js(&|$)': {
        target: JOB_SEEKER_MESSAGE_API_TARGET,
        changeOrigin: true
      },
      '/sse': {
        target: API_TARGET,
        changeOrigin: true
      }
    }
  }
})
