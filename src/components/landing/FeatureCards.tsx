import { motion } from "framer-motion";
import { sectionInView } from "#/lib/animations";
import { scaleItems } from "#/lib/data";

const cards = [
  {
    title: "Finance",
    body: "ApplyFin, joint-loan match, bank approve — working capital with a clear trail.",
  },
  {
    title: "Market",
    body: "List lots, browse & buy, open demands, contact buyers without another group chat.",
  },
  {
    title: "Expert",
    body: "Knowledge, Q&A, and bookings — dual uplink so answers compound into SOPs.",
  },
];

export function FeatureCards() {
  return (
    <section className="py-24 md:py-28">
      <div className="container-page">
        <motion.div {...sectionInView} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-eyebrow">Architecture</span>
          <h2 className="text-section mt-4">Three modules. One farmer hub.</h2>
          <p className="text-body mt-4">
            融销通 stitches finance, trade, and agronomy. Shared identity, role-shaped
            queues, status machines per store — not three orphaned mini-apps.
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
              className="surface-card p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-emerald-700">
                Store
              </div>
              <h3 className="text-[17px] font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#525252]">{card.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scaleItems.map((item) => (
            <div key={item.title} className="rounded-xl border border-[#ececec] bg-white px-4 py-4">
              <div className="text-[14px] font-semibold text-[#0a0a0a]">{item.title}</div>
              <div className="mt-1 text-[13px] text-[#737373]">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
