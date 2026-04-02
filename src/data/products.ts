import prodChair1 from "@/assets/prod-chair-ariel.png";
import prodChair2 from "@/assets/prod-desk-lshaped.jpg";
import prodChair3 from "@/assets/prod-exec-desk.png";
import prodChair4 from "@/assets/prod-boardroom-table.png";

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  desc: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  image: string;
  images: string[];
  badge: string;
  badgeUrgent?: boolean;
  specs: {
    dimensions: string;
    material: string;
    colour: string;
    availability: string;
    weight?: string;
    warranty?: string;
  };
  delivery: string;
}

export const products: Product[] = [
  {
    slug: "ariel-meshback-swivel-chair",
    name: "Ariel MeshBack Swivel Chair",
    category: "Office Chairs",
    categorySlug: "office-chairs",
    desc: "Premium ergonomic mesh-back swivel chair with adjustable headrest, lumbar support and chrome base for ultimate comfort. Designed for long working hours with breathable mesh fabric and multi-position tilt lock mechanism.",
    price: "$269",
    oldPrice: "$360",
    discount: "10% off",
    rating: 4.3,
    image: prodChair1,
    images: [prodChair1, prodChair1, prodChair1],
    badge: "50% Instant Discount Available",
    specs: {
      dimensions: "66cm (W) × 64cm (D) × 112–120cm (H)",
      material: "Mesh back, foam seat, chrome base",
      colour: "Black / Grey",
      availability: "In Stock — Ships in 2–3 business days",
      weight: "14.5 kg",
      warranty: "3 Years",
    },
    delivery: "Free delivery within city limits. Nationwide shipping available at flat $25.",
  },
  {
    slug: "sit-stand-l-shaped-desk",
    name: "Sit & Stand L-Shaped Desk",
    category: "Desks & Workstations",
    categorySlug: "desks-workstations",
    desc: "Ergonomic height-adjustable L-shaped desk with walnut top and white frame. Perfect for modern offices and home workstations. Features dual motor electric lift system with memory presets.",
    price: "$399",
    oldPrice: "$499",
    discount: "34% off",
    rating: 4.5,
    image: prodChair2,
    images: [prodChair2, prodChair2, prodChair2],
    badge: "Limited Time Offer Only",
    specs: {
      dimensions: "180cm × 180cm × 72–120cm (H)",
      material: "MDF with walnut veneer, steel frame",
      colour: "Walnut / White Frame",
      availability: "In Stock — Ships in 3–5 business days",
      weight: "45 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery & assembly within city limits. Nationwide shipping $45.",
  },
  {
    slug: "executive-desk-b002",
    name: "Executive Desk B002",
    category: "Desks & Workstations",
    categorySlug: "desks-workstations",
    desc: "Premium mahogany executive desk with matching bookcase. A statement piece for boardrooms and executive offices. Features built-in cable management and lockable drawers.",
    price: "$99",
    oldPrice: "$369",
    discount: "29% off",
    rating: 3.6,
    image: prodChair3,
    images: [prodChair3, prodChair3, prodChair3],
    badge: "Free Delivery Available",
    specs: {
      dimensions: "200cm (W) × 100cm (D) × 76cm (H)",
      material: "Solid mahogany wood, brass hardware",
      colour: "Dark Mahogany",
      availability: "In Stock — Ships in 5–7 business days",
      weight: "62 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery & assembly included. White-glove service available.",
  },
  {
    slug: "oval-boardroom-table",
    name: "Oval Boardroom Table",
    category: "Conference & Meeting Tables",
    categorySlug: "conference-tables",
    desc: "Elegant oval-shaped boardroom table seating 12+ with rich wood finish. Ideal for conference rooms and meeting spaces. Includes integrated power and data ports.",
    price: "$89",
    oldPrice: "$349",
    discount: "76% off",
    rating: 4.1,
    image: prodChair4,
    images: [prodChair4, prodChair4, prodChair4],
    badge: "2 Only Left — Limited Stocks Only",
    badgeUrgent: true,
    specs: {
      dimensions: "360cm (L) × 140cm (W) × 76cm (H)",
      material: "Engineered wood with oak veneer, steel legs",
      colour: "Natural Oak",
      availability: "Low Stock — 2 units remaining",
      weight: "95 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery & professional assembly included for all boardroom tables.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}
