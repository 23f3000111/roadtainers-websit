import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { awards } from '../../data/awards';
import SectionHeading from '../ui/SectionHeading';

function AwardCard({ a, i, isLoneSolo }) {
  return (
    <motion.div
      key={a.title}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
      className={`group flex gap-5 bg-brand-slate/50 border border-white/10 rounded-2xl p-7 hover:border-brand-yellow/30 transition${isLoneSolo ? ' md:col-span-2 md:max-w-lg md:mx-auto w-full' : ''}`}
    >
      <div className="flex-none">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/15">
          <Award className="w-5 h-5 text-brand-yellow" />
        </div>
        <span className="block mt-3 text-2xl font-display font-bold text-brand-yellow">{a.year}</span>
      </div>
      <div>
        <h3 className="text-xl font-display font-bold mb-1">{a.title}</h3>
        <p className="text-white/65 text-sm leading-relaxed">{a.body}</p>
      </div>
    </motion.div>
  );
}

export default function Awards() {
  const isOdd = awards.length % 2 !== 0;
  return (
    <section className="py-24 md:py-32 bg-brand-ink">
      <div className="container-px max-w-8xl mx-auto">
        <SectionHeading eyebrow="Recognition" title="Award-Winning" accent="Operations." />
        <div className="grid md:grid-cols-2 gap-5">
          {awards.map((a, i) => (
            <AwardCard key={a.title} a={a} i={i} isLoneSolo={isOdd && i === awards.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
