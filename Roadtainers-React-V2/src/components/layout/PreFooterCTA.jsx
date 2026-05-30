import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const HIDDEN_ON = ['/quote', '/terms'];

export default function PreFooterCTA() {
  const { pathname } = useLocation();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <section className="bg-brand-yellow text-brand-ink">
      <div className="container-px max-w-8xl mx-auto py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold tracking-tightest text-balance">
            Ready to move your cargo?
          </h2>
          <p className="mt-2 text-brand-ink/80 text-base md:text-lg">
            Get a tailored quote within 24 hours. Built for East Africa's most demanding corridors.
          </p>
        </div>
        <Link
          to="/quote"
          className="inline-flex items-center gap-2 bg-brand-ink text-brand-yellow font-semibold px-7 py-4 rounded-full hover:bg-brand-green-deep transition"
        >
          Request a Quote <ArrowUpRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
