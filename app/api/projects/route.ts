import { publicProjectContent, publicProjectsUpdatedAt, publicProjectStatusCounts } from "../../project-content";

export async function GET() {
  return Response.json(
    {
      schemaVersion: 2,
      updatedAt: publicProjectsUpdatedAt,
      markdown: "/content/projects.md",
      count: publicProjectContent.length,
      statusCounts: publicProjectStatusCounts,
      projects: publicProjectContent,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600",
      },
    },
  );
}
