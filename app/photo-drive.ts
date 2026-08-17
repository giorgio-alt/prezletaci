export const PHOTO_DRIVE_ROOT_URL = "https://drive.google.com/drive/folders/12v2pTUrP4dk4Di5Eucma0sVq6csEGnJs?usp=sharing";
export const PHOTO_AUDIT_DRIVE_URL = "https://drive.google.com/drive/folders/1whjMB-LrwJSXUhQU-ZOTfjnHGp5Cs9cJ";
export const ORIGINAL_PHOTOS_ZIP_DRIVE_URL = "https://drive.google.com/file/d/1tHWs_iMMZfT0jPH9hjwla0Tvu-yuBYCg/view?usp=drivesdk";

export const photoAuditDriveFolders = {
  root: PHOTO_AUDIT_DRIVE_URL,
  candidates: "https://drive.google.com/drive/folders/1tzjKLaekViDPgwrZ_Rch9TZqN1JKIGVT",
  candidateContactSheets: "https://drive.google.com/drive/folders/1UY35ns5CVuWcdPrQlP7-ujNerRrE8Ypj",
  candidateSelected: "https://drive.google.com/drive/folders/1Yhr2ZfhzGQpUYFL_ovkr8k9bzER0597i",
  contactSheets: "https://drive.google.com/drive/folders/1uBBaWMO3syKYEaHqCAyHDbkz_L5Ibkf1",
  workingSort: "https://drive.google.com/drive/folders/1-7Q97R6sly7ORTrjTgr35zg3NwFJZBIb",
  technicalCheck: "https://drive.google.com/drive/folders/1u7hPvxO-4XwTVNDByd63jVs-_WhsILp0",
};

export const photoDriveLinks = [
  { label: "Google Disk - fotky", url: PHOTO_DRIVE_ROOT_URL },
  { label: "Photo audit", url: PHOTO_AUDIT_DRIVE_URL },
  { label: "Originální Fotky.zip", url: ORIGINAL_PHOTOS_ZIP_DRIVE_URL },
];

export const getProjectPhotoLibraryPath = (source?: string) =>
  source?.replace(/^Originální Fotky\//, "photo-library/") ?? "";

export const getPhotoAuditFolderForAsset = (assetPath?: string) => {
  if (!assetPath) return photoAuditDriveFolders.root;
  if (assetPath.includes("/candidates/")) return photoAuditDriveFolders.candidateSelected;
  if (assetPath.includes("/team/")) return photoAuditDriveFolders.contactSheets;
  if (assetPath.includes("/projects/")) return photoAuditDriveFolders.workingSort;
  return photoAuditDriveFolders.root;
};
