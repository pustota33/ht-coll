import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: ".",
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add SPA fallback middleware BEFORE Express
      // This catches all non-API, non-file requests and serves index.html
      server.middlewares.use((req, res, next) => {
        // Skip API routes and static files
        if (req.url.startsWith("/api") || req.url.match(/\.\w+$/)) {
          return next();
        }
        // For all other routes, let Vite serve index.html (which will be handled by transformIndexHtml)
        next();
      });

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
