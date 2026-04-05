import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", name: "Neha R.", role: "Coordinator", email: "neha@example.com", status: "Active" },
  { id: "2", name: "Arjun P.", role: "Field Agent", email: "arjun@example.com", status: "Active" },
];

export default function Mystaffs() {
  const loading = useDelayedLoading();
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name: "", role: "Coordinator", email: "", status: "Active" });
  const [errors, setErrors] = useState({});

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim()) e.email = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    if (edit) setRows((p) => p.map((r) => (r.id === edit.id ? { ...form, id: edit.id } : r)));
    else setRows((p) => [...p, { ...form, id: String(Date.now()) }]);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">My Staffs</h2>
        <button
          type="button"
          onClick={() => {
            setEdit(null);
            setForm({ name: "", role: "Coordinator", email: "", status: "Active" });
            setErrors({});
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
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
                    <td className="px-4 py-3">{r.role}</td>
                    <td className="px-4 py-3">{r.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">{r.status}</span>
                    </td>
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

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Edit Staff" : "Add Staff"} size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("name")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="Coordinator">Coordinator</option>
              <option value="Field Agent">Field Agent</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("email")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
