-- Drop the restrictive INSERT policy and replace with a better one
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- Create a new policy that allows both user inserts and system inserts during signup
CREATE POLICY "Allow profile creation" 
ON public.profiles 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id OR  -- User can insert their own profile
  auth.uid() IS NULL       -- Allow system/trigger to insert during signup
);