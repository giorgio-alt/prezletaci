#!/usr/bin/env python3
"""Reorganize originals with a collision-safe manifest and repair audit links."""

from __future__ import annotations

import argparse
import csv
import re
from pathlib import Path

from catalog_candidate_photos import CANDIDATES
from catalog_project_photos import RULES


ROOT = Path("/Users/giorgio/Documents/Přezletice 26/Originální fotky")
CANDIDATE_OLD = ROOT / "Prezletice jednotlivci Jun 30 2026"
TEAM_OLD = ROOT / "adlt_prezletice_skupinova-a-prapor_2026-06-30_2005"
PROJECT_OLD = ROOT / "adlt_prezletice_objekty_2026-07-04_1752"
AUDIT = Path("/Users/giorgio/Documents/Přezletice 26/photo-audit")
MANIFEST = ROOT / "_ORGANIZACE" / "manifest-presunu.csv"


def sequence(path: Path, prefix: str) -> tuple[int | None, str]:
    match = re.search(rf"{prefix}(\d{{4}})([A-Za-z]?)", path.stem, re.IGNORECASE)
    if not match:
        return None, ""
    return int(match.group(1)), match.group(2).lower()


def edited_suffix(path: Path) -> str:
    return "-ed" if "_ed" in path.stem.lower() else ""


def candidate_destination(source: Path) -> Path:
    if source.name.lower().startswith("jan macourek"):
        return ROOT / "01_kandidati" / "02_jan-macourek" / "jan-macourek__vyber-01.jpg"
    number, letter = sequence(source, "R5A")
    if number is None:
        return ROOT / "01_kandidati" / "00_nezarazene" / source.name
    for folder, _name, ranges in CANDIDATES:
        if any(start <= number <= end for start, end in ranges):
            filename = f"{folder.split('_', 1)[1]}__r5a{number:04d}{letter}{edited_suffix(source)}.jpg"
            return ROOT / "01_kandidati" / folder / filename
    return ROOT / "01_kandidati" / "00_nezarazene" / f"nezarazeno__r5a{number:04d}{letter}{edited_suffix(source)}.jpg"


def team_destination(source: Path) -> Path:
    number, letter = sequence(source, "R5A")
    if number is None:
        return ROOT / "01_kandidati" / "12_tym-a-prapor" / source.name
    return ROOT / "01_kandidati" / "12_tym-a-prapor" / f"tym-a-prapor__r5a{number:04d}{letter}{edited_suffix(source)}.jpg"


def project_destination(source: Path) -> Path:
    number, letter = sequence(source, "Y7A")
    if number is not None:
        for section, project, ranges in RULES:
            if any(start <= number <= end for start, end in ranges):
                filename = f"{project}__y7a{number:04d}{letter}{edited_suffix(source)}.jpg"
                return ROOT / "02_projekty" / section / project / filename
        filename = f"nezarazeno__y7a{number:04d}{letter}{edited_suffix(source)}.jpg"
    else:
        filename = source.name
    return ROOT / "02_projekty" / "00_nezarazene" / filename


def operations() -> list[tuple[Path, Path, str]]:
    result = []
    sources = [
        (CANDIDATE_OLD, candidate_destination, "kandidat"),
        (TEAM_OLD, team_destination, "tym-a-prapor"),
        (PROJECT_OLD, project_destination, "projekt"),
    ]
    for folder, resolver, kind in sources:
        if not folder.is_dir():
            raise SystemExit(f"Missing expected source folder: {folder}")
        for source in sorted(folder.iterdir()):
            if source.is_file() and source.suffix.lower() in {".jpg", ".jpeg"}:
                result.append((source, resolver(source), kind))
    return result


def validate(items: list[tuple[Path, Path, str]]) -> None:
    destinations = [destination for _source, destination, _kind in items]
    duplicates = {path for path in destinations if destinations.count(path) > 1}
    existing = {path for path in destinations if path.exists()}
    if duplicates:
        raise SystemExit("Duplicate destinations:\n" + "\n".join(map(str, sorted(duplicates))))
    if existing:
        raise SystemExit("Destinations already exist:\n" + "\n".join(map(str, sorted(existing))))


def write_manifest(items: list[tuple[Path, Path, str]], status: str) -> None:
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["typ", "puvodni_cesta", "nova_cesta", "stav"],
        )
        writer.writeheader()
        for source, destination, kind in items:
            writer.writerow(
                {
                    "typ": kind,
                    "puvodni_cesta": source,
                    "nova_cesta": destination,
                    "stav": status,
                }
            )


def repair_audit(items: list[tuple[Path, Path, str]]) -> tuple[int, int]:
    path_map = {str(source): destination for source, destination, _kind in items}
    name_map = {source.name: destination for source, destination, _kind in items}
    repaired_links = 0
    updated_catalogues = 0

    for link in AUDIT.rglob("*"):
        if not link.is_symlink():
            continue
        old_target = str(link.resolve(strict=False))
        destination = path_map.get(old_target)
        if destination is None and not link.exists():
            destination = name_map.get(Path(old_target).name)
        if destination is None:
            continue
        link.unlink()
        link.symlink_to(destination)
        repaired_links += 1

    for catalogue in AUDIT.rglob("*.csv"):
        with catalogue.open(encoding="utf-8-sig", newline="") as handle:
            rows = list(csv.DictReader(handle))
            if not rows:
                continue
            fieldnames = list(rows[0])
        changed = False
        for row in rows:
            old_path = row.get("zdrojova_cesta", "")
            destination = path_map.get(old_path)
            if destination is None:
                destination = name_map.get(Path(old_path).name)
            if destination is not None:
                row["zdrojova_cesta"] = str(destination)
                changed = True
        if changed:
            with catalogue.open("w", encoding="utf-8-sig", newline="") as handle:
                writer = csv.DictWriter(handle, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)
            updated_catalogues += 1
    return repaired_links, updated_catalogues


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    items = operations()
    validate(items)
    write_manifest(items, "plan")
    print(f"Prepared {len(items)} moves.")
    print(f"Manifest: {MANIFEST}")
    if not args.apply:
        print("Dry run only. Use --apply to perform the moves.")
        return

    for source, destination, _kind in items:
        destination.parent.mkdir(parents=True, exist_ok=True)
        source.rename(destination)
    write_manifest(items, "presunuto")
    links, catalogues = repair_audit(items)
    print(f"Moved {len(items)} originals.")
    print(f"Repaired {links} audit links and updated {catalogues} catalogues.")


if __name__ == "__main__":
    main()
