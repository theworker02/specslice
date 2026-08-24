const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { sliceMarkdown } = require("../src/index.js");

describe("specslice", () => {
  it("extracts ATX headings and fence identifiers", () => {
    const md = [
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
    ].join("\n");
    assert.deepEqual(sliceMarkdown(md), [
      "h1 Title",
      "h2 Details",
      "fence js",
      "fence python",
    ]);
  });
});
