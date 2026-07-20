export type BriefSection = {
  id: string;
  title: string;
  summary?: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  status: "draft" | "review" | "approved";
  updatedAt: string;
};

export type WebsiteContentStatus =
  | "Nápad"
  | "Čeká na zadání"
  | "Čeká na podklady"
  | "Podklady připraveny"
  | "Copy v přípravě"
  | "Copy ke schválení"
  | "Schváleno"
  | "Předáno webdesignerovi"
  | "Ve vývoji"
  | "Připraveno k publikaci"
  | "Publikováno"
  | "Vyžaduje aktualizaci"
  | "Pozastaveno";

export type WebsitePriority = "Kritická" | "Vysoká" | "Střední" | "Nízká";

export type WebsiteContentItem = {
  id: string;
  title: string;
  pageType: string;
  section: string;
  purpose: string;
  pillar: string;
  status: WebsiteContentStatus;
  priority: WebsitePriority;
  owner: string;
  deadline: string;
  candidateIds?: number[];
  projectIds?: number[];
  sourceLinks: string[];
  draftLink: string;
  notes: string;
  blockers: string[];
  readiness: number;
  checklist?: { label: string; available: boolean }[];
};

export type WebBlocker = {
  id: string;
  title: string;
  description: string;
  severity: "Kritická" | "Vysoká" | "Střední";
  owner: string;
  status: "Nové" | "K rozhodnutí" | "Čeká na podklady" | "V řešení" | "Vyřešeno" | "Odloženo";
  nextStep: string;
};

export type WebOpenIssue = {
  id: string;
  title: string;
  description: string;
  status: WebBlocker["status"];
  priority: WebsitePriority;
  owner: string;
  deadline: string;
  note: string;
};

export const campaignCandidateNames = [
  "Tomáš Říha",
  "Jan Macourek",
  "Romana Bernardová",
  "Ing. Lenka Bulová",
  "Ing. Jan Káňa",
  "Pavel Řeřucha",
  "Václav Šmerda",
  "Ing. arch. Břetislav Lukeš",
  "Lenka Brožová",
  "Mgr. Bc. Jakub Tříska",
  "Vojta Brož",
] as const;

const updatedAt = "20. 7. 2026";

