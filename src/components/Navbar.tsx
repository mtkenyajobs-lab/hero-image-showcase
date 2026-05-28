import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const navItems: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Office Chairs", to: "/shop/office-chairs" },
  { label: "Desks", to: "/shop/desks-workstations" },
  { label: "Conference", to: "/shop/conference-tables" },
  { label: "Lounge", to: "/shop/lounge-reception" },
  { label: "Storage", to: "/shop/storage-solutions" },
  { label: "Contact us", to: "/#contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Regal Office & Home" className="h-10" />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const base = item.to.split("#")[0];
              const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(base);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive
                      ? "text-foreground underline underline-offset-4 decoration-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="text-foreground hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </button>
          <Button size="sm" className="hidden sm:inline-flex rounded-full px-5">
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
