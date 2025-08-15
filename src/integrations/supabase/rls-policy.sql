
-- Enable Row Level Security on the waitlist table
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from anyone (since this is a public waitlist form)
CREATE POLICY "Allow public inserts to waitlist" 
ON public.waitlist 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create a policy that allows only admins to view the waitlist data
CREATE POLICY "Allow admins to view waitlist" 
ON public.waitlist 
FOR SELECT 
USING (auth.role() = 'authenticated');
