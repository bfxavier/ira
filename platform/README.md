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

Deploy with the **Docker Compose** build pack — `docker-compose.yml` is ready to go.

1. **New Resource → Docker Compose** from this Git repo.
2. **Base Directory:** `/platform` · **Compose file:** `docker-compose.yml`
   (so the build context and the Dockerfile resolve inside `platform/`).
3. **Domain:** set the service's domain to `https://ira.xaviair.dev` in the UI
   (or uncomment `SERVICE_FQDN_POTATOACADEMY_3000` in the compose file). Coolify
   wires the reverse proxy and HTTPS to the container's port `3000`.
4. **Environment variables** (Coolify → Environment): set at least

   | Var | Value | Why |
   |-----|-------|-----|
   | `ADMIN_KEY` | a random string | unlocks your peek endpoint |
   | `TZ` | `Europe/Lisbon` | streaks roll over on *her* midnight, not UTC |

   `PORT` and `DB_PATH` already have sane values baked in.
5. **Persistent storage:** the `potato-data` named volume (mounted at `/app/data`)
   is declared in the compose file — Coolify keeps it across redeploys, so her
   progress survives. Nothing extra to configure.
6. Deploy. Done.

> Prefer the plain Dockerfile build pack instead? It also works — point Coolify at
> `platform/Dockerfile`, set port `3000`, and add a persistent volume on `/app/data`.

## Peeking on her progress (just you)

With `ADMIN_KEY` set, you get a quiet read-only window:

```
https://ira.xaviair.dev/api/peek?key=YOUR_ADMIN_KEY
```

Returns completed lessons, her current streak, and active days. No login, no
nagging — just so you can cheer her on.

## Health check

`GET /healthz` → `ok` (point Coolify's health check here).
