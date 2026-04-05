import { useState } from "react";

export default function Setup() {
  const [org, setOrg] = useState({ name: "ImageReality", timezone: "Asia/Kolkata", fiscalStart: "04" });
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-xl font-semibold text-gray-900">Setup</h1>
      <p className="text-sm text-gray-600">Initial workspace settings (mock — connect to API later).</p>

      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Organization</h2>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Company name</label>
          <input value={org.name} onChange={(e) => setOrg((o) => ({ ...o, name: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Timezone</label>
          <select value={org.timezone} onChange={(e) => setOrg((o) => ({ ...o, timezone: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Fiscal year starts (month)</label>
          <select value={org.fiscalStart} onChange={(e) => setOrg((o) => ({ ...o, fiscalStart: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((m) => (
              <option key={m} value={m}>
                Month {m}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
        {saved && <span className="text-xs text-green-600 ml-2">Saved</span>}
      </section>
    </div>
  );
}
