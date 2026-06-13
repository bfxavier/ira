import { CURRICULUM, XP, LEARNER } from "./curriculum.js";
import { runTests, preloadPython } from "./runner.js";

// ── A note from Bruno. Edit this freely — it's the first thing she reads. ──
const NOTE = {
  text: "Potato — I built this whole thing just for you, because I believe in you completely. One green checkmark at a time. You've got this. 🥔",
  sign: "— me",
};

// ── flat lesson index ──────────────────────────────────────────────────────
const ALL_LESSONS = CURRICULUM.flatMap((p) => p.lessons.map((l) => ({ ...l, phase: p })));
const lessonById = (id) => ALL_LESSONS.find((l) => l.id === id);
const TOTAL_XP = ALL_LESSONS.reduce((s, l) => s + (XP[l.type] || 10), 0);

let STATE = { tasks: {}, streak: 0, lastActive: null, totalDone: 0, activeDays: [] };

// ── API ─────────────────────────────────────────────────────────────────────
async function loadState() {
  try {
    const r = await fetch("/api/state");
    if (r.ok) STATE = await r.json();
  } catch (_) { /* offline-friendly: keep defaults */ }
}
async function complete(id) {
  if (STATE.tasks[id]) return; // already done
  try {
    const r = await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, done: true }),
    });
    if (r.ok) STATE = await r.json();
  } catch (_) {
    STATE.tasks[id] = true; // optimistic fallback
  }
}

// ── derived stats ────────────────────────────────────────────────────────────
const isDone = (id) => !!STATE.tasks[id];
function earnedXP() {
  return ALL_LESSONS.reduce((s, l) => s + (isDone(l.id) ? (XP[l.type] || 10) : 0), 0);
}
function level() {
  const xp = earnedXP();
  const lvl = Math.floor(xp / 100) + 1;
  const into = xp % 100;
  return { lvl, into, xp };
}
function phaseProgress(p) {
  const done = p.lessons.filter((l) => isDone(l.id)).length;
  return { done, total: p.lessons.length, pct: Math.round((done / p.lessons.length) * 100) };
}
function overallPct() {
  const done = ALL_LESSONS.filter((l) => isDone(l.id)).length;
  return Math.round((done / ALL_LESSONS.length) * 100);
}

// ── garden growth ────────────────────────────────────────────────────────────
const STAGES = [
  { max: 0,   plant: "🌰", cap: "Just planted" },
  { max: 20,  plant: "🌱", cap: "Sprouting" },
  { max: 40,  plant: "🌿", cap: "Growing" },
  { max: 60,  plant: "☘️", cap: "Leafy" },
  { max: 80,  plant: "🌾", cap: "Flourishing" },
  { max: 99,  plant: "🌻", cap: "Blooming" },
  { max: 100, plant: "🥔", cap: "Harvest! Potato is ready." },
];
function stageFor(pct) {
  return STAGES.find((s) => pct <= s.max) || STAGES[STAGES.length - 1];
}

// ── achievements ─────────────────────────────────────────────────────────────
function badges() {
  const doneCount = ALL_LESSONS.filter((l) => isDone(l.id)).length;
  const codeDone = ALL_LESSONS.some((l) => l.type === "code" && isDone(l.id));
  const phasesDone = CURRICULUM.filter((p) => phaseProgress(p).pct === 100).length;
  return [
    { ic: "🌱", nm: "First Step", on: doneCount >= 1 },
    { ic: "👍", nm: "Green Thumb", on: codeDone },
    { ic: "🔥", nm: "3-Day Streak", on: STATE.streak >= 3 },
    { ic: "⚡", nm: "7-Day Streak", on: STATE.streak >= 7 },
    { ic: "🪴", nm: "First Harvest", on: phasesDone >= 1 },
    { ic: "🌟", nm: "Halfway", on: overallPct() >= 50 },
    { ic: "🎓", nm: "Graduate", on: overallPct() === 100 },
  ];
}

// ── helpers ──────────────────────────────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function md(text) {
  return window.marked ? window.marked.parse(text) : `<pre>${esc(text)}</pre>`;
}

function confetti(emojis = ["🥔", "✨", "🌱", "💛", "🎉"]) {
  const box = $("#confetti");
  for (let i = 0; i < 32; i++) {
    const bit = document.createElement("div");
    bit.className = "confetti-bit";
    bit.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    bit.style.left = Math.random() * 100 + "vw";
    bit.style.animationDuration = 2.4 + Math.random() * 1.8 + "s";
    bit.style.animationDelay = Math.random() * 0.5 + "s";
    bit.style.fontSize = 1 + Math.random() * 1.3 + "rem";
    box.appendChild(bit);
    setTimeout(() => bit.remove(), 4800);
  }
}

