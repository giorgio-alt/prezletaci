#!/usr/bin/env python3
"""Catalogue candidate and team shoots in the same non-destructive audit style."""

from __future__ import annotations

import csv
import unicodedata
from collections import defaultdict
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

from analyze_project_photos import contact_sheet, dhash, hamming, sha256, sharpness


CANDIDATE_SOURCE = Path(
    "/Users/giorgio/Documents/Přezletice 26/Originální fotky/"
    "01_kandidati/01_originalni_fotky"
)
TEAM_SOURCE = Path(
    "/Users/giorgio/Documents/Přezletice 26/Originální fotky/"
    "01_kandidati/01_originalni_fotky/12_tym-a-prapor"
)
SELECTED_SOURCE = Path(
    "/Users/giorgio/Documents/Přezletice 26/Originální fotky/"
    "01_kandidati/02_vybrano_agenturou"
)
AUDIT = Path("/Users/giorgio/Documents/Přezletice 26/photo-audit/KANDIDATI")
VIEWS = AUDIT / "PRACOVNI_TRIDENI"
SELECTED_VIEW = AUDIT / "VYBRANO_AGENTUROU"
CONTACTS = AUDIT / "KONTAKTNI_NAHLEDY"
TECHNICAL_REVIEW = AUDIT / "KONTROLA_TECHNICKA"

CANDIDATES = [
    ("01_tomas-riha", "Tomáš Říha", [(2830, 2840)]),
    ("02_jan-macourek", "Jan Macourek", [(2815, 2829), (2867, 2878), (3010, 3016)]),
    ("03_romana-bernardova", "Romana Bernardová", [(2907, 2918)]),
    ("04_lenka-bulova", "Lenka Bulová", [(2949, 2973)]),
    ("05_jan-kana", "Jan Káňa", [(2933, 2948)]),
    ("06_pavel-rerucha", "Pavel Řeřucha", [(2890, 2905)]),
    ("07_vaclav-smerda", "Václav Šmerda", [(2879, 2889)]),
    ("08_bretislav-lukes", "Břetislav Lukeš", [(2841, 2866)]),
    ("09_lenka-brozova", "Lenka Brožová", [(2974, 2996)]),
    ("10_jakub-triska", "Jakub Tříska", [(2919, 2929)]),
    ("11_vojta-broz", "Vojta Brož", [(2997, 3008)]),
]

SELECTED_NAMES = {
    "tomas-riha": ("01", "Tomáš Říha"),
    "jan-macourek": ("02", "Jan Macourek"),
    "romana-bernardova": ("03", "Romana Bernardová"),
    "lenka-bulova": ("04", "Lenka Bulová"),
    "jan-kana": ("05", "Jan Káňa"),
    "pavel-rerucha": ("06", "Pavel Řeřucha"),
    "vaclav-smerda": ("07", "Václav Šmerda"),
    "bretislav-lukes": ("08", "Břetislav Lukeš"),
    "lenka-brozova": ("09", "Lenka Brožová"),
    "jakub-triska": ("10", "Jakub Tříska"),
    "vojta-broz": ("11", "Vojta Brož"),
}


def sequence_number(path: Path) -> int | None:
    stem = path.stem
    marker = stem.upper().rfind("R5A")
    if marker < 0:
        return None
    digits = ""
    for character in stem[marker + 3 :]:
        if character.isdigit():
            digits += character
        else:
            break
    return int(digits) if digits else None


def candidate_for(path: Path) -> tuple[str, str] | None:
    if path.name.lower().startswith(("jan macourek", "jan-macourek")):
        return "02_jan-macourek", "Jan Macourek"
    number = sequence_number(path)
    if number is None:
        return None
    for folder, name, ranges in CANDIDATES:
        if any(start <= number <= end for start, end in ranges):
            return folder, name
    return None


