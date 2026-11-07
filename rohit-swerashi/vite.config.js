import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// /facts is a plain static page in public/facts, not a route of the app.
const staticFacts = () => {
  const rewrite = (req, _res, next) => {
    if (req.url === "/facts" || req.url === "/facts/") req.url = "/facts/index.html";
    next();
  };
  return {
    name: "static-facts",
    configureServer: (server) => void server.middlewares.use(rewrite),
    configurePreviewServer: (server) => void server.middlewares.use(rewrite),
  };
};

export default defineConfig({
  plugins: [react(), staticFacts()],
  build: { chunkSizeWarningLimit: 900 },
});
