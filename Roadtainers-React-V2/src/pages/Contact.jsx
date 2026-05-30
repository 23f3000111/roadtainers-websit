import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import ContactForm from '../components/forms/ContactForm';

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Talk to our team."
        intro="Quotes, partnerships, careers, or supplier enquiries — drop us a line. We respond within one business day."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="relative py-20 bg-brand-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-fade opacity-40 pointer-events-none" />
        <div className="relative container-px max-w-8xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.aside
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="relative bg-brand-slate/60 border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
              <span className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase">⬢ Reach us</span>
              <h3 className="mt-2 text-2xl font-display font-bold mb-6">Mombasa HQ</h3>
              <ul className="space-y-4 text-white/85">
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-yellow/10 border border-brand-yellow/15 flex-none"><MapPin className="w-4 h-4 text-brand-yellow" /></span>
                  <span className="mt-1">Mombasa, Kenya</span>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-yellow/10 border border-brand-yellow/15 flex-none mt-0.5"><Phone className="w-4 h-4 text-brand-yellow" /></span>
                  <div className="flex flex-col gap-1">
                    <a className="hover:text-brand-yellow transition" href="tel:+254721600290">+254 721 600 290</a>
                    <a className="hover:text-brand-yellow transition" href="tel:+254733315315">+254 733 315 315</a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-yellow/10 border border-brand-yellow/15 flex-none"><Mail className="w-4 h-4 text-brand-yellow" /></span>
                  <a className="mt-1 hover:text-brand-yellow transition break-all" href="mailto:info@roadtainers.co.ke">info@roadtainers.co.ke</a>
                </li>
                <li className="flex gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-yellow/10 border border-brand-yellow/15 flex-none"><Clock className="w-4 h-4 text-brand-yellow" /></span>
                  <span className="mt-1">24/7 dispatch · Office: Mon–Fri 08:00–17:00</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-brand-slate/60">
              <iframe
                title="Roadtainers Mombasa location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.30961194678!2d39.6244253652985!3d-4.009997069660616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184072ee91afa281%3A0x283a9fad69ceefbc!2sRoadtainers%20(Msa)%20Ltd!5e1!3m2!1sen!2sin!4v1780113586278!5m2!1sen!2sin"
                width="600"
                height="450"
                className="w-full h-64 md:h-80"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.aside>

          <motion.div
            className="lg:col-span-3 relative bg-brand-slate/60 border border-white/10 rounded-2xl p-6 md:p-9 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-brand-yellow text-xs font-semibold tracking-[0.2em] uppercase">⬢ Enquiry</span>
            <h3 className="mt-2 text-2xl md:text-3xl font-display font-bold mb-6">Send us a message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
}
