import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Expose to external connections
    port: 3000, // Change to port 3000 to match your Docker configuration
  },
});
