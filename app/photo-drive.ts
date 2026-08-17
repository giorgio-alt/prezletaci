export const PHOTO_DRIVE_ROOT_URL = "https://drive.google.com/drive/folders/12v2pTUrP4dk4Di5Eucma0sVq6csEGnJs?usp=sharing";
export const PHOTO_AUDIT_DRIVE_URL = "https://drive.google.com/drive/folders/1whjMB-LrwJSXUhQU-ZOTfjnHGp5Cs9cJ";
export const ORIGINAL_PHOTOS_ZIP_DRIVE_URL = "https://drive.google.com/file/d/1tHWs_iMMZfT0jPH9hjwla0Tvu-yuBYCg/view?usp=drivesdk";

export const photoAuditDriveFolders = {
  root: PHOTO_AUDIT_DRIVE_URL,
  candidates: "https://drive.google.com/drive/folders/12DlfoVJGyCb6vWDd7mdQxHrYYpPGUYmi",
  candidateOriginals: "https://drive.google.com/drive/folders/1y3AVUX-pJwTNwPShi6jDbvBmkb1Tcwy8",
  candidateSelected: "https://drive.google.com/drive/folders/1HGoQo9VrrD7OXouN3kU99kAzHgtmkbks",
  projects: "https://drive.google.com/drive/folders/1Is8q5wmuejbtmMSALDt9DJJ1tBnw5xCO",
  workingSort: "https://drive.google.com/drive/folders/1Is8q5wmuejbtmMSALDt9DJJ1tBnw5xCO",
  organization: "https://drive.google.com/drive/folders/1CoFc-NzYATPkA-IWjuA92BHp56ysVUAM",
};

export const photoDriveLinks = [
  { label: "Google Disk - fotky", url: PHOTO_DRIVE_ROOT_URL },
  { label: "Photo audit", url: PHOTO_AUDIT_DRIVE_URL },
  { label: "Originální Fotky.zip", url: ORIGINAL_PHOTOS_ZIP_DRIVE_URL },
];

