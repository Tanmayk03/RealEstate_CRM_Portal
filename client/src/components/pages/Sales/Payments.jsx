import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "PAY-7001", customer: "Ananya Sharma", amount: "₹45,000", method: "UPI", date: "2026-04-02", status: "Completed" },
  { id: "PAY-7002", customer: "Vikram Singh", amount: "₹1,20,000", method: "NEFT", date: "2026-03-30", status: "Pending" },
];

export default function Payments() {
  const loading = useDelayedLoading();
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ customer: "", amount: "", method: "UPI", date: "", status: "Completed" });
  const [errors, setErrors] = useState({});

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  const save = () => {
    const e = {};
    if (!form.customer.trim()) e.customer = true;
    if (!form.amount.trim()) e.amount = true;
    if (!form.date) e.date = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    if (edit) setRows((p) => p.map((r) => (r.id === edit.id ? { ...form, id: edit.id } : r)));
    else setRows((p) => [{ ...form, id: `PAY-${8000 + p.length}` }, ...p]);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Payments</h2>
        <button
          type="button"
          onClick={() => {
            setEdit(null);
            setForm({ customer: "", amount: "", method: "UPI", date: "", status: "Completed" });
            setErrors({});
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Record Payment
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Payment #</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Method</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={3} cols={7} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={7} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{r.id}</td>
                    <td className="px-4 py-3">{r.customer}</td>
                    <td className="px-4 py-3">{r.amount}</td>
                    <td className="px-4 py-3">{r.method}</td>
                    <td className="px-4 py-3">{r.date}</td>
                    <td className="px-4 py-3">{r.status}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setEdit(r);
                          setForm({ ...r });
                          setErrors({});
                          setOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded inline-flex"
                      >
                        <Pencil size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Edit Payment" : "Record Payment"} size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
            <input value={form.customer} onChange={(e) => setForm((f) => ({ ...f, customer: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("customer")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Amount</label>
            <input value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("amount")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Method</label>
            <select value={form.method} onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="UPI">UPI</option>
              <option value="NEFT">NEFT</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("date")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
          <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border rounded-md">
            Cancel
          </button>
          <button type="button" onClick={save} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
