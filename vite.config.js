import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ["defaults", "not IE 11", "Safari >= 10"], // Ensure support for Safari 10+
    }),
  ],
  server: {
    host: "192.168.8.199",
    port: 3000,
  },
});
