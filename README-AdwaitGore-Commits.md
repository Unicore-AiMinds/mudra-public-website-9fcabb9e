# DentalMetrix Website - Commit Log by Adwait Gore

**Author:** Adwait Gore
**Total Commits:** 11 (including merge commits)
**Period:** February 28, 2026 - May 22, 2026

---

## Commit History (Newest First)

### 1. `ec7ae6d` - Revert vite.config.ts host change to avoid merge conflict
**Date:** May 22, 2026
**Files changed:** `vite.config.ts`

Reverted a previous change to the Vite dev server host configuration to prevent a merge conflict when integrating branches. This was a cleanup commit to keep the branch mergeable.

---

### 2. `b61004f` - Add email and phone validation to contact forms
**Date:** May 22, 2026
**Files changed:** `src/components/ContactForm.tsx`, `src/pages/Contact.tsx`, `vite.config.ts`

Added client-side input validation to both contact form components:
- **Email validation:** Regex-based validation triggered on blur and submit. Since email is optional, validation only runs when the field is filled.
- **Phone validation:** Enforces exactly 10 digits (country code is handled separately by the dropdown).
- Also fixed the Vite dev server host from IPv6 to `localhost` for better Windows compatibility.

---

### 3. `d8b3913` - Update Netlify config, dependencies, and remove unused localStorage service
**Date:** March 4, 2026
**Files changed:** `netlify-dental.toml`, `netlify-meditouch.toml`, `package.json`, `package-lock.json`, `src/lib/localStorage.ts` (deleted), `src/lib/supabase.ts`

Housekeeping commit that:
- Updated Netlify deployment configuration for both dental and meditouch sites.
- Added new project dependencies.
- Cleaned up the Supabase client setup.
- Removed the `localStorage` dev helper service that was no longer needed after switching to Netlify Functions.

---

### 4. `733249f` - Fix contact form submission to use Netlify function endpoint
**Date:** March 4, 2026
**Files changed:** `src/lib/api.ts`

Fixed the contact form API layer to point to the production Netlify Function URL instead of the `localhost:3001` development server. This ensured the form submissions work correctly in the deployed environment.

---

### 5. `07f6d61` - Remove email validation and add country code dropdown to contact forms
**Date:** March 4, 2026
**Files changed:** `netlify/functions/submit-contact.ts` (new), `src/components/ContactForm.tsx`, `src/pages/Contact.tsx`

Made several UX and backend changes to the contact forms:
- Made the email field optional on both the frontend forms and server-side validation.
- Added a custom country code dropdown integrated inside the phone input field - shows only the code when collapsed and full country names when expanded.
- Created the `submit-contact` Netlify serverless function to handle form submissions on the backend.

---

### 6. `423ac76` - Add Supabase database schema reference file
**Date:** February 28, 2026
**Files changed:** `supabase-schema.sql` (new)

Added a SQL schema reference file documenting the Supabase database structure. This serves as a reference for the database tables and their relationships used by the project.

---

### 7. `dc22574` - Add localStorage service for local dev testing without hitting Supabase
**Date:** February 28, 2026
**Files changed:** `src/lib/api.ts`, `src/lib/localStorage.ts` (new)

Introduced a `localStorage`-based service to allow developers to test contact form submissions locally without requiring a connection to the Supabase backend. The API layer was updated to conditionally route submissions to localStorage during development.

---

### 8. `38f99f9` - Add reCAPTCHA widget and on-blur field validation to contact forms
**Date:** February 28, 2026
**Files changed:** `src/components/ContactForm.tsx`, `src/pages/Contact.tsx`

Enhanced the frontend contact forms with:
- **reCAPTCHA widget:** Integrated Google reCAPTCHA v2 checkbox into both contact form components to prevent spam submissions.
- **On-blur validation:** Added field-level validation that triggers when the user moves focus away from an input, providing immediate feedback on invalid entries.

---

### 9. `9527d41` - Add server-side CAPTCHA verification to contact form endpoint
**Date:** February 28, 2026
**Files changed:** `server/index.ts`

Added server-side verification of the reCAPTCHA token on the contact form submission endpoint. The server now validates the CAPTCHA response with Google's API before processing the form, ensuring spam bots cannot bypass the client-side check.

---

### 10. `e324e59` - Add reCAPTCHA v2 and dotenv dependencies
**Date:** February 28, 2026
**Files changed:** `package.json`, `package-lock.json`

Installed the necessary npm packages to support reCAPTCHA and environment variable management:
- `react-google-recaptcha` - React component for reCAPTCHA v2.
- `dotenv` - Loads environment variables from `.env` files for local development.

---

### 11. `38e3b18` - Add .env files to .gitignore to prevent committing secrets
**Date:** February 28, 2026
**Files changed:** `.gitignore`

Updated `.gitignore` to exclude `.env` files from version control. This prevents accidental commits of sensitive environment variables such as API keys and database credentials.

---

## Summary by Area

| Area | Commits |
|------|---------|
| Contact Form (frontend) | `b61004f`, `07f6d61`, `38f99f9` |
| Contact Form (backend/API) | `733249f`, `9527d41`, `07f6d61` |
| CAPTCHA / Security | `38e3b18`, `e324e59`, `9527d41`, `38f99f9` |
| Dev Tooling & Config | `ec7ae6d`, `d8b3913`, `dc22574`, `423ac76` |
| Dependencies | `e324e59`, `d8b3913` |
