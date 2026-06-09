import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { categories, type Product } from "@/data/products";
import placeholder from "@/assets/cat-storage.jpg";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export type AdminProductRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
  stock: number;
};

export const adminRowToProduct = (r: AdminProductRow): Product => {
  const catMatch = categories.find(
    (c) => c.slug === r.category || c.name === r.category
  );
  const categorySlug = catMatch?.slug ?? slugify(r.category);
  const categoryName = catMatch?.name ?? r.category;
  const image = r.image_url || placeholder;
  return {
    slug: r.id,
    name: r.name,
    category: categoryName,
    categorySlug,
    desc: r.description ?? "",
    price: `$${Number(r.price).toFixed(0)}`,
    priceNum: Number(r.price),
    oldPrice: "",
    discount: "",
    rating: 4.5,
    image,
    images: [image, image, image],
    badge: r.stock > 0 ? "In Stock" : "Out of Stock",
    material: "—",
    colour: "—",
    specs: {
      dimensions: "—",
      material: "—",
      colour: "—",
      availability: r.stock > 0 ? `In Stock — ${r.stock} available` : "Out of Stock",
    },
    delivery: "Contact us for delivery details.",
  };
};

export const useAdminProducts = (): Product[] => {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    supabase
      .from("admin_products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setItems(((data ?? []) as AdminProductRow[]).map(adminRowToProduct));
      });
  }, []);
  return items;
};
