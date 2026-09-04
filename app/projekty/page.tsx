import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { publicProjectContent, publicProjectStatusCounts, type PublicProjectStatus } from "../project-content";

export const metadata: Metadata = {
  title: "Projekty v Přezleticích — Přezleťáci 2026",
  description: "Přehled 38 hotových, rozpracovaných a plánovaných projektů v Přezleticích.",
  alternates: { canonical: "/projekty" },
};

const statusOrder: PublicProjectStatus[] = ["Rozpracované", "Hotové", "Plánované"];
const statusLabels: Record<PublicProjectStatus, string> = {
  Hotové: "Hotové projekty",
  Rozpracované: "Na čem se pracuje",
  Plánované: "Co se plánuje",
};

const statusClass = (status: PublicProjectStatus) =>
  status === "Hotové" ? "complete" : status === "Rozpracované" ? "progress" : "planned";

export default function ProjectsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projekty v Přezleticích",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: publicProjectContent.length,
      itemListElement: publicProjectContent.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `/projekty/${project.slug}`,
      })),
    },
  };

  return (
    <main className="public-projects-page">
      <nav className="public-article-nav" aria-label="Navigace projektů">
        <Link href="/" className="public-article-brand">
          <Image src="/images/brand/prezletaci-symbol-blue.png" alt="" width={40} height={40} unoptimized />
          <span><strong>Přezleťáci</strong><small>Přezletice · 2026</small></span>
        </Link>
      </nav>

      <header className="public-projects-hero">
        <span>Přehled práce pro Přezletice</span>
        <h1>38 projektů. Přehledně a podle skutečného stavu.</h1>
        <p>Ukazujeme, co je hotové, na čem se pracuje a co se připravuje do dalších let.</p>
        <dl>
          <div><dt>Hotové</dt><dd>{publicProjectStatusCounts.Hotové}</dd></div>
          <div><dt>Rozpracované</dt><dd>{publicProjectStatusCounts.Rozpracované}</dd></div>
          <div><dt>Plánované</dt><dd>{publicProjectStatusCounts.Plánované}</dd></div>
        </dl>
      </header>

      {statusOrder.map((status) => {
        const projects = publicProjectContent.filter((project) => project.status === status);
        return (
          <section className="public-projects-section" key={status} aria-labelledby={`projects-${statusClass(status)}`}>
            <div className="public-projects-heading">
              <div><span>{status}</span><h2 id={`projects-${statusClass(status)}`}>{statusLabels[status]}</h2></div>
              <strong>{projects.length}</strong>
            </div>
            <div className="public-projects-grid">
              {projects.map((project) => (
                <Link className="public-project-card" href={`/projekty/${project.slug}`} key={project.id}>
                  {project.image ? (
                    <figure>
                      <Image src={project.image} alt={project.imageAlt ?? ""} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized />
                      {project.imageKind === "vizualizace" && <figcaption>Vizualizace</figcaption>}
                    </figure>
                  ) : (
                    <div className="public-project-abstract" aria-hidden="true"><span>{project.area.slice(0, 1)}</span></div>
                  )}
                  <div className="public-project-card-copy">
                    <span className={`public-project-status status-${statusClass(project.status)}`}>{project.status}</span>
                    <small>{project.area}</small>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <strong>Zobrazit stav projektu <span>→</span></strong>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
