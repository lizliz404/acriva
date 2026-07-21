import { motion } from "framer-motion";
import { sectionInView } from "#/lib/animations";
import { useI18n } from "#/i18n";

export function Changelog() {
  const { t } = useI18n();
  return (
    <section id="resources" className="py-20 md:py-24">
      <div className="container-page">
        <motion.div
          {...sectionInView}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="text-eyebrow">{t.changelog.eyebrow}</span>
            <h2 className="text-section mt-3">{t.changelog.title}</h2>
          </div>
          <p className="max-w-sm text-[14px] text-[#6F6558]">{t.changelog.blurb}</p>
        </motion.div>
        <div className="grid gap-3 md:grid-cols-2">
          {t.changelogItems.map((item) => (
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
