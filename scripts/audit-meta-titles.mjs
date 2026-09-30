/**
 * SEO meta audit - reads the prerendered HTML in .next/server/app and reports
 * every <title> / meta description with its character count.
 *
 * Run AFTER `next build`:  npm run audit:meta
 *
 * Why a script instead of eyeballing source: meta titles are assembled from
 * several places (root layout, RoutePageFactory, per-page overrides, Sanity
 * content) and Next.js appends `title.template` from parent segments. The only
 * way to know what Google actually receives is to read the built HTML.
 *
 * Budgets: ~60 chars for <title> and ~155 for the description, which is roughly
 * where Google truncates a desktop snippet.
 *
 * Exits non-zero if any page is over either budget so the check can gate a
 * release. Descriptions are measured from the built HTML rather than from source
 * because they come from three places: the root layout, a route record's
 * `metaDescription`, and Sanity.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const HTML_DIR = path.join(".next", "server", "app");

function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...walk(full));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'");

const attr = (html, re) => {
  const match = html.match(re);
  return match ? decode(match[1]) : "";
};

let files;
try {
  files = walk(HTML_DIR);
} catch {
  console.error(`No build output at ${HTML_DIR}. Run \`next build\` first.`);
  process.exit(1);
}

const rows = [];
for (const file of files) {
  const html = readFileSync(file, "utf8");
  const route = "/" + path.relative(HTML_DIR, file).replace(/\\/g, "/").replace(/\.html$/, "");
  rows.push({
    route,
    title: attr(html, /<title>([^<]*)<\/title>/),
    description: attr(html, /<meta name="description" content="([^"]*)"/),
  });
}

const titleFails = rows.filter((r) => r.title.length > TITLE_MAX);
const descFails = rows.filter((r) => r.description.length > DESCRIPTION_MAX);

rows.sort((a, b) => b.title.length - a.title.length);

console.log(`Meta audit of ${rows.length} prerendered pages`);
console.log(`Budgets: title <= ${TITLE_MAX}, description <= ${DESCRIPTION_MAX}\n`);
console.log("TLEN  DLEN  ROUTE / TITLE");
console.log("-".repeat(100));
for (const r of rows) {
  const flag =
    (r.title.length > TITLE_MAX ? "  <== TITLE TOO LONG" : "") +
    (r.description.length > DESCRIPTION_MAX ? "  <== DESC TOO LONG" : "");
  console.log(
    String(r.title.length).padStart(4) +
      String(r.description.length).padStart(6) +
      "  " + r.route + flag
  );
  console.log("          " + r.title);
}

console.log("\n" + "-".repeat(100));
console.log(`Titles over ${TITLE_MAX}:       ${titleFails.length}`);
console.log(`Descriptions over ${DESCRIPTION_MAX}: ${descFails.length}`);

if (descFails.length) {
  console.log(`\nDescriptions Google will truncate ("|" marks the cut):`);
  for (const r of descFails) {
    console.log(`\n  ${r.description.length} chars  ${r.route}`);
    console.log(`        ${r.description.slice(0, DESCRIPTION_MAX)}|${r.description.slice(DESCRIPTION_MAX)}`);
  }
}

process.exitCode = titleFails.length || descFails.length ? 1 : 0;
