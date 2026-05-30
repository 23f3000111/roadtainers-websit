import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { faqCategories } from '../data/faq';

function FaqItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={`border rounded-xl overflow-hidden transition-colors duration-200 ${
        isOpen
          ? 'border-brand-yellow/50 bg-brand-slate'
          : 'border-white/10 bg-brand-slate/40 hover:border-white/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base leading-snug transition-colors ${isOpen ? 'text-brand-yellow' : 'text-white/90'}`}>
          {item.q}
        </span>
        <span className={`flex-none w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
          isOpen ? 'border-brand-yellow bg-brand-yellow/10 text-brand-yellow' : 'border-white/20 text-white/50'
        }`}>
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-6 pb-5 pt-1 text-white/70 leading-relaxed border-t border-white/5 text-sm">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CategoryBlock({ cat, globalOpen, setOpen }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-bold tracking-[0.22em] uppercase text-brand-yellow/80 px-1">
          {cat.label}
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <div className="space-y-3">
        {cat.items.map((item, i) => {
          const id = `${cat.id}-${i}`;
          return (
            <FaqItem
              key={id}
              item={item}
              index={i}
              isOpen={globalOpen === id}
              onToggle={() => setOpen(globalOpen === id ? null : id)}
            />
          );
        })}
      </div>
    </motion.section>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Answers to common questions."
        intro="Everything you need to know about working with Roadtainers — from cargo types and tracking to quotes and transit times."
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <section className="relative py-20 md:py-28 bg-brand-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-30 pointer-events-none" />

        <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-brand-green-bright/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-brand-yellow/4 blur-3xl pointer-events-none" />

        <div className="relative container-px max-w-3xl mx-auto space-y-12">
          {faqCategories.map(cat => (
            <CategoryBlock
              key={cat.id}
              cat={cat}
              globalOpen={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      </section>

      <section className="py-16 bg-brand-charcoal border-t border-white/5">
        <motion.div
          className="container-px max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20 mb-5">
            <MessageCircle className="w-6 h-6 text-brand-yellow" />
          </div>
          <h2 className="text-3xl font-display font-extrabold mb-3">Still have questions?</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Our team is available around the clock. Reach out and we'll get back to you within one business day.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-yellow text-brand-ink font-semibold px-6 py-3 rounded-full hover:brightness-110 transition"
            >
              Contact Us
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition"
            >
              Get a Quote
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
