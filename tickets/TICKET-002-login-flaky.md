# 🎫 TICKET-002 — Login UI test is flaky in CI

| Field | Value |
|-------|-------|
| **Type** | Bug — flaky test |
| **Priority** | High |
| **Component** | Web automation |
| **Maps to** | Phase 3 — Playwright |
| **Estimate** | 1 session |

## 📄 Description

A teammate added a Playwright test for the TodoMVC demo app, but it **fails
randomly** — sometimes green, sometimes red, with no code change in between.
That is called a **flaky test**, and flaky tests are worse than no tests:
people stop trusting the suite and start ignoring red.

Your job: reproduce the flakiness, find *why* it's fragile, and fix it so it
passes reliably.

Here is the flaky test. Add it to `tests/test_todos.py`, then fix it:

```python
import time

def test_add_todo_flaky(page):
    page.goto("https://demo.playwright.dev/todomvc")
    page.get_by_placeholder("What needs to be done?").fill("Buy milk")
    page.keyboard.press("Enter")
    time.sleep(1)  # <-- smells bad
    assert page.get_by_text("Buy milk").is_visible()
```

## ✅ Acceptance criteria

- [ ] You can explain **why** `time.sleep(1)` makes a test flaky (and slow).
- [ ] The `time.sleep` is removed and replaced with Playwright's built-in
      auto-waiting (e.g. `expect(...).to_be_visible()`).
- [ ] The locator is **user-facing** (role / text / placeholder), not a brittle
      CSS path.
- [ ] The test passes **5 times in a row**:
      ```bash
      pytest tests/test_todos.py --count=5   # needs pytest-repeat
      # or just run it 5 times manually
      ```
- [ ] The test name no longer says "flaky" — it's fixed now.

## 💡 Hints (only if stuck)

<details>
<summary>Hint 1 — the senior way to wait</summary>

```python
from playwright.sync_api import expect

def test_add_todo(page):
    page.goto("https://demo.playwright.dev/todomvc")
    page.get_by_placeholder("What needs to be done?").fill("Buy milk")
    page.keyboard.press("Enter")
    expect(page.get_by_text("Buy milk")).to_be_visible()
```
`expect(...)` retries automatically until the element appears or it times out.
No guessing how long the page takes.
</details>

<details>
<summary>Hint 2 — ask AI the right question</summary>

*"Why is `time.sleep` an anti-pattern in UI tests, and how does Playwright's
auto-waiting work?"* — make it explain, then you apply the fix.
</details>

## 🏁 Definition of Done

- All acceptance criteria checked.
- Branch `TICKET-002-login-flaky`, PR with `Closes TICKET-002`.
- Your PR description explains the root cause of the flakiness in one sentence
  (this is the part a hiring manager will love).
- You can answer: *"What's the difference between a test that's slow and a test
  that's flaky?"*
