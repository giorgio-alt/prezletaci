import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleContent, articleContentBySlug, getArticleImageDescription } from "../../article-content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articleContent.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articleContentBySlug.get(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Přezleťáci 2026`,
    description: article.perex,
    alternates: { canonical: `/clanky/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.perex,
      type: "article",
      locale: "cs_CZ",
      images: [{ url: article.primaryImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.perex,
      images: [article.primaryImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articleContentBySlug.get(slug);
  if (!article) notFound();
  const cover = getArticleImageDescription(article, article.primaryImage);

  return (
    <main className="public-article-page">
      <nav className="public-article-nav" aria-label="Navigace článku">
        <Link href="/" className="public-article-brand">
          <Image src="/images/brand/prezletaci-symbol-blue.png" alt="" width={40} height={40} unoptimized />
          <span><strong>Přezleťáci</strong><small>Přezletice · 2026</small></span>
        </Link>
      </nav>

      <article className="public-article-shell">
        <header className="public-article-header">
          <div>
            <h1>{article.title}</h1>
            <p>{article.perex}</p>
          </div>
          <figure className="public-article-cover-frame">
            <div className="public-article-cover">
              <Image src={article.primaryImage} alt={cover.alt} fill priority sizes="(max-width: 900px) 100vw, 42vw" unoptimized />
            </div>
            {cover.caption && <figcaption>{cover.caption}</figcaption>}
          </figure>
        </header>

        <div className="public-article-body">
          {article.body.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>

        {article.galleryImages.length > 0 && (
          <section className="public-article-gallery" aria-labelledby="article-gallery-heading">
            <h2 id="article-gallery-heading">Fotografie a obrazové podklady</h2>
            <div>
              {article.galleryImages.map((image) => {
                const description = getArticleImageDescription(article, image);
                return (
                  <figure key={image}>
                    <div><Image src={image} alt={description.alt} fill sizes="(max-width: 700px) 100vw, 520px" unoptimized /></div>
                    {description.caption && <figcaption>{description.caption}</figcaption>}
                  </figure>
                );
              })}
            </div>
          </section>
        )}

        {article.publicSources?.length ? (
          <section className="public-article-sources" aria-labelledby="article-sources-heading">
            <h2 id="article-sources-heading">Veřejné zdroje</h2>
            <ul>{article.publicSources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a></li>)}</ul>
          </section>
        ) : null}

        <footer className="public-article-cta">
          <span>Další krok</span>
          <strong>{article.cta}</strong>
          <div>
            <Link href="/">Zpět na hlavní stránku</Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
