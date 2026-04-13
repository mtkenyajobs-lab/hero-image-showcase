import prodChair1 from "@/assets/prod-chair-ariel.png";
import prodChair2 from "@/assets/prod-desk-lshaped.jpg";
import prodChair3 from "@/assets/prod-exec-desk.png";
import prodChair4 from "@/assets/prod-boardroom-table.png";
import prodChairAlt1 from "@/assets/prod-chair1.jpg";
import prodChairAlt2 from "@/assets/prod-chair2.jpg";
import prodChairAlt3 from "@/assets/prod-chair3.jpg";
import prodChairAlt4 from "@/assets/prod-chair4.jpg";
import catLounge from "@/assets/cat-lounge.jpg";
import catStorage from "@/assets/cat-storage.jpg";

export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  desc: string;
  price: string;
  priceNum: number;
  oldPrice: string;
  discount: string;
  rating: number;
  image: string;
  images: string[];
  badge: string;
  badgeUrgent?: boolean;
  material: string;
  colour: string;
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

export const categories = [
  { name: "Office Chairs", slug: "office-chairs", count: "450+ Items" },
  { name: "Desks & Workstations", slug: "desks-workstations", count: "300+ Items" },
  { name: "Conference & Meeting Tables", slug: "conference-tables", count: "100+ Items" },
  { name: "Lounge & Reception", slug: "lounge-reception", count: "200+ Items" },
  { name: "Storage Solutions", slug: "storage-solutions", count: "150+ Items" },
];

