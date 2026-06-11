import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type AdminProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
  stock: number;
};

type Order = {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  product_name: string;
  quantity: number;
  total: number;
  status: string;
  created_at: string;
};

type UserRow = { id: string; display_name: string | null; created_at: string; role?: string };
type Category = { id: string; name: string; slug: string; description: string | null };
type ProductImage = { id: string; product_id: string; url: string; position: number };
type SaleRow = { id: string; product_name: string; amount: number; channel: string; created_at: string };
type VisitRow = { id: string; product_name: string | null; path: string; created_at: string };

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ClientDashboard = ({ name }: { name: string }) => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (!user) return;
    supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setMyOrders((data ?? []) as Order[]));
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Client account</p>
        <h1>Welcome back, {name}.</h1>
        <p className="text-muted-foreground mt-2 text-lg">Track your orders, quotes, and saved pieces.</p>
      </div>
      <div className="border border-border rounded-2xl p-8 bg-card">
        <h3 className="mb-2">Get started</h3>
        <p className="text-muted-foreground mb-5">
          Browse our collections or request a custom quote for bulk orders.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/shop/office-chairs"><Button size="lg">Browse catalog</Button></Link>
          <Link to="/request-a-quote"><Button size="lg" variant="outline">Request a quote</Button></Link>
        </div>
      </div>
      <div className="border border-border rounded-2xl bg-card overflow-x-auto">
        <div className="p-6 border-b border-border"><h3 className="text-xl">Your orders</h3></div>
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-sm">
            <tr><th className="p-4">Date</th><th className="p-4">Product</th><th className="p-4">Qty</th><th className="p-4">Total</th><th className="p-4">Status</th></tr>
          </thead>
          <tbody>
            {myOrders.length === 0 && <tr><td className="p-5 text-muted-foreground" colSpan={5}>You haven't placed any orders yet.</td></tr>}
            {myOrders.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="p-4">{new Date(o.created_at).toLocaleDateString()}</td>
                <td className="p-4">{o.product_name}</td>
                <td className="p-4">{o.quantity}</td>
                <td className="p-4">${Number(o.total).toFixed(2)}</td>
                <td className="p-4 capitalize">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const load = async () => {
    const { data, error } = await supabase.from("categories").select("*").order("name");
    if (error) return toast.error(error.message);
    setCategories((data ?? []) as Category[]);
  };
  useEffect(() => { load(); }, []);
  return { categories, reload: load };
};

const emptyForm = { name: "", category: "", price: "", description: "", image_url: "", stock: "" };

const ProductImagesPanel = ({ productId }: { productId: string }) => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .order("position");
    setImages((data ?? []) as ProductImage[]);
  };
  useEffect(() => { load(); }, [productId]);

  const upload = async (file: File) => {
    if (images.length >= 10) return toast.error("Maximum of 10 images per product");
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const up = await supabase.storage.from("product-images").upload(path, file);
      if (up.error) throw up.error;
      const { data: signed } = await supabase.storage
        .from("product-images")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
      if (!signed?.signedUrl) throw new Error("Could not sign URL");
      const { error } = await supabase
        .from("product_images")
        .insert({ product_id: productId, url: signed.signedUrl, position: images.length });
      if (error) throw error;
      toast.success("Image added");
      load();
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id: string) => {
    await supabase.from("product_images").delete().eq("id", id);
    load();
  };

  return (
    <div className="border border-border rounded-xl p-5 space-y-4 bg-muted/20">
      <div className="flex items-center justify-between">
        <Label className="text-base">Gallery ({images.length}/10)</Label>
        <div className="flex gap-2">
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
          <Button type="button" variant="outline" size="sm" disabled={uploading || images.length >= 10} onClick={() => fileRef.current?.click()}>
            {uploading ? "Uploading..." : "Add image"}
          </Button>
          <Button type="button" variant="outline" size="sm" disabled={uploading || images.length >= 10} onClick={() => cameraRef.current?.click()}>
            Take photo
          </Button>
        </div>
      </div>
      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground">No additional images yet.</p>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {images.map((img) => (
            <div key={img.id} className="relative group">
              <img src={img.url} alt="" className="w-full h-24 object-cover rounded-md border border-border" />
              <button
                type="button"
                onClick={() => remove(img.id)}
                className="absolute top-1 right-1 bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductsModule = ({ mode }: { mode: "manage" | "view" }) => {
  const { categories } = useCategories();
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiBusy, setAiBusy] = useState<"generate" | "improve" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("admin_products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setItems((data ?? []) as AdminProduct[]);
  };
  useEffect(() => { load(); }, []);

  const reset = () => { setForm(emptyForm); setEditingId(null); };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `cover/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) throw error;
      const { data: signed } = await supabase.storage.from("product-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
      if (signed?.signedUrl) setForm((f) => ({ ...f, image_url: signed.signedUrl }));
      toast.success("Cover image uploaded");
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const runAi = async (kind: "generate" | "improve") => {
    if (!form.name && kind === "generate") return toast.error("Add a product name first");
    setAiBusy(kind);
    try {
      const { data, error } = await supabase.functions.invoke("ai-description", {
        body: { mode: kind, name: form.name, category: form.category, current: form.description },
      });
      if (error) throw error;
      if (data?.text) {
        setForm((f) => ({ ...f, description: data.text }));
        toast.success(kind === "improve" ? "Description improved" : "Description generated");
      } else if (data?.error) {
        toast.error(data.error);
      }
    } catch (e: any) {
      toast.error(e.message ?? "AI request failed");
    } finally {
      setAiBusy(null);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price) || 0,
      description: form.description || null,
      image_url: form.image_url || null,
      stock: Number(form.stock) || 0,
    };
    const result = editingId
      ? await supabase.from("admin_products").update(payload).eq("id", editingId).select().single()
      : await supabase.from("admin_products").insert(payload).select().single();
    setLoading(false);
    if (result.error) return toast.error(result.error.message);
    toast.success(editingId ? "Product updated" : "Product added");
    if (!editingId && result.data) {
      setEditingId(result.data.id);
      toast.info("Now add up to 10 gallery images below.");
    }
    load();
  };

  const edit = (p: AdminProduct) => {
    setEditingId(p.id);
    setForm({
      name: p.name, category: p.category, price: String(p.price),
      description: p.description ?? "", image_url: p.image_url ?? "", stock: String(p.stock),
    });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("admin_products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Product deleted");
    load();
  };

  return (
    <div className="space-y-6">
      {mode === "manage" && (
        <form onSubmit={submit} className="border border-border rounded-2xl p-6 md:p-8 bg-card space-y-5">
          <h3>{editingId ? "Edit product" : "Add new product"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5"><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-background border border-input rounded-lg h-11 px-4 text-base hover:border-foreground/30 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
              {categories.length === 0 && (
                <p className="text-xs text-muted-foreground">No categories yet — add one in the Categories tab.</p>
              )}
            </div>
            <div className="space-y-1.5"><Label>Price (USD)</Label><Input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>

            <div className="md:col-span-2 space-y-2">
              <Label>Cover image</Label>
              <div className="flex flex-wrap gap-2">
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                <input ref={cameraRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                <Button type="button" variant="outline" disabled={uploading} onClick={() => fileRef.current?.click()}>
                  {uploading ? "Uploading..." : "Choose file"}
                </Button>
                <Button type="button" variant="outline" disabled={uploading} onClick={() => cameraRef.current?.click()}>
                  Take photo
                </Button>
              </div>
              <Input placeholder="Or paste image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              {form.image_url && (
                <img src={form.image_url} alt="Preview" className="h-28 w-28 object-cover rounded-lg border border-border" />
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <Label>Description</Label>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" disabled={aiBusy !== null} onClick={() => runAi("generate")}>
                    {aiBusy === "generate" ? "Generating..." : "AI Generate"}
                  </Button>
                  <Button type="button" variant="outline" size="sm" disabled={aiBusy !== null || !form.description} onClick={() => runAi("improve")}>
                    {aiBusy === "improve" ? "Improving..." : "AI Improve"}
                  </Button>
                </div>
              </div>
              <Textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>

          {editingId && <ProductImagesPanel productId={editingId} />}

          <div className="flex gap-3">
            <Button type="submit" size="lg" disabled={loading}>{editingId ? "Update product" : "Add product"}</Button>
            {editingId && <Button type="button" size="lg" variant="outline" onClick={reset}>Done</Button>}
          </div>
        </form>
      )}

      <div className="border border-border rounded-2xl bg-card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-sm">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              {mode === "manage" && <th className="p-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td className="p-5 text-muted-foreground" colSpan={mode === "manage" ? 5 : 4}>No products yet.</td></tr>
            )}
            {items.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">${Number(p.price).toFixed(2)}</td>
                <td className="p-4">{p.stock}</td>
                {mode === "manage" && (
                  <td className="p-4 space-x-2">
                    <Button size="sm" variant="outline" onClick={() => edit(p)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(p.id)}>Delete</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CategoriesModule = () => {
  const { categories, reload } = useCategories();
  const [form, setForm] = useState({ name: "", slug: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const reset = () => { setForm({ name: "", slug: "", description: "" }); setEditingId(null); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: form.name.trim(), slug: (form.slug || slugify(form.name)).trim(), description: form.description || null };
    const { error } = editingId
      ? await supabase.from("categories").update(payload).eq("id", editingId)
      : await supabase.from("categories").insert(payload);
    if (error) return toast.error(error.message);
    toast.success(editingId ? "Category updated" : "Category added");
    reset(); reload();
  };
  const edit = (c: Category) => { setEditingId(c.id); setForm({ name: c.name, slug: c.slug, description: c.description ?? "" }); };
  const remove = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    reload();
  };
  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="border border-border rounded-2xl p-6 md:p-8 bg-card space-y-5">
        <h3>{editingId ? "Edit category" : "Add new category"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5"><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : slugify(e.target.value) })} /></div>
          <div className="space-y-1.5"><Label>Slug</Label><Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
          <div className="md:col-span-2 space-y-1.5"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        </div>
        <div className="flex gap-3">
          <Button type="submit" size="lg">{editingId ? "Update" : "Add category"}</Button>
          {editingId && <Button type="button" size="lg" variant="outline" onClick={reset}>Cancel</Button>}
        </div>
      </form>
      <div className="border border-border rounded-2xl bg-card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-sm">
            <tr><th className="p-4">Name</th><th className="p-4">Slug</th><th className="p-4">Description</th><th className="p-4">Actions</th></tr>
          </thead>
          <tbody>
            {categories.length === 0 && <tr><td className="p-5 text-muted-foreground" colSpan={4}>No categories yet.</td></tr>}
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="p-4 font-medium">{c.name}</td>
                <td className="p-4 font-mono text-xs">{c.slug}</td>
                <td className="p-4 text-muted-foreground">{c.description ?? "—"}</td>
                <td className="p-4 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => edit(c)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(c.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrdersModule = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const load = async () => {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    setOrders((data ?? []) as Order[]);
  };
  useEffect(() => { load(); }, []);
  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };
  return (
    <div className="border border-border rounded-2xl bg-card overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/40 text-left text-sm">
          <tr>
            <th className="p-4">Date</th><th className="p-4">Customer</th><th className="p-4">Email</th>
            <th className="p-4">Product</th><th className="p-4">Qty</th><th className="p-4">Total</th><th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && <tr><td className="p-5 text-muted-foreground" colSpan={7}>No orders yet.</td></tr>}
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <td className="p-4">{new Date(o.created_at).toLocaleDateString()}</td>
              <td className="p-4 font-medium">{o.customer_name}</td>
              <td className="p-4">{o.customer_email}</td>
              <td className="p-4">{o.product_name}</td>
              <td className="p-4">{o.quantity}</td>
              <td className="p-4">${Number(o.total).toFixed(2)}</td>
              <td className="p-4">
                <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className="bg-background border border-input rounded-md px-2 py-1 text-sm">
                  <option value="pending">pending</option><option value="processing">processing</option>
                  <option value="shipped">shipped</option><option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SalesModule = () => {
  const [sales, setSales] = useState<SaleRow[]>([]);
  useEffect(() => {
    supabase.from("sales").select("*").order("created_at", { ascending: false }).then(({ data }) => setSales((data ?? []) as SaleRow[]));
  }, []);
  const total = sales.reduce((s, r) => s + Number(r.amount || 0), 0);
  return (
    <div className="space-y-6">
      <div className="border border-border rounded-2xl bg-card p-6">
        <p className="text-sm text-muted-foreground">Total tracked sales value</p>
        <p className="text-4xl font-display font-bold mt-1">${total.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">{sales.length} sale events (WhatsApp clicks)</p>
      </div>
      <div className="border border-border rounded-2xl bg-card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-sm">
            <tr><th className="p-4">Date</th><th className="p-4">Product</th><th className="p-4">Amount</th><th className="p-4">Channel</th></tr>
          </thead>
          <tbody>
            {sales.length === 0 && <tr><td className="p-5 text-muted-foreground" colSpan={4}>No sales logged yet.</td></tr>}
            {sales.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="p-4">{new Date(s.created_at).toLocaleString()}</td>
                <td className="p-4 font-medium">{s.product_name}</td>
                <td className="p-4">${Number(s.amount).toFixed(2)}</td>
                <td className="p-4 capitalize">{s.channel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VisitsModule = () => {
  const [visits, setVisits] = useState<VisitRow[]>([]);
  useEffect(() => {
    supabase.from("visits").select("*").order("created_at", { ascending: false }).limit(200).then(({ data }) => setVisits((data ?? []) as VisitRow[]));
  }, []);
  const byProduct = useMemo(() => {
    const m = new Map<string, number>();
    visits.forEach((v) => { const k = v.product_name || v.path; m.set(k, (m.get(k) ?? 0) + 1); });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [visits]);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-border rounded-2xl bg-card p-6">
          <p className="text-sm text-muted-foreground">Total visits (last 200)</p>
          <p className="text-4xl font-display font-bold mt-1">{visits.length}</p>
        </div>
        <div className="border border-border rounded-2xl bg-card p-6">
          <p className="text-sm text-muted-foreground mb-3">Top viewed</p>
          <ul className="space-y-1.5 text-sm">
            {byProduct.length === 0 && <li className="text-muted-foreground">No visits yet.</li>}
            {byProduct.map(([k, n]) => (
              <li key={k} className="flex justify-between"><span className="truncate pr-3">{k}</span><span className="font-semibold">{n}</span></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border border-border rounded-2xl bg-card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-sm">
            <tr><th className="p-4">When</th><th className="p-4">Product</th><th className="p-4">Path</th></tr>
          </thead>
          <tbody>
            {visits.map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="p-4">{new Date(v.created_at).toLocaleString()}</td>
                <td className="p-4">{v.product_name ?? "—"}</td>
                <td className="p-4 font-mono text-xs">{v.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UsersModule = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<"client" | "admin">("client");

  const load = async () => {
    const { data: profiles, error } = await supabase.from("profiles").select("id, display_name, created_at").order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    const roleMap = new Map((roles ?? []).map((r) => [r.user_id, r.role as string]));
    setUsers((profiles ?? []).map((p) => ({ ...p, role: roleMap.get(p.id) ?? "client" })));
  };
  useEffect(() => { load(); }, []);

  const assign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error("User ID required");
    const { error } = await supabase.from("user_roles").upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
    if (error) return toast.error(error.message);
    if (name) await supabase.from("profiles").update({ display_name: name }).eq("id", userId);
    toast.success("Role assigned");
    setUserId(""); setName(""); setRole("client");
    load();
  };
  return (
    <div className="space-y-6">
      <form onSubmit={assign} className="border border-border rounded-2xl p-6 md:p-8 bg-card space-y-5">
        <h3>Assign role to user</h3>
        <p className="text-sm text-muted-foreground">New users must sign up themselves. Paste an existing user's ID to set their role or display name.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-1.5"><Label>User ID</Label><Input required value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="uuid from users list below" /></div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <select value={role} onChange={(e) => setRole(e.target.value as "client" | "admin")} className="w-full bg-background border border-input rounded-lg h-11 px-4 text-base">
              <option value="client">client</option><option value="admin">admin</option>
            </select>
          </div>
          <div className="md:col-span-3 space-y-1.5"><Label>Display name (optional)</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
        </div>
        <Button type="submit" size="lg">Save</Button>
      </form>
      <div className="border border-border rounded-2xl bg-card overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-sm">
            <tr><th className="p-4">User ID</th><th className="p-4">Display name</th><th className="p-4">Role</th><th className="p-4">Joined</th></tr>
          </thead>
          <tbody>
            {users.length === 0 && <tr><td className="p-5 text-muted-foreground" colSpan={4}>No users yet.</td></tr>}
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="p-4 font-mono text-xs">{u.id}</td>
                <td className="p-4">{u.display_name ?? "—"}</td>
                <td className="p-4 capitalize">{u.role}</td>
                <td className="p-4">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TABS = [
  { id: "add-product", label: "Add Product" },
  { id: "view-products", label: "View Products" },
  { id: "categories", label: "Categories" },
  { id: "orders", label: "Orders" },
  { id: "sales", label: "Sales" },
  { id: "visits", label: "Visits" },
  { id: "users", label: "Users" },
] as const;

type TabId = typeof TABS[number]["id"];

const AdminDashboard = ({ name }: { name: string }) => {
  const [tab, setTab] = useState<TabId>("add-product");
  const [stats, setStats] = useState({ orders: 0, sales: 0, visits: 0 });

  useEffect(() => {
    const run = async () => {
      const [o, s, v] = await Promise.all([
        supabase.from("orders").select("total"),
        supabase.from("sales").select("amount"),
        supabase.from("visits").select("id", { count: "exact", head: true }),
      ]);
      const orders = (o.data ?? []).reduce((a: number, r: any) => a + Number(r.total || 0), 0);
      const sales = (s.data ?? []).reduce((a: number, r: any) => a + Number(r.amount || 0), 0);
      setStats({ orders, sales, visits: v.count ?? 0 });
    };
    run();
  }, [tab]);

  const cards = [
    { id: "orders", label: "Orders revenue", value: `$${stats.orders.toFixed(2)}`, action: "View orders" },
    { id: "sales", label: "Sales (WhatsApp)", value: `$${stats.sales.toFixed(2)}`, action: "View sales" },
    { id: "visits", label: "Total visits", value: String(stats.visits), action: "View visits" },
  ] as const;

  return (
    <div className="admin-theme space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Admin account</p>
        <h1>Admin dashboard</h1>
        <p className="text-muted-foreground mt-2 text-lg">Hello {name} — manage your store below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <button key={c.id} onClick={() => setTab(c.id as TabId)} className="text-left border border-border rounded-2xl bg-card p-6 hover:border-primary hover:shadow-md transition-all">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="text-3xl md:text-4xl font-display font-bold mt-2">{c.value}</p>
            <p className="text-xs text-primary mt-3 font-medium">{c.action} →</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <aside className="order-1">
          <div className="border border-border rounded-2xl bg-card p-2 md:sticky md:top-20">
            <nav className="flex md:flex-col gap-1 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    tab === t.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>
        <div className="min-w-0 order-2">
          {tab === "add-product" && <ProductsModule mode="manage" />}
          {tab === "view-products" && <ProductsModule mode="view" />}
          {tab === "categories" && <CategoriesModule />}
          {tab === "orders" && <OrdersModule />}
          {tab === "sales" && <SalesModule />}
          {tab === "visits" && <VisitsModule />}
          {tab === "users" && <UsersModule />}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  const name =
    (user.user_metadata?.display_name as string) ||
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-10 md:py-14 flex-1">
        {role === "admin" ? <AdminDashboard name={name} /> : <ClientDashboard name={name} />}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
