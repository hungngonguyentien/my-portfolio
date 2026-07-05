import type { Transition, Variants } from "motion/react";

export const easeOutSoft: Transition["ease"] = [0.22, 1, 0.36, 1];

export const entranceTransition: Transition = {
  duration: 0.5,
  ease: easeOutSoft,
};

export function fadeUpVariants(reduced: boolean | null): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: entranceTransition,
    },
  };
}

export function staggerContainer(reduced: boolean | null): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  };
}
