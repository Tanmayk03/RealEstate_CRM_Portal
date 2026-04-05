import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";

const CATS = ["All", "Marketing", "Travel", "Utilities", "Office", "Other"];

const initialRows = [
  { id: "1", title: "Google Ads", category: "Marketing", amount: "₹12,000", date: "2026-04-02", by: "Admin", notes: "Campaign" },
  { id: "2", title: "Site visit fuel", category: "Travel", amount: "₹3,200", date: "2026-03-28", by: "Riya", notes: "" },
];

export default function ExpensesPage() {
  const [rows, setRows] = useState(initialRows);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", category: "Marketing", amount: "", date: "", notes: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (cat === "All") return rows;
    return rows.filter((r) => r.category === cat);
  }, [rows, cat]);

  const totals = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const monthSum = rows
      .filter((r) => {
        const d = new Date(r.date);
        return d.getFullYear() === y && d.getMonth() === m;
      })
      .reduce((a, r) => a + (parseFloat(r.amount.replace(/[^\d.]/g, "")) || 0), 0);
    const yearSum = rows
      .filter((r) => new Date(r.date).getFullYear() === y)
      .reduce((a, r) => a + (parseFloat(r.amount.replace(/[^\d.]/g, "")) || 0), 0);
    return { monthSum, yearSum };
  }, [rows]);

  const save = () => {
    const e = {};
    if (!form.title.trim()) e.title = true;
    if (!form.amount.trim()) e.amount = true;
    if (!form.date) e.date = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    setRows((prev) => [
      { id: String(Date.now()), ...form, amount: `₹${form.amount}`, by: "You", notes: form.notes || "—" },
      ...prev,
    ]);
    setOpen(false);
    setForm({ title: "", category: "Marketing", amount: "", date: "", notes: "" });
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Expenses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="text-sm text-gray-600">Total This Month</div>
          <div className="text-2xl font-semibold text-gray-900">₹{totals.monthSum.toLocaleString("en-IN")}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="text-sm text-gray-600">Total This Year</div>
          <div className="text-2xl font-semibold text-gray-900">₹{totals.yearSum.toLocaleString("en-IN")}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-600">Category</span>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
          {CATS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Expense
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Added By</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={4} cols={6} />
              ) : filtered.length === 0 ? (
                <EmptyStateRow colSpan={6} />
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.title}</td>
                    <td className="px-4 py-3">{r.category}</td>
                    <td className="px-4 py-3">{r.amount}</td>
                    <td className="px-4 py-3">{r.date}</td>
                    <td className="px-4 py-3">{r.by}</td>
                    <td className="px-4 py-3 text-gray-600">{r.notes}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Expense" size="sm">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("title")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            >
              {CATS.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Amount</label>
            <input value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("amount")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("date")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border rounded-md">
              Cancel
            </button>
            <button type="button" onClick={save} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
