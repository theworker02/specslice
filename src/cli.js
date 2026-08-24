#!/usr/bin/env node
const { sliceFile } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

const file = args.find((a) => !a.startsWith("-"));
if (!file) {
  process.stderr.write("usage: specslice <markdown-file>\n");
  process.exit(1);
}
try {
  process.stdout.write(`${sliceFile(file).join("\n")}\n`);
} catch (err) {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
}
