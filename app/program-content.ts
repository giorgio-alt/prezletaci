export type ProgramArea = {
  title: string;
  whatWeSolve: string;
  whyItMatters: string;
  nextStep: string;
};

export type ProgramContent = {
  slug: string;
  title: string;
  perex: string;
  mainMessage: string;
  areas: ProgramArea[];
  socialCopy: string;
  carousel: string[];
  cta: string;
  markdownPath: string;
  futureWebPath: string;
  sourceLinks: string[];
  checks: string[];
};

export const programContent: ProgramContent = {
  slug: "plan-pro-prezletice-2026-2030",
  title: "Plán pro Přezletice 2026–2030",
  perex: "Přezletice nepotřebují seznam prázdných slibů. Potřebují plán, který navazuje na odvedenou práci, pojmenovává rozdělané věci a říká, co chceme v dalších letech konkrétně posunout.",
  mainMessage: "Náš program stojí na jednoduchém principu: mluvit o tom, co má pro obec skutečný dopad. U každé priority chceme ukázat, proč je důležitá, jaký je současný stav, co už se udělalo, jaký je další krok a kde má obec rozhodovací pravomoc.",
  areas: [
    {
      title: "Doprava a infrastruktura",
      whatWeSolve: "Bezpečný pohyb obcí, stav komunikací a spolehlivé technické sítě.",
      whyItMatters: "Doprava, voda, kanalizace a další sítě ovlivňují každodenní fungování domácností i další rozvoj obce.",
      nextStep: "U každé priority zveřejnit současný stav, odpovědnost a nejbližší proveditelný krok.",
    },
    {
      title: "Školství a kapacity",
      whatWeSolve: "Dostatečnou kapacitu školských zařízení a srozumitelný plán jejich rozšiřování.",
      whyItMatters: "Rodiny potřebují vědět, že obec řeší aktuální potřeby i dlouhodobý vývoj počtu dětí.",
      nextStep: "Popsat návaznost dočasných řešení, připravovaných budov a rozhodování svazku obcí.",
    },
    {
      title: "Veřejný prostor a zeleň",
      whatWeSolve: "Kvalitní ulice, parky, stromy a místa, která dobře fungují v horku i při běžné údržbě.",
      whyItMatters: "Veřejný prostor určuje, jak se v obci chodí, potkává, odpočívá a jak příjemně se zde žije.",
      nextStep: "Navázat na hotové výsadby, dokončit rozpracovaná místa a řídit péči podle jasných priorit.",
    },
    {
      title: "Sport, volný čas a komunitní život",
      whatWeSolve: "Dostupná místa a příležitosti pro pohyb, spolky, sousedské akce a setkávání generací.",
      whyItMatters: "Obec není jen soubor domů; vztahy vznikají tam, kde lidé mohou něco dělat společně.",
      nextStep: "Dokončit rozpracovaná sportovní místa a zlepšit podmínky pro pravidelné komunitní aktivity.",
    },
    {
      title: "Bezpečnost a prevence",
      whatWeSolve: "Bezpečný veřejný prostor, prevenci rizik a srozumitelnou spolupráci s bezpečnostními složkami.",
      whyItMatters: "Pocit bezpečí vzniká z viditelné prevence, znalosti místních podmínek a jasných kompetencí.",
      nextStep: "Propojit praktickou prevenci pro děti a seniory s otevřeným vysvětlením role obecní policie.",
    },
    {
      title: "Služby v obci",
      whatWeSolve: "Dostupnost základních služeb, stravování, zdravotní péče a praktických řešení pro každodenní život.",
      whyItMatters: "Dobrá služba šetří lidem cestu, čas a energii a pomáhá obci fungovat pro všechny generace.",
      nextStep: "Vyhodnotit konkrétní potřeby a u každé služby popsat realistický model, partnera a odpovědnost obce.",
    },
    {
      title: "Rozumný rozvoj a územní plánování",
      whatWeSolve: "Tempo a podobu nové výstavby, kapacitu infrastruktury a ochranu charakteru Přezletic.",
      whyItMatters: "Růst musí odpovídat možnostem škol, dopravy, sítí i veřejného prostoru.",
      nextStep: "Srozumitelně vysvětlovat územní plán, pravomoci obce a podmínky dohodnuté u konkrétních záměrů.",
    },
    {
      title: "Kultura a společenské centrum",
      whatWeSolve: "Důstojné a dlouhodobě udržitelné zázemí pro kulturu, setkávání a obecní akce.",
      whyItMatters: "Společný prostor posiluje místní život a dává kulturním i sousedským aktivitám stabilní domov.",
      nextStep: "Zveřejnit připravené studie a otevřeně porovnat rozsah, etapy, financování a budoucí provoz.",
    },
    {
      title: "Digitalizace a komunikace obce",
      whatWeSolve: "Jednodušší vyřizování agend a informace dostupné online i lidem, kteří digitální kanály nepoužívají.",
      whyItMatters: "Srozumitelná komunikace šetří čas a pomáhá předcházet nejistotě a zbytečným sporům.",
      nextStep: "Rozšířit přehled dostupných služeb a propojit digitální komunikaci s pravidelnými tištěnými informacemi.",
    },
    {
      title: "Odpovědné hospodaření",
      whatWeSolve: "Pořadí investic, vyvážený rozpočet a transparentní využívání dotací a partnerství.",
      whyItMatters: "Každý plán musí mít reálný finanční základ a nesmí ohrozit běžné fungování obce.",
      nextStep: "U velkých priorit ukázat předpokládané etapy, zdroje financování a rozhodnutí, která musí předcházet realizaci.",
    },
  ],
  socialCopy: "Přezletice nepotřebují seznam prázdných slibů. Potřebují plán, který navazuje na hotovou práci, otevřeně pojmenovává rozdělané věci a říká, co má přijít dál.\n\nNáš program pro roky 2026–2030 proto nečleníme jen podle hesel. U každé priority chceme ukázat, co řešíme, proč je to důležité, kde jsme dnes a jaký je další realistický krok.\n\nOd dopravy a školy přes zeleň, bezpečnost a služby až po odpovědné hospodaření. Jeden společný plán pro obec, ve které se dobře žije dnes i za několik let.",
  carousel: [
    "Plán pro Přezletice 2026–2030",
    "Ne seznam slibů. Návaznost na hotovou a rozdělanou práci.",
    "U každé priority: co řešíme a proč je to důležité.",
    "Současný stav: co už se udělalo a co ještě chybí.",
    "Další krok: konkrétně, realisticky a s jasnou odpovědností.",
    "Deset oblastí, které mají skutečný dopad na život v obci.",
    "Přečtěte si celý plán na webu.",
  ],
  cta: "Přečtěte si celý plán",
  markdownPath: "content/program/plan-pro-prezletice-2026-2030.md",
  futureWebPath: "/program",
  sourceLinks: ["Volby 2026 program.docx", "Campaign Bible", "Campaign HQ / Projekty"],
  checks: ["Schválit finální pořadí priorit", "Doplnit odkazy na projektové karty", "Provést faktickou a kompetenční kontrolu"],
};

export const programContentBySlug = new Map([[programContent.slug, programContent]]);

export function buildProgramMarkdown() {
  const areas = programContent.areas.map((area) => `## ${area.title}\n\n### Co řešíme\n\n${area.whatWeSolve}\n\n### Proč je to důležité\n\n${area.whyItMatters}\n\n### Co bude další krok\n\n${area.nextStep}`).join("\n\n---\n\n");
  return `# ${programContent.title}\n\n${programContent.perex}\n\n## Jak náš program číst\n\n${programContent.mainMessage}\n\n---\n\n${areas}\n\n---\n\n## Text pro sociální sítě\n\n${programContent.socialCopy}\n\n## Carousel „Jak číst náš program“\n\n${programContent.carousel.map((slide, index) => `${index + 1}. ${slide}`).join("\n")}\n\n**CTA:** ${programContent.cta}\n\n**Budoucí webová adresa:** ${programContent.futureWebPath}\n`;
}

export const PROGRAM_MARKDOWN = buildProgramMarkdown();
