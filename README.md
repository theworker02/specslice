# specslice


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="specslice mark" width="96" height="96">

**Extract Markdown headings, fenced-language identifiers, and table-of-contents data with a compact documented API.**

[![JSR](https://jsr.io/badges/@theworker02/specslice)](https://jsr.io/@theworker02/specslice)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)

**Package:** [`@theworker02/specslice`](https://jsr.io/@theworker02/specslice)  ·  **Site:** [GitHub Pages](https://theworker02.github.io/specslice/)  ·  **Source:** [`theworker02/specslice`](https://github.com/theworker02/specslice)

## Purpose

Extract ATX Markdown headings, fenced code-block language tags, and table-of-contents lines from specs and README files. Useful for linting docs, building TOCs, and summarizing what languages a design doc references.

## Highlights

- Works on files or stdin (`-`).
- Subcommands for headings, fences, langs, and toc output.
- Optional heading level filter and unique language lists.
- Small ESM API (`sliceMarkdown`, `sliceFile`, `toToc`, `slugifyHeading`).


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

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/specslice`, published using GitHub Actions trusted publishing.



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/specslice.git
cd specslice
node src/cli.js README.md
node src/cli.js toc --level 2 README.md
node src/cli.js langs --json README.md
cat SPEC.md | node src/cli.js --headings --level 3
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Handles ATX headings (`#`); setext-style headings are not parsed.
- Fence detection follows common triple-backtick rules; nested fences may confuse the scanner.
- Slugify logic is deterministic but not guaranteed to match every GitHub anchor algorithm.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/specslice)
- [Project site](https://theworker02.github.io/specslice/)
- [Source repository](https://github.com/theworker02/specslice)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

specslice is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

