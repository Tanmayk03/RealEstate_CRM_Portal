import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const rows = [
  { id: "1", ticket: "TK-9001", stage: "L2 Support", from: "Open", to: "In Progress", at: "2026-04-02 10:25" },
  { id: "2", ticket: "TK-8998", stage: "Resolved", from: "In Progress", to: "Resolved", at: "2026-04-01 16:02" },
];

export default function TicketPipeLog() {
  const loading = useDelayedLoading();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Ticket Pipe Log</h2>
      <p className="text-sm text-gray-600">Pipeline transitions for support tickets (mock).</p>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3">At</th>
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
                    <td className="px-4 py-3 font-medium">{r.ticket}</td>
                    <td className="px-4 py-3">{r.stage}</td>
                    <td className="px-4 py-3">{r.from}</td>
                    <td className="px-4 py-3">{r.to}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{r.at}</td>
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
