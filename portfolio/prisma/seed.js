const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initialProjects = [
  {
    title: "Team Workflow Platform",
    description: "A shared workspace for coordinating team projects, organizing work, and keeping progress visible in one place.",
    tech: "",
    imageUrl: "/images/projects/team-workflow.svg",
    githubUrl: "",
    liveUrl: "https://team-workflow-platform-sslh.vercel.app/",
  },
  {
    title: "Injibara University Management System",
    description: "A university platform designed to bring academic administration and student services into one organized digital experience.",
    tech: "",
    imageUrl: "/images/projects/injibara-university.svg",
    githubUrl: "",
    liveUrl: "https://injibara-university-management-syst-omega.vercel.app/",
  },
  {
    title: "EthioCare Health Platform",
    description: "A digital health-services experience that helps people find care information and connect with relevant services.",
    tech: "",
    imageUrl: "/images/projects/ethio-care.svg",
    githubUrl: "",
    liveUrl: "https://ethio-care-platform-mpcj.vercel.app/",
  },
  {
    title: "Learning Management System",
    description: "An online learning platform for organizing courses and learning resources in a clear, accessible space for learners.",
    tech: "",
    imageUrl: "/images/projects/learning-management.svg",
    githubUrl: "",
    liveUrl: "https://learning-management-system-yhr4.vercel.app/",
  },
];

const retiredDemoUrls = [
  "https://ai-content-generator-demo.vercel.app",
  "https://ecommerce-store-demo.vercel.app",
  "https://kanban-collaborate-demo.vercel.app",
  "https://crypto-fintech-demo.vercel.app",
  "https://dev-hub-community.vercel.app",
  "https://cloud-health-demo.vercel.app",
];

async function seed() {
  const removed = await prisma.project.deleteMany({
    where: { liveUrl: { in: retiredDemoUrls } },
  });
  let added = 0;

  for (const project of initialProjects) {
    const existing = await prisma.project.findFirst({
      where: { liveUrl: project.liveUrl },
      select: { id: true },
    });
    if (!existing) {
      await prisma.project.create({ data: project });
      added += 1;
    }
  }

  console.log(`Project catalog updated: ${removed.count} old demos removed, ${added} featured projects added.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
