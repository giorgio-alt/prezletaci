export type ArticleContent = {
  slug: string;
  title: string;
  candidateId?: number;
  status: "ready";
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
  imageDescriptions?: Record<string, { alt: string; caption?: string }>;
  publicSources?: { label: string; href: string }[];
  projectIds: number[];
  socialPostIds: number[];
  sourceLinks: string[];
};

export function getArticleImageDescription(article: ArticleContent, image: string) {
  return article.imageDescriptions?.[image] ?? {
    alt: `Fotografie k článku ${article.title}`,
  };
}

export function articleToMarkdown(article: ArticleContent) {
  const primaryImage = getArticleImageDescription(article, article.primaryImage);
  const gallery = article.galleryImages.length
    ? [
        "## Fotografie a obrazové podklady",
        "",
        ...article.galleryImages.flatMap((image) => {
          const description = getArticleImageDescription(article, image);
          return [
            `![${description.alt}](${image})`,
            ...(description.caption ? ["", `_${description.caption}_`] : []),
            "",
          ];
        }),
      ]
    : [];
  const sources = article.publicSources?.length
    ? [
        "## Veřejné zdroje",
        "",
        ...article.publicSources.map((source) => `- [${source.label}](${source.href})`),
        "",
      ]
    : [];

  return [
    `# ${article.title}`,
    "",
    article.perex,
    "",
    `![${primaryImage.alt}](${article.primaryImage})`,
    ...(primaryImage.caption ? ["", `_${primaryImage.caption}_`] : []),
    "",
    ...article.body.flatMap((section) => [
      `## ${section.heading}`,
      "",
      ...section.paragraphs.flatMap((paragraph) => [paragraph, ""]),
    ]),
    ...gallery,
    ...sources,
  ].join("\n");
}

