import { useState } from "react";

export default function Settings() {
  const [listings, setListings] = useState({ autoPublish: true, requireApproval: true });
  const [units, setUnits] = useState({ defaultCurrency: "INR", areaUnit: "sqft" });
  const [saved, setSaved] = useState(null);

  const flash = (k) => {
    setSaved(k);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-900">Real Estate Settings</h2>

      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Listings</h3>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={listings.autoPublish} onChange={(e) => setListings((x) => ({ ...x, autoPublish: e.target.checked }))} />
          Auto-publish approved listings
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={listings.requireApproval} onChange={(e) => setListings((x) => ({ ...x, requireApproval: e.target.checked }))} />
          Require approval for price changes
        </label>
        <button type="button" onClick={() => flash("listings")} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
          Save
        </button>
        {saved === "listings" && <span className="text-xs text-green-600 ml-2">Saved</span>}
      </section>

      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Units &amp; display</h3>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Currency</label>
          <select value={units.defaultCurrency} onChange={(e) => setUnits((x) => ({ ...x, defaultCurrency: e.target.value }))} className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg">
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Area unit</label>
          <select value={units.areaUnit} onChange={(e) => setUnits((x) => ({ ...x, areaUnit: e.target.value }))} className="w-full max-w-xs px-3 py-2 text-sm border border-gray-300 rounded-lg">
            <option value="sqft">sq ft</option>
            <option value="sqm">sq m</option>
          </select>
        </div>
        <button type="button" onClick={() => flash("units")} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
          Save
        </button>
        {saved === "units" && <span className="text-xs text-green-600 ml-2">Saved</span>}
      </section>
    </div>
  );
}
