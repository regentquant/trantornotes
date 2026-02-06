#!/usr/bin/env python3
"""
Convert EPUB files to plain text.

Behavior:
- Writes .txt next to each input EPUB (same basename).
- Tries to extract chapters in spine order using OPF metadata.
- Falls back to scanning HTML/XHTML files if metadata is incomplete.
- Uses only Python standard library.
"""

from __future__ import annotations

import argparse
import html
import os
import posixpath
import re
import sys
import zipfile
from html.parser import HTMLParser
from typing import Dict, Iterable, List, Optional, Tuple
import xml.etree.ElementTree as ET


BLOCK_TAGS = {
    "address",
    "article",
    "aside",
    "blockquote",
    "br",
    "caption",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hr",
    "li",
    "main",
    "nav",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
    "ul",
}


class HTMLTextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: List[str] = []
        self.skip_depth = 0

    def handle_starttag(self, tag: str, attrs) -> None:  # type: ignore[override]
        t = tag.lower()
        if t in {"script", "style", "svg", "math"}:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if t in BLOCK_TAGS:
            self.parts.append("\n")

    def handle_endtag(self, tag: str) -> None:  # type: ignore[override]
        t = tag.lower()
        if t in {"script", "style", "svg", "math"} and self.skip_depth:
            self.skip_depth -= 1
            return
        if self.skip_depth:
            return
        if t in BLOCK_TAGS:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:  # type: ignore[override]
        if self.skip_depth:
            return
        cleaned = data.replace("\xa0", " ")
        if cleaned.strip():
            self.parts.append(cleaned)
        elif "\n" in cleaned:
            self.parts.append("\n")

    def text(self) -> str:
        raw = "".join(self.parts)
        raw = html.unescape(raw)
        raw = raw.replace("\r\n", "\n").replace("\r", "\n")
        raw = re.sub(r"[ \t\f\v]+", " ", raw)
        raw = re.sub(r"\n{3,}", "\n\n", raw)
        return raw.strip() + "\n"


def _safe_read_text(zf: zipfile.ZipFile, name: str) -> Optional[str]:
    try:
        data = zf.read(name)
    except KeyError:
        return None

    for enc in ("utf-8", "utf-16", "cp1252", "latin-1"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="replace")


def _parse_container_for_opf(zf: zipfile.ZipFile) -> Optional[str]:
    container_name = "META-INF/container.xml"
    xml_text = _safe_read_text(zf, container_name)
    if not xml_text:
        return None
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return None

    for elem in root.iter():
        if elem.tag.endswith("rootfile"):
            opf_path = elem.attrib.get("full-path")
            if opf_path:
                return opf_path
    return None


def _parse_opf(zf: zipfile.ZipFile, opf_path: str) -> List[str]:
    xml_text = _safe_read_text(zf, opf_path)
    if not xml_text:
        return []

    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return []

    opf_dir = posixpath.dirname(opf_path)
    manifest: Dict[str, str] = {}
    spine_ids: List[str] = []

    for elem in root.iter():
        if elem.tag.endswith("item"):
            item_id = elem.attrib.get("id")
            href = elem.attrib.get("href")
            media = (elem.attrib.get("media-type") or "").lower()
            if item_id and href and (
                "html" in media or href.lower().endswith((".xhtml", ".html", ".htm"))
            ):
                manifest[item_id] = posixpath.normpath(posixpath.join(opf_dir, href))

    for elem in root.iter():
        if elem.tag.endswith("itemref"):
            idref = elem.attrib.get("idref")
            if idref:
                spine_ids.append(idref)

    ordered = [manifest[i] for i in spine_ids if i in manifest]
    return ordered


def _fallback_content_files(zf: zipfile.ZipFile) -> List[str]:
    names = [
        n
        for n in zf.namelist()
        if n.lower().endswith((".xhtml", ".html", ".htm"))
        and not n.lower().startswith(("meta-inf/", "mimetype"))
    ]
    return sorted(names)


def _extract_text_from_html(html_text: str) -> str:
    parser = HTMLTextExtractor()
    parser.feed(html_text)
    parser.close()
    return parser.text()


def epub_to_text(epub_path: str) -> Tuple[str, int]:
    if not zipfile.is_zipfile(epub_path):
        raise ValueError("Input is not a valid ZIP/EPUB file")

    output_path = os.path.splitext(epub_path)[0] + ".txt"
    section_count = 0
    sections: List[str] = []

    with zipfile.ZipFile(epub_path, "r") as zf:
        content_files: List[str] = []
        opf_path = _parse_container_for_opf(zf)
        if opf_path:
            content_files = _parse_opf(zf, opf_path)
        if not content_files:
            content_files = _fallback_content_files(zf)

        for name in content_files:
            html_text = _safe_read_text(zf, name)
            if not html_text:
                continue
            text = _extract_text_from_html(html_text).strip()
            if not text:
                continue
            sections.append(text)
            section_count += 1

    if not sections:
        raise RuntimeError("No readable HTML/XHTML content found in EPUB")

    joined = "\n\n".join(sections).strip() + "\n"
    with open(output_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(joined)

    return output_path, section_count


def convert_many(paths: Iterable[str]) -> int:
    failures = 0
    for path in paths:
        try:
            out, sections = epub_to_text(path)
            print(f"[OK] {path} -> {out} ({sections} sections)")
        except Exception as exc:  # noqa: BLE001
            failures += 1
            print(f"[ERR] {path}: {exc}", file=sys.stderr)
    return failures


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert EPUB files to TXT (same filename, .txt extension)."
    )
    parser.add_argument("epub_files", nargs="+", help="Path(s) to .epub file(s)")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    failures = convert_many(args.epub_files)
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
