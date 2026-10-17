import ProjectUploader from "@/components/ProjectUploader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Project | Mengistu Abawa Portfolio",
  description: "Publish a new full-stack project to Mengistu Abawa's portfolio.",
};

export default function UploadPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/15 rounded-full filter blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <ProjectUploader />
      </div>
    </div>
  );
}
