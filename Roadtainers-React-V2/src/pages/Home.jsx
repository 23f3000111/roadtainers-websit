import HeroSlider from '../components/home/HeroSlider';
import StoryScroll from '../components/home/StoryScroll';
import NetworkMap from '../components/network/NetworkMap';
import ServicesPreview from '../components/home/ServicesPreview';
import WhyUs from '../components/home/WhyUs';
import Awards from '../components/home/Awards';
import Testimonials from '../components/home/Testimonials';
import FaqPreview from '../components/home/FaqPreview';
import SectionHeading from '../components/ui/SectionHeading';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <StoryScroll />
      <section id="network" className="scroll-mt-20 relative py-24 md:py-32 bg-brand-charcoal border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
        <div className="relative container-px max-w-8xl mx-auto">
          <SectionHeading
            eyebrow="Network"
            title="Your Cargo,"
            accent="Every Corridor."
            intro="From Mombasa to Goma, Kigali to Juba — our logistics network spans East Africa's most critical trade corridors with 24/7 fleet visibility."
          />
          <NetworkMap />
        </div>
      </section>
      <ServicesPreview />
      <WhyUs />
      <Awards />
      <Testimonials />
      <FaqPreview />
    </>
  );
}
