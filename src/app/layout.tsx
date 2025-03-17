import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

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
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
