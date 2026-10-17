import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { personalInfo } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mengistu-abawa.vercel.app"),
  title: `${personalInfo.name} | ${personalInfo.role}`,
  description: personalInfo.bio,
  keywords: [
    "Mengistu Abawa",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript Portfolio",
    "Node.js",
    "TailwindCSS",
    "React",
    "Web Developer",
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.githubUrl }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mengistu-abawa.vercel.app",
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.bio,
    siteName: `${personalInfo.name} Portfolio`,
    images: [
      {
        url: personalInfo.profileImage,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - ${personalInfo.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} | ${personalInfo.role}`,
    description: personalInfo.bio,
    images: [personalInfo.profileImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-[#0b0f19] dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
