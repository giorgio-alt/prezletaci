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
  candidateId?: number;
  projectId?: number;
  programSlug?: string;
  subjectType?: "candidate" | "team" | "project" | "article" | "program" | "brand" | "channel" | "general";
  socialCopy?: string;
  facebookCopy?: string;
  instagramCopy?: string;
  carouselOutline?: string[];
  hashtags?: string[];
  altText?: string;
  futureWebPath?: string;
  googleDriveUrl?: string;
  cta?: string;
  assetStatus?: string;
  contentSummary?: string;
  productionNote?: string;
};

const campaignStartSocialCopy = `Jsme sousedé se zkušenostmi z vedení obce, veřejných služeb i každodenního života v Přezleticích.

V příštích týdnech vám chceme postupně ukázat, na čem jsme v naší obci pracovali a co se podařilo dotáhnout.

Podíváme se ale i na věci, které ještě nejsou hotové a proč některé projekty trvají déle.

👉 Také vám přiblížíme naše plány a jednotlivé části programu, které na dosavadní práci navazují.

A jako první začneme tím nejdůležitějším – lidmi, kteří za námi stojí. Brzy vám představíme jedenáct sousedů, kteří společně tvoří Přezleťáky. 🙌`;

const programPlanSocialCopy = `Volby nejsou jen o heslech. Jsou o tom, kdo bude každý týden řešit konkrétní věci, které ovlivňují život v Přezleticích.

Náš plán pro roky 2026–2030 stojí na několika prioritách:

- bezpečnější doprava a fungující infrastruktura,
- dostatečná kapacita škol a školek,
- péče o veřejný prostor a zeleň,
- rozumný rozvoj obce,
- dostupné služby,
- bezpečnost a prevence,
- kultura, sport a komunitní život,
- digitalizace a srozumitelná komunikace,
- odpovědné hospodaření.

Nechceme všechno odbýt jedním dlouhým seznamem. V následujících týdnech se budeme jednotlivým tématům věnovat do hloubky — v postech, článcích a konkrétních příkladech z obce.`;

const programPlanInstagramCopy = `Volby nejsou jen o heslech.

Jsou o tom, kdo bude řešit konkrétní věci, které ovlivňují každodenní život v Přezleticích.

V našem plánu se zaměříme hlavně na:

- dopravu a infrastrukturu,
- školu a školku,
- zeleň a veřejný prostor,
- rozumný rozvoj obce,
- služby, bezpečnost a hospodaření,
- kulturu, sport a komunitní život.

Jednotlivým tématům se budeme v dalších týdnech věnovat do hloubky. Vždy konkrétně, lidsky a s vazbou na práci, která už v Přezleticích probíhá.`;

const logoShowcaseSocialCopy = `Představujeme vizuální identitu Přezleťáků pro rok 2026.

Stojí na jednoduché myšlence: Přezletice tvoří lidé, kteří se znají, potkávají a dokážou spolupracovat. Proto v identitě pracujeme se symbolem podané ruky, jasnou modrou a výraznou žlutou.

Modrá pro nás znamená klid, důvěru a odpovědnost. Žlutá přidává energii, otevřenost a pohyb. Společně vytvářejí systém, který budeme používat napříč kampaní: u medailonků kandidátů, projektů, programu, článků i vysvětlujících příspěvků.

Nechceme, aby naše komunikace byla jen hezká. Chceme, aby byla srozumitelná. Aby lidé na první pohled poznali, jestli mluvíme o člověku, hotové práci, rozdělaném projektu, plánu nebo vysvětlení složitějšího tématu.

Nová identita je proto hlavně praktický nástroj: pomáhá držet kampaň přehlednou, klidnou a čitelnou.`;

const logoShowcaseInstagramCopy = `Představujeme logo a vizuální identitu Přezleťáků 2026.

Podaná ruka. Modrá a žlutá. Jasný, čitelný systém pro celou kampaň.

Modrá znamená klid, důvěru a odpovědnost. Žlutá přidává energii, otevřenost a pohyb.

Stejnou identitu budeme používat u lidí, projektů, programu i vysvětlujících témat. Chceme, aby bylo na první pohled jasné, o čem mluvíme a proč je to pro Přezletice důležité.`;

const instagramLaunchSocialCopy = `Možná jste si všimli, že ne každý už dneska chodí pro novinky na Facebook... a tak nás nově najdete i na Instagramu! 🎉

Budeme tam sdílet, co se v Přezleticích děje, na čem pracujeme, co plánujeme a postupně vám představíme i celý náš tým.

➡️ Sledovat nás můžete tady
https://www.instagram.com/prezletaci.2011/

Tak nás sledujte i tam. 👋`;

