import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitLead } from './submitLead';

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({ ok: true }));
  import.meta.env.VITE_FORM_ENDPOINT = 'https://script.google.com/macros/s/test/exec';
});

describe('submitLead', () => {
  it('returns { ok:false, errors } when validation fails (does not call fetch)', async () => {
    const r = await submitLead({ form_type: 'quote', name: '', website: '' });
    expect(r.ok).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('POSTs to the configured endpoint with text/plain when valid', async () => {
    const payload = {
      form_type: 'contact', name: 'Jane', email: 'jane@x.com',
      subject: 'Hi', message: 'Hello', agreed_to_terms: true, website: '',
    };
    const r = await submitLead(payload);
    expect(r.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledOnce();
    const [url, init] = global.fetch.mock.calls[0];
    expect(url).toBe('https://script.google.com/macros/s/test/exec');
    expect(init.method).toBe('POST');
    expect(init.headers['Content-Type']).toBe('text/plain;charset=utf-8');
    expect(init.mode).toBe('no-cors');
    expect(JSON.parse(init.body).name).toBe('Jane');
  });

  it('returns { ok:false, networkError } on fetch rejection', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('offline')));
    const r = await submitLead({
      form_type: 'contact', name: 'Jane', email: 'jane@x.com',
      subject: 'Hi', message: 'Hello', agreed_to_terms: true, website: '',
    });
    expect(r.ok).toBe(false);
    expect(r.networkError).toBe(true);
  });

  it('strips the honeypot field before sending', async () => {
    const payload = {
      form_type: 'contact', name: 'Jane', email: 'jane@x.com',
      subject: 'Hi', message: 'Hello', agreed_to_terms: true, website: '',
    };
    await submitLead(payload);
    const body = JSON.parse(global.fetch.mock.calls[0][1].body);
    expect(body.website).toBeUndefined();
  });
});
