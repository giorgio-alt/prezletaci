"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { initialPosts, mergePostsWithPlan, sortPosts } from "./postplan";
import type { ContentType, SocialPost } from "./postplan";

type SectionId =
  | "dashboard"
  | "bible"
  | "candidates"
  | "projects"
  | "calendar"
  | "web"
  | "checklist"
  | "timeline"
  | "documents"
  | "settings";

type TaskStatus = "To Do" | "Waiting" | "Doing" | "Done";
type Priority = "Kritická" | "Vysoká" | "Střední" | "Nízká";
type ProjectStatus = "Hotové" | "Rozpracované" | "Plánované";

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: Priority;
  owner: string;
  deadline: string;
  note: string;
  document?: string;
};

type Project = {
  id: number;
  title: string;
  status: ProjectStatus;
  area: string;
  owner: string;
  summary: string;
  evidence: string;
  risk: string;
  argument: string;
  next: string;
  history: string;
};

type Candidate = {
  id: number;
  order: number;
  name: string;
  image: string;
  office: string;
  professions: string[];
  bio: string;
  initials: string;
  quote?: string;
  topics: string[];
  photoRanges: string[];
  assets: {
    photos: boolean;
    medallion: boolean;
    bio: boolean;
    quote: boolean;
    video: boolean;
    faq: boolean;
  };
  plannedPostIds: number[];
  projectIds: number[];
  documents: string[];
};

type CandidateView = "overview" | "matrix" | "dashboard";

type ContentTemplate = {
  label: string;
  icon: string;
  pillar: SocialPost["pillar"];
  badge: string;
  purpose: string;
  typical: string[];
  layout: string;
  cta: string;
  example: string;
  visual: string;
};

const contentTemplates: Record<ContentType, ContentTemplate> = {
  people: { label: "Lidé", icon: "👥", pillar: "Lidé", badge: "LIDÉ", purpose: "Budování důvěry, kandidáti, lidské příběhy, zákulisí a komunita.", typical: ["Medailonky", "Společné fotografie", "Rozhovory a osobní postoje"], layout: "Horní identifikační pruh, fotografie přes většinu plochy, jméno a krátký claim.", cta: "Přečtěte si celý příběh", example: "Jan Macourek: proč dotahuji stavby", visual: "Portrét / autentická fotografie" },
  completed: { label: "Hotová práce", icon: "✔", pillar: "Práce", badge: "HOTOVO", purpose: "Ukázat výsledky a doložit kompetenci konkrétním dopadem.", typical: ["Dokončené projekty", "Nová infrastruktura", "Fotografie před / po"], layout: "Velká fotografie výsledku, výrazný badge HOTOVO a krátké shrnutí dole.", cta: "Podívejte se na výsledek", example: "Co jsme dotáhli", visual: "Fotografie výsledku" },
  progress: { label: "Rozdělané věci", icon: "🚧", pillar: "Rozdělané", badge: "45 %", purpose: "Transparentně ukázat, na čem se pracuje a co bude následovat.", typical: ["Průběh stavby", "Průběh příprav", "Aktuální stav projektu"], layout: "Fotografie průběhu, progress badge a jednoznačný další krok.", cta: "Sledujte další postup", example: "Dlouhý park: kde právě jsme", visual: "Fotografie průběhu" },
  future: { label: "Plány", icon: "🎯", pillar: "Plány", badge: "PLÁN", purpose: "Představit budoucnost, program, priority a realistickou vizi.", typical: ["Volební program", "Nové projekty", "Priority 2026–2030"], layout: "Velká ilustrace nebo vizualizace, dominantní headline a více prostoru pro text.", cta: "Projděte si celý plán", example: "Plán pro roky 2026–2030", visual: "Ilustrace / vizualizace" },
  explain: { label: "Vysvětlujeme", icon: "❗", pillar: "Vysvětlování", badge: "VYSVĚTLUJEME", purpose: "Srozumitelně vysvětlit složitá témata, FAQ a sporná tvrzení.", typical: ["Škola a kapacity", "Development a územní plán", "Financování projektů"], layout: "Minimalistická infografika, více textu, diagram a citace zdrojů.", cta: "Zjistěte všechna fakta", example: "Škola: kapacita dnes a další krok", visual: "Infografika / diagram" },
  evidence: { label: "Dokumenty a důkazy", icon: "📄", pillar: "Vysvětlování", badge: "DŮKAZ", purpose: "Podpořit tvrzení dohledatelnými dokumenty, mapami a historickými podklady.", typical: ["Usnesení a smlouvy", "Mapy a studie", "Historické dokumenty"], layout: "Dokument jako hlavní prvek, citace zdroje a QR kód na úplný podklad.", cta: "Podívejte se na dokumenty", example: "Dlouhý park: stavební povolení", visual: "Náhled dokumentu + QR" },
};

const contentTypeFromPillar = (pillar: SocialPost["pillar"]): ContentType => ({
  Lidé: "people",
  Práce: "completed",
  Rozdělané: "progress",
  Plány: "future",
  Vysvětlování: "explain",
})[pillar];

function ContentCard({ type, title, compact = false }: { type: ContentType; title: string; compact?: boolean }) {
  const template = contentTemplates[type];
  return (
    <article className={`content-card content-card-${type}${compact ? " content-card-compact" : ""}`} aria-label={`Šablona ${template.label}`}>
      <header><span className="content-card-pillar"><b>{template.icon}</b>{template.label}</span><span className="content-card-logo">PŘEZLEŤÁCI</span></header>
      <div className="content-card-visual"><span>{template.visual}</span><i>{template.badge}</i></div>
      <div className="content-card-copy"><span>{template.badge}</span><h3>{title}</h3><footer><small>{template.cta}</small><b>→</b></footer></div>
    </article>
  );
}

function DesignSystemChapter() {
  const templates = Object.entries(contentTemplates) as [ContentType, ContentTemplate][];
  const productionChecks = ["Správná šablona", "Správná barva", "Správná ikona", "Jeden jasný CTA", "Fotografie ve správném poměru", "Titulky u videa", "Odkaz na web"];
  return (
    <div className="design-system-content">
      <section className="design-system-lead">
        <div><span className="eyebrow">Cíl systému</span><h2>Rozpoznat typ sdělení na první pohled</h2><p>Každý statický příspěvek používá stejné rozmístění prvků. Mění se pouze centrálně řízená identita typu obsahu: barva, ikona, badge, CTA a styl titulku.</p></div>
        <aside><strong>Pracovní paleta</strong><p>Barvy níže jsou dočasné. Po dodání vizuální identity od Karla Hemzy se vymění pouze šest centrálních tokenů — bez úprav jednotlivých příspěvků.</p></aside>
      </section>

      <section className="content-template-grid" aria-label="Šest grafických šablon">
        {templates.map(([type, template]) => <ContentCard key={type} type={type} title={template.example} />)}
      </section>

      <section className="template-rules-grid">
        {templates.map(([type, template]) => (
          <article className={`template-rule template-rule-${type}`} key={type}>
            <header><span>{template.icon}</span><div><strong>{template.label}</strong><small>{type}</small></div></header>
            <p>{template.purpose}</p>
            <dl><div><dt>Typické výstupy</dt><dd>{template.typical.join(" · ")}</dd></div><div><dt>Šablona</dt><dd>{template.layout}</dd></div><div><dt>Výchozí CTA</dt><dd>{template.cta}</dd></div></dl>
          </article>
        ))}
      </section>

      <section className="design-standards-grid">
        <article><span className="eyebrow">Jednotné prvky</span><h3>Stejná kostra každého výstupu</h3><ul>{["Logo Přezleťáků", "Identifikační barva a ikona", "Jednotná typografie", "Stejné odsazení a grid", "Jeden jasný CTA"].map((item) => <li key={item}>{item}</li>)}</ul></article>
        <article><span className="eyebrow">Facebook</span><h3>Kontext a cesta na web</h3><p>Delší text, vysvětlení souvislostí a odkaz na úplný příběh nebo důkaz.</p><span className="eyebrow channel-instagram">Instagram</span><h3>Emoce a vizuální rytmus</h3><p>Více karuselů a Reels, méně textu v obrazu, silnější první slide.</p></article>
        <article><span className="eyebrow">Produkční kontrola</span><h3>Před publikací</h3><div className="production-checks">{productionChecks.map((item) => <span key={item}><i>✓</i>{item}</span>)}</div></article>
      </section>

      <section className="implementation-note">
        <div><span className="eyebrow">Implementováno</span><h3>Jedna komponenta ContentCard</h3><p>Autor zvolí pouze typ obsahu. Komponenta automaticky převezme odpovídající barvu, ikonu, badge, CTA a vizuální režim.</p></div>
        <code>type: people | completed | progress | future | explain | evidence</code>
      </section>
    </div>
  );
}

const navItems: { id: SectionId; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "⌂" },
  { id: "bible", label: "Campaign Bible", icon: "◈" },
  { id: "candidates", label: "Kandidáti", icon: "◎" },
  { id: "projects", label: "Projekty", icon: "◇" },
  { id: "calendar", label: "SoMe kalendář", icon: "▦" },
  { id: "web", label: "Web", icon: "↗" },
  { id: "checklist", label: "Checklist", icon: "✓" },
  { id: "timeline", label: "Timeline", icon: "→" },
  { id: "documents", label: "Dokumenty", icon: "▱" },
  { id: "settings", label: "Nastavení", icon: "⚙" },
];

const initialTasks: Task[] = [
  { id: 1, title: "Založit kompletní kandidátku 2026", status: "Done", priority: "Kritická", owner: "PM", deadline: "20. 7.", note: "Všech 11 lidí, pořadí, profese, funkce a rozsahy fotografií jsou založené.", document: "Kandidátní listina" },
  { id: 2, title: "Schválit hlavní komunikační linku", status: "Waiting", priority: "Vysoká", owner: "Klient", deadline: "21. 7.", note: "Positioning: Známe Přezletice zblízka. Ukazujeme lidi, práci a plán pro další roky." },
  { id: 3, title: "Vybrat 12 nejsilnějších témat", status: "Doing", priority: "Vysoká", owner: "PM", deadline: "22. 7.", note: "Každé téma musí unést web, social, video a důkaz." },
  { id: 4, title: "Přepsat medailonek Jana Macourka", status: "Doing", priority: "Vysoká", owner: "Copy", deadline: "20. 7.", note: "Převést dodaný text z životopisu na důvěryhodný sousedský příběh.", document: "Jan Macoure1.docx" },
  { id: 5, title: "Připravit shotlist pro focení", status: "To Do", priority: "Vysoká", owner: "Produkce", deadline: "26. 7.", note: "Portrét, pracovní prostředí, obec a skupinová fotografie." },
  { id: 6, title: "Rozdělit program do projektových karet", status: "Doing", priority: "Střední", owner: "PM", deadline: "23. 7.", note: "Program obsahuje přes 50 konkrétních záměrů v devíti oblastech.", document: "Volby 2026 program.docx" },
  { id: 7, title: "Dodat fotografie hotových projektů", status: "Waiting", priority: "Kritická", owner: "Klient", deadline: "25. 7.", note: "Ke každému výsledku potřebujeme konkrétní vizuální důkaz." },
  { id: 8, title: "Navrhnout homepage webu", status: "To Do", priority: "Střední", owner: "Web", deadline: "3. 8.", note: "Web musí fungovat jako veřejný důkazový systém." },
  { id: 9, title: "Založit srpnový obsahový balíček", status: "Done", priority: "Střední", owner: "PM", deadline: "18. 7.", note: "Reintrodukce, Jan Macourek, Dlouhý park a vysvětlovací carousel." },
  { id: 10, title: "Připravit formát krizových odpovědí", status: "To Do", priority: "Střední", owner: "Copy", deadline: "1. 8.", note: "Fakta → kontext → dopad → další krok. Bez osobních útoků." },
  { id: 11, title: "Importovat strategické podklady", status: "Done", priority: "Vysoká", owner: "PM", deadline: "18. 7.", note: "Campaign Hub, executive summary, program a ukázkový medailonek jsou načtené." },
];

