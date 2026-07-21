import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LogoMark, cn } from "../ui";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useI18n } from "#/i18n";

/*
 * DESIGN.md §2.4 — anti–tea-gift-box (app shell):
 * Geometric sans nav, ledger actions, jade CTAs. Avoid calligraphy wordmarks,
 * gift-box gilt chrome / ribbon framing, or sparse “tea packaging” layouts.
 * Seal red is allowed in the mark only — never as shell background or CTA fill.
 */

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();

  const links = [
    { to: "/app", label: t.app.nav.overview, exact: true },
    { to: "/app/finance", label: t.app.nav.finance, exact: false },
    { to: "/app/finance/bank", label: t.app.nav.bank, exact: false },
    { to: "/app/market", label: t.app.nav.inventory, exact: true },
    { to: "/app/market/buy", label: t.app.nav.buy, exact: false },
    { to: "/app/market/sell", label: t.app.nav.sell, exact: false },
    { to: "/app/knowledge", label: t.app.nav.knowledge, exact: false },
    { to: "/app/ask", label: t.app.nav.ask, exact: false },
    { to: "/app/book", label: t.app.nav.book, exact: false },
    { to: "/app/expert", label: t.app.nav.expert, exact: false },
  ] as const;

  return (
    <div className="app-shell">
      <div
        role="status"
        className="border-b border-[#E8DFD0] bg-[#F7F0E4] px-4 py-2 text-center text-[12px] leading-relaxed text-[#4A433A]"
      >
        <span className="font-medium text-[#1C1712]">{t.app.banner.title}</span>
        {t.app.banner.body}
      </div>
      <header className="sticky top-0 z-40 border-b border-[#E8DFD0] bg-[#FFFBF4]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link to="/" className="shrink-0">
            <LogoMark showZh={false} className="[&>span>span:first-child]:text-[14px]" />
          </Link>
          <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {links.map((link) => {
              const active = link.exact
                ? pathname === link.to
                : pathname === link.to || pathname.startsWith(`${link.to}/`);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "rounded-[10px] px-2.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition sm:px-3 sm:text-[13px]",
                    active
                      ? "bg-[#0F4D35] text-[#FFFBF4]"
                      : "text-[#4A433A] hover:bg-[#E8DFD0] hover:text-[#1C1712]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden text-[11px] text-[#6F6558] lg:inline">
              {t.app.nav.tagline}
            </span>
            <LanguageSwitcher className="!text-[#4A433A] hover:!bg-[#E8DFD0]" />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
