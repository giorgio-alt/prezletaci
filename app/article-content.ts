export type ArticleContent = {
  slug: string;
  title: string;
  byline?: string;
  candidateId?: number;
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

export function articleToMarkdown(article: ArticleContent) {
  return [
    `# ${article.title}`,
    "",
    `**Stav:** ${article.status === "copy-ke-schvaleni" ? "Copy ke schválení" : article.status}`,
    "",
    `**Komunikační pilíř:** ${article.pillar}`,
    "",
    ...(article.byline ? [`**Autorský podklad:** ${article.byline}`, ""] : []),
    "## Perex",
    "",
    article.perex,
    "",
    "## Článek",
    "",
    ...article.body.flatMap((section) => [
      `### ${section.heading}`,
      "",
      ...section.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    ]),
    "## Text pro sociální sítě",
    "",
    article.socialCopy,
    "",
    "## Instagram carousel",
    "",
    ...article.carousel.map((slide, index) => `${index + 1}. ${slide}`),
    "",
    "## CTA",
    "",
    article.cta,
    "",
    "## Kontrola před publikací",
    "",
    ...article.checks.map((check) => `- ${check}`),
    "",
  ].join("\n");
}

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
          "Proto v Přezleticích u části ulic volíme jiný přístup: zapojené keřové výsadby, trvalky, traviny a mulčovací materiál. Nejde pouze o dekoraci. Jde o řešení, které lépe snáší horko, méně zatěžuje údržbu a zároveň dokáže ulici opticky zklidnit.",
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
        heading: "Proč nestačí jen současná budova",
        paragraphs: [
          "Námitka, že by obci měla stačit současná radnice, je pochopitelná. Architektonický koncept ale starou budovu neodepisuje. Počítá s ní jako s jednou ze tří částí obecního centra a navrhuje, aby dál sloužila například archivu nebo přechodným kancelářím.",
          "Samotná současná budova však neumí spojit všechny funkce, které má rostoucí obec zajišťovat: přehledný a otevřený úřad, knihovnu, veřejná jednání, společenské aktivity i bezprostřední vazbu na veřejný prostor. Nejde tedy o volbu mezi starou a novou radnicí. Smyslem je využít stávající úřad a doplnit ho jen o kapacitu a funkce, které dnes chybějí.",
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
    socialCopy: "Proč nestačí současná radnice? Architektonický koncept starou budovu neodepisuje — počítá s ní jako s jednou ze tří částí obecního centra. Samotná ale nedokáže spojit přehledný úřad, knihovnu, veřejná jednání, společenské aktivity a vazbu na veřejný prostor. Nejde tedy o volbu mezi starou a novou radnicí. Jde o využití toho, co obec má, a doplnění funkcí, které dnes chybějí.",
    carousel: ["Proč nestačí současná radnice?", "Stará budova zůstává součástí obecního centra.", "Sama ale neobsáhne všechny služby rostoucí obce.", "Nový koncept spojuje úřad, knihovnu a veřejný prostor.", "Tři budovy mají fungovat jako jeden celek.", "Ne stavět všechno znovu, ale smysluplně rozdělit funkce.", "Studie je začátek debaty, ne konečný rozpočet."],
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
          "Přezletice jsou rostoucí obec. S novou výstavbou a mladými rodinami přirozeně roste tlak na kapacity školky, školy, jídelny i návazných služeb. Zlomovým okamžikem přitom nebyl jen růst počtu dětí. V průběhu roku 2013 vypověděla Vinoř smlouvu o spádovosti pro děti z Přezletic, Jenštejna a Podolanky. Obce tím přišly o dosavadní dlouhodobou jistotu a musely začít připravovat vlastní řešení.",
          "U školství platí, že nestačí mít politickou vůli. Je potřeba mít pozemek, projekt, financování, dohodu okolních obcí a provozní model, který zvládne každodenní realitu. Řešení proto muselo být větší než jedna provizorní třída a muselo vydržet déle než jedno volební období.",
        ],
      },
      {
        heading: "Problém nevznikl přes noc",
        paragraphs: [
          "Historické podklady ukazují, že se obec s nedostatkem kapacit vyrovnávala postupně. Ještě v červenci 2011 zajišťovala mateřskou školu v pronajatých prostorách ve Vinoři. V roce 2013 podle podkladu Jana Macourka skončila spádová dohoda s Vinoří pro Přezletice, Jenštejn i Podolanku. Tím se potřeba vlastního dlouhodobého řešení stala ještě naléhavější.",
          "Zápis zastupitelstva z 30. července 2014 zachycuje tehdejší plán požádat o dotaci na jednu další třídu mateřské školy a jednu třídu malé základní školy. Zastupitelstvo tehdy samo uvedlo, že jde o řešení odpovídající aktuálním potřebám, nikoli o definitivní odpověď na další demografický vývoj.",
        ],
      },
      {
        heading: "Od jedné třídy ke společnému řešení",
        paragraphs: [
          "V březnu 2015 vznikl svazek obcí Přezletice, Podolanka a Jenštejn. Tím se změnilo měřítko řešení: místo jedné provizorní třídy začala příprava školy pro širší spádové území. Současně bylo nutné vyřešit pozemek, protože obec podle historických podkladů vlastnila v lokalitě Bílých vrátek spoluvlastnický podíl, nikoli samostatně oddělený pozemek připravený pro stavbu školy.",
          "Podle Macourkova podkladu vedla jednání v roce 2015 k oddělení pozemku pro školu a k nastavení základních podmínek spolupráce v území. Právě tato posloupnost vysvětluje, proč se školní kapacita nedá popsat jednou stavbou ani jedním rozhodnutím: nejdřív bylo potřeba zajistit pozemek, spolupráci obcí a projektový rámec, teprve potom bylo možné připravovat a stavět.",
        ],
      },
      {
        heading: "Proč svazkové řešení",
        paragraphs: [
          "U základní školy dává v našem území smysl spolupráce více obcí. Svazkové řešení není zkratka, ale způsob, jak se dostat k větší kapacitě a rozdělit odpovědnost i finanční zátěž mezi obce, kterých se problém týká. Jedna škola zároveň znamená jedno vedení a společný personální i provozní rámec namísto několika malých samostatných organizací.",
          "V době založení svazku podle tehdejšího vedení nebyl otevřený vhodný dotační titul a Přezletice měly po převzetí vedení k dispozici přibližně 800 tisíc korun, prakticky jen na běžný provoz. Samostatně by obec projekt tohoto rozsahu financovat nedokázala. Spojení obcí umožnilo náklady rozložit a vytvořit partnera, který mohl připravit větší projekt.",
          "Když byl následně vypsán dotační titul, svazkové projekty měly podle pracovních podkladů zvýhodněnou spoluúčast: 15 procent oproti 30 procentům u samostatných obcí. Také současná státní politika podporuje společné zajišťování školských služeb a sdílení řízení. Přesná historická i aktuální pravidla podpory ale musí být před zveřejněním doložena konkrétním dotačním rozhodnutím a platnými předpisy.",
        ],
      },
      {
        heading: "Co se podařilo a co navazuje",
        paragraphs: [
          "V Přezleticích už je za námi kus práce: školka, svazková škola, školní jídelna i výdejní systém. Jídelna neslouží jen žákům školy. Připravuje stravu také pro školku, zásobuje výdejní automaty pro obyvatele a zajišťuje občerstvení při obecních kulturních a společenských akcích.",
          "Jídelna funguje jako samostatná příspěvková organizace. Podle aktuálních informací svazku vytváří kladný hospodářský výsledek, který pomáhá s dalším rozvojem a provozem školského areálu. Před veřejným vydáním článku bude potřeba tuto formulaci opřít o schválené účetní výsledky a přesně popsat, jak může být výsledek použit.",
          "Hotová první etapa ale neznamená, že je problém vyřešen navždy. Potřeby se mění s počtem obyvatel, věkovou strukturou i rozvojem okolních obcí. Proto je důležité kapacitu nejen vybudovat, ale průběžně sledovat a připravovat další kroky včas.",
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
          "Svazek v současnosti zajišťuje povolení dočasné kontejnerové nájemní školy, která má překlenout období do dokončení druhé etapy. Podle nastavených podmínek se má developer v případě, že řádná školní budova nebude v dohodnutém termínu hotová, podílet na financování nájmu. Přesné znění závazku a rozhodné termíny musí být před publikací ověřeny ve smluvních dokumentech.",
          "Současně se připravuje projekt druhé etapy školy s plánovanou kapacitou 450 žáků. Je hotová demografická studie, probíhají jednání s MŠMT o možnostech zařazení do dotační podpory, soutěží se projektant zastavovací studie a skládá se finanční rámec včetně příspěvků developerů. U každého z těchto kroků chceme v Campaign HQ průběžně uvádět stav, odpovědnost a nejbližší ověřitelný milník.",
          "Školy a školky nejsou jen budovy. Jsou to služby, které rozhodují o každodenním životě rodin. Proto k nim chceme přistupovat prakticky, bez zjednodušování a s důrazem na dlouhodobou odpovědnost.",
        ],
      },
      {
        heading: "Kontinuita spolupráce je pro dostavbu zásadní",
        paragraphs: [
          "Svazek může fungovat jen tehdy, když spolu jeho obce dlouhodobě komunikují a dokážou se shodnout na pozemku, projektu, financování i provozu. V současnosti starostové a místostarostové zapojených obcí spolupracují a předsedou svazku je zástupce Přezletic. Pro naši obec je důležité, aby měla v dalším období silné zastoupení a aby tato pracovní souhra pokračovala i po volbách.",
          "Nejde o osobní vlastnictví projektu ani o tvrzení, že školu může dokončit jediný člověk. Jde o kontinuitu rozhodování. Pokud by se spolupráce obcí rozpadla, mohlo by se zkomplikovat financování druhé etapy, vyčlenění potřebných pozemků i samotná vůle projekt dokončit. Dopad by nesly především rodiny, které by musely hledat místa pro děti v širším okolí.",
          "Proto chceme o škole mluvit jako o společné odpovědnosti: chránit funkční vztahy ve svazku, předávat úplné informace, držet připravené projekty a nenechat dlouhodobou kapacitu škol záviset na povolebních sporech.",
        ],
      },
    ],
    socialCopy: "Když Přezletice, Jenštejn a Podolanka v roce 2013 přišly o spádovou školu ve Vinoři, nestačilo přidat jednu třídu. Bylo potřeba zajistit pozemek, spojit síly obcí, připravit financování a vybudovat školu i jídelnu, která dnes slouží dětem i dalším obyvatelům. Teď navazuje dočasná nájemní kapacita a příprava druhé etapy pro 450 žáků. Její dokončení bude záviset na projektu, dotaci, příspěvcích developerů a pokračující spolupráci obcí ve svazku.",
    carousel: ["Rok 2013: ztráta spádové školy ve Vinoři.", "Jedna provizorní třída by problém nevyřešila.", "Rok 2015: tři obce spojily síly ve svazku.", "Společný projekt rozložil odpovědnost i finanční zátěž.", "Škola a jídelna dnes slouží širšímu území.", "Teď se připravuje dočasná kapacita a II. etapa pro 450 žáků.", "Klíčové jsou projekt, financování a kontinuita spolupráce obcí."],
    cta: "Přečtěte si, proč školní kapacita vyžaduje dlouhodobou spolupráci a jaké konkrétní kroky teď navazují.",
    markdownPath: "content/articles/kapacita-skol-a-skolek.md",
    primaryImage: "/images/projects/rozsireni-kapacity-svazkove-skoly.webp",
    galleryImages: [
      "/images/projects/druhy-pavilon-ms.webp",
      "/images/projects/zahrada-ms.webp",
      "/images/projects/vydejni-automaty-stravovani.webp",
    ],
    projectIds: [7, 21, 22],
    socialPostIds: [106, 115, 148],
    sourceLinks: [
      "content/articles/kapacita-skol-a-skolek.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
      "TK2603-0395/Historie vzniku prudkého rozvoje obce-1.docx",
      "TK2603-0395/Zastupitelstvo vymezení poz b vrátka 27.07.2011.pdf",
      "TK2603-0395/dx2b_zapis-6-2014-2.pdf",
      "TK2603-0395/Podmíněnost UP.pdf",
      "https://hacer.itispartner.cz/document.php?hashp=PvJ0b4595KwzIrGNW28q1gdDGe1vYhI2",
    ],
    checks: [
      "Ověřit účetním nebo rozpočtovým dokumentem stav obecního účtu přibližně 800 tis. Kč při převzetí vedení.",
      "Doložit konkrétní dotační titul a historickou spoluúčast 15 % pro svazky oproti 30 % pro samostatné obce.",
      "Ověřit aktuální pravidla státní podpory svazkových škol a přesnou formulaci k legislativnímu slučování škol.",
      "Doložit schválenými účetními výsledky kladné hospodaření jídelny a pravidla použití výsledku.",
      "Ověřit aktuální stav povolení kontejnerové nájemní školy a smluvní podmínky úhrady nájmu developerem.",
      "Potvrdit kapacitu II. etapy 450 žáků, demografickou studii, jednání s MŠMT a stav soutěže projektanta zastavovací studie.",
      "Doložit plán financování II. etapy včetně příspěvků developerů a odpovědnosti jednotlivých partnerů.",
      "Před publikací ověřit ve veřejných dokumentech datum ukončení spádové dohody a oddělení pozemku pro školu.",
      "Před publikací zkontrolovat formulace o povolební kontinuitě tak, aby popisovaly reálné institucionální riziko bez osobních útoků a strašení.",
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
        heading: "Dvě různé fáze rozvoje",
        paragraphs: [
          "Podklad Břetislava Lukeše upozorňuje, že dnešní rozvoj není jedna nerozlišená plocha. Na západní straně obce jsou projekty Bílá vrátka, Panská pole a Panská vinice v pokročilé přípravě a obec u nich dlouhodobě řeší zastavovací studie, podmínky výstavby i veřejnou infrastrukturu. Zbývající zastavitelné části obce jsou v jiné fázi a pravidla pro ně se teprve musí posoudit v širších souvislostech.",
          "Tohle rozlišení je důležité. U rozpracovaných lokalit je úkolem obce hlídat dodržení dohodnutých podmínek a návaznost na školu, dopravu, sítě a veřejný prostor. U dalších ploch je naopak potřeba nejdřív rozhodnout, zda je obec vůbec potřebuje a jaké limity musí platit, aby další výstavba nezhoršila problémy, které už dnes řešíme.",
        ],
      },
      {
        heading: "Nejdřív využít a dokončit to, co je připravené",
        paragraphs: [
          "Lukešův podklad staví další postup na jednoduché prioritě: energii obce soustředit na dokončení rozpracovaných území a na služby, které budou obyvatelé potřebovat. Patří sem vzdělávání, zdravotní a sociální služby, rekreační a sportovní plochy i propojení nové a historické části obce.",
          "Teprve s tímto přehledem lze odpovědně říct, kolik dalšího rozvoje Přezletice unesou. Orientační kapacitní odhady z pracovního podkladu musí před zveřejněním projít kontrolou proti platnému územnímu plánu, schváleným studiím a aktuálním údajům o obyvatelích. Princip je ale jasný už teď: další růst nemá být automatický, ale odvozený od kapacity obce a od kvality života.",
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
    socialCopy: "Kolik rozvoje Přezletice unesou? Rozpracované projekty na západní straně obce a dosud nepřipravené zastavitelné plochy nejsou totéž. U prvních je potřeba hlídat dohodnuté podmínky, infrastrukturu a veřejné služby. U dalších se musíme nejdřív ptát, zda je obec vůbec potřebuje a jaké limity musí platit. Další růst nemá být automatický, ale odvozený od kapacity obce a kvality života.",
    carousel: ["Rozvoj není jedna nerozlišená plocha.", "Západní projekty jsou v pokročilé přípravě.", "U nich je potřeba hlídat podmínky a infrastrukturu.", "Další zastavitelné plochy jsou v jiné fázi.", "Nejdřív musíme vědět, zda je obec potřebuje.", "Tempo růstu musí odpovídat škole, dopravě, sítím a službám.", "Cíl: dokončit připravené a nepřidávat automaticky další rozvoj."],
    cta: "Přečtěte si, proč rozlišujeme rozpracované projekty a další zastavitelné plochy.",
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
      "TK2603-0394/VOLBY 2026_stop develop.docx",
      "TK2603-0392/VOLBY 2026 Lukeš rozvoj obce brzda.docx",
      "TK2603-0395/Podmíněnost UP.pdf",
    ],
    checks: [
      "Před publikací doplnit konkrétní odkazy na platné územně plánovací dokumenty.",
      "Ověřit aktuální právní stav případných uzávěr, změn územního plánu a developerských smluv.",
      "Nepoužívat neověřená číselná tvrzení o počtech bytů, domů nebo obyvatel.",
    ],
  },
  {
    slug: "bila-vratka-pozemek-skola",
    title: "Bílá vrátka v kontextu dvou developerských projektů",
    status: "copy-ke-schvaleni",
    pillar: "Vysvětlování + Dokumenty a důkazy",
    summary: "Publikovatelný článek ve formě doložené časové osy k Bílým vrátkům, navazujícímu developerskému území, pozemkům pro školu a rozhodnutím obce.",
    perex: "Bílá vrátka se nedají vysvětlit jako jeden izolovaný projekt ani jednou smlouvou. Na západní straně Přezletic se vedle sebe připravovaly dva developerské záměry a současně se řešil pozemek pro školu, podmínky územního plánu a veřejná infrastruktura. Proto dává smysl poskládat události do časové osy a přesně rozlišit, co dokládají veřejné zápisy a co ještě vyžaduje kontrolu.",
    body: [
      {
        heading: "Nejde jen o jednu lokalitu",
        paragraphs: [
          "V běžné debatě se pod názvem Bílá vrátka často směšuje širší rozvojové území. Podklady ale zachycují dva navazující developerské záměry na západní a jihozápadní straně obce. U jednoho se v zápisech používá označení lokalita A, Bílá vrátka – Ke Ctěnicím. Druhý záměr v témže západním území připravovala společnost OBADI.",
          "Oba projekty mají vlastní majetkové a smluvní souvislosti, ale pro obec se jejich dopady potkávají: u školy, dopravní a technické infrastruktury i veřejných ploch. Popsat celé téma jen jako spor o Bílá vrátka by proto zakrylo podstatnou část historie.",
        ],
      },
      {
        heading: "Rok 2011: pozemky a územní plán",
        paragraphs: [
          "Zápis zastupitelstva z 27. července 2011 uvádí, že obec měla podle původních dohod získat jasně určenou část pozemků ještě před schválením územního plánu. Protože podepsané kupní smlouvy nebyly v té době předložené, zastupitelstvo stanovilo termín a připravovalo i možnost nezahrnout lokalitu A, Bílá vrátka – Ke Ctěnicím, do zastavitelných ploch.",
          "V září 2011 zastupitelstvo pověřilo starostku podpisem kupních smluv. Prosincový zápis následně zaznamenal, že obec získala spoluvlastnický podíl odpovídající sedmi hektarům a že fyzické rozdělení pozemků mělo následovat až po zpracování studie. To je důležitý rozdíl: obec získala významný majetkový podíl, ale pozemek pro konkrétní veřejnou stavbu ještě nebyl samostatně oddělený.",
        ],
      },
      {
        heading: "Škola změnila význam celého rozhodnutí",
        paragraphs: [
          "Potřeba školního pozemku se stala naléhavější poté, co podle historického podkladu v roce 2013 skončila spádová dohoda s Vinoří. V červenci 2014 ještě zastupitelstvo připravovalo žádost o dotaci na jednu třídu mateřské školy a jednu třídu malé základní školy. Samo přitom uvedlo, že nejde o definitivní řešení a že obec bude muset dál reagovat na demografický vývoj.",
          "Po vzniku svazku obcí v roce 2015 začala příprava školy ve větším měřítku. Macourkův podklad popisuje, že jednání se spoluvlastníky a developerem následně vedla k oddělení pozemku pro školu. Před veřejným vydáním je potřeba tento krok doložit veřejně dostupnou listinou; důvěrná smlouva nesmí být zveřejněna ani odkazována jako veřejný podklad.",
        ],
      },
      {
        heading: "Druhý projekt a společné dopady",
        paragraphs: [
          "Zápis z července 2014 zároveň zachycuje převod dalších pozemků od společnosti OBADI v západní části obce. Zápis výslovně rozlišuje tyto pozemky od pozemků přímo v lokalitě Bílá vrátka, přestože leží ve stejném širším území.",
          "Právě proto se musí další vysvětlení věnovat oběma developerským projektům společně tam, kde mají společný dopad, a odděleně tam, kde jde o jiné vlastníky, smlouvy nebo povinnosti. Jen tak lze férově popsat, kdo měl co zajistit a jak se jednotlivá rozhodnutí promítla do školy a infrastruktury.",
        ],
      },
      {
        heading: "Co je doložené a co ještě ověřujeme",
        paragraphs: [
          "Veřejné zápisy dokládají debatu o jasně vymezené části pozemků, následné nabytí spoluvlastnického podílu, přípravu malé školní kapacity i převod dalších pozemků od druhého developera. Historický podklad doplňuje souvislost se vznikem svazku obcí a oddělením školního pozemku.",
          "Před publikací zbývá spojit každý bod časové osy s veřejným dokumentem a právně zkontrolovat formulace o vlastnictví a smluvních povinnostech. Cíl není vyhrát slovní přestřelku. Cíl je dát lidem přehled o dvou projektech a jejich společných dopadech, aby si mohli udělat názor na základě informací, ne dojmů.",
        ],
      },
    ],
    socialCopy: "Bílá vrátka nejsou celý příběh. Na západní straně Přezletic se připravovaly dva navazující developerské projekty a současně se řešil pozemek pro školu. Veřejné zápisy ukazují debatu o vymezení pozemků, nabytí spoluvlastnického podílu i další kroky kolem školní kapacity. Připravili jsme proto časovou osu, která odděluje oba projekty a propojuje jejich společné dopady na školu a infrastrukturu.",
    carousel: ["Bílá vrátka nejsou celý příběh.", "V západním území se připravovaly dva developerské projekty.", "Rok 2011: podíl na pozemcích ještě nebyl samostatným školním pozemkem.", "Rok 2014: obec řešila malou školní kapacitu i další pozemky v území.", "Rok 2015: svazek obcí a příprava školy změnily měřítko řešení.", "Společné dopady: škola, doprava, sítě a veřejný prostor.", "Každý bod časové osy musí mít veřejný zdroj."],
    cta: "Projděte si časovou osu dvou developerských projektů a jejich souvislost se školou.",
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
      "TK2603-0395/Historie vzniku prudkého rozvoje obce-1.docx",
      "TK2603-0395/Zastupitelstvo vymezení poz b vrátka 27.07.2011.pdf",
      "TK2603-0395/Zápis 9_12.11.2011.pdf",
      "TK2603-0395/Zápis 13_21.12.2011.pdf",
      "TK2603-0395/dx2b_zapis-6-2014-2.pdf",
      "TK2603-0395/Podmíněnost UP.pdf",
    ],
    checks: [
      "Doplnit veřejný dokument potvrzující oddělení pozemku pro školu v roce 2015; důvěrnou smlouvu nezveřejňovat.",
      "Ověřit přesné názvy a hranice obou developerských projektů v platné územně plánovací dokumentaci.",
      "Před publikací právně zkontrolovat všechny formulace o odpovědnosti konkrétních osob nebo stran.",
      "Ke každému bodu časové osy doplnit veřejně dostupný odkaz na zápis, usnesení nebo listinu.",
    ],
  },
  {
    slug: "hasici-v-prezleticich",
    title: "Hasiči v Přezleticích: co se stalo a co by obnova vyžadovala",
    byline: "Tomáš Říha · redakčně zpracováno v kampaňovém stylu",
    candidateId: 1,
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
      "TK2603-0395/Hasiči - Jak jsme o ně přišli.docx",
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
          "U delších článků chceme mít odkazy na podklady přímo ve webové sekci. U příspěvků na sociálních sítích bude hlavní text kratší, ale měl by vést na článek, kde jsou zdroje a širší vysvětlení.",
          "Cílem je, aby příspěvky na sociálních sítích nebyly jen sada sloganů. Mají být rozcestníkem k ověřitelným informacím, které si může přečíst každý, kdo chce jít hlouběji.",
        ],
      },
    ],
    socialCopy: "V kampani nechceme stavět komunikaci na nálepkách. U citlivých témat budeme pracovat jednoduše: tvrzení, zdroj, kontext a jasné označení, co je fakt a co je hodnocení. Když něco ještě nemáme ověřené, řekneme to. Férová debata začíná tím, že lidé vidí, z čeho vycházíme.",
    carousel: ["Tvrzení samo o sobě nestačí.", "Ptáme se: zdroj, dokument, kontext.", "Fakt musí být ověřitelný.", "Hodnocení musí být označené jako hodnocení.", "Neověřené věci neschováváme.", "Příspěvek na sociálních sítích má vést na delší článek se zdroji."],
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
    slug: "proc-prezletice-potrebuji-zpravodaj",
    title: "Proč Přezletice potřebují vlastní zpravodaj",
    byline: "Romana Bernardová · redakčně zpracováno v kampaňovém stylu",
    candidateId: 3,
    status: "copy-ke-schvaleni",
    pillar: "Plány + Lidé + Vysvětlování",
    summary: "Samostatný článek Romany Bernardové o tištěném obecním zpravodaji, který zpřístupní informace také lidem bez sociálních sítí, chytrého telefonu nebo počítače.",
    perex: "Ne každý sleduje Facebook nebo Instagram a ne každý používá chytrý telefon či počítač. Přesto mají mít všichni obyvatelé Přezletic přístup k důležitým informacím o dění v obci. Právě proto dává smysl znovu otevřít debatu o pravidelném tištěném zpravodaji.",
    body: [
      {
        heading: "Informace musí být dostupné všem",
        paragraphs: [
          "Velká část obecní komunikace se dnes odehrává online. Je to rychlé a praktické, ale ne pro každého. Mezi námi žijí lidé, zejména senioři, kteří sociální sítě nepoužívají, nemají moderní telefon nebo si informace na internetu běžně nehledají.",
          "Život v obci přitom zajímá všechny generace. Důležité zprávy by proto neměly být dostupné jen těm, kteří jsou každý den online. Tištěný zpravodaj může digitální komunikaci doplnit a pomoci, aby nikdo nezůstával stranou.",
        ],
      },
      {
        heading: "O čem by zpravodaj informoval",
        paragraphs: [
          "Zpravodaj může na jednom místě přinášet přehled toho, co se v Přezleticích děje: informace o obecních a sousedských akcích, komunitním centru, rozvoji obce i důležitých rozhodnutích zastupitelstva.",
          "Neměl by jen opakovat krátká oznámení ze sociálních sítí. Jeho přínosem má být klidnější a srozumitelnější vysvětlení témat, ke kterým lidé potřebují více souvislostí.",
        ],
      },
      {
        heading: "Praktický servis pro každodenní život",
        paragraphs: [
          "Vedle zpráv z obce může časopis nabídnout také praktický servis: užitečné rady, informace pro občany, místní inzerci nebo reportáže z akcí. Právě kombinace úředních, komunitních a praktických témat může ze zpravodaje udělat médium, které má smysl pravidelně otevřít.",
          "Důležité je, aby obsah nebyl jednostranný a aby bylo jasné, kdo za jeho přípravu odpovídá. Zpravodaj má sloužit obyvatelům, ne být pouze propagačním letákem.",
        ],
      },
      {
        heading: "Prostor také pro obyvatele",
        paragraphs: [
          "Romana Bernardová ve svém podkladu navrhuje, aby zpravodaj vznikal také s pomocí samotných obyvatel. Může dávat prostor pozvánkám, zkušenostem, fotografiím nebo tématům, která přinášejí spolky, sousedé a lidé aktivní v obci.",
          "Takový přístup může pomoci zachytit dění, které se do běžných úředních oznámení nevejde, a současně posílit vztah lidí k místu, kde žijí.",
        ],
      },
      {
        heading: "Jak často by měl vycházet",
        paragraphs: [
          "O konkrétní periodicitě je potřeba ještě rozhodnout. Původní podklad otevírá dvě možnosti: čtvrtletní nebo dvouměsíční vydávání. Výsledná frekvence musí odpovídat množství užitečného obsahu, času potřebnému na kvalitní přípravu i nákladům na výrobu a distribuci.",
          "Nejdůležitější není vydávat co nejčastěji. Důležitější je, aby každé číslo přineslo ověřené, srozumitelné a praktické informace a dostalo se skutečně ke všem domácnostem, pro které je určené.",
        ],
      },
      {
        heading: "Co musí následovat",
        paragraphs: [
          "Než začne zpravodaj pravidelně vycházet, je potřeba dohodnout jeho podobu, periodicitu, způsob distribuce, redakční odpovědnost a pravidla pro přijímání příspěvků. Stejně důležité bude nastavit kontrolu faktů a prostor pro opravy či zpětnou vazbu.",
          "Cíl je jednoduchý: vytvořit důvěryhodný a praktický zdroj informací pro obyvatele, kteří chtějí vědět, co se v Přezleticích děje — bez ohledu na to, jaké technologie používají.",
        ],
      },
    ],
    socialCopy: "Ne každý sleduje Facebook nebo Instagram. Ne každý používá chytrý telefon či počítač. Přesto mají mít všichni obyvatelé Přezletic přístup k důležitým informacím o dění v obci. Proto chceme otevřít debatu o pravidelném tištěném zpravodaji: s přehledem obecních témat, praktickým servisem, reportážemi z akcí a prostorem pro samotné obyvatele. Ne jako propagační leták, ale jako užitečný a důvěryhodný zdroj pro všechny generace.",
    carousel: [
      "Ne každý je každý den online.",
      "Informace o obci ale potřebují všechny generace.",
      "Tištěný zpravodaj může doplnit web a sociální sítě.",
      "Dění v obci, akce, rozvoj a zprávy ze zastupitelstva.",
      "Praktické rady, místní servis a reportáže.",
      "Prostor také pro obyvatele a spolky.",
      "Ne propagační leták. Užitečný zdroj pro Přezletice.",
    ],
    cta: "Přečtěte si návrh Romany Bernardové a řekněte nám, co by měl přezletický zpravodaj obsahovat.",
    markdownPath: "content/articles/proc-prezletice-potrebuji-zpravodaj.md",
    primaryImage: "/images/candidates/romana-bernardova.webp",
    galleryImages: [
      "/images/projects/komunitni-centrum-zlatak.webp",
      "/images/projects/elektronicka-uredni-deska.webp",
    ],
    projectIds: [3, 34],
    socialPostIds: [],
    sourceLinks: [
      "content/articles/proc-prezletice-potrebuji-zpravodaj.md",
      "Adresář souborů PJ2603/P R O Č Přezletický zpravodaj.doc",
      "Jednotliví kandidáti/Romana Bernardová.docx",
    ],
    checks: [
      "Schválit, zda má zpravodaj vycházet čtvrtletně, nebo jednou za dva měsíce.",
      "Doplnit odpovědnou redakční roli, způsob distribuce a finanční rámec.",
      "Schválit pravidla pro příspěvky obyvatel, místní inzerci, opravy a zpětnou vazbu.",
    ],
  },
  {
    slug: "co-bude-s-dalsi-developerskou-vystavbou",
    title: "Co bude s další developerskou výstavbou v Přezleticích",
    byline: "Břetislav Lukeš · redakčně zpracováno v kampaňovém stylu",
    candidateId: 8,
    status: "copy-ke-schvaleni",
    pillar: "Vysvětlování + Plány + Dokumenty a důkazy",
    summary: "Samostatný vysvětlující článek podle podkladu Břetislava Lukeše, který rozlišuje rozpracované západní projekty od dalších zastavitelných ploch a popisuje, kam má obec soustředit další energii.",
    perex: "Debata o další výstavbě v Přezleticích často zní jako jednoduchá volba mezi růstem a úplným zastavením. Ve skutečnosti je potřeba oddělit projekty, které už prošly dlouhou přípravou, od území, kde se o budoucích pravidlech teprve rozhoduje.",
    body: [
      {
        heading: "Development není jedna nerozlišená plocha",
        paragraphs: [
          "Na západní straně obce jsou lokality, které se připravují řadu let. Vedle nich zůstávají další zastavitelné plochy, u nichž příprava není ve stejné fázi. Tyto dvě situace proto nelze posuzovat stejným způsobem ani spojovat do jednoho obecného hesla.",
          "U rozpracovaných projektů musí obec hlídat dohodnutá pravidla, návaznost na infrastrukturu a splnění závazků. U dalších ploch je nejdřív potřeba odpovědět, zda je obec pro svůj rozvoj vůbec potřebuje a jaké limity mají platit.",
        ],
      },
      {
        heading: "Co už je na západě obce rozpracované",
        paragraphs: [
          "Autorský podklad zmiňuje projekty Bílá vrátka, Panská pole a Panská vinice jako území v pokročilé projektové přípravě. Obec u nich dlouhodobě řeší zastavovací studie, podmínky výstavby, kapacitu území a povinnosti investorů vůči veřejné infrastruktuře.",
          "To neznamená, že je každý detail definitivně uzavřený. Znamená to, že další práce má navazovat na konkrétní dokumenty a dohody, nikoli začínat znovu pouze na základě předvolebního hesla.",
        ],
      },
      {
        heading: "Nová část obce musí přinést také služby",
        paragraphs: [
          "Nová výstavba má dopad na školu, dopravu, vodu, kanalizaci i každodenní služby. Proto nestačí sledovat pouze počet domů. Podstatné je, zda s novou částí obce vznikne také odpovídající veřejný prostor, rekreační a sportovní zázemí, občanská vybavenost a propojení se stávajícími Přezleticemi.",
          "Lukešův podklad pracuje s představou historické a novodobé části obce, které nemají stát proti sobě. Mají se doplňovat a potkávat v místech, jež slouží celé obci — například u školy, služeb a veřejných prostranství.",
        ],
      },
      {
        heading: "Další růst nemá být automatický",
        paragraphs: [
          "Jakmile se započítají rozpracované projekty a jejich nároky, je namístě velmi opatrně posuzovat otevírání dalších ploch. Každý další záměr musí být poměřován kapacitou školy, dopravy, sítí, služeb a veřejného prostoru.",
          "Pracovní podklad obsahuje také konkrétní odhady budoucího počtu obyvatel. Ty před zveřejněním nepřebíráme jako hotový fakt. Musí být porovnány s platným územním plánem, schválenými studiemi a aktuálními demografickými údaji.",
        ],
      },
      {
        heading: "Územní plán určuje prostor pro rozhodování",
        paragraphs: [
          "O budoucnosti zbývajících ploch nemůže rozhodnout jedna věta ani jedno volební období. Klíčové jsou platné územně plánovací dokumenty, jejich změny a právní nástroje, které obec skutečně může použít.",
          "Smyslem změn územního plánu má být jasně popsat, jakou podobu má obec v budoucnu mít, které funkce jí chybějí a jak chránit kvalitu života před růstem, který by předběhl veřejnou infrastrukturu.",
        ],
      },
      {
        heading: "Energii soustředit na dokončení a kvalitu",
        paragraphs: [
          "Podle Břetislava Lukeše má obec v další etapě soustředit energii především na dokončení rozpracovaných území a na využití jejich potenciálu. Patří sem vzdělávání, zdravotní a sociální služby, rekreační a sportovní plochy i kvalitní propojení nové a historické části obce.",
          "Nejde tedy jen o otázku, kde se ještě může stavět. Důležitější je, zda Přezletice dokážou dotáhnout připravené projekty tak, aby přinesly služby a prostředí, které budou dlouhodobě fungovat pro současné i budoucí obyvatele.",
        ],
      },
    ],
    socialCopy: "Další developerská výstavba není jedna jednoduchá otázka. Projekty Bílá vrátka, Panská pole a Panská vinice jsou podle autorského podkladu v jiné fázi než zbývající zastavitelné plochy. U rozpracovaných lokalit musí obec hlídat pravidla, infrastrukturu a závazky. U dalších se má nejdřív ptát, zda je vůbec potřebuje. Prioritou má být dokončit připravené projekty a soustředit energii na školu, služby, veřejný prostor, sport a propojení celé obce.",
    carousel: [
      "Development není jedna nerozlišená plocha.",
      "Západní projekty už prošly dlouhou přípravou.",
      "U nich je potřeba hlídat pravidla, infrastrukturu a závazky.",
      "Další zastavitelné plochy jsou v jiné fázi.",
      "Jejich otevření nemá být automatické.",
      "Nejdřív dokončit připravené a posílit služby obce.",
      "Každé číselné tvrzení musí potvrdit platné dokumenty.",
    ],
    cta: "Přečtěte si pohled Břetislava Lukeše na to, co dokončit a jak posuzovat další výstavbu.",
    markdownPath: "content/articles/co-bude-s-dalsi-developerskou-vystavbou.md",
    primaryImage: "/images/brand/social/prezletaci-social-blue.png",
    galleryImages: [
      "/images/projects/rekonstrukce-mistnich-komunikaci.webp",
      "/images/projects/rekonstrukce-prutahovych-komunikaci.webp",
      "/images/projects/lavka-a-verejne-plochy-zlaty-kopec.webp",
    ],
    projectIds: [],
    socialPostIds: [],
    sourceLinks: [
      "content/articles/co-bude-s-dalsi-developerskou-vystavbou.md",
      "TK2603-0392/VOLBY 2026 Lukeš rozvoj obce brzda.docx",
      "TK2603-0394/VOLBY 2026_stop develop.docx",
    ],
    checks: [
      "Ověřit aktuální stav projektů Bílá vrátka, Panská pole a Panská vinice v platných dokumentech.",
      "Doplnit veřejné odkazy na územní plán, stavební uzávěru, zastavovací studie a případné plánovací smlouvy.",
      "Konkrétní odhady počtu obyvatel zveřejnit pouze po kontrole proti platným studiím a aktuálním demografickým údajům.",
      "Před publikací provést právní kontrolu formulací o závazcích investorů a stavu jednotlivých řízení.",
    ],
  },
  {
    slug: "verejny-prostor-zelen-a-sportoviste",
    title: "Veřejný prostor, zeleň a sportoviště: jak využít každý dostupný prostor",
    byline: "Lenka Brožová · redakčně zpracováno v kampaňovém stylu",
    candidateId: 9,
    status: "copy-ke-schvaleni",
    pillar: "Hotová práce + Rozdělané věci + Plány",
    summary: "Nový článek o tom, proč jsou obecní pozemky pro veřejný prostor cenné, jak Přezletice pracují s omezeným místem a proč musí zeleň a sportoviště vznikat podle společné koncepce.",
    perex: "Veřejný prostor není prázdné místo mezi domy. Je to prostor pro stromy, pohyb, odpočinek i setkávání. Přezletice mají obecních pozemků omezené množství, a proto je potřeba každý z nich využívat promyšleně a hledat řešení, která propojí více potřeb najednou.",
    body: [
      {
        heading: "Veřejné plochy ovlivňují každodenní život",
        paragraphs: [
          "Kvalitu obce neurčují jen domy a komunikace. Stejně důležité je, kolik prostoru zbývá pro stromy, hřiště, cesty, odpočinek a obyčejné sousedské setkávání. Právě veřejné plochy rozhodují o tom, jestli se dá obcí pohodlně projít, kde si mohou hrát děti a zda mají lidé důvod zůstávat venku i mimo cestu z bodu A do bodu B.",
          "Zeleň a sportoviště proto nevnímáme jako doplněk, který přichází na řadu až po ostatních stavbách. Jsou součástí základní infrastruktury obce a musí se s nimi počítat už při plánování nových i upravovaných lokalit.",
        ],
      },
      {
        heading: "Přezletice pracují s omezeným prostorem",
        paragraphs: [
          "Ve srovnání s řadou jiných obcí mají Přezletice omezené množství pozemků ve vlastnictví obce, které lze využít pro nové veřejné plochy. Neznamená to, že se s veřejným prostorem nedá nic dělat. Znamená to ale, že každé rozhodnutí má větší váhu a často vyžaduje kompromis mezi zelení, sportem, dopravou, technickými sítěmi a dalšími službami.",
          "Někde je překážkou malé nebo členité území, jinde nevhodné podloží či vedení sítí. Dobré řešení proto nevzniká podle jedné univerzální šablony. Musí vycházet z konkrétního místa a z toho, co v dané části obce skutečně chybí.",
        ],
      },
      {
        heading: "Inspirace ano, mechanické kopírování ne",
        paragraphs: [
          "Je užitečné sledovat, jak veřejné plochy fungují v jiných obcích a městech. Inspirací mohou být parky, uliční zeleň, přírodní hřiště, sportovní plochy i způsoby, jak propojit několik funkcí na jednom místě.",
          "Každou inspiraci ale musíme převést do přezletických podmínek. Řešení, které funguje ve velkém městském parku, nemusí být vhodné pro malou plochu mezi ulicí, parkováním a inženýrskými sítěmi. Smyslem není kopírovat vzhled, ale pochopit princip a použít ho tam, kde přinese skutečný užitek.",
        ],
      },
      {
        heading: "Zeleň má být krásná i funkční",
        paragraphs: [
          "Květinové a trvalkové záhony, keře, stromy nebo travnaté plochy mají v obci různé role. Mohou přinášet stín, zachytávat prach, pomáhat s vodou, oddělovat dopravu od pobytového prostoru a zároveň vytvářet příjemnější prostředí.",
          "Důležitá je také následná péče. Každá nová výsadba musí odpovídat místním podmínkám a možnostem údržby. Jen tak nebude krátkodobým efektem, ale dlouhodobou součástí veřejného prostoru.",
        ],
      },
      {
        heading: "Sportoviště jsou také místem setkávání",
        paragraphs: [
          "Sportovní plocha neslouží jen lidem, kteří přijdou trénovat. Dětská hřiště, workout, pétanque nebo prostor u rybníka mohou přirozeně propojovat různé generace a vytvářet místa, kde se lidé potkávají i bez organizované akce.",
          "Při plánování proto nestačí vyřešit samotné sportovní vybavení. Důležité jsou také přístupové cesty, bezpečnost, stín, zeleň, místa k sezení a budoucí provoz. Dobré sportoviště funguje jako součást širšího veřejného prostoru, ne jako izolovaný prvek.",
        ],
      },
      {
        heading: "Co chceme při dalším rozvoji hlídat",
        paragraphs: [
          "Další veřejné plochy chceme připravovat koncepčně, ve spolupráci s odborníky a s jasným popisem toho, komu mají sloužit. Tam, kde nová výstavba zvyšuje nároky na obec, musí být součástí jednání také odpovídající veřejná infrastruktura a kvalitní prostor pro zeleň, sport a setkávání.",
          "Cílem není zaplnit každé volné místo. Cílem je využít omezené obecní pozemky tak, aby jednotlivé projekty dávaly dohromady srozumitelný celek a zlepšovaly každodenní život v Přezleticích.",
        ],
      },
    ],
    socialCopy: "Veřejný prostor není prázdné místo mezi domy. Je to místo pro stromy, pohyb, odpočinek i setkávání. Přezletice mají omezené množství obecních pozemků, a proto je potřeba každý z nich využívat promyšleně. Zeleň, hřiště, cesty, stín i místa k sezení musí vznikat jako jeden funkční celek — podle konkrétního místa a potřeb lidí, kteří ho používají.",
    carousel: [
      "Veřejný prostor není zbytková plocha.",
      "Přezletice mají omezené množství obecních pozemků.",
      "Každé místo proto musí řešit více potřeb najednou.",
      "Zeleň má přinášet stín, vodu, klid i příjemnější prostředí.",
      "Sportoviště jsou zároveň místem sousedského setkávání.",
      "Inspirujeme se jinde, ale řešení přizpůsobujeme Přezleticím.",
      "Další projekty musí vznikat jako součást společné koncepce.",
    ],
    cta: "Podívejte se, proč chceme zeleň, sportoviště a další veřejné plochy plánovat jako jeden celek.",
    markdownPath: "content/articles/verejny-prostor-zelen-a-sportoviste.md",
    primaryImage: "/images/projects/lavka-a-verejne-plochy-zlaty-kopec.webp",
    galleryImages: [
      "/images/projects/zelen-mistni-komunikace.webp",
      "/images/projects/sportovne-relaxacni-centrum-u-rybnika.webp",
      "/images/projects/detska-hriste.webp",
      "/images/projects/workoutove-hriste.webp",
      "/images/projects/petanque-nohavice.webp",
    ],
    projectIds: [6, 19, 20, 23, 25, 26, 31, 32, 33],
    socialPostIds: [],
    sourceLinks: [
      "content/articles/verejny-prostor-zelen-a-sportoviste.md",
      "TK2603-0394/článek - Veřejné plochy, zeleň a sportoviště final.docx",
    ],
    checks: [
      "Ověřit přesný rozsah obecních pozemků určených pro veřejnou zeleň a sport před případným použitím číselného srovnání.",
      "Doplnit stav a termíny jednotlivých připravovaných projektů pouze z aktuálních projektových podkladů.",
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
          "Naše východisko je jednoduché. Chceme pokračovat v práci, kterou už v Přezleticích děláme, otevřeně vysvětlovat složitější témata a soustředit se na věci, které mají dopad na každodenní život lidí v obci.",
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
      {
        heading: "Co je pro nás nejdůležitější",
        paragraphs: [
          "Doprava a infrastruktura. Bezpečný pohyb obcí, stav komunikací, chodníků a technických sítí patří k základním věcem, které lidé vnímají každý den. U každé větší priority chceme ukazovat současný stav, odpovědnost a nejbližší proveditelný krok.",
          "Školství a kapacity. Rostoucí obec musí dlouhodobě řešit školku, školu, jídelnu i návazné služby. Nestačí říct, že kapacitu chceme. Je potřeba vysvětlovat, jak spolu souvisí pozemky, projekty, financování, svazek obcí, povolení a provoz.",
          "Veřejný prostor a zeleň. Ulice, parky, stromy a místa pro setkávání nejsou ozdoba navíc. Rozhodují o tom, jak se v obci chodí, odpočívá, potkává a jak dobře veřejný prostor funguje v horku, dešti i při běžné údržbě.",
          "Sport, volný čas, komunita a sociální vazby. Obec není jen soubor domů. Potřebuje místa a příležitosti, kde se lidé potkávají: sportoviště, spolky, sousedské akce, prostor pro děti, seniory i celé rodiny. Stejně důležité je podporovat vztahy mezi starousedlíky a novými obyvateli, mezi generacemi i mezi sousedy, kteří by se jinak míjeli.",
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
    ],
    socialCopy: "Volby nejsou jen o heslech. Jsou o tom, kdo bude každý týden řešit konkrétní věci, které ovlivňují život v Přezleticích. Náš program stojí na několika prioritách: doprava a infrastruktura, školství, zeleň, veřejný prostor, služby, bezpečnost, rozumný rozvoj, kultura, sport, sousedské vztahy, digitalizace a odpovědné hospodaření. Jednotlivým tématům se budeme v dalších týdnech věnovat do hloubky — v postech, článcích a konkrétních příkladech z obce.",
    carousel: [
      "Program není seznam slibů.",
      "Začínáme tím, co lidé řeší každý den.",
      "Doprava, škola, zeleň a veřejný prostor.",
      "Služby, bezpečnost a rozumný rozvoj.",
      "Kultura, sport, sousedské vztahy a komunikace.",
      "Každé téma postupně rozebereme do hloubky.",
      "Konkrétně: co je hotové, co je rozdělané a co bude další krok.",
    ],
    cta: "Sledujte nás. Jednotlivé části programu budeme postupně vysvětlovat v dalších postech a článcích do voleb.",
    markdownPath: "content/articles/volebni-program-prezletice-2026-2030.md",
    primaryImage: "/images/team/team-wide-01.webp",
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
