"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition
     ${
       pathname === path
         ? "bg-primary text-primary-foreground"
         : "text-muted-foreground hover:bg-muted"
     }`;

  return (
    <header className="border-b">
      <div className="flex flex-col gap-3 p-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg">📊 Stock Admin Panel</h1>
          <ThemeToggle />
        </div>

        <nav className="flex gap-2">
          <Link href="/stock-high-low" className={linkClass("/stock-high-low")}>
            High / Low
          </Link>

          <Link href="/stock-calculator" className={linkClass("/stock-calculator")}>
            Stock TP / SL Calc
          </Link>

          <Link href="/risk-reward-calculator" className={linkClass("/risk-reward-calculator")}>
            Risk Reward
          </Link>
        </nav>
      </div>
    </header>
  );
}
