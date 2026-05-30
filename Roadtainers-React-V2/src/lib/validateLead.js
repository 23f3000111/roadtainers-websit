const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{8,20}$/;
const URL_RE   = /^https?:\/\/\S+$/i;

export const FIELDS = {
  quote: {
    required: ['name', 'company', 'email', 'phone', 'service', 'weight', 'pickup', 'dropoff', 'agreed_to_terms'],
  },
  contact: {
    required: ['name', 'email', 'subject', 'message', 'agreed_to_terms'],
  },
  career: {
    required: ['name', 'email', 'position', 'agreed_to_terms'],
  },
};

const LIMITS = {
  name:              { min: 2,  max: 80  },
  company:           { min: 2,  max: 120 },
  subject:           { min: 2,  max: 200 },
  pickup:            { min: 2,  max: 200 },
  dropoff:           { min: 2,  max: 200 },
  cargo:             { min: 0,  max: 500 },
  position:          { min: 2,  max: 120 },
  preferredSalary:   { min: 1,  max: 80  },
  preferredLocation: { min: 2,  max: 200 },
  resumeLink:        { min: 0,  max: 500 },
  message:           { min: 0,  max: 2000 },
};

export function validateLead(input) {
  const errors = {};

  if (input.website && input.website.length > 0) {
    errors._spam = true;
    return { ok: false, errors };
  }

  const cfg = FIELDS[input.form_type];
  if (!cfg) {
    errors.form_type = 'Unknown form type';
    return { ok: false, errors };
  }

  for (const f of cfg.required) {
    const v = input[f];
    if (f === 'agreed_to_terms') {
      if (!v) errors[f] = 'You must agree to the Terms & Conditions.';
      continue;
    }
    if (f === 'weight') {
      const n = parseFloat(v);
      if (!v || isNaN(n) || n <= 0) errors[f] = 'Please enter a valid cargo weight.';
      continue;
    }
    if (typeof v !== 'string' || v.trim().length === 0) {
      errors[f] = `${labelFor(f)} is required.`;
    }
  }

  if (input.email && !errors.email && !EMAIL_RE.test(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (input.phone && !errors.phone && !PHONE_RE.test(input.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  for (const [field, { min, max }] of Object.entries(LIMITS)) {
    const v = input[field];
    if (typeof v !== 'string') continue;
    if (v.length > 0 && v.length < min) errors[field] = `${labelFor(field)} must be at least ${min} characters.`;
    if (v.length > max)                  errors[field] = `${labelFor(field)} must be ${max} characters or fewer.`;
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

function labelFor(field) {
  const map = {
    name: 'Name', email: 'Email', phone: 'Phone',
    company: 'Company', weight: 'Weight', service: 'Service',
    pickup: 'Pickup', dropoff: 'Drop-off',
    subject: 'Subject', message: 'Message', cargo: 'Cargo',
    position: 'Position', preferredSalary: 'Preferred salary',
    preferredLocation: 'Preferred location', resumeLink: 'Resume link',
  };
  return map[field] || field;
}
