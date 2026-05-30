import { describe, it, expect } from 'vitest';
import { validateLead, FIELDS } from './validateLead';

describe('validateLead', () => {
  const validQuote = {
    form_type: 'quote',
    name: 'Jane Doe', company: 'Acme Ltd', email: 'jane@acme.com',
    phone: '+254712345678', country: 'Kenya', service: 'heavy-transport',
    cargo: 'Steel beams', pickup: 'Mombasa Port', dropoff: 'Nairobi ICD',
    date: '2026-06-01', message: '', agreed_to_terms: true, website: '',
  };

  it('passes a valid quote payload', () => {
    expect(validateLead(validQuote)).toEqual({ ok: true, errors: {} });
  });

  it('rejects missing required fields', () => {
    const r = validateLead({ ...validQuote, name: '', email: '' });
    expect(r.ok).toBe(false);
    expect(r.errors.name).toMatch(/required/i);
    expect(r.errors.email).toMatch(/required/i);
  });

  it('rejects invalid email', () => {
    const r = validateLead({ ...validQuote, email: 'not-an-email' });
    expect(r.ok).toBe(false);
    expect(r.errors.email).toMatch(/valid email/i);
  });

  it('rejects too-short name', () => {
    const r = validateLead({ ...validQuote, name: 'a' });
    expect(r.ok).toBe(false);
    expect(r.errors.name).toMatch(/at least 2/i);
  });

  it('rejects too-long message', () => {
    const r = validateLead({ ...validQuote, message: 'x'.repeat(2001) });
    expect(r.ok).toBe(false);
    expect(r.errors.message).toMatch(/2000/);
  });

  it('rejects unticked terms', () => {
    const r = validateLead({ ...validQuote, agreed_to_terms: false });
    expect(r.ok).toBe(false);
    expect(r.errors.agreed_to_terms).toMatch(/agree/i);
  });

  it('flags honeypot fill as spam (returns ok:false with spam flag)', () => {
    const r = validateLead({ ...validQuote, website: 'http://spam.example' });
    expect(r.ok).toBe(false);
    expect(r.errors._spam).toBe(true);
  });

  it('validates a contact-form payload with fewer required fields', () => {
    const r = validateLead({
      form_type: 'contact', name: 'Jane', email: 'jane@x.com',
      subject: 'Hi', message: 'Hello', agreed_to_terms: true, website: '',
    });
    expect(r.ok).toBe(true);
  });

  it('exports a FIELDS map describing required fields per form_type', () => {
    expect(FIELDS.quote.required).toContain('email');
    expect(FIELDS.contact.required).toContain('subject');
    expect(FIELDS.career.required).toContain('position');
  });

  it('validates a career payload with position + salary + location', () => {
    const r = validateLead({
      form_type: 'career', name: 'Jane', email: 'jane@x.com',
      phone: '+254712345678', position: 'Driver',
      preferredSalary: 'KSh 80,000', preferredLocation: 'Mombasa',
      message: 'Available immediately', resumeLink: 'https://drive.example.com/cv',
      agreed_to_terms: true, website: '',
    });
    expect(r.ok).toBe(true);
  });

  it('rejects a career payload missing position', () => {
    const r = validateLead({
      form_type: 'career', name: 'Jane', email: 'jane@x.com',
      position: '', preferredSalary: '80k', preferredLocation: 'Mombasa',
      agreed_to_terms: true, website: '',
    });
    expect(r.ok).toBe(false);
    expect(r.errors.position).toMatch(/required/i);
  });

  it('rejects a non-URL resume link', () => {
    const r = validateLead({
      form_type: 'career', name: 'Jane', email: 'jane@x.com',
      position: 'Driver', preferredSalary: '80k', preferredLocation: 'Mombasa',
      resumeLink: 'not-a-url',
      agreed_to_terms: true, website: '',
    });
    expect(r.ok).toBe(false);
    expect(r.errors.resumeLink).toMatch(/url/i);
  });
});
