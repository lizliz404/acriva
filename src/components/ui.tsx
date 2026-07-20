import type { ReactNode } from "react";
import { product } from "#/lib/data";

const toneMap = {
  blue: "bg-[#dbeafe] text-[#1d4ed8]",
  violet: "bg-[#ede9fe] text-[#6d28d9]",
  amber: "bg-[#fef3c7] text-[#b45309]",
  rose: "bg-[#ffe4e6] text-[#be123c]",
  emerald: "bg-[#d1fae5] text-[#047857]",
  slate: "bg-[#e5e5e5] text-[#404040]",
} as const;

export function Avatar({
  initials,
  tone = "slate",
  size = "md",
}: {
  initials: string;
  tone?: keyof typeof toneMap;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm"
      ? "h-6 w-6 text-[10px]"
      : size === "lg"
        ? "h-11 w-11 text-sm"
        : "h-8 w-8 text-xs";
  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${sizeClass} ${toneMap[tone]}`}
    >
      {initials}
    </div>
  );
}

export function WindowChrome({
  title,
  dark = false,
  trailing,
  children,
  className = "",
}: {
  title?: string;
  dark?: boolean;
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${dark ? "surface-window-dark" : "surface-window"} ${className}`}>
      <div
        className={`flex items-center gap-3 border-b px-3.5 py-2.5 ${
          dark ? "border-white/10 bg-[#161616]" : "border-[#ececec] bg-[#f7f7f7]"
        }`}
      >
        <div className="traffic-lights" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        {title ? (
          <div
            className={`min-w-0 flex-1 truncate text-center text-[12.5px] font-medium ${
              dark ? "text-white/70" : "text-[#525252]"
            }`}
          >
            {title}
          </div>
        ) : (
          <div className="flex-1" />
        )}
        {trailing ? <div className="shrink-0">{trailing}</div> : <div className="w-[42px]" />}
      </div>
      {children}
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect width="32" height="32" rx="8" fill="#0A0A0A" />
        <path
          d="M9 24 L15.2 8.5"
          stroke="#FAFAFA"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M23 24 L16.8 8.5"
          stroke="#FAFAFA"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M11.4 17.5 H20.6"
          stroke="#FAFAFA"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <rect x="14.25" y="6.75" width="3.5" height="3.5" rx="0.6" fill="#0F766E" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-[#0a0a0a]">
        {product.name}
      </span>
    </span>
  );
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
