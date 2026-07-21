import { motion } from "framer-motion";
import { sectionInView } from "#/lib/animations";
import { useI18n } from "#/i18n";

const STORY_IMAGES = [
  "/assets/images/field-2.jpg",
  "/assets/images/market-1.jpg",
  "/assets/images/market-2.jpg",
] as const;

export function CustomerStories() {
  const { t } = useI18n();

  return (
    <section id="customers" className="border-t border-[#E8DFD0] bg-[#F7F0E4] py-20 md:py-24">
      <div className="container-page">
        <motion.div {...sectionInView} className="mb-12 max-w-2xl">
          <span className="text-eyebrow">{t.customers.eyebrow}</span>
          <h2 className="text-section mt-4">{t.customers.title}</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {t.customerStories.map((story, i) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="surface-card relative flex flex-col justify-between overflow-hidden p-6"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage: `url(${STORY_IMAGES[i]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FFFBF4]/95 via-[#FFFBF4]/88 to-[#FFFBF4]/75"
                aria-hidden
              />
              <div className="relative">
                <div className="text-[12px] font-medium tracking-wide text-[#6F6558]">
                  {story.category}
                </div>
                <h3 className="mt-3 text-[18px] font-medium leading-snug tracking-tight text-[#1C1712]">
                  {story.headline}
                </h3>
              </div>
              <div className="relative mt-8 flex items-end justify-between">
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
