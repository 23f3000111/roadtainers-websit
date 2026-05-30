import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const slides = [
  {
    image: '/images/Roadtainers_hero.jpg',
    eyebrow: 'Trusted since 1998',
    title: 'Logistics Built',
    accent: 'For Scale.',
    body: 'Heavy transport, container logistics, cross-border operations and fleet power built for East Africa\'s most demanding corridors.',
  },
  {
    image: '/images/Transport.jpg',
    eyebrow: 'Heavy Haulage',
    title: 'Loads Others',
    accent: 'Can\'t Move.',
    body: 'Specialised low-bed and modular trailers up to 120 tonnes — engineered for project cargo.',
  },
  {
    image: '/images/Roadtainers_network.jpg',
    eyebrow: 'Six Countries. One Network.',
    title: 'Every Corridor,',
    accent: 'Every Day.',
    body: 'Mombasa to Kampala, Kigali, Juba, and Lubumbashi — moving with 24/7 GPS visibility.',
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setI(v => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [prefersReduced]);

  const s = slides[i];

  return (
    <section className="relative min-h-[640px] h-screen max-h-[860px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-ink/90 via-brand-charcoal/75 to-brand-ink/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(31,163,74,0.18),transparent_55%)]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container-px max-w-8xl mx-auto h-full flex flex-col justify-end pb-14 md:pt-28">
        <motion.span
          key={`eye-${i}`}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="inline-flex items-center gap-2 text-brand-yellow text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-6"
        >
          ⬢ {s.eyebrow}
        </motion.span>

        <motion.h1
          key={`t-${i}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.95] tracking-tightest text-balance max-w-5xl"
        >
          {s.title}<br />
          <span className="text-brand-yellow">{s.accent}</span>
        </motion.h1>

        <motion.p
          key={`p-${i}`}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl"
        >
          {s.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/quote" className="inline-flex items-center gap-2 bg-brand-yellow text-brand-ink font-semibold px-7 py-4 rounded-full hover:brightness-110 transition">
            Get Quote <ArrowUpRight className="w-5 h-5" />
          </Link>
          <Link to="/network" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white font-semibold px-7 py-4 rounded-full border border-white/20 hover:bg-white/20 transition">
            Explore Network
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-10 bg-brand-yellow' : 'w-6 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
