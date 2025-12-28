import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { handleDemo } from "./routes/demo";
import { handleSubscribe } from "./routes/subscribe";
import { handleContact } from "./routes/contact";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/subscribe", handleSubscribe);
  app.post("/api/contact", handleContact);

  // SPA fallback - serve index.html for all non-API routes in production
  // In development, Vite handles this, but this ensures it works in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../dist/spa")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "../dist/spa/index.html"));
    });
  }

  return app;
}
