import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 inset-x-0 h-[3px] z-[70] bg-gradient-to-r from-brand-green-bright via-brand-yellow to-brand-green-bright shadow-[0_0_12px_rgba(245,184,0,0.55)]"
    />
  );
}
