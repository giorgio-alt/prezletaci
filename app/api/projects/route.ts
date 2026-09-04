import { publicProjectContent, publicProjectStatusCounts } from "../../project-content";

export async function GET() {
  return Response.json(
    {
      schemaVersion: 1,
      updatedAt: "2026-09-04",
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
