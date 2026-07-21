import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { sectionInView } from "#/lib/animations";
import { product } from "#/lib/data";

export function FinalCTA() {
  return (
    <section id="pricing" className="border-t border-[#E8DFD0]">
      <div className="container-page py-14 md:py-16">
        <motion.div
          {...sectionInView}
          className="mx-auto flex max-w-xl flex-col items-center text-center"
        >
          <p className="mb-2 text-[14px] font-medium text-[#4A433A]">
            演示阶段暂未开放邮件订阅
          </p>
          <p className="mb-5 max-w-md text-[13px] leading-relaxed text-[#6F6558]">
            想跟进度：直接进经营台试用，或在 GitHub 提 issue。不设假「已订阅」。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/app" className="btn-primary h-11 px-5">
              进演示台
            </Link>
            <a
              href="https://github.com/lizliz404/acriva/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-11 px-5"
            >
              GitHub Issues
            </a>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-[#E8DFD0] bg-[#1C1712] py-20 md:py-28">
        <div className="container-page">
          <motion.div {...sectionInView} className="mx-auto max-w-[760px] text-center">
            <div className="mx-auto mb-6 h-px w-12 bg-[#C9892E]" aria-hidden />
            <h2 className="text-hero mb-4 !text-[#F7F0E4]">{product.tagline}</h2>
            <p className="mb-8 text-[16px] text-[#F7F0E4]/65">{product.taglineAlt}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/app" className="btn-primary">
                进经营台
              </Link>
              <Link
                to="/app/market/sell"
                className="inline-flex items-center justify-center rounded-[12px] border border-[#F7F0E4]/25 bg-transparent px-4 py-2.5 text-sm font-semibold text-[#F7F0E4] transition hover:bg-[#F7F0E4]/10"
              >
                有货上架
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
