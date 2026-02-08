"use client";

import { useEmployees } from "@/context/EmployeeContext";
import EmployeeForm from "@/components/EmployeeForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditEmployeePage() {
  const { employees } = useEmployees();
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const employee = employees.find(emp => emp.id === params.id);

  if (!employee) {
    return <p className="p-6">Employee not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <EmployeeForm employee={employee} />
    </div>
  );
}
