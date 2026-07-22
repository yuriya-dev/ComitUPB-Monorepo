import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ComitUPB",
    "Komunitas IT Kebumen",
    "Universitas Putra Bangsa",
    "Web Development",
    "Cyber Security",
    "Data Science",
    "Mobile Development",
    "UI/UX Design",
    "Mahasiswa IT",
  ],
  authors: [{ name: "ComitUPB Team" }],
  creator: "ComitUPB",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-dark font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
