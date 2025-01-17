import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@containers": path.resolve(__dirname, "./src/containers"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://195.133.39.82:8080", // URL вашего API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Удаляет "/api" из URL
      },
    },
  },
});
