import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const summary = [
  { label: "Revenue (MTD)", value: "₹18.4 L" },
  { label: "Deals closed", value: "7" },
  { label: "Avg. deal size", value: "₹2.6 L" },
];

const rows = [
  { id: "1", rep: "Amit K.", region: "West", amount: "₹4.1 L", deals: 2 },
  { id: "2", rep: "Neha R.", region: "South", amount: "₹3.8 L", deals: 2 },
];

export default function ReportSales() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Sales report</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className="text-xl font-semibold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Rep</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Deals</th>
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
                    <td className="px-4 py-3 font-medium">{r.rep}</td>
                    <td className="px-4 py-3">{r.region}</td>
                    <td className="px-4 py-3">{r.amount}</td>
                    <td className="px-4 py-3">{r.deals}</td>
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
