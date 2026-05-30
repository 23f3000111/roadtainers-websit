import { validateLead } from './validateLead';

export async function submitLead(payload) {
  const result = validateLead(payload);
  if (!result.ok) return { ok: false, errors: result.errors };

  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  if (!endpoint) return { ok: false, errors: { _config: 'Form endpoint not configured.' } };

  const { website, ...clean } = payload;

  try {
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(clean),
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, networkError: true };
  }
}
