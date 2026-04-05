import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const rows = [
  { id: "1", title: "Invite your team", views: 420, helpful: "94%", updated: "2026-03-15" },
  { id: "2", title: "Closing deals", views: 310, helpful: "88%", updated: "2026-03-01" },
];

export default function ReportKbArticles() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Knowledge Base Articles</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Article</th>
                <th className="px-4 py-3">Views (30d)</th>
                <th className="px-4 py-3">Helpful</th>
                <th className="px-4 py-3">Updated</th>
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
                    <td className="px-4 py-3 font-medium">{r.title}</td>
                    <td className="px-4 py-3">{r.views}</td>
                    <td className="px-4 py-3">{r.helpful}</td>
                    <td className="px-4 py-3">{r.updated}</td>
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
