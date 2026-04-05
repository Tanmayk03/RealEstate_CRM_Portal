import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";

const customers = [
  { id: "1", name: "Ananya Sharma" },
  { id: "2", name: "Vikram Singh" },
];

const initialTickets = [
  {
    id: "TK-9001",
    subject: "Invoice mismatch",
    customer: "Ananya Sharma",
    priority: "High",
    status: "Open",
    createdAt: "2026-04-02 10:20",
    messages: [
      { from: "Customer", text: "Amount on invoice #1002 looks wrong.", at: "2026-04-02 10:21" },
      { from: "Agent", text: "Thanks — checking with finance.", at: "2026-04-02 11:05" },
    ],
  },
  {
    id: "TK-9002",
    subject: "Site visit reschedule",
    customer: "Vikram Singh",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-03-30 09:00",
    messages: [{ from: "Customer", text: "Need to move visit to Friday.", at: "2026-03-30 09:01" }],
  },
];

function priBadge(p) {
  if (p === "High") return "bg-red-100 text-red-800";
  if (p === "Medium") return "bg-yellow-100 text-yellow-800";
  return "bg-blue-100 text-blue-800";
}

export default function SupportPage() {
  const [rows, setRows] = useState(initialTickets);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ customerId: "", subject: "", priority: "Medium", description: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const sendReply = () => {
    if (!reply.trim() || !selected) return;
    setRows((prev) =>
      prev.map((row) =>
        row.id === selected.id
          ? {
              ...row,
              messages: [...row.messages, { from: "Agent", text: reply, at: new Date().toISOString().slice(0, 16).replace("T", " ") }],
              status: row.status === "Open" ? "In Progress" : row.status,
            }
          : row
      )
    );
    setSelected((s) =>
      s
        ? {
            ...s,
            messages: [...s.messages, { from: "Agent", text: reply, at: new Date().toISOString().slice(0, 16).replace("T", " ") }],
            status: s.status === "Open" ? "In Progress" : s.status,
          }
        : null
    );
    setReply("");
  };

  const saveTicket = () => {
    const e = {};
    if (!form.customerId) e.customerId = true;
    if (!form.subject.trim()) e.subject = true;
    if (!form.description.trim()) e.description = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    const name = customers.find((c) => c.id === form.customerId)?.name;
    const id = `TK-${9100 + rows.length}`;
    const ticket = {
      id,
      subject: form.subject,
      customer: name,
      priority: form.priority,
      status: "Open",
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
      messages: [{ from: "Customer", text: form.description, at: new Date().toISOString().slice(0, 16).replace("T", " ") }],
    };
    setRows((prev) => [ticket, ...prev]);
    setOpen(false);
    setForm({ customerId: "", subject: "", priority: "Medium", description: "" });
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  const current = selected ? rows.find((r) => r.id === selected.id) || selected : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Support</h1>
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setErrors({});
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
                <tr>
                  <th className="px-4 py-3">Ticket #</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <TableSkeleton rows={4} cols={6} />
                ) : rows.length === 0 ? (
                  <EmptyStateRow colSpan={6} />
                ) : (
                  rows.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setSelected(r)}
                      className={`cursor-pointer hover:bg-gray-50 ${current?.id === r.id ? "bg-blue-50" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">{r.id}</td>
                      <td className="px-4 py-3">{r.subject}</td>
                      <td className="px-4 py-3">{r.customer}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${priBadge(r.priority)}`}>{r.priority}</span>
                      </td>
                      <td className="px-4 py-3">{r.status}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 min-h-[320px] flex flex-col">
          {!current ? (
            <p className="text-sm text-gray-500">Select a ticket to view the thread.</p>
          ) : (
            <>
              <div className="border-b border-gray-200 pb-3 mb-3">
                <div className="text-sm font-semibold text-gray-900">{current.subject}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {current.id} · {current.customer}
                </div>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[280px] pr-1">
                {current.messages.map((m, i) => (
                  <div key={i} className="text-sm">
                    <div className="text-xs text-gray-500 mb-0.5">
                      {m.from} · {m.at}
                    </div>
                    <div className="text-gray-800 bg-gray-50 rounded-lg px-3 py-2">{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Reply as agent..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg"
                />
                <button type="button" onClick={sendReply} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="New Ticket" size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Customer</label>
            <select value={form.customerId} onChange={(e) => setForm((f) => ({ ...f, customerId: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("customerId")}`}>
              <option value="">Select</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
            <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("subject")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
            <select value={form.priority} onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("description")}`} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border rounded-md">
              Cancel
            </button>
            <button type="button" onClick={saveTicket} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
              Create
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
