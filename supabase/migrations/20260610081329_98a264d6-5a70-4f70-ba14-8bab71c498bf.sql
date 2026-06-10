CREATE TABLE public.sales (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.admin_products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  channel text NOT NULL DEFAULT 'whatsapp',
  user_id uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX sales_created_idx ON public.sales(created_at DESC);

GRANT INSERT ON public.sales TO anon, authenticated;
GRANT SELECT, DELETE ON public.sales TO authenticated;
GRANT ALL ON public.sales TO service_role;

ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a sale" ON public.sales FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view sales" ON public.sales FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins delete sales" ON public.sales FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));