def safe_symlink(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.is_symlink() and destination.resolve() == source.resolve():
        return
    if destination.exists() or destination.is_symlink():
        raise FileExistsError(f"Refusing to overwrite {destination}")
    destination.symlink_to(source)


def ascii_slug(value: str) -> str:
    decomposed = unicodedata.normalize("NFKD", value)
    plain = "".join(character for character in decomposed if not unicodedata.combining(character))
    return "-".join(plain.lower().replace("_", " ").split())


def catalogue_agency_selection() -> int:
    if not SELECTED_SOURCE.is_dir():
        raise SystemExit(f"Agency selection folder does not exist: {SELECTED_SOURCE}")

    rows = []
    for source in sorted(SELECTED_SOURCE.glob("*")):
        if not source.is_file() or source.suffix.lower() not in {".jpg", ".jpeg"}:
            continue
        slug = ascii_slug(source.stem)
        if len(slug) > 3 and slug[:2].isdigit() and slug[2] == "-":
            slug = slug[3:]
        if slug not in SELECTED_NAMES:
            raise SystemExit(f"Unknown selected candidate filename: {source.name}")
        order, person = SELECTED_NAMES[slug]
        destination_name = f"{order}-{slug}{source.suffix.lower()}"
        safe_symlink(source, SELECTED_VIEW / destination_name)
        with Image.open(source) as image:
            oriented = ImageOps.exif_transpose(image)
            width, height = oriented.size
        rows.append(
            {
                "poradi": order,
                "osoba": person,
                "soubor_vyberu": source.name,
                "soubor_v_auditu": destination_name,
                "sirka_px": width,
                "vyska_px": height,
                "velikost_b": source.stat().st_size,
                "sha256": sha256(source),
                "zdrojova_cesta": str(source),
                "soubor": destination_name,
            }
        )

    rows.sort(key=lambda row: row["poradi"])
    with (AUDIT / "vybrano-agenturou.csv").open(
        "w", encoding="utf-8-sig", newline=""
    ) as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "poradi",
                "osoba",
                "soubor_vyberu",
                "soubor_v_auditu",
                "sirka_px",
                "vyska_px",
                "velikost_b",
                "sha256",
                "zdrojova_cesta",
            ],
            extrasaction="ignore",
        )
        writer.writeheader()
        writer.writerows(rows)
    contact_sheet(rows, CONTACTS / "vybrano-agenturou.jpg")
    return len(rows)


def collect_rows() -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    sources = [
        ("jednotlivci", CANDIDATE_SOURCE),
        ("tym-a-prapor", TEAM_SOURCE),
    ]
    for source_type, source_folder in sources:
        if not source_folder.is_dir():
            raise SystemExit(f"Source folder does not exist: {source_folder}")
        candidates = source_folder.rglob("*") if source_type == "jednotlivci" else source_folder.glob("*")
        for source in sorted(candidates):
            if not source.is_file() or source.suffix.lower() not in {".jpg", ".jpeg"}:
                continue
            if source_type == "jednotlivci" and TEAM_SOURCE in source.parents:
                continue

            assignment = candidate_for(source) if source_type == "jednotlivci" else None
            if source_type == "tym-a-prapor":
                folder, person, state = "12_tym-a-prapor", "Tým Přezleťáků", "zarazeno"
            elif assignment:
                folder, person = assignment
                state = "zarazeno"
            else:
                folder, person, state = "00_nezarazene", "", "nezarazeno"

            safe_symlink(source, VIEWS / folder / source.name)
            with Image.open(source) as image:
                oriented = ImageOps.exif_transpose(image)
                width, height = oriented.size
                image_dhash = dhash(oriented)
                image_sharpness = sharpness(oriented)

            rows.append(
                {
                    "soubor": source.name,
                    "cislo": sequence_number(source) or "",
                    "typ_zdroje": source_type,
                    "stav": state,
                    "osoba_nebo_skupina": person,
                    "cilova_slozka": folder,
                    "sirka_px": width,
                    "vyska_px": height,
                    "velikost_b": source.stat().st_size,
                    "upravena_varianta": "_ed" in source.stem.lower(),
                    "zdrojova_cesta": str(source),
                    "dhash": image_dhash,
                    "ostrost": f"{image_sharpness:.3f}",
                    "sha256": sha256(source),
                }
            )
    return rows


