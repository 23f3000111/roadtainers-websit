import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, accent, intro, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}
      className={`max-w-3xl mb-12 ${alignClass}`}
    >
      {eyebrow && <span className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase">⬢ {eyebrow}</span>}
      <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tightest text-balance">
        {title} {accent && <span className="text-brand-yellow">{accent}</span>}
      </h2>
      {intro && <p className="mt-4 text-white/70 text-lg leading-relaxed">{intro}</p>}
    </motion.div>
  );
}
