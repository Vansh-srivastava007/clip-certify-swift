-- Fix the profiles table RLS policy and add the missing trigger

-- First, let's create a more permissive policy for the trigger function
CREATE POLICY "Allow system to create profiles on signup" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

-- Create the missing trigger to automatically create profiles when users sign up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();