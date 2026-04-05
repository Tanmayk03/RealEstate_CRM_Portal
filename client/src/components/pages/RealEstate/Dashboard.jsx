import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const stats = [
  { label: "Active Listings", value: "24", color: "text-blue-600" },
  { label: "Pending Approvals", value: "3", color: "text-amber-600" },
  { label: "New Inquiries (7d)", value: "18", color: "text-green-600" },
  { label: "Occupancy Rate", value: "86%", color: "text-gray-900" },
];

const rows = [
  { id: "1", title: "Green Valley Phase 2", type: "Project", units: "120", trend: "+4 this week" },
  { id: "2", title: "Metro Heights", type: "Building", units: "48", trend: "Stable" },
];

export default function Dashboard() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Real Estate Dashboard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className={`text-2xl font-semibold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-800">Portfolio snapshot</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Units</th>
                <th className="px-4 py-3">Activity</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={2} cols={4} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={4} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.title}</td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3">{r.units}</td>
                    <td className="px-4 py-3 text-gray-600">{r.trend}</td>
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
