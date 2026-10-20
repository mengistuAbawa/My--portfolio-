import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { z } from "zod";

const imageSchema = z.object({ image: z.string().regex(/^data:image\/(jpeg|png|webp|gif);base64,[A-Za-z0-9+/]+=*$/) });

export async function GET() {
  try {
    const settings = await prisma.$queryRaw<Array<{ value: string }>>`SELECT "value" FROM "SiteSetting" WHERE "key" = 'profileImage' LIMIT 1`;
    return NextResponse.json({ image: settings[0]?.value ?? null }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ image: null }, { headers: { "Cache-Control": "no-store" } });
  }
}

export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Sign in as the site admin first." }, { status: 401 });
  try {
    const body = await req.json();
    const validation = imageSchema.safeParse(body);
    if (!validation.success || Buffer.byteLength(validation.success ? validation.data.image : "") > 2_800_000) {
      return NextResponse.json({ error: "Choose a JPEG, PNG, WebP, or GIF image under 2 MB." }, { status: 400 });
    }
    const image = validation.data.image;
    await prisma.$executeRaw`INSERT INTO "SiteSetting" ("key", "value", "updatedAt") VALUES ('profileImage', ${image}, CURRENT_TIMESTAMP) ON CONFLICT("key") DO UPDATE SET "value" = excluded."value", "updatedAt" = CURRENT_TIMESTAMP`;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not save the profile image." }, { status: 500 });
  }
}
