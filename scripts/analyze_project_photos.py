#!/usr/bin/env python3
"""Add technical review signals and contact sheets without changing originals."""

from __future__ import annotations

import csv
import hashlib
import math
from collections import defaultdict
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps


AUDIT = Path("/Users/giorgio/Documents/Přezletice 26/photo-audit")
CATALOGUE = AUDIT / "katalog.csv"
CONTACTS = AUDIT / "KONTAKTNI_NAHLEDY"
TECHNICAL_REVIEW = AUDIT / "KONTROLA_TECHNICKA"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def dhash(image: Image.Image) -> str:
    pixels = np.asarray(image.convert("L").resize((9, 8), Image.Resampling.LANCZOS))
    bits = pixels[:, 1:] > pixels[:, :-1]
    value = 0
    for bit in bits.flatten():
        value = (value << 1) | int(bit)
    return f"{value:016x}"


def sharpness(image: Image.Image) -> float:
    gray = np.asarray(
        image.convert("L").resize((800, 800), Image.Resampling.BILINEAR),
        dtype=np.float32,
    )
    horizontal = np.diff(gray, axis=1)
    vertical = np.diff(gray, axis=0)
    return float((horizontal.var() + vertical.var()) / 2)


def hamming(left: str, right: str) -> int:
    return (int(left, 16) ^ int(right, 16)).bit_count()


def contact_sheet(rows: list[dict[str, str]], destination: Path) -> None:
    thumb_width, thumb_height = 300, 220
    label_height = 36
    columns = 4
    rows_count = math.ceil(len(rows) / columns)
    canvas = Image.new(
        "RGB",
        (columns * thumb_width, rows_count * (thumb_height + label_height)),
        "white",
    )
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=18)

    for index, row in enumerate(rows):
        x = (index % columns) * thumb_width
        y = (index // columns) * (thumb_height + label_height)
        source = Path(row["zdrojova_cesta"])
        with Image.open(source) as image:
            image = ImageOps.exif_transpose(image).convert("RGB")
            image.thumbnail((thumb_width - 12, thumb_height - 12), Image.Resampling.LANCZOS)
            px = x + (thumb_width - image.width) // 2
            py = y + (thumb_height - image.height) // 2
            canvas.paste(image, (px, py))
        draw.rectangle(
            (x, y + thumb_height, x + thumb_width, y + thumb_height + label_height),
            fill="#f3f4f6",
        )
        draw.text(
            (x + 8, y + thumb_height + 8),
            row["soubor"],
            fill="#111827",
            font=font,
        )

    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, "JPEG", quality=88, optimize=True)


def safe_symlink(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.is_symlink() and destination.resolve() == source.resolve():
        return
    if destination.exists() or destination.is_symlink():
        raise FileExistsError(f"Refusing to overwrite {destination}")
    destination.symlink_to(source)


def main() -> None:
    with CATALOGUE.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    exact_groups: dict[str, list[str]] = defaultdict(list)
    for row in rows:
        source = Path(row["zdrojova_cesta"])
        with Image.open(source) as image:
            oriented = ImageOps.exif_transpose(image)
            row["dhash"] = dhash(oriented)
            row["ostrost"] = f"{sharpness(oriented):.3f}"
        row["sha256"] = sha256(source)
        exact_groups[row["sha256"]].append(row["soubor"])

    sharp_values = np.array([float(row["ostrost"]) for row in rows])
    review_threshold = float(np.percentile(sharp_values, 10))
    for row in rows:
        exact = exact_groups[row["sha256"]]
        row["presna_duplicita"] = " | ".join(name for name in exact if name != row["soubor"])
        row["kontrola_ostrosti"] = float(row["ostrost"]) <= review_threshold

    # Nearest perceptual neighbour, used only as a review hint.
    for index, row in enumerate(rows):
        best_distance = 65
        best_name = ""
        for other_index, other in enumerate(rows):
            if index == other_index:
                continue
            distance = hamming(row["dhash"], other["dhash"])
            if distance < best_distance:
                best_distance = distance
                best_name = other["soubor"]
        row["nejblizsi_zaber"] = best_name
        row["vizualni_vzdalenost"] = best_distance
        row["kontrola_podobnosti"] = best_distance <= 5

    with CATALOGUE.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

    CONTACTS.mkdir(parents=True, exist_ok=True)
    ordered = sorted(rows, key=lambda row: int(row["cislo"]) if row["cislo"] else 99999)
    for page, start in enumerate(range(0, len(ordered), 32), start=1):
        contact_sheet(ordered[start : start + 32], CONTACTS / f"vse-{page:02d}.jpg")

    unassigned = [row for row in ordered if row["stav"] == "nezarazeno"]
    unassigned_sheet = CONTACTS / "nezarazene.jpg"
    if unassigned:
        contact_sheet(unassigned, unassigned_sheet)
    elif unassigned_sheet.exists():
        unassigned_sheet.unlink()

    for row in rows:
        source = Path(row["zdrojova_cesta"])
        if row["kontrola_ostrosti"]:
            safe_symlink(source, TECHNICAL_REVIEW / "ostrost" / source.name)
        if row["kontrola_podobnosti"]:
            safe_symlink(source, TECHNICAL_REVIEW / "podobne-serie" / source.name)

    duplicate_sets = [names for names in exact_groups.values() if len(names) > 1]
    report = AUDIT / "technicka-kontrola.txt"
    report.write_text(
        "\n".join(
            [
                f"Hranice spodních 10 % ostrosti: {review_threshold:.3f}",
                f"Fotografií označených ke kontrole ostrosti: {sum(row['kontrola_ostrosti'] for row in rows)}",
                f"Fotografií s velmi podobným sousedním záběrem: {sum(row['kontrola_podobnosti'] for row in rows)}",
                f"Skupin přesných binárních duplicit: {len(duplicate_sets)}",
                "",
                "Přesné duplicity:",
                *(" | ".join(group) for group in duplicate_sets),
                "",
                "Jde pouze o kontrolní signály. Žádná fotografie nebyla odstraněna.",
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    print(report.read_text(encoding="utf-8"), end="")


if __name__ == "__main__":
    main()
