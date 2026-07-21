import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import {
  contactBuyerDemand,
  createBuyerDemand,
  getCommerceSnapshot,
  upsertProduct,
} from "#/server/commerce";

export const Route = createFileRoute("/app/market/sell")({
  loader: () => getCommerceSnapshot(),
  component: MarketSellPage,
});

function MarketSellPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const [sellerId, setSellerId] = useState(data.farmers[0]?.id || "");
  const [title, setTitle] = useState("");
  const [crop, setCrop] = useState("Tomato");
  const [region, setRegion] = useState("East China");
  const [priceYuan, setPriceYuan] = useState(10);
  const [stock, setStock] = useState(100);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // demand contact
  const [demandId, setDemandId] = useState(
    data.demands.find((d) => d.status === "open")?.id || data.demands[0]?.id || "",
  );
  const [message, setMessage] = useState("");

  // buyer demand form (dual role demo)
  const [buyerName, setBuyerName] = useState("New Buyer Co");
  const [dCrop, setDCrop] = useState("Tomato");
  const [dRegion, setDRegion] = useState("East China");
  const [dQty, setDQty] = useState(500);
  const [dBudget, setDBudget] = useState(11);
  const [dDetail, setDDetail] = useState("");

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
      setTitle("");
      setDescription("");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "List failed");
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
      setError(err instanceof Error ? err.message : "Contact failed");
    } finally {
      setBusy(false);
    }
  };

  const onDemand = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
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
      setError(err instanceof Error ? err.message : "Demand failed");
    } finally {
      setBusy(false);
    }
  };

  const mine = data.products.filter((p) => p.sellerId === sellerId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Market · Sell & Demand</h1>
          <p className="mt-1 text-[14px] text-[#6F6558]">
            ProdMgmt · ViewDemand · ContactBuyer · ManageDemand.{" "}
            <Link to="/app/market" className="underline">
              Browse
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
          <h2 className="text-[14px] font-semibold">商品管理 ProdMgmt</h2>
          <input
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              required
            />
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
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
              required
            />
            <input
              type="number"
              min={0}
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
          </div>
          <textarea
            className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={busy}>
            List product
          </button>
        </form>

        <form onSubmit={onContact} className="app-card space-y-3 p-4">
          <h2 className="text-[14px] font-semibold">ContactBuyer</h2>
          <select
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={demandId}
            onChange={(e) => setDemandId(e.target.value)}
          >
            {data.demands.map((d) => (
              <option key={d.id} value={d.id}>
                {d.crop} · {d.buyerName} · {d.status}
              </option>
            ))}
          </select>
          <textarea
            className="min-h-24 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder="Message to buyer"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={busy}>
            Send contact
          </button>
        </form>
      </div>

      <form onSubmit={onDemand} className="app-card space-y-3 p-4">
        <h2 className="text-[14px] font-semibold">ManageDemand (buyer lens)</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            required
          />
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={dCrop}
            onChange={(e) => setDCrop(e.target.value)}
            required
          />
          <input
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={dRegion}
            onChange={(e) => setDRegion(e.target.value)}
            required
          />
          <input
            type="number"
            className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={dQty}
            onChange={(e) => setDQty(Number(e.target.value))}
            required
          />
        </div>
        <input
          type="number"
          step={0.1}
          className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder="Budget yuan / unit"
          value={dBudget}
          onChange={(e) => setDBudget(Number(e.target.value))}
        />
        <textarea
          className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
          placeholder="Demand detail"
          value={dDetail}
          onChange={(e) => setDDetail(e.target.value)}
          required
        />
        <button type="submit" className="btn-secondary" disabled={busy}>
          Post demand
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">My listings</h2>
        {mine.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]"
          >
            <span>
              {p.title} · ¥{p.priceYuan}/{p.unit} · stock {p.stock}
            </span>
            <span className="badge badge-neutral">{p.status}</span>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">Recent contacts</h2>
        {data.contacts.slice(0, 8).map((c) => (
          <div key={c.id} className="rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]">
            <div className="font-medium">
              {c.farmerName} → demand {c.demandId} · {c.status}
            </div>
            <div className="text-[#6F6558]">{c.message}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
