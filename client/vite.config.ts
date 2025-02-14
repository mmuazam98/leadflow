import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

const root = resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": root,
    },
  },
  plugins: [react(), tailwindcss()],
});
