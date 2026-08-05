export type SprintPriority = "Kritická" | "Vysoká" | "Střední";

export const sprintUpdatedAt = "5. 8. 2026";

export const weeklyFocus = [
  { title: "Schválení vizuální identity", severity: "high", owner: "Klient" },
  { title: "Dokončení prvních šesti medailonků", severity: "high", owner: "Copy" },
  { title: "Převzetí rozpracovaných článků od klienta", severity: "high", owner: "Klient" },
  { title: "Přístupy ke správě domény", severity: "critical", owner: "Klient" },
  { title: "Připojení Facebook stránky", severity: "high", owner: "Klient" },
] as const;

export const completedProjectStatus = [
  "Komunikační strategie",
  "Campaign Bible",
  "Publikační plán",
  "Campaign HQ",
  "Web Brief",
  "HTML mockup webu",
  "Struktura webu",
  "Instagram profil",
  "Instagram propojený do Meta Business Manageru",
] as const;

export const activeProjectStatus = [
  {
    title: "Brand identita",
    status: "Čeká na připomínky klienta.",
    detail: "Po schválení vzniknou finální grafické šablony a exporty pro web i sociální sítě.",
  },
  {
    title: "Facebook",
    status: "Čekáme na propojení Facebook stránky do Meta Business Manageru.",
    detail: "Po připojení bude možné dokončit distribuční a publikační nastavení.",
  },
  {
    title: "Web",
    status: "Vývoj probíhá. Obsahová struktura je připravena.",
    detail: "Dokončení vizuální vrstvy čeká na finální identitu.",
  },
  {
    title: "Obsah",
    status: "Připravujeme první sérii příspěvků.",
    detail: "První dva týdny budou postavené na kandidátských medailoncích.",
  },
] as const;

export const productionStrategy = {
  title: "Nejdřív kandidáti, potom obsahové huby",
  opening: "První dva týdny kampaně budou postavené na kandidátských medailoncích, protože web ještě nebude obsahovat všechny články a není vhodné odkazovat na neexistující obsah.",
  transition: "Po spuštění webu se komunikace přesune k projektovým článkům, vysvětlujícím tématům, FAQ, dokumentům a dlouhým příběhům.",
  firstPhase: ["Kandidátské medailonky", "Fotografie kandidátů", "První grafické šablony"],
  secondPhase: ["Projektové články", "Vysvětlující témata", "FAQ", "Dokumenty", "Dlouhé příběhy"],
} as const;

export const candidateProductionChecklist = [
  "Medailonek dodán",
  "Redakční úprava",
  "Schválen klientem",
  "Fotografie vybrány",
  "Grafika připravena",
  "Naplánováno",
  "Publikováno",
] as const;

export const firstCandidateWave = [11, 10, 9, 8, 7, 6] as const;

export const clientInputs = [
  { id: "domain-access", title: "Přístupy ke správě domény", priority: "Kritická", owner: "Klient", updatedAt: sprintUpdatedAt },
  { id: "candidate-copy-status", title: "Stav jednotlivých medailonků", priority: "Vysoká", owner: "Klient", updatedAt: sprintUpdatedAt },
  { id: "draft-articles", title: "Rozpracované články", priority: "Vysoká", owner: "Klient", updatedAt: sprintUpdatedAt },
  { id: "brand-feedback", title: "Připomínky k vizuální identitě", priority: "Kritická", owner: "Klient", updatedAt: sprintUpdatedAt },
  { id: "facebook-page", title: "Facebook stránka", priority: "Vysoká", owner: "Klient", updatedAt: sprintUpdatedAt },
] satisfies { id: string; title: string; priority: SprintPriority; owner: string; updatedAt: string }[];

export const sprintRoadmap = [
  { date: "Krok 1", title: "Schválení identity", category: "Klient", note: "Uzavřít připomínky a potvrdit finální vizuální směr." },
  { date: "Krok 2", title: "Dokončení medailonků", category: "Produkce", note: "Připravit finální texty první šestice kandidátů; pracovní zpracování postupuje od konce kandidátky." },
  { date: "Krok 3", title: "První grafické šablony", category: "Produkce", note: "Po schválení identity připravit finální šablony pro web a sociální sítě." },
  { date: "Krok 4", title: "Publikace kandidátů", category: "Marketing", note: "Pořadí publikace určí klient; první dva týdny stojí na medailoncích." },
  { date: "Krok 5", title: "Spuštění webu", category: "Web", note: "Zpřístupnit připravenou obsahovou strukturu ve finální vizuální identitě." },
  { date: "Krok 6", title: "Projektové články", category: "Web", note: "Po spuštění webu navázat ověřenými projektovými příběhy a dokumenty." },
  { date: "Krok 7", title: "Vysvětlující obsah", category: "Marketing", note: "Rozvinout FAQ, citlivá témata, dokumenty a dlouhé příběhy." },
] as const;

export const campaignReadiness = [
  { label: "Strategie", value: 100 },
  { label: "Campaign HQ", value: 100 },
  { label: "Publikační plán", value: 100 },
  { label: "Web Brief", value: 100 },
  { label: "Mockup webu", value: 100 },
  { label: "Brand", value: 80 },
  { label: "Web", value: 70 },
  { label: "Medailonky", value: 30 },
  { label: "První příspěvky", value: 20 },
  { label: "Facebook", value: 10 },
] as const;

