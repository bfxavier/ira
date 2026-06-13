# 🎫 TICKET-003 — Add API tests for the /posts endpoint

| Field | Value |
|-------|-------|
| **Type** | Test coverage |
| **Priority** | Medium |
| **Component** | API |
| **Maps to** | Phase 4 — API Testing |
| **Estimate** | 1 session |

## 📄 Description

We rely on a public API (`jsonplaceholder.typicode.com`) as a stand-in for our
backend. We need automated checks that the `/posts` endpoint behaves correctly —
both when things go right (**happy path**) and when they go wrong (**negative
path**). A good QA tests *both*. Anyone can test the happy path.

Add `tests/test_posts_api.py` to your `qa-automation-portfolio` repo.

## ✅ Acceptance criteria

**Happy path**
- [ ] `GET /posts/1` returns status `200`.
- [ ] The response JSON has an `id` of `1` and a non-empty `title`.

**Negative path** (this is where juniors level up)
- [ ] `GET /posts/99999` (a post that doesn't exist) returns status `404`.
- [ ] A test confirms the response `Content-Type` header contains
      `application/json`.

**Quality**
- [ ] Each test checks **one** behavior and is named for it.
- [ ] No real secrets, tokens, or passwords anywhere in the code.

## 💡 Hints (only if stuck)

<details>
<summary>Hint 1 — the request shape</summary>

```python
import requests

BASE = "https://jsonplaceholder.typicode.com"

def test_get_post_happy_path():
    response = requests.get(f"{BASE}/posts/1")
    assert response.status_code == 200
    body = response.json()
    assert body["id"] == 1
    assert body["title"] != ""

def test_get_missing_post_returns_404():
    response = requests.get(f"{BASE}/posts/99999")
    assert response.status_code == 404
```
</details>

<details>
<summary>Hint 2 — checking a header</summary>

`response.headers["Content-Type"]` gives you the header string. Use `in` to
check it *contains* `application/json` rather than matching it exactly.
</details>

## 🏁 Definition of Done

- All acceptance criteria checked.
- Branch `TICKET-003-api-contract`, PR with `Closes TICKET-003`.
- You can explain the difference between a `200`, a `404`, and a `500` to a
  non-technical person.
- Bonus senior move: in the PR, note one *more* edge case you'd test if you had
  time (e.g. a `POST` with a missing field). Thinking of untested cases is the
  core QA skill.
