export const fadeUpTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
} as const;

export const staggerTransition = {
  staggerChildren: 0.08,
  delayChildren: 0.08,
} as const;
