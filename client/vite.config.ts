import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        //target: "http://backend:5100", //quando for buildar o container e colocar online, trocar para isso
        target: "http://localhost:5100",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      "mutyro.com.br",
      "www.mutyro.com.br",
      "localhost",
      "127.0.0.1",
    ],
  },
});
