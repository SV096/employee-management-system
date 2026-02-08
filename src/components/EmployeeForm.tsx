"use client";

import { useState, useEffect } from "react";
import { Employee } from "@/types/employee";
import { useEmployees } from "@/context/EmployeeContext";
import { useRouter } from "next/navigation";
import DynamicFields from "@/components/DynamicFields";

interface Props {
  employee?: Employee;
}

export default function EmployeeForm({ employee }: Props) {
  const { addEmployee, updateEmployee } = useEmployees();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [dynamicFields, setDynamicFields] = useState<
    Record<string, string | string[]>
  >({});

  // pending custom field (KEY FIX)
  const [fieldName, setFieldName] = useState("");
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setRole(employee.role);
      setDynamicFields(employee.dynamicFields ?? {});
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !role) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ synchronously merge last pending field
    const finalDynamicFields = { ...dynamicFields };

    if (fieldName.trim() && fieldValue.trim()) {
      finalDynamicFields[fieldName.trim()] = fieldValue.includes(",")
        ? fieldValue.split(",").map(v => v.trim())
        : fieldValue;
    }

    const payload: Employee = {
      id: employee?.id ?? crypto.randomUUID(),
      name,
      email,
      role,
      dynamicFields: finalDynamicFields,
    };

    employee ? updateEmployee(payload) : addEmployee(payload);
    router.push("/employees");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-slate-800">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

    <input
  type="text"
  placeholder="Enter full name"
  value={name}
  onChange={e =>
    setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
  }
  required
  minLength={2}
  maxLength={50}
  className="w-full border border-slate-300 rounded px-3 py-2
             bg-white text-slate-900
             placeholder-slate-500
             focus:ring-2 focus:ring-blue-500"
/>


     <input
  type="email"
  placeholder="Enter work email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  required
  className="w-full border border-slate-300 rounded px-3 py-2
             bg-white text-slate-900
             placeholder-slate-500
             focus:ring-2 focus:ring-blue-500"
/>


      <input
  type="text"
  placeholder="e.g. Software Engineer"
  value={role}
  onChange={e =>
    setRole(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
  }
  required
  minLength={2}
  maxLength={40}
  className="w-full border border-slate-300 rounded px-3 py-2
             bg-white text-slate-900
             placeholder-slate-500
             focus:ring-2 focus:ring-blue-500"
/>


      <DynamicFields
        dynamicFields={dynamicFields}
        setDynamicFields={setDynamicFields}
        fieldName={fieldName}
        setFieldName={setFieldName}
        fieldValue={fieldValue}
        setFieldValue={setFieldValue}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {employee ? "Update Employee" : "Save Employee"}
      </button>
    </form>
  );
}
