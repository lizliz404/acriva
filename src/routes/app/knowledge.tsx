import { createFileRoute, useRouter } from "@tanstack/react-router";
import { FormEvent, useMemo, useState } from "react";
import { getDeskSnapshot, upsertKnowledge } from "#/server/desk";

export const Route = createFileRoute("/app/knowledge")({
  loader: () => getDeskSnapshot(),
  component: KnowledgePage,
});

function KnowledgePage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [crop, setCrop] = useState("all");
  const [title, setTitle] = useState("");
  const [newCrop, setNewCrop] = useState("Tomato");
  const [region, setRegion] = useState("East China");
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crops = useMemo(
    () => ["all", ...Array.from(new Set(data.knowledge.map((k) => k.crop))).sort()],
    [data.knowledge],
  );

  const filtered = useMemo(() => {
    return data.knowledge.filter((k) => {
      if (crop !== "all" && k.crop !== crop) return false;
      if (!q.trim()) return true;
      const needle = q.toLowerCase();
      return (
        k.title.toLowerCase().includes(needle) ||
        k.summary.toLowerCase().includes(needle) ||
        k.tags.some((t) => t.toLowerCase().includes(needle))
      );
    });
  }, [data.knowledge, crop, q]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await upsertKnowledge({
        data: {
          title,
          crop: newCrop,
          region,
          summary,
          status: "draft",
          author: data.experts[0]?.name || "Demo Expert",
          expertId: data.experts[0]?.id,
        },
      });
      setTitle("");
      setSummary("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Browse knowledge</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          BrowseKnowledge → Knowledge (D1). Experts ManageKnowledge via the draft form.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          className="min-w-[200px] flex-1 rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder="Search title, summary, tags…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        >
          {crops.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All crops" : c}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {filtered.map((k) => (
            <article key={k.id} className="app-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[15px] font-semibold">{k.title}</h2>
                <span className="badge badge-neutral">{k.status}</span>
                <span className="badge badge-success">{k.confidence}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#4A433A]">{k.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[#6F6558]">
                <span>{k.crop}</span>
                <span>·</span>
                <span>{k.region}</span>
                <span>·</span>
                <span>{k.author}</span>
                <span>·</span>
                <span>v{k.version}</span>
                <span>·</span>
                <span>{k.updatedAt}</span>
              </div>
              {k.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {k.tags.map((t) => (
                    <span key={t} className="badge badge-neutral">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="app-card p-6 text-[13px] text-[#6F6558]">No matching articles.</div>
          )}
        </div>

        <form onSubmit={onSubmit} className="app-card h-fit space-y-3 p-4">
          <h3 className="text-[14px] font-semibold">ManageKnowledge</h3>
          <input
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={newCrop}
              onChange={(e) => setNewCrop(e.target.value)}
            />
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <textarea
            className="min-h-24 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary w-full" disabled={busy}>
            {busy ? "Saving…" : "Save draft"}
          </button>
        </form>
      </div>
    </div>
  );
}
