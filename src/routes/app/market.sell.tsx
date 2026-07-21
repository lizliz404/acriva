import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { type FormEvent, useRef, useState } from "react";
import {
  contactBuyerDemand,
  getCommerceSnapshot,
  upsertProduct,
} from "#/server/commerce";
import { statusLabel } from "#/lib/status-labels";
import { playStampFeedback } from "#/lib/stamp-feedback";

export const Route = createFileRoute("/app/market/sell")({
  loader: () => getCommerceSnapshot(),
  component: MarketSellPage,
});

function MarketSellPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const listBtnRef = useRef<HTMLButtonElement>(null);
  const [sellerId, setSellerId] = useState(data.farmers[0]?.id || "");
  const [title, setTitle] = useState("");
  const [crop, setCrop] = useState("番茄");
  const [region, setRegion] = useState("华东");
  const [priceYuan, setPriceYuan] = useState(10);
  const [stock, setStock] = useState(100);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [demandId, setDemandId] = useState(
    data.demands.find((d) => d.status === "open")?.id || data.demands[0]?.id || "",
  );
  const [message, setMessage] = useState("");

  const onList = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await upsertProduct({
        data: {
          sellerId,
          title,
          crop,
          region,
          priceYuan,
          stock,
          description,
          status: "listed",
        },
      });
      playStampFeedback(listBtnRef.current);
      setTitle("");
      setDescription("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "上架失败");
    } finally {
      setBusy(false);
    }
  };

  const onContact = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await contactBuyerDemand({
        data: { demandId, farmerId: sellerId, message },
      });
      setMessage("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "联系失败");
    } finally {
      setBusy(false);
    }
  };

  const mine = data.products.filter((p) => p.sellerId === sellerId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">农户席 · 上架</h1>
          <p className="mt-1 text-[14px] text-[#6F6558]">
            商品管理 · 对接买家需求。{" "}
            <Link to="/app/market/buy" className="underline">
              买家采购
            </Link>
          </p>
        </div>
        <select
          className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
        >
          {data.farmers.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <form onSubmit={onList} className="app-card space-y-3 p-4">
          <h2 className="text-[14px] font-semibold">上架货品</h2>
          <input
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="作物"
              required
            />
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="产区"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              min={0.1}
              step={0.1}
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={priceYuan}
              onChange={(e) => setPriceYuan(Number(e.target.value))}
              placeholder="单价（元）"
              required
            />
            <input
              type="number"
              min={0}
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="库存"
              required
            />
          </div>
          <textarea
            className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="描述（批次、规格、装运）"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            ref={listBtnRef}
            type="submit"
            className="btn-primary"
            disabled={busy}
          >
            {busy ? "提交中…" : "上架"}
          </button>
        </form>

        <form onSubmit={onContact} className="app-card space-y-3 p-4">
          <h2 className="text-[14px] font-semibold">联系买家需求</h2>
          <select
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={demandId}
            onChange={(e) => setDemandId(e.target.value)}
          >
            {data.demands.map((d) => (
              <option key={d.id} value={d.id}>
                {d.crop} · {d.buyerName} · {statusLabel(d.status)}
              </option>
            ))}
          </select>
          <textarea
            className="min-h-24 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="给买家的留言"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={busy}>
            发送联系
          </button>
        </form>
      </div>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">我的货盘</h2>
        {mine.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]"
          >
            <span>
              {p.title} · ¥{p.priceYuan}/{p.unit} · 库存 {p.stock}
            </span>
            <span className="badge badge-neutral">{statusLabel(p.status)}</span>
          </div>
        ))}
        {mine.length === 0 && (
          <div className="app-card p-4 text-[13px] text-[#6F6558]">暂无上架货品。</div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">最近联系</h2>
        {data.contacts.slice(0, 8).map((c) => (
          <div key={c.id} className="rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]">
            <div className="font-medium">
              {c.farmerName} → 需求 {c.demandId} · {statusLabel(c.status)}
            </div>
            <div className="text-[#6F6558]">{c.message}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
