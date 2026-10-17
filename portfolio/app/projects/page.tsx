import Projects from "@/components/Projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mengistu Abawa - Full Stack Developer",
  description: "Explore 5+ real-world production web applications built by Mengistu Abawa using Next.js, Node.js, and modern tech stacks.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Projects />
    </div>
  );
}
