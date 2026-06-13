---
marp: true
theme: default
paginate: true
header: "Phase 7: Job Readiness"
footer: "IRA Mentoring Program"
---

# 👔 Optional Phase 7: Job Readiness
## Preparing for the Real World

You have the technical skills. Now we need to prepare you for the terminology and scenarios you will face in interviews and on a real Agile team.

**Goal:** Prepare for interviews and team workflows.
**Duration:** Weeks 13-16.

---

# 📐 The Testing Pyramid

You will be asked about this in interviews!

1. **Unit Tests (Bottom - Many):** Written by developers. Fast, testing single functions.
2. **Integration / API Tests (Middle - Some):** Testing if different parts talk to each other correctly. (Your Python API tests!).
3. **E2E / UI Tests (Top - Few):** Opening a browser and testing the full flow. (Your Playwright tests!). Slow and flaky, so we write fewer of them.

---

# 🌫️ Smoke vs. Regression Testing

**Smoke Testing:** 
A quick suite of tests (maybe 10-15 tests) run immediately after a new deployment. It just checks if the core features (Login, Checkout) work. "Did the app catch on fire?"

**Regression Testing:**
A massive suite of tests (maybe hundreds) run before a major release. It ensures that new code didn't break older, existing features.

---

# 🤖 Continuous Integration (CI)

In the real world, QA engineers don't just run `pytest` on their laptops. Tests run automatically in the cloud every time a developer saves code.

**GitHub Actions:**
A tool built into GitHub. You can write a small `.yml` file that tells GitHub: *"Every time someone pushes code, spin up a server, install python, and run pytest automatically."*

*Consider adding a simple GitHub Actions workflow to your portfolio repo!*

---

# 🗣️ Common Interview Questions to Practice

Write down your answers and practice speaking them out loud:

1. *"Explain the difference between manual and automated testing. When would you NOT automate a test?"*
2. *"What makes a UI test flaky, and how do you prevent it?"*
3. *"Walk me through how you test an API. What do you look for?"*
4. *"How do you use AI in your daily QA work responsibly?"*
5. *"Walk me through the architecture of your portfolio project."*

---

# 🎓 Certifications

If you want to boost your resume further while job hunting:

1. **ISTQB Foundation Level:** The global standard for QA terminology. Highly recommended if you don't have it.
2. **ISTQB AI Testing:** A newer certification that proves you understand the intersection of AI and software testing.

---

# 🌟 Final Words

You started this journey as a manual functional tester.
You are now capable of writing code, automating browsers, querying APIs, and leveraging AI to multiply your productivity.

**You are ready. Go get that job!**
