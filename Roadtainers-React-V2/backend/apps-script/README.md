# Roadtainers Lead-Capture Apps Script

This is the form-handling backend for the Roadtainers website. It runs free on the client's Google account — no server, no hosting fees.

## What it does

1. Receives JSON POSTed by the React forms (`/quote` and `/contact`).
2. Drops bot traffic (honeypot, rate limit, unknown form types).
3. Appends one row per submission to a Google Sheet (the CSV the client asked for).
4. Emails the lead details to `info@roadtainers.co.ke`.

## One-time setup (10 minutes)

### 1. Create the Google Sheet

1. Open [https://sheets.google.com](https://sheets.google.com) using the `info@roadtainers.co.ke` Google account (or any account the client controls).
2. Create a new blank sheet. Name it **Roadtainers Leads**.

### 2. Add the Apps Script

1. In that Sheet: **Extensions → Apps Script**.
2. Delete any starter code in `Code.gs`.
3. Paste the entire contents of `backend/apps-script/Code.gs` (this folder).
4. Click the floppy-disk **Save** icon. When prompted, name the project **Roadtainers Leads Backend**.

### 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon and choose **Web app**.
3. Set:
   - **Description:** `Roadtainers leads v1`
   - **Execute as:** *Me* (`info@roadtainers.co.ke`)
   - **Who has access:** *Anyone* (this only allows POSTing — no read access to the script or sheet)
4. Click **Deploy**. You'll be asked to authorise — click through (Advanced → Go to Roadtainers Leads Backend → Allow).
5. Copy the **Web app URL** that ends in `/exec`. This is the endpoint.

### 4. Plug the endpoint into the React build

1. In the project root, copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
2. Edit `.env` and set:
   ```
   VITE_FORM_ENDPOINT=https://script.google.com/macros/s/XXXXXXXXXXXX/exec
   ```
3. Run `npm run build`. The new `dist/` folder uses the live endpoint.

## Testing

After deployment, paste the Web App URL into a browser. You should see:
```json
{"status":"alive","service":"roadtainers-leads"}
```

To test a real submission, fill out the `/quote` form on the live site. Within seconds:
- A row appears in the Google Sheet's **Leads** tab.
- An email arrives at `info@roadtainers.co.ke`.

## Updating the script

If you ever change `Code.gs`:
1. Paste the new code into the Apps Script editor.
2. **Deploy → Manage deployments → pencil icon on the existing deployment → New version**.
3. Click **Deploy**. The endpoint URL stays the same.

## Exporting leads as CSV

In the Google Sheet, **File → Download → CSV**. The Leads tab downloads as a CSV file.

## Notes

- The script imposes a 30-second cooldown per IP. Legitimate clients won't notice; bots will be blocked.
- All form fields are length-capped at 2000 characters server-side.
- The honeypot field `website` is hidden in the React forms; any submission with a non-empty `website` is dropped.
- All processing stays inside the client's own Google account. No third-party services are involved.
