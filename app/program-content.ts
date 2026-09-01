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
  perex: "Volby nerozhodují jen o velkých heslech. Rozhodují o tom, kdo bude každý týden řešit dopravu, školu, zeleň, služby, bezpečnost, rozpočet a další konkrétní věci, které ovlivňují každodenní život v Přezleticích.",
  mainMessage: "Náš program nechceme představit jako dlouhý seznam slibů. Chceme ukázat několik hlavních směrů, na kterých podle nás záleží nejvíc: pokračovat v práci, kterou už v Přezleticích děláme, otevřeně pojmenovat rozdělané věci a říct, co má přijít dál. Jednotlivým tématům se budeme věnovat podrobněji v dalších příspěvcích a článcích v období do voleb.",
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
      whatWeSolve: "Dostupná místa a příležitosti pro pohyb, spolky, sousedské akce, setkávání generací a budování vztahů mezi starousedlíky a novými obyvateli.",
      whyItMatters: "Obec není jen soubor domů; důvěra a sociální vazby vznikají tam, kde se lidé mohou pravidelně potkávat a něco dělat společně.",
      nextStep: "Dokončit rozpracovaná sportovní místa a zlepšit podmínky pro pravidelné komunitní a mezigenerační aktivity.",
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
  socialCopy: "Volby nejsou jen o heslech. Jsou o tom, kdo bude každý týden řešit konkrétní věci, které ovlivňují život v Přezleticích.\n\nNáš plán pro roky 2026–2030 stojí na několika prioritách: bezpečnější doprava a fungující infrastruktura, dostatečná kapacita škol a školek, péče o veřejný prostor a zeleň, rozumný rozvoj obce, dostupné služby, bezpečnost, kultura, sport, sousedské vztahy, digitalizace a odpovědné hospodaření.\n\nNechceme všechno odbýt jedním dlouhým seznamem. V následujících týdnech se budeme jednotlivým tématům věnovat do hloubky — v postech, článcích a konkrétních příkladech z obce.",
  carousel: [
    "Plán pro Přezletice 2026–2030",
    "Ne jen hesla. Konkrétní témata pro každodenní život.",
    "Doprava, škola, zeleň a veřejný prostor.",
    "Rozumný rozvoj, služby, bezpečnost a hospodaření.",
    "Kultura, sport, sousedské vztahy a lepší komunikace obce.",
    "Každé téma postupně rozebereme do hloubky.",
    "Sledujte další posty do voleb.",
  ],
  cta: "Sledujte nás. Jednotlivé části programu budeme postupně vysvětlovat v dalších postech do voleb.",
  markdownPath: "content/program/plan-pro-prezletice-2026-2030.md",
  futureWebPath: "/program",
  sourceLinks: ["Volby 2026 program.docx", "Campaign Bible", "Campaign HQ / Projekty"],
  checks: ["Schválit finální pořadí priorit", "Doplnit odkazy na projektové karty", "Provést faktickou a kompetenční kontrolu"],
};

export const programContentBySlug = new Map([[programContent.slug, programContent]]);

export function buildProgramMarkdown() {
  const areas = programContent.areas.map((area) => `- **${area.title}** — ${area.whatWeSolve} ${area.nextStep}`).join("\n");
  const detailPlan = programContent.areas.map((area) => `- ${area.title}`).join("\n");
  return `# ${programContent.title}\n\n${programContent.perex}\n\n## Co je pro nás nejdůležitější\n\n${programContent.mainMessage}\n\n${areas}\n\n## Co bude následovat\n\nTento článek je úvodní rozcestník. Jednotlivým tématům se budeme věnovat do hloubky v následujících postech a článcích v období do voleb. U každého tématu chceme ukázat, co už je hotové, co je rozdělané, co obec může reálně ovlivnit a jaký je další konkrétní krok.\n\nTémata, která postupně rozepíšeme:\n\n${detailPlan}\n\n---\n\n## Text pro sociální sítě\n\n${programContent.socialCopy}\n\n## Carousel „Jak číst náš program“\n\n${programContent.carousel.map((slide, index) => `${index + 1}. ${slide}`).join("\n")}\n\n**CTA:** ${programContent.cta}\n\n**Budoucí webová adresa:** ${programContent.futureWebPath}\n`;
}

export const PROGRAM_MARKDOWN = buildProgramMarkdown();
