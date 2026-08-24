# specslice

<img src="docs/logo.svg" alt="specslice mark" width="96" height="96">

**Print ATX headings and fenced code-block language identifiers from a markdown file.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/specslice?display_name=release)
[![npm](https://img.shields.io/npm/v/@magnexis/specslice.svg)](https://www.npmjs.com/package/@magnexis/specslice)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/specslice/) · **Source:** [`theworker02/specslice`](https://github.com/theworker02/specslice) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/specslice/releases/tag/v1.0.0) · **npm:** [`@magnexis/specslice`](https://www.npmjs.com/package/@magnexis/specslice)

## Why it exists

Specs hide structure in prose. specslice gives you a compact outline: h1–h6 titles plus the languages of fenced blocks, so you can see coverage at a glance.

## Who it is for

Technical writers, RFC editors, and engineers reviewing README or design-doc completeness.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from npm

```bash
npm install -g @magnexis/specslice
specslice --help
```

Package page: https://www.npmjs.com/package/@magnexis/specslice

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/specslice.git
specslice --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/specslice.git
cd specslice
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes @magnexis/specslice --help
node src/cli.js --help
```

## Quick start

```bash
printf '# Title\n\n## Install\n\n\`\`\`js\n1\n\`\`\`\n' > spec.md
specslice spec.md
```

Expected:

```text
h1 Title
h2 Install
fence js
```

## CLI reference

```text
specslice 1.00 (1.0.0)

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
```

Print the same text locally:

```bash
specslice --help
specslice -h
specslice --version
specslice -V
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration file. Read a path, or `-` / stdin for piped markdown.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Parsed successfully. |
| `1` | Missing input, unreadable file, or invalid --level. |

## Examples

### Success path

Extract headings and fence languages from a spec.

```bash
specslice README.md
```

```text
h1 Title
h2 Details
fence js
```

### Failure path

A missing file exits 1.

```bash
specslice nope.md
```

```text
file not found: nope.md
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/specslice/](https://theworker02.github.io/specslice/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
