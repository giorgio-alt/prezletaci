#!/usr/bin/env python3
"""Create a metadata-free, size-bounded JPEG copy of the campaign photo archive."""

from __future__ import annotations

import argparse
import io
import shutil
from pathlib import Path

from PIL import Image, ImageOps


SUPPORTED_IMAGES = {".jpg", ".jpeg"}
COPIED_FILES = {".csv"}


def encode_jpeg(image: Image.Image, quality: int) -> bytes:
    buffer = io.BytesIO()
    image.save(
        buffer,
        format="JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
        subsampling="4:2:0",
    )
    return buffer.getvalue()


def fit_under_limit(
    source: Path,
    max_bytes: int,
    max_dimension: int,
    min_quality: int,
    max_quality: int,
) -> tuple[bytes, tuple[int, int], int]:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")

    image.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)

    while True:
        low, high = min_quality, max_quality
        best: tuple[bytes, int] | None = None

        while low <= high:
            quality = (low + high) // 2
            encoded = encode_jpeg(image, quality)
            if len(encoded) <= max_bytes:
                best = (encoded, quality)
                low = quality + 1
            else:
                high = quality - 1

        if best is not None:
            return best[0], image.size, best[1]

        encoded = encode_jpeg(image, min_quality)
        scale = min(0.92, (max_bytes / len(encoded)) ** 0.5 * 0.96)
        next_size = (
            max(640, round(image.width * scale)),
            max(640, round(image.height * scale)),
        )
        if next_size == image.size:
            raise RuntimeError(f"Nelze dostat pod limit: {source}")
        image = image.resize(next_size, Image.Resampling.LANCZOS)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--max-bytes", type=int, default=950_000)
    parser.add_argument("--max-dimension", type=int, default=2400)
    parser.add_argument("--min-quality", type=int, default=55)
    parser.add_argument("--max-quality", type=int, default=88)
    args = parser.parse_args()

    image_count = 0
    copied_count = 0
    total_bytes = 0
    largest_bytes = 0

    for source in sorted(path for path in args.source.rglob("*") if path.is_file()):
        if source.name.startswith("."):
            continue

        relative = source.relative_to(args.source)
        destination = args.output / relative
        suffix = source.suffix.lower()

        if suffix in SUPPORTED_IMAGES:
            destination.parent.mkdir(parents=True, exist_ok=True)
            encoded, dimensions, quality = fit_under_limit(
                source,
                args.max_bytes,
                args.max_dimension,
                args.min_quality,
                args.max_quality,
            )
            destination.write_bytes(encoded)
            image_count += 1
            total_bytes += len(encoded)
            largest_bytes = max(largest_bytes, len(encoded))
            print(
                f"[{image_count:03d}] {relative} -> {len(encoded):,} B "
                f"({dimensions[0]}x{dimensions[1]}, q{quality})"
            )
        elif suffix in COPIED_FILES:
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, destination)
            copied_count += 1

    print(
        f"Hotovo: {image_count} fotografií, {copied_count} doprovodné soubory, "
        f"celkem {total_bytes:,} B, největší fotografie {largest_bytes:,} B."
    )


if __name__ == "__main__":
    main()
