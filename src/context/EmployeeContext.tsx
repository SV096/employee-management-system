"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Employee } from "@/types/employee";

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (emp: Employee) => void;
  updateEmployee: (emp: Employee) => void;
  deleteEmployee: (id: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [mounted, setMounted] = useState(false);

  // ✅ Load from localStorage AFTER mount
  useEffect(() => {
    const stored = localStorage.getItem("employees");
    if (stored) {
      const parsed: Employee[] = JSON.parse(stored);
      setEmployees(
        parsed.map(emp => ({
          ...emp,
          dynamicFields: emp.dynamicFields ?? {},
        }))
      );
    }
    setMounted(true);
  }, []);

  // ✅ Persist changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("employees", JSON.stringify(employees));
    }
  }, [employees, mounted]);

  const addEmployee = (emp: Employee) => {
    setEmployees(prev => [...prev, emp]);
  };

  const updateEmployee = (updatedEmp: Employee) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === updatedEmp.id ? updatedEmp : emp
      )
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, updateEmployee, deleteEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within EmployeeProvider");
  }
  return context;
};
