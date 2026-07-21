import type { ReactNode } from "react";
import { product } from "#/lib/data";

const toneMap = {
  blue: "bg-[#e4eef4] text-[#2F5D7C]",
  violet: "bg-[#f0ebe4] text-[#4A433A]",
  amber: "bg-[#F5E6C8] text-[#8a5a14]",
  rose: "bg-[#f8e8e5] text-[#B33A2B]",
  emerald: "bg-[#E3F0E8] text-[#0F4D35]",
  slate: "bg-[#E8DFD0] text-[#4A433A]",
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
          dark ? "border-white/10 bg-[#2A241C]" : "border-[#E8DFD0] bg-[#F7F0E4]"
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
              dark ? "text-[#F7F0E4]/70" : "text-[#6F6558]"
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

/** Seal A mark + Acriva (+ optional 融销通) */
export function LogoMark({
  className = "",
  showZh = true,
}: {
  className?: string;
  showZh?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect width="32" height="32" rx="7" fill="#1C1712" />
        <path
          fill="#F7F0E4"
          fillRule="evenodd"
          d="M16 7.2 L25.2 24.8 H21.4 L19.55 20.6 H12.45 L10.6 24.8 H6.8 L16 7.2 Z M16 11.6 L18.35 17.2 H13.65 L16 11.6 Z"
        />
        <rect x="14.4" y="5.5" width="3.2" height="3.2" rx="0.5" fill="#C9892E" />
      </svg>
      <span className="inline-flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-[#1C1712]">
          {product.name}
        </span>
        {showZh ? (
          <span className="mt-0.5 text-[10px] font-medium text-[#6F6558]">
            {product.zhName}
          </span>
        ) : null}
      </span>
    </span>
  );
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
