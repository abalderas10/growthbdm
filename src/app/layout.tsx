import { config } from "@/config";
import { signOgImageUrl } from "@/lib/og-image";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Header } from "@/components/Header";
import { Toaster } from "sonner";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: config.blog.metadata.title.absolute,
    default: config.blog.metadata.title.default,
    template: config.blog.metadata.title.template,
  },
  description: config.blog.metadata.description,
  openGraph: {
    title: config.blog.metadata.title.default,
    description: config.blog.metadata.description,
    images: [
      signOgImageUrl({
        title: config.blog.name,
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body
        className={cn(
          `${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-900 dark:to-blue-900`,
          fontSans.variable
        )}
      >
        <Providers>
          <AuthProvider>
            <Header />
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
