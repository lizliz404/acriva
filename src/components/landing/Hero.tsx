import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { fadeInTransition, fadeInUp, staggerContainer } from "#/lib/animations";
import { product } from "#/lib/data";
import { useI18n } from "#/i18n";
import { AuditTrailStrip, Avatar, WindowChrome } from "../ui";

/*
 * DESIGN.md §2.4 — anti–tea-gift-box (landing hero collage):
 * Keep ledger density + geometric sans + result CTAs. Avoid calligraphy,
 * vermilion ink-rubbing, zen whitespace, or gilt borders that read as gift packaging.
 */

const feedZh = [
  { title: "备耕贷 · 申请中", meta: "¥48万 · 番茄棚", tone: "amber" as const },
  { title: "货盘上架 · 黄瓜批次", meta: "2.4吨 · 已联系", tone: "emerald" as const },
  { title: "早疫病 SOP", meta: "华东 · 已核验", tone: "blue" as const },
  { title: "预约：棚室巡诊", meta: "周二 09:00 · 林薇", tone: "violet" as const },
  { title: "买家需求 · 苹果", meta: "城鲜 · 待回", tone: "slate" as const },
  { title: "新问：肥水漂移", meta: "已派专家", tone: "rose" as const },
];

const feedEn = [
  { title: "Season loan · in review", meta: "¥480k · tomato house", tone: "amber" as const },
  { title: "Listed · cucumber batch", meta: "2.4 t · contacted", tone: "emerald" as const },
  { title: "Early blight SOP", meta: "East China · verified", tone: "blue" as const },
  { title: "Booked: greenhouse visit", meta: "Tue 09:00 · 林薇", tone: "violet" as const },
  { title: "Buyer demand · apple", meta: "城鲜 · awaiting", tone: "slate" as const },
  { title: "New Q: fertigation drift", meta: "Expert assigned", tone: "rose" as const },
];

