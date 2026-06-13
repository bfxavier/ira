---
marp: true
theme: default
paginate: true
header: "Phase 3: Web Automation with Playwright"
footer: "IRA Mentoring Program"
---

# 🌐 Phase 3: Web Automation with Playwright
## Making the Browser Click Itself

We are moving from testing Python code to testing real websites! 
Playwright is a modern tool that opens a browser, clicks buttons, and reads text—just like a human QA.

**Goal:** Automate real browser workflows and UI checks.
**Duration:** Weeks 5-7.

---

# 🚀 Installing Playwright

We need to install the Playwright Python library and tell it to download the browsers (Chrome, Firefox, Safari).

In your terminal (inside your `.venv`):
```bash
# 1. Install the Playwright plugin for pytest
pip install pytest-playwright

# 2. Download the browsers (this takes a minute)
playwright install
```

---

# 🪄 The Magic Trick: Codegen

Playwright has a tool that *records* what you do and writes the code for you! This is the best way to learn.

Run this command:
```bash
playwright codegen https://demo.playwright.dev/todomvc
```

A browser will open. Type a "Todo" item and press Enter. 
Look at the terminal window—Playwright generated the Python code for your actions!

---

# 🔍 Understanding Locators

To click a button, Playwright needs to "locate" it on the page.

```python
# Finding elements by what the user actually sees (BEST PRACTICE!)
page.get_by_role("button", name="Submit")
page.get_by_text("Welcome back, Ana")
page.get_by_placeholder("What needs to be done?")

# Locating and doing an action
page.get_by_role("button", name="Log In").click()
page.get_by_placeholder("Password").fill("Secret123")
```

---

# 📝 Your First UI Test

Let's write a real Playwright test. Note that `page` is magically provided by pytest!

```python
def test_add_todo_item(page):
    # 1. Arrange (Go to the website)
    page.goto("https://demo.playwright.dev/todomvc")

    # 2. Act (Fill the field and press Enter)
    page.get_by_placeholder("What needs to be done?").fill("Learn Playwright")
    page.keyboard.press("Enter")

    # 3. Assert (Check if the text appeared on the screen!)
    assert page.get_by_text("Learn Playwright").is_visible()
```

---

# ⚠️ The Danger of "Flaky" Tests

UI tests are notoriously "flaky" (sometimes they pass, sometimes they fail randomly).
Why? Because the internet is slow!

**Bad Habit:** Using `time.sleep(5)` to wait for a page to load.
**Good Habit:** Playwright *automatically* waits for elements to appear before clicking them! Always rely on Playwright's built-in waiting and assertions like `is_visible()`.

---

# 🤖 AI Practice for Playwright

Generated code from `codegen` is often messy. Use AI to clean it up!

**Great prompts:**
- *"I recorded this Playwright test. Clean it up, add comments, and explain what each locator is doing."*
- *"This locator `page.locator("div > span:nth-child(2)")` is very fragile. How can I rewrite this to use user-facing locators like `get_by_role`?"*
- *"Why might this UI test be flaky?"*

---

# 🏋️ Exercises for This Week

Use the demo site: `https://demo.playwright.dev/todomvc`

1. **Add:** Write a test that adds 2 different todo items.
2. **Complete:** Write a test that adds an item, and then clicks the checkbox to mark it as completed.
3. **Filter:** Write a test that adds an item, completes it, clicks the "Completed" filter button at the bottom, and asserts the item is visible.

---

# ✅ Week 7 Complete!

**Definition of Done Checklist:**
- [ ] You have 5-8 UI browser tests running successfully.
- [ ] You understand what a locator is, and why `get_by_text` is better than complex CSS selectors.
- [ ] You can fix a broken locator with the help of AI or DevTools.
- [ ] You know why "sleep" is bad and why Playwright's auto-waiting is good.

**You are now automating the UI! Next, we go under the hood to APIs.**