export const products: Product[] = [
  // ── Office Chairs ──
  {
    slug: "ariel-meshback-swivel-chair",
    name: "Ariel MeshBack Swivel Chair",
    category: "Office Chairs",
    categorySlug: "office-chairs",
    desc: "Premium ergonomic mesh-back swivel chair with adjustable headrest, lumbar support and chrome base for ultimate comfort.",
    price: "$269",
    priceNum: 269,
    oldPrice: "$360",
    discount: "10% off",
    rating: 4.3,
    image: prodChair1,
    images: [prodChair1, prodChair1, prodChair1],
    badge: "50% Instant Discount Available",
    material: "Mesh",
    colour: "Black",
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
    slug: "executive-leather-chair-pro",
    name: "Executive Leather Chair Pro",
    category: "Office Chairs",
    categorySlug: "office-chairs",
    desc: "High-back executive leather chair with padded armrests, tilt lock, and premium PU leather upholstery.",
    price: "$449",
    priceNum: 449,
    oldPrice: "$599",
    discount: "25% off",
    rating: 4.7,
    image: prodChairAlt1,
    images: [prodChairAlt1, prodChairAlt1, prodChairAlt1],
    badge: "Best Seller",
    material: "Leather",
    colour: "Brown",
    specs: {
      dimensions: "70cm (W) × 68cm (D) × 118–126cm (H)",
      material: "PU Leather, foam padding, steel base",
      colour: "Brown / Black",
      availability: "In Stock — Ships in 2–3 business days",
      weight: "18 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery within city limits.",
  },
  {
    slug: "ergonomic-task-chair-v2",
    name: "Ergonomic Task Chair V2",
    category: "Office Chairs",
    categorySlug: "office-chairs",
    desc: "Lightweight ergonomic task chair with breathable fabric seat, adjustable height, and swivel base.",
    price: "$179",
    priceNum: 179,
    oldPrice: "$229",
    discount: "22% off",
    rating: 4.1,
    image: prodChairAlt2,
    images: [prodChairAlt2, prodChairAlt2, prodChairAlt2],
    badge: "Budget Friendly",
    material: "Fabric",
    colour: "Grey",
    specs: {
      dimensions: "58cm (W) × 56cm (D) × 95–105cm (H)",
      material: "Breathable fabric, nylon base",
      colour: "Grey / Blue",
      availability: "In Stock",
      weight: "10 kg",
      warranty: "2 Years",
    },
    delivery: "Flat $15 shipping nationwide.",
  },
  {
    slug: "high-back-mesh-manager-chair",
    name: "High-Back Mesh Manager Chair",
    category: "Office Chairs",
    categorySlug: "office-chairs",
    desc: "Full mesh high-back manager chair with headrest and lumbar adjustment for 8-hour comfort.",
    price: "$329",
    priceNum: 329,
    oldPrice: "$420",
    discount: "22% off",
    rating: 4.5,
    image: prodChairAlt3,
    images: [prodChairAlt3, prodChairAlt3, prodChairAlt3],
    badge: "Ergonomic Pick",
    material: "Mesh",
    colour: "Black",
    specs: {
      dimensions: "64cm (W) × 62cm (D) × 115–125cm (H)",
      material: "Full mesh, aluminium base",
      colour: "Black",
      availability: "In Stock — Ships in 3–5 business days",
      weight: "15 kg",
      warranty: "3 Years",
    },
    delivery: "Free delivery within city limits.",
  },
  {
    slug: "visitor-stackable-chair",
    name: "Visitor Stackable Chair",
    category: "Office Chairs",
    categorySlug: "office-chairs",
    desc: "Durable stackable visitor chair ideal for waiting areas, meeting rooms, and reception spaces.",
    price: "$89",
    priceNum: 89,
    oldPrice: "$120",
    discount: "26% off",
    rating: 3.9,
    image: prodChairAlt4,
    images: [prodChairAlt4, prodChairAlt4, prodChairAlt4],
    badge: "Bulk Discount Available",
    material: "Fabric",
    colour: "Blue",
    specs: {
      dimensions: "48cm (W) × 52cm (D) × 85cm (H)",
      material: "Fabric seat, steel frame",
      colour: "Blue / Black",
      availability: "In Stock",
      weight: "5.5 kg",
      warranty: "2 Years",
    },
    delivery: "Flat $10 shipping. Bulk orders ship free.",
  },

  // ── Desks & Workstations ──
  {
    slug: "sit-stand-l-shaped-desk",
    name: "Sit & Stand L-Shaped Desk",
    category: "Desks & Workstations",
    categorySlug: "desks-workstations",
    desc: "Ergonomic height-adjustable L-shaped desk with walnut top and white frame. Dual motor electric lift.",
    price: "$399",
    priceNum: 399,
    oldPrice: "$499",
    discount: "34% off",
    rating: 4.5,
    image: prodChair2,
    images: [prodChair2, prodChair2, prodChair2],
    badge: "Limited Time Offer Only",
    material: "Wood",
    colour: "Walnut",
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
    desc: "Premium mahogany executive desk with matching bookcase. Built-in cable management and lockable drawers.",
    price: "$99",
    priceNum: 99,
    oldPrice: "$369",
    discount: "29% off",
    rating: 3.6,
    image: prodChair3,
    images: [prodChair3, prodChair3, prodChair3],
    badge: "Free Delivery Available",
    material: "Wood",
    colour: "Dark Mahogany",
    specs: {
      dimensions: "200cm (W) × 100cm (D) × 76cm (H)",
      material: "Solid mahogany wood, brass hardware",
      colour: "Dark Mahogany",
      availability: "In Stock — Ships in 5–7 business days",
      weight: "62 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery & assembly included.",
  },
  {
    slug: "compact-writing-desk",
    name: "Compact Writing Desk",
    category: "Desks & Workstations",
    categorySlug: "desks-workstations",
    desc: "Minimalist writing desk perfect for home offices and small spaces. Clean lines with a single drawer.",
    price: "$199",
    priceNum: 199,
    oldPrice: "$259",
    discount: "23% off",
    rating: 4.2,
    image: prodChair3,
    images: [prodChair3, prodChair3, prodChair3],
    badge: "Space Saver",
    material: "Wood",
    colour: "White",
    specs: {
      dimensions: "120cm (W) × 60cm (D) × 76cm (H)",
      material: "Engineered wood, steel legs",
      colour: "White / Chrome",
      availability: "In Stock",
      weight: "22 kg",
      warranty: "3 Years",
    },
    delivery: "Flat $20 shipping nationwide.",
  },
  {
    slug: "standing-desk-electric",
    name: "Electric Standing Desk",
    category: "Desks & Workstations",
    categorySlug: "desks-workstations",
    desc: "Electric height-adjustable standing desk with memory presets and anti-collision technology.",
    price: "$549",
    priceNum: 549,
    oldPrice: "$699",
    discount: "21% off",
    rating: 4.6,
    image: prodChair2,
    images: [prodChair2, prodChair2, prodChair2],
    badge: "Top Rated",
    material: "Wood",
    colour: "Oak",
    specs: {
      dimensions: "160cm (W) × 80cm (D) × 65–130cm (H)",
      material: "Solid oak top, steel frame",
      colour: "Natural Oak / Black Frame",
      availability: "In Stock",
      weight: "38 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery & assembly included.",
  },

  // ── Conference & Meeting Tables ──
  {
    slug: "oval-boardroom-table",
    name: "Oval Boardroom Table",
    category: "Conference & Meeting Tables",
    categorySlug: "conference-tables",
    desc: "Elegant oval-shaped boardroom table seating 12+ with rich wood finish. Integrated power and data ports.",
    price: "$89",
    priceNum: 89,
    oldPrice: "$349",
    discount: "76% off",
    rating: 4.1,
    image: prodChair4,
    images: [prodChair4, prodChair4, prodChair4],
    badge: "2 Only Left — Limited Stocks Only",
    badgeUrgent: true,
    material: "Wood",
    colour: "Oak",
    specs: {
      dimensions: "360cm (L) × 140cm (W) × 76cm (H)",
      material: "Engineered wood with oak veneer, steel legs",
      colour: "Natural Oak",
      availability: "Low Stock — 2 units remaining",
      weight: "95 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery & professional assembly included.",
  },
  {
    slug: "rectangular-conference-table-8",
    name: "Rectangular Conference Table (8-Seater)",
    category: "Conference & Meeting Tables",
    categorySlug: "conference-tables",
    desc: "Classic rectangular conference table for 8 with cable management and modesty panel.",
    price: "$599",
    priceNum: 599,
    oldPrice: "$799",
    discount: "25% off",
    rating: 4.3,
    image: prodChair4,
    images: [prodChair4, prodChair4, prodChair4],
    badge: "Professional Grade",
    material: "Wood",
    colour: "Walnut",
    specs: {
      dimensions: "240cm (L) × 120cm (W) × 76cm (H)",
      material: "MDF with walnut veneer, steel base",
      colour: "Walnut / Silver",
      availability: "In Stock",
      weight: "72 kg",
      warranty: "5 Years",
    },
    delivery: "Free delivery & assembly included.",
  },
  {
    slug: "round-meeting-table-4",
    name: "Round Meeting Table (4-Seater)",
    category: "Conference & Meeting Tables",
    categorySlug: "conference-tables",
    desc: "Compact round meeting table ideal for huddle rooms and small meeting spaces.",
    price: "$299",
    priceNum: 299,
    oldPrice: "$399",
    discount: "25% off",
    rating: 4.0,
    image: prodChair4,
    images: [prodChair4, prodChair4, prodChair4],
    badge: "Compact Design",
    material: "Wood",
    colour: "White",
    specs: {
      dimensions: "120cm (Dia) × 76cm (H)",
      material: "MDF, powder-coated steel",
      colour: "White / Black Legs",
      availability: "In Stock",
      weight: "28 kg",
      warranty: "3 Years",
    },
    delivery: "Flat $30 shipping nationwide.",
  },

  // ── Lounge & Reception ──
  {
    slug: "reception-sofa-3-seater",
    name: "Reception Sofa (3-Seater)",
    category: "Lounge & Reception",
    categorySlug: "lounge-reception",
    desc: "Modern 3-seater reception sofa with premium faux leather and chrome legs. Ideal for corporate lobbies.",
    price: "$699",
    priceNum: 699,
    oldPrice: "$899",
    discount: "22% off",
    rating: 4.4,
    image: catLounge,
    images: [catLounge, catLounge, catLounge],
    badge: "Premium Selection",
    material: "Leather",
    colour: "Black",
    specs: {
      dimensions: "200cm (W) × 75cm (D) × 80cm (H)",
      material: "Faux leather, high-density foam, chrome legs",
      colour: "Black",
      availability: "In Stock",
      weight: "42 kg",
      warranty: "3 Years",
    },
    delivery: "Free delivery & placement within city limits.",
  },
  {
    slug: "lounge-accent-chair",
    name: "Lounge Accent Chair",
    category: "Lounge & Reception",
    categorySlug: "lounge-reception",
    desc: "Stylish accent chair for reception and lounge areas. Comfortable fabric seat with wooden legs.",
    price: "$249",
    priceNum: 249,
    oldPrice: "$329",
    discount: "24% off",
    rating: 4.2,
    image: catLounge,
    images: [catLounge, catLounge, catLounge],
    badge: "Designer Pick",
    material: "Fabric",
    colour: "Grey",
    specs: {
      dimensions: "72cm (W) × 68cm (D) × 82cm (H)",
      material: "Linen fabric, solid wood legs",
      colour: "Grey / Natural Wood",
      availability: "In Stock",
      weight: "12 kg",
      warranty: "2 Years",
    },
    delivery: "Flat $20 shipping.",
  },
  {
    slug: "coffee-table-marble-top",
    name: "Coffee Table (Marble Top)",
    category: "Lounge & Reception",
    categorySlug: "lounge-reception",
    desc: "Elegant marble-top coffee table with gold-finished steel frame. Perfect for upscale reception areas.",
    price: "$349",
    priceNum: 349,
    oldPrice: "$449",
    discount: "22% off",
    rating: 4.6,
    image: catLounge,
    images: [catLounge, catLounge, catLounge],
    badge: "Luxury Pick",
    material: "Marble",
    colour: "White",
    specs: {
      dimensions: "110cm (L) × 60cm (W) × 45cm (H)",
      material: "Natural marble, steel frame with gold finish",
      colour: "White Marble / Gold",
      availability: "In Stock — Ships in 5–7 business days",
      weight: "35 kg",
      warranty: "2 Years",
    },
    delivery: "White-glove delivery included.",
  },

  // ── Storage Solutions ──
  {
    slug: "filing-cabinet-3-drawer",
    name: "3-Drawer Filing Cabinet",
    category: "Storage Solutions",
    categorySlug: "storage-solutions",
    desc: "Lockable 3-drawer steel filing cabinet. Anti-tilt mechanism and smooth ball-bearing slides.",
    price: "$159",
    priceNum: 159,
    oldPrice: "$199",
    discount: "20% off",
    rating: 4.0,
    image: catStorage,
    images: [catStorage, catStorage, catStorage],
    badge: "Office Essential",
    material: "Metal",
    colour: "Grey",
    specs: {
      dimensions: "47cm (W) × 62cm (D) × 103cm (H)",
      material: "Cold-rolled steel",
      colour: "Grey",
      availability: "In Stock",
      weight: "28 kg",
      warranty: "5 Years",
    },
    delivery: "Flat $15 shipping nationwide.",
  },
  {
    slug: "bookshelf-5-tier-oak",
    name: "5-Tier Oak Bookshelf",
    category: "Storage Solutions",
    categorySlug: "storage-solutions",
    desc: "Open 5-tier bookshelf with oak finish. Great for offices, libraries, and home study rooms.",
    price: "$219",
    priceNum: 219,
    oldPrice: "$289",
    discount: "24% off",
    rating: 4.3,
    image: catStorage,
    images: [catStorage, catStorage, catStorage],
    badge: "Versatile Design",
    material: "Wood",
    colour: "Oak",
    specs: {
      dimensions: "80cm (W) × 35cm (D) × 180cm (H)",
      material: "Engineered wood with oak veneer",
      colour: "Natural Oak",
      availability: "In Stock",
      weight: "24 kg",
      warranty: "3 Years",
    },
    delivery: "Flat $25 shipping nationwide.",
  },
  {
    slug: "mobile-pedestal-3-drawer",
    name: "Mobile Pedestal (3-Drawer)",
    category: "Storage Solutions",
    categorySlug: "storage-solutions",
    desc: "Compact mobile pedestal with 3 lockable drawers. Fits under most desks. Castor wheels for mobility.",
    price: "$129",
    priceNum: 129,
    oldPrice: "$169",
    discount: "24% off",
    rating: 4.1,
    image: catStorage,
    images: [catStorage, catStorage, catStorage],
    badge: "Desk Companion",
    material: "Metal",
    colour: "White",
    specs: {
      dimensions: "39cm (W) × 50cm (D) × 60cm (H)",
      material: "Steel with powder coat",
      colour: "White",
      availability: "In Stock",
      weight: "15 kg",
      warranty: "3 Years",
    },
    delivery: "Flat $10 shipping.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit = 4): Product[] {
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getAllMaterials(): string[] {
  return [...new Set(products.map((p) => p.material))];
}

export function getAllColours(): string[] {
  return [...new Set(products.map((p) => p.colour))];
}

export function getPriceRange(): [number, number] {
  const prices = products.map((p) => p.priceNum);
  return [Math.min(...prices), Math.max(...prices)];
}
