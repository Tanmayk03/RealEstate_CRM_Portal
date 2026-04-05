import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const rows = [
  { id: "1", user: "admin@example.com", action: "Updated", entity: "Customer #1042", at: "2026-04-03 14:22" },
  { id: "2", user: "riya@example.com", action: "Created", entity: "Lead — Vikram Singh", at: "2026-04-03 11:05" },
  { id: "3", user: "system", action: "Export", entity: "Invoices batch", at: "2026-04-02 09:40" },
];

export default function ActivityLog() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Activity Log</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={4} cols={4} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={4} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{r.user}</td>
                    <td className="px-4 py-3">{r.action}</td>
                    <td className="px-4 py-3">{r.entity}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.at}</td>
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
