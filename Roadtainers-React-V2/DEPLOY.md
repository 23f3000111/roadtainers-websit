# Deploying the Roadtainers website

This document walks through deploying the static build to any web host.

## Prerequisites

- The Google Apps Script form endpoint is set up (see `backend/apps-script/README.md`).
- The `.env` file in the project root contains the endpoint URL:
  ```
  VITE_FORM_ENDPOINT=https://script.google.com/macros/s/XXXXX/exec
  ```

## Build

```bash
cd Roadtainers-React-V2
npm install
npm run build
```

This produces a `dist/` folder containing:
- `index.html` — the SPA entry
- `assets/` — JS, CSS, and image assets (hashed for caching)
- `images/` — the original image files
- `_redirects` — SPA fallback for Netlify/Vercel-style hosts
- `.htaccess` — SPA fallback + security headers for Apache hosts

## Deploy: cPanel / shared Apache hosting

1. Open File Manager (or use FTP).
2. Navigate to `public_html/` (or the appropriate web root).
3. **Back up** the existing site before overwriting (download a copy, then delete contents).
4. Upload the entire contents of `dist/` (not the folder itself — the contents) to `public_html/`.
5. Confirm `.htaccess` is present and not hidden by the FTP client (enable "show hidden files").
6. Browse to `https://roadtainers.co.ke/` — the new site should load.
7. Browse to `https://roadtainers.co.ke/services` directly — should NOT show a 404 (the `.htaccess` rewrites all routes to `index.html`).

## Deploy: Netlify drag-and-drop

1. Visit [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire `dist/` folder onto the page.
3. Netlify gives you a temporary URL; point the custom domain via the Netlify dashboard.

## Deploy: Vercel

```bash
npm i -g vercel
vercel --prod
```

Follow the prompts. Vercel auto-detects Vite.

## Smoke-test checklist after deploy

- [ ] Home page loads with hero slider
- [ ] Map on home/`/network` animates the road corridors
- [ ] `/services/local-shunting` loads (deep link works = SPA fallback OK)
- [ ] Submitting the contact form produces a row in the Google Sheet and an email to `info@roadtainers.co.ke`
- [ ] `/terms` page loads
- [ ] Get Quote button in navbar links to `/quote`
- [ ] No console errors in browser DevTools

## Updating later

After making changes locally, run `npm run build` again and re-upload `dist/`. The Apps Script does not need to be re-deployed unless `Code.gs` itself changed.
