import heroImage from "@/assets/hero-chair.png";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-hero/30 relative overflow-hidden">
      <div className="container grid md:grid-cols-2 items-center min-h-[520px] py-12 gap-8">
        <div className="space-y-6 z-10">
          <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">Deal of the Day</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="font-display font-extrabold italic">TRANSFORM</span>{" "}
            <span className="font-display">YOUR</span>
            <br />
            <span className="font-display">LIVING </span>
            <span className="font-display font-extrabold italic text-primary">SPACE</span>
          </h1>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            The Fritz Hansen Chair JH5 is an exquisite piece of furniture that blends timeless design with comfort. With its elegant curves and ergonomic construction, offers a perfect balance of aesthetics and functionality.
          </p>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Fritz Hansen Chair JH5</p>
            <p className="text-xs text-muted-foreground">Starting at</p>
            <p className="text-2xl font-bold">₹ 20,000</p>
          </div>
          <Button size="lg" className="rounded-full px-8">
            Buy Now
          </Button>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={heroImage}
            alt="Man sitting in a premium office chair"
            className="w-full max-w-lg object-cover rounded-lg"
            width={640}
            height={427}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
