import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { mockCustomersPick } from "./salesMock";

const initialInvoices = [
  { id: "INV-1001", customer: "Ananya Sharma", amount: "₹45,000", dueDate: "2026-04-10", status: "Paid" },
  { id: "INV-1002", customer: "Vikram Singh", amount: "₹1,20,000", dueDate: "2026-03-01", status: "Overdue" },
  { id: "INV-1003", customer: "Priya Nair", amount: "₹18,500", dueDate: "2026-04-20", status: "Unpaid" },
];

function statusBadge(status) {
  if (status === "Paid") return "bg-green-100 text-green-800";
  if (status === "Unpaid") return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

export default function InvoicesPage() {
  const [rows, setRows] = useState(initialInvoices);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([{ label: "", qty: "1", price: "" }]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const addRow = () => setItems((prev) => [...prev, { label: "", qty: "1", price: "" }]);

  const save = () => {
    const e = {};
    if (!customerId) e.customer = true;
    if (!dueDate) e.due = true;
    items.forEach((it, i) => {
      if (!it.label.trim() || !it.price.trim()) e[`it${i}`] = true;
    });
    setErrors(e);
    if (Object.keys(e).length) return;
    const cust = mockCustomersPick.find((c) => c.id === customerId)?.name || "Customer";
    const total = items.reduce((acc, it) => acc + (parseFloat(it.price) || 0) * (parseInt(it.qty, 10) || 1), 0);
    setRows((prev) => [
      {
        id: `INV-${1000 + prev.length + 1}`,
        customer: cust,
        amount: `₹${total.toLocaleString("en-IN")}`,
        dueDate,
        status: "Unpaid",
      },
      ...prev,
    ]);
    setOpen(false);
    setCustomerId("");
    setDueDate("");
    setItems([{ label: "", qty: "1", price: "" }]);
    setErrors({});
  };

  const invalid = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Invoice #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={4} cols={5} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={5} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.id}</td>
                    <td className="px-4 py-3">{r.customer}</td>
                    <td className="px-4 py-3">{r.amount}</td>
                    <td className="px-4 py-3">{r.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusBadge(r.status)}`}>{r.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create Invoice" size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${invalid("customer")}`}
            >
              <option value="">Select customer</option>
              {mockCustomersPick.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-3 py-2 text-sm border rounded-lg ${invalid("due")}`}
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">Items</span>
              <button type="button" onClick={addRow} className="text-xs text-blue-600 hover:underline">
                Add line
              </button>
            </div>
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-2">
                  <input
                    placeholder="Description"
                    value={it.label}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...it, label: e.target.value };
                      setItems(next);
                    }}
                    className={`col-span-6 px-2 py-1.5 text-sm border rounded ${errors[`it${i}`] ? "border-red-500" : "border-gray-300"}`}
                  />
                  <input
                    placeholder="Qty"
                    value={it.qty}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...it, qty: e.target.value };
                      setItems(next);
                    }}
                    className="col-span-2 px-2 py-1.5 text-sm border border-gray-300 rounded"
                  />
                  <input
                    placeholder="Price"
                    value={it.price}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...it, price: e.target.value };
                      setItems(next);
                    }}
                    className={`col-span-4 px-2 py-1.5 text-sm border rounded ${errors[`it${i}`] ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
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
