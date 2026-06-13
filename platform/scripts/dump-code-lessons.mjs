// Dumps every `code` lesson as JSON so the Python verifier can run them
// through the same harness the browser uses.
import { CURRICULUM } from "../public/js/curriculum.js";

const code = CURRICULUM.flatMap((p) => p.lessons)
  .filter((l) => l.type === "code")
  .map((l) => ({
    id: l.id,
    title: l.title,
    starter: l.starter,
    check: l.check || "",
    solution: l.solution || "",
  }));

process.stdout.write(JSON.stringify(code));
