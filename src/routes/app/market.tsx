import { createFileRoute, Link } from "@tanstack/react-router";
import { getCommerceSnapshot } from "#/server/commerce";

export const Route = createFileRoute("/app/market")({
  loader: () => getCommerceSnapshot(),
  component: MarketHubPage,
});

function MarketHubPage() {
  const data = Route.useLoaderData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1712]">
          货盘
        </h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          卖得出——买家采购、农户上架，同一货盘分流。
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="在售货品" value={data.stats.listedProducts} />
        <StatCard label="开放需求" value={data.stats.openDemands} />
        <StatCard label="进行中订单" value={data.stats.openOrders} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          to="/app/market/buy"
          className="app-card block p-5 transition hover:-translate-y-0.5"
        >
          <div className="text-[12px] font-medium tracking-wide text-[#0F4D35]">
            买家席
          </div>
          <h2 className="mt-2 text-[17px] font-semibold text-[#1C1712]">
            采购浏览
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#4A433A]">
            浏览在售批次、下单扣库存、发布采购需求。
          </p>
          <span className="mt-4 inline-flex text-[13px] font-semibold text-[#0F4D35]">
            进入采购 →
          </span>
        </Link>
        <Link
          to="/app/market/sell"
          className="app-card block p-5 transition hover:-translate-y-0.5"
        >
          <div className="text-[12px] font-medium tracking-wide text-[#0F4D35]">
            农户席
          </div>
          <h2 className="mt-2 text-[17px] font-semibold text-[#1C1712]">
            上架与对接
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#4A433A]">
            挂价上架、联系买家需求、管理自家货盘。
          </p>
          <span className="mt-4 inline-flex text-[13px] font-semibold text-[#0F4D35]">
            去上架 →
          </span>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="app-card p-5">
      <div className="text-[12px] font-medium tracking-wide text-[#6F6558]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-[#1C1712]">
        {value}
      </div>
    </div>
  );
}
