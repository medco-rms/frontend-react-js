import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      {
        find: "@tanstack/react-query",
        replacement: resolve(__dirname, "node_modules/@tanstack/react-query"),
      },
      {
        find: "@tanstack/react-query-devtools",
        replacement: resolve(
          __dirname,
          "node_modules/@tanstack/react-query-devtools",
        ),
      },
    ],
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-router",
      "react-router-dom",
    ],
  },
});
