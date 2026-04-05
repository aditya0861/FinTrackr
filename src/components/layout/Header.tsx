"use client";

import { useFinance } from "@/context/FinanceContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LayoutDashboard, Shield, Eye } from "lucide-react";
import { Role } from "@/types";

export function Header() {
  const { role, setRole } = useFinance();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-white/[0.06] bg-[#f0f2f5]/80 dark:bg-[#09090b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-500/25">
            <LayoutDashboard size={18} strokeWidth={2} />
          </div>
          <span className="text-base font-semibold text-gray-900 dark:text-white tracking-tight">
            Finance Dashboard
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-200/80 dark:bg-white/[0.06] rounded-lg p-0.5 border border-gray-300/50 dark:border-white/[0.06]">
            <button
              onClick={() => setRole("admin" as Role)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                role === "admin"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Shield size={12} strokeWidth={2.5} />
              Admin
            </button>
            <button
              onClick={() => setRole("viewer" as Role)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                role === "viewer"
                  ? "bg-white dark:bg-indigo-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Eye size={12} strokeWidth={2.5} />
              Viewer
            </button>
          </div>
          
          <div className="w-px h-5 bg-gray-300/50 dark:bg-white/10" />
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