export const webBriefSections: BriefSection[] = [
  {
    id: "purpose",
    title: "Úvod a účel dokumentu",
    summary: "Obsahový a strategický brief pro vznik volebního webu Přezleťáků 2026.",
    paragraphs: [
      "Tato část Campaign HQ slouží jako obsahový a strategický brief pro vznik volebního webu Přezleťáků 2026.",
      "Nediktuje design ani konkrétní technické řešení. Vysvětluje smysl webu, jeho roli v kampani, strukturu obsahu, charakter komunikace, hlavní témata, vztah k sociálním sítím a očekávanou cestu návštěvníka.",
    ],
    status: "approved",
    updatedAt,
  },
  {
    id: "role",
    title: "Role webu v kampani",
    summary: "Web je hlavní komunikační platforma; sociální sítě jsou distribuční kanály.",
    paragraphs: [
      "Web bude centrálním zdrojem kompletních informací, místem pro vysvětlení složitějších témat, archivem výsledků, plánů, dokumentů a argumentů a dlouhodobou znalostní bází kampaně.",
      "Facebook, Instagram a případně YouTube mají zaujmout, otevřít téma a přivést návštěvníka na web. Na sociálních sítích je zkrácená verze sdělení; na webu celý příběh, kontext, dokumenty, fotografie a související informace.",
    ],
    status: "approved",
    updatedAt,
  },
  {
    id: "not-web",
    title: "Co web není",
    summary: "Otevřená informační platforma, nikoli agresivní politická prezentace.",
    bullets: [
      "Klasický obecní web",
      "Jednorázová volební landing page",
      "Agresivní politická prezentace",
      "Katalog prázdných slibů",
      "Prostor pro útoky na politické soupeře",
      "Soubor marketingových sloganů bez obsahu",
    ],
    paragraphs: ["Web má působit jako otevřená, důvěryhodná a obsahově bohatá informační platforma."],
    status: "approved",
    updatedAt,
  },
  {
    id: "philosophy",
    title: "Filozofie kampaně",
    summary: "Sebevědomá, důkazová a transparentní komunikace bez útoků a strašení.",
    paragraphs: [
      "Přezleťáci nestaví komunikaci na útocích, strašení, osobních konfliktech, populismu, prázdných politických heslech ani účelovém zkreslování informací.",
      "Kampaň stojí na dlouhodobě odvedené práci, konkrétních výsledcích, zkušenostech, důvěře, transparentnosti, vysvětlování, dokumentech a důkazech, realistických plánech a osobní znalosti obce.",
      "Komunikace má být sebevědomá, ale ne agresivní.",
    ],
    status: "approved",
    updatedAt,
  },
  {
    id: "principle",
    title: "Hlavní komunikační princip",
    summary: "Nevyčíslovat jen výsledek, ale vysvětlit celý příběh a navazující krok.",
    paragraphs: ["Nechceme pouze říkat, co jsme udělali. Chceme vysvětlit, proč to vzniklo, jak se k výsledku došlo, co to obci přineslo a jak na to chceme navázat."],
    bullets: ["Výchozí situace", "Problém nebo potřeba", "Rozhodnutí", "Proces", "Výsledek", "Dopad na obec", "Dokumenty nebo důkazy", "Navazující plán"],
    status: "approved",
    updatedAt,
  },
  {
    id: "pillars",
    title: "Komunikační pilíře",
    summary: "Šest rozpoznatelných typů obsahu odpovídá na šest základních otázek občana.",
    bullets: [
      "Lidé — Kdo jsou lidé, kteří chtějí obec vést?",
      "Hotová práce — Co Přezleťáci skutečně udělali?",
      "Rozdělané věci — Na čem se právě pracuje a proč to ještě není hotové?",
      "Plány — Co chtějí Přezleťáci udělat dál?",
      "Vysvětlujeme — Jaká je skutečná situace a proč obec postupovala právě takto?",
      "Dokumenty a důkazy — Na základě čeho toto tvrzení vzniklo?",
    ],
    status: "approved",
    updatedAt,
  },
  {
    id: "structure",
    title: "Navrhovaná obsahová struktura webu",
    summary: "Pracovní obsahová logika, kterou může webdesigner uspořádat vhodnějším způsobem.",
    bullets: [
      "Homepage — kdo jsme, výsledky, kandidáti, rozdělané projekty, program a aktuální vysvětlení",
      "Lidé — tým, profily, zkušenosti, motivace, témata a odpovědnosti",
      "Hotová práce — dokončené projekty, dopad, fotografie a důkazy",
      "Rozdělané věci — aktuální stav, překážky, další kroky a časový vývoj",
      "Plány — program, priority, návaznost na současnou práci a konkrétní cíle",
      "Vysvětlujeme — citlivá témata, FAQ, historické souvislosti a rozhodnutí",
      "Historie — vývoj Přezleťáků a věcně doložené momenty obce",
      "Dokumenty — zdroje zasazené do kontextu konkrétních témat",
      "Kontakt a zapojení — kontakty, otázky, setkání a výzva k dialogu",
    ],
    status: "review",
    updatedAt,
  },
  {
    id: "journey",
    title: "Storytelling a cesta návštěvníka",
    summary: "Během několika minut musí být zřejmá kontinuita, kompetence, transparentnost a otevřenost.",
    numbered: [
      "Přezleťáci nejsou nový nebo náhodně vytvořený volební projekt.",
      "Mají za sebou dlouhodobou práci ve vedení obce.",
      "Dokážou ukázat konkrétní výsledky.",
      "Přiznávají, že některé projekty stále probíhají nebo nebyly jednoduché.",
      "Mají tým lidí s různou expertizou.",
      "Mají realistický plán na další období.",
      "Svá tvrzení jsou připraveni doložit.",
      "Jsou otevřeni otázkám a dialogu.",
    ],
    paragraphs: ["Po návštěvě webu by si člověk měl odnést pocit klidu, důvěry, kompetence, otevřenosti, kontinuity a transparentnosti."],
    status: "approved",
    updatedAt,
  },
  {
    id: "candidates",
    title: "Kandidáti",
    summary: "Každý profil je samostatný příběh a zároveň součást jednoho týmu.",
    bullets: ["Jméno a pozice", "Profese a fotografie", "Krátké představení", "Vztah k Přezleticím", "Osobní motivace", "Témata", "Související projekty a články", "Fotografie", "Video nebo rozhovor"],
    status: "review",
    updatedAt,
  },
  {
    id: "projects",
    title: "Projekty",
    summary: "Projektové příběhy jsou hlavní obsahovou jednotkou webu.",
    bullets: ["Název a shrnutí", "Kategorie", "Výchozí problém a důvod vzniku", "Historický kontext a průběh", "Aktuální stav", "Výsledek a přínos", "Časová osa", "Fotografie a videa", "Dokumenty a FAQ", "Související kandidáti, články a projekty"],
    paragraphs: ["Ne každý projekt musí využít všechny části. Rozsah se řídí dostupnými a ověřenými podklady."],
    status: "review",
    updatedAt,
  },
  {
    id: "sensitive",
    title: "Citlivá témata",
    summary: "Věcně, klidně, srozumitelně, bez osobních útoků a s doložením zdrojů.",
    numbered: ["Co se řeší", "Proč je téma důležité", "Jaká je historie", "Co obec mohla a nemohla ovlivnit", "Jaké kroky byly provedeny", "Jaký je aktuální stav", "Co bude následovat", "Jaké dokumenty tvrzení dokládají", "Odpovědi na nejčastější otázky"],
    status: "approved",
    updatedAt,
  },
  {
    id: "tone",
    title: "Tone of Voice",
    summary: "Lidský, klidný, sebevědomý, konkrétní, srozumitelný a transparentní.",
    paragraphs: [
      "Používat krátké a jasné věty, konkrétní příklady, ověřená čísla, vysvětlení souvislostí, přirozený jazyk a jasně oddělená fakta a názory.",
      "Nepoužívat politické fráze, přehnané superlativy, populistické sliby, agresivní titulky, clickbait, zesměšňování soupeřů, nepodložená tvrzení ani úřednický jazyk bez vysvětlení.",
    ],
    status: "approved",
    updatedAt,
  },
  {
    id: "ecosystem",
    title: "Propojení webu a sociálních sítí",
    summary: "Web obsahuje plnou informaci; sociální sítě vybírají nejsilnější část a vedou k detailu.",
    bullets: ["Webová stránka nebo článek", "Statický příspěvek", "Carousel", "Krátké video nebo Reel", "Rozhovor", "FAQ", "Infografika", "Dokumentový příspěvek"],
    paragraphs: ["Ne každý příspěvek musí odkazovat na web. U zásadních, vysvětlujících a projektových témat má být web hlavním cílem."],
    status: "approved",
    updatedAt,
  },
  {
    id: "workflow",
    title: "Obsahové workflow",
    summary: "Jeden dohledatelný proces od nápadu po aktualizaci.",
    numbered: ["Nápad", "Shromáždění podkladů", "Příprava webového obsahu", "Kontrola faktů a dokumentů", "Schválení", "Publikace na webu", "Příprava výstupů pro sociální sítě", "Distribuce", "Archivace a případná aktualizace"],
    status: "review",
    updatedAt,
  },
  {
    id: "open-issues",
    title: "Otevřené body",
    summary: "Živá evidence rozhodnutí, dotazů, chybějících podkladů a změn rozsahu.",
    paragraphs: ["Každý bod má název, popis, stav, prioritu, odpovědnou osobu, termín a poznámku. Evidence je zobrazena přímo pod briefem."],
    status: "draft",
    updatedAt,
  },
];

