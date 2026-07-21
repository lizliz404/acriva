import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { sectionInView } from "#/lib/animations";
import { scaleItems } from "#/lib/data";

const cards = [
  {
    title: "借得到",
    body: "备耕贷、农资贷在线申请，联保匹配，银行过审留痕——季节前钱不卡。",
    href: "/app/finance" as const,
    cta: "去融资席",
  },
  {
    title: "卖得出",
    body: "货盘上架、买家浏览下单、需求对接——货有价、有量、能联系。",
    href: "/app/market/sell" as const,
    cta: "有货上架",
  },
  {
    title: "问得着",
    body: "知识、问答、预约同一队列——出事有人答，好回答能沉淀。",
    href: "/app/ask" as const,
    cta: "去提问",
  },
];

export function FeatureCards() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <motion.div {...sectionInView} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-eyebrow">融 · 销 · 通</span>
          <h2 className="text-section mt-4">三个结果，一张台子</h2>
          <p className="text-body mt-4">
            融销通把钱、货、专家问诊放在同一经营台。身份共用、席位分流、状态机按模块——不是三个孤儿小程序。
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="surface-card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="mb-3 text-[12px] font-semibold tracking-wide text-[#0F4D35]">
                结果
              </div>
              <h3 className="text-[17px] font-semibold tracking-tight text-[#1C1712]">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#4A433A]">
                {card.body}
              </p>
              <Link
                to={card.href}
                className="mt-4 inline-flex text-[13px] font-semibold text-[#0F4D35] transition hover:text-[#146b4a]"
              >
                {card.cta} →
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scaleItems.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[#E8DFD0] bg-[#FFFBF4] px-4 py-4"
            >
              <div className="text-[14px] font-semibold text-[#1C1712]">{item.title}</div>
              <div className="mt-1 text-[13px] text-[#6F6558]">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
