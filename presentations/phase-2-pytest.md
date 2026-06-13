---
marp: true
theme: default
paginate: true
header: "Phase 2: pytest Fundamentals"
footer: "IRA Mentoring Program"
---

# 🔬 Phase 2: pytest Fundamentals
## Organizing and Running Tests Like a Pro

Now that you know Python basics, we need to master our testing tool: **pytest**. 

**Goal:** Understand test structure, grouping, and how to run suites efficiently.
**Duration:** Weeks 3-4.

---

# 📏 The Golden Rule: AAA

Every good automated test follows the **Arrange, Act, Assert** pattern. It makes tests easy to read.

```python
def test_addition():
    # 1. ARRANGE (Setup the data)
    number_a = 5
    number_b = 5
    
    # 2. ACT (Do the action you are testing)
    result = number_a + number_b
    
    # 3. ASSERT (Verify the outcome)
    assert result == 10
```
*Always try to mentally separate your tests into these three steps!*

---

# ➕ Positive vs ➖ Negative Tests

Just like in manual testing, we must test the "happy path" AND the "sad path".

```python
def login(username, password):
    return username == "admin" and password == "secret"

# Positive Test
def test_successful_login():
    assert login("admin", "secret") is True

# Negative Test
def test_failed_login():
    assert login("admin", "wrong_password") is False
```

---

# 👯‍♂️ Parametrized Tests (Avoiding Repetition)

What if we want to test 5 different wrong passwords? Writing 5 different functions is annoying! Pytest lets us feed a list of data into a single test.

```python
import pytest

# We run this test 3 times with different data!
@pytest.mark.parametrize("password, expected_result", [
    ("short", False),
    ("longenough", True),
    ("", False),
])
def test_password_length(password, expected_result):
    # len() counts the characters in the password
    is_valid = len(password) >= 8
    assert is_valid == expected_result
```

---

# 🗂️ Test Naming & Grouping

**File Naming:** Files MUST start with `test_` or end with `_test.py` (e.g., `test_login.py`).
**Function Naming:** Functions MUST start with `test_` (e.g., `def test_invalid_email():`).

If you name a file `login_tests.py` or a function `check_login()`, pytest will **ignore** it!

*Tip: Name your tests exactly what they are doing: `test_user_cannot_login_with_blank_password`*

---

# 💻 Running Your Tests Efficiently

As your test suite grows, you won't want to run all 100 tests every time. 

In your terminal:
- `pytest` : Runs ALL tests in the folder.
- `pytest -v` : Runs all tests, but gives you more detail (verbose).
- `pytest test_login.py` : Runs ONLY the tests inside `test_login.py`.
- `pytest test_login.py::test_empty_password` : Runs ONE specific test!

---

# 🤖 AI Practice for Pytest

Use your AI assistant to generate ideas, not just code!

**Great prompts:**
- *"I have this function: [paste code]. Give me 3 positive test cases and 3 negative test cases."*
- *"Help me rewrite these 4 repetitive tests into a single pytest.mark.parametrize test."*
- *"Is the name of this test function clear to you?"*

---

# 🏋️ Exercises for This Week

1. Create a new file called `test_shopping.py`.
2. Write a test for calculating a cart total (Positive test).
3. Write a test for applying a discount code.
4. Use `@pytest.mark.parametrize` to test a function that validates if a user is an adult (age >= 18) with ages: 17, 18, and 25.

---

# ✅ Week 4 Complete!

**Definition of Done Checklist:**
- [ ] You have at least 15 pytest tests saved in your GitHub portfolio.
- [ ] You understand the AAA (Arrange, Act, Assert) pattern.
- [ ] You have successfully written a Parametrized test.
- [ ] You know how to run a specific file or a single failing test using terminal commands.

**Your foundation is strong. Next, we automate the browser! 🌐**
