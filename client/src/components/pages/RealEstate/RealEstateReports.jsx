import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const summary = [
  { label: "Gross bookings (QTD)", value: "₹4.2 Cr" },
  { label: "Avg. days on market", value: "38" },
  { label: "Conversion (visit→offer)", value: "22%" },
];

const rows = [
  { id: "1", name: "Pipeline by region", period: "Mar 2026", format: "CSV / PDF", owner: "Finance" },
  { id: "2", name: "Inventory aging", period: "Rolling 90d", format: "XLSX", owner: "Ops" },
];

export default function RealEstateReports() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Real Estate Reports</h2>
      <p className="text-sm text-gray-600">Operational metrics for listings and projects (mock data).</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="text-xl font-semibold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-800">Scheduled &amp; exportable reports</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Report</th>
                <th className="px-4 py-3">Period</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3 text-right">Run</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={2} cols={5} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={5} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                    <td className="px-4 py-3">{r.period}</td>
                    <td className="px-4 py-3">{r.format}</td>
                    <td className="px-4 py-3">{r.owner}</td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="text-sm text-blue-600 hover:underline">
                        Export
                      </button>
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
