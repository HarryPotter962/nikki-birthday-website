import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/birthdayData.js";
import Section from "./Section.jsx";

function Placeholder({ label }) {
  return (
    <div className="flex h-full min-h-48 w-full items-center justify-center bg-gradient-to-br from-plum to-[oklch(0.22_0.08_350)]">
      <div className="text-center opacity-70">
        <div className="text-3xl">📷</div>
        <p className="mt-2 px-4 text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function MemoryGallery() {
  const memories = data.memories || [];
  const [open, setOpen] = useState(-1);

  const move = useCallback(
    (dir) => setOpen((i) => (i < 0 ? i : (i + dir + memories.length) % memories.length)),
    [memories.length],
  );

  useEffect(() => {
    if (open < 0) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, move]);

  const current = open >= 0 ? memories[open] : null;

  return (
    <Section
      id="memories"
      eyebrow="📸 Our Memories"
      title="Moments I refuse to forget"
      subtitle="Tap any photo to open it. Swipe or use the arrows to move through them."
    >
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {memories.map((m, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setOpen(i)}
            className="glass group block w-full overflow-hidden rounded-2xl text-left"
          >
            <div className="relative overflow-hidden">
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.title}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Placeholder label="Add your photo in birthdayData.js" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
            </div>
            <div className="p-3">
              <p className="display text-lg">{m.title}</p>
              <p className="text-xs text-muted-foreground">{m.caption}</p>
              {m.date && <p className="mt-1 text-[10px] tracking-widest text-rose uppercase">{m.date}</p>}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Timeline */}
      <div className="mt-20">
        <h3 className="display mb-8 text-center text-2xl sm:text-3xl">Our little timeline</h3>
        <div className="relative mx-auto max-w-2xl border-l border-border pl-6">
          {(data.timeline || []).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative mb-8"
            >
              <span className="absolute top-1.5 -left-[31px] h-3 w-3 rounded-full bg-primary shadow-[0_0_14px_4px_oklch(0.74_0.17_3_/_45%)]" />
              <p className="display text-xl">{t.title}</p>
              <p className="text-sm text-muted-foreground">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
            onClick={() => setOpen(-1)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) move(1);
                if (info.offset.x > 80) move(-1);
              }}
              onClick={(e) => e.stopPropagation()}
              className="glass w-full max-w-3xl overflow-hidden rounded-3xl"
            >
              {current.image ? (
                <img src={current.image} alt={current.title} className="max-h-[65vh] w-full object-contain" />
              ) : (
                <Placeholder label="Your photo will appear here" />
              )}
              <div className="flex items-center justify-between gap-4 p-4">
                <button onClick={() => move(-1)} className="rounded-full bg-secondary px-4 py-2 text-sm">
                  ←
                </button>
                <div className="text-center">
                  <p className="display text-lg">{current.title}</p>
                  <p className="text-xs text-muted-foreground">{current.caption}</p>
                </div>
                <button onClick={() => move(1)} className="rounded-full bg-secondary px-4 py-2 text-sm">
                  →
                </button>
              </div>
            </motion.div>
            <button
              onClick={() => setOpen(-1)}
              aria-label="Close"
              className="glass absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
