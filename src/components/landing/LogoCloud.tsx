import { motion } from "framer-motion";
import { logos } from "#/lib/data";
import { sectionInView } from "#/lib/animations";

export function LogoCloud() {
  return (
    <section className="border-y border-[#ececec] py-12">
      <div className="container-page">
        <motion.p
          {...sectionInView}
          className="mb-8 text-center text-[13px] font-medium text-[#737373]"
        >
          Built for co-ops, estates, and agronomy teams that outgrew group chat
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {logos.map((name) => (
            <span
              key={name}
              className="text-[13px] font-semibold tracking-tight text-[#a3a3a3] transition hover:text-[#525252]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
