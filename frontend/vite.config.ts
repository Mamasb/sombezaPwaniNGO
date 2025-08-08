// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // makes the dev server listen on all addresses
    allowedHosts: [
      '.ngrok-free.app',  // matches any ngrok-free.app subdomain
      '.ngrok.io',        // matches old-style ngrok links
      '.trycloudflare.com', // matches Cloudflare Tunnel free subdomain
      'localhost',        // allow local dev
      '127.0.0.1'          // also allow direct IP
    ]
  }
})
