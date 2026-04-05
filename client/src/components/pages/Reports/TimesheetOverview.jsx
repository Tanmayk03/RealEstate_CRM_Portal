import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const rows = [
  { id: "1", user: "Neha R.", week: "2026-W14", hours: "38.5", billable: "32.0" },
  { id: "2", user: "Amit K.", week: "2026-W14", hours: "40.0", billable: "36.5" },
];

export default function ReportTimesheetOverview() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Timesheet Overview</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Week</th>
                <th className="px-4 py-3">Total hours</th>
                <th className="px-4 py-3">Billable</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={3} cols={4} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={4} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{r.user}</td>
                    <td className="px-4 py-3">{r.week}</td>
                    <td className="px-4 py-3">{r.hours}</td>
                    <td className="px-4 py-3">{r.billable}</td>
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
