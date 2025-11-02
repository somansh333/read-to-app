-- Add foreign key relationship between products and profiles
ALTER TABLE public.products 
ADD CONSTRAINT products_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(user_id) 
ON DELETE CASCADE;