import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allFaqs } from '../../data/faq';
import SectionHeading from '../ui/SectionHeading';

const PREVIEW_FAQS = allFaqs.slice(0, 5);

function FaqRow({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`border-b transition-colors ${isOpen ? 'border-brand-yellow/30' : 'border-white/10'}`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-brand-yellow' : 'text-white/85 group-hover:text-white'}`}>
          {item.q}
        </span>
        <span className={`flex-none w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
          isOpen ? 'border-brand-yellow bg-brand-yellow/10 text-brand-yellow' : 'border-white/15 text-white/40 group-hover:border-white/30'
        }`}>
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="pb-5 text-white/65 text-sm leading-relaxed pr-10">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPreview() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-24 md:py-32 bg-brand-ink border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent" />

      <div className="relative container-px max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Common"
              accent="Questions."
              intro="Quick answers to what our clients ask most."
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-brand-yellow font-semibold hover:gap-3 transition-all text-sm mt-2"
              >
                View all questions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="border-t border-white/10">
            {PREVIEW_FAQS.map((item, i) => (
              <FaqRow
                key={i}
                item={item}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}

            <motion.div
              className="pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 font-semibold px-5 py-3 rounded-full hover:bg-brand-yellow hover:text-brand-ink hover:border-brand-yellow transition-all text-sm"
              >
                Load more questions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
