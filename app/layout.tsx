import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Atlas | Anushka" ,
  description:
    "A research-focused portfolio exploring systems, context, and collaboration across computational work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
