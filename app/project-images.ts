export type ProjectImageRecord = {
  projectId: number;
  slug: string;
  title: string;
  area: string;
  source: string;
  image: string;
  imageAlt: string;
};

export const supportedProjectImagePattern = /\.(?:jpe?g|png|heic|webp)$/i;

export const selectFirstSupportedImage = (fileNames: string[]) =>
  [...fileNames]
    .filter((fileName) => supportedProjectImagePattern.test(fileName))
    .sort((a, b) => a.localeCompare(b, "cs", { numeric: true, sensitivity: "base" }))[0];

export const projectImageManifest: ProjectImageRecord[] = [
  { projectId: 19, slug: "dalsi-lokalni-zelen", title: "Další lokální zeleň", area: "Životní prostředí", source: "Originální Fotky/02_projekty/01_zivotni_prostredi/dalsi-lokalni-zelen/dalsi-lokalni-zelen__y7a6661.jpg", image: "/images/projects/dalsi-lokalni-zelen.webp", imageAlt: "Lokální zeleň v Přezleticích" },
  { projectId: 20, slug: "hruskove-aleje-a-dalsi-zelen", title: "Hruškové aleje a další zeleň", area: "Životní prostředí", source: "Originální Fotky/02_projekty/01_zivotni_prostredi/hruskove-aleje-a-dalsi-zelen/hruskove-aleje-a-dalsi-zelen__y7a6678.jpg", image: "/images/projects/hruskove-aleje-a-dalsi-zelen.webp", imageAlt: "Hrušková alej a nová zeleň v Přezleticích" },
  { projectId: 21, slug: "revitalizace-rybnika", title: "Revitalizace rybníka", area: "Životní prostředí", source: "Originální Fotky/02_projekty/01_zivotni_prostredi/revitalizace-rybnika/revitalizace-rybnika__y7a6842.jpg", image: "/images/projects/revitalizace-rybnika.webp", imageAlt: "Revitalizovaný rybník v Přezleticích" },
  { projectId: 22, slug: "zahrada-ms", title: "Zahrada mateřské školy", area: "Životní prostředí", source: "Originální Fotky/02_projekty/01_zivotni_prostredi/zahrada-ms/zahrada-ms__y7a6696.jpg", image: "/images/projects/zahrada-ms.webp", imageAlt: "Zahrada mateřské školy v Přezleticích" },
  { projectId: 23, slug: "zelen-mistni-komunikace", title: "Zeleň u místních komunikací", area: "Životní prostředí", source: "Originální Fotky/02_projekty/01_zivotni_prostredi/zelen-mistni-komunikace/zelen-mistni-komunikace__y7a6666.jpg", image: "/images/projects/zelen-mistni-komunikace.webp", imageAlt: "Zeleň podél místní komunikace v Přezleticích" },
  { projectId: 24, slug: "zelen-podzemni-kontejnery", title: "Zeleň u podzemních kontejnerů", area: "Životní prostředí", source: "Originální Fotky/02_projekty/01_zivotni_prostredi/zelen-podzemni-kontejnery/zelen-podzemni-kontejnery__y7a6820.jpg", image: "/images/projects/zelen-podzemni-kontejnery.webp", imageAlt: "Zeleň v okolí podzemních kontejnerů v Přezleticích" },
  { projectId: 25, slug: "zelen-prutahove-komunikace", title: "Zeleň u průtahových komunikací", area: "Životní prostředí", source: "Originální Fotky/02_projekty/01_zivotni_prostredi/zelen-prutahove-komunikace/zelen-prutahove-komunikace__y7a6672.jpg", image: "/images/projects/zelen-prutahove-komunikace.webp", imageAlt: "Zeleň podél průtahové komunikace v Přezleticích" },
  { projectId: 5, slug: "park-u-krizovatky-nohavice", title: "Park u křižovatky Nohavice", area: "Životní prostředí", source: "Originální Fotky/02_projekty/02_doprava/krizovatka-nohavice/krizovatka-nohavice__y7a6830.jpg", image: "/images/projects/park-u-krizovatky-nohavice.webp", imageAlt: "Prostor u křižovatky Nohavice v Přezleticích" },
  { projectId: 26, slug: "lavka-a-verejne-plochy-zlaty-kopec", title: "Lávka a veřejné plochy Zlatý kopec", area: "Doprava", source: "Originální Fotky/02_projekty/02_doprava/lavka-a-verejne-plochy-zlaty-kopec/lavka-a-verejne-plochy-zlaty-kopec__y7a6858.jpg", image: "/images/projects/lavka-a-verejne-plochy-zlaty-kopec.webp", imageAlt: "Lávka a veřejné plochy na Zlatém kopci" },
  { projectId: 27, slug: "rekonstrukce-mistnich-komunikaci", title: "Rekonstrukce místních komunikací", area: "Doprava", source: "Originální Fotky/02_projekty/02_doprava/rekonstrukce-mistnich-komunikaci/rekonstrukce-mistnich-komunikaci__y7a6660.jpg", image: "/images/projects/rekonstrukce-mistnich-komunikaci.webp", imageAlt: "Rekonstruovaná místní komunikace v Přezleticích" },
  { projectId: 28, slug: "rekonstrukce-prutahovych-komunikaci", title: "Rekonstrukce průtahových komunikací", area: "Doprava", source: "Originální Fotky/02_projekty/02_doprava/rekonstrukce-prutahovych-komunikaci/rekonstrukce-prutahovych-komunikaci__y7a6749.jpg", image: "/images/projects/rekonstrukce-prutahovych-komunikaci.webp", imageAlt: "Rekonstruovaná průtahová komunikace v Přezleticích" },
  { projectId: 29, slug: "obecni-policie", title: "Obecní policie", area: "Bezpečnost", source: "Originální Fotky/02_projekty/03_bezpecnost/obecni-policie/obecni-policie__y7a6717.jpg", image: "/images/projects/obecni-policie.webp", imageAlt: "Zázemí obecní policie v Přezleticích" },
  { projectId: 30, slug: "druhy-pavilon-ms", title: "Druhý pavilon mateřské školy", area: "Školství", source: "Originální Fotky/02_projekty/04_skolstvi/druhy-pavilon-ms/druhy-pavilon-ms__y7a6691.jpg", image: "/images/projects/druhy-pavilon-ms.webp", imageAlt: "Druhý pavilon mateřské školy v Přezleticích" },
  { projectId: 7, slug: "rozsireni-kapacity-svazkove-skoly", title: "Rozšíření kapacity svazkové školy", area: "Školství", source: "Originální Fotky/02_projekty/04_skolstvi/svazkova-skola-a-jidelna/svazkova-skola-a-jidelna__y7a6647.jpg", image: "/images/projects/rozsireni-kapacity-svazkove-skoly.webp", imageAlt: "Svazková škola a jídelna Panská pole" },
  { projectId: 31, slug: "detska-hriste", title: "Dětská hřiště", area: "Sport a hřiště", source: "Originální Fotky/02_projekty/05_sport/detska-hriste/detska-hriste__y7a6835.jpg", image: "/images/projects/detska-hriste.webp", imageAlt: "Dětské hřiště v Přezleticích" },
  { projectId: 6, slug: "sportovne-relaxacni-centrum-u-rybnika", title: "Sportovně-relaxační centrum u rybníka", area: "Sport a hřiště", source: "Originální Fotky/02_projekty/05_sport/male-multifunkcni-hriste-u-rybnika/male-multifunkcni-hriste-u-rybnika__y7a6840.jpg", image: "/images/projects/sportovne-relaxacni-centrum-u-rybnika.webp", imageAlt: "Multifunkční hřiště u rybníka v Přezleticích" },
  { projectId: 32, slug: "petanque-nohavice", title: "Pétanque Nohavice", area: "Sport a hřiště", source: "Originální Fotky/02_projekty/05_sport/petanque-nohavice/petanque-nohavice__y7a6825.jpg", image: "/images/projects/petanque-nohavice.webp", imageAlt: "Pétanque hřiště v lokalitě Nohavice" },
  { projectId: 33, slug: "workoutove-hriste", title: "Workoutové hřiště", area: "Sport a hřiště", source: "Originální Fotky/02_projekty/05_sport/workoutove-hriste/workoutove-hriste__y7a6846.jpg", image: "/images/projects/workoutove-hriste.webp", imageAlt: "Workoutové hřiště v Přezleticích" },
  { projectId: 34, slug: "komunitni-centrum-zlatak", title: "Komunitní centrum Zlaťák", area: "Kultura", source: "Originální Fotky/02_projekty/06_kultura/komunitni-centrum-zlatak/komunitni-centrum-zlatak__y7a6761-ed.jpg", image: "/images/projects/komunitni-centrum-zlatak.webp", imageAlt: "Komunitní centrum Zlaťák v Přezleticích" },
  { projectId: 16, slug: "rekonstrukce-sokolovny", title: "Rekonstrukce Sokolovny", area: "Kultura", source: "Originální Fotky/02_projekty/06_kultura/sokolovna-a-restaurace-na-namesti/sokolovna-a-restaurace-na-namesti__y7a6715.jpg", image: "/images/projects/rekonstrukce-sokolovny.webp", imageAlt: "Sokolovna a restaurace na náměstí v Přezleticích" },
  { projectId: 35, slug: "kaplicka-a-zvon", title: "Kaplička a zvon", area: "Infrastruktura", source: "Originální Fotky/02_projekty/07_infrastruktura/kaplicka-a-zvon/kaplicka-a-zvon__y7a6729.jpg", image: "/images/projects/kaplicka-a-zvon.webp", imageAlt: "Kaplička a zvon v Přezleticích" },
  { projectId: 1, slug: "tri-celky-podzemnich-kontejneru", title: "Tři celky podzemních kontejnerů", area: "Životní prostředí", source: "Originální Fotky/02_projekty/07_infrastruktura/podzemni-kontejnery/podzemni-kontejnery__y7a6712.jpg", image: "/images/projects/tri-celky-podzemnich-kontejneru.webp", imageAlt: "Podzemní kontejnery v Přezleticích" },
  { projectId: 36, slug: "postovni-vydejni-boxy", title: "Poštovní výdejní boxy", area: "Infrastruktura", source: "Originální Fotky/02_projekty/07_infrastruktura/postovni-vydejni-boxy/postovni-vydejni-boxy__y7a6718.jpg", image: "/images/projects/postovni-vydejni-boxy.webp", imageAlt: "Poštovní výdejní boxy v Přezleticích" },
  { projectId: 37, slug: "prakticky-lekar-a-ordinace", title: "Praktický lékař a ordinace", area: "Zdraví a sociální oblast", source: "Originální Fotky/02_projekty/08_zdravi-socialni/prakticky-lekar-a-ordinace/prakticky-lekar-a-ordinace__y7a6800.jpg", image: "/images/projects/prakticky-lekar-a-ordinace.webp", imageAlt: "Ordinace praktického lékaře v Přezleticích" },
  { projectId: 38, slug: "vydejni-automaty-stravovani", title: "Výdejní automaty stravování", area: "Zdraví a sociální oblast", source: "Originální Fotky/02_projekty/08_zdravi-socialni/vydejni-automaty-stravovani/vydejni-automaty-stravovani__y7a6738.jpg", image: "/images/projects/vydejni-automaty-stravovani.webp", imageAlt: "Výdejní automaty pro stravování v Přezleticích" },
  { projectId: 3, slug: "elektronicka-uredni-deska", title: "Elektronická úřední deska", area: "Digitalizace", source: "Originální Fotky/02_projekty/09_digitalizace/elektronicka-uredni-deska/elektronicka-uredni-deska__y7a6734.jpg", image: "/images/projects/elektronicka-uredni-deska.webp", imageAlt: "Elektronická úřední deska před obecním úřadem v Přezleticích" },
];

export const projectImageByProjectId = new Map(
  projectImageManifest.map((record) => [record.projectId, record]),
);

export function mergeProjectCatalog<T extends {
  id: number;
  slug?: string;
  image?: string;
  imageAlt?: string;
}>(savedProjects: T[], catalogProjects: T[]): T[] {
  const savedById = new Map(savedProjects.map((project) => [project.id, project]));
  const catalogIds = new Set(catalogProjects.map((project) => project.id));
  const merged = catalogProjects.map((catalogProject) => {
    const saved = savedById.get(catalogProject.id);
    if (!saved) return catalogProject;
    return {
      ...catalogProject,
      ...saved,
      slug: saved.slug || catalogProject.slug,
      image: saved.image || catalogProject.image,
      imageAlt: saved.imageAlt || catalogProject.imageAlt,
    };
  });
  return [...merged, ...savedProjects.filter((project) => !catalogIds.has(project.id))];
}