const initialProjects: Project[] = [
  { id: 1, title: "Tři celky podzemních kontejnerů", status: "Hotové", area: "Životní prostředí", owner: "Obec", summary: "Tři již realizované celky jsou podkladem pro vytipování dalších lokalit.", evidence: "Doplnit fotografie a umístění", risk: "Bez fotek působí výsledek abstraktně.", argument: "Jde o ověřený formát, na který lze navázat dalšími lokalitami.", next: "Vybrat další místa a připravit stavbu.", history: "Realizovány tři celky; pokračování je součástí programu 2026–2030." },
  { id: 2, title: "Digitalizace plateb a agend", status: "Hotové", area: "Digitalizace", owner: "Úřad", summary: "Zaveden ITIS, správa veřejných prostranství Mawis a platební brána pro odpady a psy.", evidence: "Snímky systémů, statistiky využití", risk: "Občané nemusí vědět, co již lze vyřídit online.", argument: "Digitalizace má lidem šetřit návštěvy úřadu a čas.", next: "Připravit přehled služeb dostupných z domova.", history: "První nástroje jsou v provozu; pokračuje komplexní digitalizace." },
  { id: 3, title: "Elektronická úřední deska", status: "Hotové", area: "Digitalizace", owner: "Úřad", summary: "První informační panel stojí před obecním úřadem.", evidence: "Fotografie panelu", risk: "Vnímaná jen jako zákonná úřední deska.", argument: "Panel nabízí širší spektrum praktických informací pro obyvatele.", next: "Připravit druhý panel na Zlatém kopci.", history: "První panel realizován, druhý je programovou prioritou." },
  { id: 4, title: "Dlouhý park pod školou", status: "Rozpracované", area: "Životní prostředí", owner: "Jan Macourek", summary: "Projekt má stavební povolení, je podána žádost o dotaci a soutěží se zhotovitel.", evidence: "Stavební povolení, dotační žádost, vizualizace", risk: "Útok: projekt se vleče nebo je příliš drahý.", argument: "Projekt prošel povolením a je ve fázi konkrétní přípravy realizace.", next: "Uzavřít soutěž a komunikovat harmonogram.", history: "Studie → projekt → povolení → dotace → výběr zhotovitele." },
  { id: 5, title: "Park u křižovatky Nohavice", status: "Rozpracované", area: "Životní prostředí", owner: "Tým rozvoje", summary: "Hotová studie, připravuje se projekt pro povolení stavby.", evidence: "Studie a situační výkres", risk: "Nejasný termín realizace.", argument: "Studie je hotová; nyní se převádí do povolitelného projektu.", next: "Dokončit dokumentaci pro povolení.", history: "Vytipování lokality → studie → projektová příprava." },
  { id: 6, title: "Sportovně-relaxační centrum u rybníka", status: "Rozpracované", area: "Sport a hřiště", owner: "Tým rozvoje", summary: "Dokončení výsadby, zeleného altánu, travnatých a květnatých ploch a stezek.", evidence: "Fotodokumentace stavu a osazovací plán", risk: "Zaměňování s navazujícím projektem Na Hasičárně.", argument: "Jde o etapové dokončení veřejného prostoru a sportovního zázemí.", next: "Sepsat dokončené a zbývající etapy.", history: "Sportovní část vzniká po etapách; doplnění zeleně a cest pokračuje." },
  { id: 7, title: "Rozšíření kapacity svazkové školy", status: "Rozpracované", area: "Školství", owner: "Svazek obcí", summary: "První fáze počítá s kontejnerovou školou a navazuje příprava druhé budovy.", evidence: "Kapacitní data, projekt, zápisy svazku", risk: "Citlivé téma: dočasné řešení kontejnerovou školou.", argument: "Dočasná kapacita řeší akutní stav, druhá budova je systémové pokračování.", next: "Sjednotit harmonogram a komunikaci se svazkem obcí.", history: "Probíhá projektová příprava ve spolupráci svazku obcí." },
  { id: 8, title: "Sportoviště u školy", status: "Rozpracované", area: "Sport a hřiště", owner: "Obec + developer", summary: "Projekt a povolení jsou hotové, realizace je zajištěna za přispění developera.", evidence: "Povolení, projekt, smluvní závazek developera", risk: "Otázky k provoznímu režimu a dostupnosti.", argument: "Financování a povolení jsou připravené; zbývá realizace a provozní model.", next: "Dohodnout režim sportoviště se školou a kluby.", history: "Projekt → povolení → zajištění příspěvku developera." },
  { id: 9, title: "Optická síť CETIN", status: "Rozpracované", area: "Infrastruktura", owner: "Obec + CETIN", summary: "Příprava zasíťování obce optickou sítí největšího provozovatele v republice.", evidence: "Smlouva s CETIN, mapa tras", risk: "Výkopy a koordinace s dalšími stavbami.", argument: "Koordinovaná výstavba sníží budoucí zásahy do ulic.", next: "Publikovat mapu etap a orientační termíny.", history: "Jednání se společností CETIN a příprava tras." },
  { id: 10, title: "VOS Kaštanová", status: "Rozpracované", area: "Infrastruktura", owner: "Obec + CETIN", summary: "Projekt navazuje na stavební povolení a smlouvu se společností CETIN.", evidence: "Povolení a smlouva", risk: "Technický název je pro veřejnost nesrozumitelný.", argument: "Komunikovat praktický dopad, ne pouze technickou zkratku.", next: "Připravit jednoduchou vysvětlující kartu.", history: "Povolení a smluvní základ jsou zajištěné." },
  { id: 11, title: "SOKP 520 v tunelové variantě", status: "Rozpracované", area: "Doprava", owner: "Obec + ŘSD", summary: "Aktivní spolupráce s ŘSD s cílem co nejnižšího vlivu stavby na život v obci.", evidence: "Zápisy z jednání, varianty trasy, stanoviska", risk: "Silně citlivé téma s omezenou přímou kontrolou obce.", argument: "Role obce je vyjednávat konkrétní podmínky a minimalizovat dopady.", next: "Zpracovat chronologii jednání a dosažených změn.", history: "Dlouhodobá jednání a dohody s ŘSD pokračují." },
  { id: 12, title: "Kolejové spojení Praha–Brandýs", status: "Rozpracované", area: "Doprava", owner: "Kraj + ministerstvo", summary: "Prosazena studie proveditelnosti a podpora kraje i ministerstva, včetně zastávky v Přezleticích.", evidence: "Studie proveditelnosti a vyjádření institucí", risk: "Dlouhý horizont a závislost na nadřazených institucích.", argument: "Obec projekt neurčuje sama, ale prosadila Přezletice do prověřované varianty.", next: "Vysvětlit další rozhodovací kroky.", history: "Podpora kraje a ministerstva → studie proveditelnosti." },
  { id: 13, title: "EKO dvůr", status: "Plánované", area: "Životní prostředí", owner: "Obec", summary: "Pozemky pro stavbu jsou získané; vzniknout má sběrný dvůr a další ekologické prvky.", evidence: "List vlastnictví a situační plán", risk: "Obavy okolních obyvatel z dopravy a provozu.", argument: "Vlastní pozemek je zásadní první krok; provoz lze navrhnout s ohledem na okolí.", next: "Zadat studii provozu a dopravního řešení.", history: "Zajištěny pozemky, následuje projektová příprava." },
  { id: 14, title: "Nový vodojem", status: "Plánované", area: "Infrastruktura", owner: "Obec + developer", summary: "Má stabilizovat tlak a zvýšit odolnost proti dlouhodobým odstávkám vody.", evidence: "Kapacitní data, dohoda s developerem", risk: "Nákladnost a závislost na developerské výstavbě.", argument: "Vodojem řeší existující poklesy tlaku i budoucí růst obce.", next: "Doložit kapacitní výpočet a smluvní zajištění.", history: "Potřeba identifikována, financování je spojeno s developerem." },
  { id: 15, title: "Rozšíření kapacity ČOV", status: "Plánované", area: "Infrastruktura", owner: "Obec + developer", summary: "Navýšení kapacity stávající ČOV má přinést soběstačnost a finanční úspory.", evidence: "Kapacitní studie, smluvní rámec", risk: "Složitý technický projekt a růst obce.", argument: "Rozšíření existujícího řešení drží infrastrukturu pod kontrolou obce.", next: "Zpracovat veřejně srozumitelný kapacitní přehled.", history: "Příprava ve spolupráci s developerem." },
  { id: 16, title: "Rekonstrukce Sokolovny", status: "Plánované", area: "Kultura", owner: "Obec", summary: "Na hotovou studii má navázat kulturní dům pro plesy, výstavy a další aktivity.", evidence: "Studie rekonstrukce", risk: "Rozpočet, etapizace a budoucí provozní náklady.", argument: "Hotová studie umožňuje otevřeně porovnat rozsah, cenu a etapy.", next: "Zveřejnit studii a varianty financování.", history: "Studie je hotová; projekt čeká na další přípravu." },
  { id: 17, title: "Mateřská škola nad školou", status: "Plánované", area: "Školství", owner: "Obec", summary: "Příprava nové MŠ v návaznosti na potřeby při rozšiřování obce.", evidence: "Demografická data a územní podklady", risk: "Termín musí odpovídat reálnému růstu počtu dětí.", argument: "Kapacita se má připravovat podle dat, ne až po vzniku akutního problému.", next: "Aktualizovat demografický výhled.", history: "Záměr je navázán na rozvoj lokality a potřeby obce." },
  { id: 18, title: "Nový obecní úřad", status: "Plánované", area: "Digitalizace", owner: "Obec + developer", summary: "Důstojné prostory pro rozdělení úřadu na jednotlivé agendy; stavbu má financovat developer.", evidence: "Smluvní závazek a prostorový program", risk: "Vnímání jako nákladná budova místo služby občanům.", argument: "Nové prostory reagují na personální a agendový růst obce.", next: "Ukázat kapacitní potřebu a zdroj financování.", history: "Záměr je smluvně spojen s developerskou výstavbou." },
];

const candidateBaseAssets = { photos: true, medallion: false, bio: false, quote: false, video: false, faq: false };

