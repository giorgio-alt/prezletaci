import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { initialPosts, legacyInitialPosts, mergePostsWithPlan } from "../app/postplan.ts";
import { PROGRAM_MARKDOWN, programContent } from "../app/program-content.ts";
import { ORIGINAL_PHOTOS_ZIP_DRIVE_URL, PHOTO_AUDIT_DRIVE_URL, PHOTO_DRIVE_ROOT_URL, photoAuditDriveFolders } from "../app/photo-drive.ts";
import {
  AI_CONTEXT_MARKDOWN,
  WEB_BRIEF_MARKDOWN,
  baseWebsiteContentItems,
  campaignCandidateNames,
  webBlockers,
  webBriefSections,
} from "../app/web-content.ts";
import {
  contentKnowledgeEntities,
  findOrphanEntities,
  getRelatedEntityIds,
  knowledgeEntityMeta,
  knowledgeRelationships,
} from "../app/relationships.ts";
import {
  mergeProjectCatalog,
  projectImageManifest,
  selectFirstSupportedImage,
} from "../app/project-images.ts";
import {
  activeProjectStatus,
  campaignReadiness,
  candidateProductionChecklist,
  clientInputs,
  completedProjectStatus,
  firstCandidateWave,
  mergeSprintTasks,
  sprintRisks,
  sprintRoadmap,
  sprintTasks,
  weeklyFocus,
} from "../app/sprint-status.ts";

const root = new URL("../", import.meta.url);
const candidateDir = new URL("../public/images/candidates/", import.meta.url);
const teamDir = new URL("../public/images/team/", import.meta.url);
const projectDir = new URL("../public/images/projects/", import.meta.url);
const socialDir = new URL("../public/images/social/", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Přezleťáci Campaign HQ", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Přezleťáci 2026 — Campaign HQ<\/title>/);
  assert.match(html, /Jedna obrazovka/);
  assert.match(html, /Kandidáti<\/span><b>11/);
  assert.match(html, /Fotografie<\/span><strong>11/);
  assert.match(html, /Příspěvky<\/span><strong>43/);
});

test("ships exactly eleven mapped candidate portraits and four team assets", async () => {
  const [page, candidateFiles, teamFiles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readdir(candidateDir),
    readdir(teamDir),
  ]);

  const expectedCandidates = [
    "bretislav-lukes.webp",
    "jakub-triska.webp",
    "jan-kana.webp",
    "jan-macourek.webp",
    "lenka-brozova.webp",
    "lenka-bulova.webp",
    "pavel-rerucha.webp",
    "romana-bernardova.webp",
    "tomas-riha.webp",
    "vaclav-smerda.webp",
    "vojta-broz.webp",
  ];
  const expectedTeam = ["prezletaci-flag.webp", "team-hero.webp", "team-wide-01.webp", "team-wide-02.webp"];

  assert.deepEqual(candidateFiles.sort(), expectedCandidates);
  assert.deepEqual(teamFiles.sort(), expectedTeam);
  for (const file of expectedCandidates) {
    assert.match(page, new RegExp(`/images/candidates/${file.replace(".", "\\.")}`));
    await access(new URL(`../public/images/candidates/${file}`, import.meta.url));
  }
  assert.match(page, /\/images\/team\/team-hero\.webp/);
});

test("does not publish source JPGs or macOS metadata", async () => {
  const walk = async (directory) => {
    const entries = await readdir(directory, { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(new URL(`${entry.name}/`, directory)) : entry.name));
    return nested.flat();
  };
  const publicFiles = await walk(new URL("../public/", import.meta.url));
  assert.equal(publicFiles.some((file) => /\.jpe?g$/i.test(file)), false);
  assert.equal(publicFiles.includes(".DS_Store"), false);
  await access(new URL("../public/og.png", import.meta.url));
  await access(root);
});

