import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  getFinanceSnapshot,
  matchFarmersToProduct,
  processFinApplication,
  type FinApplicationStatus,
} from "#/server/finance";

export const Route = createFileRoute("/app/finance/bank")({
  loader: () => getFinanceSnapshot(),
  component: BankDeskPage,
});

function BankDeskPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [productId, setProductId] = useState(data.products[0]?.id || "");
  const [matches, setMatches] = useState<
    Array<{ id: string; name: string; score: number; reason: string }>
  >([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<Record<string, string>>({});

  const queue = useMemo(
    () =>
      data.applications.filter((a) =>
        ["submitted", "under_review", "approved"].includes(a.status),
      ),
    [data.applications],
  );

  const act = async (id: string, status: FinApplicationStatus) => {
    setBusyId(id);
    setError(null);
    try {
      await processFinApplication({
        data: { id, status, bankNote: note[id] },
      });
      await router.invalidate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  };

  const runMatch = async () => {
    setBusyId("match");
    setError(null);
    try {
      const res = await matchFarmersToProduct({ data: { productId } });
      setMatches(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Match failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Finance · Bank</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          MatchFarmer · FinApprove · FinInfo
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <section className="app-card space-y-3 p-4">
        <h2 className="text-[14px] font-semibold">智能匹配农户 MatchFarmer</h2>
        <div className="flex flex-wrap gap-2">
          <select
            className="min-w-[220px] flex-1 rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {data.products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} · {p.bankName}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn-primary"
            disabled={busyId === "match"}
            onClick={runMatch}
          >
            Run match
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {matches.map((m) => (
            <div key={m.id} className="rounded-lg border border-[#E8DFD0] px-3 py-2 text-[12px]">
              <div className="font-medium">
                {m.name} · {(m.score * 100).toFixed(0)}%
              </div>
              <div className="text-[#6F6558]">{m.reason}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">融资审批 queue ({queue.length})</h2>
        {queue.map((a) => (
          <article key={a.id} className="app-card space-y-3 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-neutral">{a.status}</span>
              <span className="text-[14px] font-semibold">
                {a.farmerName} · {a.amountWan}万
              </span>
            </div>
            <div className="text-[13px] text-[#4A433A]">
              {a.productTitle} · {a.purpose}
            </div>
            <textarea
              className="min-h-16 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              placeholder="Bank note"
              value={note[a.id] || ""}
              onChange={(e) => setNote((prev) => ({ ...prev, [a.id]: e.target.value }))}
            />
            <div className="flex flex-wrap gap-2">
              {a.status === "submitted" && (
                <button
                  type="button"
                  className="btn-secondary"
                  disabled={busyId === a.id}
                  onClick={() => act(a.id, "under_review")}
                >
                  Start review
                </button>
              )}
              {(a.status === "submitted" || a.status === "under_review") && (
                <>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={busyId === a.id}
                    onClick={() => act(a.id, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={busyId === a.id}
                    onClick={() => act(a.id, "rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
              {a.status === "approved" && (
                <button
                  type="button"
                  className="btn-primary"
                  disabled={busyId === a.id}
                  onClick={() => act(a.id, "disbursed")}
                >
                  Mark disbursed
                </button>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">融资产品 FinInfo</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {data.products.map((p) => (
            <div key={p.id} className="app-card p-4">
              <div className="text-[12px] text-[#6F6558]">{p.bankName}</div>
              <div className="mt-1 text-[14px] font-semibold">{p.title}</div>
              <div className="mt-2 text-[12px] text-[#4A433A]">
                {p.minAmountWan}–{p.maxAmountWan}万 · {p.rateApr}% · {p.termMonths} mo
              </div>
              <p className="mt-2 text-[12px] text-[#6F6558]">{p.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
