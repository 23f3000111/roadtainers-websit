import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHeader({ title, eyebrow, intro, breadcrumbs = [] }) {
  return (
    <header className="relative pt-24 pb-10 md:pt-28 md:pb-14 bg-gradient-to-b from-brand-green-deep via-brand-charcoal to-brand-ink overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,163,74,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,184,0,0.07),transparent_55%)]" />
        <div className="absolute inset-0 noise opacity-[0.04] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-px divider-gradient" />
      </div>

      <div className="relative container-px max-w-8xl mx-auto">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/50 mb-6">
            <Link to="/" className="hover:text-brand-yellow transition">Home</Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" />
                {b.to ? <Link to={b.to} className="hover:text-brand-yellow transition">{b.label}</Link> : <span className="text-white/80">{b.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-brand-yellow text-xs font-semibold tracking-[0.25em] uppercase">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-yellow" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tightest text-balance">{title}</h1>
        {intro && <p className="mt-3 text-base md:text-lg text-white/70 max-w-3xl leading-relaxed">{intro}</p>}
      </div>
    </header>
  );
}
