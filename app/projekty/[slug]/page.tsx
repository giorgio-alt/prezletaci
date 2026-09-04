import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publicProjectBySlug, publicProjectContent, type PublicProjectStatus } from "../../project-content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publicProjectContent.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = publicProjectBySlug.get(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Projekty Přezleťáků`,
    description: project.summary,
    alternates: { canonical: `/projekty/${project.slug}` },
    openGraph: project.image ? { title: project.title, description: project.summary, images: [{ url: project.image }] } : undefined,
  };
}

const statusClass = (status: PublicProjectStatus) =>
  status === "Hotové" ? "complete" : status === "Rozpracované" ? "progress" : "planned";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = publicProjectBySlug.get(slug);
  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    dateModified: "2026-09-04",
    image: project.image,
  };

  return (
    <main className="public-article-page public-project-detail-page">
      <nav className="public-article-nav" aria-label="Navigace projektu">
        <Link href="/" className="public-article-brand">
          <Image src="/images/brand/prezletaci-symbol-blue.png" alt="" width={40} height={40} unoptimized />
          <span><strong>Přezleťáci</strong><small>Přezletice · 2026</small></span>
        </Link>
        <Link href="/projekty">Všechny projekty</Link>
      </nav>

      <article className="public-article-shell public-project-detail-shell">
        <header className={`public-project-detail-header detail-${statusClass(project.status)}`}>
          <div>
            <span className={`public-project-status status-${statusClass(project.status)}`}>{project.status}</span>
            <small>{project.area}</small>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </div>
          {project.image ? (
            <figure className="public-project-detail-image">
              <div><Image src={project.image} alt={project.imageAlt ?? ""} fill priority sizes="(max-width: 900px) 100vw, 44vw" unoptimized /></div>
              {project.imageKind === "vizualizace" && <figcaption>Vizualizace zamýšlené podoby</figcaption>}
            </figure>
          ) : <div className="public-project-detail-mark" aria-hidden="true"><span>{project.area.slice(0, 1)}</span></div>}
        </header>

        <div className="public-project-detail-body">
          <section>
            <h2>Aktuální stav</h2>
            {project.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          {project.milestones?.length ? (
            <section>
              <h2>Jednotlivé kroky</h2>
              <ul className="public-project-milestones">
                {project.milestones.map((milestone) => <li key={milestone.label}><span className={`milestone-${milestone.state}`}>{milestone.state}</span><strong>{milestone.label}</strong></li>)}
              </ul>
            </section>
          ) : null}

          {project.sourceUrls?.length ? (
            <section>
              <h2>Veřejné podklady</h2>
              <ul className="public-project-sources">
                {project.sourceUrls.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}
              </ul>
            </section>
          ) : null}
        </div>

        <footer className="public-article-cta">
          <span>Přehled projektů</span>
          <strong>Podívejte se také na další hotové, rozpracované a plánované projekty.</strong>
          <div><Link href="/projekty">Zpět na všechny projekty</Link></div>
        </footer>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
