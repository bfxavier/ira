# 🎫 TICKET-001 — Shopping cart total is missing test coverage

| Field | Value |
|-------|-------|
| **Type** | Test coverage |
| **Priority** | Medium |
| **Component** | Checkout |
| **Maps to** | Phase 2 — pytest Fundamentals |
| **Estimate** | 1 short session |

## 📄 Description

Our checkout has a function that calculates the final cart total (subtotal +
tax). Right now **there are zero automated tests** for it, so a bug here could
overcharge a customer and nobody would notice. QA flagged this as a risk.

You will add the function and write tests that lock in the correct behavior.

Create a file `tests/test_cart.py` in your `qa-automation-portfolio` repo with
this function (type it yourself — don't paste blindly):

```python
def cart_total(subtotal, tax_rate):
    return subtotal + (subtotal * tax_rate)
```

## ✅ Acceptance criteria

- [ ] A test confirms `cart_total(100, 0.1)` equals `110.0`.
- [ ] A test confirms an **empty cart** (`cart_total(0, 0.1)`) equals `0.0`.
- [ ] At least one test uses `@pytest.mark.parametrize` to check **three**
      subtotal/tax combinations in a single test.
- [ ] Every test name describes the behavior (e.g. `test_cart_total_with_tax`),
      not just `test_1`.
- [ ] `pytest` runs green with **no warnings**.

## 💡 Hints (only if stuck)

<details>
<summary>Hint 1 — the parametrize shape</summary>

```python
import pytest

@pytest.mark.parametrize("subtotal, tax_rate, expected", [
    (100, 0.1, 110.0),
    (50, 0.2, 60.0),
    (0, 0.1, 0.0),
])
def test_cart_total(subtotal, tax_rate, expected):
    assert cart_total(subtotal, tax_rate) == expected
```
</details>

<details>
<summary>Hint 2 — float surprises</summary>

If a test fails by a tiny amount like `110.00000000001`, that's floating-point
math, not your mistake. Ask AI: *"Why does 0.1 + 0.2 not equal 0.3 in Python,
and how do I assert floats in pytest?"* (Look up `pytest.approx`.)
</details>

## 🏁 Definition of Done

- All acceptance criteria checked.
- Worked on a branch named `TICKET-001-cart-total`, **not** `main`.
- Opened a PR using the template, with `Closes TICKET-001`.
- Walked the `SELF-REVIEW.md` checklist before requesting review.
- Can explain, in your own words, why the empty-cart test matters.
