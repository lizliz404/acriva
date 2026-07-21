import { motion } from "framer-motion";
import { changelogItems } from "#/lib/data";
import { sectionInView } from "#/lib/animations";

export function Changelog() {
  return (
    <section id="resources" className="py-20 md:py-24">
      <div className="container-page">
        <motion.div {...sectionInView} className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-eyebrow">更新</span>
            <h2 className="text-section mt-3">跟着季节往前赶</h2>
          </div>
          <p className="max-w-sm text-[14px] text-[#6F6558]">
            按能办事的价值写，不堆工单号。
          </p>
        </motion.div>
        <div className="grid gap-3 md:grid-cols-2">
          {changelogItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start justify-between gap-4 rounded-xl border border-[#E8DFD0] bg-[#FFFBF4] px-4 py-4"
            >
              <div>
                <div className="text-[12px] text-[#6F6558]">{item.date}</div>
                <div className="mt-1 text-[15px] font-semibold text-[#1C1712]">{item.title}</div>
                <div className="mt-1 text-[13px] text-[#4A433A]">{item.desc}</div>
              </div>
              <span className="badge badge-neutral shrink-0">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
