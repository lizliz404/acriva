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
  { label: "Platform", href: "#platform" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
] as const;

const EXPANDED_EXTRA = [{ label: "Resources", href: "#resources" }] as const;

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
        <div className="pointer-events-auto relative flex w-full max-w-[min(100%,720px)] flex-col items-center">
          <motion.nav
            layout
            layoutRoot
            aria-label="Primary"
            transition={transition}
            className={`nav-island flex items-center border border-black/[0.06] bg-white/92 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl ${
              compact
                ? "h-11 gap-1 rounded-full px-2.5 sm:gap-1.5 sm:px-3"
                : "h-14 gap-2 rounded-full px-3 sm:gap-3 sm:px-5"
            } ${mobileOpen ? "shadow-[0_12px_40px_rgba(0,0,0,0.12)]" : ""}`}
            style={{ borderRadius: 9999 }}
          >
            <motion.a
              layout
              href="#"
              className="shrink-0 text-[#0a0a0a]"
              transition={transition}
              onClick={() => setMobileOpen(false)}
            >
              <LogoMark
                className={
                  compact
                    ? "[&>span]:text-[13px] sm:[&>span]:text-[14px] [&>svg]:h-[18px] [&>svg]:w-[18px]"
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
                    className={`rounded-full font-medium text-[#525252] transition-colors hover:bg-black/[0.04] hover:text-[#0a0a0a] ${
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
                        className="overflow-hidden whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-[#525252] hover:bg-black/[0.04] hover:text-[#0a0a0a]"
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
                      className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-[#525252] hover:bg-black/[0.04] hover:text-[#0a0a0a]"
                    >
                      Sign in
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              <Link
                to="/app"
                className={`rounded-full bg-[#0a0a0a] font-medium text-white transition hover:bg-[#262626] ${
                  compact
                    ? "px-3 py-1.5 text-[13px]"
                    : "px-3.5 py-2 text-sm"
                }`}
              >
                Start for free
              </Link>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#525252] hover:bg-black/[0.04] md:hidden"
                aria-label="Menu"
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
                  aria-label="Close menu"
                  className="fixed inset-0 z-40 bg-black/20"
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
                  className="absolute top-[calc(100%+8px)] z-50 w-full max-w-sm rounded-2xl border border-black/[0.06] bg-white/95 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl"
                >
                  {[...NAV_LINKS, ...EXPANDED_EXTRA].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#525252] hover:bg-black/[0.04] hover:text-[#0a0a0a]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <Link
                    to="/app"
                    className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium text-[#0a0a0a] hover:bg-black/[0.04]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Open app
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
