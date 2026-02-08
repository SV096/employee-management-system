"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO + TITLE */}
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Users size={20} />
          </div>
          <span className="font-semibold text-lg text-slate-800">
            Employee Management
          </span>
        </Link>

        {/* NAV (hidden on Home page) */}
        {!isHome && (
          <nav className="flex items-center gap-4">
            <Link
              href="/employees"
              className="text-blue-600 font-medium hover:underline"
            >
              Employees
            </Link>

            {/* ✅ FIXED ROUTE */}
            <Link
              href="/employees/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md
                         hover:bg-blue-700 transition"
            >
              Add Employee
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
