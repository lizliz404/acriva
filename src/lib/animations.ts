import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const staggerContainer: Variants = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

export const sectionInView = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.6 },
};
