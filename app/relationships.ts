export type KnowledgeEntityType =
  | "candidate"
  | "project"
  | "topic"
  | "article"
  | "document"
  | "video"
  | "faq"
  | "gallery";

export type KnowledgeEntityStatus = "Publikováno" | "Připraveno" | "Rozpracováno" | "Námět" | "Čeká na podklady";

export type KnowledgeEntity = {
  id: string;
  type: KnowledgeEntityType;
  title: string;
  summary: string;
  status: KnowledgeEntityStatus;
  sourceId?: number;
};

export type RelationshipType =
  | "belongs_to"
  | "focuses_on"
  | "contributes_to"
  | "explains"
  | "documents"
  | "answers"
  | "shows"
  | "features";

export type KnowledgeRelationship = {
  id: string;
  from: string;
  to: string;
  type: RelationshipType;
  label: string;
  role?: string;
  description?: string;
};

export const knowledgeEntityMeta: Record<KnowledgeEntityType, { label: string; icon: string; publicLabel: string }> = {
  candidate: { label: "Kandidáti", icon: "👥", publicLabel: "Lidé" },
  project: { label: "Projekty", icon: "📁", publicLabel: "Projekty" },
  topic: { label: "Témata", icon: "◉", publicLabel: "Témata" },
  article: { label: "Články", icon: "📰", publicLabel: "Články" },
  document: { label: "Dokumenty", icon: "📄", publicLabel: "Dokumenty" },
  video: { label: "Videa", icon: "🎥", publicLabel: "Videa" },
  faq: { label: "FAQ", icon: "❓", publicLabel: "FAQ" },
  gallery: { label: "Galerie", icon: "📷", publicLabel: "Galerie" },
};

export const relationshipTypeLabels: Record<RelationshipType, string> = {
  belongs_to: "Patří k tématu",
  focuses_on: "Věnuje se oblasti",
  contributes_to: "Související článek",
  explains: "Vysvětluje",
  documents: "Dokládá",
  answers: "Odpovídá na",
  shows: "Zobrazuje",
  features: "Představuje",
};

export const contentKnowledgeEntities: KnowledgeEntity[] = [
  { id: "topic:school", type: "topic", title: "Škola", summary: "Kapacita, sportoviště, jídelna a dlouhodobý rozvoj školského zázemí.", status: "Rozpracováno" },
  { id: "topic:transport", type: "topic", title: "Doprava", summary: "Silniční stavby, kolejové spojení a dopady nadřazené infrastruktury.", status: "Rozpracováno" },
  { id: "topic:public-space", type: "topic", title: "Veřejný prostor", summary: "Parky, zeleň, sportovní a komunitní místa.", status: "Rozpracováno" },
  { id: "topic:sport", type: "topic", title: "Sport", summary: "Sportoviště, hřiště a podmínky pro volnočasové aktivity.", status: "Námět" },
  { id: "topic:safety", type: "topic", title: "Bezpečnost", summary: "Bezpečný pohyb v obci, prevence a připravenost.", status: "Námět" },
  { id: "topic:development", type: "topic", title: "Development", summary: "Dopady nové výstavby, infrastruktura a závazky developerů.", status: "Námět" },
  { id: "topic:planning", type: "topic", title: "Územní plán", summary: "Pravidla rozvoje obce a dlouhodobé uspořádání území.", status: "Námět" },
  { id: "article:long-park-progress", type: "article", title: "Dlouhý park: kde právě jsme", summary: "Aktuální stav projektu, povolení, dotace a další krok.", status: "Rozpracováno" },
  { id: "article:school-capacity", type: "article", title: "Kapacita školy a navazující řešení", summary: "Srozumitelné vysvětlení akutní kapacity a dlouhodobého pokračování.", status: "Námět" },
  { id: "article:sokp-role", type: "article", title: "SOKP 520: co může ovlivnit obec", summary: "Chronologie jednání, kompetence obce a další rozhodovací kroky.", status: "Námět" },
  { id: "document:long-park-permit", type: "document", title: "Stavební povolení – Dlouhý park", summary: "Dokládá, že projekt prošel povolovací fází.", status: "Čeká na podklady" },
  { id: "document:rail-study", type: "document", title: "Studie proveditelnosti Praha–Brandýs", summary: "Dokládá prověřování kolejového spojení a zastávky v Přezleticích.", status: "Čeká na podklady" },
  { id: "document:sokolovna-study", type: "document", title: "Studie rekonstrukce Sokolovny", summary: "Výchozí podklad pro rozsah, etapy a varianty financování.", status: "Čeká na podklady" },
  { id: "video:school-explainer", type: "video", title: "Vysvětlujeme: škola", summary: "Krátké video navázané na úplný tematický kontext.", status: "Námět" },
  { id: "video:long-park-interview", type: "video", title: "Rozhovor: Dlouhý park", summary: "Rozhovor o přípravě projektu a následujícím kroku.", status: "Námět" },
  { id: "faq:long-park-delay", type: "faq", title: "Proč příprava Dlouhého parku trvá?", summary: "Odpověď opřená o časovou osu povolení, dotace a soutěže.", status: "Námět" },
  { id: "faq:school-next", type: "faq", title: "Co bude následovat po dočasném rozšíření školy?", summary: "Vztah akutního řešení a připravované druhé budovy.", status: "Námět" },
  { id: "faq:sokp-control", type: "faq", title: "Co obec může a nemůže ovlivnit u SOKP 520?", summary: "Přehled kompetencí a konkrétních vyjednávaných podmínek.", status: "Námět" },
  { id: "gallery:long-park", type: "gallery", title: "Dlouhý park – průběh a vizualizace", summary: "Vizuální časová osa od studie po současný stav.", status: "Čeká na podklady" },
  { id: "gallery:public-space", type: "gallery", title: "Veřejný prostor – hotová práce", summary: "Fotografie výsledků a návazných plánů ve veřejném prostoru.", status: "Čeká na podklady" },
];