// Zdrojový kalendář označuje medailonky čísly 1–11; vazba proto kopíruje
// explicitní pořadí kandidátů. Příspěvek „Celý tým“ je přiřazen všem.
const initialCandidates: Candidate[] = [
  { id: 1, order: 1, name: "Tomáš Říha", image: "/images/candidates/tomas-riha.webp", office: "Starosta obce Přezletice", professions: ["Jednatel obchodní společnosti hasičské a záchranářské techniky"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "TŘ", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2830–R5A2840"], assets: { ...candidateBaseAssets }, plannedPostIds: [102, 134], projectIds: [], documents: [] },
  { id: 2, order: 2, name: "Jan Macourek", image: "/images/candidates/jan-macourek.webp", office: "Místostarosta obce Přezletice", professions: ["Předseda svazku Přezletice – Podolanka – Jenštejn", "Podnikatel v nábytkářství"], bio: "V Přezleticích žije přes dvacet let. Je truhlář, dvanáct let působí v zastupitelstvu a ve svazku obcí pro výstavbu a provoz svazkové školy. Prosazuje technicky i finančně realistické projekty a hlídá vyvážený rozpočet.", initials: "JM", quote: "Mnohé plány vypadaly nemožně. Povedly se — a stejně konkrétně chci pracovat i dál.", topics: ["Rozvoj", "Finance", "Školství"], photoRanges: ["R5A2815–R5A2829", "R5A2867–R5A2878", "R5A3010–R5A3016"], assets: { ...candidateBaseAssets, medallion: true, bio: true, quote: true }, plannedPostIds: [104, 134], projectIds: [4], documents: ["Jan Macoure1.docx"] },
  { id: 3, order: 3, name: "Romana Bernardová", image: "/images/candidates/romana-bernardova.webp", office: "", professions: ["Důchodkyně", "Bývalá technická redaktorka"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "RB", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2907–R5A2918"], assets: { ...candidateBaseAssets }, plannedPostIds: [107, 134], projectIds: [], documents: [] },
  { id: 4, order: 4, name: "Ing. Lenka Bulová", image: "/images/candidates/lenka-bulova.webp", office: "Členka stavebního výboru", professions: ["Zahradní a krajinná architektka"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "LB", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2949–R5A2973"], assets: { ...candidateBaseAssets }, plannedPostIds: [110, 134], projectIds: [], documents: [] },
  { id: 5, order: 5, name: "Ing. Jan Káňa", image: "/images/candidates/jan-kana.webp", office: "", professions: ["Projektový manažer"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "JK", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2933–R5A2948"], assets: { ...candidateBaseAssets }, plannedPostIds: [113, 134], projectIds: [], documents: [] },
  { id: 6, order: 6, name: "Pavel Řeřucha", image: "/images/candidates/pavel-rerucha.webp", office: "", professions: ["Operační vedoucí Městské policie Praha"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "PŘ", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2890–R5A2905"], assets: { ...candidateBaseAssets }, plannedPostIds: [116, 134], projectIds: [], documents: [] },
  { id: 7, order: 7, name: "Václav Šmerda", image: "/images/candidates/vaclav-smerda.webp", office: "", professions: ["Vedoucí šéfkuchař", "Svazková jídelna Panská Pole"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "VŠ", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2879–R5A2889"], assets: { ...candidateBaseAssets }, plannedPostIds: [120, 134], projectIds: [], documents: [] },
  { id: 8, order: 8, name: "Ing. arch. Břetislav Lukeš", image: "/images/candidates/bretislav-lukes.webp", office: "Člen stavebního výboru", professions: ["Architekt"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "BL", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2841–R5A2866"], assets: { ...candidateBaseAssets }, plannedPostIds: [124, 134], projectIds: [], documents: [] },
  { id: 9, order: 9, name: "Lenka Brožová", image: "/images/candidates/lenka-brozova.webp", office: "Členka stavebního výboru", professions: ["Realitní konzultantka"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "LB", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2974–R5A2996"], assets: { ...candidateBaseAssets }, plannedPostIds: [127, 134], projectIds: [], documents: [] },
  { id: 10, order: 10, name: "Mgr. Bc. Jakub Tříska", image: "/images/candidates/jakub-triska.webp", office: "", professions: ["Ministerský rada MF ČR"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "JT", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2919–R5A2929"], assets: { ...candidateBaseAssets }, plannedPostIds: [130, 134], projectIds: [], documents: [] },
  { id: 11, order: 11, name: "Vojta Brož", image: "/images/candidates/vojta-broz.webp", office: "", professions: ["Student ČVUT", "Fakulta stavební"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "VB", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2997–R5A3008"], assets: { ...candidateBaseAssets }, plannedPostIds: [133, 134], projectIds: [], documents: [] },
];

const mergeCandidatesWithPlan = (savedCandidates: Candidate[], availablePosts: SocialPost[]) => {
  const validPostIds = new Set(availablePosts.map((post) => post.id));
  const knownIds = new Set(initialCandidates.map((candidate) => candidate.id));
  const merged = initialCandidates.map((base) => {
    const saved = savedCandidates.find((candidate) => candidate.id === base.id);
    if (!saved) return base;
    const savedLinks = Array.isArray(saved.plannedPostIds) ? saved.plannedPostIds.filter((id) => validPostIds.has(id)) : [];
    return { ...base, ...saved, image: base.image, plannedPostIds: Array.from(new Set([...base.plannedPostIds, ...savedLinks])) };
  });
  return [...merged, ...savedCandidates.filter((candidate) => !knownIds.has(candidate.id))];
};

const expandPhotoRanges = (ranges: string[]) => ranges.flatMap((range) => {
  const match = range.match(/^(R5A)(\d+)[–-](?:R5A)?(\d+)$/);
  if (!match) return [range];
  const [, prefix, start, end] = match;
  return Array.from({ length: Number(end) - Number(start) + 1 }, (_, index) => `${prefix}${Number(start) + index}`);
});

type BibleChapter = { title: string; label: string; body: string; bullets: string[]; kind?: "design-system" };

const bibleChapters: BibleChapter[] = [
  { title: "DNA kampaně", label: "Základ", body: "Kampaň není billboard ani souboj hesel. Je to veřejný důkazový systém: lidé, odvedená práce, rozdělané věci, realistické plány a otevřené vysvětlování.", bullets: ["Přezletice tvoří lidé, práce a konkrétní výsledky.", "Ukazovat fakta dřív než tvrzení.", "Přiznat stav věcí včetně překážek."] },
  { title: "Positioning", label: "Schválit", body: "Známe Přezletice zblízka. Ukazujeme lidi, práci a plán pro další roky.", bullets: ["Méně slibů. Více odvedené práce.", "Přezletice vedeme s respektem k lidem, místu i budoucnosti."] },
  { title: "Tone of Voice", label: "Pravidlo", body: "Klidný, sousedský, konkrétní, neútočný, neúřední, důkazový a lidský tón.", bullets: ["Krátké věty a běžná čeština.", "Bez agresivní politiky a přehnaných slibů.", "Mluvit jménem konkrétních lidí, ne anonymního kolektivu."] },
  { title: "Komunikační pilíře", label: "6 typů obsahu", body: "Lidé, Hotová práce, Rozdělané věci, Plány a Vysvětlování tvoří pět strategických pilířů. Dokumenty a důkazy jsou jejich společnou ověřovací vrstvou.", bullets: ["Lidé budují důvěru.", "Hotová práce dokládá kompetenci.", "Rozdělané věci ukazují realitu.", "Plány dávají směr.", "Vysvětlování předchází nedůvěře.", "Dokumenty a důkazy podpírají každé tvrzení."] },
  { title: "Lidé", label: "1 / 11", body: "Medailonek není životopis. Musí odpovědět, proč má občan tomuto člověku věřit, že bude pracovat pro obec.", bullets: ["Osobní motivace", "Konkrétní role", "Vztah k obci", "Jedno silné téma", "Civilní fotografie a krátké video"] },
  { title: "Hotová práce", label: "Důkazy", body: "Každý výsledek popsat přes problém, postup, výsledek, dopad na lidi a dohledatelný důkaz.", bullets: ["Fotografie před / po", "Rozpočet nebo dokument", "Konkrétní člověk za projektem", "Dopad na každodenní život"] },
  { title: "Design System komunikačních pilířů", label: "6 šablon · pracovní paleta", body: "Jednotný informační systém propojuje barvu, ikonu, badge, CTA, typografii a grid. Občan díky němu pozná typ sdělení ještě před přečtením textu.", bullets: [], kind: "design-system" },
  { title: "Rozdělané věci", label: "Transparentnost", body: "U každé rozpracované věci ukázat fázi, brzdu, další krok a termín další aktualizace.", bullets: ["Co řešíme", "Co už proběhlo", "Co nás brzdí", "Kdo je garant", "Kdy dáme další update"] },
  { title: "Plány", label: "2026–2030", body: "Program obsahuje přes padesát záměrů. Pro kampaň je nutné vybrat 10–12 nejsilnějších, realisticky vysvětlit první krok a přiřadit garanta.", bullets: ["Priorita pro obyvatele", "Reálná míra kontroly obce", "První proveditelný krok", "Zdroje a partneři"] },
  { title: "Citlivá témata", label: "Riziko", body: "D0/SOKP 520, tempo developerské výstavby, kapacita škol, voda a kanalizace, rozpočty velkých staveb a termíny nadřazených institucí.", bullets: ["Oddělit fakta od domněnek.", "Přiznat, co obec neřídí sama.", "Doložit chronologii jednání."] },
  { title: "Dokumenty a důkazy", label: "Chybí assety", body: "Každé silné téma musí mít alespoň jeden ověřitelný dokument a jeden vizuální důkaz.", bullets: ["Usnesení a smlouvy", "Studie a povolení", "Mapy", "Fotografie", "Čísla a harmonogramy"] },
  { title: "Storytelling", label: "Vzorec", body: "Tohle jsme řešili → takhle jsme postupovali → tohle se povedlo nebo je rozdělané → tady je dopad na lidi → tady je další krok.", bullets: ["Začínat dopadem na člověka.", "Technický kontext vysvětlit až potom.", "Končit konkrétním dalším krokem."] },
  { title: "Typy příspěvků", label: "Balíčky", body: "Jeden silný obsahový balíček vytvoří webový detail, Facebook post, Instagram carousel, krátké video a quote kartu.", bullets: ["1 video měsíčně", "3 statiky nebo carousely", "1 hlavní webové téma", "V závěru 1–2 výstupy týdně"] },
  { title: "Fotografie", label: "Čekáme", body: "Vizuál má být civilní, lokální a důvěryhodný. Lidé při práci, v obci a v přirozeném kontaktu s místem.", bullets: ["Portrét každého kandidáta", "Pracovní situace", "Projektové fotografie", "Široké záběry obce", "Skupinová fotografie"] },
  { title: "Video", label: "Formát", body: "Video staví na osobní rovině, jednoduchém vysvětlení a jedné hlavní myšlence.", bullets: ["30–60 sekund pro social", "2–3 minuty pro webový detail", "Titulky vždy", "Jedna otázka, jedna odpověď"] },
  { title: "Krizová komunikace", label: "Protokol", body: "Neodpovídat v afektu. Ověřit fakta, určit vlastníka odpovědi, připravit kontext a publikovat konzistentní stanovisko.", bullets: ["Zachytit dotaz nebo útok", "Ověřit zdroje", "Rozhodnout, zda reagovat", "Fakta → kontext → další krok"] },
  { title: "Moderace komentářů", label: "Pravidla", body: "Věcné dotazy zodpovídat, kritiku nechat viditelnou, osobní útoky a nenávist moderovat podle předem zveřejněných pravidel.", bullets: ["Odpovědět do 24 hodin", "Nepřít se o motivy", "Neskrývat nepohodlné otázky", "Eskalovat citlivé případy PM"] },
  { title: "FAQ", label: "Připravit", body: "FAQ musí pokrýt školu, dopravu, developery, vodu, kanalizaci, rozpočet, termíny velkých staveb a kompetence obce.", bullets: ["Krátká odpověď", "Detailní vysvětlení", "Zdroj nebo dokument", "Datum poslední aktualizace"] },
];

const webSections = [
  { name: "Homepage", purpose: "Během 30 sekund vysvětlit, kdo jsou Přezleťáci a proč jim věnovat pozornost.", content: "Positioning, lidé, vybrané výsledky, rozdělané věci, plán a poslední aktuality.", cta: "Poznejte lidi a naši práci", photos: "Skupinová fotografie, 3 projektové fotografie", video: "Krátký manifest / reintrodukce", readiness: 35 },
  { name: "O nás", purpose: "Ukázat občanskou a lokální povahu skupiny bez stranického klišé.", content: "Příběh skupiny, hodnoty, způsob práce a otevřenost.", cta: "Napište nám", photos: "Tým při práci v obci", video: "Volitelné", readiness: 25 },
  { name: "Lidé", purpose: "Budovat důvěru skrze konkrétní osoby, role a motivaci.", content: "11 medailonků, témata, citace, videa a vazby na projekty.", cta: "Poznejte celý tým", photos: "11 portrétů + pracovní fotografie", video: "11 krátkých vstupů", readiness: 9 },
  { name: "Výsledky", purpose: "Doložit kompetenci konkrétními výsledky a důkazy.", content: "Problém, postup, výsledek, dopad, garant a dokumenty.", cta: "Podívejte se na důkazy", photos: "Před / po, hotové projekty", video: "Výběrově", readiness: 30 },
  { name: "Projekty", purpose: "Transparentně ukázat rozpracované věci a jejich další kroky.", content: "Stav, historie, překážky, harmonogram a odpovědný člověk.", cta: "Co právě řešíme", photos: "Aktuální stav a vizualizace", video: "Vysvětlující vstupy", readiness: 44 },
  { name: "Program", purpose: "Převést více než 50 bodů programu do srozumitelných priorit.", content: "Devět oblastí, 10–12 hlavních priorit, první kroky a garanti.", cta: "Projděte si plán 2026–2030", photos: "Mapy a vizualizace", video: "Shrnutí priorit", readiness: 52 },
  { name: "FAQ", purpose: "Předcházet nedůvěře a odpovědět na citlivá témata.", content: "Škola, doprava, výstavba, voda, rozpočet, termíny a kompetence.", cta: "Zeptejte se", photos: "Nejsou nutné", video: "Výběrově", readiness: 18 },
  { name: "Kontakt", purpose: "Nabídnout jednoduchý a lidský kontakt s týmem.", content: "E-mail, sociální sítě, kontaktní formulář a pravidla moderace.", cta: "Ozvěte se nám", photos: "Skupinová fotografie", video: "Ne", readiness: 20 },
];

const timelineItems = [
  { date: "1. 8.", title: "Spuštění kampaně", category: "Marketing", note: "Reintrodukce Přezleťáků a vysvětlení důkazového přístupu." },
  { date: "4.–8. 8.", title: "Focení kandidátů", category: "Produkce", note: "Portréty, pracovní situace, obec a skupinová fotografie." },
  { date: "10.–14. 8.", title: "Natáčení I", category: "Produkce", note: "Medailonky a první vysvětlovací témata." },
  { date: "17. 8.", title: "První video", category: "Marketing", note: "Jan Macourek / role, motivace a konkrétní práce." },
  { date: "24. 8.", title: "Spuštění webu", category: "Web", note: "Minimum: homepage, lidé, výsledky, projekty a program." },
  { date: "1. 9.", title: "Tiskoviny do výroby", category: "Tisk", note: "Programový leták, kandidátní karta a venkovní formáty." },
  { date: "7.–18. 9.", title: "Natáčení II", category: "Produkce", note: "Škola, doprava, zeleň a rozvoj obce." },
  { date: "21. 9.", title: "Debaty a Q&A", category: "Klient", note: "Sada odpovědí na citlivá témata a veřejné dotazy." },
  { date: "28. 9.", title: "Roznos materiálů", category: "Tisk", note: "Distribuční plán, lokality, dobrovolníci a kontrola pokrytí." },
  { date: "5.–8. 10.", title: "Finální vlna", category: "Marketing", note: "Lidé, výsledky a plán. Bez přidávání nových slibů." },
  { date: "9. 10.", title: "Volební moratorium", category: "Klient", note: "Zastavit plánované výstupy a přepnout tým do monitoringu." },
  { date: "10. 10.", title: "Volby", category: "Klient", note: "Volební den, servisní informace a týmová koordinace." },
];

const documents = [
  { title: "Prezletaci_2026_Postplan_Kalendar.xlsx", category: "Publikační plán", type: "XLSX", status: "Načteno", updated: "20. 7. 2026", description: "Zdrojový kalendář 39 naplánovaných výstupů pro srpen, září a říjen 2026." },
  { title: "Volby 2026 program.docx", category: "Program", type: "DOCX", status: "Načteno", updated: "18. 7. 2026", description: "Volební program 2026–2030, více než 50 konkrétních záměrů v devíti oblastech." },
  { title: "Jan Macoure1.docx", category: "Kandidáti", type: "DOCX", status: "Načteno", updated: "18. 7. 2026", description: "Zdrojový medailonek Jana Macourka." },
  { title: "Campaign Hub export", category: "Reference", type: "ZIP", status: "Načteno", updated: "18. 7. 2026", description: "Vizuální a informační prototyp strategického hubu." },
  { title: "Campaign context", category: "Dokumenty", type: "MD", status: "Načteno", updated: "18. 7. 2026", description: "Kompletní strategický, obsahový, vizuální a technický kontext." },
  { title: "Executive summary", category: "Reference", type: "HTML", status: "Načteno", updated: "18. 7. 2026", description: "Samostatné shrnutí komunikačního rámce a publikačního rytmu." },
  { title: "Fotografie kandidátů", category: "Fotografie", type: "Složka", status: "Čekáme", updated: "—", description: "Chybí portréty, pracovní fotografie a skupinový snímek." },
  { title: "Fotografie projektů", category: "Fotografie", type: "Složka", status: "Čekáme", updated: "—", description: "Chybí vizuální důkazy hotových a rozpracovaných projektů." },
  { title: "Videa kandidátů", category: "Videa", type: "Složka", status: "Čekáme", updated: "—", description: "Připravený prostor pro 11 krátkých medailonků." },
  { title: "Usnesení a smlouvy", category: "Usnesení", type: "Složka", status: "Čekáme", updated: "—", description: "Důkazové dokumenty k projektům a developerským závazkům." },
  { title: "Studie a mapy", category: "Mapy", type: "Složka", status: "Čekáme", updated: "—", description: "Dlouhý park, Nohavice, Sokolovna, doprava a územní plánování." },
];

const monthOptions = [
  { label: "Srpen", month: 7 },
  { label: "Září", month: 8 },
  { label: "Říjen", month: 9 },
];

const DATA_VERSION = 4;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

const pillarClass = (pillar: string) => `pillar-${slugify(pillar)}`;
const postPillarClass = (post: SocialPost) => post.contentType === "evidence" ? "pillar-dokumenty" : pillarClass(post.pillar);

const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "long", year: "numeric" }).format(new Date(year, month - 1, day));
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [candidateView, setCandidateView] = useState<CandidateView>("overview");
  const [posts, setPosts] = useState<SocialPost[]>(initialPosts);
  const [hydrated, setHydrated] = useState(false);
  const [createType, setCreateType] = useState<"project" | "candidate" | "post" | "task" | null>(null);
  const [createForm, setCreateForm] = useState({ title: "", detail: "", meta: "" });
  const [createContentType, setCreateContentType] = useState<ContentType>("completed");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<(typeof documents)[number] | null>(null);
  const [toast, setToast] = useState("");
  const [projectStatus, setProjectStatus] = useState<"Vše" | ProjectStatus>("Vše");
  const [projectQuery, setProjectQuery] = useState("");
  const [taskPriority, setTaskPriority] = useState<"Vše" | Priority>("Vše");
  const [taskOwner, setTaskOwner] = useState("Všichni");
  const [calendarMonth, setCalendarMonth] = useState(0);
  const [timelineFilter, setTimelineFilter] = useState("Vše");
  const [documentQuery, setDocumentQuery] = useState("");
  const [documentCategory, setDocumentCategory] = useState("Vše");

  useEffect(() => {
    let data: { dataVersion?: number; tasks?: Task[]; projects?: Project[]; candidates?: Candidate[]; posts?: SocialPost[]; theme?: string } | null = null;
    try {
      const saved = window.localStorage.getItem("prezletaci-campaign-os");
      if (saved) data = JSON.parse(saved);
    } catch {
      // A malformed local draft must never prevent the campaign OS from loading.
    }
    queueMicrotask(() => {
      if (data) {
        if (data.dataVersion === 2 || data.dataVersion === 3 || data.dataVersion === DATA_VERSION) {
          const migratedPosts = Array.isArray(data.posts) ? mergePostsWithPlan(data.posts, data.dataVersion) : initialPosts;
          if (Array.isArray(data.tasks)) setTasks(data.tasks);
          if (Array.isArray(data.projects)) setProjects(data.projects);
          if (Array.isArray(data.candidates)) setCandidates(mergeCandidatesWithPlan(data.candidates, migratedPosts));
          setPosts(migratedPosts);
        }
        if (data.theme === "dark" || data.theme === "light") setTheme(data.theme);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      "prezletaci-campaign-os",
      JSON.stringify({ dataVersion: DATA_VERSION, tasks, projects, candidates, posts, theme }),
    );
  }, [hydrated, tasks, projects, candidates, posts, theme]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setCreateType(null);
        setSelectedCandidate(null);
        setSelectedProject(null);
        setSelectedPost(null);
        setSelectedTask(null);
        setSelectedDocument(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const election = new Date(2026, 9, 10);
  const campaignStart = new Date(2026, 7, 1);
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((election.getTime() - today.getTime()) / 86400000));
  const campaignProgress = Math.max(
    0,
    Math.min(100, Math.round(((today.getTime() - campaignStart.getTime()) / (election.getTime() - campaignStart.getTime())) * 100)),
  );

  const completeProjects = projects.filter((project) => project.status === "Hotové").length;
  const activeProjects = projects.filter((project) => project.status === "Rozpracované").length;
  const readyCandidates = candidates.filter((candidate) => candidate.assets.bio && candidate.assets.medallion).length;
  const candidatesWithPhotos = candidates.filter((candidate) => candidate.assets.photos).length;
  const candidatesWithMedallion = candidates.filter((candidate) => candidate.assets.medallion).length;
  const candidatesWithVideo = candidates.filter((candidate) => candidate.assets.video).length;
  const candidatesWithProfile = candidates.filter((candidate) => candidate.name && candidate.order && candidate.professions.length && candidate.assets.photos).length;
  const candidatesWithPosts = candidates.filter((candidate) => candidate.plannedPostIds.length).length;
  const openTasks = tasks.filter((task) => task.status !== "Done").length;
  const clientDebts = tasks.filter((task) => task.owner === "Klient" && task.status !== "Done");
  const plannedPosts = posts.filter((post) => post.status !== "Publikováno").length;
  const chronologicalPosts = useMemo(() => sortPosts(posts), [posts]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    const items = [
      ...navItems.map((item) => ({ title: item.label, meta: "Sekce", action: () => navigate(item.id) })),
      ...projects.map((item) => ({ title: item.title, meta: `Projekt · ${item.status}`, action: () => { setSelectedProject(item); setSearchOpen(false); } })),
      ...candidates.map((item) => ({ title: item.name, meta: `Kandidát · ${item.professions.join(", ")}`, action: () => { setSelectedCandidate(item); setSearchOpen(false); } })),
      ...documents.map((item) => ({ title: item.title, meta: `Dokument · ${item.category}`, action: () => { setSelectedDocument(item); setSearchOpen(false); } })),
    ];
    return items.filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(query)).slice(0, 8);
  }, [searchQuery, projects, candidates]);

  function navigate(id: SectionId) {
    setActiveSection(id);
    setMobileNav(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openCreate(type: "project" | "candidate" | "post" | "task", preset = "") {
    setCreateForm({ title: "", detail: "", meta: preset });
    setCreateContentType("completed");
    setCreateType(type);
  }

  function submitCreate(event: FormEvent) {
    event.preventDefault();
    if (!createType || !createForm.title.trim()) return;
    const id = Date.now();
    if (createType === "task") {
      setTasks((items) => [...items, { id, title: createForm.title, status: "To Do", priority: "Střední", owner: createForm.meta || "PM", deadline: createForm.detail || "Bez termínu", note: "Nově přidaný lokální úkol." }]);
    }
    if (createType === "project") {
      setProjects((items) => [...items, { id, title: createForm.title, status: "Plánované", area: createForm.meta || "Nezařazeno", owner: "Doplnit garanta", summary: createForm.detail || "Nový projekt čeká na doplnění briefu.", evidence: "Doplnit", risk: "Vyhodnotit", argument: "Připravit", next: "Doplnit vlastníka a první krok.", history: "Projekt založen v Campaign OS." }]);
    }
    if (createType === "candidate") {
      const candidate: Candidate = { id, order: candidates.length + 1, name: createForm.title, image: "", office: createForm.detail, professions: [createForm.meta || "Profese k doplnění"], bio: "Nový kandidát čeká na doplnění medailonku.", initials: createForm.title.split(" ").filter((part) => !part.endsWith(".")).map((part) => part[0]).join("").slice(0, 2).toUpperCase(), topics: ["Doplnit komunikační témata"], photoRanges: [], assets: { photos: false, medallion: false, bio: false, quote: false, video: false, faq: false }, plannedPostIds: [], projectIds: [], documents: [] };
      setCandidates((items) => [...items, candidate]);
    }
    if (createType === "post") {
      setPosts((items) => sortPosts([...items, { id, date: /^2026-\d{2}-\d{2}$/.test(createForm.meta) ? createForm.meta : "2026-08-01", title: createForm.title, contentType: createContentType, pillar: contentTemplates[createContentType].pillar, format: "Post", status: "Námět", author: createForm.detail || "Obsahový tým", graphic: "Čeká", copy: "Čeká", approval: "Čeká" }]));
    }
    setCreateType(null);
    setToast("Položka byla přidána do lokální pracovní verze.");
  }

  function advanceTask(task: Task) {
    const flow: TaskStatus[] = ["To Do", "Waiting", "Doing", "Done"];
    const next = flow[Math.min(flow.indexOf(task.status) + 1, flow.length - 1)];
    setTasks((items) => items.map((item) => item.id === task.id ? { ...item, status: next } : item));
    setSelectedTask({ ...task, status: next });
    setToast(`Úkol přesunut do ${next}.`);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify({ dataVersion: DATA_VERSION, exportedAt: new Date().toISOString(), tasks, projects, candidates, posts }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "prezletaci-campaign-os-backup.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setToast("Lokální záloha byla exportována.");
  }

  async function importData(file?: File) {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (Array.isArray(data.tasks)) setTasks(data.tasks);
      if (Array.isArray(data.projects)) setProjects(data.projects);
      const importedPosts = Array.isArray(data.posts) ? mergePostsWithPlan(data.posts, data.dataVersion) : initialPosts;
      if ((data.dataVersion === 3 || data.dataVersion === DATA_VERSION) && Array.isArray(data.candidates)) setCandidates(mergeCandidatesWithPlan(data.candidates, importedPosts));
      setPosts(importedPosts);
      setToast("Záloha byla načtena.");
    } catch {
      setToast("Soubor není platná záloha Campaign OS.");
    }
  }

  const filteredProjects = projects.filter((project) => {
    const statusMatches = projectStatus === "Vše" || project.status === projectStatus;
    const queryMatches = `${project.title} ${project.area} ${project.owner}`.toLowerCase().includes(projectQuery.toLowerCase());
    return statusMatches && queryMatches;
  });

  const owners = ["Všichni", ...Array.from(new Set(tasks.map((task) => task.owner)))];
  const filteredTasks = tasks.filter((task) => (taskPriority === "Vše" || task.priority === taskPriority) && (taskOwner === "Všichni" || task.owner === taskOwner));
  const filteredTimeline = timelineFilter === "Vše" ? timelineItems : timelineItems.filter((item) => item.category === timelineFilter);
  const docCategories = ["Vše", ...Array.from(new Set(documents.map((document) => document.category)))];
  const filteredDocuments = documents.filter((document) => (documentCategory === "Vše" || document.category === documentCategory) && `${document.title} ${document.description}`.toLowerCase().includes(documentQuery.toLowerCase()));

  const renderDashboard = () => (
    <div className="section-stack dashboard-view">
      <section className="mission-grid">
        <article className="glass-card mission-card">
          <div className="mission-copy">
            <span className="eyebrow">Mise · komunální volby 2026</span>
            <h1>Jedna obrazovka.<br />Celá kampaň.</h1>
            <p>Operační systém pro lidi, práci, obsah a důkazy. Vše, co tým potřebuje vědět před další poradou.</p>
          </div>
          <div className="countdown-block">
            <span>Do voleb</span>
            <strong>{daysLeft}</strong>
            <small>dní · 10. října 2026</small>
          </div>
          <div className="progress-block">
            <div className="progress-head"><span>Připravenost kampaně</span><strong>43 %</strong></div>
            <div className="progress-track"><span style={{ width: "43%" }} /></div>
            <div className="progress-meta"><span>Start 1. 8.</span><span>Čas kampaně {campaignProgress} %</span></div>
          </div>
        </article>

        <article className="glass-card fire-card">
          <div className="card-heading">
            <div><span className="eyebrow danger">Priorita dne</span><h2>Co hoří</h2></div>
            <span className="count-pill danger-pill">3</span>
          </div>
          <button className="fire-item" onClick={() => navigate("checklist")}>
            <span className="priority-dot critical" />
            <span><strong>10 jmen kandidátů</strong><small>Blokuje focení a medailonky</small></span>
            <b>24. 7.</b>
          </button>
          <button className="fire-item" onClick={() => navigate("documents")}>
            <span className="priority-dot critical" />
            <span><strong>Fotografie projektů</strong><small>Bez nich nemáme důkazový obsah</small></span>
            <b>25. 7.</b>
          </button>
          <button className="fire-item" onClick={() => navigate("bible")}>
            <span className="priority-dot high" />
            <span><strong>Schválit positioning</strong><small>Potřebuje potvrzení klienta</small></span>
            <b>21. 7.</b>
          </button>
        </article>
      </section>

      <section className="kpi-grid" aria-label="Klíčové ukazatele kampaně">
        {[
          ["Kandidáti", `${readyCandidates} / 11`, "textově připraven", "candidates"],
          ["Hotové projekty", completeProjects, "s doloženým stavem", "projects"],
          ["Rozpracované", activeProjects, "vyžadují update", "projects"],
          ["Příspěvky", plannedPosts, "v publikačním plánu", "calendar"],
          ["Fotografie", `${candidatesWithPhotos} / 11`, "rozsahy přiřazeny", "candidates"],
          ["Videa", "0 / 11", "shotlist se připravuje", "calendar"],
          ["Otevřené úkoly", openTasks, "napříč týmem", "checklist"],
        ].map(([label, value, note, section]) => (
          <button className="metric-card glass-card" key={label} onClick={() => navigate(section as SectionId)}>
            <span>{label}</span><strong>{value}</strong><small>{note}</small>
          </button>
        ))}
      </section>

      <section className="quick-actions glass-card">
        <div><span className="eyebrow">Založit novou práci</span><strong>Quick Actions</strong></div>
        <div className="quick-buttons">
          <button onClick={() => openCreate("project")}><span>＋</span> Projekt</button>
          <button onClick={() => openCreate("candidate")}><span>＋</span> Kandidáta</button>
          <button onClick={() => openCreate("post")}><span>＋</span> Post</button>
          <button onClick={() => openCreate("task")}><span>＋</span> Úkol</button>
        </div>
      </section>

      <section className="operations-grid">
        <article className="glass-card operations-card">
          <div className="card-heading">
            <div><span className="eyebrow">Publikace</span><h2>Co se publikuje</h2></div>
            <button className="text-button" onClick={() => navigate("calendar")}>Kalendář →</button>
          </div>
          <div className="publication-list">
            {chronologicalPosts.filter((post) => post.status !== "Publikováno").slice(0, 4).map((post) => (
              <button key={post.id} className="publication-row" onClick={() => setSelectedPost(post)}>
                <time>{new Date(`${post.date}T12:00:00`).toLocaleDateString("cs-CZ", { day: "numeric", month: "short" })}</time>
                <span className={`pillar-line ${postPillarClass(post)}`} />
                <span><strong>{post.title}</strong><small>{post.format} · {post.pillar}</small></span>
                <b className="status-pill neutral">{post.status}</b>
              </button>
            ))}
          </div>
        </article>

        <article className="glass-card operations-card client-card">
          <div className="card-heading">
            <div><span className="eyebrow warning">Externí blokace</span><h2>Co dluží klient</h2></div>
            <span className="count-pill warning-pill">{clientDebts.length}</span>
          </div>
          <div className="debt-list">
            {clientDebts.map((task) => (
              <button key={task.id} onClick={() => setSelectedTask(task)}>
                <span className="check-ring" />
                <span><strong>{task.title}</strong><small>Deadline {task.deadline}</small></span>
              </button>
            ))}
          </div>
          <div className="client-health"><span>Rychlost dodání podkladů</span><strong>Riziko</strong></div>
        </article>

        <article className="glass-card operations-card">
          <div className="card-heading">
            <div><span className="eyebrow">Roadmap</span><h2>Co nás čeká</h2></div>
            <button className="text-button" onClick={() => navigate("timeline")}>Timeline →</button>
          </div>
          <div className="milestone-list">
            {timelineItems.slice(0, 5).map((item, index) => (
              <button key={item.title} onClick={() => navigate("timeline")}>
                <span className="milestone-node">{index + 1}</span>
                <span><strong>{item.title}</strong><small>{item.category} · {item.date}</small></span>
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="source-strip glass-card">
        <div className="source-icon">✓</div>
        <div><span className="eyebrow">Zdroje načteny</span><strong>Dashboard je založen na dodaných podkladech</strong><p>Publikační kalendář, Campaign Hub, executive summary, program 2026–2030 a medailonek Jana Macourka.</p></div>
        <div className="source-stats"><span><b>39</b> naplánovaných výstupů</span><span><b>18</b> projektových karet</span><span><b>11</b> kandidátů</span></div>
      </section>
    </div>
  );

  const renderBible = () => (
    <div className="section-stack">
      <section className="section-intro glass-card bible-intro">
        <div><span className="eyebrow">Strategický zdroj pravdy</span><h1>Campaign Bible</h1><p>Živý rámec pro rozhodování, psaní, vizuál, produkci i reakce na citlivá témata.</p></div>
        <div className="bible-principle"><span>Hlavní princip</span><strong>Neříkat, že jsme nejlepší.<br />Ukázat, co za námi stojí.</strong></div>
      </section>
      <div className="accordion-list">
        {bibleChapters.map((chapter, index) => (
          <details className={`glass-card accordion-item${chapter.kind === "design-system" ? " design-system-chapter" : ""}`} key={chapter.title} open={index === 0 || chapter.kind === "design-system"}>
            <summary><span className="accordion-index">{String(index + 1).padStart(2, "0")}</span><span><strong>{chapter.title}</strong><small>{chapter.label}</small></span><b>＋</b></summary>
            {chapter.kind === "design-system" ? <DesignSystemChapter /> : <div className="accordion-content"><p>{chapter.body}</p><ul>{chapter.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>}
          </details>
        ))}
      </div>
    </div>
  );

  const renderCandidates = () => {
    const coverage = [
      { label: "Kandidátů", value: candidates.length, note: "kompletní kandidátka", tone: "blue" },
      { label: "Fotografie", value: candidatesWithPhotos, note: "rozsahy přiřazeny", tone: "green" },
      { label: "Medailonek", value: candidatesWithMedallion, note: "obsah připraven", tone: "yellow" },
      { label: "Video", value: candidatesWithVideo, note: "výstup připraven", tone: "purple" },
      { label: "Profil", value: candidatesWithProfile, note: "základní karta", tone: "blue" },
      { label: "Příspěvky", value: candidatesWithPosts, note: "má plánovaný výstup", tone: "green" },
    ];
    return (
      <div className="section-stack candidates-module">
        <section className="section-intro compact-intro glass-card candidate-intro">
          <div><span className="eyebrow">Kandidátka Přezleťáci 2026</span><h1>11 lidí pro Přezletice</h1><p>Kompletní kandidátní databáze propojuje profily, produkční podklady, projekty a budoucí komunikační výstupy.</p></div>
          <div className="candidate-intro-media"><Image src="/images/team/team-hero.webp" alt="Tým Přezleťáků" fill sizes="(max-width: 640px) 100vw, 360px" priority unoptimized /><button className="primary-button" onClick={() => openCreate("candidate")}>＋ Přidat kandidáta</button></div>
        </section>

        <nav className="candidate-tabs glass-card" aria-label="Pohledy kandidátky">
          {(["overview", "matrix", "dashboard"] as CandidateView[]).map((view) => <button key={view} className={candidateView === view ? "active" : ""} onClick={() => setCandidateView(view)}><span>{view === "overview" ? "◎" : view === "matrix" ? "▦" : "◫"}</span>{view === "overview" ? "Přehled" : view === "matrix" ? "Matrice" : "Dashboard"}</button>)}
        </nav>

        {candidateView === "overview" && <>
          <section className="candidate-readiness glass-card">
            <div><span>Fotografie</span><strong>{candidatesWithPhotos} / {candidates.length}</strong><div className="mini-progress"><i style={{ width: `${candidatesWithPhotos / candidates.length * 100}%` }} /></div></div>
            <div><span>Medailonky</span><strong>{candidatesWithMedallion} / {candidates.length}</strong><div className="mini-progress"><i style={{ width: `${candidatesWithMedallion / candidates.length * 100}%` }} /></div></div>
            <div><span>Videa</span><strong>{candidatesWithVideo} / {candidates.length}</strong><div className="mini-progress"><i style={{ width: `${candidatesWithVideo / candidates.length * 100}%` }} /></div></div>
            <div><span>Naplánované výstupy</span><strong>{candidatesWithPosts} / {candidates.length}</strong><div className="mini-progress"><i style={{ width: `${candidatesWithPosts / candidates.length * 100}%` }} /></div></div>
          </section>
          <section className="candidate-grid">
            {[...candidates].sort((a, b) => a.order - b.order).map((candidate) => {
              const photoCount = expandPhotoRanges(candidate.photoRanges).length;
              const readiness = Object.values(candidate.assets).filter(Boolean).length;
              return <button className="candidate-card glass-card" key={candidate.id} onClick={() => setSelectedCandidate(candidate)}>
                <div className="candidate-visual"><span aria-hidden="true">{candidate.initials}</span>{candidate.image && <Image src={candidate.image} alt={`Portrét – ${candidate.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1180px) 50vw, 25vw" unoptimized onError={(event) => { event.currentTarget.hidden = true; }} />}<b>#{candidate.order}</b><i>{photoCount} foto přiřazeno</i></div>
                <div className="candidate-copy"><span className={`status-pill candidate-status ${readiness >= 4 ? "success" : "warning-pill"}`}>{readiness} / 6 podkladů</span><h2>{candidate.name}</h2><strong>{candidate.office || candidate.professions[0]}</strong><p>{candidate.office ? candidate.professions.join(" · ") : candidate.professions.slice(1).join(" · ") || "Profil připraven k doplnění"}</p><small>Otevřít profil →</small></div>
              </button>;
            })}
          </section>
        </>}

        {candidateView === "matrix" && <section className="candidate-matrix glass-card">
          <div className="card-heading"><div><span className="eyebrow">Candidate Matrix</span><h2>Vazby a připravenost</h2></div><span className="count-pill">{candidates.length}</span></div>
          <div className="matrix-scroll"><table><thead><tr><th>Kandidát</th><th>Funkce</th><th>Projekty</th><th>Příspěvky</th><th>Stav podkladů</th></tr></thead><tbody>{[...candidates].sort((a, b) => a.order - b.order).map((candidate) => {
            const completed = Object.values(candidate.assets).filter(Boolean).length;
            return <tr key={candidate.id} onClick={() => setSelectedCandidate(candidate)}><td><span className="matrix-person"><b>{candidate.order}</b><i>{candidate.initials}</i><span><strong>{candidate.name}</strong><small>{candidate.professions[0]}</small></span></span></td><td>{candidate.office || "—"}</td><td><strong>{candidate.projectIds.length}</strong><small> propojení</small></td><td><strong>{candidate.plannedPostIds.length}</strong><small> v plánu</small></td><td><div className="matrix-progress"><span><b>{completed}/6</b><small>{Math.round(completed / 6 * 100)} %</small></span><div className="mini-progress"><i style={{ width: `${completed / 6 * 100}%` }} /></div></div></td></tr>;
          })}</tbody></table></div>
        </section>}

        {candidateView === "dashboard" && <>
          <section className="candidate-coverage-grid">{coverage.map((metric) => <article className={`glass-card coverage-card coverage-${metric.tone}`} key={metric.label}><span>{metric.label}</span><strong>{metric.value}<small> / {candidates.length}</small></strong><p>{metric.note}</p><div className="mini-progress"><i style={{ width: `${Math.min(100, metric.value / candidates.length * 100)}%` }} /></div></article>)}</section>
          <section className="candidate-production glass-card"><div className="card-heading"><div><span className="eyebrow">Stav podkladů</span><h2>Produkční pokrytí kandidátky</h2></div><span className="status-pill warning-pill">Priorita: obsah</span></div><div className="production-bars">{(["photos", "medallion", "bio", "quote", "video", "faq"] as const).map((asset) => { const count = candidates.filter((candidate) => candidate.assets[asset]).length; const labels = { photos: "Fotografie", medallion: "Medailonek", bio: "Bio", quote: "Citace", video: "Video", faq: "FAQ" }; return <div key={asset}><span><strong>{labels[asset]}</strong><small>{count} / {candidates.length}</small></span><div className="progress-track"><i style={{ width: `${count / candidates.length * 100}%` }} /></div></div>; })}</div></section>
        </>}
      </div>
    );
  };

  const renderProjects = () => (
    <div className="section-stack">
      <section className="section-intro compact-intro glass-card">
        <div><span className="eyebrow">Důkazová databáze</span><h1>Projekty</h1><p>Známé záměry z programu převedené do pracovních karet s riziky, argumentací, důkazy a dalším krokem.</p></div>
        <button className="primary-button" onClick={() => openCreate("project")}>＋ Přidat projekt</button>
      </section>
      <div className="filter-bar glass-card">
        <div className="segmented-control">
          {(["Vše", "Hotové", "Rozpracované", "Plánované"] as const).map((status) => <button className={projectStatus === status ? "active" : ""} key={status} onClick={() => setProjectStatus(status)}>{status}<span>{status === "Vše" ? projects.length : projects.filter((project) => project.status === status).length}</span></button>)}
        </div>
        <label className="inline-search"><span>⌕</span><input value={projectQuery} onChange={(event) => setProjectQuery(event.target.value)} placeholder="Hledat projekt, oblast nebo garanta…" /></label>
      </div>
      <section className="project-grid">
        {filteredProjects.map((project) => (
          <button className="project-card glass-card" key={project.id} onClick={() => setSelectedProject(project)}>
            <div className="project-top"><span className={`status-pill project-${slugify(project.status)}`}>{project.status}</span><span className="project-id">P-{String(project.id).padStart(2, "0")}</span></div>
            <div className="project-image-placeholder"><span>{project.area.slice(0, 1)}</span><small>Fotografie k doplnění</small></div>
            <div className="project-copy"><span className="eyebrow">{project.area}</span><h2>{project.title}</h2><p>{project.summary}</p></div>
            <div className="project-footer"><span><small>Garant</small><strong>{project.owner}</strong></span><span><small>Důkaz</small><strong>{project.evidence === "Doplnit" ? "Chybí" : "Evidován"}</strong></span><b>→</b></div>
          </button>
        ))}
      </section>
    </div>
  );

  const renderCalendar = () => {
    const selected = monthOptions[calendarMonth];
    const firstDay = new Date(2026, selected.month, 1).getDay();
    const leading = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(2026, selected.month + 1, 0).getDate();
    const cells = [...Array.from({ length: leading }, () => null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
    while (cells.length % 7 !== 0) cells.push(null);
    const monthPosts = posts.filter((post) => Number(post.date.slice(5, 7)) - 1 === selected.month).sort((a, b) => a.date.localeCompare(b.date));
    return (
      <div className="section-stack">
        <section className="section-intro compact-intro glass-card">
          <div><span className="eyebrow">Publikační plán</span><h1>SoMe kalendář</h1><p>Skutečný měsíční kalendář a navazující timeline obsahu pro Facebook, Instagram, web a video.</p></div>
          <button className="primary-button" onClick={() => openCreate("post")}>＋ Přidat post</button>
        </section>
        <div className="calendar-layout">
          <section className="calendar-panel glass-card">
            <div className="calendar-toolbar"><div className="month-switcher">{monthOptions.map((month, index) => <button className={calendarMonth === index ? "active" : ""} key={month.label} onClick={() => setCalendarMonth(index)}>{month.label}</button>)}</div><div className="calendar-legend"><span className="pillar-lide">Lidé</span><span className="pillar-prace">Hotová práce</span><span className="pillar-rozdelane">Rozdělané</span><span className="pillar-plany">Plány</span><span className="pillar-vysvetlovani">Vysvětlujeme</span><span className="pillar-dokumenty">Důkazy</span></div></div>
            <div className="weekday-row">{["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((day) => <span key={day}>{day}</span>)}</div>
            <div className="calendar-grid">
              {cells.map((day, index) => {
                if (!day) return <div className="calendar-day empty" key={`empty-${index}`} />;
                const iso = `2026-${String(selected.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayPosts = posts.filter((post) => post.date === iso);
                return <button className={`calendar-day ${dayPosts.length ? "has-post" : ""}`} key={iso} onClick={() => dayPosts[0] ? setSelectedPost(dayPosts[0]) : openCreate("post", iso)}><time>{day}</time>{dayPosts.map((post) => <span key={post.id} className={`calendar-event ${postPillarClass(post)}`}><b>{post.format}</b>{post.title}</span>)}{!dayPosts.length && <i>＋</i>}</button>;
              })}
            </div>
          </section>
          <aside className="content-timeline glass-card">
            <div className="card-heading"><div><span className="eyebrow">Timeline</span><h2>{selected.label} 2026</h2></div><span className="count-pill">{monthPosts.length}</span></div>
            <div className="content-timeline-list">
              {monthPosts.length ? monthPosts.map((post) => <button key={post.id} onClick={() => setSelectedPost(post)}><time>{new Date(`${post.date}T12:00:00`).toLocaleDateString("cs-CZ", { day: "numeric", month: "short" })}</time><span className={`timeline-dot ${postPillarClass(post)}`} /><span><strong>{post.title}</strong><small>{post.format} · {post.status}</small></span></button>) : <div className="empty-state">V tomto měsíci zatím nejsou žádné příspěvky.</div>}
            </div>
            <div className={`calendar-capacity${monthPosts.length > 8 ? " over-capacity" : ""}`}><span>Kapacita týmu</span><strong>{monthPosts.length} / 8 výstupů</strong>{monthPosts.length > 8 && <small>Kapacita překročena o {monthPosts.length - 8}</small>}<div className="mini-progress"><i style={{ width: `${Math.min(100, monthPosts.length / 8 * 100)}%` }} /></div></div>
          </aside>
        </div>
      </div>
    );
  };

  const renderWeb = () => (
    <div className="section-stack">
      <section className="section-intro glass-card web-intro"><div><span className="eyebrow">Brief pro webaře</span><h1>Veřejný web jako důkazový systém</h1><p>Web vysvětluje do hloubky. Facebook shrnuje a odkazuje. Instagram zlidšťuje. Video buduje důvěru.</p></div><div className="web-score"><span>Připravenost briefu</span><strong>29 %</strong><div className="progress-track"><i style={{ width: "29%" }} /></div></div></section>
      <section className="web-map">
        {webSections.map((section, index) => (
          <article className="web-card glass-card" key={section.name}>
            <div className="web-card-head"><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.name}</h2><b>{section.readiness} %</b></div>
            <div className="mini-progress"><i style={{ width: `${section.readiness}%` }} /></div>
            <dl><div><dt>Účel</dt><dd>{section.purpose}</dd></div><div><dt>Obsah</dt><dd>{section.content}</dd></div><div><dt>CTA</dt><dd>{section.cta}</dd></div><div><dt>Fotografie</dt><dd>{section.photos}</dd></div><div><dt>Video</dt><dd>{section.video}</dd></div></dl>
          </article>
        ))}
      </section>
    </div>
  );

  const renderChecklist = () => (
    <div className="section-stack">
      <section className="section-intro compact-intro glass-card"><div><span className="eyebrow">Pracovní tok</span><h1>Checklist</h1><p>Kanban všech kampaních úkolů, blokací a dodávek. Kliknutím na kartu otevřete detail a posunete stav.</p></div><button className="primary-button" onClick={() => openCreate("task")}>＋ Přidat úkol</button></section>
      <div className="filter-bar glass-card checklist-filters"><div className="select-row"><label>Priorita<select value={taskPriority} onChange={(event) => setTaskPriority(event.target.value as "Vše" | Priority)}><option>Vše</option><option>Kritická</option><option>Vysoká</option><option>Střední</option><option>Nízká</option></select></label><label>Owner<select value={taskOwner} onChange={(event) => setTaskOwner(event.target.value)}>{owners.map((owner) => <option key={owner}>{owner}</option>)}</select></label></div><span>{filteredTasks.length} z {tasks.length} úkolů</span></div>
      <section className="kanban-board">
        {(["To Do", "Waiting", "Doing", "Done"] as TaskStatus[]).map((status) => {
          const columnTasks = filteredTasks.filter((task) => task.status === status);
          return <div className="kanban-column glass-card" key={status}><div className="kanban-head"><span className={`kanban-dot status-${status.toLowerCase().replace(" ", "-")}`} /><strong>{status}</strong><b>{columnTasks.length}</b></div><div className="kanban-stack">{columnTasks.map((task) => <button className="task-card" key={task.id} onClick={() => setSelectedTask(task)}><div className="task-tags"><span className={`priority-tag priority-${slugify(task.priority)}`}>{task.priority}</span>{task.document && <span className="document-tag">▱</span>}</div><strong>{task.title}</strong><p>{task.note}</p><div className="task-meta"><span className="owner-avatar">{task.owner.slice(0, 1)}</span><span>{task.owner}</span><time>{task.deadline}</time></div></button>)}{!columnTasks.length && <div className="kanban-empty">Žádné úkoly</div>}</div></div>;
        })}
      </section>
    </div>
  );

  const renderTimeline = () => (
    <div className="section-stack">
      <section className="section-intro glass-card timeline-intro"><div><span className="eyebrow">1. 8. — 10. 10. 2026</span><h1>Roadmap kampaně</h1><p>Jeden časový plán pro marketing, produkci, klienta, tisk a web. Milníky jsou seřazené podle skutečné závislosti.</p></div><div className="countdown-mini"><strong>{daysLeft}</strong><span>dní do voleb</span></div></section>
      <div className="timeline-filters glass-card">{["Vše", "Marketing", "Produkce", "Klient", "Tisk", "Web"].map((category) => <button className={`${timelineFilter === category ? "active" : ""} timeline-cat-${category.toLowerCase()}`} key={category} onClick={() => setTimelineFilter(category)}>{category}</button>)}</div>
      <section className="roadmap glass-card">
        <div className="roadmap-line" />
        {filteredTimeline.map((item, index) => <article className={`roadmap-item timeline-cat-${item.category.toLowerCase()}`} key={item.title}><div className="roadmap-date"><strong>{item.date}</strong></div><span className="roadmap-node">{index + 1}</span><div className="roadmap-card"><span className="eyebrow">{item.category}</span><h2>{item.title}</h2><p>{item.note}</p><small>{index === filteredTimeline.length - 1 ? "Cíl kampaně" : `Následuje: ${filteredTimeline[index + 1]?.title || "—"}`}</small></div></article>)}
      </section>
    </div>
  );

  const renderDocuments = () => (
    <div className="section-stack">
      <section className="section-intro compact-intro glass-card"><div><span className="eyebrow">Repository</span><h1>Dokumenty a důkazy</h1><p>Centrální registr známých podkladů i chybějících assetů. Vyhledávání je připravené na desítky dokumentů a stovky fotografií.</p></div><span className="repository-health"><b>5</b> načteno · <b>5</b> čekáme</span></section>
      <div className="filter-bar glass-card document-filters"><label className="inline-search"><span>⌕</span><input value={documentQuery} onChange={(event) => setDocumentQuery(event.target.value)} placeholder="Hledat soubor nebo popis…" /></label><div className="category-scroll">{docCategories.map((category) => <button className={documentCategory === category ? "active" : ""} key={category} onClick={() => setDocumentCategory(category)}>{category}</button>)}</div></div>
      <section className="document-grid">
        {filteredDocuments.map((document) => <button className="document-card glass-card" key={document.title} onClick={() => setSelectedDocument(document)}><div className={`file-icon file-${document.type.toLowerCase()}`}>{document.type.slice(0, 3)}</div><div><span className="eyebrow">{document.category}</span><h2>{document.title}</h2><p>{document.description}</p><div className="document-meta"><span className={`status-pill ${document.status === "Načteno" ? "success" : "warning-pill"}`}>{document.status}</span><time>{document.updated}</time></div></div></button>)}
      </section>
    </div>
  );

  const renderSettings = () => (
    <div className="section-stack settings-stack">
      <section className="section-intro compact-intro glass-card"><div><span className="eyebrow">Campaign OS</span><h1>Nastavení</h1><p>Vzhled, lokální data a přenos pracovní verze mezi zařízeními.</p></div><span className="version-pill">Verze 1.0</span></section>
      <section className="settings-grid">
        <article className="settings-card glass-card"><span className="eyebrow">Vzhled</span><h2>Barevný režim</h2><p>Volba se ukládá pouze v tomto prohlížeči.</p><div className="theme-cards"><button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}><span className="theme-preview light-preview" /><strong>Světlý</strong></button><button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}><span className="theme-preview dark-preview" /><strong>Tmavý</strong></button></div></article>
        <article className="settings-card glass-card"><span className="eyebrow">Data</span><h2>Lokální režim</h2><p>Bez backendu se nové úkoly, projekty, kandidáti a posty ukládají do tohoto zařízení. Pravidelně exportujte zálohu.</p><div className="settings-actions"><button className="primary-button" onClick={exportData}>Exportovat JSON</button><label className="secondary-button">Importovat JSON<input type="file" accept="application/json" onChange={(event) => importData(event.target.files?.[0])} /></label></div></article>
        <article className="settings-card glass-card full-settings"><span className="eyebrow">Datové zdraví</span><h2>Připravenost zdrojů</h2><div className="health-grid"><div><strong>100 %</strong><span>Strategie</span></div><div><strong>100 %</strong><span>Kandidátní profily</span></div><div><strong>38 %</strong><span>Projekty</span></div><div><strong>100 %</strong><span>Foto rozsahy</span></div><div><strong>0 %</strong><span>Video</span></div></div></article>
      </section>
    </div>
  );

  const renderCandidateDetail = () => {
    if (!selectedCandidate) return null;
    const gallery = expandPhotoRanges(selectedCandidate.photoRanges);
    const relatedPosts = posts.filter((post) => selectedCandidate.plannedPostIds.includes(post.id));
    const relatedProjects = projects.filter((project) => selectedCandidate.projectIds.includes(project.id));
    const assetLabels = { photos: "Fotografie", medallion: "Medailonek", bio: "Bio", quote: "Citace", video: "Video", faq: "FAQ" };
    return <div className="modal-backdrop" onMouseDown={() => setSelectedCandidate(null)}><section className="detail-modal candidate-detail candidate-profile" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedCandidate(null)}>×</button>
      <div className="candidate-detail-hero"><div className="detail-avatar"><span aria-hidden="true">{selectedCandidate.initials}</span>{selectedCandidate.image && <Image src={selectedCandidate.image} alt={`Portrét – ${selectedCandidate.name}`} fill sizes="114px" unoptimized onError={(event) => { event.currentTarget.hidden = true; }} />}<b>#{selectedCandidate.order}</b></div><div><span className="eyebrow">Kandidát č. {selectedCandidate.order}</span><h2>{selectedCandidate.name}</h2>{selectedCandidate.office && <strong>{selectedCandidate.office}</strong>}<p>{selectedCandidate.professions.join(" · ")}</p></div></div>
      <div className="candidate-profile-grid">
        <article className="profile-panel profile-about"><div className="profile-panel-head"><span className="eyebrow">Profil</span><b>{selectedCandidate.assets.bio ? "Rozpracováno" : "Doplnit"}</b></div><p>{selectedCandidate.bio}</p>{selectedCandidate.quote && <blockquote>„{selectedCandidate.quote}“</blockquote>}</article>
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Stav podkladů</span><b>{Object.values(selectedCandidate.assets).filter(Boolean).length}/6</b></div><ul className="asset-checklist">{(Object.keys(selectedCandidate.assets) as (keyof Candidate["assets"])[]).map((asset) => <li className={selectedCandidate.assets[asset] ? "done" : ""} key={asset}><span>{selectedCandidate.assets[asset] ? "✓" : ""}</span>{assetLabels[asset]}</li>)}</ul></article>
      </div>
      <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Komunikační témata</span><button onClick={() => setToast("Témata budou doplněna v další obsahové fázi.")}>＋ Přidat</button></div><div className="tag-list">{selectedCandidate.topics.map((topic) => <span key={topic}>{topic}</span>)}</div></article>
      <div className="candidate-profile-grid">
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Naplánované příspěvky</span><b>{relatedPosts.length}</b></div><div className="profile-link-list">{relatedPosts.length ? relatedPosts.map((post) => <button key={post.id} onClick={() => { setSelectedCandidate(null); setSelectedPost(post); }}><span className={`timeline-dot ${postPillarClass(post)}`} /><span><strong>{post.title}</strong><small>{formatDate(post.date)} · {post.format}</small></span><b>→</b></button>) : <div className="profile-empty">Zatím bez naplánovaného příspěvku.</div>}</div></article>
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Projekty</span><b>{relatedProjects.length}</b></div><div className="profile-link-list">{relatedProjects.length ? relatedProjects.map((project) => <button key={project.id} onClick={() => { setSelectedCandidate(null); setSelectedProject(project); }}><span className="project-link-code">P-{String(project.id).padStart(2, "0")}</span><span><strong>{project.title}</strong><small>{project.status} · {project.area}</small></span><b>→</b></button>) : <div className="profile-empty">Vazby na projekty jsou připravené k doplnění.</div>}</div></article>
      </div>
      <article className="profile-panel gallery-panel"><div className="profile-panel-head"><span className="eyebrow">Galerie</span><b>1 webový portrét · {gallery.length} zdrojů</b></div><p className="asset-source">Portrét je přiřazen podle názvu zdrojového souboru. Produkční rozsahy: {selectedCandidate.photoRanges.join(", ")}.</p><div className="candidate-gallery">{selectedCandidate.image && <div className="gallery-photo"><Image src={selectedCandidate.image} alt={`Portrét – ${selectedCandidate.name}`} fill sizes="300px" unoptimized /><small>{selectedCandidate.image.split("/").pop()}</small></div>}{gallery.slice(0, 10).map((photo) => <div key={photo} data-filename={photo}><span>{selectedCandidate.initials}</span><small>{photo}</small></div>)}{gallery.length > 10 && <div className="gallery-more"><strong>+{gallery.length - 10}</strong><small>zdrojů</small></div>}</div></article>
      <div className="candidate-profile-grid">
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Video</span><b>0 / 4</b></div><div className="video-placeholders">{["Rozhovor", "Reels", "Podcast", "Veřejná setkání"].map((format) => <button key={format}><span>▶</span><strong>{format}</strong><small>Připojit výstup</small></button>)}</div></article>
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Dokumenty</span><b>{selectedCandidate.documents.length}</b></div><div className="profile-documents">{selectedCandidate.documents.length ? selectedCandidate.documents.map((document) => <div key={document}><span>DOC</span><strong>{document}</strong></div>) : <div className="profile-empty">PDF, usnesení, fotografie a zápisy lze připojit později.</div>}<button className="secondary-button" onClick={() => setToast("Připojení dokumentů je připravené pro interní úložiště.")}>＋ Připojit dokument</button></div></article>
      </div>
    </section></div>;
  };

  const views: Record<SectionId, () => React.ReactNode> = {
    dashboard: renderDashboard,
    bible: renderBible,
    candidates: renderCandidates,
    projects: renderProjects,
    calendar: renderCalendar,
    web: renderWeb,
    checklist: renderChecklist,
    timeline: renderTimeline,
    documents: renderDocuments,
    settings: renderSettings,
  };

  const activeLabel = navItems.find((item) => item.id === activeSection)?.label || "Dashboard";

  return (
    <div className={`campaign-app theme-${theme}`}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="noise-grid" />
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><span>✦</span></div>
          <div><strong>Přezleťáci</strong><span>Campaign OS · 2026</span></div>
          <button className="mobile-close" aria-label="Zavřít navigaci" onClick={() => setMobileNav(false)}>×</button>
        </div>
        <nav aria-label="Hlavní navigace">
          <span className="nav-label">Pracovní prostor</span>
          {navItems.slice(0, 8).map((item) => <div className="nav-group" key={item.id}><button className={activeSection === item.id ? "active" : ""} onClick={() => navigate(item.id)} aria-current={activeSection === item.id ? "page" : undefined}><i>{item.icon}</i><span>{item.label}</span>{item.id === "checklist" && <b>{openTasks}</b>}{item.id === "candidates" && <b>{candidates.length}/11</b>}</button>{item.id === "candidates" && activeSection === "candidates" && <div className="candidate-subnav">{(["overview", "matrix", "dashboard"] as CandidateView[]).map((view) => <button key={view} className={candidateView === view ? "active" : ""} onClick={() => { setCandidateView(view); setMobileNav(false); }}>{view === "overview" ? "Přehled" : view === "matrix" ? "Matrice" : "Dashboard"}</button>)}</div>}</div>)}
          <span className="nav-label utility-label">Systém</span>
          {navItems.slice(8).map((item) => <button key={item.id} className={activeSection === item.id ? "active" : ""} onClick={() => navigate(item.id)} aria-current={activeSection === item.id ? "page" : undefined}><i>{item.icon}</i><span>{item.label}</span></button>)}
        </nav>
        <div className="sidebar-status"><div><span className="live-dot" /><strong>Kampaň se připravuje</strong></div><p>Další milník: spuštění 1. 8.</p><div className="mini-progress"><i style={{ width: "43%" }} /></div></div>
        <div className="sidebar-user"><span>PT</span><div><strong>Produkční tým</strong><small>Lokální pracovní režim</small></div><i>•••</i></div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb"><button className="menu-button" aria-label="Otevřít navigaci" onClick={() => setMobileNav(true)}>☰</button><span>Campaign OS</span><b>/</b><strong>{activeLabel}</strong></div>
          <div className="topbar-actions">
            <button className="search-trigger" onClick={() => setSearchOpen(true)}><span>⌕</span><b>Hledat cokoli…</b><kbd>⌘ K</kbd></button>
            <button className="icon-button theme-toggle" aria-label="Přepnout barevný režim" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? "☾" : "☀"}</button>
            <button className="icon-button notification-button" aria-label="Oznámení" onClick={() => { navigate("checklist"); setToast("Zobrazuji otevřené priority."); }}>⌁<span>{clientDebts.length}</span></button>
            <button className="top-add" onClick={() => openCreate("task")}>＋ <span>Přidat</span></button>
          </div>
        </header>
        <main className="main-content">{views[activeSection]()}</main>
      </div>

      {searchOpen && <div className="modal-backdrop search-backdrop" onMouseDown={() => setSearchOpen(false)}><section className="command-menu" onMouseDown={(event) => event.stopPropagation()}><div className="command-input"><span>⌕</span><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Hledat sekci, projekt, člověka nebo dokument…" /><kbd>ESC</kbd></div><div className="command-results">{searchQuery ? searchResults.length ? searchResults.map((result) => <button key={`${result.meta}-${result.title}`} onClick={result.action}><span>{result.title}</span><small>{result.meta}</small><b>↵</b></button>) : <div className="empty-state">Nic jsme nenašli.</div> : <><span className="command-hint">Rychlá navigace</span>{navItems.slice(0, 6).map((item) => <button key={item.id} onClick={() => navigate(item.id)}><span>{item.icon} {item.label}</span><small>Sekce</small><b>→</b></button>)}</>}</div></section></div>}

      {createType && <div className="modal-backdrop" onMouseDown={() => setCreateType(null)}><form className="detail-modal create-modal" onSubmit={submitCreate} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setCreateType(null)}>×</button><span className="eyebrow">Nová položka</span><h2>{createType === "project" ? "Přidat projekt" : createType === "candidate" ? "Přidat kandidáta" : createType === "post" ? "Přidat příspěvek" : "Přidat úkol"}</h2><label>Název<input autoFocus required value={createForm.title} onChange={(event) => setCreateForm({ ...createForm, title: event.target.value })} placeholder={createType === "candidate" ? "Jméno a příjmení" : "Stručný pracovní název"} /></label>{createType === "post" && <label>Typ obsahu<select value={createContentType} onChange={(event) => setCreateContentType(event.target.value as ContentType)}>{(Object.entries(contentTemplates) as [ContentType, ContentTemplate][]).map(([type, template]) => <option key={type} value={type}>{template.icon} {template.label}</option>)}</select><small className="field-help">Barva, ikona, badge a CTA se nastaví automaticky.</small></label>}<label>{createType === "post" ? "Autor" : createType === "task" ? "Deadline" : createType === "candidate" ? "Funkce" : "Krátký popis"}<input value={createForm.detail} onChange={(event) => setCreateForm({ ...createForm, detail: event.target.value })} placeholder="Doplňte základní informaci" /></label><label>{createType === "post" ? "Datum (RRRR-MM-DD)" : createType === "task" ? "Owner" : createType === "candidate" ? "Profese" : "Kategorie"}<input value={createForm.meta} onChange={(event) => setCreateForm({ ...createForm, meta: event.target.value })} placeholder={createType === "post" ? "2026-08-01" : "Volitelné"} /></label>{createType === "post" && <ContentCard compact type={createContentType} title={createForm.title || "Náhled titulku příspěvku"} />}<button className="primary-button full-button" type="submit">Vytvořit položku</button><p className="local-note">Uloží se do lokální pracovní verze tohoto zařízení.</p></form></div>}

      {renderCandidateDetail()}

      {selectedProject && <div className="modal-backdrop" onMouseDown={() => setSelectedProject(null)}><section className="detail-modal project-detail" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)}>×</button><div className="project-detail-head"><div><span className={`status-pill project-${slugify(selectedProject.status)}`}>{selectedProject.status}</span><h2>{selectedProject.title}</h2><p>{selectedProject.area} · Garant: {selectedProject.owner}</p></div><div className="detail-project-code">P-{String(selectedProject.id).padStart(2, "0")}</div></div><div className="detail-section"><span className="eyebrow">Komunikační noha</span><p>{selectedProject.summary}</p></div><div className="project-detail-grid"><article><span className="eyebrow">Historie</span><p>{selectedProject.history}</p></article><article><span className="eyebrow danger">Možný útok</span><p>{selectedProject.risk}</p></article><article><span className="eyebrow">Argumentace</span><p>{selectedProject.argument}</p></article><article><span className="eyebrow">Důkazy</span><p>{selectedProject.evidence}</p></article></div><div className="next-step"><span>Další krok</span><strong>{selectedProject.next}</strong></div></section></div>}

      {selectedPost && <div className="modal-backdrop" onMouseDown={() => setSelectedPost(null)}><section className="detail-modal post-detail" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedPost(null)}>×</button><span className={`status-pill ${postPillarClass(selectedPost)}`}>{selectedPost.contentType ? contentTemplates[selectedPost.contentType].label : selectedPost.pillar}</span><h2>{selectedPost.title}</h2><p className="post-date">{formatDate(selectedPost.date)} · {selectedPost.format}</p><ContentCard compact type={selectedPost.contentType ?? contentTypeFromPillar(selectedPost.pillar)} title={selectedPost.title} /><div className="post-workflow">{[["Námět", "Hotovo"], ["Copy", selectedPost.copy], ["Grafika", selectedPost.graphic], ["Schválení", selectedPost.approval], ["Publikace", selectedPost.status]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><div className="detail-section"><span className="eyebrow">Autor / owner</span><p>{selectedPost.author}</p></div><button className="primary-button full-button" onClick={() => { setSelectedPost(null); navigate("checklist"); }}>Otevřít produkční úkoly</button></section></div>}

      {selectedTask && <div className="modal-backdrop" onMouseDown={() => setSelectedTask(null)}><section className="detail-modal task-detail" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedTask(null)}>×</button><div className="task-tags"><span className={`priority-tag priority-${slugify(selectedTask.priority)}`}>{selectedTask.priority}</span><span className="status-pill neutral">{selectedTask.status}</span></div><h2>{selectedTask.title}</h2><p>{selectedTask.note}</p><dl><div><dt>Owner</dt><dd>{selectedTask.owner}</dd></div><div><dt>Deadline</dt><dd>{selectedTask.deadline}</dd></div><div><dt>Dokument</dt><dd>{selectedTask.document || "Bez přílohy"}</dd></div></dl>{selectedTask.status !== "Done" && <button className="primary-button full-button" onClick={() => advanceTask(selectedTask)}>Posunout úkol dál →</button>}</section></div>}

      {selectedDocument && <div className="modal-backdrop" onMouseDown={() => setSelectedDocument(null)}><section className="detail-modal document-detail" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedDocument(null)}>×</button><div className={`file-icon file-${selectedDocument.type.toLowerCase()}`}>{selectedDocument.type.slice(0, 3)}</div><span className="eyebrow">{selectedDocument.category}</span><h2>{selectedDocument.title}</h2><p>{selectedDocument.description}</p><dl><div><dt>Stav</dt><dd>{selectedDocument.status}</dd></div><div><dt>Aktualizace</dt><dd>{selectedDocument.updated}</dd></div><div><dt>Typ</dt><dd>{selectedDocument.type}</dd></div></dl><div className="local-note">Repository zatím eviduje metadata. Samotné soubory zůstávají v interním úložišti týmu.</div></section></div>}

      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </div>
  );
}
