import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FinanceProvider } from "@/context/FinanceContext";

export const metadata: Metadata = {
  title: "Finance Dashboard",
  description: "A clean and interactive finance dashboard interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#f0f2f5] dark:bg-[#09090b] text-gray-900 dark:text-gray-50 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <FinanceProvider>
            <div className="ambient-glow" />
            {children}
          </FinanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
