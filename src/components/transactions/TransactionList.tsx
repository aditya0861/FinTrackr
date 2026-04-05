"use client";

import React, { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { Transaction } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { TransactionForm } from "./TransactionForm";
import { format, parseISO } from "date-fns";
import { Edit2, Plus, Search, Trash2, ArrowUpRight, ArrowDownRight, ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TransactionList() {
  const { transactions, role, addTransaction, updateTransaction, deleteTransaction } = useFinance();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleAdd = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingCard(transaction);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Transaction, "id">) => {
    if (editingCard) {
      updateTransaction({ ...data, id: editingCard.id });
    } else {
      addTransaction({ ...data, id: Math.random().toString(36).substring(2, 9) });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-2">
            <ListFilter size={16} className="text-indigo-500" />
            <CardTitle className="text-gray-700 dark:text-gray-300">Recent Transactions</CardTitle>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14} />
              <input 
                type="text" 
                placeholder="Search category..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none w-full sm:w-56 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none cursor-pointer transition-all"
            >
              <option value="all" className="bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100">All Types</option>
              <option value="income" className="bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100">Income</option>
              <option value="expense" className="bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100">Expense</option>
            </select>
            {role === "admin" && (
              <button 
                onClick={handleAdd}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-indigo-500/25"
              >
                <Plus size={14} />
                Add
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <Search size={32} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="font-medium text-sm">No transactions found</p>
              <p className="text-xs mt-1">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/[0.06]">
                <div className="col-span-3">Date</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-2 text-right">Amount</div>
                {role === "admin" && <div className="col-span-1 text-right">Actions</div>}
              </div>

              <div className="divide-y divide-gray-100 dark:divide-white/[0.04]">
                <AnimatePresence>
                  {filteredTransactions.map((t, index) => (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors rounded-lg"
                    >
                      <div className="col-span-3">
                        <span className="md:hidden text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-2">Date</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {format(parseISO(t.date), "MMM dd, yyyy")}
                        </span>
                      </div>
                      
                      <div className="col-span-3">
                        <span className="md:hidden text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-2">Category</span>
                        <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-white/[0.06] text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-white/[0.06]">
                          {t.category}
                        </span>
                      </div>
                      
                      <div className="col-span-3">
                        <span className="md:hidden text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-2">Type</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-md border ${
                          t.type === 'income' 
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' 
                            : 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20'
                        }`}>
                          {t.type === 'income' ? <ArrowUpRight size={10} strokeWidth={2.5} /> : <ArrowDownRight size={10} strokeWidth={2.5} />}
                          <span className="capitalize">{t.type}</span>
                        </span>
                      </div>
                      
                      <div className="col-span-2 text-right">
                        <span className="md:hidden text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-2">Amount</span>
                        <span className={`text-sm font-semibold ${
                          t.type === 'income' 
                            ? 'text-emerald-600 dark:text-emerald-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      {role === "admin" && (
                        <div className="col-span-1 flex items-center justify-end gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(t)}
                            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button 
                            onClick={() => handleDelete(t.id)}
                            className="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </CardContent>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title={editingCard ? "Edit Transaction" : "New Transaction"}
        >
          <TransactionForm 
            initialData={editingCard || undefined} 
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </Card>
    </motion.div>
  );
}
