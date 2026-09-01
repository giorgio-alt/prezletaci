"use client";

import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { initialPosts, mergePostsWithPlan, sortPosts } from "./postplan";
import type { ContentType, SocialPost } from "./postplan";
import {
  AI_CONTEXT_MARKDOWN,
  WEB_BRIEF_MARKDOWN,
  baseWebsiteContentItems,
  webBlockers,
  webBriefSections,
  webOpenIssues,
} from "./web-content";
import type { WebsiteContentItem, WebsiteContentStatus, WebsitePriority } from "./web-content";
import {
  contentKnowledgeEntities,
  findOrphanEntities,
  getEntityRelationships,
  groupRelatedEntities,
  knowledgeEntityMeta,
  knowledgeRelationships,
  relationshipTypeLabels,
} from "./relationships";
import type { KnowledgeEntity, KnowledgeEntityType } from "./relationships";
import {
  getProjectPhotoDriveUrlForImage,
  mergeProjectCatalog,
  projectImageByProjectId,
  projectImageManifest,
} from "./project-images";
import {
  activeProjectStatus,
  campaignReadiness,
  campaignReadinessScore,
  candidateProductionChecklist,
  clientInputs,
  completedProjectStatus,
  firstCandidateWave,
  mergeSprintTasks,
  productionStrategy,
  sprintRisks,
  sprintRoadmap,
  sprintTasks,
  sprintUpdatedAt,
  weeklyFocus,
} from "./sprint-status";
import { candidateContentUpdates } from "./candidate-content";
import { articleContent, articleContentBySlug, type ArticleContent } from "./article-content";
import {
  ORIGINAL_PHOTOS_ZIP_DRIVE_URL,
  PHOTO_AUDIT_DRIVE_URL,
  PHOTO_DRIVE_ROOT_URL,
  candidatePortraitDriveUrls,
  candidateSourceDriveFolders,
  getPhotoAuditFolderForAsset,
  getProjectPhotoDriveUrlForSource,
  getProjectPhotoLibraryPath,
  photoAuditDriveFolders,
  photoDriveLinks,
  teamSourceDriveFolder,
} from "./photo-drive";
import { programContentBySlug } from "./program-content";

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
type ProjectStatus = "Hotové" | "Rozpracované" | "Plánované" | "Doplnit";

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
  slug: string;
  image?: string;
  imageAlt?: string;
  photoSource?: string;
  photoLibraryPath?: string;
  photoDriveUrl?: string;
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
  headline?: string;
  headlineStatus?: string;
  bio: string;
  socialCopy?: string;
  initials: string;
  quote?: string;
  topics: string[];
  photoRanges: string[];
  photoDriveUrl?: string;
  photoSourceDriveUrl?: string;
  portraitDriveUrl?: string;
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
  reviewNotes?: string[];
};

type CandidateView = "overview" | "matrix" | "dashboard";
type WebView = "brief" | "articles" | "inventory" | "relationships";
type MarkdownDocument = { name: "WEB_BRIEF.md" | "AI_CONTEXT.md"; content: string };
type RepositoryDocument = {
  title: string;
  category: string;
  type: string;
  status: "Načteno" | "Čekáme";
  updated: string;
  description: string;
  driveUrl?: string;
  localPath?: string;
};

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

const postPreviewShape = (format: SocialPost["format"]) => {
  if (format === "Story" || format === "Reels") return "portrait";
  if (format === "Video") return "landscape";
  return "square";
};

function RelationshipPanel({
  entityId,
  entities,
  onOpen,
  title = "Související obsah",
}: {
  entityId: string;
  entities: KnowledgeEntity[];
  onOpen: (entity: KnowledgeEntity) => void;
  title?: string;
}) {
  const entityTypes = Object.keys(knowledgeEntityMeta) as KnowledgeEntityType[];
  const groups = groupRelatedEntities(entityId, entities);
  const populatedTypes = entityTypes.filter((type) => groups[type]?.length);
  return (
    <article className="relationship-panel">
      <div className="profile-panel-head"><span className="eyebrow">{title}</span><b>{populatedTypes.reduce((sum, type) => sum + (groups[type]?.length ?? 0), 0)}</b></div>
      {populatedTypes.length ? <div className="relationship-panel-groups">{populatedTypes.map((type) => (
        <section key={type}>
          <header><span>{knowledgeEntityMeta[type].icon}</span><strong>{knowledgeEntityMeta[type].publicLabel}</strong></header>
          <div>{groups[type]?.map((entity) => <button key={entity.id} onClick={() => onOpen(entity)}><span><strong>{entity.title}</strong><small>{entity.summary}</small></span><b>→</b></button>)}</div>
        </section>
      ))}</div> : <div className="profile-empty">Zatím bez doložených vazeb. Relationship Engine stránku označuje jako osiřelou.</div>}
    </article>
  );
}

function PhotoDriveLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`photo-drive-links${compact ? " photo-drive-links-compact" : ""}`}>
      {photoDriveLinks.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<span>↗</span></a>)}
    </div>
  );
}

