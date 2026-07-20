import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LogoMark, cn } from "../ui";

const links = [
  { to: "/app", label: "Overview", exact: true },
  { to: "/app/finance", label: "Finance" },
  { to: "/app/finance/bank", label: "Bank" },
  { to: "/app/market", label: "Market" },
  { to: "/app/market/sell", label: "Sell" },
  { to: "/app/knowledge", label: "Knowledge" },
  { to: "/app/ask", label: "Ask" },
  { to: "/app/book", label: "Book" },
  { to: "/app/expert", label: "Expert" },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 border-b border-[#e5e5e5] bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link to="/" className="shrink-0">
            <LogoMark className="[&>span]:text-[14px]" />
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
                    "rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition sm:px-3 sm:text-[13px]",
                    active
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#525252] hover:bg-[#f4f4f5] hover:text-[#0a0a0a]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <span className="hidden text-[11px] text-[#a3a3a3] lg:inline">
            融销通 demo · finance + market + expert
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
