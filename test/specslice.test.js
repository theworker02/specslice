const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { sliceMarkdown, toToc } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");
const SAMPLE = [
  "# Title",
  "body",
  "## Details",
  "```js",
  "console.log(1)",
  "```",
  "```",
  "plain",
  "```",
  "~~~~python",
  "x = 1",
  "~~~~",
  "```js",
  "again",
  "```",
].join("\n");

function run(args, input) {
  return spawnSync(process.execPath, [cli, ...args], {
    encoding: "utf8",
    input: input || undefined,
  });
}

describe("specslice", () => {
  it("extracts ATX headings and fence identifiers", () => {
    const parsed = sliceMarkdown(SAMPLE);
    assert.deepEqual(parsed.lines, [
      "h1 Title",
      "h2 Details",
      "fence js",
      "fence python",
      "fence js",
    ]);
  });

  it("filters heading level and unique langs", () => {
    const parsed = sliceMarkdown(SAMPLE, { level: 1, unique: true, headings: true, fences: true });
    assert.deepEqual(parsed.lines, ["h1 Title", "fence js", "fence python"]);
    assert.deepEqual(parsed.uniqueLangs, ["js", "python"]);
  });

  it("builds a markdown TOC", () => {
    const toc = toToc(sliceMarkdown(SAMPLE).headings);
    assert.match(toc, /- \[Title\]\(#title\)/);
    assert.match(toc, /  - \[Details\]\(#details\)/);
  });

  it("reads stdin and prints toc", () => {
    const result = run(["toc", "-"], SAMPLE);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /\[Title\]\(#title\)/);
  });

  it("fails on a missing file", () => {
    const result = run(["nope-missing.md"]);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /file not found/);
  });

  it("writes unique langs via subcommand", () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "specslice-")), "a.md");
    fs.writeFileSync(file, SAMPLE);
    const result = run(["langs", file]);
    assert.equal(result.status, 0);
    assert.equal(result.stdout.trim(), "js\npython");
  });
});
