import { projectImageByProjectId } from "./project-images.ts";

export type PublicProjectStatus = "Hotové" | "Rozpracované" | "Plánované";
export type PublicProjectMediaStatus = "available" | "external-source" | "missing";

export type PublicProjectMilestone = {
  label: string;
  state: "hotovo" | "probíhá" | "plán";
};

export type PublicProjectRecord = {
  id: number;
  slug: string;
  title: string;
  area: string;
  status: PublicProjectStatus;
  summary: string;
  details: string[];
  milestones?: PublicProjectMilestone[];
  image?: string;
  imageAlt?: string;
  imageKind?: "fotografie" | "vizualizace";
  mediaStatus: PublicProjectMediaStatus;
  sourceUrls?: { label: string; href: string }[];
};

const ITIS = "https://ouprezletice.itispartner.cz/document.php?hashp=";

const projectFacts: Omit<PublicProjectRecord, "image" | "imageAlt" | "imageKind" | "mediaStatus">[] = [
  { id: 1, slug: "tri-celky-podzemnich-kontejneru", title: "Tři celky podzemních kontejnerů", area: "Životní prostředí", status: "Hotové", summary: "V obci jsou hotové tři celky podzemních kontejnerů.", details: ["Tři stanoviště už slouží obyvatelům. Další lokality jsou součástí programu pro roky 2026–2030."] },
  { id: 2, slug: "digitalizace-plateb-a-agend", title: "Digitalizace plateb a agend", area: "Digitalizace", status: "Rozpracované", summary: "Online služby obce se postupně rozšiřují o další agendy a platby.", details: ["Obec využívá systém ITIS a platební bránu pro poplatky za odpady a psy.", "Systém Mawis pro správu veřejných prostranství je v přípravě."] },
  { id: 3, slug: "elektronicka-uredni-deska", title: "Elektronická úřední deska", area: "Digitalizace", status: "Rozpracované", summary: "První elektronický informační panel stojí před obecním úřadem.", details: ["Panel zpřístupňuje úřední i praktické informace přímo ve veřejném prostoru.", "Další panel je plánovaný pro Zlatý kopec."], milestones: [{ label: "Panel před obecním úřadem", state: "hotovo" }, { label: "Panel na Zlatém kopci", state: "plán" }] },
  { id: 4, slug: "dlouhy-park-pod-skolou", title: "Dlouhý park pod školou", area: "Životní prostředí", status: "Rozpracované", summary: "Park má stavební povolení a postupuje k realizaci.", details: ["Byla podána žádost o dotaci a probíhá výběr zhotovitele.", "Navržený park doplní zeleň a pobytový prostor v okolí školy."], sourceUrls: [{ label: "Vizualizace parku", href: `${ITIS}9Qj0K0H1sM3tWL8dw5eDRWJudu393vzO` }] },
  { id: 5, slug: "park-u-krizovatky-nohavice", title: "Park u křižovatky Nohavice", area: "Životní prostředí", status: "Rozpracované", summary: "Studie parku je hotová a připravuje se dokumentace pro povolení stavby.", details: ["Projekt mění prostor u křižovatky Nohavice na upravenou veřejnou zeleň."], sourceUrls: [{ label: "Studie parku", href: `${ITIS}e845r3306NrvASyZlhWYvUUB2Yf94aaQ` }] },
  { id: 6, slug: "sportovne-relaxacni-centrum-u-rybnika", title: "Sportovně-relaxační centrum u rybníka", area: "Sport a hřiště", status: "Rozpracované", summary: "Sportovní a odpočinkové zázemí u rybníka vzniká po jednotlivých etapách.", details: ["Dětské hřiště, malé multifunkční hřiště a workout už fungují.", "Velké multifunkční hřiště, parkování a související stavby jsou ve výstavbě. Zeleň a stezky u rybníka se připravují.", "Samotný rybník prošel revitalizací už dříve jako samostatný projekt."], milestones: [{ label: "Dětské, malé multifunkční a workoutové hřiště", state: "hotovo" }, { label: "Velké hřiště, parkování a související stavby", state: "probíhá" }, { label: "Zeleň a stezky", state: "plán" }] },
  { id: 7, slug: "rozsireni-kapacity-svazkove-skoly", title: "Rozšíření kapacity svazkové školy", area: "Školství", status: "Rozpracované", summary: "Svazek obcí připravuje dočasné i dlouhodobé rozšíření školní kapacity.", details: ["Kontejnerová škola je v povolovacím procesu.", "Pro další budovu probíhá architektonická soutěž na studii; podkladem je dokončená demografická studie."], milestones: [{ label: "Demografická studie", state: "hotovo" }, { label: "Povolení kontejnerové školy", state: "probíhá" }, { label: "Studie další budovy", state: "probíhá" }] },
  { id: 8, slug: "sportoviste-u-skoly", title: "Sportoviště u školy", area: "Sport a hřiště", status: "Rozpracované", summary: "Projekt sportoviště je hotový a připravuje se dohoda o financování s developerem.", details: ["Koncepční studie řeší sportovní plochy v přímé návaznosti na školní areál.", "Po dokončení smluvního zajištění může navázat další příprava realizace."], sourceUrls: [{ label: "Koncepční studie sportoviště", href: `${ITIS}O5dEoQ9b5xO7wxEBLd6HX7w0mE0u1i7W` }] },
  { id: 9, slug: "opticka-sit-cetin", title: "Optická síť CETIN", area: "Infrastruktura", status: "Rozpracované", summary: "Část optické sítě je hotová a pokračuje příprava dalšího rozšíření.", details: ["Obec se společností CETIN připravuje a upravuje smlouvu pro další část sítě."] },
  { id: 10, slug: "vos-kastanova", title: "VOS Kaštanová", area: "Infrastruktura", status: "Rozpracované", summary: "Kabel pro veřejné osvětlení v Kaštanové se má položit společně s pracemi CETIN.", details: ["Společný postup umožní koordinovat technickou infrastrukturu a omezit opakované zásahy do ulice."] },
  { id: 11, slug: "sokp-520-v-tunelove-variante", title: "SOKP 520 v tunelové variantě", area: "Doprava", status: "Rozpracované", summary: "Obec prosazuje řešení, které co nejvíce omezí dopady okruhu na Přezletice.", details: ["Probíhají jednání s ŘSD a Ministerstvem dopravy. Posouzení EIA je dokončené a pokračuje projektování.", "Projekt se koordinuje s obchvaty a kolejovým spojením; veřejná prezentace byla plánovaná na září."], sourceUrls: [{ label: "Vizualizace zveřejněná k projektu", href: "https://www.facebook.com/photo/?fbid=1483081070483789&set=pcb.1483081153817114" }] },
  { id: 12, slug: "kolejove-spojeni-praha-brandys", title: "Kolejové spojení Praha–Brandýs", area: "Doprava", status: "Rozpracované", summary: "Záměr kolejového spojení se zastávkou v Přezleticích je předložen hodnoticí komisi.", details: ["Další postup závisí na vyhodnocení záměru a rozhodnutí kraje a státu."] },
  { id: 13, slug: "eko-dvur", title: "EKO dvůr", area: "Životní prostředí", status: "Plánované", summary: "Obec získala pozemek pro budoucí EKO dvůr.", details: ["Dalším krokem bude studie, která upřesní podobu, provoz a napojení areálu."] },
  { id: 14, slug: "novy-vodojem", title: "Nový vodojem", area: "Infrastruktura", status: "Plánované", summary: "Nový vodojem má posílit kapacitu a stabilitu zásobování vodou.", details: ["Investorem má být developer; podoba projektu se bude odvíjet od další přípravy a rozvoje obce."] },
  { id: 15, slug: "rozsireni-kapacity-cov", title: "Rozšíření kapacity ČOV", area: "Infrastruktura", status: "Plánované", summary: "Rozšíření čistírny odpadních vod má zajistit kapacitu pro další rozvoj obce.", details: ["Investorem má být developer. Projekt je zatím ve fázi plánování."] },
  { id: 16, slug: "rekonstrukce-sokolovny", title: "Rekonstrukce Sokolovny", area: "Kultura", status: "Plánované", summary: "Studie rekonstrukce Sokolovny je hotová.", details: ["Projekt čeká na navazující přípravu a zajištění financování."], sourceUrls: [{ label: "Studie rekonstrukce", href: `${ITIS}QB8taCs69EW1F8FgsZkk2Yn2qiWQt954` }] },
  { id: 17, slug: "materska-skola-nad-skolou", title: "Mateřská škola nad školou", area: "Školství", status: "Plánované", summary: "Nová mateřská škola je plánovaná jako budoucí kapacita pro rostoucí obec.", details: ["Načasování a velikost projektu se budou řídit skutečným vývojem počtu obyvatel a dětí."] },
  { id: 18, slug: "novy-obecni-urad", title: "Nový obecní úřad", area: "Veřejná správa", status: "Plánované", summary: "Nový úřad má vytvořit dostatečné zázemí pro rostoucí obec a nové agendy.", details: ["Současné prostory už nedávají prostor pro potřebné personální posílení.", "S růstem obce se budou agendy dělit do odborů s jasnými kompetencemi.", "Stavbu nehradí obecní rozpočet: financují a stavějí ji developeři, obec určuje podobu a dohlíží na soulad a kvalitu."], sourceUrls: [{ label: "Studie nového obecního úřadu", href: `${ITIS}WlQOHy12cd1LkdBcJ908j3C31BoV5Ssf` }] },
  { id: 19, slug: "dalsi-lokalni-zelen", title: "Další lokální zeleň", area: "Životní prostředí", status: "Hotové", summary: "Na více místech obce vznikly nové lokální výsadby zeleně.", details: ["Menší zásahy doplňují stromy a další zeleň tam, kde zlepšují veřejný prostor i každodenní pobyt v obci."] },
  { id: 20, slug: "hruskove-aleje-a-dalsi-zelen", title: "Hruškové aleje a další zeleň", area: "Životní prostředí", status: "Hotové", summary: "Hruškové aleje a navazující výsadby doplnily zeleň v krajině i v obci.", details: ["Výsadby podporují stín, biodiverzitu a přirozené propojení cest s okolní krajinou."] },
  { id: 21, slug: "revitalizace-rybnika", title: "Revitalizace rybníka", area: "Životní prostředí", status: "Hotové", summary: "Rybník prošel dokončenou revitalizací.", details: ["Obnovený rybník je součástí přírodního a odpočinkového zázemí obce."] },
  { id: 22, slug: "zahrada-ms", title: "Zahrada mateřské školy", area: "Životní prostředí", status: "Hotové", summary: "Zahrada mateřské školy je hotová a slouží dětem.", details: ["Venkovní prostor rozšiřuje možnosti hry, pohybu a pobytu dětí venku."] },
  { id: 23, slug: "zelen-mistni-komunikace", title: "Zeleň u místních komunikací", area: "Životní prostředí", status: "Rozpracované", summary: "Výsadby podél místních ulic pokračují společně s jejich rekonstrukcemi.", details: ["Část výsadeb je hotová, další vznikají při rekonstrukci Habrové a jsou plánované i v dalších ulicích."], milestones: [{ label: "Dosavadní výsadby", state: "hotovo" }, { label: "Habrová", state: "probíhá" }, { label: "Další ulice", state: "plán" }] },
  { id: 24, slug: "zelen-podzemni-kontejnery", title: "Zeleň u podzemních kontejnerů", area: "Životní prostředí", status: "Hotové", summary: "Okolí podzemních kontejnerů doplnila upravená zeleň.", details: ["Výsadby pomáhají začlenit technická stanoviště do veřejného prostoru."] },
  { id: 25, slug: "zelen-prutahove-komunikace", title: "Zeleň u průtahových komunikací", area: "Životní prostředí", status: "Rozpracované", summary: "Zeleň podél hlavních komunikací se doplňuje po etapách.", details: ["První etapa je hotová, třetí probíhá a druhá je v povolování a plánování."], milestones: [{ label: "První etapa", state: "hotovo" }, { label: "Třetí etapa", state: "probíhá" }, { label: "Druhá etapa", state: "plán" }] },
  { id: 26, slug: "lavka-a-verejne-plochy-zlaty-kopec", title: "Lávka a veřejné plochy Zlatý kopec", area: "Doprava", status: "Hotové", summary: "Lávka a veřejné plochy na Zlatém kopci jsou dokončené.", details: ["Hotové stavby developer předává obci." ] },
  { id: 27, slug: "rekonstrukce-mistnich-komunikaci", title: "Rekonstrukce místních komunikací", area: "Doprava", status: "Rozpracované", summary: "Obnova místních ulic pokračuje po jednotlivých lokalitách.", details: ["Část komunikací je hotová, Habrová se rekonstruuje a pro další ulice se připravují projekty a výběr projektanta."], milestones: [{ label: "Dokončené ulice", state: "hotovo" }, { label: "Habrová", state: "probíhá" }, { label: "Další místní komunikace", state: "plán" }] },
  { id: 28, slug: "rekonstrukce-prutahovych-komunikaci", title: "Rekonstrukce průtahových komunikací", area: "Doprava", status: "Rozpracované", summary: "Rekonstrukce hlavních průtahů obcí pokračuje po etapách.", details: ["První etapa je dokončená, třetí probíhá a druhá je v povolování a plánování."], milestones: [{ label: "První etapa", state: "hotovo" }, { label: "Třetí etapa", state: "probíhá" }, { label: "Druhá etapa", state: "plán" }] },
  { id: 29, slug: "obecni-policie", title: "Obecní policie", area: "Bezpečnost", status: "Rozpracované", summary: "Obecní policie funguje se dvěma strážníky.", details: ["Dalším cílem je rozšířit službu tak, aby dokázala zajišťovat nepřetržitý provoz."], milestones: [{ label: "Zřízení obecní policie", state: "hotovo" }, { label: "Rozšíření služby", state: "plán" }] },
  { id: 30, slug: "druhy-pavilon-ms", title: "Druhý pavilon mateřské školy", area: "Školství", status: "Hotové", summary: "Přístavba druhého pavilonu rozšířila zázemí pro péči o děti.", details: ["V nové části zahájila provoz dětská skupina."] },
  { id: 31, slug: "detska-hriste", title: "Dětská hřiště", area: "Sport a hřiště", status: "Rozpracované", summary: "Síť dětských hřišť v Přezleticích se postupně rozšiřuje.", details: ["Hřiště už fungují u rybníka, na Zlatém kopci, v Ctěnickém háji, Pod Hřebenem a v Ctěnické.", "Další hřiště mají vznikat v nových developerských projektech."], milestones: [{ label: "Pět dokončených lokalit", state: "hotovo" }, { label: "Hřiště v nových lokalitách", state: "plán" }] },
  { id: 32, slug: "petanque-nohavice", title: "Pétanque Nohavice", area: "Sport a hřiště", status: "Hotové", summary: "Pétanque hřiště v lokalitě Nohavice je hotové a v provozu.", details: ["Dokončené hřiště developer předává obci." ] },
  { id: 33, slug: "workoutove-hriste", title: "Workoutové hřiště", area: "Sport a hřiště", status: "Hotové", summary: "Workoutové hřiště je dokončené a slouží veřejnosti.", details: ["Venkovní sportovní prvky rozšiřují možnosti volného pohybu v obci."] },
  { id: 34, slug: "komunitni-centrum-zlatak", title: "Komunitní centrum Zlaťák", area: "Kultura", status: "Hotové", summary: "Komunitní centrum Zlaťák je hotové a vytváří zázemí pro setkávání.", details: ["Prostor slouží komunitním aktivitám na Zlatém kopci."] },
  { id: 35, slug: "kaplicka-a-zvon", title: "Kaplička a zvon", area: "Kultura", status: "Hotové", summary: "Kaplička a zvon jsou dokončené.", details: ["Projekt obnovil drobný veřejný a symbolický prvek v obci."] },
  { id: 36, slug: "postovni-vydejni-boxy", title: "Poštovní výdejní boxy", area: "Infrastruktura", status: "Hotové", summary: "Výdejní boxy rozšířily dostupnost zásilek přímo v obci.", details: ["Další umístění se budou řešit podle potřeb obyvatel a rozvoje nových lokalit." ] },
  { id: 37, slug: "prakticky-lekar-a-ordinace", title: "Praktický lékař a ordinace", area: "Zdraví a sociální oblast", status: "Hotové", summary: "V Přezleticích funguje ordinace praktického lékaře.", details: ["Místní ordinace zlepšila dostupnost základní zdravotní péče pro obyvatele obce."] },
  { id: 38, slug: "vydejni-automaty-stravovani", title: "Výdejní automaty stravování", area: "Zdraví a sociální oblast", status: "Hotové", summary: "Výdejní automaty zpřístupnily možnost vyzvednout si jídlo přímo v obci.", details: ["Další rozšíření se bude řídit zájmem obyvatel a rozvojem obce." ] },
];

