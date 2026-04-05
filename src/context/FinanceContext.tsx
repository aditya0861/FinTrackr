"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Transaction, Role } from "@/types";
import { mockTransactions } from "@/data/mockTransactions";

interface FinanceContextType {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [role, setRole] = useState<Role>("admin");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("finance-transactions");
    const storedRole = localStorage.getItem("finance-role");

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions(mockTransactions);
    }

    if (storedRole) {
      setRole(storedRole as Role);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("finance-transactions", JSON.stringify(transactions));
      localStorage.setItem("finance-role", role);
    }
  }, [transactions, role, isLoaded]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
