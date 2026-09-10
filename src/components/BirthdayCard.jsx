import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "../data/birthdayData.js";
import { celebrate } from "./FX.jsx";
import { Download } from "lucide-react";

const pages = ["cardPage1", "cardPage2", "cardPage3", "cardPage4", "cardPage5"];

export default function BirthdayCard({ onClose }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);
  const card = data.birthdayCard;
  const image = card?.[pages[page]];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !card?.song) return;

    const startAudio = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        setPlaying(false);
      }
    };

    startAudio();

    return () => {
      audio.pause();
      setPlaying(false);
    };
  }, [card?.song]);

  const closeCard = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaying(false);
    onClose();
  };

  const toggleSong = () => {
    const audio = audioRef.current;
    if (!audio || !card?.song) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const turn = (nextPage) => {
    if (nextPage < 0 || nextPage >= pages.length || nextPage === page) return;
    setDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
    if (nextPage === pages.length - 1) celebrate("hearts");
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") turn(page + 1);
      if (event.key === "ArrowLeft") turn(page - 1);
      if (event.key === "Escape") closeCard();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page, onClose, closeCard]);

  const onTouchStart = (event) => setTouchStart(event.changedTouches[0].clientX);
  const onTouchEnd = (event) => {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) turn(distance < 0 ? page + 1 : page - 1);
    setTouchStart(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-[oklch(0.08_0.04_330_/_90%)] p-3 backdrop-blur-xl sm:p-6"
      onClick={closeCard}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        className="birthday-card-modal relative flex max-h-[96svh] w-full max-w-5xl flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between px-2 text-sm text-paper/80 sm:px-4">
          <span className="tracking-[0.18em] uppercase">Nikki&apos;s birthday card 💌</span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeCard();
            }}
            className="rounded-full border border-paper/20 px-3 py-1.5 text-xs transition-colors hover:border-gold hover:text-gold"
          >
            Close ×
          </button>
        </div>

        <div
          className="birthday-card-stage"
          onClick={() => turn(page + 1)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="button"
          tabIndex={0}
          aria-label={`Birthday card page ${page + 1} of ${pages.length}. Tap to turn page.`}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") turn(page + 1);
          }}
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              turn(page - 1);
            }}
            disabled={page === 0}
            className="birthday-card-edge-control birthday-card-edge-control-prev"
            aria-label="Previous card page"
          >
            ‹
          </button>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0.3, x: direction > 0 ? 28 : -28 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0.25, x: direction > 0 ? -28 : 28 }}
              transition={{ duration: 1.15, ease: [0.22, 0.72, 0.18, 1] }}
              className="birthday-card-page"
              style={{ transformOrigin: direction > 0 ? "left center" : "right center" }}
            >
              {image ? (
                <img src={image} alt={`Birthday card page ${page + 1}`} draggable="false" />
              ) : (
                <div className="birthday-card-missing">
                  <span>💌</span>
                  <p>Add `cardPage{page + 1}` in birthdayData.js</p>
                </div>
              )}
              <span className="birthday-card-page-number">{page + 1} / {pages.length}</span>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={(event) => {
              event.stopPropagation();
              turn(page + 1);
            }}
            disabled={page === pages.length - 1}
            className="birthday-card-edge-control birthday-card-edge-control-next"
            aria-label="Next card page"
          >
            ›
          </button>
        </div>

        <div className="flex w-full max-w-xl items-center justify-between gap-3 px-2 sm:px-4">
          <button onClick={() => turn(page - 1)} disabled={page === 0} className="birthday-card-control" aria-label="Previous card page">
            ← <span className="hidden sm:inline">Previous</span>
          </button>
          <span className="birthday-card-page-count" aria-label={`Page ${page + 1} of ${pages.length}`}>{page + 1} / {pages.length}</span>
          <button onClick={() => turn(page + 1)} disabled={page === pages.length - 1} className="birthday-card-control" aria-label="Next card page">
            <span className="hidden sm:inline">Next</span> →
          </button>
        </div>
        {card?.song && (
          <div className="birthday-card-song-row">
            <audio ref={audioRef} src={card.song} loop onEnded={() => setPlaying(false)} />
            <button onClick={toggleSong} className="birthday-card-song-button">
              {playing ? "❚❚ Pause our song" : "▶ Play our song"} 🎶
            </button>
          </div>
        )}
        {card?.pdf && (
          <a href={card.pdf} download className="birthday-card-song-button inline-flex items-center gap-2">
            <Download size={16} /> Download birthday card
          </a>
        )}
        <p className="text-center text-xs text-paper/60">Use the arrows, swipe on phone, or press ← → keys</p>
      </motion.div>
    </motion.div>
  );
}
