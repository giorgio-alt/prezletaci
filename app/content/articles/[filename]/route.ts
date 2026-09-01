import { articleContentBySlug, articleToMarkdown } from "../../../article-content";

type MarkdownRouteContext = {
  params: Promise<{ filename: string }>;
};

export async function GET(_request: Request, { params }: MarkdownRouteContext) {
  const { filename } = await params;
  const slug = filename.endsWith(".md") ? filename.slice(0, -3) : "";
  const article = articleContentBySlug.get(slug);

  if (!article) {
    return new Response("Markdown article not found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(articleToMarkdown(article), {
    status: 200,
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=300, s-maxage=3600",
      "content-disposition": `inline; filename="${article.slug}.md"`,
    },
  });
}
