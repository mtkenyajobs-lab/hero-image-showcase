import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import catChair from "@/assets/prod-chair-ariel.png";
import catDesk from "@/assets/prod-desk-lshaped.jpg";
import catConference from "@/assets/prod-boardroom-table.png";
import catLounge from "@/assets/cat-lounge.jpg";
import catStorage from "@/assets/cat-storage.jpg";

const categories = [
  { name: "Office Chairs", count: "450+ Items", image: catChair, slug: "office-chairs" },
  { name: "Desks & Workstations", count: "300+ Items", image: catDesk, slug: "desks-workstations" },
  { name: "Conference & Meeting Tables", count: "100+ Items", image: catConference, slug: "conference-tables" },
  { name: "Lounge & Reception", count: "200+ Items", image: catLounge, slug: "lounge-reception" },
  { name: "Storage Solutions", count: "150+ Items", image: catStorage, slug: "storage-solutions" },
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
            Office & Home Furniture.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.slice(0, 3).map((cat) => (
            <Link key={cat.name} to={`/shop/${cat.slug}`} className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer block">
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
            </Link>
          ))}
          {categories.slice(3).map((cat) => (
            <Link key={cat.name} to={`/shop/${cat.slug}`} className="group relative rounded-xl overflow-hidden aspect-[4/3] md:col-span-1 cursor-pointer col-span-1 block">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
