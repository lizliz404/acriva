import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { sectionInView } from "#/lib/animations";
import { useI18n } from "#/i18n";

const CARD_HREFS = ["/app/finance", "/app/market/sell", "/app/ask"] as const;
const CARD_IMAGES = [
  "/assets/images/field-1.jpg",
  "/assets/images/produce-1.jpg",
  "/assets/images/produce-2.jpg",
] as const;

export function FeatureCards() {
  const { t } = useI18n();
  const cards = t.features.cards.map((card, i) => ({
    ...card,
    href: CARD_HREFS[i],
    image: CARD_IMAGES[i],
  }));

  return (
    <section className="py-20 md:py-24">
      <div className="container-page">
        <motion.div {...sectionInView} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-eyebrow">{t.features.eyebrow}</span>
          <h2 className="text-section mt-4">{t.features.title}</h2>
          <p className="text-body mt-4">{t.features.body}</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="surface-card flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={card.image}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF4] via-[#FFFBF4]/20 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 pt-3">
                <div className="mb-3 text-[12px] font-semibold tracking-wide text-[#0F4D35]">
                  {t.features.result}
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
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.scaleItems.map((item) => (
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
