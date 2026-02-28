-- ============================================
-- Supabase Database Schema
-- Mudra Dental & Aesthetic Clinic
-- ============================================

-- Contact Submissions Table
-- Stores form submissions from both Dental Metrix and Meditouch websites
CREATE TABLE contact_submissions (
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

-- Indexes for faster queries
CREATE INDEX idx_contact_clinic ON contact_submissions (clinic);
CREATE INDEX idx_contact_status ON contact_submissions (status);
CREATE INDEX idx_contact_submitted_at ON contact_submissions (submitted_at);
CREATE INDEX idx_contact_email ON contact_submissions (email);

-- Auto-update the updated_at column on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for contact form submissions from the website)
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all submissions (for admin dashboard)
CREATE POLICY "Allow authenticated read"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update submissions (for status changes)
CREATE POLICY "Allow authenticated update"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete submissions
CREATE POLICY "Allow authenticated delete"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);
