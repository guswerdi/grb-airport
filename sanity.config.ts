import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

/**
 * NOTE: The Sanity project ID is a public value (it ships to the browser in
 * every client build), so a hardcoded fallback here is safe and guarantees
 * the Studio never crashes when env vars are missing in a hosting build.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "j1m80m30";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Great Bali Airport Transfer",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
