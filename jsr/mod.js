/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";

export const PACKAGE = Object.freeze({ name: "@theworker02/specslice", version: "1.1.0", runtime: "node", registry: "jsr" });

export function slugifyHeading(text) {
  return String(text).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");
}

export function sliceMarkdown(text, options = {}) {
  const wantHeadings = options.headings !== false;
  const wantFences = options.fences !== false;
  const maxLevel = options.level == null ? 6 : Number(options.level);
  if (!Number.isInteger(maxLevel) || maxLevel < 1 || maxLevel > 6) throw new Error("level must be an integer from 1 to 6");
  const headings = [];
  const fences = [];
  let inFence = false;
  for (const line of String(text).split(/\r?\n/)) {
    const fence = line.match(/^(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (!inFence) {
        const ident = fence[2].trim().split(/\s+/)[0] || "";
        fences.push({ lang: ident || null, raw: ident });
        inFence = true;
      } else inFence = false;
      continue;
    }
    if (!inFence) {
      const heading = line.match(/^(#{1,6})\s+(.+?)\s*$/);
      if (heading && heading[1].length <= maxLevel) headings.push({ level: heading[1].length, text: heading[2] });
    }
  }
  const uniqueLangs = [...new Set(fences.map((f) => f.lang).filter(Boolean))];
  const lines = [];
  if (wantHeadings) for (const h of headings) lines.push(`h${h.level} ${h.text}`);
  if (wantFences) for (const f of (options.unique ? uniqueLangs.map((lang) => ({ lang })) : fences.filter((f) => f.lang))) lines.push(`fence ${f.lang}`);
  return { headings, fences, uniqueLangs, lines };
}

export function toToc(headings) {
  return headings.map((h) => `${"  ".repeat(h.level - 1)}- [${h.text}](#${slugifyHeading(h.text)})`).join("\n");
}

export function sliceFile(filePath, options) {
  return sliceMarkdown(fs.readFileSync(filePath, "utf8"), options);
}
