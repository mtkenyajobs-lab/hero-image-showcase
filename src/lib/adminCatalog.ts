import { supabase } from "@/integrations/supabase/client";

export type DbCategory = { id: string; name: string; slug: string };

export type AdminProduct = {
  id: string;
  name: string;
  category: string; // category name as stored on the row
  price: number;
  description: string | null;
  image_url: string | null;
  stock: number;
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const fetchCategories = async (): Promise<DbCategory[]> => {
  const { data } = await supabase
    .from("categories")
    .select("id,name,slug")
    .order("name");
  return (data ?? []) as DbCategory[];
};

export const fetchAdminProducts = async (): Promise<AdminProduct[]> => {
  const { data } = await supabase
    .from("admin_products")
    .select("id,name,category,price,description,image_url,stock")
    .order("created_at", { ascending: false });
  return (data ?? []) as AdminProduct[];
};
