import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const redirectRealestatesDetails = () => ({
  name: "configure-server",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.match("/realestates/[0-9]+")) {
        req.url = "/realestates/details/index.html";
      }
      next();
    });
  },
});

export default defineConfig({
  root: "./src/pages",
  publicDir: "../../public",
  build: {
    outDir: "../../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/pages/index.html"),
        home: resolve(__dirname, "src/pages/home/index.html"),
        realestates: resolve(__dirname, "src/pages/realestates/index.html"),
        details: resolve(__dirname, "src/pages/realestates/details/index.html"),
      },
    },
  },
  plugins: [redirectRealestatesDetails()],
});
