export type ArticleContent = {
  slug: string;
  title: string;
  status: "copy-ke-schvaleni";
  pillar: string;
  summary: string;
  perex: string;
  body: { heading: string; paragraphs: string[] }[];
  socialCopy: string;
  carousel: string[];
  cta: string;
  markdownPath: string;
  primaryImage: string;
  galleryImages: string[];
  projectIds: number[];
  socialPostIds: number[];
  sourceLinks: string[];
  checks: string[];
};

export const articleContent: ArticleContent[] = [
  {
    slug: "zelen-v-prezleticich",
    title: "Jak se staráme o zeleň v Přezleticích",
    status: "copy-ke-schvaleni",
    pillar: "Hotová práce + Rozdělané věci + Plány",
    summary: "Publikovatelný článek o zeleni jako systému: průtahové komunikace, místní ulice, podzemní kontejnery, komunitní centrum a dlouhodobá péče.",
    perex: "Zeleň v obci není jen otázka toho, kde se něco zasadí. Je to dlouhodobá práce s místem, vodou, stínem, údržbou i tím, jak lidé ulicemi každý den procházejí. V Přezleticích proto zeleň řešíme postupně: u průtahových komunikací, v rekonstruovaných ulicích, u podzemních kontejnerů i u komunitního centra.",
    body: [
      {
        heading: "Proč o zeleni přemýšlíme jako o systému",
        paragraphs: [
          "Když se mluví o obecní zeleni, často se jako první vybaví trávník. Jenže v uličním prostoru není trávník vždy nejlepší řešení. Malé rozdělené plochy mezi komunikací, parkováním, vjezdy a chodníky se obtížně udržují. V létě rychle vysychají a místo zeleného pásu z nich často vznikne suchá žlutohnědá plocha.",
          "Proto v Přezleticích u části ulic volíme jiný přístup: zapojené keřové výsadby, trvalky, traviny a mulčovací materiál. Nejde o dekoraci. Jde o řešení, které lépe snáší horko, méně zatěžuje údržbu a zároveň dokáže ulici opticky zklidnit.",
        ],
      },
      {
        heading: "Zeleň u průtahových komunikací",
        paragraphs: [
          "Podél frekventovaných tahů má zeleň ještě jednu důležitou roli. Pomáhá tlumit prašnost, zlepšuje mikroklima a vytváří izolační prvek mezi dopravou a místy, kde lidé bydlí nebo se pohybují.",
          "U průtahových komunikací proto obec pracuje se systematickou výsadbou a obnovou vegetace. Cílem je využít i menší plochy, které nejsou vhodné pro běžný trávník, ale mohou dobře fungovat jako souvislá výsadba keřů a trvalek.",
          "Ne vždy se dá vysadit všechno, co by vypadalo dobře na papíře. V první etapě se například nepodařilo vysadit stromy podle původní projektové dokumentace kvůli inženýrským sítím. To je přesně typ omezení, který u veřejného prostoru není vidět na první pohled, ale rozhoduje o výsledku. Kde stromy ustoupily nutným stavebním pracím, počítá se s náhradní výsadbou v navazující etapě.",
        ],
      },
      {
        heading: "Proč nejsou všude trávníky",
        paragraphs: [
          "Při rekonstrukci místních komunikací se vždy hledá rovnováha mezi samotnou vozovkou, parkovacími stáními, vjezdy k domům, bezpečným pohybem lidí a zelení. Ve starší i nové zástavbě často nezbývají velké souvislé pásy, ale menší ostrůvky a dělené plochy.",
          "Udržovat taková místa jako klasický trávník je náročné a často neefektivní. Sekání je složité, technika se mezi překážkami pohybuje obtížně a v suchých obdobích trávník rychle ztrácí funkci i vzhled.",
          "Trvalkovo-travinné záhony a zapojené keřové výsadby dávají v takových místech větší smysl. V kombinaci se stromy pomáhají vytvořit příjemnější průchod i průjezd ulicí. V Přezleticích už tento typ výsadby funguje například v ulicích Kaštanová, Akátová, Jiřinková a Javorová. Jejich výhoda není jen praktická. Od jara do podzimu se proměňují, postupně kvetou a dávají ulicím přirozenější rytmus.",
        ],
      },
      {
        heading: "I technická místa mohou vypadat lépe",
        paragraphs: [
          "Zeleň nepatří jen do parků. Důležitá je i tam, kde běžně řešíme technické věci: odpady, kontejnery, dopravní plochy nebo vstupy do veřejných budov.",
          "Příkladem jsou místa u podzemních kontejnerů. Tříděný odpad je běžnou součástí života obce, ale klasická kontejnerová stání často působí rušivě. Tam, kde se podařilo původní kontejnery nahradit podzemními, například v Nohavici a na Zlatém kopci, má smysl dotvořit i okolní prostor. Výsadba pomáhá technické prvky částečně skrýt a místo působí upraveněji.",
          "Podobně funguje zeleň před komunitním centrem. Není to jen předprostor budovy. Je to místo pro setkávání, odpočinek a obecní akce. Stromy, kvetoucí trvalky a vánoční strom zde nevytvářejí pouze kulisu. Pomáhají tomu, aby prostor lidé vnímali jako přirozenou součást života obce.",
        ],
      },
      {
        heading: "Péče nekončí výsadbou",
        paragraphs: [
          "Nejdůležitější část práce se zelení začíná až po výsadbě. Strom nebo záhon nestačí založit. Musí mít následnou péči, jasný režim údržby a průběžnou kontrolu.",
          "Moderní obecní zeleň proto potřebuje dobrý přehled o tom, co kde roste, v jakém je to stavu a jakou péči to vyžaduje. K tomu slouží pasport zeleně a navazující plán péče. Ty pomáhají rozhodovat, kde je nutná pravidelná údržba, kde má smysl méně časté sečení kvůli zadržování vláhy a biodiverzitě, a kde je třeba odborný zásah kvůli bezpečnosti stromů.",
          "Zároveň platí jednoduché pravidlo: stávající zdravé stromy mají hodnotu. Kácení má být až poslední možností tam, kde je důvodem bezpečnost, nutná stavba nebo jiná věcná překážka. Pokud ke kácení dojít musí, má následovat odpovídající náhradní výsadba.",
        ],
      },
      {
        heading: "Co bude další krok",
        paragraphs: [
          "Zeleň v Přezleticích chceme dál řešit jako systém, ne jako nahodilé dosazování prázdných míst. To znamená dokončit přehled o stavu zeleně, nastavit plán následné péče, pokračovat v ozelenění jednotlivých částí obce a hlídat, aby zeleň byla pevnou součástí nových projektů.",
          "Dobře udržovaná zeleň není jen hezčí obec. Je to stín v létě, méně prachu, příjemnější ulice, lepší hospodaření s vodou a veřejný prostor, ve kterém se lidem lépe žije.",
        ],
      },
    ],
    socialCopy: "Zeleň v obci není jen otázka výsadby. Je to práce s místem, vodou, stínem i dlouhodobou údržbou. Proto v Přezleticích řešíme zeleň postupně: u průtahových komunikací, v rekonstruovaných ulicích, u podzemních kontejnerů i u komunitního centra. Někde dává smysl strom, jinde trvalky a keře, jinde hlavně dobrý plán péče. Důležité je, aby zeleň nebyla dekorace, ale funkční součást obce.",
    carousel: ["Zeleň není dekorace.", "U průtahů pomáhá s prachem a mikroklimatem.", "V malých uličních plochách často trávník nedává smysl.", "Trvalky a keře lépe snášejí horko a složitou údržbu.", "Technická místa, třeba kontejnery, mohou vypadat lépe.", "Nejdůležitější práce začíná po výsadbě: péče, kontrola, plán.", "Chceme zeleň řešit jako systém, ne nahodile."],
    cta: "Podívejte se, kde už zeleň v Přezleticích funguje a co připravujeme dál.",
    markdownPath: "content/articles/zelen-v-prezleticich.md",
    primaryImage: "/images/projects/zelen-mistni-komunikace.webp",
    galleryImages: [
      "/images/projects/zelen-prutahove-komunikace.webp",
      "/images/projects/zelen-podzemni-kontejnery.webp",
      "/images/projects/hruskove-aleje-a-dalsi-zelen.webp",
      "/images/projects/dalsi-lokalni-zelen.webp",
      "/images/projects/komunitni-centrum-zlatak.webp",
    ],
    projectIds: [19, 20, 23, 24, 25, 34],
    socialPostIds: [140],
    sourceLinks: [
      "content/articles/zelen-v-prezleticich.md",
      "content-audit/03_vystupy/05_hotove_clanky_zelen_radnice.md",
      "TK2603-0192/zelen.docx",
    ],
    checks: [
      "Ověřit přesné označení etap u průtahových komunikací.",
      "Ověřit formulaci „šest let“ u trvalkovo-travinných záhonů.",
      "Potvrdit aktuální stav pasportu zeleně a plánu péče.",
    ],
  },
  {
    slug: "nova-radnice-centrum-obce",
    title: "Nová radnice jako nové centrum obce",
    status: "copy-ke-schvaleni",
    pillar: "Plány + Vysvětlujeme + Dokumenty a důkazy",
    summary: "Publikovatelný článek o architektonickém konceptu nové radnice jako propojení Horní návsi, prostoru Na Rynku, Dolní návsi a budoucího společenského centra.",
    perex: "Nová radnice nemá být jen další obecní budova. Architektonický koncept z května 2024 ji popisuje jako příležitost znovu oživit centrum Přezletic, propojit Horní a Dolní náves a vytvořit místo, které bude sloužit úřadu, veřejným akcím i každodennímu setkávání lidí.",
    body: [
      {
        heading: "Proč nejde jen o kanceláře",
        paragraphs: [
          "Když obec připravuje novou radnici, může se snadno stát, že se debata zúží na kanceláře, metry čtvereční a cenu stavby. To všechno je samozřejmě důležité. Ale u Přezletic je podstatná ještě jedna věc: nová radnice může pomoci vrátit život do středu obce.",
          "Historické jádro Přezletic stojí mezi dvěma veřejnými prostory: Horní a Dolní návsí. Dolní náves si dodnes drží svůj charakter. Horní náves, která dříve ležela na jedné z hlavních tras procházejících obcí, část svého významu ztratila. Architektonický koncept nové radnice proto neřeší jen samotnou budovu, ale širší vztah míst, kterými lidé procházejí a kde se mohou potkávat.",
        ],
      },
      {
        heading: "Nejen úřad, ale místo pro lidi",
        paragraphs: [
          "Hlavní myšlenka návrhu je jednoduchá: radnice nemá být uzavřená kancelářská budova. Má být součástí veřejného prostoru. Má pomoci vytvořit důstojné, živé a přívětivé centrum pro obec, která roste a potřebuje tomu přizpůsobit i své služby.",
          "Koncept počítá s tím, že v centru budou společně fungovat tři objekty: nová budova radnice, původní obecní úřad a budoucí společenské centrum v prostoru bývalé sokolovny. Smyslem není stavět všechno znovu a co největší. Naopak: návrh pracuje s tím, co už obec má, a rozděluje funkce tak, aby se nové objemy minimalizovaly a stávající budovy dávaly dál smysl.",
        ],
      },
      {
        heading: "Propojit Horní a Dolní náves",
        paragraphs: [
          "Důležitou součástí návrhu je nový veřejný prostor nazvaný Na Rynku. Ten má vzniknout mezi ulicemi Veleňská a V Uličce a propojit Horní a Dolní náves přirozenější pěší trasou.",
          "Dnes je pohyb mezi těmito částmi centra omezený a ne vždy důstojný nebo pohodlný. Návrh počítá s tím, že ulice V Uličce získá význam bezpečnější pěší zóny. Lidé by se tak mohli pohybovat z Dolní návsi kolem obecních budov přes prostor Na Rynku až ke společenskému centru.",
          "To je pro obec důležité nejen ve všední den, ale i při akcích. Prostor Na Rynku může do budoucna převzít část veřejného života, který dnes musí hledat náhradní místa: trhy, posvícenská setkání, rozsvícení vánočního stromku, výstavy nebo obyčejné sousedské potkávání.",
        ],
      },
      {
        heading: "Tři principy návrhu",
        paragraphs: [
          "Architektonický koncept stojí na třech slovech: otevřenost, řád a efektivita.",
          "Otevřenost znamená, že budova nemá mít jednu přední a jednu zadní stranu. Má komunikovat se všemi směry, zapojit se do veřejného prostoru a nabídnout přímý vztah mezi úřadem a lidmi. V návrhu se to projevuje například průchodem budovou a viditelností důležitých částí, jako je zasedací místnost, knihovna nebo podatelna.",
          "Řád znamená jednoduchou a srozumitelnou stavbu. Čistá dispozice, logické členění a návaznost na okolní zástavbu nejsou jen estetická věc. U veřejné budovy pomáhají tomu, aby se v ní lidé snadno orientovali a aby úřad fungoval přehledně.",
          "Efektivita má praktický význam. Jednoduchý tvar budovy může snížit provozní náklady, lépe pracovat s energiemi a umožnit variabilitu do budoucna. Koncept také počítá s tím, že některé části mohou být dokončovány podle aktuální potřeby obce, aniž by to omezilo provoz úřadu.",
        ],
      },
      {
        heading: "Etapizace a využití stávajících budov",
        paragraphs: [
          "Projekt je navržen tak, aby obec nemusela všechno řešit jedním obřím krokem. U nové budovy radnice studie doporučuje postavit základní objem jako celek, protože pozdější stavební zásahy by ji mohly zbytečně prodražovat. V první fázi by se ale využila jen část budovy a zbývající prostory by mohly být dokončovány postupně.",
          "Původní obecní úřad má zároveň dál plnit svou roli. Některé funkce, například archiv nebo přechodné kanceláře, mohou zůstat ve stávajících prostorách. Do budoucna se pak může řešit rekonstrukce celé části podle potřeb obce.",
          "Tento přístup je důležitý: obec neroste jen počtem obyvatel, ale i nároky na služby. Nová radnice proto nemá být jednorázové gesto. Má být základ pro postupný, rozumný rozvoj obecního centra.",
        ],
      },
      {
        heading: "Co studie říká a co ještě není finální",
        paragraphs: [
          "Architektonický koncept z května 2024 pracuje s hrubou podlažní plochou nové budovy přibližně 985 m² a navrhuje 18 parkovacích stání. Obsahuje také historický hrubý odhad stavebních nákladů ve výši 44,35 milionu Kč, včetně venkovních úprav, ale bez nákladů na demolice.",
          "Je důležité říct fér věc: tato částka není aktuální rozpočet stavby. Je to odhad ze studie, který se bude muset ověřit podle další projektové přípravy, stavebního trhu, technického řešení a návazných kroků.",
          "Právě proto má smysl o projektu mluvit otevřeně a průběžně. Ne slibovat hotovou stavbu bez kontextu, ale ukazovat, jaký problém obec řeší, jaký návrh je na stole, co dává smysl a co je potřeba ještě ověřit.",
        ],
      },
      {
        heading: "Co je další krok",
        paragraphs: [
          "Nová radnice je příležitost vytvořit centrum obce, které nebude jen administrativní. Může propojit úřad, knihovnu, veřejné akce, společenské centrum a každodenní pohyb lidí mezi oběma návesními prostory.",
          "Dobrá obecní budova nemá být symbolem sama pro sebe. Má zjednodušit služby, otevřít úřad lidem a vytvořit místo, kam se dá přirozeně přijít. Právě tak chceme o nové radnici uvažovat: jako o praktickém kroku pro fungující obec a živější centrum Přezletic.",
        ],
      },
    ],
    socialCopy: "Nová radnice nemá být jen další budova s kancelářemi. Architektonický koncept z května 2024 ji chápe jako příležitost znovu oživit centrum Přezletic: propojit Horní a Dolní náves, vytvořit prostor Na Rynku a lépe navázat nový úřad, původní radnici a budoucí společenské centrum. Důležité pro nás je mluvit o projektu otevřeně: co studie navrhuje, co dává smysl a co je potřeba dál ověřit.",
    carousel: ["Radnice není jen kancelář.", "Může znovu oživit centrum obce.", "Návrh propojuje Horní a Dolní náves.", "Prostor Na Rynku má být místem pro akce i běžné setkávání.", "Nová budova má fungovat s původním úřadem a budoucím společenským centrem.", "Tři principy návrhu: otevřenost, řád, efektivita.", "Studie je začátek debaty, ne konečný rozpočet."],
    cta: "Přečtěte si, co koncept nové radnice navrhuje a proč nejde jen o novou budovu.",
    markdownPath: "content/articles/nova-radnice-centrum-obce.md",
    primaryImage: "/images/projects/rekonstrukce-sokolovny.webp",
    galleryImages: [
      "/images/projects/komunitni-centrum-zlatak.webp",
      "/images/projects/elektronicka-uredni-deska.webp",
      "/images/projects/kaplicka-a-zvon.webp",
      "/images/brand/social/prezletaci-social-yellow.png",
    ],
    projectIds: [16, 34, 35, 3],
    socialPostIds: [141],
    sourceLinks: [
      "content/articles/nova-radnice-centrum-obce.md",
      "content-audit/03_vystupy/05_hotove_clanky_zelen_radnice.md",
      "TK2603-0192/Studie radnice.pdf",
    ],
    checks: [
      "Ověřit aktuální stav projektu a návazné kroky po architektonickém konceptu z 05/2024.",
      "Potvrdit, zda stále platí pracovní hodnoty 985 m² a 18 parkovacích stání.",
      "U částky 44,35 mil. Kč vždy uvádět, že jde o historický hrubý odhad ze studie.",
    ],
  },
  {
    slug: "kapacita-skol-a-skolek",
    title: "Jak vznikala kapacita škol a školek",
    status: "copy-ke-schvaleni",
    pillar: "Hotová práce + Rozdělané věci + Vysvětlování",
    summary: "Publikovatelný článek o tom, proč školní a předškolní kapacita nevzniká jedním rozhodnutím, ale kombinací spolupráce, projektů, financování a navazujících kroků.",
    perex: "Kapacita škol a školek je jedno z témat, které se lidí dotýká nejvíc. Zvenku může působit jednoduše: dětí přibývá, tak postavme další třídu. Ve skutečnosti jde o dlouhou práci s pozemky, projektem, financováním, svazkem obcí, stavebními kroky a provozem. Proto má smysl ukazovat nejen výsledek, ale i cestu, která k němu vede.",
    body: [
      {
        heading: "Výchozí problém",
        paragraphs: [
          "Přezletice jsou rostoucí obec. S novou výstavbou a mladými rodinami přirozeně roste tlak na kapacity školky, školy, jídelny i návazných služeb. Obec v takové situaci nemůže reagovat jen improvizací. Potřebuje hledat řešení, které vydrží déle než jedno volební období.",
          "U školství navíc platí, že každé rozhodnutí má několik vrstev. Nestačí mít politickou vůli. Je potřeba mít jasné kompetence, projekt, financování, soulad s okolními obcemi a provozní model, který zvládne každodenní realitu.",
        ],
      },
      {
        heading: "Proč svazkové řešení",
        paragraphs: [
          "U základní školy dává v našem území smysl spolupráce více obcí. Svazkové řešení není zkratka, ale způsob, jak se dostat k větší kapacitě a rozdělit odpovědnost mezi obce, kterých se problém týká.",
          "Taková spolupráce je náročnější na koordinaci, ale má jednu zásadní výhodu: řeší školu jako službu pro celé spádové území. To je fér vůči rodičům i vůči obecním rozpočtům.",
        ],
      },
      {
        heading: "Co se podařilo a co navazuje",
        paragraphs: [
          "V Přezleticích už je za námi kus práce: školka, školní jídelna, výdejní systém i projekty spojené se svazkovou školou patří mezi témata, na která se dá navazovat. Zároveň ale platí, že hotová jedna etapa neznamená vyřešený problém navždy.",
          "Potřeby se mění s počtem obyvatel, věkovou strukturou i s tím, jak se rozvíjí okolní obce. Proto je důležité kapacitu nejen vybudovat, ale průběžně sledovat a připravovat další kroky včas.",
        ],
      },
      {
        heading: "Proč rozšíření trvá",
        paragraphs: [
          "Když se připravuje rozšíření kapacity školy, nejde jen o stavební práce. Před nimi stojí projektová příprava, povolení, dohody mezi partnery, financování a návaznost na provoz stávající školy. Každý z těchto kroků může ovlivnit harmonogram.",
          "Právě proto nechceme v komunikaci slibovat rychlá řešení bez kontextu. Lepší je říkat otevřeně, kde projekt stojí, co už je hotové, kdo rozhoduje o dalším kroku a co může obec reálně ovlivnit.",
        ],
      },
      {
        heading: "Co bude další krok",
        paragraphs: [
          "Naším cílem je držet školní a předškolní kapacitu jako jednu z priorit obce. To znamená pokračovat ve spolupráci se svazkem, hlídat projektovou přípravu, pracovat s aktuálními daty o počtu dětí a včas vysvětlovat, proč jednotlivé kroky trvají.",
          "Školy a školky nejsou jen budovy. Jsou to služby, které rozhodují o každodenním životě rodin. Proto k nim chceme přistupovat prakticky, bez zjednodušování a s důrazem na dlouhodobou odpovědnost.",
        ],
      },
    ],
    socialCopy: "Kapacita škol a školek nevzniká jedním rozhodnutím. Je za ní projektová příprava, financování, spolupráce obcí, provozní realita i dlouhodobé plánování. Proto u školy nechceme slibovat zkratky. Chceme lidem srozumitelně ukazovat, co už se podařilo, kde projekt stojí a jaký je další krok.",
    carousel: ["Školní kapacita není jeden podpis.", "Rostoucí obec potřebuje řešení na víc než jedno období.", "Svazková škola znamená spolupráci obcí.", "Hotová etapa neznamená, že problém zmizí navždy.", "Rozšíření ovlivňuje projekt, povolení, peníze i provoz.", "Budeme ukazovat stav, kompetence a další krok."],
    cta: "Přečtěte si, proč školní kapacita vyžaduje dlouhodobou práci a co chceme dotahovat dál.",
    markdownPath: "content/articles/kapacita-skol-a-skolek.md",
    primaryImage: "/images/projects/rozsireni-kapacity-svazkove-skoly.webp",
    galleryImages: [
      "/images/projects/druhy-pavilon-ms.webp",
      "/images/projects/zahrada-ms.webp",
      "/images/projects/vydejni-automaty-stravovani.webp",
    ],
    projectIds: [7, 21, 22],
    socialPostIds: [106, 115],
    sourceLinks: [
      "content/articles/kapacita-skol-a-skolek.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
    ],
    checks: [
      "Doplnit přesná kapacitní čísla školy, školky a jídelny až po potvrzení zdrojem.",
      "Ověřit aktuální stav rozšíření svazkové školy a odpovědnosti jednotlivých partnerů.",
      "Před publikací zkontrolovat všechny formulace k termínům a financování.",
    ],
  },
  {
    slug: "rozvoj-obce-a-uzemni-plan",
    title: "Kolik rozvoje Přezletice unesou",
    status: "copy-ke-schvaleni",
    pillar: "Plány + Vysvětlování + Dokumenty a důkazy",
    summary: "Publikovatelný článek o rozumném rozvoji obce, limitech územního plánování a tom, co obec může a nemůže ovlivnit při nové výstavbě.",
    perex: "Rozvoj obce není jen otázka toho, jestli někde vzniknou nové domy. Je to otázka dopravy, školy, vody, kanalizace, veřejného prostoru, služeb i sousedských vztahů. Proto je fér mluvit o developmentu věcně: co obec může ovlivnit, kde má limity a proč je územní plán jeden z nejdůležitějších nástrojů.",
    body: [
      {
        heading: "Rozvoj není jen počet domů",
        paragraphs: [
          "Když se v obci mluví o nové výstavbě, debata se často rychle rozdělí na jednoduché ano nebo ne. Jenže skutečná otázka je složitější: jaký rozvoj obec unese, za jakých podmínek a s jakými dopady na každodenní život lidí.",
          "Každý nový projekt znamená nejen nové obyvatele, ale také větší nároky na dopravu, školu, školku, odpady, vodu, kanalizaci, zeleň, parkování a služby. Pokud se tyto věci neřeší dohromady, obec na růst doplácí.",
        ],
      },
      {
        heading: "Co může obec ovlivnit",
        paragraphs: [
          "Obec má několik nástrojů. Může pracovat s územním plánem, stanovovat podmínky pro konkrétní území, jednat s investory o veřejné infrastruktuře, využívat smlouvy a hlídat návaznost projektů na kapacity obce.",
          "Zároveň je důležité říct i druhou část: obec nemůže libovolně zastavit všechno, co se někomu nelíbí. Rozhoduje v právním rámci, podle platných dokumentů a postupů. Právě proto je důležité mít pravidla připravená včas.",
        ],
      },
      {
        heading: "Územní plán jako brzda i kompas",
        paragraphs: [
          "Územní plán není technický papír pro úředníky. Je to dohoda o tom, kde se obec může rozvíjet, kde ne, jaké funkce kam patří a jaké podmínky mají nová území splnit.",
          "Dobře nastavený územní plán umí růst obce zpomalit, zpřehlednit a podmínit dopravou, zelení nebo občanskou vybaveností. Špatně nebo pozdě řešený plán naopak nechává obci menší prostor k vyjednávání.",
        ],
      },
      {
        heading: "Proč nestačí heslo proti developerům",
        paragraphs: [
          "V kampani se dá snadno říct, že obec musí být proti developerům. Jenže takové heslo samo o sobě nic neřeší. Důležité je mít konkrétní pravidla, dokumenty, vyjednávací pozici a schopnost rozlišit mezi rozumným rozvojem a tlakem, který obecní infrastruktura neunese.",
          "Naším cílem není vést debatu přes nálepky. Chceme vysvětlovat, kde jsou rizika, co se dá právně ovlivnit a jaké kroky mají skutečný dopad.",
        ],
      },
      {
        heading: "Co budeme dělat dál",
        paragraphs: [
          "Chceme držet tempo rozvoje obce tak, aby odpovídalo infrastruktuře a kvalitě života. To znamená průběžně pracovat s územním plánem, zveřejňovat srozumitelné informace, posilovat vyjednávací pozici obce a nenechávat klíčová rozhodnutí na poslední chvíli.",
          "Přezletice se vyvíjejí. Otázka není, zda se vývoj dá úplně zastavit. Otázka je, jestli ho obec zvládne řídit tak, aby zůstal obyvatelný, férový a dlouhodobě udržitelný.",
        ],
      },
    ],
    socialCopy: "Kolik rozvoje Přezletice unesou? To není otázka proti nebo pro nové domy. Je to otázka dopravy, školy, vody, kanalizace, zeleně, služeb a pravidel. Obec má nástroje, ale musí je používat včas: územní plán, podmínky pro území, jednání s investory a férové vysvětlování dopadů. Chceme rozvoj řídit tak, aby obec zůstala dobře obyvatelná.",
    carousel: ["Rozvoj není jen počet domů.", "Každý projekt má dopad na dopravu, školu i služby.", "Obec má nástroje, ale ne neomezenou moc.", "Územní plán je brzda i kompas.", "Hesla proti developerům nestačí.", "Důležitá jsou pravidla, dokumenty a včasné kroky.", "Cíl: rozumný rozvoj, který obec unese."],
    cta: "Přečtěte si, co obec může ovlivnit a proč je územní plán pro Přezletice zásadní.",
    markdownPath: "content/articles/rozvoj-obce-a-uzemni-plan.md",
    primaryImage: "/images/projects/rekonstrukce-mistnich-komunikaci.webp",
    galleryImages: [
      "/images/projects/rekonstrukce-prutahovych-komunikaci.webp",
      "/images/projects/zelen-mistni-komunikace.webp",
      "/images/projects/lavka-a-verejne-plochy-zlaty-kopec.webp",
    ],
    projectIds: [8, 9, 20, 33],
    socialPostIds: [121, 123],
    sourceLinks: [
      "content/articles/rozvoj-obce-a-uzemni-plan.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
    ],
    checks: [
      "Před publikací doplnit konkrétní odkazy na platné územně plánovací dokumenty.",
      "Ověřit aktuální právní stav případných uzávěr, změn územního plánu a developerských smluv.",
      "Nepoužívat neověřená číselná tvrzení o počtech bytů, domů nebo obyvatel.",
    ],
  },
  {
    slug: "bila-vratka-pozemek-skola",
    title: "Bílá vrátka: pozemek, škola a rozhodnutí v čase",
    status: "copy-ke-schvaleni",
    pillar: "Vysvětlování + Dokumenty a důkazy",
    summary: "Publikovatelný článek ve formě opatrné časové osy k citlivému tématu Bílých vrátek, pozemků a rozhodování o škole.",
    perex: "U citlivých obecních témat pomáhá jedna věc: dát vedle sebe čas, dokumenty a rozhodnutí. Ne proto, aby se hledal viník za každou cenu, ale aby lidé rozuměli, co se stalo, kdy se to stalo a jaké možnosti obec v dané chvíli měla.",
    body: [
      {
        heading: "Proč se k tématu vracíme",
        paragraphs: [
          "Bílá vrátka patří mezi témata, která v Přezleticích vyvolávají otázky i emoce. Je to pochopitelné. Dotýká se pozemků, školy, rozvoje obce a rozhodnutí, která mají dopady na mnoho let.",
          "Právě proto nechceme téma zjednodušovat do jedné věty. Chceme ho popsat tak, aby bylo jasné, které informace jsou doložené dokumenty, které jsou interpretací a co je potřeba ještě ověřit.",
        ],
      },
      {
        heading: "Časová osa místo nálepek",
        paragraphs: [
          "Nejužitečnější forma je časová osa. Ta by měla ukázat klíčové kroky: jaký pozemek byl ve hře, jaké rozhodnutí se projednávalo, kdo měl jakou kompetenci, co bylo v dokumentech a jaký byl další dopad na školu nebo rozvoj obce.",
          "Časová osa pomáhá oddělit fakta od dojmů. Pokud se v kampani objeví silné tvrzení, musí být možné se podívat na dokument a ověřit, z čeho vychází.",
        ],
      },
      {
        heading: "Co je potřeba oddělit",
        paragraphs: [
          "U podobných témat je důležité oddělit tři vrstvy. První jsou doložená fakta: usnesení, smlouvy, zápisy, katastrální informace nebo projektové dokumenty. Druhá je kontext: jaké možnosti obec v dané době měla. Třetí je politické hodnocení: co podle nás bylo nebo nebylo dobré rozhodnutí.",
          "Tyto vrstvy se nesmí míchat. Když něco hodnotíme, musíme říct, že hodnotíme. Když uvádíme fakt, musí být dohledatelný.",
        ],
      },
      {
        heading: "Jak s dokumenty pracovat",
        paragraphs: [
          "V Campaign HQ by u tohoto tématu měl být uložen článek, zkrácená SoMe verze, carousel a sada odkazů na podklady. Pokud bude chybět přímý veřejný odkaz, je lepší položku označit jako čekající na doplnění než ji vydávat jako hotovou.",
          "Citlivost tématu neznamená, že se mu máme vyhnout. Znamená to, že musíme být přesní, klidní a pečliví.",
        ],
      },
      {
        heading: "Co bude další krok",
        paragraphs: [
          "Dalším krokem je doplnit přesnou časovou osu a odkazy na dokumenty, které jednotlivé body dokládají. Až potom má smysl článek publikovat jako vysvětlení pro veřejnost.",
          "Cíl není vyhrát slovní přestřelku. Cíl je dát lidem přehled, aby si mohli udělat názor na základě informací, ne dojmů.",
        ],
      },
    ],
    socialCopy: "U Bílých vrátek nechceme pracovat s nálepkami ani zkratkami. Jde o citlivé téma pozemků, školy a rozhodnutí v čase. Proto připravujeme časovou osu: co je doložené dokumentem, co je kontext a co je politické hodnocení. Teprve když jsou tyto vrstvy oddělené, může být debata férová.",
    carousel: ["Bílá vrátka: citlivé téma, klidný postup.", "Nejdřív časová osa.", "Oddělit fakta, kontext a hodnocení.", "Každé silné tvrzení musí mít zdroj.", "Když něco nevíme, označíme to jako neověřené.", "Cíl: přehled místo slovní přestřelky."],
    cta: "Podívejte se, jak chceme citlivá obecní témata vysvětlovat věcně a s odkazy na dokumenty.",
    markdownPath: "content/articles/bila-vratka-pozemek-skola.md",
    primaryImage: "/images/brand/social/prezletaci-social-blue.png",
    galleryImages: [
      "/images/projects/rozsireni-kapacity-svazkove-skoly.webp",
      "/images/projects/elektronicka-uredni-deska.webp",
    ],
    projectIds: [7, 3],
    socialPostIds: [144],
    sourceLinks: [
      "content/articles/bila-vratka-pozemek-skola.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
    ],
    checks: [
      "Doplnit přesnou časovou osu jen z ověřených zápisů, usnesení, smluv a katastrálních podkladů.",
      "Před publikací právně zkontrolovat všechny formulace o odpovědnosti konkrétních osob nebo stran.",
      "Nepoužívat hodnotící tvrzení bez jasného oddělení od faktů.",
    ],
  },
  {
    slug: "hasici-v-prezleticich",
    title: "Hasiči v Přezleticích: co se stalo a co by obnova vyžadovala",
    status: "copy-ke-schvaleni",
    pillar: "Vysvětlování + Plány + Dokumenty a důkazy",
    summary: "Publikovatelný článek k tématu hasičů, který věcně rozlišuje spolek, jednotku, historii a podmínky případné obnovy.",
    perex: "Téma hasičů se snadno vypráví jako příběh o tom, kdo komu ublížil. Jenže pokud se má obec rozhodovat odpovědně, potřebuje nejdřív rozlišit základní věci: spolek, jednotku požární ochrany, vybavení, lidi, povinnosti a financování.",
    body: [
      {
        heading: "Spolek a jednotka nejsou totéž",
        paragraphs: [
          "V debatě o hasičích se často míchají dvě roviny. Jedna je dobrovolný hasičský spolek jako komunitní organizace. Druhá je jednotka požární ochrany, která má jasné požadavky, povinnosti, vybavení a návaznost na systém požární ochrany.",
          "Obě roviny mohou být pro obec důležité, ale nejsou zaměnitelné. Pokud se mluví o obnově hasičů, musí být jasné, o které z nich je řeč.",
        ],
      },
      {
        heading: "Co je potřeba k funkční jednotce",
        paragraphs: [
          "Funkční jednotka nestojí jen na dobré vůli. Potřebuje lidi, výcvik, vybavení, zázemí, průběžné financování, administrativu a soulad s pravidly integrovaného záchranného systému.",
          "To neznamená, že obnova není možná. Znamená to, že se nedá slíbit jednou větou. Musí být jasné, jaký typ jednotky by obec zvažovala, kolik by stál provoz, kdo by ji personálně zajistil a jaké povinnosti by z toho pro obec plynuly.",
        ],
      },
      {
        heading: "Jak mluvit o minulosti",
        paragraphs: [
          "Historie hasičů v Přezleticích si zaslouží věcný popis. Pokud existují zápisy, usnesení, účetní nebo majetkové dokumenty, mají být základem vysvětlení. Pokud jsou některé části jen vzpomínkou nebo interpretací, musí být tak označené.",
          "Cílem není otevírat staré spory pro samotný konflikt. Cílem je pochopit, co se stalo, jaké byly okolnosti a co z toho plyne pro případnou budoucí obnovu.",
        ],
      },
      {
        heading: "Co by měl být další krok",
        paragraphs: [
          "Nejrozumnější postup je ověřit historické podklady, zjistit aktuální zákonné a organizační podmínky, probrat možnosti s odborníky a teprve potom říct, jaká varianta dává pro Přezletice smysl.",
          "Pokud má být téma hasičů součástí programu, mělo by být formulované odpovědně: ne jako nostalgický slib, ale jako prověřený záměr s jasnými podmínkami.",
        ],
      },
    ],
    socialCopy: "Hasiči jsou citlivé téma. Proto je potřeba mluvit přesně: hasičský spolek a jednotka požární ochrany nejsou totéž. Pokud se má uvažovat o obnově, nestačí slib. Je potřeba vědět, jaké jsou povinnosti, vybavení, lidé, zázemí, provozní náklady a návaznost na systém požární ochrany. Nejprve fakta, potom rozhodnutí.",
    carousel: ["Hasiči: nejdřív rozlišit pojmy.", "Spolek není totéž co jednotka požární ochrany.", "Funkční jednotka potřebuje lidi, výcvik, vybavení a zázemí.", "Historii popisovat podle dokumentů.", "Silná tvrzení ověřit před publikací.", "Program má slíbit jen to, co je prověřené."],
    cta: "Přečtěte si, jak chceme k tématu hasičů přistoupit věcně a odpovědně.",
    markdownPath: "content/articles/hasici-v-prezleticich.md",
    primaryImage: "/images/brand/social/prezletaci-social-yellow.png",
    galleryImages: [
      "/images/projects/obecni-policie.webp",
      "/images/projects/komunitni-centrum-zlatak.webp",
    ],
    projectIds: [29, 34],
    socialPostIds: [145],
    sourceLinks: [
      "content/articles/hasici-v-prezleticich.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
    ],
    checks: [
      "Ověřit historická tvrzení v zápisech, usneseních a registru spolků.",
      "Před publikací ověřit podmínky případné jednotky požární ochrany s HZS nebo relevantním odborným zdrojem.",
      "Nepřipisovat konkrétním lidem či stranám motivy bez doložitelných dokumentů.",
    ],
  },
  {
    slug: "jak-overujeme-tvrzeni",
    title: "Jak ověřujeme tvrzení o historii obce",
    status: "copy-ke-schvaleni",
    pillar: "Vysvětlování + Dokumenty a důkazy",
    summary: "Publikovatelný článek o metodě fact-checkingu v kampani: tvrzení, zdroj, kontext, míra jistoty a odkazy na podklady.",
    perex: "V komunální kampani se často vrací staré příběhy. Některé jsou přesné, některé zjednodušené a některé se postupem času změnily v dojem. My chceme s historií obce pracovat jinak: klidně, věcně a s jasným rozlišením toho, co víme, co si myslíme a co ještě ověřujeme.",
    body: [
      {
        heading: "Tvrzení samo o sobě nestačí",
        paragraphs: [
          "Když někdo řekne, že se něco stalo špatně, nestačí to převzít jako fakt. Stejně tak nestačí říct, že je všechno v pořádku. U každého důležitého tvrzení se ptáme: odkud informace pochází, co přesně dokládá a jaký je širší kontext.",
          "To je zvlášť důležité u témat, která se týkají pozemků, školy, hasičů, developmentu nebo financování. Právě tam může jedna nepřesná věta zbytečně poškodit debatu.",
        ],
      },
      {
        heading: "Naše metoda",
        paragraphs: [
          "U každého citlivého tématu chceme držet jednoduchý postup: nejdřív formulovat tvrzení, potom najít dokument nebo zdroj, doplnit časový kontext a nakonec jasně označit, jestli jde o fakt, interpretaci nebo otázku k ověření.",
          "Kde máme veřejný odkaz, má být u článku dostupný. Kde veřejný odkaz zatím není, má být v Campaign HQ interní poznámka, jaký dokument je potřeba doplnit.",
        ],
      },
      {
        heading: "Co označujeme jako fakt",
        paragraphs: [
          "Za fakt bereme to, co je doložené konkrétním dokumentem, zápisem, usnesením, smlouvou, veřejným registrem nebo jiným ověřitelným zdrojem. I u faktu ale záleží na přesné formulaci: dokument může dokládat, že se něco projednalo, ale nemusí automaticky dokazovat motiv nebo záměr.",
          "Proto se vyhýbáme větám, které vypadají efektně, ale stojí na domněnkách. Silné sdělení má smysl jen tehdy, když je přesné.",
        ],
      },
      {
        heading: "Co zůstává interpretací",
        paragraphs: [
          "Politické hodnocení je v kampani legitimní. Můžeme říct, že podle nás bylo rozhodnutí krátkozraké, nedostatečně vysvětlené nebo že mělo dlouhodobé dopady. Musí ale být jasné, že jde o hodnocení, ne o dokumentem doložený fakt.",
          "Tahle poctivost není slabost. Naopak. Dává komunikaci důvěryhodnost a lidem možnost ověřit si, z čeho vycházíme.",
        ],
      },
      {
        heading: "Jak budeme zdroje zveřejňovat",
        paragraphs: [
          "U delších článků chceme mít odkazy na podklady přímo ve webové sekci. U SoMe postů bude hlavní text kratší, ale měl by vést na článek, kde jsou zdroje a širší vysvětlení.",
          "Cílem je, aby social media nebyla jen sada sloganů. Má to být rozcestník k ověřitelným informacím, které si může přečíst každý, kdo chce jít hlouběji.",
        ],
      },
    ],
    socialCopy: "V kampani nechceme stavět komunikaci na nálepkách. U citlivých témat budeme pracovat jednoduše: tvrzení, zdroj, kontext a jasné označení, co je fakt a co je hodnocení. Když něco ještě nemáme ověřené, řekneme to. Férová debata začíná tím, že lidé vidí, z čeho vycházíme.",
    carousel: ["Tvrzení samo o sobě nestačí.", "Ptáme se: zdroj, dokument, kontext.", "Fakt musí být ověřitelný.", "Hodnocení musí být označené jako hodnocení.", "Neověřené věci neschováváme.", "SoMe má vést na delší článek se zdroji."],
    cta: "Přečtěte si, jak budeme v kampani pracovat s fakty, historií a citlivými tématy.",
    markdownPath: "content/articles/jak-overujeme-tvrzeni.md",
    primaryImage: "/images/projects/elektronicka-uredni-deska.webp",
    galleryImages: [
      "/images/brand/social/prezletaci-social-blue.png",
      "/images/brand/social/prezletaci-social-yellow.png",
    ],
    projectIds: [3],
    socialPostIds: [146],
    sourceLinks: [
      "content/articles/jak-overujeme-tvrzeni.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
    ],
    checks: [
      "U každého navazujícího fact-check článku doplnit přímé odkazy na veřejné dokumenty.",
      "Nahradit pracovní nebo Google Drive odkazy veřejně dostupnými URL, pokud má být text publikovaný na webu.",
      "Před publikací citlivých témat provést faktickou a právní kontrolu.",
    ],
  },
  {
    slug: "volebni-program-prezletice-2026-2030",
    title: "Volební program Přezleťáků: co je pro nás nejdůležitější",
    status: "copy-ke-schvaleni",
    pillar: "Plány + Lidé + Vysvětlování",
    summary: "Hlavní volební článek k programu Přezleťáků 2026–2030: shrnuje priority v bodech a nastavuje linku navazujících tematických postů do voleb.",
    perex: "Volby nejsou jen o velkých heslech. Rozhodují o tom, kdo bude každý týden řešit dopravu, školu, zeleň, služby, bezpečnost, rozpočet a další konkrétní věci, které ovlivňují každodenní život v Přezleticích.",
    body: [
      {
        heading: "Nechceme slibovat všechno všem",
        paragraphs: [
          "Program Přezleťáků nechceme představit jako dlouhý seznam přání, ve kterém se dá odškrtnout úplně všechno. Obec má omezený rozpočet, jasné kompetence a řadu věcí neřídí sama. Právě proto je důležité mluvit konkrétně: co je priorita, co už se řeší, co je rozdělané, kde jsme závislí na dalších institucích a jaký může být další reálný krok.",
          "Naše východisko je jednoduché. Chceme navázat na práci, která už v Přezleticích probíhá, otevřeně vysvětlovat složitější témata a soustředit se na věci, které mají dopad na každodenní život lidí v obci.",
        ],
      },
      {
        heading: "Co je pro nás nejdůležitější",
        paragraphs: [
          "Doprava a infrastruktura. Bezpečný pohyb obcí, stav komunikací, chodníků a technických sítí patří k základním věcem, které lidé vnímají každý den. U každé větší priority chceme ukazovat současný stav, odpovědnost a nejbližší proveditelný krok.",
          "Školství a kapacity. Rostoucí obec musí dlouhodobě řešit školku, školu, jídelnu i návazné služby. Nestačí říct, že kapacitu chceme. Je potřeba vysvětlovat, jak spolu souvisí pozemky, projekty, financování, svazek obcí, povolení a provoz.",
          "Veřejný prostor a zeleň. Ulice, parky, stromy a místa pro setkávání nejsou ozdoba navíc. Rozhodují o tom, jak se v obci chodí, odpočívá, potkává a jak dobře veřejný prostor funguje v horku, dešti i při běžné údržbě.",
          "Sport, volný čas a komunita. Obec není jen soubor domů. Potřebuje místa a příležitosti, kde se lidé potkávají: sportoviště, spolky, sousedské akce, prostor pro děti, seniory i celé rodiny.",
          "Bezpečnost a prevence. Bezpečná obec nevzniká jen jedním opatřením. Je to kombinace prevence, dobrého veřejného prostoru, spolupráce s bezpečnostními složkami a srozumitelného vysvětlení, co obec může a nemůže zajistit.",
        ],
      },
      {
        heading: "Služby, rozvoj a odpovědné hospodaření",
        paragraphs: [
          "Dostupné služby v obci. Každá služba, kterou lidé nemusí složitě hledat jinde, šetří čas a energii. U služeb ale musí být jasné, co je reálně v možnostech obce, kde je potřeba partner a jaký model dává dlouhodobě smysl.",
          "Rozumný rozvoj a územní plánování. Přezletice rostou a s růstem přichází tlak na dopravu, školu, sítě, zeleň i veřejný prostor. Nejde jen o otázku, jestli nové domy ano nebo ne. Důležité je, jaká pravidla obec nastaví, co může vyjednat a jak otevřeně bude lidem vysvětlovat dopady jednotlivých záměrů.",
          "Kultura a společenské centrum. Přezletice potřebují důstojné zázemí pro setkávání, obecní akce, spolky a komunitní život. U větších projektů ale chceme vždy mluvit také o etapách, financování, budoucím provozu a tom, co je už připravené a co se musí teprve rozhodnout.",
          "Digitalizace a komunikace obce. Informace mají být dostupné srozumitelně a včas. Digitální služby mohou lidem ušetřit cestu na úřad, ale nesmí se zapomenout ani na ty, kteří potřebují informace jinou cestou.",
          "Odpovědné hospodaření. Každý plán musí mít reálný finanční základ. U velkých priorit chceme ukazovat pořadí kroků, možné zdroje financování, návaznost na dotace a rozhodnutí, která musí předcházet realizaci.",
        ],
      },
      {
        heading: "Jak budeme program vysvětlovat do voleb",
        paragraphs: [
          "Tenhle článek je úvodní rozcestník. Nechceme všechno odbýt jedním dlouhým textem, který se dobře odklikne, ale špatně čte. Jednotlivým tématům se proto budeme věnovat postupně v dalších postech a článcích v období do voleb.",
          "U každého tématu chceme ukázat čtyři věci: co už je hotové, co je rozdělané, co obec může reálně ovlivnit a jaký je další konkrétní krok. Někde půjde o krátký příspěvek, jinde o carousel, u složitějších témat o delší článek s odkazy na podklady.",
          "Naším cílem není vyhrát soutěž o největší slib. Chceme, aby lidé věděli, jak o Přezleticích přemýšlíme, kde vidíme priority a podle čeho budeme rozhodovat, když přijde na konkrétní kroky.",
        ],
      },
    ],
    socialCopy: "Volby nejsou jen o heslech. Jsou o tom, kdo bude každý týden řešit konkrétní věci, které ovlivňují život v Přezleticích. Náš program stojí na několika prioritách: doprava a infrastruktura, školství, zeleň, veřejný prostor, služby, bezpečnost, rozumný rozvoj, kultura, sport, digitalizace a odpovědné hospodaření. Jednotlivým tématům se budeme v dalších týdnech věnovat do hloubky — v postech, článcích a konkrétních příkladech z obce.",
    carousel: [
      "Program není seznam slibů.",
      "Začínáme tím, co lidé řeší každý den.",
      "Doprava, škola, zeleň a veřejný prostor.",
      "Služby, bezpečnost a rozumný rozvoj.",
      "Kultura, sport, komunikace a odpovědné hospodaření.",
      "Každé téma postupně rozebereme do hloubky.",
      "Konkrétně: co je hotové, co je rozdělané a co bude další krok.",
    ],
    cta: "Sledujte nás. Jednotlivé části programu budeme postupně vysvětlovat v dalších postech a článcích do voleb.",
    markdownPath: "content/articles/volebni-program-prezletice-2026-2030.md",
    primaryImage: "/images/social/program-plan-pro-prezletice-2026-2030.svg",
    galleryImages: [
      "/images/brand/social/prezletaci-social-blue.png",
      "/images/brand/social/prezletaci-social-yellow.png",
    ],
    projectIds: [],
    socialPostIds: [137],
    sourceLinks: [
      "content/program/plan-pro-prezletice-2026-2030.md",
      "content/articles/volebni-program-prezletice-2026-2030.md",
      "Volby 2026 program.docx",
      "Campaign Bible",
    ],
    checks: [
      "Schválit finální pořadí programových priorit.",
      "Doplnit veřejné odkazy na budoucí tematické články a projektové karty.",
      "Před publikací ověřit formulace u témat, kde obec není jediným rozhodovatelem.",
    ],
  },
];

export const articleContentBySlug = new Map(articleContent.map((article) => [article.slug, article]));
