"use client";

interface DynamicFieldsProps {
  dynamicFields: Record<string, string | string[]>;
  setDynamicFields: React.Dispatch<
    React.SetStateAction<Record<string, string | string[]>>
  >;

  fieldName: string;
  setFieldName: (v: string) => void;
  fieldValue: string;
  setFieldValue: (v: string) => void;
}

export default function DynamicFields({
  dynamicFields,
  setDynamicFields,
  fieldName,
  setFieldName,
  fieldValue,
  setFieldValue,
}: DynamicFieldsProps) {
  const addField = () => {
    if (!fieldName.trim() || !fieldValue.trim()) return;

    const value = fieldValue.includes(",")
      ? fieldValue.split(",").map(v => v.trim())
      : fieldValue;

    setDynamicFields(prev => ({
      ...prev,
      [fieldName.trim()]: value,
    }));

    setFieldName("");
    setFieldValue("");
  };

  const removeField = (key: string) => {
    setDynamicFields(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">
        Custom Fields
      </h3>

      {/* ADD FIELD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          placeholder="Field name (e.g. Skills)"
          value={fieldName}
          onChange={e => setFieldName(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2
                     bg-white text-slate-900 placeholder-slate-500
                     focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Value (comma separated)"
          value={fieldValue}
          onChange={e => setFieldValue(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2
                     bg-white text-slate-900 placeholder-slate-500
                     focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={addField}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Add Field
        </button>
      </div>

      {/* DISPLAY */}
      {Object.entries(dynamicFields).map(([key, value]) => (
        <div
          key={key}
          className="flex justify-between items-center
                     bg-white p-3 rounded border border-slate-200 shadow-sm"
        >
          <div>
            <p className="font-medium text-slate-800">{key}</p>
            <p className="text-sm text-slate-600">
              {Array.isArray(value) ? value.join(", ") : value}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeField(key)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
