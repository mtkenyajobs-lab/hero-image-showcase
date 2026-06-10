import { supabase } from "@/integrations/supabase/client";

// Log a page visit (used on product detail pages and shop browsing).
export const trackVisit = async (opts: {
  productId?: string | null;
  productName?: string | null;
  path: string;
}) => {
  try {
    const { data: u } = await supabase.auth.getUser();
    await supabase.from("visits").insert({
      product_id: opts.productId ?? null,
      product_name: opts.productName ?? null,
      path: opts.path,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
      user_id: u.user?.id ?? null,
    });
  } catch {
    // best-effort tracking; never throw to the UI
  }
};

// Log a sale event (WhatsApp click).
export const trackSale = async (opts: {
  productId?: string | null;
  productName: string;
  amount?: number;
}) => {
  try {
    const { data: u } = await supabase.auth.getUser();
    await supabase.from("sales").insert({
      product_id: opts.productId ?? null,
      product_name: opts.productName,
      amount: opts.amount ?? 0,
      channel: "whatsapp",
      user_id: u.user?.id ?? null,
    });
  } catch {
    /* noop */
  }
};

// Create an order from "Buy Now".
export const createOrder = async (opts: {
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity?: number;
  total: number;
}) => {
  const { data: u } = await supabase.auth.getUser();
  const { error } = await supabase.from("orders").insert({
    user_id: u.user?.id ?? null,
    customer_name: opts.customerName,
    customer_email: opts.customerEmail,
    product_name: opts.productName,
    quantity: opts.quantity ?? 1,
    total: opts.total,
    status: "pending",
  });
  if (error) throw error;
};
