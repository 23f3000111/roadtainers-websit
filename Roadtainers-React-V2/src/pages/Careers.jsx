import { motion } from 'framer-motion';
import { Heart, Sparkles, Users } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import CareerForm from '../components/forms/CareerForm';

const tenets = [
  { icon: Sparkles, title: 'Creativity', body: 'We look for problem-solvers who bring fresh thinking to old logistics problems.' },
  { icon: Heart,    title: 'Honesty',    body: 'Straight talk with customers and with each other. No spin, no excuses.' },
  { icon: Users,    title: 'Intellectual rigor', body: 'A bias for getting it right — measured, documented, repeated.' },
];

export default function Careers() {
  return (
    <>
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src="/images/rt-career-slide1-1500x574.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/70 via-brand-ink/55 to-brand-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,163,74,0.25),transparent_55%)]" />

        <div className="relative container-px max-w-8xl mx-auto h-full flex flex-col justify-end pb-10 pt-28">
          <span className="inline-flex items-center gap-2 text-brand-yellow text-xs font-semibold tracking-[0.25em] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-yellow" />
            Careers
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tightest text-balance">
            Join our team at <span className="text-brand-yellow">Roadtainers</span> Mombasa Ltd.
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-ink">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            Roadtainers (Mombasa) Ltd is defined by our insistence on providing an unparalleled customer experience.
            All of our team members are charged with bringing <span className="text-brand-yellow">creativity</span>,
            <span className="text-brand-yellow"> honesty</span>, and <span className="text-brand-yellow">intellectual rigor</span>
            to their responsibilities in a never-ending quest to delight our customers.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-brand-ink">
        <div className="container-px max-w-8xl mx-auto grid md:grid-cols-3 gap-5">
          {tenets.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-brand-slate/60 border border-white/10 rounded-2xl p-7 hover:border-brand-yellow/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-yellow/10 border border-brand-yellow/15 mb-4">
                <t.icon className="w-5 h-5 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{t.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative py-16 md:py-20 bg-brand-charcoal border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" />
        <div className="relative container-px max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <span className="text-brand-yellow text-xs font-semibold tracking-[0.25em] uppercase">⬢ Apply</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-extrabold tracking-tightest">Email us your CV.</h2>
            <p className="mt-3 text-white/70 max-w-2xl mx-auto">
              Tell us about yourself using the form below. Your details land directly with our HR team.
            </p>
          </div>

          <div className="relative bg-brand-slate/60 border border-white/10 rounded-2xl p-6 md:p-9 backdrop-blur-sm">
            <CareerForm />
          </div>
        </div>
      </section>
    </>
  );
}
