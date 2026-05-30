import { motion } from 'framer-motion';
import { Truck, Container, Globe2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  { label: 'Fleet units',      value: '140+' },
  { label: 'Years experience', value: '25+'  },
  { label: 'Countries served', value: '6'    },
];

const beats = [
  { icon: Truck,     title: 'Built for the long haul', body: 'A purpose-built fleet of prime movers and specialised trailers, maintained in our own workshop.' },
  { icon: Container, title: 'Cargo of every kind',     body: 'Heavy haulage, containers, tankers, project cargo — one operator, one contact, one promise.' },
  { icon: Globe2,    title: 'East Africa, every day',  body: 'Mombasa to Kampala, Kigali, Juba, and Lubumbashi. We know the corridors because we run them.' },
];

export default function StoryScroll() {
  return (
    <section className="py-24 md:py-32 bg-brand-ink border-t border-white/5">
      <div className="container-px max-w-8xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative bg-brand-slate/60 border border-white/10 rounded-2xl p-8 flex items-baseline gap-4 overflow-hidden group hover:border-brand-yellow/30 transition"
            >
              <div className="absolute -right-2 -top-2 w-32 h-32 rounded-full bg-brand-yellow/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative text-5xl md:text-6xl font-display font-extrabold text-brand-yellow leading-none">
                <AnimatedCounter value={s.value} />
              </span>
              <span className="relative text-white/70 uppercase tracking-widest text-sm">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <SectionHeading eyebrow="The Roadtainers way" title="Heavy Cargo." accent="Quiet Confidence." />
        <div className="grid md:grid-cols-3 gap-5">
          {beats.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-brand-slate/50 border border-white/10 rounded-2xl p-6 hover:border-brand-green-bright/30 transition"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/15 mb-4">
                <b.icon className="w-5 h-5 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{b.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
