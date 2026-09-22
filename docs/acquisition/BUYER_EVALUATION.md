# Buyer evaluation â€” specslice

## Goal

In 15â€“45 minutes, verify the Product builds or runs as documented and that proprietary notices are present.

## Steps

1. Confirm root `LICENSE` is proprietary and `ACQUISITION.md` exists.
2. Skim `README.md` install/run claims.
3. Execute:

```
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
```bash
git clone https://github.com/theworker02/specslice.git
cd specslice
node src/cli.js --help
```
```bash
node --test
```
```

4. Run tests if present (`npm test`, `pytest`, `cargo test`, `go test ./...`, etc.).
5. Record README vs observed behavior gaps in workpapers.

## Pass criteria

- [ ] Clone succeeds
- [ ] Documented happy path works **or** failure is explained
- [ ] Minimal path needs no surprise secrets
- [ ] License notices intact

*Updated: 2026-09-22*
