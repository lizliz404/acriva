import { motion } from "framer-motion";
import { sectionInView } from "#/lib/animations";
import { WindowChrome } from "../ui";
import { useI18n } from "#/i18n";

export function DarkFeature() {
  const { t } = useI18n();
  return (
    <section className="bg-[#1C1712] py-20 text-[#F7F0E4] md:py-24">
      <div className="container-page">
        <div className="mb-1 h-px w-16 bg-[#C9892E]/80" aria-hidden />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...sectionInView}>
            <span className="text-eyebrow !text-[#C9892E]">{t.darkFeature.eyebrow}</span>
            <h2 className="text-section mt-4 !text-[#F7F0E4]">{t.darkFeature.title}</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#F7F0E4]/65">
              {t.darkFeature.body}
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-[#F7F0E4]/80">
              {t.darkFeature.bullets.map((item) => (
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
            <WindowChrome
              title={t.darkFeature.windowTitle}
              dark
              className="interactive-window"
            >
              <div className="space-y-2 p-3 text-[12.5px]">
                {t.darkFeature.rows.map((row) => (
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
