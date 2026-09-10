import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import data from "../data/birthdayData.js";
import Section from "./Section.jsx";

function nextBirthday(dateStr) {
  const base = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(base.getTime())) return null;
  const now = new Date();
  const target = new Date(now.getFullYear(), base.getMonth(), base.getDate());
  const isToday =
    now.getMonth() === base.getMonth() && now.getDate() === base.getDate();
  if (!isToday && target < now) target.setFullYear(now.getFullYear() + 1);
  return { target, isToday, base };
}

export default function Countdown() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const info = nextBirthday(data.birthday);
  if (!info) return null;

  const { target, isToday, base } = info;
  const diff = now ? Math.max(0, target.getTime() - now) : 0;
  const units = [
    { label: "Days", value: Math.floor(diff / 86400000) },
    { label: "Hours", value: Math.floor(diff / 3600000) % 24 },
    { label: "Minutes", value: Math.floor(diff / 60000) % 60 },
    { label: "Seconds", value: Math.floor(diff / 1000) % 60 },
  ];
  const yearsTogether = new Date().getFullYear() - base.getFullYear();

  return (
    <Section id="countdown" eyebrow="⏳ The Clock" title={isToday ? "It's today." : "Counting down to you"}>
      {isToday ? (
        <div className="glass mx-auto max-w-xl rounded-3xl p-8 text-center">
          <p className="script text-gradient text-4xl sm:text-5xl">Today is your day, {data.name}</p>
          <p className="mt-3 text-muted-foreground">
            The whole internet is boring today except this little corner, which is entirely yours.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
          {units.map((u) => (
            <motion.div
              key={u.label}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl px-2 py-5 text-center sm:px-4 sm:py-7"
            >
              <div className="display text-gradient text-3xl sm:text-5xl">
                {now === null ? "--" : String(u.value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:text-xs">
                {u.label}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {yearsTogether > 0 && !isToday && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          And it&apos;s been {yearsTogether} year{yearsTogether > 1 ? "s" : ""} of me being glad you exist.
        </p>
      )}
    </Section>
  );
}
