import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = ["Home", "Trending", "Furnitures", "Services", "Contact us"];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-10">
          <a href="/" className="font-display text-2xl font-bold tracking-tight">
            <span className="text-primary">H</span>
            <span className="text-foreground">F</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  i === 0 ? "text-foreground underline underline-offset-4 decoration-primary" : "text-muted-foreground"
                }`}
              >
                {item}
              </a>
            ))}
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
