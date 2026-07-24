import { readFile, stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { UPLOADS_ROOT } from "@/lib/uploads";

type Props = {
  params: Promise<{ path: string[] }>;
};

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(_request: Request, { params }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const segments = (await params).path;
  if (!segments?.length) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // Prevent path traversal
  if (segments.some((part) => part === ".." || part.includes("\0"))) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const relativePath = path.join(...segments);
  const absolutePath = path.join(UPLOADS_ROOT, relativePath);
  if (!absolutePath.startsWith(UPLOADS_ROOT)) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  try {
    await stat(absolutePath);
    const data = await readFile(absolutePath);
    const ext = path.extname(absolutePath).toLowerCase();
    return new NextResponse(data, {
      headers: {
        "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }
}
