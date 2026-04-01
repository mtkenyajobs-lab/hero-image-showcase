import { ExternalLink } from "lucide-react";
import catLiving from "@/assets/cat-living-room.jpg";
import catBedroom from "@/assets/cat-bedroom.jpg";
import catDining from "@/assets/cat-dining.jpg";
import catOffice from "@/assets/cat-office.jpg";
import catKitchen from "@/assets/cat-kitchen.jpg";

const categories = [
  { name: "Living Room", count: "450+ Items", image: catLiving, large: true },
  { name: "Bed Room", count: "800+ Items", image: catBedroom, large: true },
  { name: "Dining Room", count: "100+ Items", image: catDining },
  { name: "Home Office", count: "300+ Items", image: catOffice },
  { name: "Kitchen", count: "150+ Items", image: catKitchen },
];

const CategoriesSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground mb-2">Categories</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Discover Our Unique Collections of
            <br />
            Exclusive Categories.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Row 1: 3 large */}
          {categories.slice(0, 3).map((cat) => (
            <div key={cat.name} className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-primary-foreground font-semibold text-lg">{cat.name}</p>
                  <p className="text-primary-foreground/70 text-xs">{cat.count}</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-primary-foreground" />
                </span>
              </div>
            </div>
          ))}
          {/* Row 2: 2 items spanning 3 cols */}
          {categories.slice(3).map((cat) => (
            <div key={cat.name} className="group relative rounded-xl overflow-hidden aspect-[4/3] md:col-span-1 cursor-pointer col-span-1">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-primary-foreground font-semibold text-lg">{cat.name}</p>
                  <p className="text-primary-foreground/70 text-xs">{cat.count}</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-primary-foreground" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