function DesignSystemChapter() {
  const templates = Object.entries(contentTemplates) as [ContentType, ContentTemplate][];
  const productionChecks = ["Správná šablona", "Správná barva", "Správná ikona", "Jeden jasný CTA", "Fotografie ve správném poměru", "Titulky u videa", "Odkaz na web"];
  const primaryColors = [["Blue", "#123A8C"], ["Yellow", "#FFE500"], ["Night", "#071F5C"], ["Paper", "#F8F9F4"]];
  const colorFamilies = [["Lidé", "people"], ["Hotovo", "completed"], ["Práce", "progress"], ["Plány", "future"], ["Vysvětlení", "explain"], ["Důkazy", "evidence"], ["Kultura", "culture"]];
  const backgrounds = [["Domov", "domov"], ["Ráno", "rano"], ["Dialog", "dialog"], ["Lidé", "people"], ["Krajina", "environment"], ["Navy", "navy"], ["Horizont", "horizon"]];
  return (
    <div className="design-system-content">
      <section className="design-system-lead">
        <div><span className="eyebrow">Cíl systému</span><h2>Rozpoznat typ sdělení na první pohled</h2><p>Každý statický příspěvek používá stejné rozmístění prvků. Mění se pouze centrálně řízená identita typu obsahu: barva, ikona, badge, CTA a styl titulku.</p></div>
        <aside><strong>Schválená identita</strong><p>Logo, Commissioner, primární paleta a obsahové rodiny vycházejí z kanonického brand sheetu Přezleťáků.</p></aside>
      </section>

      <section className="brand-foundations" aria-label="Základy vizuální identity">
        <article className="brand-logo-showcase"><div className="logo-stage logo-stage-light"><Image src="/images/brand/prezletaci-lockup-blue.png" alt="Modré logo Přezleťáků" width={365} height={99} unoptimized /></div><div className="logo-stage logo-stage-dark"><Image src="/images/brand/prezletaci-lockup-white.png" alt="Bílé logo Přezleťáků" width={365} height={99} unoptimized /></div><footer><div><strong>Kanonické logo</strong><span>Modrá varianta na světlé ploše · bílý negativ na Night</span></div><div className="logo-symbols"><span><Image src="/images/brand/prezletaci-symbol-blue.png" alt="Modrý symbol Přezleťáků" width={38} height={38} unoptimized /></span><span><Image src="/images/brand/prezletaci-symbol-white.png" alt="Bílý symbol Přezleťáků" width={38} height={38} unoptimized /></span></div></footer></article>
        <article className="brand-type-sample"><span className="eyebrow">Commissioner Variable</span><strong>Jasně. Lidsky.<br /><i>V pohybu.</i></strong><div><b>Display 780</b><b>Navigace 650</b><b>Text 460</b><b>Mikroakcent 680</b></div></article>
      </section>

      <section className="brand-palette" aria-label="Primární paleta">
        {primaryColors.map(([name, hex]) => <article key={name} style={{ "--swatch": hex } as CSSProperties}><i /><strong>{name}</strong><code>{hex}</code></article>)}
      </section>

      <section className="brand-family-grid" aria-label="Sekundární barevné rodiny">
        {colorFamilies.map(([name, token]) => <article className={`brand-family brand-family-${token}`} key={name}><i /><strong>{name}</strong><small>hlavní · světlá</small></article>)}
      </section>

      <section className="brand-background-grid" aria-label="Sedm rodin pozadí">
        {backgrounds.map(([name, token]) => <article className={`brand-background prz-bg-${token}`} key={name}><small>{name}</small><strong>{name === "Navy" ? "Více práce." : name === "Horizont" ? "Hotovo. Teď další krok." : `${name} / Přezleťáci`}</strong></article>)}
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

const initialTasks: Task[] = sprintTasks.map((task) => ({ ...task }));

const slugFromTitle = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const coreProjects: Omit<Project, "slug" | "image" | "imageAlt">[] = [
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

const initialProjects: Project[] = [
  ...coreProjects.map((project) => {
    const media = projectImageByProjectId.get(project.id);
    return {
      ...project,
      slug: media?.slug ?? slugFromTitle(project.title),
      image: media?.image,
      imageAlt: media?.imageAlt,
      photoSource: media?.source,
      photoLibraryPath: getProjectPhotoLibraryPath(media?.source),
      photoDriveUrl: media ? getProjectPhotoDriveUrlForSource(media.source) : PHOTO_AUDIT_DRIVE_URL,
    };
  }),
  ...projectImageManifest
    .filter((record) => record.projectId > 18)
    .map((record): Project => ({
      id: record.projectId,
      slug: record.slug,
      image: record.image,
      imageAlt: record.imageAlt,
      photoSource: record.source,
      photoLibraryPath: getProjectPhotoLibraryPath(record.source),
      photoDriveUrl: getProjectPhotoDriveUrlForSource(record.source),
      title: record.title,
      status: "Doplnit",
      area: record.area,
      owner: "Doplnit",
      summary: "Projekt je doložen fotografií. Věcný popis čeká na doplnění.",
      evidence: "Fotografie",
      risk: "Doplnit",
      argument: "Doplnit",
      next: "Doplnit stav, garanta a ověřený popis projektu.",
      history: "Doplnit",
    })),
];

const candidateBaseAssets = { photos: true, medallion: false, bio: false, quote: false, video: false, faq: false };
const candidateContentById = new Map(candidateContentUpdates.map((content) => [content.id, content]));

// Zdrojový kalendář označuje medailonky čísly 1–11; vazba proto kopíruje
// explicitní pořadí kandidátů. Příspěvek „Celý tým“ je přiřazen všem.
const initialCandidateBase: Candidate[] = [
  { id: 1, order: 1, name: "Tomáš Říha", image: "/images/candidates/tomas-riha.webp", office: "Starosta obce Přezletice", professions: ["Jednatel obchodní společnosti hasičské a záchranářské techniky"], bio: "Medailonek a osobní bio čekají na doplnění.", initials: "TŘ", topics: ["Doplnit komunikační témata"], photoRanges: ["R5A2830–R5A2840"], assets: { ...candidateBaseAssets }, plannedPostIds: [102, 134], projectIds: [], documents: [] },
  { id: 2, order: 2, name: "Jan Macourek", image: "/images/candidates/jan-macourek.webp", office: "Místostarosta obce Přezletice", professions: ["Předseda svazku Přezletice – Podolanka – Jenštejn", "Podnikatel v nábytkářství"], bio: "V Přezleticích žije přes dvacet let. Je truhlář, dvanáct let působí v zastupitelstvu a ve svazku obcí pro výstavbu a provoz svazkové školy. Prosazuje technicky i finančně realistické projekty a hlídá vyvážený rozpočet.", initials: "JM", quote: "Mnohé plány vypadaly nemožně. Povedly se — a stejně konkrétně chci pracovat i dál.", topics: ["Rozvoj", "Finance", "Školství"], photoRanges: ["R5A2815–R5A2829", "R5A2867–R5A2878", "R5A3010–R5A3016"], assets: { ...candidateBaseAssets, medallion: true, bio: true, quote: true }, plannedPostIds: [104, 134], projectIds: [], documents: ["Jan Macoure1.docx"] },
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

const initialCandidates: Candidate[] = initialCandidateBase.map((candidate) => {
  const content = candidateContentById.get(candidate.id);
  const portraitDriveUrl = candidatePortraitDriveUrls[candidate.id] ?? photoAuditDriveFolders.candidateSelected;
  const photoSourceDriveUrl = candidateSourceDriveFolders[candidate.id] ?? photoAuditDriveFolders.candidateOriginals;
  const photoDriveUrl = portraitDriveUrl;
  if (!content) return { ...candidate, photoDriveUrl, portraitDriveUrl, photoSourceDriveUrl };
  return {
    ...candidate,
    photoDriveUrl,
    portraitDriveUrl,
    photoSourceDriveUrl,
    headline: content.headline,
    headlineStatus: content.headlineStatus,
    bio: content.bio,
    socialCopy: content.socialCopy,
    topics: content.topics,
    documents: content.documents,
    reviewNotes: content.reviewNotes,
    quote: undefined,
    assets: { ...candidate.assets, medallion: true, bio: true, quote: false },
  };
});

const mergeCandidatesWithPlan = (savedCandidates: Candidate[], availablePosts: SocialPost[]) => {
  const validPostIds = new Set(availablePosts.map((post) => post.id));
  const knownIds = new Set(initialCandidates.map((candidate) => candidate.id));
  const merged = initialCandidates.map((base) => {
    const saved = savedCandidates.find((candidate) => candidate.id === base.id);
    if (!saved) return base;
    const savedLinks = Array.isArray(saved.plannedPostIds) ? saved.plannedPostIds.filter((id) => validPostIds.has(id)) : [];
    return { ...saved, ...base, image: base.image, photoDriveUrl: base.photoDriveUrl, portraitDriveUrl: base.portraitDriveUrl, photoSourceDriveUrl: base.photoSourceDriveUrl, projectIds: [], plannedPostIds: Array.from(new Set([...base.plannedPostIds, ...savedLinks])) };
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
  { title: "Hotová práce", label: "Důkazy", body: "Každý výsledek popsat přes problém, postup, výsledek, dopad na lidi a dohledatelný důkaz.", bullets: ["Fotografie před / po", "Rozpočet nebo dokument", "Jasně popsaný přínos", "Dopad na každodenní život"] },
  { title: "Design System komunikačních pilířů", label: "Schválená identita · 7 rodin", body: "Jednotný informační systém propojuje logo, Commissioner, barvu, ikonu, badge, CTA, typografii a grid. Občan díky němu pozná typ sdělení ještě před přečtením textu.", bullets: [], kind: "design-system" },
  { title: "Rozdělané věci", label: "Transparentnost", body: "U každé rozpracované věci ukázat fázi, brzdu, další krok a termín další aktualizace.", bullets: ["Co řešíme", "Co už proběhlo", "Co nás brzdí", "Kdo je garant", "Kdy dáme další update"] },
  { title: "Plány", label: "2026–2030", body: "Program obsahuje přes padesát záměrů. Pro kampaň je nutné vybrat 10–12 nejsilnějších, realisticky vysvětlit první krok a přiřadit garanta.", bullets: ["Priorita pro obyvatele", "Reálná míra kontroly obce", "První proveditelný krok", "Zdroje a partneři"] },
  { title: "Citlivá témata", label: "Riziko", body: "D0/SOKP 520, tempo developerské výstavby, kapacita škol, voda a kanalizace, rozpočty velkých staveb a termíny nadřazených institucí.", bullets: ["Oddělit fakta od domněnek.", "Přiznat, co obec neřídí sama.", "Doložit chronologii jednání."] },
  { title: "Dokumenty a důkazy", label: "Chybí assety", body: "Každé silné téma musí mít alespoň jeden ověřitelný dokument a jeden vizuální důkaz.", bullets: ["Usnesení a smlouvy", "Studie a povolení", "Mapy", "Fotografie", "Čísla a harmonogramy"] },
  { title: "Storytelling", label: "Vzorec", body: "Tohle jsme řešili → takhle jsme postupovali → tohle se povedlo nebo je rozdělané → tady je dopad na lidi → tady je další krok.", bullets: ["Začínat dopadem na člověka.", "Technický kontext vysvětlit až potom.", "Končit konkrétním dalším krokem."] },
  { title: "Typy příspěvků", label: "Balíčky", body: "Jeden silný obsahový balíček vytvoří webový detail, Facebook post, Instagram carousel, krátké video a quote kartu.", bullets: ["1 video měsíčně", "3 statiky nebo carousely", "1 hlavní webové téma", "V závěru 1–2 výstupy týdně"] },
  { title: "Produkční strategie Sprint 03", label: "2 navazující fáze", body: productionStrategy.opening, bullets: [...productionStrategy.firstPhase, productionStrategy.transition, ...productionStrategy.secondPhase] },
  { title: "Fotografie", label: "Čekáme", body: "Vizuál má být civilní, lokální a důvěryhodný. Lidé při práci, v obci a v přirozeném kontaktu s místem.", bullets: ["Portrét každého kandidáta", "Pracovní situace", "Projektové fotografie", "Široké záběry obce", "Skupinová fotografie"] },
  { title: "Video", label: "Formát", body: "Video staví na osobní rovině, jednoduchém vysvětlení a jedné hlavní myšlence.", bullets: ["30–60 sekund pro social", "2–3 minuty pro webový detail", "Titulky vždy", "Jedna otázka, jedna odpověď"] },
  { title: "Krizová komunikace", label: "Protokol", body: "Neodpovídat v afektu. Ověřit fakta, určit vlastníka odpovědi, připravit kontext a publikovat konzistentní stanovisko.", bullets: ["Zachytit dotaz nebo útok", "Ověřit zdroje", "Rozhodnout, zda reagovat", "Fakta → kontext → další krok"] },
  { title: "Moderace komentářů", label: "Pravidla", body: "Věcné dotazy zodpovídat, kritiku nechat viditelnou, osobní útoky a nenávist moderovat podle předem zveřejněných pravidel.", bullets: ["Odpovědět do 24 hodin", "Nepřít se o motivy", "Neskrývat nepohodlné otázky", "Eskalovat citlivé případy PM"] },
  { title: "FAQ", label: "Připravit", body: "FAQ musí pokrýt školu, dopravu, developery, vodu, kanalizaci, rozpočet, termíny velkých staveb a kompetence obce.", bullets: ["Krátká odpověď", "Detailní vysvětlení", "Zdroj nebo dokument", "Datum poslední aktualizace"] },
];

const timelineItems = sprintRoadmap.map((item) => ({ ...item }));

const documents: RepositoryDocument[] = [
  { title: "Prezletaci_2026_Postplan_Kalendar.xlsx", category: "Publikační plán", type: "XLSX", status: "Načteno", updated: "20. 7. 2026", description: "Zdrojový kalendář 39 naplánovaných výstupů pro srpen, září a říjen 2026." },
  { title: "MP - media plán kampaně", category: "Publikační plán", type: "GSheet", status: "Načteno", updated: "18. 8. 2026", description: "Externí pracovní media plán v Google Sheets pro koordinaci publikace a kontrolu návaznosti na SoMe kalendář.", driveUrl: "https://docs.google.com/spreadsheets/d/1b7-vMEjN1yHTnGSJTD8_3zJPQibyD3UNpJvorKRUJKo/edit?gid=1468066247#gid=1468066247" },
  { title: "Volby 2026 program.docx", category: "Program", type: "DOCX", status: "Načteno", updated: "18. 7. 2026", description: "Volební program 2026–2030, více než 50 konkrétních záměrů uspořádaných do hlavních priorit." },
  { title: "Jan Macoure1.docx", category: "Kandidáti", type: "DOCX", status: "Načteno", updated: "18. 7. 2026", description: "Zdrojový medailonek Jana Macourka." },
  { title: "Campaign Hub export", category: "Reference", type: "ZIP", status: "Načteno", updated: "18. 7. 2026", description: "Vizuální a informační prototyp strategického hubu." },
  { title: "Campaign context", category: "Dokumenty", type: "MD", status: "Načteno", updated: "18. 7. 2026", description: "Kompletní strategický, obsahový, vizuální a technický kontext." },
  { title: "Executive summary", category: "Reference", type: "HTML", status: "Načteno", updated: "18. 7. 2026", description: "Samostatné shrnutí komunikačního rámce a publikačního rytmu." },
  { title: "Photo audit na Google Disku", category: "Fotografie", type: "Složka", status: "Načteno", updated: "17. 8. 2026", description: "Externě dostupná auditní složka s manifesty, náhledy a pracovním tříděním fotografií.", driveUrl: PHOTO_AUDIT_DRIVE_URL, localPath: "photo-audit" },
  { title: "Originální Fotky.zip", category: "Fotografie", type: "ZIP", status: "Načteno", updated: "17. 8. 2026", description: "Plný balík originálních fotografií nahraný na Google Disk.", driveUrl: ORIGINAL_PHOTOS_ZIP_DRIVE_URL, localPath: "Originální Fotky" },
  { title: "Fotografie kandidátů", category: "Fotografie", type: "Složka", status: "Načteno", updated: "17. 8. 2026", description: "Portréty, pracovní fotografie a skupinové snímky kandidátky.", driveUrl: photoAuditDriveFolders.candidates, localPath: "photo-audit/KANDIDATI" },
  { title: "Fotografie projektů", category: "Fotografie", type: "Složka", status: "Načteno", updated: "17. 8. 2026", description: "Vizuální důkazy hotových a rozpracovaných projektů, dohledatelné podle lokální struktury.", driveUrl: photoAuditDriveFolders.workingSort, localPath: "photo-audit/PRACOVNI_TRIDENI" },
  { title: "Videa kandidátů", category: "Videa", type: "Složka", status: "Čekáme", updated: "—", description: "Připravený prostor pro 11 krátkých medailonků." },
  { title: "Usnesení a smlouvy", category: "Usnesení", type: "Složka", status: "Čekáme", updated: "—", description: "Důkazové dokumenty k projektům a developerským závazkům." },
  { title: "Studie a mapy", category: "Mapy", type: "Složka", status: "Čekáme", updated: "—", description: "Dlouhý park, Nohavice, Sokolovna, doprava a územní plánování." },
];

const monthOptions = [
  { label: "Srpen", month: 7 },
  { label: "Září", month: 8 },
  { label: "Říjen", month: 9 },
];

const DATA_VERSION = 21;

const slugify = slugFromTitle;

const pillarClass = (pillar: string) => `pillar-${slugify(pillar)}`;
const postPillarClass = (post: SocialPost) => post.contentType === "evidence" ? "pillar-dokumenty" : pillarClass(post.pillar);

const getPostFillState = (post: SocialPost) => {
  const hasCopy = Boolean(post.socialCopy || post.facebookCopy || post.instagramCopy || post.articleSlug || post.programSlug);
  const hasVisual = Boolean(post.primaryImage || post.galleryImages?.length || post.graphic === "Připraveno" || post.graphic === "Fotky přiřazeny");
  const hasStructuredBrief = Boolean(post.contentSummary || post.productionNote || post.carouselOutline?.length || post.cta || post.draftLink);
  const hasLinkedSubject = Boolean(post.candidateId || post.projectId || post.websiteItemId || post.subjectType);
  const productionStarted = post.copy !== "Čeká" || post.graphic !== "Čeká" || post.approval !== "Čeká" || post.status !== "Námět";

  if (hasCopy && hasVisual && productionStarted) {
    return { key: "full", label: "Plný", description: "Post má obsah i produkční podklady." };
  }

  if (hasStructuredBrief || hasLinkedSubject || productionStarted || hasVisual) {
    return { key: "partial", label: "Částečný", description: "Post má část podkladů, ale ještě není kompletní." };
  }

  return { key: "empty", label: "Prázdný", description: "Post zatím čeká na obsah a podklady." };
};

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
  const [webView, setWebView] = useState<WebView>("brief");
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
  const [selectedMarkdown, setSelectedMarkdown] = useState<MarkdownDocument | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleContent | null>(null);
  const [toast, setToast] = useState("");
  const [projectStatus, setProjectStatus] = useState<"Vše" | ProjectStatus>("Vše");
  const [projectQuery, setProjectQuery] = useState("");
  const [taskPriority, setTaskPriority] = useState<"Vše" | Priority>("Vše");
  const [taskOwner, setTaskOwner] = useState("Všichni");
  const [calendarMonth, setCalendarMonth] = useState(0);
  const [timelineFilter, setTimelineFilter] = useState("Vše");
  const [documentQuery, setDocumentQuery] = useState("");
  const [documentCategory, setDocumentCategory] = useState("Vše");
  const [webQuery, setWebQuery] = useState("");
  const [webStatus, setWebStatus] = useState<"Vše" | WebsiteContentStatus>("Vše");
  const [webPriority, setWebPriority] = useState<"Vše" | WebsitePriority>("Vše");
  const [webPageType, setWebPageType] = useState("Vše");
  const [webPillar, setWebPillar] = useState("Vše");
  const [webOwner, setWebOwner] = useState("Všichni");
  const [webCandidate, setWebCandidate] = useState("Všichni");
  const [webProject, setWebProject] = useState("Všechny");
  const [webDeadline, setWebDeadline] = useState("Všechny");
  const [relationshipType, setRelationshipType] = useState<"Vše" | KnowledgeEntityType>("Vše");

  useEffect(() => {
    let data: { dataVersion?: number; tasks?: Task[]; projects?: Project[]; candidates?: Candidate[]; posts?: SocialPost[]; theme?: string } | null = null;
    try {
      const saved = window.localStorage.getItem("prezletaci-campaign-os");
      if (saved) data = JSON.parse(saved);
    } catch {
      // A malformed local draft must never prevent Campaign HQ from loading.
    }
    queueMicrotask(() => {
      if (data) {
        if (typeof data.dataVersion === "number" && data.dataVersion >= 2 && data.dataVersion <= DATA_VERSION) {
          const migratedPosts = Array.isArray(data.posts) ? mergePostsWithPlan(data.posts, data.dataVersion) : initialPosts;
          if (Array.isArray(data.tasks)) setTasks(mergeSprintTasks(data.tasks, initialTasks, data.dataVersion) as Task[]);
          if (Array.isArray(data.projects)) setProjects(mergeProjectCatalog(data.projects, initialProjects));
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
        setSelectedMarkdown(null);
        setSelectedArticle(null);
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
  const clientDebts = clientInputs;
  const plannedPosts = posts.filter((post) => post.status !== "Publikováno").length;
  const chronologicalPosts = useMemo(() => sortPosts(posts), [posts]);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    const items = [
      ...navItems.map((item) => ({ title: item.label, meta: "Sekce", action: () => navigate(item.id) })),
      ...projects.map((item) => ({ title: item.title, meta: `Projekt · ${item.status}`, action: () => { setSelectedProject(item); setSearchOpen(false); } })),
      ...candidates.map((item) => ({ title: item.name, meta: `Kandidát · ${item.professions.join(", ")}`, action: () => { setSelectedCandidate(item); setSearchOpen(false); } })),
      ...articleContent.map((item) => ({ title: item.title, meta: `Článek · ${item.pillar}`, action: () => { setSelectedArticle(item); setSearchOpen(false); } })),
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
      setProjects((items) => [...items, { id, slug: `${slugFromTitle(createForm.title)}-${id}`, title: createForm.title, status: "Plánované", area: createForm.meta || "Nezařazeno", owner: "Doplnit garanta", summary: createForm.detail || "Nový projekt čeká na doplnění briefu.", evidence: "Doplnit", risk: "Vyhodnotit", argument: "Připravit", next: "Doplnit vlastníka a první krok.", history: "Projekt založen v Campaign HQ." }]);
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
      if (Array.isArray(data.tasks)) setTasks(mergeSprintTasks(data.tasks, initialTasks, data.dataVersion) as Task[]);
      if (Array.isArray(data.projects)) setProjects(mergeProjectCatalog(data.projects, initialProjects));
      const importedPosts = Array.isArray(data.posts) ? mergePostsWithPlan(data.posts, data.dataVersion) : initialPosts;
      if (typeof data.dataVersion === "number" && data.dataVersion >= 3 && data.dataVersion <= DATA_VERSION && Array.isArray(data.candidates)) setCandidates(mergeCandidatesWithPlan(data.candidates, importedPosts));
      setPosts(importedPosts);
      setToast("Záloha byla načtena.");
    } catch {
      setToast("Soubor není platná záloha Campaign HQ.");
    }
  }

  async function copyMarkdown(document: MarkdownDocument) {
    try {
      await navigator.clipboard.writeText(document.content);
      setToast(`${document.name} je zkopírovaný do schránky.`);
    } catch {
      setToast("Kopírování se nepodařilo. Otevřete dokument a označte text ručně.");
    }
  }

  async function copyToClipboard(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setToast(`${label} je zkopírovaný do schránky.`);
    } catch {
      setToast("Kopírování se nepodařilo. Označte text ručně.");
    }
  }

  function articlePublicPath(article: ArticleContent) {
    return `/clanky/${article.slug}`;
  }

  function articleMarkdownUrl(article: ArticleContent) {
    return `/${article.markdownPath}`;
  }

  function publicArticleSourceHref(link: string) {
    if (/^https?:\/\//i.test(link)) return link;
    if (link.startsWith("content/articles/")) return `/${link}`;
    return null;
  }

  function articleFullText(article: ArticleContent) {
    return [
      `# ${article.title}`,
      "",
      ...(article.byline ? [article.byline, ""] : []),
      article.perex,
      "",
      ...article.body.flatMap((section) => [`## ${section.heading}`, "", ...section.paragraphs, ""]),
      "## Text pro sociální sítě",
      "",
      article.socialCopy,
      "",
      "## Carousel",
      "",
      ...article.carousel.map((slide, index) => `${index + 1}. ${slide}`),
      "",
      `CTA: ${article.cta}`,
      `Markdown: ${articleMarkdownUrl(article)}`,
      `Web: ${articlePublicPath(article)}`,
    ].join("\n");
  }

  function articleShareText(article: ArticleContent) {
    return [article.title, "", article.perex, "", article.cta, "", `${window.location.origin}${articlePublicPath(article)}`].join("\n");
  }

  async function shareArticle(article: ArticleContent) {
    const shareData = { title: article.title, text: article.perex, url: `${window.location.origin}${articlePublicPath(article)}` };
    if ("share" in navigator) {
      try {
        await navigator.share(shareData);
        setToast("Článek je připravený ke sdílení.");
        return;
      } catch {
        // When native share is cancelled or unavailable, fall back to a copyable package.
      }
    }
    await copyToClipboard(articleShareText(article), "Sdílecí balíček článku");
  }

  function openArticleFromWebsiteItem(item: WebsiteContentItem) {
    const article = item.id.startsWith("article-") ? articleContentBySlug.get(item.id.replace("article-", "")) : undefined;
    if (article) {
      setSelectedArticle(article);
      return;
    }
    setToast("Tahle položka zatím nemá čitelný článek v Campaign HQ.");
  }

  function downloadMarkdown(document: MarkdownDocument) {
    const blob = new Blob([document.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = document.name;
    anchor.click();
    URL.revokeObjectURL(url);
    setToast(`${document.name} byl připraven ke stažení.`);
  }

  const markdownDocuments: MarkdownDocument[] = [
    { name: "WEB_BRIEF.md", content: WEB_BRIEF_MARKDOWN },
    { name: "AI_CONTEXT.md", content: AI_CONTEXT_MARKDOWN },
  ];

  const candidateWebsiteItems = useMemo<WebsiteContentItem[]>(() => candidates.map((candidate) => {
    const checklist = [
      { label: "Profilový text", available: candidate.assets.bio },
      { label: "Krátký medailonek", available: candidate.assets.medallion },
      { label: "Profilová fotografie", available: candidate.assets.photos },
      { label: "Doplňkové fotografie", available: candidate.photoRanges.length > 0 },
      { label: "Citace", available: candidate.assets.quote },
      { label: "Video", available: candidate.assets.video },
      { label: "Oblasti, kterým se věnuje", available: candidate.topics.some((topic) => !topic.startsWith("Doplnit")) },
      { label: "Finální schválení", available: false },
    ];
    const readiness = Math.round(checklist.filter((item) => item.available).length / checklist.length * 100);
    return {
      id: `candidate-${candidate.id}`,
      title: candidate.name,
      pageType: "Kandidátský profil",
      section: "Lidé",
      purpose: `Představit kandidáta č. ${candidate.order}, jeho profesní zkušenost, vztah k obci a odpovědnost v týmu.`,
      pillar: "Lidé",
      status: readiness >= 75 ? "Podklady připraveny" : "Čeká na podklady",
      priority: candidate.order <= 2 ? "Kritická" : "Vysoká",
      owner: candidate.assets.bio ? "Copy + Kandidát" : "Copy",
      deadline: candidate.order <= 4 ? "8. 8. 2026" : "15. 8. 2026",
      candidateIds: [candidate.id],
      sourceLinks: ["Modul Kandidáti", candidate.portraitDriveUrl ?? candidate.photoDriveUrl ?? PHOTO_AUDIT_DRIVE_URL, candidate.photoSourceDriveUrl ?? photoAuditDriveFolders.candidateOriginals, ...candidate.documents],
      draftLink: `Campaign HQ / Kandidáti / ${candidate.name}`,
      notes: candidate.office || candidate.professions.join(" · "),
      blockers: checklist.filter((item) => !item.available).map((item) => item.label),
      readiness,
      checklist,
    };
  }), [candidates]);

  const projectWebsiteItems = useMemo<WebsiteContentItem[]>(() => projects.map((project) => {
    const hasEvidence = Boolean(project.evidence && !project.evidence.toLowerCase().startsWith("doplnit"));
    const checklist = [
      { label: "Stručný popis", available: Boolean(project.summary) },
      { label: "Celý příběh", available: Boolean(project.history && project.argument) },
      { label: "Výchozí situace", available: Boolean(project.history) },
      { label: "Výsledek", available: project.status === "Hotové" },
      { label: "Aktuální stav", available: Boolean(project.status) },
      { label: "Časová osa", available: project.history.includes("→") },
      { label: "Fotografie", available: false },
      { label: "Fotografie před a po", available: false },
      { label: "Čísla", available: false },
      { label: "Dokumenty", available: hasEvidence },
      { label: "Mapy", available: /map|situační|trasy/i.test(project.evidence) },
      { label: "FAQ", available: false },
      { label: "Citace", available: false },
      { label: "Výstupy pro sociální sítě", available: false },
    ];
    const readiness = Math.round(checklist.filter((item) => item.available).length / checklist.length * 100);
    return {
      id: `project-${project.id}`,
      title: project.title,
      pageType: "Projekt",
      section: project.status === "Hotové" ? "Hotová práce" : project.status === "Rozpracované" ? "Rozdělané věci" : "Plány",
      purpose: project.summary,
      pillar: project.status === "Hotové" ? "Hotová práce" : project.status === "Rozpracované" ? "Rozdělané věci" : "Plány",
      status: readiness >= 70 ? "Podklady připraveny" : hasEvidence ? "Copy v přípravě" : "Čeká na podklady",
      priority: project.id === 4 || project.id === 7 || project.id === 11 ? "Kritická" : "Vysoká",
      owner: project.owner,
      deadline: project.status === "Hotové" ? "12. 8. 2026" : "18. 8. 2026",
      projectIds: [project.id],
      sourceLinks: ["Modul Projekty", project.photoDriveUrl ?? PHOTO_AUDIT_DRIVE_URL, ...(project.photoLibraryPath ? [project.photoLibraryPath] : []), ...(hasEvidence ? [project.evidence] : [])],
      draftLink: `Campaign HQ / Projekty / ${project.title}`,
      notes: project.next,
      blockers: checklist.filter((item) => !item.available).map((item) => item.label),
      readiness,
      checklist,
    };
  }), [projects]);

  const websiteContentItems = useMemo(
    () => [...baseWebsiteContentItems, ...candidateWebsiteItems, ...projectWebsiteItems],
    [candidateWebsiteItems, projectWebsiteItems],
  );

  const websiteStatuses = ["Vše", ...Array.from(new Set(websiteContentItems.map((item) => item.status)))] as ("Vše" | WebsiteContentStatus)[];
  const websitePriorities = ["Vše", "Kritická", "Vysoká", "Střední", "Nízká"] as ("Vše" | WebsitePriority)[];
  const websitePageTypes = ["Vše", ...Array.from(new Set(websiteContentItems.map((item) => item.pageType)))];
  const websitePillars = ["Vše", ...Array.from(new Set(websiteContentItems.map((item) => item.pillar)))];
  const websiteOwners = ["Všichni", ...Array.from(new Set(websiteContentItems.map((item) => item.owner)))];
  const websiteDeadlines = ["Všechny", ...Array.from(new Set(websiteContentItems.map((item) => item.deadline)))];
  const filteredWebsiteItems = websiteContentItems.filter((item) => {
    const query = webQuery.trim().toLowerCase();
    const selectedCandidateId = webCandidate === "Všichni" ? null : Number(webCandidate);
    const selectedProjectId = webProject === "Všechny" ? null : Number(webProject);
    return (!query || `${item.title} ${item.purpose} ${item.section} ${item.notes}`.toLowerCase().includes(query))
      && (webStatus === "Vše" || item.status === webStatus)
      && (webPriority === "Vše" || item.priority === webPriority)
      && (webPageType === "Vše" || item.pageType === webPageType)
      && (webPillar === "Vše" || item.pillar === webPillar)
      && (webOwner === "Všichni" || item.owner === webOwner)
      && (selectedCandidateId === null || item.candidateIds?.includes(selectedCandidateId))
      && (selectedProjectId === null || item.projectIds?.includes(selectedProjectId))
      && (webDeadline === "Všechny" || item.deadline === webDeadline);
  });

  const websiteReadiness = Math.round(websiteContentItems.reduce((sum, item) => sum + item.readiness, 0) / websiteContentItems.length);
  const websiteMetrics = {
    total: websiteContentItems.length,
    published: websiteContentItems.filter((item) => item.status === "Publikováno").length,
    handoff: websiteContentItems.filter((item) => ["Předáno webdesignerovi", "Připraveno k publikaci", "Publikováno"].includes(item.status)).length,
    waiting: websiteContentItems.filter((item) => item.status === "Čeká na podklady").length,
    critical: webBlockers.filter((blocker) => blocker.severity === "Kritická" && blocker.status !== "Vyřešeno").length,
  };

  const knowledgeEntities = useMemo<KnowledgeEntity[]>(() => [
    ...candidates.map((candidate) => ({
      id: `candidate:${candidate.id}`,
      type: "candidate" as const,
      title: candidate.name,
      summary: candidate.office || candidate.professions.join(" · "),
      status: candidate.assets.bio ? "Rozpracováno" as const : "Čeká na podklady" as const,
      sourceId: candidate.id,
    })),
    ...projects.map((project) => ({
      id: `project:${project.id}`,
      type: "project" as const,
      title: project.title,
      summary: project.summary,
      status: project.status === "Hotové" ? "Připraveno" as const : "Rozpracováno" as const,
      sourceId: project.id,
    })),
    ...contentKnowledgeEntities,
  ], [candidates, projects]);

  const orphanKnowledgeEntities = findOrphanEntities(knowledgeEntities);
  const connectedKnowledgeEntities = knowledgeEntities.length - orphanKnowledgeEntities.length;
  const relationshipCoverage = Math.round(connectedKnowledgeEntities / knowledgeEntities.length * 100);
  const visibleKnowledgeEntities = relationshipType === "Vše"
    ? knowledgeEntities
    : knowledgeEntities.filter((entity) => entity.type === relationshipType);
  const topicHubs = knowledgeEntities.filter((entity) => entity.type === "topic");
  const relationshipEntityTypes = Object.keys(knowledgeEntityMeta) as KnowledgeEntityType[];

  function openKnowledgeEntity(entity: KnowledgeEntity) {
    if (entity.type === "candidate" && entity.sourceId) {
      const candidate = candidates.find((item) => item.id === entity.sourceId);
      if (candidate) {
        setSelectedProject(null);
        setSelectedCandidate(candidate);
      }
      return;
    }
    if (entity.type === "project" && entity.sourceId) {
      const project = projects.find((item) => item.id === entity.sourceId);
      if (project) {
        setSelectedCandidate(null);
        setSelectedProject(project);
      }
      return;
    }
    setToast(`${knowledgeEntityMeta[entity.type].publicLabel}: ${entity.title}`);
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
      <section className="weekly-focus glass-card">
        <div className="card-heading"><div><span className="eyebrow warning">Sprint 03 · aktualizováno {sprintUpdatedAt}</span><h2>🎯 Fokus týdne</h2></div><span className="count-pill warning-pill">{weeklyFocus.length}</span></div>
        <div className="weekly-focus-grid">{weeklyFocus.map((item) => <button key={item.title} onClick={() => navigate(item.owner === "Klient" ? "checklist" : "candidates")}><span className={`priority-dot ${item.severity}`} /><strong>{item.title}</strong><small>{item.owner}</small></button>)}</div>
      </section>
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
            <div className="progress-head"><span>Připravenost kampaně</span><strong>{campaignReadinessScore} %</strong></div>
            <div className="progress-track"><span style={{ width: `${campaignReadinessScore}%` }} /></div>
            <div className="progress-meta"><span>Start 1. 8.</span><span>Čas kampaně {campaignProgress} %</span></div>
          </div>
        </article>

        <article className="glass-card fire-card war-room-card">
          <div className="card-heading">
            <div><span className="eyebrow danger">War Room</span><h2>Stav právě teď</h2></div>
            <span className="count-pill danger-pill">4</span>
          </div>
          <button className="fire-item" onClick={() => navigate("checklist")}>
            <span className="priority-dot critical" />
            <span><strong>Aktuální priorita</strong><small>Schválení vizuální identity</small></span>
            <b>Klient</b>
          </button>
          <button className="fire-item" onClick={() => navigate("checklist")}>
            <span className="priority-dot critical" />
            <span><strong>Čeká na klienta</strong><small>Doména, články, medailonky a Facebook</small></span>
            <b>5 položek</b>
          </button>
          <button className="fire-item" onClick={() => navigate("candidates")}>
            <span className="priority-dot high" />
            <span><strong>Čeká na tým</strong><small>Šest medailonků a první série příspěvků</small></span>
            <b>Produkce</b>
          </button>
          <button className="fire-item" onClick={() => navigate("checklist")}>
            <span className="priority-dot critical" />
            <span><strong>Blokuje projekt</strong><small>Neschválená identita a přístupy k doméně</small></span>
            <b>2 kritické</b>
          </button>
        </article>
      </section>

      <section className="project-status-board">
        <article className="glass-card status-done-card"><div className="card-heading"><div><span className="eyebrow">Project Status</span><h2>🟢 Hotovo</h2></div><span className="count-pill success">{completedProjectStatus.length}</span></div><div>{completedProjectStatus.map((item) => <span key={item}><i>✓</i>{item}</span>)}</div></article>
        <article className="glass-card status-active-card"><div className="card-heading"><div><span className="eyebrow warning">Project Status</span><h2>🟠 Probíhá</h2></div><span className="count-pill warning-pill">{activeProjectStatus.length}</span></div><div>{activeProjectStatus.map((item) => <section key={item.title}><strong>{item.title}</strong><p>{item.status}</p><small>{item.detail}</small></section>)}</div></article>
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
            <span className="count-pill warning-pill">{clientInputs.length}</span>
          </div>
          <div className="debt-list">
            {clientInputs.map((item) => (
              <button key={item.id} onClick={() => navigate("checklist")}>
                <span className="check-ring" />
                <span><strong>{item.title}</strong><small>{item.priority} · {item.owner} · změna {item.updatedAt}</small></span>
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

      <section className="readiness-risk-grid">
        <article className="glass-card campaign-readiness-card"><div className="card-heading"><div><span className="eyebrow">Operační zdraví</span><h2>Připravenost kampaně</h2></div><span className="count-pill">{campaignReadinessScore} %</span></div><div className="readiness-bars">{campaignReadiness.map((item) => <div key={item.label}><span><strong>{item.label}</strong><b>{item.value} %</b></span><div className="progress-track"><i style={{ width: `${item.value}%` }} /></div></div>)}</div></article>
        <article className="glass-card sprint-risks-card"><div className="card-heading"><div><span className="eyebrow danger">War Room</span><h2>Aktuální rizika</h2></div><span className="count-pill danger-pill">{sprintRisks.length}</span></div><div>{sprintRisks.map((risk) => <details key={risk.title}><summary><span className={`priority-dot ${risk.priority === "Kritická" ? "critical" : "high"}`} /><strong>{risk.title}</strong><small>{risk.priority}</small></summary><p>{risk.description}</p><dl><div><dt>Dopad</dt><dd>{risk.impact}</dd></div><div><dt>Doporučené řešení</dt><dd>{risk.solution}</dd></div></dl></details>)}</div></article>
      </section>

      <section className="source-strip glass-card">
        <div className="source-icon">✓</div>
        <div><span className="eyebrow">Zdroje načteny</span><strong>Dashboard je založen na dodaných podkladech</strong><p>Publikační kalendář, Campaign Hub, executive summary, program 2026–2030, medailonky kandidátů, první článkové balíčky a externí fotky na Google Disku.</p><PhotoDriveLinks compact /></div>
        <div className="source-stats"><span><b>{posts.length}</b> naplánovaných výstupů</span><span><b>{projects.length}</b> projektových karet</span><span><b>11</b> kandidátů</span></div>
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
          <div><span className="eyebrow">Kandidátka Přezleťáci 2026</span><h1>11 lidí pro Přezletice</h1><p>Kompletní kandidátní databáze propojuje profily, produkční podklady, tematické oblasti a budoucí komunikační výstupy.</p></div>
          <div className="candidate-intro-media"><Image src="/images/team/team-hero.webp" alt="Tým Přezleťáků" fill sizes="(max-width: 640px) 100vw, 360px" priority unoptimized /><button className="primary-button" onClick={() => openCreate("candidate")}>＋ Přidat kandidáta</button></div>
        </section>
        <section className="photo-drive-panel glass-card"><div><span className="eyebrow">Externí fotky</span><h2>Google Disk pro produkci</h2><p>Kandidátské fotky jsou spárované s auditní složkou na Disku. Lokální rozsahy v profilu slouží jako přesná stopa ke konkrétním souborům.</p></div><PhotoDriveLinks compact /></section>

        <nav className="candidate-tabs glass-card" aria-label="Pohledy kandidátky">
          {(["overview", "matrix", "dashboard"] as CandidateView[]).map((view) => <button key={view} className={candidateView === view ? "active" : ""} onClick={() => setCandidateView(view)}><span>{view === "overview" ? "◎" : view === "matrix" ? "▦" : "◫"}</span>{view === "overview" ? "Přehled" : view === "matrix" ? "Matrice" : "Dashboard"}</button>)}
        </nav>

        <section className="candidate-sprint-brief glass-card"><div><span className="eyebrow warning">Aktuální priorita</span><h2>Finální texty pro prvních šest kandidátů</h2><p>Pracovní zpracování postupuje od konce kandidátky: #11 až #6. Pořadí publikace bude určeno až po schválení klientem.</p></div><div>{firstCandidateWave.map((order) => <span key={order}>#{order}</span>)}</div></section>

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
          <div className="card-heading"><div><span className="eyebrow">Candidate Matrix</span><h2>Oblasti a připravenost</h2></div><span className="count-pill">{candidates.length}</span></div>
          <div className="matrix-scroll"><table><thead><tr><th>Kandidát</th><th>Funkce</th><th>Oblasti</th><th>Příspěvky</th><th>Stav podkladů</th></tr></thead><tbody>{[...candidates].sort((a, b) => a.order - b.order).map((candidate) => {
            const completed = Object.values(candidate.assets).filter(Boolean).length;
            const topicCount = candidate.topics.filter((topic) => !topic.startsWith("Doplnit")).length;
            return <tr key={candidate.id} onClick={() => setSelectedCandidate(candidate)}><td><span className="matrix-person"><b>{candidate.order}</b><i>{candidate.initials}</i><span><strong>{candidate.name}</strong><small>{candidate.professions[0]}</small></span></span></td><td>{candidate.office || "—"}</td><td><strong>{topicCount}</strong><small> témat</small></td><td><strong>{candidate.plannedPostIds.length}</strong><small> v plánu</small></td><td><div className="matrix-progress"><span><b>{completed}/6</b><small>{Math.round(completed / 6 * 100)} %</small></span><div className="mini-progress"><i style={{ width: `${completed / 6 * 100}%` }} /></div></div></td></tr>;
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
      <section className="photo-drive-panel glass-card"><div><span className="eyebrow">Externí fotky</span><h2>Projektové fotografie na Google Disku</h2><p>Každá karta s fotkou nese lokální cestu k přiřazenému zdroji a odkaz na auditní/projektovou složku na Disku.</p></div><PhotoDriveLinks compact /></section>
      <div className="filter-bar glass-card">
        <div className="segmented-control">
          {(["Vše", "Hotové", "Rozpracované", "Plánované", "Doplnit"] as const).map((status) => <button className={projectStatus === status ? "active" : ""} key={status} onClick={() => setProjectStatus(status)}>{status}<span>{status === "Vše" ? projects.length : projects.filter((project) => project.status === status).length}</span></button>)}
        </div>
        <label className="inline-search"><span>⌕</span><input value={projectQuery} onChange={(event) => setProjectQuery(event.target.value)} placeholder="Hledat projekt, oblast nebo garanta…" /></label>
      </div>
      <section className="project-grid">
        {filteredProjects.map((project) => (
          <button className="project-card glass-card" key={project.id} onClick={() => setSelectedProject(project)}>
            <div className="project-top"><span className={`status-pill project-${slugify(project.status)}`}>{project.status}</span><span className="project-id">P-{String(project.id).padStart(2, "0")}</span></div>
            {project.image ? <div className="project-image"><Image src={project.image} alt={project.imageAlt || `Fotografie projektu ${project.title}`} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw" unoptimized /></div> : <div className="project-image-placeholder"><span>{project.area.slice(0, 1)}</span><small>Fotografie k doplnění</small></div>}
            <div className="project-copy"><span className="eyebrow">{project.area}</span><h2>{project.title}</h2><p>{project.summary}</p>{project.photoLibraryPath && <small className="asset-source">Foto: {project.photoLibraryPath}</small>}</div>
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
      <section className="photo-drive-panel glass-card"><div><span className="eyebrow">Produkční fotky</span><h2>Odkazy pro tvorbu postů</h2><p>Rozkliknutý post ukazuje přiřazené obrázky a odkaz na odpovídající složku na Google Disku.</p></div><PhotoDriveLinks compact /></section>
        <div className="calendar-layout">
          <section className="calendar-panel glass-card">
            <div className="calendar-toolbar"><div className="month-switcher">{monthOptions.map((month, index) => <button className={calendarMonth === index ? "active" : ""} key={month.label} onClick={() => setCalendarMonth(index)}>{month.label}</button>)}</div><div className="calendar-legend"><span className="pillar-lide">Lidé</span><span className="pillar-prace">Hotová práce</span><span className="pillar-rozdelane">Rozdělané</span><span className="pillar-plany">Plány</span><span className="pillar-vysvetlovani">Vysvětlujeme</span><span className="pillar-dokumenty">Důkazy</span><span className="fill-full">Plný</span><span className="fill-partial">Částečný</span><span className="fill-empty">Prázdný</span></div></div>
            <div className="weekday-row">{["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((day) => <span key={day}>{day}</span>)}</div>
            <div className="calendar-grid">
              {cells.map((day, index) => {
                if (!day) return <div className="calendar-day empty" key={`empty-${index}`} />;
                const iso = `2026-${String(selected.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayPosts = posts.filter((post) => post.date === iso);
                return <button className={`calendar-day ${dayPosts.length ? "has-post" : ""}`} key={iso} onClick={() => dayPosts[0] ? setSelectedPost(dayPosts[0]) : openCreate("post", iso)}><time>{day}</time>{dayPosts.map((post) => {
                  const fillState = getPostFillState(post);
                  return <span key={post.id} className={`calendar-event ${postPillarClass(post)}`}><b>{post.format}<em className={`fill-dot fill-${fillState.key}`} title={fillState.description}>{fillState.label}</em></b>{post.title}</span>;
                })}{!dayPosts.length && <i>＋</i>}</button>;
              })}
            </div>
          </section>
          <aside className="content-timeline glass-card">
            <div className="card-heading"><div><span className="eyebrow">Timeline</span><h2>{selected.label} 2026</h2></div><span className="count-pill">{monthPosts.length}</span></div>
            <div className="content-timeline-list">
              {monthPosts.length ? monthPosts.map((post) => {
                const fillState = getPostFillState(post);
                return <button key={post.id} onClick={() => setSelectedPost(post)}><time>{new Date(`${post.date}T12:00:00`).toLocaleDateString("cs-CZ", { day: "numeric", month: "short" })}</time><span className={`timeline-dot ${postPillarClass(post)}`} /><span><strong>{post.title}</strong><small>{post.format} · {post.status} · <em className={`fill-inline fill-${fillState.key}`}>{fillState.label}</em></small></span></button>;
              }) : <div className="empty-state">V tomto měsíci zatím nejsou žádné příspěvky.</div>}
            </div>
            <div className={`calendar-capacity${monthPosts.length > 8 ? " over-capacity" : ""}`}><span>Kapacita týmu</span><strong>{monthPosts.length} / 8 výstupů</strong>{monthPosts.length > 8 && <small>Kapacita překročena o {monthPosts.length - 8}</small>}<div className="mini-progress"><i style={{ width: `${Math.min(100, monthPosts.length / 8 * 100)}%` }} /></div></div>
          </aside>
        </div>
      </div>
    );
  };

  const renderRelationshipEngine = () => (
    <div className="relationship-workspace">
      <section className="relationship-hero glass-card">
        <div><span className="eyebrow">Knowledge Graph / Relationship Engine</span><h2>Síť vztahů mezi lidmi, tématy a obsahem</h2><p>Kandidáti se propojují s oblastmi, články a tématy. Projekty zůstávají samostatnými obsahovými jednotkami napojenými pouze na články, dokumenty, FAQ, galerie a videa.</p></div>
        <aside><span>Architektonické pravidlo</span><strong>Žádná slepá stránka</strong><small>Panel se skládá pouze z existujících a doložených vazeb.</small></aside>
      </section>

      <section className="relationship-metrics" aria-label="Stav Relationship Engine">
        {[
          { label: "Typy entit", value: relationshipEntityTypes.length, note: "rozšiřitelný registr" },
          { label: "Entity", value: knowledgeEntities.length, note: "jeden společný kontext" },
          { label: "Strukturované vazby", value: knowledgeRelationships.length, note: "obousměrně dohledatelné" },
          { label: "Pokrytí vztahy", value: `${relationshipCoverage} %`, note: `${orphanKnowledgeEntities.length} entit čeká na vazbu` },
        ].map((metric) => <article className="glass-card" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small></article>)}
      </section>

      <section className="relationship-entity-map glass-card">
        <div className="card-heading"><div><span className="eyebrow">Datový model</span><h2>Osm rovnocenných typů obsahu</h2></div><span className="count-pill">{visibleKnowledgeEntities.length}</span></div>
        <div className="relationship-type-filter"><button className={relationshipType === "Vše" ? "active" : ""} onClick={() => setRelationshipType("Vše")}>Vše</button>{relationshipEntityTypes.map((type) => <button className={relationshipType === type ? "active" : ""} onClick={() => setRelationshipType(type)} key={type}>{knowledgeEntityMeta[type].icon} {knowledgeEntityMeta[type].label}</button>)}</div>
        <div className="relationship-type-grid">{relationshipEntityTypes.filter((type) => relationshipType === "Vše" || relationshipType === type).map((type) => {
          const entities = knowledgeEntities.filter((entity) => entity.type === type);
          const connected = entities.filter((entity) => getEntityRelationships(entity.id).length > 0).length;
          return <article key={type}><span>{knowledgeEntityMeta[type].icon}</span><div><strong>{knowledgeEntityMeta[type].label}</strong><small>{connected} propojeno z {entities.length}</small></div><b>{entities.length}</b></article>;
        })}</div>
      </section>

      <section className="relationship-main-grid">
        <article className="relationship-stream glass-card">
          <div className="card-heading"><div><span className="eyebrow">Relationship registry</span><h2>Doložené vazby</h2></div><span className="count-pill">{knowledgeRelationships.length}</span></div>
          <div>{knowledgeRelationships.map((relationship) => {
            const from = knowledgeEntities.find((entity) => entity.id === relationship.from);
            const to = knowledgeEntities.find((entity) => entity.id === relationship.to);
            if (!from || !to) return null;
            return <div className="relationship-row" key={relationship.id}><button onClick={() => openKnowledgeEntity(from)}><span>{knowledgeEntityMeta[from.type].icon}</span><strong>{from.title}</strong></button><div><small>{relationshipTypeLabels[relationship.type]}</small><i>↔</i></div><button onClick={() => openKnowledgeEntity(to)}><span>{knowledgeEntityMeta[to.type].icon}</span><strong>{to.title}</strong></button>{relationship.role && <p>{relationship.role}</p>}</div>;
          })}</div>
        </article>

        <aside className="relationship-audit glass-card">
          <div className="card-heading"><div><span className="eyebrow warning">Quality gate</span><h2>Osiřelý obsah</h2></div><span className="count-pill warning-pill">{orphanKnowledgeEntities.length}</span></div>
          <p>Tyto entity zatím nevytvářejí přirozenou další cestu. Nejde o chybu dat, ale o řízený seznam vazeb k doplnění.</p>
          <div>{orphanKnowledgeEntities.slice(0, 12).map((entity) => <button key={entity.id} onClick={() => openKnowledgeEntity(entity)}><span>{knowledgeEntityMeta[entity.type].icon}</span><div><strong>{entity.title}</strong><small>{knowledgeEntityMeta[entity.type].label} · {entity.status}</small></div><b>＋</b></button>)}</div>
          {orphanKnowledgeEntities.length > 12 && <small className="relationship-more">+ {orphanKnowledgeEntities.length - 12} dalších entit čeká na vazbu</small>}
        </aside>
      </section>

      <section className="topic-hub-section glass-card">
        <div className="card-heading"><div><span className="eyebrow">Obsahové huby</span><h2>Témata odpovídají tomu, co občany zajímá</h2></div><span className="count-pill">{topicHubs.length}</span></div>
        <div className="topic-hub-grid">{topicHubs.map((topic) => {
          const groups = groupRelatedEntities(topic.id, knowledgeEntities);
          const relatedCount = Object.values(groups).reduce((sum, entities) => sum + (entities?.length ?? 0), 0);
          return <article key={topic.id}><span className="topic-hub-icon">◉</span><h3>{topic.title}</h3><p>{topic.summary}</p><footer><span>{relatedCount} vazeb</span><div>{relationshipEntityTypes.filter((type) => groups[type]?.length).map((type) => <i title={knowledgeEntityMeta[type].label} key={type}>{knowledgeEntityMeta[type].icon}</i>)}</div></footer></article>;
        })}</div>
      </section>

      <section className="relationship-output-grid">
        <article className="glass-card"><span className="eyebrow">Jednotný veřejný blok</span><h2>Relationship Panel</h2><p>Na kandidátovi, projektu, článku, dokumentu i tématu používá stejnou logiku. Prázdné kategorie se nezobrazují.</p><RelationshipPanel entityId="project:4" entities={knowledgeEntities} onOpen={openKnowledgeEntity} /></article>
        <article className="glass-card"><span className="eyebrow">Multichannel</span><h2>Jeden vztah, více výstupů</h2><div className="relationship-output-flow">{[
          ["Kandidát", "Oblasti a články", "Instagram"],
          ["Projekt", "Článek + důkazy", "Carousel"],
          ["Článek", "Související projekt", "Facebook"],
          ["Téma", "FAQ + dokumenty", "Newsletter"],
        ].map((flow) => <div key={flow.join("-")}><strong>{flow[0]}</strong><span>↓</span><strong>{flow[1]}</strong><span>↓</span><b>{flow[2]}</b></div>)}</div></article>
      </section>
    </div>
  );

  const renderArticleLibrary = () => (
    <section className="article-library section-stack" aria-label="Centrální seznam článků">
      <div className="article-library-hero glass-card">
        <div><span className="eyebrow">Article Library</span><h2>Všechny články na jednom místě</h2><p>Články už nejsou schované za neklikací MD cestou. Odsud je otevřeš, zkontroluješ webový text, vezmeš SoMe derivát a připravíš sdílení.</p></div>
        <div className="article-library-stats"><strong>{articleContent.length}</strong><span>připravených článků</span><small>{articleContent.filter((article) => article.status === "copy-ke-schvaleni").length} ke schválení</small></div>
      </div>
      <div className="article-library-grid">
        {articleContent.map((article) => {
          const linkedPosts = posts.filter((post) => article.socialPostIds.includes(post.id));
          const primaryDriveUrl = getProjectPhotoDriveUrlForImage(article.primaryImage) ?? getPhotoAuditFolderForAsset(article.primaryImage);
          return <article className="article-library-card glass-card" key={article.slug}>
            <button className="article-library-card-main" onClick={() => setSelectedArticle(article)}>
              <div className="article-card-image"><Image src={article.primaryImage} alt={`Náhled článku ${article.title}`} fill sizes="(max-width: 760px) 100vw, 360px" unoptimized /></div>
              <div><span className="eyebrow">{article.pillar} · {article.status === "copy-ke-schvaleni" ? "Copy ke schválení" : article.status}</span><h3>{article.title}</h3>{article.byline ? <small>{article.byline}</small> : null}<p>{article.summary}</p></div>
            </button>
            <dl className="article-library-meta"><div><dt>Markdown</dt><dd><a className="inline-link-button" href={articleMarkdownUrl(article)} target="_blank" rel="noreferrer">{article.markdownPath}</a></dd></div><div><dt>Webová URL</dt><dd><a className="inline-link-button" href={articlePublicPath(article)} target="_blank" rel="noreferrer">{articlePublicPath(article)}</a></dd></div><div><dt>Posty</dt><dd>{linkedPosts.length ? linkedPosts.map((post) => `#${post.id}`).join(" · ") : "Čeká"}</dd></div></dl>
            <div className="article-library-actions"><a className="primary-button" href={articlePublicPath(article)} target="_blank" rel="noreferrer">Otevřít na webu</a><button className="secondary-button" onClick={() => setSelectedArticle(article)}>Náhled v HQ</button><button className="secondary-button" onClick={() => copyToClipboard(article.socialCopy, "SoMe text článku")}>Kopírovat SoMe</button><button className="secondary-button" onClick={() => shareArticle(article)}>Sdílet</button><a href={primaryDriveUrl} target="_blank" rel="noreferrer">Zdroj fotky ↗</a></div>
          </article>;
        })}
      </div>
    </section>
  );

  const renderWeb = () => (
    <div className="section-stack web-workspace">
      <section className="section-intro glass-card web-intro">
        <div><span className="eyebrow">Jediný zdroj pravdy</span><h1>Webový obsah kampaně</h1><p>Živý brief pro webdesignéra, pracovní sitemap, stav podkladů a exportovatelný kontext pro celý tým.</p></div>
        <div className="web-score"><span>Připravenost obsahu</span><strong>{websiteReadiness} %</strong><div className="progress-track"><i style={{ width: `${websiteReadiness}%` }} /></div><small>{websiteMetrics.total} plánovaných stránek a profilů</small></div>
      </section>

      <nav className="web-tabs glass-card" aria-label="Podsekce Web">
        <button className={webView === "brief" ? "active" : ""} onClick={() => setWebView("brief")}><span>01</span><strong>Web Brief</strong><small>Strategie a zadání</small></button>
        <button className={webView === "articles" ? "active" : ""} onClick={() => setWebView("articles")}><span>02</span><strong>Články</strong><small>{articleContent.length} textů ke sdílení</small></button>
        <button className={webView === "inventory" ? "active" : ""} onClick={() => setWebView("inventory")}><span>03</span><strong>Sitemap & Content Inventory</strong><small>{websiteMetrics.total} položek</small></button>
        <button className={webView === "relationships" ? "active" : ""} onClick={() => setWebView("relationships")}><span>04</span><strong>Relationship Engine</strong><small>{knowledgeRelationships.length} vazeb</small></button>
      </nav>

      {webView === "brief" ? <>
        <section className="markdown-export-grid" aria-label="Markdown exporty">
          {markdownDocuments.map((document) => <article className="markdown-export-card glass-card" key={document.name}>
            <div className="markdown-file-mark">MD</div>
            <div><span className="eyebrow">Synchronizovaný dokument</span><h2>{document.name}</h2><p>{document.name === "WEB_BRIEF.md" ? "Kompletní strategický a obsahový brief pro webdesignéra." : "Kompaktní kontext kampaně pro Codex, ChatGPT, Claude, Cursor a Gemini."}</p></div>
            <div className="markdown-actions"><button className="primary-button" onClick={() => setSelectedMarkdown(document)}>Otevřít {document.name}</button><button className="secondary-button" onClick={() => copyMarkdown(document)}>{document.name === "AI_CONTEXT.md" ? "Kopírovat pro AI" : "Kopírovat obsah"}</button><button className="secondary-button" onClick={() => downloadMarkdown(document)}>Stáhnout .md</button></div>
          </article>)}
        </section>

        <section className="web-brief-layout">
          <div className="web-brief-accordions">
            {webBriefSections.map((section, index) => <details className="web-brief-section glass-card" key={section.id} open={index < 2}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section.title}</h2><p>{section.summary}</p></div><b className={`brief-status brief-${section.status}`}>{section.status === "approved" ? "Schváleno" : section.status === "review" ? "K revizi" : "Koncept"}</b><i>＋</i></summary>
              <div className="brief-section-body">
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
                {section.numbered && <ol>{section.numbered.map((item) => <li key={item}>{item}</li>)}</ol>}
                <small>Aktualizováno {section.updatedAt}</small>
              </div>
            </details>)}
          </div>

          <aside className="web-brief-aside">
            <article className="glass-card web-principle-card"><span className="eyebrow">Hlavní princip</span><blockquote>„Nechceme pouze říkat, co jsme udělali. Chceme vysvětlit, proč to vzniklo, co to obci přineslo a jak na to navážeme.“</blockquote></article>
            <article className="glass-card web-workflow-card"><span className="eyebrow">Obsahové workflow</span><div>{["Nápad", "Podklady", "Webové copy", "Kontrola faktů", "Schválení", "Publikace", "Social výstupy", "Distribuce", "Aktualizace"].map((step, index) => <div key={step}><b>{index + 1}</b><span>{step}</span>{index < 8 && <i>↓</i>}</div>)}</div></article>
          </aside>
        </section>

        <section className="web-open-issues glass-card">
          <div className="card-heading"><div><span className="eyebrow">Živá evidence</span><h2>Otevřené body</h2></div><span className="count-pill">{webOpenIssues.length}</span></div>
          <div className="web-issue-grid">{webOpenIssues.map((issue) => <article key={issue.id}><div><span className={`priority-tag priority-${slugify(issue.priority)}`}>{issue.priority}</span><span className="status-pill warning-pill">{issue.status}</span></div><h3>{issue.title}</h3><p>{issue.description}</p><dl><div><dt>Odpovědnost</dt><dd>{issue.owner}</dd></div><div><dt>Termín</dt><dd>{issue.deadline}</dd></div></dl><small>{issue.note}</small></article>)}</div>
        </section>
      </> : webView === "articles" ? renderArticleLibrary() : webView === "inventory" ? <>
        <section className="web-readiness-grid" aria-label="Připravenost webového obsahu">
          {[{ label: "Plánované stránky", value: websiteMetrics.total, note: "včetně profilů a projektů" }, { label: "Publikováno", value: websiteMetrics.published, note: "živé stránky" }, { label: "Připraveno k předání", value: websiteMetrics.handoff, note: "webdesignerovi" }, { label: "Čeká na podklady", value: websiteMetrics.waiting, note: "blokované položky" }, { label: "Kritické blokátory", value: websiteMetrics.critical, note: "ohrožují spuštění" }, { label: "Content readiness", value: `${websiteReadiness} %`, note: "vážený průměr podkladů" }].map((metric) => <article className="glass-card" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.note}</small></article>)}
        </section>

        <section className="web-inventory-filters glass-card">
          <label className="inline-search"><span>⌕</span><input value={webQuery} onChange={(event) => setWebQuery(event.target.value)} placeholder="Hledat stránku, účel nebo poznámku…" /></label>
          <div className="web-filter-grid">
            <label>Stav<select value={webStatus} onChange={(event) => setWebStatus(event.target.value as "Vše" | WebsiteContentStatus)}>{websiteStatuses.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label>Priorita<select value={webPriority} onChange={(event) => setWebPriority(event.target.value as "Vše" | WebsitePriority)}>{websitePriorities.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label>Typ stránky<select value={webPageType} onChange={(event) => setWebPageType(event.target.value)}>{websitePageTypes.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label>Pilíř<select value={webPillar} onChange={(event) => setWebPillar(event.target.value)}>{websitePillars.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label>Odpovědnost<select value={webOwner} onChange={(event) => setWebOwner(event.target.value)}>{websiteOwners.map((value) => <option key={value}>{value}</option>)}</select></label>
            <label>Kandidát<select value={webCandidate} onChange={(event) => setWebCandidate(event.target.value)}><option>Všichni</option>{candidates.map((candidate) => <option value={candidate.id} key={candidate.id}>{candidate.name}</option>)}</select></label>
            <label>Projekt<select value={webProject} onChange={(event) => setWebProject(event.target.value)}><option>Všechny</option>{projects.map((project) => <option value={project.id} key={project.id}>{project.title}</option>)}</select></label>
            <label>Termín<select value={webDeadline} onChange={(event) => setWebDeadline(event.target.value)}>{websiteDeadlines.map((value) => <option key={value}>{value}</option>)}</select></label>
          </div>
          <span className="web-filter-result">Zobrazeno {filteredWebsiteItems.length} z {websiteContentItems.length} položek</span>
        </section>

        <section className="web-inventory-list">
          {filteredWebsiteItems.map((item) => <details className="web-inventory-item glass-card" key={item.id}>
            <summary><div className="inventory-readiness"><strong>{item.readiness}%</strong><span><i style={{ width: `${item.readiness}%` }} /></span></div><div><span className="eyebrow">{item.pageType} · {item.section}</span><h2>{item.title}</h2><p>{item.purpose}</p></div><div className="inventory-tags"><span className={`priority-tag priority-${slugify(item.priority)}`}>{item.priority}</span><span className={`status-pill web-status-${slugify(item.status)}`}>{item.status}</span></div><i>＋</i></summary>
            <div className="inventory-detail-grid">
              <dl><div><dt>Komunikační pilíř</dt><dd>{item.pillar}</dd></div><div><dt>Odpovědnost</dt><dd>{item.owner}</dd></div><div><dt>Termín</dt><dd>{item.deadline}</dd></div><div><dt>Rozpracovaný obsah</dt><dd>{item.id.startsWith("article-") ? <button className="inline-link-button" onClick={() => openArticleFromWebsiteItem(item)}>{item.draftLink}</button> : item.draftLink}</dd></div><div><dt>Podklady</dt><dd>{item.sourceLinks.length ? item.sourceLinks.map((link, index) => <span key={`${item.id}-${link}`}>{index > 0 ? " · " : ""}{link.startsWith("http") ? <a href={link} target="_blank" rel="noreferrer">Google Disk ↗</a> : link}</span>) : "Čeká"}</dd></div><div><dt>Poznámka</dt><dd>{item.notes}</dd></div></dl>
              {item.checklist && <div className="inventory-checklist"><strong>Stav podkladů</strong>{item.checklist.map((check) => <span className={check.available ? "done" : ""} key={check.label}><i>{check.available ? "✓" : ""}</i>{check.label}</span>)}</div>}
              <div className="inventory-blockers"><strong>Chybí / blokuje</strong>{item.blockers.length ? item.blockers.map((blocker) => <span key={blocker}>! {blocker}</span>) : <span className="resolved">✓ Bez evidovaného blokátoru</span>}</div>
            </div>
          </details>)}
          {!filteredWebsiteItems.length && <div className="empty-state glass-card">Žádná položka neodpovídá zvoleným filtrům.</div>}
        </section>

        <section className="web-blockers glass-card">
          <div className="card-heading"><div><span className="eyebrow danger">Rizika spuštění</span><h2>Blokátory webu</h2></div><span className="count-pill danger-pill">{webBlockers.filter((blocker) => blocker.status !== "Vyřešeno").length}</span></div>
          <div className="web-blocker-grid">{webBlockers.map((blocker) => <article key={blocker.id}><div><span className={`priority-tag priority-${slugify(blocker.severity)}`}>{blocker.severity}</span><span className="status-pill warning-pill">{blocker.status}</span></div><h3>{blocker.title}</h3><p>{blocker.description}</p><dl><div><dt>Odpovědnost</dt><dd>{blocker.owner}</dd></div><div><dt>Další krok</dt><dd>{blocker.nextStep}</dd></div></dl></article>)}</div>
        </section>
      </> : renderRelationshipEngine()}
    </div>
  );

  const renderChecklist = () => (
    <div className="section-stack">
      <section className="section-intro compact-intro glass-card"><div><span className="eyebrow">Pracovní tok</span><h1>Checklist</h1><p>Kanban všech kampaních úkolů, blokací a dodávek. Kliknutím na kartu otevřete detail a posunete stav.</p></div><button className="primary-button" onClick={() => openCreate("task")}>＋ Přidat úkol</button></section>
      <section className="client-inputs-panel glass-card"><div className="card-heading"><div><span className="eyebrow danger">Čekáme na klienta</span><h2>Klientské podklady</h2></div><span className="count-pill danger-pill">{clientInputs.length}</span></div><div>{clientInputs.map((item) => <article key={item.id}><span className="check-ring" /><div><strong>{item.title}</strong><small>Poslední změna {item.updatedAt}</small></div><span className={`priority-tag priority-${slugify(item.priority)}`}>{item.priority}</span><b>{item.owner}</b></article>)}</div></section>
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
      <section className="section-intro glass-card timeline-intro"><div><span className="eyebrow">Sprint 03 · závislosti</span><h1>Roadmap kampaně</h1><p>Pořadí kroků vychází ze skutečných blokací: identita → medailonky → šablony → kandidáti → web → projektový a vysvětlující obsah.</p></div><div className="countdown-mini"><strong>{daysLeft}</strong><span>dní do voleb</span></div></section>
      <section className="production-strategy-card glass-card"><div><span className="eyebrow warning">Nová produkční strategie</span><h2>{productionStrategy.title}</h2><p>{productionStrategy.opening}</p></div><div><span>První dva týdny</span><strong>{productionStrategy.firstPhase.join(" · ")}</strong><i>→</i><span>Po spuštění webu</span><strong>{productionStrategy.secondPhase.join(" · ")}</strong></div></section>
      <div className="timeline-filters glass-card">{["Vše", "Marketing", "Produkce", "Klient", "Web"].map((category) => <button className={`${timelineFilter === category ? "active" : ""} timeline-cat-${category.toLowerCase()}`} key={category} onClick={() => setTimelineFilter(category)}>{category}</button>)}</div>
      <section className="roadmap glass-card">
        <div className="roadmap-line" />
        {filteredTimeline.map((item, index) => <article className={`roadmap-item timeline-cat-${item.category.toLowerCase()}`} key={item.title}><div className="roadmap-date"><strong>{item.date}</strong></div><span className="roadmap-node">{index + 1}</span><div className="roadmap-card"><span className="eyebrow">{item.category}</span><h2>{item.title}</h2><p>{item.note}</p><small>{index === filteredTimeline.length - 1 ? "Cíl kampaně" : `Následuje: ${filteredTimeline[index + 1]?.title || "—"}`}</small></div></article>)}
      </section>
    </div>
  );

  const renderDocuments = () => (
    <div className="section-stack">
      <section className="section-intro compact-intro glass-card"><div><span className="eyebrow">Repository</span><h1>Dokumenty a důkazy</h1><p>Centrální registr známých podkladů i chybějících assetů. Vyhledávání je připravené na desítky dokumentů a stovky fotografií.</p></div><span className="repository-health"><b>11</b> načteno · <b>3</b> čekáme</span></section>
      <div className="filter-bar glass-card document-filters"><label className="inline-search"><span>⌕</span><input value={documentQuery} onChange={(event) => setDocumentQuery(event.target.value)} placeholder="Hledat soubor nebo popis…" /></label><div className="category-scroll">{docCategories.map((category) => <button className={documentCategory === category ? "active" : ""} key={category} onClick={() => setDocumentCategory(category)}>{category}</button>)}</div></div>
      <section className="document-grid">
        {filteredDocuments.map((document) => <button className="document-card glass-card" key={document.title} onClick={() => setSelectedDocument(document)}><div className={`file-icon file-${document.type.toLowerCase()}`}>{document.type.slice(0, 3)}</div><div><span className="eyebrow">{document.category}</span><h2>{document.title}</h2><p>{document.description}</p><div className="document-meta"><span className={`status-pill ${document.status === "Načteno" ? "success" : "warning-pill"}`}>{document.status}</span><time>{document.updated}</time></div></div></button>)}
      </section>
    </div>
  );

  const renderSettings = () => (
    <div className="section-stack settings-stack">
      <section className="section-intro compact-intro glass-card"><div><span className="eyebrow">Campaign HQ</span><h1>Nastavení</h1><p>Vzhled, lokální data a přenos pracovní verze mezi zařízeními.</p></div><span className="version-pill">Verze 1.0</span></section>
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
    const productionChecks = [
      { label: candidateProductionChecklist[0], done: selectedCandidate.assets.medallion },
      { label: candidateProductionChecklist[1], done: selectedCandidate.assets.bio },
      { label: candidateProductionChecklist[2], done: false },
      { label: candidateProductionChecklist[3], done: selectedCandidate.assets.photos },
      { label: candidateProductionChecklist[4], done: false },
      { label: candidateProductionChecklist[5], done: relatedPosts.length > 0 },
      { label: candidateProductionChecklist[6], done: relatedPosts.some((post) => post.status === "Publikováno") },
    ];
    return <div className="modal-backdrop" onMouseDown={() => setSelectedCandidate(null)}><section className="detail-modal candidate-detail candidate-profile" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedCandidate(null)}>×</button>
      <div className="candidate-detail-hero"><div className="detail-avatar"><span aria-hidden="true">{selectedCandidate.initials}</span>{selectedCandidate.image && <Image src={selectedCandidate.image} alt={`Portrét – ${selectedCandidate.name}`} fill sizes="114px" unoptimized onError={(event) => { event.currentTarget.hidden = true; }} />}<b>#{selectedCandidate.order}</b></div><div><span className="eyebrow">Kandidát č. {selectedCandidate.order}</span><h2>{selectedCandidate.name}</h2>{selectedCandidate.office && <strong>{selectedCandidate.office}</strong>}<p>{selectedCandidate.professions.join(" · ")}</p></div></div>
      <div className="candidate-profile-grid">
        <article className="profile-panel profile-about"><div className="profile-panel-head"><span className="eyebrow">Profil</span><b>{selectedCandidate.assets.bio ? "Připraveno" : "Doplnit"}</b></div>{selectedCandidate.headline && <blockquote>„{selectedCandidate.headline}“</blockquote>}{selectedCandidate.headlineStatus && <small className="asset-source">Claim: {selectedCandidate.headlineStatus}</small>}<p>{selectedCandidate.bio}</p>{selectedCandidate.quote && <blockquote>„{selectedCandidate.quote}“</blockquote>}</article>
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Produkční checklist</span><b>{productionChecks.filter((item) => item.done).length}/7</b></div><ul className="asset-checklist">{productionChecks.map((item) => <li className={item.done ? "done" : ""} key={item.label}><span>{item.done ? "✓" : ""}</span>{item.label}</li>)}</ul></article>
      </div>
      {selectedCandidate.socialCopy && <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">SoMe medailonek</span><b>{selectedCandidate.socialCopy.length} znaků</b></div><p className="social-copy-preview">{selectedCandidate.socialCopy}</p></article>}
      <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Komunikační témata</span><button onClick={() => setToast("Témata budou doplněna v další obsahové fázi.")}>＋ Přidat</button></div><div className="tag-list">{selectedCandidate.topics.map((topic) => <span key={topic}>{topic}</span>)}</div></article>
      <div className="candidate-profile-grid">
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Naplánované příspěvky</span><b>{relatedPosts.length}</b></div><div className="profile-link-list">{relatedPosts.length ? relatedPosts.map((post) => <button key={post.id} onClick={() => { setSelectedCandidate(null); setSelectedPost(post); }}><span className={`timeline-dot ${postPillarClass(post)}`} /><span><strong>{post.title}</strong><small>{formatDate(post.date)} · {post.format}</small></span><b>→</b></button>) : <div className="profile-empty">Zatím bez naplánovaného příspěvku.</div>}</div></article>
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Oblasti, kterým se věnuji</span><b>{selectedCandidate.topics.filter((topic) => !topic.startsWith("Doplnit")).length}</b></div><div className="candidate-topic-list">{selectedCandidate.topics.map((topic) => <span key={topic}>{topic}</span>)}</div><p className="profile-hint">Oblasti se propojují se souvisejícími články a tematickými huby, nikoli přímo s projektovými kartami.</p></article>
      </div>
      <RelationshipPanel entityId={`candidate:${selectedCandidate.id}`} entities={knowledgeEntities} onOpen={openKnowledgeEntity} />
      <article className="profile-panel gallery-panel"><div className="profile-panel-head"><span className="eyebrow">Galerie</span><b>1 webový portrét · {gallery.length} zdrojů</b></div><p className="asset-source">Portrét je přiřazen podle názvu zdrojového souboru. Produkční rozsahy: {selectedCandidate.photoRanges.join(", ")}.</p><div className="photo-source-actions"><a href={selectedCandidate.portraitDriveUrl ?? selectedCandidate.photoDriveUrl ?? photoAuditDriveFolders.candidateSelected} target="_blank" rel="noreferrer">Otevřít vybraný portrét na Disku ↗</a><a href={selectedCandidate.photoSourceDriveUrl ?? photoAuditDriveFolders.candidateOriginals} target="_blank" rel="noreferrer">Otevřít zdrojovou sérii ↗</a><small>Lokálně: photo-library/01_kandidati</small></div><div className="candidate-gallery">{selectedCandidate.image && <div className="gallery-photo"><Image src={selectedCandidate.image} alt={`Portrét – ${selectedCandidate.name}`} fill sizes="300px" unoptimized /><small>{selectedCandidate.image.split("/").pop()}</small></div>}{gallery.slice(0, 10).map((photo) => <div key={photo} data-filename={photo}><span>{selectedCandidate.initials}</span><small>{photo}</small></div>)}{gallery.length > 10 && <div className="gallery-more"><strong>+{gallery.length - 10}</strong><small>zdrojů</small></div>}</div></article>
      <div className="candidate-profile-grid">
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Video</span><b>0 / 4</b></div><div className="video-placeholders">{["Rozhovor", "Reels", "Podcast", "Veřejná setkání"].map((format) => <button key={format}><span>▶</span><strong>{format}</strong><small>Připojit výstup</small></button>)}</div></article>
        <article className="profile-panel"><div className="profile-panel-head"><span className="eyebrow">Dokumenty</span><b>{selectedCandidate.documents.length}</b></div><div className="profile-documents">{selectedCandidate.documents.length ? selectedCandidate.documents.map((document) => <div key={document}><span>DOC</span><strong>{document}</strong></div>) : <div className="profile-empty">PDF, usnesení, fotografie a zápisy lze připojit později.</div>}{selectedCandidate.reviewNotes?.length ? <div className="review-notes">{selectedCandidate.reviewNotes.map((note) => <small key={note}>{note}</small>)}</div> : null}<button className="secondary-button" onClick={() => setToast("Připojení dokumentů je připravené pro interní úložiště.")}>＋ Připojit dokument</button></div></article>
      </div>
    </section></div>;
  };

  const renderPostDetail = () => {
    if (!selectedPost) return null;
    const article = selectedPost.articleSlug ? articleContentBySlug.get(selectedPost.articleSlug) : null;
    const program = selectedPost.programSlug ? programContentBySlug.get(selectedPost.programSlug) : null;
    const linkedCandidate = selectedPost.candidateId
      ? candidates.find((candidate) => candidate.id === selectedPost.candidateId)
      : selectedPost.id === 134 ? undefined : candidates.find((candidate) => candidate.plannedPostIds.includes(selectedPost.id));
    const linkedProject = selectedPost.projectId ? projects.find((project) => project.id === selectedPost.projectId) : null;
    const galleryImages = selectedPost.galleryImages ?? article?.galleryImages ?? [];
    const primaryImage = selectedPost.primaryImage ?? article?.primaryImage ?? linkedProject?.image ?? linkedCandidate?.image;
    const primaryImageDriveUrl = primaryImage
      ? getProjectPhotoDriveUrlForImage(primaryImage) ?? (linkedCandidate ? linkedCandidate.portraitDriveUrl : undefined) ?? linkedProject?.photoDriveUrl ?? getPhotoAuditFolderForAsset(primaryImage)
      : (linkedCandidate ? linkedCandidate.portraitDriveUrl : undefined) ?? linkedProject?.photoDriveUrl ?? (selectedPost.id === 134 ? teamSourceDriveFolder : PHOTO_DRIVE_ROOT_URL);
    const postGoogleDriveUrl = selectedPost.googleDriveUrl ?? primaryImageDriveUrl;
    const articlePrimaryDriveUrl = article ? getProjectPhotoDriveUrlForImage(article.primaryImage) : undefined;
    const articleGalleryDriveUrls = article?.galleryImages.map((image) => ({ image, driveUrl: getProjectPhotoDriveUrlForImage(image) ?? getPhotoAuditFolderForAsset(image) })) ?? [];
    const fillState = getPostFillState(selectedPost);
    const openRelatedSection = () => {
      setSelectedPost(null);
      if (linkedCandidate) {
        setSelectedCandidate(linkedCandidate);
        navigate("candidates");
      } else if (article || program) {
        setWebView("inventory");
        navigate("web");
      } else if (linkedProject) {
        setSelectedProject(linkedProject);
        navigate("projects");
      } else {
        navigate("checklist");
      }
    };
    return <div className="modal-backdrop" onMouseDown={() => setSelectedPost(null)}><section className="detail-modal post-detail post-readable-detail" onMouseDown={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={() => setSelectedPost(null)}>×</button>
      <div className="post-detail-badges"><span className={`status-pill ${postPillarClass(selectedPost)}`}>{selectedPost.contentType ? contentTemplates[selectedPost.contentType].label : selectedPost.pillar}</span><span className={`fill-badge fill-${fillState.key}`} title={fillState.description}>{fillState.label}</span></div>
      <h2>{selectedPost.title}</h2>
      <p className="post-date">{formatDate(selectedPost.date)} · {selectedPost.format} · {selectedPost.status} · {fillState.description}</p>
      <article className={`post-asset-hero post-preview-${postPreviewShape(selectedPost.format)}`} aria-label={`Náhled postu ${selectedPost.title}`}>
        <header><span>{selectedPost.format}</span><b>{formatDate(selectedPost.date)}</b></header>
        {primaryImage ? <div className="post-preview-media"><Image src={primaryImage} alt={`Primární vizuál pro ${selectedPost.title}`} fill sizes="(max-width: 760px) 100vw, 760px" unoptimized /></div> : <div className={`post-preview-generated post-preview-generated-${selectedPost.contentType ?? contentTypeFromPillar(selectedPost.pillar)}`}><span>{selectedPost.contentType ? contentTemplates[selectedPost.contentType].icon : contentTemplates[contentTypeFromPillar(selectedPost.pillar)].icon}</span><h3>{selectedPost.title}</h3><p>{selectedPost.contentSummary ?? selectedPost.socialCopy ?? "Produkční náhled čeká na doplnění finální grafiky."}</p>{selectedPost.cta && <small>{selectedPost.cta}</small>}</div>}
        <footer><span>{selectedPost.contentType ? contentTemplates[selectedPost.contentType].label : selectedPost.pillar}</span><strong>Přezleťáci 2026</strong></footer>
      </article>
      {selectedPost.socialCopy && <article className="post-readable-card post-social-copy-card"><div className="profile-panel-head"><span className="eyebrow">Hlavní SoMe text</span><button onClick={() => copyToClipboard(selectedPost.socialCopy ?? "", "Text postu")}>Kopírovat</button></div><p className="social-copy-preview">{selectedPost.socialCopy}</p>{selectedPost.cta && <div className="post-cta"><span>CTA</span><strong>{selectedPost.cta}</strong></div>}</article>}
      {(selectedPost.facebookCopy || selectedPost.instagramCopy || selectedPost.carouselOutline?.length || selectedPost.hashtags?.length || selectedPost.altText) && <article className="post-readable-card post-channel-brief"><div className="profile-panel-head"><span className="eyebrow">Kanálové varianty</span><b>FB / IG / Carousel</b></div>{selectedPost.facebookCopy && <section><div className="profile-panel-head"><span>Facebook copy</span><button onClick={() => copyToClipboard(selectedPost.facebookCopy ?? "", "Facebook copy")}>Kopírovat</button></div><p className="social-copy-preview">{selectedPost.facebookCopy}</p></section>}{selectedPost.instagramCopy && <section><div className="profile-panel-head"><span>Instagram copy</span><button onClick={() => copyToClipboard(selectedPost.instagramCopy ?? "", "Instagram copy")}>Kopírovat</button></div><p className="social-copy-preview">{selectedPost.instagramCopy}</p></section>}{selectedPost.carouselOutline?.length ? <section><strong>Carousel osnova</strong><ol>{selectedPost.carouselOutline.map((slide) => <li key={slide}>{slide}</li>)}</ol></section> : null}<dl className="post-article-meta">{selectedPost.hashtags?.length ? <div><dt>Hashtagy</dt><dd>{selectedPost.hashtags.join(" ")}</dd></div> : null}{selectedPost.altText ? <div><dt>Alt text</dt><dd>{selectedPost.altText}</dd></div> : null}</dl></article>}
      <article className="post-readable-card post-production-brief"><div className="profile-panel-head"><span className="eyebrow">Obsah a produkční zadání</span><b>Zdroj pravdy</b></div><h3>Co má post sdělit</h3><p>{selectedPost.contentSummary ?? "Obsahový brief čeká na doplnění."}</p><h3>Co použít pro produkci</h3><p>{selectedPost.productionNote ?? "Produkční podklad čeká na doplnění."}</p><dl className="post-article-meta"><div><dt>Subject type</dt><dd>{selectedPost.subjectType ?? "general"}</dd></div><div><dt>Asset status</dt><dd>{selectedPost.assetStatus ?? selectedPost.graphic}</dd></div>{selectedPost.promotion ? <div><dt>Podpora postu</dt><dd>{selectedPost.promotion}</dd></div> : null}<div><dt>Web / kanál</dt><dd>{selectedPost.futureWebPath ?? "Čeká"}</dd></div><div><dt>Google Drive</dt><dd><a href={postGoogleDriveUrl} target="_blank" rel="noreferrer">Otevřít konkrétní zdroj fotky/složku ↗</a></dd></div></dl><div className="photo-source-actions"><a href={primaryImageDriveUrl} target="_blank" rel="noreferrer">Otevřít fotku k produkci na Disku ↗</a><a href={PHOTO_DRIVE_ROOT_URL} target="_blank" rel="noreferrer">Všechny fotky ↗</a></div>{selectedPost.draftLink && <small className="asset-source">Pracovní podklad: {selectedPost.draftLink}</small>}</article>
      <div className="post-workflow">{[["Námět", selectedPost.status === "Námět" ? "Rozpracováno" : "Hotovo"], ["Copy", selectedPost.copy], ["Grafika", selectedPost.graphic], ["Schválení", selectedPost.approval], ["Publikace", selectedPost.status]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      {linkedCandidate && <article className="post-readable-card"><div className="profile-panel-head"><span className="eyebrow">SoMe medailonek kandidáta</span><b>#{linkedCandidate.order}</b></div>{linkedCandidate.headline && <blockquote>„{linkedCandidate.headline}“</blockquote>}<p className="social-copy-preview">{linkedCandidate.socialCopy || linkedCandidate.bio}</p><dl className="post-article-meta"><div><dt>Kandidát</dt><dd>{linkedCandidate.name}</dd></div><div><dt>Profil</dt><dd>Campaign HQ / Kandidáti / {linkedCandidate.name}</dd></div><div><dt>Vybraný portrét</dt><dd><a href={linkedCandidate.portraitDriveUrl ?? linkedCandidate.photoDriveUrl ?? photoAuditDriveFolders.candidateSelected} target="_blank" rel="noreferrer">Otevřít správnou fotku ↗</a></dd></div><div><dt>Zdrojová série</dt><dd><a href={linkedCandidate.photoSourceDriveUrl ?? photoAuditDriveFolders.candidateOriginals} target="_blank" rel="noreferrer">Otevřít složku zdrojů ↗</a></dd></div><div><dt>Témata</dt><dd>{linkedCandidate.topics.join(" · ")}</dd></div></dl></article>}
      {linkedProject && <article className="post-readable-card post-project-brief"><div className="profile-panel-head"><span className="eyebrow">Konkrétní projektový podklad</span><b>P-{String(linkedProject.id).padStart(2, "0")}</b></div><h3>{linkedProject.title}</h3><p>{linkedProject.summary}</p><dl className="post-article-meta"><div><dt>Stav</dt><dd>{linkedProject.status}</dd></div><div><dt>Oblast</dt><dd>{linkedProject.area}</dd></div><div><dt>Foto zdroj</dt><dd>{linkedProject.photoLibraryPath || "Čeká"} {linkedProject.photoDriveUrl && <a href={linkedProject.photoDriveUrl} target="_blank" rel="noreferrer">Disk ↗</a>}</dd></div><div><dt>Další krok</dt><dd>{linkedProject.next}</dd></div><div><dt>Důkaz</dt><dd>{linkedProject.evidence}</dd></div></dl></article>}
      {article && <article className="post-readable-card article-readable-card"><div className="profile-panel-head"><span className="eyebrow">Webový článek ke kontrole</span><b>{article.status === "copy-ke-schvaleni" ? "Copy ke schválení" : article.status}</b></div><p className="article-perex">{article.perex}</p>{article.body.map((section) => <section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<div className="post-social-derivative"><span className="eyebrow">Text pro sociální sítě</span><p>{article.socialCopy}</p><strong>Carousel</strong><ol>{article.carousel.map((slide) => <li key={slide}>{slide}</li>)}</ol><small>CTA: {article.cta}</small></div><dl className="post-article-meta"><div><dt>Markdown</dt><dd><a href={articleMarkdownUrl(article)} target="_blank" rel="noreferrer">Otevřít Markdown ↗</a></dd></div><div><dt>Web</dt><dd><a href={articlePublicPath(article)} target="_blank" rel="noreferrer">Otevřít článek ↗</a></dd></div><div><dt>Web ID</dt><dd>{selectedPost.websiteItemId}</dd></div><div><dt>Projekty</dt><dd>{article.projectIds.join(", ")}</dd></div><div><dt>Primární foto</dt><dd><a href={articlePrimaryDriveUrl ?? postGoogleDriveUrl} target="_blank" rel="noreferrer">Zdroj fotky na Disku ↗</a></dd></div></dl>{articleGalleryDriveUrls.length ? <div className="photo-source-actions">{articleGalleryDriveUrls.map(({ image, driveUrl }) => <a key={image} href={driveUrl} target="_blank" rel="noreferrer">{image.split("/").pop()} ↗</a>)}</div> : null}</article>}
      {program && <article className="post-readable-card article-readable-card program-readable-card"><div className="profile-panel-head"><span className="eyebrow">Programový obsahový brief</span><b>Copy ke schválení</b></div><h3>{program.title}</h3><p className="article-perex">{program.perex}</p><p>{program.mainMessage}</p><div className="program-area-list">{program.areas.map((area) => <section key={area.title}><h3>{area.title}</h3><dl><div><dt>Co řešíme</dt><dd>{area.whatWeSolve}</dd></div><div><dt>Proč je to důležité</dt><dd>{area.whyItMatters}</dd></div><div><dt>Co bude další krok</dt><dd>{area.nextStep}</dd></div></dl></section>)}</div><div className="post-social-derivative"><span className="eyebrow">Úvodní text pro sociální sítě</span><p>{program.socialCopy}</p><strong>Carousel „Jak číst náš program“</strong><ol>{program.carousel.map((slide) => <li key={slide}>{slide}</li>)}</ol><small>CTA: {program.cta} · budoucí web: {program.futureWebPath}</small></div><dl className="post-article-meta"><div><dt>Markdown</dt><dd>{program.markdownPath}</dd></div><div><dt>Web ID</dt><dd>{selectedPost.websiteItemId}</dd></div><div><dt>Kontrola</dt><dd>{program.checks.join(" · ")}</dd></div></dl></article>}
      {galleryImages.length > 0 && <div className="post-gallery-assets"><span className="eyebrow">Přiřazené fotografie</span><div>{galleryImages.map((image) => <figure key={image}><Image src={image} alt={`Doplňková fotografie pro ${selectedPost.title}`} fill sizes="120px" unoptimized /><figcaption>{image.split("/").pop()}<a href={getProjectPhotoDriveUrlForImage(image) ?? getPhotoAuditFolderForAsset(image)} target="_blank" rel="noreferrer">Disk ↗</a></figcaption></figure>)}</div></div>}
      <div className="detail-section"><span className="eyebrow">Autor / owner</span><p>{selectedPost.author}</p></div>
      <button className="primary-button full-button" onClick={openRelatedSection}>Otevřít související sekci</button>
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
          <div className="brand-mark"><Image src={theme === "dark" ? "/images/brand/prezletaci-symbol-white.png" : "/images/brand/prezletaci-symbol-blue.png"} alt="Symbol Přezleťáků s podanou rukou" width={38} height={38} priority unoptimized /></div>
          <div><strong>Přezleťáci</strong><span>Campaign HQ · 2026</span></div>
          <button className="mobile-close" aria-label="Zavřít navigaci" onClick={() => setMobileNav(false)}>×</button>
        </div>
        <nav aria-label="Hlavní navigace">
          <span className="nav-label">Pracovní prostor</span>
          {navItems.slice(0, 8).map((item) => <div className="nav-group" key={item.id}><button className={activeSection === item.id ? "active" : ""} onClick={() => navigate(item.id)} aria-current={activeSection === item.id ? "page" : undefined}><i>{item.icon}</i><span>{item.label}</span>{item.id === "checklist" && <b>{openTasks}</b>}{item.id === "candidates" && <b>{candidates.length}/11</b>}</button>{item.id === "candidates" && activeSection === "candidates" && <div className="candidate-subnav">{(["overview", "matrix", "dashboard"] as CandidateView[]).map((view) => <button key={view} className={candidateView === view ? "active" : ""} onClick={() => { setCandidateView(view); setMobileNav(false); }}>{view === "overview" ? "Přehled" : view === "matrix" ? "Matrice" : "Dashboard"}</button>)}</div>}{item.id === "web" && activeSection === "web" && <div className="candidate-subnav">{(["brief", "articles", "inventory", "relationships"] as WebView[]).map((view) => <button key={view} className={webView === view ? "active" : ""} onClick={() => { setWebView(view); setMobileNav(false); }}>{view === "brief" ? "Web Brief" : view === "articles" ? "Články" : view === "inventory" ? "Sitemap & Inventory" : "Relationship Engine"}</button>)}</div>}</div>)}
          <span className="nav-label utility-label">Systém</span>
          {navItems.slice(8).map((item) => <button key={item.id} className={activeSection === item.id ? "active" : ""} onClick={() => navigate(item.id)} aria-current={activeSection === item.id ? "page" : undefined}><i>{item.icon}</i><span>{item.label}</span></button>)}
        </nav>
        <div className="sidebar-status"><div><span className="live-dot" /><strong>Kampaň se připravuje</strong></div><p>Další milník: schválení identity</p><div className="mini-progress"><i style={{ width: `${campaignReadinessScore}%` }} /></div></div>
        <div className="sidebar-user"><span>PT</span><div><strong>Produkční tým</strong><small>Lokální pracovní režim</small></div><i>•••</i></div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb"><button className="menu-button" aria-label="Otevřít navigaci" onClick={() => setMobileNav(true)}>☰</button><span>Campaign HQ</span><b>/</b><strong>{activeLabel}</strong></div>
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

      {selectedProject && <div className="modal-backdrop" onMouseDown={() => setSelectedProject(null)}><section className="detail-modal project-detail" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)}>×</button><div className="project-detail-head"><div><span className={`status-pill project-${slugify(selectedProject.status)}`}>{selectedProject.status}</span><h2>{selectedProject.title}</h2><p>{selectedProject.area} · Garant: {selectedProject.owner}</p></div><div className="detail-project-code">P-{String(selectedProject.id).padStart(2, "0")}</div></div>{selectedProject.image ? <div className="project-detail-image"><Image src={selectedProject.image} alt={selectedProject.imageAlt || `Fotografie projektu ${selectedProject.title}`} fill sizes="(max-width: 760px) 100vw, 720px" unoptimized /></div> : <div className="project-image-placeholder project-detail-placeholder"><span>{selectedProject.area.slice(0, 1)}</span><small>Fotografie k doplnění</small></div>}<div className="photo-source-actions"><a href={selectedProject.photoDriveUrl ?? photoAuditDriveFolders.workingSort} target="_blank" rel="noreferrer">Otevřít fotky projektu na Disku ↗</a><small>Lokální stopa: {selectedProject.photoLibraryPath || selectedProject.photoSource || "fotografie zatím není přiřazená"}</small></div><div className="detail-section"><span className="eyebrow">Komunikační noha</span><p>{selectedProject.summary}</p></div><div className="project-detail-grid"><article><span className="eyebrow">Historie</span><p>{selectedProject.history}</p></article><article><span className="eyebrow danger">Možný útok</span><p>{selectedProject.risk}</p></article><article><span className="eyebrow">Argumentace</span><p>{selectedProject.argument}</p></article><article><span className="eyebrow">Důkazy</span><p>{selectedProject.evidence}</p></article></div><RelationshipPanel entityId={`project:${selectedProject.id}`} entities={knowledgeEntities} onOpen={openKnowledgeEntity} /><div className="next-step"><span>Další krok</span><strong>{selectedProject.next}</strong></div></section></div>}

      {renderPostDetail()}

      {selectedTask && <div className="modal-backdrop" onMouseDown={() => setSelectedTask(null)}><section className="detail-modal task-detail" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedTask(null)}>×</button><div className="task-tags"><span className={`priority-tag priority-${slugify(selectedTask.priority)}`}>{selectedTask.priority}</span><span className="status-pill neutral">{selectedTask.status}</span></div><h2>{selectedTask.title}</h2><p>{selectedTask.note}</p><dl><div><dt>Owner</dt><dd>{selectedTask.owner}</dd></div><div><dt>Deadline</dt><dd>{selectedTask.deadline}</dd></div><div><dt>Dokument</dt><dd>{selectedTask.document || "Bez přílohy"}</dd></div></dl>{selectedTask.status !== "Done" && <button className="primary-button full-button" onClick={() => advanceTask(selectedTask)}>Posunout úkol dál →</button>}</section></div>}

      {selectedDocument && <div className="modal-backdrop" onMouseDown={() => setSelectedDocument(null)}><section className="detail-modal document-detail" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedDocument(null)}>×</button><div className={`file-icon file-${selectedDocument.type.toLowerCase()}`}>{selectedDocument.type.slice(0, 3)}</div><span className="eyebrow">{selectedDocument.category}</span><h2>{selectedDocument.title}</h2><p>{selectedDocument.description}</p><dl><div><dt>Stav</dt><dd>{selectedDocument.status}</dd></div><div><dt>Aktualizace</dt><dd>{selectedDocument.updated}</dd></div><div><dt>Typ</dt><dd>{selectedDocument.type}</dd></div>{selectedDocument.localPath && <div><dt>Lokální cesta</dt><dd>{selectedDocument.localPath}</dd></div>}{selectedDocument.driveUrl && <div><dt>Google Disk</dt><dd><a href={selectedDocument.driveUrl} target="_blank" rel="noreferrer">Otevřít externí složku ↗</a></dd></div>}</dl><div className="local-note">Repository eviduje metadata a produkční odkazy. Fotografie jsou dostupné externě přes Google Disk.</div></section></div>}

      {selectedArticle && <div className="modal-backdrop" onMouseDown={() => setSelectedArticle(null)}><section className="detail-modal article-library-modal article-readable-card" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedArticle(null)}>×</button><div className="post-detail-badges"><span className={`status-pill ${slugify(selectedArticle.pillar)}`}>{selectedArticle.pillar}</span><span className="status-pill neutral">{selectedArticle.status === "copy-ke-schvaleni" ? "Copy ke schválení" : selectedArticle.status}</span></div><h2>{selectedArticle.title}</h2><p className="article-perex">{selectedArticle.perex}</p><div className="article-modal-actions"><button className="primary-button" onClick={() => shareArticle(selectedArticle)}>Sdílet</button><a className="secondary-button" href={articlePublicPath(selectedArticle)} target="_blank" rel="noreferrer">Otevřít na webu</a><a className="secondary-button" href={articleMarkdownUrl(selectedArticle)} target="_blank" rel="noreferrer">Otevřít Markdown</a><button className="secondary-button" onClick={() => copyToClipboard(articleFullText(selectedArticle), "Celý článek")}>Kopírovat celý článek</button><button className="secondary-button" onClick={() => copyToClipboard(selectedArticle.socialCopy, "SoMe text článku")}>Kopírovat SoMe text</button></div><div className="article-modal-media"><Image src={selectedArticle.primaryImage} alt={`Primární fotografie článku ${selectedArticle.title}`} fill sizes="(max-width: 760px) 100vw, 760px" unoptimized /></div><dl className="post-article-meta"><div><dt>Markdown</dt><dd><a href={articleMarkdownUrl(selectedArticle)} target="_blank" rel="noreferrer">{articleMarkdownUrl(selectedArticle)} ↗</a></dd></div><div><dt>Web</dt><dd><a href={articlePublicPath(selectedArticle)} target="_blank" rel="noreferrer">{articlePublicPath(selectedArticle)} ↗</a></dd></div><div><dt>Primární foto</dt><dd><a href={getProjectPhotoDriveUrlForImage(selectedArticle.primaryImage) ?? getPhotoAuditFolderForAsset(selectedArticle.primaryImage)} target="_blank" rel="noreferrer">Zdroj fotky na Disku ↗</a></dd></div><div><dt>Projekty</dt><dd>{selectedArticle.projectIds.join(", ") || "Čeká"}</dd></div><div><dt>Posty</dt><dd>{selectedArticle.socialPostIds.join(", ") || "Čeká"}</dd></div><div><dt>Kontroly</dt><dd>{selectedArticle.checks.join(" · ")}</dd></div></dl>{selectedArticle.body.map((section) => <section key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<div className="post-social-derivative"><span className="eyebrow">Text pro sociální sítě</span><p>{selectedArticle.socialCopy}</p><strong>Carousel</strong><ol>{selectedArticle.carousel.map((slide) => <li key={slide}>{slide}</li>)}</ol><small>CTA: {selectedArticle.cta}</small></div>{selectedArticle.galleryImages.length ? <div className="photo-source-actions">{selectedArticle.galleryImages.map((image) => <a key={image} href={getProjectPhotoDriveUrlForImage(image) ?? getPhotoAuditFolderForAsset(image)} target="_blank" rel="noreferrer">{image.split("/").pop()} ↗</a>)}</div> : null}{selectedArticle.sourceLinks.length ? <div className="article-source-list">{selectedArticle.sourceLinks.map((link) => { const href = publicArticleSourceHref(link); return href ? <a key={link} href={href} target="_blank" rel="noreferrer">Zdroj: {link} ↗</a> : <span key={link}>Interní podklad: {link}</span>; })}</div> : null}</section></div>}

      {selectedMarkdown && <div className="modal-backdrop" onMouseDown={() => setSelectedMarkdown(null)}><section className="detail-modal markdown-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedMarkdown(null)}>×</button><span className="eyebrow">Markdown náhled</span><h2>{selectedMarkdown.name}</h2><div className="markdown-modal-actions"><button className="secondary-button" onClick={() => copyMarkdown(selectedMarkdown)}>Kopírovat obsah</button><button className="primary-button" onClick={() => downloadMarkdown(selectedMarkdown)}>Stáhnout .md</button></div><pre>{selectedMarkdown.content}</pre></section></div>}

      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </div>
  );
}
