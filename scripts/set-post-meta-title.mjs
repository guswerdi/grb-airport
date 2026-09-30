/**
 * One-off: add the short `metaTitle` to the already-existing blog post so its
 * <title> stays inside Google's ~60 char limit, while the long descriptive
 * `title` keeps driving the on-page H1.
 *
 * Uses a `patch` mutation (not `documents create`, which refuses to overwrite an
 * existing document id). The write token is read from the logged-in Sanity CLI
 * session (`npx sanity login`) and is never printed.
 *
 * Run: node scripts/set-post-meta-title.mjs
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j1m80m30";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-10-01";
const documentId = "post-bali-airport-transfer-guide";

/** 54 chars - see the meta title audit for the length budget. */
const META_TITLE = "Bali Airport Transfer Guide 2026: DPS Prices & Options";

if (META_TITLE.length > 60) {
  throw new Error(`metaTitle is ${META_TITLE.length} chars, must be <= 60`);
}

function sanityCli(args) {
  const quoted = args.map((arg) => (/\s/.test(arg) ? `"${arg}"` : arg));
  const result = spawnSync("npx", ["--no-install", "sanity", ...quoted], {
    cwd: projectRoot,
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`sanity ${args.join(" ")} failed (${result.status})`);
  }
  return result.stdout ?? "";
}

function extractJson(output) {
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error(`No JSON:\n${output}`);
  return JSON.parse(output.slice(start, end + 1));
}

function readCliToken() {
  const configPath = path.join(
    process.env.USERPROFILE || process.env.HOME || "",
    ".config",
    "sanity",
    "config.json"
  );
  const token = JSON.parse(readFileSync(configPath, "utf8")).authToken;
  if (!token) {
    throw new Error("No Sanity CLI authToken found. Run `npx sanity login` first.");
  }
  return token;
}

const before = extractJson(
  sanityCli(["documents", "get", documentId, "--dataset", dataset])
);

console.log(`Document:   ${before._id}`);
console.log(`H1 title:   ${before.title} (${before.title.length} chars)`);
console.log(`Meta title: ${META_TITLE} (${META_TITLE.length} chars)`);

const response = await fetch(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${readCliToken()}`,
    },
    body: JSON.stringify({
      mutations: [{ patch: { id: documentId, set: { metaTitle: META_TITLE } } }],
    }),
  }
);

if (!response.ok) {
  throw new Error(`Mutation failed (${response.status}): ${await response.text()}`);
}

const after = extractJson(
  sanityCli(["documents", "get", documentId, "--dataset", dataset])
);

console.log(`\nStored metaTitle: ${after.metaTitle ?? "MISSING"}`);
console.log(`Stored title:     ${after.title}`);
