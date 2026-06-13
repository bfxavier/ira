---
marp: true
theme: default
paginate: true
header: "Phase 5: AI-Assisted QA Workflow"
footer: "IRA Mentoring Program"
---

# 🧠 Phase 5: AI-Assisted QA Workflow
## Using AI as a QA Assistant, Not a Magic Machine

AI will not replace you. A QA engineer using AI will replace a QA engineer who doesn't. 

**Goal:** Learn how to integrate AI tools (like ChatGPT, Claude, GitHub Copilot) responsibly into your daily QA workflow.
**Duration:** Weeks 10-11.

---

# ⚠️ Rule #1: Do Not Bypass Understanding

AI can write a perfectly working 50-line test in 2 seconds. 
**If you copy and paste it into your portfolio without understanding every line, you will fail the job interview.**

*Errors are your teachers.* Use AI to explain the error to you, not just give you the fixed code.

---

# 🛡️ Rule #2: Security and Privacy

**NEVER paste these things into public AI tools:**
- Passwords or API Tokens.
- Real customer data (emails, credit cards, names).
- Proprietary company code (unless your company provides a secure, private AI).

*Always anonymize data before asking for help!*

---

# 💡 Practical AI Use Case: Test Generation

AI is incredible at brainstorming edge cases that humans forget.

**Prompt Template:**
> *"Given this user story: 'As a user, I want to reset my password using my email address', create functional test scenarios, edge cases, and negative tests. Format them as a QA test matrix."*

You take the matrix, review it, and then write the automation yourself!

---

# 🐛 Practical AI Use Case: Better Bug Reports

Found a bug manually? AI can help you write a more professional report for the developers.

**Prompt Template:**
> *"I found a bug. I clicked the checkout button and nothing happened, but the console says 'NullReferenceError on line 42'. Help me write a professional, step-by-step bug report including Expected vs Actual behavior."*

---

# 🔧 Practical AI Use Case: Debugging Flaky UI Tests

Playwright tests failing randomly? AI can spot race conditions and bad locators.

**Prompt Template:**
> *"Review this Playwright test for flakiness. Explain which selectors or waits are risky and suggest improvements:*
> `[paste code]`"

---

# 🧑‍🏫 Practical AI Use Case: The Mentor

Use the AI as a patient teacher.

**Prompt Template:**
> *"You are helping me as a QA mentor. Explain this pytest failure in beginner-friendly language. Then give me 3 possible fixes. Do NOT rewrite the whole file yet, just give me hints so I can fix it myself:*
> `[paste terminal error] `"

---

# 🏋️ Exercises for This Week

1. Take a manual test case you remember from your job. Ask AI to convert it into a pytest + Playwright test skeleton.
2. Intentionally break one of your API tests. Feed the error message to AI and ask it to explain *why* it broke in simple terms.
3. Use AI to generate 10 edge cases for a "Date of Birth" input field.

---

# ✅ Week 11 Complete!

**Definition of Done Checklist:**
- [ ] You have used AI to successfully generate test ideas/edge cases.
- [ ] You have used AI to debug a failing test by asking for explanations, not just code.
- [ ] You can confidently explain to a mentor (or interviewer) how AI helped you, and what parts you verified yourself.

**You are now an AI-empowered QA Engineer! ⚡**
