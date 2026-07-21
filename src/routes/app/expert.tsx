import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import {
  answerQuestion,
  assignQuestion,
  getDeskSnapshot,
  processBooking,
  publishKnowledge,
} from "#/server/desk";
import { statusLabel } from "#/lib/status-labels";

export const Route = createFileRoute("/app/expert")({
  loader: () => getDeskSnapshot(),
  component: ExpertPage,
});

function ExpertPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const openQa = useMemo(
    () => data.qa.filter((q) => q.status === "open" || q.status === "assigned"),
    [data.qa],
  );
  const pendingBooks = useMemo(
    () => data.books.filter((b) => b.status === "requested"),
    [data.books],
  );
  const drafts = useMemo(
    () => data.knowledge.filter((k) => k.status !== "published"),
    [data.knowledge],
  );
  const defaultExpert = data.experts[0];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [promote, setPromote] = useState<Record<string, boolean>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async (id: string, fn: () => Promise<void>) => {
    setBusyId(id);
    setError(null);
    try {
      await fn();
      await router.invalidate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "操作失败");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">专家席</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          知识管理 · 问答处理 · 预约确认——与农户下行共用三张表。
        </p>
        {defaultExpert && (
          <p className="mt-2 text-[12px] text-[#6F6558]">
            当前身份：{defaultExpert.name} · {defaultExpert.specialty}
          </p>
        )}
        {error && (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
            {error}
          </div>
        )}
      </div>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">问答队列（{openQa.length}）</h2>
        {openQa.length === 0 && (
          <div className="app-card p-4 text-[13px] text-[#6F6558]">队列清空。</div>
        )}
        {openQa.map((q) => (
          <div key={q.id} className="app-card space-y-3 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-neutral">{statusLabel(q.status)}</span>
              <span className="badge badge-warn">{statusLabel(q.priority)}</span>
              {q.crop && <span className="text-[11px] text-[#6F6558]">{q.crop}</span>}
              {q.region && <span className="text-[11px] text-[#6F6558]">· {q.region}</span>}
            </div>
            <p className="text-[14px] font-medium">{q.question}</p>
            <div className="text-[12px] text-[#6F6558]">
              {q.asker}
              {q.expert ? ` · 已指派 ${q.expert}` : ""}
            </div>

            {q.status === "open" && defaultExpert && (
              <button
                type="button"
                className="btn-secondary"
                disabled={busyId === q.id}
                onClick={() =>
                  run(q.id, async () => {
                    await assignQuestion({
                      data: {
                        id: q.id,
                        expert: defaultExpert.name,
                        expertId: defaultExpert.id,
                      },
                    });
                  })
                }
              >
                指派给我
              </button>
            )}

            <textarea
              className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              placeholder="写下回答…"
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
            />
            <label className="flex items-center gap-2 text-[12px] text-[#4A433A]">
              <input
                type="checkbox"
                checked={Boolean(promote[q.id])}
                onChange={(e) =>
                  setPromote((prev) => ({ ...prev, [q.id]: e.target.checked }))
                }
              />
              回答后沉淀为知识草稿
            </label>
            <button
              type="button"
              className="btn-primary"
              disabled={busyId === q.id}
              onClick={() =>
                run(q.id, async () => {
                  await answerQuestion({
                    data: {
                      id: q.id,
                      answer: answers[q.id] || "",
                      expert: defaultExpert?.name,
                      expertId: defaultExpert?.id,
                      promoteToKnowledge: Boolean(promote[q.id]),
                    },
                  });
                  setAnswers((prev) => ({ ...prev, [q.id]: "" }));
                })
              }
            >
              {busyId === q.id ? "发送中…" : "提交回答"}
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">预约待确认（{pendingBooks.length}）</h2>
        {pendingBooks.length === 0 && (
          <div className="app-card p-4 text-[13px] text-[#6F6558]">暂无待确认预约。</div>
        )}
        {pendingBooks.map((b) => (
          <div
            key={b.id}
            className="app-card flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div>
              <div className="text-[14px] font-semibold">{b.topic}</div>
              <div className="text-[12px] text-[#6F6558]">
                {new Date(b.preferredAt).toLocaleString()} · {b.requester}
                {b.crop ? ` · ${b.crop}` : ""}
              </div>
              {b.notes && <p className="mt-1 text-[13px] text-[#4A433A]">{b.notes}</p>}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-secondary"
                disabled={busyId === b.id}
                onClick={() =>
                  run(b.id, async () => {
                    await processBooking({ data: { id: b.id, status: "cancelled" } });
                  })
                }
              >
                婉拒
              </button>
              <button
                type="button"
                className="btn-primary"
                disabled={busyId === b.id}
                onClick={() =>
                  run(b.id, async () => {
                    await processBooking({
                      data: {
                        id: b.id,
                        status: "confirmed",
                        expert: defaultExpert?.name,
                        expertId: defaultExpert?.id,
                      },
                    });
                  })
                }
              >
                确认
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">知识草稿（{drafts.length}）</h2>
        {drafts.map((k) => (
          <form
            key={k.id}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              void run(k.id, async () => {
                await publishKnowledge({ data: { id: k.id } });
              });
            }}
            className="app-card flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div>
              <div className="text-[14px] font-semibold">{k.title}</div>
              <div className="text-[12px] text-[#6F6558]">
                {statusLabel(k.status)} · {statusLabel(k.confidence)} · v{k.version} · {k.crop} ·{" "}
                {k.region}
              </div>
            </div>
            <button type="submit" className="btn-secondary" disabled={busyId === k.id}>
              发布
            </button>
          </form>
        ))}
      </section>
    </div>
  );
}
