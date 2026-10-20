import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  tech: z.string().min(2),
  imageUrl: z.string().url(),
  githubUrl: z.string().url(),
  liveUrl: z.string().url(),
});

type RouteContext = { params: { id: string } };

export async function PUT(req: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Sign in as the site admin before editing projects." }, { status: 401 });
  }

  try {
    const validation = projectSchema.safeParse(await req.json());
    if (!validation.success) return NextResponse.json({ error: "Please complete all project fields with valid URLs." }, { status: 400 });
    const updatedProject = await prisma.project.update({ where: { id: params.id }, data: validation.data });
    return NextResponse.json(updatedProject);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Could not update project." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Sign in as the site admin before deleting projects." }, { status: 401 });
  }

  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Could not delete project." }, { status: 500 });
  }
}
