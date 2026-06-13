# 🥔 Potato's QA Academy

A small, warm, interactive learning platform — hand-built for one learner, Ira
("Potato"). Think boot.dev, but personal: she reads a lesson, writes **real
Python in the browser**, hits Run, and gets instant green/red feedback. Her
progress grows a potato plant; her daily streak waters it.

It teaches the QA Automation path from the study plan: Python → pytest →
Playwright → API testing → AI-assisted QA → portfolio → job readiness.

## How it works

- **Frontend** — static HTML/CSS/vanilla JS in `public/`. No build step.
- **Python in the browser** — [Pyodide](https://pyodide.org) (CPython → WebAssembly)
  runs her code client-side. A tiny `pytest` shim (`public/js/runner.js`) makes
  `assert`, `@pytest.mark.parametrize`, `pytest.approx`, and `pytest.raises` work,
  so she writes real tests and sees them pass.
- **Backend** — a ~60-line Node server (`server/`) using **built-in `node:sqlite`**
  (zero npm native deps). It stores which lessons are done and her activity days,
  so progress **syncs across her devices**.
- **Content** — all lessons live in `public/js/curriculum.js`. Adding one is a
  matter of dropping an object into a phase. See the comment at the top of that file.

## Make it yours

- ✍️ The handwritten welcome note is the `NOTE` constant at the top of
  `public/js/app.js`. Change the words — that's the part she reads first.
- ➕ Add or edit lessons in `public/js/curriculum.js`.

## Run locally

Requires Node **22.5+** (for built-in SQLite).

```bash
cd platform
npm install
npm start            # → http://localhost:3000
```

Or with Docker:

```bash
docker compose up --build
```

## Deploy on Coolify (ira.xaviair.dev)

1. **New Resource → Docker / Dockerfile** (or "Application" from this Git repo).
2. **Base Directory:** `/platform`  ·  **Dockerfile:** `platform/Dockerfile`
   (so the build context is the `platform/` folder).
3. **Port:** `3000`.
4. **Persistent storage:** add a volume mounted at **`/app/data`** — this is where
   `potato.db` lives. Without it, progress resets on every redeploy.
5. **Environment variables:**

   | Var | Value | Why |
   |-----|-------|-----|
   | `TZ` | `Europe/Lisbon` | streaks roll over on *her* midnight, not UTC |
   | `ADMIN_KEY` | a random string | unlocks your peek endpoint |
   | `PORT` | `3000` | (already set in the image) |
   | `DB_PATH` | `/app/data/potato.db` | (already set in the image) |

6. **Domain:** point `ira.xaviair.dev` at the app; Coolify handles HTTPS.
7. Deploy. Done.

## Peeking on her progress (just you)

With `ADMIN_KEY` set, you get a quiet read-only window:

```
https://ira.xaviair.dev/api/peek?key=YOUR_ADMIN_KEY
```

Returns completed lessons, her current streak, and active days. No login, no
nagging — just so you can cheer her on.

## Health check

`GET /healthz` → `ok` (point Coolify's health check here).
