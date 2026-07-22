import { createFileRoute, useRouter } from "@tanstack/react-router";
import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  contactBuyerDemand,
  getCommerceSnapshot,
  upsertProduct,
} from "#/server/commerce";
import { statusLabel } from "#/lib/status-labels";
import { playStampFeedback } from "#/lib/stamp-feedback";
import { useI18n } from "#/i18n";

export const Route = createFileRoute("/app/market/sell")({
  loader: () => getCommerceSnapshot(),
  component: MarketSellPage,
});

function MarketSellPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  const { t, locale } = useI18n();
  const s = t.app.sell;
  const c = t.app.common;
  const defaults = t.app.defaults;
  const listBtnRef = useRef<HTMLButtonElement>(null);
  const [sellerId, setSellerId] = useState(data.farmers[0]?.id || "");
  const [title, setTitle] = useState("");
  const [crop, setCrop] = useState(defaults.crop);
  const [region, setRegion] = useState(defaults.region);
  const [priceYuan, setPriceYuan] = useState(10);
  const [stock, setStock] = useState(100);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [demandId, setDemandId] = useState(
    data.demands.find((d) => d.status === "open")?.id || data.demands[0]?.id || "",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCrop(defaults.crop);
    setRegion(defaults.region);
  }, [locale, defaults.crop, defaults.region]);

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
      setError(err instanceof Error ? err.message : s.listFailed);
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
      setError(err instanceof Error ? err.message : s.contactFailed);
    } finally {
      setBusy(false);
    }
  };

  const mine = data.products.filter((p) => p.sellerId === sellerId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{s.title}</h1>
          <p className="mt-1 text-[14px] text-[#6F6558]">{s.subtitle}</p>
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
          <h2 className="text-[14px] font-semibold">{s.formTitle}</h2>
          <input
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder={s.titlePh}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder={s.crop}
              required
            />
            <input
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder={s.region}
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
              placeholder={s.price}
              required
            />
            <input
              type="number"
              min={0}
              className="rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder={s.stock}
              required
            />
          </div>
          <textarea
            className="min-h-20 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder={s.desc}
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
            {busy ? c.submitting : s.submit}
          </button>
        </form>

        <form onSubmit={onContact} className="app-card space-y-3 p-4">
          <h2 className="text-[14px] font-semibold">{s.openDemands}</h2>
          <select
            className="w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            value={demandId}
            onChange={(e) => setDemandId(e.target.value)}
          >
            {data.demands.map((d) => (
              <option key={d.id} value={d.id}>
                {d.crop} · {d.buyerName} · {statusLabel(d.status, locale)}
              </option>
            ))}
          </select>
          <textarea
            className="min-h-24 w-full rounded-lg border border-[#D4C7B0] px-3 py-2 text-[13px]"
            placeholder={s.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={busy}>
            {s.contact}
          </button>
        </form>
      </div>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">{s.myListings}</h2>
        {mine.map((p) => (
          <div
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]"
          >
            <span>
              {p.title} · ¥{p.priceYuan}/{p.unit} · {c.stock} {p.stock}
            </span>
            <span className="badge badge-neutral">{statusLabel(p.status, locale)}</span>
          </div>
        ))}
        {mine.length === 0 && (
          <div className="app-card p-4 text-[13px] text-[#6F6558]">{s.emptyListings}</div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold">{s.recentContacts}</h2>
        {data.contacts.slice(0, 8).map((contact) => (
          <div key={contact.id} className="rounded-xl border border-[#E8DFD0] px-3 py-2 text-[13px]">
            <div className="font-medium">
              {contact.farmerName} → {s.demandRef} {contact.demandId} ·{" "}
              {statusLabel(contact.status, locale)}
            </div>
            <div className="text-[#6F6558]">{contact.message}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
