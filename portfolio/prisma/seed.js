const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const initialProjects = [
  {
    title: "AI-Powered SaaS Content Generator",
    description: "Full-stack AI workspace generating SEO articles, marketing copy, and automated social posts with OpenAI API and streaming responses.",
    tech: "Next.js 14, TypeScript, TailwindCSS, OpenAI API, Prisma, Stripe",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/ai-saas-platform",
    liveUrl: "https://ai-content-generator-demo.vercel.app",
  },
  {
    title: "NextGen E-Commerce Multi-Store",
    description: "High-performance headless e-commerce store with real-time stock sync, cart persistence, localized pricing, and Stripe Checkout.",
    tech: "Next.js, Node.js, PostgreSQL, Prisma, TailwindCSS, Zustand",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/nextgen-ecommerce",
    liveUrl: "https://ecommerce-store-demo.vercel.app",
  },
  {
    title: "Real-Time Collaborative Kanban Board",
    description: "Interactive project management workspace featuring drag-and-drop task boards, live member updates, WebSocket channels, and analytics.",
    tech: "React, Node.js, Socket.io, TailwindCSS, MongoDB, Express",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/realtime-kanban",
    liveUrl: "https://kanban-collaborate-demo.vercel.app",
  },
  {
    title: "FinTech Portfolio & Crypto Tracker",
    description: "Cryptocurrency and stock market analytics portal with interactive candle charts, profit/loss calculator, and automated price alerts.",
    tech: "Next.js 14, Recharts, TypeScript, TailwindCSS, CoinGecko API",
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/fintech-portfolio-tracker",
    liveUrl: "https://crypto-fintech-demo.vercel.app",
  },
  {
    title: "Developer Community Social Feed",
    description: "Full-featured developer network with markdown post sharing, nested commenting, code syntax highlighting, and profile badges.",
    tech: "Next.js 14, Node.js, SQLite, Prisma, Framer Motion, TailwindCSS",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/dev-community-hub",
    liveUrl: "https://dev-hub-community.vercel.app",
  },
  {
    title: "Cloud Infrastructure Health Monitor",
    description: "DevOps monitoring dashboard visualizing server uptime, CPU/memory loads, incident alerts, and network telemetry via Recharts.",
    tech: "TypeScript, Next.js App Router, Recharts, TailwindCSS, Prisma",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/cloud-monitor-dashboard",
    liveUrl: "https://cloud-health-demo.vercel.app",
  },
];

async function seed() {
  const count = await prisma.project.count();
  if (count === 0) {
    console.log("Seeding SQLite database with initial projects...");
    for (const project of initialProjects) {
      await prisma.project.create({ data: project });
    }
    console.log("Seeded successfully!");
  } else {
    console.log(`Database already has ${count} projects.`);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
