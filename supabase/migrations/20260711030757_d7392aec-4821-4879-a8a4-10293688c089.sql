
-- Drop anon INSERT policies on storage.objects for these buckets
DO $$
DECLARE p record;
BEGIN
  FOR p IN
    SELECT policyname FROM pg_policies
    WHERE schemaname='storage' AND tablename='objects'
      AND (policyname ILIKE '%upload%resume%' OR policyname ILIKE '%upload%payment%'
           OR policyname ILIKE '%public%resume%' OR policyname ILIKE '%public%payment%')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', p.policyname);
  END LOOP;
END $$;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- Drop all policies depending on public.has_role
DROP POLICY IF EXISTS "Admins can delete internship applications" ON public.internship_applications;
DROP POLICY IF EXISTS "Admins can update internship applications" ON public.internship_applications;
DROP POLICY IF EXISTS "Admins can view internship applications" ON public.internship_applications;
DROP POLICY IF EXISTS "Admins can delete payment submissions" ON public.payment_submissions;
DROP POLICY IF EXISTS "Admins can update payment submissions" ON public.payment_submissions;
DROP POLICY IF EXISTS "Admins can view payment submissions" ON public.payment_submissions;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admins update resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete resumes" ON storage.objects;
DROP POLICY IF EXISTS "Admins read payment screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Admins update payment screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete payment screenshots" ON storage.objects;

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- Recreate public schema policies
CREATE POLICY "Admins can delete internship applications" ON public.internship_applications
FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update internship applications" ON public.internship_applications
FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view internship applications" ON public.internship_applications
FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete payment submissions" ON public.payment_submissions
FOR DELETE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update payment submissions" ON public.payment_submissions
FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view payment submissions" ON public.payment_submissions
FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can manage roles" ON public.user_roles
FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));

-- Recreate storage.objects admin policies
CREATE POLICY "Admins read resumes" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'resumes' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins update resumes" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'resumes' AND private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'resumes' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete resumes" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'resumes' AND private.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins read payment screenshots" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'payment-screenshots' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins update payment screenshots" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'payment-screenshots' AND private.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'payment-screenshots' AND private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins delete payment screenshots" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'payment-screenshots' AND private.has_role(auth.uid(), 'admin'::public.app_role));
