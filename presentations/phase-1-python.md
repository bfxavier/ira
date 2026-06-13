---
marp: true
theme: default
paginate: true
header: "Phase 1: Python for QA"
footer: "IRA Mentoring Program"
---

# 🐍 Phase 1: Python for QA
## Learning Just Enough Code to be Dangerous

We aren't trying to become full backend developers. We only want to learn the parts of Python that help us test software!

**Goal:** Learn the Python building blocks needed to write simple tests.
**Duration:** Weeks 1-2.

---

# 📦 Variables: Storing Data

A variable is just a named box where we store information.

```python
# Storing text (called a String)
username = "test_user_1"

# Storing a number (Integer)
cart_total = 45

# Storing a True/False value (Boolean)
is_logged_in = True
```

**QA Translation:** We use variables to store the data we want to test, like the expected error message or the current page URL!

---

# 📝 Lists: Collections of Items

Sometimes we need to check a whole list of things, like a navigation menu or items in a shopping cart.

```python
# This is a List
supported_browsers = ["Chrome", "Firefox", "Safari"]

def test_browser_supported():
    # 'in' checks if something exists inside the list!
    assert "Chrome" in supported_browsers
```

---

# 📖 Dictionaries: Key-Value Data

Dictionaries store data like a real dictionary: a word (Key) and its definition (Value). This looks exactly like the JSON data you see in API responses!

```python
user_profile = {
    "name": "Ana",
    "role": "admin",
    "active": True
}

def test_user_is_admin():
    # We access the value by asking for the "role" key
    assert user_profile["role"] == "admin"
```

---

# 🔀 If Statements: Making Decisions

Sometimes our code needs to make decisions.

```python
def check_password_strength(password):
    if len(password) < 8:
        return "Weak"
    else:
        return "Strong"

def test_weak_password():
    result = check_password_strength("123")
    assert result == "Weak"
```

---

# ⚙️ Functions: Reusable Code

We've been using `def test_...()`, but we can create our own functions to do repetitive tasks.

```python
# A reusable function
def is_valid_email(email):
    # It must have an @ and a .
    return "@" in email and "." in email

# The tests for our function
def test_valid_email():
    assert is_valid_email("person@example.com") is True

def test_invalid_email():
    assert is_valid_email("person-example.com") is False
```

---

# 🤖 Your AI Assistant is Your Co-Pilot

If you don't understand a piece of code, don't guess! Ask your AI.

**Great prompts to try this week:**
- *"Explain this Python test like I am new to programming: [paste code]"*
- *"Give me 5 edge cases for testing email validation."*
- *"Why is this assertion failing? [paste error message]"*

---

# 🏋️ Exercises for This Week

Try writing tests in your `test_basics.py` file for these scenarios:
1. **Login Error:** Create a variable with an error message and assert it exactly matches `"Invalid password"`.
2. **Required Field:** Assert that a string variable `error_field` equals `"username"`.
3. **Cart Total:** Create a list of item prices: `[10, 20, 5]`. Use the `sum()` function and assert the total is `35`.

---

# 🚫 What NOT to study right now

You might see tutorials on YouTube talking about advanced Python. **Skip these for now:**
- Object-Oriented Programming (Classes, inheritance)
- Advanced Algorithms
- Decorators
- Building web servers (Flask/Django)

*Stay focused strictly on writing small tests!*

---

# ✅ Week 2 Complete!

**Definition of Done Checklist:**
- [ ] You can write a small function (like checking an email).
- [ ] You can write 2-3 tests for that function using `assert`.
- [ ] You can read a basic pytest failure when your test is wrong.
- [ ] You have pushed your new tests to GitHub.

**You now know enough Python to automate QA tasks! 🎉**
