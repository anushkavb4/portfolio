import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Anushka Bilandani | AI Engineer & Research Systems",
  description:
    "Anushka Bilandani builds AI and software systems for knowledge-intensive work, research, and real-world workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
