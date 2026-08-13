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
  contentSummary?: string;
  productionNote?: string;
};

// Zdroj: Prezletaci_2026_Postplan_Kalendar.xlsx (listy August, September, October).
// Tabulka nedokládá formát ani produkční stav. Proto zůstávají nedoložené položky
// transparentně ve stavu Čeká/Námět; hotové článkové a programové copy je označeno zvlášť.
export const initialPosts: SocialPost[] = [
  { id: 101, date: "2026-08-01", title: "Lidé · Start kampaně · Přezleťáci se znovu představují", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Úvodní představení týmu, kontinuity práce a důvodu, proč Přezleťáci znovu kandidují.", productionNote: "Použít společnou fotografii týmu a krátký úvodní claim; bez odkazu na dosud nevydaný web." },
  { id: 102, date: "2026-08-04", title: "Lidé · Medailonek · Tomáš Říha", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 1, contentSummary: "Kandidátský medailonek Tomáše Říhy: zkušenost s vedením obce a dlouhodobý rozvoj Přezletic.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 103, date: "2026-08-07", title: "Hotová práce · Výsledky · Co se v Přezleticích podařilo", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "První souhrnný výstup o konkrétních výsledcích dosavadní práce v obci.", productionNote: "Vybrat maximálně tři doložitelné výsledky a ke každému použít konkrétní fotografii nebo dokument." },
  { id: 104, date: "2026-08-11", title: "Lidé · Medailonek · Jan Macourek", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 2, contentSummary: "Kandidátský medailonek Jana Macourka: technická realita projektů, investice a odpovědný rozpočet.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 105, date: "2026-08-14", title: "Hotová práce · Svazková škola · Co se povedlo", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Výsledek dosavadní práce na vzniku a fungování svazkové školy a jídelny.", productionNote: "Oddělit již hotovou práci od navazujícího rozšiřování kapacity; použít ověřenou fotografii školy." },
  { id: 106, date: "2026-08-16", title: "Vysvětlujeme · Škola v datech · Kapacita a další krok", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 7, contentSummary: "Datové vysvětlení současné kapacity svazkové školy a připravovaného rozšíření.", productionNote: "Použít pouze potvrzená kapacitní data, uvést zdroj a vizuálně oddělit současný stav od plánovaného kroku." },
  { id: 107, date: "2026-08-18", title: "Lidé · Medailonek · Romana Bernardová", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 3, contentSummary: "Kandidátský medailonek Romany Bernardové: dostupné informace, tištěný zpravodaj a senioři.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidátky." },
  { id: 108, date: "2026-08-21", title: "Hotová práce · Sport · Místa pro pohyb a setkávání", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Přehled dokončených sportovních a volnočasových míst v obci.", productionNote: "Vybrat konkrétní hotová sportoviště a ke každému přiřadit odpovídající fotografii." },
  { id: 109, date: "2026-08-23", title: "Rozdělané věci · Relaxační centrum u rybníka · Kde právě jsme", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 6, contentSummary: "Aktuální stav sportovně-relaxačního centra u rybníka a zbývající etapy.", productionNote: "Použít aktuální projektovou fotografii a jasně vypsat dokončené části a nejbližší další krok." },
  { id: 110, date: "2026-08-25", title: "Lidé · Medailonek · Lenka Bulová", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 4, contentSummary: "Kandidátský medailonek Lenky Bulové: veřejná zeleň, krajinná architektura a dlouhodobá péče.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidátky." },
  { id: 111, date: "2026-08-28", title: "Hotová práce · Veřejná zeleň · Upravená místa v obci", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Ukázka dokončených úprav veřejné zeleně a jejich praktického přínosu.", productionNote: "Použít fotografie konkrétních realizovaných míst; nevydávat rozpracovaný park za hotový." },
  { id: 112, date: "2026-08-30", title: "Rozdělané věci · Park u křižovatky Nohavice · Aktuální stav", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 5, contentSummary: "Stav přípravy parku u křižovatky Nohavice od hotové studie k dokumentaci pro povolení.", productionNote: "Použít projektovou kartu, situační výkres nebo současnou fotografii lokality; uvést další doložený krok." },
  { id: 113, date: "2026-09-01", title: "Lidé · Medailonek · Jan Káňa", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 5, contentSummary: "Kandidátský medailonek Jana Káni: moderní služby, energetika, digitalizace a komunita.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 114, date: "2026-09-03", title: "Rozdělané věci · Svazková škola · Rozšíření kapacity", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 7, contentSummary: "Aktuální příprava dočasné kapacity a navazující druhé budovy svazkové školy.", productionNote: "Použít projektovou fotografii a ověřený harmonogram; oddělit první a druhou fázi." },
  { id: 115, date: "2026-09-05", title: "Vysvětlujeme · Svazková škola · Proč rozšíření kapacity trvá", contentType: "explain", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 7, contentSummary: "Klidné vysvětlení kroků, kompetencí a překážek při rozšiřování školní kapacity.", productionNote: "Připravit stručnou časovou osu a jasně označit, co rozhoduje obec, svazek a další instituce." },
  { id: 116, date: "2026-09-08", title: "Lidé · Medailonek · Pavel Řeřucha", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 6, contentSummary: "Kandidátský medailonek Pavla Řeřuchy: bezpečnost, prevence, děti, senioři a sport.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 117, date: "2026-09-10", title: "Hotová práce · Bezpečnost · Obecní policie v Přezleticích", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 29, contentSummary: "Představení konkrétního bezpečnostního zázemí a role obecní policie.", productionNote: "Použít fotografii zázemí a publikovat pouze ověřené informace bez operačních podrobností." },
  { id: 118, date: "2026-09-12", title: "Plány · Komunikace obce · Informace dostupné všem", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Plán srozumitelnější komunikace obce napříč digitálními i tištěnými kanály.", productionNote: "Popsat konkrétní principy dostupnosti informací; neuvádět periodicitu nebo kanály bez schválení." },
  { id: 119, date: "2026-09-13", title: "Vysvětlujeme · Mapa projektů · Co je hotové, rozdělané a plánované", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Mapový přehled projektů rozlišených podle skutečného stavu.", productionNote: "Použít jednotnou legendu Hotové / Rozpracované / Plánované a ověřit polohu každého bodu." },
  { id: 120, date: "2026-09-15", title: "Lidé · Medailonek · Václav Šmerda", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 7, contentSummary: "Kandidátský medailonek Václava Šmerdy: veřejné stravování, zdraví a komunitní akce.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 121, date: "2026-09-17", title: "Vysvětlujeme · Development · Co může obec ovlivnit", contentType: "explain", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Vysvětlení pravomocí obce, limitů a nástrojů při nové výstavbě.", productionNote: "Oddělit fakta, kompetence a politický postoj; každé konkrétní tvrzení podložit zdrojem." },
  { id: 122, date: "2026-09-19", title: "Plány · Veřejná zeleň · Co chceme dotáhnout", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Navazující plán péče, ochrany stromů a promyšlených výsadeb ve veřejném prostoru.", productionNote: "Použít konkrétní lokality jen tam, kde je záměr doložen; vizuál postavit na existujících fotografiích zeleně." },
  { id: 123, date: "2026-09-20", title: "Vysvětlujeme · Územní plán · Jak obec řídí rozvoj", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Srozumitelný přehled role územního plánu a rozhodovacích možností obce.", productionNote: "Použít mapový výřez nebo dokument s popisem zdroje; vyhnout se právním zkratkám bez vysvětlení." },
  { id: 124, date: "2026-09-22", title: "Lidé · Medailonek · Břetislav Lukeš", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 8, contentSummary: "Kandidátský medailonek Břetislava Lukeše: architektura, územní plán a promyšlený rozvoj.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 125, date: "2026-09-24", title: "Rozdělané věci · Sokolovna · Od studie k dalšímu kroku", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 16, contentSummary: "Stav přípravy rekonstrukce Sokolovny a rozhodnutí, která musí následovat po hotové studii.", productionNote: "Použít fotografii Sokolovny a náhled studie; neprezentovat dosud nerozhodnutou variantu jako finální." },
  { id: 126, date: "2026-09-26", title: "Plány · Komunitní život · Prostor pro setkávání všech generací", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Programový rámec pro spolky, sousedské akce a místa, kde se mohou potkávat různé generace.", productionNote: "Použít autentickou fotografii obecní akce nebo komunitního prostoru a jeden konkrétní další krok." },
  { id: 127, date: "2026-09-27", title: "Lidé · Medailonek · Lenka Brožová", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 9, contentSummary: "Kandidátský medailonek Lenky Brožové: komunikace s veřejností, rozvoj, stavební agenda a sport.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidátky." },
  { id: 128, date: "2026-09-29", title: "Vysvětlujeme · Obecní policie · Role, prevence a pravomoci", contentType: "explain", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 29, contentSummary: "Věcné vysvětlení role obecní policie, prevence a hranic jejích pravomocí.", productionNote: "Použít projektovou fotografii a jednoduché členění Co řeší / Co neřeší / Kam se obrátit." },
  { id: 129, date: "2026-09-30", title: "Plány · Digitalizace · Více služeb bez cesty na úřad", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", projectId: 3, contentSummary: "Plán navázat na digitalizované agendy a zpřístupnit více praktických informací a služeb online.", productionNote: "Ukázat současnou elektronickou úřední desku a jasně odlišit již dostupné služby od budoucích záměrů." },
  { id: 130, date: "2026-10-01", title: "Lidé · Medailonek · Jakub Tříska", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 10, contentSummary: "Kandidátský medailonek Jakuba Třísky: právo, veřejná správa, doprava a služby.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 131, date: "2026-10-02", title: "Plány · Infrastruktura · Připravenost obce na další roky", contentType: "future", pillar: "Plány", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Programový souhrn priorit ve vodě, kanalizaci, sítích, komunikacích a dalších základních službách.", productionNote: "Zvolit tři doložené priority a u každé uvést současný stav a nejbližší další krok." },
  { id: 132, date: "2026-10-03", title: "Vysvětlujeme · Financování · Jak obec rozhoduje o investicích", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Vysvětlení principů rozpočtu, prioritizace investic a využívání externího financování.", productionNote: "Použít pouze schválená čísla a dokumenty; grafiku strukturovat jako rozpočet / dotace / partneři / etapy." },
  { id: 133, date: "2026-10-04", title: "Lidé · Medailonek · Vojta Brož", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Produkce", graphic: "Čeká", copy: "Čeká", approval: "Čeká", candidateId: 11, contentSummary: "Kandidátský medailonek Vojty Brože: mladá generace, stavebnictví, infrastruktura a sport.", productionNote: "Použít schválený portrét, claim a SoMe medailonek z profilu kandidáta." },
  { id: 134, date: "2026-10-05", title: "Lidé · Celý tým · Přezleťáci 2026", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Společné představení kompletní jedenáctičlenné kandidátky v pořadí 1–11.", productionNote: "Použít společnou týmovou fotografii, uvést všech jedenáct jmen ve správném pořadí a jeden společný claim." },
  { id: 135, date: "2026-10-06", title: "Hotová práce · Souhrn výsledků · Na čem můžeme stavět", contentType: "completed", pillar: "Práce", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Závěrečný přehled nejsilnějších doložených výsledků a jejich dopadu na život v obci.", productionNote: "Vybrat jen výsledky s fotografií nebo důkazem a nespojovat hotové věci s plánovanými." },
  { id: 136, date: "2026-10-07", title: "Rozdělané věci · Prioritní projekty · Co chceme dotáhnout", contentType: "progress", pillar: "Rozdělané", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Přehled prioritních rozpracovaných projektů, jejich stavu a nejbližších kroků.", productionNote: "U každé položky zobrazit stav, již dokončený krok a jednu konkrétní navazující akci." },
  { id: 137, date: "2026-10-08", title: "Plány · Program · Plán pro Přezletice 2026–2030", contentType: "future", pillar: "Plány", format: "Post", status: "Copy", author: "Obsahový tým", graphic: "Čeká", copy: "Hotovo", approval: "Ke schválení", websiteItemId: "page-plans", programSlug: "plan-pro-prezletice-2026-2030", draftLink: "content/program/plan-pro-prezletice-2026-2030.md", contentSummary: "Úvodní představení deseti programových okruhů a způsobu, jak číst plán pro roky 2026–2030.", productionNote: "Použít programový perex, deset tematických okruhů a CTA na budoucí stránku /program." },
  { id: 138, date: "2026-10-09", title: "Vysvětlujeme · Jak volit · Praktický postup krok za krokem", contentType: "evidence", pillar: "Vysvětlování", format: "Post", status: "Námět", author: "Copy", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Praktický a neutrální návod k volebnímu postupu bez přesvědčovacích tvrzení.", productionNote: "Před publikací ověřit všechny informace proti aktuálním oficiálním pokynům a uvést zdroj." },
  { id: 139, date: "2026-10-10", title: "Lidé · Volby · Přijďte rozhodnout o Přezleticích", contentType: "people", pillar: "Lidé", format: "Post", status: "Námět", author: "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká", contentSummary: "Závěrečná výzva k účasti a poděkování lidem, kteří sledovali kampaň a zapojili se do dialogu.", productionNote: "Použít týmový vizuál a krátké CTA; termín, čas a místo ověřit proti oficiálním údajům." },
  { id: 140, date: "2026-09-18", title: "Hotová práce · Veřejná zeleň · Jak se staráme o Přezletice", contentType: "completed", pillar: "Práce", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "zelen-v-prezleticich", websiteItemId: "article-zelen-v-prezleticich", primaryImage: "/images/projects/zelen-mistni-komunikace.webp", galleryImages: ["/images/projects/zelen-prutahove-komunikace.webp", "/images/projects/zelen-podzemni-kontejnery.webp", "/images/projects/hruskove-aleje-a-dalsi-zelen.webp", "/images/projects/dalsi-lokalni-zelen.webp", "/images/projects/komunitni-centrum-zlatak.webp"], draftLink: "content/articles/zelen-v-prezleticich.md", contentSummary: "Publikovatelný článek a carousel o zeleni jako systému péče o ulice, technická místa a veřejný prostor.", productionNote: "Použít hotový SoMe derivát a přiřazenou galerii; před publikací dokončit faktickou kontrolu článku." },
  { id: 141, date: "2026-09-25", title: "Plány · Nová radnice · Centrum obce", contentType: "future", pillar: "Plány", format: "Carousel", status: "Copy", author: "Copy + Grafika", graphic: "Fotky přiřazeny", copy: "Hotovo", approval: "Ke schválení", articleSlug: "nova-radnice-centrum-obce", websiteItemId: "article-nova-radnice-centrum-obce", projectId: 16, primaryImage: "/images/projects/rekonstrukce-sokolovny.webp", galleryImages: ["/images/projects/komunitni-centrum-zlatak.webp", "/images/projects/elektronicka-uredni-deska.webp", "/images/projects/kaplicka-a-zvon.webp", "/images/brand/social/prezletaci-social-yellow.png"], draftLink: "content/articles/nova-radnice-centrum-obce.md", contentSummary: "Publikovatelný článek a carousel o nové radnici jako součásti budoucího centra obce.", productionNote: "Použít hotový SoMe derivát a přiřazenou galerii; vizualizace nebo konkrétní podoba musí být jasně označena jako návrh." },
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
  140: "Jak se staráme o zeleň v Přezleticích", 141: "Nová radnice jako nové centrum obce",
};

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
    const refreshDefaultTitle = savedVersion < 9 && post.title === version8DefaultTitles[post.id];
    const migrated = {
      ...canonical,
      ...post,
      title: refreshDefaultTitle ? canonical.title : post.title,
      candidateId: post.candidateId ?? canonical.candidateId,
      projectId: post.projectId ?? canonical.projectId,
      programSlug: post.programSlug ?? canonical.programSlug,
      articleSlug: post.articleSlug ?? canonical.articleSlug,
      websiteItemId: post.websiteItemId ?? canonical.websiteItemId,
      primaryImage: post.primaryImage ?? canonical.primaryImage,
      galleryImages: post.galleryImages ?? canonical.galleryImages,
      draftLink: post.draftLink ?? canonical.draftLink,
      contentSummary: post.contentSummary ?? canonical.contentSummary,
      productionNote: post.productionNote ?? canonical.productionNote,
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
