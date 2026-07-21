import { motion } from "framer-motion";
import { sectionInView } from "#/lib/animations";
import { WindowChrome } from "../ui";

export function DarkFeature() {
  return (
    <section className="bg-[#1C1712] py-20 text-[#F7F0E4] md:py-24">
      <div className="container-page">
        <div className="mb-1 h-px w-16 bg-[#C9892E]/80" aria-hidden />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...sectionInView}>
            <span className="text-eyebrow !text-[#C9892E]">一张台怎么转</span>
            <h2 className="text-section mt-4 !text-[#F7F0E4]">
              备耕贷 → 上架 → 问诊 → 回款
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#F7F0E4]/65">
              跟着季节走，不讲架构图。钱先落地，货有出路，出事有人答，回款能对上批次。
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-[#F7F0E4]/80">
              {[
                "申请中 / 过审 / 放款 —— 银行席留痕",
                "货盘上架、买家联系、订单扣库存",
                "问答与预约进同一专家队列",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9892E]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <WindowChrome title="季节故事 · 本季" dark className="interactive-window">
              <div className="space-y-2 p-3 text-[12.5px]">
                {[
                  {
                    k: "融资",
                    t: "备耕贷申请 · ¥48万",
                    s: "过审 · 可放款",
                  },
                  {
                    k: "货销",
                    t: "黄瓜批次上架 2.4 吨",
                    s: "已联系买家",
                  },
                  {
                    k: "专家",
                    t: "棚室巡诊预约",
                    s: "周二 09:00",
                  },
                ].map((row) => (
                  <div
                    key={row.t}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 hover:bg-white/[0.07]"
                  >
                    <div className="text-[10px] font-medium tracking-wider text-[#C9892E]/90">
                      {row.k}
                    </div>
                    <div className="mt-1 font-medium text-[#F7F0E4]/90">{row.t}</div>
                    <div className="text-[11px] text-[#7BC4A0]">{row.s}</div>
                  </div>
                ))}
              </div>
            </WindowChrome>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