export const baseWebsiteContentItems: WebsiteContentItem[] = [
  { id: "page-home", title: "Homepage", pageType: "Landing page", section: "Homepage", purpose: "Rychle vysvětlit, kdo jsou Přezleťáci, co mají za sebou a proč kandidují znovu.", pillar: "Lidé", status: "Čeká na podklady", priority: "Kritická", owner: "Web + Copy", deadline: "3. 8. 2026", sourceLinks: ["Campaign Bible", "Campaign HQ"], draftLink: "Čeká na návrh", notes: "Základní verze musí propojit lidi, výsledky, projekty a program.", blockers: ["Neschválený text homepage", "Finální vizuální identita"], readiness: 35 },
  { id: "page-people", title: "Lidé", pageType: "Kategorie", section: "Lidé", purpose: "Představit jedenáct kandidátů jako tým lidí s různou expertizou.", pillar: "Lidé", status: "Podklady připraveny", priority: "Kritická", owner: "Copy + Produkce", deadline: "8. 8. 2026", sourceLinks: ["Modul Kandidáti"], draftLink: "Campaign HQ / Kandidáti", notes: "Přehledová stránka čerpá ze všech profilů kandidátů.", blockers: ["Chybějící texty většiny profilů"], readiness: 52 },
  { id: "page-results", title: "Hotová práce", pageType: "Kategorie", section: "Hotová práce", purpose: "Doložit kompetenci konkrétními výsledky, dopadem a důkazy.", pillar: "Hotová práce", status: "Čeká na podklady", priority: "Kritická", owner: "PM + Copy", deadline: "10. 8. 2026", sourceLinks: ["Modul Projekty", "Dokumenty"], draftLink: "Campaign HQ / Projekty", notes: "Vybrat nejsilnější dokončené projekty.", blockers: ["Fotografie hotových projektů"], readiness: 38 },
  { id: "page-progress", title: "Rozdělané věci", pageType: "Kategorie", section: "Rozdělané věci", purpose: "Transparentně vysvětlit aktuální stav, překážky a další kroky.", pillar: "Rozdělané věci", status: "Copy v přípravě", priority: "Vysoká", owner: "PM + Copy", deadline: "12. 8. 2026", sourceLinks: ["Modul Projekty", "Timeline"], draftLink: "Campaign HQ / Projekty", notes: "Aktualizace musí být datovaná.", blockers: ["Chybějící harmonogramy"], readiness: 46 },
  { id: "page-plans", title: "Plány 2026–2030", pageType: "Kategorie", section: "Plány", purpose: "Převést program do realistických priorit a prvních kroků.", pillar: "Plány", status: "Copy v přípravě", priority: "Kritická", owner: "PM + Copy", deadline: "14. 8. 2026", sourceLinks: ["Volby 2026 program.docx"], draftLink: "Campaign HQ / Projekty", notes: "Program členit podle oblastí a vazeb na rozpracovanou práci.", blockers: ["Nejasná struktura programu"], readiness: 52 },
  { id: "page-explain", title: "Vysvětlujeme", pageType: "Kategorie", section: "Vysvětlujeme", purpose: "Nabídnout klidný kontext ke složitým a citlivým tématům.", pillar: "Vysvětlujeme", status: "Čeká na zadání", priority: "Vysoká", owner: "Copy + PM", deadline: "17. 8. 2026", sourceLinks: ["Campaign Bible", "Dokumenty"], draftLink: "Čeká na osnovu", notes: "Začít školou, developmentem a územním plánem.", blockers: ["Nezpracovaná citlivá témata"], readiness: 22 },
  { id: "page-history", title: "Historie", pageType: "Historická stránka", section: "Historie", purpose: "Věcně popsat vývoj Přezleťáků a tři volební období práce.", pillar: "Dokumenty a důkazy", status: "Čeká na podklady", priority: "Střední", owner: "Copy + Klient", deadline: "20. 8. 2026", sourceLinks: ["Dokumenty", "Zápisy"], draftLink: "Čeká na chronologii", notes: "Tvrzení o dalších subjektech musí mít konkrétní doklad.", blockers: ["Chybějící historické podklady"], readiness: 18 },
  { id: "page-documents", title: "Dokumenty", pageType: "Dokument", section: "Dokumenty", purpose: "Zpřístupnit zdroje vždy v kontextu konkrétního tématu.", pillar: "Dokumenty a důkazy", status: "Čeká na podklady", priority: "Vysoká", owner: "PM", deadline: "18. 8. 2026", sourceLinks: ["Modul Dokumenty"], draftLink: "Campaign HQ / Dokumenty", notes: "Nevytvářet neuspořádaný seznam PDF.", blockers: ["Nedodané dokumenty a mapy"], readiness: 24 },
  { id: "page-contact", title: "Kontakt a zapojení", pageType: "Kontakt", section: "Kontakt", purpose: "Nabídnout možnost zaslat otázku a přijít na osobní setkání.", pillar: "Lidé", status: "Nápad", priority: "Střední", owner: "Web + Klient", deadline: "20. 8. 2026", sourceLinks: ["Sociální sítě", "Timeline"], draftLink: "Čeká na zadání", notes: "Kontakty a termíny musí být před publikací ověřené.", blockers: ["Chybějící kontaktní údaje"], readiness: 15 },
];

