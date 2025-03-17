import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 dark:border-blue-800/30 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-background dark:to-primary/10">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 py-8">
        
        <p className="text-gray-600 dark:text-blue-200/80 text-sm font-medium">
          {new Date().getFullYear()} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200 font-semibold">GrowthBDM</span>
        </p>

        <div className="flex gap-6 items-center">
          <a
            href="/rss.xml"
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            aria-label="Suscribirse al feed RSS"
          >
            <Rss className="h-5 w-5" />
          </a>
          <DarkModeToggle />
        </div>

      </div>
    </footer>
  );
}
