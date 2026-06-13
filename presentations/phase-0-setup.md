---
marp: true
theme: default
paginate: true
header: "Phase 0: Setup & Baseline"
footer: "IRA Mentoring Program"
---

# 🚀 Phase 0: Setup and Baseline
## Your First Steps into QA Automation

Welcome! This week is all about preparing your workspace. 
You don't need to write complex code yet. We just want to get your tools installed and run a very basic test.

**Goal:** Set up your tools and get the first tiny tests running.
**Duration:** 1 week.

---

# 🧰 Our Toolbelt

To write automated tests, we need a few professional tools. Don't worry if they sound intimidating, we will learn them step-by-step:

1. **Python:** The programming language we will use. It's friendly and very popular in QA.
2. **VS Code:** Our code editor. Think of it as a super-powered text editor for code.
3. **Git & GitHub:** How we save our work and show it to the world (your portfolio).
4. **pytest:** A tool that runs our Python tests and tells us if they pass or fail.

---

# 🛠️ Step 1: Install Python & VS Code

**Python:**
- Go to [python.org/downloads](https://www.python.org/downloads/)
- Download the latest version for your computer.
- **IMPORTANT (Windows):** Check the box that says "Add Python to PATH" during installation!

**VS Code:**
- Go to [code.visualstudio.com](https://code.visualstudio.com/)
- Download and install.
- Open VS Code and install the **Python extension** (search for "Python" in the extensions tab on the left).

---

# 🐙 Step 2: Git and GitHub

We need to save our work so you can build a portfolio for recruiters!

1. Go to [github.com](https://github.com/) and create a free account.
2. Download Git from [git-scm.com/downloads](https://git-scm.com/downloads) and install it.
3. Once installed, open your terminal (or command prompt) and tell Git who you are:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

# 💻 The Terminal: Your Command Center

In VS Code, go to the top menu and click **Terminal > New Terminal**. 
This is where we talk directly to the computer. Let's check if Python is installed correctly!

Type this and press Enter:
```bash
python --version
```
*(On Mac/Linux, you might need to type `python3 --version`)*

If you see something like `Python 3.12.x`, you are good to go!

---

# 📦 Virtual Environments (The `.venv`)

When we build projects, we don't want their tools mixing up. A "Virtual Environment" is like a clean, separate room for your project.

Let's create a folder for your portfolio and set up a clean room:

```bash
# 1. Create a virtual environment named .venv
python -m venv .venv

# 2. Activate the clean room!
# On Mac/Linux:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate
```
*(You will see `(.venv)` appear in your terminal!)*

---

# 🧪 Installing Pytest

Now that we are inside our clean room `(.venv)`, let's install `pytest`. This is the tool that will run our automated tests.

Run this command:
```bash
pip install pytest
```

`pip` is Python's package installer. It goes to the internet, downloads pytest, and puts it in your `.venv`.

---

# 📝 Your First Test File

1. In VS Code, create a new file named `test_basics.py`.
2. The `test_` prefix is extremely important! It tells `pytest`: *"Hey, look inside here for tests!"*

Let's write a simple math test:

```python
def test_total_price():
    price = 10
    tax = 2
    
    # Assert means "I expect this to be true"
    assert price + tax == 12
```

---

# 🏃‍♀️ Running Your Test

Go back to your terminal (make sure `(.venv)` is still active) and type:

```bash
pytest
```

**What happens?**
Pytest will look for files starting with `test_`, run the code inside, and print a lovely green dot `.` if the assertion is true!

---

# 💥 Making it Fail (On Purpose!)

A huge part of QA Automation is reading failures. Let's break it!

Change your code to this:
```python
def test_total_price():
    price = 10
    tax = 2
    
    # This is wrong now!
    assert price + tax == 99 
```

Run `pytest` again. You will see a big red **FAILED**. 
Read the error message. It will tell you exactly that `12 == 99` is False!

---

# 📤 Step 3: Saving to GitHub

Let's save your first test to your portfolio.

1. Go to GitHub and create a new repository called `qa-automation-portfolio`.
2. Run these commands in your VS Code terminal:

```bash
git init
git add .
git commit -m "Add first tests"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

---

# ✅ Week 1 Complete!

**Definition of Done Checklist:**
- [ ] You have Python and VS Code installed.
- [ ] You understand how to open the terminal.
- [ ] You successfully created and activated a `.venv`.
- [ ] You ran `pytest` and saw a test pass (and fail!).
- [ ] You understand what `assert` does.
- [ ] Your code is pushed to your new GitHub repository.

**Congratulations on writing your first automated test! 🎉**
