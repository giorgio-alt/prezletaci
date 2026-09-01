import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleContent, articleContentBySlug } from "../../article-content";

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
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articleContentBySlug.get(slug);
  if (!article) notFound();

  const markdownUrl = `/${article.markdownPath}`;

  return (
    <main className="public-article-page">
      <nav className="public-article-nav" aria-label="Navigace článku">
        <Link href="/" className="public-article-brand">
          <Image src="/images/brand/prezletaci-symbol-blue.png" alt="" width={40} height={40} unoptimized />
          <span><strong>Přezleťáci</strong><small>Campaign HQ · 2026</small></span>
        </Link>
        <a href={markdownUrl} type="text/markdown">Číst jako Markdown</a>
      </nav>

      <article className="public-article-shell">
        <header className="public-article-header">
          <div>
            <span className="eyebrow">{article.pillar}</span>
            <h1>{article.title}</h1>
            <p>{article.perex}</p>
          </div>
          <div className="public-article-cover">
            <Image src={article.primaryImage} alt={`Úvodní fotografie článku ${article.title}`} fill priority sizes="(max-width: 900px) 100vw, 42vw" unoptimized />
          </div>
        </header>

        <div className="public-article-body">
          {article.body.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </div>

        <footer className="public-article-cta">
          <span>Další krok</span>
          <strong>{article.cta}</strong>
          <div>
            <a href={markdownUrl} type="text/markdown">Markdown pro další zpracování</a>
            <Link href="/">Zpět do Campaign HQ</Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
