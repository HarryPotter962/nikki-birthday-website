import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingHearts, ClientOnly, celebrate } from "./FX.jsx";
import data from "../data/birthdayData.js";

const CANDLES = [0, 1, 2, 3, 4];

export default function CakeCeremony({ onDone, musicPlaying, onRequestMusic }) {
  const lines = data.cake.lines;
  const [step, setStep] = useState(0);
  const intro = step < lines.length;
  const [blown, setBlown] = useState([]);
  const [cut, setCut] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  useEffect(() => {
    if (!intro) return undefined;
    const t = setTimeout(() => setStep((s) => s + 1), 2100);
    return () => clearTimeout(t);
  }, [step, intro]);

  const allBlown = blown.length === CANDLES.length;

  const blow = (i) => {
    if (blown.includes(i)) return;
    if (!musicPlaying) {
      setShowMusicPrompt(true);
      return;
    }
    const next = [...blown, i];
    setBlown(next);
    if (next.length === CANDLES.length) celebrate("hearts");
  };

  const doCut = () => {
    if (!allBlown || cut) return;
    if (!musicPlaying) {
      setShowMusicPrompt(true);
      return;
    }
    setCut(true);
    celebrate("big");
    setTimeout(() => setCelebrating(true), 900);
  };

  return (
    <motion.section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.8 }}
    >
      <ClientOnly>
        <FloatingHearts count={12} />
      </ClientOnly>

      <div className="relative z-10 w-full max-w-6xl text-center">
        <AnimatePresence mode="wait">
          {intro ? (
            <motion.p
              key={`i${step}`}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.8 }}
              className="display text-3xl leading-snug sm:text-4xl"
            >
              {lines[step]}
            </motion.p>
          ) : (
            <motion.div
              key="cake"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <div className="mb-7 flex items-center justify-center gap-3 text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
                <span className="h-px w-10 bg-border" />
                <span>{celebrating ? "Your moment" : "A birthday ritual"}</span>
                <span className="h-px w-10 bg-border" />
              </div>

              <h1 className="script text-gradient text-5xl sm:text-7xl">Make a wish, {data.name}</h1>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {celebrating ? "The wish is in the universe now." : allBlown ? data.cake.cutHint : data.cake.blowHint}
              </p>

              {!allBlown && (
                <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-border/70 bg-background/20 px-5 py-4">
                  <p className="script text-xl text-rose">{data.cake.wishNote}</p>
                  <button
                    onClick={() => {
                      setWishMade(true);
                      celebrate("hearts");
                    }}
                    className={`mt-3 text-xs tracking-[0.2em] uppercase transition-colors ${wishMade ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {wishMade ? "Wish sealed ✨" : "I made my wish"}
                  </button>
                </div>
              )}

              <div className="mx-auto mt-8 flex max-w-xs items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-rose to-gold"
                    animate={{ width: `${(blown.length / CANDLES.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {blown.length}/{CANDLES.length}
                </span>
              </div>

              <div className={`relative mx-auto mt-3 flex w-fit flex-col items-center gap-5 ${celebrating ? "lg:flex-row lg:gap-8" : ""}`}>
                <div className="absolute inset-8 rounded-full bg-rose/20 blur-3xl" />
                <Cake blown={blown} onBlow={blow} cut={cut} onCut={doCut} ready={allBlown} />
                {celebrating && <CakeFeedingMoment />}
              </div>

              {allBlown && !cut && (
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={doCut}
                  className="animate-pulse-glow mt-8 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground"
                >
                  🔪 Cut the cake
                </motion.button>
              )}

              <AnimatePresence>
                {showMusicPrompt && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-5 backdrop-blur-sm"
                  >
                    <div className="glass w-full max-w-sm rounded-3xl p-7 text-center shadow-2xl">
                      <p className="text-4xl">🎶</p>
                      <h2 className="display mt-4 text-2xl">One little thing first</h2>
                      <p className="mt-3 text-muted-foreground">
                        Turn on the song before blowing out the candles.
                      </p>
                      <div className="mt-6 flex justify-center gap-3">
                        <button
                          onClick={() => setShowMusicPrompt(false)}
                          className="rounded-full border border-border px-5 py-3 text-sm text-muted-foreground"
                        >
                          Not yet
                        </button>
                        <button
                          onClick={() => {
                            onRequestMusic();
                            setShowMusicPrompt(false);
                          }}
                          className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                        >
                          Turn on song ♪
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {celebrating && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                    className="mt-10 space-y-5"
                  >
                    <h2 className="script text-gradient text-4xl sm:text-6xl">
                      Happy Birthday, {data.name}! ❤️
                    </h2>
                    <p className="text-muted-foreground">{data.cake.afterCelebration}</p>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        celebrate("hearts");
                        onDone();
                      }}
                      className="rounded-full border border-border bg-secondary px-8 py-3.5 font-medium text-secondary-foreground transition-colors hover:bg-secondary/70"
                    >
                      Let&apos;s Go →
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function CakeFeedingMoment() {
  const [fed, setFed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.7 }}
      className="mx-auto max-w-lg rounded-[2rem] border border-gold/25 bg-gradient-to-br from-rose/15 via-background/35 to-gold/10 p-5 shadow-[0_20px_55px_-25px_oklch(0.05_0.05_330_/_80%)] sm:p-7"
    >
      <p className="text-xs tracking-[0.25em] text-gold uppercase">A tiny birthday moment 🎂</p>
      <div className="relative mx-auto mt-6 h-36 w-full max-w-sm">
        <div className="absolute bottom-2 left-5 flex flex-col items-center sm:left-10">
          <div className="relative text-5xl sm:text-6xl">
            <span>🧸</span>
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl">👑</span>
          </div>
          <span className="mt-1 rounded-full bg-rose/15 px-3 py-1 text-[11px] text-rose">Nikki 💖</span>
        </div>

        <motion.span
          drag={!fed ? "x" : false}
          dragConstraints={{ left: -170, right: 10 }}
          dragElastic={0.12}
          whileDrag={{ scale: 1.25, cursor: "grabbing" }}
          onTap={() => {
            if (!fed) {
              setFed(true);
              celebrate("hearts");
            }
          }}
          onDragEnd={(_, info) => {
            if (!fed && info.offset.x < -80) {
              setFed(true);
              celebrate("hearts");
            }
          }}
          animate={fed ? { left: "29%", top: "48%", scale: 0.8, rotate: -8 } : { left: "68%", top: "54%" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute z-20 cursor-grab touch-none select-none text-3xl"
        >
          🍰
        </motion.span>

        <div className="absolute right-5 bottom-2 flex flex-col items-center sm:right-10">
          <div className="text-5xl sm:text-6xl">🧸</div>
          <span className="mt-1 rounded-full bg-gold/15 px-3 py-1 text-[11px] text-gold">Surya 🤍</span>
        </div>
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-muted-foreground">
        {fed ? "Nikki is happy — cake successfully delivered 😋❤️" : "Cake bite ko Apne aap tak drag karo .                     🍰"}
      </p>
      {fed && (
        <motion.p
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: [0.7, 1.15, 1] }}
          className="mt-2 text-2xl"
        >
          🥰💖✨
        </motion.p>
      )}
    </motion.div>
  );
}

function Cake({ blown, onBlow, cut, ready, onCut }) {
  return (
    <div className="relative mx-auto mt-4 w-[280px] max-w-full select-none sm:w-[340px]">
      {/* balloons */}
      <ClientOnly>
        <AnimatePresence>
          {cut &&
            ["🎈", "🎈", "🎈", "🎈"].map((b, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: -420, opacity: [0, 1, 1, 0], x: (i - 1.5) * 60 }}
                transition={{ duration: 4.5, delay: i * 0.25 }}
                className="pointer-events-none absolute bottom-0 left-1/2 text-4xl"
              >
                {b}
              </motion.span>
            ))}
        </AnimatePresence>
      </ClientOnly>

      {/* candles */}
      <div className="relative z-20 flex items-end justify-center gap-4">
        {CANDLES.map((i) => {
          const out = blown.includes(i);
          return (
            <button
              key={i}
              onClick={() => onBlow(i)}
              aria-label={out ? "Candle blown out" : "Blow out candle"}
              className="group relative flex flex-col items-center p-1"
            >
              <span
                className={`mb-1 h-4 w-2.5 rounded-full transition-all duration-300 ${
                  out
                    ? "scale-0 bg-muted opacity-0"
                    : "animate-flicker bg-gold shadow-[0_0_18px_6px_oklch(0.85_0.12_85_/_60%)]"
                }`}
                style={{ borderRadius: "50% 50% 45% 45% / 60% 60% 40% 40%" }}
              />
              {out && <span className="mb-1 h-4 text-xs opacity-60">💨</span>}
              <span className="h-8 w-2 rounded-sm bg-gradient-to-b from-paper to-rose" />
            </button>
          );
        })}
      </div>

      {/* cake body */}
      <motion.button
        onClick={onCut}
        aria-label="Cut the cake"
        className="relative block w-full cursor-pointer"
        animate={cut ? { rotate: [0, -1.5, 1.5, 0] } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="relative -mt-1 h-10 rounded-t-2xl bg-[oklch(0.9_0.06_20)] shadow-[inset_0_-8px_0_oklch(0.82_0.08_20)]">
          <div className="absolute inset-x-0 -bottom-2 flex justify-around">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="h-4 w-4 rounded-full bg-[oklch(0.9_0.06_20)]" />
            ))}
          </div>
        </div>
        <div className="h-14 bg-[oklch(0.62_0.13_20)]" />
        <div className="h-6 bg-[oklch(0.9_0.06_20)]" />
        <div className="h-16 rounded-b-xl bg-[oklch(0.55_0.12_18)]" />
        {/* slice line */}
        <AnimatePresence>
          {cut && (
            <motion.span
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 bottom-0 left-1/2 w-[3px] origin-top bg-background/70"
            />
          )}
        </AnimatePresence>
        {/* knife */}
        <motion.span
          className="pointer-events-none absolute -top-16 left-1/2 z-30 -translate-x-1/2 text-4xl"
          initial={false}
          animate={cut ? { y: 90, rotate: 15, opacity: [1, 1, 0] } : ready ? { y: [0, -8, 0] } : { opacity: 0 }}
          transition={cut ? { duration: 0.8 } : { duration: 1.4, repeat: Infinity }}
        >
          🔪
        </motion.span>
      </motion.button>
      <div className="mx-auto h-3 w-[110%] -translate-x-[5%] rounded-full bg-[oklch(0.75_0.03_60_/_20%)] blur-[2px]" />
    </div>
  );
}