// ── router ───────────────────────────────────────────────────────────────────
function route() {
  const hash = location.hash.slice(1);
  const m = hash.match(/^\/l\/(.+)$/);
  if (m && lessonById(m[1])) return renderLesson(lessonById(m[1]));
  return renderHome();
}

// ── views ────────────────────────────────────────────────────────────────────
function renderHome() {
  const { lvl, into } = level();
  const pct = overallPct();
  const st = stageFor(pct);

  const app = $("#app");
  app.innerHTML = `
    <header class="hero reveal">
      <span class="hello-kicker">welcome back,</span>
      <h1>${LEARNER}'s <span class="leaf">QA</span> Academy 🥔</h1>
      <p class="sub">A little academy, hand-built for you. Learn QA automation by doing — one green checkmark at a time.</p>
    </header>

    <div class="note reveal" style="animation-delay:.05s">
      <p>${esc(NOTE.text)}<span class="sig">${esc(NOTE.sign)}</span></p>
    </div>

    <section class="garden reveal" style="animation-delay:.1s">
      <div class="planter">
        <div class="pot"><div class="soil"></div><div class="plant">${st.plant}</div></div>
        <div class="plant-caption">${esc(st.cap)}</div>
      </div>
      <div class="garden-stats">
        <div class="level-row">
          <div class="lvl">Level <b>${lvl}</b></div>
          <div class="xp">${earnedXP()} / ${TOTAL_XP} XP · ${pct}% grown</div>
        </div>
        <div class="bar"><span style="width:${into}%"></span></div>
        <div class="chips">
          <span class="chip flame"><span class="big">🔥</span> ${STATE.streak}-day streak</span>
          <span class="chip"><span class="big">✅</span> ${ALL_LESSONS.filter((l) => isDone(l.id)).length} lessons done</span>
        </div>
      </div>
    </section>

    <h2 class="section-title reveal" style="animation-delay:.15s">🏅 Your badges</h2>
    <div class="badges reveal" style="animation-delay:.18s">
      ${badges().map((b) => `
        <div class="badge ${b.on ? "on" : ""}">
          <div class="ic">${b.ic}</div><div class="nm">${esc(b.nm)}</div>
        </div>`).join("")}
    </div>

    <h2 class="section-title reveal" style="animation-delay:.2s">🌿 Your path</h2>
    <div class="path">
      ${CURRICULUM.map((p, i) => renderPhase(p, i)).join("")}
    </div>

    <footer class="foot">made with 💛 for Potato</footer>
  `;

  app.querySelectorAll(".lesson-row").forEach((row) => {
    row.addEventListener("click", () => { location.hash = `/l/${row.dataset.id}`; });
  });
  preloadPython(); // warm up the Python engine while she reads
}

function renderPhase(p, i) {
  const pr = phaseProgress(p);
  return `
    <section class="phase reveal" style="animation-delay:${0.22 + i * 0.04}s">
      <div class="phase-head">
        <div class="phase-emoji">${p.emoji}</div>
        <div class="phase-titles">
          <div class="tag">${esc(p.tag)}</div>
          <h3>${esc(p.title)}</h3>
          <div class="blurb">${esc(p.blurb)}</div>
        </div>
        <div class="phase-prog">
          <div class="ring">${pr.done}/${pr.total}</div>
          <div class="mini-bar"><span style="width:${pr.pct}%"></span></div>
        </div>
      </div>
      <ul class="lessons">
        ${p.lessons.map((l) => `
          <li>
            <button class="lesson-row ${isDone(l.id) ? "done" : ""}" data-id="${l.id}">
              <span class="tick">✓</span>
              <span class="l-title">${esc(l.title)}</span>
              <span class="l-type ${l.type}">${l.type}</span>
              <span class="l-xp">+${XP[l.type] || 10}</span>
            </button>
          </li>`).join("")}
      </ul>
    </section>`;
}

function renderLesson(lesson) {
  const app = $("#app");
  app.innerHTML = `
    <button class="back">← back to the garden</button>
    <div class="lesson-wrap">
      <article class="concept reveal">${md(lesson.concept)}</article>
      <div id="activity"></div>
    </div>
  `;
  $(".back").addEventListener("click", () => { location.hash = "/"; });
  window.scrollTo(0, 0);

  const slot = $("#activity");
  if (lesson.type === "code") renderCode(lesson, slot);
  else if (lesson.type === "quiz") renderQuiz(lesson, slot);
  else if (lesson.type === "mission" || lesson.type === "milestone") renderMission(lesson, slot);
  else renderRead(lesson, slot);
}

