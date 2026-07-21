import { createFileRoute, Link } from "@tanstack/react-router";
import { getDeskSnapshot } from "#/server/desk";
import { getFinanceSnapshot } from "#/server/finance";
import { getCommerceSnapshot } from "#/server/commerce";
import { statusLabel } from "#/lib/status-labels";
import { useI18n } from "#/i18n";

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
  const { t, locale } = useI18n();
  const o = t.app.overview;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#1C1712]">{o.title}</h1>
        <p className="mt-1 text-[14px] text-[#6F6558]">{o.subtitle}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ModuleCard
          title={o.finance}
          href="/app/finance"
          items={[
            [o.pendingApps, finance.stats.pendingApplications],
            [o.activeProducts, finance.stats.activeProducts],
            [o.farmerProfiles, finance.farmers.length],
          ]}
        />
        <ModuleCard
          title={o.inventory}
          href="/app/market"
          items={[
            [o.listedGoods, commerce.stats.listedProducts],
            [o.openDemands, commerce.stats.openDemands],
            [o.openOrders, commerce.stats.openOrders],
          ]}
        />
        <ModuleCard
          title={o.expert}
          href="/app/knowledge"
          items={[
            [o.knowledgeItems, desk.stats.knowledge],
            [o.openQa, desk.stats.openQa],
            [o.pendingBooks, desk.stats.pendingBooks],
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="app-card p-5">
          <h2 className="text-[15px] font-semibold">{o.recentFinance}</h2>
          <ul className="mt-3 space-y-2">
            {finance.applications.slice(0, 4).map((a) => (
              <li key={a.id} className="rounded-lg border border-[#E8DFD0] px-3 py-2">
                <div className="text-[13px] font-medium">
                  {a.farmerName} · {a.amountWan}
                  {t.app.common.wan}
                </div>
                <div className="text-[11px] text-[#6F6558]">
                  {statusLabel(a.status, locale)} · {a.productTitle}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="app-card p-5">
          <h2 className="text-[15px] font-semibold">{o.inventoryActivity}</h2>
          <ul className="mt-3 space-y-2">
            {commerce.products
              .filter((p) => p.status === "listed")
              .slice(0, 4)
              .map((p) => (
                <li key={p.id} className="rounded-lg border border-[#E8DFD0] px-3 py-2">
                  <div className="text-[13px] font-medium">{p.title}</div>
                  <div className="text-[11px] text-[#6F6558]">
                    ¥{p.priceYuan}/{p.unit} · {t.app.common.stock} {p.stock} · {p.sellerName}
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
      <div className="text-[12px] font-medium tracking-wide text-[#6F6558]">{title}</div>
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
