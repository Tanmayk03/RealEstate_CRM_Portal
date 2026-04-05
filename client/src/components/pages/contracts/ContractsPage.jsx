import { useEffect, useState } from "react";
import { Download, Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { contractCustomers, contractProperties, initialContracts } from "./contractsMock";

function statusBadge(s) {
  if (s === "Active") return "bg-green-100 text-green-800";
  if (s === "Draft") return "bg-yellow-100 text-yellow-800";
  return "bg-gray-200 text-gray-700";
}

export default function ContractsPage() {
  const [rows, setRows] = useState(initialContracts);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customerId: "",
    propertyId: "",
    value: "",
    start: "",
    end: "",
    status: "Draft",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const save = () => {
    const e = {};
    if (!form.customerId) e.customerId = true;
    if (!form.propertyId) e.propertyId = true;
    if (!form.value.trim()) e.value = true;
    if (!form.start) e.start = true;
    if (!form.end) e.end = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    const cust = contractCustomers.find((c) => c.id === form.customerId)?.name;
    const prop = contractProperties.find((p) => p.id === form.propertyId)?.label;
    setRows((prev) => [
      {
        id: `CNT-${600 + prev.length}`,
        customer: cust,
        property: prop,
        value: form.value.startsWith("₹") ? form.value : `₹${form.value}`,
        start: form.start,
        end: form.end,
        status: form.status,
      },
      ...prev,
    ]);
    setOpen(false);
    setForm({ customerId: "", propertyId: "", value: "", start: "", end: "", status: "Draft" });
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Contracts</h1>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> New Contract
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Contract #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">End Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={3} cols={8} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={8} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.id}</td>
                    <td className="px-4 py-3">{r.customer}</td>
                    <td className="px-4 py-3">{r.property}</td>
                    <td className="px-4 py-3">{r.value}</td>
                    <td className="px-4 py-3">{r.start}</td>
                    <td className="px-4 py-3">{r.end}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusBadge(r.status)}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 inline-flex" aria-label="Download PDF placeholder">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New Contract" size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
            <select value={form.customerId} onChange={(e) => setForm((f) => ({ ...f, customerId: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("customerId")}`}>
              <option value="">Select</option>
              {contractCustomers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Property</label>
            <select value={form.propertyId} onChange={(e) => setForm((f) => ({ ...f, propertyId: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("propertyId")}`}>
              <option value="">Select</option>
              {contractProperties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Value</label>
            <input value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("value")}`} placeholder="₹2.4 Cr" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Start</label>
              <input type="date" value={form.start} onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("start")}`} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">End</label>
              <input type="date" value={form.end} onChange={(e) => setForm((f) => ({ ...f, end: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("end")}`} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Upload PDF (UI only)</label>
            <input type="file" accept="application/pdf" className="block w-full text-sm text-gray-600" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border rounded-md">
              Cancel
            </button>
            <button type="button" onClick={save} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
              Create
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
