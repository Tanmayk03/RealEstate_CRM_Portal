import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const rows = [
  { id: "1", month: "2026-03", income: "₹42 L", expenses: "₹18 L", net: "₹24 L" },
  { id: "2", month: "2026-02", income: "₹38 L", expenses: "₹17 L", net: "₹21 L" },
];

export default function ReportExpensesVsIncome() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Expenses vs Income</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Income</th>
                <th className="px-4 py-3">Expenses</th>
                <th className="px-4 py-3">Net</th>
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
                    <td className="px-4 py-3 font-medium">{r.month}</td>
                    <td className="px-4 py-3 text-green-700">{r.income}</td>
                    <td className="px-4 py-3 text-red-700">{r.expenses}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.net}</td>
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