def main() -> None:
    AUDIT.mkdir(parents=True, exist_ok=True)
    rows = collect_rows()
    selected_count = catalogue_agency_selection()

    exact_groups: dict[str, list[str]] = defaultdict(list)
    for row in rows:
        exact_groups[str(row["sha256"])].append(str(row["soubor"]))

    sharp_values = np.array([float(row["ostrost"]) for row in rows])
    review_threshold = float(np.percentile(sharp_values, 10))
    for index, row in enumerate(rows):
        duplicates = exact_groups[str(row["sha256"])]
        row["presna_duplicita"] = " | ".join(
            name for name in duplicates if name != row["soubor"]
        )
        row["kontrola_ostrosti"] = float(row["ostrost"]) <= review_threshold
        best_distance, best_name = 65, ""
        for other_index, other in enumerate(rows):
            if index == other_index:
                continue
            distance = hamming(str(row["dhash"]), str(other["dhash"]))
            if distance < best_distance:
                best_distance, best_name = distance, str(other["soubor"])
        row["nejblizsi_zaber"] = best_name
        row["vizualni_vzdalenost"] = best_distance
        row["kontrola_podobnosti"] = best_distance <= 5

    catalogue = AUDIT / "katalog.csv"
    with catalogue.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

    by_folder: dict[str, list[dict[str, object]]] = defaultdict(list)
    for row in rows:
        by_folder[str(row["cilova_slozka"])].append(row)
        source = Path(str(row["zdrojova_cesta"]))
        if row["kontrola_ostrosti"]:
            safe_symlink(source, TECHNICAL_REVIEW / "ostrost" / source.name)
        if row["kontrola_podobnosti"]:
            safe_symlink(source, TECHNICAL_REVIEW / "podobne-serie" / source.name)

    CONTACTS.mkdir(parents=True, exist_ok=True)
    for folder, group in sorted(by_folder.items()):
        ordered = sorted(group, key=lambda row: (int(row["cislo"] or 99999), str(row["soubor"])))
        contact_sheet(ordered, CONTACTS / f"{folder}.jpg")

    duplicate_sets = [names for names in exact_groups.values() if len(names) > 1]
    summary = AUDIT / "souhrn.txt"
    summary.write_text(
        "\n".join(
            [
                f"Celkem fotografií: {len(rows)}",
                f"Jednotlivci: {sum(row['typ_zdroje'] == 'jednotlivci' for row in rows)}",
                f"Tým a prapor: {sum(row['typ_zdroje'] == 'tym-a-prapor' for row in rows)}",
                f"Vybráno agenturou: {selected_count}",
                f"Zařazeno podle klíče: {sum(row['stav'] == 'zarazeno' for row in rows)}",
                f"Nezařazeno: {sum(row['stav'] == 'nezarazeno' for row in rows)}",
                f"Kontrola ostrosti: {sum(bool(row['kontrola_ostrosti']) for row in rows)}",
                f"Kontrola podobnosti: {sum(bool(row['kontrola_podobnosti']) for row in rows)}",
                f"Skupin přesných duplicit: {len(duplicate_sets)}",
                f"Celková velikost originálů: {sum(int(row['velikost_b']) for row in rows)} B",
                "",
                "Originály nebyly změněny, přesunuty ani smazány.",
                "Pracovní složky obsahují pouze symbolické odkazy.",
                "Webové exporty v public/images/candidates jsou odvozené soubory a nejsou znovu počítány jako originály.",
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    print(summary.read_text(encoding="utf-8"), end="")


if __name__ == "__main__":
    main()
