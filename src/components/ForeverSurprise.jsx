import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section.jsx";
import { celebrate } from "./FX.jsx";

const HEARTS = ["🌙", "💖", "🌸", "✨"];
const HEART_ORDER = [1, 3, 0, 2];

export default function ForeverSurprise() {
  const [level, setLevel] = useState(0);
  const [dateCode, setDateCode] = useState("");
  const [heartOrder, setHeartOrder] = useState([]);
  const [caughtHearts, setCaughtHearts] = useState(0);
  const [wrong, setWrong] = useState(false);

  const submitDate = () => {
    if (dateCode === "1209") {
      setLevel(1);
      setWrong(false);
      return;
    }
    setWrong(true);
    setDateCode("");
  };

  const tapHeart = (index) => {
    const next = [...heartOrder, index];
    if (index !== HEART_ORDER[heartOrder.length]) {
      setHeartOrder([]);
      setWrong(true);
      return;
    }
    setWrong(false);
    setHeartOrder(next);
    if (next.length === HEART_ORDER.length) setLevel(2);
  };

  const answerLove = (answer) => {
    if (answer === "yes") {
      setWrong(false);
      setLevel(3);
      return;
    }
    setWrong(true);
  };

  const catchHeart = () => {
    const next = caughtHearts + 1;
    setCaughtHearts(next);
    celebrate("hearts");
    if (next === 5) {
      setLevel(4);
      celebrate("big");
    }
  };

  return (
    <Section
      id="forever"
      eyebrow="🎁 Birthday Love Quest"
      title="Ek last surprise unlock karogi?"
      subtitle="Four little challenges complete karo, phir dil ki sabse important baat saamne aayegi. 💌"
      className="forever-section"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-to-br from-rose/15 via-card/55 to-gold/10 p-6 text-center shadow-[0_30px_90px_-35px_oklch(0.05_0.05_330_/_85%)] sm:p-10">
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 text-[13rem] leading-none text-rose/5">∞</div>
          <div className="relative z-10">
            <div className="mx-auto flex max-w-xs items-center justify-between text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {["Date", "Hearts", "Love", "Forever"].map((step, index) => (
                <div key={step} className={`flex items-center gap-2 ${level >= index ? "text-gold" : ""}`}>
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full border ${level >= index ? "border-gold bg-gold/15" : "border-border"}`}>{level > index ? "✓" : index + 1}</span>
                  <span className="hidden sm:inline">{step}</span>
                </div>
              ))}
            </div>

            <motion.div
              animate={{ scale: level === 4 ? [1, 1.12, 1] : [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mx-auto mt-9 flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-background/45 text-5xl shadow-[0_0_35px_oklch(0.85_0.12_85_/_20%)]"
            >
              {level === 4 ? "💖" : level === 3 ? "💫" : level === 2 ? "💌" : "🔐"}
            </motion.div>

            <AnimatePresence mode="wait">
              {level === 0 && (
                <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="display mt-6 text-3xl">Level 1: Birthday clue 🎂</h3>
                  <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">Us special date ko 4 digits mein enter karo jo aaj ko itna beautiful banati hai.</p>
                  <div className="mx-auto mt-6 flex max-w-xs gap-2">
                    <input value={dateCode} onChange={(event) => setDateCode(event.target.value.replace(/\D/g, "").slice(0, 4))} onKeyDown={(event) => event.key === "Enter" && submitDate()} inputMode="numeric" placeholder="DDMM" aria-label="Birthday date code" className="min-w-0 flex-1 rounded-xl border border-border bg-background/40 px-4 py-3 text-center tracking-[0.35em] text-foreground outline-none focus:border-gold" />
                    <button onClick={submitDate} className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">Unlock</button>
                  </div>
                  <p className={`mt-4 text-xs ${wrong ? "text-rose" : "text-muted-foreground"}`}>{wrong ? "Hmm... date ko phir se try karo, meri jaan. ❤️" : "Hint: 12 September ✨"}</p>
                </motion.div>
              )}

              {level === 1 && (
                <motion.div key="hearts" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="display mt-6 text-3xl">Level 2: Follow the hearts 💞</h3>
                  <p className="mt-3 text-sm text-muted-foreground">Hearts ko secret order mein tap karo. Galat hua toh quest reset ho jayega.</p>
                  <div className="mx-auto mt-7 flex max-w-sm justify-center gap-3">
                    {HEARTS.map((heart, index) => <motion.button key={heart} whileHover={{ y: -6, scale: 1.08 }} whileTap={{ scale: 0.9 }} onClick={() => tapHeart(index)} className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-3xl ${heartOrder.includes(index) ? "border-gold bg-gold/15" : "border-border bg-background/30 hover:border-rose/60"}`}>{heart}</motion.button>)}
                  </div>
                  <p className={`mt-5 text-xs ${wrong ? "text-rose" : "text-muted-foreground"}`}>{wrong ? "Oops, love story ka order thoda different tha. Again 💫" : `${heartOrder.length}/4 hearts found`}</p>
                </motion.div>
              )}

              {level === 2 && (
                <motion.div key="love-question" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="display mt-6 text-3xl">Level 3: Ek honest question 💌</h3>
                  <p className="mt-4 text-2xl text-foreground sm:text-3xl">Do you love me? 🥺</p>
                  <div className="mx-auto mt-7 grid max-w-sm grid-cols-2 gap-3">
                    <button onClick={() => answerLove("yes")} className="rounded-2xl border border-gold/50 bg-gold/10 px-5 py-4 text-lg text-gold transition-colors hover:bg-gold/20">YES ❤️</button>
                    <button onClick={() => answerLove("no")} className="rounded-2xl border border-border bg-background/30 px-5 py-4 text-lg text-muted-foreground transition-colors hover:border-rose/60">NO 🙈</button>
                  </div>
                  <p className={`mt-5 text-xs ${wrong ? "text-rose" : "text-muted-foreground"}`}>{wrong ? "Sach sach bolo, meri Birthday Girl 😌❤️" : "Answer carefully... this unlocks the next surprise ✨"}</p>
                </motion.div>
              )}

              {level === 3 && (
                <motion.div key="heart-catcher" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="display mt-6 text-3xl">Level 4: Catch my love 💫</h3>
                  <p className="mt-3 text-sm text-muted-foreground">Moving hearts ko tap karke catch karo. 5 hearts collect karte hi surprise unlock hoga. 💖</p>
                  <div className="relative mx-auto mt-7 h-64 max-w-md overflow-hidden rounded-2xl border border-gold/25 bg-gold/10">
                    {[0, 1, 2, 3, 4].map((heart) => (
                      <motion.button
                        key={`${heart}-${caughtHearts}`}
                        onClick={catchHeart}
                        whileTap={{ scale: 1.4 }}
                        animate={{ x: [0, heart % 2 ? 35 : -35, 0], y: [0, -24, 0], rotate: [-8, 8, -8] }}
                        transition={{ duration: 2.2 + heart * 0.25, repeat: Infinity, delay: heart * 0.18 }}
                        style={{ top: `${18 + ((heart * 29) % 62)}%`, left: `${10 + ((heart * 41) % 74)}%` }}
                        className="absolute text-4xl drop-shadow-[0_0_16px_oklch(0.8_0.15_20)]"
                        aria-label="Catch a moving heart"
                      >
                        {heart % 2 ? "💖" : "❤️"}
                      </motion.button>
                    ))}
                    <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs tracking-[0.2em] text-muted-foreground uppercase">Tap a moving heart</p>
                  </div>
                  <div className="mx-auto mt-5 flex max-w-md items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-gradient-to-r from-rose to-gold" animate={{ width: `${(caughtHearts / 5) * 100}%` }} /></div>
                    <span className="text-xs text-gold">{caughtHearts}/5</span>
                  </div>
                </motion.div>
              )}

              {level === 4 && (
                <motion.div key="reveal" initial={{ opacity: 0, y: 25, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8 }}>
                  <p className="mt-7 text-xs tracking-[0.28em] text-gold uppercase">Quest complete ✨</p>
                  <p className="mt-3 text-sm text-muted-foreground">Our hearts are together now. Always. 👑</p>
                  <h3 className="script text-gradient mt-5 text-5xl leading-tight sm:text-7xl">I love you forever</h3>
                  <p className="display mt-3 text-2xl text-foreground sm:text-3xl">my Birthday Girl ❤️</p>
                  <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">Aaj, kal, aur har birthday par. Tum meri favourite person ho, meri jaan. This love is yours, forever and always. 🥹💕</p>
                  <button onClick={() => celebrate("big")} className="mt-7 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-[0_12px_30px_oklch(0.74_0.17_3_/_30%)]">Celebrate forever ✨</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
