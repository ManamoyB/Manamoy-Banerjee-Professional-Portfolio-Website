"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sequence = [
  "MANAMOY BANERJEE",
  "AI Engineer",
  "Data Analyst",
  "Software Developer",
  "Building Intelligent Systems\nfor Real World Problems",
];

export function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem("manamoy-intro-seen");

    if (!seen) {
      setShow(true);
      window.sessionStorage.setItem("manamoy-intro-seen", "true");
      const timer = window.setTimeout(() => setShow(false), 5600);

      return () => window.clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 h-[36rem] bg-gradient-to-b from-primary/15 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.08, opacity: 0.75 }}
              transition={{ duration: 4.8, ease: "easeOut" }}
            />
          </div>
          <div className="relative z-10 px-6 text-center">
            {sequence.map((label, index) => (
              <motion.p
                className="absolute left-1/2 top-1/2 w-[min(90vw,48rem)] -translate-x-1/2 -translate-y-1/2 whitespace-pre-line text-3xl font-semibold leading-tight tracking-normal text-foreground sm:text-5xl"
                key={label}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [18, 0, 0, -18],
                  filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"],
                }}
                transition={{
                  delay: index * 0.92,
                  duration: 1.22,
                  times: [0, 0.2, 0.78, 1],
                  ease: "easeInOut",
                }}
              >
                {label}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
