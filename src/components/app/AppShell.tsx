import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LogoMark, cn } from "../ui";

const links = [
  { to: "/app", label: "总览", exact: true },
  { to: "/app/finance", label: "融资", exact: false },
  { to: "/app/finance/bank", label: "银行席", exact: false },
  { to: "/app/market", label: "货盘", exact: false },
  { to: "/app/market/sell", label: "上架", exact: false },
  { to: "/app/knowledge", label: "知识", exact: false },
  { to: "/app/ask", label: "问答", exact: false },
  { to: "/app/book", label: "预约", exact: false },
  { to: "/app/expert", label: "专家席", exact: false },
] as const;

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="app-shell">
      <div
        role="status"
        className="border-b border-[#E8DFD0] bg-[#F7F0E4] px-4 py-2 text-center text-[12px] leading-relaxed text-[#4A433A]"
      >
        <span className="font-medium text-[#1C1712]">开放演示台</span>
        ——默认无强制登录（AUTH_ENFORCE 关闭）；会话/角色表已就绪。请勿录入真实农户/银行数据。
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
          <span className="hidden text-[11px] text-[#6F6558] lg:inline">
            融资 + 货盘 + 专家
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
