import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-chair.png";
import workstationImage from "@/assets/workstation.jpg";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: heroImage,
    alt: "Man sitting in a premium office chair",
    label: "Deal of the Day",
    titleLine1: <><span className="font-display font-extrabold italic">TRANSFORM</span> <span className="font-display">YOUR</span></>,
    titleLine2: <><span className="font-display">LIVING </span><span className="font-display font-extrabold italic text-primary">SPACE</span></>,
    description: "The Fritz Hansen Chair JH5 is an exquisite piece of furniture that blends timeless design with comfort. With its elegant curves and ergonomic construction, offers a perfect balance of aesthetics and functionality.",
    product: "Fritz Hansen Chair JH5",
    price: "$2,000",
  },
  {
    image: workstationImage,
    alt: "Modern ergonomic workstation setup",
    label: "New Arrival",
    titleLine1: <><span className="font-display font-extrabold italic">ELEVATE</span> <span className="font-display">YOUR</span></>,
    titleLine2: <><span className="font-display">WORK </span><span className="font-display font-extrabold italic text-primary">SETUP</span></>,
    description: "A complete ergonomic workstation designed for productivity and comfort. Premium desk, adjustable chair, and thoughtful accessories create the perfect workspace.",
    product: "Ergonomic Workstation Bundle",
    price: "$4,500",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const slide = slides[current];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 -top-[15%] h-[130%] transition-opacity duration-700">
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt={s.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="container relative z-10 flex items-center min-h-screen py-12">
        <div className="space-y-6 max-w-lg">
          <p className="text-sm font-medium text-white/70 tracking-wider uppercase">{slide.label}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            {slide.titleLine1}
            <br />
            {slide.titleLine2}
          </h1>
          <p className="text-white/80 max-w-md text-sm leading-relaxed">{slide.description}</p>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">{slide.product}</p>
            <p className="text-xs text-white/60">Starting at</p>
            <p className="text-2xl font-bold text-white">{slide.price}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button size="lg" className="rounded-full px-8">Buy Now</Button>
            <div className="flex gap-2">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition ${i === current ? "bg-primary scale-110" : "bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
