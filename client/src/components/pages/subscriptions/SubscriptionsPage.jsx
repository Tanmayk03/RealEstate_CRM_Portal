import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";

const customers = [
  { id: "1", name: "Ananya Sharma" },
  { id: "2", name: "Vikram Singh" },
];

const initialRows = [
  {
    id: "1",
    customer: "Ananya Sharma",
    plan: "Pro",
    amount: "₹4,999",
    start: "2026-01-01",
    renewal: "2027-01-01",
    status: "Active",
  },
];

function badge(status) {
  if (status === "Active") return "bg-green-100 text-green-800";
  if (status === "Expired") return "bg-red-100 text-red-800";
  return "bg-gray-200 text-gray-700";
}

export default function SubscriptionsPage() {
  const [rows, setRows] = useState(initialRows);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ customerId: "", plan: "Basic", amount: "", start: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const save = () => {
    const e = {};
    if (!form.customerId) e.customerId = true;
    if (!form.amount.trim()) e.amount = true;
    if (!form.start) e.start = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    const name = customers.find((c) => c.id === form.customerId)?.name || "Customer";
    const renewal = new Date(form.start);
    renewal.setFullYear(renewal.getFullYear() + 1);
    setRows((prev) => [
      {
        id: String(Date.now()),
        customer: name,
        plan: form.plan,
        amount: `₹${form.amount}`,
        start: form.start,
        renewal: renewal.toISOString().slice(0, 10),
        status: "Active",
      },
      ...prev,
    ]);
    setOpen(false);
    setForm({ customerId: "", plan: "Basic", amount: "", start: "" });
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Subscriptions</h1>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Subscription
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Amount/month</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">Renewal Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={3} cols={6} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={6} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.customer}</td>
                    <td className="px-4 py-3">{r.plan}</td>
                    <td className="px-4 py-3">{r.amount}</td>
                    <td className="px-4 py-3">{r.start}</td>
                    <td className="px-4 py-3">{r.renewal}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${badge(r.status)}`}>{r.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Subscription" size="sm">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
            <select
              value={form.customerId}
              onChange={(e) => setForm((f) => ({ ...f, customerId: e.target.value }))}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("customerId")}`}
            >
              <option value="">Select</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Plan</label>
            <select
              value={form.plan}
              onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            >
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Amount / month</label>
            <input
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("amount")}`}
              placeholder="4999"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Start date</label>
            <input
              type="date"
              value={form.start}
              onChange={(e) => setForm((f) => ({ ...f, start: e.target.value }))}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("start")}`}
            />
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
