import { motion } from "framer-motion";
import { customerStories } from "#/lib/data";
import { sectionInView } from "#/lib/animations";

export function CustomerStories() {
  return (
    <section id="customers" className="border-t border-[#E8DFD0] bg-[#F7F0E4] py-20 md:py-24">
      <div className="container-page">
        <motion.div {...sectionInView} className="mb-12 max-w-2xl">
          <span className="text-eyebrow">对手方故事</span>
          <h2 className="text-section mt-4">合作社 · 农商行 · 采购，各有可对的结果</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customerStories.map((story, i) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="surface-card flex flex-col justify-between p-6"
            >
              <div>
                <div className="text-[12px] font-medium tracking-wide text-[#6F6558]">
                  {story.category}
                </div>
                <h3 className="mt-3 text-[18px] font-medium leading-snug tracking-tight text-[#1C1712]">
                  {story.headline}
                </h3>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <span className="text-[14px] font-semibold text-[#1C1712]">{story.name}</span>
                <span className="text-[13px] font-medium text-[#0F4D35]">{story.metric}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