export const articleContent: ArticleContent[] = [
  {
    slug: "zelen-v-prezleticich",
    title: "Co pro nás znamená péče o zeleň v Přezleticích",
    status: "ready",
    pillar: "Hotová práce + Rozdělané věci + Plány",
    summary: "Péče o zeleň jako dlouhodobá práce se stromy a alejemi, ulicemi, okolím podzemních kontejnerů, komunitním centrem i následnou údržbou.",
    perex: "Zeleň v obci není jen otázka toho, kde se něco zasadí. Je to dlouhodobá práce s místem, vodou, stínem, údržbou i tím, jak lidé ulicemi každý den procházejí. Pro nás proto péče o zeleň znamená postupnou práci se stromy a alejemi, průtahovými komunikacemi, rekonstruovanými ulicemi, okolím podzemních kontejnerů i komunitního centra.",
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
        heading: "Stromy a aleje pomáhají zvládat horké dny",
        paragraphs: [
          "Důležitou součástí zeleně jsou také aleje. Hruškové aleje a další stromové výsadby dávají ulicím a cestám přirozenou strukturu, poskytují stín a propojují jednotlivé části obce. Jejich přínos přitom není okamžitý: stromy potřebují čas, prostor a pravidelnou péči, aby mohly dlouhodobě fungovat.",
          "S přibývajícími horkými dny je stín ve veřejném prostoru stále důležitější. Ne všude ale lze strom bezpečně vysadit — rozhodují inženýrské sítě, rozhledové poměry, dostupný prostor i následná údržba. Proto chceme aleje a další výsadby plánovat tam, kde mají šanci prospívat a kde budou mít pro obec skutečný význam.",
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
          "Nejdůležitější část práce se zelení začíná až po výsadbě. Strom nebo záhon nestačí založit. Musí mít následnou péči, jasný režim údržby a pravidelné hodnocení stavu.",
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
    socialCopy: "Co pro nás znamená péče o zeleň v Přezleticích? Není to jen otázka výsadby. Je to práce s místem, vodou, stínem i dlouhodobou údržbou. Patří sem stromy a aleje, zeleň u průtahových komunikací, výsadby v rekonstruovaných ulicích i okolí podzemních kontejnerů a komunitního centra. Někde dává smysl strom, jinde trvalky a keře, jinde hlavně dobrý plán péče. Důležité je, aby zeleň nebyla pouze dekorací, ale funkční součástí obce, která pomáhá i během horkých dnů.",
    carousel: ["Co pro nás znamená péče o zeleň?", "Stromy a aleje přinášejí stín a propojují obec.", "U průtahů zeleň pomáhá s prachem a mikroklimatem.", "V malých uličních plochách často trávník nedává smysl.", "Trvalky a keře lépe snášejí horko a složitou údržbu.", "Technická místa, třeba kontejnery, mohou vypadat lépe.", "Nejdůležitější práce začíná po výsadbě: péče, přehled a plán."],
    cta: "Přečtěte si, co pro nás péče o zeleň znamená a co připravujeme dál.",
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
  },
  {
    slug: "nova-radnice-centrum-obce",
    title: "Nová radnice jako nové centrum obce",
    status: "ready",
    pillar: "Plány + Vysvětlujeme + Dokumenty a důkazy",
    summary: "Aktualizovaný architektonický návrh nové radnice jako propojení Horní návsi, prostoru Na Rynku, Dolní návsi a budoucího společenského centra.",
    perex: "Nová radnice nemá být jen další obecní budova. Architektonický návrh aktualizovaný v únoru 2025 ji popisuje jako příležitost znovu oživit centrum Přezletic, propojit Horní a Dolní náves a vytvořit místo, které bude sloužit úřadu, veřejným akcím i každodennímu setkávání lidí.",
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
          "Nedostatek prostoru není jen budoucí problém. Už dnes je počet zaměstnanců obecního úřadu vzhledem k objemu práce pod potřebnou úrovní a pro další pracovní místo ve stávající budově není prostor.",
          "Podle očekávaného vývoje mají Přezletice v dohledné době dosáhnout přibližně 3 000 obyvatel. S růstem obce přibývají povinnosti a specializované agendy. Aby bylo pro občany i zaměstnance jasné, kdo co vyřizuje a za co odpovídá, bude potřeba úřad personálně posílit a jeho práci rozdělit do jednotlivých odborů s jasnými kompetencemi.",
          "Samotná současná budova proto nemůže obsáhnout všechny funkce, které má rostoucí obec zajišťovat: přehledný a otevřený úřad, knihovnu, veřejná jednání, společenské aktivity i bezprostřední vazbu na veřejný prostor. Nejde o volbu mezi starou a novou radnicí. Smyslem je využít stávající úřad a doplnit ho o kapacitu a funkce, které už dnes chybějí.",
        ],
      },
      {
        heading: "Kdo novou radnici zaplatí",
        paragraphs: [
          "Výstavba nové radnice nemá být hrazena z obecního rozpočtu. Podle dohodnutých závazků ji mají financovat a postavit developeři.",
          "Role obce přitom není pasivní. Obec určila požadovanou podobu budovy a navazujícího veřejného prostoru. V další přípravě bude dohlížet na to, aby provedení odpovídalo schválenému návrhu, dohodnutým podmínkám a požadované kvalitě.",
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
          "Aktualizovaný návrh z února 2025 pracuje s hrubou podlažní plochou nové budovy přibližně 1 001 m² a navrhuje 17 parkovacích stání. Obsahuje také hrubý odhad stavebních nákladů ve výši 47,219 milionu Kč včetně venkovních úprav, ale bez demolic a úprav stávající budovy pro obecní policii.",
          "Je důležité říct fér věc: tato částka není aktuální rozpočet stavby ani suma, kterou má zaplatit obec. Je to odhad ze studie, který se bude měnit podle další projektové přípravy, stavebního trhu, technického řešení a návazných kroků. Financování a realizaci mají podle dohodnutých závazků zajistit developeři.",
          "Právě proto má smysl o projektu mluvit otevřeně a průběžně. Ne slibovat hotovou stavbu bez kontextu, ale ukazovat, jaký problém obec řeší, jaký návrh je na stole, co dává smysl a co zatím zůstává otevřené.",
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
    socialCopy: "Proč nestačí současná radnice? Už dnes je počet zaměstnanců úřadu vzhledem k objemu práce pod potřebnou úrovní a další pracovní místo se do budovy nevejde. Přezletice se přitom v dohledné době mají přiblížit 3 000 obyvatelům. S růstem obce přibývají povinnosti a agendy, které bude potřeba rozdělit do odborů s jasnými kompetencemi. Stávající budova zůstane součástí obecního centra. Novou radnici mají podle dohodnutých závazků financovat a postavit developeři, nikoli obecní rozpočet. Obec určila její podobu a bude dohlížet na soulad a kvalitu provedení.",
    carousel: ["Proč nestačí současná radnice?", "Už dnes chybí prostor pro další zaměstnance.", "S růstem obce k 3 000 obyvatelům přibývají povinnosti a agendy.", "Úřad bude potřebovat odbory s jasnými kompetencemi.", "Stávající budova zůstane součástí obecního centra.", "Novou radnici mají financovat a postavit developeři.", "Obec určila podobu a bude dohlížet na soulad a kvalitu."],
    cta: "Přečtěte si, co koncept nové radnice navrhuje a proč nejde jen o novou budovu.",
    markdownPath: "content/articles/nova-radnice-centrum-obce.md",
    primaryImage: "/images/articles/nova-radnice-studie-exterier.webp",
    galleryImages: [
      "/images/articles/nova-radnice-studie-situace.webp",
      "/images/articles/nova-radnice-studie-pruchod.webp",
      "/images/articles/nova-radnice-studie-rynek.webp",
    ],
    imageDescriptions: {
      "/images/articles/nova-radnice-studie-exterier.webp": {
        alt: "Vizualizace navrhované budovy obecního úřadu v Přezleticích z pohledu Horní návsi",
        caption: "Pohled na novou budovu obecního úřadu podle studie aktualizované v únoru 2025.",
      },
      "/images/articles/nova-radnice-studie-situace.webp": {
        alt: "Situační výkres nové radnice a prostoru Na Rynku mezi Veleňskou a ulicí V Uličce",
        caption: "Situační návrh propojení nové radnice, stávajícího úřadu a prostoru Na Rynku.",
      },
      "/images/articles/nova-radnice-studie-pruchod.webp": {
        alt: "Vizualizace průhledu z nové radnice do prostoru Na Rynku",
        caption: "Průhled z interiéru radnice směrem do nového veřejného prostoru.",
      },
      "/images/articles/nova-radnice-studie-rynek.webp": {
        alt: "Vizualizace pěšího propojení a prostoru Na Rynku u nové radnice",
        caption: "Navrhovaný prostor Na Rynku má propojit obě návsi a nabídnout místo pro setkávání.",
      },
    },
    projectIds: [16, 34, 35, 3],
    socialPostIds: [141],
    sourceLinks: [
      "content/articles/nova-radnice-centrum-obce.md",
      "content-audit/03_vystupy/05_hotove_clanky_zelen_radnice.md",
      "OU Studie R5.pdf",
    ],
  },
  {
    slug: "kapacita-skol-a-skolek",
    title: "Jak vznikala kapacita škol a školek",
    status: "ready",
    pillar: "Hotová práce + Rozdělané věci + Vysvětlování",
    summary: "Školní a předškolní kapacita nevzniká jedním rozhodnutím, ale kombinací spolupráce, projektů, financování a navazujících kroků.",
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
          "Obec se s nedostatkem kapacit vyrovnávala postupně. Ještě v červenci 2011 zajišťovala mateřskou školu v pronajatých prostorách ve Vinoři. V roce 2013 skončila spádová dohoda s Vinoří pro Přezletice, Jenštejn i Podolanku. Tím se potřeba vlastního dlouhodobého řešení stala ještě naléhavější.",
          "Zápis zastupitelstva z 30. července 2014 zachycuje tehdejší plán požádat o dotaci na jednu další třídu mateřské školy a jednu třídu malé základní školy. Zastupitelstvo tehdy samo uvedlo, že jde o řešení odpovídající aktuálním potřebám, nikoli o definitivní odpověď na další demografický vývoj.",
        ],
      },
      {
        heading: "Od jedné třídy ke společnému řešení",
        paragraphs: [
          "V březnu 2015 vznikl svazek obcí Přezletice, Podolanka a Jenštejn. Tím se změnilo měřítko řešení: místo jedné provizorní třídy začala příprava školy pro širší spádové území. Současně bylo nutné vyřešit pozemek, protože obec v lokalitě Bílých vrátek vlastnila spoluvlastnický podíl, nikoli samostatně oddělený pozemek připravený pro stavbu školy.",
          "Jednání v roce 2015 vedla k oddělení pozemku pro školu a k nastavení základních podmínek spolupráce v území. Právě tato posloupnost vysvětluje, proč se školní kapacita nedá popsat jednou stavbou ani jedním rozhodnutím: nejdřív bylo potřeba zajistit pozemek, spolupráci obcí a projektový rámec, teprve potom bylo možné připravovat a stavět.",
        ],
      },
      {
        heading: "Proč svazkové řešení",
        paragraphs: [
          "U základní školy dává v našem území smysl spolupráce více obcí. Svazkové řešení není zkratka, ale způsob, jak se dostat k větší kapacitě a rozdělit odpovědnost i finanční zátěž mezi obce, kterých se problém týká. Jedna škola zároveň znamená jedno vedení a společný personální i provozní rámec namísto několika malých samostatných organizací.",
          "V době založení svazku podle tehdejšího vedení nebyl otevřený vhodný dotační titul a Přezletice měly po převzetí vedení k dispozici přibližně 800 tisíc korun, prakticky jen na běžný provoz. Samostatně by obec projekt tohoto rozsahu financovat nedokázala. Spojení obcí umožnilo náklady rozložit a vytvořit partnera, který mohl připravit větší projekt.",
          "Když byl následně vypsán dotační titul, svazkové projekty měly zvýhodněnou spoluúčast: 15 procent oproti 30 procentům u samostatných obcí. Také současná státní politika podporuje společné zajišťování školských služeb a sdílení řízení. Konkrétní podmínky podpory se ale v čase mění a každý další krok se musí řídit platnými pravidly.",
        ],
      },
      {
        heading: "Co se podařilo a co navazuje",
        paragraphs: [
          "V Přezleticích už je za námi kus práce: školka, svazková škola, školní jídelna i výdejní systém. Jídelna neslouží jen žákům školy. Připravuje stravu také pro školku, zásobuje výdejní automaty pro obyvatele a zajišťuje občerstvení při obecních kulturních a společenských akcích.",
          "Jídelna funguje jako samostatná příspěvková organizace. Její hospodaření je součástí celkového provozu a dalšího rozvoje školského areálu.",
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
          "Svazek v současnosti zajišťuje povolení dočasné kontejnerové nájemní školy, která má překlenout období do dokončení druhé etapy. Podle nastavených podmínek se má developer v případě, že řádná školní budova nebude v dohodnutém termínu hotová, podílet na financování nájmu. Rozsah této povinnosti a rozhodné termíny vycházejí ze smluvních podmínek.",
          "Současně se připravuje projekt druhé etapy školy s plánovanou kapacitou 450 žáků. Je hotová demografická studie, probíhají jednání s MŠMT o možnostech zařazení do dotační podpory, soutěží se projektant zastavovací studie a skládá se finanční rámec včetně příspěvků developerů. O vývoji jednotlivých kroků chceme průběžně informovat a uvádět jejich aktuální stav, odpovědnost a nejbližší milník.",
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
      "/images/articles/bila-vratka-podminenost-skoly.webp",
    ],
    imageDescriptions: {
      "/images/articles/bila-vratka-podminenost-skoly.webp": {
        alt: "Text územního plánu stanovující podmínky výstavby školy, školky a retenčních ploch v lokalitě Bílá vrátka",
        caption: "Územní plán spojil výstavbu bydlení v části lokality A1 s přípravou školy, školky a retenčních ploch.",
      },
    },
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
  },
  {
    slug: "rozvoj-obce-a-uzemni-plan",
    title: "Kolik rozvoje Přezletice unesou",
    status: "ready",
    pillar: "Plány + Vysvětlování + Dokumenty a důkazy",
    summary: "Rozumný rozvoj obce, limity územního plánování a to, co obec může a nemůže ovlivnit při nové výstavbě.",
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
          "Dnešní rozvoj není jedna nerozlišená plocha. Na západní straně obce jsou projekty Bílá vrátka, Panská pole a Panská vinice v pokročilé přípravě a obec u nich dlouhodobě řeší zastavovací studie, podmínky výstavby i veřejnou infrastrukturu. Zbývající zastavitelné části obce jsou v jiné fázi a pravidla pro ně se teprve musí posoudit v širších souvislostech.",
          "Tohle rozlišení je důležité. U rozpracovaných lokalit je úkolem obce hlídat dodržení dohodnutých podmínek a návaznost na školu, dopravu, sítě a veřejný prostor. U dalších ploch je naopak potřeba nejdřív rozhodnout, zda je obec vůbec potřebuje a jaké limity musí platit, aby další výstavba nezhoršila problémy, které už dnes řešíme.",
        ],
      },
      {
        heading: "Nejdřív využít a dokončit to, co je připravené",
        paragraphs: [
          "Další postup by měl stát na jednoduché prioritě: energii obce soustředit na dokončení rozpracovaných území a na služby, které budou obyvatelé potřebovat. Patří sem vzdělávání, zdravotní a sociální služby, rekreační a sportovní plochy i propojení nové a historické části obce.",
          "Teprve s tímto přehledem lze odpovědně říct, kolik dalšího rozvoje Přezletice unesou. Rozhodování musí vycházet z platného územního plánu, schválených studií a aktuálních údajů o obyvatelích. Princip je ale jasný už teď: další růst nemá být automatický, ale odvozený od kapacity obce a od kvality života.",
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
    primaryImage: "/images/articles/uzemni-plan-2001.webp",
    galleryImages: [
      "/images/articles/uzemni-plan-etapizace-2011.webp",
      "/images/projects/rekonstrukce-prutahovych-komunikaci.webp",
      "/images/projects/zelen-mistni-komunikace.webp",
      "/images/projects/lavka-a-verejne-plochy-zlaty-kopec.webp",
    ],
    imageDescriptions: {
      "/images/articles/uzemni-plan-2001.webp": {
        alt: "Hlavní výkres územního plánu Přezletic z dubna 2001",
        caption: "Územní plán Přezletic z roku 2001 zachycoval tehdejší rozsah zastavitelných ploch.",
      },
      "/images/articles/uzemni-plan-etapizace-2011.webp": {
        alt: "Výkres etapizace a podmíněnosti změn využití územního plánu Přezletic z roku 2011",
        caption: "Výkres etapizace územního plánu účinného od listopadu 2011.",
      },
    },
    projectIds: [8, 9, 20, 33],
    socialPostIds: [121, 123],
    sourceLinks: [
      "content/articles/rozvoj-obce-a-uzemni-plan.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
      "TK2603-0394/VOLBY 2026_stop develop.docx",
      "TK2603-0392/VOLBY 2026 Lukeš rozvoj obce brzda.docx",
      "TK2603-0395/Podmíněnost UP.pdf",
    ],
  },
  {
    slug: "bila-vratka-pozemek-skola",
    title: "Bílá vrátka v kontextu dvou developerských projektů",
    status: "ready",
    pillar: "Vysvětlování + Dokumenty a důkazy",
    summary: "Doložená časová osa k Bílým vrátkům, navazujícímu developerskému území, pozemkům pro školu a rozhodnutím obce.",
    perex: "Bílá vrátka se nedají vysvětlit jako jeden izolovaný projekt ani jednou smlouvou. Na západní straně Přezletic se vedle sebe připravovaly dva developerské záměry a současně se řešil pozemek pro školu, podmínky územního plánu a veřejná infrastruktura. Proto dává smysl poskládat události do časové osy a přesně rozlišit, co dokládají veřejné zápisy a jak do sebe jednotlivé kroky zapadají.",
    body: [
      {
        heading: "Nejde jen o jednu lokalitu",
        paragraphs: [
          "V běžné debatě se pod názvem Bílá vrátka často směšuje širší rozvojové území. Na západní a jihozápadní straně obce se ale připravovaly dva navazující developerské záměry. U jednoho se v zápisech používá označení lokalita A, Bílá vrátka – Ke Ctěnicím. Druhý záměr v témže západním území připravovala společnost OBADI.",
          "Oba projekty mají vlastní majetkové a smluvní souvislosti, ale pro obec se jejich dopady potkávají: u školy, dopravní a technické infrastruktury i veřejných ploch. Popsat celé téma jen jako spor o Bílá vrátka by proto zakrylo podstatnou část historie.",
        ],
      },
      {
        heading: "Rok 2011: pozemky a územní plán",
        paragraphs: [
          "Zápis zastupitelstva z 27. července 2011 uvádí, že obec měla podle původních dohod získat jasně určenou část pozemků ještě před schválením územního plánu. Protože podepsané kupní smlouvy nebyly v té době předložené, zastupitelstvo stanovilo termín a připravovalo i možnost nezahrnout lokalitu A, Bílá vrátka – Ke Ctěnicím, do zastavitelných ploch.",
          "V září 2011 zastupitelstvo pověřilo starostku podpisem kupních smluv. Prosincový zápis následně zaznamenal, že obec získala spoluvlastnický podíl odpovídající sedmi hektarům a že fyzické rozdělení pozemků mělo následovat až po zpracování studie. To je důležitý rozdíl: obec získala významný majetkový podíl, ale pozemek pro konkrétní veřejnou stavbu ještě nebyl samostatně oddělený.",
          "Územní plán účinný od listopadu 2011 zároveň stanovil pro část lokality A1 konkrétní návaznost: bydlení zde bylo podmíněno předchozím umístěním, povolením a zahájením stavby základní školy, povolením mateřské školy nejméně o dvou odděleních a vybudováním retenčních ploch.",
        ],
      },
      {
        heading: "Škola změnila význam celého rozhodnutí",
        paragraphs: [
          "Potřeba školního pozemku se stala naléhavější poté, co v roce 2013 skončila spádová dohoda s Vinoří. V červenci 2014 ještě zastupitelstvo připravovalo žádost o dotaci na jednu třídu mateřské školy a jednu třídu malé základní školy. Samo přitom uvedlo, že nejde o definitivní řešení a že obec bude muset dál reagovat na demografický vývoj.",
          "Po vzniku svazku obcí v roce 2015 začala příprava školy ve větším měřítku. Následovala jednání se spoluvlastníky a developerem o oddělení pozemku pro školu a o podmínkách spolupráce v území.",
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
        heading: "Co ukazuje časová osa",
        paragraphs: [
          "Veřejné zápisy zachycují debatu o jasně vymezené části pozemků, následné nabytí spoluvlastnického podílu, přípravu malé školní kapacity i převod dalších pozemků od druhého developera. Další vývoj souvisel se vznikem svazku obcí a s přípravou samostatného školního pozemku.",
          "Cílem časové osy není vyhrát slovní přestřelku. Má dát lidem přehled o dvou projektech a jejich společných dopadech, aby si mohli udělat názor na základě informací, ne dojmů.",
        ],
      },
    ],
    socialCopy: "Bílá vrátka nejsou celý příběh. Na západní straně Přezletic se připravovaly dva navazující developerské projekty a současně se řešil pozemek pro školu. Veřejné zápisy ukazují debatu o vymezení pozemků, nabytí spoluvlastnického podílu i další kroky kolem školní kapacity. Připravili jsme proto časovou osu, která odděluje oba projekty a propojuje jejich společné dopady na školu a infrastrukturu.",
    carousel: ["Bílá vrátka nejsou celý příběh.", "V západním území se připravovaly dva developerské projekty.", "Rok 2011: podíl na pozemcích ještě nebyl samostatným školním pozemkem.", "Rok 2014: obec řešila malou školní kapacitu i další pozemky v území.", "Rok 2015: svazek obcí a příprava školy změnily měřítko řešení.", "Společné dopady: škola, doprava, sítě a veřejný prostor.", "Veřejné dokumenty pomáhají jednotlivé kroky zasadit do souvislostí."],
    cta: "Projděte si časovou osu dvou developerských projektů a jejich souvislost se školou.",
    markdownPath: "content/articles/bila-vratka-pozemek-skola.md",
    primaryImage: "/images/articles/uzemni-plan-etapizace-2011.webp",
    galleryImages: [
      "/images/articles/uzemni-plan-2001.webp",
      "/images/articles/bila-vratka-podminenost-skoly.webp",
      "/images/projects/rozsireni-kapacity-svazkove-skoly.webp",
      "/images/projects/elektronicka-uredni-deska.webp",
    ],
    imageDescriptions: {
      "/images/articles/uzemni-plan-etapizace-2011.webp": {
        alt: "Výkres etapizace územního plánu Přezletic s vyznačenými lokalitami A až H",
        caption: "Výkres rozlišuje jednotlivé lokality a zobrazuje podmíněnost části A1 v Bílých vrátkách.",
      },
      "/images/articles/uzemni-plan-2001.webp": {
        alt: "Hlavní výkres územního plánu Přezletic z dubna 2001",
        caption: "Podoba územního plánu z roku 2001 před pozdějším rozšířením zastavitelných ploch.",
      },
      "/images/articles/bila-vratka-podminenost-skoly.webp": {
        alt: "Text podmínek územního plánu pro školu, školku a retenční plochy v lokalitě Bílá vrátka",
        caption: "Podmínky pro povolení bydlení v části A1 podle územního plánu.",
      },
    },
    publicSources: [
      { label: "Územní plán a stavební podklady obce Přezletice", href: "https://prezletice.cz/mapove-podklady" },
      { label: "Zápisy ze zasedání zastupitelstva obce", href: "https://prezletice.cz/minutes/" },
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
  },
  {
    slug: "hasici-v-prezleticich",
    title: "Hasiči v Přezleticích: co se stalo a co by obnova vyžadovala",
    candidateId: 1,
    status: "ready",
    pillar: "Vysvětlování + Plány + Dokumenty a důkazy",
    summary: "Co zastupitelstvo rozhodlo o jednotce dobrovolných hasičů v roce 2012, jak je zajištěna požární ochrana a co by vyžadovala obnova.",
    perex: "Přezletice měly vlastní hasičský spolek i obecní jednotku požární ochrany. Zastupitelstvo v květnu 2012 rozhodlo o zrušení jednotky, zatímco samostatný spolek měl tehdy pokračovat. Dnes v obci vlastní jednotka nepůsobí. Pokud ji chceme obnovit, je fér říct nejen proč, ale také co všechno takový krok vyžaduje.",
    body: [
      {
        heading: "Spolek a obecní jednotka nejsou totéž",
        paragraphs: [
          "Dobrovolný hasičský spolek je komunitní organizace, která může pořádat akce, pracovat s dětmi a udržovat hasičskou tradici. Jednotka sboru dobrovolných hasičů obce je naproti tomu součástí systému požární ochrany. Odpovídá za ni obec a její členové, technika i připravenost musí splňovat stanovené podmínky.",
          "Obě části se mohou přirozeně doplňovat, ale jedna automaticky nenahrazuje druhou. Obnova komunitního spolku a zřízení akceschopné obecní jednotky jsou dva samostatné kroky.",
        ],
      },
      {
        heading: "Co se stalo v roce 2012",
        paragraphs: [
          "Zápis ze zasedání zastupitelstva ze dne 25. května 2012 zachycuje tři navazující rozhodnutí. Zastupitelé projednali petici proti rušení hasičů, schválili smlouvu o zajištění požární bezpečnosti s obcí Podolanka a následně souhlasili se zrušením přezletické obecní jednotky.",
          "Zápis zároveň výslovně uvádí, že se tehdy nerušil samotný hasičský spolek. Obec deklarovala ochotu jednat o jeho dalším fungování a spolupráci. Původní spolek však později také ukončil činnost.",
        ],
      },
      {
        heading: "Jak je zajištěna požární ochrana",
        paragraphs: [
          "Požární řád obce z roku 2014 uvádí, že Přezletice nemají vlastní jednotku sboru dobrovolných hasičů a úkoly požární ochrany pro obec zajišťuje na základě smlouvy jednotka obce Podolanka. Při mimořádných událostech se podle poplachového plánu zapojují také další profesionální a dobrovolné jednotky.",
          "To znamená, že zrušením vlastní jednotky požární ochrana obce nezanikla. Přezletice ale přišly o vlastní místní tým, který by byl připraven pomáhat nejen u požárů, ale také při dalších mimořádných událostech.",
        ],
      },
      {
        heading: "Co by obnova jednotky vyžadovala",
        paragraphs: [
          "U běžné jednotky kategorie JPO V stanoví pravidla základní početní stav devíti členů. Nestačí je pouze získat: jednotka potřebuje velitele, strojníky a hasiče s odpovídající odbornou přípravou, pravidelným výcvikem a schopností vyjet v předepsaném počtu.",
          "Obec musí zároveň zajistit vhodné zázemí, požární techniku, ochranné prostředky, spojení, údržbu, pojištění a trvalé financování. Konkrétní podobu jednotky je nutné nastavit s Hasičským záchranným sborem podle plošného pokrytí a skutečných potřeb Přezletic.",
        ],
      },
      {
        heading: "Jak chceme postupovat",
        paragraphs: [
          "Chceme obnovu dobrovolných hasičů podpořit jako skutečný dlouhodobý projekt. Prvním krokem je dát dohromady skupinu zájemců a společně s Hasičským záchranným sborem určit reálnou podobu jednotky. Na to musí navázat plán zázemí, vybavení, školení a víceletého financování.",
          "Vedle zásahové připravenosti má smysl znovu budovat také komunitní rozměr hasičského spolku. Dobrovolní hasiči mohou spojovat generace, pracovat s dětmi, pomáhat při obecních akcích a navázat na tradici, která byla dlouhá léta součástí života Přezletic.",
        ],
      },
    ],
    socialCopy: "Přezletice měly vlastní hasičský spolek i obecní jednotku. Zastupitelstvo v roce 2012 rozhodlo o zrušení jednotky a požární bezpečnost následně zajistilo smluvně s Podolankou. Chceme dobrovolné hasiče obnovit, ale jako skutečný dlouhodobý projekt: s lidmi, výcvikem, zázemím, vybavením a stabilním financováním. Vedle zásahové pomoci chceme vrátit obci také komunitu, která spojuje generace a navazuje na místní tradici.",
    carousel: ["Přezletice měly spolek i obecní jednotku.", "Zastupitelstvo v roce 2012 zrušilo jednotku, ne tehdejší spolek.", "Požární ochranu následně zajišťuje smluvně Podolanka.", "Obnova potřebuje nejméně devět vyškolených členů.", "Nutné je zázemí, technika, vybavení a stabilní rozpočet.", "Chceme obnovit zásahovou pomoc i komunitní tradici."],
    cta: "Přečtěte si, co se s přezletickými hasiči stalo a jak může jejich obnova reálně proběhnout.",
    markdownPath: "content/articles/hasici-v-prezleticich.md",
    primaryImage: "/images/projects/obecni-policie.webp",
    galleryImages: [],
    imageDescriptions: {
      "/images/projects/obecni-policie.webp": {
        alt: "Budova obecní policie v Přezleticích",
        caption: "Obnova vlastní jednotky vyžaduje vedle lidí a vybavení také odpovídající zázemí.",
      },
    },
    publicSources: [
      { label: "Zápis zastupitelstva z 25. května 2012", href: "https://prezletice.cz/uploads/minutes/lx6m_zapis-4-12.pdf" },
      { label: "Požární řád obce Přezletice", href: "https://prezletice.cz/uploads/publicNotices/x50q_ozv-1-14.pdf" },
      { label: "Informace HZS k jednotkám požární ochrany", href: "https://hzscr.gov.cz/clanek/menu-jednotky-pozarni-ochrany-jednotky-pozarni-ochrany-jednotky-po.aspx" },
      { label: "Metodika HZS pro zřizování obecních jednotek", href: "https://hzscr.gov.cz/metodika-pro-zrizovani-jednotek-sboru-dobrovolnych-hasicu-obci" },
    ],
    projectIds: [29, 34],
    socialPostIds: [145],
    sourceLinks: [
      "content/articles/hasici-v-prezleticich.md",
      "content-audit/03_vystupy/02_clanky_a_socialni_derivaty.md",
      "TK2603-0395/Hasiči - Jak jsme o ně přišli.docx",
    ],
  },
  {
    slug: "jak-overujeme-tvrzeni",
    title: "Jak ověřujeme tvrzení o historii obce",
    status: "ready",
    pillar: "Vysvětlování + Dokumenty a důkazy",
    summary: "Jak rozlišujeme tvrzení, zdroje, kontext, míru jistoty a politické hodnocení při debatě o historii obce.",
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
          "Kde existuje veřejný odkaz, chceme ho u článku zpřístupnit. Pokud veřejný dokument chybí, nebudeme tvrzení vydávat za doložené.",
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
  },
  {
    slug: "proc-prezletice-potrebuji-zpravodaj",
    title: "Proč Přezletice potřebují vlastní zpravodaj",
    candidateId: 3,
    status: "ready",
    pillar: "Plány + Lidé + Vysvětlování",
    summary: "Tištěný obecní zpravodaj může zpřístupnit informace také lidem bez sociálních sítí, chytrého telefonu nebo počítače.",
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
          "Zpravodaj může vznikat také s pomocí samotných obyvatel. Může dávat prostor pozvánkám, zkušenostem, fotografiím nebo tématům, která přinášejí spolky, sousedé a lidé aktivní v obci.",
          "Takový přístup může pomoci zachytit dění, které se do běžných úředních oznámení nevejde, a současně posílit vztah lidí k místu, kde žijí.",
        ],
      },
      {
        heading: "Jak často by měl vycházet",
        paragraphs: [
          "O konkrétní periodicitě je potřeba ještě rozhodnout. Nabízejí se dvě možnosti: čtvrtletní nebo dvouměsíční vydávání. Výsledná frekvence musí odpovídat množství užitečného obsahu, času potřebnému na kvalitní přípravu i nákladům na výrobu a distribuci.",
          "Nejdůležitější není vydávat co nejčastěji. Důležitější je, aby každé číslo přineslo ověřené, srozumitelné a praktické informace a dostalo se skutečně ke všem domácnostem, pro které je určené.",
        ],
      },
      {
        heading: "Jak může zpravodaj fungovat",
        paragraphs: [
          "Zpravodaj může vycházet pravidelně, mít jasnou podobu, předvídatelnou distribuci a otevřená pravidla pro příspěvky obyvatel a spolků. Důležitá je také srozumitelně uvedená odpovědnost za obsah, možnost zpětné vazby a opravy nepřesností.",
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
    cta: "Přečtěte si, co může přezletický zpravodaj přinést, a řekněte nám, co by měl obsahovat.",
    markdownPath: "content/articles/proc-prezletice-potrebuji-zpravodaj.md",
    primaryImage: "/images/projects/elektronicka-uredni-deska.webp",
    galleryImages: [
      "/images/projects/komunitni-centrum-zlatak.webp",
    ],
    imageDescriptions: {
      "/images/projects/elektronicka-uredni-deska.webp": {
        alt: "Elektronická úřední deska v Přezleticích",
        caption: "Tištěný zpravodaj může doplnit digitální informační kanály obce.",
      },
      "/images/projects/komunitni-centrum-zlatak.webp": {
        alt: "Komunitní centrum Zlaták v Přezleticích",
        caption: "Zpravodaj může přinášet informace o obecních i sousedských akcích.",
      },
    },
    projectIds: [3, 34],
    socialPostIds: [],
    sourceLinks: [
      "content/articles/proc-prezletice-potrebuji-zpravodaj.md",
      "Adresář souborů PJ2603/P R O Č Přezletický zpravodaj.doc",
      "Jednotliví kandidáti/Romana Bernardová.docx",
    ],
  },
  {
    slug: "co-bude-s-dalsi-developerskou-vystavbou",
    title: "Co bude s další výstavbou v Přezleticích",
    candidateId: 8,
    status: "ready",
    pillar: "Vysvětlování + Plány + Dokumenty a důkazy",
    summary: "Co už je v západní části obce rozpracované, co může obec ovlivnit a proč další růst nemá být automatický.",
    perex: "Když v obci přibudou domy, přibudou také děti ve škole, auta na silnicích a nároky na vodu, kanalizaci i služby. Proto není poctivé shrnout další výstavbu do jednoduchého „stavět“, nebo „nestavět“. Nejdřív musíme odlišit rozpracované projekty od ploch, o jejichž budoucnosti se teprve rozhoduje.",
    body: [
      {
        heading: "Nové domy mění každodenní život",
        paragraphs: [
          "Další výstavbu pocítíme všichni. Ve škole, v dopravě, při využívání vody a kanalizace i při hledání místa pro sport, odpočinek nebo běžné služby. Proto nás nezajímá jen počet nových domů. Důležité je, co spolu s nimi vznikne pro celou obec.",
          "Rozumné rozhodování začíná tím, že si přiznáme skutečný stav. Některé projekty se připravují řadu let. Jiné plochy jsou sice podle územního plánu zastavitelné, ale nejsou ve stejné fázi. Tyto situace nelze spojit do jednoho hesla.",
        ],
      },
      {
        heading: "Co už je v západní části obce rozpracované",
        paragraphs: [
          "Bílá vrátka, Panská pole a Panská vinice jsou v pokročilé projektové přípravě. Obec u nich dlouhodobě řeší zastavovací studie, podmínky výstavby, kapacitu území a povinnosti investorů vůči veřejné infrastruktuře.",
          "Neznamená to, že je každý detail definitivně uzavřený. Znamená to ale, že další postup musí vycházet z platných dokumentů, uzavřených dohod a možností, které má obec podle práva. U těchto projektů chceme důsledně hlídat pravidla, infrastrukturu a splnění závazků.",
        ],
      },
      {
        heading: "S bydlením musí přijít také služby",
        paragraphs: [
          "Nová část obce nemůže být jen souborem domů. Potřebuje také veřejný prostor, rekreační a sportovní zázemí, občanskou vybavenost a dobré propojení se stávajícími Přezleticemi.",
          "Historická a nová část obce nemají stát proti sobě. Mají se potkávat u školy, služeb a na veřejných prostranstvích, která slouží všem. Právě podle toho chceme posuzovat kvalitu připravovaných projektů.",
        ],
      },
      {
        heading: "Další plochy neotevírat automaticky",
        paragraphs: [
          "Vedle rozpracovaných projektů zůstávají další zastavitelné plochy. Jejich otevření nemá být automatické. Nejdřív potřebujeme vědět, zda je obec pro svůj rozvoj vůbec potřebuje a co by další výstavba znamenala pro školu, dopravu, sítě, služby a veřejný prostor.",
          "Budoucí počet obyvatel nelze odvozovat z jediného orientačního odhadu. Rozhodnutí musí vycházet z platného územního plánu, schválených studií a aktuálních demografických údajů.",
        ],
      },
      {
        heading: "Co může obec skutečně ovlivnit",
        paragraphs: [
          "Obec nemůže o každém projektu rozhodovat bez omezení. Musí respektovat územní plán, platné dohody, správní postupy a práva vlastníků. Může však využívat nástroje, které jí zákon dává, vyjednávat podmínky a otevřeně vysvětlovat jejich dopad.",
          "U změn územního plánu je potřeba jasně říct, jakou podobu mají Přezletice v budoucnu mít, které služby jim chybějí a jak zabránit tomu, aby růst předběhl veřejnou infrastrukturu. To je odpovědnější než slibovat výsledek, který obec sama nemůže zaručit.",
        ],
      },
      {
        heading: "Další krok: dokončit připravené a hlídat kvalitu",
        paragraphs: [
          "Za rozumný další krok považujeme dokončení rozpracovaných území a důsledné sledování plnění dohodnutých podmínek. Současně chceme připravovat školu, služby, veřejný prostor, sportovní plochy a propojení nové a historické části obce.",
          "Teprve s těmito podklady má smysl rozhodovat o dalších plochách. Naším měřítkem nebude počet postavených domů, ale to, zda se v Přezleticích bude dobře žít současným i budoucím sousedům.",
        ],
      },
    ],
    socialCopy: "Každý nový dům přináší také větší nároky na školu, dopravu, vodu, kanalizaci a služby. Proto nechceme mluvit o další výstavbě jedním heslem. Bílá vrátka, Panská pole a Panská vinice už prošly dlouhou přípravou; u nich je potřeba hlídat pravidla, infrastrukturu a závazky. Další zastavitelné plochy jsou v jiné fázi a jejich otevření nemá být automatické. Nejdřív chceme dokončit připravené projekty a posílit to, co obec potřebuje pro každodenní život.",
    carousel: [
      "Nové domy znamenají větší nároky na školu, dopravu i služby.",
      "Ne všechny rozvojové plochy jsou ve stejné fázi.",
      "Bílá vrátka, Panská pole a Panská vinice už prošly dlouhou přípravou.",
      "U nich chceme hlídat pravidla, infrastrukturu a závazky.",
      "Otevření dalších ploch nemá být automatické.",
      "Obec musí rozhodovat podle platných dokumentů a skutečných kapacit.",
      "Další krok: dokončit připravené projekty a posílit služby pro celou obec.",
    ],
    cta: "Přečtěte si, co už je rozpracované, co může obec ovlivnit a jaký navrhujeme další krok.",
    markdownPath: "content/articles/co-bude-s-dalsi-developerskou-vystavbou.md",
    primaryImage: "/images/articles/uzemni-plan-etapizace-2011.webp",
    galleryImages: [
      "/images/articles/uzemni-plan-2001.webp",
      "/images/projects/rekonstrukce-mistnich-komunikaci.webp",
      "/images/projects/rekonstrukce-prutahovych-komunikaci.webp",
      "/images/projects/lavka-a-verejne-plochy-zlaty-kopec.webp",
    ],
    imageDescriptions: {
      "/images/articles/uzemni-plan-etapizace-2011.webp": {
        alt: "Výkres etapizace územního plánu Přezletic s rozvojovými lokalitami A až H",
        caption: "Územní plán z roku 2011 rozlišuje jednotlivé rozvojové lokality a jejich podmínky.",
      },
      "/images/articles/uzemni-plan-2001.webp": {
        alt: "Hlavní výkres územního plánu Přezletic z dubna 2001",
        caption: "Původní územní plán z roku 2001 pro srovnání s pozdějším rozsahem rozvojových ploch.",
      },
    },
    projectIds: [],
    socialPostIds: [],
    sourceLinks: [
      "content/articles/co-bude-s-dalsi-developerskou-vystavbou.md",
      "TK2603-0392/VOLBY 2026 Lukeš rozvoj obce brzda.docx",
      "TK2603-0394/VOLBY 2026_stop develop.docx",
    ],
  },
  {
    slug: "verejny-prostor-zelen-a-sportoviste",
    title: "Veřejný prostor, zeleň a sportoviště: jak využít každý dostupný prostor",
    candidateId: 9,
    status: "ready",
    pillar: "Hotová práce + Rozdělané věci + Plány",
    summary: "Jak z omezených obecních pozemků vytvořit místa, která přinášejí stín, pohyb, odpočinek i příležitost potkat sousedy.",
    perex: "Když jdete s dítětem na hřiště, hledáte v létě stín nebo si chcete na chvíli sednout a potkat sousedy, poznáte, jak důležitý je dobrý veřejný prostor. Přezletice mají obecních pozemků omezené množství. O to pečlivěji musíme promýšlet, jak každý z nich využít.",
    body: [
      {
        heading: "Veřejný prostor začíná cestou z domu",
        paragraphs: [
          "Veřejný prostor používáme každý den, často aniž o tom přemýšlíme. Je to cesta, po které se dá bezpečně projít, strom dávající stín, lavička k odpočinku i místo, kde si hrají děti a potkávají se sousedé.",
          "Zeleň a sportoviště proto nejsou ozdobou, která přijde na řadu až po ostatních stavbách. Patří k základnímu vybavení obce a je potřeba s nimi počítat už při plánování nových i upravovaných lokalit.",
        ],
      },
      {
        heading: "Místa je málo, proto musí sloužit chytře",
        paragraphs: [
          "Přezletice mají pro nové veřejné plochy omezené obecní pozemky. Každé rozhodnutí proto váží víc. Na jednom místě se často potkávají potřeby zeleně, sportu, dopravy, technických sítí i dalších služeb.",
          "Někde je pozemek malý nebo členitý, jinde využití omezuje podloží či vedení sítí. Ne všechno je tedy v moci obce a stejné řešení nefunguje všude. Potřebujeme vycházet z konkrétního místa a z toho, co v jeho okolí lidem skutečně chybí.",
        ],
      },
      {
        heading: "Co už nám ukazují místní projekty",
        paragraphs: [
          "Uliční zeleň, dětská hřiště, venkovní posilovna, pétanque nebo prostor pro sport a odpočinek u rybníka ukazují různé způsoby, jak může obecní pozemek sloužit lidem. Každé místo má jinou velikost, okolí i možnosti údržby.",
          "Inspiraci můžeme hledat i v jiných obcích. Nemá ale smysl jen kopírovat vzhled. Potřebujeme pochopit, proč řešení funguje, a přizpůsobit ho přezletickým podmínkám.",
        ],
      },
      {
        heading: "Zeleň má být krásná i funkční",
        paragraphs: [
          "Květinové a trvalkové záhony, keře, stromy i travnaté plochy mají různé role. Přinášejí stín, zachytávají prach, pomáhají zadržet vodu, oddělují dopravu od míst pro odpočinek a zpříjemňují ulice.",
          "Výsadba ale potřebuje také dlouhodobou péči. Musí odpovídat místním podmínkám i možnostem údržby. Jen tak nebude krátkodobým efektem, ale skutečnou součástí obce.",
        ],
      },
      {
        heading: "Sportoviště jsou také místem setkávání",
        paragraphs: [
          "Sportovní plocha neslouží jen lidem, kteří přijdou trénovat. Dětské hřiště, venkovní posilovna, pétanque nebo prostor u rybníka přirozeně propojují generace. Lidé se tu potkávají i bez organizované akce.",
          "Samotné sportovní vybavení proto nestačí. Potřebujeme řešit také bezpečný přístup, stín, zeleň, místa k sezení a budoucí provoz. Dobré sportoviště není osamocený prvek. Je součástí místa, kde spolu lidé tráví čas.",
        ],
      },
      {
        heading: "Další krok: společná koncepce pro zeleň, sport a setkávání",
        paragraphs: [
          "Další veřejné plochy chceme připravovat podle společné koncepce, s odborníky a s jasným popisem toho, komu mají sloužit. U každého místa chceme nejdřív prověřit potřeby lidí, podmínky pozemku, náklady na vybudování i budoucí péči.",
          "Kde nová výstavba zvýší nároky na obec, musí se jednat také o odpovídající veřejné infrastruktuře a prostoru pro zeleň, sport a setkávání. Cílem není zaplnit každé volné místo. Cílem je, aby jednotlivé projekty tvořily srozumitelný celek a zlepšovaly každodenní život v Přezleticích.",
        ],
      },
    ],
    socialCopy: "Strom dávající stín, bezpečná cesta, lavička, hřiště i místo pro setkání. Veřejný prostor používáme každý den. Přezletice mají omezené množství obecních pozemků, a proto potřebujeme každý z nich využít promyšleně. Zeleň, sport, cesty i místa k odpočinku chceme plánovat jako jeden celek — podle konkrétního místa, potřeb lidí a možností dlouhodobé péče.",
    carousel: [
      "Veřejný prostor používáme každý den.",
      "Je to stín, bezpečná cesta, lavička, hřiště i místo pro setkání.",
      "Přezletice mají omezené množství obecních pozemků.",
      "Každé místo proto musí promyšleně spojit více potřeb.",
      "Zeleň má pomáhat s horkem, vodou i příjemnějším prostředím.",
      "Sportoviště jsou také místem sousedského setkávání.",
      "Další krok: společná koncepce pro zeleň, sport a setkávání.",
    ],
    cta: "Přečtěte si, jak chceme omezené obecní pozemky využívat pro zeleň, pohyb, odpočinek i setkávání.",
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
  },
  {
    slug: "volebni-program-prezletice-2026-2030",
    title: "Volební program Přezleťáků: co je pro nás nejdůležitější",
    status: "ready",
    pillar: "Plány + Lidé + Vysvětlování",
    summary: "Priority programu Přezleťáků 2026–2030 a jejich propojení s navazujícími tematickými texty.",
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
  },
];

export const articleContentBySlug = new Map(articleContent.map((article) => [article.slug, article]));
