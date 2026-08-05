#!/usr/bin/env python3
"""Assign visually identified project photos and record every rename."""

from __future__ import annotations

import csv
import re
from pathlib import Path


ROOT = Path("/Users/giorgio/Documents/Přezletice 26/Originální fotky/02_projekty")
UNASSIGNED = ROOT / "00_nezarazene"
MANIFEST = (
    Path("/Users/giorgio/Documents/Přezletice 26/Originální fotky/_ORGANIZACE")
    / "manifest-vizualniho-zarazeni-projektu.csv"
)

ASSIGNMENTS = [
    (range(6644, 6647), "04_skolstvi", "svazkova-skola-a-jidelna"),
    (range(6659, 6661), "02_doprava", "rekonstrukce-mistnich-komunikaci"),
    (range(6678, 6680), "01_zivotni_prostredi", "hruskove-aleje-a-dalsi-zelen"),
    (range(6756, 6757), "06_kultura", "komunitni-centrum-zlatak"),
    (range(6801, 6802), "08_zdravi-socialni", "prakticky-lekar-a-ordinace"),
    (range(6821, 6822), "07_infrastruktura", "podzemni-kontejnery"),
    (range(6825, 6828), "05_sport", "petanque-nohavice"),
    (range(6830, 6832), "02_doprava", "krizovatka-nohavice"),
    (range(6838, 6840), "05_sport", "detska-hriste"),
    (range(6841, 6845), "01_zivotni_prostredi", "revitalizace-rybnika"),
]


def assignment(number: int) -> tuple[str, str]:
    for numbers, section, project in ASSIGNMENTS:
        if number in numbers:
            return section, project
    raise KeyError(number)


def main() -> None:
    sources = sorted(UNASSIGNED.glob("*.jpg"))
    if len(sources) != 21:
        raise SystemExit(f"Expected 21 unassigned JPG files, found {len(sources)}")

    moves = []
    for source in sources:
        match = re.search(r"y7a(\d{4})([a-z]?)", source.stem, re.IGNORECASE)
        if not match:
            raise SystemExit(f"Cannot read camera number: {source}")
        number = int(match.group(1))
        letter = match.group(2).lower()
        section, project = assignment(number)
        edited = "-ed" if "-ed" in source.stem.lower() else ""
        destination = ROOT / section / project / f"{project}__y7a{number:04d}{letter}{edited}.jpg"
        if destination.exists():
            raise SystemExit(f"Destination already exists: {destination}")
        moves.append((source, destination, section, project, number))

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(["cislo", "sekce", "projekt", "puvodni_cesta", "nova_cesta", "metoda"])
        for source, destination, section, project, number in moves:
            writer.writerow([number, section, project, source, destination, "vizualni-identifikace-a-kontext-serie"])

    for source, destination, _section, _project, _number in moves:
        destination.parent.mkdir(parents=True, exist_ok=True)
        source.rename(destination)

    print(f"Assigned and moved {len(moves)} project photos.")
    print(f"Manifest: {MANIFEST}")


if __name__ == "__main__":
    main()