export const webOpenIssues: WebOpenIssue[] = [
  { id: "issue-home", title: "Schválit obsahovou prioritu homepage", description: "Rozhodnout, které tři výsledky a které rozdělané téma dostanou nejvyšší viditelnost.", status: "K rozhodnutí", priority: "Kritická", owner: "Klient + PM", deadline: "25. 7. 2026", note: "Bez rozhodnutí nelze uzavřít informační hierarchii." },
  { id: "issue-brand", title: "Dodat finální vizuální identitu", description: "Komponenty používají centrální pracovní tokeny a čekají na brand manuál Karla Hemzy.", status: "Čeká na podklady", priority: "Vysoká", owner: "Klient", deadline: "31. 7. 2026", note: "Struktura Campaign HQ se kvůli paletě měnit nebude." },
  { id: "issue-program", title: "Potvrdit strukturu programu", description: "Rozhodnout, zda program členit primárně podle devíti oblastí, nebo podle nejsilnějších priorit.", status: "K rozhodnutí", priority: "Vysoká", owner: "PM + Klient", deadline: "28. 7. 2026", note: "Doporučení: oblast + vybrané priority + první konkrétní krok." },
  { id: "issue-sensitive", title: "Vybrat první citlivá témata", description: "Určit pořadí zpracování školy, developmentu, územního plánu a dopravy.", status: "Nové", priority: "Vysoká", owner: "PM + Copy", deadline: "29. 7. 2026", note: "Každé téma potřebuje faktickou osnovu a seznam zdrojů." },
];

