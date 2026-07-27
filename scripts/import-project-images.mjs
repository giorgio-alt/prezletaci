import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  projectImageManifest,
  selectFirstSupportedImage,
} from "../app/project-images.ts";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceParent = projectRoot;
const sourceRootName = (await readdir(sourceParent)).find(
  (name) => name.normalize("NFC").toLowerCase() === "originální fotky",
);

if (!sourceRootName) throw new Error("Složka Originální Fotky nebyla nalezena.");

const pnpmPackages = await readdir(path.join(projectRoot, "node_modules/.pnpm"));
const sharpPackage = pnpmPackages.find((name) => name.startsWith("sharp@"));
if (!sharpPackage) throw new Error("Balíček sharp není dostupný.");

const sharpModule = await import(pathToFileURL(path.join(
  projectRoot,
  "node_modules/.pnpm",
  sharpPackage,
  "node_modules/sharp/lib/index.js",
)).href);
const sharp = sharpModule.default;

const outputDirectory = path.join(projectRoot, "public/images/projects");
await mkdir(outputDirectory, { recursive: true });

for (const record of projectImageManifest) {
  const logicalParts = record.source.split("/");
  const sourceFile = path.join(projectRoot, sourceRootName, ...logicalParts.slice(1));
  const sourceDirectory = path.dirname(sourceFile);
  const firstFile = selectFirstSupportedImage(await readdir(sourceDirectory));
  if (firstFile !== path.basename(sourceFile)) {
    throw new Error(`Manifest neukazuje na první fotografii ve složce ${sourceDirectory}.`);
  }
  await sharp(sourceFile)
    .rotate()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(projectRoot, "public", record.image.replace(/^\//, "")));
}

const logoSource = process.argv[2];
if (logoSource) {
  const brandDirectory = path.join(projectRoot, "public/images/brand");
  await mkdir(brandDirectory, { recursive: true });
  await sharp(logoSource)
    .rotate()
    .png({ compressionLevel: 9 })
    .toFile(path.join(brandDirectory, "prezletaci-logo.png"));
}

console.log(`Imported ${projectImageManifest.length} project photographs.`);
