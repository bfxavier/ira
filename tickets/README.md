# 🎫 Real-Ticket Simulation

The biggest gap between a *good* junior and the *best* junior is not skill. It is
**independence**: the ability to take a ticket and carry it all the way to a
merged pull request without someone holding your hand.

This folder trains exactly that. Each ticket here mimics a real Jira/GitHub
issue. Your job is to work it end-to-end, the same way you will on a real team.

> [!IMPORTANT]
> These tickets target the `qa-automation-portfolio` repo you build during the
> study plan. Treat *that* repo as your "work" repo. This folder is just the
> brief, like a ticket tracker your team would use.

---

## 🔁 The Loop (do this for every ticket)

This is the muscle memory of a professional engineer. Repeat it until it is boring.

1. **Read the whole ticket first.** Title, description, acceptance criteria. Do
   not write code until you can say out loud what "done" looks like.
2. **Ask before you start (if unclear).** Use the *good question* template below.
   Asking a sharp question early is a senior habit, not a weakness.
3. **Branch.** Never work on `main`.
   ```bash
   git switch -c TICKET-001-cart-total-test
   ```
4. **Write the test first, watch it fail.** Red means the test works. (You are
   QA — breaking things on purpose is your superpower.)
5. **Make it pass.** Smallest change that satisfies the acceptance criteria.
6. **Run everything.** Not just your new test — the whole suite. `pytest`.
7. **Self-review.** Walk the `SELF-REVIEW.md` checklist *before* you ask anyone.
8. **Commit in small, meaningful steps.**
   ```bash
   git add tests/test_cart.py
   git commit -m "Add cart total test for TICKET-001"
   ```
9. **Open a Pull Request.** Use the PR template below. Describe *what* and *why*.
10. **Handle review.** Your mentor leaves comments. Respond to each one — fix it,
    or explain why not. Push follow-up commits. This back-and-forth IS the job.
11. **Merge** once approved. Delete the branch. Pick up the next ticket.

> [!TIP]
> A junior who can run this loop alone is more valuable than one who writes
> fancier code but needs help at every step. **Independence is the skill.**

---

## 📝 PR description template

Paste this into every pull request. Filling it out clearly is half of looking
senior.

```markdown
## What
One sentence: what does this PR do?

## Why
Which ticket does it close? What behavior are we protecting?
Closes TICKET-001.

## How I tested it
- [ ] Ran `pytest` — all green
- [ ] Watched the new test fail first, then pass
- [ ] Screenshot / paste of test output below

## Notes for the reviewer
Anything you're unsure about, or chose deliberately.
```

---

## 🙋 How to ask a good question

When you are stuck, do not say *"it doesn't work."* Use this shape — it gets you
unblocked faster and makes you look thoughtful:

```text
1. Goal:        What I'm trying to do.
2. Tried:       What I tried (commands, code).
3. Expected:    What I expected to happen.
4. Got:         What actually happened (paste the exact error).
5. Guess:       My best guess at why.
```

Best juniors include step 5. Always bring a guess.

---

## 📈 Difficulty ladder

Work these in order. Each maps to a phase of the study plan.

| Ticket | Skill | Maps to |
|--------|-------|---------|
| [TICKET-001](TICKET-001-cart-total.md) | pytest + the full Git/PR loop | Phase 2 |
| [TICKET-002](TICKET-002-login-flaky.md) | Playwright + fixing a flaky test | Phase 3 |
| [TICKET-003](TICKET-003-api-contract.md) | API testing + edge cases | Phase 4 |

Each ticket has its own **Definition of Done** and a hidden-from-her **mentor
review rubric** in [`MENTOR-REVIEW.md`](MENTOR-REVIEW.md) so the PR review feels
real.
