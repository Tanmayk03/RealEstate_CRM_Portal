import { useEffect, useState } from "react";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { initialReProjects } from "./propertyMock";

export default function RealEstateProjects() {
  const [rows] = useState(initialReProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const pct = (sold, total) => Math.round((sold / total) * 100);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Project Name</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Total Units</th>
                <th className="px-4 py-3">Sold Units</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Launch Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={3} cols={7} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={7} />
              ) : (
                rows.map((r) => {
                  const p = pct(r.soldUnits, r.totalUnits);
                  return (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                      <td className="px-4 py-3">{r.location}</td>
                      <td className="px-4 py-3">{r.totalUnits}</td>
                      <td className="px-4 py-3">{r.soldUnits}</td>
                      <td className="px-4 py-3 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p}%` }} />
                          </div>
                          <span className="text-xs text-gray-600">{p}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">{r.status}</td>
                      <td className="px-4 py-3">{r.launchDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