const imageOverrides = new Map<number, Pick<PublicProjectRecord, "image" | "imageAlt" | "imageKind">>([
  [4, { image: "/images/projects/dlouhy-park-pod-skolou.webp", imageAlt: "Vizualizace Dlouhého parku pod školou", imageKind: "vizualizace" }],
  [8, { image: "/images/projects/sportoviste-u-skoly.webp", imageAlt: "Vizualizace sportoviště u školy", imageKind: "vizualizace" }],
  [18, { image: "/images/articles/nova-radnice-studie-exterier.webp", imageAlt: "Vizualizace nového obecního úřadu v Přezleticích", imageKind: "vizualizace" }],
]);

export const publicProjectContent: PublicProjectRecord[] = projectFacts.map((project) => {
  const localImage = projectImageByProjectId.get(project.id);
  const override = imageOverrides.get(project.id);
  const image = override?.image ?? localImage?.image;
  return {
    ...project,
    image,
    imageAlt: override?.imageAlt ?? localImage?.imageAlt,
    imageKind: override?.imageKind ?? (localImage ? "fotografie" : undefined),
    mediaStatus: image ? "available" : project.sourceUrls?.length ? "external-source" : "missing",
  };
});

export const publicProjectById = new Map(publicProjectContent.map((project) => [project.id, project]));
export const publicProjectBySlug = new Map(publicProjectContent.map((project) => [project.slug, project]));
export const projectsMissingMedia = publicProjectContent.filter((project) => project.mediaStatus === "missing");

export const publicProjectStatusCounts = publicProjectContent.reduce<Record<PublicProjectStatus, number>>(
  (counts, project) => ({ ...counts, [project.status]: counts[project.status] + 1 }),
  { Hotové: 0, Rozpracované: 0, Plánované: 0 },
);
