
CREATE TABLE public.internship_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date DATE,
  college TEXT NOT NULL,
  qualification TEXT NOT NULL,
  resume_url TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.internship_applications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.internship_applications TO authenticated;
GRANT ALL ON public.internship_applications TO service_role;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit application" ON public.internship_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.payment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES public.internship_applications(id) ON DELETE SET NULL,
  applicant_email TEXT,
  transaction_id TEXT NOT NULL,
  screenshot_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.payment_submissions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_submissions TO authenticated;
GRANT ALL ON public.payment_submissions TO service_role;
ALTER TABLE public.payment_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit payment" ON public.payment_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