export const knowledgeRelationships: KnowledgeRelationship[] = [
  { id: "rel:c2-t-school", from: "candidate:2", to: "topic:school", type: "focuses_on", label: "Oblasti, kterým se věnuje", description: "Vazba vychází z doloženého kandidátského tématu Školství." },
  { id: "rel:c2-a-school", from: "candidate:2", to: "article:school-capacity", type: "contributes_to", label: "Související články", description: "Článek navazuje na doloženou roli ve svazku obcí pro školu." },
  { id: "rel:p4-a-progress", from: "project:4", to: "article:long-park-progress", type: "explains", label: "Čtěte také" },
  { id: "rel:p4-d-permit", from: "project:4", to: "document:long-park-permit", type: "documents", label: "Dokumenty a důkazy" },
  { id: "rel:p4-f-delay", from: "project:4", to: "faq:long-park-delay", type: "answers", label: "Časté otázky" },
  { id: "rel:p4-g-long", from: "project:4", to: "gallery:long-park", type: "shows", label: "Galerie" },
  { id: "rel:p4-v-interview", from: "project:4", to: "video:long-park-interview", type: "features", label: "Video" },
  { id: "rel:p7-a-school", from: "project:7", to: "article:school-capacity", type: "explains", label: "Čtěte také" },
  { id: "rel:p7-f-school", from: "project:7", to: "faq:school-next", type: "answers", label: "Časté otázky" },
  { id: "rel:p7-v-school", from: "project:7", to: "video:school-explainer", type: "features", label: "Video" },
  { id: "rel:p11-a-sokp", from: "project:11", to: "article:sokp-role", type: "explains", label: "Čtěte také" },
  { id: "rel:p11-f-sokp", from: "project:11", to: "faq:sokp-control", type: "answers", label: "Časté otázky" },
  { id: "rel:p12-d-study", from: "project:12", to: "document:rail-study", type: "documents", label: "Dokumenty a důkazy" },
  { id: "rel:p16-d-study", from: "project:16", to: "document:sokolovna-study", type: "documents", label: "Dokumenty a důkazy" },
  { id: "rel:a-long-t-public", from: "article:long-park-progress", to: "topic:public-space", type: "belongs_to", label: "Veřejný prostor" },
  { id: "rel:a-school-t-school", from: "article:school-capacity", to: "topic:school", type: "belongs_to", label: "Škola" },
  { id: "rel:a-sokp-t-transport", from: "article:sokp-role", to: "topic:transport", type: "belongs_to", label: "Doprava" },
  { id: "rel:g-public-t-public", from: "gallery:public-space", to: "topic:public-space", type: "shows", label: "Galerie" },
];

export function getRelatedEntityIds(entityId: string, relationships = knowledgeRelationships) {
  return relationships
    .filter((relationship) => relationship.from === entityId || relationship.to === entityId)
    .map((relationship) => relationship.from === entityId ? relationship.to : relationship.from);
}

export function getEntityRelationships(entityId: string, relationships = knowledgeRelationships) {
  return relationships.filter((relationship) => relationship.from === entityId || relationship.to === entityId);
}

export function groupRelatedEntities(entityId: string, entities: KnowledgeEntity[], relationships = knowledgeRelationships) {
  const entityMap = new Map(entities.map((entity) => [entity.id, entity]));
  return getRelatedEntityIds(entityId, relationships).reduce<Partial<Record<KnowledgeEntityType, KnowledgeEntity[]>>>((groups, relatedId) => {
    const entity = entityMap.get(relatedId);
    if (!entity) return groups;
    groups[entity.type] = [...(groups[entity.type] ?? []), entity];
    return groups;
  }, {});
}

export function findOrphanEntities(entities: KnowledgeEntity[], relationships = knowledgeRelationships) {
  const relatedIds = new Set(relationships.flatMap((relationship) => [relationship.from, relationship.to]));
  return entities.filter((entity) => !relatedIds.has(entity.id));
}
