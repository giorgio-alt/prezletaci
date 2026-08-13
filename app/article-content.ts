export type ArticleContent = {
  slug: string;
  title: string;
  status: "copy-ke-schvaleni";
  pillar: string;
  summary: string;
  markdownPath: string;
  primaryImage: string;
  galleryImages: string[];
  projectIds: number[];
  socialPostIds: number[];
  sourceLinks: string[];
  checks: string[];
};

export const articleContent: ArticleContent[] = [
  {
    slug: "zelen-v-prezleticich",
    title: "Jak se staráme o zeleň v Přezleticích",
    status: "copy-ke-schvaleni",
    pillar: "Hotová práce + Rozdělané věci + Plány",
    summary: "Publikovatelný článek o zeleni jako systému: průtahové komunikace, místní ulice, podzemní kontejnery, komunitní centrum a dlouhodobá péče.",
    markdownPath: "content/articles/zelen-v-prezleticich.md",
    primaryImage: "/images/projects/zelen-mistni-komunikace.webp",
    galleryImages: [
      "/images/projects/zelen-prutahove-komunikace.webp",
      "/images/projects/zelen-podzemni-kontejnery.webp",
      "/images/projects/hruskove-aleje-a-dalsi-zelen.webp",
      "/images/projects/dalsi-lokalni-zelen.webp",
      "/images/projects/komunitni-centrum-zlatak.webp",
    ],
    projectIds: [19, 20, 23, 24, 25, 34],
    socialPostIds: [140],
    sourceLinks: [
      "content/articles/zelen-v-prezleticich.md",
      "content-audit/03_vystupy/05_hotove_clanky_zelen_radnice.md",
      "TK2603-0192/zelen.docx",
    ],
    checks: [
      "Ověřit přesné označení etap u průtahových komunikací.",
      "Ověřit formulaci „šest let“ u trvalkovo-travinných záhonů.",
      "Potvrdit aktuální stav pasportu zeleně a plánu péče.",
    ],
  },
  {
    slug: "nova-radnice-centrum-obce",
    title: "Nová radnice jako nové centrum obce",
    status: "copy-ke-schvaleni",
    pillar: "Plány + Vysvětlujeme + Dokumenty a důkazy",
    summary: "Publikovatelný článek o architektonickém konceptu nové radnice jako propojení Horní návsi, prostoru Na Rynku, Dolní návsi a budoucího společenského centra.",
    markdownPath: "content/articles/nova-radnice-centrum-obce.md",
    primaryImage: "/images/projects/rekonstrukce-sokolovny.webp",
    galleryImages: [
      "/images/projects/komunitni-centrum-zlatak.webp",
      "/images/projects/elektronicka-uredni-deska.webp",
      "/images/projects/kaplicka-a-zvon.webp",
      "/images/brand/social/prezletaci-social-yellow.png",
    ],
    projectIds: [16, 34, 35, 3],
    socialPostIds: [141],
    sourceLinks: [
      "content/articles/nova-radnice-centrum-obce.md",
      "content-audit/03_vystupy/05_hotove_clanky_zelen_radnice.md",
      "TK2603-0192/Studie radnice.pdf",
    ],
    checks: [
      "Ověřit aktuální stav projektu a návazné kroky po architektonickém konceptu z 05/2024.",
      "Potvrdit, zda stále platí pracovní hodnoty 985 m² a 18 parkovacích stání.",
      "U částky 44,35 mil. Kč vždy uvádět, že jde o historický hrubý odhad ze studie.",
    ],
  },
];

export const articleContentBySlug = new Map(articleContent.map((article) => [article.slug, article]));
