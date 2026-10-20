import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { initialProjects } from "@/lib/data";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/admin-auth";

const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech: z.string().min(2, "Tech stack is required (comma-separated)"),
  imageUrl: z.string().url("Must be a valid image URL"),
  githubUrl: z.string().url("Must be a valid GitHub URL"),
  liveUrl: z.string().url("Must be a valid Live preview URL"),
});

// GET /api/projects
export async function GET() {
  try {
    let projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Auto-seed if database is currently empty
    if (projects.length === 0) {
      for (const p of initialProjects) {
        await prisma.project.create({
          data: {
            title: p.title,
            description: p.description,
            tech: p.tech,
            imageUrl: p.imageUrl,
            githubUrl: p.githubUrl,
            liveUrl: p.liveUrl,
          },
        });
      }

      projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch projects from database:", error);
    // Graceful fallback to initial seed projects if database is initializing
    return NextResponse.json(initialProjects, { status: 200 });
  }
}

// POST /api/projects
export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Sign in as the site admin before publishing." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const validation = projectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { title, description, tech, imageUrl, githubUrl, liveUrl } = validation.data;

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        tech,
        imageUrl,
        githubUrl,
        liveUrl,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error while saving project" },
      { status: 500 }
    );
  }
}
