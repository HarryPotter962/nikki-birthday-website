import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, subtitle, children, className = "" }) {
  return (
    <section id={id} className={`relative z-10 scroll-mt-16 px-5 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          {eyebrow && (
            <p className="mb-3 text-[11px] tracking-[0.35em] text-muted-foreground uppercase">{eyebrow}</p>
          )}
          {title && <h2 className="display text-3xl sm:text-5xl">{title}</h2>}
          {subtitle && <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
