import { motion } from "framer-motion";
import data from "../data/birthdayData.js";

export default function BirthdayCelebration({ onSecret }) {
  return (
    <section id="journey" className="relative z-10 scroll-mt-16 px-5 pt-28 pb-24 sm:pt-40 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-4 text-[10px] tracking-[0.35em] text-gold uppercase">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/60" />
            <span>For you, with love</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <p className="text-[11px] tracking-[0.35em] text-muted-foreground uppercase">Your birthday journey</p>
          <h1 className="script text-gradient mt-4 text-6xl leading-none sm:text-8xl">Happy Birthday, My Princess ❤️</h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Tum meri life ka woh beautiful chapter ho jise main har din dobara padhna chahta hoon. 💕
            Yeh chhota sa corner sirf tumhare liye hai, meri jaanu.
          </p>
          <button
            onClick={onSecret}
            aria-label="A little heart"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/20 px-5 py-2.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:border-rose/60 hover:text-foreground"
          >
            <span className="text-xl transition-transform group-hover:scale-125">❤️</span>
            <span>Yahan tumhare liye ek chhota sa secret hai 👀</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 border-y border-border/60 py-5 text-center"
        >
          <div>
            <p className="display text-2xl text-gold sm:text-3xl">∞</p>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Little moments</p>
          </div>
          <div className="border-x border-border/60">
            <p className="display text-2xl text-rose sm:text-3xl">1</p>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Special girl</p>
          </div>
          <div>
            <p className="display text-2xl text-gold sm:text-3xl">♥</p>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Full heart</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
        >
          <span className="h-8 w-px bg-gradient-to-b from-transparent via-rose to-transparent" />
          <span>Keep scrolling, there is more for you</span>
        </motion.div>
      </div>
    </section>
  );
}
