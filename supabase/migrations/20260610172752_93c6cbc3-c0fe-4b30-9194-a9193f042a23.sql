
CREATE POLICY "Public upload resumes" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Public upload payment screenshots" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'payment-screenshots');
CREATE POLICY "Authenticated read resumes" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'resumes');
CREATE POLICY "Authenticated read payment screenshots" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'payment-screenshots');
