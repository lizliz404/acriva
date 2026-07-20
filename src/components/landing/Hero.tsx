import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { fadeInTransition, fadeInUp, staggerContainer } from "#/lib/animations";
import { Avatar, WindowChrome } from "../ui";

const feed = [
  { title: "Tomato early blight SOP", meta: "East China · verified", tone: "emerald" as const },
  { title: "Cucumber EC tip-burn thread", meta: "Open · 14m", tone: "amber" as const },
  { title: "Rice sheath blight window", meta: "Yangtze · published", tone: "blue" as const },
  { title: "Booked: high-tunnel walkthrough", meta: "Tue 09:00 · Lin Wei", tone: "violet" as const },
  { title: "Apple thinning protocol", meta: "In review", tone: "slate" as const },
  { title: "New Q: fertigation drift", meta: "Assigned", tone: "rose" as const },
];

function KnowledgeWindow() {
  return (
    <WindowChrome
      title="Knowledge · tomato"
      className="interactive-window"
      trailing={<span className="live-dot" />}
    >
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2 rounded-lg border border-[#ececec] bg-[#fafafa] px-2.5 py-2 text-[12px] text-[#737373]">
          Search crop, region, protocol…
        </div>
        {[
          ["Early blight scouting", "Tomato · East China"],
          ["Canopy airflow checklist", "High tunnel"],
          ["Protectant spray ladder", "Verified"],
        ].map(([t, s]) => (
          <div
            key={t}
            className="rounded-lg border border-[#ececec] bg-white px-3 py-2.5 transition hover:border-[#d4d4d4] hover:shadow-sm"
          >
            <div className="text-[13px] font-medium text-[#0a0a0a]">{t}</div>
            <div className="mt-0.5 text-[11px] text-[#737373]">{s}</div>
          </div>
        ))}
      </div>
    </WindowChrome>
  );
}

function QAWindow() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setPhase((p) => (p + 1) % 3), 2200);
    return () => window.clearInterval(id);
  }, []);
  const labels = ["Drafting context…", "Routing to agronomist…", "Answer queued"];
  return (
    <WindowChrome title="Ask expert" dark className="interactive-window">
      <div className="space-y-3 p-3 text-[12.5px]">
        <div className="rounded-lg bg-white/8 px-3 py-2 text-white/85">
          Yellow V-shaped lesions after rain — early blight?
        </div>
        <div className="flex items-start gap-2">
          <Avatar initials="LW" tone="emerald" size="sm" />
          <div className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-white/80">
            {phase < 2 ? (
              <span className="inline-flex items-center gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </span>
            ) : (
              "Matches early blight. Pull SOP k1 and improve morning airflow."
            )}
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-[11px] text-white/55">
          <span>{labels[phase]}</span>
          <span className="badge badge-success !bg-emerald-500/15 !text-emerald-300 !border-emerald-500/20">
            live
          </span>
        </div>
      </div>
    </WindowChrome>
  );
}

function BookWindow() {
  return (
    <WindowChrome title="Book consult" className="interactive-window">
      <div className="p-3">
        <div className="mb-2 text-[12px] font-medium text-[#0a0a0a]">
          High-tunnel disease walkthrough
        </div>
        <div className="mb-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-lg bg-[#f4f4f5] px-2.5 py-2 text-[#525252]">
            Tue · 09:00
          </div>
          <div className="rounded-lg bg-[#f4f4f5] px-2.5 py-2 text-[#525252]">
            60 min · remote
          </div>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <Avatar initials="LW" tone="emerald" size="sm" />
          <div className="text-[12px]">
            <div className="font-medium text-[#0a0a0a]">Dr. Lin Wei</div>
            <div className="text-[#737373]">Plant pathology</div>
          </div>
        </div>
        <button
          type="button"
          className="btn-primary w-full !py-2 text-[12px]"
          onClick={(e) => {
            const el = e.currentTarget;
            el.textContent = "Confirmed";
            window.setTimeout(() => {
              el.textContent = "Confirm slot";
            }, 1600);
          }}
        >
          Confirm slot
        </button>
      </div>
    </WindowChrome>
  );
}

function FeedWindow() {
  return (
    <WindowChrome
      title="Field signals"
      className="interactive-window max-h-[220px]"
      trailing={<span className="text-[10px] font-medium text-[#16a34a]">idle flow</span>}
    >
      <div className="relative h-[170px] overflow-hidden">
        <div className="flow-list space-y-2 p-3">
          {[...feed, ...feed].map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              className="flex items-center gap-2 rounded-lg border border-[#ececec] bg-white px-2.5 py-2"
            >
              <Avatar initials={item.title.slice(0, 1)} tone={item.tone} size="sm" />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-medium text-[#0a0a0a]">
                  {item.title}
                </div>
                <div className="truncate text-[10px] text-[#737373]">{item.meta}</div>
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
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(220,252,231,0.55),transparent_65%)]" />
      <div className="grid gap-4 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="md:col-span-5"
        >
          <KnowledgeWindow />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="md:col-span-4 md:mt-8"
        >
          <QAWindow />
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
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent_60%)]" />
      <div className="container-page">
        <div className="mx-auto max-w-[720px] text-center">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.a
              href="#platform"
              variants={fadeInUp}
              transition={fadeInTransition}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-white/80 px-3 py-1.5 text-[13px] font-medium text-[#525252] shadow-sm backdrop-blur transition hover:border-[#d4d4d4] hover:text-[#0a0a0a]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Finance, market, and expert booking in one desk
              <span aria-hidden className="text-[#a3a3a3]">
                →
              </span>
            </motion.a>

            <motion.h1
              variants={fadeInUp}
              transition={fadeInTransition}
              className="text-hero mb-5"
            >
              Capital, commerce, and counsel.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={fadeInTransition}
              className="text-body mx-auto mb-8 max-w-[480px]"
            >
              Acriva is the grower desk for finance, market, and expert
              services — fund the season, move crop, and get answers without
              three disconnected apps.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={fadeInTransition}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Link to="/app" className="btn-primary">
                Open the desk
              </Link>
              <a href="#platform" className="btn-secondary">
                See how it works
              </a>
            </motion.div>
          </motion.div>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}
