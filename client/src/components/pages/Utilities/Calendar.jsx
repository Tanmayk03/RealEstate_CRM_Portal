import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", title: "Site visit — Skyline Villa", date: "2026-04-06", time: "11:00", with: "Priya Nair" },
  { id: "2", title: "Team standup", date: "2026-04-07", time: "09:30", with: "Internal" },
];

export default function Calendar() {
  const loading = useDelayedLoading();
  const [events, setEvents] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", time: "", with: "" });
  const [errors, setErrors] = useState({});

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  const save = () => {
    const e = {};
    if (!form.title.trim()) e.title = true;
    if (!form.date) e.date = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    setEvents((p) => [...p, { ...form, id: String(Date.now()), time: form.time || "—", with: form.with || "—" }]);
    setOpen(false);
    setForm({ title: "", date: "", time: "", with: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="text-sm font-medium text-gray-800 mb-3">Upcoming</div>
        {loading ? (
          <div className="space-y-2 animate-pulse">
            <div className="h-10 bg-gray-100 rounded" />
            <div className="h-10 bg-gray-100 rounded" />
          </div>
        ) : events.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center">No events scheduled.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {events
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((ev) => (
                <li key={ev.id} className="py-3 flex flex-wrap gap-2 justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{ev.title}</div>
                    <div className="text-xs text-gray-500">
                      {ev.date} · {ev.time} · {ev.with}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New Event" size="sm">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("title")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("date")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
            <input type="time" value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">With</label>
            <input value={form.with} onChange={(e) => setForm((f) => ({ ...f, with: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
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
