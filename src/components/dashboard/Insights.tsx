"use client";

import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export function Insights() {
  const { transactions } = useFinance();

  const expenses = transactions.filter((t) => t.type === "expense");
  const incomes = transactions.filter((t) => t.type === "income");
  
  const expensesByCategory = new Map<string, number>();
  expenses.forEach((t) => {
    expensesByCategory.set(t.category, (expensesByCategory.get(t.category) || 0) + t.amount);
  });

  let highestCategory = "N/A";
  let highestAmount = 0;
  expensesByCategory.forEach((amount, category) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let thisMonthExpenses = 0;
  let lastMonthExpenses = 0;

  expenses.forEach((t) => {
    const d = new Date(t.date);
    if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
      thisMonthExpenses += t.amount;
    } else if (
      (d.getMonth() === currentMonth - 1 && d.getFullYear() === currentYear) ||
      (currentMonth === 0 && d.getMonth() === 11 && d.getFullYear() === currentYear - 1)
    ) {
      lastMonthExpenses += t.amount;
    }
  });

  const percentChange = lastMonthExpenses === 0 
    ? (thisMonthExpenses > 0 ? 100 : 0) 
    : ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;
  const isSpendingMore = percentChange > 0;

  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const savingsPercentage = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  const isNetPositive = totalIncome >= totalExpenses;

  if (transactions.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Card className="card-interactive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-500" />
              <CardTitle className="text-gray-700 dark:text-gray-300">Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 dark:text-gray-500 text-sm">No transactions available to generate insights.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const insights = [
    {
      label: "Highest Spending Category",
      text: (
        <>
          Your top expense is <span className="font-semibold text-gray-900 dark:text-white">{highestCategory}</span> at{" "}
          <span className="font-semibold text-red-600 dark:text-red-400">${highestAmount.toLocaleString()}</span>
        </>
      ),
      color: "bg-red-500",
    },
    {
      label: "Monthly Comparison",
      text: lastMonthExpenses === 0 && thisMonthExpenses === 0
        ? "Not enough data across two months for comparison."
        : lastMonthExpenses === 0
        ? "No expenses recorded last month to compare against."
        : (
          <>
            Spending is{" "}
            <span className={`font-semibold ${isSpendingMore ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {Math.abs(Math.round(percentChange))}% {isSpendingMore ? 'higher' : 'lower'}
            </span>{" "}
            compared to last month.
          </>
        ),
      color: isSpendingMore ? "bg-red-500" : "bg-emerald-500",
    },
    {
      label: "Savings Overview",
      text: isNetPositive
        ? (
          <>
            You are saving <span className="font-semibold text-emerald-600 dark:text-emerald-400">{savingsPercentage.toFixed(1)}%</span> of your income.
          </>
        )
        : (
          <>
            Expenses exceed income by <span className="font-semibold text-amber-600 dark:text-amber-400">${(totalExpenses - totalIncome).toLocaleString()}</span>.
          </>
        ),
      color: isNetPositive ? "bg-emerald-500" : "bg-amber-500",
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <Card className="card-interactive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb size={16} className="text-amber-500" />
            <CardTitle className="text-gray-700 dark:text-gray-300">Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {insights.map((insight) => (
              <div
                key={insight.label}
                className="card-interactive flex gap-3 p-4 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] hover:border-gray-200 dark:hover:border-white/[0.12] transition-colors"
              >
                <div className={`w-1 h-auto ${insight.color} rounded-full shrink-0`} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
                    {insight.label}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {insight.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
