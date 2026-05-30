import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import ServiceModal from '../ui/ServiceModal';

const CARD_W = 320;
const GAP    = 20;
const STEP   = CARD_W + GAP;
const SPEED  = 0.035;

export default function ServicesPreview() {
  const trackRef  = useRef(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [openSlug, setOpenSlug] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let raf;
    let last = performance.now();
    const halfWidth = STEP * services.length;
    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) offsetRef.current -= dt * SPEED;
      while (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
      while (offsetRef.current > 0)           offsetRef.current -= halfWidth;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const slug = searchParams.get('service');
    if (slug && services.some(s => s.slug === slug)) {
      setOpenSlug(slug);
      pausedRef.current = true;
    }
  }, [searchParams]);

  const nudge = (dir) => { offsetRef.current -= dir * STEP; };

  const open = (slug) => {
    setOpenSlug(slug);
    pausedRef.current = true;
    const next = new URLSearchParams(searchParams);
    next.set('service', slug);
    setSearchParams(next, { replace: true });
  };

  const close = () => {
    setOpenSlug(null);
    pausedRef.current = hovered;
    const next = new URLSearchParams(searchParams);
    next.delete('service');
    setSearchParams(next, { replace: true });
  };

  const openService = services.find(s => s.slug === openSlug) || null;
  const loop = [...services, ...services];

  return (
    <section id="services" className="scroll-mt-20 py-24 md:py-32 bg-brand-ink overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-grid-fade pointer-events-none" />

      <div className="container-px max-w-8xl mx-auto relative">
        <SectionHeading
          eyebrow="What we do"
          title="One"
          accent="Fleet."
          intro="From oversized project cargo to scheduled container haulage, our services are built for the corridors most carriers won't touch."
        />
      </div>

      <div
        className="relative group"
        onMouseEnter={() => { pausedRef.current = true;  setHovered(true);  }}
        onMouseLeave={() => { if (!openSlug) pausedRef.current = false; setHovered(false); }}
        onTouchStart={() => { pausedRef.current = true;  }}
        onTouchEnd={()   => { if (!openSlug) pausedRef.current = false; }}
      >
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 will-change-transform"
            style={{ width: 'max-content', paddingLeft: 'max(1rem, calc((100vw - 88rem) / 2 + 3rem))' }}
          >
            {loop.map((s, idx) => (
              <button
                key={`${s.slug}-${idx}`}
                type="button"
                onClick={() => open(s.slug)}
                className="group/card flex-none text-left bg-brand-charcoal rounded-2xl overflow-hidden border border-white/10 hover:border-brand-yellow/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-yellow/5"
                style={{ width: CARD_W }}
                aria-label={`View ${s.title} details`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-ink">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-mono text-brand-yellow bg-brand-ink/70 backdrop-blur px-2 py-1 rounded">
                    {String((idx % services.length) + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-display font-bold flex items-center justify-between gap-2">
                    {s.title}
                    <ArrowUpRight className="w-4 h-4 text-brand-yellow transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                  </h3>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed line-clamp-2">{s.short}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous service"
          aria-hidden={!hovered}
          tabIndex={hovered ? 0 : -1}
          onClick={() => nudge(-1)}
          className={`hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-brand-charcoal/95 border border-white/15 text-brand-cream hover:bg-brand-yellow hover:text-brand-ink hover:border-brand-yellow transition-all duration-300 ${hovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          aria-label="Next service"
          aria-hidden={!hovered}
          tabIndex={hovered ? 0 : -1}
          onClick={() => nudge(1)}
          className={`hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-brand-charcoal/95 border border-white/15 text-brand-cream hover:bg-brand-yellow hover:text-brand-ink hover:border-brand-yellow transition-all duration-300 ${hovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-ink to-transparent pointer-events-none z-[5]" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-ink to-transparent pointer-events-none z-[5]" />
      </div>

      <ServiceModal service={openService} onClose={close} />
    </section>
  );
}
