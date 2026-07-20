import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { initialPosts, legacyInitialPosts, mergePostsWithPlan } from "../app/postplan.ts";

const root = new URL("../", import.meta.url);
const candidateDir = new URL("../public/images/candidates/", import.meta.url);
const teamDir = new URL("../public/images/team/", import.meta.url);

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

test("server-renders the Přezleťáci Campaign OS", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Přezleťáci 2026 — Campaign OS<\/title>/);
  assert.match(html, /Jedna obrazovka/);
  assert.match(html, /Kandidáti<\/span><b>11/);
  assert.match(html, /Fotografie<\/span><strong>11/);
  assert.match(html, /Příspěvky<\/span><strong>39/);
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

test("defines the six centrally themed ContentCard templates", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  const types = ["people", "completed", "progress", "future", "explain", "evidence"];
  for (const type of types) {
    assert.match(page, new RegExp(`\\b${type}: \\{`));
    assert.match(styles, new RegExp(`--pillar-${type}:`));
    assert.match(styles, new RegExp(`\\.content-card-${type} \\{`));
  }
  assert.match(page, /Design System komunikačních pilířů/);
  assert.match(page, /Karla Hemzy/);
  assert.match(page, /function ContentCard/);
});

test("imports the complete chronological 39-post publication plan", async () => {
  assert.equal(initialPosts.length, 39);
  assert.equal(new Set(initialPosts.map((post) => post.id)).size, initialPosts.length);
  assert.equal(new Set(initialPosts.map((post) => `${post.date}\u0000${post.title}`)).size, initialPosts.length);
  assert.equal(initialPosts.every((post) => /^2026-(08|09|10)-\d{2}$/.test(post.date)), true);
  assert.deepEqual(initialPosts, [...initialPosts].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id));
  assert.deepEqual(
    Object.fromEntries(["08", "09", "10"].map((month) => [month, initialPosts.filter((post) => post.date.slice(5, 7) === month).length])),
    { "08": 12, "09": 17, "10": 10 },
  );
});

test("all candidate post links resolve to imported posts", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const ids = new Set(initialPosts.map((post) => post.id));
  const references = [...page.matchAll(/plannedPostIds:\s*\[([^\]]*)\]/g)]
    .flatMap((match) => match[1].split(",").map((value) => value.trim()).filter((value) => /^\d+$/.test(value)).map(Number));
  assert.equal(references.length > 0, true);
  assert.equal(references.every((id) => ids.has(id)), true);
});

test("version 4 migration adds the plan without erasing user changes", () => {
  assert.equal(mergePostsWithPlan(legacyInitialPosts, 3).length, 39);
  const editedLegacy = { ...legacyInitialPosts[1], title: "Uživatelská úprava medailonku" };
  const withEditedLegacy = mergePostsWithPlan([editedLegacy], 3);
  assert.equal(withEditedLegacy.length, 40);
  assert.equal(withEditedLegacy.find((post) => post.id === editedLegacy.id)?.title, editedLegacy.title);
  const editedPlanPost = { ...initialPosts[0], status: "Copy" };
  const customPost = { ...legacyInitialPosts[0], id: 999001, title: "Vlastní uživatelský příspěvek" };
  const migrated = mergePostsWithPlan([editedPlanPost, customPost], 4);
  assert.equal(migrated.length, 40);
  assert.equal(migrated.find((post) => post.id === editedPlanPost.id)?.status, "Copy");
  assert.equal(migrated.some((post) => post.id === customPost.id), true);
});
