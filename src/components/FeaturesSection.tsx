import { CreditCard, Gift, Truck, RotateCcw } from "lucide-react";

const features = [
  { icon: CreditCard, label: "Easy Payment" },
  { icon: Gift, label: "Promo offers" },
  { icon: Truck, label: "Free Delivery" },
  { icon: RotateCcw, label: "Easy return" },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 border-t border-border">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What makes us the Preferred choices?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
