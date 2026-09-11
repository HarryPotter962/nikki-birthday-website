import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "./Section.jsx";
import { celebrate } from "./FX.jsx";

const CARD_ICONS = ["🎂", "💖", "👑", "🌸", "✨", "🎀"];
const CARDS = [...CARD_ICONS, ...CARD_ICONS].map((icon, index) => ({ icon, pair: icon, id: index }));

export default function LoveReasons() {
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [locked, setLocked] = useState(false);
  const complete = matched.length === CARDS.length;

  const flipCard = (card) => {
    if (locked || flipped.includes(card.id) || matched.includes(card.id) || flipped.length === 2) return;
    const next = [...flipped, card.id];
    setFlipped(next);
    if (next.length < 2) return;

    setLocked(true);
    const first = CARDS.find((item) => item.id === next[0]);
    const second = CARDS.find((item) => item.id === next[1]);
    window.setTimeout(() => {
      if (first.pair === second.pair) {
        setMatched((current) => [...current, ...next]);
        celebrate("hearts");
      }
      setFlipped([]);
      setLocked(false);
    }, 700);
  };

  const resetGame = () => {
    setFlipped([]);
    setMatched([]);
    setLocked(false);
  };

  return (
    <Section
      id="reasons"
      eyebrow="🎮 Birthday Memory Game"
      title="Match the love, birthday girl"
      subtitle="Cards flip karo aur same emojis ke pairs find karo. Har match tumhare liye ek little celebration hai. 💕"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-rose/25 bg-gradient-to-br from-rose/15 via-card/55 to-gold/10 p-6 shadow-[0_30px_90px_-35px_oklch(0.05_0.05_330_/_85%)] sm:p-10">
          <div className="pointer-events-none absolute -top-16 -right-10 text-[12rem] leading-none text-rose/5">♥</div>
          <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground">
            <span className="tracking-[0.2em] uppercase">Love pairs</span>
            <span className="text-gold">{matched.length / 2} of {CARD_ICONS.length} found ✨</span>
          </div>

          <div className="relative z-10 mx-auto mt-8 grid max-w-lg grid-cols-4 gap-3 sm:gap-4">
            {CARDS.map((card) => {
              const visible = flipped.includes(card.id) || matched.includes(card.id);
              return (
                <motion.button
                  key={card.id}
                  onClick={() => flipCard(card)}
                  whileHover={{ y: -5, scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative aspect-square rounded-2xl border text-3xl transition-all sm:text-4xl ${matched.includes(card.id) ? "border-gold bg-gold/15 shadow-[0_0_24px_oklch(0.85_0.12_85_/_24%)]" : visible ? "rotate-0 border-rose/50 bg-rose/15" : "border-border/70 bg-background/35 hover:border-rose/60 hover:bg-rose/10"}`}
                  aria-label={visible ? `Revealed ${card.icon}` : "Flip memory card"}
                >
                  <span className={`transition-all duration-300 ${visible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>{card.icon}</span>
                  {!visible && <span className="absolute inset-0 flex items-center justify-center text-2xl text-rose/70">♡</span>}
                  {matched.includes(card.id) && <span className="absolute -top-1 -right-1 text-xs text-gold">✦</span>}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {complete ? (
              <motion.div key="complete" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-6 text-center">
                <p className="text-4xl">🎉</p>
                <h3 className="script text-gradient mt-3 text-4xl sm:text-5xl">You found all my love!</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">Happy Birthday Too my, baby. ❤️
        badi jarur ho gyi ho lekin abhi bachi hi  ho mere liye Little Baby. Bas ase hi Smile Karet raho Or kya hi likhun kash main bhi apke sath birthday celebrate kar sakta 😭 But chalo koi na kabhi to karunga just wait for it Love You So muchh yaaaar 😭 At Last You are Extremely Beautifull Yaar🥹❤️
 ❤️</p>
                <button onClick={() => celebrate("big")} className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground">Celebrate our match ✨</button>
              </motion.div>
            ) : (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 mt-7 text-center text-sm text-muted-foreground">
                {flipped.length === 0 ? "Ek card choose karo, cutie 💌" : flipped.length === 1 ? "Ab iska perfect match dhoondo 👀" : "Checking your match... ✨"}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="relative z-10 mt-6 flex justify-center">
            <button onClick={resetGame} className="text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground">Start again ↻</button>
          </div>
        </div>
      </div>
    </Section>
  );
}
