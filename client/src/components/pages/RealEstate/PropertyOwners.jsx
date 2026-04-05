import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", name: "K. Mehta", phone: "+91 98100 11223", city: "Mumbai", properties: 4 },
  { id: "2", name: "S. Reddy", phone: "+91 97000 33445", city: "Hyderabad", properties: 2 },
];

export default function PropertyOwners() {
  const loading = useDelayedLoading();
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", city: "", properties: "" });
  const [errors, setErrors] = useState({});

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.city.trim()) e.city = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    const props = Number.parseInt(form.properties, 10) || 0;
    if (edit) setRows((p) => p.map((r) => (r.id === edit.id ? { ...form, id: edit.id, properties: props } : r)));
    else setRows((p) => [...p, { ...form, id: String(Date.now()), properties: props }]);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Property Owners</h2>
        <button
          type="button"
          onClick={() => {
            setEdit(null);
            setForm({ name: "", phone: "", city: "", properties: "" });
            setErrors({});
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Owner
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Properties</th>
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
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3">{r.phone}</td>
                    <td className="px-4 py-3">{r.city}</td>
                    <td className="px-4 py-3">{r.properties}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setEdit(r);
                          setForm({ ...r, properties: String(r.properties) });
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

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Edit Owner" : "Add Owner"} size="lg">
        <div className="space-y-3">
          {["name", "phone", "city"].map((k) => (
            <div key={k}>
              <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{k}</label>
              <input value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe(k)}`} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Properties count</label>
            <input value={form.properties} onChange={(e) => setForm((f) => ({ ...f, properties: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
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
