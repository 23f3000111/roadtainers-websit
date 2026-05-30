import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { to: '/#services', label: 'Services', anchor: 'services' },
  { to: '/network',   label: 'Network'  },
  { to: '/about',     label: 'About'    },
  { to: '/faq',       label: 'FAQ'      },
  { to: '/careers',   label: 'Careers'  },
  { to: '/contact',   label: 'Contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome = pathname === '/';
  const showSolid = scrolled || !isHome;

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    setOpen(false);
    if (isHome) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${anchor}`);
    }
  };

  const renderLink = (l, mobile = false) => {
    const baseClass = mobile
      ? 'block text-lg font-semibold text-white/90 hover:text-brand-yellow'
      : 'text-sm font-semibold tracking-wide text-white/90 hover:text-brand-yellow transition-colors';
    if (l.anchor) {
      return (
        <a
          href={l.to}
          onClick={(e) => handleAnchorClick(e, l.anchor)}
          className={baseClass}
        >
          {l.label}
        </a>
      );
    }
    return (
      <NavLink
        to={l.to}
        className={({ isActive }) =>
          `${baseClass} ${isActive ? 'text-brand-yellow' : ''}`
        }
      >
        {l.label}
      </NavLink>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        showSolid
          ? 'bg-gradient-to-r from-brand-green-deep via-brand-green-soft to-brand-green-deep backdrop-blur-xl border-b border-brand-yellow/15 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      {showSolid && (
        <div className="absolute inset-0 pointer-events-none opacity-60 mix-blend-overlay bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_40%,transparent_70%,rgba(0,0,0,0.18))]" />
      )}
      <nav className="relative container-px max-w-8xl mx-auto flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="Roadtainers home">
          <img src="/images/rt-logo-(White).png" alt="Roadtainers Mombasa Ltd" className="h-11 w-auto" />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>{renderLink(l)}</li>
          ))}
        </ul>

        <Link
          to="/quote"
          className="hidden lg:inline-flex items-center gap-1.5 bg-brand-yellow text-brand-ink font-semibold px-5 py-2.5 rounded-full hover:brightness-110 transition"
        >
          Get Quote <ArrowUpRight className="w-4 h-4" />
        </Link>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-gradient-to-b from-brand-green-deep to-brand-green-soft backdrop-blur-xl border-t border-brand-yellow/15">
          <ul className="container-px max-w-8xl mx-auto py-6 flex flex-col gap-4">
            {links.map(l => (
              <li key={l.to}>{renderLink(l, true)}</li>
            ))}
            <li>
              <Link to="/quote" className="inline-flex items-center gap-1.5 bg-brand-yellow text-brand-ink font-semibold px-5 py-2.5 rounded-full">
                Get Quote <ArrowUpRight className="w-4 h-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
