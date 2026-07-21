import { createFileRoute, useRouter } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { createQuestion, getDeskSnapshot } from "#/server/desk";

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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setBusy(true);
    try {
      await createQuestion({ data: { question, crop, region } });
      setQuestion("");
      await router.invalidate();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ask expert</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          User downlink: AskExpert → QAMsg. Experts answer in Expert console.
        </p>
      </div>

      <form onSubmit={onSubmit} className="app-card space-y-3 p-4">
        <textarea
          className="min-h-28 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder="Describe the field issue…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
          />
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "Sending…" : "Submit question"}
        </button>
      </form>

      <div className="space-y-3">
        {data.qa.map((q) => (
          <article key={q.id} className="app-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-neutral">{q.status}</span>
              {q.crop && <span className="text-[11px] text-[#6F6558]">{q.crop}</span>}
              {q.region && <span className="text-[11px] text-[#6F6558]">· {q.region}</span>}
            </div>
            <p className="mt-2 text-[14px] font-medium text-[#1C1712]">{q.question}</p>
            {q.answer && (
              <div className="mt-3 rounded-lg bg-[#F7F0E4] px-3 py-2 text-[13px] text-[#4A433A]">
                <span className="font-medium text-[#1C1712]">{q.expert}: </span>
                {q.answer}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
