import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import NetworkMap from '../components/network/NetworkMap';
import { COUNTRY_NAMES } from '../data/corridors';

export default function Network() {
  return (
    <>
      <PageHeader
        eyebrow="Our network"
        title="Your Cargo, Every Corridor."
        intro="From Mombasa to Goma, Kigali to Juba — our logistics network spans East Africa's most critical trade corridors with 24/7 fleet visibility."
        breadcrumbs={[{ label: 'Network' }]}
      />

      <section className="py-20 bg-brand-ink">
        <div className="container-px max-w-8xl mx-auto">
          <NetworkMap />
        </div>
      </section>

      <section className="py-20 bg-brand-charcoal border-t border-white/5">
        <div className="container-px max-w-8xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4">Countries Served</h2>
            <p className="text-white/65 mb-10 leading-relaxed">
              We move cargo across the six East African countries where our trucks, drivers and clearance teams operate every day.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COUNTRY_NAMES.map(c => (
                <li
                  key={c}
                  className="px-4 py-4 bg-brand-ink/60 border border-white/10 rounded-xl font-semibold tracking-wide hover:border-brand-yellow/40 transition"
                >
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
