// runner.js — runs Python in the browser via Pyodide, with a tiny pytest shim.
// Potato writes real `def test_...()` / `assert` / `@pytest.mark.parametrize`
// and gets instant green/red feedback. No installs, no server execution.

const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/";

// Python bootstrap: a minimal `pytest` module + a harness that discovers
// `test_*` functions, runs them (expanding parametrize), and returns JSON.
const BOOT = String.raw`
import sys, types, json, io, contextlib, traceback

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
    def __repr__(self):
        return "approx(%r)" % (self.expected,)
pytest.approx = approx

class _Raises:
    def __init__(self, exc): self.exc = exc
    def __enter__(self): return self
    def __exit__(self, t, v, tb):
        if t is None:
            raise AssertionError("DID NOT RAISE %s" % getattr(self.exc, "__name__", self.exc))
        return isinstance(v, self.exc)
pytest.raises = lambda exc: _Raises(exc)
sys.modules["pytest"] = pytest


def _err(e):
    if isinstance(e, AssertionError):
        msg = str(e) or "assertion failed"
        return "Assertion failed: " + msg
    return "%s: %s" % (type(e).__name__, e)


def _run_one(name, call):
    try:
        call()
        return {"name": name, "passed": True, "error": None}
    except Exception as e:
        return {"name": name, "passed": False, "error": _err(e)}


def run_user(src):
    g = {"__name__": "__main__"}
    out = io.StringIO()
    try:
        with contextlib.redirect_stdout(out):
            exec(src, g)
    except Exception as e:
        return json.dumps({"ok": False, "tests": [], "stdout": out.getvalue(),
                           "error": _err(e), "trace": traceback.format_exc()})

    tests = [(n, f) for n, f in g.items() if n.startswith("test_") and callable(f)]
    results = []
    with contextlib.redirect_stdout(out):
        for name, fn in tests:
            params = getattr(fn, "_params", None)
            if params:
                for i, kw in enumerate(params):
                    label = "%s[%s]" % (name, ", ".join("%s=%r" % (k, v) for k, v in kw.items()))
                    results.append(_run_one(label, (lambda kw=kw: fn(**kw))))
            else:
                results.append(_run_one(name, fn))

    ok = len(results) > 0 and all(r["passed"] for r in results)
    return json.dumps({"ok": ok, "tests": results, "stdout": out.getvalue(), "error": None})
`;

let _pyodide = null;
let _loading = null;

export function preloadPython() {
  // Kick off loading in the background so the first "Run" feels instant.
  if (!_loading) _loading = _init();
  return _loading;
}

async function _init() {
  if (!window.loadPyodide) {
    await loadScript(PYODIDE_URL + "pyodide.js");
  }
  const py = await window.loadPyodide({ indexURL: PYODIDE_URL });
  py.runPython(BOOT);
  _pyodide = py;
  return py;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

// Run the combined source (user code + hidden checks) and return results.
// Shape: { ok, tests: [{name, passed, error}], stdout, error }
export async function runTests(userSrc, hiddenCheck = "") {
  const py = await (_loading || preloadPython());
  const combined = hiddenCheck ? userSrc + "\n\n# --- checks ---\n" + hiddenCheck : userSrc;
  py.globals.set("__user_src__", combined);
  const json = py.runPython("run_user(__user_src__)");
  return JSON.parse(json);
}
