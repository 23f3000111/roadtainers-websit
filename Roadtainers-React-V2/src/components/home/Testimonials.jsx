import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-brand-charcoal border-t border-white/5">
      <div className="container-px max-w-8xl mx-auto">
        <SectionHeading eyebrow="Clients" title="What Our" accent="Partners Say." align="center" />
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative bg-brand-slate/60 border border-white/10 rounded-2xl p-7 hover:border-brand-yellow/40 hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="absolute top-5 right-5 w-10 h-10 text-brand-yellow/15" />
              <blockquote className="text-white/85 leading-relaxed text-lg">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10 text-sm text-white/60">
                <span className="block font-semibold text-white/90">{t.author}</span>
                {t.company}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
