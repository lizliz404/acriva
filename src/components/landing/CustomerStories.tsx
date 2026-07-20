import { motion } from "framer-motion";
import { customerStories } from "#/lib/data";
import { sectionInView } from "#/lib/animations";

export function CustomerStories() {
  return (
    <section id="customers" className="border-t border-[#ececec] bg-[#f7f7f7] py-24 md:py-28">
      <div className="container-page">
        <motion.div {...sectionInView} className="mb-12 max-w-2xl">
          <span className="text-eyebrow">Customers</span>
          <h2 className="text-section mt-4">Teams that turned field chaos into a desk.</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2">
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
                <div className="text-[12px] font-medium uppercase tracking-wide text-[#737373]">
                  {story.category}
                </div>
                <h3 className="mt-3 text-[18px] font-medium leading-snug tracking-tight text-[#0a0a0a]">
                  {story.headline}
                </h3>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <span className="text-[14px] font-semibold">{story.name}</span>
                <span className="text-[13px] font-medium text-emerald-700">{story.metric}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
