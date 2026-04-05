import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { initialProperties, PROPERTY_TYPES, PROPERTY_STATUSES } from "./propertyMock";

const emptyForm = {
  title: "",
  location: "",
  price: "",
  type: "Apartment",
  bedrooms: "",
  areaSqft: "",
  status: "Available",
  description: "",
};

export default function PropertiesPage() {
  const [rows, setRows] = useState(initialProperties);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const okT = typeFilter === "All" || r.type === typeFilter;
      const okS = statusFilter === "All" || r.status === statusFilter;
      return okT && okS;
    });
  }, [rows, typeFilter, statusFilter]);

  const save = () => {
    const e = {};
    if (!form.title.trim()) e.title = true;
    if (!form.location.trim()) e.location = true;
    if (!form.price.trim()) e.price = true;
    if (!form.bedrooms.trim()) e.bedrooms = true;
    if (!form.areaSqft.trim()) e.areaSqft = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    setRows((prev) => [...prev, { ...form, id: String(Date.now()) }]);
    setOpen(false);
    setForm(emptyForm);
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        <button
          type="button"
          onClick={() => {
            setForm(emptyForm);
            setErrors({});
            setOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus size={18} /> Add Property
        </button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm text-gray-600">Type</span>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5"
        >
          <option value="All">All</option>
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600">Status</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5"
        >
          <option value="All">All</option>
          {PROPERTY_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-sm text-gray-500">No properties match filters.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs text-gray-500">Image</div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{p.location}</p>
                <p className="text-sm font-medium text-gray-900 mb-3">{p.price}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800">{p.type}</span>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      p.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : p.status === "Sold"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Add Property" size="lg">
        <div className="space-y-3">
          {["title", "location", "price"].map((k) => (
            <div key={k}>
              <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">{k}</label>
              <input
                value={form[k]}
                onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                className={`w-full px-3 py-2 text-sm border rounded-lg ${fe(k)}`}
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              >
                {PROPERTY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {["bedrooms", "areaSqft"].map((k) => (
            <div key={k}>
              <label className="block text-xs font-medium text-gray-700 mb-1">{k === "areaSqft" ? "Area (sqft)" : "Bedrooms"}</label>
              <input
                value={form[k]}
                onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                className={`w-full px-3 py-2 text-sm border rounded-lg ${fe(k)}`}
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border rounded-md">
              Cancel
            </button>
            <button type="button" onClick={save} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
