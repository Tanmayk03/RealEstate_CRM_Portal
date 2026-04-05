import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const rows = [
  { id: "1", name: "P. Joshi", property: "Metro Heights — 402", leaseEnd: "2027-03-31", rent: "₹42,000/mo", status: "Active" },
  { id: "2", name: "A. Khan", property: "Green Valley — B12", leaseEnd: "2026-11-15", rent: "₹65,000/mo", status: "Active" },
];

export default function Tenants() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Tenants</h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Lease End</th>
                <th className="px-4 py-3">Rent</th>
                <th className="px-4 py-3">Status</th>
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
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3">{r.property}</td>
                    <td className="px-4 py-3">{r.leaseEnd}</td>
                    <td className="px-4 py-3">{r.rent}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">{r.status}</span>
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
