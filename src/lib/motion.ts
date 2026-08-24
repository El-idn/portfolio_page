import type { Transition, Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.4,
  base: 0.5,
  slow: 0.6,
} as const;

export const viewportOnce = {
  once: true,
  margin: "-80px",
} as const;

export const transitionBase: Transition = {
  duration: duration.base,
  ease: easeOut,
};

export function getStaggerContainer(reducedMotion: boolean): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08,
        delayChildren: reducedMotion ? 0 : 0.04,
      },
    },
  };
}

export function getFadeUp(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0 },
    };
  }

  return {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: transitionBase,
    },
  };
}

export function getFadeIn(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      show: { opacity: 1 },
    };
  }

  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: transitionBase,
    },
  };
}

export function getFadeScale(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, scale: 1 },
      show: { opacity: 1, scale: 1 },
    };
  }

  return {
    hidden: { opacity: 0, scale: 0.96 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { ...transitionBase, duration: duration.slow },
    },
  };
}
