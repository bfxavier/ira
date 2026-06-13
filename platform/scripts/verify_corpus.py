"""Verify the code-lesson corpus against the real test harness.

For each `code` lesson:
  - the STARTER must FAIL (fail-first: she sees red, then fixes it)
  - the SOLUTION must PASS (the intended fix actually works)
  - a SOLUTION must exist

Reads the lessons as JSON on stdin (from dump-code-lessons.mjs).
This harness is byte-for-byte the same logic as public/js/runner.js.
"""
import sys, json, types, io, contextlib, traceback

# --- harness (mirror of runner.js BOOT) ---------------------------------------
pytest = types.ModuleType("pytest")

class _Mark:
    def parametrize(self, argnames, argvalues, **kw):
        names = [a.strip() for a in argnames.split(",")] if isinstance(argnames, str) else list(argnames)
        def deco(fn):
            cases = list(getattr(fn, "_params", []))
            for vals in argvalues:
                if len(names) == 1 and not isinstance(vals, (list, tuple)):
                    vals = (vals,)
                cases.append(dict(zip(names, vals)))
            fn._params = cases
            return fn
        return deco
pytest.mark = _Mark()

class approx:
    def __init__(self, expected, rel=1e-6, abs=1e-9):
        self.expected, self.rel, self.abs = expected, rel, abs
    def __eq__(self, other):
        return abs(other - self.expected) <= max(self.rel * abs(self.expected), self.abs)
pytest.approx = approx

class _Raises:
    def __init__(self, exc): self.exc = exc
    def __enter__(self): return self
    def __exit__(self, t, v, tb):
        if t is None:
            raise AssertionError("DID NOT RAISE")
        return isinstance(v, self.exc)
pytest.raises = lambda exc: _Raises(exc)
sys.modules["pytest"] = pytest


def _err(e):
    if isinstance(e, AssertionError):
        return "Assertion failed: " + (str(e) or "assertion failed")
    return "%s: %s" % (type(e).__name__, e)


def run_user(src):
    g = {"__name__": "__main__"}
    out = io.StringIO()
    try:
        with contextlib.redirect_stdout(out):
            exec(src, g)
    except Exception as e:
        return {"ok": False, "tests": [], "error": _err(e)}
    tests = [(n, f) for n, f in g.items() if n.startswith("test_") and callable(f)]
    results = []
    for name, fn in tests:
        params = getattr(fn, "_params", None)
        runs = ([(name, (lambda kw=kw: fn(**kw))) for kw in params] if params
                else [(name, fn)])
        for label, call in runs:
            try:
                call()
                results.append({"name": label, "passed": True})
            except Exception as e:
                results.append({"name": label, "passed": False, "error": _err(e)})
    ok = len(results) > 0 and all(r["passed"] for r in results)
    return {"ok": ok, "tests": results, "error": None}


def combine(src, check):
    return src + "\n\n# --- checks ---\n" + check if check else src


lessons = json.load(sys.stdin)
fails = 0
for L in lessons:
    starter = run_user(combine(L["starter"], L["check"]))
    if not L["solution"]:
        print("  ✗ %-6s %-34s NO SOLUTION FIELD" % (L["id"], L["title"]))
        fails += 1
        continue
    solution = run_user(combine(L["solution"], L["check"]))

    starter_ok = not starter["ok"]      # we WANT the starter to fail
    solution_ok = solution["ok"]        # we WANT the solution to pass
    ok = starter_ok and solution_ok

    mark = "✓" if ok else "✗"
    print("  %s %-6s %-34s starter=%s solution=%s" % (
        mark, L["id"], L["title"],
        "fails✔" if starter_ok else "PASSES✗(should fail)",
        "passes✔" if solution_ok else "FAILS✗",
    ))
    if not solution_ok:
        bad = [t for t in solution["tests"] if not t["passed"]]
        print("       solution error: %s" % (solution.get("error") or (bad[0].get("error") if bad else "no tests ran")))
    if not ok:
        fails += 1

print()
if fails:
    print("RESULT: %d lesson(s) need attention" % fails)
    sys.exit(1)
print("RESULT: all %d code lessons verified ✓" % len(lessons))
