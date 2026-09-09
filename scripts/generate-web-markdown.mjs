import { writeFile } from "node:fs/promises";
import { AI_CONTEXT_MARKDOWN, WEB_BRIEF_MARKDOWN, WEB_HANDOFF_MARKDOWN } from "../app/web-content.ts";
import { PROJECTS_MARKDOWN } from "../app/project-content.ts";
import { PROGRAM_MARKDOWN } from "../app/program-content.ts";
import { articleContent, articleToMarkdown } from "../app/article-content.ts";

await Promise.all([
  writeFile(new URL("../WEB_BRIEF.md", import.meta.url), WEB_BRIEF_MARKDOWN, "utf8"),
  writeFile(new URL("../AI_CONTEXT.md", import.meta.url), AI_CONTEXT_MARKDOWN, "utf8"),
  writeFile(new URL("../content/projects/projekty-campaign-hq.md", import.meta.url), PROJECTS_MARKDOWN, "utf8"),
  writeFile(new URL("../content/web/WEB_HANDOFF.md", import.meta.url), WEB_HANDOFF_MARKDOWN, "utf8"),
  writeFile(new URL("../content/program/plan-pro-prezletice-2026-2030.md", import.meta.url), PROGRAM_MARKDOWN, "utf8"),
  ...articleContent.map((article) => {
    const markdown = articleToMarkdown(article);
    return writeFile(new URL(`../${article.markdownPath}`, import.meta.url), markdown, "utf8");
  }),
]);

console.log(`Generated WEB_BRIEF.md, AI_CONTEXT.md, project catalog, web handoff, program Markdown and ${articleContent.length} article Markdown files from structured Campaign HQ data`);
