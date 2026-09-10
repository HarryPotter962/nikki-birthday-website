import { useEffect, useMemo, useState } from "react";

/** Fire confetti safely (client only, lazily loaded). */
export async function celebrate(kind = "burst") {
  if (typeof window === "undefined") return;
  try {
    const confetti = (await import("canvas-confetti")).default;
    const rose = ["#ff8fab", "#ffc2d1", "#f7d488", "#fff0f3", "#e0a3c4"];
    if (kind === "hearts") {
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 }, colors: rose, scalar: 1.1, ticks: 220 });
      return;
    }
    if (kind === "big") {
      const end = Date.now() + 1400;
      (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors: rose });
        confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors: rose });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.55 }, colors: rose, scalar: 1.2 });
      return;
    }
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.65 }, colors: rose });
  } catch {
    /* confetti is decorative — never break the page */
  }
}

/** Soft hearts drifting up the screen. */
export function FloatingHearts({ count = 14 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        delay: Math.random() * 14,
        duration: 14 + Math.random() * 14,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((h) => (
        <span
          key={h.id}
          className="animate-float-up absolute bottom-[-10vh] select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            opacity: h.opacity,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}

/** Twinkling starfield. */
export function StarField({ count = 60 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.6,
        delay: Math.random() * 4,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="animate-twinkle absolute rounded-full bg-foreground"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Renders children only after hydration (safe for random/browser-only visuals). */
export function ClientOnly({ children }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return children;
}
