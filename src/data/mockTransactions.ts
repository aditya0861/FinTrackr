import { Transaction } from "@/types";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2023-10-01", amount: 5000, category: "Salary", type: "income" },
  { id: "2", date: "2023-10-02", amount: 120, category: "Groceries", type: "expense" },
  { id: "3", date: "2023-10-05", amount: 60, category: "Utilities", type: "expense" },
  { id: "4", date: "2023-10-08", amount: 200, category: "Entertainment", type: "expense" },
  { id: "5", date: "2023-10-12", amount: 15, category: "Subscriptions", type: "expense" },
  { id: "6", date: "2023-10-15", amount: 300, category: "Freelance", type: "income" },
  { id: "7", date: "2023-10-20", amount: 45, category: "Dining", type: "expense" },
  { id: "8", date: "2023-10-25", amount: 80, category: "Transport", type: "expense" },
  { id: "9", date: "2023-10-28", amount: 1500, category: "Housing", type: "expense" },
  { id: "10", date: "2023-10-29", amount: 250, category: "Shopping", type: "expense" },
];
