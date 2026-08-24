#!/usr/bin/env node
const { sliceFile } = require("./index.js");

const file = process.argv[2];
if (!file) {
  process.stderr.write("usage: specslice <markdown-file>\n");
  process.exit(1);
}
process.stdout.write(`${sliceFile(file).join("\n")}\n`);
