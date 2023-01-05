import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  appType: "spa",
  plugins: [react({include: '**/*.jsx'}), EnvironmentPlugin("all")],
  server: {
    port: 3000,
  },
});
