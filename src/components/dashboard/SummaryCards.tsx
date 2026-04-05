"use client";

import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowDownRight, ArrowUpRight, DollarSign, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";

export function SummaryCards() {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;
  const savingRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: DollarSign,
      iconBg: "bg-indigo-100 dark:bg-indigo-500/10",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      borderAccent: "hover:border-indigo-300 dark:hover:border-indigo-500/30",
    },
    {
      title: "Total Income",
      amount: income,
      icon: ArrowUpRight,
      iconBg: "bg-emerald-100 dark:bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      borderAccent: "hover:border-emerald-300 dark:hover:border-emerald-500/30",
    },
    {
      title: "Total Expenses",
      amount: expenses,
      icon: ArrowDownRight,
      iconBg: "bg-red-100 dark:bg-red-500/10",
      iconColor: "text-red-600 dark:text-red-400",
      borderAccent: "hover:border-red-300 dark:hover:border-red-500/30",
    },
    {
      title: "Saving Rate",
      amount: savingRate,
      format: "percent",
      icon: PiggyBank,
      iconBg: "bg-amber-100 dark:bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
      borderAccent: "hover:border-amber-300 dark:hover:border-amber-500/30",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        >
          <Card className={`card-interactive ${card.borderAccent}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                  <card.icon className={`h-4 w-4 ${card.iconColor}`} strokeWidth={2} />
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {'format' in card && card.format === 'percent'
                  ? `${card.amount.toFixed(1)}%`
                  : `$${card.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
