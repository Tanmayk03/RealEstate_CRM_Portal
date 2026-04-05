import { useState } from "react";
import { Check, X } from "lucide-react";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", request: "Price change — Villa 12", type: "Listing", by: "Neha R.", date: "2026-04-02", status: "Pending" },
  { id: "2", request: "New broker commission", type: "Finance", by: "Admin", date: "2026-04-01", status: "Approved" },
];

export default function Approvals() {
  const loading = useDelayedLoading();
  const [rows, setRows] = useState(initial);

  const setStatus = (id, status) => {
    setRows((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Approvals</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Request</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Submitted By</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={3} cols={6} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={6} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.request}</td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3">{r.by}</td>
                    <td className="px-4 py-3">{r.date}</td>
                    <td className="px-4 py-3">{r.status}</td>
                    <td className="px-4 py-3 text-right">
                      {r.status === "Pending" && (
                        <span className="inline-flex gap-1">
                          <button type="button" onClick={() => setStatus(r.id, "Approved")} className="p-1.5 rounded-md text-green-700 hover:bg-green-50" aria-label="Approve">
                            <Check size={18} />
                          </button>
                          <button type="button" onClick={() => setStatus(r.id, "Rejected")} className="p-1.5 rounded-md text-red-700 hover:bg-red-50" aria-label="Reject">
                            <X size={18} />
                          </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
