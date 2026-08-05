#!/usr/bin/env python3
"""Create a non-destructive catalogue and symlink views for project photos."""

from __future__ import annotations

import csv
import os
import re
from pathlib import Path

from PIL import Image


SOURCE = Path(
    "/Users/giorgio/Documents/Přezletice 26/Originální fotky/02_projekty"
)
OUTPUT = Path("/Users/giorgio/Documents/Přezletice 26/photo-audit")
VIEWS = OUTPUT / "PRACOVNI_TRIDENI"

# Project ranges transcribed from "Volby 2026 hotové_odkazy.docx".
# Overlaps are intentional: a photo can document more than one project.
RULES = [
    ("01_zivotni_prostredi", "revitalizace-rybnika", [(6841, 6857), (6866, 6867)]),
    ("01_zivotni_prostredi", "hruskove-aleje-a-dalsi-zelen", [(6678, 6687), (6877, 6882)]),
    ("01_zivotni_prostredi", "sad-nad-ms", [(6682, 6687)]),
    ("01_zivotni_prostredi", "zahrada-ms", [(6695, 6706)]),
    ("01_zivotni_prostredi", "zelen-prutahove-komunikace", [(6671, 6673), (6722, 6726)]),
    ("01_zivotni_prostredi", "zelen-mistni-komunikace", [(6662, 6670), (6674, 6677)]),
    ("01_zivotni_prostredi", "zelen-podzemni-kontejnery", [(6819, 6820), (6872, 6876)]),
    ("01_zivotni_prostredi", "zelen-namesti-komunitni-centrum", [(6819, 6820)]),
    ("01_zivotni_prostredi", "dalsi-lokalni-zelen", [(6661, 6661)]),
    ("02_doprava", "rekonstrukce-mistnich-komunikaci", [(6662, 6670), (6674, 6677)]),
    ("02_doprava", "rekonstrukce-mistnich-komunikaci", [(6659, 6660)]),
    ("02_doprava", "rekonstrukce-prutahovych-komunikaci", [(6671, 6673), (6745, 6752)]),
    ("02_doprava", "lavka-a-verejne-plochy-zlaty-kopec", [(6858, 6865)]),
    ("02_doprava", "krizovatka-nohavice", [(6829, 6831)]),
    ("03_bezpecnost", "obecni-policie", [(6717, 6717)]),
    ("04_skolstvi", "svazkova-skola-a-jidelna", [(6644, 6658)]),
    ("04_skolstvi", "druhy-pavilon-ms", [(6682, 6701), (6706, 6706)]),
    ("04_skolstvi", "nastavba-ms-detska-skupina", [(6682, 6701), (6706, 6706)]),
    ("05_sport", "male-multifunkcni-hriste-u-rybnika", [(6840, 6840), (6869, 6871)]),
    ("05_sport", "workoutove-hriste", [(6845, 6846)]),
    ("05_sport", "detska-hriste", [(6832, 6839)]),
    ("05_sport", "petanque-nohavice", [(6824, 6827)]),
    ("06_kultura", "komunitni-centrum-zlatak", [(6756, 6794)]),
    ("06_kultura", "sokolovna-a-restaurace-na-namesti", [(6713, 6717)]),
    ("07_infrastruktura", "podzemni-kontejnery", [(6709, 6712), (6753, 6755), (6821, 6823), (6872, 6876)]),
    ("07_infrastruktura", "vos-severni-cast", [(6667, 6667)]),
    ("07_infrastruktura", "kaplicka-a-zvon", [(6726, 6731)]),
    ("07_infrastruktura", "postovni-vydejni-boxy", [(6718, 6721)]),
    ("08_zdravi-socialni", "prakticky-lekar-a-ordinace", [(6800, 6818)]),
    ("08_zdravi-socialni", "vydejni-automaty-stravovani", [(6738, 6744)]),
    ("09_digitalizace", "elektronicka-uredni-deska", [(6734, 6737)]),
]

NUMBER_RE = re.compile(r"_?Y7A(\d{4})", re.IGNORECASE)


def photo_number(path: Path) -> int | None:
    match = NUMBER_RE.search(path.stem)
    return int(match.group(1)) if match else None


def matching_rules(number: int | None) -> list[tuple[str, str]]:
    if number is None:
        return []
    matches = []
    for section, project, ranges in RULES:
        if any(start <= number <= end for start, end in ranges):
            matches.append((section, project))
    return matches


def safe_symlink(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.is_symlink() and destination.resolve() == source.resolve():
        return
    if destination.exists() or destination.is_symlink():
        raise FileExistsError(f"Refusing to overwrite {destination}")
    destination.symlink_to(source)


def main() -> None:
    if not SOURCE.is_dir():
        raise SystemExit(f"Source folder does not exist: {SOURCE}")

    OUTPUT.mkdir(parents=True, exist_ok=True)
    VIEWS.mkdir(parents=True, exist_ok=True)
    rows = []

    for source in sorted(SOURCE.rglob("*")):
        if not source.is_file() or source.suffix.lower() not in {".jpg", ".jpeg"}:
            continue

        number = photo_number(source)
        matches = matching_rules(number)
        with Image.open(source) as image:
            width, height = image.size

        if matches:
            for section, project in matches:
                safe_symlink(source, VIEWS / section / project / source.name)
            state = "zarazeno"
        else:
            safe_symlink(source, VIEWS / "00_nezarazene" / source.name)
            state = "nezarazeno"

        rows.append(
            {
                "soubor": source.name,
                "cislo": number or "",
                "stav": state,
                "pocet_shod": len(matches),
                "projekty": " | ".join(f"{section}/{project}" for section, project in matches),
                "sirka_px": width,
                "vyska_px": height,
                "velikost_b": source.stat().st_size,
                "upravena_varianta": "_ed" in source.stem.lower(),
                "zdrojova_cesta": str(source),
            }
        )

    catalogue = OUTPUT / "katalog.csv"
    with catalogue.open("w", newline="", encoding="utf-8-sig") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

    assigned = sum(row["stav"] == "zarazeno" for row in rows)
    overlapping = sum(row["pocet_shod"] > 1 for row in rows)
    total_bytes = sum(int(row["velikost_b"]) for row in rows)
    summary = OUTPUT / "souhrn.txt"
    summary.write_text(
        "\n".join(
            [
                f"Celkem fotografií: {len(rows)}",
                f"Zařazeno podle klíče: {assigned}",
                f"Nezařazeno: {len(rows) - assigned}",
                f"Fotografie s více projektovými shodami: {overlapping}",
                f"Celková velikost originálů: {total_bytes} B",
                "",
                "Originály nebyly změněny, přesunuty ani smazány.",
                "PRACOVNI_TRIDENI obsahuje pouze symbolické odkazy na originály.",
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    print(summary.read_text(encoding="utf-8"), end="")


if __name__ == "__main__":
    main()
