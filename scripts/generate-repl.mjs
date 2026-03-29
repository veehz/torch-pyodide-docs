/**
 * generate-repl.mjs
 *
 * Pre-build script that finds all ```python repl ... ``` blocks in docs/**\/*.md,
 * executes them in Pyodide + torch, and writes a cache to .vitepress/repl-cache.json.
 *
 * Usage:
 *   node scripts/generate-repl.mjs
 *
 * Environment variables:
 *   TORCH_URL   URL to torch UMD build (default: GitHub Pages CDN)
 *   BRIDGE_PATH Path to bridge.py (default: ./bridge.py in repo root)
 */

import { createHash } from "crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { glob } from "glob";
import path from "path";
import { fileURLToPath } from "url";
import * as torch from "torch";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const BRIDGE_PATH =
  process.env.BRIDGE_PATH ?? path.join(ROOT, "bridge.py");
const CACHE_FILE = path.join(ROOT, ".vitepress/repl-cache.json");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sha256(str) {
  return createHash("sha256").update(str).digest("hex").slice(0, 16);
}

/** Extract all ```python repl blocks from a markdown string. */
function extractReplBlocks(markdown) {
  const blocks = [];
  const re = /^```python\s+repl\s*\n([\s\S]*?)^```/gm;
  let m;
  while ((m = re.exec(markdown)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

// ---------------------------------------------------------------------------
// Python REPL runner (injected into Pyodide)
// ---------------------------------------------------------------------------

const RUNNER_PY = `
import ast
import sys
from io import StringIO

def _run_repl_block(code, torch_obj):
    """
    Execute a code block interactively:
    - Expression statements: eval and capture repr (or stdout if they print)
    - Other statements: exec and capture stdout
    Returns a list of (source_str, output_str_or_None) pairs, one per top-level node.
    """
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return [("# SyntaxError", str(e))]

    src_lines = code.splitlines()
    glb = {"torch": torch_obj}
    results = []

    for node in tree.body:
        start = node.lineno - 1
        end = node.end_lineno
        node_src = "\\n".join(src_lines[start:end])

        old_stdout = sys.stdout
        sys.stdout = buf = StringIO()
        output = None

        try:
            if isinstance(node, ast.Expr):
                val = eval(
                    compile(ast.Expression(node.value), "<repl>", "eval"),
                    glb,
                )
                printed = buf.getvalue()
                sys.stdout = old_stdout
                if printed.strip():
                    output = printed.rstrip()
                elif val is not None:
                    output = repr(val)
            else:
                exec(
                    compile(ast.Module([node], type_ignores=[]), "<repl>", "exec"),
                    glb,
                )
                printed = buf.getvalue()
                sys.stdout = old_stdout
                if printed.strip():
                    output = printed.rstrip()
        except Exception as e:
            sys.stdout = old_stdout
            output = f"{type(e).__name__}: {e}"

        results.append((node_src, output))

    return results
`;

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("torch-pyodide-docs: generating REPL outputs...\n");

  // Load existing cache
  const cache = existsSync(CACHE_FILE)
    ? JSON.parse(readFileSync(CACHE_FILE, "utf8"))
    : {};

  // Scan all markdown files
  const mdFiles = await glob("**/*.md", {
    cwd: ROOT,
    ignore: ["node_modules/**", ".vitepress/dist/**"],
  });

  const allBlocks = new Set();
  for (const file of mdFiles) {
    const content = readFileSync(path.join(ROOT, file), "utf8");
    for (const block of extractReplBlocks(content)) {
      allBlocks.add(block);
    }
  }

  const uncached = [...allBlocks].filter((b) => !cache[sha256(b)]);

  if (uncached.length === 0) {
    console.log("All blocks already cached. Nothing to do.\n");
    return;
  }

  console.log(
    `Found ${uncached.length} new/changed block(s). Running Pyodide...\n`
  );

  // Lazy-load pyodide only if needed
  const { loadPyodide } = await import("pyodide");

  console.log("  Loading Pyodide...");
  const pyodide = await loadPyodide();
  console.log("  torch loaded (from torch).\n");

  // Inject torch into Pyodide globals
  pyodide.globals.set("js_torch", torch);

  // Load bridge.py
  if (!existsSync(BRIDGE_PATH)) {
    throw new Error(
      `bridge.py not found at ${BRIDGE_PATH}.\n` +
        `Copy bridge.py from torch into the repo root, ` +
        `or set the BRIDGE_PATH env var.`
    );
  }
  const bridgeCode = readFileSync(BRIDGE_PATH, "utf8");
  pyodide.runPython(bridgeCode);

  // Get the torch Python object created by bridge.py
  const torchPy = pyodide.globals.get("torch");

  // Define the REPL runner inside Pyodide
  pyodide.runPython(RUNNER_PY);
  const runReplBlock = pyodide.globals.get("_run_repl_block");

  // Run each uncached block
  for (const block of uncached) {
    const key = sha256(block);
    const preview = block.split("\n").slice(0, 2).join("\n");
    console.log(`  Running block [${key}]:\n${preview}\n  ...`);

    try {
      const rawResult = runReplBlock(block, torchPy);
      // Convert Pyodide list-of-tuples to JS array of [src, output|null]
      const result = rawResult.toJs().map((pair) => [pair[0], pair[1]]);
      cache[key] = result;
      console.log(`  ✓ ${result.length} statement(s)\n`);
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}\n`);
      cache[key] = [[block.trim(), `Error: ${e.message}`]];
    }
  }

  mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  console.log(`Cache written to ${path.relative(ROOT, CACHE_FILE)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
