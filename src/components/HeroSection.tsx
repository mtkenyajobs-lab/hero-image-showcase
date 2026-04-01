import heroImage from "@/assets/hero-chair.png";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src={heroImage}
        alt="Man sitting in a premium office chair"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="container relative z-10 flex items-center min-h-screen py-12">
        <div className="space-y-6 max-w-lg">
          <p className="text-sm font-medium text-white/70 tracking-wider uppercase">Deal of the Day</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            <span className="font-display font-extrabold italic">TRANSFORM</span>{" "}
            <span className="font-display">YOUR</span>
            <br />
            <span className="font-display">LIVING </span>
            <span className="font-display font-extrabold italic text-primary">SPACE</span>
          </h1>
          <p className="text-white/80 max-w-md text-sm leading-relaxed">
            The Fritz Hansen Chair JH5 is an exquisite piece of furniture that blends timeless design with comfort. With its elegant curves and ergonomic construction, offers a perfect balance of aesthetics and functionality.
          </p>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Fritz Hansen Chair JH5</p>
            <p className="text-xs text-white/60">Starting at</p>
            <p className="text-2xl font-bold text-white">₹ 20,000</p>
          </div>
          <Button size="lg" className="rounded-full px-8">
            Buy Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
