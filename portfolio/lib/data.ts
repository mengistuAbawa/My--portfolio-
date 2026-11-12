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
  bio: "I'm a full-stack developer focused on building clear, reliable web products. I turn real workflows into responsive applications, from team coordination and education to healthcare and online learning.",
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
  { name: "Experience", href: "/#experience" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export const heroStats = [
  { label: "Featured Projects", value: "04", description: "Live web applications" },
  { label: "Project Areas", value: "04", description: "Team, education, health, learning" },
  { label: "Core Role", value: "Full-stack", description: "Frontend and backend" },
  { label: "Approach", value: "User-first", description: "Useful, thoughtful products" },
];

export interface FeatureCard {
  title: string;
  description: string;
  iconName: "Code2" | "FolderGit2" | "Users2" | "Sparkles";
}

export const aboutFeatures: FeatureCard[] = [
  {
    title: "Clean Code",
    description: "Thoughtful component structure and readable code that is easier to maintain and extend.",
    iconName: "Code2",
  },
  {
    title: "Four Featured Builds",
    description: "Live applications for team workflows, university administration, healthcare, and online learning.",
    iconName: "FolderGit2",
  },
  {
    title: "Team Player",
    description: "Clear communication, shared ownership, and an open approach to feedback and collaboration.",
    iconName: "Users2",
  },
  {
    title: "Best Practices",
    description: "A focus on responsive layouts, accessible interactions, clear feedback, and reliable delivery.",
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
    title: "Team Workflow Platform",
    description: "A shared workspace for coordinating team projects, organizing work, and keeping progress visible in one place.",
    tech: "",
    imageUrl: "/images/projects/team-workflow.svg",
    githubUrl: "",
    liveUrl: "https://team-workflow-platform-sslh.vercel.app/",
  },
  {
    id: "proj-2",
    title: "Injibara University Management System",
    description: "A university platform designed to bring academic administration and student services into one organized digital experience.",
    tech: "",
    imageUrl: "/images/projects/injibara-university.svg",
    githubUrl: "",
    liveUrl: "https://injibara-university-management-syst-omega.vercel.app/",
  },
  {
    id: "proj-3",
    title: "EthioCare Health Platform",
    description: "A digital health-services experience that helps people find care information and connect with relevant services.",
    tech: "",
    imageUrl: "/images/projects/ethio-care.svg",
    githubUrl: "",
    liveUrl: "https://ethio-care-platform-mpcj.vercel.app/",
  },
  {
    id: "proj-4",
    title: "Learning Management System",
    description: "An online learning platform for organizing courses and learning resources in a clear, accessible space for learners.",
    tech: "",
    imageUrl: "/images/projects/learning-management.svg",
    githubUrl: "",
    liveUrl: "https://learning-management-system-yhr4.vercel.app/an",
  },
];
