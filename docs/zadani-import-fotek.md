# Zadání pro Codex / Codera: rozřazení a nahrání fotografií

## Cíl

Naimportuj dodané fotografie do projektu Přezletice 26, bezpečně je přejmenuj, optimalizuj pro web a napoj je do existujícího rozhraní. Zachovej zdrojové fotografie beze změny. Neprováděj žádné automatické rozpoznávání ani domýšlení identity osob; u portrétů je autoritativní název zdrojového souboru.

Zdrojová složka:

`/Users/giorgio/Desktop/přezletice pro Codex/`

Projekt:

`/Users/giorgio/Documents/Přezletice 26/`

## Inventář a rozřazení

### Kandidáti

Zkopíruj portréty do `public/images/candidates/` a použij následující názvy:

| Osoba | Zdroj | Cílový soubor |
|---|---|---|
| Jan Káňa | `Kandidáti jednotlivě/Jan Káňa.jpg` | `jan-kana.webp` |
| Jakub Tříska | `Kandidáti jednotlivě/Jakub Tříska.jpg` | `jakub-triska.webp` |
| Václav Šmerda | `Kandidáti jednotlivě/Václav Šmerda.jpg` | `vaclav-smerda.webp` |
| Břetislav Lukeš | `Kandidáti jednotlivě/Břetislav Lukeš.jpg` | `bretislav-lukes.webp` |
| Pavel Řeřucha | `Kandidáti jednotlivě/Pavel Řeřucha.jpg` | `pavel-rerucha.webp` |
| Tomáš Říha | `Kandidáti jednotlivě/Tomáš Říha.jpg` | `tomas-riha.webp` |
| Jan Macourek | `Kandidáti jednotlivě/Jan Macourek.jpg` | `jan-macourek.webp` |
| Lenka Brožová | `Kandidáti jednotlivě/Lenka Brožová.jpg` | `lenka-brozova.webp` |
| Vojta Brož | `Kandidáti jednotlivě/Vojta Brož.jpg` | `vojta-broz.webp` |
| Romana Bernardová | `Kandidáti jednotlivě/Romana Bernardová.jpg` | `romana-bernardova.webp` |
| Lenka Bulová | `Kandidáti jednotlivě/Lenka Bulová.jpg` | `lenka-bulova.webp` |

### Týmové a hlavní fotografie

Zkopíruj fotografie do `public/images/team/`:

| Zdroj | Obsah / doporučené použití | Cílový soubor |
|---|---|---|
| `2-oříznout.jpg` | hlavní týmová fotografie; doporučená pro hero, protože má čistou a vyváženou kompozici | `team-hero.webp` |
| `1.jpg` | širší týmová alternativa | `team-wide-01.webp` |
| `3.jpg` | týmová alternativa s viditelnými českou a evropskou vlajkou | `team-wide-02.webp` |
| `prapor1.jpg` | muž s praporem Přezleťáci; samostatný brandový/editorial snímek | `prezletaci-flag.webp` |

## Zpracování souborů

1. Zdrojové JPG pouze čti; nepřejmenovávej je, nepřesouvej a nepřepisuj.
2. Výstupy ukládej jako WebP v barevném prostoru sRGB a odstraň nepotřebná EXIF/GPS metadata.
3. Portréty připrav tak, aby dobře fungovaly v kartách s `object-fit: cover` a `object-position: center top`. Nevytvářej destruktivní ruční ořez originálu. Maximální delší strana 1600 px, kvalita přibližně 82–86.
4. Týmové fotografie: maximální šířka 2400 px, kvalita přibližně 82–86. Zachovej poměr stran.
5. Cílová velikost je orientačně do 350 kB na portrét a do 700 kB na týmový snímek. Pokud by limit viditelně poškodil obličeje nebo text na praporu, upřednostni kvalitu.
6. Názvy musí být ASCII, malými písmeny, bez mezer a diakritiky.

## Napojení do aplikace

1. V `app/page.tsx` rozšiř typ `Candidate` o pole `image` a doplň odpovídající cestu `/images/candidates/<soubor>`.
2. Nahraď 10 generických položek `Kandidát 02` až `Kandidát 11` skutečnými jmény z tabulky. Jan Macourek již existuje. Neměň ani nevymýšlej role, životopisy, citace nebo témata, pokud nejsou v projektu doložené; u chybějících textů ponech jasný stav „Čeká na text“.
3. Kandidátní karty musí zobrazovat fotografii. Iniciály ponech jako fallback pro chybějící nebo nenačtený obrázek.
4. `team-hero.webp` použij jako hlavní týmovou fotografii na vhodném místě dashboardu nebo sekce kandidátů. Ostatní skupinové snímky pouze zařaď do assetů, pokud pro ně zatím není přirozené místo; nevytvářej kvůli nim novou galerii bez zadání.
5. Doplň smysluplné české `alt` texty, například `Portrét – Jan Káňa`, `Tým Přezleťáků` a `Přezleťáci s týmovým praporem`.
6. Použij stávající vizuální styl projektu. Obrázky nesmí deformovat layout a karty musí zůstat použitelné na mobilu.

## Kontrola před dokončením

- Ověř, že existuje přesně 11 kandidátů a každý má přiřazen správný portrét.
- Zkontroluj diakritiku jmen v UI a ASCII názvy souborů na disku.
- Spusť build, lint a existující testy.
- Vizuálně zkontroluj desktop i mobil: obličeje nesmí být useknuté, obrázky nesmí být roztažené a layout nesmí poskakovat při načítání.
- Zkontroluj, že se do repozitáře nedostala `.DS_Store`, originální 112MB sada ani duplicitní JPG soubory.
- Na závěr vypiš změněné soubory, výsledné velikosti obrázků a případné položky, které vyžadují obsahové doplnění.

## Akceptační kritéria

- V repozitáři jsou pouze optimalizované webové varianty.
- Všechny cesty fungují i po produkčním buildu na case-sensitive filesystemu Cloudflare.
- Každá fotografie je přiřazena podle názvu zdrojového souboru, nikoli podle odhadu z obrazu.
- Aplikace projde buildem a zůstane responzivní.
- Chybějící biografie a role nejsou nahrazeny vymyšleným obsahem.
