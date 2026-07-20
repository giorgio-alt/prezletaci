#!/usr/bin/env python3
"""Create metadata-free, web-ready candidate and team images from named JPG sources."""

from __future__ import annotations

import argparse
import io
import unicodedata
from pathlib import Path

from PIL import Image, ImageCms, ImageOps


CANDIDATES = {
    "Jan Káňa.jpg": "jan-kana.webp",
    "Jakub Tříska.jpg": "jakub-triska.webp",
    "Václav Šmerda.jpg": "vaclav-smerda.webp",
    "Břetislav Lukeš.jpg": "bretislav-lukes.webp",
    "Pavel Řeřucha.jpg": "pavel-rerucha.webp",
    "Tomáš Říha.jpg": "tomas-riha.webp",
    "Jan Macourek.jpg": "jan-macourek.webp",
    "Lenka Brožová.jpg": "lenka-brozova.webp",
    "Vojta Brož.jpg": "vojta-broz.webp",
    "Romana Bernardová.jpg": "romana-bernardova.webp",
    "Lenka Bulová.jpg": "lenka-bulova.webp",
}

TEAM = {
    "2-oříznout.jpg": "team-hero.webp",
    "1.jpg": "team-wide-01.webp",
    "3.jpg": "team-wide-02.webp",
    "prapor1.jpg": "prezletaci-flag.webp",
}


def normalized(value: str) -> str:
    return unicodedata.normalize("NFC", value)


def resolve_named_file(directory: Path, requested_name: str) -> Path:
    matches = [path for path in directory.iterdir() if path.is_file() and normalized(path.name) == normalized(requested_name)]
    if len(matches) != 1:
        raise FileNotFoundError(f"Expected exactly one source named {requested_name!r}, found {len(matches)}")
    return matches[0]


def to_srgb(image: Image.Image) -> Image.Image:
    icc = image.info.get("icc_profile")
    if icc:
        try:
            source_profile = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            target_profile = ImageCms.createProfile("sRGB")
            return ImageCms.profileToProfile(image, source_profile, target_profile, outputMode="RGB")
        except (ImageCms.PyCMSError, OSError):
            pass
    return image.convert("RGB")


def convert(source: Path, target: Path, *, max_long_side: int | None = None, max_width: int | None = None) -> None:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image = to_srgb(image)
        if max_long_side and max(image.size) > max_long_side:
            scale = max_long_side / max(image.size)
            image = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
        if max_width and image.width > max_width:
            scale = max_width / image.width
            image = image.resize((max_width, round(image.height * scale)), Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, "WEBP", quality=84, method=6, exact=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source_root", type=Path)
    parser.add_argument("project_root", type=Path)
    args = parser.parse_args()

    candidate_source = args.source_root / "Kandidáti jednotlivě"
    candidate_target = args.project_root / "public/images/candidates"
    team_target = args.project_root / "public/images/team"

    for source_name, target_name in CANDIDATES.items():
        convert(resolve_named_file(candidate_source, source_name), candidate_target / target_name, max_long_side=1600)
    for source_name, target_name in TEAM.items():
        convert(resolve_named_file(args.source_root, source_name), team_target / target_name, max_width=2400)


if __name__ == "__main__":
    main()
