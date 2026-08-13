#!/usr/bin/env python3
"""Build the editorial catalog for the supplied 2026 campaign sources."""

from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path


ROOT = Path("content-audit/01_rozbaleno")
EXTRACTED = Path("content-audit/02_extrakce/inventory.json")
OUTPUT = Path("content-audit/03_vystupy/03_inventar_a_kategorizace.csv")


def classify(source: str) -> dict[str, str]:
    name = Path(source).name
    lower = name.lower()
    defaults = {
        "content_category": "Důkazní dokument",
        "primary_pillar": "Dokumenty a důkazy",
        "secondary_pillars": "Vysvětlujeme",
        "topics": "historie obce; rozhodování zastupitelstva",
        "recommended_use": "Zdroj pro časovou osu, fact-check nebo přílohu článku",
        "priority": "P2",
        "sensitivity": "interní pracovní podklad",
        "verification": "Ověřit relevantní body, datum, usnesení a kontext před citací",
        "notes": "PDF zápisu; nepublikovat bez vysvětlujícího kontextu",
    }
    if "jednotliví kandidáti" in source.lower():
        return {
            **defaults,
            "content_category": "Kandidátský medailonek",
            "primary_pillar": "Lidé",
            "secondary_pillars": "",
            "topics": "kandidát; vztah k obci; zkušenost; motivace",
            "recommended_use": "Campaign HQ profil; SoMe medailonek; webový profil",
            "priority": "P0",
            "sensitivity": "autorizace kandidátem",
            "verification": "Potvrdit roli, délku praxe, claim a konkrétní výsledky",
            "notes": "Publikační redakce je v 01_medailonky_pro_socialni_site.md",
        }
    if lower.endswith("kontakty.xlsx"):
        return {
            **defaults,
            "content_category": "Interní kontaktní evidence",
            "primary_pillar": "Interní",
            "secondary_pillars": "",
            "topics": "pořadí kandidátky; kontakty",
            "recommended_use": "Pouze interní produkční koordinace",
            "priority": "P0",
            "sensitivity": "osobní údaje — neveřejné",
            "verification": "Ověřit souhlasy a aktuálnost; nepřenášet do veřejných dat",
            "notes": "Obsahuje e-maily a telefonní čísla kandidátů a podporovatelů",
        }
    if lower == "zelen.docx":
        return {
            **defaults,
            "content_category": "Tematický autorský podklad",
            "primary_pillar": "Hotová práce",
            "secondary_pillars": "Rozdělané věci; Plány; Dokumenty a důkazy",
            "topics": "zeleň; veřejný prostor; klima; údržba",
            "recommended_use": "Webový pilířový článek; carousel; projektové posty",
            "priority": "P0",
            "sensitivity": "běžná redakční kontrola",
            "verification": "Ověřit lokality, etapy, data, pasport a plán péče",
            "notes": "Silný pozitivní podklad; rozdělit na několik projektových příběhů",
        }
    if lower == "studie radnice.pdf":
        return {
            **defaults,
            "content_category": "Projektová studie",
            "primary_pillar": "Plány",
            "secondary_pillars": "Vysvětlujeme; Dokumenty a důkazy",
            "topics": "radnice; Horní náves; veřejný prostor; architektura",
            "recommended_use": "Webový článek; vizualizační carousel; dokumentový post",
            "priority": "P0",
            "sensitivity": "aktuálnost projektu",
            "verification": "Ověřit současný status, rozsah, rozpočet a návazné kroky",
            "notes": "Studie z 05/2024; částka 44,35 mil. Kč je historický hrubý odhad",
        }
    if lower == "volby 2026 lukeš rozvoj obce brzda.docx":
        return {
            **defaults,
            "content_category": "Tematický autorský podklad",
            "primary_pillar": "Vysvětlujeme",
            "secondary_pillars": "Plány; Dokumenty a důkazy",
            "topics": "development; územní plán; stavební uzávěra; kapacita obce",
            "recommended_use": "Zdroj pro neutrální, dokumentovaný webový článek a FAQ",
            "priority": "P1",
            "sensitivity": "politicky a právně citlivé",
            "verification": "Ověřit všechna čísla, právní status dokumentů a role aktérů",
            "notes": "Původní konfrontační tón nepoužívat; přepsat na vysvětlující časovou osu",
        }
    if lower == "dezinformace ods.docx":
        return {
            **defaults,
            "content_category": "Reakční / polemický podklad",
            "primary_pillar": "Vysvětlujeme",
            "secondary_pillars": "Dokumenty a důkazy",
            "topics": "fact-check; kanalizace; plynofikace; Bílá vrátka; škola; územní plán",
            "recommended_use": "Rozdělit do samostatných faktických karet a zdrojovaných článků",
            "priority": "P2",
            "sensitivity": "vysoké politické a reputační riziko",
            "verification": "Úplná faktická a právní kontrola; stáhnout všechny odkazované zdroje",
            "notes": "Název ani útočné formulace nepublikovat; jeden časový údaj zřejmě obsahuje překlep",
        }
    if lower == "hasiči - jak jsme o ně přišli.docx":
        return {
            **defaults,
            "content_category": "Historický tematický podklad",
            "primary_pillar": "Vysvětlujeme",
            "secondary_pillars": "Dokumenty a důkazy; Komunita",
            "topics": "SDH; jednotka obce; IZS; spolkový život; bezpečnost",
            "recommended_use": "Neutrální chronologie; FAQ o podmínkách případné obnovy",
            "priority": "P2",
            "sensitivity": "vysoké právní a reputační riziko",
            "verification": "Ověřit registry, usnesení, katastr, vybavení a aktuální legislativu s HZS",
            "notes": "Rozlišit spolek SDH a jednotku požární ochrany obce",
        }
    if lower == "úvodník.docx":
        return {
            **defaults,
            "content_category": "Kampaňový úvodník",
            "primary_pillar": "Plány",
            "secondary_pillars": "Hotová práce; Vysvětlujeme",
            "topics": "program; konkrétní závazky; historie práce",
            "recommended_use": "Webový úvod programu; připnutý SoMe rozcestník; úvodní video",
            "priority": "P1",
            "sensitivity": "redakční úprava",
            "verification": "Navázat na schválené priority, garanty a první kroky",
            "notes": "Přepsat pozitivně bez srovnávání s jinými subjekty",
        }
    if lower == "zasedání.docx":
        return {
            **defaults,
            "content_category": "Rešeršní rejstřík",
            "primary_pillar": "Dokumenty a důkazy",
            "secondary_pillars": "Vysvětlujeme",
            "topics": "Bílá vrátka; MŠ; obchod; restaurace; Czech POINT",
            "recommended_use": "Navigace do konkrétních zastupitelských zápisů",
            "priority": "P1",
            "sensitivity": "interní pracovní podklad",
            "verification": "Porovnat každý bod s originálním zápisem a usnesením",
            "notes": "Není samostatným důkazem; pouze seznam míst k dohledání",
        }
    if lower == "logo.jpg":
        return {
            **defaults,
            "content_category": "Starší vizuální asset",
            "primary_pillar": "Interní",
            "secondary_pillars": "",
            "topics": "logo",
            "recommended_use": "Archiv; nepoužívat místo schválených brand assetů",
            "priority": "P3",
            "sensitivity": "bez omezení",
            "verification": "Porovnat s aktuálním brand sheetem",
            "notes": "Campaign HQ má novou kanonickou sadu loga v public/images/brand",
        }
    if lower == "územní plán 2001.jpeg":
        return {
            **defaults,
            "content_category": "Důkazní obrazový dokument",
            "primary_pillar": "Dokumenty a důkazy",
            "secondary_pillars": "Vysvětlujeme",
            "topics": "územní plán; development; historie",
            "recommended_use": "Výřez do časové osy nebo porovnávací mapy",
            "priority": "P1",
            "sensitivity": "kontext a čitelnost",
            "verification": "Ověřit původ, úplnost, legendu, měřítko a právní status",
            "notes": "Obrazový soubor vyžaduje ruční vizuální revizi",
        }
    if "vyhláška 3-2001" in lower:
        return {
            **defaults,
            "content_category": "Právní / územně-plánovací dokument",
            "primary_pillar": "Dokumenty a důkazy",
            "secondary_pillars": "Vysvětlujeme",
            "topics": "územní plán; vyhláška; development",
            "recommended_use": "Primární zdroj pro článek o vývoji územního plánu",
            "priority": "P1",
            "sensitivity": "právní interpretace",
            "verification": "OCR/extrakce je minimální; vizuálně přečíst a ověřit účinnost i návazné změny",
            "notes": "Název souboru zřejmě obsahuje překlep „lánu“ místo „plánu“",
        }
    return defaults


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    inventory = json.loads(EXTRACTED.read_text(encoding="utf-8"))
    hashes: dict[str, list[str]] = {}
    for row in inventory:
        digest = sha256(Path(row["source"]))
        row["sha256"] = digest
        hashes.setdefault(digest, []).append(row["source"])

    fields = [
        "id", "source", "file", "type", "bytes", "pages", "words", "extraction_status",
        "content_category", "primary_pillar", "secondary_pillars", "topics", "recommended_use",
        "priority", "sensitivity", "verification", "duplicate_group", "notes", "sha256",
    ]
    rows = []
    for index, source_row in enumerate(inventory, 1):
        source = source_row["source"]
        digest = source_row["sha256"]
        classification = classify(source)
        duplicate_group = ""
        if len(hashes[digest]) > 1:
            duplicate_group = f"binary-{digest[:10]}"
        if Path(source).name in {"dx2b_zapis-6-2014-2.pdf", "dx2b_zapis-6-2014-3.pdf"}:
            duplicate_group = "same-text-dx2b-2014"
        rows.append({
            "id": f"SRC-{index:03d}",
            "source": source,
            "file": Path(source).name,
            "type": source_row["type"],
            "bytes": source_row["bytes"],
            "pages": source_row["pages"] or "",
            "words": source_row["words"],
            "extraction_status": source_row["status"],
            **classification,
            "duplicate_group": duplicate_group,
            "sha256": digest,
        })

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)
    print(json.dumps({"rows": len(rows), "output": str(OUTPUT)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
