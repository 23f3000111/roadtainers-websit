import { motion } from 'framer-motion';
import { ShieldCheck, Clock, MapPinned, Headphones } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const reasons = [
  { icon: Clock,       title: '24/7 Operations',         body: 'Round-the-clock dispatch and corridor monitoring — your cargo never sleeps.' },
  { icon: MapPinned,   title: 'GPS-Tracked Network',     body: 'Every unit is on a live tracking platform with corridor-level visibility.' },
  { icon: ShieldCheck, title: 'Safety First',            body: 'OSHA-compliant operations and a documented corridor safety record across every route.' },
  { icon: Headphones,  title: 'Single Point of Contact', body: 'One dedicated account manager from quote to proof-of-delivery.' },
];

export default function WhyUs() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-charcoal overflow-hidden">
      <div className="absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />
      <div className="relative container-px max-w-8xl mx-auto">
        <SectionHeading eyebrow="Why Roadtainers" title="Reliability" accent="As A Service." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative bg-brand-slate/60 border border-white/10 rounded-2xl p-6 hover:border-brand-green-bright/40 hover:bg-brand-slate hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20 mb-4 group-hover:bg-brand-yellow/15 transition">
                <r.icon className="w-6 h-6 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{r.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
