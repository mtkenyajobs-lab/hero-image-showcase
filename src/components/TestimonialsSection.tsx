import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Customer Testimonials</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-muted-foreground text-sm">Crafted by talented and high quality materials</p>
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold">20+</p>
                <p className="text-xs text-muted-foreground">Year Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold">483</p>
                <p className="text-xs text-muted-foreground">Happy clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold">150+</p>
                <p className="text-xs text-muted-foreground">Project Finished</p>
              </div>
            </div>
            <Button className="rounded-full px-6">Explore Products</Button>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="space-y-3">
              <p className="font-semibold">Shane Lee</p>
              <p className="text-xs text-muted-foreground">Student, Digital Marketing</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-star text-star" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm Happy with my new sofa, High in quality, wide range of products absolutely loved the service and delivered on time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
