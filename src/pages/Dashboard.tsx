import { useEffect, useState } from "react";
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
import { categories } from "@/data/products";

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
  customer_name: string;
  customer_email: string;
  product_name: string;
  quantity: number;
  total: number;
  status: string;
  created_at: string;
};

type UserRow = {
  id: string;
  display_name: string | null;
  created_at: string;
  role?: string;
};

const ClientDashboard = ({ name }: { name: string }) => (
  <div className="space-y-6">
    <div>
      <p className="text-sm text-muted-foreground">Client account</p>
      <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {name}.</h1>
      <p className="text-muted-foreground mt-1">Track your orders, quotes, and saved pieces.</p>
    </div>
    <div className="border border-border rounded-xl p-6 bg-card">
      <h2 className="font-semibold mb-2">Get started</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Browse our collections or request a custom quote for bulk orders.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/shop/office-chairs"><Button>Browse catalog</Button></Link>
        <Link to="/request-a-quote"><Button variant="outline">Request a quote</Button></Link>
      </div>
    </div>
  </div>
);

const emptyForm = { name: "", category: "", price: "", description: "", image_url: "", stock: "" };

const ProductsModule = ({ mode }: { mode: "manage" | "view" }) => {
  const [items, setItems] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

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
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("product-images")
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (upErr) { setUploading(false); return toast.error(upErr.message); }
    const { data: signed, error: sErr } = await supabase.storage
      .from("product-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    setUploading(false);
    if (sErr || !signed) return toast.error(sErr?.message ?? "Failed to get URL");
    setForm((f) => ({ ...f, image_url: signed.signedUrl }));
    toast.success("Image uploaded");
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
    const { error } = editingId
      ? await supabase.from("admin_products").update(payload).eq("id", editingId)
      : await supabase.from("admin_products").insert(payload);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success(editingId ? "Product updated" : "Product added");
    reset();
    load();
  };

  const edit = (p: AdminProduct) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      description: p.description ?? "",
      image_url: p.image_url ?? "",
      stock: String(p.stock),
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
        <form onSubmit={submit} className="border border-border rounded-xl p-6 bg-card space-y-4">
          <h3 className="font-semibold">{editingId ? "Edit product" : "Add new product"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Name</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div>
              <Label>Category</Label>
              <select
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-background border border-border rounded h-10 px-3"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div><Label>Price (USD)</Label><Input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
            <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
            <div className="md:col-span-2">
              <Label>Product image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
                disabled={uploading}
              />
              {uploading && <p className="text-xs text-muted-foreground mt-1">Uploading...</p>}
              {form.image_url && (
                <div className="mt-2 flex items-center gap-3">
                  <img src={form.image_url} alt="preview" className="w-16 h-16 object-cover rounded border border-border" />
                  <Input className="flex-1" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Image URL" />
                </div>
              )}
              {!form.image_url && (
                <Input className="mt-2" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="Or paste an image URL" />
              )}
            </div>
            <div className="md:col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>{editingId ? "Update product" : "Add product"}</Button>
            {editingId && <Button type="button" variant="outline" onClick={reset}>Cancel</Button>}
          </div>
        </form>
      )}

      <div className="border border-border rounded-xl bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              {mode === "manage" && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td className="p-4 text-muted-foreground" colSpan={mode === "manage" ? 5 : 4}>No products yet.</td></tr>
            )}
            {items.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">${Number(p.price).toFixed(2)}</td>
                <td className="p-3">{p.stock}</td>
                {mode === "manage" && (
                  <td className="p-3 space-x-2">
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

const OrdersModule = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const load = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
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
    <div className="border border-border rounded-xl bg-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-left">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Customer</th>
            <th className="p-3">Email</th>
            <th className="p-3">Product</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr><td className="p-4 text-muted-foreground" colSpan={7}>No orders yet.</td></tr>
          )}
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-border">
              <td className="p-3">{new Date(o.created_at).toLocaleDateString()}</td>
              <td className="p-3">{o.customer_name}</td>
              <td className="p-3">{o.customer_email}</td>
              <td className="p-3">{o.product_name}</td>
              <td className="p-3">{o.quantity}</td>
              <td className="p-3">${Number(o.total).toFixed(2)}</td>
              <td className="p-3">
                <select
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value)}
                  className="bg-background border border-border rounded px-2 py-1"
                >
                  <option value="pending">pending</option>
                  <option value="processing">processing</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
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

const UsersModule = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState<"client" | "admin">("client");

  const load = async () => {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, display_name, created_at")
      .order("created_at", { ascending: false });
    if (error) return toast.error(error.message);
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    const roleMap = new Map((roles ?? []).map((r) => [r.user_id, r.role as string]));
    setUsers((profiles ?? []).map((p) => ({ ...p, role: roleMap.get(p.id) ?? "client" })));
  };

  useEffect(() => { load(); }, []);

  const assign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return toast.error("User ID required");
    const { error } = await supabase
      .from("user_roles")
      .upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
    if (error) return toast.error(error.message);
    if (name) await supabase.from("profiles").update({ display_name: name }).eq("id", userId);
    toast.success("Role assigned");
    setUserId(""); setName(""); setRole("client");
    load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={assign} className="border border-border rounded-xl p-6 bg-card space-y-4">
        <h3 className="font-semibold">Assign role to user</h3>
        <p className="text-xs text-muted-foreground">
          New users must sign up themselves. Paste an existing user's ID below to set their role or display name.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2"><Label>User ID</Label><Input required value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="uuid from users list below" /></div>
          <div>
            <Label>Role</Label>
            <select value={role} onChange={(e) => setRole(e.target.value as "client" | "admin")} className="w-full bg-background border border-border rounded h-10 px-3">
              <option value="client">client</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="md:col-span-3"><Label>Display name (optional)</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
        </div>
        <Button type="submit">Save</Button>
      </form>

      <div className="border border-border rounded-xl bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Display name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td className="p-4 text-muted-foreground" colSpan={4}>No users yet.</td></tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="p-3 font-mono text-xs">{u.id}</td>
                <td className="p-3">{u.display_name ?? "—"}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">{new Date(u.created_at).toLocaleDateString()}</td>
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
  { id: "orders", label: "Check Orders" },
  { id: "users", label: "Add Users" },
] as const;

type TabId = typeof TABS[number]["id"];

const AdminDashboard = ({ name }: { name: string }) => {
  const [tab, setTab] = useState<TabId>("add-product");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Admin account</p>
        <h1 className="text-3xl md:text-4xl font-bold">Admin dashboard</h1>
        <p className="text-muted-foreground mt-1">Hello {name} — manage your store below.</p>
      </div>

      <div className="border-b border-border flex flex-wrap gap-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "add-product" && <ProductsModule mode="manage" />}
      {tab === "view-products" && <ProductsModule mode="view" />}
      {tab === "orders" && <OrdersModule />}
      {tab === "users" && <UsersModule />}
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
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  const name =
    (user.user_metadata?.display_name as string) ||
    (user.user_metadata?.full_name as string) ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-10 flex-1">
        {role === "admin" ? <AdminDashboard name={name} /> : <ClientDashboard name={name} />}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
