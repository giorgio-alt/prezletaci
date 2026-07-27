import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host") ||
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description =
    "Interní Campaign HQ Přezleťáků pro komunální volby 2026.";

  return {
    metadataBase: new URL(origin),
    title: "Přezleťáci 2026 — Campaign HQ",
    description,
    openGraph: {
      title: "Přezleťáci 2026 — Campaign HQ",
      description,
      type: "website",
      locale: "cs_CZ",
      images: [{ url: `${origin}/og.png`, width: 1536, height: 914 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Přezleťáci 2026 — Campaign HQ",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
