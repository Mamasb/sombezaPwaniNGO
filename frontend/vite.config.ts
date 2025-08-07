import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,                      // listen on all network interfaces:contentReference[oaicite:10]{index=10}
    allowedHosts: ['.ngrok-free.app']  // allow any subdomain of ngrok-free.app:contentReference[oaicite:11]{index=11}
  }
})
