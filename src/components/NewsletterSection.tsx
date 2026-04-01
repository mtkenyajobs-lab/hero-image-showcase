import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  return (
    <section className="py-16">
      <div className="container text-center max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Subscribe to our Newsletter to get Updates
          <br />to our latest Furnitures
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Get 20% off on your first order just by subscribing to our newsletter
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <div className="flex-1 flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-card">
            <Mail className="w-4 h-4 text-primary" />
            <input
              type="email"
              placeholder="Enter Email Address"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button className="rounded-full px-6">Subscribe</Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
