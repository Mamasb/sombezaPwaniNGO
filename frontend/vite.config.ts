import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Auto opens the browser
    port: 5173, // Ensures consistency
    host: "0.0.0.0", // Allows access from external devices
    strictPort: true, // Prevents auto-changing ports
    cors: true, // Enables Cross-Origin requests
    allowedHosts: ["all"], // Allows all hosts, including Ngrok
    headers: {
      "Access-Control-Allow-Origin": "*", // Prevents CORS issues
    },
  },
  base: "/", // Ensures proper routing
});
