import { PROJECTS_MARKDOWN } from "../../project-content";
import { PROGRAM_MARKDOWN } from "../../program-content";
import { WEB_HANDOFF_MARKDOWN } from "../../web-content";

type MarkdownRouteContext = {
  params: Promise<{ filename: string }>;
};

const markdownDocuments = new Map([
  ["projects.md", PROJECTS_MARKDOWN],
  ["program.md", PROGRAM_MARKDOWN],
  ["web-handoff.md", WEB_HANDOFF_MARKDOWN],
]);

export async function GET(_request: Request, { params }: MarkdownRouteContext) {
  const { filename } = await params;
  const markdown = markdownDocuments.get(filename);

  if (!markdown) {
    return new Response("Markdown document not found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(markdown, {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=3600",
      "content-disposition": `inline; filename="${filename}"`,
    },
  });
}
