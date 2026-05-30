import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import FormField, { inputClass } from './FormField';
import { submitLead } from '../../lib/submitLead';

const initial = {
  form_type: 'contact',
  name: '', email: '', phone: '', subject: '', message: '',
  agreed_to_terms: false, website: '',
};

export default function ContactForm() {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setV(s => ({ ...s, [k]: val }));
    if (errors[k]) setErrors(s => ({ ...s, [k]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending'); setErrors({});
    const r = await submitLead(v);
    if (r.ok) { setStatus('sent'); setV(initial); return; }
    setErrors(r.errors || {});
    setStatus(r.networkError ? 'error' : 'idle');
  }

  if (status === 'sent') {
    return (
      <div className="bg-brand-green-bright/15 border border-brand-green-bright/40 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-green-bright mx-auto mb-3" />
        <h3 className="text-2xl font-display mb-2">Message received</h3>
        <p className="text-white/70">Our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="text" name="website" value={v.website} onChange={set('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid md:grid-cols-2 gap-5">
        <FormField id="cname"  label="Full name" required error={errors.name}>
          <input id="cname" className={inputClass} value={v.name} onChange={set('name')} autoComplete="name" />
        </FormField>
        <FormField id="cemail" label="Email" required error={errors.email}>
          <input id="cemail" type="email" className={inputClass} value={v.email} onChange={set('email')} autoComplete="email" />
        </FormField>
        <FormField id="cphone" label="Phone" error={errors.phone}>
          <input id="cphone" type="tel" className={inputClass} value={v.phone} onChange={set('phone')} autoComplete="tel" />
        </FormField>
        <FormField id="csubject" label="Subject" required error={errors.subject}>
          <input id="csubject" className={inputClass} value={v.subject} onChange={set('subject')} />
        </FormField>
      </div>

      <FormField id="cmessage" label="Message" required error={errors.message}>
        <textarea id="cmessage" rows={6} className={inputClass} value={v.message} onChange={set('message')} maxLength={2000} />
      </FormField>

      <label className="flex items-start gap-3 text-sm text-white/80">
        <input type="checkbox" checked={v.agreed_to_terms} onChange={set('agreed_to_terms')} className="mt-1 w-4 h-4 accent-brand-yellow" />
        <span>I agree to the <Link to="/terms" className="text-brand-yellow underline">Terms &amp; Conditions and Privacy Policy</Link>. <span className="text-brand-yellow">*</span></span>
      </label>
      {errors.agreed_to_terms && <p className="text-xs text-red-400">{errors.agreed_to_terms}</p>}

      {status === 'error' && (
        <div className="flex gap-2 items-start bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-200">
          <AlertCircle className="w-5 h-5 flex-none mt-0.5" />
          <span>We couldn't reach the server. Please email us directly at info@roadtainers.co.ke.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!v.agreed_to_terms || status === 'sending'}
        className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-ink font-semibold px-8 py-4 rounded-full hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
