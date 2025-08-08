import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      '.ngrok-free.app', // matches any ngrok-free.app subdomain
      '.ngrok.io',       // matches old-style ngrok links
    ]
  }
})
