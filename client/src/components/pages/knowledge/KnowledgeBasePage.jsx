import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../shared/Modal";
import { KB_ADMIN, KB_CATEGORIES } from "./kbData";

export default function KnowledgeBasePage() {
  const [query, setQuery] = useState("");
  const [catId, setCatId] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", category: "Getting Started", content: "" });
  const [errors, setErrors] = useState({});
  const [extra, setExtra] = useState([]);

  const categories = useMemo(() => {
    const merged = KB_CATEGORIES.map((c) => ({
      ...c,
      articles: [...c.articles, ...extra.filter((a) => a.categoryId === c.id)],
    }));
    return merged;
  }, [extra]);

  const flatArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.flatMap((c) =>
      c.articles.map((a) => ({ ...a, categoryTitle: c.title, categoryId: c.id })).filter((a) => !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
    );
  }, [categories, query]);

  const selectedArticle = useMemo(() => {
    if (!articleId) return null;
    return flatArticles.find((a) => a.id === articleId) || null;
  }, [articleId, flatArticles]);

  const saveArticle = () => {
    const e = {};
    if (!draft.title.trim()) e.title = true;
    if (!draft.content.trim()) e.content = true;
    setErrors(e);
    if (Object.keys(e).length) return;
    const cat = KB_CATEGORIES.find((c) => c.title === draft.category);
    const id = `local-${Date.now()}`;
    setExtra((prev) => [
      ...prev,
      {
        id,
        categoryId: cat?.id || "gs",
        title: draft.title,
        excerpt: draft.content.slice(0, 80) + (draft.content.length > 80 ? "…" : ""),
        body: draft.content,
      },
    ]);
    setAddOpen(false);
    setDraft({ title: "", category: "Getting Started", content: "" });
    setArticleId(id);
    setCatId(cat?.id || "gs");
  };

  const fe = (k) => (errors[k] ? "border-red-500" : "border-gray-300");

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900">Knowledge Base</h1>
        {KB_ADMIN && (
          <button type="button" onClick={() => setAddOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            <Plus size={18} /> Add Article
          </button>
        )}
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="w-full max-w-2xl px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCatId(c.id);
                  setArticleId(null);
                }}
                className={`text-left p-4 rounded-lg border shadow-sm hover:border-blue-300 ${catId === c.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
              >
                <div className="font-medium text-gray-900">{c.title}</div>
                <div className="text-xs text-gray-500 mt-1">{c.articles.length} articles</div>
              </button>
            ))}
          </div>

          {catId && (
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Articles</h3>
              <ul className="space-y-2">
                {categories
                  .find((c) => c.id === catId)
                  ?.articles.map((a) => (
                    <li key={a.id}>
                      <button type="button" onClick={() => setArticleId(a.id)} className={`text-left w-full text-sm ${articleId === a.id ? "text-blue-700 font-medium" : "text-gray-700 hover:text-blue-600"}`}>
                        <div>{a.title}</div>
                        <div className="text-xs text-gray-500">{a.excerpt}</div>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 min-h-[280px]">
          {!selectedArticle ? (
            <p className="text-sm text-gray-500">Pick a category and article, or search above.</p>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{selectedArticle.title}</h2>
              <p className="text-xs text-gray-500 mt-1">{selectedArticle.categoryTitle}</p>
              <div className="prose prose-sm max-w-none mt-4 text-gray-800 whitespace-pre-wrap">{selectedArticle.body}</div>
            </div>
          )}
        </div>
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Article" size="lg">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
            <input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("title")}`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select value={draft.category} onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg">
              {KB_CATEGORIES.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
            <textarea value={draft.content} onChange={(e) => setDraft((d) => ({ ...d, content: e.target.value }))} rows={8} className={`w-full px-3 py-2 text-sm border rounded-lg ${fe("content")}`} />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setAddOpen(false)} className="px-4 py-2 text-sm border rounded-md">
              Cancel
            </button>
            <button type="button" onClick={saveArticle} className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white">
              Publish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
