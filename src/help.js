const HELP = "specslice 1.00 (1.0.0)\n\nUsage:\n  specslice [options] <markdown-file>\n\nPrint ATX headings and fenced code identifiers.\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n\nOutput lines:\n  hN <text>        ATX heading of level N (1-6)\n  fence <ident>    Opening fence language/info token (skipped when empty)\n\nExamples:\n  specslice README.md\n  specslice docs/guide.md\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
