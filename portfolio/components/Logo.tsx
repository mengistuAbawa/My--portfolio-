import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/lib/data";

export function Logo() {
  return (
    <Link href="/#home" className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-brand-500 via-indigo-600 to-accent-400 flex items-center justify-center text-white font-mono font-bold text-xl shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300 relative">
        <Image
          src="/images/logo.jpg"
          alt="Logo"
          width={40}
          height={40}
          unoptimized
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-accent-400 transition-colors">
          {personalInfo.name}
        </span>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
          {personalInfo.role}
        </span>
      </div>
    </Link>
  );
}

export default Logo;
