import Modal from "../../shared/Modal";
import { SOURCES, STATUSES } from "./leadMock";

export default function LeadFormModal({ open, onClose, editing, form, setForm, errors, onSave }) {
  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");
  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit Lead" : "Add Lead"} size="lg">
      <div className="space-y-3">
        {["name", "phone", "email"].map((k) => (
          <div key={k}>
            <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{k}</label>
            <input
              value={form[k]}
              onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fe(k)}`}
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Source</label>
          <select
            value={form.source}
            onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        {["budget", "propertyType"].map((k) => (
          <div key={k}>
            <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{k.replace(/([A-Z])/g, " $1")}</label>
            <input
              value={form[k]}
              onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${fe(k)}`}
            />
          </div>
        ))}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-md">
            Cancel
          </button>
          <button type="button" onClick={onSave} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
