import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", sku: "SRV-INTRO", name: "Interior consult", unitPrice: "₹25,000", tax: "18%" },
  { id: "2", sku: "LIST-PREM", name: "Premium listing", unitPrice: "₹15,000", tax: "18%" },
];

export default function Items() {
  const loading = useDelayedLoading();
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ sku: "", name: "", unitPrice: "", tax: "18%" });
  const [errors, setErrors] = useState({});

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  const save = () => {
    const e = {};
    if (!form.sku.trim()) e.sku = true;
    if (!form.name.trim()) e.name = true;
    if (!form.unitPrice.trim()) e.unitPrice = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    if (edit) setRows((p) => p.map((r) => (r.id === edit.id ? { ...form, id: edit.id } : r)));
    else setRows((p) => [{ ...form, id: String(Date.now()) }, ...p]);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Items</h2>
        <button
          type="button"
          onClick={() => {
            setEdit(null);
            setForm({ sku: "", name: "", unitPrice: "", tax: "18%" });
            setErrors({});
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Unit Price</th>
                <th className="px-4 py-3">Tax</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={3} cols={5} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={5} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{r.sku}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                    <td className="px-4 py-3">{r.unitPrice}</td>
                    <td className="px-4 py-3">{r.tax}</td>
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

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Edit Item" : "Add Item"} size="lg">
        <div className="space-y-3">
          {["sku", "name", "unitPrice"].map((k) => (
            <div key={k}>
              <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{k === "unitPrice" ? "Unit price" : k}</label>
              <input value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe(k)}`} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tax %</label>
            <select value={form.tax} onChange={(e) => setForm((f) => ({ ...f, tax: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="0%">0%</option>
              <option value="5%">5%</option>
              <option value="18%">18%</option>
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