function FinanceWindow() {
  const { t, locale } = useI18n();
  return (
    <WindowChrome
      title={t.collage.financeTitle}
      className="interactive-window"
      trailing={<span className="live-dot" />}
    >
      <div className="space-y-2 p-3 pb-8">
        <div className="flex items-center justify-between rounded-lg border border-[#E8DFD0] bg-[#F7F0E4] px-2.5 py-2 text-[12px]">
          <span className="text-[#6F6558]">
            {locale === "zh" ? "备耕贷 · 东棚合作社" : "Season loan · 东棚合作社"}
          </span>
          <span className="badge badge-warn">{t.collage.applying}</span>
        </div>
        {(
          [
            [t.collage.purpose, locale === "zh" ? "农资 + 棚膜" : "Inputs + film"],
            [t.collage.amount, "¥480,000"],
            [t.collage.region, locale === "zh" ? "华东 · 番茄" : "East China · tomato"],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-[#E8DFD0] bg-[#FFFBF4] px-3 py-2.5 transition hover:border-[#D4C7B0] hover:shadow-sm"
          >
            <div className="text-[12px] text-[#6F6558]">{label}</div>
            <div className="text-num text-[13px] font-medium text-[#1C1712]">{value}</div>
          </div>
        ))}
        <div className="rounded-lg border border-dashed border-[#D4C7B0] px-3 py-2 text-[11px] text-[#6F6558]">
          {t.collage.bankVisible}
        </div>
      </div>
      <AuditTrailStrip batch="#A-2607" time="14:32" operator="合作社-陈" />
    </WindowChrome>
  );
}

function MarketWindow() {
  const { t } = useI18n();
  const [phase, setPhase] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 3), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);
  const labels = [t.collage.listing, t.collage.browsing, t.collage.contacted];
  const shownPhase = reduceMotion ? 2 : phase;
  return (
    <WindowChrome title={t.collage.marketTitle} dark className="interactive-window">
      <div className="space-y-3 p-3 pb-8 text-[12.5px]">
        <div className="rounded-lg bg-white/8 px-3 py-2 text-[#F7F0E4]/90">
          黄瓜 · 批次 C-0721 · 2.4 吨 · ¥3.2/斤
        </div>
        <div className="flex items-start gap-2">
          <Avatar initials="城" tone="amber" size="sm" />
          <div className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-[#F7F0E4]/80">
            {shownPhase < 2 ? (
              <span className="inline-flex items-center gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="ml-1">{labels[shownPhase]}</span>
              </span>
            ) : (
              labels[2]
            )}
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

function BookWindow() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  return (
    <WindowChrome title={t.collage.bookTitle} className="interactive-window">
      <div className="p-3 pb-8">
        <div className="mb-2 text-[12px] font-medium text-[#1C1712]">棚室病害巡诊</div>
        <div className="mb-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-[#F7F0E4] px-2.5 py-2 text-[#4A433A]">周二 · 09:00</div>
          <div className="rounded-lg bg-[#F7F0E4] px-2.5 py-2 text-[#4A433A]">60 分 · 远程</div>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <Avatar initials="林" tone="emerald" size="sm" />
          <div className="text-[12px]">
            <div className="font-medium text-[#1C1712]">林薇 老师</div>
            <div className="text-[#6F6558]">植物病理</div>
          </div>
        </div>
        <button
          type="button"
          className="btn-primary w-full !py-2 text-[12px]"
          onClick={(e) => {
            const el = e.currentTarget;
            el.textContent = t.collage.confirmed;
            if (reduceMotion) return;
            window.setTimeout(() => {
              el.textContent = t.collage.confirmBook;
            }, 1600);
          }}
        >
          {t.collage.confirmBook}
        </button>
      </div>
      <AuditTrailStrip batch="#B-0719" time="09:12" operator="专家-林" />
    </WindowChrome>
  );
}

function FeedWindow() {
  const { t, locale } = useI18n();
  const reduceMotion = useReducedMotion();
  const feed = locale === "zh" ? feedZh : feedEn;
  const items = reduceMotion ? feed : [...feed, ...feed];
  return (
    <WindowChrome
      title={t.collage.feedTitle}
      className="interactive-window max-h-[220px]"
      trailing={
        <span className="text-[10px] font-medium text-[#0F4D35]">{t.collage.live}</span>
      }
    >
      <div className="relative h-[170px] overflow-hidden">
        <div className={`space-y-2 p-3 ${reduceMotion ? "" : "flow-list"}`}>
          {items.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="flex items-center gap-2 rounded-lg border border-[#E8DFD0] bg-[#FFFBF4] px-2.5 py-2"
            >
              <Avatar initials={item.title.slice(0, 1)} tone={item.tone} size="sm" />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-medium text-[#1C1712]">
                  {item.title}
                </div>
                <div className="truncate text-[10px] text-[#6F6558]">{item.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WindowChrome>
  );
}

export function HeroCollage() {
  return (
    <div className="relative mx-auto mt-12 max-w-[980px]">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(227,240,232,0.7),transparent_65%)]" />
      <div className="grid gap-4 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="md:col-span-5"
        >
          <FinanceWindow />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="md:col-span-4 md:mt-8"
        >
          <MarketWindow />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="md:col-span-3"
        >
          <div className="space-y-4">
            <BookWindow />
            <div className="hidden md:block">
              <FeedWindow />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  return (
    <section id="hero" className="relative overflow-hidden pb-10 pt-20 md:pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(255,251,244,0.95),transparent_60%)]" />
      <div className="container-page">
        <div className="mx-auto max-w-[760px] text-center">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.div
              variants={fadeInUp}
              transition={fadeInTransition}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E8DFD0] bg-[#FFFBF4]/80 px-3 py-1.5 text-[13px] font-medium text-[#4A433A] shadow-sm backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9892E]" />
              {product.zhName} · {product.name}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={fadeInTransition}
              className="text-hero mb-5"
            >
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={fadeInTransition}
              className="text-body mx-auto mb-8 max-w-[520px]"
            >
              {t.hero.body}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={fadeInTransition}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Link to="/app" className="btn-primary">
                {t.hero.ctaPrimary}
              </Link>
              <Link to="/app/market/sell" className="btn-secondary">
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}
