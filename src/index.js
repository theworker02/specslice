const fs = require("node:fs");

function sliceMarkdown(text) {
  const lines = [];
  const input = String(text).split(/\r?\n/);
  let inFence = false;
  for (const line of input) {
    const fence = line.match(/^(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (!inFence) {
        const ident = fence[2].trim().split(/\s+/)[0] || "";
        if (ident) lines.push(`fence ${ident}`);
        inFence = true;
      } else {
        inFence = false;
      }
      continue;
    }
    if (!inFence) {
      const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
      if (heading) lines.push(`h${heading[1].length} ${heading[2]}`);
    }
  }
  return lines;
}

function sliceFile(filePath) {
  return sliceMarkdown(fs.readFileSync(filePath, "utf8"));
}

module.exports = { sliceMarkdown, sliceFile };