test("imports one optimized photograph for every non-empty project folder", async () => {
  const [page, styles, projectFiles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readdir(projectDir),
  ]);
  const slugs = projectImageManifest.map((record) => record.slug);
  const projectIds = projectImageManifest.map((record) => record.projectId);
  const expectedFiles = projectImageManifest.map((record) => record.image.split("/").at(-1)).sort();

  assert.equal(projectImageManifest.length, 26);
  assert.equal(new Set(slugs).size, projectImageManifest.length);
  assert.equal(new Set(projectIds).size, projectImageManifest.length);
  assert.equal(new Set(projectImageManifest.map((record) => record.source)).size, projectImageManifest.length);
  assert.equal(new Set(projectImageManifest.map((record) => record.image)).size, projectImageManifest.length);
  assert.deepEqual(projectFiles.sort(), expectedFiles);
  assert.equal(projectImageManifest.every((record) => record.source.toLowerCase().endsWith(".jpg")), true);
  assert.equal(projectImageManifest.every((record) => record.image.endsWith(".webp")), true);
  assert.equal(selectFirstSupportedImage(["z03.jpg", "z01.jpg", "notes.txt", "z02.png"]), "z01.jpg");
  for (const record of projectImageManifest) {
    await access(new URL(`../public${record.image}`, import.meta.url));
    assert.equal(record.source.split("/").at(-1)?.startsWith(record.source.split("/").at(-2) ?? ""), true);
  }
  assert.match(page, /project\.image \? <div className="project-image">/);
  assert.match(page, /className="project-detail-image"/);
  assert.match(page, /Fotografie k doplnění/);
  assert.match(styles, /\.project-image img \{ object-fit:cover/);
  assert.match(styles, /\.project-detail-image img \{ object-fit:cover/);
  assert.equal(projectImageManifest.find((record) => record.projectId === 1)?.slug, "tri-celky-podzemnich-kontejneru");
  assert.equal(projectImageManifest.find((record) => record.projectId === 3)?.slug, "elektronicka-uredni-deska");
  assert.equal(projectImageManifest.find((record) => record.projectId === 16)?.slug, "rekonstrukce-sokolovny");
});

test("project migration preserves edits and adds catalog media", async () => {
  const saved = [
    { id: 1, title: "Uživatelský název", slug: "", image: "", imageAlt: "" },
    { id: 999, title: "Vlastní projekt", slug: "vlastni-projekt", image: "/custom.webp", imageAlt: "Vlastní fotografie" },
  ];
  const catalog = [
    { id: 1, title: "Výchozí název", slug: "vychozi", image: "/catalog.webp", imageAlt: "Katalogová fotografie" },
    { id: 2, title: "Nová karta", slug: "nova-karta", image: "/new.webp", imageAlt: "Nová fotografie" },
  ];
  const migrated = mergeProjectCatalog(saved, catalog);
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.equal(migrated.length, 3);
  assert.equal(migrated.find((project) => project.id === 1)?.title, "Uživatelský název");
  assert.equal(migrated.find((project) => project.id === 1)?.image, "/catalog.webp");
  assert.equal(migrated.some((project) => project.id === 2), true);
  assert.equal(migrated.some((project) => project.id === 999), true);
  assert.match(page, /const DATA_VERSION = 14;/);
  assert.match(page, /mergeProjectCatalog\(data\.projects, initialProjects\)/);
});

test("exposes external Google Drive photo sources throughout Campaign HQ", async () => {
  const [page, webContent, photoDrive] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/web-content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/photo-drive.ts", import.meta.url), "utf8"),
  ]);

  assert.match(photoDrive, new RegExp(PHOTO_DRIVE_ROOT_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(photoDrive, new RegExp(PHOTO_AUDIT_DRIVE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(photoDrive, new RegExp(ORIGINAL_PHOTOS_ZIP_DRIVE_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(page, /Otevřít fotky k produkci na Disku/);
  assert.match(page, /Otevřít kandidátské fotky na Disku/);
  assert.match(page, /Otevřít fotky projektu na Disku/);
  assert.match(page, /photoLibraryPath: getProjectPhotoLibraryPath/);
  assert.match(webContent, /PHOTO_AUDIT_DRIVE_URL/);
  assert.match(photoDrive, new RegExp(photoAuditDriveFolders.root.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("renders the canonical responsive brand assets instead of the star mark", async () => {
  const [page, logo, symbolBlue, symbolWhite, lockupBlue, lockupWhite, socialYellow, socialBlue] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    access(new URL("../public/images/brand/prezletaci-logo.png", import.meta.url)),
    access(new URL("../public/images/brand/prezletaci-symbol-blue.png", import.meta.url)),
    access(new URL("../public/images/brand/prezletaci-symbol-white.png", import.meta.url)),
    access(new URL("../public/images/brand/prezletaci-lockup-blue.png", import.meta.url)),
    access(new URL("../public/images/brand/prezletaci-lockup-white.png", import.meta.url)),
    access(new URL("../public/images/brand/social/prezletaci-social-yellow.png", import.meta.url)),
    access(new URL("../public/images/brand/social/prezletaci-social-blue.png", import.meta.url)),
  ]);
  assert.equal([logo, symbolBlue, symbolWhite, lockupBlue, lockupWhite, socialYellow, socialBlue].every((result) => result === undefined), true);
  assert.match(page, /\/images\/brand\/prezletaci-symbol-blue\.png/);
  assert.match(page, /\/images\/brand\/prezletaci-symbol-white\.png/);
  assert.match(page, /\/images\/brand\/prezletaci-lockup-blue\.png/);
  assert.match(page, /\/images\/brand\/prezletaci-lockup-white\.png/);
  assert.match(page, /Symbol Přezleťáků s podanou rukou/);
  assert.doesNotMatch(page, /<span>✦<\/span>/);
  assert.match(page, /Campaign HQ · 2026/);
});

test("defines the six centrally themed ContentCard templates", async () => {
  const [page, styles, layout, packageFile] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  const types = ["people", "completed", "progress", "future", "explain", "evidence"];
  for (const type of types) {
    assert.match(page, new RegExp(`\\b${type}: \\{`));
    assert.match(styles, new RegExp(`--pillar-${type}:`));
    assert.match(styles, new RegExp(`\\.content-card-${type} \\{`));
  }
  assert.match(page, /Design System komunikačních pilířů/);
  assert.doesNotMatch(page, /Pracovní paleta|Barvy níže jsou dočasné|Karla Hemzy/);
  assert.match(page, /function ContentCard/);
  assert.match(layout, /@fontsource-variable\/commissioner/);
  assert.equal(JSON.parse(packageFile).dependencies["@fontsource-variable/commissioner"], "^5.3.0");
  for (const token of ["blue", "yellow", "night", "paper", "people", "completed", "progress", "future", "explain", "evidence", "culture", "bg-domov", "bg-rano", "bg-dialog", "bg-people", "bg-environment", "bg-navy", "bg-horizon"]) {
    assert.match(styles, new RegExp(`--prz-${token}:`));
  }
  assert.match(styles, /font-family: "Commissioner Variable"/);
  assert.match(styles, /\.brand-mark img \{ width:38px; height:38px; object-fit:contain/);
});

test("imports the complete chronological publication plan with concrete production metadata", async () => {
  assert.equal(initialPosts.length, 43);
  assert.equal(new Set(initialPosts.map((post) => post.id)).size, initialPosts.length);
  assert.equal(new Set(initialPosts.map((post) => `${post.date}\u0000${post.title}`)).size, initialPosts.length);
  assert.equal(initialPosts.every((post) => /^2026-(08|09|10)-\d{2}$/.test(post.date)), true);
  assert.deepEqual(initialPosts, [...initialPosts].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id));
  assert.deepEqual(
    Object.fromEntries(["08", "09", "10"].map((month) => [month, initialPosts.filter((post) => post.date.slice(5, 7) === month).length])),
    { "08": 14, "09": 20, "10": 9 },
  );
  assert.equal(initialPosts.every((post) => post.title.split(" · ").length === 3), true);
  assert.equal(initialPosts.every((post) => post.contentSummary && post.productionNote), true);
  assert.equal(initialPosts.filter((post) => post.date < "2026-08-17").length, 0);
  assert.equal(initialPosts[0]?.id, 101);
  assert.deepEqual(initialPosts.filter((post) => post.candidateId).map((post) => post.candidateId), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.equal(initialPosts.find((post) => post.id === 137)?.programSlug, programContent.slug);
});

test("includes the program, logo and Instagram posts as concrete ready social packages", async () => {
  await Promise.all([
    access(new URL("program-plan-pro-prezletice-2026-2030.svg", socialDir)),
    access(new URL("logo-predstaveni-prezletaku.svg", socialDir)),
    access(new URL("post-instagram-start.png", socialDir)),
  ]);
  const programPost = initialPosts.find((post) => post.id === 137);
  const instagramPost = initialPosts.find((post) => post.id === 142);
  const logoPost = initialPosts.find((post) => post.id === 143);

  assert.equal(programPost?.date, "2026-08-31");
  assert.equal(programPost?.title, "Plány · Program · Plán pro Přezletice 2026–2030");
  assert.equal(programPost?.subjectType, "program");
  assert.equal(programPost?.primaryImage, "/images/social/program-plan-pro-prezletice-2026-2030.svg");
  assert.equal(programPost?.graphic, "Připraveno");
  assert.match(programPost?.socialCopy ?? "", /Přezletice nepotřebují seznam prázdných slibů/);
  assert.match(programPost?.instagramCopy ?? "", /Plán pro Přezletice 2026–2030 nechceme psát jako seznam slibů/);
  assert.deepEqual(programPost?.carouselOutline?.slice(0, 2), ["Plán pro Přezletice 2026–2030", "Ne seznam slibů. Konkrétní témata a další kroky."]);
  assert.equal(programPost?.hashtags?.includes("#program"), true);
  assert.match(programPost?.altText ?? "", /hlavních programových oblastí/);
  assert.equal(programPost?.futureWebPath, "/program");
  assert.equal(programPost?.cta, "Projděte si, čeho se náš program týká. Jednotlivá témata budeme postupně rozepisovat podrobněji.");
  assert.equal(programPost?.draftLink, "content/social/program-a-logo-posty.md");

  assert.equal(logoPost?.date, "2026-08-18");
  assert.equal(logoPost?.title, "Lidé · Identita · Představujeme logo Přezleťáků");
  assert.equal(logoPost?.subjectType, "brand");
  assert.equal(logoPost?.primaryImage, "/images/social/logo-predstaveni-prezletaku.svg");
  assert.match(logoPost?.facebookCopy ?? "", /Představujeme vizuální identitu Přezleťáků/);
  assert.match(logoPost?.instagramCopy ?? "", /Podaná ruka\. Modrá a žlutá/);
  assert.equal(logoPost?.hashtags?.includes("#identita"), true);
  assert.match(logoPost?.altText ?? "", /symbolem podané ruky/);

  assert.equal(instagramPost?.date, "2026-08-20");
  assert.equal(instagramPost?.title, "Lidé · Instagram · Sledujte Přezleťáky i na Instagramu");
  assert.equal(instagramPost?.subjectType, "channel");
  assert.equal(instagramPost?.primaryImage, "/images/social/post-instagram-start.png");
  assert.equal(instagramPost?.status, "Copy");
  assert.equal(instagramPost?.graphic, "Připraveno");
  assert.equal(instagramPost?.copy, "Hotovo");
  assert.match(instagramPost?.socialCopy ?? "", /nově najdete i na Instagramu/);
  assert.match(instagramPost?.socialCopy ?? "", /https:\/\/www\.instagram\.com\/prezletaci\.2011\//);
  assert.equal(instagramPost?.cta, "Sledujte nás i na Instagramu: @prezletaci.2011");
  assert.deepEqual(instagramPost?.carouselOutline?.slice(0, 2), ["Jsme nově i na Instagramu", "Sledujte nás na @prezletaci.2011"]);
  assert.equal(instagramPost?.futureWebPath, "https://www.instagram.com/prezletaci.2011/");
  assert.match(instagramPost?.contentSummary ?? "", /Přezleťáky lidé nově najdou i na Instagramu/);
  assert.match(instagramPost?.productionNote ?? "", /po startovacím a brand postu/);
});

test("defines the campaign start post as a ready-to-produce first social item", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    access(new URL("post-001-start-kampane.avif", socialDir)),
  ]);
  const startPost = initialPosts.find((post) => post.id === 101);

  assert.equal(startPost?.date, "2026-08-17");
  assert.equal(startPost?.title, "Lidé · Start kampaně · Přezleťáci 2026");
  assert.equal(startPost?.pillar, "Lidé");
  assert.equal(startPost?.format, "Post");
  assert.equal(startPost?.status, "Ke schválení");
  assert.equal(startPost?.copy, "Hotovo");
  assert.equal(startPost?.graphic, "Připraveno");
  assert.equal(startPost?.approval, "Ke schválení");
  assert.equal(startPost?.subjectType, "team");
  assert.equal(startPost?.primaryImage, "/images/social/post-001-start-kampane.avif");
  assert.equal(startPost?.assetStatus, "Grafika připravena: public/images/social/post-001-start-kampane.avif");
  assert.match(startPost?.socialCopy ?? "", /Jsme sousedé se zkušenostmi/);
  assert.match(startPost?.socialCopy ?? "", /jedenáct sousedů, kteří společně tvoří Přezleťáky/);
  assert.equal(startPost?.cta, "Sledujte nás. V příštích dnech představíme tým Přezleťáků 2026.");
  assert.match(startPost?.contentSummary ?? "", /Přezleťáci 2026 navazují na dlouhodobou práci v obci/);
  assert.match(startPost?.productionNote ?? "", /Startovací post otevírá kampaň/);
  assert.deepEqual(
    initialPosts.filter((post) => post.candidateId).slice(0, 4).map((post) => post.title),
    [
      "Lidé · Medailonek · Tomáš Říha",
      "Lidé · Medailonek · Jan Macourek",
      "Lidé · Medailonek · Romana Bernardová",
      "Lidé · Medailonek · Lenka Bulová",
    ],
  );
  assert.match(page, /Hlavní SoMe text/);
  assert.match(page, /Kopírovat/);
  assert.match(page, /Subject type/);
  assert.match(page, /Asset status/);
  assert.match(page, /Kanálové varianty/);
  assert.match(page, /Chybí Google Drive link/);
  assert.match(styles, /\.post-social-copy-card/);
  assert.match(styles, /\.post-channel-brief/);
  assert.match(styles, /\.post-cta/);
});

test("all candidate post links resolve to imported posts", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const ids = new Set(initialPosts.map((post) => post.id));
  const references = [...page.matchAll(/plannedPostIds:\s*\[([^\]]*)\]/g)]
    .flatMap((match) => match[1].split(",").map((value) => value.trim()).filter((value) => /^\d+$/.test(value)).map(Number));
  assert.equal(references.length > 0, true);
  assert.equal(references.every((id) => ids.has(id)), true);
});

test("versioned migration enriches the plan without erasing user changes", () => {
  assert.equal(mergePostsWithPlan(legacyInitialPosts, 3).length, 43);
  const editedLegacy = { ...legacyInitialPosts[1], title: "Uživatelská úprava medailonku" };
  const withEditedLegacy = mergePostsWithPlan([editedLegacy], 3);
  assert.equal(withEditedLegacy.length, 44);
  assert.equal(withEditedLegacy.find((post) => post.id === editedLegacy.id)?.title, editedLegacy.title);
  const editedPlanPost = { ...initialPosts[0], status: "Copy" };
  const customPost = { ...legacyInitialPosts[0], id: 999001, title: "Vlastní uživatelský příspěvek" };
  const migrated = mergePostsWithPlan([editedPlanPost, customPost], 4);
  assert.equal(migrated.length, 44);
  assert.equal(migrated.find((post) => post.id === editedPlanPost.id)?.status, "Copy");
  assert.equal(migrated.some((post) => post.id === customPost.id), true);
  const oldDefault = { ...initialPosts.find((post) => post.id === 102), title: "Medailonek 1", candidateId: undefined, contentSummary: undefined, productionNote: undefined };
  const renamed = mergePostsWithPlan([oldDefault], 8).find((post) => post.id === 102);
  assert.equal(renamed?.title, "Lidé · Medailonek · Tomáš Říha");
  assert.equal(renamed?.candidateId, 1);
  const customTitle = { ...oldDefault, title: "Můj vlastní název" };
  assert.equal(mergePostsWithPlan([customTitle], 8).find((post) => post.id === 102)?.title, customTitle.title);
  const oldProgramDefault = { ...initialPosts.find((post) => post.id === 137), title: "Program", status: "Námět", copy: "Čeká", approval: "Čeká" };
  const migratedProgram = mergePostsWithPlan([oldProgramDefault], 8).find((post) => post.id === 137);
  assert.equal(migratedProgram?.status, "Copy");
  assert.equal(migratedProgram?.copy, "Hotovo");
  assert.equal(migratedProgram?.graphic, "Připraveno");
  assert.equal(migratedProgram?.primaryImage, "/images/social/program-plan-pro-prezletice-2026-2030.svg");
  assert.equal(migratedProgram?.date, "2026-08-31");
  const oldStartDefault = {
    ...initialPosts.find((post) => post.id === 101),
    date: "2026-08-01",
    title: "Lidé · Start kampaně · Přezleťáci se znovu představují",
    status: "Námět",
    graphic: "Čeká",
    copy: "Čeká",
    approval: "Čeká",
    subjectType: undefined,
    primaryImage: undefined,
    socialCopy: undefined,
    cta: undefined,
    assetStatus: undefined,
  };
  const migratedStart = mergePostsWithPlan([oldStartDefault], 10).find((post) => post.id === 101);
  assert.equal(migratedStart?.date, "2026-08-17");
  assert.equal(migratedStart?.title, "Lidé · Start kampaně · Přezleťáci 2026");
  assert.equal(migratedStart?.status, "Ke schválení");
  assert.equal(migratedStart?.copy, "Hotovo");
  assert.equal(migratedStart?.primaryImage, "/images/social/post-001-start-kampane.avif");
  assert.match(migratedStart?.socialCopy ?? "", /Brzy vám představíme jedenáct sousedů/);
  const customStart = { ...oldStartDefault, title: "Můj vlastní start kampaně" };
  assert.equal(mergePostsWithPlan([customStart], 10).find((post) => post.id === 101)?.title, customStart.title);
  const oldLogoDefault = {
    ...initialPosts.find((post) => post.id === 142),
    date: "2026-08-19",
    title: "Lidé · Identita · Představujeme logo Přezleťáků",
    primaryImage: "/images/social/logo-predstaveni-prezletaku.svg",
    socialCopy: "Představujeme vizuální identitu Přezleťáků pro rok 2026.",
    status: "Copy",
    graphic: "Připraveno",
    copy: "Hotovo",
    approval: "Ke schválení",
  };
  const migratedInstagram = mergePostsWithPlan([oldLogoDefault], 12).find((post) => post.id === 142);
  assert.equal(migratedInstagram?.date, "2026-08-20");
  assert.equal(migratedInstagram?.title, "Lidé · Instagram · Sledujte Přezleťáky i na Instagramu");
  assert.equal(migratedInstagram?.primaryImage, "/images/social/post-instagram-start.png");
  assert.match(migratedInstagram?.socialCopy ?? "", /nově najdete i na Instagramu/);
  const customInstagram = { ...oldLogoDefault, title: "Můj vlastní brand post" };
  assert.equal(mergePostsWithPlan([customInstagram], 12).find((post) => post.id === 142)?.title, customInstagram.title);
  assert.equal(mergePostsWithPlan([oldLogoDefault], 12).some((post) => post.id === 143), true);
});

test("keeps Web Brief and AI Context markdown exports synchronized", async () => {
  const [briefFile, aiFile, programFile] = await Promise.all([
    readFile(new URL("../WEB_BRIEF.md", import.meta.url), "utf8"),
    readFile(new URL("../AI_CONTEXT.md", import.meta.url), "utf8"),
    readFile(new URL("../content/program/plan-pro-prezletice-2026-2030.md", import.meta.url), "utf8"),
  ]);
  assert.equal(briefFile, WEB_BRIEF_MARKDOWN);
  assert.equal(aiFile, AI_CONTEXT_MARKDOWN);
  assert.equal(programFile, PROGRAM_MARKDOWN);
  assert.match(programFile, /# Plán pro Přezletice 2026–2030/);
  assert.equal(programContent.areas.length, 10);
  assert.equal(baseWebsiteContentItems.some((item) => item.id === "page-plans" && item.draftLink === programContent.markdownPath), true);
  assert.match(briefFile, /## Role webu v kampani/);
  assert.match(briefFile, /## Živé otevřené body/);
  assert.match(aiFile, /## Pravidla práce s fakty/);
  assert.equal(campaignCandidateNames.length, 11);
  for (const candidate of campaignCandidateNames) assert.match(aiFile, new RegExp(candidate.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("defines a complete structured Web workspace", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.equal(webBriefSections.length, 17);
  assert.equal(new Set(webBriefSections.map((section) => section.id)).size, webBriefSections.length);
  assert.equal(baseWebsiteContentItems.length >= 9, true);
  assert.equal(webBlockers.some((blocker) => blocker.severity === "Kritická"), true);
  assert.match(page, /Sitemap & Content Inventory/);
  assert.match(page, /Otevřít \{document\.name\}/);
  assert.match(page, /Kopírovat pro AI/);
  assert.match(page, /Stáhnout \.md/);
  assert.match(page, /candidateWebsiteItems/);
  assert.match(page, /projectWebsiteItems/);
  assert.match(styles, /\.web-inventory-filters/);
  assert.match(styles, /\.markdown-modal/);
});

test("defines a valid extensible Relationship Engine", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  const entityIds = new Set([
    ...Array.from({ length: 11 }, (_, index) => `candidate:${index + 1}`),
    ...Array.from({ length: 38 }, (_, index) => `project:${index + 1}`),
    ...contentKnowledgeEntities.map((entity) => entity.id),
  ]);
  assert.equal(Object.keys(knowledgeEntityMeta).length, 8);
  assert.equal(new Set(contentKnowledgeEntities.map((entity) => entity.id)).size, contentKnowledgeEntities.length);
  assert.equal(new Set(knowledgeRelationships.map((relationship) => relationship.id)).size, knowledgeRelationships.length);
  assert.equal(knowledgeRelationships.every((relationship) => entityIds.has(relationship.from) && entityIds.has(relationship.to)), true);
  assert.equal(getRelatedEntityIds("project:4").includes("candidate:2"), false);
  assert.equal(getRelatedEntityIds("candidate:2").includes("topic:school"), true);
  assert.equal(getRelatedEntityIds("candidate:2").includes("article:school-capacity"), true);
  assert.equal(knowledgeRelationships.some((relationship) => relationship.type === "works_on"), false);
  const allowedProjectTargets = new Set(["article", "document", "faq", "gallery", "video"]);
  assert.equal(knowledgeRelationships.filter((relationship) => relationship.from.startsWith("project:")).every((relationship) => allowedProjectTargets.has(relationship.to.split(":")[0])), true);
  assert.equal(knowledgeRelationships.filter((relationship) => relationship.to.startsWith("project:")).every((relationship) => allowedProjectTargets.has(relationship.from.split(":")[0])), true);
  assert.equal(findOrphanEntities(contentKnowledgeEntities).some((entity) => entity.id === "topic:safety"), true);
  assert.match(page, /Relationship Engine/);
  assert.match(page, /Oblasti, kterým se věnuji/);
  assert.doesNotMatch(page, /Na čem pracuji/);
  assert.doesNotMatch(page, /Lidé za projektem/);
  assert.match(page, /Související obsah/);
  assert.match(styles, /\.relationship-workspace/);
  assert.match(styles, /\.relationship-panel/);
});

test("centralizes the complete Campaign HQ Sprint 03 operating state", async () => {
  const [page, brief] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/web-content.ts", import.meta.url), "utf8"),
  ]);

  assert.equal(weeklyFocus.length, 5);
  assert.equal(completedProjectStatus.length, 9);
  assert.equal(activeProjectStatus.length, 4);
  assert.equal(candidateProductionChecklist.length, 7);
  assert.deepEqual(firstCandidateWave, [11, 10, 9, 8, 7, 6]);
  assert.equal(clientInputs.length, 5);
  assert.equal(sprintRisks.length, 5);
  assert.deepEqual(campaignReadiness.map(({ label, value }) => [label, value]), [
    ["Strategie", 100], ["Campaign HQ", 100], ["Publikační plán", 100], ["Web Brief", 100], ["Mockup webu", 100],
    ["Brand", 80], ["Web", 70], ["Medailonky", 30], ["První příspěvky", 20], ["Facebook", 10],
  ]);
  assert.deepEqual(sprintRoadmap.map((item) => item.title), [
    "Schválení identity", "Dokončení medailonků", "První grafické šablony", "Publikace kandidátů", "Spuštění webu", "Projektové články", "Vysvětlující obsah",
  ]);

  const editedTask = { ...sprintTasks[0], status: "Doing" };
  const legacyTask = { ...sprintTasks[0], id: 1, title: "Původní systémová položka" };
  const customTask = { ...sprintTasks[0], id: 999, title: "Vlastní položka" };
  const migrated = mergeSprintTasks([editedTask, legacyTask, customTask], sprintTasks, 5);
  assert.equal(migrated.find((task) => task.id === sprintTasks[0].id)?.status, "Doing");
  assert.equal(migrated.some((task) => task.id === 1), false);
  assert.equal(migrated.some((task) => task.id === 999), true);

  assert.match(page, /Fokus týdne/);
  assert.match(page, /War Room/);
  assert.match(page, /Připravenost kampaně/);
  assert.match(page, /Aktuální rizika/);
  assert.match(page, /Poslední změna \{item\.updatedAt\}/);
  assert.match(brief, /Produkční strategie Sprint 03/);
  assert.match(brief, /Kandidát → oblasti → související články → související témata/);
  assert.doesNotMatch(brief, /Kandidát ↔ projekty/);
});
