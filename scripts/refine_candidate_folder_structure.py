#!/usr/bin/env python3
"""Nest candidate originals and materialize the existing agency selection."""

from __future__ import annotations

import csv
import shutil
from pathlib import Path


ROOT = Path("/Users/giorgio/Documents/Přezletice 26/Originální fotky/01_kandidati")
ORIGINALS = ROOT / "01_originalni_fotky"
SELECTED = ROOT / "02_vybrano_agenturou"
AUDIT = Path("/Users/giorgio/Documents/Přezletice 26/photo-audit")
AUDIT_SELECTION = AUDIT / "KANDIDATI" / "VYBRANO_AGENTUROU"
MANIFEST = (
    Path("/Users/giorgio/Documents/Přezletice 26/Originální fotky/_ORGANIZACE")
    / "manifest-struktury-kandidatu.csv"
)


def main() -> None:
    candidate_folders = sorted(
        path
        for path in ROOT.iterdir()
        if path.is_dir()
        and path.name[:2].isdigit()
        and path not in {ORIGINALS, SELECTED}
    )
    if len(candidate_folders) != 12:
        raise SystemExit(f"Expected 12 candidate/team folders, found {len(candidate_folders)}")
    if ORIGINALS.exists() or SELECTED.exists():
        raise SystemExit("Target structure already exists; refusing to overwrite it.")

    old_to_new: dict[str, Path] = {}
    for folder in candidate_folders:
        for source in folder.rglob("*"):
            if source.is_file():
                old_to_new[str(source)] = ORIGINALS / folder.name / source.relative_to(folder)

    ORIGINALS.mkdir(parents=True)
    for folder in candidate_folders:
        folder.rename(ORIGINALS / folder.name)

    SELECTED.mkdir()
    selected_rows = []
    for link in sorted(AUDIT_SELECTION.glob("*.jpg")):
        source = link.resolve(strict=True)
        destination = SELECTED / link.name
        shutil.copy2(source, destination)
        selected_rows.append((source, destination))

    repaired_links = 0
    for link in AUDIT.rglob("*"):
        if not link.is_symlink():
            continue
        old_target = str(link.resolve(strict=False))
        destination = old_to_new.get(old_target)
        if link.parent == AUDIT_SELECTION and link.name.endswith(".jpg"):
            destination = SELECTED / link.name
        if destination is None:
            continue
        link.unlink()
        link.symlink_to(destination)
        repaired_links += 1

    updated_catalogues = 0
    for catalogue in AUDIT.rglob("*.csv"):
        with catalogue.open(encoding="utf-8-sig", newline="") as handle:
            rows = list(csv.DictReader(handle))
            if not rows:
                continue
            fieldnames = list(rows[0])
        changed = False
        for row in rows:
            old_path = row.get("zdrojova_cesta", "")
            destination = old_to_new.get(old_path)
            if catalogue.name == "vybrano-agenturou.csv":
                selected_name = row.get("soubor_v_auditu", "")
                selected_path = SELECTED / selected_name
                if selected_name and selected_path.exists():
                    destination = selected_path
            if destination is not None:
                row["zdrojova_cesta"] = str(destination)
                changed = True
        if changed:
            with catalogue.open("w", encoding="utf-8-sig", newline="") as handle:
                writer = csv.DictWriter(handle, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)
            updated_catalogues += 1

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["typ", "puvodni_cesta", "nova_cesta"])
        for old_path, destination in sorted(old_to_new.items()):
            writer.writerow(["original", old_path, destination])
        for source, destination in selected_rows:
            writer.writerow(["vyber-agentury-kopie", source, destination])

    print(f"Nested {len(old_to_new)} candidate/team originals.")
    print(f"Materialized {len(selected_rows)} agency-selected files.")
    print(f"Repaired {repaired_links} audit links and updated {updated_catalogues} catalogues.")
    print(f"Manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
