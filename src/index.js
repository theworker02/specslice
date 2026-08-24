const fs = require("node:fs");

function sliceMarkdown(text, options = {}) {
  const wantHeadings = options.headings !== false;
  const wantFences = options.fences !== false;
  const maxLevel = options.level == null ? 6 : Number(options.level);
  if (!Number.isInteger(maxLevel) || maxLevel < 1 || maxLevel > 6) {
    throw new Error("--level must be an integer from 1 to 6");
  }

  const headings = [];
  const fences = [];
  const input = String(text).split(/\r?\n/);
  let inFence = false;
  for (const line of input) {
    const fence = line.match(/^(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (!inFence) {
        const ident = fence[2].trim().split(/\s+/)[0] || "";
        fences.push({ lang: ident || null, raw: ident });
        inFence = true;
      } else {
        inFence = false;
      }
      continue;
    }
    if (!inFence) {
      const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
      if (heading) {
        const level = heading[1].length;
        if (level <= maxLevel) {
          headings.push({ level, text: heading[2] });
        }
      }
    }
  }

  const uniqueLangs = [...new Set(fences.map((f) => f.lang).filter(Boolean))];
  const lines = [];
  if (wantHeadings) {
    for (const h of headings) lines.push(`h${h.level} ${h.text}`);
  }
  if (wantFences) {
    const fenceSource = options.unique ? uniqueLangs.map((lang) => ({ lang })) : fences.filter((f) => f.lang);
    for (const f of fenceSource) lines.push(`fence ${f.lang}`);
  }
  return {
    headings,
    fences,
    uniqueLangs,
    lines,
  };
}

function toToc(headings) {
  return headings
    .map((h) => {
      const indent = "  ".repeat(h.level - 1);
      const anchor = h.text
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .trim()
        .replace(/\s+/g, "-");
      return `${indent}- [${h.text}](#${anchor})`;
    })
    .join("\n");
}

function sliceFile(filePath, options) {
  return sliceMarkdown(fs.readFileSync(filePath, "utf8"), options);
}

module.exports = { sliceMarkdown, sliceFile, toToc };
