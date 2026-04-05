import { useState } from "react";

export default function UtilitiesSettings() {
  const [company, setCompany] = useState({ name: "ImageReality", address: "Mumbai, IN", phone: "+91 22 0000 0000" });
  const [notif, setNotif] = useState({ email: true, push: false });
  const [theme, setTheme] = useState("light");
  const [saved, setSaved] = useState(null);

  const flash = (key) => {
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-900">Settings</h2>

      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Company Info</h3>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Company name</label>
          <input
            value={company.name}
            onChange={(e) => setCompany((c) => ({ ...c, name: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={company.address}
            onChange={(e) => setCompany((c) => ({ ...c, address: e.target.value }))}
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
          <input
            value={company.phone}
            onChange={(e) => setCompany((c) => ({ ...c, phone: e.target.value }))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => flash("company")} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
          {saved === "company" && <span className="text-xs text-green-600">Saved</span>}
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Notification Preferences</h3>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={notif.email} onChange={(e) => setNotif((n) => ({ ...n, email: e.target.checked }))} />
          Email alerts
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={notif.push} onChange={(e) => setNotif((n) => ({ ...n, push: e.target.checked }))} />
          Push notifications
        </label>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => flash("notif")} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
          {saved === "notif" && <span className="text-xs text-green-600">Saved</span>}
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">Theme</h3>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="theme" checked={theme === "light"} onChange={() => setTheme("light")} />
            Light
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="theme" checked={theme === "dark"} onChange={() => setTheme("dark")} />
            Dark
          </label>
        </div>
        <p className="text-xs text-gray-500">Preview toggles preference only; full dark theme can be wired later.</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => flash("theme")} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
          {saved === "theme" && <span className="text-xs text-green-600">Saved</span>}
        </div>
      </section>
    </div>
  );
}
