import { motion } from 'framer-motion';
import { Clock, Shield, Truck } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import QuoteForm from '../components/forms/QuoteForm';

const promises = [
  { icon: Clock,  title: '24-hour response',     body: 'A tailored quote in your inbox within one business day.' },
  { icon: Shield, title: 'No spam, ever',        body: 'Your details stay between us. We never share or sell data.' },
  { icon: Truck,  title: 'One contact, end-to-end', body: 'A dedicated account manager from quote to delivery.' },
];

export default function Quote() {
  return (
    <>
      <PageHeader
        eyebrow="Get a quote"
        title="Tell us about your cargo."
        intro="Heavy haulage, containers, tankers, project cargo — the more detail you share, the sharper the quote we can return."
        breadcrumbs={[{ label: 'Get Quote' }]}
      />

      <section className="relative py-20 bg-brand-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" />
        <div className="relative container-px max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-2 bg-brand-slate/60 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <QuoteForm />
          </motion.div>

          <motion.aside
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            {promises.map(p => (
              <div key={p.title} className="group bg-brand-slate/50 border border-white/10 rounded-2xl p-5 hover:border-brand-yellow/30 transition">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-yellow/10 border border-brand-yellow/15 mb-3">
                  <p.icon className="w-5 h-5 text-brand-yellow" />
                </div>
                <h3 className="text-lg font-display font-bold mb-1">{p.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </motion.aside>
        </div>
      </section>
    </>
  );
}
