import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { fadeInTransition, fadeInUp, staggerContainer } from "#/lib/animations";
import { product } from "#/lib/data";
import { Avatar, WindowChrome } from "../ui";

const feed = [
  { title: "备耕贷 · 申请中", meta: "¥48万 · 番茄棚", tone: "amber" as const },
  { title: "货盘上架 · 黄瓜批次", meta: "2.4吨 · 已联系", tone: "emerald" as const },
  { title: "早疫病 SOP", meta: "华东 · 已核验", tone: "blue" as const },
  { title: "预约：棚室巡诊", meta: "周二 09:00 · 林薇", tone: "violet" as const },
  { title: "买家需求 · 苹果", meta: "城鲜 · 待回", tone: "slate" as const },
  { title: "新问：肥水漂移", meta: "已派专家", tone: "rose" as const },
];

function FinanceWindow() {
  return (
    <WindowChrome
      title="融资 · 申请"
      className="interactive-window"
      trailing={<span className="live-dot" />}
    >
      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between rounded-lg border border-[#E8DFD0] bg-[#F7F0E4] px-2.5 py-2 text-[12px]">
          <span className="text-[#6F6558]">备耕贷 · 东棚合作社</span>
          <span className="badge badge-warn">申请中</span>
        </div>
        {[
          ["用途", "农资 + 棚膜"],
          ["金额", "¥480,000"],
          ["产区", "华东 · 番茄"],
        ].map(([t, s]) => (
          <div
            key={t}
            className="flex items-center justify-between rounded-lg border border-[#E8DFD0] bg-[#FFFBF4] px-3 py-2.5 transition hover:border-[#D4C7B0] hover:shadow-sm"
          >
            <div className="text-[12px] text-[#6F6558]">{t}</div>
            <div className="text-num text-[13px] font-medium text-[#1C1712]">{s}</div>
          </div>
        ))}
        <div className="rounded-lg border border-dashed border-[#D4C7B0] px-3 py-2 text-[11px] text-[#6F6558]">
          银行席可见 · 留痕可审
        </div>
      </div>
    </WindowChrome>
  );
}

function MarketWindow() {
  const [phase, setPhase] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 3), 2200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);
  const labels = ["上架批次…", "买家浏览中…", "已联系"];
  const shownPhase = reduceMotion ? 2 : phase;
  return (
    <WindowChrome title="货盘 · 上架" dark className="interactive-window">
      <div className="space-y-3 p-3 text-[12.5px]">
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
              </span>
            ) : (
              "城鲜采购：要量、要新鲜度证明，今天下午能装吗？"
            )}
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-[11px] text-[#F7F0E4]/55">
          <span>{labels[shownPhase]}</span>
          <span className="badge badge-success !border-[#7BC4A0]/30 !bg-[#7BC4A0]/15 !text-[#7BC4A0]">
            货盘
          </span>
        </div>
      </div>
    </WindowChrome>
  );
}

function BookWindow() {
  const reduceMotion = useReducedMotion();
  return (
    <WindowChrome title="专家 · 预约" className="interactive-window">
      <div className="p-3">
        <div className="mb-2 text-[12px] font-medium text-[#1C1712]">
          棚室病害巡诊
        </div>
        <div className="mb-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-[#F7F0E4] px-2.5 py-2 text-[#4A433A]">
            周二 · 09:00
          </div>
          <div className="rounded-lg bg-[#F7F0E4] px-2.5 py-2 text-[#4A433A]">
            60 分 · 远程
          </div>
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
            el.textContent = "已确认";
            if (reduceMotion) return;
            window.setTimeout(() => {
              el.textContent = "确认预约";
            }, 1600);
          }}
        >
          确认预约
        </button>
      </div>
    </WindowChrome>
  );
}

function FeedWindow() {
  return (
    <WindowChrome
      title="经营动态"
      className="interactive-window max-h-[220px]"
      trailing={<span className="text-[10px] font-medium text-[#0F4D35]">流动中</span>}
    >
      <div className="relative h-[170px] overflow-hidden">
        <div className="flow-list space-y-2 p-3">
          {[...feed, ...feed].map((item, i) => (
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
  return (
    <section className="relative overflow-hidden pb-10 pt-20 md:pt-24">
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
              钱、货、技术，
              <br />
              一张台子办成
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={fadeInTransition}
              className="text-body mx-auto mb-8 max-w-[520px]"
            >
              借得到 · 卖得出 · 问得着。季节前钱不卡、货有出路、出事有人答——给土老板和合作社的经营台。
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={fadeInTransition}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Link to="/app" className="btn-primary">
                进经营台
              </Link>
              <Link to="/app/market/sell" className="btn-secondary">
                有货上架
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}
