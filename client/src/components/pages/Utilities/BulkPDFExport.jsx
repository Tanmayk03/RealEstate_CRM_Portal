import { useState } from "react";
import { Download } from "lucide-react";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", batch: "Contracts — Q1", count: 42, created: "2026-04-02", status: "Ready" },
  { id: "2", batch: "Invoices — March", count: 118, created: "2026-04-01", status: "Processing" },
];

export default function BulkPDFExport() {
  const loading = useDelayedLoading();
  const [rows] = useState(initial);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Bulk PDF Export</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Batch</th>
                <th className="px-4 py-3">Documents</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableSkeleton rows={3} cols={5} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={5} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{r.batch}</td>
                    <td className="px-4 py-3">{r.count}</td>
                    <td className="px-4 py-3">{r.created}</td>
                    <td className="px-4 py-3">{r.status}</td>
                    <td className="px-4 py-3 text-right">
                      <button type="button" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded inline-flex" disabled={r.status !== "Ready"} aria-label="Download">
                        <Download size={18} />
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
