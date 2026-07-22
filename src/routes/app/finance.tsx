import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { type FormEvent, useMemo, useRef, useState } from "react";
import {
  createFinApplication,
  getFinanceSnapshot,
  getPriceForecast,
  matchJointLoanPeers,
} from "#/server/finance";
import { statusLabel } from "#/lib/status-labels";
import { playStampFeedback } from "#/lib/stamp-feedback";
import { useI18n } from "#/i18n";

/*
 * DESIGN.md §2.4 — anti–tea-gift-box (finance desk):
 * Ledger density (status/amount/time), geometric UI. Not gift-box zen layout.
 */

export const Route = createFileRoute("/app/finance")({
  loader: () => getFinanceSnapshot(),
  component: FinanceFarmerPage,
});

function FinanceFarmerPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const { t, locale } = useI18n();
  const f = t.app.finance;
  const c = t.app.common;
  const defaults = t.app.defaults;
  const stampBtnRef = useRef<HTMLButtonElement>(null);
  const defaultFarmer = data.farmers[0]?.id || "";
  const [farmerId, setFarmerId] = useState(defaultFarmer);
  const [productId, setProductId] = useState(data.products[0]?.id || "");
  const [amountWan, setAmountWan] = useState(20);
  const [purpose, setPurpose] = useState("");
  const [jointMode, setJointMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [peers, setPeers] = useState<
    Array<{ id: string; name: string; score: number; reason: string }>
  >([]);
  const [forecast, setForecast] = useState<Awaited<
    ReturnType<typeof getPriceForecast>
  > | null>(null);

  const myApps = useMemo(
    () => data.applications.filter((a) => a.farmerId === farmerId),
    [data.applications, farmerId],
  );

  const onApply = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await createFinApplication({
        data: { farmerId, productId, amountWan, purpose, jointMode },
      });
      playStampFeedback(stampBtnRef.current);
      setPurpose("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : f.applyFailed);
    } finally {
      setBusy(false);
    }
  };

  const runMatch = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await matchJointLoanPeers({ data: { farmerId } });
      setPeers(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : f.matchFailed);
    } finally {
      setBusy(false);
    }
  };

  const runForecast = async () => {
    setBusy(true);
    setError(null);
    try {
      const farmer = data.farmers.find((f) => f.id === farmerId);
      const crop = farmer?.crops[0] || defaults.crop;
      const region = farmer?.region || defaults.region;
      const res = await getPriceForecast({ data: { crop, region } });
      setForecast(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : f.forecastFailed);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{f.title}</h1>
          <p className="mt-1 text-[14px] text-[#6F6558]">
            {f.subtitle}{" "}
            <Link to="/app/finance/bank" className="underline">
              {f.bankCta}
            </Link>
          </p>
        </div>
        <select
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          value={farmerId}
          onChange={(e) => setFarmerId(e.target.value)}
        >
          {data.farmers.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name} · {f.region}
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
        <form onSubmit={onApply} className="app-card space-y-3 p-4">
          <h2 className="text-[14px] font-semibold">{f.applyTitle}</h2>
          <select
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {data.products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.bankName} · {p.title}（{p.minAmountWan}-{p.maxAmountWan}
                {c.wan} · {p.rateApr}%）
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            step={1}
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={amountWan}
            onChange={(e) => setAmountWan(Number(e.target.value))}
            placeholder={f.amountWan}
            required
          />
          <textarea
            className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder={f.purpose}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
          <label className="flex items-center gap-2 text-[12px] text-[#4A433A]">
            <input
              type="checkbox"
              checked={jointMode}
              onChange={(e) => setJointMode(e.target.checked)}
            />
            {f.jointMode}
          </label>
          <button
            ref={stampBtnRef}
            type="submit"
            className="btn-primary"
            disabled={busy}
          >
            {busy ? c.submitting : f.submit}
          </button>
        </form>

        <div className="space-y-3">
          <div className="app-card space-y-2 p-4">
            <h3 className="text-[13px] font-semibold">{f.peersTitle}</h3>
            <button type="button" className="btn-secondary w-full" onClick={runMatch} disabled={busy}>
              {f.matchPeers}
            </button>
            <ul className="space-y-2">
              {peers.map((p) => (
                <li key={p.id} className="rounded-lg border border-[#E8DFD0] px-2.5 py-2 text-[12px]">
                  <div className="font-medium">
                    {p.name} · {(p.score * 100).toFixed(0)}%
                  </div>
                  <div className="text-[#6F6558]">{p.reason}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="app-card space-y-2 p-4">
            <h3 className="text-[13px] font-semibold">{f.forecast}</h3>
            <button type="button" className="btn-secondary w-full" onClick={runForecast} disabled={busy}>
              {f.forecastCta}
            </button>
            {forecast && (
              <div className="text-[12px] text-[#4A433A]">
                <div className="font-medium text-[#1C1712]">
                  {forecast.crop} · {forecast.region}
                </div>
                <div className="mt-1 text-[#6F6558]">{forecast.method}</div>
                <div className="mt-2">
                  {f.history}: {forecast.history.map((h) => h.priceYuan).join(" → ")}
                </div>
                <div className="mt-1">
                  {f.reference}: {forecast.forecast.map((h) => h.priceYuan).join(" → ")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">{f.myApplications}</h2>
        {myApps.map((a) => (
          <article key={a.id} className="app-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-neutral">{statusLabel(a.status, locale)}</span>
              {a.jointMode && <span className="badge badge-warn">{f.jointBadge}</span>}
              <span className="text-[14px] font-semibold">
                {a.amountWan}
                {c.wan}
              </span>
            </div>
            <div className="mt-1 text-[13px] text-[#4A433A]">
              {a.productTitle} · {a.bankName}
            </div>
            <div className="mt-1 text-[12px] text-[#6F6558]">{a.purpose}</div>
            {a.jointPeers && a.jointPeers.length > 0 && (
              <div className="mt-2 text-[12px] text-[#4A433A]">
                {f.matchedPeers}:{" "}
                {a.jointPeers.map((p) => `${p.name}(${(p.score * 100).toFixed(0)}%)`).join("，")}
              </div>
            )}
            {a.bankNote && (
              <div className="mt-2 rounded-lg bg-[#F7F0E4] px-3 py-2 text-[12px]">
                {f.bankNote}: {a.bankNote}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
