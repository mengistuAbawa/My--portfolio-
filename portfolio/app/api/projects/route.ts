import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { initialProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (projects.length === 0) {
      for (const project of initialProjects) {
        await prisma.project.create({
          data: {
            title: project.title,
            description: project.description,
            tech: project.tech,
            imageUrl: project.imageUrl,
            githubUrl: project.githubUrl,
            liveUrl: project.liveUrl,
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
    return NextResponse.json(initialProjects, { status: 200 });
  }
}
