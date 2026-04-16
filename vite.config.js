import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  define: {
    "process.env.OPENROUTER_KEY": JSON.stringify(process.env.VITE_OPENROUTER_KEY),
  },
  root: "./",
  build: {
    target: "es2020",
    rollupOptions: {
      external: ["fs", "path"]
    }
  }
});
