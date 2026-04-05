import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";

const initialTasks = [
  {
    id: "1",
    title: "Call Priya Nair",
    related: "Lead: Priya Nair",
    priority: "High",
    due: "2026-04-05",
    status: "Open",
    assignee: "You",
    done: false,
  },
  {
    id: "2",
    title: "Send contract draft",
    related: "Customer: Ananya Sharma",
    priority: "Med",
    due: "2026-04-01",
    status: "Open",
    assignee: "Neha",
    done: true,
  },
];

export default function TasksPage() {
  const [rows, setRows] = useState(initialTasks);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    related: "",
    priority: "Med",
    due: "",
    assignee: "",
    status: "Open",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const filtered = useMemo(() => {
    if (filter === "All") return rows;
    if (filter === "My Tasks") return rows.filter((r) => r.assignee === "You");
    if (filter === "Due Today") return rows.filter((r) => r.due === today && !r.done);
    if (filter === "Overdue") return rows.filter((r) => r.due < today && !r.done);
    return rows;
  }, [rows, filter, today]);

  const toggleDone = (id) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, done: !r.done, status: !r.done ? "Done" : "Open" } : r)));
  };

  const save = () => {
    const e = {};
    if (!form.title.trim()) e.title = true;
    if (!form.related.trim()) e.related = true;
    if (!form.due) e.due = true;
    if (!form.assignee.trim()) e.assignee = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    setRows((prev) => [
      {
        id: String(Date.now()),
        ...form,
        done: false,
      },
      ...prev,
    ]);
    setOpen(false);
    setForm({ title: "", related: "", priority: "Med", due: "", assignee: "", status: "Open" });
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>

      <div className="flex flex-wrap gap-2">
        {["All", "My Tasks", "Due Today", "Overdue"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-sm rounded-lg ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {f}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Task
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-2 py-3 w-10" />
                <th className="px-4 py-3">Task Title</th>
                <th className="px-4 py-3">Related To</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={4} cols={7} />
              ) : filtered.length === 0 ? (
                <EmptyStateRow colSpan={7} />
              ) : (
                filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-2 py-3">
                      <input type="checkbox" checked={r.done} onChange={() => toggleDone(r.id)} aria-label="Done" />
                    </td>
                    <td className={`px-4 py-3 font-medium ${r.done ? "line-through text-gray-400" : "text-gray-900"}`}>{r.title}</td>
                    <td className="px-4 py-3 text-gray-700">{r.related}</td>
                    <td className="px-4 py-3">{r.priority}</td>
                    <td className="px-4 py-3">{r.due}</td>
                    <td className="px-4 py-3">{r.status}</td>
                    <td className="px-4 py-3">{r.assignee}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Task" size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("title")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Related entity (Lead/Customer)</label>
            <input value={form.related} onChange={(e) => setForm((f) => ({ ...f, related: e.target.value }))} placeholder="Lead: Name" className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("related")}`} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
              <select value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
                <option value="High">High</option>
                <option value="Med">Med</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Due date</label>
              <input type="date" value={form.due} onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("due")}`} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Assignee</label>
            <input value={form.assignee} onChange={(e) => setForm((f) => ({ ...f, assignee: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("assignee")}`} />
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
