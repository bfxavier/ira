// curriculum.js — Potato's QA Automation Academy content.
//
// Adding a lesson is easy (Bruno, this is for you): drop a new object into a
// phase's `lessons` array. Lesson types:
//   read    — concept only; completed by clicking "Got it 🥔"
//   code    — interactive Python; completed when all tests go green
//   quiz     — multiple choice; completed on the right answer
//   mission  — done locally (a ticket/portfolio task); self-checked
//
// `code` lessons:
//   starter  — code Potato starts with (she edits this)
//   check    — hidden Python appended after her code (test_* funcs). Optional:
//              leave "" when SHE is the one writing the test.

export const LEARNER = "Potato";

export const XP = { read: 10, quiz: 15, code: 30, mission: 50, milestone: 120 };

export const CURRICULUM = [
  {
    id: "p0",
    title: "Planting the Seed",
    tag: "Setup & Baseline",
    emoji: "🌱",
    blurb: "Get your tools ready and run your very first test. No fear.",
    lessons: [
      {
        id: "p0l1",
        type: "read",
        title: "Hello, Potato",
        concept: `# Hello, Potato 🥔

This is your academy. I built it for you.

You already know how to *test* — you've been finding bugs for years. This place
teaches you to make the computer do the boring clicking for you, so you can be a
**QA Automation Engineer**.

Here's the deal:
- Small steps. One green checkmark at a time.
- You **type** the code. Reading isn't learning; doing is.
- **Red is good.** You're QA. Breaking things is literally your job.
- Every day you show up, you water your potato. Watch it grow. 🌱

Let's plant the seed.`,
      },
      {
        id: "p0ai",
        type: "read",
        title: "Meet your AI sidekick 🤖",
        concept: `# Wait — can't AI just write all this? 🤖

Fair question. You've heard about **agentic coding** — AI tools like **Claude
Code** that live in your terminal, read your whole project, write code, run it,
read the errors, and fix themselves. It's real, it's powerful, and it's not going
away. So why type anything yourself?

Here's the honest answer, and it's *good news for you*:

> **A QA's superpower is catching when something is wrong.**
> You can't catch what you can't read.

AI is confidently wrong all the time. It writes a test that *looks* right and
silently checks the wrong thing. The person who spots that — who reads the code,
smells the bug, and says "wait, that's not testing what we think" — is worth
their weight in gold. **That person is you.** But only if you can read the code.

So here's the plan:
- **Phases 1–4:** you build the fundamentals *yourself*, by hand. This is how you
  become the human who can **direct and double-check** the AI instead of just
  trusting it.
- **All along:** you use AI as a **tutor**, not an answer key — ask it to
  *explain*, not just *do*. (These lessons are basically that, on rails.)
- **Phase 5:** you run the full AI-assisted workflow like a pro, because by then
  you'll *know* when it's helping and when it's lying.

## 🥔 A little gift from honey

Here's the thing: you won't be doing this alone. **I'll set you up with a Claude
Code license** — the same kind of AI tooling real engineers use every day. Best
tool in the world, in your corner, from day one.

*(Fun fact: this whole academy was built with exactly those tools. So you're
already standing on top of the thing you're about to learn to command.)*

Learn the fundamentals, earn the superpower, then let the robot do the typing.
Deal? 💛`,
      },
      {
        id: "p0l2",
        type: "read",
        title: "Your toolbelt",
        concept: `# Your toolbelt 🧰

Before automating, install your tools. Do this once on your laptop:

- **Python 3** — the language we'll write tests in.
- **VS Code** — where you'll write code.
- **Git + a GitHub account** — to save and show off your work.
- **Postman** — for poking at APIs later.

> The **terminal** looks scary but it's just *texting your computer instead of
> clicking*. That's all it is.

Try these in the terminal:

\`\`\`bash
python --version
python -m venv .venv
source .venv/bin/activate
pip install pytest
\`\`\`

The \`.venv\` is a **clean room** — a private box of tools for this project so
nothing gets messy. You'll \`activate\` it every time you work.`,
      },
      {
        id: "p0l3",
        type: "code",
        title: "Your very first test",
        concept: `# Your very first test ✅

A test is just code that **checks something is true** using \`assert\`.

If the thing after \`assert\` is true → the test passes (green).
If it's false → the test fails (red), and Python tells you why.

Potato is shopping: fries cost 10, tax is 2. So the total *should* be 12.

> **Hit Run first.** It'll be **red** — that's normal and good! Then change the
> one number marked 👉 to make it green.`,
        starter: `def test_potato_total():
    fries = 10
    tax = 2
    total = fries + tax

    # 👉 Your turn: what SHOULD the total be? Fix this number.
    expected = 0
    assert total == expected, "fries (10) + tax (2) should equal this number"
`,
        check: ``,
        solution: `def test_potato_total():
    fries = 10
    tax = 2
    total = fries + tax

    expected = 12
    assert total == expected, "fries (10) + tax (2) should equal this number"
`,
        hint: "The fries are 10 and tax is 2. `10 + 2` is **12** — set `expected = 12`.",
      },
      {
        id: "p0l4",
        type: "mission",
        title: "Plant your repo",
        concept: `# Mission: plant your portfolio 🌍

Time to make the GitHub repo that will grow into your portfolio.

**Do this on your laptop:**
1. Create a GitHub repo called \`qa-automation-portfolio\`.
2. Add a \`README.md\` that says what it is.
3. Add a file \`test_basics.py\` with 3 passing tests.
4. Commit and push:

\`\`\`bash
git add .
git commit -m "Plant the seed: first tests"
git push
\`\`\`

**Done when:** the repo exists on GitHub and \`pytest\` runs green locally.`,
        missionCheck: "My qa-automation-portfolio repo exists on GitHub with 3 passing tests pushed.",
      },
    ],
  },

  {
    id: "p1",
    title: "Potato Learns Python",
    tag: "Python for QA",
    emoji: "🐍",
    blurb: "Just enough Python to write real tests. Through QA examples, never math homework.",
    lessons: [
      {
        id: "p1l1",
        type: "read",
        title: "Variables = labeled boxes",
        concept: `# Variables = labeled boxes 📦

A **variable** is a labeled box you put a value in.

\`\`\`python
expected_error = "Invalid Password"
attempts = 3
is_logged_in = False
\`\`\`

- Text goes in quotes → that's a **string**.
- Numbers don't → \`3\`, \`10.5\`.
- \`True\` / \`False\` → a **boolean**, perfect for "did it work?".

You already think this way as a tester. "Expected result" is a labeled box.
Now you just write it down for the computer.`,
      },
      {
        id: "p1l2",
        type: "code",
        title: "The case-sensitivity bug",
        concept: `# The case-sensitivity bug 🔍

Computers are **picky**. \`"Hello"\` and \`"hello"\` are *not* the same string.

This test is **broken on purpose**. Potato expects the error message
\`"Invalid Password"\`, but the actual one doesn't match. Find the mismatch and
fix \`actual_error\` so the test passes.

(This is a real bug testers catch all the time.)`,
        starter: `def test_login_error_message():
    expected_error = "Invalid Password"
    actual_error = "invalid password"   # 👉 fix me: match it exactly, capitals and all

    assert actual_error == expected_error, "the messages don't match — check the capital letters"
`,
        check: ``,
        solution: `def test_login_error_message():
    expected_error = "Invalid Password"
    actual_error = "Invalid Password"

    assert actual_error == expected_error, "the messages don't match — check the capital letters"
`,
        hint: "Look very closely at the capital letters. `i` vs `I`, `p` vs `P`. Make `actual_error` say `\"Invalid Password\"`.",
      },
      {
        id: "p1l3",
        type: "code",
        title: "Lists — supported browsers",
        concept: `# Lists — Potato's supported browsers 📋

A **list** is an ordered collection — like a dropdown of options you'd test.

\`\`\`python
browsers = ["Chrome", "Firefox", "Safari"]
"Chrome" in browsers   # True
len(browsers)          # 3
\`\`\`

The test below wants to confirm **Chrome is supported**, but someone left it out
of the list. Add it so the test passes.`,
        starter: `def test_chrome_is_supported():
    # 👉 fix the list so Chrome is in it
    supported_browsers = ["Firefox", "Safari", "Edge"]

    assert "Chrome" in supported_browsers, "Chrome isn't in the list yet"
`,
        check: ``,
        solution: `def test_chrome_is_supported():
    supported_browsers = ["Chrome", "Firefox", "Safari", "Edge"]

    assert "Chrome" in supported_browsers, "Chrome isn't in the list yet"
`,
        hint: 'Add the string `"Chrome"` into the list, e.g. `["Chrome", "Firefox", "Safari", "Edge"]`.',
      },
      {
        id: "p1l4",
        type: "code",
        title: "Dictionaries — is Potato an admin?",
        concept: `# Dictionaries — is Potato an admin? 🔑

A **dictionary** stores labeled values — \`key: value\` pairs. It's *exactly*
what API responses look like (you'll see that later).

\`\`\`python
user = {"name": "Potato", "role": "admin", "active": True}
user["role"]    # "admin"
\`\`\`

The test below has a **typo** in the key. Python keys are case-sensitive too.
Fix it so we correctly read Potato's role.`,
        starter: `def test_potato_is_admin():
    user_profile = {
        "name": "Potato",
        "role": "admin",
        "active": True,
    }

    # 👉 fix the key so we read Potato's role correctly
    assert user_profile["Role"] == "admin"
`,
        check: ``,
        solution: `def test_potato_is_admin():
    user_profile = {
        "name": "Potato",
        "role": "admin",
        "active": True,
    }

    assert user_profile["role"] == "admin"
`,
        hint: 'The key is spelled `"role"` (lowercase r), not `"Role"`. You\'ll see a `KeyError` when the key is wrong.',
      },
      {
        id: "p1l5",
        type: "code",
        title: "Functions — validating Potato's email",
        concept: `# Functions — validating an email ✉️

A **function** is reusable logic with a name. Here you'll *write the test* for a
function that already exists.

\`is_valid_email\` returns \`True\` only if the email has both an \`@\` and a \`.\`.

Write **two** tests:
- \`test_valid_email\` — a good email passes.
- \`test_invalid_email\` — an email with no \`@\` is rejected.`,
        starter: `def is_valid_email(email):
    return "@" in email and "." in email


def test_valid_email():
    # this one is done for you — a good email passes
    assert is_valid_email("potato@spud.com") is True


def test_invalid_email():
    # 👉 your turn: an address with NO "@" should be rejected.
    # Fix the expected result below from True to what it should be.
    assert is_valid_email("potato-spud.com") is True, "no @ means it is NOT a valid email"
`,
        check: ``,
        solution: `def is_valid_email(email):
    return "@" in email and "." in email


def test_valid_email():
    assert is_valid_email("potato@spud.com") is True


def test_invalid_email():
    assert is_valid_email("potato-spud.com") is False, "no @ means it is NOT a valid email"
`,
        hint: "`potato-spud.com` has no `@`, so `is_valid_email` returns `False`. Change `is True` to `is False`.",
      },
      {
        id: "p1l6",
        type: "quiz",
        title: "Reading error messages",
        concept: `# Reading error messages 📕

When a test fails, Python prints a **traceback**. Don't panic — read the
**last line first**. It usually names the problem.

Quick check below.`,
        question: "Potato runs a test and sees `KeyError: 'Role'`. What does it most likely mean?",
        options: [
          "The dictionary has no key called 'Role' (check spelling/case)",
          "Python is broken and needs reinstalling",
          "The internet is down",
          "The test passed successfully",
        ],
        answer: 0,
        explain: "A KeyError means you asked a dictionary for a key it doesn't have — almost always a typo or wrong capitalization.",
      },
    ],
  },

  {
    id: "p2",
    title: "The pytest Workshop",
    tag: "pytest Fundamentals",
    emoji: "🔬",
    blurb: "Structure tests like a pro: Arrange-Act-Assert, and one test that covers many cases.",
    lessons: [
      {
        id: "p2l1",
        type: "read",
        title: "How pytest finds your tests",
        concept: `# How pytest finds your tests 🔬

pytest is the tool that runs your tests. It has simple rules:

- Test **files** start with \`test_\` → \`test_cart.py\`.
- Test **functions** start with \`test_\` → \`def test_total(): ...\`.

Then you just run:

\`\`\`bash
pytest            # run everything
pytest -v         # verbose: show each test name
pytest test_cart.py::test_total   # run one specific test
\`\`\`

Green dots = passing. \`F\` = a failure to investigate. That's the whole loop.`,
      },
      {
        id: "p2l2",
        type: "code",
        title: "Arrange · Act · Assert",
        concept: `# Arrange · Act · Assert 🧱

Good tests have three clear parts:

1. **Arrange** — set up the data.
2. **Act** — do the thing.
3. **Assert** — check the result.

Potato is checking who can buy wine (must be 18+). The second test is wrong —
**hit Run to see it fail**, then fix the assertion for a 16-year-old.`,
        starter: `def can_buy_wine(age):
    return age >= 18


def test_adult_can_buy():
    # Arrange
    age = 21
    # Act
    allowed = can_buy_wine(age)
    # Assert
    assert allowed is True


def test_minor_cannot_buy():
    # Arrange
    age = 16
    # Act
    allowed = can_buy_wine(age)
    # 👉 Assert — should a 16-year-old be allowed? Fix this line.
    assert allowed is True, "a 16-year-old should NOT be allowed to buy wine"
`,
        check: ``,
        solution: `def can_buy_wine(age):
    return age >= 18


def test_adult_can_buy():
    age = 21
    allowed = can_buy_wine(age)
    assert allowed is True


def test_minor_cannot_buy():
    age = 16
    allowed = can_buy_wine(age)
    assert allowed is False, "a 16-year-old should NOT be allowed to buy wine"
`,
        hint: "`can_buy_wine(16)` is `16 >= 18`, which is `False`. So change `is True` to `is False`.",
      },
      {
        id: "p2l3",
        type: "code",
        title: "Parametrize — many cases, one test",
        concept: `# Parametrize — many cases, one test 🔁

Copy-pasting the same test with different numbers is messy. \`parametrize\` runs
**one** test against **many** inputs.

\`\`\`python
import pytest

@pytest.mark.parametrize("password, expected", [
    ("short", False),
    ("longenough", True),
    ("", False),
])
def test_password_length(password, expected):
    assert (len(password) >= 8) is expected
\`\`\`

One row in the test below is **wrong**. Hit Run — pytest will tell you *exactly
which case* failed (it shows the inputs in the test name). Read it, then fix that
row's \`expected\` value.`,
        starter: `import pytest


@pytest.mark.parametrize("password, expected", [
    ("short", False),
    ("longenough", True),
    ("", True),     # 👉 fix me: is an EMPTY password really valid?
])
def test_password_length(password, expected):
    assert (len(password) >= 8) is expected
`,
        check: ``,
        solution: `import pytest


@pytest.mark.parametrize("password, expected", [
    ("short", False),
    ("longenough", True),
    ("", False),
])
def test_password_length(password, expected):
    assert (len(password) >= 8) is expected
`,
        hint: 'An empty password `""` has length 0, which is **not** `>= 8`. So its `expected` should be `False`.',
      },
      {
        id: "p2l4",
        type: "mission",
        title: "TICKET-001 · Potato's cart total",
        concept: `# Mission: TICKET-001 🎫

Time for real fieldwork. Work this ticket **in your portfolio repo**, end to end.

**Ticket:** The checkout's cart total has no tests. Add a \`cart_total(subtotal, tax_rate)\`
function and lock in its behavior.

**Acceptance criteria**
- \`cart_total(100, 0.1)\` → \`110.0\`
- empty cart \`cart_total(0, 0.1)\` → \`0.0\`
- a \`@pytest.mark.parametrize\` test covering **3** combinations
- clear test names, \`pytest\` green

**The loop:** branch → write test → make it pass → open a PR → handle review.
Full brief in the repo's \`tickets/TICKET-001-cart-total.md\`.

**Done when:** the PR is open with \`Closes TICKET-001\`.`,
        missionCheck: "I worked TICKET-001 on a branch and opened a pull request.",
      },
      {
        id: "p2l5",
        type: "quiz",
        title: "Positive vs negative tests",
        concept: `# Positive vs negative tests ⚖️

A **positive** test checks the happy path (valid login works). A **negative**
test checks failure handling (bad password is rejected). Great QA does both.`,
        question: "Potato only wrote tests for correct logins. What's the risk?",
        options: [
          "A broken error path could ship — wrong passwords might be accepted",
          "Nothing, happy-path tests are enough",
          "The tests will run too fast",
          "pytest will refuse to run",
        ],
        answer: 0,
        explain: "Without negative tests, bugs in how the app handles bad input go uncaught. Testing failure is often where the real bugs hide.",
      },
    ],
  },

  {
    id: "p3",
    title: "Potato Drives the Browser",
    tag: "Playwright",
    emoji: "🌐",
    blurb: "Turn your manual clicks into reliable browser automation. Beat flakiness.",
    lessons: [
      {
        id: "p3l1",
        type: "read",
        title: "What is browser automation?",
        concept: `# What is browser automation? 🌐

You click buttons by hand to test a site. **Playwright** lets you write code that
opens a real browser and clicks for you — the same test, every time, in seconds.

\`\`\`python
def test_add_todo(page):
    page.goto("https://demo.playwright.dev/todomvc")
    page.get_by_placeholder("What needs to be done?").fill("Buy potatoes")
    page.keyboard.press("Enter")
    expect(page.get_by_text("Buy potatoes")).to_be_visible()
\`\`\`

\`page\` is the browser tab. You tell it what to do, then \`expect(...)\` checks the
result. (We run these on your laptop, not here — browsers need a real machine.)`,
      },
      {
        id: "p3l2",
        type: "read",
        title: "codegen & good locators",
        concept: `# codegen & good locators 🎯

Playwright can **record** your clicks into code:

\`\`\`bash
pip install pytest-playwright
playwright install
playwright codegen https://demo.playwright.dev/todomvc
\`\`\`

But recorded code is often fragile. The fix is **good locators** — find elements
the way a human would:

- ✅ \`get_by_role("button", name="Submit")\`
- ✅ \`get_by_label("Email")\`
- ✅ \`get_by_text("Buy potatoes")\`
- ❌ \`div > div:nth-child(3) > span\`  ← breaks the moment design changes

Record first, then clean it up into user-facing locators. That's the senior move.`,
      },
      {
        id: "p3l3",
        type: "quiz",
        title: "Why tests get flaky",
        concept: `# Why tests get flaky 🌬️

A **flaky** test passes sometimes and fails other times with no code change.
The #1 cause: the test acts before the page is ready.`,
        question: "A test does `time.sleep(1)` then checks for a result. Why is that flaky?",
        options: [
          "If the page takes longer than 1 second, the check runs too early and fails randomly",
          "sleep makes the computer overheat",
          "It's not flaky, sleep is best practice",
          "Python can't sleep for exactly 1 second",
        ],
        answer: 0,
        explain: "Fixed sleeps guess at timing. Playwright's `expect(...).to_be_visible()` auto-waits until the element appears (or times out) — reliable and faster.",
      },
      {
        id: "p3l4",
        type: "mission",
        title: "TICKET-002 · Fix the flaky login",
        concept: `# Mission: TICKET-002 🎫

A teammate's Playwright test fails randomly. Reproduce it, find the cause, fix it.

**Acceptance criteria**
- Explain *why* \`time.sleep(1)\` makes a test flaky
- Replace it with Playwright auto-waiting (\`expect(...).to_be_visible()\`)
- Use a user-facing locator
- The test passes 5 times in a row

Full brief: \`tickets/TICKET-002-login-flaky.md\`.

**Done when:** PR open with the root cause explained in one sentence.`,
        missionCheck: "I fixed the flaky test, it passes 5x in a row, and I opened a PR explaining the cause.",
      },
    ],
  },

  {
    id: "p4",
    title: "Potato Talks to the Backend",
    tag: "API Testing",
    emoji: "🔌",
    blurb: "APIs are invisible until you test them. Status codes, JSON, happy and sad paths.",
    lessons: [
      {
        id: "p4l1",
        type: "read",
        title: "HTTP basics",
        concept: `# HTTP basics — Potato orders fries 🍟

An **API** is how programs talk. When the app shows your order, it asked an API:

- **GET** — read data ("show me order 1")
- **POST** — create ("place this order")
- **PUT/PATCH** — update
- **DELETE** — remove

Every response comes with a **status code**:

- **200** OK — it worked
- **201** Created — POST worked
- **404** Not Found — that thing doesn't exist
- **400** Bad Request — you sent something wrong
- **500** Server Error — the backend broke

And the data comes back as **JSON** — which is *exactly* a Python dictionary.`,
      },
      {
        id: "p4l2",
        type: "quiz",
        title: "Status codes",
        concept: `# Status codes 🚦

Status codes are the API telling you what happened. Memorize the big ones — every
API tester reads these all day.`,
        question: "Potato requests `/users/99999` for a user that doesn't exist. What status should come back?",
        options: ["404 Not Found", "200 OK", "500 Server Error", "201 Created"],
        answer: 0,
        explain: "Asking for something that isn't there should return 404. If it returned 200 with empty data, that'd be a bug worth reporting!",
      },
      {
        id: "p4l3",
        type: "code",
        title: "Asserting on a JSON response",
        concept: `# Asserting on a JSON response 📦

A JSON response is just a dictionary in Python. Here's a (pretend) response from
\`GET /posts/1\`. Write tests that check it:

- the status code is \`200\`
- the post's \`id\` is \`1\`
- the \`title\` is not empty

This is the exact shape you'll use with the \`requests\` library on your laptop.`,
        starter: `# Pretend this came back from requests.get("/posts/1")
status_code = 200
response_json = {"id": 1, "title": "Potato's first post", "body": "hello"}


def test_status_is_ok():
    assert status_code == 200


def test_post_id():
    assert response_json["id"] == 1


def test_title_not_empty():
    # 👉 your turn: the title should NOT be empty. (hint: != means "not equal")
    assert response_json["title"] == "", "the title should not be an empty string"
`,
        check: ``,
        solution: `status_code = 200
response_json = {"id": 1, "title": "Potato's first post", "body": "hello"}


def test_status_is_ok():
    assert status_code == 200


def test_post_id():
    assert response_json["id"] == 1


def test_title_not_empty():
    assert response_json["title"] != "", "the title should not be an empty string"
`,
        hint: 'The title is `"Potato\'s first post"`, which is not empty. Change `==` to `!=`.',
      },
      {
        id: "p4l4",
        type: "mission",
        title: "TICKET-003 · /posts contract",
        concept: `# Mission: TICKET-003 🎫

Add API tests for the \`/posts\` endpoint — both happy and sad paths.

**Acceptance criteria**
- \`GET /posts/1\` → 200, has \`id\` 1 and a non-empty title
- \`GET /posts/99999\` → 404
- the \`Content-Type\` header contains \`application/json\`
- no secrets in the code

Full brief: \`tickets/TICKET-003-api-contract.md\`. Build it in Postman first, then
in Python with \`requests\`.

**Done when:** PR open with the tests passing.`,
        missionCheck: "I tested /posts (happy + 404 paths) in Python and opened a PR.",
      },
    ],
  },

  {
    id: "p5",
    title: "Potato & the AI Assistant",
    tag: "AI-Assisted QA",
    emoji: "🧠",
    blurb: "Use AI as a tutor, not an answer key. The skill that makes you modern QA.",
    lessons: [
      {
        id: "p5l1",
        type: "read",
        title: "AI as a tutor, not an answer key",
        concept: `# AI as a tutor, not an answer key 🧠

AI can 10x your QA work — *if* you stay in control. The trap: pasting "write me a
test", copying 30 lines, learning nothing.

**Safe prompts that teach you:**

> Explain this test failure in beginner-friendly language, then give me 3 possible
> fixes. Don't rewrite the whole file yet.

> Given this user story, list functional test scenarios, edge cases, and negative
> tests as a test matrix.

> Review this Playwright test for flakiness — which waits/selectors are risky?

**Hard rules:**
- Never paste secrets, passwords, tokens, or customer data.
- Never commit code you can't explain.
- Always run AI-generated tests yourself.`,
      },
      {
        id: "p5l2",
        type: "quiz",
        title: "Responsible prompting",
        concept: `# Responsible prompting ✅

Which request makes you a *better* engineer?`,
        question: "Potato is stuck on a failing test. Which prompt helps her grow?",
        options: [
          "“Explain why this test fails and suggest fixes — don't rewrite it for me yet.”",
          "“Just give me code that passes, I don't care how.”",
          "“Here's our production database password, debug this.”",
          "“Write my whole portfolio for me.”",
        ],
        answer: 0,
        explain: "Asking for explanation keeps you learning and in control. Never share secrets, and never ship code you can't explain.",
      },
      {
        id: "p5l3",
        type: "mission",
        title: "Turn a user story into tests with AI",
        concept: `# Mission: story → test matrix 🧩

Pick a small feature (login, or adding a todo). Then:

1. Ask AI to turn the user story into **functional scenarios + edge cases + negative
   tests**, formatted as a matrix.
2. **You** decide which 3 are worth automating and say why.
3. Break one of your own tests on purpose, then use AI to *explain* the failure
   (not fix it). Apply the fix yourself.

**Done when:** you have a test matrix and can explain what AI got right, what you
changed, and what you verified yourself.`,
        missionCheck: "I built a test matrix with AI and debugged a failure using AI for explanation only.",
      },
    ],
  },

  {
    id: "p6",
    title: "Potato Builds a Portfolio",
    tag: "Portfolio Project",
    emoji: "📁",
    blurb: "One clean repo that proves to a hiring manager you can do the job.",
    lessons: [
      {
        id: "p6l1",
        type: "read",
        title: "What a credible portfolio looks like",
        concept: `# What a credible portfolio looks like 📁

A recruiter spends 60 seconds on your repo. Make them count.

\`\`\`text
qa-automation-portfolio/
  README.md
  requirements.txt
  tests/
    test_python_basics.py
    test_api.py
    test_ui_todos.py
  postman/  api-testing-collection.json
  docs/     test-plan.md   ai-assisted-testing-notes.md
\`\`\`

**The README must show:** what it tests, the tools, how to install, how to run,
example output, what you learned, and how you used AI responsibly.

**Aim for:** 15+ pytest tests, 5+ API tests, 5+ Playwright tests, a Postman
collection, a test plan, and commits *over time* (not one giant upload).`,
      },
      {
        id: "p6l2",
        type: "mission",
        title: "Assemble & document the repo",
        concept: `# Mission: assemble the portfolio 🧰

Pull your work from the missions into one clean repo and write the README so a
stranger could run it.

**Done when:** the repo has the structure above, a clear README, and \`pytest\`
runs the whole suite green from scratch.`,
        missionCheck: "My portfolio repo is structured, documented, and runs green from a clean clone.",
      },
      {
        id: "p6l3",
        type: "mission",
        title: "Your 3-minute pitch",
        concept: `# Mission: the 3-minute pitch 🎤

Hiring managers will ask "walk me through your project." Practice it.

Record yourself (or pitch Bruno) explaining in 3 minutes:
- what the project tests and why
- one test you're proud of, line by line
- how you used AI responsibly

**Done when:** you can give the pitch smoothly without reading.`,
        missionCheck: "I can pitch my portfolio in 3 minutes without notes.",
      },
    ],
  },

  {
    id: "p7",
    title: "Potato Gets the Job",
    tag: "Job Readiness",
    emoji: "🎯",
    blurb: "The concepts and confidence to walk into interviews as a real automation engineer.",
    lessons: [
      {
        id: "p7l1",
        type: "read",
        title: "The testing pyramid",
        concept: `# The testing pyramid 🔺

Interviewers love this. The idea: have **many** fast unit tests, **some** API/
integration tests, and **few** slow UI tests.

\`\`\`
        /\\      UI tests   — few, slow, brittle
       /  \\     API tests  — some, faster, stable
      /____\\    Unit tests — many, instant, reliable
\`\`\`

Why? UI tests are slow and flaky, so lean on them least. Push checks **down** the
pyramid where they're fast and trustworthy. "Smoke" tests are a tiny set of
critical checks you run constantly; "regression" tests are the full suite.`,
      },
      {
        id: "p7l2",
        type: "quiz",
        title: "Interview rapid-fire",
        concept: `# Interview rapid-fire 💬

A classic question. You've got this.`,
        question: "“When should you NOT automate a test?”",
        options: [
          "When it runs rarely, changes constantly, or needs human judgment — automation costs more than it saves",
          "Never — automate absolutely everything",
          "Only on Fridays",
          "When the test is too easy",
        ],
        answer: 0,
        explain: "Automation is an investment. One-off checks, rapidly-changing UIs, and exploratory/visual judgment are often better done by a human. Knowing this is a senior signal.",
      },
      {
        id: "p7l3",
        type: "mission",
        title: "Mock interview",
        concept: `# Mission: mock interview 🎙️

Sit down with Bruno (or a friend) and answer these out loud:
- Difference between manual and automated testing?
- What makes a UI test flaky, and how do you fix it?
- How do you test an API?
- How do you use AI responsibly in QA?
- Walk me through one test from your portfolio.

**Done when:** you can answer all five without freezing.`,
        missionCheck: "I did a full mock interview and answered all five questions confidently.",
      },
      {
        id: "p7l4",
        type: "milestone",
        title: "Apply to your first role",
        concept: `# 🥔🎉 Apply to your first role

Potato. Look how far you came.

You can write Python, structure tests with pytest, automate a browser, test an
API, use AI like a pro, and you have a portfolio that proves it.

You are no longer "trying to get into automation." You **are** a QA Automation
Engineer who's still learning — like every great one is.

**The final mission:** apply to one junior QA Automation role. Just one. Today.

I'm proud of you. — 🥔`,
        missionCheck: "I applied to my first QA Automation role. 🎉",
      },
    ],
  },
];
