import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import ConfirmDialog from "../../shared/ConfirmDialog";
import { TableSkeleton, EmptyStateRow } from "../../shared/TableStates";
import { initialLeads, STATUSES } from "./leadMock";
import LeadFormModal from "./LeadFormModal";
import FollowUpModal from "./FollowUpModal";

const TABS = ["All", ...STATUSES];

const emptyLead = {
  name: "",
  phone: "",
  email: "",
  source: "Website",
  budget: "",
  propertyType: "",
  status: "New",
  notes: "",
  agent: "Amit K.",
};

export default function LeadsPage() {
  const [rows, setRows] = useState(initialLeads);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyLead);
  const [errors, setErrors] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [fuLeadId, setFuLeadId] = useState(null);
  const [fuForm, setFuForm] = useState({ date: "", note: "" });
  const [fuErr, setFuErr] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    if (tab === "All") return rows;
    return rows.filter((r) => r.status === tab);
  }, [rows, tab]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyLead);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...row, followUps: undefined });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.email.trim()) e.email = true;
    if (!form.budget.trim()) e.budget = true;
    if (!form.propertyType.trim()) e.propertyType = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    if (editing) {
      setRows((prev) =>
        prev.map((r) => (r.id === editing.id ? { ...r, ...form, followUps: r.followUps || [] } : r))
      );
    } else {
      setRows((prev) => [...prev, { ...form, id: String(Date.now()), followUps: [] }]);
    }
    setModalOpen(false);
  };

  const remove = () => {
    setRows((prev) => prev.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  };

  const saveFollowUp = () => {
    const e = {};
    if (!fuForm.date) e.date = true;
    if (!fuForm.note.trim()) e.note = true;
    setFuErr(e);
    if (Object.keys(e).length) return;
    setRows((prev) =>
      prev.map((r) =>
        r.id === fuLeadId ? { ...r, followUps: [...(r.followUps || []), { ...fuForm }] } : r
      )
    );
    setFuLeadId(null);
    setFuForm({ date: "", note: "" });
    setFuErr({});
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Leads</h1>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-sm rounded-lg ${
              tab === t ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Lead
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase">
              <tr>
                <th className="px-2 py-3 w-8" />
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Budget</th>
                <th className="px-4 py-3">Property Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned Agent</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <TableSkeleton rows={4} cols={9} />
              ) : filtered.length === 0 ? (
                <EmptyStateRow colSpan={9} />
              ) : (
                filtered.map((r) => (
                  <Fragment key={r.id}>
                    <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setExpanded((e) => (e === r.id ? null : r.id))}>
                      <td className="px-2 py-3">
                        <button
                          type="button"
                          className="p-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded((ex) => (ex === r.id ? null : r.id));
                          }}
                        >
                          {expanded === r.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{r.name}</td>
                      <td className="px-4 py-3">{r.phone}</td>
                      <td className="px-4 py-3">{r.source}</td>
                      <td className="px-4 py-3">{r.budget}</td>
                      <td className="px-4 py-3">{r.propertyType}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800">{r.status}</span>
                      </td>
                      <td className="px-4 py-3">{r.agent}</td>
                      <td className="px-4 py-3 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setFuLeadId(r.id)}
                          className="text-xs px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 mr-1"
                        >
                          Add Follow-up
                        </button>
                        <button type="button" onClick={() => openEdit(r)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded inline-flex">
                          <Pencil size={16} />
                        </button>
                        <button type="button" onClick={() => setDeleteId(r.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded inline-flex">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                    {expanded === r.id && (
                      <tr className="bg-gray-50">
                        <td colSpan={9} className="px-6 py-4 text-sm text-gray-700">
                          <p className="font-medium text-gray-900 mb-1">Notes</p>
                          <p className="mb-3">{r.notes || "—"}</p>
                          <p className="font-medium text-gray-900 mb-1">Follow-up history</p>
                          <ul className="list-disc pl-5 space-y-1">
                            {(r.followUps || []).length === 0 ? (
                              <li className="text-gray-500">No follow-ups yet.</li>
                            ) : (
                              r.followUps.map((f, i) => (
                                <li key={i}>
                                  <span className="text-gray-500">{f.date}</span> — {f.note}
                                </li>
                              ))
                            )}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editing={editing}
        form={form}
        setForm={setForm}
        errors={errors}
        onSave={save}
      />
      <FollowUpModal
        open={!!fuLeadId}
        onClose={() => setFuLeadId(null)}
        fuForm={fuForm}
        setFuForm={setFuForm}
        fuErr={fuErr}
        onSave={saveFollowUp}
      />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={remove} title="Delete lead?" message="Remove this lead from the pipeline." />
    </div>
  );
}
