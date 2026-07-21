import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { type FormEvent, useMemo, useState } from "react";
import {
  buyProduct,
  createBuyerDemand,
  getCommerceSnapshot,
} from "#/server/commerce";
import { statusLabel } from "#/lib/status-labels";

export const Route = createFileRoute("/app/market/buy")({
  loader: () => getCommerceSnapshot(),
  component: MarketBuyPage,
});

function MarketBuyPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [buyerName, setBuyerName] = useState("城鲜采购");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [dCrop, setDCrop] = useState("番茄");
  const [dRegion, setDRegion] = useState("华东");
  const [dQty, setDQty] = useState(500);
  const [dBudget, setDBudget] = useState(11);
  const [dDetail, setDDetail] = useState("");

  const listed = useMemo(() => {
    const base = data.products.filter((p) => p.status === "listed");
    if (!q.trim()) return base;
    const s = q.toLowerCase();
    return base.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.crop.toLowerCase().includes(s) ||
        p.region.toLowerCase().includes(s),
    );
  }, [data.products, q]);

  const onBuy = async (productId: string) => {
    setBusy(productId);
    setError(null);
    try {
      await buyProduct({
        data: {
          productId,
          buyerName,
          qty: qty[productId] || 10,
        },
      });
      await router.invalidate();
    } catch (e) {
      setError(e instanceof Error ? e.message : "下单失败");
    } finally {
      setBusy(null);
    }
  };

  const onDemand = async (e: FormEvent) => {
    e.preventDefault();
    setBusy("demand");
    setError(null);
    try {
      await createBuyerDemand({
        data: {
          buyerName,
          crop: dCrop,
          region: dRegion,
          qty: dQty,
          budgetYuan: dBudget,
          detail: dDetail,
        },
      });
      setDDetail("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "发布需求失败");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">买家席 · 采购</h1>
          <p className="mt-1 text-[14px] text-[#6F6558]">
            浏览下单 · 发布需求。农户上架见{" "}
            <Link to="/app/market/sell" className="underline">
              上架席
            </Link>
            。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="搜作物 / 标题 / 产区"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="买家名称"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {listed.map((p) => (
          <article key={p.id} className="app-card flex flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[14px] font-semibold">{p.title}</div>
                <div className="mt-1 text-[12px] text-[#6F6558]">
                  {p.crop} · {p.region} · {p.sellerName}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold">¥{p.priceYuan}</div>
                <div className="text-[11px] text-[#6F6558]">/{p.unit}</div>
              </div>
            </div>
            <p className="mt-2 flex-1 text-[12.5px] text-[#4A433A]">{p.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="badge badge-ok">库存 {p.stock}</span>
              <input
                type="number"
                min={1}
                className="w-24 rounded-lg border border-[#D4C7B0] px-2 py-1.5 text-[13px]"
                value={qty[p.id] ?? 10}
                onChange={(e) =>
                  setQty((prev) => ({ ...prev, [p.id]: Number(e.target.value) }))
                }
              />
              <button
                type="button"
                className="btn-primary"
                disabled={busy === p.id}
                onClick={() => onBuy(p.id)}
              >
                {busy === p.id ? "…" : "下单"}
              </button>
            </div>
          </article>
        ))}
        {listed.length === 0 && (
          <div className="app-card p-6 text-[13px] text-[#6F6558] md:col-span-2">
            暂无在售货品。可先发布采购需求，或等农户上架。
          </div>
        )}
      </div>

      <form onSubmit={onDemand} className="app-card space-y-3 p-4">
        <h2 className="text-[14px] font-semibold">发布采购需求</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={dCrop}
            onChange={(e) => setDCrop(e.target.value)}
            placeholder="作物"
            required
          />
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={dRegion}
            onChange={(e) => setDRegion(e.target.value)}
            placeholder="产区"
            required
          />
          <input
            type="number"
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={dQty}
            onChange={(e) => setDQty(Number(e.target.value))}
            placeholder="数量"
            required
          />
          <input
            type="number"
            step={0.1}
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="预算元/单位"
            value={dBudget}
            onChange={(e) => setDBudget(Number(e.target.value))}
          />
        </div>
        <textarea
          className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder="需求说明（规格、交货、验收等）"
          value={dDetail}
          onChange={(e) => setDDetail(e.target.value)}
          required
        />
        <button type="submit" className="btn-secondary" disabled={busy === "demand"}>
          {busy === "demand" ? "提交中…" : "发布需求"}
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">开放中的需求</h2>
        {data.demands
          .filter((d) => d.status === "open" || d.status === "matched")
          .map((d) => (
            <article key={d.id} className="app-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-neutral">{statusLabel(d.status)}</span>
                <span className="text-[14px] font-semibold">
                  {d.crop} · {d.qty}
                  {d.unit}
                </span>
                <span className="text-[12px] text-[#6F6558]">{d.buyerName}</span>
              </div>
              <p className="mt-2 text-[13px] text-[#4A433A]">{d.detail}</p>
              <div className="mt-1 text-[12px] text-[#6F6558]">
                {d.region}
                {d.budgetYuan != null ? ` · 预算 ¥${d.budgetYuan}/${d.unit}` : ""}
              </div>
            </article>
          ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">最近订单</h2>
        {data.orders.slice(0, 6).map((o) => (
          <div
            key={o.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]"
          >
            <span>
              {o.productTitle} · {o.buyerName} · {o.qty} @ ¥{o.unitPriceYuan}
            </span>
            <span className="badge badge-neutral">{statusLabel(o.status)}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
