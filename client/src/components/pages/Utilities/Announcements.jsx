import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", title: "Holiday hours — April", audience: "All", posted: "2026-04-01", active: true, body: "Offices closed on public holidays." },
  { id: "2", title: "CRM maintenance window", audience: "Agents", posted: "2026-03-28", active: false, body: "Brief downtime Sunday 2–4am." },
];

export default function Announcements() {
  const loading = useDelayedLoading();
  const [rows, setRows] = useState(initial);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title: "", audience: "All", body: "" });
  const [errors, setErrors] = useState({});

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  const save = () => {
    const e = {};
    if (!form.title.trim()) e.title = true;
    if (!form.body.trim()) e.body = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    if (edit) setRows((p) => p.map((r) => (r.id === edit.id ? { ...r, ...form, posted: r.posted } : r)));
    else setRows((p) => [...p, { ...form, id: String(Date.now()), posted: new Date().toISOString().slice(0, 10), active: true }]);
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
        <button
          type="button"
          onClick={() => {
            setEdit(null);
            setForm({ title: "", audience: "All", body: "" });
            setErrors({});
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> New
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Audience</th>
                <th className="px-4 py-3">Posted</th>
                <th className="px-4 py-3">Active</th>
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
                    <td className="px-4 py-3 font-medium">{r.title}</td>
                    <td className="px-4 py-3">{r.audience}</td>
                    <td className="px-4 py-3">{r.posted}</td>
                    <td className="px-4 py-3">{r.active ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setEdit(r);
                          setForm({ title: r.title, audience: r.audience, body: r.body || "" });
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

      <Modal open={open} onClose={() => setOpen(false)} title={edit ? "Edit announcement" : "New announcement"} size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("title")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Audience</label>
            <select value={form.audience} onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="All">All</option>
              <option value="Agents">Agents</option>
              <option value="Admins">Admins</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Body</label>
            <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} rows={4} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("body")}`} />
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
