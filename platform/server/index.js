import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { fullState, setTask } from "./db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");
const PORT = process.env.PORT || 3000;
const ADMIN_KEY = process.env.ADMIN_KEY || ""; // for Bruno's peek endpoint

const app = express();
app.use(express.json());

// --- API -------------------------------------------------------------------

app.get("/api/state", (_req, res) => {
  res.json(fullState());
});

app.post("/api/task", (req, res) => {
  const { id, done } = req.body || {};
  if (typeof id !== "string" || !id) {
    return res.status(400).json({ error: "id is required" });
  }
  setTask(id, !!done);
  res.json(fullState());
});

// Bruno's quiet window into how Potato is doing.
app.get("/api/peek", (req, res) => {
  if (!ADMIN_KEY || req.query.key !== ADMIN_KEY) {
    return res.status(403).json({ error: "nope" });
  }
  res.json(fullState());
});

app.get("/healthz", (_req, res) => res.send("ok"));

// --- static (site + built slides) ------------------------------------------

app.use(express.static(PUBLIC, { extensions: ["html"] }));

app.listen(PORT, () => {
  console.log(`🥔 Potato Academy running on :${PORT}`);
});
