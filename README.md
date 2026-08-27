# specslice

<img src="docs/logo.svg" alt="specslice mark" width="96" height="96">

**Extract Markdown headings, fenced-language identifiers, and table-of-contents data with a compact documented API.**

[![JSR](https://jsr.io/badges/@theworker02/specslice)](https://jsr.io/@theworker02/specslice)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/specslice`](https://jsr.io/@theworker02/specslice) · **Site:** [GitHub Pages](https://theworker02.github.io/specslice/) · **Source:** [`theworker02/specslice`](https://github.com/theworker02/specslice)

## Add from JSR

```bash
deno add jsr:@theworker02/specslice
```

```ts
import { sliceMarkdown, slugifyHeading, toToc } from "@theworker02/specslice";

const result = sliceMarkdown("# API\n\n```ts\nconst x = 1;\n```", { unique: true });
console.log(result.headings, result.uniqueLangs);
console.log(toToc(result.headings));
console.log(slugifyHeading("API Reference"));
```

## Public API

- `sliceMarkdown(text, options)` — extract headings and fenced languages.
- `sliceFile(path, options)` — process a Markdown file.
- `toToc(headings)` — generate Markdown TOC text.
- `slugifyHeading(text)` — create heading anchors.
- `PACKAGE` — JSR package metadata.
- `Heading`, `Fence`, `SliceOptions`, `SliceResult` — documented TypeScript structures.

## CLI from source

```bash
git clone https://github.com/theworker02/specslice.git
cd specslice
node src/cli.js --help
```

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/specslice`, published using GitHub Actions trusted publishing.

## License

[MIT](LICENSE) © 2026 theworker02
