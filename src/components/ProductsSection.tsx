import { useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import prodChair1 from "@/assets/prod-chair1.jpg";
import prodChair2 from "@/assets/prod-chair2.jpg";
import prodChair3 from "@/assets/prod-chair3.jpg";
import prodChair4 from "@/assets/prod-chair4.jpg";

const tabs = ["All", "Office Chairs", "Desks", "Conference Tables", "Lounge", "Storage", "Accessories"];

const products = [
  {
    name: "Ero|S| - Swivel Chair",
    desc: "The quality and richness of the materials used, both for the body and the base, make it particularly elegant and so ...",
    price: "$269",
    oldPrice: "$360",
    discount: "10% off",
    rating: 4.3,
    image: prodChair1,
    badge: "50% Instant Discount Available",
  },
  {
    name: "ID Mesh Office Chair",
    desc: "ID Mesh is an office chair by Antonio Citterio for Vitra. Seat in polyurethane foam with woven fabric or ranged 3D upholstery.",
    price: "$399",
    oldPrice: "$499",
    discount: "34% off",
    rating: 4.5,
    image: prodChair2,
    badge: "Limited Time Offer Only",
  },
  {
    name: "Klapp Folding Chair",
    desc: "Klapp is a folding chair by the elegant and contemporary design. Made in multi-layered ash wood, this beautiful chair ston ...",
    price: "$99",
    oldPrice: "$369",
    discount: "29% off",
    rating: 3.6,
    image: prodChair3,
    badge: "Free Delivery Available",
  },
  {
    name: "Side Chair",
    desc: "Bottween, di And Tradition Surface. Solid wood and foampressed veneer with upholstered seat.",
    price: "$89",
    oldPrice: "$349",
    discount: "76% off",
    rating: 4.1,
    image: prodChair4,
    badge: "2 Only Left  Limited Stocks Only",
    badgeUrgent: true,
  },
];

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState("Chair");

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Best Selling Product</h2>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-foreground text-background"
                  : "border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10 hover:opacity-80 transition-opacity hidden md:flex">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10 hover:opacity-80 transition-opacity hidden md:flex">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product.name} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow group">
                <div className="bg-muted p-4 flex items-center justify-center aspect-square">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" loading="lazy" />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{product.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{product.price}</span>
                    <span className="text-xs text-muted-foreground line-through">{product.oldPrice}</span>
                    <span className="text-xs text-muted-foreground">({product.discount})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-star text-star" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                  <p className={`text-[10px] ${product.badgeUrgent ? "text-sale font-semibold" : "text-muted-foreground"}`}>
                    {product.badge}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            View all collections
            <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center">
              <ArrowRight className="w-3 h-3" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
