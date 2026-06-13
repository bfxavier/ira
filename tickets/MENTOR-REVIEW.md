# 👀 Mentor Review Rubric (for Bruno)

Your job in the ticket simulation is to behave like a **real reviewer**, not a
cheerleader and not a gatekeeper. The point is to give Ira the experience of a
genuine PR review loop — the most important professional skill the study plan
doesn't otherwise teach.

## How to run the review

1. **Don't review until she asks.** Let her finish her own `SELF-REVIEW.md` first.
2. **Read the PR description before the code.** If the description is vague,
   that's your first comment — "What does this change and why? Walk me through it."
3. **Leave 2–4 comments. No more.** Drowning a junior in 20 nitpicks kills
   confidence. Pick the ones that matter.
4. **Ask, don't tell.** Prefer *"What happens if the list is empty here?"* over
   *"Add an empty-case test."* Let her arrive at it.
5. **Require at least one revision round** even on good work — responding to
   feedback and pushing a follow-up commit is the muscle we're building.
6. **Approve out loud and say why.** *"Approved — the negative-path test is
   exactly what I'd want from a mid-level engineer."* Specific praise sticks.

## What to look for (the signal)

| Area | Green flag | Red flag → coach it |
|------|-----------|---------------------|
| **Understanding** | Explains every line in her own words | Can't explain code AI wrote → don't merge |
| **Test quality** | Tested the negative/edge case unprompted | Only happy path |
| **Names** | `test_cart_total_with_tax` | `test_1`, `test_new` |
| **Git hygiene** | Small commits, real messages, on a branch | One giant commit on `main` |
| **Flakiness (T-002)** | Removed `sleep`, used `expect()` | "It passes on my machine" |
| **Honesty** | Flags what she's unsure of | Hides the messy part |
| **Asking** | Questions follow the 5-step shape | "It doesn't work" |

## The bar for "best junior"

She's there when she can take a ticket she has *never seen*, work the full loop
**without you touching the keyboard**, open a clean PR, and respond to your
review comments like a colleague — not a student. When that happens, write a
*new* ticket with no hints and watch her solve it cold. That's graduation.

## Reusing the simulation

Once she clears TICKET-001 to 003, invent your own:
- Pull a real bug from your own work, strip the secrets, and hand it to her.
- Give her a ticket with a **deliberately ambiguous** requirement so she has to
  ask a clarifying question before coding. (Real tickets are often vague.)
- Have her **review one of your PRs** for a change — reading code is a skill too.
