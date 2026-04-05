import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { useDelayedLoading } from "../../shared/useDelayedLoading";

const initial = [
  { id: "1", name: "villa-front.jpg", size: "1.2 MB", date: "2026-04-01" },
  { id: "2", name: "floor-plan.pdf", size: "890 KB", date: "2026-03-28" },
];

export default function Media() {
  const loading = useDelayedLoading();
  const [files, setFiles] = useState(initial);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Media Library</h2>
        <label className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
          <Upload size={18} />
          Upload files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              const list = Array.from(e.target.files || []);
              setFiles((prev) => [
                ...list.map((f, i) => ({
                  id: `up-${Date.now()}-${i}`,
                  name: f.name,
                  size: `${(f.size / 1024 / 1024).toFixed(2)} MB`,
                  date: new Date().toISOString().slice(0, 10),
                })),
                ...prev,
              ]);
            }}
          />
        </label>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse border border-gray-200" />
          ))}
        </div>
      ) : files.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center text-sm text-gray-500">No files yet. Upload to get started.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {files.map((f) => (
            <div key={f.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 shrink-0 flex items-center justify-center text-xs text-gray-500">Preview</div>
              <div className="p-3 flex-1 min-w-0 flex flex-col">
                <div className="text-sm font-medium text-gray-900 truncate">{f.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {f.size} · {f.date}
                </div>
                <button
                  type="button"
                  onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))}
                  className="mt-auto self-end p-1 text-red-600 hover:bg-red-50 rounded"
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
