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
        <h1 className="text-2xl font-semibold tracking-tight text-[#0a0a0a]">
          融销通 desk
        </h1>
        <p className="mt-1 text-[14px] text-[#737373]">
          Finance + Market + Expert service — three modules, one farmer hub.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ModuleCard
          title="Finance"
          href="/app/finance"
          items={[
            ["Pending applications", finance.stats.pendingApplications],
            ["Active products", finance.stats.activeProducts],
            ["Farmers", finance.farmers.length],
          ]}
        />
        <ModuleCard
          title="Market"
          href="/app/market"
          items={[
            ["Listed products", commerce.stats.listedProducts],
            ["Open demands", commerce.stats.openDemands],
            ["Open orders", commerce.stats.openOrders],
          ]}
        />
        <ModuleCard
          title="Expert service"
          href="/app/knowledge"
          items={[
            ["Knowledge", desk.stats.knowledge],
            ["Open Q&A", desk.stats.openQa],
            ["Pending books", desk.stats.pendingBooks],
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="app-card p-5">
          <h2 className="text-[15px] font-semibold">Latest financing</h2>
          <ul className="mt-3 space-y-2">
            {finance.applications.slice(0, 4).map((a) => (
              <li key={a.id} className="rounded-lg border border-[#ececec] px-3 py-2">
                <div className="text-[13px] font-medium">
                  {a.farmerName} · {a.amountWan}万
                </div>
                <div className="text-[11px] text-[#737373]">
                  {a.status} · {a.productTitle}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="app-card p-5">
          <h2 className="text-[15px] font-semibold">Market pulse</h2>
          <ul className="mt-3 space-y-2">
            {commerce.products
              .filter((p) => p.status === "listed")
              .slice(0, 4)
              .map((p) => (
                <li key={p.id} className="rounded-lg border border-[#ececec] px-3 py-2">
                  <div className="text-[13px] font-medium">{p.title}</div>
                  <div className="text-[11px] text-[#737373]">
                    ¥{p.priceYuan}/{p.unit} · stock {p.stock} · {p.sellerName}
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
      <div className="text-[12px] font-medium uppercase tracking-wide text-[#737373]">
        {title}
      </div>
      <ul className="mt-3 space-y-2">
        {items.map(([label, value]) => (
          <li key={label} className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-[#525252]">{label}</span>
            <span className="text-lg font-semibold tracking-tight">{value}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
