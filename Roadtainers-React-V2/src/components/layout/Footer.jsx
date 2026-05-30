import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-brand-green-deep via-brand-green-deep/80 to-brand-ink text-white/90 pt-16 pb-8 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-yellow/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(31,163,74,0.18),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 noise opacity-[0.04] pointer-events-none mix-blend-overlay" />

      <div className="relative container-px max-w-8xl mx-auto grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/rt-logo-(White).png" alt="Roadtainers" className="h-12 mb-4 w-auto" />
          <p className="text-sm text-white/70 leading-relaxed mb-5">
            Heavy transport and cross-border logistics built for East Africa's most demanding corridors. Trusted since 1998.
          </p>
          <a
            href="mailto:info@roadtainers.co.ke"
            aria-label="Email Roadtainers"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-brand-yellow hover:text-brand-ink hover:border-brand-yellow transition"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brand-yellow mb-5 font-semibold">Services</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/?service=low-loader-cargo"    className="text-white/70 hover:text-brand-yellow transition">Low Loader Cargo</Link></li>
            <li><Link to="/?service=car-carrier"         className="text-white/70 hover:text-brand-yellow transition">Car Carrier</Link></li>
            <li><Link to="/?service=general-cargo"       className="text-white/70 hover:text-brand-yellow transition">General Cargo</Link></li>
            <li><Link to="/?service=local-shunting"      className="text-white/70 hover:text-brand-yellow transition">Local Shunting</Link></li>
            <li><Link to="/?service=lifting-facilities"  className="text-white/70 hover:text-brand-yellow transition">Lifting Facilities</Link></li>
            <li><Link to="/?service=warehouse-storage"   className="text-white/70 hover:text-brand-yellow transition">Warehouse &amp; Storage</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brand-yellow mb-5 font-semibold">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about"   className="text-white/70 hover:text-brand-yellow transition">About</Link></li>
            <li><Link to="/network" className="text-white/70 hover:text-brand-yellow transition">Network</Link></li>
            <li><Link to="/faq"     className="text-white/70 hover:text-brand-yellow transition">FAQ</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-brand-yellow transition">Contact</Link></li>
            <li><Link to="/quote"   className="text-white/70 hover:text-brand-yellow transition">Get a Quote</Link></li>
            <li><Link to="/careers" className="text-white/70 hover:text-brand-yellow transition">Careers</Link></li>
            <li><Link to="/terms"   className="text-white/70 hover:text-brand-yellow transition">Terms &amp; Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-brand-yellow mb-5 font-semibold">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 text-white/80"><MapPin className="w-4 h-4 mt-0.5 flex-none text-brand-yellow/80" /> Mombasa, Kenya</li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 mt-0.5 flex-none text-brand-yellow/80" />
              <div className="flex flex-col gap-0.5">
                <a href="tel:+254721600290" className="text-white/80 hover:text-brand-yellow transition">+254 721 600 290</a>
                <a href="tel:+254733315315" className="text-white/80 hover:text-brand-yellow transition">+254 733 315 315</a>
              </div>
            </li>
            <li className="flex gap-3"><Mail className="w-4 h-4 mt-0.5 flex-none text-brand-yellow/80" /> <a href="mailto:info@roadtainers.co.ke" className="text-white/80 hover:text-brand-yellow transition">info@roadtainers.co.ke</a></li>
          </ul>
        </div>
      </div>

      <div className="relative container-px max-w-8xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/50">
        <p>© {new Date().getFullYear()} Roadtainers Mombasa Ltd. All rights reserved.</p>
        <p><Link to="/terms" className="hover:text-brand-yellow transition">Terms &amp; Privacy</Link></p>
      </div>
    </footer>
  );
}