export const campaignReadinessScore = Math.round(
  campaignReadiness.reduce((sum, item) => sum + item.value, 0) / campaignReadiness.length,
);

export const sprintRisks = [
  { title: "Neschválená identita", description: "Bez připomínek klienta nelze uzavřít finální vizuální systém.", impact: "Blokuje grafické šablony a finální podobu webu.", priority: "Kritická", solution: "Uzavřít připomínky a potvrdit identitu v jednom schvalovacím kole." },
  { title: "Chybějící medailonky", description: "Texty kandidátů nejsou připravené pro první produkční vlnu.", impact: "Ohrožuje start komunikace postavený na lidech.", priority: "Kritická", solution: "Dokončit první šestici a průběžně ji předávat ke schválení." },
  { title: "Nedokončené články", description: "Rozpracované texty zatím nejsou převzaté od klienta.", impact: "Zpomaluje obsahovou náplň webu po jeho spuštění.", priority: "Vysoká", solution: "Převzít zdroje, určit vlastníky a rozdělit články do produkce." },
  { title: "Nepřipojený Facebook", description: "Facebook stránka není propojená s Meta Business Managerem.", impact: "Blokuje kompletní správu a plánování distribuce.", priority: "Vysoká", solution: "Dokončit propojení a ověřit oprávnění publikačního týmu." },
  { title: "Chybějící přístupy k doméně", description: "Tým nemá přístupy potřebné pro správu domény.", impact: "Může zablokovat spuštění webu na cílové adrese.", priority: "Vysoká", solution: "Předat přístupy a ověřit DNS správu před termínem publikace." },
] satisfies { title: string; description: string; impact: string; priority: SprintPriority; solution: string }[];

export const sprintTasks = [
  { id: 301, title: "Komunikační strategie", status: "Done", priority: "Vysoká", owner: "PM", deadline: "Hotovo", note: "Strategický rámec je schválený a zanesený v Campaign HQ." },
  { id: 302, title: "Campaign Bible", status: "Done", priority: "Vysoká", owner: "PM", deadline: "Hotovo", note: "Živý strategický dokument je připravený." },
  { id: 303, title: "Publikační plán", status: "Done", priority: "Vysoká", owner: "Obsahový tým", deadline: "Hotovo", note: "Kompletní plán 39 výstupů je importovaný." },
  { id: 304, title: "Campaign HQ", status: "Done", priority: "Vysoká", owner: "Produkce", deadline: "Hotovo", note: "Operační centrum kampaně je v provozu." },
  { id: 305, title: "Web Brief a struktura webu", status: "Done", priority: "Vysoká", owner: "Web", deadline: "Hotovo", note: "Brief, struktura a HTML mockup jsou připravené." },
  { id: 306, title: "Instagram a Meta Business Manager", status: "Done", priority: "Střední", owner: "Social", deadline: "Hotovo", note: "Instagram profil je založený a propojený." },
  { id: 307, title: "Schválit vizuální identitu", status: "Waiting", priority: "Kritická", owner: "Klient", deadline: "Co nejdříve", note: "Čeká na připomínky klienta; blokuje finální šablony a vizuál webu." },
  { id: 308, title: "Dokončit prvních šest medailonků", status: "Doing", priority: "Kritická", owner: "Copy", deadline: "Aktuální sprint", note: "Pracovní zpracování postupuje od konce kandidátky; pořadí publikace určí klient." },
  { id: 309, title: "Převzít rozpracované články", status: "Waiting", priority: "Vysoká", owner: "Klient", deadline: "Aktuální sprint", note: "Převzít zdroje a rozdělit články mezi vlastníky." },
  { id: 310, title: "Předat přístupy ke správě domény", status: "Waiting", priority: "Kritická", owner: "Klient", deadline: "Před spuštěním webu", note: "Přístupy jsou nutné pro nasazení na cílovou doménu." },
  { id: 311, title: "Připojit Facebook stránku", status: "Waiting", priority: "Vysoká", owner: "Klient", deadline: "Aktuální sprint", note: "Facebook čeká na propojení do Meta Business Manageru." },
  { id: 312, title: "Pokračovat ve vývoji webu", status: "Doing", priority: "Vysoká", owner: "Web", deadline: "Po schválení identity", note: "Obsahová struktura je připravena; finální vizuál čeká na brand." },
  { id: 313, title: "Připravit první sérii příspěvků", status: "Doing", priority: "Vysoká", owner: "Obsahový tým", deadline: "Aktuální sprint", note: "První dva týdny komunikace stojí na kandidátských medailoncích." },
] as const;

export function mergeSprintTasks<T extends { id: number; status: string }>(savedTasks: T[], baselineTasks: T[], fromVersion?: number) {
  const baselineIds = new Set(baselineTasks.map((task) => task.id));
  const savedById = new Map(savedTasks.map((task) => [task.id, task]));
  const migratedBaseline = baselineTasks.map((task) => {
    const saved = savedById.get(task.id);
    return saved ? { ...task, status: saved.status } : task;
  });
  const customTasks = savedTasks.filter((task) => !baselineIds.has(task.id) && !(fromVersion && fromVersion < 6 && task.id >= 1 && task.id <= 11));
  return [...migratedBaseline, ...customTasks];
}
