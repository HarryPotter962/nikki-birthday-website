import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/birthdayData.js";
import Section from "./Section.jsx";
import { celebrate } from "./FX.jsx";
import BirthdayCard from "./BirthdayCard.jsx";
import { Download } from "lucide-react";

const reactionEmojis = {
  kiss: ["💋", "😘", "❤️", "💋", "😘", "❤️", "💋", "😘"],
  slap: ["🖐️", "💥", "😳", "🖐️", "💥", "😳", "🖐️", "💥"],
  dislike: ["😭", "😢", "💧", "😭", "😢", "💧", "😭", "😢"],
};

function FavoritePersonContent({ gift }) {
  const [reaction, setReaction] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!reaction) return undefined;
    const timeout = window.setTimeout(() => setReaction(null), reaction === "kiss" ? 2000 : 3000);
    return () => window.clearTimeout(timeout);
  }, [reaction]);

  const chooseReaction = (nextReaction) => {
    setRevealed(true);
    setReaction(nextReaction);
  };

  return (
    <div className="space-y-4 text-center">
      <p className="text-lg font-medium text-rose">
        {revealed ? "Surprise! Its  meee, baby! 😘" : "You need a gift? You know what is your favourite gift?"}
      </p>
      <div className="relative overflow-hidden rounded-2xl bg-secondary/50 p-2">
        {revealed ? (
          <img src={gift.content} alt="Your favourite gift" loading="lazy" className="max-h-[42vh] w-full rounded-xl object-contain" />
        ) : (
          <div className="flex min-h-48 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary text-7xl" aria-label="Surprise gift waiting to be revealed">
            🎁
          </div>
        )}
        {reaction && (
          <div className="pointer-events-none absolute inset-0" aria-live="polite">
            {reactionEmojis[reaction].map((emoji, index) => (
              <span
                key={`${reaction}-${index}`}
                className={`gift-reaction gift-reaction-${reaction}`}
                style={{ left: `${8 + ((index * 13) % 82)}%`, animationDelay: `${(index % 4) * 0.12}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => chooseReaction("kiss")} className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition hover:opacity-90">
          Kiss it 💋
        </button>
        <button type="button" onClick={() => chooseReaction("slap")} className="rounded-full bg-secondary px-4 py-2 text-sm transition hover:bg-muted">
          Slap it 🖐️
        </button>
        <button type="button" onClick={() => chooseReaction("dislike")} className="rounded-full border border-rose/40 px-4 py-2 text-sm transition hover:border-rose">
          I don&apos;t like it 😭
        </button>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">Are Cutie Don&apos;t worry, I will give you a gift. Wait for some time. ❤️</p>
    </div>
  );
}

function GiftContent({ gift }) {
  const { type, content, link } = gift;
  if (type === "favorite-person") return <FavoritePersonContent gift={gift} />;
  if (type === "image") {
    return content ? (
      <div className="space-y-4">
        <img src={content} alt={gift.title} loading="lazy" className="max-h-[58vh] w-full rounded-2xl object-contain" />
        <a
          href={content}
          download
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition hover:opacity-90"
        >
          <Download size={16} /> Download picture
        </a>
      </div>
    ) : (
      <p className="text-sm text-muted-foreground">Add an image path in birthdayData.js (e.g. /images/gift.jpg)</p>
    );
  }
  if (type === "video") {
    return content ? (
      <video src={content} controls playsInline preload="none" className="w-full rounded-2xl" />
    ) : (
      <p className="text-sm text-muted-foreground">Add a video path in birthdayData.js (e.g. /videos/gift.mp4)</p>
    );
  }
  if (type === "link") {
    return link ? (
      <a href={link} target="_blank" rel="noreferrer" className="text-rose underline underline-offset-4">
        {content || "Open it →"}
      </a>
    ) : (
      <p className="text-sm text-muted-foreground">{content || "Add a link in birthdayData.js"}</p>
    );
  }
  if (type === "song") {
    return (
      <div className="space-y-4 text-left">
        <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-50">
          <p className="mb-2 font-medium uppercase tracking-[0.18em] text-amber-300">One tiny warning</p>
          <p>{content || "I made this song for you with all my heart, even though it may not be perfect. I hope you still like it."}</p>
        </div>
        {link ? (
          <audio controls controlsList="nodownload" preload="metadata" className="w-full">
            <source src={link} />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p className="text-sm text-muted-foreground">Add a song in public/music and update the link in birthdayData.js</p>
        )}
      </div>
    );
  }
  if (type === "download") {
    return link ? (
      <a href={link} download className="inline-block rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
        Download ⬇
      </a>
    ) : (
      <p className="text-sm text-muted-foreground">Add a file in public/documents/ and set the link in birthdayData.js</p>
    );
  }
  return <p className="text-sm leading-relaxed text-foreground/90">{content}</p>;
}

export default function GiftsSection() {
  const [active, setActive] = useState(null);
  const [cardOpen, setCardOpen] = useState(false);
  const [cardViewed, setCardViewed] = useState(false);
  const gifts = data.gifts || [];

  useEffect(() => {
    const modalOpen = active !== null || cardOpen;
    document.body.style.overflow = modalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [active, cardOpen]);

  return (
    <Section
      id="gifts"
      eyebrow="🎁 Your Gifts"
      title="You thought that was it?"
      subtitle="Tap a box to unwrap it."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gifts.map((g, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07 }}
            whileHover={{ y: -6, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              if (g.type === "birthday-card") {
                setCardViewed(true);
                setCardOpen(true);
                celebrate("hearts");
                return;
              }
              setActive(i);
              celebrate("burst");
            }}
            className="glass hover:glow relative overflow-hidden rounded-3xl p-7 text-center"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose to-gold" />
            <motion.span animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 3.6, repeat: Infinity }} className="block text-5xl">
              {g.icon || "🎁"}
            </motion.span>
            <p className="display mt-3 text-xl">{g.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{g.teaser}</p>
          </motion.button>
        ))}
      </div>

      {cardViewed && data.birthdayCard?.pdf && (
        <div className="mt-5 flex justify-center">
          <a href={data.birthdayCard.pdf} download className="rounded-full border border-rose/40 bg-secondary/70 px-6 py-3 text-sm font-medium transition-all hover:border-rose hover:bg-secondary">
            Download the card &amp; keep forever 💌
          </a>
        </div>
      )}

      <AnimatePresence>
        {cardOpen && <BirthdayCard onClose={() => setCardOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {active !== null && gifts[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-background/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass glow max-h-[calc(100vh-2rem)] w-full max-w-lg space-y-4 overflow-y-auto rounded-3xl p-5 sm:p-7"
            >
              <p className="text-4xl">{gifts[active].icon || "🎁"}</p>
              <h3 className="display text-2xl text-rose">{gifts[active].title}</h3>
              <GiftContent gift={gifts[active]} />
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setActive(null);
                }}
                className="mt-2 rounded-full bg-secondary px-5 py-2.5 text-sm"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