function doneBanner() {
  return `<div class="done-banner"><span>🌱</span> Nice, Potato! Your plant just grew. <span class="xp-pop"></span></div>`;
}
async function markComplete(lesson, bannerEl) {
  const was = isDone(lesson.id);
  await complete(lesson.id);
  if (!was) confetti();
  if (bannerEl) {
    bannerEl.querySelector(".xp-pop").textContent = `+${XP[lesson.type] || 10} XP`;
    bannerEl.classList.add("show");
  }
}

function nextLessonButton() {
  const idx = ALL_LESSONS.findIndex((l) => l.id === location.hash.split("/l/")[1]);
  const next = ALL_LESSONS[idx + 1];
  if (next) return `<button class="btn btn-run next-btn" id="next">Next: ${esc(next.title)} →</button>`;
  return `<button class="btn btn-run next-btn" id="home-btn">🌻 Back to your garden</button>`;
}
function wireNext() {
  const n = $("#next");
  if (n) n.addEventListener("click", () => {
    const idx = ALL_LESSONS.findIndex((l) => l.id === location.hash.split("/l/")[1]);
    location.hash = `/l/${ALL_LESSONS[idx + 1].id}`;
  });
  const h = $("#home-btn");
  if (h) h.addEventListener("click", () => { location.hash = "/"; });
}

// read ------------------------------------------------------------------------
function renderRead(lesson, slot) {
  slot.innerHTML = `
    <div class="mission-box">
      <button class="btn btn-run" id="gotit">${isDone(lesson.id) ? "Got it ✓ (revisit)" : "Got it 🥔"}</button>
      ${doneBanner()}
      <div id="after"></div>
    </div>`;
  const banner = $(".done-banner", slot);
  $("#gotit").addEventListener("click", async () => {
    await markComplete(lesson, banner);
    $("#after").innerHTML = nextLessonButton();
    wireNext();
  });
}

// quiz ------------------------------------------------------------------------
function renderQuiz(lesson, slot) {
  slot.innerHTML = `
    <div class="mission-box">
      <h3 style="margin-top:0;font-family:var(--display)">${esc(lesson.question)}</h3>
      <div class="quiz-opts">
        ${lesson.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("")}
      </div>
      <div class="quiz-explain">${md(lesson.explain || "")}</div>
      ${doneBanner()}
      <div id="after"></div>
    </div>`;
  const banner = $(".done-banner", slot);
  let answered = false;
  slot.querySelectorAll(".opt").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (answered) return;
      const i = Number(btn.dataset.i);
      if (i === lesson.answer) {
        answered = true;
        btn.classList.add("correct");
        $(".quiz-explain", slot).classList.add("show");
        await markComplete(lesson, banner);
        $("#after").innerHTML = nextLessonButton();
        wireNext();
      } else {
        btn.classList.add("wrong");
        btn.disabled = true;
      }
    });
  });
}

// mission ---------------------------------------------------------------------
function renderMission(lesson, slot) {
  slot.innerHTML = `
    <div class="mission-box">
      <label class="mission-check">
        <input type="checkbox" id="mc" ${isDone(lesson.id) ? "checked disabled" : ""}/>
        <span>${esc(lesson.missionCheck || "I completed this mission.")}</span>
      </label>
      ${doneBanner()}
      <div id="after"></div>
    </div>`;
  const banner = $(".done-banner", slot);
  if (isDone(lesson.id)) { banner.classList.add("show"); banner.querySelector(".xp-pop").textContent = ""; }
  $("#mc").addEventListener("change", async (e) => {
    if (e.target.checked) {
      e.target.disabled = true;
      await markComplete(lesson, banner);
      $("#after").innerHTML = nextLessonButton();
      wireNext();
    }
  });
}

