/**
 * Roadtainers lead-capture Apps Script.
 * Receives POSTed JSON from the React forms (/quote, /contact, /careers),
 * appends to a Google Sheet, and emails the relevant address.
 *
 * Quote / Contact → info@roadtainers.co.ke
 * Career applications → hr@roadtainers.co.ke (with CV attachment if provided)
 *
 * Setup: see README.md in this folder.
 */

const SHEET_NAME    = 'Leads';
const NOTIFY_EMAIL  = 'info@roadtainers.co.ke';
const HR_EMAIL      = 'hr@roadtainers.co.ke';
const RATE_LIMIT_MS = 30 * 1000;
const MAX_FIELD_LEN = 2000;
const ALLOWED_TYPES = ['quote', 'contact', 'career'];

const HEADERS = [
  'timestamp', 'form_type',
  'name', 'company', 'email', 'phone', 'service',
  'weight', 'weightUnit',
  'cargo', 'pickup', 'dropoff', 'date',
  'subject', 'message',
  'position', 'resumeFilename',
  'agreed_to_terms',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');

    if (body.website && body.website.length > 0) return jsonOk({ status: 'spam' });
    if (!ALLOWED_TYPES.includes(body.form_type))  return jsonErr('bad form_type');

    const ip = (e.parameter && e.parameter.ip) || 'unknown';
    const props = PropertiesService.getScriptProperties();
    const lastKey = 'last_' + ip;
    const last = Number(props.getProperty(lastKey) || 0);
    if (Date.now() - last < RATE_LIMIT_MS) return jsonErr('rate_limit');
    props.setProperty(lastKey, String(Date.now()));

    const row = sanitize(body);
    appendRow(row);
    sendEmail(row, body.resumeBase64, body.resumeFilename);

    return jsonOk({ status: 'ok' });
  } catch (err) {
    return jsonErr('server_error: ' + err.message);
  }
}

function doGet() {
  return jsonOk({ status: 'alive', service: 'roadtainers-leads' });
}

function sanitize(body) {
  const trim = (v) => (typeof v === 'string' ? v.slice(0, MAX_FIELD_LEN).trim() : '');
  return {
    timestamp:       new Date().toISOString(),
    form_type:       trim(body.form_type),
    name:            trim(body.name),
    company:         trim(body.company),
    email:           trim(body.email),
    phone:           trim(body.phone),
    service:         trim(body.service),
    weight:          trim(body.weight),
    weightUnit:      trim(body.weightUnit),
    cargo:           trim(body.cargo),
    pickup:          trim(body.pickup),
    dropoff:         trim(body.dropoff),
    date:            trim(body.date),
    subject:         trim(body.subject),
    message:         trim(body.message),
    position:        trim(body.position),
    resumeFilename:  trim(body.resumeFilename),
    agreed_to_terms: body.agreed_to_terms === true ? 'yes' : 'no',
  };
}

function appendRow(row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  } else {
    const existing = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (existing.length < HEADERS.length) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }
  }
  sheet.appendRow(HEADERS.map(h => row[h] !== undefined ? row[h] : ''));
}

function sendEmail(row, resumeBase64, resumeFilename) {
  const isCareer = row.form_type === 'career';
  const toEmail  = isCareer ? HR_EMAIL : NOTIFY_EMAIL;

  let subject;
  if (row.form_type === 'quote') {
    subject = 'New quote request from ' + row.name + (row.company ? ' (' + row.company + ')' : '');
  } else if (isCareer) {
    subject = 'New job application — ' + row.name + (row.position ? ' · ' + row.position : '');
  } else {
    subject = 'New website message from ' + row.name;
  }

  const lines = ['New submission via roadtainers.co.ke', ''];
  const push = (label, value) => { if (value) lines.push(label + ': ' + value); };

  push('Form type', row.form_type);
  push('Name',      row.name);
  push('Company',   row.company);
  push('Email',     row.email);
  push('Phone',     row.phone);
  push('Service',   row.service);
  if (row.weight) push('Weight', row.weight + ' ' + (row.weightUnit || ''));
  push('Cargo',     row.cargo);
  push('Pickup',    row.pickup);
  push('Drop-off',  row.dropoff);
  push('Date',      row.date);
  push('Subject',   row.subject);
  push('Position',  row.position);
  if (row.resumeFilename) push('CV file', row.resumeFilename);

  if (row.message) {
    lines.push('');
    lines.push('Message:');
    lines.push(row.message);
  }

  lines.push('');
  lines.push('Submitted: ' + row.timestamp);

  const emailParams = {
    to:      toEmail,
    subject: subject,
    body:    lines.join('\n'),
    replyTo: row.email || toEmail,
  };

  // Attach CV if provided
  if (isCareer && resumeBase64 && resumeFilename) {
    try {
      const decoded = Utilities.base64Decode(resumeBase64);
      const mimeType = resumeFilename.toLowerCase().endsWith('.pdf')
        ? 'application/pdf'
        : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const blob = Utilities.newBlob(decoded, mimeType, resumeFilename);
      emailParams.attachments = [blob];
    } catch (attachErr) {
      lines.push('');
      lines.push('Note: CV attachment could not be processed — ' + attachErr.message);
      emailParams.body = lines.join('\n');
    }
  }

  MailApp.sendEmail(emailParams);
}

function jsonOk(obj)  { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function jsonErr(msg) { return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: msg })).setMimeType(ContentService.MimeType.JSON); }
