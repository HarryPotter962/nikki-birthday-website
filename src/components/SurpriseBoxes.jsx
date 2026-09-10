import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/birthdayData.js";
import Section from "./Section.jsx";
import { celebrate } from "./FX.jsx";

export default function SurpriseBoxes() {
  const [opened, setOpened] = useState([]);
  const surprises = data.surprises || [];

  const open = (i) => {
    if (opened.includes(i)) return;
    setOpened((o) => [...o, i]);
    celebrate("hearts");
  };

  return (
    <Section
      id="surprises"
      eyebrow="✨ Little Surprises"
      title="Wait... there's more 👀"
      subtitle="Every box hides something. Open them in any order — or all of them, obviously."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {surprises.map((s, i) => {
          const isOpen = opened.includes(i);
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => open(i)}
              className={`glass relative min-h-44 overflow-hidden rounded-3xl p-6 text-left transition-shadow ${
                isOpen ? "glow" : "hover:glow"
              }`}
            >
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div key="closed" exit={{ opacity: 0, scale: 0.8, rotate: -8 }} className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <motion.span
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                      className="text-5xl"
                    >
                      {s.icon}
                    </motion.span>
                    <span className="display text-xl">{s.title}</span>
                    <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">tap to open</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="mb-2 text-2xl">{s.icon}</p>
                    <p className="display mb-2 text-lg text-rose">{s.title}</p>
                    <p className="text-sm leading-relaxed text-foreground/90">{s.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      {opened.length === surprises.length && surprises.length > 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="script mt-8 text-center text-2xl text-rose">
          You opened every single one. Of course you did ❤️
        </motion.p>
      )}
    </Section>
  );
}
