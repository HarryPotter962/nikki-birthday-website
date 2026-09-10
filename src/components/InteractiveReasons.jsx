import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "../data/birthdayData.js";
import Section from "./Section.jsx";
import { celebrate } from "./FX.jsx";

const WISHES = [
  { icon: "🌸", title: "Khushiyon ki wish", text: "Tumhari smile kabhi fade na ho, aur har din tumhare liye thoda aur beautiful ho." },
  { icon: "🌙", title: "Sapnon ki wish", text: "Tumhare saare dreams poore hon, aur main har step par tumhare saath rahun." },
  { icon: "💖", title: "Hamaari wish", text: "Humari story mein hamesha pyaar, hasi, thodi si nok-jhok aur endless memories rahein." },
];

export default function InteractiveReasons() {
  const [chosen, setChosen] = useState([]);
  const [active, setActive] = useState(null);
  const complete = chosen.length === WISHES.length;

  const chooseWish = (index) => {
    setActive(index);
    setChosen((current) => (current.includes(index) ? current : [...current, index]));
    celebrate("hearts");
  };

  return (
    <Section
      id="stars"
      eyebrow="🎂 Birthday Wish Booth"
      title="Aaj tum kya wish karogi?"
      subtitle="Teen wishes choose karo, meri princess. Har wish ke saath ek chhota sa surprise unlock hoga. ✨"
    >
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-gold/25 bg-gradient-to-br from-gold/10 via-card/50 to-rose/10 p-5 shadow-[0_30px_80px_-35px_oklch(0.05_0.05_330_/_80%)] sm:p-8">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/30 px-5 py-8 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -top-16 -right-10 text-[11rem] leading-none text-gold/5">✦</div>
          <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground">
            <span className="tracking-[0.22em] uppercase">Wish {chosen.length} of {WISHES.length}</span>
            <span className="text-rose">Made with love ❤️</span>
          </div>

          <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-3">
            {WISHES.map((wish, index) => {
              const selected = chosen.includes(index);
              return (
                <motion.button
                  key={wish.title}
                  onClick={() => chooseWish(index)}
                  whileHover={{ y: -7, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative min-h-40 rounded-2xl border p-5 text-left transition-colors ${selected ? "border-gold bg-gold/15" : "border-border/70 bg-background/25 hover:border-rose/60 hover:bg-rose/10"}`}
                >
                  <span className="text-4xl">{wish.icon}</span>
                  <span className="display mt-4 block text-xl">{wish.title}</span>
                  <span className="mt-2 block text-xs text-muted-foreground">{selected ? "Wish unlocked ✨" : "Tap to choose"}</span>
                  {selected && <span className="absolute top-3 right-3 text-gold">✓</span>}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                className="relative z-10 mt-5 rounded-2xl border border-rose/25 bg-rose/10 p-5 text-center"
              >
                <p className="script text-3xl text-rose">{WISHES[active].icon}</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{WISHES[active].text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-10 mt-7 h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-rose to-gold" animate={{ width: `${(chosen.length / WISHES.length) * 100}%` }} />
          </div>

          {complete && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 mt-7 rounded-2xl border border-gold/40 bg-gold/10 p-5 text-center">
              <p className="text-4xl">🎁</p>
              <p className="script mt-2 text-3xl text-gradient">Your birthday wish is sealed!</p>
              <p className="mt-2 text-sm text-muted-foreground">Ab universe ko kaam karne do, meri jaan. Tum bahut loved ho. ❤️</p>
              <button onClick={() => celebrate("big")} className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Celebrate this wish ✨</button>
            </motion.div>
          )}
        </div>
      </div>
    </Section>
  );
}
