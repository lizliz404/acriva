import type { ReactNode } from "react";
import { product } from "#/lib/data";

/*
 * DESIGN.md §2.4 — anti–tea-gift-box checklist (keep us on「经营台」):
 * - Fonts: geometric sans (Plex/Noto), horizontal — NEVER calligraphy / Song title / vertical type
 * - Seal/mark: 田字格印 with contract-stamp vermilion in the mark only — NEVER gift-box gilt borders or large vermilion fills
 * - Density: ledger-grade (status, amount, time) — NEVER big zen whitespace + one poetic line
 * - Gold: single accent (apex / amount) — NEVER gold borders or large gilt fills
 * - Outcome: every screen ends on action/status — NEVER mood/atmosphere as the punchline
 * Acceptance: first reaction must be「能借钱卖货的台子」, not「送礼的茶叶罐」— judged by whether red reads as stamp vs gift foil.
 */

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

/** DESIGN.md §7.5 — quiet mono audit trail; bottom-right of product mocks only. */
export function AuditTrailStrip({
  batch = "#A-2607",
  time = "14:32",
  operator = "合作社-陈",
  dark = false,
  className = "",
}: {
  batch?: string;
  time?: string;
  operator?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "audit-trail-strip absolute bottom-2 right-2.5 max-w-[calc(100%-1rem)] truncate",
        dark && "audit-trail-strip--dark",
        className,
      )}
      aria-hidden
    >
      批次 {batch} · 已留痕 {time} · 操作人：{operator}
    </div>
  );
}

/**
 * 田字格印 mark + Acriva (+ optional 融销通).
 * Mark: soil tile + seal red (#B33A2B) field grid + gold apex (DESIGN V3 §8).
 * Seal red belongs in the mark only — never as page background or button fill.
 */
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
        <g opacity="0.28" transform="translate(0.35 0.45)">
          <path
            fill="#000000"
            d="M7.2 6.9 L24.6 6.55 L25.05 10.15 L7.0 10.05 Z M6.95 21.85 L25.1 22.15 L24.75 25.35 L7.15 25.05 Z M6.85 6.95 L10.25 6.7 L10.05 25.15 L6.65 24.95 Z M21.75 6.85 L25.15 7.05 L24.95 25.1 L21.55 24.85 Z M7.05 14.15 L25.05 13.9 L24.95 17.55 L6.95 17.65 Z M14.15 6.85 L17.65 6.7 L17.5 25.1 L14.0 24.95 Z"
          />
        </g>
        <path
          fill="#B33A2B"
          d="M7.15 6.75 L24.7 6.5 L25.1 10.1 L6.95 10.0 Z M6.9 21.75 L25.15 22.05 L24.8 25.3 L7.1 25.0 Z M6.8 6.9 L10.2 6.65 L10.0 25.1 L6.6 24.9 Z M21.7 6.8 L25.2 7.0 L24.95 25.05 L21.5 24.8 Z M7.0 14.1 L25.1 13.85 L25.0 17.5 L6.9 17.6 Z M14.1 6.8 L17.7 6.65 L17.55 25.05 L13.95 24.9 Z"
        />
        <rect x="14.4" y="5.9" width="3.2" height="3.2" rx="0.45" fill="#C9892E" />
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
