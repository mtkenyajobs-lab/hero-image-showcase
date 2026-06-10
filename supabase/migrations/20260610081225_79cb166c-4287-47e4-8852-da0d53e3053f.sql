-- product_images: up to 10 per admin_product
CREATE TABLE public.product_images (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES public.admin_products(id) ON DELETE CASCADE,
  url text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX product_images_product_idx ON public.product_images(product_id);

GRANT SELECT ON public.product_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view product images" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Admins insert product images" ON public.product_images FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update product images" ON public.product_images FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete product images" ON public.product_images FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Enforce max 10 images per product
CREATE OR REPLACE FUNCTION public.enforce_product_image_limit()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.product_images WHERE product_id = NEW.product_id) >= 10 THEN
    RAISE EXCEPTION 'A product can have at most 10 images';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER product_images_limit BEFORE INSERT ON public.product_images
FOR EACH ROW EXECUTE FUNCTION public.enforce_product_image_limit();

-- visits: page view tracking for products / shop
CREATE TABLE public.visits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.admin_products(id) ON DELETE SET NULL,
  product_name text,
  path text NOT NULL,
  referrer text,
  user_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX visits_created_idx ON public.visits(created_at DESC);
CREATE INDEX visits_product_idx ON public.visits(product_id);

GRANT INSERT ON public.visits TO anon, authenticated;
GRANT SELECT, DELETE ON public.visits TO authenticated;
GRANT ALL ON public.visits TO service_role;

ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a visit" ON public.visits FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view visits" ON public.visits FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete visits" ON public.visits FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow anonymous (guest) orders so 'Buy Now' on product cards can place an order without forcing login.
-- Update existing orders policy to permit null user_id inserts.
DROP POLICY IF EXISTS "Users create own orders" ON public.orders;
CREATE POLICY "Anyone can create an order" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (user_id IS NULL OR auth.uid() = user_id);
GRANT INSERT ON public.orders TO anon;