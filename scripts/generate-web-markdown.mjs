import { writeFile } from "node:fs/promises";
import { AI_CONTEXT_MARKDOWN, WEB_BRIEF_MARKDOWN } from "../app/web-content.ts";

await Promise.all([
  writeFile(new URL("../WEB_BRIEF.md", import.meta.url), WEB_BRIEF_MARKDOWN, "utf8"),
  writeFile(new URL("../AI_CONTEXT.md", import.meta.url), AI_CONTEXT_MARKDOWN, "utf8"),
]);

console.log("Generated WEB_BRIEF.md and AI_CONTEXT.md from app/web-content.ts");
