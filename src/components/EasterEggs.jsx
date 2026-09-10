import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/birthdayData.js";
import { celebrate } from "./FX.jsx";

/** Hidden surprises: 5 heart clicks, long-press anywhere, and the konami code. */
export function useEasterEggs() {
  const [message, setMessage] = useState(null);
  const [heartClicks, setHeartClicks] = useState(0);

  const reveal = (text) => {
    setMessage(text);
    celebrate("hearts");
  };

  const clickHeart = () => {
    setHeartClicks((c) => {
      const n = c + 1;
      if (n === 5) {
        reveal(data.easterEggs.heartFiveClicks);
        return 0;
      }
      return n;
    });
  };

  useEffect(() => {
    let timer = null;
    const start = () => {
      timer = setTimeout(() => reveal(data.easterEggs.longPress), 1400);
    };
    const cancel = () => {
      if (timer) clearTimeout(timer);
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", cancel);
    window.addEventListener("touchmove", cancel, { passive: true });

    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"];
    let idx = 0;
    const onKey = (e) => {
      idx = e.key === seq[idx] ? idx + 1 : 0;
      if (idx === seq.length) {
        idx = 0;
        reveal(data.easterEggs.konami);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancel();
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", cancel);
      window.removeEventListener("touchmove", cancel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return { message, close: () => setMessage(null), clickHeart };
}

export function EasterEggModal({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 p-5 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass glow max-w-md space-y-4 rounded-3xl p-7 text-center"
          >
            <p className="text-3xl">🥹</p>
            <p className="display text-xl text-rose">You found a secret</p>
            <p className="text-sm leading-relaxed">{message}</p>
            <button onClick={onClose} className="rounded-full bg-secondary px-5 py-2.5 text-sm">
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
