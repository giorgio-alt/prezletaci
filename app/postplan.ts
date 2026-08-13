export type ContentType = "people" | "completed" | "progress" | "future" | "explain" | "evidence";

export type SocialPost = {
  id: number;
  date: string;
  title: string;
  contentType?: ContentType;
  pillar: "Lidé" | "Práce" | "Rozdělané" | "Plány" | "Vysvětlování";
  format: "Post" | "Carousel" | "Video" | "Story" | "Reels";
  status: "Námět" | "Copy" | "Grafika" | "Ke schválení" | "Naplánováno" | "Publikováno";
  author: string;
  graphic: string;
  copy: string;
  approval: string;
  articleSlug?: string;
  websiteItemId?: string;
  primaryImage?: string;
  galleryImages?: string[];
  draftLink?: string;
};

// Zdroj: Prezletaci_2026_Postplan_Kalendar.xlsx (listy August, September, October).
// Tabulka nedokládá formát ani produkční stav. Proto je formát technicky veden jako
// obecný Post a všechny produkční údaje zůstávají transparentně ve stavu Čeká/Námět.
export const initialPosts: SocialPost[] = [
  { id: 101, date: "2026-08-01", title: "Start kampaně", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 102, date: "2026-08-04", title: "Medailonek 1", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 103, date: "2026-08-07", title: "Výsledky", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 104, date: "2026-08-11", title: "Medailonek 2", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 105, date: "2026-08-14", title: "Svazková škola", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 106, date: "2026-08-16", title: "Škola v datech", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 107, date: "2026-08-18", title: "Medailonek 3", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 108, date: "2026-08-21", title: "Sport", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 109, date: "2026-08-23", title: "Relax zóna", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 110, date: "2026-08-25", title: "Medailonek 4", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 111, date: "2026-08-28", title: "Parčík", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 112, date: "2026-08-30", title: "Parčík stav", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 113, date: "2026-09-01", title: "Medailonek 5", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 114, date: "2026-09-03", title: "Rozšíření školy", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 115, date: "2026-09-05", title: "Proč škola trvá", contentType: "explain", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 116, date: "2026-09-08", title: "Medailonek 6", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 117, date: "2026-09-10", title: "Bezpečnost", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 118, date: "2026-09-12", title: "Komunikace", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 119, date: "2026-09-13", title: "Mapa projektů", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 120, date: "2026-09-15", title: "Medailonek 7", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 121, date: "2026-09-17", title: "Development", contentType: "explain", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 122, date: "2026-09-19", title: "Více zeleně", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 123, date: "2026-09-20", title: "Územní plán", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 124, date: "2026-09-22", title: "Medailonek 8", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 125, date: "2026-09-24", title: "Sokolovna", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 126, date: "2026-09-26", title: "Komunita", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 127, date: "2026-09-27", title: "Medailonek 9", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 128, date: "2026-09-29", title: "Obecní policie", contentType: "explain", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 129, date: "2026-09-30", title: "Digitalizace", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 130, date: "2026-10-01", title: "Medailonek 10", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 131, date: "2026-10-02", title: "Infrastruktura", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 132, date: "2026-10-03", title: "Financování", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 133, date: "2026-10-04", title: "Medailonek 11", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 134, date: "2026-10-05", title: "Celý tým", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 135, date: "2026-10-06", title: "Shrnutí výsledků", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 136, date: "2026-10-07", title: "Co dotáhneme", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 137, date: "2026-10-08", title: "Program", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 138, date: "2026-10-09", title: "Jak volit", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 139, date: "2026-10-10", title: "Volby", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  { id: 140, date: "2026-09-18", title: "Jak se staráme o zeleň v Přezleticích", contentType: "completed", pillar: "Práce", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "zelen-v-prezleticich", websiteItemId: "article-zelen-v-prezleticich", primaryImage: "/images/projects/zelen-mistni-komunikace.webp", galleryImages: ["/images/projects/zelen-prutahove-komunikace.webp", "/images/projects/zelen-podzemni-kontejnery.webp", "/images/projects/hruskove-aleje-a-dalsi-zelen.webp", "/images/projects/dalsi-lokalni-zelen.webp", "/images/projects/komunitni-centrum-zlatak.webp"], draftLink: "content/articles/zelen-v-prezleticich.md" },
  { id: 141, date: "2026-09-25", title: "Nová radnice jako nové centrum obce", contentType: "future", pillar: "Plány", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "nova-radnice-centrum-obce", websiteItemId: "article-nova-radnice-centrum-obce", primaryImage: "/images/projects/rekonstrukce-sokolovny.webp", galleryImages: ["/images/projects/komunitni-centrum-zlatak.webp", "/images/projects/elektronicka-uredni-deska.webp", "/images/projects/kaplicka-a-zvon.webp", "/images/brand/social/prezletaci-social-yellow.png"], draftLink: "content/articles/nova-radnice-centrum-obce.md" },
];

// Výchozí demonstrační položky verze 3. Při migraci se odstraní pouze tehdy,
// pokud zůstaly zcela beze změny. Jakákoli uživatelská úprava se zachová.
export const legacyInitialPosts: SocialPost[] = [
  { id: 1, date: "2026-08-03", title: "Přezleťáci znovu a otevřeně", pillar: "Lidé", format: "Carousel", status: "Copy", author: "Copy", graphic: "Čeká", copy: "Rozpracováno", approval: "Ne" },
  { id: 2, date: "2026-08-10", title: "Jan Macourek: proč dotahuji stavby", pillar: "Lidé", format: "Video", status: "Námět", author: "Produkce", graphic: "Shotlist", copy: "Brief", approval: "Ne" },
  { id: 3, date: "2026-08-17", title: "Dlouhý park: kde právě jsme", pillar: "Rozdělané", format: "Post", status: "Grafika", author: "Copy", graphic: "Rozpracováno", copy: "Hotovo", approval: "Ne" },
  { id: 4, date: "2026-08-24", title: "Proč některé projekty trvají déle", pillar: "Vysvětlování", format: "Carousel", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Osnova", approval: "Ne" },
  { id: 5, date: "2026-08-31", title: "Pět konkrétních kroků pro více zeleně", pillar: "Plány", format: "Carousel", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Ne" },
  { id: 6, date: "2026-09-07", title: "Škola: kapacita dnes a další krok", pillar: "Vysvětlování", format: "Video", status: "Námět", author: "Produkce", graphic: "—", copy: "Brief", approval: "Ne" },
  { id: 7, date: "2026-09-14", title: "Bezpečnější a klidnější doprava", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Ne" },
  { id: 8, date: "2026-09-21", title: "Jak hlídáme tempo nové výstavby", pillar: "Vysvětlování", format: "Carousel", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Ne" },
  { id: 9, date: "2026-09-28", title: "Sportoviště u školy: fakta a harmonogram", pillar: "Rozdělané", format: "Reels", status: "Námět", author: "Produkce", graphic: "Shotlist", copy: "Čeká", approval: "Ne" },
  { id: 10, date: "2026-10-02", title: "Co jsme dotáhli", pillar: "Práce", format: "Carousel", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Ne" },
  { id: 11, date: "2026-10-05", title: "Plán pro roky 2026–2030", pillar: "Plány", format: "Video", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Ne" },
  { id: 12, date: "2026-10-08", title: "Jedenáct lidí, jedna obec", pillar: "Lidé", format: "Reels", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Ne" },
];

export const sortPosts = (posts: SocialPost[]) => [...posts].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);

const comparisonFields: (keyof SocialPost)[] = ["id", "date", "title", "pillar", "format", "status", "author", "graphic", "copy", "approval"];

const isUntouchedLegacyDefault = (post: SocialPost) => {
  const legacy = legacyInitialPosts.find((candidate) => candidate.id === post.id);
  return Boolean(legacy && comparisonFields.every((field) => post[field] === legacy[field]));
};

export function mergePostsWithPlan(savedPosts: SocialPost[], savedVersion = 4) {
  const merged = new Map(initialPosts.map((post) => [post.id, post]));
  const preserved = savedVersion < 4 ? savedPosts.filter((post) => !isUntouchedLegacyDefault(post)) : savedPosts;
  for (const post of preserved) merged.set(post.id, post);
  return sortPosts([...merged.values()]);
}
