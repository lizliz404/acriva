import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { createBooking, getDeskSnapshot } from "#/server/desk";
import { statusLabel } from "#/lib/status-labels";

export const Route = createFileRoute("/app/book")({
  loader: () => getDeskSnapshot(),
  component: BookPage,
});

function BookPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [crop, setCrop] = useState("");
  const [preferredAt, setPreferredAt] = useState("2026-07-28T10:00");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setBusy(true);
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
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Book consult</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          User downlink: BookExpert → BookInfo. Experts confirm in Expert console.
        </p>
      </div>

      <form onSubmit={onSubmit} className="app-card grid gap-3 p-4 md:grid-cols-2">
        <input
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px] md:col-span-2"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <input
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder="Crop"
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
          placeholder="Prep notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="md:col-span-2">
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? "Requesting…" : "Request booking"}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {data.books.map((b) => (
          <article key={b.id} className="app-card flex flex-wrap items-start justify-between gap-3 p-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[14px] font-semibold">{b.topic}</h2>
                <span className="badge badge-neutral">{statusLabel(b.status)}</span>
              </div>
              <div className="mt-1 text-[12px] text-[#6F6558]">
                {new Date(b.preferredAt).toLocaleString()} · {b.durationMin} min
                {b.crop ? ` · ${b.crop}` : ""}
              </div>
              {b.notes && <p className="mt-2 text-[13px] text-[#4A433A]">{b.notes}</p>}
            </div>
            <div className="text-[12px] text-[#6F6558]">
              {b.requester}
              {b.expert ? ` → ${b.expert}` : ""}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
