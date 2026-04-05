"use client";

import { useFinance } from "@/context/FinanceContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { parseISO, format, isValid } from "date-fns";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#ec4899', '#8b5cf6', '#14b8a6'];

export function Charts() {
  const { transactions } = useFinance();
  const { resolvedTheme } = useTheme();

  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let currentBalance = 0;
  const balanceDataMap = new Map<string, number>();

  sortedTransactions.forEach((t) => {
    currentBalance += t.type === "income" ? t.amount : -t.amount;
    const pDate = parseISO(t.date);
    if (isValid(pDate)) {
      balanceDataMap.set(format(pDate, "MMM dd"), currentBalance);
    }
  });

  const balanceData = Array.from(balanceDataMap, ([date, balance]) => ({ date, balance }));

  const expensesByCategory = new Map<string, number>();
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      expensesByCategory.set(t.category, (expensesByCategory.get(t.category) || 0) + t.amount);
    });

  const spendingData = Array.from(expensesByCategory, ([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const isDark = resolvedTheme === "dark";
  const axisColor = isDark ? "#4b5563" : "#9ca3af";
  const gridColor = isDark ? "#1f2937" : "#f3f4f6";

  const tooltipStyle = {
    backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
    borderColor: isDark ? '#2a2a2a' : '#e5e7eb',
    color: isDark ? '#f3f4f6' : '#111827',
    borderRadius: '10px',
    boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid ' + (isDark ? '#2a2a2a' : '#e5e7eb'),
    fontSize: '13px',
    padding: '8px 12px',
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Card className="h-full card-interactive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-indigo-500" />
              <CardTitle className="text-gray-700 dark:text-gray-300">Balance Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {balanceData.length === 0 ? (
              <div className="h-[280px] flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">No data available</div>
            ) : (
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={balanceData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={isDark ? 0.3 : 0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis dataKey="date" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} dy={8} />
                    <YAxis 
                      stroke={axisColor} 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={{ r: 3, fill: isDark ? '#141414' : '#fff', stroke: '#6366f1', strokeWidth: 2 }}
                      activeDot={{ r: 5, fill: '#6366f1', strokeWidth: 0 }}
                      fillOpacity={1}
                      fill="url(#colorBalance)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}>
        <Card className="h-full card-interactive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PieChartIcon size={16} className="text-indigo-500" />
              <CardTitle className="text-gray-700 dark:text-gray-300">Spending Breakdown</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {spendingData.length === 0 ? (
              <div className="h-[280px] flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">No data available</div>
            ) : (
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={3}
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => `$${value}`}
                      contentStyle={tooltipStyle}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle" 
                      iconSize={8}
                      wrapperStyle={{ fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
