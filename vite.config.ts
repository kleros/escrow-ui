import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      config: "/src/config",
      context: "/src/context",
      hooks: "/src/hooks",
      layout: "/src/layout",
      model: "/src/model",
      pages: "/src/pages",
      theme: "/src/theme",
      utils: "/src/utils",
    },
  },
});
