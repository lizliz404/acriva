import { motion } from "framer-motion";
import { sectionInView } from "#/lib/animations";
import { WindowChrome } from "../ui";

export function DarkFeature() {
  return (
    <section className="bg-[#0a0a0a] py-24 text-white md:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div {...sectionInView}>
            <span className="text-eyebrow !text-white/50">Expert uplink</span>
            <h2 className="text-section mt-4 !text-white">
              Manage knowledge. Clear Q&A. Confirm the calendar.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              Experts are not a chatbot afterthought. Acriva gives them an
              uplink: draft and publish protocols, process grower questions, and
              run booking requests without leaving the desk.
            </p>
            <ul className="mt-8 space-y-3 text-[14px] text-white/75">
              {[
                "Queue open questions with crop and region context",
                "Promote strong answers into knowledge candidates",
                "Confirm, reschedule, or complete consult bookings",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
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
            <WindowChrome title="Expert · uplink" dark className="interactive-window">
              <div className="space-y-2 p-3 text-[12.5px]">
                {[
                  {
                    k: "QAProcess",
                    t: "Cucumber tip burn after EC 2.9",
                    s: "open · 2h",
                  },
                  {
                    k: "BookProcess",
                    t: "Confirm high-tunnel walkthrough",
                    s: "Tue 09:00",
                  },
                  {
                    k: "ManageKnowledge",
                    t: "Publish apple thinning protocol",
                    s: "in review",
                  },
                ].map((row) => (
                  <div
                    key={row.t}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 hover:bg-white/[0.07]"
                  >
                    <div className="text-[10px] font-medium uppercase tracking-wider text-emerald-300/80">
                      {row.k}
                    </div>
                    <div className="mt-1 font-medium text-white/90">{row.t}</div>
                    <div className="text-[11px] text-white/45">{row.s}</div>
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
