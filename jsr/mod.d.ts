/** Extract Markdown headings, fenced-language identifiers, and table-of-contents data. @module */
export interface Heading { /** ATX heading level. */ level: number; /** Heading text. */ text: string; }
export interface Fence { /** Fence language identifier, if present. */ lang: string | null; /** Raw first info token. */ raw: string; }
export interface SliceOptions { headings?: boolean; fences?: boolean; level?: number; unique?: boolean; }
export interface SliceResult { headings: Heading[]; fences: Fence[]; uniqueLangs: string[]; lines: string[]; }
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/specslice"; version: "1.1.0"; runtime: "node"; registry: "jsr" }>;
/** Convert heading text into a GitHub-style anchor slug. */
export function slugifyHeading(text: string): string;
/** Extract structural data from Markdown text. */
export function sliceMarkdown(text: string, options?: SliceOptions): SliceResult;
/** Convert extracted headings into a Markdown table of contents. */
export function toToc(headings: Heading[]): string;
/** Read a Markdown file and extract its structural data. */
export function sliceFile(filePath: string, options?: SliceOptions): SliceResult;
