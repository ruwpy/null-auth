import { Variants } from "framer-motion";

const enterVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.08 } },
};

export const animations = {
  enter: {
    variants: enterVariants,
    initial: "initial",
    animate: "animate",
    exit: "exit",
  },
};
