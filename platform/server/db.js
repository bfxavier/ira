// Uses Node's built-in SQLite (node:sqlite, stable in Node 22.5+ / 24+).
// Zero native dependencies — nothing to compile, anywhere.
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const DB_PATH = process.env.DB_PATH || "./data/potato.db";
mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");
db.exec(`
  CREATE TABLE IF NOT EXISTS progress (
    task_id    TEXT PRIMARY KEY,
    done       INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS activity (
    day TEXT PRIMARY KEY
  );
`);

const _allProgress = db.prepare("SELECT task_id, done FROM progress");
const _upsert = db.prepare(`
  INSERT INTO progress (task_id, done, updated_at) VALUES (?, ?, ?)
  ON CONFLICT(task_id) DO UPDATE SET done = excluded.done, updated_at = excluded.updated_at
`);
const _markDay = db.prepare("INSERT OR IGNORE INTO activity (day) VALUES (?)");
const _allDays = db.prepare("SELECT day FROM activity ORDER BY day DESC");

// Local-date string YYYY-MM-DD. Set TZ in the container so this matches her day.
export function today() {
  const d = new Date();
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d - off).toISOString().slice(0, 10);
}

export function setTask(id, done) {
  _upsert.run(id, done ? 1 : 0, new Date().toISOString());
  if (done) _markDay.run(today());
}

export function tasksDone() {
  const map = {};
  for (const row of _allProgress.all()) if (row.done) map[row.task_id] = true;
  return map;
}

// Current streak = consecutive days with activity ending today or yesterday.
export function streak() {
  const days = _allDays.all().map((r) => r.day);
  if (days.length === 0) return 0;
  const set = new Set(days);
  const oneDay = 86400000;
  const start = new Date(today());
  let cursor = set.has(today()) ? start : new Date(start - oneDay);
  let count = 0;
  while (set.has(cursor.toISOString().slice(0, 10))) {
    count++;
    cursor = new Date(cursor - oneDay);
  }
  return count;
}

export function activeDays() {
  return _allDays.all().map((r) => r.day);
}
export function lastActive() {
  const days = _allDays.all();
  return days.length ? days[0].day : null;
}

export function fullState() {
  const tasks = tasksDone();
  return {
    tasks,
    streak: streak(),
    lastActive: lastActive(),
    totalDone: Object.keys(tasks).length,
    activeDays: activeDays(),
  };
}
