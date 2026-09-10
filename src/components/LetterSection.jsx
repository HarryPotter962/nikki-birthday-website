import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import data from "../data/birthdayData.js";
import Section from "./Section.jsx";
import { celebrate } from "./FX.jsx";

function Typed({ text, start, speed = 18, className }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!start) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return <p className={className}>{start ? shown : ""}</p>;
}

export default function LetterSection() {
  const [opened, setOpened] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const letter = data.letter;

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();

      // Cream paper
      doc.setFillColor(253, 248, 243);
      doc.rect(0, 0, W, H, "F");
      // Rose border
      doc.setDrawColor(214, 130, 148);
      doc.setLineWidth(1.4);
      doc.rect(34, 34, W - 68, H - 68);
      doc.setLineWidth(0.4);
      doc.rect(42, 42, W - 84, H - 84);

      doc.setTextColor(176, 74, 98);
      doc.setFont("times", "italic");
      doc.setFontSize(30);
      doc.text(`For ${data.name}`, W / 2, 110, { align: "center" });
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("♥  H A P P Y   B I R T H D A Y  ♥", W / 2, 134, { align: "center" });

      doc.setTextColor(60, 45, 50);
      doc.setFont("times", "italic");
      doc.setFontSize(16);
      doc.text(letter.greeting, 72, 186);

      doc.setFont("times", "normal");
      doc.setFontSize(12.5);
      let y = 216;
      for (const p of letter.paragraphs) {
        const lines = doc.splitTextToSize(p, W - 144);
        for (const line of lines) {
          if (y > H - 150) {
            doc.addPage();
            doc.setFillColor(253, 248, 243);
            doc.rect(0, 0, W, H, "F");
            y = 90;
          }
          doc.text(line, 72, y);
          y += 20;
        }
        y += 10;
      }

      doc.setFont("times", "italic");
      doc.setTextColor(176, 74, 98);
      doc.setFontSize(14);
      doc.text(letter.signOff, 72, Math.min(y + 24, H - 110));
      doc.setFontSize(18);
      doc.text(data.from, 72, Math.min(y + 52, H - 84));

      doc.save(`A-Letter-For-${data.name}.pdf`);
      celebrate("hearts");
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Section
      id="letter"
      eyebrow="💌 A Letter For You"
      title="Something I wrote, only for you"
      subtitle="Kuch feelings bolna mushkil hota hai, isliye aaj dil ne likha hai. ✨"
      className="letter-section"
    >
      <div className="mx-auto max-w-3xl">
        {!opened ? (
          <motion.button
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpened(true)}
            className="letter-envelope glass group relative mx-auto flex min-h-72 w-full max-w-lg flex-col items-center justify-center gap-4 overflow-hidden rounded-[2rem] px-8 py-14"
          >
            <span className="letter-sparkle absolute top-8 left-10 text-gold">✦</span>
            <span className="letter-sparkle absolute right-12 bottom-10 text-rose">✧</span>
            <motion.span
              animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 text-7xl drop-shadow-[0_12px_18px_oklch(0.05_0.05_330_/_45%)]"
            >
              💌
            </motion.span>
            <span className="display relative z-10 text-3xl text-foreground">A letter for my love</span>
            <span className="relative z-10 text-sm text-muted-foreground">Sealed with love. Tap to open. 💕</span>
            <span className="relative z-10 mt-2 rounded-full border border-rose/40 px-5 py-2 text-[10px] tracking-[0.25em] text-rose uppercase transition-colors group-hover:bg-rose/10">
              Open gently
            </span>
          </motion.button>
        ) : (
          <motion.article
            initial={{ opacity: 0, rotateX: -12, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="letter-paper relative overflow-hidden rounded-[1.5rem] p-7 shadow-[0_30px_80px_-30px_oklch(0.05_0.05_330)] sm:p-12"
            style={{
              background:
                "radial-gradient(100% 60% at 0% 0%, oklch(1 0.03 85), transparent 65%), linear-gradient(135deg, oklch(0.98 0.025 85), oklch(0.93 0.04 70))",
              color: "var(--ink)",
            }}
          >
            <div className="pointer-events-none absolute top-0 right-0 h-28 w-28 rounded-bl-[5rem] bg-rose/10" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-36 rounded-tr-[5rem] bg-gold/10" />
            <span className="pointer-events-none absolute top-5 right-7 text-4xl text-rose/30">♡</span>
            <div className="relative mb-8 flex items-center justify-between border-b border-[oklch(0.55_0.15_5_/_22%)] pb-5">
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "oklch(0.55 0.15 5)" }}>
                Written from my heart
              </span>
              <span className="text-xl" style={{ color: "oklch(0.55 0.15 5)" }}>♥</span>
            </div>
            <p className="script text-3xl" style={{ color: "oklch(0.55 0.15 5)" }}>
              {letter.greeting}
            </p>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed sm:text-base">
              {letter.paragraphs.map((p, i) => (
                <Typed key={`${i}-${opened}`} text={p} start={opened} speed={12 + i} className="" />
              ))}
            </div>
            <p className="script mt-8 text-2xl" style={{ color: "oklch(0.55 0.15 5)" }}>
              {letter.signOff}
            </p>
            <p className="script text-3xl" style={{ color: "oklch(0.45 0.12 10)" }}>
              {data.from}
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-[oklch(0.55_0.15_5_/_22%)] pt-5 text-xs" style={{ color: "oklch(0.55 0.15 5)" }}>
              <span className="text-lg">✨</span>
              <span>Har word tumhare liye, meri jaan.</span>
              <span className="ml-auto text-lg">❤️</span>
            </div>
          </motion.article>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={downloadPdf}
            disabled={downloading}
            className="rounded-full border border-rose/40 bg-secondary/70 px-6 py-3 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-rose hover:bg-secondary disabled:opacity-60"
          >
            {downloading ? "Preparing your letter…" : "Keep this letter forever 💌"}
          </button>
        </div>
      </div>
    </Section>
  );
}
