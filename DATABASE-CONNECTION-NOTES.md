# Website ↔ Database Connection — Setup Notes

**Date:** 2026-10-02
**Scope:** Reconnected the public website's contact form to a working Supabase
database, and pointed it at the clinic ERP's database so website leads and the
ERP share one source of truth.

> ⚠️ This file is **reference documentation only**. It contains **no secret keys**.
> The actual keys live in Netlify (site env vars) and Supabase (project settings).

---

## 1. Why this was needed

- The website's contact form was wired to an **old Supabase project**
  (`ekwvlgsyqsirfsnckisu`).
- That project **no longer exists** (its hostname `ekwvlgsyqsirfsnckisu.supabase.co`
  does not resolve — confirmed via public DNS). It was most likely **paused and
  then deleted** after ~7 months of inactivity (it was last configured ~March 2026).
- Result: the live contact form could not save submissions, and the admin page
  had no data source.
- It was also not in the Supabase account the team currently controls
  (`websitechecking24@gmail.com` / org "Mudra-Clinic"), so it could not be restored.

**Fix:** point the website at the Supabase projects the team *does* control — the
same ones the clinic ERP uses — and recreate the `contact_submissions` table there.

---

## 2. Architecture

- **One codebase, two Netlify sites**, switched by the `VITE_BRAND_MODE` env var:
  - `VITE_BRAND_MODE = dental`     → **Dental Metrix** site (dentalmetrix.co.in)
  - `VITE_BRAND_MODE = meditouch`  → **Meditouch** site
- **Both sites write to the SAME database / SAME table** (`contact_submissions`).
  The brand decides the `clinic` column value:
  - dental site  → `clinic = 'dental_metrix'`
  - meditouch site → `clinic = 'meditouch'`
- **One admin page** at `/admin` reads **all** submissions (both brands) and filters
  by the `clinic` column. Login is a simple client-side password (see security note).

### Data flow (live)
```
Contact form (+ Google reCAPTCHA)
   → Netlify function  /.netlify/functions/submit-contact
       → verifies reCAPTCHA with Google (RECAPTCHA_SECRET_KEY)
       → inserts row into Supabase  contact_submissions  (SUPABASE_SERVICE_ROLE_KEY)
   → Admin page /admin reads rows back (VITE_SUPABASE_ANON_KEY)
```

---

## 3. Databases (both owned by `websitechecking24@gmail.com`, org "Mudra-Clinic")

| Role | Supabase project name | Project ID / URL | Used by |
|------|-----------------------|------------------|---------|
| **DEVELOPMENT** | `Mudra` | `pwijqupjtminhcmtbxta` → https://pwijqupjtminhcmtbxta.supabase.co | Local development (website + ERP) |
| **LIVE / PRODUCTION** | `Mudra_Clinic_Demo` | `cqtloiklvpvafeoiyyhy` → https://cqtloiklvpvafeoiyyhy.supabase.co | Netlify production (both website sites + ERP) |

The `contact_submissions` table was created in **both** projects so dev and live
behave identically.

---

## 4. Database changes applied (run in Supabase SQL Editor on BOTH projects)

### 4a. Table + indexes + updated_at trigger + RLS
(Identical to the original website schema in `supabase-schema.sql`, made
safe to re-run.)

```sql
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_inquiry TEXT NOT NULL,
  message TEXT,
  clinic TEXT NOT NULL CHECK (clinic IN ('dental_metrix', 'meditouch')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'follow-up', 'scheduled', 'closed')),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_clinic       ON contact_submissions (clinic);
CREATE INDEX IF NOT EXISTS idx_contact_status       ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_submitted_at ON contact_submissions (submitted_at);
CREATE INDEX IF NOT EXISTS idx_contact_email        ON contact_submissions (email);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON contact_submissions;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
```

### 4b. Allow the `anon` role to read/update/delete this table
Needed because the admin page (and the future ERP Leads page) read and manage
leads using the **public anon key**, not a real Supabase login.

```sql
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
CREATE POLICY "Allow anonymous inserts" ON contact_submissions FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon read"   ON contact_submissions;
CREATE POLICY "Allow anon read"   ON contact_submissions FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Allow anon update" ON contact_submissions;
CREATE POLICY "Allow anon update" ON contact_submissions FOR UPDATE TO anon USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon delete" ON contact_submissions;
CREATE POLICY "Allow anon delete" ON contact_submissions FOR DELETE TO anon USING (true);
```

---

## 5. Netlify changes (per site)

On **each** Netlify site (dental **and** meditouch), these **4 env vars** were
repointed to the **LIVE** project (`cqtloiklvpvafeoiyyhy`):

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://cqtloiklvpvafeoiyyhy.supabase.co` |
| `SUPABASE_URL` | `https://cqtloiklvpvafeoiyyhy.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | *(anon key of the live project — from Supabase → API)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(service_role secret of the live project — marked "Contains secret values" in Netlify)* |

**Left unchanged:** `VITE_BRAND_MODE` (dental / meditouch per site),
`VITE_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY`.

> After editing env vars you **must trigger a redeploy** (Deploys → Trigger deploy →
> Deploy without cache) for them to take effect.

---

## 6. Verified working

- **Dental site:** submitted the live contact form → row saved to the LIVE database
  (`cqtloiklvpvafeoiyyhy`) and appeared on the `/admin` page with
  `clinic = dental_metrix`. ✅ Confirmed end-to-end.

---

## 7. Known issues / TODO

- **Meditouch reCAPTCHA domain error** (unresolved): the meditouch site's contact
  form shows a reCAPTCHA "invalid domain for site key" type error. This is a Google
  reCAPTCHA configuration issue (the meditouch domain likely isn't in the site key's
  allowed-domains list), **not** a database issue. Fix in the Google reCAPTCHA admin
  (https://www.google.com/recaptcha/admin) by adding the meditouch domain, and/or
  confirm `VITE_RECAPTCHA_SITE_KEY` is set correctly on the meditouch site.
  (See remote branch `Captcha_for_both_clinic` — may be related.)
- **ERP "Leads/Enquiries" page** not built yet. Goal: let clinic staff view and
  manage these submissions from inside the ERP (it reads the same table via the
  anon key — policies in 4b already support this).
- **Local development env** for the website (`.env` → dev project
  `pwijqupjtminhcmtbxta`) to be finalized so the team can run locally against dev.

---

## 8. Security note (important)

The admin login is a **hardcoded client-side password**, and the table is readable/
writable by the **public `anon` key** (which ships in the website's JavaScript bundle).
This means the leads table is technically reachable by anyone who has that key. This
matches how the site already worked, and is consistent with the ERP (RLS disabled on
its tables). **Proper hardening** (real Supabase Auth for admin, tighter RLS) should
be done as a separate task.