export const webBlockers: WebBlocker[] = [
  { id: "block-home", title: "Neschválený text homepage", description: "Chybí finální výběr priorit a hlavní úvodní sdělení.", severity: "Kritická", owner: "Klient + Copy", status: "K rozhodnutí", nextStep: "Schválit tři hlavní vstupy homepage a připravit první copy." },
  { id: "block-project-photo", title: "Fotografie projektů", description: "U hotových a rozpracovaných projektů chybí vizuální důkazy a fotografie před / po.", severity: "Kritická", owner: "Klient + Produkce", status: "Čeká na podklady", nextStep: "Dodat prioritní fotografie a přiřadit je ke kartám projektů." },
  { id: "block-documents", title: "Dokumenty, mapy a usnesení", description: "Důkazová vrstva zatím nemá kompletní zdrojové materiály.", severity: "Vysoká", owner: "Klient + PM", status: "Čeká na podklady", nextStep: "Založit balíčky dokumentů ke škole, dopravě a rozpracovaným projektům." },
  { id: "block-program", title: "Struktura programu", description: "Program obsahuje více než padesát záměrů a potřebuje obsahovou hierarchii.", severity: "Vysoká", owner: "PM + Copy", status: "V řešení", nextStep: "Vybrat 10–12 priorit a přiřadit první proveditelný krok." },
  { id: "block-sensitive", title: "Nezpracovaná citlivá témata", description: "Škola, development a územní plán nemají hotovou faktickou osnovu.", severity: "Vysoká", owner: "Copy + PM", status: "Nové", nextStep: "Připravit chronologii, kompetence obce, aktuální stav a zdroje." },
  { id: "block-brand", title: "Finální vizuální identita", description: "Campaign HQ používá dočasnou pracovní paletu, kterou bude potřeba centrálně nahradit.", severity: "Střední", owner: "Klient + Karel Hemza", status: "Čeká na podklady", nextStep: "Po dodání brand manuálu aktualizovat pouze centrální design tokeny." },
];

const markdownList = (items?: string[]) => items?.map((item) => `- ${item}`).join("\n") ?? "";
const markdownNumbered = (items?: string[]) => items?.map((item, index) => `${index + 1}. ${item}`).join("\n") ?? "";

