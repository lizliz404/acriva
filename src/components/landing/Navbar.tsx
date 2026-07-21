import { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Link } from "@tanstack/react-router";
import { LogoMark } from "../ui";

const NAV_LINKS = [
  { label: "三结果", href: "#platform" },
  { label: "对手方", href: "#customers" },
  { label: "进台", href: "#pricing" },
] as const;

const EXPANDED_EXTRA = [{ label: "更新", href: "#resources" }] as const;

const spring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
  mass: 0.85,
};
const softFade = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 36;
      setCompact((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const transition = reduceMotion ? { duration: 0 } : spring;
  const itemTransition = reduceMotion ? { duration: 0 } : softFade;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4">
      <LayoutGroup id="nav-island">
        <div className="pointer-events-auto relative flex w-full max-w-[min(100%,760px)] flex-col items-center">
          <motion.nav
            layout
            layoutRoot
            aria-label="主导航"
            transition={transition}
            className={`nav-island flex items-center border border-[#1C1712]/[0.08] bg-[#FFFBF4]/92 shadow-[0_8px_30px_rgba(28,23,18,0.08)] backdrop-blur-xl ${
              compact
                ? "h-11 gap-1 rounded-[14px] px-2.5 sm:gap-1.5 sm:px-3"
                : "h-14 gap-2 rounded-[16px] px-3 sm:gap-3 sm:px-5"
            } ${mobileOpen ? "shadow-[0_12px_40px_rgba(28,23,18,0.12)]" : ""}`}
          >
            <motion.a
              layout
              href="#"
              className="shrink-0 text-[#1C1712]"
              transition={transition}
              onClick={() => setMobileOpen(false)}
            >
              <LogoMark
                showZh={!compact}
                className={
                  compact
                    ? "[&>span>span:first-child]:text-[13px] sm:[&>span>span:first-child]:text-[14px] [&>svg]:h-[18px] [&>svg]:w-[18px]"
                    : ""
                }
              />
            </motion.a>

            <motion.div
              layout
              className="hidden min-w-0 items-center md:flex"
              transition={transition}
            >
              <div
                className={`flex items-center ${compact ? "gap-0.5" : "gap-0.5 sm:gap-1"}`}
              >
                {NAV_LINKS.map((item) => (
                  <motion.a
                    key={item.href}
                    layout
                    href={item.href}
                    transition={transition}
                    className={`rounded-[10px] font-medium text-[#6F6558] transition-colors hover:bg-[#1C1712]/[0.04] hover:text-[#1C1712] ${
                      compact
                        ? "px-2.5 py-1.5 text-[13px]"
                        : "px-3 py-1.5 text-sm"
                    }`}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <AnimatePresence initial={false}>
                  {!compact &&
                    EXPANDED_EXTRA.map((item) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={itemTransition}
                        className="overflow-hidden whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-medium text-[#6F6558] hover:bg-[#1C1712]/[0.04] hover:text-[#1C1712]"
                      >
                        {item.label}
                      </motion.a>
                    ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
              <AnimatePresence initial={false}>
                {!compact && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={itemTransition}
                    className="hidden overflow-hidden sm:block"
                  >
                    <Link
                      to="/app"
                      className="whitespace-nowrap rounded-[10px] px-3 py-1.5 text-sm font-medium text-[#6F6558] hover:bg-[#1C1712]/[0.04] hover:text-[#1C1712]"
                    >
                      登录
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              <Link
                to="/app"
                className={`rounded-[12px] bg-[#0F4D35] font-semibold text-[#FFFBF4] transition hover:bg-[#146b4a] ${
                  compact
                    ? "px-3 py-1.5 text-[13px]"
                    : "px-3.5 py-2 text-sm"
                }`}
              >
                进经营台
              </Link>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-[#6F6558] hover:bg-[#1C1712]/[0.04] md:hidden"
                aria-label="菜单"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span className="text-lg leading-none">{mobileOpen ? "×" : "☰"}</span>
              </button>
            </div>
          </motion.nav>

          <AnimatePresence>
            {mobileOpen && (
              <>
                <motion.button
                  type="button"
                  aria-label="关闭菜单"
                  className="fixed inset-0 z-40 bg-[#1C1712]/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={itemTransition}
                  className="absolute top-[calc(100%+8px)] z-50 w-full max-w-sm rounded-2xl border border-[#E8DFD0] bg-[#FFFBF4]/95 p-2 shadow-[0_16px_40px_rgba(28,23,18,0.12)] backdrop-blur-xl"
                >
                  {[...NAV_LINKS, ...EXPANDED_EXTRA].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#6F6558] hover:bg-[#1C1712]/[0.04] hover:text-[#1C1712]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Link
                    to="/app"
                    className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#0F4D35] hover:bg-[#E3F0E8]"
                    onClick={() => setMobileOpen(false)}
                  >
                    进经营台
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </header>
  );
}
