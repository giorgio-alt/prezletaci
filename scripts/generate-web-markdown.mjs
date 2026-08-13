import { writeFile } from "node:fs/promises";
import { AI_CONTEXT_MARKDOWN, WEB_BRIEF_MARKDOWN } from "../app/web-content.ts";
import { PROGRAM_MARKDOWN } from "../app/program-content.ts";

await Promise.all([
  writeFile(new URL("../WEB_BRIEF.md", import.meta.url), WEB_BRIEF_MARKDOWN, "utf8"),
  writeFile(new URL("../AI_CONTEXT.md", import.meta.url), AI_CONTEXT_MARKDOWN, "utf8"),
  writeFile(new URL("../content/program/plan-pro-prezletice-2026-2030.md", import.meta.url), PROGRAM_MARKDOWN, "utf8"),
]);

console.log("Generated WEB_BRIEF.md, AI_CONTEXT.md and program Markdown from structured Campaign HQ data");