export const getProjectPhotoLibraryPath = (source?: string) =>
  source?.replace(/^Originální Fotky\//, "photo-library/") ?? "";

export const projectPhotoDriveFoldersBySourceFolder: Record<string, string> = {
  "dalsi-lokalni-zelen": "https://drive.google.com/drive/folders/1LSiktxsS38c_34DFkCAEThehOTGWFsNp",
  "hruskove-aleje-a-dalsi-zelen": "https://drive.google.com/drive/folders/1gy6KNjXGU24YdMUTqM7_Jga0g2J7Z7KW",
  "revitalizace-rybnika": "https://drive.google.com/drive/folders/15yPi1oQvAgFASqSPV-6Vx3NXmmN97Pk9",
  "zahrada-ms": "https://drive.google.com/drive/folders/1MKoyDwN5_Iicy0zrc12N8BxOEowcU5mP",
  "zelen-mistni-komunikace": "https://drive.google.com/drive/folders/1SOQzBQ7_l6CDD2URaFifGSddw9grqFm3",
  "zelen-podzemni-kontejnery": "https://drive.google.com/drive/folders/1IswKZHXHaNrpMa4tCr_Jf7eldfy9Mq-b",
  "zelen-prutahove-komunikace": "https://drive.google.com/drive/folders/1Bs2qdJECcl61WxuqDNBUTZnyu1m_JeM_",
  "krizovatka-nohavice": "https://drive.google.com/drive/folders/1wdy9VWHnWJZ4lItnfe5QsLzV7_NTnsOV",
  "lavka-a-verejne-plochy-zlaty-kopec": "https://drive.google.com/drive/folders/1jpXgWEWsDIG2aoC4QvcjQ4oOLDAeNaEp",
  "rekonstrukce-mistnich-komunikaci": "https://drive.google.com/drive/folders/1QFqChgFaN65-BX9yMUzBSpJe86vIHJ6F",
  "rekonstrukce-prutahovych-komunikaci": "https://drive.google.com/drive/folders/1CVQFrm-8ufd3D4OV6Dl_G97VMozVhAnu",
  "obecni-policie": "https://drive.google.com/drive/folders/1sRxtey7eGOsGeJa65dmhPphL9oCOFfbX",
  "druhy-pavilon-ms": "https://drive.google.com/drive/folders/1LtGPnG2H4Cs8qDkW4em6N8kwqfnPCkH3",
  "svazkova-skola-a-jidelna": "https://drive.google.com/drive/folders/1RadfWq_PuEB_eDRstJKkx_DIQ8dNwcJ2",
  "detska-hriste": "https://drive.google.com/drive/folders/1ekbicAT7iizpXzMIyxgsgJeX9UL4ITVC",
  "male-multifunkcni-hriste-u-rybnika": "https://drive.google.com/drive/folders/1H1OAJq38F4NP8lgEo2JaVS9_J98aHCuk",
  "petanque-nohavice": "https://drive.google.com/drive/folders/11AldwzbddkHXyA9yZsJXzHFsi91gnwZl",
  "workoutove-hriste": "https://drive.google.com/drive/folders/1pry24FXq6putzzyhkMoJt0Ri_IaoNdrZ",
  "komunitni-centrum-zlatak": "https://drive.google.com/drive/folders/19szHsmdXmWJI7aPF-XP0iDDw4x7oPGa7",
  "sokolovna-a-restaurace-na-namesti": "https://drive.google.com/drive/folders/1Ob9QKK1ZZ7m2tyFhl4XDi57Xjnaz3arP",
  "kaplicka-a-zvon": "https://drive.google.com/drive/folders/1diCLUalkRlJ3pMnPALu8Lvz8PyBLH2el",
  "podzemni-kontejnery": "https://drive.google.com/drive/folders/1R3A3JC4XVayND-y_ZwuOLxSTrmK97VJc",
  "postovni-vydejni-boxy": "https://drive.google.com/drive/folders/1yyfR9tMEsSCmX31Kt1KkL1qTbFrRulTi",
  "prakticky-lekar-a-ordinace": "https://drive.google.com/drive/folders/1Xxlqtg1NzIwMNKYplCZgvw2euvjI8h2q",
  "vydejni-automaty-stravovani": "https://drive.google.com/drive/folders/1IpziShQ7rvRm3WXBvs6Y99fQ8JtNUTGP",
  "elektronicka-uredni-deska": "https://drive.google.com/drive/folders/1RELu_OITXif1yKc74jZu3uTotviRtN8u",
};

export const candidatePortraitDriveUrls: Record<number, string> = {
  1: "https://drive.google.com/file/d/1Bb8BzDrsynfEBhn8774M_jIjBYevv2Yn/view?usp=drivesdk",
  2: "https://drive.google.com/file/d/1TLMdhOKADuRcsNvVtZgYY8-aQ8P8qimS/view?usp=drivesdk",
  3: "https://drive.google.com/file/d/1JNCbCDaLcnYz4rCvJ5_9YWImC2oWj9ab/view?usp=drivesdk",
  4: "https://drive.google.com/file/d/1IPPUo2SrUPAPgYXISQ-iLnaQhq-Uh935/view?usp=drivesdk",
  5: "https://drive.google.com/file/d/1DaUzHbtiA3s01W4bZdM9aKHJOSEoKJiT/view?usp=drivesdk",
  6: "https://drive.google.com/file/d/1a42UBdo3moWsfPq3VgYHxYT69EfMfryx/view?usp=drivesdk",
  7: "https://drive.google.com/file/d/1l9_vUr_GaipOYviLfzsCZ-bNag0rVBGL/view?usp=drivesdk",
  8: "https://drive.google.com/file/d/1WZ07K4lZ_WD1a8i-hnJDg10DebOv1D8B/view?usp=drivesdk",
  9: "https://drive.google.com/file/d/1ggqkfbfNDdPAfckr2JdXxY_xDHQ1aHIs/view?usp=drivesdk",
  10: "https://drive.google.com/file/d/1jtEE7PfrIKW0ef6qQSBERykDuDn6rYuW/view?usp=drivesdk",
  11: "https://drive.google.com/file/d/1rU_N4UYHal9Mu53w5cdPRtmZ-s_ZZtZA/view?usp=drivesdk",
};

export const candidateSourceDriveFolders: Record<number, string> = {
  1: "https://drive.google.com/drive/folders/1eCKVptQ6OFlqhr2_odkioZQgZUgy_xNH",
  2: "https://drive.google.com/drive/folders/1HdWji0vUL8qFQfIcraus0y_0ompHIZ22",
  3: "https://drive.google.com/drive/folders/1wMHAJ8xg4S4dLsO0ZeDjhjHzn3LEV4Sd",
  4: "https://drive.google.com/drive/folders/1hadBcrQAAjKztBJKqfB03pkMi9EhmaZ_",
  5: "https://drive.google.com/drive/folders/1iBf0hhGwTwz5MJo1ThiJsYmvNRtbVwFi",
  6: "https://drive.google.com/drive/folders/1wVOgQ0PUbu2xrkef9yYTOCNkMGA7J4GR",
  7: "https://drive.google.com/drive/folders/1pR5BJjs6FLSHhQXb62u4VPQO9g1swzAk",
  8: "https://drive.google.com/drive/folders/1c8lEf6hS3N3goJn6HnIk8rft-gYJE_Ep",
  9: "https://drive.google.com/drive/folders/1yZWnPsF1jkrgWNcHSVCnyPYpwYDgOmrm",
  10: "https://drive.google.com/drive/folders/1oVdm7qhgxWhLK5pM7s7R4y1gQ4HyBTeS",
  11: "https://drive.google.com/drive/folders/1bHj-JjQbn9aSS4tiQ46XhXrguviPQyX8",
};

export const teamSourceDriveFolder = "https://drive.google.com/drive/folders/1wqBljkzVSUJvaXvJWL2W_hEEP5lqnajO";

export const getProjectSourceFolderFromSource = (source?: string) =>
  source?.split("/").at(-2) ?? "";

export const getProjectPhotoDriveUrlForSource = (source?: string) =>
  projectPhotoDriveFoldersBySourceFolder[getProjectSourceFolderFromSource(source)] ?? photoAuditDriveFolders.projects;

export const getPhotoAuditFolderForAsset = (assetPath?: string) => {
  if (!assetPath) return photoAuditDriveFolders.root;
  if (assetPath.includes("/candidates/")) return photoAuditDriveFolders.candidateSelected;
  if (assetPath.includes("/team/")) return teamSourceDriveFolder;
  if (assetPath.includes("/projects/")) return photoAuditDriveFolders.projects;
  return photoAuditDriveFolders.root;
};
