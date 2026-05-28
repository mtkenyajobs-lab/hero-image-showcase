import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ShoppingBag, FileText, Users, Package, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const ClientDashboard = ({ name }: { name: string }) => (
  <div className="space-y-6">
    <div>
      <p className="text-sm text-muted-foreground">Client account</p>
      <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {name}.</h1>
      <p className="text-muted-foreground mt-1">Track your orders, quotes, and saved pieces.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { icon: ShoppingBag, label: "My Orders", value: "0", note: "No orders yet" },
        { icon: FileText, label: "Quote Requests", value: "0", note: "Request a quote anytime" },
        { icon: Package, label: "Saved Items", value: "0", note: "Browse the catalog to save" },
      ].map((c) => (
        <div key={c.label} className="border border-border rounded-xl p-5 bg-card">
          <c.icon className="w-5 h-5 text-primary mb-3" />
          <p className="text-sm text-muted-foreground">{c.label}</p>
          <p className="text-2xl font-bold">{c.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{c.note}</p>
        </div>
      ))}
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

const AdminDashboard = ({ name }: { name: string }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-2">
      <ShieldCheck className="w-5 h-5 text-primary" />
      <p className="text-sm text-muted-foreground">Admin account</p>
    </div>
    <div>
      <h1 className="text-3xl md:text-4xl font-bold">Admin dashboard</h1>
      <p className="text-muted-foreground mt-1">Hello {name} — here's an overview.</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Users, label: "Total users", value: "—" },
        { icon: ShoppingBag, label: "Orders", value: "—" },
        { icon: FileText, label: "Quote requests", value: "—" },
        { icon: BarChart3, label: "Revenue", value: "—" },
      ].map((c) => (
        <div key={c.label} className="border border-border rounded-xl p-5 bg-card">
          <c.icon className="w-5 h-5 text-primary mb-3" />
          <p className="text-xs text-muted-foreground">{c.label}</p>
          <p className="text-2xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-border rounded-xl p-6 bg-card">
        <h2 className="font-semibold mb-2">Catalog</h2>
        <p className="text-sm text-muted-foreground mb-4">Manage products and categories.</p>
        <Link to="/shop/office-chairs"><Button variant="outline">View catalog</Button></Link>
      </div>
      <div className="border border-border rounded-xl p-6 bg-card">
        <h2 className="font-semibold mb-2">Quote requests</h2>
        <p className="text-sm text-muted-foreground mb-4">Review incoming bulk-order inquiries.</p>
        <Link to="/request-a-quote"><Button variant="outline">Open quote form</Button></Link>
      </div>
    </div>
  </div>
);

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
