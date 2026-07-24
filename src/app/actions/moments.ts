"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import { UPLOADS_ROOT } from "@/lib/uploads";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = 5 * 1024 * 1024;

function extensionFor(type: string) {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "bin";
  }
}

export async function listMoments(limit = 24) {
  await requireUser();
  return prisma.moment.findMany({
    include: { uploader: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function uploadMoment(formData: FormData) {
  const user = await requireUser();
  const file = formData.get("file");
  const captionRaw = formData.get("caption");
  const caption =
    typeof captionRaw === "string" && captionRaw.trim()
      ? captionRaw.trim().slice(0, 120)
      : null;

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("이미지를 선택해 주세요.");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("jpg, png, webp, gif만 업로드할 수 있어요.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("이미지는 5MB 이하만 업로드할 수 있어요.");
  }

  const ext = extensionFor(file.type);
  const filename = `${randomUUID()}.${ext}`;
  const relativePath = path.join("moments", filename);
  const absoluteDir = path.join(UPLOADS_ROOT, "moments");
  const absolutePath = path.join(UPLOADS_ROOT, relativePath);

  await mkdir(absoluteDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, buffer);

  const moment = await prisma.moment.create({
    data: {
      uploaderId: user.id,
      imagePath: relativePath.replace(/\\/g, "/"),
      caption,
    },
  });

  revalidatePath("/");
  revalidatePath("/moments");
  revalidatePath("/diaries");
  revalidatePath("/settings");
  return moment;
}
