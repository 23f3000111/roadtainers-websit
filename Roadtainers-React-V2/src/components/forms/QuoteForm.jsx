import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import FormField, { inputClass } from './FormField';
import { submitLead } from '../../lib/submitLead';

const QUOTE_SERVICES = [
  { value: 'low-loader-cargo',    label: 'Low Loader Cargo' },
  { value: 'car-carrier',         label: 'Car Carrier' },
  { value: 'general-cargo',       label: 'General Cargo' },
  { value: 'local-shunting',      label: 'Local Shunting' },
  { value: 'lifting-facilities',  label: 'Lifting Facilities' },
  { value: 'warehouse-storage',   label: 'Warehouse & Storage' },
];

const initial = {
  form_type: 'quote',
  name: '', company: '', email: '', phone: '',
  service: '',
  weight: '', weightUnit: 'kg',
  cargo: '', pickup: '', dropoff: '', date: '', message: '',
  agreed_to_terms: false,
  website: '',
};

export default function QuoteForm() {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

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
        <h3 className="text-2xl font-display mb-2">Quote request received</h3>
        <p className="text-white/70">Our team will reach out within 24 hours with a tailored quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="text" name="website" value={v.website} onChange={set('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid md:grid-cols-2 gap-5">
        <FormField id="name" label="Full name" required error={errors.name}>
          <input id="name" className={inputClass} value={v.name} onChange={set('name')} autoComplete="name" />
        </FormField>
        <FormField id="company" label="Company" required error={errors.company}>
          <input id="company" className={inputClass} value={v.company} onChange={set('company')} autoComplete="organization" />
        </FormField>
        <FormField id="email" label="Email" required error={errors.email}>
          <input id="email" type="email" className={inputClass} value={v.email} onChange={set('email')} autoComplete="email" />
        </FormField>
        <FormField id="phone" label="Phone" required error={errors.phone} hint="Include country code, e.g. +254…">
          <input id="phone" type="tel" className={inputClass} value={v.phone} onChange={set('phone')} autoComplete="tel" />
        </FormField>
        <FormField id="service" label="Service needed" required error={errors.service}>
          <select id="service" className={inputClass} value={v.service} onChange={set('service')}>
            <option value="">Select…</option>
            {QUOTE_SERVICES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </FormField>
        <FormField id="weight" label="Cargo weight" required error={errors.weight}>
          <div className="flex gap-2">
            <input
              id="weight"
              type="text"
              inputMode="decimal"
              className={`${inputClass} min-w-0 flex-1`}
              value={v.weight}
              onChange={set('weight')}
              placeholder="e.g. 5000"
            />
            <select
              id="weightUnit"
              className={`${inputClass} w-24 flex-none px-2`}
              value={v.weightUnit}
              onChange={set('weightUnit')}
            >
              <option value="kg">KG</option>
              <option value="tonnes">Tonnes</option>
            </select>
          </div>
        </FormField>
        <FormField id="pickup" label="Pickup location" required error={errors.pickup}>
          <input id="pickup" className={inputClass} value={v.pickup} onChange={set('pickup')} />
        </FormField>
        <FormField id="dropoff" label="Drop-off location" required error={errors.dropoff}>
          <input id="dropoff" className={inputClass} value={v.dropoff} onChange={set('dropoff')} />
        </FormField>
        <FormField id="date" label="Preferred pickup date" error={errors.date}>
          <input id="date" type="date" className={inputClass} value={v.date} onChange={set('date')} />
        </FormField>
        <FormField id="cargo" label="Cargo type" error={errors.cargo}>
          <input id="cargo" className={inputClass} value={v.cargo} onChange={set('cargo')} placeholder="e.g. 40ft container, 18 tonnes" />
        </FormField>
      </div>

      <FormField id="message" label="Additional details" error={errors.message}>
        <textarea id="message" rows={4} className={inputClass} value={v.message} onChange={set('message')} maxLength={2000} />
      </FormField>

      <label className="flex items-start gap-3 text-sm text-white/80">
        <input type="checkbox" checked={v.agreed_to_terms} onChange={set('agreed_to_terms')} className="mt-1 w-4 h-4 accent-brand-yellow" />
        <span>I agree to the <Link to="/terms" className="text-brand-yellow underline">Terms &amp; Conditions and Privacy Policy</Link>, and consent to Roadtainers contacting me about my enquiry. <span className="text-brand-yellow">*</span></span>
      </label>
      {errors.agreed_to_terms && <p className="text-xs text-red-400">{errors.agreed_to_terms}</p>}

      {status === 'error' && (
        <div className="flex gap-2 items-start bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-200">
          <AlertCircle className="w-5 h-5 flex-none mt-0.5" />
          <span>We couldn't reach the server. Please check your connection and try again, or email us directly at info@roadtainers.co.ke.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!v.agreed_to_terms || status === 'sending'}
        className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-ink font-semibold px-8 py-4 rounded-full hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Request Quote'}
      </button>
    </form>
  );
}
