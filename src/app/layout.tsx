import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Growth BDM",
  description: "Business Development Management",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Growth BDM",
    "Business Development",
    "Real Estate",
    "Property Management",
    "Consulting",
  ],
  authors: [
    {
      name: "Alberto Balderas",
      url: "https://growthbdm.com",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`h-full bg-background font-sans antialiased ${fontSans.variable}`}>
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
