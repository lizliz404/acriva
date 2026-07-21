import { createFileRoute, Link } from "@tanstack/react-router";
import { getDeskSnapshot } from "#/server/desk";
import { getFinanceSnapshot } from "#/server/finance";
import { getCommerceSnapshot } from "#/server/commerce";

export const Route = createFileRoute("/app/")({
  loader: async () => {
    const [desk, finance, commerce] = await Promise.all([
      getDeskSnapshot(),
      getFinanceSnapshot(),
      getCommerceSnapshot(),
    ]);
    return { desk, finance, commerce };
  },
  component: AppOverview,
});

function AppOverview() {
  const { desk, finance, commerce } = Route.useLoaderData();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1712]">
          融销通经营台
        </h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">
          借得到 · 卖得出 · 问得着——融资、货盘、专家问诊，一张台子办成。
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ModuleCard
          title="融资"
          href="/app/finance"
          items={[
            ["待审申请", finance.stats.pendingApplications],
            ["在架产品", finance.stats.activeProducts],
            ["农户档案", finance.farmers.length],
          ]}
        />
        <ModuleCard
          title="货盘"
          href="/app/market"
          items={[
            ["在售货品", commerce.stats.listedProducts],
            ["开放需求", commerce.stats.openDemands],
            ["进行中订单", commerce.stats.openOrders],
          ]}
        />
        <ModuleCard
          title="专家服务"
          href="/app/knowledge"
          items={[
            ["知识条目", desk.stats.knowledge],
            ["待答问答", desk.stats.openQa],
            ["待确认预约", desk.stats.pendingBooks],
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="app-card p-5">
          <h2 className="text-[15px] font-semibold">最近融资</h2>
          <ul className="mt-3 space-y-2">
            {finance.applications.slice(0, 4).map((a) => (
              <li key={a.id} className="rounded-lg border border-[#E8DFD0] px-3 py-2">
                <div className="text-[13px] font-medium">
                  {a.farmerName} · {a.amountWan}万
                </div>
                <div className="text-[11px] text-[#6F6558]">
                  {a.status} · {a.productTitle}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="app-card p-5">
          <h2 className="text-[15px] font-semibold">货盘动态</h2>
          <ul className="mt-3 space-y-2">
            {commerce.products
              .filter((p) => p.status === "listed")
              .slice(0, 4)
              .map((p) => (
                <li key={p.id} className="rounded-lg border border-[#E8DFD0] px-3 py-2">
                  <div className="text-[13px] font-medium">{p.title}</div>
                  <div className="text-[11px] text-[#6F6558]">
                    ¥{p.priceYuan}/{p.unit} · 库存 {p.stock} · {p.sellerName}
                  </div>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function ModuleCard({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: Array<[string, number]>;
}) {
  return (
    <Link to={href} className="app-card block p-5 transition hover:-translate-y-0.5">
      <div className="text-[12px] font-medium tracking-wide text-[#6F6558]">
        {title}
      </div>
      <ul className="mt-3 space-y-2">
        {items.map(([label, value]) => (
          <li key={label} className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-[#4A433A]">{label}</span>
            <span className="text-lg font-semibold tracking-tight">{value}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
