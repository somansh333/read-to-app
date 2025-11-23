-- Fix PUBLIC_DATA_EXPOSURE: Restrict profile viewing to owners only
-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

-- Create owner-only SELECT policy to protect student PII
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT
  USING (auth.uid() = user_id);