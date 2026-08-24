#!/usr/bin/env node
const fs = require("node:fs");
const { sliceMarkdown, sliceFile, toToc } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--") {
      positional.push(...argv.slice(i + 1));
      break;
    }
    if (arg === "-h" || arg === "--help") {
      flags.help = true;
      continue;
    }
    if (arg === "-V" || arg === "-v" || arg === "--version") {
      flags.version = true;
      continue;
    }
    if (arg === "--json") {
      flags.json = true;
      continue;
    }
    if (arg === "--headings") {
      flags.headings = true;
      continue;
    }
    if (arg === "--fences") {
      flags.fences = true;
      continue;
    }
    if (arg === "--unique") {
      flags.unique = true;
      continue;
    }
    if (arg === "--toc") {
      flags.toc = true;
      continue;
    }
    if (arg === "--level") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --level requires a value");
      flags.level = next;
      i += 1;
      continue;
    }
    if (arg.startsWith("--level=")) {
      flags.level = arg.slice("--level=".length);
      continue;
    }
    if (arg.startsWith("-") && arg !== "-") throw new Error(`unknown option: ${arg}`);
    positional.push(arg);
  }
  return { flags, positional };
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

async function main() {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    return;
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    return;
  }

  const commands = new Set(["headings", "fences", "toc", "langs"]);
  let command = null;
  const rest = [...positional];
  if (commands.has(rest[0])) command = rest.shift();
  const file = rest[0];

  const fromStdin = !file || file === "-";
  let parsed;
  const options = {
    level: flags.level,
    unique: Boolean(flags.unique) || command === "langs",
    headings: command ? command === "headings" || command === "toc" : flags.headings || (!flags.fences && !flags.toc),
    fences: command ? command === "fences" || command === "langs" : flags.fences || (!flags.headings && !flags.toc),
  };
  if (command === "toc" || flags.toc) {
    options.headings = true;
    options.fences = false;
  }
  if (flags.headings && !command) options.headings = true;
  if (flags.fences && !command) options.fences = true;

  if (fromStdin) {
    if (process.stdin.isTTY && !file) fail("usage: specslice [headings|fences|toc|langs] [file|-]");
    parsed = sliceMarkdown(await readStdin(), options);
  } else {
    if (!fs.existsSync(file)) fail(`file not found: ${file}`);
    parsed = sliceFile(file, options);
  }

  if (flags.json) {
    process.stdout.write(`${JSON.stringify(parsed, null, 2)}\n`);
    return;
  }
  if (command === "toc" || flags.toc) {
    const toc = toToc(parsed.headings);
    if (toc) process.stdout.write(`${toc}\n`);
    return;
  }
  if (command === "langs") {
    if (parsed.uniqueLangs.length) process.stdout.write(`${parsed.uniqueLangs.join("\n")}\n`);
    return;
  }
  if (parsed.lines.length) process.stdout.write(`${parsed.lines.join("\n")}\n`);
}

main().catch((err) => fail(err.message));
