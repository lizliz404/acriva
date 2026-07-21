import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { tabs } from "#/lib/data";
import { sectionInView } from "#/lib/animations";
import { PlatformMock } from "./PlatformMock";

export function PlatformTabs() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="platform" className="py-20 md:py-24">
      <div className="container-page">
        <motion.div {...sectionInView} className="mx-auto mb-14 max-w-[820px] text-center">
          <span className="text-eyebrow">三结果</span>
          <h2 className="text-section mt-4">
            借得到 · 卖得出 · 问得着
            <br />
            <span className="text-[#6F6558]">
              不讲模块名，讲你这季能不能办成。
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
          <motion.nav
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            aria-label="三结果分镜"
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {tabs.map((tab) => {
              const on = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={`relative shrink-0 rounded-[12px] px-3.5 py-2.5 text-left text-[14px] font-medium transition-all duration-200 ${
                    on
                      ? "bg-[#0F4D35] text-[#FFFBF4] shadow-sm"
                      : "text-[#4A433A] hover:bg-[#E8DFD0] hover:text-[#1C1712]"
                  }`}
                  aria-pressed={on}
                >
                  {tab.label}
                </button>
              );
            })}
          </motion.nav>

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid items-start gap-8 xl:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="max-w-xl">
                  <h3 className="text-subsection mb-4 leading-snug">{current.title}</h3>
                  <h4 className="mb-2 text-[17px] font-medium tracking-tight text-[#1C1712]">
                    {current.subtitle}
                  </h4>
                  <p className="text-body">{current.description}</p>
                </div>
                <PlatformMock tabId={current.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
