import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import data from "../data/birthdayData.js";

export default function MusicPlayer({ autoStart = false, playRequest = 0, onPlayingChange }) {
  const tracks = data.music || [];
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

  const track = tracks[index];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume, index]);

  useEffect(() => {
    if (!autoStart || !track) return;
    const a = audioRef.current;
    if (!a) return;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart, track]);

  useEffect(() => {
    if (!playRequest || !track) return;
    const a = audioRef.current;
    if (!a) return;
    a.play()
      .then(() => {
        setPlaying(true);
        onPlayingChange?.(true);
      })
      .catch(() => {
        setPlaying(false);
        onPlayingChange?.(false);
        setFailed(true);
      });
  }, [playRequest, track, onPlayingChange]);

  if (!tracks.length) return null;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      onPlayingChange?.(false);
    } else {
      a.play()
        .then(() => {
          setPlaying(true);
          onPlayingChange?.(true);
        })
        .catch(() => {
          onPlayingChange?.(false);
          setFailed(true);
        });
    }
  };

  const next = () => {
    setIndex((i) => (i + 1) % tracks.length);
    setPlaying(false);
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      <audio
        ref={audioRef}
        src={track?.src}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
        }}
        onEnded={next}
        onError={() => setFailed(true)}
        loop={tracks.length === 1}
      />
      <motion.div layout className="glass flex items-center gap-3 rounded-full p-2 pr-3">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <motion.span animate={playing ? { rotate: 360 } : {}} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
            {playing ? "❚❚" : "♪"}
          </motion.span>
        </button>
        <button onClick={() => setOpen((o) => !o)} className="text-left text-xs text-muted-foreground">
          {failed ? "Add a song in /public/music" : track?.title || "Music"}
        </button>
      </motion.div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-2 w-60 space-y-3 rounded-2xl p-4"
        >
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <label className="block text-xs text-muted-foreground">
            Volume
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="mt-1 w-full accent-[oklch(0.74_0.17_3)]"
            />
          </label>
          {tracks.length > 1 && (
            <button onClick={next} className="text-xs text-foreground/80 hover:text-foreground">
              Next song →
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
