import { defineConfig } from "vite";
import { resolve } from "path";

const root = resolve(__dirname, "src", "routes");
const publicDir = resolve(__dirname, "public");

export default defineConfig({
  root,
  publicDir,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  },
});
