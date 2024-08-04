import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/res": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/res/, ""),
      },
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
      },
      "/static": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
      },
    },
  },
});
