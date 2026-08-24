const HELP = `specslice 1.00 (1.0.0)

Usage:
  specslice [options] [file|-]
  specslice headings [options] [file|-]
  specslice fences [options] [file|-]
  specslice toc [options] [file|-]
  specslice langs [options] [file|-]

Extract ATX headings and fenced code-block languages from markdown.
Read a file path, or "-" / omitted path to read stdin.

Subcommands:
  headings           Print only heading lines (hN text)
  fences             Print fence language identifiers
  toc                Print a markdown table of contents
  langs              Print unique fence languages (implies --unique)

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             Structured JSON (headings, fences, uniqueLangs)
  --headings         Include headings (default when no subcommand)
  --fences           Include fence identifiers (default when no subcommand)
  --level <n>        Only headings of level 1..n (default 6)
  --unique           Deduplicate fence languages, preserving order
  --toc              Print a markdown TOC instead of hN/fence lines

Output lines (human mode, default command):
  hN <text>          ATX heading of level N
  fence <ident>      Opening fence language token (empty fences omitted)

Exit codes:
  0  success
  1  missing input, unreadable file, or invalid --level

Examples:
  specslice README.md
  specslice toc --level 2 README.md
  specslice langs --json README.md
  cat SPEC.md | specslice --headings --level 3
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
