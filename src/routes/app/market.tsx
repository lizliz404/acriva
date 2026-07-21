import { createFileRoute, Link } from "@tanstack/react-router";
import { getCommerceSnapshot } from "#/server/commerce";
import { useI18n } from "#/i18n";

export const Route = createFileRoute("/app/market")({
  loader: () => getCommerceSnapshot(),
  component: MarketHubPage,
});

function MarketHubPage() {
  const data = Route.useLoaderData();
  const { t } = useI18n();
  const m = t.app.market;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1712]">{m.title}</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">{m.subtitle}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label={m.listed} value={data.stats.listedProducts} />
        <StatCard label={m.openDemands} value={data.stats.openDemands} />
        <StatCard label={m.openOrders} value={data.stats.openOrders} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/app/market/buy"
          className="app-card block p-5 transition hover:-translate-y-0.5"
        >
          <div className="text-[12px] font-medium tracking-wide text-[#0F4D35]">
            {m.buyerSeat}
          </div>
          <h2 className="mt-2 text-[17px] font-semibold text-[#1C1712]">{m.buyBrowse}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#4A433A]">{m.buyBody}</p>
          <span className="mt-4 inline-flex text-[13px] font-semibold text-[#0F4D35]">
            {m.enterBuy}
          </span>
        </Link>
        <Link
          to="/app/market/sell"
          className="app-card block p-5 transition hover:-translate-y-0.5"
        >
          <div className="text-[12px] font-medium tracking-wide text-[#0F4D35]">
            {m.sellerSeat}
          </div>
          <h2 className="mt-2 text-[17px] font-semibold text-[#1C1712]">{m.sellList}</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#4A433A]">{m.sellBody}</p>
          <span className="mt-4 inline-flex text-[13px] font-semibold text-[#0F4D35]">
            {m.enterSell}
          </span>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="app-card p-5">
      <div className="text-[12px] font-medium tracking-wide text-[#6F6558]">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-[#1C1712]">{value}</div>
    </div>
  );
}
