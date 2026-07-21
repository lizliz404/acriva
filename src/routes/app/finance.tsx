import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import {
  createFinApplication,
  getFinanceSnapshot,
  getPriceForecast,
  matchJointLoanPeers,
} from "#/server/finance";
import { statusLabel } from "#/lib/status-labels";

export const Route = createFileRoute("/app/finance")({
  loader: () => getFinanceSnapshot(),
  component: FinanceFarmerPage,
});

function FinanceFarmerPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
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
      setPurpose("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "申请失败");
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
      setError(err instanceof Error ? err.message : "匹配失败");
    } finally {
      setBusy(false);
    }
  };

  const runForecast = async () => {
    setBusy(true);
    setError(null);
    try {
      const farmer = data.farmers.find((f) => f.id === farmerId);
      const crop = farmer?.crops[0] || "番茄";
      const region = farmer?.region || "华东";
      const res = await getPriceForecast({ data: { crop, region } });
      setForecast(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "行情参照失败");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">融资 · 农户席</h1>
          <p className="mt-1 text-[14px] text-[#6F6558]">
            申请 · 联合匹配 · 行情参照。银行席：{" "}
            <Link to="/app/finance/bank" className="underline">
              去审批
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
          <h2 className="text-[14px] font-semibold">申请融资</h2>
          <select
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {data.products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.bankName} · {p.title}（{p.minAmountWan}-{p.maxAmountWan}万 ·{" "}
                {p.rateApr}%）
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
            placeholder="金额（万）"
            required
          />
          <textarea
            className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="用途说明"
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
            开启联合贷匹配（相似经营主体推荐）
          </label>
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy ? "提交中…" : "提交申请"}
          </button>
        </form>

        <div className="space-y-3">
          <div className="app-card space-y-2 p-4">
            <h3 className="text-[13px] font-semibold">联合贷匹配预览</h3>
            <button type="button" className="btn-secondary w-full" onClick={runMatch} disabled={busy}>
              查看同行匹配
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
            <h3 className="text-[13px] font-semibold">行情参照（均线启发式）</h3>
            <button type="button" className="btn-secondary w-full" onClick={runForecast} disabled={busy}>
              看主作物走势
            </button>
            {forecast && (
              <div className="text-[12px] text-[#4A433A]">
                <div className="font-medium text-[#1C1712]">
                  {forecast.crop} · {forecast.region}
                </div>
                <div className="mt-1 text-[#6F6558]">{forecast.method}</div>
                <div className="mt-2">
                  历史：{forecast.history.map((h) => h.priceYuan).join(" → ")}
                </div>
                <div className="mt-1">
                  参照：{forecast.forecast.map((h) => h.priceYuan).join(" → ")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">我的申请</h2>
        {myApps.map((a) => (
          <article key={a.id} className="app-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge badge-neutral">{statusLabel(a.status)}</span>
              {a.jointMode && <span className="badge badge-warn">联合贷</span>}
              <span className="text-[14px] font-semibold">{a.amountWan}万</span>
            </div>
            <div className="mt-1 text-[13px] text-[#4A433A]">
              {a.productTitle} · {a.bankName}
            </div>
            <div className="mt-1 text-[12px] text-[#6F6558]">{a.purpose}</div>
            {a.jointPeers && a.jointPeers.length > 0 && (
              <div className="mt-2 text-[12px] text-[#4A433A]">
                匹配同行：{" "}
                {a.jointPeers.map((p) => `${p.name}(${(p.score * 100).toFixed(0)}%)`).join("，")}
              </div>
            )}
            {a.bankNote && (
              <div className="mt-2 rounded-lg bg-[#F7F0E4] px-3 py-2 text-[12px]">
                银行备注：{a.bankNote}
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
