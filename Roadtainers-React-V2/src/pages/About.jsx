import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import { awards } from '../data/awards';

const values = [
  { title: 'Reliability',  body: 'We stick to our word — every quote, every ETA, every promise.' },
  { title: 'Consistency',  body: 'Same standard, every corridor, every load.' },
  { title: 'Capability',   body: 'A fleet built for what others can\'t move.' },
];

const milestones = [
  { year: '1998', body: 'Roadtainers founded in Mombasa. First cross-border corridor to Kampala established. Heavy-haulage division launched with low-bed fleet.' },
  { year: '2003', body: 'Network extended to DRC and South Sudan.' },
  { year: '2010', body: 'Car Carrier service established.' },
  { year: '2013', body: 'Storage and Warehouse division launched.' },
  { year: '2017', body: 'Fleet surpasses 140 units; full GPS visibility deployed.' },
  { year: '2024', body: 'Expanded heavy lift division.' },
];

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built in Mombasa. Trusted across East Africa."
        intro="Roadtainers Mombasa Ltd has moved East Africa's most demanding cargo since 1998. From a single truck to a fleet of 140+ units, our story is one of consistency, capability, and customer trust."
        breadcrumbs={[{ label: 'About' }]}
      />

      <section className="py-20 bg-brand-ink">
        <div className="container-px max-w-8xl mx-auto grid lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative bg-brand-slate/60 border border-white/10 rounded-2xl p-8 hover:border-brand-yellow/30 transition"
            >
              <span className="absolute top-8 right-8 font-display font-extrabold text-5xl text-brand-yellow/10">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase">Value</span>
              <h3 className="mt-2 text-2xl font-display font-bold mb-2">{v.title}</h3>
              <p className="text-white/70 leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-20 bg-brand-charcoal border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-50 pointer-events-none" />
        <div className="relative container-px max-w-8xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-12">Our journey</h2>
          <ol className="relative space-y-8 max-w-3xl border-l border-white/10 pl-8">
            {milestones.map((m, i) => (
              <motion.li key={m.year}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-brand-yellow ring-4 ring-brand-charcoal" />
                <span className="block text-2xl md:text-3xl font-display font-bold text-brand-yellow leading-none">{m.year}</span>
                <p className="mt-2 text-base md:text-lg text-white/85 leading-relaxed">{m.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 bg-brand-ink border-t border-white/5">
        <div className="container-px max-w-8xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-10">Awards</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {awards.map((a, i) => (
              <div
                key={a.title}
                className={`group bg-brand-slate/50 border border-white/10 rounded-2xl p-7 hover:border-brand-yellow/30 transition${awards.length % 2 !== 0 && i === awards.length - 1 ? ' md:col-span-2 md:max-w-lg md:mx-auto w-full' : ''}`}
              >
                <span className="block text-2xl font-display font-bold text-brand-yellow mb-1">{a.year}</span>
                <h3 className="text-lg font-display font-semibold mb-1">{a.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
