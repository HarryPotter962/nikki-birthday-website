import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingHearts, StarField, ClientOnly, celebrate } from "./FX.jsx";
import data from "../data/birthdayData.js";

export default function WelcomeScreen({ onEnter }) {
  const lines = data.intro;
  const [step, setStep] = useState(0);
  const done = step >= lines.length;

  useEffect(() => {
    if (done) return undefined;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 2300);
    return () => clearTimeout(t);
  }, [step, done]);

  return (
    <motion.section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-16"
      exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
      transition={{ duration: 0.8 }}
    >
      <ClientOnly>
        <StarField count={70} />
        <FloatingHearts count={10} />
      </ClientOnly>

      <div className="relative z-10 w-full max-w-3xl text-center">
        <div className="min-h-[9rem] sm:min-h-[11rem]">
          <AnimatePresence mode="wait">
            {!done && (
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="display text-3xl leading-snug text-foreground sm:text-5xl"
              >
                {lines[step]}
              </motion.p>
            )}
          </AnimatePresence>

          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative space-y-6"
            >
              <div className="mx-auto flex max-w-sm items-center justify-center gap-3 text-[10px] tracking-[0.4em] text-gold uppercase">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
                <span>With all my heart</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
              </div>
              <p className="script text-gradient text-6xl leading-none sm:text-8xl">Happy Birthday Nikita</p>
              <p className="display text-2xl tracking-[0.28em] text-foreground/90 uppercase sm:text-3xl">
                My Love
              </p>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                To the girl who makes my world softer, brighter and so much more beautiful My Gudiya.
              </p>
              <div className="flex items-center justify-center gap-3 pt-1 text-rose">
                <span className="h-px w-12 bg-rose/40" />
                <span className="text-xl">♡</span>
                <span className="h-px w-12 bg-rose/40" />
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {done && (
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                celebrate("big");
                onEnter();
              }}
              className="animate-pulse-glow mt-12 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:text-lg"
            >
              Open your surprise <span aria-hidden>♡</span>
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
}
