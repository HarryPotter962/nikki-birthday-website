import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SECTIONS = [
  { id: "journey", label: "Journey", icon: "🏠" },
  { id: "letter", label: "Letter", icon: "💌" },
  { id: "videos", label: "Videos", icon: "🎬" },
  { id: "gifts", label: "Gifts", icon: "🎁" },
  { id: "reasons", label: "You", icon: "❤️" },
  { id: "stars", label: "Reasons", icon: "🌠" },
  { id: "forever", label: "Forever", icon: "∞" },
  { id: "final", label: "Finale", icon: "🌙" },
];

export function scrollToSection(id) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navigation() {
  const [active, setActive] = useState("journey");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-rose to-gold transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Desktop rail */}
      <nav className="fixed top-1/2 left-5 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(s.id)}
            className="group flex items-center gap-3"
            aria-label={s.label}
          >
            <span
              className={`h-2.5 rounded-full transition-all ${
                active === s.id ? "w-9 bg-primary shadow-[0_0_14px_var(--rose)]" : "w-2.5 bg-muted-foreground/40 group-hover:bg-primary/60"
              }`}
            />
            <span className="glass rounded-full px-3 py-1.5 text-[11px] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {s.icon} {s.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Mobile pill */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 lg:hidden">
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mb-2 grid max-w-[92vw] grid-cols-5 gap-1 rounded-2xl p-2"
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  scrollToSection(s.id);
                  setOpen(false);
                }}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[10px] ${
                  active === s.id ? "bg-primary/20 text-foreground" : "text-muted-foreground"
                }`}
              >
                <span className="text-base">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
        <button
          onClick={() => setOpen((o) => !o)}
          className="glass mx-auto flex items-center gap-2 rounded-full px-5 py-3 text-xs tracking-wide"
        >
          <span>{open ? "✕" : "✦"}</span>
          {Math.round(progress)}% of your journey
        </button>
      </div>
    </>
  );
}
