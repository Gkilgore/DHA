from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable, Tuple
import xml.etree.ElementTree as ET

BASE_URL = "https://www.dhacontracting.com"
OUTPUT_PATH = Path("sitemap.xml")
ROOT_INDEX = Path("index.html")
EXCLUDE_DIRS = {"assets"}


def iter_html_files(root: Path) -> Iterable[Path]:
    for path in root.rglob("*.html"):
        if any(part in EXCLUDE_DIRS for part in path.parts):
            continue
        yield path


def url_entry(path: Path) -> Tuple[str, str]:
    lastmod = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    iso_lastmod = lastmod.isoformat(timespec="seconds")
    location = f"{BASE_URL}/{path.as_posix()}"
    return location, iso_lastmod


def build_sitemap(root: Path) -> ET.ElementTree:
    urlset = ET.Element(
        "urlset",
        {
            "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd",
        },
    )

    if ROOT_INDEX.exists():
        _, root_lastmod = url_entry(ROOT_INDEX)
        root_url = ET.SubElement(urlset, "url")
        ET.SubElement(root_url, "loc").text = f"{BASE_URL}/"
        ET.SubElement(root_url, "lastmod").text = root_lastmod

    for path in sorted(iter_html_files(root)):
        loc, lastmod = url_entry(path)
        url = ET.SubElement(urlset, "url")
        ET.SubElement(url, "loc").text = loc
        ET.SubElement(url, "lastmod").text = lastmod

    return ET.ElementTree(urlset)


def main() -> None:
    tree = build_sitemap(Path("."))
    ET.indent(tree, space="  ")
    tree.write(OUTPUT_PATH, encoding="utf-8", xml_declaration=True)


if __name__ == "__main__":
    main()
