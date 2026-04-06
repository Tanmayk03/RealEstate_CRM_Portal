import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Match Express port from backend/.env so proxy works when PORT is not 8088 */
function readBackendPort() {
  try {
    const envPath = resolve(__dirname, "../backend/.env");
    const text = readFileSync(envPath, "utf8");
    const line = text.split("\n").find((l) => /^\s*PORT\s*=/i.test(l));
    if (line) {
      const m = line.match(/=\s*(\d+)/);
      if (m) return Number(m[1]);
    }
  } catch {
    /* no backend .env */
  }
  return 8088;
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = readBackendPort();
  const proxyTarget = env.VITE_PROXY_TARGET || `http://127.0.0.1:${port}`;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/auth": {
          target: proxyTarget,
          changeOrigin: true,
        },
        "/health": {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
