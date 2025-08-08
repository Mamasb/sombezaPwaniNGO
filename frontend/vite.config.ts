// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all addresses
    allowedHosts: [
      '.ngrok-free.app',      // matches any ngrok-free.app subdomain
      '.ngrok.io',            // matches old-style ngrok links
      '.trycloudflare.com',   // Cloudflare Tunnel free subdomain
      'localhost',            // local dev
      '127.0.0.1',             // direct IP
      'sombezapwaningo.onrender.com' // Render domain
    ]
  },
  preview: {
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.io',
      '.trycloudflare.com',
      'localhost',
      '127.0.0.1',
      'sombezapwaningo.onrender.com'
    ]
  }
})
