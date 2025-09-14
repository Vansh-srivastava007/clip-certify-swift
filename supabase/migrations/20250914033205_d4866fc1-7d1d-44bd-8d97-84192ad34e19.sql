-- Ensure profiles RLS is enabled and insert policy allows system inserts during signup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Recreate handle_new_user as SECURITY DEFINER for proper privileges during trigger execution
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', NEW.raw_user_meta_data ->> 'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Create the trigger to populate profiles on new auth users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Ensure the INSERT policy exists and matches the required logic
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'profiles' AND policyname = 'Allow profile creation'
  ) THEN
    DROP POLICY "Allow profile creation" ON public.profiles;
  END IF;

  CREATE POLICY "Allow profile creation"
  ON public.profiles
  FOR INSERT
  WITH CHECK ((auth.uid() = user_id) OR (auth.uid() IS NULL));
END $$;

-- Keep existing SELECT/UPDATE policies as-is, but add updated_at trigger for good hygiene
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();