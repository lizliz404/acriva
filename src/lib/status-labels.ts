/** UI labels for domain status enums — keep enum keys in English for D1. */

import { en } from "#/i18n/en";
import { zh } from "#/i18n/zh";
import type { Locale } from "#/i18n";

const dictionaries = { zh, en } as const;

export function statusLabel(
  status: string | null | undefined,
  locale: Locale = "zh",
): string {
  if (!status) return "—";
  const map = dictionaries[locale].status as Record<string, string>;
  return map[status] ?? status;
}
