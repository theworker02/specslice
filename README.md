# specslice

<img src="docs/logo.svg" alt="specslice mark" width="88" height="88">

**Print ATX headings and fenced code-block language identifiers from a markdown file.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/specslice?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

## Why it exists

Specs hide structure in prose. specslice gives you a compact outline: h1–h6 titles plus the languages of fenced blocks, so you can see coverage at a glance.

## Who it is for

Technical writers, RFC editors, and engineers reviewing README or design-doc completeness.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

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
npx --yes git+https://github.com/theworker02/specslice.git --help
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

Synopsis:

```text
specslice [options] <markdown-file>
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `<markdown-file>` | Path to a UTF-8 markdown file. Required. |

Print the same text locally:

```bash
specslice --help
specslice --version
```

Expected version output:

```text
1.0.0
```

## Configuration

No configuration. ATX headings are lines matching /^(#{1,6})\s+/. Fenced blocks use three or more backticks or tildes. The identifier is the first token after the opening fence. Closing fences are ignored. Headings inside fences are ignored.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | File was read and outline printed (may be empty). |
| `1` | Missing path or the file could not be read. |

## Examples

### Success path

A README with two headings and a JS fence.

```bash
specslice README.md
```

```text
h1 specslice
h2 Install
fence bash
```

### Failure path

No file argument.

```bash
specslice
```

```text
usage: specslice <markdown-file>
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
