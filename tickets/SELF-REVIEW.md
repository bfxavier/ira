# ✅ Self-Review Checklist (for Ira, before asking for review)

Run this on **every** ticket before you tag your mentor. Reviewing your own work
first is the single habit that makes seniors trust a junior. Catch your own
mistakes and people assume you catch everything.

## Before I request review, I have…

**The work**
- [ ] Re-read the ticket. Every acceptance criterion is actually met.
- [ ] Run the **whole** test suite (`pytest`), not just my new test. All green.
- [ ] Watched my new test **fail first**, then pass — so I know it tests something real.

**The code**
- [ ] Removed leftover junk: `print()` debug lines, commented-out code, `time.sleep`.
- [ ] Every test name describes the behavior, not `test_1` / `test_new`.
- [ ] No secrets, passwords, tokens, or real customer data anywhere.
- [ ] I can explain **every line** I wrote in my own words.

**The Git side**
- [ ] I'm on a branch, not `main`.
- [ ] Commit messages say what changed (`Add cart total test`, not `stuff`).
- [ ] My PR uses the template and says `Closes TICKET-XXX`.

**The honesty check**
- [ ] If something is half-finished or I'm unsure about it, I said so in the PR
      notes. Hiding doubt is how bugs ship.

> [!TIP]
> If you check all of these, your review will be fast and your mentor will start
> trusting your PRs. That trust is what gets juniors handed bigger work.
