import type { UserConfig } from "vite";
import { mergeConfig } from "vite";

import { VITE_CONFIG } from "../../shared/vite-config";

export default mergeConfig<UserConfig, UserConfig>(VITE_CONFIG, {
  server: {
    open: "/",
  },
});
