export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  email: string;
  telegramHandle: string;
  telegramUrl: string;
  tiktokHandle: string;
  tiktokUrl: string;
  githubHandle: string;
  githubUrl: string;
  cvUrl: string;
  profileImage: string;
}

export const personalInfo: PersonalInfo = {
  name: "Mengistu Abawa",
  role: "Full Stack Developer",
  bio: "I'm a passionate Full Stack Developer with expertise in building modern, scalable web applications. I've successfully completed 5+ real-world projects using Next.js, Node.js, and TailwindCSS.",
  email: "mengistuabawa19@gmail.com",
  telegramHandle: "@MengeQuarit",
  telegramUrl: "https://t.me/MengeQuarit",
  tiktokHandle: "iambanjaw",
  tiktokUrl: "https://tiktok.com/@iambanjaw",
  githubHandle: "mengistuAbawa",
  githubUrl: "https://github.com/mengistuAbawa",
  cvUrl: "/cv.pdf",
  profileImage: "/images/profile.jpg",
};

export const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export const heroStats = [
  { label: "Completed Projects", value: "5+", description: "Production Web Apps" },
  { label: "Years Experience", value: "3+", description: "Full-Stack Engineering" },
  { label: "Technologies", value: "15+", description: "Modern Tech Stack" },
  { label: "Satisfaction", value: "100%", description: "Client & Quality Focus" },
];

export interface FeatureCard {
  title: string;
  description: string;
  iconName: "Code2" | "FolderGit2" | "Users2" | "Sparkles";
}

export const aboutFeatures: FeatureCard[] = [
  {
    title: "Clean Code",
    description: "Architecting modular, maintainable, and strongly-typed code adhering to modern standards and DRY principles.",
    iconName: "Code2",
  },
  {
    title: "5+ Real Projects",
    description: "Battle-tested full-stack applications deployed to production with robust databases and sleek frontends.",
    iconName: "FolderGit2",
  },
  {
    title: "Team Player",
    description: "Exceptional communicator adept at agile sprints, code reviews, collaborative git workflows, and cross-functional teams.",
    iconName: "Users2",
  },
  {
    title: "Best Practices",
    description: "Deep commitment to SEO, Lighthouse 100 web vitals, strict TypeScript safety, accessibility, and zero-downtime CI/CD.",
    iconName: "Sparkles",
  },
];

export interface SkillItem {
  name: string;
  level: number; // percentage
  category: "Frontend" | "Backend" | "Styling" | "Database" | "Language";
}

export const skillsData: SkillItem[] = [
  { name: "TailwindCSS", level: 95, category: "Styling" },
  { name: "JavaScript / TypeScript", level: 92, category: "Language" },
  { name: "React / Next.js", level: 90, category: "Frontend" },
  { name: "Node.js", level: 88, category: "Backend" },
  { name: "PostgreSQL / MongoDB", level: 82, category: "Database" },
  { name: "Python", level: 75, category: "Language" },
];

export const radarChartData = [
  { subject: "JavaScript/TS", level: 92, fullMark: 100 },
  { subject: "React/Next.js", level: 90, fullMark: 100 },
  { subject: "Node.js", level: 88, fullMark: 100 },
  { subject: "TailwindCSS", level: 95, fullMark: 100 },
  { subject: "DB (SQL/NoSQL)", level: 82, fullMark: 100 },
  { subject: "Python", level: 75, fullMark: 100 },
];

export interface SeedProject {
  id: string;
  title: string;
  description: string;
  tech: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export const initialProjects: SeedProject[] = [
  {
    id: "proj-1",
    title: "AI-Powered SaaS Content Generator",
    description: "Full-stack AI workspace generating SEO articles, marketing copy, and automated social posts with OpenAI API and streaming responses.",
    tech: "Next.js 14, TypeScript, TailwindCSS, OpenAI API, Prisma, Stripe",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/ai-saas-platform",
    liveUrl: "https://ai-content-generator-demo.vercel.app",
  },
  {
    id: "proj-2",
    title: "NextGen E-Commerce Multi-Store",
    description: "High-performance headless e-commerce store with real-time stock sync, cart persistence, localized pricing, and Stripe Checkout.",
    tech: "Next.js, Node.js, PostgreSQL, Prisma, TailwindCSS, Zustand",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/nextgen-ecommerce",
    liveUrl: "https://ecommerce-store-demo.vercel.app",
  },
  {
    id: "proj-3",
    title: "Real-Time Collaborative Kanban Board",
    description: "Interactive project management workspace featuring drag-and-drop task boards, live member updates, WebSocket channels, and analytics.",
    tech: "React, Node.js, Socket.io, TailwindCSS, MongoDB, Express",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/realtime-kanban",
    liveUrl: "https://kanban-collaborate-demo.vercel.app",
  },
  {
    id: "proj-4",
    title: "FinTech Portfolio & Crypto Tracker",
    description: "Cryptocurrency and stock market analytics portal with interactive candle charts, profit/loss calculator, and automated price alerts.",
    tech: "Next.js 14, Recharts, TypeScript, TailwindCSS, CoinGecko API",
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/fintech-portfolio-tracker",
    liveUrl: "https://crypto-fintech-demo.vercel.app",
  },
  {
    id: "proj-5",
    title: "Developer Community Social Feed",
    description: "Full-featured developer network with markdown post sharing, nested commenting, code syntax highlighting, and profile badges.",
    tech: "Next.js 14, Node.js, SQLite, Prisma, Framer Motion, TailwindCSS",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/dev-community-hub",
    liveUrl: "https://dev-hub-community.vercel.app",
  },
  {
    id: "proj-6",
    title: "Cloud Infrastructure Health Monitor",
    description: "DevOps monitoring dashboard visualizing server uptime, CPU/memory loads, incident alerts, and network telemetry via Recharts.",
    tech: "TypeScript, Next.js App Router, Recharts, TailwindCSS, Prisma",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/mengistuAbawa/cloud-monitor-dashboard",
    liveUrl: "https://cloud-health-demo.vercel.app",
  },
];
