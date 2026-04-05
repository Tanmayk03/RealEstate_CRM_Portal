import { useEffect, useMemo, useState } from "react";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { mockDeals } from "./salesMock";

export default function SalesOverview() {
  const [rows] = useState(mockDeals);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const summary = useMemo(() => {
    const total = rows.length;
    const won = rows.filter((r) => r.stage === "Won").length;
    const lost = rows.filter((r) => r.stage === "Lost").length;
    const pipeDeals = rows.filter((r) => r.stage === "Pipeline");
    const pipe = pipeDeals.length ? pipeDeals.map((d) => d.amount).join(" · ") : "—";
    return { total, won, lost, pipe };
  }, [rows]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Sales overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Deals", value: summary.total, color: "text-gray-900" },
          { label: "Won", value: summary.won, color: "text-green-600" },
          { label: "Lost", value: summary.lost, color: "text-red-600" },
          { label: "Pipeline Value", value: summary.pipe, color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <div className={`text-xl font-semibold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Deal Name</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Closing Date</th>
                <th className="px-4 py-3">Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={3} cols={6} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={6} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                    <td className="px-4 py-3">{r.customer}</td>
                    <td className="px-4 py-3">{r.amount}</td>
                    <td className="px-4 py-3">{r.stage}</td>
                    <td className="px-4 py-3">{r.closingDate}</td>
                    <td className="px-4 py-3">{r.agent}</td>
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
