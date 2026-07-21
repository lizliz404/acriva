import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { buyProduct, getCommerceSnapshot } from "#/server/commerce";

export const Route = createFileRoute("/app/market")({
  loader: () => getCommerceSnapshot(),
  component: MarketBrowsePage,
});

function MarketBrowsePage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [buyerName, setBuyerName] = useState("CityFresh Buyer");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError(e instanceof Error ? e.message : "Purchase failed");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Market · Browse</h1>
          <p className="mt-1 text-[14px] text-[#6F6558]">
            BrowseProduct · BuyProduct. Farmer sell desk:{" "}
            <Link to="/app/market/sell" className="underline">
              /app/market/sell
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Search crop / title"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Buyer name"
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
              <span className="badge badge-ok">stock {p.stock}</span>
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
                {busy === p.id ? "…" : "Buy"}
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">Open buyer demands</h2>
        {data.demands
          .filter((d) => d.status === "open" || d.status === "matched")
          .map((d) => (
            <article key={d.id} className="app-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-neutral">{d.status}</span>
                <span className="text-[14px] font-semibold">
                  {d.crop} · {d.qty}
                  {d.unit}
                </span>
                <span className="text-[12px] text-[#6F6558]">{d.buyerName}</span>
              </div>
              <p className="mt-2 text-[13px] text-[#4A433A]">{d.detail}</p>
              <div className="mt-1 text-[12px] text-[#6F6558]">
                {d.region}
                {d.budgetYuan != null ? ` · budget ¥${d.budgetYuan}/${d.unit}` : ""}
              </div>
            </article>
          ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">Recent orders</h2>
        {data.orders.slice(0, 6).map((o) => (
          <div
            key={o.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]"
          >
            <span>
              {o.productTitle} · {o.buyerName} · {o.qty} @ ¥{o.unitPriceYuan}
            </span>
            <span className="badge badge-neutral">{o.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
