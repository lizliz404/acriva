import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { createQuestion, getDeskSnapshot } from "#/server/desk";
import { statusLabel } from "#/lib/status-labels";

export const Route = createFileRoute("/app/ask")({
  loader: () => getDeskSnapshot(),
  component: AskPage,
});

function AskPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await createQuestion({ data: { question, crop, region } });
      setQuestion("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "提问失败");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">向专家提问</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          问题进入问答队列，专家席回答后可沉淀为知识稿。
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="app-card space-y-3 p-4">
        <textarea
          className="min-h-28 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder="描述田间问题…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="作物"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          />
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="产区"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "提交中…" : "提交问题"}
        </button>
      </form>

      <div className="space-y-3">
        {data.qa.map((q) => (
          <article key={q.id} className="app-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-neutral">{statusLabel(q.status)}</span>
              {q.crop && <span className="text-[11px] text-[#6F6558]">{q.crop}</span>}
              {q.region && <span className="text-[11px] text-[#6F6558]">· {q.region}</span>}
            </div>
            <p className="mt-2 text-[14px] font-medium text-[#1C1712]">{q.question}</p>
            {q.answer && (
              <div className="mt-3 rounded-lg bg-[#F7F0E4] px-3 py-2 text-[13px] text-[#4A433A]">
                <span className="font-medium text-[#1C1712]">{q.expert}：</span>
                {q.answer}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
