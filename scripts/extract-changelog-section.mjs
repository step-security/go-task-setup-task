import { readFileSync } from "node:fs";

const [version] = process.argv.slice(2);
if (!version) {
  console.error("Usage: extract-changelog-section.mjs <version>");
  process.exit(1);
}

const lines = readFileSync("CHANGELOG.md", "utf8").split("\n");
const header = `## v${version} `;
const start = lines.findIndex((l) => l.startsWith(header));
if (start === -1) {
  console.error(`Section for v${version} not found in CHANGELOG.md.`);
  process.exit(1);
}

const rest = lines.slice(start + 1);
const nextHeading = rest.findIndex((l) => l.startsWith("## "));
const body = (nextHeading === -1 ? rest : rest.slice(0, nextHeading)).join("\n").trim();

process.stdout.write(body + "\n");
