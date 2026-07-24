import path from "path";

export const UPLOADS_ROOT = path.join(process.cwd(), "data", "uploads");

export function momentPublicUrl(imagePath: string) {
  return `/api/uploads/${imagePath.split(path.sep).join("/")}`;
}
