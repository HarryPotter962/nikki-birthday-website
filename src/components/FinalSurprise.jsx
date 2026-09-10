import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/birthdayData.js";
import { StarField, ClientOnly, celebrate } from "./FX.jsx";

export default function FinalSurprise() {
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState(0);
  const lines = data.final.message;

  useEffect(() => {
    if (!open || line >= lines.length) return undefined;
    const t = setTimeout(() => setLine((l) => l + 1), 2200);
    return () => clearTimeout(t);
  }, [open, line, lines.length]);

  return (
    <section id="final" className="relative z-10 flex min-h-[100svh] scroll-mt-16 items-center justify-center overflow-hidden px-5 py-24">
      <ClientOnly>
        <StarField count={80} />
      </ClientOnly>

      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="tease"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.9 }}
            className="relative z-10 max-w-xl text-center"
          >
            <p className="display text-3xl sm:text-4xl">{data.final.tease}</p>
            <p className="mt-4 text-muted-foreground">{data.final.tease2}</p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setOpen(true);
                celebrate("big");
              }}
              className="animate-pulse-glow mt-10 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground"
            >
              {data.final.button}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            className="relative z-10 max-w-2xl space-y-6 text-center"
          >
            {lines.slice(0, line + 1).map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.2 }}
                className={
                  i === lines.length - 1
                    ? "script text-gradient pt-4 text-4xl sm:text-6xl"
                    : "display text-2xl leading-relaxed sm:text-3xl"
                }
              >
                {l}
              </motion.p>
            ))}
            {line >= lines.length - 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="script pt-6 text-2xl text-rose"
              >
                — {data.from}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
