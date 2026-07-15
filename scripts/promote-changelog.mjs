import { readFileSync, writeFileSync } from "node:fs";

const [version, date] = process.argv.slice(2);
if (!version || !date) {
  console.error("Usage: promote-changelog.mjs <version> <date>");
  process.exit(1);
}

const path = "CHANGELOG.md";
const content = readFileSync(path, "utf8");

if (!/^## Unreleased$/m.test(content)) {
  console.error(`No "## Unreleased" section found in ${path}.`);
  process.exit(1);
}

const updated = content.replace(/^## Unreleased$/m, `## Unreleased\n\n## v${version} - ${date}`);

writeFileSync(path, updated);
