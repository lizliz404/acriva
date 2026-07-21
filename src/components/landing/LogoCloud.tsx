import { motion } from "framer-motion";
import { trustSeats } from "#/lib/data";
import { sectionInView } from "#/lib/animations";

export function LogoCloud() {
  return (
    <section className="border-y border-[#E8DFD0] py-12">
      <div className="container-page">
        <motion.p
          {...sectionInView}
          className="mb-8 text-center text-[13px] font-medium text-[#6F6558]"
        >
          谁在一台子上 —— 四席同台，状态看得见
        </motion.p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustSeats.map((item) => (
            <div
              key={item.seat}
              className="rounded-[14px] border border-[#E8DFD0] bg-[#FFFBF4] px-4 py-4 text-center transition hover:border-[#D4C7B0]"
            >
              <div className="text-[15px] font-semibold tracking-tight text-[#1C1712]">
                {item.seat}
              </div>
              <div className="mt-1.5 text-[12px] text-[#6F6558]">{item.line}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
