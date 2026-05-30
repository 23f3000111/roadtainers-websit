import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowUpRight } from 'lucide-react';

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    if (!service) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close service details"
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-default"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative bg-brand-charcoal border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-brand-ink/80 backdrop-blur border border-white/10 flex items-center justify-center text-white hover:bg-brand-yellow hover:text-brand-ink hover:border-brand-yellow transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl bg-brand-ink">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/30 to-transparent" />
            </div>

            <div className="p-6 sm:p-8 md:p-10 -mt-12 relative">
              <span className="text-brand-yellow text-xs font-semibold tracking-[0.25em] uppercase">⬢ Service</span>
              <h3 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tightest mb-4 text-balance">
                {service.title}
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-4">{service.short}</p>

              {service.body.map((p, i) => (
                <p key={i} className="text-white/70 leading-relaxed mb-4">{p}</p>
              ))}

              <h4 className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-brand-yellow font-semibold">Capabilities</h4>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {service.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-white/85">
                    <Check className="w-4 h-4 text-brand-yellow flex-none mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <p className="text-sm text-white/60">Need this service for your cargo?</p>
                <Link
                  to="/quote"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-brand-yellow text-brand-ink font-semibold px-6 py-3 rounded-full hover:brightness-110 transition w-full sm:w-auto justify-center"
                >
                  Get a quote <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
