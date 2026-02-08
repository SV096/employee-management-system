"use client";

import Link from "next/link";
import { Users, PlusCircle, Search } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Employee Management System
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
          A modern web application to manage employees, roles, and custom
          attributes with full CRUD operations.
        </p>

        {/* PRIMARY ACTIONS */}
        <div className="flex justify-center gap-4">
          <Link
            href="/employees"
            className="inline-flex items-center gap-2
                       px-7 py-3 rounded-lg
                       bg-blue-600 text-white font-medium
                       hover:bg-blue-700 transition"
          >
            <Users size={18} />
            View Employees
          </Link>

          <Link
            href="/employees/new"
            className="inline-flex items-center gap-2
                       px-7 py-3 rounded-lg
                       border border-blue-600 text-blue-600 font-medium
                       hover:bg-blue-50 hover:-translate-y-[1px]
                       transition-all shadow-sm"
          >
            <PlusCircle size={18} />
            Add Employee
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Feature
            icon={<Users size={26} />}
            title="Employee CRUD"
            desc="Create, view, update, and delete employee records with ease."
          />

          <Feature
            icon={<PlusCircle size={26} />}
            title="Dynamic Fields"
            desc="Add custom attributes like phone, team, floor, skills, and more."
          />

          <Feature
            icon={<Search size={26} />}
            title="Search & Edit"
            desc="Quickly search employees by name and edit details instantly."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-slate-500">
        Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  );
}