// Zdroj: Prezletaci_2026_Postplan_Kalendar.xlsx (listy August, September, October).
// Tabulka nedokládá formát ani produkční stav. Proto zůstávají nedoložené položky
// transparentně ve stavu Čeká/Námět; hotové článkové a programové copy je označeno zvlášť.
export const initialPosts: SocialPost[] = [
  { id: 101, date: "2026-08-19", title: "Lidé · Launch · Přezletice jsou náš domov", contentType: "people", pillar: "Lidé", format: "Post", status: "Ke schválení", author: "Obsahový tým", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení", subjectType: "team", primaryImage: "/images/social/post-001-start-kampane.avif", socialCopy: campaignStartSocialCopy, cta: "Sledujte nás. V příštích dnech představíme tým Přezleťáků 2026.", assetStatus: "Grafika připravena: public/images/social/post-001-start-kampane.avif", contentSummary: "Oficiální launch kampaně „Přezletice jsou náš domov“: Přezleťáci 2026 navazují na dlouhodobou práci v obci. V kampani postupně představíme lidi, kteří za týmem stojí, dokončené projekty, rozdělané věci i plán pro další roky.", productionNote: "Oficiální start kampaně po oznámení Instagramu a představení identity. Po něm zařadit úvodní program a následně souvislou sérii kandidátských medailonků." },
  { id: 143, date: "2026-08-18", title: "Lidé · Identita · Představujeme logo Přezleťáků", contentType: "people", pillar: "Lidé", format: "Post", status: "Copy", author: "Copy + Grafika", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení", subjectType: "brand", primaryImage: "/images/social/logo-predstaveni-prezletaku.svg", draftLink: "content/social/program-a-logo-posty.md", socialCopy: logoShowcaseSocialCopy, facebookCopy: logoShowcaseSocialCopy, instagramCopy: logoShowcaseInstagramCopy, carouselOutline: ["Představujeme identitu Přezleťáků 2026.", "Podaná ruka jako symbol spolupráce.", "Modrá: klid, důvěra, odpovědnost.", "Žlutá: energie, otevřenost, pohyb.", "Jeden systém pro lidi, práci, plán i vysvětlování.", "Přehledná komunikace pro Přezletice."], hashtags: ["#prezletaci", "#prezletice", "#volby2026", "#logo", "#identita", "#spoluprace"], altText: "Grafika ve žluté a modré identitě Přezleťáků se symbolem podané ruky a textem „Představujeme identitu Přezleťáků 2026“.", cta: "Sledujte nás. V příštích dnech postupně představíme lidi, práci i plán Přezleťáků 2026.", assetStatus: "Grafika připravena: public/images/social/logo-predstaveni-prezletaku.svg", contentSummary: "Samostatný brand post představuje novou vizuální identitu Přezleťáků 2026: podanou ruku, modrou a žlutou jako praktický systém pro přehlednou kampaň.", productionNote: "Použít jako samostatný brand post po startu kampaně a před sérií medailonků. V Campaign HQ navázat na brand assety v public/images/brand." },
  { id: 142, date: "2026-08-17", title: "Lidé · Instagram · Jsme na Instagramu", contentType: "people", pillar: "Lidé", format: "Post", status: "Copy", author: "Copy + Grafika", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení", subjectType: "channel", primaryImage: "/images/social/post-instagram-start.png", draftLink: "content/social/program-a-logo-posty.md", socialCopy: instagramLaunchSocialCopy, facebookCopy: instagramLaunchSocialCopy, instagramCopy: instagramLaunchSocialCopy, carouselOutline: ["Jsme nově i na Instagramu", "Sledujte nás na @prezletaci.2011", "Co se v Přezleticích děje", "Na čem pracujeme", "Co plánujeme", "Postupně představíme celý tým"], hashtags: ["#prezletaci", "#prezletice", "#volby2026", "#instagram", "#obec", "#sousede"], altText: "Grafika ve žluté a modré identitě Přezleťáků s textem „Jsme nově i na Instagramu“ a výzvou ke sledování profilu @prezletaci.2011.", futureWebPath: "https://www.instagram.com/prezletaci.2011/", cta: "Sledujte nás i na Instagramu: @prezletaci.2011", assetStatus: "Klientem schválený text a grafika připraveny: public/images/social/post-instagram-start.png", contentSummary: "První post v kalendáři oznamuje, že Přezleťáky lidé nově najdou i na Instagramu, kde budou postupně sledovat dění v obci, práci, plány a představení celého týmu.", productionNote: "Publikovat jako první výstup 17. 8. Text je schválený klientem; zachovat odkaz https://www.instagram.com/prezletaci.2011/ a tón sousedského oznámení." },
  { id: 102, date: "2026-08-21", title: "Lidé · Medailonek · Tomáš Říha", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 1, contentSummary: "Kandidátský medailonek Tomáše Říhy: zkušenost s vedením obce a dlouhodobý rozvoj Přezletic.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 103, date: "2026-09-04", title: "Hotová práce · Výsledky · Co se v Přezleticích podařilo", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "První souhrnný výstup o konkrétních výsledcích dosavadní práce v obci.", productionNote: "Vybrat maximálně tři doložitelné výsledky a ke každému použít konkrétní fotografii nebo dokument." },
  { id: 104, date: "2026-08-22", title: "Lidé · Medailonek · Jan Macourek", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 2, contentSummary: "Kandidátský medailonek Jana Macourka: technická realita projektů, investice a odpovědný rozpočet.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 105, date: "2026-09-02", title: "Hotová práce · Svazková škola · Co se povedlo", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Výsledek dosavadní práce na vzniku a fungování svazkové školy a jídelny.", productionNote: "Oddělit již hotovou práci od navazujícího rozšiřování kapacity; použít ověřenou fotografii školy." },
  { id: 106, date: "2026-09-10", title: "Vysvětlujeme · Škola v datech · Kapacita a další krok", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 7, contentSummary: "Datové vysvětlení současné kapacity svazkové školy a připravovaného rozšíření.", productionNote: "Použít pouze potvrzená kapacitní data, uvést zdroj a vizuálně oddělit současný stav od plánovaného kroku." },
  { id: 107, date: "2026-08-23", title: "Lidé · Medailonek · Romana Bernardová", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 3, contentSummary: "Kandidátský medailonek Romany Bernardové: dostupné informace, tištěný zpravodaj a senioři.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidátky." },
  { id: 108, date: "2026-09-05", title: "Hotová práce · Sport · Místa pro pohyb a setkávání", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Přehled dokončených sportovních a volnočasových míst v obci.", productionNote: "Vybrat konkrétní hotová sportoviště a ke každému přiřadit odpovídající fotografii." },
  { id: 109, date: "2026-09-03", title: "Rozdělané věci · Relaxační centrum u rybníka · Kde právě jsme", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 6, contentSummary: "Aktuální stav sportovně-relaxačního centra u rybníka a zbývající etapy.", productionNote: "Použít aktuální projektovou fotografii a jasně vypsat dokončené části a nejbližší další krok." },
  { id: 110, date: "2026-08-24", title: "Lidé · Medailonek · Lenka Bulová", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 4, contentSummary: "Kandidátský medailonek Lenky Bulové: veřejná zeleň, krajinná architektura a dlouhodobá péče.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidátky." },
  { id: 111, date: "2026-09-06", title: "Hotová práce · Veřejná zeleň · Upravená místa v obci", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Ukázka dokončených úprav veřejné zeleně a jejich praktického přínosu.", productionNote: "Použít fotografie konkrétních realizovaných míst; nevydávat rozpracovaný park za hotový." },
  { id: 112, date: "2026-09-07", title: "Rozdělané věci · Park u křižovatky Nohavice · Aktuální stav", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 5, contentSummary: "Stav přípravy parku u křižovatky Nohavice od hotové studie k dokumentaci pro povolení.", productionNote: "Použít projektovou kartu, situační výkres nebo současnou fotografii lokality; uvést další doložený krok." },
  { id: 113, date: "2026-08-25", title: "Lidé · Medailonek · Jan Káňa", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 5, contentSummary: "Kandidátský medailonek Jana Káni: moderní služby, energetika, digitalizace a komunita.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 114, date: "2026-09-08", title: "Rozdělané věci · Svazková škola · Rozšíření kapacity", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 7, contentSummary: "Aktuální příprava dočasné kapacity a navazující druhé budovy svazkové školy.", productionNote: "Použít projektovou fotografii a ověřený harmonogram; oddělit první a druhou fázi." },
  { id: 115, date: "2026-09-09", title: "Vysvětlujeme · Svazková škola · Proč rozšíření kapacity trvá", contentType: "explain", pillar: "Vysvětlování", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "kapacita-skol-a-skolek", websiteItemId: "article-kapacita-skol-a-skolek", projectId: 7, subjectType: "article", primaryImage: "/images/projects/rozsireni-kapacity-svazkove-skoly.webp", galleryImages: ["/images/projects/druhy-pavilon-ms.webp", "/images/projects/zahrada-ms.webp", "/images/projects/vydejni-automaty-stravovani.webp"], draftLink: "content/articles/kapacita-skol-a-skolek.md", socialCopy: "Kapacita škol a školek nevzniká jedním rozhodnutím. Je za ní projektová příprava, financování, spolupráce obcí, provozní realita i dlouhodobé plánování. Proto u školy nechceme slibovat zkratky. Chceme lidem srozumitelně ukazovat, co už se podařilo, kde projekt stojí a jaký je další krok.", carouselOutline: ["Školní kapacita není jeden podpis.", "Rostoucí obec potřebuje řešení na víc než jedno období.", "Svazková škola znamená spolupráci obcí.", "Hotová etapa neznamená, že problém zmizí navždy.", "Rozšíření ovlivňuje projekt, povolení, peníze i provoz.", "Budeme ukazovat stav, kompetence a další krok."], cta: "Přečtěte si, proč školní kapacita vyžaduje dlouhodobou práci a co chceme dotahovat dál.", contentSummary: "Publikovatelný článek a carousel o tom, proč školní a předškolní kapacita nevzniká jedním rozhodnutím, ale kombinací spolupráce, projektů, financování a provozu.", productionNote: "Před publikací doplnit přesná kapacitní čísla a ověřit aktuální stav rozšíření svazkové školy." },
  { id: 116, date: "2026-08-26", title: "Lidé · Medailonek · Pavel Řeřucha", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 6, contentSummary: "Kandidátský medailonek Pavla Řeřuchy: bezpečnost, prevence, děti, senioři a sport.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 117, date: "2026-09-11", title: "Hotová práce · Bezpečnost · Obecní policie v Přezleticích", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 29, contentSummary: "Představení konkrétního bezpečnostního zázemí a role obecní policie.", productionNote: "Použít fotografii zázemí a publikovat pouze ověřené informace bez operačních podrobností." },
  { id: 118, date: "2026-09-12", title: "Plány · Komunikace obce · Informace dostupné všem", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Plán srozumitelnější komunikace obce napříč digitálními i tištěnými kanály.", productionNote: "Popsat konkrétní principy dostupnosti informací; neuvádět periodicitu nebo kanály bez schválení." },
  { id: 119, date: "2026-09-13", title: "Vysvětlujeme · Mapa projektů · Co je hotové, rozdělané a plánované", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Mapový přehled projektů rozlišených podle skutečného stavu.", productionNote: "Použít jednotnou legendu Hotové / Rozpracované / Plánované a ověřit polohu každého bodu." },
  { id: 120, date: "2026-08-27", title: "Lidé · Medailonek · Václav Šmerda", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 7, contentSummary: "Kandidátský medailonek Václava Šmerdy: veřejné stravování, zdraví a komunitní akce.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 121, date: "2026-09-14", title: "Vysvětlujeme · Development · Co může obec ovlivnit", contentType: "explain", pillar: "Vysvětlování", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "rozvoj-obce-a-uzemni-plan", websiteItemId: "article-rozvoj-obce-a-uzemni-plan", subjectType: "article", primaryImage: "/images/projects/rekonstrukce-mistnich-komunikaci.webp", galleryImages: ["/images/projects/rekonstrukce-prutahovych-komunikaci.webp", "/images/projects/zelen-mistni-komunikace.webp", "/images/projects/lavka-a-verejne-plochy-zlaty-kopec.webp"], draftLink: "content/articles/rozvoj-obce-a-uzemni-plan.md", socialCopy: "Kolik rozvoje Přezletice unesou? To není otázka proti nebo pro nové domy. Je to otázka dopravy, školy, vody, kanalizace, zeleně, služeb a pravidel. Obec má nástroje, ale musí je používat včas: územní plán, podmínky pro území, jednání s investory a férové vysvětlování dopadů. Chceme rozvoj řídit tak, aby obec zůstala dobře obyvatelná.", carouselOutline: ["Rozvoj není jen počet domů.", "Každý projekt má dopad na dopravu, školu i služby.", "Obec má nástroje, ale ne neomezenou moc.", "Územní plán je brzda i kompas.", "Hesla proti developerům nestačí.", "Důležitá jsou pravidla, dokumenty a včasné kroky.", "Cíl: rozumný rozvoj, který obec unese."], cta: "Přečtěte si, co obec může ovlivnit a proč je územní plán pro Přezletice zásadní.", contentSummary: "Publikovatelný článek a carousel o rozumném rozvoji obce, limitech územního plánování a tom, co obec může a nemůže ovlivnit při nové výstavbě.", productionNote: "Citlivé téma: před publikací doplnit odkazy na platné územně plánovací dokumenty a ověřit všechna právní/číselná tvrzení." },
  { id: 122, date: "2026-09-16", title: "Plány · Veřejná zeleň · Co chceme dotáhnout", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Navazující plán péče, ochrany stromů a promyšlených výsadeb ve veřejném prostoru.", productionNote: "Použít konkrétní lokality jen tam, kde je záměr doložen; vizuál postavit na existujících fotografiích zeleně." },
  { id: 123, date: "2026-09-17", title: "Vysvětlujeme · Územní plán · Jak obec řídí rozvoj", contentType: "evidence", pillar: "Vysvětlování", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Čeká na mapový podklad", copy: "Hotovo", approval: "Ke schválení", articleSlug: "rozvoj-obce-a-uzemni-plan", websiteItemId: "article-rozvoj-obce-a-uzemni-plan", subjectType: "article", primaryImage: "/images/projects/rekonstrukce-prutahovych-komunikaci.webp", galleryImages: ["/images/projects/rekonstrukce-mistnich-komunikaci.webp", "/images/projects/zelen-mistni-komunikace.webp"], draftLink: "content/articles/rozvoj-obce-a-uzemni-plan.md", socialCopy: "Územní plán není technický papír pro úředníky. Je to dohoda o tom, kde se obec může rozvíjet, kde ne a za jakých podmínek. Když má obec pravidla připravená včas, může růst lépe řídit. Když se pravidla řeší pozdě, zůstává méně prostoru k vyjednávání.", carouselOutline: ["Územní plán je pravidlo hry.", "Říká, kde se obec může rozvíjet.", "Dobře nastavený plán chrání kapacity obce.", "Pomáhá jednat o dopravě, zeleni a službách.", "Pozdě řešená pravidla oslabují pozici obce.", "Navazující článek vysvětluje celý kontext rozvoje."], cta: "Přečtěte si celý článek o rozumném rozvoji a nástrojích obce.", contentSummary: "Derivát článku o rozvoji zaměřený na roli územního plánu jako hlavního nástroje pro řízení tempa a podmínek výstavby.", productionNote: "Použít mapový výřez nebo dokument s popisem zdroje; vyhnout se právním zkratkám bez vysvětlení." },
  { id: 124, date: "2026-08-28", title: "Lidé · Medailonek · Břetislav Lukeš", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 8, contentSummary: "Kandidátský medailonek Břetislava Lukeše: architektura, územní plán a promyšlený rozvoj.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 125, date: "2026-09-24", title: "Rozdělané věci · Sokolovna · Od studie k dalšímu kroku", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 16, contentSummary: "Stav přípravy rekonstrukce Sokolovny a rozhodnutí, která musí následovat po hotové studii.", productionNote: "Použít fotografii Sokolovny a náhled studie; neprezentovat dosud nerozhodnutou variantu jako finální." },
  { id: 126, date: "2026-09-26", title: "Plány · Komunitní život · Prostor pro setkávání všech generací", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Programový rámec pro spolky, sousedské akce a místa, kde se mohou potkávat různé generace.", productionNote: "Použít autentickou fotografii obecní akce nebo komunitního prostoru a jeden konkrétní další krok." },
  { id: 127, date: "2026-08-29", title: "Lidé · Medailonek · Lenka Brožová", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 9, contentSummary: "Kandidátský medailonek Lenky Brožové: komunikace s veřejností, rozvoj, stavební agenda a sport.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidátky." },
  { id: 128, date: "2026-09-29", title: "Vysvětlujeme · Obecní policie · Role, prevence a pravomoci", contentType: "explain", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 29, contentSummary: "Věcné vysvětlení role obecní policie, prevence a hranic jejích pravomocí.", productionNote: "Použít projektovou fotografii a jednoduché členění Co řeší / Co neřeší / Kam se obrátit." },
  { id: 129, date: "2026-09-30", title: "Plány · Digitalizace · Více služeb bez cesty na úřad", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 3, contentSummary: "Plán navázat na digitalizované agendy a zpřístupnit více praktických informací a služeb online.", productionNote: "Ukázat současnou elektronickou úřední desku a jasně odlišit již dostupné služby od budoucích záměrů." },
  { id: 130, date: "2026-08-30", title: "Lidé · Medailonek · Jakub Tříska", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 10, contentSummary: "Kandidátský medailonek Jakuba Třísky: právo, veřejná správa, doprava a služby.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 131, date: "2026-10-02", title: "Plány · Infrastruktura · Připravenost obce na další roky", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Programový souhrn priorit ve vodě, kanalizaci, sítích, komunikacích a dalších základních službách.", productionNote: "Zvolit tři doložené priority a u každé uvést současný stav a nejbližší další krok." },
  { id: 132, date: "2026-10-03", title: "Vysvětlujeme · Financování · Jak obec rozhoduje o investicích", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Vysvětlení principů rozpočtu, prioritizace investic a využívání externího financování.", productionNote: "Použít pouze schválená čísla a dokumenty; grafiku strukturovat jako rozpočet / dotace / partneři / etapy." },
  { id: 133, date: "2026-08-31", title: "Lidé · Medailonek · Vojta Brož", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 11, contentSummary: "Kandidátský medailonek Vojty Brože: mladá generace, stavebnictví, infrastruktura a sport.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 134, date: "2026-09-01", title: "Lidé · Celý tým · Přezleťáci 2026", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Společné představení kompletní jedenáctičlenné kandidátky v pořadí 1–11.", productionNote: "Použít společnou týmovou fotografii, uvést všech jedenáct jmen ve správném pořadí a jeden společný claim." },
  { id: 135, date: "2026-10-06", title: "Hotová práce · Souhrn výsledků · Na čem můžeme stavět", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Závěrečný přehled nejsilnějších doložených výsledků a jejich dopadu na život v obci.", productionNote: "Vybrat jen výsledky s fotografií nebo důkazem a nespojovat hotové věci s plánovanými." },
  { id: 136, date: "2026-10-07", title: "Rozdělané věci · Prioritní projekty · Co chceme dotáhnout", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Přehled prioritních rozpracovaných projektů, jejich stavu a nejbližších kroků.", productionNote: "U každé položky zobrazit stav, již dokončený krok a jednu konkrétní navazující akci." },
  { id: 137, date: "2026-08-20", title: "Plány · Program · Co je pro nás do voleb nejdůležitější", contentType: "future", pillar: "Plány", format: "Post", status: "Copy", author: "Obsahový tým", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení", websiteItemId: "page-plans", programSlug: "plan-pro-prezletice-2026-2030", subjectType: "program", primaryImage: "/images/social/program-plan-pro-prezletice-2026-2030.svg", draftLink: "content/program/plan-pro-prezletice-2026-2030.md", socialCopy: programPlanSocialCopy, facebookCopy: programPlanSocialCopy, instagramCopy: programPlanInstagramCopy, carouselOutline: ["Plán pro Přezletice 2026–2030", "Ne jen hesla. Konkrétní témata pro každodenní život.", "Doprava, škola, zeleň a veřejný prostor.", "Rozumný rozvoj, služby, bezpečnost a hospodaření.", "Kultura, sport, komunita a lepší komunikace obce.", "Každé téma postupně rozebereme do hloubky.", "Sledujte další posty do voleb."], hashtags: ["#prezletaci", "#prezletice", "#volby2026", "#program", "#obec", "#komunalnipolitika"], altText: "Grafika v modré a žluté identitě Přezleťáků s textem „Plán pro Přezletice 2026–2030“ a výčtem hlavních programových oblastí: doprava, škola, zeleň, služby, bezpečnost, rozvoj, kultura, sport, digitalizace a hospodaření.", futureWebPath: "/program", cta: "Sledujte nás. Jednotlivé části programu budeme postupně vysvětlovat v dalších postech do voleb.", assetStatus: "Grafika připravena: public/images/social/program-plan-pro-prezletice-2026-2030.svg", contentSummary: "Úvodní volební článek a SoMe post shrnuje hlavní programové priority v bodech a vysvětluje, že jednotlivá témata budou v období do voleb rozpracovaná do hloubky.", productionNote: "Publikovat po oficiálním launchi a před souvislou sérií medailonků. Post má otevřít programovou linku jako rozcestník na budoucí programovou stránku /program a navazující tematické posty." },
  { id: 138, date: "2026-10-09", title: "Vysvětlujeme · Jak volit · Praktický postup krok za krokem", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Praktický a neutrální návod k volebnímu postupu bez přesvědčovacích tvrzení.", productionNote: "Před publikací ověřit všechny informace proti aktuálním oficiálním pokynům a uvést zdroj." },
  { id: 139, date: "2026-10-10", title: "Lidé · Volby · Přijďte rozhodnout o Přezleticích", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Závěrečná výzva k účasti a poděkování lidem, kteří sledovali kampaň a zapojili se do dialogu.", productionNote: "Použít týmový vizuál a krátké CTA; termín, čas a místo ověřit proti oficiálním údajům." },
  { id: 140, date: "2026-09-18", title: "Hotová práce · Veřejná zeleň · Jak se staráme o Přezletice", contentType: "completed", pillar: "Práce", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "zelen-v-prezleticich", websiteItemId: "article-zelen-v-prezleticich", primaryImage: "/images/projects/zelen-mistni-komunikace.webp", galleryImages: ["/images/projects/zelen-prutahove-komunikace.webp", "/images/projects/zelen-podzemni-kontejnery.webp", "/images/projects/hruskove-aleje-a-dalsi-zelen.webp", "/images/projects/dalsi-lokalni-zelen.webp", "/images/projects/komunitni-centrum-zlatak.webp"], draftLink: "content/articles/zelen-v-prezleticich.md", contentSummary: "Publikovatelný článek a carousel o zeleni jako systému péče o ulice, technická místa a veřejný prostor.", productionNote: "Použít hotový SoMe derivát a přiřazenou galerii; před publikací dokončit faktickou kontrolu článku." },
  { id: 141, date: "2026-09-25", title: "Plány · Nová radnice · Centrum obce", contentType: "future", pillar: "Plány", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "nova-radnice-centrum-obce", websiteItemId: "article-nova-radnice-centrum-obce", projectId: 16, primaryImage: "/images/projects/rekonstrukce-sokolovny.webp", galleryImages: ["/images/projects/komunitni-centrum-zlatak.webp", "/images/projects/elektronicka-uredni-deska.webp", "/images/projects/kaplicka-a-zvon.webp", "/images/brand/social/prezletaci-social-yellow.png"], draftLink: "content/articles/nova-radnice-centrum-obce.md", contentSummary: "Publikovatelný článek a carousel o nové radnici jako součásti budoucího centra obce.", productionNote: "Použít hotový SoMe derivát a přiřazenou galerii; vizualizace nebo konkrétní podoba musí být jasně označena jako návrh." },
  { id: 144, date: "2026-09-23", title: "Vysvětlujeme · Bílá vrátka · Pozemek, škola a rozhodnutí v čase", contentType: "evidence", pillar: "Vysvětlování", format: "Carousel", status: "Copy", author: "Copy + Fact-check", graphic: "Brand podklad", copy: "Hotovo", approval: "Ke schválení", articleSlug: "bila-vratka-pozemek-skola", websiteItemId: "article-bila-vratka-pozemek-skola", subjectType: "article", primaryImage: "/images/brand/social/prezletaci-social-blue.png", galleryImages: ["/images/projects/rozsireni-kapacity-svazkove-skoly.webp", "/images/projects/elektronicka-uredni-deska.webp"], draftLink: "content/articles/bila-vratka-pozemek-skola.md", socialCopy: "U Bílých vrátek nechceme pracovat s nálepkami ani zkratkami. Jde o citlivé téma pozemků, školy a rozhodnutí v čase. Proto připravujeme časovou osu: co je doložené dokumentem, co je kontext a co je politické hodnocení. Teprve když jsou tyto vrstvy oddělené, může být debata férová.", carouselOutline: ["Bílá vrátka: citlivé téma, klidný postup.", "Nejdřív časová osa.", "Oddělit fakta, kontext a hodnocení.", "Každé silné tvrzení musí mít zdroj.", "Když něco nevíme, označíme to jako neověřené.", "Cíl: přehled místo slovní přestřelky."], cta: "Podívejte se, jak chceme citlivá obecní témata vysvětlovat věcně a s odkazy na dokumenty.", contentSummary: "Článek a SoMe carousel ve formě opatrné časové osy k citlivému tématu Bílých vrátek, pozemků a rozhodování o škole.", productionNote: "Před publikací doplnit konkrétní časovou osu a provést faktickou/právní kontrolu." },
  { id: 145, date: "2026-09-28", title: "Vysvětlujeme · Hasiči · Co by obnova vyžadovala", contentType: "explain", pillar: "Vysvětlování", format: "Carousel", status: "Copy", author: "Copy + Fact-check", graphic: "Brand podklad", copy: "Hotovo", approval: "Ke schválení", articleSlug: "hasici-v-prezleticich", websiteItemId: "article-hasici-v-prezleticich", subjectType: "article", primaryImage: "/images/brand/social/prezletaci-social-yellow.png", galleryImages: ["/images/projects/obecni-policie.webp", "/images/projects/komunitni-centrum-zlatak.webp"], draftLink: "content/articles/hasici-v-prezleticich.md", socialCopy: "Hasiči jsou citlivé téma. Proto je potřeba mluvit přesně: hasičský spolek a jednotka požární ochrany nejsou totéž. Pokud se má uvažovat o obnově, nestačí slib. Je potřeba vědět, jaké jsou povinnosti, vybavení, lidé, zázemí, provozní náklady a návaznost na systém požární ochrany. Nejprve fakta, potom rozhodnutí.", carouselOutline: ["Hasiči: nejdřív rozlišit pojmy.", "Spolek není totéž co jednotka požární ochrany.", "Funkční jednotka potřebuje lidi, výcvik, vybavení a zázemí.", "Historii popisovat podle dokumentů.", "Silná tvrzení ověřit před publikací.", "Program má slíbit jen to, co je prověřené."], cta: "Přečtěte si, jak chceme k tématu hasičů přistoupit věcně a odpovědně.", contentSummary: "Článek a carousel k tématu hasičů, který rozlišuje spolek, jednotku, historii a podmínky případné obnovy.", productionNote: "Citlivé téma: před publikací ověřit historické podklady, podmínky JPO a formulace s odborníkem/právní kontrolou." },
  { id: 146, date: "2026-10-08", title: "Vysvětlujeme · Fact-check · Jak ověřujeme tvrzení o historii obce", contentType: "evidence", pillar: "Vysvětlování", format: "Carousel", status: "Copy", author: "Copy + Fact-check", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "jak-overujeme-tvrzeni", websiteItemId: "article-jak-overujeme-tvrzeni", projectId: 3, subjectType: "article", primaryImage: "/images/projects/elektronicka-uredni-deska.webp", galleryImages: ["/images/brand/social/prezletaci-social-blue.png", "/images/brand/social/prezletaci-social-yellow.png"], draftLink: "content/articles/jak-overujeme-tvrzeni.md", socialCopy: "V kampani nechceme stavět komunikaci na nálepkách. U citlivých témat budeme pracovat jednoduše: tvrzení, zdroj, kontext a jasné označení, co je fakt a co je hodnocení. Když něco ještě nemáme ověřené, řekneme to. Férová debata začíná tím, že lidé vidí, z čeho vycházíme.", carouselOutline: ["Tvrzení samo o sobě nestačí.", "Ptáme se: zdroj, dokument, kontext.", "Fakt musí být ověřitelný.", "Hodnocení musí být označené jako hodnocení.", "Neověřené věci neschováváme.", "SoMe má vést na delší článek se zdroji."], cta: "Přečtěte si, jak budeme v kampani pracovat s fakty, historií a citlivými tématy.", contentSummary: "Metodický článek a carousel o tom, jak v kampani ověřovat tvrzení, rozlišovat fakta od hodnocení a odkazovat na dokumenty.", productionNote: "Použít jako důvěryhodnostní post před nejcitlivějšími tématy nebo jako podpůrný odkaz v debatách." },
].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);

const version8DefaultTitles: Record<number, string> = {
  101: "Start kampaně", 102: "Medailonek 1", 103: "Výsledky", 104: "Medailonek 2", 105: "Svazková škola",
  106: "Škola v datech", 107: "Medailonek 3", 108: "Sport", 109: "Relax zóna", 110: "Medailonek 4",
  111: "Parčík", 112: "Parčík stav", 113: "Medailonek 5", 114: "Rozšíření školy", 115: "Proč škola trvá",
  116: "Medailonek 6", 117: "Bezpečnost", 118: "Komunikace", 119: "Mapa projektů", 120: "Medailonek 7",
  121: "Development", 122: "Více zeleně", 123: "Územní plán", 124: "Medailonek 8", 125: "Sokolovna",
  126: "Komunita", 127: "Medailonek 9", 128: "Obecní policie", 129: "Digitalizace", 130: "Medailonek 10",
  131: "Infrastruktura", 132: "Financování", 133: "Medailonek 11", 134: "Celý tým", 135: "Shrnutí výsledků",
  136: "Co dotáhneme", 137: "Program", 138: "Jak volit", 139: "Volby",
  140: "Jak se staráme o zeleň v Přezleticích", 141: "Nová radnice jako nové centrum obce", 142: "Jsme nově i na Instagramu", 143: "Představujeme logo Přezleťáků",
  144: "Bílá vrátka: pozemek, škola a rozhodnutí v čase", 145: "Hasiči v Přezleticích", 146: "Jak ověřujeme tvrzení o historii obce",
};

const version10DefaultPosts: Record<number, Partial<SocialPost>> = {
  101: { date: "2026-08-01", title: "Lidé · Start kampaně · Přezleťáci se znovu představují", status: "Námět", graphic: "Čeká", copy: "Čeká", approval: "Čeká" },
  102: { date: "2026-08-18", title: "Lidé · Medailonek · Tomáš Říha" },
  103: { date: "2026-08-07", title: "Hotová práce · Výsledky · Co se v Přezleticích podařilo" },
  104: { date: "2026-08-20", title: "Lidé · Medailonek · Jan Macourek" },
  105: { date: "2026-08-14", title: "Hotová práce · Svazková škola · Co se povedlo" },
  106: { date: "2026-08-16", title: "Vysvětlujeme · Škola v datech · Kapacita a další krok" },
  107: { date: "2026-08-18", title: "Lidé · Medailonek · Romana Bernardová" },
  110: { date: "2026-08-25", title: "Lidé · Medailonek · Lenka Bulová" },
  111: { date: "2026-08-28", title: "Hotová práce · Veřejná zeleň · Upravená místa v obci" },
  112: { date: "2026-08-30", title: "Rozdělané věci · Park u křižovatky Nohavice · Aktuální stav" },
  137: { date: "2026-10-08", title: "Plány · Program · Plán pro Přezletice 2026–2030", status: "Copy", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení" },
  142: { date: "2026-08-21", title: "Lidé · Instagram · Sledujte Přezleťáky i tam", status: "Copy", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení" },
};

const versionDefaultPostVariants: Record<number, Partial<SocialPost>[]> = {
  142: [
    { date: "2026-08-19", title: "Lidé · Identita · Představujeme logo Přezleťáků", status: "Copy", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení" },
    { date: "2026-08-21", title: "Lidé · Instagram · Sledujte Přezleťáky i tam", status: "Copy", graphic: "Připraveno", copy: "Hotovo", approval: "Ke schválení" },
  ],
};

const isUnchangedFromVersion10Default = (post: SocialPost) => {
  const variants = [version10DefaultPosts[post.id], ...(versionDefaultPostVariants[post.id] ?? [])].filter((variant): variant is Partial<SocialPost> => Boolean(variant));
  return variants.some((previous) => Object.entries(previous).every(([field, value]) => post[field as keyof SocialPost] === value));
};

const articleUpgradePostIds = new Set([115, 121, 123]);
const programArticleUpgradePostIds = new Set([137]);
const launchSequenceUpgradePostIds = new Set([101, 137, 142]);
const canonicalSchedulePostIds = new Set(initialPosts.map((post) => post.id));

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
  for (const post of preserved) {
    const canonical = merged.get(post.id);
    if (!canonical) {
      merged.set(post.id, post);
      continue;
    }
    const refreshCanonicalUpdate =
      (savedVersion < 14 && isUnchangedFromVersion10Default(post)) ||
      (savedVersion < 15 && articleUpgradePostIds.has(post.id)) ||
      (savedVersion < 18 && programArticleUpgradePostIds.has(post.id)) ||
      (savedVersion < 19 && launchSequenceUpgradePostIds.has(post.id));
    const refreshCanonicalSchedule = savedVersion < 19 && canonicalSchedulePostIds.has(post.id);
    const refreshDefaultTitle = savedVersion < 9 && post.title === version8DefaultTitles[post.id];
    const migrated = {
      ...canonical,
      ...post,
      date: refreshCanonicalUpdate || refreshCanonicalSchedule ? canonical.date : post.date,
      title: refreshDefaultTitle || refreshCanonicalUpdate ? canonical.title : post.title,
      status: refreshCanonicalUpdate ? canonical.status : post.status,
      graphic: refreshCanonicalUpdate ? canonical.graphic : post.graphic,
      copy: refreshCanonicalUpdate ? canonical.copy : post.copy,
      approval: refreshCanonicalUpdate ? canonical.approval : post.approval,
      candidateId: refreshCanonicalUpdate ? canonical.candidateId : post.candidateId ?? canonical.candidateId,
      projectId: refreshCanonicalUpdate ? canonical.projectId : post.projectId ?? canonical.projectId,
      programSlug: refreshCanonicalUpdate ? canonical.programSlug : post.programSlug ?? canonical.programSlug,
      subjectType: refreshCanonicalUpdate ? canonical.subjectType : post.subjectType ?? canonical.subjectType,
      articleSlug: refreshCanonicalUpdate ? canonical.articleSlug : post.articleSlug ?? canonical.articleSlug,
      websiteItemId: refreshCanonicalUpdate ? canonical.websiteItemId : post.websiteItemId ?? canonical.websiteItemId,
      primaryImage: refreshCanonicalUpdate ? canonical.primaryImage : post.primaryImage ?? canonical.primaryImage,
      galleryImages: refreshCanonicalUpdate ? canonical.galleryImages : post.galleryImages ?? canonical.galleryImages,
      draftLink: refreshCanonicalUpdate ? canonical.draftLink : post.draftLink ?? canonical.draftLink,
      socialCopy: refreshCanonicalUpdate ? canonical.socialCopy : post.socialCopy ?? canonical.socialCopy,
      facebookCopy: refreshCanonicalUpdate ? canonical.facebookCopy : post.facebookCopy ?? canonical.facebookCopy,
      instagramCopy: refreshCanonicalUpdate ? canonical.instagramCopy : post.instagramCopy ?? canonical.instagramCopy,
      carouselOutline: refreshCanonicalUpdate ? canonical.carouselOutline : post.carouselOutline ?? canonical.carouselOutline,
      hashtags: refreshCanonicalUpdate ? canonical.hashtags : post.hashtags ?? canonical.hashtags,
      altText: refreshCanonicalUpdate ? canonical.altText : post.altText ?? canonical.altText,
      futureWebPath: refreshCanonicalUpdate ? canonical.futureWebPath : post.futureWebPath ?? canonical.futureWebPath,
      googleDriveUrl: refreshCanonicalUpdate ? canonical.googleDriveUrl : post.googleDriveUrl ?? canonical.googleDriveUrl,
      cta: refreshCanonicalUpdate ? canonical.cta : post.cta ?? canonical.cta,
      assetStatus: refreshCanonicalUpdate ? canonical.assetStatus : post.assetStatus ?? canonical.assetStatus,
      contentSummary: refreshCanonicalUpdate ? canonical.contentSummary : post.contentSummary ?? canonical.contentSummary,
      productionNote: refreshCanonicalUpdate ? canonical.productionNote : post.productionNote ?? canonical.productionNote,
    };
    if (savedVersion < 9 && post.id === 137) {
      if (post.status === "Námět") migrated.status = canonical.status;
      if (post.copy === "Čeká") migrated.copy = canonical.copy;
      if (post.approval === "Čeká") migrated.approval = canonical.approval;
    }
    merged.set(post.id, migrated);
  }
  return sortPosts([...merged.values()]);
}
