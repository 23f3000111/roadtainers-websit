import PageHeader from '../components/layout/PageHeader';

export default function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Privacy"
        intro="Last updated: May 2026. Please read the terms governing your use of this website and our handling of personal data."
        breadcrumbs={[{ label: 'Terms & Privacy' }]}
      />

      <section className="py-20 bg-brand-ink">
        <div className="container-px max-w-4xl mx-auto prose-invert">
          <nav className="mb-12 flex flex-wrap gap-3 text-sm">
            <a href="#terms"   className="px-4 py-1.5 bg-brand-slate/60 border border-white/10 rounded-full hover:border-brand-yellow transition">Terms of Use</a>
            <a href="#privacy" className="px-4 py-1.5 bg-brand-slate/60 border border-white/10 rounded-full hover:border-brand-yellow transition">Privacy Policy</a>
            <a href="#data"    className="px-4 py-1.5 bg-brand-slate/60 border border-white/10 rounded-full hover:border-brand-yellow transition">Data Collection</a>
          </nav>

          <article id="terms" className="space-y-5 text-white/85 leading-relaxed">
            <h2 className="text-3xl font-display font-bold">Terms of Use</h2>
            <p>This website is operated by Roadtainers Mombasa Ltd ("Roadtainers", "we", "us"). By accessing or using this site, you agree to be bound by these Terms.</p>
            <h3 className="text-xl font-display font-bold mt-6">1. Use of the site</h3>
            <p>The site is provided for general information about our logistics services. You may not use this site for unlawful purposes, attempt to compromise its security, or submit false information through any form.</p>
            <h3 className="text-xl font-display font-bold mt-6">2. Quotes and enquiries</h3>
            <p>Quotes provided through this site are estimates only and are subject to a written agreement before any movement is undertaken. Service availability, pricing, and timelines may vary based on cargo type, route, and operational constraints.</p>
            <h3 className="text-xl font-display font-bold mt-6">3. Intellectual property</h3>
            <p>All content, branding, and imagery on this site is the property of Roadtainers Mombasa Ltd unless otherwise indicated. You may not reproduce or distribute material without our written consent.</p>
            <h3 className="text-xl font-display font-bold mt-6">4. Limitation of liability</h3>
            <p>This site is provided "as is". We do not warrant uninterrupted access and accept no liability for losses arising from reliance on information published here.</p>
            <h3 className="text-xl font-display font-bold mt-6">5. Governing law</h3>
            <p>These Terms are governed by the laws of the Republic of Kenya. Disputes will be resolved in the courts of Mombasa.</p>
          </article>

          <article id="privacy" className="space-y-5 text-white/85 leading-relaxed mt-16">
            <h2 className="text-3xl font-display font-bold">Privacy Policy</h2>
            <p>Roadtainers Mombasa Ltd is committed to protecting the personal data you share with us, in line with the Data Protection Act, 2019 of Kenya.</p>
            <h3 className="text-xl font-display font-bold mt-6">What we collect</h3>
            <p>When you submit a quote or contact form, we collect: your name, company name, email, phone number, country of origin, service requested, pickup and drop-off locations, and any details you choose to share.</p>
            <h3 className="text-xl font-display font-bold mt-6">How we use it</h3>
            <p>We use this information solely to respond to your enquiry, prepare quotes, and follow up on services you've requested. We do not sell, rent, or share your data with third parties for marketing.</p>
            <h3 className="text-xl font-display font-bold mt-6">How we store it</h3>
            <p>Submissions are stored in a secured Google Sheet and emailed to <a href="mailto:info@roadtainers.co.ke" className="text-brand-yellow underline">info@roadtainers.co.ke</a>. Access is restricted to authorised staff. We retain records for as long as necessary to operate the service and to meet legal obligations.</p>
            <h3 className="text-xl font-display font-bold mt-6">Your rights</h3>
            <p>You may request to access, correct, or delete the personal data we hold about you at any time by emailing <a href="mailto:info@roadtainers.co.ke" className="text-brand-yellow underline">info@roadtainers.co.ke</a>.</p>
            <h3 className="text-xl font-display font-bold mt-6">Cookies</h3>
            <p>This site uses only essential, first-party cookies required to operate the site. We do not use third-party tracking or advertising cookies.</p>
          </article>

          <article id="data" className="space-y-5 text-white/85 leading-relaxed mt-16">
            <h2 className="text-3xl font-display font-bold">Data Collection Notice</h2>
            <p>By ticking the "I agree" box on our quote or contact form, you consent to Roadtainers collecting and processing the personal information you submit for the purpose of preparing a quote or responding to your enquiry, in accordance with the Privacy Policy above.</p>
            <p>You can withdraw consent at any time by writing to <a href="mailto:info@roadtainers.co.ke" className="text-brand-yellow underline">info@roadtainers.co.ke</a>.</p>
          </article>
        </div>
      </section>
    </>
  );
}
