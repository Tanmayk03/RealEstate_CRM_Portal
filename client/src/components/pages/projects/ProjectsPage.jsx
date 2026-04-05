import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import ProjectsKanban from "./ProjectsKanban";
import { initialBoard } from "./boardState";

export default function ProjectsPage() {
  const [columns, setColumns] = useState(initialBoard);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    assignee: "",
    due: "",
    priority: "Med",
  });
  const [errors, setErrors] = useState({});

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    setColumns((prev) => {
      const next = { ...prev };
      const srcCol = source.droppableId;
      const destCol = destination.droppableId;
      const srcList = [...next[srcCol]];
      const [moved] = srcList.splice(source.index, 1);
      next[srcCol] = srcList;
      const destList = [...next[destCol]];
      destList.splice(destination.index, 0, moved);
      next[destCol] = destList;
      return next;
    });
  };

  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.assignee.trim()) e.assignee = true;
    if (!form.due) e.due = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    const card = {
      id: `p-${Date.now()}`,
      name: form.name,
      assignee: form.assignee,
      due: form.due,
      priority: form.priority,
      description: form.description,
    };
    setColumns((prev) => ({
      ...prev,
      planning: [card, ...prev.planning],
    }));
    setOpen(false);
    setForm({ name: "", description: "", assignee: "", due: "", priority: "Med" });
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      <ProjectsKanban columns={columns} onDragEnd={onDragEnd} />

      <Modal open={open} onClose={() => setOpen(false)} title="Add Project" size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("name")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Assignee</label>
            <input value={form.assignee} onChange={(e) => setForm((f) => ({ ...f, assignee: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("assignee")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Due date</label>
            <input type="date" value={form.due} onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("due")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
            <select value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="High">High</option>
              <option value="Med">Med</option>
              <option value="Low">Low</option>
            </select>
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
