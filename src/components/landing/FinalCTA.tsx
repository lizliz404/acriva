import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { sectionInView } from "#/lib/animations";
import { product } from "#/lib/data";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section id="pricing" className="border-t border-[#E8DFD0]">
      <div className="container-page py-14 md:py-16">
        <motion.div
          {...sectionInView}
          className="mx-auto flex max-w-xl flex-col items-center text-center"
        >
          <p className="mb-3 text-[14px] font-medium text-[#4A433A]">
            留个邮箱，产品更新发你
          </p>
          <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="你的邮箱"
              className="h-11 flex-1 rounded-[12px] border border-[#D4C7B0] bg-[#FFFBF4] px-3.5 text-[14px] outline-none transition focus:border-[#0F4D35] focus:ring-2 focus:ring-[#0F4D35]/20"
            />
            <button type="submit" className="btn-primary h-11 px-5">
              {done ? "已订阅" : "订阅"}
            </button>
          </form>
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
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-[12px] border border-[#F7F0E4]/25 bg-transparent px-4 py-2.5 text-sm font-semibold text-[#F7F0E4] transition hover:bg-[#F7F0E4]/10"
              >
                先看怎么贷
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
