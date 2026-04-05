"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { Charts } from "@/components/dashboard/Charts";
import { Insights } from "@/components/dashboard/Insights";
import { TransactionList } from "@/components/transactions/TransactionList";
import { useFinance } from "@/context/FinanceContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { role } = useFinance();
  const [transitioning, setTransitioning] = useState(false);
  const prevRoleRef = useRef(role);

  useEffect(() => {
    if (prevRoleRef.current !== role) {
      prevRoleRef.current = role;
      setTransitioning(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      const timer = setTimeout(() => setTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [role]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="sticky top-14 z-40 w-full"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium border ${
                role === "admin"
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/20"
                  : "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20"
              }`}>
                <span className="text-base">{role === "admin" ? "🛡️" : "👁️"}</span>
                Switched to <span className="font-bold capitalize">{role}</span> mode
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        key={role}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative z-10"
      >
        <SummaryCards />
        <Charts />
        <Insights />
        <TransactionList />
      </motion.main>
    </div>
  );
}
