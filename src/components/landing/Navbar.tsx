import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Link } from "@tanstack/react-router";
import { LogoMark } from "../ui";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useI18n } from "#/i18n";

const spring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 32,
  mass: 0.85,
};
const softFade = { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const };

type NavState = "full" | "transitioning" | "compact";

function resolveNavState(
  heroIntersecting: boolean,
  scrollY: number,
): NavState {
  if (!heroIntersecting) return "compact";
  if (scrollY === 0) return "full";
  return "transitioning";
}

export function Navbar() {
  const { t } = useI18n();
  const [navState, setNavState] = useState<NavState>("full");
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroIntersectingRef = useRef(true);
  const reduceMotion = useReducedMotion();
  const compact = navState === "compact";

  const navLinks = [
    { label: t.nav.platform, href: "#platform" },
    { label: t.nav.customers, href: "#customers" },
    { label: t.nav.pricing, href: "#pricing" },
  ] as const;
  const expandedExtra = [{ label: t.nav.resources, href: "#resources" }] as const;

  useEffect(() => {
    const hero = document.getElementById("hero");

    const sync = () => {
      const next = resolveNavState(
        heroIntersectingRef.current,
        window.scrollY,
      );
      setNavState((prev) => (prev === next ? prev : next));
    };

    if (!hero) {
      const onScroll = () => {
        const scrollY = window.scrollY;
        const heroOut = scrollY > window.innerHeight * 0.85;
        heroIntersectingRef.current = !heroOut;
        sync();
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        heroIntersectingRef.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0, rootMargin: "0px" },
    );
    io.observe(hero);
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sync);
    };
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
  const itemMorph =
    navState === "transitioning" && !reduceMotion
      ? { opacity: 0.88, scale: 0.98 }
      : { opacity: 1, scale: 1 };

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex ${
        navState === "full" ? "" : "justify-center px-3 pt-3 sm:pt-4"
      }`}
    >
      <LayoutGroup id="nav-island">
        <motion.div
          layout
          transition={transition}
          className={`pointer-events-auto relative flex flex-col ${
            navState === "full"
              ? "w-full"
              : "w-full max-w-[min(100%,760px)] items-center"
          }`}
        >
          <motion.nav
            layout
            layoutRoot
            aria-label={t.nav.aria}
            transition={transition}
            animate={{
              borderRadius: navState === "full" ? 0 : navState === "compact" ? 14 : 10,
            }}
            className={`nav-island flex items-center ${
              navState === "full"
                ? "h-14 w-full gap-2 border-x-0 border-b border-t-0 border-[#1C1712]/[0.08] bg-[#FFFBF4] px-4 shadow-none sm:gap-3 sm:px-6 lg:px-8"
                : navState === "compact"
                  ? "h-11 gap-1 border border-[#1C1712]/[0.08] bg-[#FFFBF4]/92 px-2.5 shadow-[0_8px_30px_rgba(28,23,18,0.08)] backdrop-blur-xl sm:gap-1.5 sm:px-3"
                  : "h-12 gap-1.5 border border-[#1C1712]/[0.08] bg-[#FFFBF4]/96 px-3 shadow-[0_6px_24px_rgba(28,23,18,0.06)] backdrop-blur-xl sm:gap-2 sm:px-4"
            } ${mobileOpen ? "shadow-[0_12px_40px_rgba(28,23,18,0.12)]" : ""}`}
          >
            <motion.a
              layout
              href="#"
              className="shrink-0 text-[#1C1712]"
              transition={transition}
              animate={itemMorph}
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
              animate={itemMorph}
            >
              <div
                className={`flex items-center ${compact ? "gap-0.5" : "gap-0.5 sm:gap-1"}`}
              >
                {navLinks.map((item) => (
                  <motion.a
                    key={item.href}
                    layout
                    href={item.href}
                    transition={transition}
                    animate={itemMorph}
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
                    expandedExtra.map((item) => (
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
              <LanguageSwitcher compact={compact} />
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
                      {t.nav.demo}
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
                {t.nav.enterDesk}
              </Link>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] text-[#6F6558] hover:bg-[#1C1712]/[0.04] md:hidden"
                aria-label={t.nav.menu}
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
                  aria-label={t.nav.closeMenu}
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
                  {[...navLinks, ...expandedExtra].map((item) => (
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
                    {t.nav.enterDesk}
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </header>
  );
}