export function buildWebBriefMarkdown() {
  const sections = webBriefSections.map((section) => {
    const parts = [`## ${section.title}`];
    if (section.summary) parts.push(section.summary);
    if (section.paragraphs?.length) parts.push(section.paragraphs.join("\n\n"));
    if (section.bullets?.length) parts.push(markdownList(section.bullets));
    if (section.numbered?.length) parts.push(markdownNumbered(section.numbered));
    parts.push(`_Stav: ${section.status} · Aktualizováno: ${section.updatedAt}_`);
    return parts.join("\n\n");
  }).join("\n\n---\n\n");

  const issues = webOpenIssues.map((issue) => `### ${issue.title}\n\n- Stav: ${issue.status}\n- Priorita: ${issue.priority}\n- Odpovědnost: ${issue.owner}\n- Termín: ${issue.deadline}\n- Popis: ${issue.description}\n- Poznámka: ${issue.note}`).join("\n\n");

  return `# Přezleťáci 2026 – Web Brief\n\nTento dokument je generovaný ze stejného strukturovaného zdroje jako sekce Web v Campaign HQ. Slouží jako obsahový a strategický brief; nediktuje design ani technické řešení výsledného volebního webu.\n\n${sections}\n\n---\n\n## Živé otevřené body\n\n${issues}\n`;
}

export function buildAiContextMarkdown() {
  return `# Přezleťáci 2026 – AI Context\n\n## Projekt\n\nPřezleťáci 2026 jsou komunální volební projekt v obci Přezletice.\n\nPřezleťáci působí ve vedení obce již tři volební období:\n- 2014–2018\n- 2018–2022\n- 2022–2026\n\nV současném období zastávají pozice starosty a místostarosty.\n\n## Role webu\n\nWeb je hlavní komunikační platforma kampaně. Obsahuje kompletní informace, zatímco sociální sítě slouží především k distribuci a přivádění uživatelů na web.\n\n## Filozofie kampaně\n\nKomunikace je pozitivní, věcná, klidná, lidská, konkrétní, transparentní a založená na výsledcích a ověřitelných faktech. Nemá být útočná, populistická, agresivní, založená na strachu ani na nepodložených tvrzeních.\n\n## Komunikační pilíře\n\n1. Lidé\n2. Hotová práce\n3. Rozdělané věci\n4. Plány\n5. Vysvětlujeme\n6. Dokumenty a důkazy\n\n## Hlavní obsahové entity\n\n- Candidate\n- Project\n- Article\n- FAQ\n- Document\n- Gallery\n- Video\n- Social Post\n- Website Page\n- Meeting Note\n- Open Issue\n\n## Kandidáti\n\n${campaignCandidateNames.map((name, index) => `${index + 1}. ${name}`).join("\n")}\n\n## Hlavní témata\n\n- rozvoj obce\n- škola\n- development\n- územní plán\n- doprava\n- bezpečnost\n- veřejný prostor\n- komunita\n- historie vedení obce\n- dokončené projekty\n- probíhající projekty\n- plány na další volební období\n\n## Pravidla práce s fakty\n\nNevytvářej konkrétní čísla, termíny, citace ani výsledky, pokud nejsou součástí podkladů. Pokud chybí důkaz, označ informaci jako „k ověření“, „čeká na podklady“ nebo „pracovní tvrzení“. Nikdy nevydávej předpoklad za potvrzený fakt.\n\n## Tone of Voice\n\nPiš lidsky, klidně, sebevědomě, konkrétně, bez zbytečných politických frází a bez marketingového balastu. Složitější témata vysvětluj běžným jazykem.\n\n## Pravidlo distribuce\n\nWeb obsahuje celý příběh. Sociální sítě vybírají jednu část příběhu a směřují uživatele k podrobnějším informacím.\n\n## Dlouhodobý princip\n\nCampaign HQ je jediným zdrojem pravdy. Obsah webu, sociálních sítí, kandidátských profilů, projektů a dokumentů musí vycházet ze stejného společného kontextu.\n`;
}

export const WEB_BRIEF_MARKDOWN = buildWebBriefMarkdown();
export const AI_CONTEXT_MARKDOWN = buildAiContextMarkdown();
