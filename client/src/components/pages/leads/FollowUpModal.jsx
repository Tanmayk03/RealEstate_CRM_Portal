import Modal from "../../shared/Modal";

export default function FollowUpModal({ open, onClose, fuForm, setFuForm, fuErr, onSave }) {
  return (
    <Modal open={open} onClose={onClose} title="Add Follow-up" size="sm">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={fuForm.date}
            onChange={(e) => setFuForm((f) => ({ ...f, date: e.target.value }))}
            className={`w-full px-3 py-2 text-sm border rounded-lg ${fuErr.date ? "border-red-500" : "border-gray-300"}`}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Note</label>
          <textarea
            value={fuForm.note}
            onChange={(e) => setFuForm((f) => ({ ...f, note: e.target.value }))}
            rows={2}
            className={`w-full px-3 py-2 text-sm border rounded-lg ${fuErr.note ? "border-red-500" : "border-gray-300"}`}
          />
        </div>
        <div className="flex justify-end gap-2">
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
