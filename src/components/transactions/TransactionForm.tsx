"use client";

import React, { useState } from "react";
import { Transaction, TransactionType } from "@/types";

interface TransactionFormProps {
  initialData?: Transaction;
  onSubmit: (data: Omit<Transaction, "id">) => void;
  onCancel: () => void;
}

export function TransactionForm({ initialData, onSubmit, onCancel }: TransactionFormProps) {
  const [amount, setAmount] = useState(initialData ? initialData.amount.toString() : "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>(initialData?.type || "expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    
    onSubmit({
      amount: parseFloat(amount),
      category,
      date,
      type
    });
  };

  const inputClass = "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${
            type === "expense"
              ? "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20"
              : "bg-white dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.06]"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all border ${
            type === "income"
              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
              : "bg-white dark:bg-white/[0.04] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/[0.08] hover:bg-gray-50 dark:hover:bg-white/[0.06]"
          }`}
        >
          Income
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</label>
        <input 
          type="number" 
          step="0.01" min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className={inputClass}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</label>
          <input 
            type="text" value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Food"
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</label>
          <input 
            type="date" value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button 
          type="button" onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-500/25"
        >
          {initialData ? "Save Changes" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}
