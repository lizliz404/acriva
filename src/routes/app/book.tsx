import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { createBooking, getDeskSnapshot } from "#/server/desk";
import { statusLabel } from "#/lib/status-labels";
import { useI18n } from "#/i18n";

export const Route = createFileRoute("/app/book")({
  loader: () => getDeskSnapshot(),
  component: BookPage,
});

function BookPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const { t, locale } = useI18n();
  const b = t.app.book;
  const c = t.app.common;
  const [topic, setTopic] = useState("");
  const [crop, setCrop] = useState("");
  const [preferredAt, setPreferredAt] = useState("2026-07-28T10:00");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await createBooking({
        data: {
          topic,
          crop,
          preferredAt: new Date(preferredAt).toISOString(),
          notes,
        },
      });
      setTopic("");
      setNotes("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : b.bookFailed);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{b.title}</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">{b.subtitle}</p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="app-card grid gap-3 p-4 md:grid-cols-2">
        <input
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px] md:col-span-2"
          placeholder={b.topic}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <input
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder={b.crop}
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
        />
        <input
          type="datetime-local"
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          value={preferredAt}
          onChange={(e) => setPreferredAt(e.target.value)}
          required
        />
        <textarea
          className="min-h-20 rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px] md:col-span-2"
          placeholder={b.memo}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="md:col-span-2">
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? c.submitting : b.submit}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {data.books.map((item) => (
          <article
            key={item.id}
            className="app-card flex flex-wrap items-start justify-between gap-3 p-4"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[14px] font-semibold">{item.topic}</h2>
                <span className="badge badge-neutral">{statusLabel(item.status, locale)}</span>
              </div>
              <div className="mt-1 text-[12px] text-[#6F6558]">
                {new Date(item.preferredAt).toLocaleString()} · {item.durationMin}{" "}
                {b.minutes}
                {item.crop ? ` · ${item.crop}` : ""}
              </div>
              {item.notes && (
                <p className="mt-2 text-[13px] text-[#4A433A]">{item.notes}</p>
              )}
            </div>
            <div className="text-[12px] text-[#6F6558]">
              {item.requester}
              {item.expert ? ` → ${item.expert}` : ""}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
