---
marp: true
theme: default
paginate: true
header: "Phase 6: Portfolio Project"
footer: "IRA Mentoring Program"
---

# 📁 Phase 6: Portfolio Project
## Proving You Can Do the Job

Recruiters and Hiring Managers want proof. A well-organized GitHub repository is your ultimate resume.

**Goal:** Polish your `qa-automation-portfolio` repo so it looks highly credible and professional.
**Duration:** Week 12.

---

# 🏗️ Suggested Repository Structure

Your repository should be clean and organized. Don't dump all files in the root folder!

```text
qa-automation-portfolio/
  README.md                     # The most important file!
  requirements.txt              # List of python packages needed
  tests/
    test_python_basics.py       # Phase 1 & 2 tests
    test_api.py                 # Phase 4 tests
    test_ui_todos.py            # Phase 3 Playwright tests
  postman/
    api-testing-collection.json # Exported from Phase 4
  docs/
    test-plan.md                # Explaining your QA strategy
    ai-assisted-notes.md        # How you used AI
```

---

# 📄 The Almighty README.md

If the README is bad, the hiring manager will close the page in 5 seconds.
It MUST include:

1. **Title & Description:** What is this project testing?
2. **Tools Used:** Badges for Python, pytest, Playwright, Postman.
3. **Setup Instructions:** How to clone the repo, create a `.venv`, and `pip install -r requirements.txt`.
4. **How to Run Tests:** Explicit terminal commands (`pytest tests/test_api.py`).
5. **What you learned:** A short paragraph showing your growth.

---

# 📋 The Portfolio Checklist

Before you start applying for jobs, ensure your repo has:

- [ ] 15+ Python/pytest tests (showing AAA pattern).
- [ ] 5+ API tests (testing status codes and JSON data).
- [ ] 5+ Playwright UI tests (using robust locators).
- [ ] 1 exported Postman collection JSON file.
- [ ] Clean `README.md` with clear setup instructions.
- [ ] A history of GitHub commits over time (not just "upload all files" in one day).

---

# 🗣️ The 3-Minute Pitch

You need to be able to explain this repository in an interview. Practice this pitch out loud:

*"In this repository, I built an automated testing framework from scratch using Python and pytest. I implemented UI automation for a Todo application using Playwright, focusing on reliable, user-facing locators. I also integrated API testing using the requests library to validate backend data and status codes. Throughout the process, I utilized AI assistants to brainstorm edge cases and review my test structure."*

---

# ✅ Week 12 Complete!

**Definition of Done Checklist:**
- [ ] A recruiter or hiring manager can open your repo and immediately understand what you can do.
- [ ] You can clone your own project to a new folder and run it from scratch without errors.
- [ ] You can deliver your 3-minute pitch smoothly.

**Congratulations! You have completed the core curriculum and are ready to apply for Junior QA Automation roles! 🎓🎉**
