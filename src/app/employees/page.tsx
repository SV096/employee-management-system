"use client";

import { useEmployees } from "@/context/EmployeeContext";
import { useEffect, useRef, useState } from "react";

export default function EmployeesPage() {
  const { employees, deleteEmployee } = useEmployees();

  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  const employeeRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!mounted) return null;

  const handleSearch = () => {
    if (!search.trim()) return;

    const found = employees.find(emp =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );

    if (found) {
      const el = employeeRefs.current[found.id];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });

        // highlight card
        el.classList.add("ring-2", "ring-blue-500");
        setTimeout(() => {
          el.classList.remove("ring-2", "ring-blue-500");
        }, 2000);
      }

      setNotFound(false);
    } else {
      setNotFound(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setNotFound(false);
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Employees List
        </h2>

        {/* 🔍 SEARCH BAR */}
        <div
          className="flex items-center gap-3 mb-4
                     bg-white p-4 rounded-lg shadow-sm
                     border border-slate-200"
        >
          <input
            type="text"
            placeholder="Search employee by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            className="flex-1 h-11
                       border border-slate-300 rounded-lg
                       px-4
                       bg-white text-slate-900
                       placeholder:text-slate-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="h-11 px-6 rounded-lg
                       bg-blue-600 text-white
                       font-medium
                       hover:bg-blue-700
                       active:scale-[0.98]
                       transition"
          >
            Search
          </button>
        </div>

        {notFound && (
          <p className="text-red-600 mb-4 font-medium">
            Employee not found in the list
          </p>
        )}

        <hr className="mb-6 border-slate-200" />

        {employees.length === 0 ? (
          <p className="text-gray-500">No employees added yet.</p>
        ) : (
          <ul className="space-y-4">
            {employees.map(emp => (
              <li
                key={emp.id}
                ref={el => {
                  employeeRefs.current[emp.id] = el;
                }}
                className="bg-white p-6 rounded-lg shadow-sm
                           flex justify-between items-start
                           border-l-4 border-blue-500
                           transition-all"
              >
                {/* LEFT */}
                <div className="space-y-1">
                  <p className="font-semibold text-slate-900 text-lg">
                    {emp.name}
                  </p>
                  <p className="text-sm text-slate-600">{emp.email}</p>
                  <p className="text-sm text-slate-500">{emp.role}</p>

                  {emp.dynamicFields &&
                    Object.keys(emp.dynamicFields).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {Object.entries(emp.dynamicFields).map(
                          ([key, value]) => (
                            <p
                              key={key}
                              className="text-sm text-slate-500 pl-2"
                            >
                              <span className="font-medium text-slate-600">
                                {key}:
                              </span>{" "}
                              {Array.isArray(value)
                                ? value.join(", ")
                                : value}
                            </p>
                          )
                        )}
                      </div>
                    )}
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <a
                    href={`/employees/${emp.id}/edit`}
                    className="px-4 py-2 rounded-md
                               border border-blue-500
                               text-blue-600
                               hover:bg-blue-50
                               font-medium"
                  >
                    Edit
                  </a>

                  <button
                    onClick={() => deleteEmployee(emp.id)}
                    className="px-4 py-2 rounded-md
                               border border-red-500
                               text-red-600
                               hover:bg-red-50
                               font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
