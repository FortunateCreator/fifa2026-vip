#!/usr/bin/env python3
"""
Watermark Stripper — Nano Banana Pro Post-Processor
-----------------------------------------------------
Iterates through a specified media folder, reads each image,
crops out the bottom 5% (removing native tracking watermarks/logos),
and saves as pristine uncompressed JPEG.

Usage:
    python crop_watermark.py /path/to/media/folder
    python crop_watermark.py /path/to/media/folder --quality 98 --dry-run
"""

import argparse
import os
import sys
from pathlib import Path

from PIL import Image

SUPPORTED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff", ".tif"}


def crop_bottom_pct(image: Image.Image, percent: float = 5.0) -> Image.Image:
    """Crop away the bottom `percent` of the image."""
    width, height = image.size
    crop_height = int(height * (1 - percent / 100))
    return image.crop((0, 0, width, crop_height))


def process_file(filepath: Path, quality: int, dry_run: bool = False) -> Path | None:
    """Process a single image file. Returns the output path or None on failure."""
    try:
        img = Image.open(filepath).convert("RGB")
    except Exception as exc:
        print(f"  [SKIP] Cannot open {filepath.name}: {exc}", file=sys.stderr)
        return None

    cropped = crop_bottom_pct(img)

    # Build output path — always JPEG
    stem = filepath.stem
    parent = filepath.parent
    # Avoid overwriting an input file if it's already .jpg
    suffix = ".jpg"
    if filepath.suffix.lower() in (".jpg", ".jpeg"):
        output_path = parent / f"{stem}_cropped.jpg"
    else:
        output_path = parent / f"{stem}.jpg"

    if dry_run:
        orig_size = filepath.stat().st_size
        preview = cropped.resize((200, 150), Image.LANCZOS)
        print(f"  [DRY-RUN] {filepath.name} ({orig_size / 1024:.1f} kB) "
              f"-> {output_path.name} [{cropped.width}×{cropped.height}]")
        return output_path

    cropped.save(output_path, "JPEG", quality=quality, optimize=True)
    new_size = output_path.stat().st_size
    print(f"  [OK] {filepath.name} -> {output_path.name} "
          f"({new_size / 1024:.1f} kB, {cropped.width}×{cropped.height})")
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Crop bottom 5%% from generated images (watermark/logos)."
    )
    parser.add_argument(
        "folder",
        type=str,
        help="Path to the media output folder containing generated images.",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=95,
        help="Output JPEG quality (1–100, default: 95).",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview what would be cropped without writing files.",
    )
    args = parser.parse_args()

    folder = Path(args.folder).expanduser().resolve()
    if not folder.is_dir():
        print(f"Error: '{folder}' is not a valid directory.", file=sys.stderr)
        sys.exit(1)

    image_files = sorted(
        p for p in folder.iterdir()
        if p.is_file() and p.suffix.lower() in SUPPORTED_EXTENSIONS
    )

    if not image_files:
        print(f"No supported images found in {folder}")
        print(f"Supported: {', '.join(sorted(SUPPORTED_EXTENSIONS))}")
        sys.exit(0)

    label = "Dry-run" if args.dry_run else "Processing"
    print(f"{label} {len(image_files)} image(s) in {folder} …\n")

    processed = 0
    for fpath in image_files:
        result = process_file(fpath, args.quality, args.dry_run)
        if result:
            processed += 1

    action = "would be" if args.dry_run else "were"
    print(f"\nDone. {processed}/{len(image_files)} assets {action} cropped.")


if __name__ == "__main__":
    main()
