"use client";
import { config } from "@/config";
import { Rss } from "lucide-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "./ui/button";

const Footer: FunctionComponent = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="w-full py-8 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Growth Business Development, 2025
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/rss">
              <Button variant="ghost" className="p-2">
                <Rss className="w-4 h-4" />
              </Button>
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
