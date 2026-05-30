import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Upload, X, FileText } from 'lucide-react';
import FormField, { inputClass } from './FormField';
import { submitLead } from '../../lib/submitLead';

const ALLOWED_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_FILE_MB = 5;

const initial = {
  form_type: 'career',
  name: '', email: '', phone: '',
  position: '', message: '',
  resumeBase64: '', resumeFilename: '',
  agreed_to_terms: false, website: '',
};

export default function CareerForm() {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [fileLabel, setFileLabel] = useState('');
  const [fileError, setFileError] = useState('');
  const fileRef = useRef(null);

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setV(s => ({ ...s, [k]: val }));
    if (errors[k]) setErrors(s => ({ ...s, [k]: undefined }));
  };

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFileError('');

    if (!ALLOWED_TYPES.includes(f.type)) {
      setFileError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_FILE_MB} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1];
      setV(s => ({ ...s, resumeBase64: base64, resumeFilename: f.name }));
      setFileLabel(f.name);
    };
    reader.readAsDataURL(f);
  }

  function clearFile() {
    setV(s => ({ ...s, resumeBase64: '', resumeFilename: '' }));
    setFileLabel('');
    setFileError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending'); setErrors({});
    const r = await submitLead(v);
    if (r.ok) { setStatus('sent'); setV(initial); setFileLabel(''); return; }
    setErrors(r.errors || {});
    setStatus(r.networkError ? 'error' : 'idle');
  }

  if (status === 'sent') {
    return (
      <div className="bg-brand-green-bright/15 border border-brand-green-bright/40 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-green-bright mx-auto mb-3" />
        <h3 className="text-2xl font-display mb-2">Application received</h3>
        <p className="text-white/70">
          Thanks — our HR team will review your details and be in touch if there's a fit.
          You can also email your CV directly to{' '}
          <a className="text-brand-yellow underline" href="mailto:hr@roadtainers.co.ke">hr@roadtainers.co.ke</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="text" name="website" value={v.website} onChange={set('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid md:grid-cols-2 gap-5">
        <FormField id="cname" label="Your name" required error={errors.name}>
          <input id="cname" className={inputClass} value={v.name} onChange={set('name')} autoComplete="name" />
        </FormField>
        <FormField id="cemail" label="Your email" required error={errors.email}>
          <input id="cemail" type="email" className={inputClass} value={v.email} onChange={set('email')} autoComplete="email" />
        </FormField>
        <FormField id="cphone" label="Your mobile" error={errors.phone} hint="Include country code, e.g. +254…">
          <input id="cphone" type="tel" className={inputClass} value={v.phone} onChange={set('phone')} autoComplete="tel" />
        </FormField>
        <FormField id="cposition" label="Position applying for" required error={errors.position}>
          <input id="cposition" className={inputClass} value={v.position} onChange={set('position')} placeholder="e.g. Heavy-haulage driver" />
        </FormField>
      </div>

      <FormField id="cresume" label="Upload CV / Resume" error={fileError}>
        <div
          onClick={() => fileRef.current?.click()}
          className={`relative cursor-pointer flex items-center gap-3 border rounded-lg px-4 py-3 transition ${fileLabel ? 'border-brand-green-bright/50 bg-brand-green-bright/5' : 'border-white/15 bg-white/5 hover:border-brand-yellow/40 hover:bg-white/8'}`}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            className="hidden"
          />
          {fileLabel ? (
            <>
              <FileText className="w-5 h-5 text-brand-green-bright flex-none" />
              <span className="flex-1 text-sm text-white/85 truncate">{fileLabel}</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="flex-none text-white/40 hover:text-white transition"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-white/40 flex-none" />
              <span className="text-sm text-white/50">Click to upload PDF or Word · Max {MAX_FILE_MB} MB</span>
            </>
          )}
        </div>
      </FormField>

      <FormField id="cmessage" label="Cover note" error={errors.message}>
        <textarea id="cmessage" rows={5} className={inputClass} value={v.message} onChange={set('message')} maxLength={2000} placeholder="Tell us a little about yourself and why you'd like to join Roadtainers…" />
      </FormField>

      <label className="flex items-start gap-3 text-sm text-white/80">
        <input type="checkbox" checked={v.agreed_to_terms} onChange={set('agreed_to_terms')} className="mt-1 w-4 h-4 accent-brand-yellow" />
        <span>I agree to the <Link to="/terms" className="text-brand-yellow underline">Terms &amp; Conditions and Privacy Policy</Link>, and consent to Roadtainers processing my data for recruitment. <span className="text-brand-yellow">*</span></span>
      </label>
      {errors.agreed_to_terms && <p className="text-xs text-red-400">{errors.agreed_to_terms}</p>}

      {status === 'error' && (
        <div className="flex gap-2 items-start bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-200">
          <AlertCircle className="w-5 h-5 flex-none mt-0.5" />
          <span>We couldn't reach the server. Please try again, or email your CV directly to hr@roadtainers.co.ke.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!v.agreed_to_terms || status === 'sending'}
        className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-brand-ink font-semibold px-8 py-4 rounded-full hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
      >
        {status === 'sending' ? 'Sending…' : 'Send application'}
      </button>
    </form>
  );
}
