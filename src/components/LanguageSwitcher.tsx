import { Icon } from "@iconify/react";
import { useI18n } from "#/i18n";
import { cn } from "#/components/ui";

export function LanguageSwitcher({
  className,
  compact,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { locale, t, toggleLocale } = useI18n();
  const label = locale === "zh" ? "中" : "EN";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.lang.switchTo}
      title={t.lang.switchTo}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-[10px] font-medium text-[#6F6558] transition-colors hover:bg-[#1C1712]/[0.04] hover:text-[#1C1712]",
        compact ? "h-8 min-w-8 px-1.5 text-[11px]" : "h-8 px-2 text-[12px]",
        className,
      )}
    >
      <Icon icon="lucide:languages" className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="leading-none">{label}</span>
    </button>
  );
}
