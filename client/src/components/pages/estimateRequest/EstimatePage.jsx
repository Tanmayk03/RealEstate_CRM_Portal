import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import Modal from "../../shared/Modal";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";

const initialRows = [
  {
    id: "ER-2001",
    customer: "Priya Nair",
    propertyType: "Villa",
    budget: "₹1.2 Cr",
    requestedDate: "2026-04-01",
    status: "Pending",
    details: "Gated community, north facing, 4 BR.",
  },
  {
    id: "ER-2002",
    customer: "Rahul Verma",
    propertyType: "Apartment",
    budget: "₹80 L",
    requestedDate: "2026-03-20",
    status: "Reviewed",
    details: "City center, parking for 2 cars.",
  },
];

function statusBadge(s) {
  if (s === "Pending") return "bg-yellow-100 text-yellow-800";
  if (s === "Reviewed") return "bg-blue-100 text-blue-800";
  return "bg-green-100 text-green-800";
}

export default function EstimatePage() {
  const [rows, setRows] = useState(initialRows);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const convert = (id) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Converted" } : r)));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Estimate Request</h1>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Request #</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Property Type</th>
                <th className="px-4 py-3">Budget</th>
                <th className="px-4 py-3">Requested Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={3} cols={7} />
              ) : rows.length === 0 ? (
                <EmptyStateRow colSpan={7} />
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.id}</td>
                    <td className="px-4 py-3">{r.customer}</td>
                    <td className="px-4 py-3">{r.propertyType}</td>
                    <td className="px-4 py-3">{r.budget}</td>
                    <td className="px-4 py-3">{r.requestedDate}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusBadge(r.status)}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button type="button" onClick={() => setView(r)} className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 inline-flex items-center gap-1">
                        <Eye size={14} /> View
                      </button>
                      {r.status === "Pending" && (
                        <button type="button" onClick={() => convert(r.id)} className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
                          Convert to Lead
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!view} onClose={() => setView(null)} title={view ? `Request ${view.id}` : ""} size="lg">
        {view && (
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Customer:</span> {view.customer}
            </p>
            <p>
              <span className="font-medium text-gray-900">Property type:</span> {view.propertyType}
            </p>
            <p>
              <span className="font-medium text-gray-900">Budget:</span> {view.budget}
            </p>
            <p>
              <span className="font-medium text-gray-900">Requested:</span> {view.requestedDate}
            </p>
            <p>
              <span className="font-medium text-gray-900">Status:</span> {view.status}
            </p>
            <p className="pt-2">
              <span className="font-medium text-gray-900">Details</span>
            </p>
            <p className="bg-gray-50 rounded-lg p-3">{view.details}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