// code ------------------------------------------------------------------------
function renderCode(lesson, slot) {
  preloadPython(); // start loading Python now, while she reads — no wait on first Run
  const draftKey = `code:${lesson.id}`;
  const saved = localStorage.getItem(draftKey);
  slot.innerHTML = `
    <div class="workspace">
      <div class="ws-head">
        <h3>🐍 Your code</h3>
        <button class="btn btn-ghost" id="reset" title="Restore the starter code">↺ reset</button>
      </div>
      <textarea id="editor" class="code-fallback">${esc(saved ?? lesson.starter)}</textarea>
      <div class="ws-actions">
        <button class="btn btn-run" id="run">▶ Run tests</button>
        ${lesson.hint ? `<button class="btn btn-hint" id="hintbtn">💡 hint</button>` : ""}
        <span class="reassure">Red is normal — read it, change one thing, run again.</span>
      </div>
      ${lesson.hint ? `<div class="hintbox"><b>Hint:</b> ${md(lesson.hint)}</div>` : ""}
      <div class="result" id="result"></div>
      <div id="peekwrap"></div>
      ${doneBanner()}
      <div id="after"></div>
    </div>`;

  const banner = $(".done-banner", slot);
  const ta = $("#editor");
  let fails = 0;

  // CodeMirror if available, else plain textarea
  let cm = null;
  if (window.CodeMirror) {
    cm = window.CodeMirror.fromTextArea(ta, {
      mode: "python", lineNumbers: true, indentUnit: 4, tabSize: 4,
      lineWrapping: false, autofocus: false,
    });
    cm.on("change", () => localStorage.setItem(draftKey, cm.getValue()));
  } else {
    ta.addEventListener("input", () => localStorage.setItem(draftKey, ta.value));
  }
  const getCode = () => (cm ? cm.getValue() : ta.value);
  const setCode = (v) => (cm ? cm.setValue(v) : (ta.value = v));

  $("#reset").addEventListener("click", () => {
    setCode(lesson.starter);
    localStorage.removeItem(draftKey);
  });
  if (lesson.hint) {
    $("#hintbtn").addEventListener("click", () => $(".hintbox", slot).classList.toggle("show"));
  }

  $("#run").addEventListener("click", async () => {
    const btn = $("#run");
    const res = $("#result");
    btn.disabled = true;
    btn.textContent = "🐍 booting Python…";
    res.className = "result";
    try {
      const out = await runTests(getCode(), lesson.check || "");
      renderResult(out, res);
      if (out.ok) {
        await markComplete(lesson, banner);
        $("#after").innerHTML = nextLessonButton();
        wireNext();
      } else {
        fails++;
        // After a few honest tries, offer a gentle escape hatch.
        if (fails >= 3 && lesson.solution && !$("#peek")) {
          $("#peekwrap").innerHTML = `
            <button class="btn btn-ghost" id="peek">🥔 Stuck? Show me the fix</button>
            <div class="solution" id="solbox" hidden>
              <div class="solhead">Here's one way to do it — type it in, then Run:</div>
              <pre><code>${esc(lesson.solution)}</code></pre>
            </div>`;
          $("#peek").addEventListener("click", () => {
            const box = $("#solbox");
            box.hidden = !box.hidden;
          });
        }
      }
    } catch (err) {
      res.className = "result err show";
      res.innerHTML = `<div class="rhead">⚠️ Couldn't run Python</div>
        <div class="stdout">${esc(String(err))}</div>`;
    } finally {
      btn.disabled = false;
      btn.textContent = "▶ Run tests";
    }
  });
}

function renderResult(out, el) {
  if (out.error && out.tests.length === 0) {
    el.className = "result err show";
    el.innerHTML = `<div class="rhead">⚠️ Your code has an error</div>
      <div class="stdout">${esc(out.error)}</div>`;
    return;
  }
  if (out.tests.length === 0) {
    el.className = "result err show";
    el.innerHTML = `<div class="rhead">🤔 No tests ran</div>
      <div class="test-line">Make sure your test function name starts with <b>&nbsp;test_</b></div>`;
    return;
  }
  const passed = out.tests.filter((t) => t.passed).length;
  el.className = `result ${out.ok ? "pass" : "fail"} show`;
  el.innerHTML = `
    <div class="rhead">${out.ok ? "🌱 All green! " + passed + "/" + out.tests.length + " passed — well done, Potato!"
                                 : "🍂 " + passed + "/" + out.tests.length + " passed — almost! read the red below."}</div>
    ${out.tests.map((t) => `
      <div class="test-line ${t.passed ? "ok" : "no"}">
        <span class="tmark">${t.passed ? "✓" : "✗"}</span>
        <span>${esc(t.name)}${t.error ? `<div class="terr">${esc(t.error)}</div>` : ""}</span>
      </div>`).join("")}
    ${out.stdout && out.stdout.trim() ? `<div class="stdout">${esc(out.stdout)}</div>` : ""}`;
}

// ── boot ─────────────────────────────────────────────────────────────────────
window.addEventListener("hashchange", route);
(async function start() {
  await loadState();
  route();
})();
