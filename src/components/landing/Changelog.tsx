import { motion } from "framer-motion";
import { changelogItems } from "#/lib/data";
import { sectionInView } from "#/lib/animations";

export function Changelog() {
  return (
    <section id="resources" className="py-24 md:py-28">
      <div className="container-page">
        <motion.div {...sectionInView} className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-eyebrow">Changelog</span>
            <h2 className="text-section mt-3">Evolving with the season.</h2>
          </div>
          <p className="max-w-sm text-[14px] text-[#737373]">
            Product updates framed as value — not a dump of tickets.
          </p>
        </motion.div>
        <div className="grid gap-3 md:grid-cols-2">
          {changelogItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start justify-between gap-4 rounded-xl border border-[#ececec] bg-white px-4 py-4"
            >
              <div>
                <div className="text-[12px] text-[#a3a3a3]">{item.date}</div>
                <div className="mt-1 text-[15px] font-semibold text-[#0a0a0a]">{item.title}</div>
                <div className="mt-1 text-[13px] text-[#525252]">{item.desc}</div>
              </div>
              <span className="badge badge-neutral shrink-0">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
