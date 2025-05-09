import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { VITEST_CONFIG } from "./vitest-config";

export const VITE_CONFIG: UserConfig = {
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    react(),
    legacy({
      renderLegacyChunks: false,
      renderModernChunks: true,
      modernPolyfills: true,
    }),
  ],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
  },
  build: {
    assetsDir: "",
    chunkSizeWarningLimit: 2048,
  },
  test: VITEST_CONFIG,
};
