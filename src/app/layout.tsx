import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

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
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`h-full bg-background font-sans antialiased ${fontSans.variable}`}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              {children}
            </Providers>
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
