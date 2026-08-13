export type CandidateContentUpdate = {
  id: number;
  headline: string;
  headlineStatus: string;
  bio: string;
  socialCopy: string;
  topics: string[];
  documents: string[];
  reviewNotes: string[];
};

export const candidateContentUpdates: CandidateContentUpdate[] = [
  {
    id: 1,
    headline: "Přezletice jsou můj domov. A o domov se má člověk starat dlouhodobě.",
    headlineStatus: "ke schválení kandidátem",
    bio: "V Přezleticích žije prakticky celý život a od listopadu 2014 je starostou obce. Profesně vede společnost zaměřenou na požární a záchranářskou techniku; v obci se soustředí na dlouhodobý rozvoj, infrastrukturu a podmínky pro každodenní život.",
    socialCopy: "Tomáš Říha je Přezleťák tělem i duší. V obci žije prakticky celý život a od roku 2014 ji vede jako starosta. Vedle komunální práce působí v oboru požární a záchranářské techniky.\n\nZa nejdůležitější považuje, aby se obec rozvíjela podle jasného plánu a přitom zůstala dobrým místem pro každodenní život. Chce navázat na práci v oblasti škol, komunikací, sportovišť a veřejné zeleně a pokračovat v projektech, které mají pro obec konkrétní přínos.",
    topics: ["Vedení obce", "Dlouhodobý rozvoj", "Doprava a infrastruktura", "Školství", "Sport", "Veřejná zeleň"],
    documents: ["Jednotliví kandidáti/Tomáš Říha - volby 2026.docx"],
    reviewNotes: ["Doložit konkrétní realizované projekty, pokud budou jmenovány jako výsledky jeho vedení."],
  },
  {
    id: 2,
    headline: "Dobré projekty musí stát na technické realitě i zdravém rozpočtu.",
    headlineStatus: "ke schválení kandidátem",
    bio: "V Přezleticích žije přes dvacet let. Je truhlář a podnikatel, dvanáct let působí v zastupitelstvu a ve svazku obcí pro výstavbu a provoz svazkové školy; věnuje se stavbám, rozvojovým projektům a rozpočtu.",
    socialCopy: "Jan Macourek přišel do Přezletic před více než dvaceti lety kvůli vlastnímu bydlení a truhlářské živnosti. Dnes zde podniká a už dvanáct let se podílí na práci zastupitelstva i svazku obcí, který zajišťuje výstavbu a provoz svazkové školy.\n\nJeho silnou stránkou je spojování technického pohledu s finanční odpovědností. Chce dál pracovat na dokončení komunikací, dostatečné kapacitě školy, sportovištích, kulturních centrech a veřejné zeleni — vždy s důrazem na proveditelný plán a vyvážený rozpočet.",
    topics: ["Rozpočet", "Investice", "Stavby", "Svazková škola", "Rozvoj obce"],
    documents: ["Jednotliví kandidáti/Jan Macoure1.docx"],
    reviewNotes: ["Ověřit přesnou funkci ve svazku obcí a délku působení v zastupitelstvu k datu zveřejnění."],
  },
  {
    id: 3,
    headline: "Informace o obci musí být dostupné i lidem, kteří nejsou online.",
    headlineStatus: "ke schválení kandidátkou",
    bio: "V Přezleticích trvale žije od roku 2010. Profesní život spojila s novinami, knihami a výrobou publikací; zkušenosti technické redaktorky chce využít pro pravidelný obecní časopis dostupný i lidem bez počítače nebo chytrého telefonu.",
    socialCopy: "Romana Bernardová žije v Přezleticích trvale od roku 2010. Našla tu přátele, sportovní vyžití i místo, které považuje za svůj domov.\n\nCelý profesní život pracovala s textem a tiskem — v novinách a později jako technická redaktorka a vedoucí výroby v knižních nakladatelstvích. Právě tuto zkušenost chce nabídnout obci. Jejím tématem je pravidelný obecní časopis, který přinese důležité informace také seniorům a všem, kdo nepoužívají počítač nebo chytrý telefon.",
    topics: ["Obecní komunikace", "Tištěný zpravodaj", "Senioři", "Dostupnost informací", "Kultura"],
    documents: ["Jednotliví kandidáti/Romana Bernardová.docx"],
    reviewNotes: ["Potvrdit zamýšlenou periodicitu a vztah návrhu ke stávajícím obecním médiím."],
  },
  {
    id: 4,
    headline: "Zeleň není dekorace. Je to dlouhodobá součást fungující obce.",
    headlineStatus: "ke schválení kandidátkou",
    bio: "Zahradní a krajinná architektka, která v Přezleticích žije šestnáct let. Má zkušenost ze zastupitelstva i stavebního výboru a chce se věnovat plánování, ochraně a dlouhodobé péči o veřejnou zeleň.",
    socialCopy: "Lenka Bulová žije v Přezleticích šestnáct let. Vystudovala zahradní a krajinnou architekturu a profesně se věnuje návrhům i realizaci soukromé a veřejné zeleně.\n\nZkušenosti získala také jako zastupitelka a nyní ve stavebním výboru. V obci chce prosazovat promyšlené plánování zeleně: dokončení její pasportizace, nastavení následné péče, ochranu stávajících stromů a kvalitní výsadbu v ulicích i nových projektech. Zeleň podle ní musí být krásná, funkční a připravená na měnící se klima.",
    topics: ["Veřejná zeleň", "Krajinná architektura", "Klimatická odolnost", "Veřejný prostor", "Stavební výbor"],
    documents: ["Jednotliví kandidáti/Lenka Bulova.docx", "TK2603-0192/zelen.docx"],
    reviewNotes: ["Ověřit aktuální stav pasportizace a oficiální názvy dokumentů péče o zeleň."],
  },
  {
    id: 5,
    headline: "Moderní služby mají lidem šetřit cestu, čas i energii.",
    headlineStatus: "ke schválení kandidátem",
    bio: "V Přezleticích žije od roku 2014 a pracuje jako projektový manažer v IT a energetice. Chce se věnovat menším technickým projektům, moderním službám a aktivitám, které posilují komunitní život.",
    socialCopy: "Jan Káňa se do Přezletic přestěhoval v roce 2014. Pracuje jako projektový manažer v IT a energetice a je zvyklý převádět potřeby do konkrétních kroků.\n\nV obci se chce zaměřit na menší technické projekty, které mohou zlepšit každodenní život: dostupnější služby, energetická řešení a smysluplné využití moderních technologií. Stejně důležitá je pro něj komunita — podpora spolků, lepší koordinace akcí a prostor, kde se mohou potkávat děti, rodiče i senioři.",
    topics: ["Moderní obecní služby", "Energetika", "Digitalizace", "Komunitní život", "Spolky"],
    documents: ["Jednotliví kandidáti/Jan_Kana_volby_2026_predstaveni_kandidata.docx"],
    reviewNotes: ["Konkrétní služby publikovat jednotlivě až po prověření kompetencí, ekonomiky, pozemků a partnerů."],
  },
  {
    id: 6,
    headline: "Bezpečnost začíná prevencí a znalostí lidí, kteří v obci žijí.",
    headlineStatus: "ke schválení kandidátem",
    bio: "Na Zlatém kopci žije s rodinou patnáct let. Šestnáct let působí u Městské policie hlavního města Prahy, nyní ve vedoucí pozici; v obci se chce věnovat bezpečnosti, prevenci a sportu.",
    socialCopy: "Pavel Řeřucha žije s rodinou na Zlatém kopci patnáct let. Profesně působí šestnáct let u Městské policie hlavního města Prahy a dnes pracuje ve vedoucí pozici na jejím ředitelství.\n\nDo práce pro obec přináší praktickou zkušenost s bezpečností a prevencí. Chce podporovat programy pro děti ve školce a škole i aktivity zaměřené na seniory. Blízký je mu také sport — sám žije aktivně a chce pomáhat lidem, kteří mají chuť zapojit se do sportovního dění v Přezleticích.",
    topics: ["Bezpečnost", "Prevence", "Děti", "Senioři", "Sport"],
    documents: ["Jednotliví kandidáti/Řeřucha.docx"],
    reviewNotes: ["Autorizovat přesné pojmenování pracovní pozice a nezveřejňovat operační podrobnosti."],
  },
  {
    id: 7,
    headline: "Dobré veřejné stravování je služba lidem i investice do zdraví.",
    headlineStatus: "ke schválení kandidátem",
    bio: "V Přezleticích žije šestnáct let a celý profesní život se věnuje gastronomii. Jako kuchař se zkušenostmi z dalšího vzdělávání, soutěží a stáží chce rozvíjet kvalitu veřejného stravování a komunitních akcí.",
    socialCopy: "Václav Šmerda přišel do Přezletic před šestnácti lety za venkovským bydlením a sousedskými vztahy. Celý profesní život se věnuje gastronomii. Vedle kuchařského řemesla vystudoval také cukrářství a hotelnictví a zkušenosti sbíral na soutěžích i odborných stážích.\n\nV obci chce hájit kvalitní veřejné stravování pro děti, rodiče i seniory. Chce dál rozvíjet obecní a školní kuchyni, dostupnost jídla i gastronomické zázemí veřejných akcí. Jeho vizí je obec, kde dobré jídlo podporuje zdraví, vitalitu a spokojenost.",
    topics: ["Veřejné stravování", "Školní jídelna", "Zdraví", "Místní služby", "Komunitní akce"],
    documents: ["Jednotliví kandidáti/Václav Šmerda.docx"],
    reviewNotes: ["Ověřit aktuální pracovní pozici a konkrétní ocenění, pokud mají být jmenována."],
  },
  {
    id: 8,
    headline: "Obec se nemá jen zvětšovat. Musí zůstat krásná, funkční a promyšlená.",
    headlineStatus: "ke schválení kandidátem",
    bio: "Architekt, který v Přezleticích žije pětatřicet let a deset let působí jako zastupitel. Dlouhodobě se věnuje územnímu plánování, veřejným stavbám a prostorům i projednávání stavebních záměrů.",
    socialCopy: "Břetislav Lukeš žije v Přezleticích pětatřicet let. Jako architekt a zastupitel dlouhodobě pomáhá s územním plánováním, veřejnými stavbami i podobou míst, která lidé používají každý den.\n\nPodílel se na přípravě návrhů pro školku, komunitní centrum, lékařskou ordinaci, kapličku, sokolovnu a další veřejné prostory. V další práci chce dál prosazovat rozvoj, který má jasnou koncepci, respektuje charakter obce a propojuje praktickou funkci s kvalitní architekturou.",
    topics: ["Architektura", "Územní plán", "Veřejný prostor", "Obecní stavby", "Development"],
    documents: ["Jednotliví kandidáti/Břetislav Lukeš.odt", "TK2603-0192/Studie radnice.pdf", "TK2603-0392/VOLBY 2026 Lukeš rozvoj obce brzda.docx"],
    reviewNotes: ["U projektů rozlišit autorství návrhu, odbornou spolupráci a rozhodnutí obce; development řešit samostatným zdrojovaným článkem."],
  },
  {
    id: 9,
    headline: "Důvěra vzniká tam, kde obec včas a srozumitelně komunikuje.",
    headlineStatus: "ke schválení kandidátkou",
    bio: "V Přezleticích žije s rodinou přibližně dvacet let a dlouhodobě sleduje dění v obci. Profesně se věnuje nemovitostem, působí ve stavební komisi a chce se zaměřit na rozvoj, sport a lepší komunikaci s veřejností.",
    socialCopy: "Lenka Brožová se s rodinou přestěhovala do Přezletic přibližně před dvaceti lety. Stejně dlouho aktivně sleduje dění v obci a pravidelně se účastní zastupitelstev. Profesně se věnuje nemovitostem a zkušenosti přináší také do stavební komise.\n\nChce být dál součástí promyšleného rozvoje obce a věnovat se také sportovnímu dění. Za klíčové téma považuje otevřenou komunikaci s veřejností. Z vlastní praxe ví, že srozumitelné informace a včasný dialog pomáhají předcházet nedůvěře i zbytečným sporům.",
    topics: ["Komunikace s veřejností", "Rozvoj obce", "Stavební agenda", "Nemovitosti", "Sport"],
    documents: ["Jednotliví kandidáti/Brožová.docx"],
    reviewNotes: ["Ověřit, zda je správně stavební komise, nebo stavební výbor; historii obchvatu publikovat pouze s časovou osou."],
  },
  {
    id: 10,
    headline: "Dobře fungující obec potřebuje srozumitelná pravidla i úřad, který ví, jak je používat.",
    headlineStatus: "ke schválení kandidátem",
    bio: "V Přezleticích žije přes deset let a k širší oblasti má dlouhodobý vztah. Je právník a pracuje ve státní správě; v obci chce uplatnit znalost správního práva a věnovat se infrastruktuře rostoucí obce.",
    socialCopy: "Jakub Tříska žije v Přezleticích přes deset let a k této části regionu má vztah ještě déle. Oceňuje zdejší klid, krajinu a měřítko obce, které dobře zná i ve srovnání s životem ve velkém městě.\n\nJe právník a pracuje ve státní správě, kde se věnuje správnímu právu a fungování úřadů. Tyto zkušenosti chce nabídnout zastupitelstvu. Za důležité považuje připravit obec na další růst: zlepšovat dopravní obslužnost, vytvářet podmínky pro služby a obchody a rozšiřovat místa pro odpočinek.",
    topics: ["Právo", "Veřejná správa", "Doprava", "Služby", "Veřejný prostor"],
    documents: ["Jednotliví kandidáti/Jakub Tříska.docx"],
    reviewNotes: ["Potvrdit pracovní zařazení a formulaci použitelnou bez dojmu, že vystupuje jménem zaměstnavatele."],
  },
  {
    id: 11,
    headline: "Chci, aby se mladí lidé podíleli na tom, jak bude obec vypadat za deset i dvacet let.",
    headlineStatus: "ke schválení kandidátem",
    bio: "V Přezleticích žije od narození. Studuje Fakultu stavební ČVUT a zajímá se o rozvoj obce, infrastrukturu, novou výstavbu a sport.",
    socialCopy: "Vojta Brož žije v Přezleticích od narození. Proměnu obce tak sleduje očima generace, která zde vyrůstala a bude tu žít i s výsledky dnešních rozhodnutí.\n\nStuduje Fakultu stavební ČVUT a zajímá se o novou výstavbu, infrastrukturu a dlouhodobé plánování. Do práce pro obec chce přinést pohled mladého člověka i znalosti ze studia. Aktivně sportuje a rád by se podílel také na sportovních akcích a podmínkách pro pohyb lidí všech generací.",
    topics: ["Mladá generace", "Stavebnictví", "Infrastruktura", "Rozvoj obce", "Sport"],
    documents: ["Jednotliví kandidáti/Vojtěch Brož.docx"],
    reviewNotes: ["Potvrdit veřejnou podobu jména Vojta versus Vojtěch a aktuální studijní status."],
  },
];
