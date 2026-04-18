# Finance Dashboard UI

A clean and interactive finance dashboard interface built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## Features

### 1. Dashboard Overview
- **Summary Cards** — Total Balance, Total Income, Total Expenses, and Saving Rate.
- **Balance Trend Chart** — A time-based area chart showing how balance changes over time (Recharts).
- **Spending Breakdown Chart** — A categorical donut/pie chart showing expenses by category (Recharts).

### 2. Transactions Section
- Displays a list of transactions with: **Date**, **Amount**, **Category**, and **Type** (income/expense).
- **Search** — Filter transactions by category keyword.
- **Filter** — Filter by type (All / Income / Expense).
- **Sorting** — Transactions are sorted by date (newest first).
- Admin users can **Add**, **Edit**, and **Delete** transactions.

### 3. Role-Based UI
- Simulated on the frontend with a **dropdown toggle** in the header.
- **Admin** — Can view all data, add new transactions, edit existing ones, and delete transactions.
- **Viewer** — Can only view data; add/edit/delete controls are hidden.
- Role state is persisted in LocalStorage.

### 4. Insights Section
- **Highest Spending Category** — Identifies which category has the most expenses.
- **Monthly Comparison** — Compares current month expenses vs. previous month.
- **Savings Overview** — Shows what percentage of income is being saved, or warns if expenses exceed income.
- Handles empty/no-data cases gracefully.

### 5. State Management
- Uses **React Context API** (`FinanceContext`) to manage:
  - Transactions data
  - Filters (search term, type filter)
  - Selected role (admin/viewer)
- State is persisted to **LocalStorage** so data survives page refreshes.

### 6. UI/UX
- Clean, readable design with proper spacing and typography.
- Fully **responsive** — works on mobile, tablet, and desktop.
- **Dark mode** support with system preference detection and manual toggle.
- Smooth **animations** using Framer Motion.
- Empty state handling for transactions and insights.

---

## Tech Stack

| Technology     | Purpose                          |
|----------------|----------------------------------|
| Next.js 16     | React framework (App Router)     |
| TypeScript     | Type safety                      |
| Tailwind CSS 4 | Styling                          |
| Recharts       | Data visualizations              |
| Framer Motion  | Animations and transitions       |
| date-fns       | Date formatting                  |
| Lucide React   | Icons                            |
| next-themes    | Dark mode support                |

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd assignment

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```



## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles (Tailwind import)
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── dashboard/
│   │   ├── SummaryCards.tsx  # Balance, Income, Expenses, Saving Rate cards
│   │   ├── Charts.tsx       # Balance Trend + Spending Breakdown charts
│   │   └── Insights.tsx     # Smart insights from transaction data
│   ├── transactions/
│   │   ├── TransactionList.tsx  # Transaction list with search/filter
│   │   └── TransactionForm.tsx  # Add/Edit transaction form
│   ├── layout/
│   │   └── Header.tsx       # App header with role switcher + dark mode
│   ├── ui/
│   │   ├── Card.tsx         # Reusable card component
│   │   └── Modal.tsx        # Reusable modal component
│   ├── ThemeProvider.tsx    # next-themes wrapper
│   └── ThemeToggle.tsx      # Dark/light mode toggle button
├── context/
│   └── FinanceContext.tsx   # Global state (transactions, role)
├── data/
│   └── mockTransactions.ts  # Sample transaction data
└── types/
    └── index.ts             # TypeScript type definitions
```

---

## Approach & Design Decisions

1. **Context API over Redux/Zustand** — Chosen for simplicity since the app has a small, well-defined state shape (transactions + role). Avoids unnecessary dependencies.
2. **LocalStorage persistence** — Transactions and role are saved to LocalStorage on every change, so data survives page refreshes without needing a backend.
3. **Component composition** — Reusable `Card` and `Modal` components keep the UI consistent and code DRY.
4. **Responsive-first** — All layouts use CSS Grid/Flexbox with responsive breakpoints to work across screen sizes.
5. **Graceful empty states** — Charts, transaction list, and insights all handle zero-data scenarios with helpful messages instead of broken UIs.

---

## Optional Enhancements Implemented

- ✅ Dark mode (with system detection + manual toggle)
- ✅ Data persistence (LocalStorage)
- ✅ Animations and transitions (Framer Motion)


## live demo
https://fin-trackr-alpha.vercel.app/
