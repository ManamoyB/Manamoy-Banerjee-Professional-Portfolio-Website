"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CinematicIntro() {
  const [isComplete, setIsComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = localStorage.getItem("intro-seen") === "true";

    if (!hasSeenIntro) {
      setShowIntro(true);
      localStorage.setItem("intro-seen", "true");
    } else {
      setIsComplete(true);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.08,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  if (isComplete && !showIntro) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          key="intro"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onAnimationComplete={() => {
            setTimeout(() => setIsComplete(true), 2200);
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-cyan-violet opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-glow-cyan opacity-10 blur-3xl"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 0.15, scale: 1.2 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Content container */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            {/* Logo/Initials */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm font-mono uppercase tracking-widest text-primary"
            >
              MB
            </motion.div>

            {/* Name with letter stagger */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex overflow-hidden">
                {"MANAMOY".split("").map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl font-bold text-foreground"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <div className="flex overflow-hidden">
                {"BANERJEE".split("").map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    custom={i + 8}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl font-bold text-primary"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Profile Image - Placeholder, will be replaced with actual image */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-4"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-cyan-violet p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 1.8 }}
              className="text-sm md:text-base text-muted-foreground uppercase tracking-widest"
            >
              Full Stack Developer & AI Engineer
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
